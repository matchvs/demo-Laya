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
/*
* name;
*/
var ReConnect = /** @class */ (function (_super) {
    __extends(ReConnect, _super);
    function ReConnect() {
        var _this = _super.call(this) || this;
        // 重连次数
        _this.connTotal = 5;
        _this.connNum = 0;
        _this.playerList = []; //匹配到的用户列表
        _this.actions = {};
        _this.initView();
        return _this;
    }
    /**
     * 初始化界面
     */
    ReConnect.prototype.initView = function () {
        this.btn_cancel.on(Laya.Event.CLICK, this, this.btnCancelEvent);
        this.btn_ok.on(Laya.Event.CLICK, this, this.btnOkEvent);
        this.onMvsListen();
    };
    /**
     * 打开监听 matchvs
     */
    ReConnect.prototype.onMvsListen = function () {
        ErrorNote.getInstance.addListen(this);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_RECONNECT_RSP, this, this.reconnectResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_RSP, this, this.sendEventResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_NTFY, this, this.sendEventNotify);
        // mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_GETROOMDETAIL_RSP,this, this.getRoomDetailResponse);
    };
    /**
     * 关闭监听 matchvs
     */
    ReConnect.prototype.offMvsListen = function () {
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_RECONNECT_RSP, this, this.reconnectResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_RSP, this, this.sendEventResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_NTFY, this, this.sendEventNotify);
        // mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_GETROOMDETAIL_RSP,this, this.getRoomDetailResponse);
    };
    /**
     *
     * @param e 取消
     */
    ReConnect.prototype.btnCancelEvent = function (e) {
        this.release();
        StageManage.getInstance.SwitchScreen(Lobby);
    };
    ReConnect.prototype.btnOkEvent = function (e) {
        this.btn_ok.visible = false;
        Laya.Tween.to(this.btn_cancel, { x: 568 }, 1000);
        this.img_loading.visible = true;
        this.txt_message.text = "准备重连";
        Laya.timer.frameLoop(1, this, this.animate);
        Laya.timer.loop(1000, this, this.reconnect);
    };
    /**
     * 加载动画
     * @param e
     */
    ReConnect.prototype.animate = function (e) {
        this.img_loading.rotation += 5;
    };
    /**
     * 重连
     */
    ReConnect.prototype.reconnect = function () {
        this.connNum++;
        this.txt_message.text = "正在重连..." + this.connNum + "/" + this.connTotal;
        if (this.connNum > this.connTotal) {
            this.release();
            console.info("重新连接失败，回到大厅界面！");
            StageManage.getInstance.SwitchScreen(Lobby);
        }
        var res = mvs.MsEngine.getInstance.reconnect();
        if (res != 0) {
            console.info("重连失败！");
        }
    };
    /**
     * 重连事件
     * @param e
     */
    ReConnect.prototype.reconnectResponse = function (e) {
        var data = e.data;
        var userList = data.roomUserInfoList.length; //房间玩家列表
        Laya.timer.clearAll(this);
        console.info("重连房间返回数据：", data);
        if (data.status == 200) {
            if (data.roomInfo.state == 2) {
                console.info("重连进入房间成功!");
                this.reconnectSuccess(data.roomInfo.roomID);
            }
            else {
                this.txt_message.text = "游戏已经结束，请返回到大厅..." + data.status;
            }
        }
        else {
            this.txt_message.text = "重连失败请返回到大厅..." + data.status;
            console.info("重连失败");
        }
    };
    /**
     * 添加玩家
     * @param id
     * @param name
     * @param avatar
     * @param tableID
     * @param owner
     */
    ReConnect.prototype.addPlayerList = function (id, name, avatar, tableID, owner) {
        if (owner === void 0) { owner = false; }
        var play = new Player();
        play.userID = id;
        play.name = name;
        play.avatar = avatar;
        play.tableID = tableID;
        play.isOwner = owner;
        this.playerList.push(play);
        return play;
    };
    /**
     * 重连成功
     */
    ReConnect.prototype.reconnectSuccess = function (roomID) {
        // this.txt_message.text = "正在查询房间状态...";
        //重连成功需要查看房间状态
        // mvs.MsEngine.getInstance.getRoomDetail(roomID);
        this.senOkMsgToOther();
    };
    /**
     *
     */
    ReConnect.prototype.release = function () {
        this.offMvsListen();
        Laya.timer.clearAll(this);
    };
    ReConnect.prototype.sendEventResponse = function (e) {
        var rsp = e.data;
        console.info("发送重连通知" + rsp.status);
    };
    /**
     * 确认是否收到 重连确认消息
     * @param e
     */
    ReConnect.prototype.sendEventNotify = function (e) {
        var data = e.data.cpProto;
        if (data !== "" && data.indexOf("action") >= 0) {
            var info = JSON.parse(data);
            //收到确认消息
            if (info.action === GameData.MSG_ACTION.RECONNECT_ACK) {
                this.offMvsListen();
                console.info("收到重连消息确认", data);
                if ("userList" in info) {
                    var userlist = info.userList;
                    this.playerList = [];
                    //先添加自己
                    this.addPlayerList(GameData.myUser.userID, GameData.myUser.name, GameData.myUser.avatar, 1);
                    this.playerList[0].score = info.score;
                    //再一次取出用户信息
                    for (var i = 0; i < userlist.length; i++) {
                        if (userlist[i].userID !== GameData.myUser.userID) {
                            this.addPlayerList(userlist[i].userID, userlist[i].name, userlist[i].avatar, i + 2);
                        }
                    }
                    //开始游戏
                    this.startGame(info.type, info.time);
                }
            }
        }
    };
    /**
     * 开始游戏
     * @param type 游戏类型，标记是不是帧同步模式
     * @param time 重连开始游戏时剩余时间值
     */
    ReConnect.prototype.startGame = function (type, time) {
        this.release();
        if (this.playerList.length === GameData.maxPlayerNum) {
            //开始游戏
            StageManage.getInstance.ToBattle(this.playerList, Boolean(type), time);
        }
        else {
            //跳到大厅
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    };
    /**
     * 发送链接成功消息，
     */
    ReConnect.prototype.senOkMsgToOther = function () {
        this.txt_message.text = "等待同步游戏信息...";
        var event = {
            action: GameData.MSG_ACTION.RECONNECT_OK
        };
        //发送消息告诉其他玩家OK
        var res = mvs.MsEngine.getInstance.sendEvent(JSON.stringify(event));
        if (!res || res.result !== 0) {
            this.txt_message.text = "同步游戏信息...失败，请取消";
            console.log('重连发送信息失败');
        }
    };
    return ReConnect;
}(ui.ReConnectUI));
//# sourceMappingURL=ReConnect.js.map