/*
* name;
*/

import lobby = ui.LobbyUI;
class Lobby extends ui.LobbyUI{
    constructor(){
        super();
        this.init();
    }

    private init(){
        this.img_header.skin = GameData.myUser.avatar;
        this.name_head.text = GameData.myUser.userID+ ":"+ GameData.myUser.name;

         console.info("单机按钮监听");
        this.btn_randMatch.on(Laya.Event.CLICK, this, this.btnRandMatchClick);
        this.btn_createRoom.on(Laya.Event.CLICK, this, this.btnCreateRoomClick);
        this.btn_joinWithProperty.on(Laya.Event.CLICK, this, this.btnJoinWithPropertyClick);
        this.btn_geRoomList.on(Laya.Event.CLICK, this, this.btnJoinWithRoomIDClick);
        this.btn_exit.on(Laya.Event.CLICK, this, this.btnExitClick);
        ErrorNote.getInstance.addListen(this);
    }
    /**
     * 打开 matchvs 事件监听
     */
    private addMvsListener(){
        ErrorNote.getInstance.addListen(this);
    }

    /**
     * 移除 matchvs 事件监听
     */
    private removeMvsListener(){
    }

    /**
     * 随机匹配
     * @param e 
     */
    private btnRandMatchClick(e:Laya.Event){
        console.info("点击随机匹配！");
        this.mouseEnabled = false;
        // StageManage.getInstance.SwitchScreen(Match);
        StageManage.getInstance.ToMatch(Match.JOINFLAG.RANDROOM);
    }

    private btnJoinWithPropertyClick(e:Laya.Event){
        this.mouseEnabled = false;
        StageManage.getInstance.SwitchScreen(MatchPro);
        // StageManage.getInstance.SwitchScreen(Match);
        // StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHPROPERTY);
    }

    private btnCreateRoomClick(e:Laya.Event){
        this.mouseEnabled = false;
        // StageManage.getInstance.SwitchScreen(Match);
        StageManage.getInstance.ToMatch(Match.JOINFLAG.CREATEROOM);
    }

    private btnJoinWithRoomIDClick(e:Laya.Event){
        this.mouseEnabled = false;
        StageManage.getInstance.SwitchScreen(RoomList);
        // StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHROOMID);
    }

    /**
     * 退出
     * @param e 
     */
    private btnExitClick(e:Laya.Event){
        mvs.MsEngine.getInstance.logOut();
        StageManage.getInstance.SwitchScreen(Login);
    }
}