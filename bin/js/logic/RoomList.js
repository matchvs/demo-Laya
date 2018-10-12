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
var RoomList = /** @class */ (function (_super) {
    __extends(RoomList, _super);
    function RoomList() {
        var _this = _super.call(this) || this;
        _this.listBtns = [
            _this.btn_exit,
        ];
        _this.init();
        return _this;
    }
    RoomList.prototype.init = function () {
        //给按钮添加缩放效果
        for (var _i = 0, _a = this.listBtns; _i < _a.length; _i++) {
            var button = _a[_i];
            var buttons = [button.name];
            this.addMouseOverEvent(button);
            this.addMouseOutEvent(button);
        }
        this.btn_exit.on(Laya.Event.CLICK, this, this.exitClick);
        /**
         * 添加 matchvs 事件监听
         */
        this.addMvsListener();
        this.txt_title.text = "正在获取房间列表...";
        //list 控件初始化
        this.initList();
        //定时查询房间列表
        Laya.timer.loop(2000, this, this.getRoomListInfo);
    };
    RoomList.prototype.initList = function () {
        this.list_roomItems.vScrollBarSkin = "";
        this.list_roomItems.visible = false;
        //选择单元格时回调方法
        this.list_roomItems.selectHandler = new Handler(this, this.onSelect);
        //渲染单元格时的回调方法
        this.list_roomItems.renderHandler = new Handler(this, this.updateItem);
        //可点击
        //this.list_roomItems.selectEnable = true;
        this.list_roomItems.scrollBar.hide = true; //隐藏列表的滚动条。
        this.list_roomItems.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
        this.list_roomItems.scrollBar.elasticDistance = 50; //设置橡皮筋极限距离
    };
    RoomList.prototype.onSelect = function (index) {
        console.log("当前选择的索引：" + index);
    };
    /**
     * 鼠标进入到按钮，按钮效果
     * @param button
     */
    RoomList.prototype.addMouseOverEvent = function (button) {
        button.on(Laya.Event.MOUSE_OVER, button, function () {
            button.scale(0.8, 0.8);
        });
    };
    /**
     * 鼠标离开到按钮，按钮效果
     * @param button
     */
    RoomList.prototype.addMouseOutEvent = function (button) {
        button.on(Laya.Event.MOUSE_OUT, button, function () {
            button.scale(1, 1);
        });
    };
    /**
    * 打开 matchvs 事件监听
    */
    RoomList.prototype.addMvsListener = function () {
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_GETROOMLIST_EX_RSP, this, this.getRoomListExResponse);
    };
    /**
     * 移除 matchvs 事件监听
     */
    RoomList.prototype.removeMvsListener = function () {
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINROOM_RSP, this, this.getRoomListExResponse);
    };
    /**
     * 获取房间列表
     */
    RoomList.prototype.getRoomListInfo = function () {
        var filter = new MsRoomFilterEx(GameData.createRoomInfo.maxPlayer, GameData.createRoomInfo.mode, GameData.createRoomInfo.canWatch, GameData.createRoomInfo.roomProperty, 0, 1, 0, 0, 0, 3);
        mvs.MsEngine.getInstance.getRoomListEx(filter);
    };
    RoomList.prototype.setListItemsInfo = function (data) {
        // this.list_roomItems.removeChildren();
        this.list_roomItems.visible = true;
        this.list_roomItems.repeatY = data.length;
        this.list_roomItems.array = data;
    };
    /**
     * 获取房间列表 返回事件
     * @param e
     */
    RoomList.prototype.getRoomListExResponse = function (e) {
        var data = e.data;
        //console.info("获取房间列表：",data.total);
        var roomlist = data.roomAttrs;
        if (roomlist.length > 0) {
            this.txt_title.text = "当前房间数量：" + roomlist.length;
            var data_1 = [];
            roomlist.forEach(function (item) {
                var stateStr = item.state === 1 ? "开放" : "关闭";
                var mapValue = item.roomProperty === GameData.roomPropertyType.mapA ? "[地图：彩图]" : "[地图：灰图]";
                var other = "[房间人数：" + item.gamePlayer + "/" + item.maxPlayer + "] [房间状态:" + stateStr + "] [房间地图:" + mapValue + "]";
                data_1.push({ txt_roomID: item.roomID, txt_otherInfo: other });
            });
            this.setListItemsInfo(data_1);
        }
        else {
            this.txt_title.text = "当前没有房间";
        }
    };
    //
    RoomList.prototype.updateItem = function (cell, index) {
        if (index > this.list_roomItems.array.length) {
            return;
        }
        var data = this.list_roomItems.array[index];
        //console.info("房间列表项数据", data,cell);
        var btn = cell.getChildByName("btn_entRoom");
        btn.off(Laya.Event.CLICK, this, this.enterRoomEvent);
        btn.on(Laya.Event.CLICK, this, this.enterRoomEvent, [data.txt_roomID]);
    };
    /**
     * 进入房间
     * @param roomID
     * @param a
     */
    RoomList.prototype.enterRoomEvent = function (roomID, a) {
        this.release();
        StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHROOMID, roomID);
    };
    RoomList.prototype.exitClick = function (e) {
        this.release();
        StageManage.getInstance.SwitchScreen(Lobby);
    };
    RoomList.prototype.release = function () {
        this.removeMvsListener();
        Laya.timer.clearAll(this);
    };
    return RoomList;
}(ui.RoomListUI));
//# sourceMappingURL=RoomList.js.map