import WebGL = Laya.WebGL;
import Loader = laya.net.Loader;
import Handler = laya.utils.Handler;

//实例UI界面

// 程序入口
class GameMain{
    constructor()
    {
        Laya.MiniAdpter.init();
        Laya.init(1134,640, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        //激活资源版本控制
        // Laya.ResourceVersion.enable("version.json", Handler.create(null, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
        Laya.loader.load(["res/atlas/mvs.atlas","res/atlas/mvs/role.atlas", GameData.battleBgimgUrl], Handler.create(this, this.onLoaded));
        
    }

    // private beginLoad(){
    //     //加载资源
    //     Laya.loader.load(["res/atlas/mvs.atlas","res/atlas/mvs/role.atlas", GameData.battleBgimgUrl], Handler.create(this, this.onLoaded));
    // }

    private  onLoaded():void 
    {
        //实例UI界面
        let login:Login = new Login();
        //添加UI界面到舞台
        Laya.stage.addChild(login);
    }
}
new GameMain();