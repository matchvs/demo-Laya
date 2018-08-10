/*
* name;
*/
var PlatformType = /** @class */ (function () {
    function PlatformType(alp, rel) {
        this._alp = "";
        this._rel = "";
        this._alp = alp;
        this._rel = rel;
    }
    Object.defineProperty(PlatformType.prototype, "alp", {
        get: function () {
            return this._alp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformType.prototype, "rel", {
        get: function () {
            return this._rel;
        },
        enumerable: true,
        configurable: true
    });
    return PlatformType;
}());
var MsConfig = /** @class */ (function () {
    function MsConfig() {
    }
    MsConfig.channel = "Matchvs";
    MsConfig.PLATFROM_TYPE = new PlatformType("alpha", "release");
    MsConfig.platfrom = MsConfig.PLATFROM_TYPE.alp;
    //Matchvs 云托管游戏信息
    MsConfig.gameID = 201489;
    MsConfig.appKey = "4fb6406305f44f1aad0c40e5946ffe3d";
    MsConfig.secretKey = "5035d62b75bd4941b182579f2b8fc12c";
    //独立部署游戏信息
    MsConfig.preGameID = 1;
    MsConfig.preAppKey = "appkey01";
    MsConfig.preSecretKey = "appsecret01";
    MsConfig.preEndPoint = "mt21gateway.matchvs.com";
    return MsConfig;
}());
//# sourceMappingURL=MsConfig.js.map