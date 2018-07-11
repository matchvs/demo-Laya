/*
* name;
*/
class ReConnect extends ui.ReConnectUI{

    // 重连次数
    private connTotal:number = 5;
    private connNum:number = 0;
    private playerList:Array<Player> = [];//匹配到的用户列表
    private actions:any = {};

    constructor(){
        super();
        this.initView();
    }

    /**
     * 初始化界面
     */
    private initView(){
        this.btn_cancel.on(Laya.Event.CLICK, this, this.btnCancelEvent);
        this.btn_ok.on(Laya.Event.CLICK, this, this.btnOkEvent);
        this.onMvsListen();
    }

    /**
     * 打开监听 matchvs
     */
    private onMvsListen(){
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_RECONNECT_RSP,this, this.reconnectResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_RSP,this, this.sendEventResponse);
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_SENDEVENT_NTFY,this, this.sendEventNotify);

        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_GETROOMDETAIL_RSP,this, this.getRoomDetailResponse);
    }

    /**
     * 关闭监听 matchvs
     */
    private offMvsListen(){
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_RECONNECT_RSP,this, this.reconnectResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_RSP,this, this.sendEventResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_SENDEVENT_NTFY,this, this.sendEventNotify);

        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_GETROOMDETAIL_RSP,this, this.getRoomDetailResponse);
    }


    /**
     * 
     * @param e 取消
     */
    private btnCancelEvent(e:Laya.Event){
        this.release();
        StageManage.getInstance.SwitchScreen(Lobby);
    }
    private btnOkEvent(e:Laya.Event){
        this.btn_ok.visible = false;
        
        Laya.Tween.to(this.btn_cancel,{x:568}, 1000);
        this.img_loading.visible = true;
        this.txt_message.text = "准备重连";
        Laya.timer.frameLoop(1, this, this.animate);
        Laya.timer.loop(1000, this, this.reconnect);
    }
    /**
     * 加载动画
     * @param e 
     */
    private animate(e: Event): void {
        this.img_loading.rotation += 5;
    }
    /**
     * 重连
     */
    private reconnect(){
        this.connNum++;
        this.txt_message.text = "正在重连..."+this.connNum+"/"+this.connTotal;
        if(this.connNum > this.connTotal){
            this.release();
            console.info("重新连接失败，回到大厅界面！");
            StageManage.getInstance.SwitchScreen(Lobby);
        }
        let res = mvs.MsEngine.getInstance.reconnect();
        if(res != 0){
            console.info("重连失败！");
        }
    }

    /**
     * 重连事件
     * @param e 
     */
    private reconnectResponse(e:mvs.MsEventData){
        let data = e.data;
        let userList:Array<any> = data.roomUserInfoList.length;//房间玩家列表
        Laya.timer.clearAll(this);
        console.info("重连房间返回数据：", data);

        if(data.status == 200){
            console.info("重连进入房间成功!");
            this.reconnectSuccess(data.roomInfo.roomID);
        }else{
            this.txt_message.text = "重连失败请返回到大厅..."+data.status;
            console.info("重连失败");
        }
    }

    /**
     * 添加玩家
     * @param id 
     * @param name 
     * @param avatar 
     * @param tableID 
     * @param owner 
     */
    private addPlayerList(id:number,name:string,avatar:string, tableID:number, owner:boolean = false):Player{
        let play:Player = new Player();
        play.userID = id;
        play.name = name;
        play.avatar = avatar;
        play.tableID = tableID;
        play.isOwner = owner;
        this.playerList.push(play);
        return play;
    }

    /**
     * 重连成功
     */
    private reconnectSuccess(roomID){
        this.txt_message.text = "正在查询房间状态...";
        //重连成功需要查看房间状态
        mvs.MsEngine.getInstance.getRoomDetail(roomID);
    }
     
    /**
     * 
     */
    private release(){
        this.offMvsListen();
        Laya.timer.clearAll(this);
    }


    private sendEventResponse(e:mvs.MsEventData){
        let rsp = e.data;
        console.info("发送重连通知"+rsp.status);
    }

    /**
     * 确认是否收到 重连确认消息
     * @param e 
     */
    private sendEventNotify(e:mvs.MsEventData){
        let data:string = e.data.cpProto;
        if(data !== "" && data.indexOf("action") >= 0){
            let info = JSON.parse(data);
            //收到确认消息
            if(info.action === GameData.MSG_ACTION.RECONNECT_ACK){
                this.offMvsListen();
                console.info("收到重连消息确认",data);
                if("userList" in info){
                    let userlist:Array<any> = info.userList;
                    this.playerList = [];
                    //先添加自己
                    this.addPlayerList(GameData.myUser.userID, GameData.myUser.name, GameData.myUser.avatar, 1);
                    this.playerList[0].score = info.score;
                    //再一次取出用户信息
                    for(let i = 0; i < userlist.length; i++){
                        if(userlist[i].userID !== GameData.myUser.userID){
                            this.addPlayerList(userlist[i].userID, userlist[i].name, userlist[i].avatar, i+2);
                        }
                    }
                    //开始游戏
                    this.startGame(info.type, info.time);
                }
            }
        }
    }

    private startGame(type:number, time:number){
        this.release();
        if(this.playerList.length === GameData.maxPlayerNum){
            //开始游戏
            StageManage.getInstance.ToBattle(this.playerList, Boolean(type), time);
        }else{
            //跳到大厅
             StageManage.getInstance.SwitchScreen(Lobby);
        }
    }

    /**
     * 查询房间信息
     * @param e 
     */
    private getRoomDetailResponse(e:mvs.MsEventData){
        let data = e.data;
        if(data.status === 200 && data.state === 2){ 
            this.txt_message.text = "等待同步游戏信息...";
            let event = {
                action:GameData.MSG_ACTION.RECONNECT_OK
            };
            //发送消息告诉其他玩家OK
            let res = mvs.MsEngine.getInstance.sendEvent(JSON.stringify(event));
            if (!res || res.result !== 0) {
                return console.log('重连发送信息失败');
            }
        }else{
            this.release();
            mvs.MsEngine.getInstance.leaveRoom("重连查询房间失败");
            this.txt_message.text = "房间状态查询失败，以主动离开房间，请返回到大厅";
        }
    }
}