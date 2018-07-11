/*
* name;
*/
module mvs {
    export class MsError{

        //错误码集合
        private _errMap:{[key:number]:string} = [];

        constructor(){
            this.init();
        }

        private init(){
            this._errMap[1001] = "您的【游戏】连接断开, 需要重新登录...";
            this._errMap[1002] = "您的【房间】连接断开, 请重开游戏...";
            this._errMap[406] = "房间已经关闭...";
            this._errMap[405] = "房间人已经满了...";
            this._errMap[404] = "找不到您要的信息...";
            this._errMap[500] = "游戏服务器错误...";
            this._errMap[402] = "用户信息验证错误...";
            this._errMap[-2] = "未初始化";
            this._errMap[-6] = "已经在房间";
        }

        /**
         * 添加错误说明
         * @param code 
         * @param msg 
         */
        public addErrMsg(code:number, msg:string){
            this._errMap[code] = msg;
        }

        public getErrMsg(code):string{
            return this._errMap[code];
        }


    }
}