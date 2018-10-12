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
var match = ui.MatchUI;
var Match = /** @class */ (function (_super) {
    __extends(Match, _super);
    function Match() {
        var _this = _super.call(this) || this;
        _this.listBtns = [
            _this.btn_cancel,
            _this.btn_kick1,
            _this.btn_kick2,
            _this.btn_kick3,
        ];
        _this._roomID = "";
        _this.matchFlag = false; //是否匹配成功
        _this.playerList = []; //匹配到的用户列表
        _this.isOwner = false;
        _this.joinFlag = 1;
        _this.timerNum = 3;
        _this.init();
        return _this;
    }
    Match.prototype.init = function () {
        for (var _i = 0, _a = this.listBtns; _i < _a.length; _i++) {
            var button = _a[_i];
            var buttons = [button.name];
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
    };
    /**
     * 打开 matchvs 事件监听
     */
    Match.prototype.addMvsListener = function () {
        // this.errorNote.addListen(this);
        ErrorNote.getInstance.addListen(this);
        //加入房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINROOM_RSP, this, this.joinRoomRsp);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINROOM_NTFY, this, this.joinRoomNotify);
        //离开房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_RSP, this, this.leaveRoomRsp);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this, this.leaveRoomNotify);
        //关闭房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINOVER_RSP, this, this.joinOverRsp);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_JOINOVER_NTFY, this, this.joinOverNotify);
        //创建房间事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_CREATEROOM_RSP, this, this.createRoomResponse);
        //踢人事件
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_KICKPLAYER_RSP, this, this.kickPlayerResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_KICKPLAYER_NTFY, this, this.kickPlayerNotify);
        //设置帧同步
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);
    };
    /**
     * 移除 matchvs 事件监听
     */
    Match.prototype.removeMvsListener = function () {
        // this.errorNote.addListen(this);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINROOM_RSP, this, this.joinRoomRsp);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINROOM_NTFY, this, this.joinRoomNotify);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_RSP, this, this.leaveRoomRsp);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this, this.leaveRoomNotify);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINOVER_RSP, this, this.joinOverRsp);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINOVER_NTFY, this, this.joinOverNotify);
        //创建房间事件
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_CREATEROOM_RSP, this, this.createRoomResponse);
        //踢人事件
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_KICKPLAYER_RSP, this, this.kickPlayerResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_KICKPLAYER_NTFY, this, this.kickPlayerNotify);
        //设置帧同步
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, this, this.networkStateNotify);
    };
    Match.prototype.release = function () {
        this.removeMvsListener();
        Laya.timer.clearAll(this);
    };
    /**
     * 鼠标进入到按钮，按钮效果
     * @param button
     */
    Match.prototype.addMouseOverEvent = function (button) {
        button.on(Laya.Event.MOUSE_OVER, button, function () {
            button.scale(0.8, 0.8);
        });
    };
    /**
     * 鼠标离开到按钮，按钮效果
     * @param button
     */
    Match.prototype.addMouseOutEvent = function (button) {
        button.on(Laya.Event.MOUSE_OUT, button, function () {
            button.scale(1, 1);
        });
    };
    Match.prototype.joinRoom = function (flag, info) {
        this.joinFlag = flag;
        if (flag == 1) {
            /**
             * 随机加入房间
             */
            this.joinRandRoom();
        }
        else if (flag == 2) {
            this.createRoom();
        }
        else if (flag == 3) {
            this.joinWithRoomID(info);
        }
        else if (flag == 4) {
            this.joinRoomWithPro(info);
        }
    };
    /**
     * 随机加入房间
     */
    Match.prototype.joinRandRoom = function () {
        var userPro = JSON.stringify({ name: GameData.myUser.name, avatar: GameData.myUser.avatar });
        mvs.MsEngine.getInstance.joinRandomRoom(GameData.maxPlayerNum, userPro);
    };
    /**
     * 主动创建房间
     */
    Match.prototype.createRoom = function () {
        var userPro = JSON.stringify({ name: GameData.myUser.name, avatar: GameData.myUser.avatar });
        mvs.MsEngine.getInstance.createRoom(GameData.createRoomInfo, userPro);
    };
    /**
     * 加入指定房间
     * @param roomID
     */
    Match.prototype.joinWithRoomID = function (roomID) {
        var userPro = JSON.stringify({ name: GameData.myUser.name, avatar: GameData.myUser.avatar });
        mvs.MsEngine.getInstance.joinRoom(roomID, userPro);
    };
    /**
     * 属性匹配
     * @param tags
     */
    Match.prototype.joinRoomWithPro = function (tags) {
        var userPro = JSON.stringify({ name: GameData.myUser.name, avatar: GameData.myUser.avatar });
        var matchinfo = new MsMatchInfo(GameData.maxPlayerNum, GameData.mode, GameData.canWatch, tags);
        mvs.MsEngine.getInstance.joinRoomWithProperties(matchinfo, userPro);
    };
    /**
     *
     * @param id
     * @param name
     * @param avator
     * @param tableID
     */
    Match.prototype.addPlayerList = function (id, name, avatar, tableID, owner) {
        if (owner === void 0) { owner = false; }
        var play = new Player();
        play.userID = id;
        play.name = name;
        play.avatar = avatar;
        play.tableID = tableID;
        play.isOwner = owner;
        this.playerList.push(play);
        this.showPlayer(play);
        return play;
    };
    /**
     * 删除用户列表
     * @param id
     */
    Match.prototype.delPlayerList = function (id) {
        var player = new Player();
        var arr = [];
        for (var i = 0; i < this.playerList.length; i++) {
            if (this.playerList[i].userID == id) {
                player.userID = this.playerList[i].userID;
                player.avatar = this.playerList[i].avatar;
                player.name = this.playerList[i].name;
                player.tableID = this.playerList[i].tableID;
                this.playerList.splice(i, 1);
                this.wipePlayer(player);
            }
        }
    };
    /**
     * 擦除用户信息
     * @param player
     */
    Match.prototype.wipePlayer = function (player) {
        var tableID = player.tableID;
        if (tableID == 1) {
            this.name_Player1.text = "";
            this.img_Player1.visible = false;
            this.name_Player2.text = "";
            this.img_Player2.visible = false;
            this.name_Player3.text = "";
            this.img_Player3.visible = false;
            this.btn_kick1.visible = false;
            this.btn_kick2.visible = false;
            this.btn_kick3.visible = false;
        }
        else if (tableID == 2) {
            this.name_Player2.text = "";
            this.img_Player2.visible = false;
            this.name_Player3.text = "";
            this.img_Player3.visible = false;
            this.btn_kick2.visible = false;
            this.btn_kick3.visible = false;
        }
        else if (tableID == 3) {
            this.name_Player3.text = "";
            this.img_Player3.visible = false;
            this.btn_kick3.visible = false;
        }
        this.img_OwnerFlag1.visible = false;
        this.img_OwnerFlag2.visible = false;
        this.img_OwnerFlag3.visible = false;
    };
    /**
     * 显示用户信息
     * @param player
     */
    Match.prototype.showPlayer = function (player) {
        var tableID = player.tableID;
        this.chk_FrameSysc.visible = this.isOwner;
        if (this.joinFlag == Match.JOINFLAG.CREATEROOM || this.joinFlag == Match.JOINFLAG.WITHROOMID) {
            this.loadMatch.visible = false;
            this["img_OwnerFlag" + 1].visible = this.isOwner;
            if (tableID == 2 || tableID == 3) {
                this["btn_kick" + tableID].visible = this.isOwner;
            }
        }
        if (tableID == 1) {
            this.img_Player1.skin = player.avatar;
            this.name_Player1.text = player.name;
            this.img_Player1.visible = true;
        }
        else if (tableID == 2) {
            this.img_Player2.skin = player.avatar;
            this.name_Player2.text = player.name;
            this.img_Player2.visible = true;
        }
        else if (tableID == 3) {
            this.img_Player3.skin = player.avatar;
            this.name_Player3.text = player.name;
            this.img_Player3.visible = true;
        }
    };
    /**
     * 加载动画
     * @param e
     */
    Match.prototype.animate = function (e) {
        this.loadMatch.rotation += 5;
    };
    /**
     * 取消按钮
     * @param e
     */
    Match.prototype.btnCancelClick = function (e) {
        this.btn_cancel.off(Laya.Event.CLICK, this, this.btnCancelClick);
        console.info("取消匹配！");
        if (this.matchFlag) {
            var res = mvs.MsEngine.getInstance.leaveRoom("不想玩了");
            if (res != 0) {
                this.removeMvsListener();
                StageManage.getInstance.SwitchScreen(Lobby);
            }
        }
        else {
            this.removeMvsListener();
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    };
    /**
     * 显示其他玩家 加入房间 信息
     * @param userID
     * @param tableID
     * @param userProfile
     */
    Match.prototype.otherJoinShowInfo = function (userID, tableID, userProfile, owner) {
        if (owner === void 0) { owner = false; }
        if (userProfile && userProfile !== "") {
            var name_1 = "";
            var avatar = "";
            var userInfo = JSON.parse(userProfile);
            if (userInfo.name) {
                name_1 = userInfo.name;
            }
            if (userInfo.avatar) {
                avatar = userInfo.avatar;
            }
            this.addPlayerList(userID, name_1, avatar, tableID, owner);
        }
    };
    /**
     * 加入房间 事件 回调
     * @param e
     */
    Match.prototype.joinRoomRsp = function (e) {
        var data = e.data;
        if (data.status == 200) {
            var tableID = 1;
            //房主
            if (data.roomInfo.ownerId == GameData.myUser.userID) {
                this.isOwner = true;
            }
            else {
                this.isOwner = false;
            }
            //显示我自己的信息
            this.addPlayerList(GameData.myUser.userID, GameData.myUser.name, GameData.myUser.avatar, tableID, this.isOwner);
            if (this.joinFlag == Match.JOINFLAG.WITHROOMID) {
                this.match_title.text = "房间号：" + data.roomInfo.roomID;
            }
            else {
                this.match_title.text = "匹配成功——等待其他人...";
            }
            this._roomID = data.roomInfo.roomID;
            this.matchFlag = true;
            //如果房间有其他人就显示别人信息
            var userList = data.userList;
            for (var i = 0; i < userList.length; i++) {
                tableID++;
                this.otherJoinShowInfo(userList[i].userId, tableID, userList[i].userProfile, data.roomInfo.ownerId == userList[i].userId);
            }
            this.checkStart();
        }
        else {
            console.info("加入房间失败", data);
        }
    };
    /**
     * 其他玩家加入房间
     * @param e
     */
    Match.prototype.joinRoomNotify = function (e) {
        var data = e.data;
        var userID = data.userId;
        var tableID = this.playerList.length + 1;
        this.otherJoinShowInfo(data.userId, tableID, data.userProfile, data.userId == data.owner);
        this.checkStart();
    };
    /**
     * 离开房间
     * @param e
     */
    Match.prototype.leaveRoomRsp = function (e) {
        var data = e.data;
        if (data.status == 200) {
            this.removeMvsListener();
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    };
    Match.prototype.leaveRoomNotify = function (e) {
        var data = e.data;
        console.info("玩家离开", data);
        var userID = data.userId;
        /**
         * 是否房主有变动，有变动的话就转移房主
         */
        if (data.owner == GameData.myUser.userID) {
            this.isOwner = true;
        }
        else {
            this.isOwner = false;
        }
        //删除该用户
        this.delPlayerList(userID);
        for (var i = 0; i < this.playerList.length; i++) {
            if (data.owner == this.playerList[i].userID) {
                this.playerList[i].isOwner = true;
            }
            else {
                this.playerList[i].isOwner = false;
            }
            //重置用户位置并重新显示
            this.playerList[i].tableID = i + 1;
            this.showPlayer(this.playerList[i]);
        }
    };
    Match.prototype.checkStart = function () {
        console.info("房间人数：" + this.playerList.length);
        if (this.playerList.length == GameData.maxPlayerNum) {
            console.info("可以开始游戏");
            Laya.timer.loop(1000, this, this.countDown);
        }
    };
    /**
     * 倒计时开始游戏
     */
    Match.prototype.countDown = function () {
        this.btn_cancel.visible = false;
        console.info("倒计时：" + this.timerNum);
        this.match_title.text = this.timerNum.toString();
        this.timerNum--;
        if (this.timerNum < 0 && this.playerList.length == GameData.maxPlayerNum) {
            if (this.isOwner) {
                mvs.MsEngine.getInstance.joinOver("人满开始游戏");
            }
            Laya.timer.clearAll(this);
        }
        else {
            console.info("倒计时中当前人数：", this.playerList.length);
        }
    };
    Match.prototype.joinOverRsp = function (e) {
        var data = e.data;
        console.info("房主关闭房间" + data);
        this.startBattle();
    };
    Match.prototype.joinOverNotify = function (e) {
        console.info("房主关闭房间" + e.data);
        this.startBattle();
    };
    /**
     * 开始游戏
     */
    Match.prototype.startBattle = function () {
        console.info("开始游戏");
        this.removeMvsListener();
        StageManage.getInstance.ToBattle(this.playerList, this.chk_FrameSysc.selected, { roomID: this._roomID });
    };
    Match.prototype.cancelStart = function (userID, roomID) {
        this.btn_cancel.visible = true;
        this.timerNum = 3;
        //取消倒计时
        Laya.timer.clear(this, this.countDown);
        if (this.joinFlag == Match.JOINFLAG.WITHROOMID || this.joinFlag == Match.JOINFLAG.CREATEROOM) {
            this.match_title.text = "房间号：" + roomID;
        }
        else {
            this.match_title.text = "匹配成功——等待其他人...";
        }
    };
    /**
     * 创建房间回调
     */
    Match.prototype.createRoomResponse = function (e) {
        var data = e.data;
        if (data.status == 200) {
            var tableID = 1;
            //房主
            if (data.owner == GameData.myUser.userID) {
                this.isOwner = true;
            }
            else {
                this.isOwner = false;
            }
            //显示我自己的信息
            this.addPlayerList(GameData.myUser.userID, GameData.myUser.name, GameData.myUser.avatar, tableID, this.isOwner);
            this.match_title.text = "房间号：" + data.roomID;
            this._roomID = data.roomID;
            this.matchFlag = true;
        }
        else {
            console.info("加入房间失败", data);
        }
    };
    Match.prototype.btnKickPlayerClick = function (e) {
        var tableid = 0;
        if (e.target.name == "btn_kick2") {
            tableid = 2;
        }
        else if (e.target.name == "btn_kick3") {
            tableid = 3;
        }
        var user = this.getUserForTableID(tableid);
        if (user == null) {
            console.info("用户不存在");
            return;
        }
        mvs.MsEngine.getInstance.kickPlayer(user.userID, "我们不能一起好好的玩游戏");
    };
    Match.prototype.getUserForTableID = function (tableid) {
        var user = null;
        this.playerList.forEach(function (p) {
            if (p.tableID == tableid) {
                user = p;
            }
        });
        return user;
    };
    /**
     * 剔除指定房间成功
     * @param e
     */
    Match.prototype.kickPlayerResponse = function (e) {
        var data = e.data;
        this.cancelStart(data.userID, this._roomID);
        this.wipePlayerLocation(data.userID, data.owner);
    };
    /**
     * 擦除用户，再次显示用户
     * @param userID
     * @param owner
     */
    Match.prototype.wipePlayerLocation = function (userID, owner) {
        this.delPlayerList(userID);
        this.isOwner = owner == GameData.myUser.userID;
        for (var i = 0; i < this.playerList.length; i++) {
            if (owner == this.playerList[i].userID) {
                this.playerList[i].isOwner = true;
            }
            else {
                this.playerList[i].isOwner = false;
            }
            //重置用户位置并重新显示
            this.playerList[i].tableID = i + 1;
            this.showPlayer(this.playerList[i]);
        }
    };
    /**
     * 有玩家被剔除
     * @param e
     */
    Match.prototype.kickPlayerNotify = function (e) {
        var data = e.data;
        console.info("玩家离开", data);
        if (data.userID == GameData.myUser.userID) {
            this.removeMvsListener();
            StageManage.getInstance.SwitchScreen(Lobby);
        }
        else {
            this.cancelStart(data.userID, this._roomID);
            this.wipePlayerLocation(data.userID, data.owner);
        }
    };
    /**
     * 有人断开
     */
    Match.prototype.networkStateNotify = function (e) {
        var data = e.data;
        var userID = data.userID;
        this.timerNum = 3;
        this.cancelStart(userID, data.roomID);
        if (data.state = 1) {
            console.info("玩家断开:" + userID);
            mvs.MsEngine.getInstance.kickPlayer(userID, "玩家断线踢掉");
        }
        else if (data.state == 2) {
            console.info("玩家正在从新连接..." + userID);
        }
        else {
            console.info("玩家离开" + userID);
            this.wipePlayerLocation(data.userID, data.owner);
        }
    };
    Match.JOINFLAG = {
        RANDROOM: 1,
        CREATEROOM: 2,
        WITHROOMID: 3,
        WITHPROPERTY: 4
    };
    return Match;
}(ui.MatchUI));
//# sourceMappingURL=Match.js.map