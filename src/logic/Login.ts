/*
* name;
*/
import game = ui.LoginUI;

class Login extends ui.LoginUI{
    constructor(){
        super();
        this.init();
    }

    private init(){
        this.txtGameID.text = MsConfig.gameID.toString();
        this.txtAppkey.text = MsConfig.appKey;
        this.txtSecretKey.text = MsConfig.secretKey;
        
        //按钮监听事件
        this.btn_ok.on(Laya.Event.CLICK,this,this.btnOkClick);
        this.btn_clear.on(Laya.Event.CLICK,this,this.btnClearClick);
        this.btn_premise.on(Laya.Event.CLICK,this,this.btnPremiseClick)

        this.addMvsListener();
    }

    /**
     * 打开 matchvs 事件监听
     */
    private addMvsListener(){
        // 初始化监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        // 注册监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_REGISTERUSER_RSP,this, this.registUserResponse);
        // 登录 监听
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_LOGIN_RSP,this, this.loginResponse);
    }

    /**
     * 移除 matchvs 事件监听
     */
    private removeMvsListener(){
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_INIT_RSP, this, this.initResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_REGISTERUSER_RSP,this, this.registUserResponse);
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_LOGIN_RSP,this, this.loginResponse);
    }

    private btnOkClick(e:Laya.Event){
        this.setMsConfigInfo();
        mvs.MsEngine.getInstance.init(MsConfig.channel, MsConfig.platfrom, MsConfig.gameID);
    }

    private btnClearClick(){
        console.info("清理缓存的用户信息");
        LocalStore_Clear();
        Laya.Tween.to(this.clearNote,{alpha:1},500);
        setTimeout(()=>{Laya.Tween.to(this.clearNote,{alpha:0},500);},500);
    }

    /**
     * 初始化事件监听
     * @param {mvs.MsEventData} event 
     */
    private initResponse(event:mvs.MsEventData){
        console.info("初始化回调：",event.data.status);
        if(event.data.status == 200){
            //注册用户
            mvs.MsEngine.getInstance.registerUser();
        }else{
            console.info("初始化失败！");
        }
    }

    /**
     * set matchvs 初始化需要的信息
     */
    private setMsConfigInfo(){
        MsConfig.gameID = Number(this.txtGameID.text);
        MsConfig.appKey = this.txtAppkey.text;
        MsConfig.secretKey = this.txtSecretKey.text;
        // if(this.radio_sel.selectedIndex == 1){
        //     MsConfig.platfrom = MsConfig.PLATFROM_TYPE.rel;
        // }else{
        //     MsConfig.platfrom = MsConfig.PLATFROM_TYPE.alp;
        // }
    }

    /**
     * 获取到用户信息后 设置一下用户信息
     */
    private setUserInfo(info:any){
        GameData.myUser.userID = info.id;
        GameData.myUser.name = info.name;
        GameData.myUser.token = info.token;
        GameData.myUser.avatar = info.avatar;
    }

    /**
     * 注册用户
     * @param event 
     */
    private registUserResponse(event:mvs.MsEventData){
        let data = event.data;
        console.info("注册成功：",event)
        if(data.status == 0){
            this.setUserInfo(data);
            //登录
            mvs.MsEngine.getInstance.login(GameData.myUser.userID,GameData.myUser.token, MsConfig.gameID, MsConfig.appKey, MsConfig.secretKey);

        }else{
            console.info("注册用户失败:",data);
        }
        return;
    }

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
                // StageManage.getInstance.SwitchScreen(ReConnect);
            }
            
        }else{
            console.info("登录失败！");
        }
    }

    private btnPremiseClick(e:Laya.Event){
        this.removeMvsListener();
        StageManage.getInstance.SwitchScreen(Premise)
    }
}