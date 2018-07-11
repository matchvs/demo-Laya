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
var game = ui.LoginUI;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Login.prototype.init = function () {
        this.txtGameID.text = MsConfig.gameID.toString();
        this.txtAppkey.text = MsConfig.appKey;
        this.txtSecretKey.text = MsConfig.secretKey;
        //按钮监听事件
        this.btn_ok.on(Laya.Event.CLICK, this, this.btnOkClick);
        this.btn_clear.on(Laya.Event.CLICK, this, this.btnClearClick);
        this.addMvsListener();
    };
    /**
     * 打开 matchvs 事件监听
     */
    Login.prototype.addMvsListener = function () {
        // 初始化监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        // 注册监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_REGISTERUSER_RSP, this, this.registUserResponse);
        // 登录 监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LOGIN_RSP, this, this.loginResponse);
    };
    /**
     * 移除 matchvs 事件监听
     */
    Login.prototype.removeMvsListener = function () {
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_REGISTERUSER_RSP, this, this.registUserResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LOGIN_RSP, this, this.loginResponse);
    };
    Login.prototype.btnOkClick = function (e) {
        this.setMsConfigInfo();
        mvs.MsEngine.getInstance.init(MsConfig.channel, MsConfig.platfrom, MsConfig.gameID);
    };
    Login.prototype.btnClearClick = function () {
        console.info("清理缓存的用户信息");
        LocalStore_Clear();
    };
    /**
     * 初始化事件监听
     * @param {mvs.MsEventData} event
     */
    Login.prototype.initResponse = function (event) {
        console.info("初始化回调：", event.data.status);
        if (event.data.status == 200) {
            //注册用户
            mvs.MsEngine.getInstance.registerUser();
        }
        else {
            console.info("初始化失败！");
        }
    };
    /**
     * set matchvs 初始化需要的信息
     */
    Login.prototype.setMsConfigInfo = function () {
        MsConfig.gameID = Number(this.txtGameID.text);
        MsConfig.appKey = this.txtAppkey.text;
        MsConfig.secretKey = this.txtSecretKey.text;
        if (this.radio_sel.selectedIndex == 1) {
            MsConfig.platfrom = MsConfig.PLATFROM_TYPE.rel;
        }
        else {
            MsConfig.platfrom = MsConfig.PLATFROM_TYPE.alp;
        }
    };
    /**
     * 获取到用户信息后 设置一下用户信息
     */
    Login.prototype.setUserInfo = function (info) {
        GameData.myUser.userID = info.id;
        GameData.myUser.name = info.name;
        GameData.myUser.token = info.token;
        GameData.myUser.avatar = info.avatar;
    };
    /**
     * 注册用户失败
     * @param event
     */
    Login.prototype.registUserResponse = function (event) {
        var data = event.data;
        console.info("注册成功：", event);
        if (data.status == 0) {
            this.setUserInfo(data);
            //登录
            mvs.MsEngine.getInstance.login(GameData.myUser.userID, GameData.myUser.token, MsConfig.gameID, MsConfig.appKey, MsConfig.secretKey);
        }
        else {
            console.info("注册用户：", data);
        }
        return;
    };
    Login.prototype.loginResponse = function (event) {
        var data = event.data;
        if (data.status == 200) {
            this.removeMvsListener();
            console.info("登录成功！");
            //这里页面跳转
            this.removeSelf();
            StageManage.getInstance.ToLobby();
            // StageManage.getInstance.SwitchScreen(RoomList);
        }
        else {
            console.info("登录失败！");
        }
    };
    return Login;
}(ui.LoginUI));
//# sourceMappingURL=Login.js.map