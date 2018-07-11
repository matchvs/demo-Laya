/*
* name;
*/
// class RoomItem extends Laya.Box{
//     public static WID: number = 373;
//     public static HEI: number = 85;
//     private img:Laya.Image;
//     constructor(){
//         super();
//         this.size(RoomItem.WID, RoomItem.HEI);
//             this.img = new Laya.Image();
//             this.addChild(this.img);
//     }
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
//     public setImg(src: string): void {
//         this.img.skin = src;
//     }
// }
var RoomItem = /** @class */ (function (_super) {
    __extends(RoomItem, _super);
    function RoomItem() {
        var _this = _super.call(this) || this;
        _this.size(RoomItem.WID, RoomItem.HEI);
        _this.img = new Laya.Image();
        _this.addChild(_this.img);
        return _this;
    }
    RoomItem.prototype.setImg = function (src) {
        this.img.skin = src;
    };
    RoomItem.WID = 373;
    RoomItem.HEI = 85;
    return RoomItem;
}(ui.RoomItemUI));
//# sourceMappingURL=RoomItem.js.map