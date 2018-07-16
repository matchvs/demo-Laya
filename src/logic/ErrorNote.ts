/*
* name;
*/
class ErrorNote extends ui.WarningUI{

    private static _instance:ErrorNote = null;
    private gatewayErr:boolean = false;
    private errMap:mvs.MsError ;
    private currnPage:any;

    /**
     * 监听错误回调函数
     */
    private errCall:{[key:number]:Function} = [];

    /**
     * 点击按钮回调
     */
    private btnCall:Function = this.defaultBack

    constructor(){
        super();
        this.init();
    }

    private init(){
        this.errMap = new mvs.MsError();
        this.txt_Message.text = "";
        this.btn_Return.on(Laya.Event.CLICK, this, this.btnReturnClick);
    }

    private errCallMap(){
        this.errCall[1001] = this.err1001;
        this.errCall[1002] = this.err1002;
    }


    public setBtnBack(back:Function){
        this.btnCall = back; 
    }

    public static get getInstance():ErrorNote{
        if(!this._instance){
            this._instance = new ErrorNote;
        }
        return this._instance;
    }

    public delListen(){
        mvs.MsResponse.getInstance.off(mvs.MsEvent.EVENT_ERROR_RSP,this, this.errorResponse);
    }

    /**
     * 默认返回到登录界面
     */
    private defaultBack(){
        this.delListen();
        mvs.MsEngine.getInstance.logOut();
        StageManage.getInstance.SwitchScreen(Login);
    }

    /**
     * 
     * @param caller 监听错误者， 当前监听错误的页面
     * @param toback 错误回调函数
     */
    public addListen(caller:any ){
        this.currnPage = caller;
        mvs.MsResponse.getInstance.on(mvs.MsEvent.EVENT_ERROR_RSP, this, this.errorResponse);
    }

    /**
     * 显示错误信息
     */
    public showErrMsg(code:number, msg:string, caller?:any, back?:Function){
        if(caller){
            this.currnPage = caller;
            this.currnPage.addChild(this);
        }
        this.showNoteInfo(code, msg);
        if(back){
            this.btnCall = back;
        }
    }

    private showNoteInfo(code:number, msg:string){
        if(this.currnPage){
            this.currnPage.addChild(this);
        }else{
            Laya.stage.removeChildren();
            Laya.stage.addChild(this);
        }

        let errmsg = this.errMap.getErrMsg(code);

        if(!errmsg){
            errmsg = msg || "有点小错误！";
        }
        this.txt_Message.text = errmsg;
    }

    /**
     * 
     * @param e 
     */
    private btnReturnClick(dt:any,e:Laya.Event){
        //this._toBack();
        this.delListen();
        if(this.currnPage["release"] && typeof(this.currnPage.release) == "function"){
            console.info("释放页面");
            this.currnPage.release();
        }
        if(this.btnCall){
            this.btnCall(dt);
        }else{
            this.defaultBack();
        }
        
    }

    /**
     * 监听到错误
     * @param e 
     */
    private errorResponse(e:mvs.MsEventData){
        let code:number = e.data.errCode;
        let msg:string = e.data.errMsg;

        this.showNoteInfo(code, msg);
        
        if(this.errCall[code]){
            this.btnCall = this.errCall[code];
        }else{
            this.btnCall = this.defaultBack;
        }
    }

    private err1001(){
        this.gatewayErr = true;
        StageManage.getInstance.SwitchScreen(Login);
    }

    private err1002(){
        if(this.gatewayErr){
            StageManage.getInstance.SwitchScreen(Login);
        }else{
            StageManage.getInstance.SwitchScreen(Lobby);
        }
    }

}