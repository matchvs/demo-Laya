/*
* name;
*/
class GUser{
    public userID:number = 0;
    public name:string = "";
    public avatar:string = "";
    public token:string = "";
    
    constructor(_id?:number, _name ?:string, _ava?:string, _token?:string){
        if(_id){
            this.userID = _id;   
        }

        if(_name){
            this.name = _name;
        }

        if(_ava){
            this.avatar = _ava;
        }

        if(_token){
            this.token = _token;
        }
    }
}