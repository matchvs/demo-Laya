/*
* name;
*/
var mvs;
(function (mvs) {
    var MsError = /** @class */ (function () {
        function MsError() {
            //错误码集合
            this._errMap = [];
            this.init();
        }
        MsError.prototype.init = function () {
            this._errMap[1001] = "您的【游戏】连接断开, 需要重新登录...";
            this._errMap[1002] = "您的【房间】连接断开, 请重开游戏...";
            this._errMap[406] = "房间已经关闭...";
            this._errMap[405] = "房间人已经满了...";
            this._errMap[404] = "找不到您要的信息...";
            this._errMap[500] = "游戏服务器错误...";
            this._errMap[402] = "用户信息验证错误...";
            this._errMap[-2] = "未初始化";
            this._errMap[-6] = "已经在房间";
        };
        /**
         * 添加错误说明
         * @param code
         * @param msg
         */
        MsError.prototype.addErrMsg = function (code, msg) {
            this._errMap[code] = msg;
        };
        MsError.prototype.getErrMsg = function (code) {
            return this._errMap[code];
        };
        return MsError;
    }());
    mvs.MsError = MsError;
})(mvs || (mvs = {}));
//# sourceMappingURL=MsError.js.map