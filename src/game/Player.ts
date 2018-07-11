/*
* name;
*/
class Player extends GUser{

    public tableID:number = 0;
    public isOwner:boolean = false;
    public score:number = 0;

    constructor(_id?:number, _name ?:string, _ava?:string, _token?:string){
        super(_id,_name,_ava, _token);
    }
}