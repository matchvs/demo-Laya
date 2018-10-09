var WebGL = Laya.WebGL;
var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
//实例UI界面
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        Laya.init(1280, 720, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        Laya.loader.load(["res/atlas/mvs.atlas", "res/atlas/mvs/role.atlas", GameData.battleBgimgUrl], Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        //实例UI界面
        var login = new Login();
        //添加UI界面到舞台
        Laya.stage.addChild(login);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map