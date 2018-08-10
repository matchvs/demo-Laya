var mvs;
(function (mvs) {
    /**
     * 这个是 matchvs 引擎 接口封装模块，对引擎的所有请求接口进行了二次封装，一些接口调用的参数可以在这里组合
     */
    var MsEngine = /** @class */ (function () {
        function MsEngine() {
            this._engine = null; //Matchvs 引擎
            this._engine = new MatchvsEngine();
        }
        Object.defineProperty(MsEngine, "getInstance", {
            /**
             * 获取类实例
             */
            get: function () {
                if (MsEngine._instance == null) {
                    MsEngine._instance = new MsEngine();
                }
                return MsEngine._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         * @param {string} channel
         * @param {string} platform
         * @param {number} gameID
         */
        MsEngine.prototype.init = function (channel, platform, gameID) {
            var res = this._engine.init(mvs.MsResponse.getInstance.getResponse(), channel, platform, gameID);
            if (res !== 200) {
                console.info("[MsEngine init failed] resCode:", res);
                return res;
            }
            console.info("[MsEngine init seccess] resCode:", res);
            return res;
        };
        /**
         * 独立部署的初始化
         */
        MsEngine.prototype.premiseInit = function (endPoint, gameID) {
            var res = this._engine.premiseInit(mvs.MsResponse.getInstance.getResponse(), endPoint, gameID);
            if (res !== 0) {
                console.info("[MsEngine premiseInit failed] resCode:", res);
                return res;
            }
            console.info("[MsEngine premiseInit seccess] resCode:", res);
            return res;
        };
        /**
         * 用户登录
         * @param {number} userID 用户ID
         * @param {string} token 用户token 注册时生成的
         * @param {number} gameID 游戏ID
         * @param {string} appkey 游戏 appkey
         * @param {string} secretkey 游戏 secretkey
         */
        MsEngine.prototype.login = function (userID, token, gameID, appkey, secretkey) {
            var res = this._engine.login(userID, token, gameID, 1, appkey, secretkey, "eglejjddg", 0);
            console.info("[MsEngine login] resCode:", res);
            return res;
        };
        /**
         * 注册用户
         * @returns {number} 0-接口调用成功
         */
        MsEngine.prototype.registerUser = function () {
            var res = this._engine.registerUser();
            if (res !== 0) {
                console.error("[MsEngine registerUser failed] resCode:", res);
                return res;
            }
            console.info("[MsEngine registerUser seccess] resCode:", res);
            return res;
        };
        /**
         * 随机加入房间
         * @param {number} maxPlayer 最大人数
         * @param {string} userProfile 附带数据，默认指定 ""
         * @returns {number}
         */
        MsEngine.prototype.joinRandomRoom = function (maxPlayer, userProfile) {
            var res = this._engine.joinRandomRoom(maxPlayer, userProfile);
            console.info("[MsEngine joinRandomRoom ] resCode:", res);
            return res;
        };
        /**
         * 属性加入房间
         * @param {MsMatchInfo} matchinfo
         * @param {string} userProfile 附带数据，默认指定 ""
         * @returns {number}
         */
        MsEngine.prototype.joinRoomWithProperties = function (matchinfo, userProfile) {
            var res = this._engine.joinRoomWithProperties(matchinfo, userProfile);
            console.info("[MsEngine joinRandomRoom ] resCode:", res);
            return res;
        };
        /**
         * 指定房间号加入房间
         */
        MsEngine.prototype.joinRoom = function (roomID, userProfile) {
            var res = this._engine.joinRoom(roomID, userProfile);
            console.info("[MsEngine joinRoom ] resCode:", res);
            return res;
        };
        /**
         * 创建房间
         * @param {MsCreateRoomInfo} createRoomInfo 房间信息
         * @param {string} userProfile 附带数据，默认指定
         * @returns {number}
         */
        MsEngine.prototype.createRoom = function (createRoomInfo, userProfile) {
            var res = this._engine.createRoom(createRoomInfo, userProfile);
            console.info("[MsEngine createRoom ] resCode:", res, JSON.stringify(createRoomInfo), userProfile);
            return res;
        };
        /**
         * 禁止加入房间
         * @param {string} cpProto 禁止加入房间附带的数据
         * @returns {number}
         */
        MsEngine.prototype.joinOver = function (cpProto) {
            var res = this._engine.joinOver(cpProto);
            console.info("[MsEngine joinOver ] resCode:", res);
            return res;
        };
        /**
         * 设置允许房间加人
         * @param {number} cpProto
         * @returns {number}
         */
        MsEngine.prototype.joinOpen = function (cpProto) {
            var res = this._engine.joinOpen(cpProto);
            console.info("[MsEngine joinOpen ] resCode:", res);
            return res;
        };
        /**
         * 离开房间
         * @param {string} cpProto 离开房间附带的数据
         * @returns {number}
         */
        MsEngine.prototype.leaveRoom = function (cpProto) {
            var res = this._engine.leaveRoom(cpProto);
            console.info("[MsEngine leaveRoom ] resCode:", res);
            return res;
        };
        /**
         * 发送消息
         * @param {string} data 		发送的数据
         */
        MsEngine.prototype.sendEvent = function (data) {
            var res = this._engine.sendEvent(data);
            //console.info("[MsEngine sendEvent ] resCode:",JSON.stringify(res));
            return res;
        };
        /**
         * 发送消息的扩展，
         * @param {number} msgType          0-包含destUids  1-排除destUids
         * @param {string} data             要发送的数据
         * @param {number} desttype         0-客户端+not CPS  1-not客户端+ CPS   2-客户端 + CPS
         * @param {Array<number>} userids   玩家ID集合 [1,2,3,4,5]
         * @returns {{sequence: number, result: number}}
        */
        MsEngine.prototype.sendEventEx = function (msgType, data, desttype, userids) {
            var res = this._engine.sendEventEx(msgType, data, desttype, userids);
            //console.info("[MsEngine sendEventEx ] resCode:",JSON.stringify(res));
            return res;
        };
        /**
         *
         * @param {string} cpProto
         * @returns {number}
         */
        MsEngine.prototype.sendFrameEvent = function (cpProto) {
            var res = this._engine.sendFrameEvent(cpProto);
            console.info("[MsEngine sendFrameEvent ] resCode:", res);
            return res;
        };
        /**
         * frameRate ex:10/s . = 0 is off,>0 is on.
         * @param {number} frameRate
         * @returns {number}
         */
        MsEngine.prototype.setFrameSync = function (frameRate) {
            var res = this._engine.setFrameSync(frameRate);
            console.info("[MsEngine setFrameSync ] resCode:", res);
            return res;
        };
        /**
         * 退出登录
         * @param {number} cpProto
         * @returns {number}
         */
        MsEngine.prototype.logOut = function () {
            var res = this._engine.logout("退出登录");
            console.info("[MsEngine setFrameSync ] resCode:", res);
            return res;
        };
        /**
         *
         * @param {number} userID 被踢者用户ID
         * @param {string} cpProto 踢人附带的消息
         * @returns {number}
         */
        MsEngine.prototype.kickPlayer = function (userID, cpProto) {
            var res = this._engine.kickPlayer(userID, cpProto);
            console.info("[MsEngine kickPlayer ] resCode:", res);
            return res;
        };
        /**
         * 获取房间详细信息
         * @param {string} roomID
         * @returns {number}
         */
        MsEngine.prototype.getRoomDetail = function (roomID) {
            var res = this._engine.getRoomDetail(roomID);
            console.info("[MsEngine getRoomDetail ] resCode:", res);
            return res;
        };
        /**
         * 获取房间列表信息
         * @param {MsRoomFilter} filter
         * @returns {number}
         */
        MsEngine.prototype.getRoomList = function (filter) {
            var res = this._engine.getRoomList(filter);
            console.info("[MsEngine getRoomList ] resCode:", res);
            return res;
        };
        /**
         * 获取房间列表扩展接口
         * @param {MsRoomFilterEx} filter
         * @returns {number}
         */
        MsEngine.prototype.getRoomListEx = function (filter) {
            var res = this._engine.getRoomListEx(filter);
            console.info("[MsEngine getRoomListEx ] resCode:", res);
            return res;
        };
        /**
         * 设置房间属性
         * @param {string} roomID
         * @param {string} roomProperty
         * @returns {number}
         */
        MsEngine.prototype.setRoomProperty = function (roomID, roomProperty) {
            var res = this._engine.setRoomProperty(roomID, roomProperty);
            console.info("[MsEngine setRoomProperty ] resCode:", res);
            return res;
        };
        /**
         * 断线重连
         * @returns {number}
         */
        MsEngine.prototype.reconnect = function () {
            var res = this._engine.reconnect();
            console.info("[MsEngine reconnect ]", res);
            return res;
        };
        MsEngine._instance = null;
        return MsEngine;
    }());
    mvs.MsEngine = MsEngine;
})(mvs || (mvs = {}));
//# sourceMappingURL=MsEngine.js.map