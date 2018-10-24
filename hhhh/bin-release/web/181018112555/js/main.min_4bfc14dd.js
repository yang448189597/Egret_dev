var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,r){return new(i||(i=Promise))(function(n,s){function a(t){try{h(r.next(t))}catch(e){s(e)}}function o(t){try{h(r["throw"](t))}catch(e){s(e)}}function h(t){t.done?n(t.value):new i(function(e){e(t.value)}).then(a,o)}h((r=r.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return r([t,e])}}function r(i){if(n)throw new TypeError("Generator is already executing.");for(;h;)try{if(n=1,s&&(a=s[2&i[0]?"return":i[0]?"throw":"next"])&&!(a=a.call(s,i[1])).done)return a;switch(s=0,a&&(i=[0,a.value]),i[0]){case 0:case 1:a=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,s=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){h.label=i[1];break}if(6===i[0]&&h.label<a[1]){h.label=a[1],a=i;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(i);break}a[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(r){i=[6,r],s=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var n,s,a,o,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o},AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function r(r){e.call(i,r,t)}if(RES.hasRes(t)){var n=RES.getRes(t);n?r(n):RES.getResAsync(t,r,this)}else RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){var e=t.call(this)||this;return e.isDeviceReady=!0,e.isStageReady=!0,e}return __extends(e,t),e.prototype.deviceready=function(){this.isDeviceReady=!0},e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.isStageReady=!0,console.log("isStageReady--"+new Date),this.startGame()},e.prototype.startGame=function(){this.isReady()&&(console.log("isReady--"+new Date),this.runGame()["catch"](function(t){console.log(t)}))},e.prototype.isReady=function(){return this.isDeviceReady&&this.isStageReady},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return i.sent(),this.stage.removeChild(t),[3,5];case 4:return e=i.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var r=new eui.Theme("resource/default.thm.json",t.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){window.switchGameScenme();var t=this.stage.stageWidth,e=this.stage.stageHeight,i=new egret.Shape,r=new egret.Matrix;r.createGradientBox(t,e,.5*Math.PI,0,0),i.graphics.beginGradientFill(egret.GradientType.LINEAR,[16627785,16777215],[1,1],[0,255],r),i.graphics.drawRect(0,0,t,e),i.graphics.endFill(),this.addChild(i);var n=new SlotMachine;n.horizontalCenter=0,n.top=100,this.addChild(n)},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Utils=function(){function t(){}return t.getTexture=function(t){var e=this;return new Promise(function(i,r){RES.getResByUrl(t,function(t){i(t)},e,RES.ResourceItem.TYPE_IMAGE)})},t}();__reflect(Utils.prototype,"Utils");var SlotMachine=function(t){function e(){var e=t.call(this)||this;return e.layerName="老虎机",e.isAnimating=!1,e.itemWidth=100,e.itemHeight=150,e.gap=20,e.tweenFlag=3,e.tweenFinsh=0,e.lastStep1=0,e.lastStep2=0,e.lastStep3=0,e.width=334,e.height=500,e.bgColor="0XFFC600",e.tittleColor="0XFF9E3B",e.bdUrl="/assets/pic/item_1.png",e.reward=0,e.coin=100,e.awardsTotal=[{url:"/assets/pic/item_1.png"},{url:"/assets/pic/item_2.png"},{url:"/assets/pic/item_3.png"},{url:"/assets/pic/item_4.png"},{url:"/assets/pic/item_5.png"},{url:"/assets/pic/item_6.png"},{url:"/assets/pic/item_7.png"},{url:"/assets/pic/item_8.png"},{url:"/assets/pic/item_9.png"},{url:"/assets/pic/item_10.png"},{url:"/assets/pic/item_11.png"},{url:"/assets/pic/item_12.png"},{url:"/assets/pic/item_13.png"},{url:"/assets/pic/item_14.png"}],e._awards=[{url:"/assets/pic/post_item_2.png"},{url:"/assets/pic/post_item_3.png"},{url:"/assets/pic/post_item_1.png"},{url:"/assets/pic/post_item_4.png"},{url:"/assets/pic/post_item_6.png"},{url:"/assets/pic/post_item_5.png"}],e.touchEnabled=!1,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e.addEventListener(egret.Event.REMOVED_FROM_STAGE,e.onRemoveFromStage,e),e}return __extends(e,t),e.prototype.draw=function(){},e.prototype.dispose=function(){},Object.defineProperty(e.prototype,"awards",{get:function(){return this._awards},set:function(t){this._awards=t;var e=t.slice(0,1);this.awardsTotal=t.concat(e)},enumerable:!0,configurable:!0}),e.prototype.getProps=function(){return{bgColor:this.bgColor,bdUrl:this.bdUrl,awards:this.awards}},e.prototype.setProps=function(t){this.awards=t.awards,this.bdUrl=t.bdUrl,this.bgColor=t.bgColor},e.prototype.redraw=function(){this.removeChildren(),this.init()},e.prototype.onAddToStage=function(t){this.init()},e.prototype.onRemoveFromStage=function(t){},e.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i;return __generator(this,function(r){switch(r.label){case 0:return[4,this.createMainBox()];case 1:return t=r.sent(),[4,this.createTitle()];case 2:return e=r.sent(),i=this.createStartBtn(),this.addChild(t),this.addChild(e),this.addChild(i),[2]}})})},e.prototype.createTitle=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,r;return __generator(this,function(n){return t=new eui.Group,t.horizontalCenter=0,e=this.stage.stageWidth,i=this.stage.stageHeight,t.width=e-60,t.height=44,r=new egret.Sprite,r.graphics.beginFill(16752187,1),r.graphics.drawRoundRect(0,0,t.width,t.height,30,30),r.graphics.endFill(),r.x=0,r.y=0,this.rewardTxt=new egret.TextField,this.rewardTxt.background=!0,this.rewardTxt.backgroundColor=16752187,this.rewardTxt.size=18,this.rewardTxt.width=t.width/2,this.rewardTxt.height=t.height,this.rewardTxt.textColor=16777215,this.rewardTxt.text="Reward: "+this.reward,this.rewardTxt.textAlign=egret.HorizontalAlign.CENTER,this.rewardTxt.verticalAlign=egret.VerticalAlign.MIDDLE,this.rewardTxt.x=0,this.rewardTxt.y=0,this.coinTxt=new egret.TextField,this.coinTxt.background=!0,this.coinTxt.backgroundColor=3385087,this.coinTxt.size=18,this.coinTxt.width=t.width/2,this.coinTxt.height=t.height,this.coinTxt.textColor=16777215,this.coinTxt.text="Coin: "+this.coin,this.coinTxt.textAlign=egret.HorizontalAlign.CENTER,this.coinTxt.verticalAlign=egret.VerticalAlign.MIDDLE,this.coinTxt.x=t.width/2,this.coinTxt.y=0,r.addChild(this.rewardTxt),r.addChild(this.coinTxt),t.addChild(r),[2,t]})})},e.prototype.createMainBox=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,r,n,s;return __generator(this,function(a){switch(a.label){case 0:t=new eui.Group,t.horizontalCenter=0,t.width=this.stage.stageWidth-60,t.height=this.itemHeight+2*this.gap,t.top=75,e=new egret.Shape,e.graphics.beginFill(this.bgColor,1),e.graphics.drawRoundRect(0,0,t.width,t.height,20,20),e.graphics.endFill(),i=new eui.Group,i.width=this.stage.stageWidth-60,i.height=t.height,this.itemGroup=i,i.mask=new egret.Rectangle(0,0,i.width,i.height),r=0,n=3,a.label=1;case 1:return n>r?[4,this.createItemBox()]:[3,4];case 2:s=a.sent(),s.x=(30+this.itemWidth)*r+30,s.y=this.gap,i.addChild(s),a.label=3;case 3:return r++,[3,1];case 4:return t.addChild(e),t.addChild(i),[2,t]}})})},e.prototype.createItemBox=function(){return __awaiter(this,void 0,void 0,function(){var t,e,i,r,n;return __generator(this,function(s){switch(s.label){case 0:for(t=new eui.Group,t.width=this.itemWidth,t.height=(this.itemWidth+this.gap)*this.awardsTotal.length-this.gap,e=new eui.VerticalLayout,e.gap=this.gap,e.paddingTop=0,t.layout=e,i=[],r=0,n=this.awardsTotal.length;n>r;r++)i.push(this.createItem(this.awardsTotal[r].url));return[4,Promise.all(i).then(function(e){for(var i=0,r=e.length;r>i;i++){var n=e[i];t.addChild(n)}})];case 1:return s.sent(),[2,t]}})})},e.prototype.createItem=function(t){return __awaiter(this,void 0,void 0,function(){var e,i,r;return __generator(this,function(n){switch(n.label){case 0:return e=new eui.Group,e.width=this.itemWidth,e.height=this.itemHeight,[4,this.createImg(this.bdUrl)];case 1:return i=n.sent(),[4,this.createImg(t)];case 2:return r=n.sent(),e.addChild(i),e.addChild(r),[2,e]}})})},e.prototype.createImg=function(t){return __awaiter(this,void 0,void 0,function(){var e,i;return __generator(this,function(r){switch(r.label){case 0:return e=new egret.Bitmap,[4,Utils.getTexture("resource/"+t)];case 1:return i=r.sent(),e.width=this.itemWidth,e.height=this.itemHeight,e.texture=i,[2,e]}})})},e.prototype.createStartBtn=function(){var t=new eui.Button;return t.horizontalCenter=0,t.top=this.stage.stageHeight-250,t.height=88,t.width=88,t.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnClick,this),t.skinName="resource/eui_skins/startButton.exml",t},e.prototype.OnClick=function(t){if(t.stopPropagation(),t.stopImmediatePropagation(),3===this.tweenFlag){this.tweenFlag=0;var e=this.awardsTotal.length-1,i=4,r=Math.floor(Math.random()*e)+i,n=Math.floor(Math.random()*e)+i,s=Math.floor(Math.random()*e)+i;console.log("this.awardsTotal.length..."+this.awardsTotal.length),console.log("step1..."+r),console.log("step2..."+n),console.log("step3..."+s);var a=200*(this.awardsTotal.length-1),o=1e3,h=Math.floor(Math.random()*a)+o,c=Math.floor(Math.random()*a)+o,l=Math.floor(Math.random()*a)+o,d=this.itemGroup.getChildAt(0),u=this.itemGroup.getChildAt(1),p=this.itemGroup.getChildAt(2);this.lastStep1+=r,this.lastStep2+=n,this.lastStep3+=s,this.firstIndex=this.lastStep1%(this.awardsTotal.length-1),this.secondIndex=this.lastStep2%(this.awardsTotal.length-1),this.thirdIndex=this.lastStep3%(this.awardsTotal.length-1),this.endTween(d,r,h),this.endTween(u,n,c),this.endTween(p,s,l),this.updateCoin()}},e.prototype.endTween=function(t,e,i){var r=this;void 0===i&&(i=500);var n=t.y,s=-(this.itemHeight+this.gap)*e,a=n+s,o=-(this.itemHeight+this.gap)*(this.awardsTotal.length-1)+this.gap;if(o>a){var h=i/e,c=(o-n)/-(this.itemHeight+this.gap),l=e-c,d=c*h,u=i-d,p=egret.Tween.get(t);p.to({y:o},d).call(function(){t.y=20,r.endTween(t,l,u)})}else a>o?egret.Tween.get(t).to({y:a},i).call(function(){r.tweenFlag+=1,r.tweenFinsh+=1,3==r.tweenFinsh&&r.updateReward()}):a==o&&egret.Tween.get(t).to({y:a},i).call(function(){t.y=20,r.tweenFlag+=1,r.tweenFinsh+=1,3==r.tweenFinsh&&r.updateReward()})},e.prototype.updateCoin=function(){this.coin-=1,this.coinTxt.text="Coin: "+this.coin},e.prototype.updateReward=function(){this.firstIndex==this.secondIndex&&this.firstIndex==this.thirdIndex?(6==this.firstIndex&&6==this.secondIndex&&6==this.thirdIndex?this.reward+=7:this.reward+=2,this.rewardTxt.text="Reward: "+this.reward):(this.firstIndex==this.secondIndex||this.firstIndex==this.thirdIndex||this.secondIndex==this.thirdIndex)&&(this.reward+=1,this.rewardTxt.text="Reward: "+this.reward),this.tweenFinsh=0,console.log("firstIndex..."+this.firstIndex),console.log("secondIndex..."+this.secondIndex),console.log("thirdIndex..."+this.thirdIndex)},e}(eui.Group);__reflect(SlotMachine.prototype,"SlotMachine");var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,r){function n(t){e.call(r,t)}function s(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),i.call(r))}var a=this;"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(r,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(t,i){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(r,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),RES.getResByUrl(t,n,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);