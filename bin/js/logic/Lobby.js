/*
* name;
*/
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
var lobby = ui.LobbyUI;
var Lobby = /** @class */ (function (_super) {
    __extends(Lobby, _super);
    function Lobby() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Lobby.prototype.init = function () {
        this.img_header.skin = GameData.myUser.avatar;
        this.name_head.text = GameData.myUser.userID + ":" + GameData.myUser.name;
        console.info("单击按钮监听");
        this.btn_randMatch.on(Laya.Event.CLICK, this, this.btnRandMatchClick);
        this.btn_createRoom.on(Laya.Event.CLICK, this, this.btnCreateRoomClick);
        this.btn_joinWithProperty.on(Laya.Event.CLICK, this, this.btnJoinWithPropertyClick);
        this.btn_geRoomList.on(Laya.Event.CLICK, this, this.btnJoinWithRoomIDClick);
        this.btn_exit.on(Laya.Event.CLICK, this, this.btnExitClick);
        ErrorNote.getInstance.addListen(this);
    };
    /**
     * 打开 matchvs 事件监听
     */
    Lobby.prototype.addMvsListener = function () {
        ErrorNote.getInstance.addListen(this);
    };
    /**
     * 移除 matchvs 事件监听
     */
    Lobby.prototype.removeMvsListener = function () {
    };
    /**
     * 随机匹配
     * @param e
     */
    Lobby.prototype.btnRandMatchClick = function (e) {
        console.info("点击随机匹配！");
        this.mouseEnabled = false;
        // StageManage.getInstance.SwitchScreen(Match);
        StageManage.getInstance.ToMatch(Match.JOINFLAG.RANDROOM);
    };
    Lobby.prototype.btnJoinWithPropertyClick = function (e) {
        this.mouseEnabled = false;
        StageManage.getInstance.SwitchScreen(MatchPro);
        // StageManage.getInstance.SwitchScreen(Match);
        // StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHPROPERTY);
    };
    Lobby.prototype.btnCreateRoomClick = function (e) {
        this.mouseEnabled = false;
        // StageManage.getInstance.SwitchScreen(Match);
        StageManage.getInstance.ToMatch(Match.JOINFLAG.CREATEROOM);
    };
    Lobby.prototype.btnJoinWithRoomIDClick = function (e) {
        this.mouseEnabled = false;
        StageManage.getInstance.SwitchScreen(RoomList);
        // StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHROOMID);
    };
    /**
     * 退出
     * @param e
     */
    Lobby.prototype.btnExitClick = function (e) {
        mvs.MsEngine.getInstance.logOut();
        StageManage.getInstance.SwitchScreen(Login);
    };
    return Lobby;
}(ui.LobbyUI));
//# sourceMappingURL=Lobby.js.map