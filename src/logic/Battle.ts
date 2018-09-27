/*
* name;
*/

import battle = ui.BattleUI;

class Battle extends ui.BattleUI{

    private stageW:number = 0;

    //动画图集名称
    private _animalRight:string = "runright_0";
    private _animalLeft:string = "runleft_0";
    //三个人物动画
    private roleAnimal1:Laya.Animation = new Laya.Animation();
    private roleAnimal2:Laya.Animation = new Laya.Animation();
    private roleAnimal3:Laya.Animation = new Laya.Animation();
    private _playerList:Array<Player> = [];
    private _myPlayer:Player = null;

    //标记左右移动
    private moveRight:boolean = false;
    private moveLeft:boolean = false;

    private _weekInterval = 100;        //人物移动动画的时间
    private _ballInterval = 2000;        //人物移动动画的时间

    private _roleMoveGap:number = 10;   //人物移动移动的距离

    private gameTimer:number = 120;     //游戏倒计时时间

    private ballYLocY:number = 510;

    // private gameEvents:any = {};

    // 是否帧同步模式
    private isFrameSysc:boolean = false;

    constructor(){
        super();
        this.init();
    }


    private init(){

        this._myPlayer = new Player();
        this.stageW = Laya.stage.width;
        this._myPlayer.tableID = 1;
        
        // 加载动画图集,加载成功后执行回调方法
        Laya.loader.load(["./res/atlas/mvs/role.atlas"],Handler.create(this,this.onLoaded));
    }

    private onLoaded():void{

        this.img_battle.skin = GameData.battleBgimgUrl;

        this.roleAnimal1 = new Laya.Animation();
        this.Sprite_player1.addChild(this.roleAnimal1);

        this.roleAnimal2 = new Laya.Animation();
        this.Sprite_player2.addChild(this.roleAnimal2);

        this.roleAnimal3 = new Laya.Animation();
        this.Sprite_player3.addChild(this.roleAnimal3);

        //设置动画播放时间
        this.roleAnimal1.interval = this._weekInterval;
        this.roleAnimal2.interval = this._weekInterval;
        this.roleAnimal3.interval = this._weekInterval;

        this.btn_leftMove.on(Laya.Event.MOUSE_DOWN,this, this.btnLeftMoveEvent);
        this.btn_leftMove.on(Laya.Event.MOUSE_UP,this, this.btnLeftMoveEvent);
        this.btn_leftMove.on(Laya.Event.MOUSE_OUT,this, this.btnLeftMoveEvent);

        this.btn_rightMove.on(Laya.Event.MOUSE_DOWN,this, this.btnRightMoveEvent);
        this.btn_rightMove.on(Laya.Event.MOUSE_UP,this, this.btnRightMoveEvent);
        this.btn_rightMove.on(Laya.Event.MOUSE_OUT,this, this.btnRightMoveEvent);


        //创建动画模板 runleft
        Laya.Animation.createFrames(this.aniUrls(this._animalLeft,4),this._animalLeft);
        //创建动画模板 runright
        Laya.Animation.createFrames(this.aniUrls(this._animalRight,4),this._animalRight);


        //添加键盘按下事件,一直按着某按键则会不断触发
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        //添加键盘抬起事件
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);

        this.btn_exit.on(Laya.Event.CLICK,this, this.btnExitClick);


        //设置动画播放
        this.roleAnimal1.play(3,false,this._animalLeft);
        this.roleAnimal2.play(3,false,this._animalLeft);
        this.roleAnimal3.play(3,false,this._animalLeft);

        //设置解决固定到一个动作
        this.roleAnimal1.gotoAndStop(0);
        this.roleAnimal2.gotoAndStop(0);
        this.roleAnimal3.gotoAndStop(0);

        //显示用户信息，进游戏对战界面前必须调用 setPlayes
        this.showPlayersInfo();

        //帧加载变化
        Laya.timer.frameLoop(1, this, this.loadFrame);
        //同步游戏内容
        Laya.timer.loop(50, this, this.syncGameContent);
        //倒计时
        Laya.timer.loop(1000, this, this.countDownTime);

        //matchvs 事件监听
        this.addMvsListener();
        
    }

    /**
     * 打开 matchvs 事件监听
     */
    private addMvsListener(){
        ErrorNote.getInstance.addListen(this);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_RSP,this, this.sendEventResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_NTFY,this, this.sendEventNotify);

        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_RSP,this, this.leaveRoomResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_NTFY,this, this.leaveRoomNotify);

        //设置帧同步
		mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SETFRAMESYNC_RSP, this,this.setFrameSyncResponse);
		mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_FRAMEUPDATE, this, this.frameUpdate,);
        
        //对手网络异常触发回调
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);

    }

    /**
     * 移除 matchvs 事件监听
     */
    private removeMvsListener(){
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_RSP,this, this.sendEventResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_NTFY,this, this.sendEventNotify);

        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_RSP,this, this.leaveRoomResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_NTFY,this, this.leaveRoomNotify);

         //设置帧同步
		mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SETFRAMESYNC_RSP, this,this.setFrameSyncResponse);
		mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_FRAMEUPDATE, this, this.frameUpdate,);
        
        //对手网络异常触发回调
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);
    }

    /**
     * 创建一组动画的url数组（美术资源地址数组）
     * @param aniName  动作的名称，用于生成url
     * @param length   动画最后一帧的索引值，
     */        
    private aniUrls(aniName:string,length:number):Array<string>{
        var urls:Array<string>=[];
        for(var i:number=1; i<=length;i++){
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("mvs/role/" + aniName + i + ".png")
        }
        return urls;
    }

    /**
     * 设置玩家
     * @param players 
     */
    public setPlayes(players:Array<Player>):number{
        if(players.length !== GameData.maxPlayerNum){
            return -1;
        }

        for(let i = 0; i < players.length; i++){
            let player:Player = new Player();
            player.avatar = players[i].avatar;
            player.isOwner = players[i].isOwner;
            player.name = players[i].name;
            player.tableID = players[i].tableID;
            player.userID = players[i].userID;
            player.score = players[i].score;
            if(player.userID == GameData.myUser.userID){
                this._myPlayer = player;
            }
            this._playerList.push(player);
        }
        //显示用户信息，进游戏对战界面前必须调用 setPlayes
        this.showPlayersInfo();
        return 0;
    }

    /**
     * 设置游戏时间
     * @param time 
     */
    public setGameTime(time:number){
        this.gameTimer = time;
    }

    /**
     * 打开 帧同步
     */
    public openFrameSync(frameRate:number){
        this.isFrameSysc = true;
        mvs.MsEngine.getInstance.setFrameSync(frameRate);
    }

    /**
     * 显示用户信息
     */
    private showPlayersInfo(){
        for(let i = 0; i < this._playerList.length; i++){
            this["img_header"+(i+1)].skin = this._playerList[i].avatar;
            this["name_Player"+(i+1)].text = this._playerList[i].name == "" ? this._playerList[i].userID.toString(): this._playerList[i].name;
            this["score_Player"+(i+1)].text = this._playerList[i].score;
            this["name_player"+(i+1)].text = this._playerList[i].name == "" ? this._playerList[i].userID.toString(): this._playerList[i].name;
        }
    }

    /**
     * 帧变化操作
     */
    public loadFrame(){
        //检测球碰撞
        this.gainBallCheck();

        //检测角色移动
        if(this.moveLeft){
            this.roleMoverLeft(this._myPlayer.tableID);
        }else if(this.moveRight){
            this.roleMoveRight(this._myPlayer.tableID);
             
        }
    }

    /**
     * 键盘操作
     * @param code 
     */
    private keyDowmMoveRole(code:number){
        switch(code){
            //左
            case 65 :
            case 37:
            this.roleMoverLeft(this._myPlayer.tableID);
            break;
            //右
            case 68 :
            case 39:
            this.roleMoveRight(this._myPlayer.tableID);
            break;
        }
    }

    //右移动
    private roleMoveRight(tableid:number, location ?:number){
        console.info("右移动");
        let role:Laya.Animation = this["roleAnimal"+tableid];
        let spritePlayer:Laya.Sprite = this["Sprite_player"+tableid];
        let namePlayer:Laya.Label = this["name_player"+tableid];

        if(!role.isPlaying){
            role.play(0,true,this._animalRight);
        }

        let terminalX:number = spritePlayer.x += this._roleMoveGap;

        if(terminalX > (Laya.stage.width-60)){
            terminalX = Laya.stage.width-60;
        }

        if(location){
            terminalX = location;
        }

        namePlayer.x=terminalX;
        //Laya.Tween.to(spritePlayer, { x: terminalX }, this._weekInterval*2);
        this.roleMoveAnimal(spritePlayer, terminalX, spritePlayer.y);
    }

    /**
     * 人物移动动画
     * @param spritePlayer 
     * @param x 
     * @param y 
     */
    private roleMoveAnimal(spritePlayer:Laya.Sprite ,x:number, y:number){
        Laya.Tween.to(spritePlayer, { x: x }, this._weekInterval*2);
    }


    //左移动
    private roleMoverLeft(tableid:number, location ?:number){
        console.info("左移动");

        let role:Laya.Animation = this["roleAnimal"+tableid];
        let spritePlayer:Laya.Sprite = this["Sprite_player"+tableid];
        let namePlayer:Laya.Label = this["name_player"+tableid];
        if(!role.isPlaying){
            role.play(0,true,this._animalLeft);
        }
        let terminalX:number = spritePlayer.x -= this._roleMoveGap;
        if(terminalX <= 50){
            terminalX  = 50;
        }

        if(location){
            terminalX = location;
        }

        namePlayer.x=terminalX;
        // Laya.Tween.to(spritePlayer, { x: terminalX }, this._weekInterval);
        this.roleMoveAnimal(spritePlayer, terminalX, spritePlayer.y);
    }

    //检测是否碰撞到球
    private gainBallCheck(){
        let myloc:number = this.Sprite_player1.x;
        let ball:number = this.img_ball.x;
        let valueX:number = myloc - ball;

        //let valueY:number = this.ballYLocY - this.img_ball.y;
        if(valueX < 0){
            valueX *= -1;
        }
        // if(valueY < 0){
        //     valueY *= -1;
        // }
        
        if(valueX < 15 ){
            //console.info("检测位置", valueX, valueY);
            this._myPlayer.score += 1;
            this.score_Player1.text = this._myPlayer.score.toString();
            console.info("得分："+this._myPlayer.score);
            this.ballMove();
        }
    }

    /**
     * 发送消息
     * @param data 
     */
    private sendMsg(data:string){
        if(this.isFrameSysc){
            mvs.MsEngine.getInstance.sendFrameEvent(data);
        }else{
            mvs.MsEngine.getInstance.sendEvent(data);
        }
    }

    /**
     * 解析收到的消息
     * @param userID 
     * @param msg 
     */
    private messageParse(userID:number, msg:string){
        if(msg != "" && msg.indexOf("action") >= 0){
            let obj = JSON.parse(msg);
            if(obj.action == GameData.MSG_ACTION.BALL_MOVE){
                //球移动
                Laya.Tween.to(this.img_ball, { x : obj.x }, this._ballInterval, Laya.Ease.quintOut);
                this.img_ball.rotation += 250;
            }else if(obj.action == GameData.MSG_ACTION.ROLE_LOCATION){
                //玩家位置消息
                let tableID:number = 0;
                this._playerList.forEach((p)=>{
                    if(p.userID == userID){
                        tableID = p.tableID;
                        p.score = obj.score;
                    }
                });
                if(obj.left == 1 && obj.right == 0){
                    this.roleMoverLeft(tableID, obj.x);
                }else if(obj.left == 0 &&obj.right ==1){
                    this.roleMoveRight(tableID, obj.x);
                }else if(obj.left == 0 && obj.right ==0){
                    this["Sprite_player"+tableID].x = obj.x;
                    this["name_player"+tableID].x = obj.x;
                    if(this["roleAnimal"+tableID].isPlaying){
                        this["roleAnimal"+tableID].stop();
                        this["roleAnimal"+tableID].gotoAndStop(0);
                    }

                }
                this["score_Player"+tableID].text = obj.score;
            }else if(obj.action == GameData.MSG_ACTION.RECONNECT_OK){
                console.info("收到重连消息 房主：",this._myPlayer.isOwner);
                //if(this._myPlayer.isOwner){
                    //有玩家重连回房间
                    this.reconnectAck(userID);
                //}
            }else if(obj.action == GameData.MSG_ACTION.GAME_TIME_SYN){

                if(this.gameTimer !== obj.time){
                    this.gameTimer = obj.time;
                }
            }
        }
    }

    /**
     * 
     * @param userID 重连回复
     */
    private reconnectAck(userID){
        let userlist:Array<any> = [];
        let hisScore:number = 0;
        //获取玩家信息
        this._playerList.forEach((p)=>{
            if(userID === p.userID){
                hisScore = p.score;
            }else{
                userlist.push({name:p.name, avatar:p.avatar, userID:p.userID});
            }
        });
        let event = {
            action:GameData.MSG_ACTION.RECONNECT_ACK,
            userList:userlist,
            type: this.isFrameSysc? 1:0,//判断是否是帧同步
            time: this.gameTimer,
            score: hisScore,
        }
        let msg = JSON.stringify(event);
        console.info("重连确认消息："+msg);
        //发给指定人
        mvs.MsEngine.getInstance.sendEventEx(0,msg,0,[userID]);
    }


    /**
     * 同步我的信息
     */
    private syncMyInfo(){
        let event = {
            action:GameData.MSG_ACTION.ROLE_LOCATION,
            x:this.Sprite_player1.x,
            right: this.moveRight ? 1:0,
            left: this.moveLeft ? 1:0,
            score:this._myPlayer.score
        };
        let data = JSON.stringify(event);
        this.sendMsg(data);
    }

    /**
     * 同步 球 信息
     */
    private syncBallInfo(loc:number){
        let data = JSON.stringify({
            action:GameData.MSG_ACTION.BALL_MOVE,
            x:loc
        });
        console.info("发送球移动");
        this.sendMsg(data);
    }

    //游戏内容同步
    private syncGameContent(){
        this.syncMyInfo();
    }

    private onKeyDown(e: Laya.Event){
        let keyCode: number = e["keyCode"];
        this.keyDowmMoveRole(keyCode);
    }

    private onKeyUp(e: Laya.Event){
        console.info("键盘抬起");
        if(this.roleAnimal1.isPlaying){
            this.roleAnimal1.stop();
        }
    }

    /**
     * 左边按钮
     * @param e 
     */
    private btnLeftMoveEvent(e:Laya.Event){
        
        if(e.type == Laya.Event.MOUSE_DOWN){
            console.info("鼠标按下");
            //Laya.timer.frameLoop(1, this, this.roleMoverLeft)
            this.moveRight = false;
            this.moveLeft = true;
        }
        else {
            this.moveRight = false;
            this.moveLeft = false;
            console.info("鼠标抬起");
            if(this.roleAnimal1.isPlaying){
                this.roleAnimal1.stop();
                this.roleAnimal1.gotoAndStop(0);
            }
            
            //Laya.timer.clear(this,this.roleMoverLeft);
        }
    }

    /**
     * 右边按钮
     * @param e 
     */
    private btnRightMoveEvent(e:Laya.Event){
        
        if(e.type == Laya.Event.MOUSE_DOWN){
            console.info("鼠标按下");
            this.moveRight = true;
            this.moveLeft = false;
            //Laya.timer.frameLoop(1, this, this.roleMoveRight)
        }
        else {
            console.info("鼠标抬起");
            this.moveRight = false;
            this.moveLeft = false;
            if(this.roleAnimal1.isPlaying){
                this.roleAnimal1.stop();
                this.roleAnimal1.gotoAndStop(0);
            }
            //Laya.timer.clear(this,this.roleMoveRight);
        }
    }

    /**
     * 获取球随机变化距离
     * @param min 
     * @param max 
     */
    private getDistance(min:number, max:number):number{
        return Math.floor(Math.random()*(max - min)+min);
    }

    /**
     * 球移动动画
     */
    private ballMove(){
        let loca:number = this.getDistance(200, 400);
        let locaY:number = this.getDistance(200, 400);
        let currLoca_x:number = this.img_ball.x+loca;
        let currLoca_y:number = this.img_ball.y-loca;
        if(this.moveLeft){
            currLoca_x = this.img_ball.x-loca
        }
        if(currLoca_x > this.stageW || currLoca_x < 50){
            currLoca_x = this.getDistance(50, this.stageW);
        }

        //同步球位置
        this.syncBallInfo(currLoca_x);
        Laya.Tween.to(this.img_ball, { x : currLoca_x}, this._ballInterval, Laya.Ease.quintOut);
        //Laya.Tween.from(this.img_ball, { y : currLoca_y }, this._ballInterval,Laya.Ease.quartInOut);
        this.img_ball.rotation += 250;
    }

    /**
     * 倒计时
     */
    private countDownTime(){
        this.gameTimer--;
        this.txt_gameTime.text = this.gameTimer.toString();
        if(this.gameTimer <= 0){
            Laya.timer.clearAll(this);
            this.gameOver();
        }
        //房主同步时间
        if(this._myPlayer.isOwner){
            let event = {
                action:GameData.MSG_ACTION.GAME_TIME_SYN,
                time: this.gameTimer,
            };
            mvs.MsEngine.getInstance.sendEvent(JSON.stringify(event));
        }
    }

    private gameOver(flag?:number){
        this.release();
        mvs.MsEngine.getInstance.leaveRoom("游戏结束");
        console.info("游戏结束！");
        StageManage.getInstance.ToResult(this._playerList, flag);
    }

    /**
     * 发送消息回调
     * @param e 
     */
    private sendEventResponse(e:mvs.MsEventData){
        //这里不做处理
    }
    /**
     * 
     * @param {MsEventData} e 
     */
    private sendEventNotify(e:mvs.MsEventData){
        
        let data = e.data;
        let userID = data.srcUserID;
        this.messageParse(userID, data.cpProto);
    }

    /**
     * 退出按钮
     * @param e 
     */
    private btnExitClick(e:Laya.Event){
        mvs.MsEngine.getInstance.leaveRoom("不想玩了");
    }


    /**
     * 自己离开房间通知
     * @param e 
     */
    private leaveRoomResponse(e:mvs.MsEventData){
        let data = e.data;
        this.release();
        StageManage.getInstance.SwitchScreen(Lobby);

    }


    /**
     * 其他玩家离开房间 通知
     * @param e 
     */
    private leaveRoomNotify(e:mvs.MsEventData){
        let data = e.data;
        this.gameOver();
        // let tableID:number = 0;
        // this._myPlayer.isOwner = (data.owner === this._myPlayer.userID);
        // this._playerList.forEach((p)=>{
        //     if(data.userId == p.userID){
        //         tableID = p.tableID;
        //     }
        // });
        // this["img_header"+tableID].skin = "";
    }

    /**
     * 释放对象
     */
    private release(){
        Laya.timer.clearAll(this);
        this.removeMvsListener();
    }


    /**
     * 设置帧同步回调
     * @param e 
     */
    private setFrameSyncResponse(e:mvs.MsEventData){
        let data = e.data;
        if(data.status == 200){
            console.info("帧同步设置成功！");
        }else{
            console.info("帧同步设置失败！");
        }
    }

    /**
     * 帧同步更新
     * @param e 
     */
    private frameUpdate(e:mvs.MsEventData){
        let data = e.data;
        for (var i = 0 ; i < data.frameItems.length; i++) {
            //获取数据项
            var info:MsFrameItem = data.frameItems[i];
            let userID:number = info.srcUserID;
            if(userID !== GameData.myUser.userID){
                this.messageParse(userID, info.cpProto);
            }
        }
    }

    /**
     * 其他玩家断线
     * @param e 
     */
    private networkStateNotify(e:mvs.MsEventData){
        let data = e.data;
        let userID = data.userID;
        let tableID:number = 0;
        this._playerList.forEach((p)=>{
            if(data.userID == p.userID){
                tableID = p.tableID;
            }
        });

        console.info("房主：",data.owner,"我自己：",this._myPlayer.userID);
        if(data.owner == this._myPlayer.userID){
            this._myPlayer.isOwner = true;
        }


        if(data.state == 1){
            console.info("玩家断开:"+userID);
            
            this["name_Player"+tableID].text = "该玩家掉线啦";
        }else if( data.state == 2){
            console.info("玩家正在从新连接..."+userID);
        }else{
            console.info("玩家离开"+userID);
            this["img_header"+tableID].skin = "";
            this.gameOver();
        }
    }
}