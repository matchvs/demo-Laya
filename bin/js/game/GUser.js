/*
* name;
*/
var GUser = /** @class */ (function () {
    function GUser(_id, _name, _ava, _token) {
        this.userID = 0;
        this.name = "";
        this.avatar = "";
        this.token = "";
        if (_id) {
            this.userID = _id;
        }
        if (_name) {
            this.name = _name;
        }
        if (_ava) {
            this.avatar = _ava;
        }
        if (_token) {
            this.token = _token;
        }
    }
    return GUser;
}());
//# sourceMappingURL=GUser.js.map