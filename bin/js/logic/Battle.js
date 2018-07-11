/*
* name;
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var battle = ui.BattleUI;
var Battle = /** @class */ (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        //动画图集名称
        _this._animalRight = "runright_0";
        _this._animalLeft = "runleft_0";
        //三个人物动画
        _this.roleAnimal1 = new Laya.Animation();
        _this.roleAnimal2 = new Laya.Animation();
        _this.roleAnimal3 = new Laya.Animation();
        _this._playerList = [];
        _this._myPlayer = null;
        //标记左右移动
        _this.moveRight = false;
        _this.moveLeft = false;
        _this._weekInterval = 100; //人物移动动画的时间
        _this._ballInterval = 2000; //人物移动动画的时间
        _this._roleMoveGap = 10; //人物移动移动的距离
        _this.gameTimer = 120; //游戏倒计时时间
        _this.ballYLocY = 510;
        // private gameEvents:any = {};
        // 是否帧同步模式
        _this.isFrameSysc = false;
        _this.init();
        return _this;
    }
    Battle.prototype.init = function () {
        this._myPlayer = new Player();
        this.stageW = Laya.stage.width;
        this._myPlayer.tableID = 1;
        // 加载动画图集,加载成功后执行回调方法
        Laya.loader.load(["./res/atlas/mvs/role.atlas"], Handler.create(this, this.onLoaded));
    };
    Battle.prototype.onLoaded = function () {
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
        this.btn_leftMove.on(Laya.Event.MOUSE_DOWN, this, this.btnLeftMoveEvent);
        this.btn_leftMove.on(Laya.Event.MOUSE_UP, this, this.btnLeftMoveEvent);
        this.btn_leftMove.on(Laya.Event.MOUSE_OUT, this, this.btnLeftMoveEvent);
        this.btn_rightMove.on(Laya.Event.MOUSE_DOWN, this, this.btnRightMoveEvent);
        this.btn_rightMove.on(Laya.Event.MOUSE_UP, this, this.btnRightMoveEvent);
        this.btn_rightMove.on(Laya.Event.MOUSE_OUT, this, this.btnRightMoveEvent);
        //创建动画模板 runleft
        Laya.Animation.createFrames(this.aniUrls(this._animalLeft, 4), this._animalLeft);
        //创建动画模板 runright
        Laya.Animation.createFrames(this.aniUrls(this._animalRight, 4), this._animalRight);
        //添加键盘按下事件,一直按着某按键则会不断触发
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        //添加键盘抬起事件
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
        this.btn_exit.on(Laya.Event.CLICK, this, this.btnExitClick);
        //设置动画播放
        this.roleAnimal1.play(3, false, this._animalLeft);
        this.roleAnimal2.play(3, false, this._animalLeft);
        this.roleAnimal3.play(3, false, this._animalLeft);
        //设置解决固定到一个动作
        this.roleAnimal1.gotoAndStop(0);
        this.roleAnimal2.gotoAndStop(0);
        this.roleAnimal3.gotoAndStop(0);
        //显示用户信息，进游戏对战界面前必须调用 setPlayes
        this.showPlayersInfo();
        //帧加载变化
        Laya.timer.frameLoop(1, this, this.loadFrame);
        //同步游戏内容
        Laya.timer.loop(20, this, this.syncGameContent);
        //倒计时
        Laya.timer.loop(1000, this, this.countDownTime);
        //matchvs 事件监听
        this.addMvsListener();
    };
    /**
     * 打开 matchvs 事件监听
     */
    Battle.prototype.addMvsListener = function () {
        ErrorNote.getInstance.addListen(this);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_RSP, this, this.sendEventResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_NTFY, this, this.sendEventNotify);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_RSP, this, this.leaveRoomResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this, this.leaveRoomNotify);
        //设置帧同步
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SETFRAMESYNC_RSP, this, this.setFrameSyncResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_FRAMEUPDATE, this, this.frameUpdate);
        //对手网络异常触发回调
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);
    };
    /**
     * 移除 matchvs 事件监听
     */
    Battle.prototype.removeMvsListener = function () {
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_RSP, this, this.sendEventResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_NTFY, this, this.sendEventNotify);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_RSP, this, this.leaveRoomResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this, this.leaveRoomNotify);
        //设置帧同步
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SETFRAMESYNC_RSP, this, this.setFrameSyncResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_FRAMEUPDATE, this, this.frameUpdate);
        //对手网络异常触发回调
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);
    };
    /**
     * 创建一组动画的url数组（美术资源地址数组）
     * @param aniName  动作的名称，用于生成url
     * @param length   动画最后一帧的索引值，
     */
    Battle.prototype.aniUrls = function (aniName, length) {
        var urls = [];
        for (var i = 1; i <= length; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("mvs/role/" + aniName + i + ".png");
        }
        return urls;
    };
    /**
     * 设置玩家
     * @param players
     */
    Battle.prototype.setPlayes = function (players) {
        if (players.length !== GameData.maxPlayerNum) {
            return -1;
        }
        for (var i = 0; i < players.length; i++) {
            var player = new Player();
            player.avatar = players[i].avatar;
            player.isOwner = players[i].isOwner;
            player.name = players[i].name;
            player.tableID = players[i].tableID;
            player.userID = players[i].userID;
            player.score = players[i].score;
            if (player.userID == GameData.myUser.userID) {
                this._myPlayer = player;
            }
            this._playerList.push(player);
        }
        //显示用户信息，进游戏对战界面前必须调用 setPlayes
        this.showPlayersInfo();
        return 0;
    };
    /**
     * 设置游戏时间
     * @param time
     */
    Battle.prototype.setGameTime = function (time) {
        this.gameTimer = time;
    };
    /**
     * 打开 帧同步
     */
    Battle.prototype.openFrameSync = function (frameRate) {
        this.isFrameSysc = true;
        mvs.MsEngine.getInstance.setFrameSync(frameRate);
    };
    /**
     * 显示用户信息
     */
    Battle.prototype.showPlayersInfo = function () {
        for (var i = 0; i < this._playerList.length; i++) {
            this["img_header" + (i + 1)].skin = this._playerList[i].avatar;
            this["name_Player" + (i + 1)].text = this._playerList[i].name == "" ? this._playerList[i].userID.toString() : this._playerList[i].name;
            this["score_Player" + (i + 1)].text = this._playerList[i].score;
            this["name_player" + (i + 1)].text = this._playerList[i].name == "" ? this._playerList[i].userID.toString() : this._playerList[i].name;
        }
    };
    /**
     * 帧变化操作
     */
    Battle.prototype.loadFrame = function () {
        //检测球碰撞
        this.gainBallCheck();
        //检测角色移动
        if (this.moveLeft) {
            this.roleMoverLeft(this._myPlayer.tableID);
        }
        else if (this.moveRight) {
            this.roleMoveRight(this._myPlayer.tableID);
        }
    };
    /**
     * 键盘操作
     * @param code
     */
    Battle.prototype.keyDowmMoveRole = function (code) {
        switch (code) {
            //左
            case 65:
            case 37:
                this.roleMoverLeft(this._myPlayer.tableID);
                break;
            //右
            case 68:
            case 39:
                this.roleMoveRight(this._myPlayer.tableID);
                break;
        }
    };
    //右移动
    Battle.prototype.roleMoveRight = function (tableid, location) {
        console.info("右移动");
        var role = this["roleAnimal" + tableid];
        var spritePlayer = this["Sprite_player" + tableid];
        var namePlayer = this["name_player" + tableid];
        if (!role.isPlaying) {
            role.play(0, true, this._animalRight);
        }
        var terminalX = spritePlayer.x += this._roleMoveGap;
        if (terminalX > (Laya.stage.width - 60)) {
            terminalX = Laya.stage.width - 60;
        }
        if (location) {
            terminalX = location;
        }
        namePlayer.x = terminalX;
        //Laya.Tween.to(spritePlayer, { x: terminalX }, this._weekInterval*2);
        this.roleMoveAnimal(spritePlayer, terminalX, spritePlayer.y);
    };
    /**
     * 人物移动动画
     * @param spritePlayer
     * @param x
     * @param y
     */
    Battle.prototype.roleMoveAnimal = function (spritePlayer, x, y) {
        Laya.Tween.to(spritePlayer, { x: x }, this._weekInterval * 2);
    };
    //左移动
    Battle.prototype.roleMoverLeft = function (tableid, location) {
        console.info("左移动");
        var role = this["roleAnimal" + tableid];
        var spritePlayer = this["Sprite_player" + tableid];
        var namePlayer = this["name_player" + tableid];
        if (!role.isPlaying) {
            role.play(0, true, this._animalLeft);
        }
        var terminalX = spritePlayer.x -= this._roleMoveGap;
        if (terminalX <= 50) {
            terminalX = 50;
        }
        if (location) {
            terminalX = location;
        }
        namePlayer.x = terminalX;
        // Laya.Tween.to(spritePlayer, { x: terminalX }, this._weekInterval);
        this.roleMoveAnimal(spritePlayer, terminalX, spritePlayer.y);
    };
    //检测是否碰撞到球
    Battle.prototype.gainBallCheck = function () {
        var myloc = this.Sprite_player1.x;
        var ball = this.img_ball.x;
        var valueX = myloc - ball;
        //let valueY:number = this.ballYLocY - this.img_ball.y;
        if (valueX < 0) {
            valueX *= -1;
        }
        // if(valueY < 0){
        //     valueY *= -1;
        // }
        if (valueX < 15) {
            //console.info("检测位置", valueX, valueY);
            this._myPlayer.score += 1;
            this.score_Player1.text = this._myPlayer.score.toString();
            console.info("得分：" + this._myPlayer.score);
            this.ballMove();
        }
    };
    /**
     * 发送消息
     * @param data
     */
    Battle.prototype.sendMsg = function (data) {
        if (this.isFrameSysc) {
            mvs.MsEngine.getInstance.sendFrameEvent(data);
        }
        else {
            mvs.MsEngine.getInstance.sendEvent(data);
        }
    };
    /**
     * 解析收到的消息
     * @param userID
     * @param msg
     */
    Battle.prototype.messageParse = function (userID, msg) {
        if (msg != "" && msg.indexOf("action") >= 0) {
            var obj_1 = JSON.parse(msg);
            if (obj_1.action == GameData.MSG_ACTION.BALL_MOVE) {
                //球移动
                Laya.Tween.to(this.img_ball, { x: obj_1.x }, this._ballInterval, Laya.Ease.quintOut);
                this.img_ball.rotation += 250;
            }
            else if (obj_1.action == GameData.MSG_ACTION.ROLE_LOCATION) {
                //玩家位置消息
                var tableID_1 = 0;
                this._playerList.forEach(function (p) {
                    if (p.userID == userID) {
                        tableID_1 = p.tableID;
                        p.score = obj_1.score;
                    }
                });
                if (obj_1.left == 1 && obj_1.right == 0) {
                    this.roleMoverLeft(tableID_1, obj_1.x);
                }
                else if (obj_1.left == 0 && obj_1.right == 1) {
                    this.roleMoveRight(tableID_1, obj_1.x);
                }
                else if (obj_1.left == 0 && obj_1.right == 0) {
                    this["Sprite_player" + tableID_1].x = obj_1.x;
                    this["name_player" + tableID_1].x = obj_1.x;
                    if (this["roleAnimal" + tableID_1].isPlaying) {
                        this["roleAnimal" + tableID_1].stop();
                        this["roleAnimal" + tableID_1].gotoAndStop(0);
                    }
                }
                this["score_Player" + tableID_1].text = obj_1.score;
            }
            else if (obj_1.action == GameData.MSG_ACTION.RECONNECT_OK) {
                console.info("收到重连消息 房主：", this._myPlayer.isOwner);
                //if(this._myPlayer.isOwner){
                //有玩家重连回房间
                this.reconnectAck(userID);
                //}
            }
            else if (obj_1.action == GameData.MSG_ACTION.GAME_TIME_SYN) {
                if (this.gameTimer !== obj_1.time) {
                    this.gameTimer = obj_1.time;
                }
            }
        }
    };
    /**
     *
     * @param userID 重连回复
     */
    Battle.prototype.reconnectAck = function (userID) {
        var userlist = [];
        var hisScore = 0;
        //获取玩家信息
        this._playerList.forEach(function (p) {
            if (userID === p.userID) {
                hisScore = p.score;
            }
            else {
                userlist.push({ name: p.name, avatar: p.avatar, userID: p.userID });
            }
        });
        var event = {
            action: GameData.MSG_ACTION.RECONNECT_ACK,
            userList: userlist,
            type: this.isFrameSysc ? 1 : 0,
            time: this.gameTimer,
            score: hisScore,
        };
        var msg = JSON.stringify(event);
        console.info("重连确认消息：" + msg);
        //发给指定人
        mvs.MsEngine.getInstance.sendEventEx(0, msg, 0, [userID]);
    };
    /**
     * 同步我的信息
     */
    Battle.prototype.syncMyInfo = function () {
        var event = {
            action: GameData.MSG_ACTION.ROLE_LOCATION,
            x: this.Sprite_player1.x,
            right: this.moveRight ? 1 : 0,
            left: this.moveLeft ? 1 : 0,
            score: this._myPlayer.score
        };
        var data = JSON.stringify(event);
        this.sendMsg(data);
    };
    /**
     * 同步 球 信息
     */
    Battle.prototype.syncBallInfo = function (loc) {
        var data = JSON.stringify({
            action: GameData.MSG_ACTION.BALL_MOVE,
            x: loc
        });
        console.info("发送球移动");
        this.sendMsg(data);
    };
    //游戏内容同步
    Battle.prototype.syncGameContent = function () {
        this.syncMyInfo();
    };
    Battle.prototype.onKeyDown = function (e) {
        var keyCode = e["keyCode"];
        this.keyDowmMoveRole(keyCode);
    };
    Battle.prototype.onKeyUp = function (e) {
        console.info("键盘抬起");
        if (this.roleAnimal1.isPlaying) {
            this.roleAnimal1.stop();
        }
    };
    /**
     * 左边按钮
     * @param e
     */
    Battle.prototype.btnLeftMoveEvent = function (e) {
        if (e.type == Laya.Event.MOUSE_DOWN) {
            console.info("鼠标按下");
            //Laya.timer.frameLoop(1, this, this.roleMoverLeft)
            this.moveRight = false;
            this.moveLeft = true;
        }
        else {
            this.moveRight = false;
            this.moveLeft = false;
            console.info("鼠标抬起");
            if (this.roleAnimal1.isPlaying) {
                this.roleAnimal1.stop();
                this.roleAnimal1.gotoAndStop(0);
            }
            //Laya.timer.clear(this,this.roleMoverLeft);
        }
    };
    /**
     * 右边按钮
     * @param e
     */
    Battle.prototype.btnRightMoveEvent = function (e) {
        if (e.type == Laya.Event.MOUSE_DOWN) {
            console.info("鼠标按下");
            this.moveRight = true;
            this.moveLeft = false;
            //Laya.timer.frameLoop(1, this, this.roleMoveRight)
        }
        else {
            console.info("鼠标抬起");
            this.moveRight = false;
            this.moveLeft = false;
            if (this.roleAnimal1.isPlaying) {
                this.roleAnimal1.stop();
                this.roleAnimal1.gotoAndStop(0);
            }
            //Laya.timer.clear(this,this.roleMoveRight);
        }
    };
    /**
     * 获取球随机变化距离
     * @param min
     * @param max
     */
    Battle.prototype.getDistance = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    /**
     * 球移动动画
     */
    Battle.prototype.ballMove = function () {
        var loca = this.getDistance(200, 400);
        var locaY = this.getDistance(200, 400);
        var currLoca_x = this.img_ball.x + loca;
        var currLoca_y = this.img_ball.y - loca;
        if (this.moveLeft) {
            currLoca_x = this.img_ball.x - loca;
        }
        if (currLoca_x > this.stageW || currLoca_x < 50) {
            currLoca_x = this.getDistance(50, this.stageW);
        }
        //同步球位置
        this.syncBallInfo(currLoca_x);
        Laya.Tween.to(this.img_ball, { x: currLoca_x }, this._ballInterval, Laya.Ease.quintOut);
        //Laya.Tween.from(this.img_ball, { y : currLoca_y }, this._ballInterval,Laya.Ease.quartInOut);
        this.img_ball.rotation += 250;
    };
    /**
     * 倒计时
     */
    Battle.prototype.countDownTime = function () {
        this.gameTimer--;
        this.txt_gameTime.text = this.gameTimer.toString();
        if (this.gameTimer <= 0) {
            Laya.timer.clearAll(this);
            this.gameOver();
        }
        //房主同步时间
        if (this._myPlayer.isOwner) {
            var event_1 = {
                action: GameData.MSG_ACTION.GAME_TIME_SYN,
                time: this.gameTimer,
            };
            mvs.MsEngine.getInstance.sendEvent(JSON.stringify(event_1));
        }
    };
    Battle.prototype.gameOver = function (flag) {
        this.release();
        mvs.MsEngine.getInstance.leaveRoom("游戏结束");
        console.info("游戏结束！");
        StageManage.getInstance.ToResult(this._playerList, flag);
    };
    /**
     * 发送消息回调
     * @param e
     */
    Battle.prototype.sendEventResponse = function (e) {
        //这里不做处理
    };
    /**
     *
     * @param {MsEventData} e
     */
    Battle.prototype.sendEventNotify = function (e) {
        var data = e.data;
        var userID = data.srcUserID;
        this.messageParse(userID, data.cpProto);
    };
    /**
     * 退出按钮
     * @param e
     */
    Battle.prototype.btnExitClick = function (e) {
        mvs.MsEngine.getInstance.leaveRoom("不想玩了");
    };
    /**
     * 自己离开房间通知
     * @param e
     */
    Battle.prototype.leaveRoomResponse = function (e) {
        var data = e.data;
        this.release();
        StageManage.getInstance.SwitchScreen(Lobby);
    };
    /**
     * 其他玩家离开房间 通知
     * @param e
     */
    Battle.prototype.leaveRoomNotify = function (e) {
        var data = e.data;
        this.gameOver();
        // let tableID:number = 0;
        // this._myPlayer.isOwner = (data.owner === this._myPlayer.userID);
        // this._playerList.forEach((p)=>{
        //     if(data.userId == p.userID){
        //         tableID = p.tableID;
        //     }
        // });
        // this["img_header"+tableID].skin = "";
    };
    /**
     * 释放对象
     */
    Battle.prototype.release = function () {
        Laya.timer.clearAll(this);
        this.removeMvsListener();
    };
    /**
     * 设置帧同步回调
     * @param e
     */
    Battle.prototype.setFrameSyncResponse = function (e) {
        var data = e.data;
        if (data.status == 200) {
            console.info("帧同步设置成功！");
        }
        else {
            console.info("帧同步设置失败！");
        }
    };
    /**
     * 帧同步更新
     * @param e
     */
    Battle.prototype.frameUpdate = function (e) {
        var data = e.data;
        for (var i = 0; i < data.frameItems.length; i++) {
            //获取数据项
            var info = data.frameItems[i];
            var userID = info.srcUserID;
            if (userID !== GameData.myUser.userID) {
                this.messageParse(userID, info.cpProto);
            }
        }
    };
    /**
     * 其他玩家断线
     * @param e
     */
    Battle.prototype.networkStateNotify = function (e) {
        var data = e.data;
        var userID = data.userID;
        var tableID = 0;
        this._playerList.forEach(function (p) {
            if (data.userID == p.userID) {
                tableID = p.tableID;
            }
        });
        console.info("房主：", data.owner, "我自己：", this._myPlayer.userID);
        if (data.owner == this._myPlayer.userID) {
            this._myPlayer.isOwner = true;
        }
        if (data.state == 1) {
            console.info("玩家断开:" + userID);
            this["name_Player" + tableID].text = "该玩家掉线啦";
        }
        else if (data.state == 2) {
            console.info("玩家正在从新连接..." + userID);
        }
        else {
            console.info("玩家离开" + userID);
            this["img_header" + tableID].skin = "";
            this.gameOver();
        }
    };
    return Battle;
}(ui.BattleUI));
//# sourceMappingURL=Battle.js.map