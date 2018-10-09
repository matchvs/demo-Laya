/*
* name;
*/
var StageManage = /** @class */ (function () {
    function StageManage() {
    }
    Object.defineProperty(StageManage, "getInstance", {
        get: function () {
            if (StageManage._instance == null) {
                StageManage._instance = new StageManage();
            }
            return StageManage._instance;
        },
        enumerable: true,
        configurable: true
    });
    StageManage.prototype.ToLogin = function () {
        Laya.stage.removeChildren();
        var login = new Login();
        Laya.stage.addChild(login);
    };
    StageManage.prototype.ToLobby = function () {
        Laya.stage.removeChildren();
        var lobby = new Lobby();
        Laya.stage.addChild(lobby);
    };
    StageManage.prototype.ToMatch = function (flag, info) {
        Laya.stage.removeChildren();
        var match = new Match();
        Laya.stage.addChild(match);
        match.joinRoom(flag, info);
    };
    StageManage.prototype.SwitchScreen = function (screen, info) {
        Laya.stage.removeChildren();
        var s = new screen();
        Laya.stage.addChild(s);
    };
    StageManage.prototype.ToBattle = function (players, isFrameSync, obj, time) {
        var bt = new Battle();
        bt.setOtherInfo(obj);
        if (time) {
            bt.setGameTime(time);
        }
        if (bt.setPlayes(players) == 0) {
            if (isFrameSync) {
                //打开帧同步功能
                bt.openFrameSync(10);
            }
            Laya.stage.removeChildren();
            Laya.stage.addChild(bt);
        }
    };
    /**
     *
     * @param players
     */
    StageManage.prototype.ToResult = function (players, obj, flag) {
        Laya.stage.removeChildren();
        var res = new Result(players, obj, flag);
        Laya.stage.addChild(res);
    };
    StageManage._instance = null;
    return StageManage;
}());
//# sourceMappingURL=StageManage.js.map