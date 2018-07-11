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
var ErrorNote = /** @class */ (function (_super) {
    __extends(ErrorNote, _super);
    function ErrorNote() {
        var _this = _super.call(this) || this;
        _this.gatewayErr = false;
        /**
         * 监听错误回调函数
         */
        _this.errCall = [];
        /**
         * 点击按钮回调
         */
        _this.btnCall = _this.defaultBack;
        _this.init();
        return _this;
    }
    ErrorNote.prototype.init = function () {
        this.errMap = new mvs.MsError();
        this.txt_Message.text = "";
        this.btn_Return.on(Laya.Event.CLICK, this, this.btnReturnClick);
    };
    ErrorNote.prototype.errCallMap = function () {
        this.errCall[1001] = this.err1001;
        this.errCall[1002] = this.err1002;
    };
    ErrorNote.prototype.setBtnBack = function (back) {
        this.btnCall = back;
    };
    Object.defineProperty(ErrorNote, "getInstance", {
        get: function () {
            if (!this._instance) {
                this._instance = new ErrorNote;
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ErrorNote.prototype.delListen = function () {
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_ERROR_RSP, this, this.errorResponse);
    };
    /**
     * 默认返回到登录界面
     */
    ErrorNote.prototype.defaultBack = function () {
        this.delListen();
        mvs.MsEngine.getInstance.logOut();
        StageManage.getInstance.SwitchScreen(Login);
    };
    /**
     *
     * @param caller 监听错误者， 当前监听错误的页面
     * @param toback 错误回调函数
     */
    ErrorNote.prototype.addListen = function (caller) {
        this.currnPage = caller;
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_ERROR_RSP, this, this.errorResponse);
    };
    /**
     * 显示错误信息
     */
    ErrorNote.prototype.showErrMsg = function (code, msg, caller, back) {
        if (caller) {
            this.currnPage = caller;
            this.currnPage.addChild(this);
        }
        this.showNoteInfo(code, msg);
        if (back) {
            this.btnCall = back;
        }
    };
    ErrorNote.prototype.showNoteInfo = function (code, msg) {
        if (this.currnPage) {
            this.currnPage.addChild(this);
        }
        else {
            Laya.stage.removeChildren();
            Laya.stage.addChild(this);
        }
        var errmsg = this.errMap.getErrMsg(code);
        if (!errmsg) {
            errmsg = msg || "有点小错误！";
        }
        this.txt_Message.text = errmsg;
    };
    /**
     *
     * @param e
     */
    ErrorNote.prototype.btnReturnClick = function (dt, e) {
        //this._toBack();
        this.delListen();
        if (this.currnPage["release"] && typeof (this.currnPage.release) == "function") {
            console.info("释放页面");
            this.currnPage.release();
        }
        if (this.btnCall) {
            this.btnCall(dt);
        }
        else {
            this.defaultBack();
        }
    };
    /**
     * 监听到错误
     * @param e
     */
    ErrorNote.prototype.errorResponse = function (e) {
        var code = e.data.errCode;
        var msg = e.data.errMsg;
        this.showNoteInfo(code, msg);
        if (this.errCall[code]) {
            this.btnCall = this.errCall[code];
        }
        else {
            this.btnCall = this.defaultBack;
        }
    };
    ErrorNote.prototype.err1001 = function () {
        this.gatewayErr = true;
        StageManage.getInstance.SwitchScreen(Login);
    };
    ErrorNote.prototype.err1002 = function () {
        if (this.gatewayErr) {
            StageManage.getInstance.SwitchScreen(Login);
        }
        else {
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    };
    ErrorNote._instance = null;
    return ErrorNote;
}(ui.WarningUI));
//# sourceMappingURL=ErrorNote.js.map