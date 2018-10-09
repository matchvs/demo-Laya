
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class BattleUI extends View {
		public img_battle:Laya.Image;
		public Sprite_player3:Laya.Sprite;
		public Sprite_player2:Laya.Sprite;
		public Sprite_player1:Laya.Sprite;
		public name_player2:Laya.Label;
		public name_player1:Laya.Label;
		public name_player3:Laya.Label;
		public img_ball:Laya.Image;
		public btn_leftMove:Laya.Button;
		public btn_rightMove:Laya.Button;
		public txt_gameTime:Laya.Label;
		public name_Player2:Laya.Label;
		public name_Player3:Laya.Label;
		public img_header1:Laya.Image;
		public name_Player1:Laya.Label;
		public img_header2:Laya.Image;
		public img_header3:Laya.Image;
		public score_Player1:Laya.Label;
		public score_Player2:Laya.Label;
		public score_Player3:Laya.Label;
		public btn_exit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"var":"img_battle","height":720}},{"type":"Sprite","props":{"y":547,"x":527,"width":45,"var":"Sprite_player3","pivotY":37,"pivotX":22,"name":"Sprite_player3","height":72}},{"type":"Sprite","props":{"y":547,"x":565,"width":45,"var":"Sprite_player2","pivotY":37,"pivotX":22,"name":"Sprite_player2","height":72}},{"type":"Sprite","props":{"y":547,"x":602,"width":45,"var":"Sprite_player1","pivotY":37,"pivotX":22,"name":"Sprite_player1","height":72}},{"type":"Label","props":{"y":507,"x":559,"width":60,"var":"name_player2","pivotY":8,"pivotX":30,"name":"name_player2","height":18,"color":"#e3ec19","align":"center"}},{"type":"Label","props":{"y":507,"x":603,"width":60,"var":"name_player1","pivotY":8,"pivotX":30,"name":"name_player1","height":18,"color":"#e3ec19","align":"center"}},{"type":"Label","props":{"y":507,"x":521,"width":60,"var":"name_player3","pivotY":8,"pivotX":30,"name":"name_player3","height":16,"color":"#e3ec19","align":"center"}},{"type":"Image","props":{"y":557,"x":845,"width":40,"var":"img_ball","skin":"mvs/boll.png","scaleY":0.7,"scaleX":0.7,"pivotY":20,"pivotX":20,"height":42}},{"type":"Button","props":{"y":96,"x":1,"width":612,"var":"btn_leftMove","stateNum":1,"name":"btn_leftMove","height":563}},{"type":"Button","props":{"y":96,"x":666,"width":612,"var":"btn_rightMove","stateNum":1,"name":"btn_rightMove","height":560}},{"type":"Label","props":{"y":9,"x":611,"width":58,"var":"txt_gameTime","text":"60","height":29,"fontSize":30,"color":"#f6d285","align":"center"}},{"type":"Image","props":{"y":9,"x":33,"width":407,"skin":"mvs/inputBox.png","scaleY":0.6,"scaleX":0.6,"height":43}},{"type":"Image","props":{"y":11,"x":1000,"width":407,"skin":"mvs/inputBox.png","scaleY":0.6,"scaleX":0.6,"height":43}},{"type":"Image","props":{"y":52,"x":1000,"width":407,"skin":"mvs/inputBox.png","scaleY":0.6,"scaleX":0.6,"height":43}},{"type":"Label","props":{"y":14,"x":1079,"wordWrap":true,"width":150,"var":"name_Player2","text":"用户昵称","height":21,"fontSize":14,"color":"#060606","align":"right"}},{"type":"Label","props":{"y":53,"x":1079,"wordWrap":true,"width":150,"var":"name_Player3","text":"用户昵称","promptColor":"#816e6e","height":18,"fontSize":14,"color":"#000000","align":"right"}},{"type":"Image","props":{"y":-3,"x":-2,"width":44,"var":"img_header1","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","scaleY":1,"scaleX":1,"pivotX":-1,"height":48},"child":[{"type":"Sprite","props":{"y":39,"x":36,"width":33,"renderType":"mask","pivotY":23,"pivotX":26,"height":27},"child":[{"type":"Circle","props":{"y":8,"x":13,"radius":18,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":14,"x":46,"wordWrap":true,"width":150,"var":"name_Player1","text":"用户昵称","height":21,"fontSize":14,"color":"#171616","bold":false,"align":"left"}},{"type":"Image","props":{"y":1,"x":1231,"width":45,"var":"img_header2","skin":"http://193.112.47.13/headimg/2.jpg","sizeGrid":"0,0,0,0","scaleY":1,"scaleX":1,"pivotX":-1,"height":45},"child":[{"type":"Sprite","props":{"y":26,"x":23,"width":52,"renderType":"mask","pivotY":23,"pivotX":26,"height":47},"child":[{"type":"Circle","props":{"y":21,"x":26,"radius":18,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Image","props":{"y":40,"x":1231,"width":45,"var":"img_header3","skin":"http://193.112.47.13/headimg/3.jpg","sizeGrid":"0,0,0,0","scaleY":1,"scaleX":1,"pivotX":-1,"height":47},"child":[{"type":"Sprite","props":{"y":26,"x":22,"width":52,"renderType":"mask","pivotY":23,"pivotX":26,"height":47},"child":[{"type":"Circle","props":{"y":21,"x":26,"radius":18,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":15,"x":200,"wordWrap":true,"width":70,"var":"score_Player1","type":"number","text":"0","height":17,"fontSize":14,"color":"#060606","bold":false,"align":"left"}},{"type":"Label","props":{"y":16,"x":1005,"wordWrap":true,"width":70,"var":"score_Player2","type":"number","text":"0","promptColor":"#998585","height":18,"fontSize":14,"color":"#000000","bold":false,"align":"right"}},{"type":"Label","props":{"y":54,"x":1006,"wordWrap":true,"width":70,"var":"score_Player3","type":"number","text":"0","height":17,"fontSize":14,"color":"#000000","bold":false,"align":"right"}},{"type":"Button","props":{"y":658,"x":1138,"width":140,"var":"btn_exit","stateNum":1,"skin":"mvs/btn1.png","labelSize":24,"labelColors":"#FFFFFF","label":"离开","height":60}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.BattleUI.uiView);

        }

    }
}

module ui {
    export class LobbyUI extends View {
		public btn_randMatch:Laya.Button;
		public btn_joinWithProperty:Laya.Button;
		public btn_createRoom:Laya.Button;
		public btn_geRoomList:Laya.Button;
		public img_header:Laya.Image;
		public name_head:Laya.Label;
		public btn_exit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"visible":true,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":720,"alpha":1}},{"type":"Button","props":{"y":205,"x":309,"width":192,"var":"btn_randMatch","name":"btn_randMatch","labelSize":48,"labelColors":"#FFFFFF","label":"随机匹配","height":67,"alpha":1}},{"type":"Button","props":{"y":330,"x":309,"width":196,"var":"btn_joinWithProperty","sizeGrid":"5,5,5,5","labelStroke":0,"labelSize":28,"labelColors":"#ffffff","labelBold":false,"label":"自定义属性匹配","height":40,"alpha":1}},{"type":"Button","props":{"y":205,"x":812,"width":196,"var":"btn_createRoom","sizeGrid":"5,5,5,5","labelStroke":0,"labelSize":48,"labelColors":"#ffffff","label":"创建房间","height":67,"alpha":1}},{"type":"Button","props":{"y":330,"x":812,"width":196,"var":"btn_geRoomList","sizeGrid":"5,5,5,5","name":"btn_geRoomList","labelStrokeColor":"#c0d4d1","labelStroke":0,"labelSize":28,"labelColors":"#ffffff","label":"查看房间列表","height":40}},{"type":"Image","props":{"y":29,"x":941,"width":85,"var":"img_header","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"height":90},"child":[{"type":"Sprite","props":{"y":23,"x":19,"width":77,"renderType":"mask","pivotY":23,"pivotX":26,"height":85},"child":[{"type":"Circle","props":{"y":42,"x":47,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":63,"x":1028,"wordWrap":true,"width":227,"var":"name_head","text":"用户昵称","height":24,"fontSize":18,"color":"#999999","align":"left"}},{"type":"Button","props":{"y":63,"x":61,"width":36,"var":"btn_exit","stateNum":1,"skin":"mvs/icon_back.png","height":36}},{"type":"Label","props":{"y":56,"x":120,"width":177,"text":"游戏大厅","height":49,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}},{"type":"Image","props":{"y":219,"x":250,"width":30,"skin":"mvs/icon_arrow_left.png","height":40}},{"type":"Image","props":{"y":219,"x":756,"width":30,"skin":"mvs/icon_arrow_left.png","height":40}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LobbyUI.uiView);

        }

    }
}

module ui {
    export class LoginUI extends View {
		public txtSecretKey:Laya.TextInput;
		public txtAppkey:Laya.TextInput;
		public txtGameID:Laya.TextInput;
		public btn_ok:Laya.Button;
		public btn_clear:Laya.Button;
		public btn_premise:Laya.Button;
		public clearNote:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","rotation":0,"height":720}},{"type":"TextInput","props":{"y":344,"x":370,"wordWrap":true,"width":540,"var":"txtSecretKey","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入SecretKay","padding":"0","name":"txtSecretKey","height":70,"fontSize":20,"color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":250,"x":370,"wordWrap":true,"width":540,"var":"txtAppkey","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入AppKey","padding":"0","name":"txtAppkey","height":70,"fontSize":20,"align":"left"}},{"type":"TextInput","props":{"y":156,"x":370,"wordWrap":true,"width":540,"var":"txtGameID","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"0-9","prompt":"请输入GameID","padding":"0","name":"txtGameID","height":70,"fontSize":20,"align":"left"}},{"type":"Button","props":{"y":442,"x":370,"width":315,"var":"btn_ok","stateNum":1,"skin":"mvs/btn1.png","sizeGrid":"15,15,15,15","name":"btn_ok","labelSize":28,"labelColors":"#ffffff","labelBold":false,"label":"确定","height":70}},{"type":"Button","props":{"y":442,"x":710,"width":200,"var":"btn_clear","stateNum":1,"skin":"mvs/clear.png","name":"btn_clear","labelSize":28,"labelColors":"#00C1E0","labelAlign":"center","label":"清理缓存","height":70}},{"type":"Label","props":{"y":606,"x":249,"width":778,"valign":"middle","text":"提示：此Demo需要分别在三个不同的浏览器（如Chrome、火狐、360）里打开进行体验","height":28,"fontSize":20,"color":"#999999","align":"center"}},{"type":"Label","props":{"y":644,"x":309,"width":497,"valign":"middle","text":"如需在一个浏览器里完成体验，则每次需要先“清楚缓存”","height":28,"fontSize":20,"color":"#999999"}},{"type":"Button","props":{"y":667,"x":1161,"width":118,"var":"btn_premise","name":"btn_premise","labelSize":28,"labelColors":"#00C1E0","label":"独立部署","height":46}},{"type":"Label","props":{"y":51,"x":423,"width":431,"text":"MatchvsDemo-Laya","height":51,"fontSize":42,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"center"}},{"type":"Button","props":{"y":536,"x":540,"width":200,"visible":true,"var":"clearNote","stateNum":1,"skin":"mvs/clearNote.png","name":"clearNote","labelSize":20,"labelColors":"#FFFFFF","label":"缓存清理成功","height":44,"alpha":0}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoginUI.uiView);

        }

    }
}

module ui {
    export class MatchUI extends View {
		public match_title:Laya.Label;
		public btn_cancel:Laya.Button;
		public loadMatch:Laya.Image;
		public img_OwnerFlag1:Laya.Image;
		public img_OwnerFlag2:Laya.Image;
		public img_OwnerFlag3:Laya.Image;
		public chk_FrameSysc:Laya.CheckBox;
		public img_Player1:Laya.Image;
		public img_Player2:Laya.Image;
		public img_Player3:Laya.Image;
		public name_Player1:Laya.Label;
		public name_Player2:Laya.Label;
		public name_Player3:Laya.Label;
		public btn_kick1:Laya.Button;
		public btn_kick2:Laya.Button;
		public btn_kick3:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"visible":true,"height":720,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":720}},{"type":"Label","props":{"y":125,"x":120,"width":397,"var":"match_title","text":"00000","stroke":1,"height":35,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}},{"type":"Button","props":{"y":63,"x":61,"width":36,"var":"btn_cancel","stateNum":1,"skin":"mvs/icon_back.png","name":"btn_cancel","labelSize":28,"labelFont":"SimHei","labelBold":true,"height":36}},{"type":"Sprite","props":{"y":591,"x":627,"width":40,"pivotY":20,"pivotX":20,"height":40},"child":[{"type":"Image","props":{"y":20,"x":20,"width":40,"var":"loadMatch","skin":"mvs/loading.png","pivotY":20,"pivotX":20,"height":40}}]},{"type":"Image","props":{"y":246,"x":277,"visible":false,"var":"img_OwnerFlag1","skin":"mvs/home.png","name":"img_OwnerFlag1"}},{"type":"Image","props":{"y":246,"x":277,"visible":false,"var":"img_OwnerFlag2","skin":"mvs/home.png","name":"img_OwnerFlag2"}},{"type":"Image","props":{"y":246,"x":277,"visible":false,"var":"img_OwnerFlag3","skin":"mvs/home.png","name":"img_OwnerFlag3"}},{"type":"CheckBox","props":{"y":252,"x":949,"width":182,"visible":false,"var":"chk_FrameSysc","skin":"mvs/radio4.png","name":"chk_FrameSysc","labelSize":28,"labelFont":"Arial","labelColors":"#ffffff","labelBold":true,"label":"打开帧同步","height":35}},{"type":"Panel","props":{"y":223,"x":388,"width":540,"height":321},"child":[{"type":"Image","props":{"y":-1,"x":0,"width":540,"visible":true,"skin":"mvs/inputBox.png","height":90}},{"type":"Image","props":{"y":0,"x":1,"width":98,"var":"img_Player1","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"name":"img_Player1","height":89},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":92,"renderType":"mask","height":87},"child":[{"type":"Circle","props":{"y":46,"x":46,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Image","props":{"y":110,"x":0,"width":540,"visible":true,"skin":"mvs/inputBox.png","height":90}},{"type":"Image","props":{"y":107,"x":4,"width":94,"var":"img_Player2","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"name":"img_Player2","height":92},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":91,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":46,"x":46,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Image","props":{"y":221,"x":0,"width":540,"visible":true,"skin":"mvs/inputBox.png","height":90}},{"type":"Image","props":{"y":222,"x":5,"width":95,"var":"img_Player3","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"name":"img_Player3","height":91},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":92,"renderType":"mask","pivotY":0,"pivotX":0,"height":84},"child":[{"type":"Circle","props":{"y":46,"x":46,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":32,"x":98,"width":310,"var":"name_Player1","text":"用户1","height":27,"fontSize":18,"color":"#060606","align":"center"}},{"type":"Label","props":{"y":144,"x":98,"width":307,"var":"name_Player2","text":"用户2","height":27,"fontSize":18,"color":"#010101","align":"center"}},{"type":"Label","props":{"y":256,"x":98,"width":307,"var":"name_Player3","text":"用户3","height":26,"fontSize":18,"color":"#0b0b0b","align":"center"}},{"type":"Button","props":{"y":43,"x":469,"width":100,"visible":false,"var":"btn_kick1","stateNum":1,"skin":"mvs/btn1.png","pivotY":20,"pivotX":50,"name":"btn_kick1","labelSize":22,"labelColors":"#090a09","labelBold":true,"label":"踢掉","height":50}},{"type":"Button","props":{"y":149,"x":469,"width":100,"visible":false,"var":"btn_kick2","stateNum":1,"skin":"mvs/btn1.png","pivotY":20,"pivotX":50,"name":"btn_kick2","labelSize":22,"labelColors":"#090a09","labelBold":true,"label":"踢掉","height":50}},{"type":"Button","props":{"y":261,"x":469,"width":100,"visible":false,"var":"btn_kick3","stateNum":1,"skin":"mvs/btn1.png","pivotY":20,"pivotX":50,"name":"btn_kick3","labelSize":22,"labelColors":"#090a09","labelBold":true,"label":"踢掉","height":50}}]},{"type":"Label","props":{"y":666,"x":484,"width":312,"valign":"middle","text":"提示：需要满3个玩家才能开始游戏","height":28,"fontSize":20,"color":"#999999","align":"left"}},{"type":"Label","props":{"y":56,"x":120,"width":235,"text":"等待玩家加入","stroke":1,"height":50,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MatchUI.uiView);

        }

    }
}

module ui {
    export class MatchProUI extends View {
		public btn_ok:Laya.Button;
		public btn_exit:Laya.Button;
		public radio_groupMap:Laya.RadioGroup;
		public item0:Laya.Radio;
		public item1:Laya.Radio;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"height":720},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1136,"lineWidth":1,"height":640,"fillColor":"#86c074"}},{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":720}},{"type":"Image","props":{"y":149,"x":340,"width":600,"skin":"mvs/note.png","height":400,"centerX":0}},{"type":"Button","props":{"y":431,"x":570,"width":140,"var":"btn_ok","stateNum":1,"skin":"mvs/btn1.png","labelSize":22,"labelColors":"#ffffff","labelBold":true,"label":"确定","height":60,"centerX":0}},{"type":"Label","props":{"y":182,"x":389,"width":503,"text":"属性选择","height":37,"fontSize":28,"font":"Microsoft YaHei","color":"#000000","centerX":0,"bold":false,"align":"center"}},{"type":"Button","props":{"y":63,"x":61,"var":"btn_exit","stateNum":1,"skin":"mvs/icon_back.png"}},{"type":"RadioGroup","props":{"y":312,"x":499,"var":"radio_groupMap","selectedIndex":0,"centerX":-6},"child":[{"type":"Radio","props":{"var":"item0","skin":"mvs/radio4.png","name":"item0","labelSize":28,"label":"地图A"}},{"type":"Radio","props":{"x":177,"var":"item1","skin":"mvs/radio4.png","name":"item1","labelSize":28,"label":"地图B"}}]},{"type":"Label","props":{"y":56,"x":120,"width":268,"text":"自定义属性匹配","stroke":1,"height":56,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.MatchProUI.uiView);

        }

    }
}

module ui {
    export class PremiseUI extends View {
		public txt_secretKey:Laya.TextInput;
		public txt_userID:Laya.TextInput;
		public txt_appKey:Laya.TextInput;
		public txt_gameID:Laya.TextInput;
		public txt_endPoint:Laya.TextInput;
		public txt_token:Laya.TextInput;
		public btn_ok:Laya.Button;
		public btn_back:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":720},"child":[{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":720}},{"type":"TextInput","props":{"y":342,"x":391,"wordWrap":true,"width":522,"var":"txt_secretKey","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入secretKey","padding":"0","name":"txt_secretKey","height":54,"fontSize":20,"color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":401,"x":391,"wordWrap":true,"width":522,"var":"txt_userID","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入userID","padding":"0","name":"txt_userID","height":54,"fontSize":20,"color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":284,"x":391,"wordWrap":true,"width":522,"var":"txt_appKey","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入appKey","padding":"0","name":"txt_appKey","height":54,"fontSize":20,"color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":225,"x":391,"wordWrap":true,"width":522,"var":"txt_gameID","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入gameID","padding":"0","name":"txt_gameID","height":54,"fontSize":20,"color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":167,"x":391,"wordWrap":true,"width":522,"var":"txt_endPoint","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入服务地址","padding":"0","name":"txt_endPoint","height":54,"fontSize":20,"color":"#000000","align":"left"}},{"type":"TextInput","props":{"y":459,"x":391,"wordWrap":true,"width":522,"var":"txt_token","skin":"mvs/inputBox.png","sizeGrid":"2,2,2,2","rotation":0,"restrict":"a-zA-Z","prompt":"请输入token","padding":"0","name":"txt_token","height":54,"fontSize":20,"color":"#000000","align":"left"}},{"type":"Button","props":{"y":522,"width":315,"var":"btn_ok","stateNum":1,"skin":"mvs/btn1.png","sizeGrid":"5,5,5,5","name":"btn_ok","labelSize":28,"labelColors":"#ffffff","labelBold":false,"label":"确定","height":70,"centerX":-89}},{"type":"Button","props":{"y":522,"x":714,"width":200,"var":"btn_back","stateNum":1,"skin":"mvs/clear.png","name":"btn_back","labelSize":28,"labelColors":"#00C1E0","label":"返回","height":70}},{"type":"Label","props":{"y":50,"x":413,"width":454,"text":"Matchvs服务独立部署","height":70,"fontSize":48,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.PremiseUI.uiView);

        }

    }
}

module ui {
    export class ReConnectUI extends View {
		public btn_cancel:Laya.Button;
		public txt_message:Laya.Label;
		public btn_ok:Laya.Button;
		public img_loading:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":1280,"visible":true,"height":720},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1136,"lineWidth":1,"height":640,"fillColor":"#ced26c"}},{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":720}},{"type":"Button","props":{"y":462,"x":720,"width":140,"var":"btn_cancel","stateNum":1,"skin":"mvs/exit.png","pivotY":0,"pivotX":0,"name":"btn_cancel","labelSize":20,"labelFont":"Microsoft YaHei","labelColors":"#000000","labelBold":true,"label":"取消","height":50}},{"type":"Label","props":{"y":246,"x":394,"width":492,"var":"txt_message","text":"检测到您上一局游戏还没结束，是否重连？","name":"txt_message","height":29,"fontSize":22,"color":"#8e8080","centerY":-100,"centerX":0,"bold":true,"align":"center"}},{"type":"Button","props":{"y":462,"x":436,"width":140,"var":"btn_ok","stateNum":1,"skin":"mvs/btn1.png","name":"btn_ok","labelSize":20,"labelFont":"Microsoft YaHei","labelColors":"#000000","labelBold":true,"label":"确定","height":50}},{"type":"Sprite","props":{"y":360,"x":640,"width":40,"visible":false,"var":"img_loading","pivotY":20,"pivotX":20,"name":"img_loading","height":40},"child":[{"type":"Image","props":{"y":20,"x":20,"width":40,"skin":"mvs/loading.png","pivotY":20,"pivotX":20,"height":40}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ReConnectUI.uiView);

        }

    }
}

module ui {
    export class ResultUI extends View {
		public btn_exit:Laya.Button;
		public txt_roomID:Laya.Label;
		public img_Player0:Laya.Image;
		public name_player0:Laya.Label;
		public img_Player1:Laya.Image;
		public name_player1:Laya.Label;
		public img_Player2:Laya.Image;
		public name_player2:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"staticCache":false,"height":720},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"lineColor":"#f1eeee","height":720,"fillColor":"#8dab84"}},{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":720}},{"type":"Button","props":{"y":570,"x":520,"width":240,"var":"btn_exit","stateNum":1,"skin":"mvs/btn1.png","labelSize":24,"labelColors":"#ffffff","label":"离开游戏","height":70}},{"type":"Label","props":{"y":115,"x":397,"width":494,"var":"txt_roomID","text":"房间号：183829939101299392","stroke":0,"name":"txt_roomID","height":37,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"center"}},{"type":"Panel","props":{"y":206,"x":400,"width":485,"height":323},"child":[{"type":"Image","props":{"y":0,"width":480,"visible":true,"skin":"mvs/inputBox.png","sizeGrid":"5,5,5,5","height":100}},{"type":"Image","props":{"y":9,"x":8,"width":87,"var":"img_Player0","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"name":"img_Player0","height":85},"child":[{"type":"Sprite","props":{"y":8,"x":-1,"width":88,"renderType":"mask","height":76},"child":[{"type":"Circle","props":{"y":35,"x":43,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":42,"x":103,"width":300,"var":"name_player0","text":"用户1","name":"name_player0","height":24,"fontSize":18,"color":"#060606","align":"center"}},{"type":"Image","props":{"y":108,"x":0,"width":480,"visible":true,"skin":"mvs/inputBox.png","sizeGrid":"5,5,5,5","height":100}},{"type":"Image","props":{"y":115,"x":8,"width":87,"var":"img_Player1","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"name":"img_Player1","height":85},"child":[{"type":"Sprite","props":{"y":8,"x":-1,"width":88,"renderType":"mask","height":76},"child":[{"type":"Circle","props":{"y":35,"x":43,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":144,"x":103,"width":300,"var":"name_player1","text":"用户1","name":"name_player1","height":25,"fontSize":18,"color":"#060606","align":"center"}},{"type":"Image","props":{"y":216,"width":480,"visible":true,"skin":"mvs/inputBox.png","sizeGrid":"5,5,5,5","height":100}},{"type":"Image","props":{"y":223,"x":8,"width":87,"var":"img_Player2","skin":"http://193.112.47.13/headimg/1.jpg","sizeGrid":"0,0,0,0","pivotX":-1,"name":"img_Player2","height":85},"child":[{"type":"Sprite","props":{"y":8,"x":-1,"width":88,"renderType":"mask","height":76},"child":[{"type":"Circle","props":{"y":35,"x":43,"radius":40,"lineWidth":1,"fillColor":"#ff0000"}}]}]},{"type":"Label","props":{"y":256,"x":103,"width":300,"var":"name_player2","text":"用户1","name":"name_player2","height":24,"fontSize":18,"color":"#060606","align":"center"}}]},{"type":"Label","props":{"y":56,"x":568,"width":144,"text":"游戏结果","stroke":0,"height":48,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ResultUI.uiView);

        }

    }
}

module ui {
    export class RoomListUI extends View {
		public btn_exit:Laya.Button;
		public txt_title:Laya.Label;
		public list_roomItems:Laya.List;
		public btn_entRoom:Laya.Button;
		public txt_roomID:Laya.Label;
		public txt_otherInfo:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":760},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1136,"lineWidth":1,"height":640,"fillColor":"#579564"}},{"type":"Image","props":{"y":0,"x":0,"width":1280,"skin":"mvs/bg.jpg","sizeGrid":"0,0,0,0,1","height":760}},{"type":"Button","props":{"y":63,"x":61,"var":"btn_exit","stateNum":1,"skin":"mvs/icon_back.png"}},{"type":"Label","props":{"y":56,"x":120,"width":175,"var":"txt_title","text":"房间列表","name":"txt_title","height":49,"fontSize":36,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}},{"type":"List","props":{"width":799,"var":"list_roomItems","renderType":"render","name":"list_roomItems","height":461,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":808,"renderType":"render","height":116},"child":[{"type":"Image","props":{"x":1,"width":800,"skin":"mvs/note.png","pivotX":1,"height":113}},{"type":"Button","props":{"y":43,"x":679,"width":160,"var":"btn_entRoom","stateNum":1,"skin":"mvs/btn1.png","pivotY":23,"pivotX":52,"name":"btn_entRoom","labelStrokeColor":"#050505","labelSize":18,"labelPadding":"0","labelFont":"Microsoft YaHei","labelColors":"#FFFFFF","label":"进入房间","height":70}},{"type":"Label","props":{"y":14,"x":75,"width":344,"var":"txt_roomID","text":"999999999999999999999","name":"txt_roomID","height":28,"fontSize":24,"color":"#060606","borderColor":"#f6f6f6","align":"center"}},{"type":"Label","props":{"y":42,"x":12,"wordWrap":true,"width":597,"var":"txt_otherInfo","valign":"middle","text":"label","name":"txt_otherInfo","height":57,"fontSize":24,"color":"#030303"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.RoomListUI.uiView);

        }

    }
}

module ui {
    export class WarningUI extends View {
		public txt_Message:Laya.Label;
		public btn_Return:Laya.Button;
		public txt_title:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1280,"height":760},"child":[{"type":"Panel","props":{"y":0,"x":0,"width":1280,"height":760,"alpha":0.4},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"lineColor":"#9f9a9a","height":760,"fillColor":"#645f58"}}]},{"type":"Image","props":{"y":180,"x":290,"width":700,"skin":"mvs/note.png","height":400,"centerY":0,"centerX":0}},{"type":"Label","props":{"y":283,"x":436,"wordWrap":true,"width":408,"var":"txt_Message","valign":"middle","text":"error","name":"txt_Message","height":170,"fontSize":18,"font":"Microsoft YaHei","color":"#030303","centerY":-12,"centerX":0,"bold":false,"align":"center"}},{"type":"Button","props":{"y":502,"width":122,"var":"btn_Return","stateNum":1,"skin":"mvs/exit.png","name":"btn_Return","labelSize":18,"labelColors":"000000","labelBold":true,"label":"返回","height":44,"centerX":2}},{"type":"Label","props":{"y":193,"x":588,"width":105,"var":"txt_title","text":"提示 ！","strokeColor":"#8c9c8e","stroke":5,"name":"txt_title","height":37,"fontSize":36,"color":"#000000","centerX":0,"bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.WarningUI.uiView);

        }

    }
}
