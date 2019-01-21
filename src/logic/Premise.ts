/*
* name;
*/
class Premise extends ui.PremiseUI{
    constructor(){
        super()
        this.init()
    }

    private init(){
        this.txt_endPoint.text = MsConfig.preEndPoint;
        this.txt_gameID.text = MsConfig.preGameID.toString();
        this.txt_appKey.text = MsConfig.preAppKey;
        this.txt_secretKey.text = MsConfig.preSecretKey;
        this.txt_userID.text = "123456";
        this.txt_token.text = "OEWIURIOJNUOGIUDSF809LJOKETGT89H";

        this.addMvsListener();

        this.btn_ok.on(Laya.Event.CLICK,this,this.btnOkClick);
        this.btn_back.on(Laya.Event.CLICK, this, this.btn_backClick);
    }

     /**
     * 打开 matchvs 事件监听
     */
    private addMvsListener(){
        // 初始化监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        // 登录 监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LOGIN_RSP,this, this.loginResponse);
    }

    /**
     * 移除 matchvs 事件监听
     */
    private removeMvsListener(){
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LOGIN_RSP,this, this.loginResponse);
    }

    /**
     * 初始化回调
     * @param event 
     */
    private initResponse(event:mvs.MsEventData){
        console.info("初始化回调：",event.data.status);
        if(event.data.status == 200){
            //注册用户
            console.info("初始化成功！");
            GameData.myUser.userID = Number(this.txt_userID.text);
            GameData.myUser.token = this.txt_token.text; 
            let res = mvs.MsEngine.getInstance.login(GameData.myUser.userID, GameData.myUser.token);
            if(res != 0){
                console.log("登录失败：", res);
            }
        }else{
            console.info("初始化失败！");
        }
        
    }

    /**
     * 登录回调
     * @param event 
     */
    private loginResponse(event:mvs.MsEventData){
        let data = event.data;
        if(data.status == 200){
            this.removeMvsListener();
            if(data.roomID !== "0"){
                console.info("登录成功！可以重新连接:"+data.roomID);
                StageManage.getInstance.SwitchScreen(ReConnect);
            }else{
                console.info("登录成功！跳到大厅");
                //这里页面跳转
                StageManage.getInstance.ToLobby();
            }
            
        }else{
            console.info("登录失败！");
        }
    }

    private btnOkClick(e:Laya.Event){
        mvs.MsEngine.getInstance.premiseInit(this.txt_endPoint.text, Number(this.txt_gameID.text), this.txt_appKey.text);
    }

    private btn_backClick(e:Laya.Event){
        StageManage.getInstance.ToLogin();
    }

}