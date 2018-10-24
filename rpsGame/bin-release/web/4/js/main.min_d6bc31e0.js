var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);n.prototype=e.prototype,t.prototype=new n},__awaiter=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(r,o){function a(t){try{h(i.next(t))}catch(e){o(e)}}function s(t){try{h(i["throw"](t))}catch(e){o(e)}}function h(t){t.done?r(t.value):new n(function(e){e(t.value)}).then(a,s)}h((i=i.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function n(t){return function(e){return i([t,e])}}function i(n){if(r)throw new TypeError("Generator is already executing.");for(;h;)try{if(r=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return h.label++,{value:n[1],done:!1};case 5:h.label++,o=n[1],n=[0];continue;case 7:n=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){h=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){h.label=n[1];break}if(6===n[0]&&h.label<a[1]){h.label=a[1],a=n;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(n);break}a[2]&&h.ops.pop(),h.trys.pop();continue}n=e.call(t,h)}catch(i){n=[6,i],o=0}finally{r=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var r,o,a,s,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},AcmojiNetwork=function(){function t(){}return t.init=function(t){this._local_id=t},t.dataOperation=function(){var t={action:"data-operation"},e={entity_name:this._entity_name};return{header:t,body:e}},t.save=function(t,e,n){var i=this.dataOperation();t.uid=this._local_id,i.body.operation_type="save",i.body.entity_value=t,this.request(i,e,n)},t.update=function(t,e,n){var i=this.dataOperation();t.uid=this._local_id,i.body.operation_type="update",i.body.entity_value=t,this.request(i,e,n)},t["delete"]=function(t,e){var n=this.dataOperation(),i={};i.uid=this._local_id,n.body.operation_type="delete",n.body.entity_value=i,this.request(n,t,e)},t.query=function(t,e,n){var i=this.dataOperation(),r={};r.uid=this._local_id,i.body.operation_type=t?"query_consistent":"consistent",i.body.entity_value=r,this.request(i,e,n)},t.request=function(t,e,n){var i=window.tm;i.Request({type:t.body.operation_type,name:t.body.entity_name,data:t.body.entity_value,success:function(t){e(t)},fail:function(){var t=new AcmojiNetworkError(0);console.log("Error: "+t.toString()),n(t)}})},t._entity_name="intmoji",t}();__reflect(AcmojiNetwork.prototype,"AcmojiNetwork");var AcmojiNetworkError=function(){function t(e){this.code=e,this.description=t.AcmojiNetworkErrorParser[e.toString()],this.description||(this.description="未知错误")}return t.prototype.toString=function(){return"errorCode:"+this.code+" errorDes:"+this.description},t.AcmojiNetworkErrorParser={0:"网络错误","-1":"解析失败","-2":"action参数不支持","-3":"参数不满足","-103":"内部错误","-201":"Uid不正确","-202":"无此操作权限","-203":"auth_key无效","-204":"app_key无效"},t}();__reflect(AcmojiNetworkError.prototype,"AcmojiNetworkError");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,n){function i(i){e.call(n,i,t)}if(RES.hasRes(t)){var r=RES.getRes(t);r?i(r):RES.getResAsync(t,i,this)}else RES.getResByUrl(t,i,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){var e=t.call(this)||this;return e.hisInfo={name:""},e.myInfo={name:""},document.addEventListener("deviceready",e.deviceready.bind(e)),e}return __extends(e,t),e.prototype.initdata=function(){var t=this;AcmojiNetwork.query(!0,function(e){t.data=e,"undefined"==typeof e.rs&&(t.data.rs=0),"undefined"==typeof e.a&&(t.data.a=0),"undefined"==typeof e.b&&(t.data.b=0),t.isDeviceReady=!0,t.startGame()},function(t){console.log("query error")})},e.prototype.deviceready=function(){var t=this,e=window.tm;e&&e.GetMessageInfo({keys:["direct","sessionId","messageId"],success:function(n){t.isSender="out"===n.direct,t.isWaiting=t.isSender,AcmojiNetwork.init(n.messageId),e.GetUserInfo({id:n.sessionId,keys:["name"],success:function(n){t.isSender?t.hisInfo.name=n.name:t.myInfo.name=n.name,e.GetMyInfo({keys:["name"],success:function(e){t.isSender?t.myInfo.name=e.name:t.hisInfo.name=e.name,console.log("isDeviceReady--"+new Date),t.initdata()}})}})},fail:function(){}})},e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.isStageReady=!0,console.log("isStageReady--"+new Date),this.startGame()},e.prototype.startGame=function(){this.isReady()&&(console.log("isReady--"+new Date),this.runGame()["catch"](function(t){console.log(t)}))},e.prototype.isReady=function(){return this.isDeviceReady&&this.isStageReady},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return n.sent(),this.stage.removeChild(t),[3,5];case 4:return e=n.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,n){var i=new eui.Theme("resource/default.thm.json",t.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){this.createBg(246,278,this.isSender),this.createTitle(246,this.myInfo.name,this.hisInfo.name),this.createGameView(),this.createRPSView(),this.initGame(),this.bindEvent()},e.prototype.createBg=function(t,e,n){this.bg=new View,this.bg.setFrame(0,0,246,278),this.addChild(this.bg),this.bg.layoutSubviews(),this.bg.touchEnabled=!1,this.bg.setColor(n?16498697:6658047)},e.prototype.createTitle=function(t,e,n){var i=32,r=new egret.Sprite;r.graphics.beginFill(2520758,1),r.graphics.drawRect(0,0,t,i),r.graphics.endFill(),r.x=0,r.y=0,this.addChild(r);var o=i,a=t,s=a/2,h=o,d=s-h,c=new egret.TextField;c.background=!0,c.backgroundColor=2520758,c.$setBorder,c.size=13,c.width=d,c.height=o,c.textColor=16777215,c.text=e,c.textAlign=egret.HorizontalAlign.CENTER,c.verticalAlign=egret.VerticalAlign.MIDDLE,c.x=0,c.y=0,r.addChild(c);var u=new egret.TextField;u.background=!0,u.backgroundColor=16777215,u.size=13,u.border=!0,u.borderColor=2520758,u.width=h,u.height=h,u.textColor=0,u.text="0",u.textAlign=egret.HorizontalAlign.CENTER,u.verticalAlign=egret.VerticalAlign.MIDDLE,u.x=d,u.y=0,r.addChild(u);var l=new egret.TextField;l.background=!0,l.backgroundColor=16504763,l.size=13,l.border=!0,l.borderColor=15963208,l.width=d,l.height=o,l.textColor=0,l.text=n,l.textAlign=egret.HorizontalAlign.CENTER,l.verticalAlign=egret.VerticalAlign.MIDDLE,l.x=s,l.y=0,r.addChild(l);var p=new egret.TextField;p.background=!0,p.backgroundColor=16777215,p.size=13,p.border=!0,p.borderColor=15963208,p.width=h,p.height=h,p.textColor=0,p.text="0",p.textAlign=egret.HorizontalAlign.CENTER,p.verticalAlign=egret.VerticalAlign.MIDDLE,p.x=s+d,p.y=0,r.addChild(p),this.title={myNameTxt:c,myScoreTxt:u,hisNameTxt:l,hisScoreTxt:p}},e.prototype.createGameView=function(){var t=this.createBitmapByName("scissors_words_png");t.x=105,t.y=74,t.width=45,t.height=23,this.addChild(t);var e=this.createBitmapByName("rock_words_png");e.x=50,e.y=160,e.width=35,e.height=45,this.addChild(e);var n=this.createBitmapByName("paper_words_png");n.x=170,n.y=160,n.width=35,n.height=40,this.addChild(n);var i=this.createBitmapByName("arrow_png");i.x=35,i.y=60,i.width=181,i.height=165,this.addChild(i);var r=this.createBitmapByName("scissors_png");r.x=78,r.y=113,r.width=36,r.height=36,this.addChild(r);var o=this.createBitmapByName("rock_png");o.x=104,o.y=165,o.width=36,o.height=36,this.addChild(o);var a=this.createBitmapByName("paper_png");a.x=134,a.y=113,a.width=36,a.height=36,this.addChild(a)},e.prototype.initGame=function(){this.title.myScoreTxt.text=this.data.a.toString(),this.title.hisScoreTxt.text=this.data.b.toString(),this.isSender?0==this.data.rs?(this.bg.setColor(16498697),this.rock_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.scissors_hand_btn.touchEnabled=!1):(this.bg.setColor(6658047),this.rock_hand_btn.touchEnabled=!0,this.paper_hand_btn.touchEnabled=!0,this.scissors_hand_btn.touchEnabled=!0):0==this.data.rs?(this.bg.setColor(6658047),this.rock_hand_btn.touchEnabled=!0,this.paper_hand_btn.touchEnabled=!0,this.scissors_hand_btn.touchEnabled=!0):(1==this.data.rs?this.rock_hand_btn.selected=!0:2==this.data.rs?this.scissors_hand_btn.selected=!0:3==this.data.rs&&(this.paper_hand_btn.selected=!0),this.bg.setColor(16498697),this.rock_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.scissors_hand_btn.touchEnabled=!1)},e.prototype.createRPSView=function(){this.paper_hand_btn=new eui.ToggleButton,this.paper_hand_btn.x=168,this.paper_hand_btn.y=80,this.paper_hand_btn.width=62,this.paper_hand_btn.height=62,this.addChild(this.paper_hand_btn),this.paper_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.casePaper,this),this.paper_hand_btn.skinName="resource/eui_skins/PaperButton.exml",this.rock_hand_btn=new eui.ToggleButton,this.rock_hand_btn.x=92,this.rock_hand_btn.y=202,this.rock_hand_btn.width=62,this.rock_hand_btn.height=62,this.addChild(this.rock_hand_btn),this.rock_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.caseRock,this),this.rock_hand_btn.skinName="resource/eui_skins/RockButton.exml",this.scissors_hand_btn=new eui.ToggleButton,this.scissors_hand_btn.x=18,this.scissors_hand_btn.y=80,this.scissors_hand_btn.width=62,this.scissors_hand_btn.height=62,this.addChild(this.scissors_hand_btn),this.scissors_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.caseScissors,this),this.scissors_hand_btn.skinName="resource/eui_skins/ScissorsButton.exml"},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,n=RES.getRes(t);return e.texture=n,e},e.prototype.caseRock=function(){var t=this;if(!this.isSender){this.scissors_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.rock_hand_btn.touchEnabled=!1;var e={rs:1};return void AcmojiNetwork.update(e,function(e){t.sendNotification(),t.data={},"undefined"==typeof e.rs&&(t.data.rs=0),"undefined"==typeof e.a&&(t.data.a=0),"undefined"==typeof e.a&&(t.data.b=0),t.initGame()},function(e){t.scissors_hand_btn.touchEnabled=!0,t.paper_hand_btn.touchEnabled=!0,t.rock_hand_btn.touchEnabled=!0})}this.scissors_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.rock_hand_btn.touchEnabled=!1;var n=1,i=this.checWin(n,this.data.rs),r=this.data;r.rs=0,0==i||(-1==i?r.a+=1:1==i&&(r.b+=1)),AcmojiNetwork.update(r,function(e){t.data=e,t.initGame(),t.sendNotification()},function(e){t.initGame()})},e.prototype.caseScissors=function(){var t=this;if(!this.isSender){this.scissors_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.rock_hand_btn.touchEnabled=!1;var e={rs:2};return void AcmojiNetwork.update(e,function(e){t.sendNotification(),t.data={},"undefined"==typeof e.rs&&(t.data.rs=0),"undefined"==typeof e.a&&(t.data.a=0),"undefined"==typeof e.b&&(t.data.b=0),t.initGame()},function(e){t.scissors_hand_btn.touchEnabled=!0,t.paper_hand_btn.touchEnabled=!0,t.rock_hand_btn.touchEnabled=!0})}this.scissors_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.rock_hand_btn.touchEnabled=!1;var n=2,i=this.checWin(n,this.data.rs),r=this.data;r.rs=0,0==i||(-1==i?r.a+=1:1==i&&(r.b+=1)),AcmojiNetwork.update(r,function(e){t.data=e,t.initGame(),t.sendNotification()},function(e){t.initGame()})},e.prototype.casePaper=function(){var t=this;if(!this.isSender){this.scissors_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.rock_hand_btn.touchEnabled=!1;var e={rs:3};return void AcmojiNetwork.update(e,function(e){t.sendNotification(),t.data={},"undefined"==typeof e.rs&&(t.data.rs=0),"undefined"==typeof e.a&&(t.data.a=0),"undefined"==typeof e.b&&(t.data.b=0),t.initGame()},function(e){t.scissors_hand_btn.touchEnabled=!0,t.paper_hand_btn.touchEnabled=!0,t.rock_hand_btn.touchEnabled=!0})}this.scissors_hand_btn.touchEnabled=!1,this.paper_hand_btn.touchEnabled=!1,this.rock_hand_btn.touchEnabled=!1;var n=3,i=this.checWin(n,this.data.rs),r=this.data;r.rs=0,0==i||(-1==i?r.a+=1:1==i&&(r.b+=1)),AcmojiNetwork.update(r,function(e){t.data=e,t.initGame(),t.sendNotification()},function(e){t.initGame()})},e.prototype.buttonEnabled=function(t){this.scissors_hand_btn.touchEnabled=t,this.paper_hand_btn.touchEnabled=t,this.rock_hand_btn.touchEnabled=t},e.prototype.bindEvent=function(){window.addEventListener("notificationreceiver",this.onIntmojiStateChanged.bind(this),!1)},e.prototype.onIntmojiStateChanged=function(t){var e=this,n=t.intmoji;"update"==n.command&&AcmojiNetwork.query(!0,function(t){e.data=t,"undefined"==typeof t.rs&&(e.data.rs=0),"undefined"==typeof t.a&&(e.data.a=0),"undefined"==typeof t.b&&(e.data.b=0),e.initGame()},function(t){console.log("query error")})},e.prototype.sendNotification=function(){setTimeout(function(){var t=window.tm;t&&t.SendNotification({type:"custom",data:{command:"update"}})},0)},e.prototype.increaseMyScore=function(){this.title.myScoreTxt.text=parseInt(this.title.myScoreTxt.text)+1+""},e.prototype.increaseHisScore=function(){this.title.hisScoreTxt.text=parseInt(this.title.hisScoreTxt.text)+1+""},e.prototype.checWin=function(t,e){return 1==this.myNumber&&1==e||2==this.myNumber&&2==e||3==this.myNumber&&3==e?0:1==this.myNumber&&2==e||2==this.myNumber&&3==e||3==this.myNumber&&1==e?-1:1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,n,i){function r(t){e.call(i,t)}function o(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),n.call(i))}var a=this;"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(i,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(t,n){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(i,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var View=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.layoutSubviews=function(){this.color&&this.setColor(this.color)},e.prototype.setColor=function(t){this.graphics.beginFill(t),this.graphics.drawRect(0,0,this.width,this.height),this.graphics.endFill(),this.color=t},e.prototype.setFrame=function(t,e,n,i){this.x=t,this.y=e,this.width=n,this.height=i},e}(egret.Sprite);__reflect(View.prototype,"View");