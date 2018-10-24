class AcmojiNetworkError {
    code: number
    description: string

    constructor (code: number) {
        this.code = code;
        this.description = AcmojiNetworkError.AcmojiNetworkErrorParser[code.toString()];
        if (!this.description) {
            this.description = "未知错误";
        }
    }
    public toString() {
        return "errorCode:" + this.code + " " + "errorDes:" + this.description;   
    }
    static AcmojiNetworkErrorParser = {
        "0":    "网络错误",
        "-1":   "解析失败",
        "-2":   "action参数不支持",
        "-3":   "参数不满足",
        "-103": "内部错误",
        "-201": "Uid不正确",
        "-202": "无此操作权限",
        "-203": "auth_key无效",
        "-204": "app_key无效"
    }
}