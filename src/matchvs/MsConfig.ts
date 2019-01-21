/*
* name;
*/
class PlatformType{
    private _alp:string = "";
    private _rel:string = "";
    constructor(alp:string, rel:string){
        this._alp = alp;
        this._rel = rel;
    }

    public get alp():string{
        return this._alp;
    }
    public get rel():string{
        return this._rel;
    }
}

class MsConfig{

    public static channel:string = "jdge";
    public static PLATFROM_TYPE:PlatformType = new PlatformType("alpha","release");
    public static platfrom:string = MsConfig.PLATFROM_TYPE.alp;

    //Matchvs 云托管游戏信息
    public static gameID:number = 5;
    public static appKey:string = "b85d3ac0cc0541c59d391e3e56734352";
    public static secretKey:string = "6f6ac46e192c48ef9d265810a9d70685";

    //独立部署游戏信息
    public static preGameID:number = 1;
    public static preAppKey:string = "appkey01";
    public static preSecretKey:string = "appsecret01";
    public static preEndPoint:string = "mt21gateway.matchvs.com";
    


    constructor(){
    }
}