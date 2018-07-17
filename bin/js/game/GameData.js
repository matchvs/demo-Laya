/*
* name;
*/
var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.myUser = new GUser();
    GameData.battleBgimgUrl = "http://193.112.47.13/icon/laya/battle.png";
    GameData.maxPlayerNum = 3; //
    GameData.mode = 0; //房间模式，由cp自己定义
    GameData.canWatch = 0; //
    GameData.roomPropertyType = { "mapA": "mapA", "mapB": "mapB" };
    GameData.roomPropertyValue = "mapA";
    GameData.createRoomInfo = new MsCreateRoomInfo("MatchvsDemoLaya", 3, 0, 0, 1, "mapA"); //创建房间的参数
    //游戏中发送消息标识
    GameData.MSG_ACTION = {
        GAME_TIME_SYN: 2000,
        BALL_MOVE: 2001,
        ROLE_LOCATION: 2002,
        RECONNECT_OK: 2003,
        RECONNECT_ACK: 2004,
    };
    return GameData;
}());
//# sourceMappingURL=GameData.js.map