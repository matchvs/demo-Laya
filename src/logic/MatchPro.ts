/*
* name;
*/
class MatchPro extends ui.MatchProUI{
    constructor(){
        super();
        this.initView();
    }

    private initView(){
        this.btn_exit.on(Laya.Event.CLICK,this, this.btnExitClick);
        this.btn_ok.on(Laya.Event.CLICK,this, this.btnOkClick);
        ErrorNote.getInstance.addListen(this);
    }

    /**
     * 
     * @param e 
     */
    private btnOkClick(e:Laya.Event){
        let map:string = GameData.roomPropertyType.mapA;
        if(this.radio_groupMap.selectedIndex == 1){
            map = GameData.roomPropertyType.mapB;
        }
        StageManage.getInstance.ToMatch(Match.JOINFLAG.WITHPROPERTY,map);
    }

    /**
     * 
     * @param e 
     */
    private btnExitClick(e:Laya.Event){
        StageManage.getInstance.SwitchScreen(Lobby);
    }
}