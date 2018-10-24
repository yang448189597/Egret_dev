class AcmojiNetwork {
    private static _local_id:    string
    private static _entity_name: string = "intmoji"
    static init(local_id) {
        this._local_id = local_id;
    }
    private static dataOperation() {
        let header = {action   :"data-operation"};
        let body   = {"entity_name":this._entity_name};
        return {"header":header, "body":body};
    }
    static save(data:Object, success: (response: any)=>void, fail: (error: AcmojiNetworkError)=>void) {
        let param = this.dataOperation();
        data["uid"] = this._local_id;
        param.body["operation_type"] = "save";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    }
    static update(data:Object, success: (response: any)=>void, fail: (error: AcmojiNetworkError)=>void) {
        let param = this.dataOperation();
        data["uid"] = this._local_id;
        param.body["operation_type"] = "update";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    }
    static delete(success: (response: Object)=>void, fail: (error: AcmojiNetworkError)=>void) {
        let param = this.dataOperation();
        let data = {};
        data["uid"] = this._local_id;
        param.body["operation_type"] = "delete";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    }
    static query(consistent: boolean, success: (response: any)=> void, fail: (error: AcmojiNetworkError)=>void) {
        let param = this.dataOperation();
        let data = {};
        data["uid"] = this._local_id;
        param.body["operation_type"] = consistent ? "query_consistent":"consistent";
        param.body["entity_value"] = data;
        this.request(param, success, fail);
    }
    static request(param:any, success: (response: any)=> void, fail: (error: AcmojiNetworkError)=>void) {
         let tm = window['tm'];
        tm.Request({
            type: param.body["operation_type"],
            name: param.body["entity_name"],
            data: param.body["entity_value"],
            success:(res: any)=> {
                // if (res.code == 0) {
                //     success(res["entity_value"]);
                // }else {
                //     let error = new AcmojiNetworkError(res.code);
                //     console.log("Error: "+ error.toString());
                //     fail(error);
                // }
                success(res);
            },
            fail: ()=> {
                let error = new AcmojiNetworkError(0);
                console.log("Error: "+ error.toString());
                fail(error)
            }
        });
    }
}