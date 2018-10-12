/*
* name;
*/
class RoomList extends ui.RoomListUI{
    private listBtns: Array<Laya.Button> =  [
        this.btn_exit,
        //this.btn_entRoom,
    ];
    constructor(){
        super();
        this.init();
    }


    private init(){

        //给按钮添加缩放效果
        for (var button of this.listBtns) {
            let buttons: Array<string> = [button.name]
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
    }


    private initList(){
        this.list_roomItems.vScrollBarSkin = "";
        this.list_roomItems.visible = false;

        //选择单元格时回调方法
        this.list_roomItems.selectHandler = new Handler(this, this.onSelect);
        //渲染单元格时的回调方法
        this.list_roomItems.renderHandler = new Handler(this, this.updateItem);
        //可点击
        //this.list_roomItems.selectEnable = true;
        this.list_roomItems.scrollBar.hide = true;//隐藏列表的滚动条。
        this.list_roomItems.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.list_roomItems.scrollBar.elasticDistance = 50;//设置橡皮筋极限距离
    }

    private onSelect(index: number): void {
        console.log("当前选择的索引：" + index);
    }

    /**
     * 鼠标进入到按钮，按钮效果
     * @param button 
     */
    private addMouseOverEvent(button: Laya.Button) {
        button.on(Laya.Event.MOUSE_OVER, button, function() {
            button.scale(0.8, 0.8);
        });
    }

    /**
     * 鼠标离开到按钮，按钮效果
     * @param button 
     */
    private addMouseOutEvent(button: Laya.Button) {
        button.on(Laya.Event.MOUSE_OUT, button, function() {
            button.scale(1, 1);
        });
    }

     /**
     * 打开 matchvs 事件监听
     */
    private addMvsListener(){

        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_GETROOMLIST_EX_RSP,this, this.getRoomListExResponse);

    }

    /**
     * 移除 matchvs 事件监听
     */
    private removeMvsListener(){
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_JOINROOM_RSP,this, this.getRoomListExResponse);
    }

    /**
     * 获取房间列表
     */
    private getRoomListInfo(){
        let filter = new MsRoomFilterEx(GameData.createRoomInfo.maxPlayer,
        GameData.createRoomInfo.mode,
        GameData.createRoomInfo.canWatch,
        GameData.createRoomInfo.roomProperty, 0, 1, 0, 0, 0, 3);
        mvs.MsEngine.getInstance.getRoomListEx(filter);
    }

    private setListItemsInfo(data:Array<any>){
        // this.list_roomItems.removeChildren();
        this.list_roomItems.visible = true;
        this.list_roomItems.repeatY = data.length;
        this.list_roomItems.array = data;
    }

    /**
     * 获取房间列表 返回事件
     * @param e 
     */
    private getRoomListExResponse(e:mvs.MsEventData){
        let data = e.data;
        //console.info("获取房间列表：",data.total);
        let roomlist:Array<any> = data.roomAttrs;
        if(roomlist.length > 0){
            this.txt_title.text = "当前房间数量："+ roomlist.length;
            let data:Array<any> = [];
            roomlist.forEach((item)=>{
                let stateStr:string = item.state === 1 ? "开放":"关闭";
                let mapValue:string =item.roomProperty === GameData.roomPropertyType.mapA ? "[地图：彩图]":"[地图：灰图]";
                let other:string = "[房间人数："+item.gamePlayer+"/"+item.maxPlayer+"] [房间状态:"+stateStr+"] [房间地图:"+mapValue+"]";
                data.push({txt_roomID:item.roomID, txt_otherInfo:other});
            });
            this.setListItemsInfo(data);
        }else{
            this.txt_title.text = "当前没有房间";
        }
        
    }
    //
    private updateItem(cell: Laya.Box, index: number): void {
        if (index > this.list_roomItems.array.length) {
            return;
        }
        let data = this.list_roomItems.array[index];
        //console.info("房间列表项数据", data,cell);
        let btn:Laya.Button = cell.getChildByName("btn_entRoom") as Laya.Button;
        btn.off(Laya.Event.CLICK,this, this.enterRoomEvent);
        btn.on(Laya.Event.CLICK,this, this.enterRoomEvent,[data.txt_roomID]);
    }

    /**
     * 进入房间
     * @param roomID 
     * @param a 
     */
    private enterRoomEvent(roomID:string,a:Laya.Event){
        this.release();
        StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHROOMID,roomID);
    }

    private exitClick(e:Laya.Event){
        this.release();
        StageManage.getInstance.SwitchScreen(Lobby);
    }

    private release(){
        this.removeMvsListener();
        Laya.timer.clearAll(this);
    }
}