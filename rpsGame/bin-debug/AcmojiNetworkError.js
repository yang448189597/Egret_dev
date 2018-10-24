var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AcmojiNetworkError = (function () {
    function AcmojiNetworkError(code) {
        this.code = code;
        this.description = AcmojiNetworkError.AcmojiNetworkErrorParser[code.toString()];
        if (!this.description) {
            this.description = "未知错误";
        }
    }
    AcmojiNetworkError.prototype.toString = function () {
        return "errorCode:" + this.code + " " + "errorDes:" + this.description;
    };
    AcmojiNetworkError.AcmojiNetworkErrorParser = {
        "0": "网络错误",
        "-1": "解析失败",
        "-2": "action参数不支持",
        "-3": "参数不满足",
        "-103": "内部错误",
        "-201": "Uid不正确",
        "-202": "无此操作权限",
        "-203": "auth_key无效",
        "-204": "app_key无效"
    };
    return AcmojiNetworkError;
}());
__reflect(AcmojiNetworkError.prototype, "AcmojiNetworkError");
//# sourceMappingURL=AcmojiNetworkError.js.map