var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AcmojiNetwork = (function () {
    function AcmojiNetwork() {
    }
    AcmojiNetwork.init = function (local_id) {
        this._local_id = local_id;
    };
    AcmojiNetwork.dataOperation = function () {
        var header = { action: "data-operation" };
        var body = { "entity_name": this._entity_name };
        return { "header": header, "body": body };
    };
    AcmojiNetwork.save = function (data, success, fail) {
        var param = this.dataOperation();
        data["uid"] = this._local_id;
        param.body["operation_type"] = "save";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    };
    AcmojiNetwork.update = function (data, success, fail) {
        var param = this.dataOperation();
        data["uid"] = this._local_id;
        param.body["operation_type"] = "update";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    };
    AcmojiNetwork.delete = function (success, fail) {
        var param = this.dataOperation();
        var data = {};
        data["uid"] = this._local_id;
        param.body["operation_type"] = "delete";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    };
    AcmojiNetwork.query = function (consistent, success, fail) {
        var param = this.dataOperation();
        var data = {};
        data["uid"] = this._local_id;
        param.body["operation_type"] = consistent ? "query_consistent" : "consistent";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    };
    AcmojiNetwork.request = function (param, success, fail) {
        var tm = window['tm'];
        tm.Request({
            type: param.body["operation_type"],
            name: param.body["entity_name"],
            data: param.body["entity_value"],
            success: function (res) {
                // if (res.code == 0) {
                //     success(res["entity_value"]);
                // }else {
                //     let error = new AcmojiNetworkError(res.code);
                //     console.log("Error: "+ error.toString());
                //     fail(error);
                // }
                success(res);
            },
            fail: function () {
                var error = new AcmojiNetworkError(0);
                console.log("Error: " + error.toString());
                fail(error);
            }
        });
    };
    AcmojiNetwork._entity_name = "intmoji";
    return AcmojiNetwork;
}());
__reflect(AcmojiNetwork.prototype, "AcmojiNetwork");
//# sourceMappingURL=AcmojiNetwork.js.map