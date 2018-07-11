/*
* name;
*/
class GameData{
    
    public static myUser:GUser = new GUser();

    public static battleBgimgUrl:string = "http://193.112.47.13/icon/laya/battle.png";

    public static maxPlayerNum:number = 3;//
    public static mode:number = 0;//
    public static canWatch:number = 0;//

    public static roomPropertyType = { "mapA": "mapA", "mapB": "mapB" };
    public static roomPropertyValue = "mapA";
    public static createRoomInfo = new MsCreateRoomInfo("MatchvsDemoLaya", 3, 0, 0, 1, "mapA"); //创建房间的参数

    //游戏中发送消息标识
    public static MSG_ACTION = {
        GAME_TIME_SYN: 2000, //重新连接后房主回复游戏数据
        BALL_MOVE:2001,     //发送球位置
        ROLE_LOCATION:2002, //发送角色位置
        RECONNECT_OK:2003,  //重新连接成功，发送消息告诉其他人OK了
        RECONNECT_ACK:2004, //重新连接后房主回复游戏数据
    }

    constructor(){

    }
}