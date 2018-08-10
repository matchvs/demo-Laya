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

    public static channel:string = "Matchvs";
    public static PLATFROM_TYPE:PlatformType = new PlatformType("alpha","release");
    public static platfrom:string = MsConfig.PLATFROM_TYPE.alp;

    //Matchvs 云托管游戏信息
    public static gameID:number = 201489;
    public static appKey:string = "4fb6406305f44f1aad0c40e5946ffe3d";
    public static secretKey:string = "5035d62b75bd4941b182579f2b8fc12c";

    //独立部署游戏信息
    public static preGameID:number = 1;
    public static preAppKey:string = "appkey01";
    public static preSecretKey:string = "appsecret01";
    public static preEndPoint:string = "mt21gateway.matchvs.com";
    


    constructor(){
    }
}