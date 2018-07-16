/*
* name;
*/
class StageManage{

    private static _instance:StageManage = null;

    private constructor(){
    }

    public static get getInstance():StageManage{
        if(StageManage._instance == null){
            StageManage._instance = new StageManage();
        }
        return StageManage._instance;
    }

    public ToLogin(){
        Laya.stage.removeChildren();
        let login:Login = new Login();
        Laya.stage.addChild(login);
    }

    public ToLobby(){
        Laya.stage.removeChildren();
        let lobby:Lobby = new Lobby();
        Laya.stage.addChild(lobby);
    }
    
    public ToMatch(flag:number, info?:any){
        Laya.stage.removeChildren();
        let match:Match = new Match();
        Laya.stage.addChild(match);
        match.joinRoom(flag,info);
    }
    
    public SwitchScreen(screen:any, info?:any){
        Laya.stage.removeChildren();
        let s:Laya.Sprite = new screen();
        Laya.stage.addChild(s);
    }

    public ToBattle(players:Array<Player>, isFrameSync:boolean, time ?:number){
        let bt:Battle = new Battle();
        if(time){
            bt.setGameTime(time);
        }
        if(bt.setPlayes(players) == 0){
            if(isFrameSync){
                bt.openFrameSync(10);
            }
            Laya.stage.removeChildren();
            Laya.stage.addChild(bt);
        }
    }

    /**
     * 
     * @param players 
     */
    public ToResult(players:Array<Player>, flag:number){
        Laya.stage.removeChildren();
        let res:Result = new Result(players,flag);
        Laya.stage.addChild(res);
    }
}