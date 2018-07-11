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
var MatchPro = /** @class */ (function (_super) {
    __extends(MatchPro, _super);
    function MatchPro() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    MatchPro.prototype.initView = function () {
        this.btn_exit.on(Laya.Event.CLICK, this, this.btnExitClick);
        this.btn_ok.on(Laya.Event.CLICK, this, this.btnOkClick);
        ErrorNote.getInstance.addListen(this);
    };
    /**
     *
     * @param e
     */
    MatchPro.prototype.btnOkClick = function (e) {
        var map = GameData.roomPropertyType.mapA;
        if (this.radio_groupMap.selectedIndex == 1) {
            map = GameData.roomPropertyType.mapB;
        }
        StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHPROPERTY, map);
    };
    /**
     *
     * @param e
     */
    MatchPro.prototype.btnExitClick = function (e) {
        StageManage.getInstance.SwitchScreen(Lobby);
    };
    return MatchPro;
}(ui.MatchProUI));
//# sourceMappingURL=MatchPro.js.map