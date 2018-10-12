/*
* name;
*/

import match = ui.MatchUI;

class Match extends ui.MatchUI{
    public static JOINFLAG ={
        RANDROOM:1,
        CREATEROOM:2,
        WITHROOMID:3,
        WITHPROPERTY:4
    }

    private listBtns: Array<Laya.Button> =  [
        this.btn_cancel,
        this.btn_kick1,
        this.btn_kick2,
        this.btn_kick3,
    ];

    private _roomID:string = "";

    private matchFlag:boolean = false; //是否匹配成功
    private playerList:Array<Player> = [];//匹配到的用户列表
    private isOwner:boolean = false;

    private errorNote:ErrorNote ;

    private joinFlag:number = 1; 

    private timerNum:number = 3;

    constructor(){
        super();
        this.init();
    }

    private init(){
        

        for (var button of this.listBtns) {
            let buttons: Array<string> = [button.name]
            this.addMouseOverEvent(button);
            this.addMouseOutEvent(button);
        }

        //匹配标记，是否匹配上
        this.matchFlag = false;

        this.img_Player1.visible = false;
        this.img_Player2.visible = false;
        this.img_Player3.visible = false;

        this.name_Player1.text = "";
        this.name_Player2.text = "";
        this.name_Player3.text = "";

        this.btn_cancel.on(Laya.Event.CLICK, this, this.btnCancelClick);

        this.btn_kick2.on(Laya.Event.CLICK, this, this.btnKickPlayerClick);
        this.btn_kick3.on(Laya.Event.CLICK, this, this.btnKickPlayerClick);


        Laya.timer.frameLoop(0.5, this, this.animate);

        // this.errorNote = new ErrorNote();
        
        
        this.addMvsListener();
    }

    /**
     * 打开 matchvs 事件监听
     */
    private addMvsListener(){
        // this.errorNote.addListen(this);
        ErrorNote.getInstance.addListen(this);
        //加入房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINROOM_RSP,this, this.joinRoomRsp);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINROOM_NTFY,this, this.joinRoomNotify);

        //离开房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_RSP,this, this.leaveRoomRsp);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_NTFY,this, this.leaveRoomNotify);

        //关闭房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINOVER_RSP,this, this.joinOverRsp);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINOVER_NTFY,this, this.joinOverNotify);

        //创建房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_CREATEROOM_RSP,this, this.createRoomResponse);

        //踢人事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_KICKPLAYER_RSP,this, this.kickPlayerResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_KICKPLAYER_NTFY,this, this.kickPlayerNotify);

        //设置帧同步
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);

    }

    /**
     * 移除 matchvs 事件监听
     */
    private removeMvsListener(){

        // this.errorNote.addListen(this);

        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINROOM_RSP,this, this.joinRoomRsp);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINROOM_NTFY,this, this.joinRoomNotify);

        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_RSP,this, this.leaveRoomRsp);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_NTFY,this, this.leaveRoomNotify);

        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINOVER_RSP,this, this.joinOverRsp);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINOVER_NTFY,this, this.joinOverNotify);

        //创建房间事件
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_CREATEROOM_RSP,this, this.createRoomResponse);

        //踢人事件
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_KICKPLAYER_RSP,this, this.kickPlayerResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_KICKPLAYER_NTFY,this, this.kickPlayerNotify);

        //设置帧同步
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);

    }

    private release(){
        this.removeMvsListener();
        Laya.timer.clearAll(this);
    }

    /**
     * 鼠标进入到按钮，按钮效果
     * @param button 
     */
    private addMouseOverEvent(button: Laya.Button) {
        button.on(Laya.Event.MOUSE_OVER, button, function() {
            button.scale(0.8, 0.8);
        });
    }

    /**
     * 鼠标离开到按钮，按钮效果
     * @param button 
     */
    private addMouseOutEvent(button: Laya.Button) {
        button.on(Laya.Event.MOUSE_OUT, button, function() {
            button.scale(1, 1);
        });
    }

    public joinRoom(flag:number, info:any){
        this.joinFlag = flag;
        if(flag == 1){
            /**
             * 随机加入房间
             */
            this.joinRandRoom();
        }else if(flag == 2){
            this.createRoom();
        }else if(flag == 3){
            this.joinWithRoomID(info);
        }else if(flag == 4){
            this.joinRoomWithPro(info);
        }
    }

    /**
     * 随机加入房间
     */
    private joinRandRoom(){
        let userPro:string = JSON.stringify({name:GameData.myUser.name, avatar:GameData.myUser.avatar});
        mvs.MsEngine.getInstance.joinRandomRoom(GameData.maxPlayerNum,userPro);
    }

    /**
     * 主动创建房间
     */
    private createRoom(){
        let userPro:string = JSON.stringify({name:GameData.myUser.name, avatar:GameData.myUser.avatar});
        mvs.MsEngine.getInstance.createRoom(GameData.createRoomInfo,userPro);
    }

    /**
     * 加入指定房间
     * @param roomID 
     */
    private joinWithRoomID(roomID:string){
        let userPro:string = JSON.stringify({name:GameData.myUser.name, avatar:GameData.myUser.avatar});
        mvs.MsEngine.getInstance.joinRoom(roomID, userPro);
    }

    /**
     * 属性匹配
     * @param tags 
     */
    private joinRoomWithPro(tags){
        let userPro:string = JSON.stringify({name:GameData.myUser.name, avatar:GameData.myUser.avatar});
        let matchinfo:MsMatchInfo = new MsMatchInfo(GameData.maxPlayerNum,GameData.mode,GameData.canWatch,tags);
        mvs.MsEngine.getInstance.joinRoomWithProperties(matchinfo,userPro);
    }

    /**
     * 
     * @param id 
     * @param name 
     * @param avator 
     * @param tableID 
     */
    private addPlayerList(id:number,name:string,avatar:string, tableID:number, owner:boolean = false):Player{
        let play:Player = new Player();
        play.userID = id;
        play.name = name;
        play.avatar = avatar;
        play.tableID = tableID;
        play.isOwner = owner;
        this.playerList.push(play);
        this.showPlayer(play);
        return play;
    }

    /**
     * 删除用户列表
     * @param id 
     */
    private delPlayerList(id:number){
        let player:Player = new Player();
        let arr:Array<Player> = [];
        for(let i = 0; i < this.playerList.length; i++){
            
            if(this.playerList[i].userID == id){
                player.userID = this.playerList[i].userID;
                player.avatar = this.playerList[i].avatar;
                player.name = this.playerList[i].name;
                player.tableID = this.playerList[i].tableID;
                this.playerList.splice(i,1);
                this.wipePlayer(player);
            }
        }
    }

    /**
     * 擦除用户信息
     * @param player 
     */
    private wipePlayer(player:Player){
        let tableID:number = player.tableID;
        if(tableID == 1){
            this.name_Player1.text = "";
            this.img_Player1.visible = false;
            this.name_Player2.text = "";
            this.img_Player2.visible = false;
            this.name_Player3.text = "";
            this.img_Player3.visible = false;
            this.btn_kick1.visible = false;
            this.btn_kick2.visible = false;
            this.btn_kick3.visible = false;
            
        }else if(tableID == 2){
            this.name_Player2.text = "";
            this.img_Player2.visible = false;
            this.name_Player3.text = "";
            this.img_Player3.visible = false;
            this.btn_kick2.visible = false;
            this.btn_kick3.visible = false;
        }else if(tableID == 3){
            this.name_Player3.text = "";
            this.img_Player3.visible = false;
            this.btn_kick3.visible = false;
        }
        this.img_OwnerFlag1.visible = false;
        this.img_OwnerFlag2.visible = false;
        this.img_OwnerFlag3.visible = false;
    }

    /**
     * 显示用户信息
     * @param player 
     */
    private showPlayer(player:Player){
        let tableID:number = player.tableID;
        this.chk_FrameSysc.visible = this.isOwner;
        if(this.joinFlag == Match.JOINFLAG.CREATEROOM || this.joinFlag == Match.JOINFLAG.WITHROOMID){
            this.loadMatch.visible = false;
            this["img_OwnerFlag"+1].visible = this.isOwner;
            if(tableID == 2 || tableID == 3){
                this["btn_kick"+tableID].visible = this.isOwner;
            }
        }
        if(tableID == 1){
            this.img_Player1.skin = player.avatar;
            this.name_Player1.text = player.name;
            this.img_Player1.visible = true;
        }else if(tableID == 2){
            this.img_Player2.skin = player.avatar;
            this.name_Player2.text = player.name;
            this.img_Player2.visible = true;
        }else if(tableID == 3){
            this.img_Player3.skin = player.avatar;
            this.name_Player3.text = player.name;
            this.img_Player3.visible = true;
        }

    }

    /**
     * 加载动画
     * @param e 
     */
    private animate(e: Event): void {
        this.loadMatch.rotation += 5;
    }

    /**
     * 取消按钮
     * @param e 
     */
    private btnCancelClick(e:Laya.Event){
        this.btn_cancel.off(Laya.Event.CLICK, this, this.btnCancelClick);
        console.info("取消匹配！");
        if(this.matchFlag){
            let res = mvs.MsEngine.getInstance.leaveRoom("不想玩了");
            if(res != 0){
                this.removeMvsListener();
                StageManage.getInstance.SwitchScreen(Lobby);
            }
        }else{
            this.removeMvsListener();
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    }

    /**
     * 显示其他玩家 加入房间 信息
     * @param userID 
     * @param tableID 
     * @param userProfile 
     */
    private otherJoinShowInfo(userID:number, tableID:number, userProfile:string, owner:boolean = false){
        if(userProfile && userProfile !== ""){
            let name = "";
            let avatar = "";
            let userInfo = JSON.parse(userProfile);
            if(userInfo.name){
                name = userInfo.name;
            }
            if(userInfo.avatar){
                avatar = userInfo.avatar;
            }
            this.addPlayerList(userID, name, avatar, tableID, owner);
        }
    }

    /**
     * 加入房间 事件 回调
     * @param e 
     */
    private joinRoomRsp(e:mvs.MsEventData){
        let data = e.data;
        if(data.status == 200){
            let tableID:number = 1;
            //房主
            if(data.roomInfo.ownerId == GameData.myUser.userID){
                this.isOwner = true;
            }else{
                this.isOwner = false;
            }
            //显示我自己的信息
            this.addPlayerList(GameData.myUser.userID, GameData.myUser.name, GameData.myUser.avatar, tableID, this.isOwner);
            if(this.joinFlag == Match.JOINFLAG.WITHROOMID){
                this.match_title.text = "房间号："+data.roomInfo.roomID;
            }else{
                this.match_title.text = "匹配成功——等待其他人...";
            }
            this._roomID = data.roomInfo.roomID;
            this.matchFlag = true;
            //如果房间有其他人就显示别人信息
            let userList:Array<any> = data.userList;
            for(let i = 0; i < userList.length; i++){
                tableID++;
                this.otherJoinShowInfo(userList[i].userId, tableID, userList[i].userProfile, data.roomInfo.ownerId == userList[i].userId);
            }
            this.checkStart();

        }else{
            console.info("加入房间失败",data);
        }
    }

    /**
     * 其他玩家加入房间
     * @param e 
     */
    private joinRoomNotify(e:mvs.MsEventData){
        let data = e.data;
        let userID = data.userId;
        let tableID = this.playerList.length + 1;
        this.otherJoinShowInfo(data.userId, tableID, data.userProfile, data.userId == data.owner);
        this.checkStart();
    }

    /**
     * 离开房间
     * @param e 
     */
    private leaveRoomRsp(e:mvs.MsEventData){
        let data = e.data;
        if(data.status == 200){
            this.removeMvsListener();
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    }

    private leaveRoomNotify(e:mvs.MsEventData){
        let data = e.data;
        console.info("玩家离开",data)
        let userID:number = data.userId;

        /**
         * 是否房主有变动，有变动的话就转移房主
         */
        if(data.owner == GameData.myUser.userID){
            this.isOwner = true;
        }else{
            this.isOwner = false;
        }

        //删除该用户
        this.delPlayerList(userID);
        for(let i = 0; i < this.playerList.length; i++){
            if(data.owner == this.playerList[i].userID){
                this.playerList[i].isOwner = true;
            }else{
                this.playerList[i].isOwner = false;
            }
            //重置用户位置并重新显示
            this.playerList[i].tableID = i+1;
            this.showPlayer(this.playerList[i]);
        }
    }

    private checkStart(){
        console.info("房间人数："+this.playerList.length);
        if(this.playerList.length == GameData.maxPlayerNum){
            console.info("可以开始游戏");
            Laya.timer.loop(1000, this, this.countDown);
        }
    }

    /**
     * 倒计时开始游戏
     */
    private countDown(){
        this.btn_cancel.visible = false;
        console.info("倒计时："+this.timerNum);
        this.match_title.text = this.timerNum.toString();
        this.timerNum--;
        if(this.timerNum < 0 && this.playerList.length == GameData.maxPlayerNum){
            if(this.isOwner){
                mvs.MsEngine.getInstance.joinOver("人满开始游戏");
            }
            Laya.timer.clearAll(this);
        }else{
            console.info("倒计时中当前人数：", this.playerList.length);
        }
    }

    private joinOverRsp(e:mvs.MsEventData){
        let data = e.data;
        console.info("房主关闭房间"+data);
        this.startBattle();
    }

    private joinOverNotify(e:mvs.MsEventData){
        console.info("房主关闭房间"+e.data);
        this.startBattle();
    }

    /**
     * 开始游戏
     */
    private startBattle(){
        console.info("开始游戏");
        this.removeMvsListener();
        StageManage.getInstance.ToBattle(this.playerList, this.chk_FrameSysc.selected, {roomID:this._roomID});
    }

    private cancelStart(userID:number, roomID:string){
        this.btn_cancel.visible = true;
        this.timerNum = 3;
        //取消倒计时
        Laya.timer.clear(this,this.countDown);
        if(this.joinFlag == Match.JOINFLAG.WITHROOMID || this.joinFlag == Match.JOINFLAG.CREATEROOM){
            this.match_title.text = "房间号："+roomID;
        }else{
            this.match_title.text = "匹配成功——等待其他人...";
        }
    }

    /**
     * 创建房间回调
     */
    private createRoomResponse(e:mvs.MsEventData){
        let data = e.data;
        if(data.status == 200){
            let tableID:number = 1;
            //房主
            if(data.owner == GameData.myUser.userID){
                this.isOwner = true;
            }else{
                this.isOwner = false;
            }
            //显示我自己的信息
            this.addPlayerList(GameData.myUser.userID, GameData.myUser.name, GameData.myUser.avatar, tableID, this.isOwner);
            this.match_title.text = "房间号："+data.roomID;
            this._roomID = data.roomID;
            this.matchFlag = true;

        }else{
            console.info("加入房间失败",data);
        }
    }

    private btnKickPlayerClick(e:Laya.Event){
        let tableid = 0;
        if(e.target.name == "btn_kick2"){
            tableid = 2;
        }else if(e.target.name == "btn_kick3"){
            tableid = 3;
        }
        let user:Player = this.getUserForTableID(tableid);
        if(user == null){
            console.info("用户不存在");
            return;
        }
        mvs.MsEngine.getInstance.kickPlayer(user.userID, "我们不能一起好好的玩游戏");
    }

    private getUserForTableID(tableid:number):Player{
        let user:Player = null;
        this.playerList.forEach((p)=>{
            if(p.tableID == tableid){
                user = p;
            }
        });
        return user;
    }

    /**
     * 剔除指定房间成功
     * @param e 
     */
    private kickPlayerResponse(e:mvs.MsEventData){
        let data = e.data;
        this.cancelStart(data.userID, this._roomID);
        this.wipePlayerLocation(data.userID, data.owner);
    }

    /**
     * 擦除用户，再次显示用户
     * @param userID 
     * @param owner 
     */
    private wipePlayerLocation(userID:number, owner:number){
        this.delPlayerList(userID);

        this.isOwner = owner == GameData.myUser.userID;

        for(let i = 0; i < this.playerList.length; i++){
            if(owner == this.playerList[i].userID){
                this.playerList[i].isOwner = true;
            }else{
                this.playerList[i].isOwner = false;
            }
            //重置用户位置并重新显示
            this.playerList[i].tableID = i+1;
            this.showPlayer(this.playerList[i]);
        }
    }

    /**
     * 有玩家被剔除
     * @param e 
     */
    private kickPlayerNotify(e:mvs.MsEventData){
        let data = e.data;
        console.info("玩家离开",data);
        if(data.userID == GameData.myUser.userID){
            this.removeMvsListener();
            StageManage.getInstance.SwitchScreen(Lobby);
        }else{
            this.cancelStart(data.userID, this._roomID);
            this.wipePlayerLocation(data.userID, data.owner);
        }
    }

    /**
     * 有人断开
     */
    private networkStateNotify(e:mvs.MsEventData){
        let data = e.data;
        let userID = data.userID;
        this.timerNum = 3;
        this.cancelStart(userID, data.roomID);
        if(data.state = 1){
            console.info("玩家断开:"+userID);
            mvs.MsEngine.getInstance.kickPlayer(userID, "玩家断线踢掉");
        }else if( data.state == 2){
            console.info("玩家正在从新连接..."+userID);
        }else{
            console.info("玩家离开"+userID);
            this.wipePlayerLocation(data.userID, data.owner);
        }
    }

}