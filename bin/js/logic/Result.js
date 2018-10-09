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
var Result = /** @class */ (function (_super) {
    __extends(Result, _super);
    function Result(userList, obj, flag) {
        var _this = _super.call(this) || this;
        _this.playerList = [];
        _this.roomID = "";
        if ("roomID" in obj) {
            _this.roomID = obj.roomID;
        }
        _this.initView(userList);
        return _this;
    }
    Result.prototype.initView = function (userList) {
        this.btn_exit.on(Laya.Event.CLICK, this, this.btnExitClick);
        this.addPlayerList(userList);
        ErrorNote.getInstance.addListen(this);
        this.showInfo();
    };
    Result.prototype.addPlayerList = function (userList) {
        var _this = this;
        userList.forEach(function (p) {
            var user = new Player();
            user.avatar = p.avatar;
            user.isOwner = p.isOwner;
            user.name = p.name;
            user.score = p.score;
            user.userID = p.userID;
            _this.playerList.push(user);
        });
        this.scoreSort();
    };
    Result.prototype.scoreSort = function () {
        this.playerList.sort(function (a, b) {
            return a.score > b.score ? -1 : 1;
        });
    };
    Result.prototype.showInfo = function () {
        this.txt_roomID.text = "房间号：" + this.roomID;
        for (var i = 0; i < this.playerList.length; i++) {
            var name_1 = this.playerList[i].name == "" ? this.playerList[i].userID : this.playerList[i].name;
            this["name_player" + i].text = name_1 + " 分数[" + this.playerList[i].score + "]";
            this["img_Player" + i].skin = this.playerList[i].avatar;
        }
    };
    Result.prototype.btnExitClick = function (e) {
        StageManage.getInstance.SwitchScreen(Lobby);
    };
    return Result;
}(ui.ResultUI));
//# sourceMappingURL=Result.js.map