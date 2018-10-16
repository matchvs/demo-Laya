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
/**
 * 对 MatchvsResponse 回调接口 进行封装，使用 事件触发的机制 对消息进行处理，调用者只需要在使用的时候接受该事件消息，然后释放即可
 */
var mvs;
(function (mvs) {
    //import laya.display.Sprite;
    var Sprite = Laya.Sprite;
    var MsResponse = /** @class */ (function (_super) {
        __extends(MsResponse, _super);
        function MsResponse() {
            var _this = _super.call(this) || this;
            _this._response = null; //Matchvs 引擎
            _this.registResponseCall();
            return _this;
        }
        Object.defineProperty(MsResponse, "getInstance", {
            /**
             * 获取实例
             */
            get: function () {
                if (MsResponse._instance == null) {
                    MsResponse._instance = new MsResponse();
                }
                return MsResponse._instance;
            },
            enumerable: true,
            configurable: true
        });
        MsResponse.release = function () {
            MsResponse._instance._response = null;
            MsResponse._instance = null;
        };
        /**
         * 获取引擎回调
         */
        MsResponse.prototype.getResponse = function () {
            if (this._response == null) {
                this.registResponseCall();
            }
            return this._response;
        };
        /**
         * MatchvsResponse 接口回调的重新注册
         */
        MsResponse.prototype.registResponseCall = function () {
            this._response = new MatchvsResponse();
            this._response.initResponse = this.initResponse.bind(this);
            this._response.registerUserResponse = this.registerUserResponse.bind(this);
            this._response.loginResponse = this.loginResponse.bind(this);
            this._response.joinRoomResponse = this.joinRoomResponse.bind(this);
            this._response.joinRoomNotify = this.joinRoomNotify.bind(this);
            this._response.createRoomResponse = this.createRoomResponse.bind(this);
            this._response.sendEventResponse = this.sendEventResponse.bind(this);
            this._response.sendEventNotify = this.sendEventNotify.bind(this);
            this._response.gameServerNotify = this.gameServerNotify.bind(this);
            this._response.joinOverResponse = this.joinOverResponse.bind(this);
            this._response.joinOverNotify = this.joinOverNotify.bind(this);
            this._response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
            this._response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
            this._response.networkStateNotify = this.networkStateNotify.bind(this);
            this._response.setFrameSyncResponse = this.setFrameSyncResponse.bind(this);
            this._response.frameUpdate = this.frameUpdate.bind(this);
            this._response.errorResponse = this.errorResponse.bind(this);
            this._response.logoutResponse = this.logOutResponse.bind(this);
            // this._response.joinOpenResponse = this.joinOpenResponse.bind(this);
            // this._response.joinOpenNotify = this.joinOpenNotify.bind(this);
            // //踢人回调
            this._response.kickPlayerNotify = this.kickPlayerNotify.bind(this);
            this._response.kickPlayerResponse = this.kickPlayerResponse.bind(this);
            // //设置房间属性回调
            this._response.setRoomPropertyNotify = this.setRoomPropertyNotify.bind(this);
            this._response.setRoomPropertyResponse = this.setRoomPropertyResponse.bind(this);
            // // 获取房间详细信息回调
            this._response.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
            // //获取房间列表 扩展 接口回调
            this._response.getRoomListExResponse = this.getRoomListExResponse.bind(this);
            // //获取房间列表接口回调
            // this._response.getRoomListResponse = this.getRoomListResponse.bind(this);
            this._response.reconnectResponse = this.reconnectResponse.bind(this);
        };
        /**
         * 初始化回调
         */
        MsResponse.prototype.initResponse = function (status) {
            console.info("initResponse status：", status);
            this.event(mvs.MsEvent.EVENT_INIT_RSP, new mvs.MsEventData({ status: status }));
        };
        /**
         * 注册回调
         */
        MsResponse.prototype.registerUserResponse = function (userInfo) {
            console.info("registerUserResponse userInfo ", JSON.stringify(userInfo));
            this.event(mvs.MsEvent.EVENT_REGISTERUSER_RSP, new mvs.MsEventData(userInfo));
        };
        /**
         * 登录回调
         */
        MsResponse.prototype.loginResponse = function (login) {
            console.info("[loginResponse] " + JSON.stringify(login));
            this.event(mvs.MsEvent.EVENT_LOGIN_RSP, new mvs.MsEventData(login));
        };
        /**
         * 加入房间回调
         */
        MsResponse.prototype.joinRoomResponse = function (status, roomUserInfoList, roomInfo) {
            if (status == 200) {
                var data = {
                    status: status,
                    userList: roomUserInfoList,
                    roomInfo: roomInfo
                };
                this.event(mvs.MsEvent.EVENT_JOINROOM_RSP, new mvs.MsEventData(data));
                return;
            }
            console.error("[joinRoomResponse error:]", status);
            return;
        };
        /**
         * 加入房间异步回调 发送 event 事件
         */
        MsResponse.prototype.joinRoomNotify = function (roomUserInfo) {
            console.info("[joinRoomNotify] " + roomUserInfo.userProfile);
            var data = {
                userId: roomUserInfo.userId,
                userProfile: roomUserInfo.userProfile
            };
            this.event(mvs.MsEvent.EVENT_JOINROOM_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 创建房间回调
         */
        MsResponse.prototype.createRoomResponse = function (rsp) {
            console.info("[sendEventResponse]" + JSON.stringify(rsp));
            var data = {
                status: rsp.status,
                roomID: rsp.roomID,
                owner: rsp.owner,
            };
            this.event(mvs.MsEvent.EVENT_CREATEROOM_RSP, new mvs.MsEventData(data));
        };
        /**
         * 发送消息回调
         */
        MsResponse.prototype.sendEventResponse = function (rsp) {
            //console.info("[sendEventResponse]"+JSON.stringify(rsp));
            var data = {
                status: rsp.status,
                sequence: rsp.sequence
            };
            this.event(mvs.MsEvent.EVENT_SENDEVENT_RSP, new mvs.MsEventData(data));
        };
        /**
         * 发送消息异步回调
         */
        MsResponse.prototype.sendEventNotify = function (eventInfo) {
            //console.info("[sendEventNotify] "+JSON.stringify(eventInfo));
            var data = {
                srcUserID: eventInfo.srcUserId,
                cpProto: eventInfo.cpProto
            };
            this.event(mvs.MsEvent.EVENT_SENDEVENT_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 收到 gameServe 消息回调 srcUserId = 0
         */
        MsResponse.prototype.gameServerNotify = function (eventInfo) {
            console.info("[gameServerNotify] ");
            var data = {
                srcUserId: eventInfo.srcUserId,
                cpProto: eventInfo.cpProto
            };
            this.event(mvs.MsEvent.EVENT_GAMESERVER_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 关闭房间回调 并发送 Event 事件
         */
        MsResponse.prototype.joinOverResponse = function (rsp) {
            console.info("[joinOverResponse] " + JSON.stringify(rsp));
            var data = { status: rsp.status, cpProto: rsp.cpProto };
            this.event(mvs.MsEvent.EVENT_JOINOVER_RSP, new mvs.MsEventData(data));
        };
        /**
         * 关闭房间异步回调 并发送 Event 事件
         */
        MsResponse.prototype.joinOverNotify = function (Info) {
            console.info("[joinOverNotify] ");
            var data = { roomID: Info.roomID, userID: Info.srcUserID, cpProto: Info.cpProto };
            this.event(mvs.MsEvent.EVENT_JOINOVER_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 自己离开房间回调
         */
        MsResponse.prototype.leaveRoomResponse = function (rsp) {
            console.info("[leaveRoomResponse] status: " + rsp.status);
            var data = {
                roomID: rsp.roomID,
                status: rsp.status,
                userId: rsp.userId,
                cpProto: rsp.cpProto
            };
            this.event(mvs.MsEvent.EVENT_LEAVEROOM_RSP, new mvs.MsEventData(data));
        };
        /**
         * 他人离开房间回调
         */
        MsResponse.prototype.leaveRoomNotify = function (leaveRoomInfo) {
            console.info("[leaveRoomNotify] " + leaveRoomInfo.userId);
            var data = {
                roomID: leaveRoomInfo.roomID,
                userId: leaveRoomInfo.userId,
                owner: leaveRoomInfo.owner,
                cpProto: leaveRoomInfo.cpProto
            };
            this.event(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 其他玩家网络状态回调
         */
        MsResponse.prototype.networkStateNotify = function (netnotify) {
            console.info("[networkStateNotify] state: " + netnotify.state);
            var data = {
                roomID: netnotify.roomID,
                userID: netnotify.userID,
                owner: netnotify.owner,
                state: netnotify.state
            };
            this.event(mvs.MsEvent.EVENT_NETWORKSTATE_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 设置帧同步回调
         */
        MsResponse.prototype.setFrameSyncResponse = function (rsp) {
            //console.info("[setFrameSyncResponse] "+JSON.stringify(rsp));
            var data = {
                status: rsp.mStatus
            };
            this.event(mvs.MsEvent.EVENT_SETFRAMESYNC_RSP, new mvs.MsEventData(data));
        };
        /**
         * 更新帧数据
         */
        MsResponse.prototype.frameUpdate = function (fd) {
            var data = {
                frameIndex: fd.frameIndex,
                frameItems: fd.frameItems,
                frameWaitCount: fd.frameWaitCount,
            };
            this.event(mvs.MsEvent.EVENT_FRAMEUPDATE, new mvs.MsEventData(data));
        };
        /**
         * 有错误发生的时候 错误回调
         */
        MsResponse.prototype.errorResponse = function (errCode, errMsg) {
            console.info("[errorResponse] errCode:" + errCode + " errMsg:" + errMsg);
            if (errCode == 1001) {
                if (errMsg != "" && errMsg.indexOf("hotel") >= 0) {
                    errCode = 1002; //这里自定义把hotel断开改为 1002
                }
            }
            var data = {
                errCode: errCode,
                errMsg: errMsg
            };
            this.event(mvs.MsEvent.EVENT_ERROR_RSP, new mvs.MsEventData(data));
        };
        /**
         * 登出回调
         */
        MsResponse.prototype.logOutResponse = function (status) {
            console.info("[logOutResponse] status:", status);
            var data = {
                status: status
            };
            this.event(mvs.MsEvent.EVENT_LOGOUT_RSP, new mvs.MsEventData(data));
        };
        // /**
        //  * 自己打开房间回调
        //  */
        // private joinOpenResponse(info:MsReopenRoomResponse){
        // 	console.info("[joinOpenResponse] info:", info.status);
        // 	let data = {
        // 		status:info.status,
        // 		cpProto:info.cpProto,
        // 	};
        // 	this.dispatchEvent(new egret.Event(MsEvent.EVENT_JOINOPEN_RSP, false, false, data));
        // }
        // /**
        //  * 他人打开房间回调
        //  */
        // private joinOpenNotify(info:MsReopenRoomNotify){
        // 	console.info("[joinOpenResponse] info:");
        // 	let data = {
        // 		roomID:info.roomID,
        // 		userID:info.userID,
        // 		cpProto:info.cpProto,
        // 	};
        // 	this.dispatchEvent(new egret.Event(MsEvent.EVENT_JOINOPEN_RSP, false, false, data));
        // }
        MsResponse.prototype.kickPlayerNotify = function (knotify) {
            console.info("[kickPlayerNotify] info:");
            var data = {
                cpProto: knotify.cpProto,
                owner: knotify.owner,
                srcUserId: knotify.srcUserId,
                userID: knotify.userId
            };
            this.event(mvs.MsEvent.EVENT_KICKPLAYER_NTFY, new mvs.MsEventData(data));
        };
        MsResponse.prototype.kickPlayerResponse = function (rsp) {
            console.info("[kickPlayerResponse] info:" + rsp.status);
            var data = {
                owner: rsp.owner,
                userID: rsp.userID,
                status: rsp.status
            };
            if (rsp.status == 400) {
                return;
            }
            this.event(mvs.MsEvent.EVENT_KICKPLAYER_RSP, new mvs.MsEventData(data));
        };
        /**
         * 设置房间属性 异步 回调
         */
        MsResponse.prototype.setRoomPropertyNotify = function (notify) {
            console.info("[setRoomPropertyNotify] info:");
            var data = {
                roomID: notify.roomID,
                userID: notify.userID,
                roomProperty: notify.roomProperty
            };
            this.event(mvs.MsEvent.EVENT_SETROOMPROPERTY_NTFY, new mvs.MsEventData(data));
        };
        /**
         * 设置房间属性回调
         */
        MsResponse.prototype.setRoomPropertyResponse = function (rsp) {
            console.info("[setRoomPropertyResponse] info:", rsp.status);
            var data = {
                roomID: rsp.roomID,
                userID: rsp.userID,
                roomProperty: rsp.roomProperty,
                status: rsp.status
            };
            this.event(mvs.MsEvent.EVENT_SETROOMPROPERTY_RSP, new mvs.MsEventData(data));
        };
        /**
         * 获取房间详细信息回调
         */
        MsResponse.prototype.getRoomDetailResponse = function (rsp) {
            console.info("[getRoomDetailResponse] info:", rsp.status);
            var data = {
                canWatch: rsp.canWatch,
                createFlag: rsp.createFlag,
                maxPlayer: rsp.maxPlayer,
                mode: rsp.mode,
                owner: rsp.owner,
                roomProperty: rsp.roomProperty,
                state: rsp.state,
                status: rsp.status,
                userInfos: rsp.userInfos
            };
            this.event(mvs.MsEvent.EVENT_GETROOMDETAIL_RSP, new mvs.MsEventData(data));
        };
        /**
         * 获取房间列表 扩展接口 回调
         */
        MsResponse.prototype.getRoomListExResponse = function (rsp) {
            //console.info("[getRoomListExResponse] info:",rsp.status);
            var data = {
                roomAttrs: rsp.roomAttrs,
                status: rsp.status,
                total: rsp.total
            };
            this.event(mvs.MsEvent.EVENT_GETROOMLIST_EX_RSP, new mvs.MsEventData(data));
        };
        // /**
        //  * 获取房间列表接口回调(信息较少推进使用 getRoomListEx)
        //  */
        // private getRoomListResponse(status:number, roomInfos:Array<MsRoomInfoEx>){
        // 	console.info("[getRoomListResponse] info:", status );
        // 	let data = {
        // 		status : status,
        // 		roomInfos : roomInfos
        // 	};
        // 	this.dispatchEvent(new egret.Event(MsEvent.EVENT_GETROOMLIST_RSP, false, false, data));
        // }
        /**
         * 断线重新连接回调
         */
        MsResponse.prototype.reconnectResponse = function (status, roomUserInfoList, roomInfo) {
            console.info("[reconnectResponse] info:", status);
            var data = {
                status: status,
                roomUserInfoList: roomUserInfoList,
                roomInfo: roomInfo
            };
            this.event(mvs.MsEvent.EVENT_RECONNECT_RSP, new mvs.MsEventData(data));
        };
        MsResponse._instance = null;
        return MsResponse;
    }(Sprite));
    mvs.MsResponse = MsResponse;
})(mvs || (mvs = {}));
//# sourceMappingURL=MsResponse.js.map