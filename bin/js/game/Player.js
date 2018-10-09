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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(_id, _name, _ava, _token) {
        var _this = _super.call(this, _id, _name, _ava, _token) || this;
        _this.tableID = 0;
        _this.isOwner = false;
        _this.score = 0;
        _this.roomID = "";
        return _this;
    }
    return Player;
}(GUser));
//# sourceMappingURL=Player.js.map