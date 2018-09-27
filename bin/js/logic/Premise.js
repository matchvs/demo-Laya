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
var Premise = /** @class */ (function (_super) {
    __extends(Premise, _super);
    function Premise() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Premise.prototype.init = function () {
        this.txt_endPoint.text = MsConfig.preEndPoint;
        this.txt_gameID.text = MsConfig.preGameID.toString();
        this.txt_appKey.text = MsConfig.preAppKey;
        this.txt_secretKey.text = MsConfig.preSecretKey;
        this.txt_userID.text = "123456";
        this.txt_token.text = "OEWIURIOJNUOGIUDSF809LJOKETGT89H";
        this.addMvsListener();
        this.btn_ok.on(Laya.Event.CLICK, this, this.btnOkClick);
    };
    /**
    * 打开 matchvs 事件监听
    */
    Premise.prototype.addMvsListener = function () {
        // 初始化监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        // 登录 监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LOGIN_RSP, this, this.loginResponse);
    };
    /**
     * 移除 matchvs 事件监听
     */
    Premise.prototype.removeMvsListener = function () {
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LOGIN_RSP, this, this.loginResponse);
    };
    /**
     * 初始化回调
     * @param event
     */
    Premise.prototype.initResponse = function (event) {
        console.info("初始化回调：", event.data.status);
        if (event.data.status == 200) {
            //注册用户
            console.info("初始化成功！");
            GameData.myUser.userID = Number(this.txt_userID.text);
            GameData.myUser.token = this.txt_token.text;
            var res = mvs.MsEngine.getInstance.login(GameData.myUser.userID, GameData.myUser.token, MsConfig.preGameID, MsConfig.appKey, MsConfig.secretKey);
            if (res != 0) {
                console.log("登录失败：", res);
            }
        }
        else {
            console.info("初始化失败！");
        }
    };
    /**
     * 登录回调
     * @param event
     */
    Premise.prototype.loginResponse = function (event) {
        var data = event.data;
        if (data.status == 200) {
            this.removeMvsListener();
            if (data.roomID !== "0") {
                console.info("登录成功！可以重新连接:" + data.roomID);
                StageManage.getInstance.SwitchScreen(ReConnect);
            }
            else {
                console.info("登录成功！跳到大厅");
                //这里页面跳转
                StageManage.getInstance.ToLobby();
            }
        }
        else {
            console.info("登录失败！");
        }
    };
    Premise.prototype.btnOkClick = function (e) {
        mvs.MsEngine.getInstance.premiseInit(this.txt_endPoint.text, Number(this.txt_gameID.text));
    };
    return Premise;
}(ui.PremiseUI));
//# sourceMappingURL=Premise.js.map