var __reflect=this&&this.__reflect||function(e,t,i){e.__class__=t,i?i.push(t):i=[t],e.__types__=e.__types__?i.concat(e.__types__):i},__extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);i.prototype=t.prototype,e.prototype=new i},__awaiter=this&&this.__awaiter||function(e,t,i,n){return new(i||(i=Promise))(function(r,o){function a(e){try{c(n.next(e))}catch(t){o(t)}}function s(e){try{c(n["throw"](e))}catch(t){o(t)}}function c(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(a,s)}c((n=n.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function i(e){return function(t){return n([e,t])}}function n(i){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,o&&(a=o[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(o,i[1])).done)return a;switch(o=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(a=c.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){c.label=i[1];break}if(6===i[0]&&c.label<a[1]){c.label=a[1],a=i;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(i);break}a[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(n){i=[6,n],o=0}finally{r=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var r,o,a,s,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},AcmojiNetwork=function(){function e(){}return e.init=function(e){this._local_id=e},e.dataOperation=function(){var e={action:"data-operation"},t={entity_name:this._entity_name};return{header:e,body:t}},e.save=function(e,t,i){var n=this.dataOperation();e.uid=this._local_id,n.body.operation_type="save",n.body.entity_value=e,this.request(n,t,i)},e.update=function(e,t,i){var n=this.dataOperation();e.uid=this._local_id,n.body.operation_type="update",n.body.entity_value=e,this.request(n,t,i)},e["delete"]=function(e,t){var i=this.dataOperation(),n={};n.uid=this._local_id,i.body.operation_type="delete",i.body.entity_value=n,this.request(i,e,t)},e.query=function(e,t,i){var n=this.dataOperation(),r={};r.uid=this._local_id,n.body.operation_type=e?"query_consistent":"consistent",n.body.entity_value=r,this.request(n,t,i)},e.request=function(e,t,i){var n=window.tm;n.Request({type:e.body.operation_type,name:e.body.entity_name,data:e.body.entity_value,success:function(e){t(e)},fail:function(){var e=new AcmojiNetworkError(0);console.log("Error: "+e.toString()),i(e)}})},e._entity_name="intmoji",e}();__reflect(AcmojiNetwork.prototype,"AcmojiNetwork");var AcmojiNetworkError=function(){function e(t){this.code=t,this.description=e.AcmojiNetworkErrorParser[t.toString()],this.description||(this.description="未知错误")}return e.prototype.toString=function(){return"errorCode:"+this.code+" errorDes:"+this.description},e.AcmojiNetworkErrorParser={0:"网络错误","-1":"解析失败","-2":"action参数不支持","-3":"参数不满足","-103":"内部错误","-201":"Uid不正确","-202":"无此操作权限","-203":"auth_key无效","-204":"app_key无效"},e}();__reflect(AcmojiNetworkError.prototype,"AcmojiNetworkError");var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,i){function n(n){t.call(i,n,e)}if(RES.hasRes(e)){var r=RES.getRes(e);r?n(r):RES.getResAsync(e,n,this)}else RES.getResByUrl(e,n,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){var t=e.call(this)||this;return t.hisInfo={name:""},t.myInfo={name:""},document.addEventListener("deviceready",t.deviceready.bind(t)),t}return __extends(t,e),t.prototype.initdata=function(){var e=this;AcmojiNetwork.query(!0,function(t){e.data=t,"undefined"==typeof t.receiverRPS&&(e.data.receiverRPS=0),"undefined"==typeof t.myScore&&(e.data.myScore=0),"undefined"==typeof t.heScore&&(e.data.heScore=0),e.isDeviceReady=!0,e.startGame()},function(e){console.log("query error")})},t.prototype.deviceready=function(){var e=this,t=window.tm;t&&t.GetMessageInfo({keys:["direct","sessionId","messageId"],success:function(i){e.isSender="out"===i.direct,e.isWaiting=e.isSender,AcmojiNetwork.init(i.messageId),t.GetUserInfo({id:i.sessionId,keys:["name"],success:function(i){e.isSender?e.hisInfo.name=i.name:e.myInfo.name=i.name,t.GetMyInfo({keys:["name"],success:function(t){e.isSender?e.myInfo.name=t.name:e.hisInfo.name=t.name,console.log("isDeviceReady--"+new Date),e.initdata()}})}})},fail:function(){}})},t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.isStageReady=!0,console.log("isStageReady--"+new Date),this.startGame()},t.prototype.startGame=function(){this.isReady()&&(console.log("isReady--"+new Date),this.runGame()["catch"](function(e){console.log(e)}))},t.prototype.isReady=function(){return this.isDeviceReady&&this.isStageReady},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.createGameScene(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return i.sent(),this.stage.removeChild(e),[3,5];case 4:return t=i.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,i){var n=new eui.Theme("resource/default.thm.json",e.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){this.createBg(246,278,this.isSender),this.createTitle(246,this.myInfo.name,this.hisInfo.name),this.createGameView(),this.createRPSView(),this.initGame(),this.bindEvent()},t.prototype.createBg=function(e,t,i){this.bg=new View,this.bg.setFrame(0,0,246,278),this.addChild(this.bg),this.bg.layoutSubviews(),this.bg.touchEnabled=!1,this.bg.setColor(i?16498697:6658047)},t.prototype.createTitle=function(e,t,i){var n=32,r=new egret.Sprite;r.graphics.beginFill(2520758,1),r.graphics.drawRect(0,0,e,n),r.graphics.endFill(),r.x=0,r.y=0,this.addChild(r);var o=n,a=e,s=a/2,c=o,d=s-c,h=new egret.TextField;h.background=!0,h.backgroundColor=2520758,h.$setBorder,h.size=13,h.width=d,h.height=o,h.textColor=16777215,h.text=t,h.textAlign=egret.HorizontalAlign.CENTER,h.verticalAlign=egret.VerticalAlign.MIDDLE,h.x=0,h.y=0,r.addChild(h);var u=new egret.TextField;u.background=!0,u.backgroundColor=16777215,u.size=13,u.border=!0,u.borderColor=2520758,u.width=c,u.height=c,u.textColor=0,u.text="0",u.textAlign=egret.HorizontalAlign.CENTER,u.verticalAlign=egret.VerticalAlign.MIDDLE,u.x=d,u.y=0,r.addChild(u);var l=new egret.TextField;l.background=!0,l.backgroundColor=16504763,l.size=13,l.border=!0,l.borderColor=15963208,l.width=d,l.height=o,l.textColor=0,l.text=i,l.textAlign=egret.HorizontalAlign.CENTER,l.verticalAlign=egret.VerticalAlign.MIDDLE,l.x=s,l.y=0,r.addChild(l);var p=new egret.TextField;p.background=!0,p.backgroundColor=16777215,p.size=13,p.border=!0,p.borderColor=15963208,p.width=c,p.height=c,p.textColor=0,p.text="0",p.textAlign=egret.HorizontalAlign.CENTER,p.verticalAlign=egret.VerticalAlign.MIDDLE,p.x=s+d,p.y=0,r.addChild(p),this.title={myNameTxt:h,myScoreTxt:u,hisNameTxt:l,hisScoreTxt:p}},t.prototype.createGameView=function(){var e=this.createBitmapByName("scissors_words_png");e.x=105,e.y=74,e.width=45,e.height=23,this.addChild(e);var t=this.createBitmapByName("rock_words_png");t.x=50,t.y=160,t.width=35,t.height=45,this.addChild(t);var i=this.createBitmapByName("paper_words_png");i.x=170,i.y=160,i.width=35,i.height=40,this.addChild(i);var n=this.createBitmapByName("arrow_png");n.x=35,n.y=60,n.width=181,n.height=165,this.addChild(n);var r=this.createBitmapByName("scissors_png");r.x=78,r.y=113,r.width=36,r.height=36,this.addChild(r);var o=this.createBitmapByName("rock_png");o.x=104,o.y=165,o.width=36,o.height=36,this.addChild(o);var a=this.createBitmapByName("paper_png");a.x=134,a.y=113,a.width=36,a.height=36,this.addChild(a)},t.prototype.initGame=function(){this.title.myScoreTxt.text=this.data.myScore.toString(),this.title.hisScoreTxt.text=this.data.heScore.toString(),this.isSender?0==this.data.receiverRPS?(this.bg.setColor(16498697),this.rock_hand_btn.selected=!1,this.scissors_hand_btn.selected=!1,this.paper_hand_btn.selected=!1,this.buttonEnabled(!1)):(this.bg.setColor(6658047),this.rock_hand_btn.selected=!1,this.scissors_hand_btn.selected=!1,this.paper_hand_btn.selected=!1,this.buttonEnabled(!0)):0==this.data.receiverRPS?(this.bg.setColor(6658047),this.rock_hand_btn.selected=!1,this.scissors_hand_btn.selected=!1,this.paper_hand_btn.selected=!1,this.buttonEnabled(!0)):(1==this.data.receiverRPS?this.rock_hand_btn.selected=!0:2==this.data.receiverRPS?this.scissors_hand_btn.selected=!0:3==this.data.receiverRPS&&(this.paper_hand_btn.selected=!0),this.bg.setColor(16498697),this.buttonEnabled(!1))},t.prototype.createRPSView=function(){this.paper_hand_btn=new eui.ToggleButton,this.paper_hand_btn.x=168,this.paper_hand_btn.y=80,this.paper_hand_btn.width=62,this.paper_hand_btn.height=62,this.addChild(this.paper_hand_btn),this.paper_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.casePaper,this),this.paper_hand_btn.skinName="resource/eui_skins/PaperButton.exml",this.rock_hand_btn=new eui.ToggleButton,this.rock_hand_btn.x=92,this.rock_hand_btn.y=202,this.rock_hand_btn.width=62,this.rock_hand_btn.height=62,this.addChild(this.rock_hand_btn),this.rock_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.caseRock,this),this.rock_hand_btn.skinName="resource/eui_skins/RockButton.exml",this.scissors_hand_btn=new eui.ToggleButton,this.scissors_hand_btn.x=18,this.scissors_hand_btn.y=80,this.scissors_hand_btn.width=62,this.scissors_hand_btn.height=62,this.addChild(this.scissors_hand_btn),this.scissors_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.caseScissors,this),this.scissors_hand_btn.skinName="resource/eui_skins/ScissorsButton.exml"},t.prototype.buttonEnabled=function(e){this.scissors_hand_btn.touchEnabled=e,this.paper_hand_btn.touchEnabled=e,this.rock_hand_btn.touchEnabled=e},t.prototype.tapRps=function(e){var t=this;if(!this.isSender){this.bg.setColor(16498697),this.buttonEnabled(!1);var i={receiverRPS:e};return void AcmojiNetwork.update(i,function(e){t.sendNotification(),t.data={},"undefined"==typeof e.receiverRPS&&(t.data.receiverRPS=0),"undefined"==typeof e.myScore&&(t.data.myScore=0),"undefined"==typeof e.heScore&&(t.data.heScore=0),t.initGame()},function(e){t.buttonEnabled(!0)})}this.buttonEnabled(!1);var n=this.checWin(e,this.data.receiverRPS),r=this.data;r.receiverRPS=0,0==n||(-1==n?r.myScore+=1:1==n&&(r.heScore+=1)),AcmojiNetwork.update(r,function(e){t.data=e,t.initGame(),t.sendNotification()},function(e){t.initGame()})},t.prototype.onIntmojiStateChanged=function(e){var t=this,i=e.intmoji;"update"==i.command&&AcmojiNetwork.query(!0,function(e){t.data=e,"undefined"==typeof e.receiverRPS&&(t.data.receiverRPS=0),"undefined"==typeof e.myScore&&(t.data.myScore=0),"undefined"==typeof e.heScore&&(t.data.heScore=0),t.initGame()},function(e){console.log("query error")})},t.prototype.caseRock=function(){this.tapRps(1)},t.prototype.caseScissors=function(){this.tapRps(2)},t.prototype.casePaper=function(){this.tapRps(3)},t.prototype.bindEvent=function(){window.addEventListener("notificationreceiver",this.onIntmojiStateChanged.bind(this),!1)},t.prototype.sendNotification=function(){setTimeout(function(){var e=window.tm;e&&e.SendNotification({type:"custom",data:{command:"update"}})},0)},t.prototype.checWin=function(e,t){return 1==e&&1==t||2==e&&2==t||3==e&&3==t?0:1==e&&2==t||2==e&&3==t||3==e&&1==t?-1:1},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,i=RES.getRes(e);return t.texture=i,t},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,i,n){function r(e){t.call(n,e)}function o(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),i.call(n))}var a=this;"undefined"!=typeof generateEUI?egret.callLater(function(){t.call(n,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(e,i){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(n,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(e,r,this,RES.ResourceItem.TYPE_TEXT))},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var View=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.layoutSubviews=function(){this.color&&this.setColor(this.color)},t.prototype.setColor=function(e){this.graphics.beginFill(e),this.graphics.drawRect(0,0,this.width,this.height),this.graphics.endFill(),this.color=e},t.prototype.setFrame=function(e,t,i,n){this.x=e,this.y=t,this.width=i,this.height=n},t}(egret.Sprite);__reflect(View.prototype,"View");