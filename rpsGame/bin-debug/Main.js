var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.hisInfo = { name: "" };
        _this.myInfo = { name: "" };
        document.addEventListener("deviceready", _this.deviceready.bind(_this));
        return _this;
    }
    Main.prototype.initdata = function () {
        // {
        //     receiverRPS :0,
        //     myScore:0,
        //     heScore:0
        // }
        var _this = this;
        AcmojiNetwork.query(true, function (response) {
            _this.data = response;
            if (typeof (response.receiverRPS) == 'undefined') {
                _this.data.receiverRPS = 0;
            }
            if (typeof (response.myScore) == 'undefined') {
                _this.data.myScore = 0;
            }
            if (typeof (response.heScore) == 'undefined') {
                _this.data.heScore = 0;
            }
            _this.isDeviceReady = true;
            _this.startGame();
        }, function (error) {
            console.log("query error");
        });
    };
    Main.prototype.deviceready = function () {
        var self = this;
        var tm = window['tm'];
        if (!!tm) {
            tm.GetMessageInfo({
                keys: ["direct", "sessionId", "messageId"],
                success: function (data0) {
                    self.isSender = data0.direct === "out";
                    self.isWaiting = self.isSender;
                    AcmojiNetwork.init(data0.messageId);
                    tm.GetUserInfo({
                        id: data0.sessionId,
                        keys: ["name"],
                        success: function (data1) {
                            if (self.isSender) {
                                self.hisInfo.name = data1.name;
                            }
                            else {
                                self.myInfo.name = data1.name;
                            }
                            tm.GetMyInfo({
                                keys: ['name'], success: function (data2) {
                                    if (!self.isSender) {
                                        self.hisInfo.name = data2.name;
                                    }
                                    else {
                                        self.myInfo.name = data2.name;
                                    }
                                    console.log('isDeviceReady--' + new Date());
                                    self.initdata();
                                }
                            });
                        }
                    });
                },
                fail: function () { }
            });
        }
    };
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.isStageReady = true;
        console.log('isStageReady--' + new Date());
        this.startGame();
    };
    Main.prototype.startGame = function () {
        if (this.isReady()) {
            console.log('isReady--' + new Date());
            this.runGame().catch(function (e) {
                console.log(e);
            });
        }
    };
    Main.prototype.isReady = function () {
        return this.isDeviceReady && this.isStageReady;
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        window["switchGameScenme"]();
        this.createBg(246, 278, this.isSender);
        this.createTitle(246, this.myInfo.name, this.hisInfo.name);
        this.createGameView();
        this.createRPSView();
        this.initGame();
        this.bindEvent();
    };
    Main.prototype.createBg = function (stageW, stageH, isWaiting) {
        this.bg = new View();
        this.bg.setFrame(0, 0, 246, 278);
        this.addChild(this.bg);
        this.bg.layoutSubviews();
        this.bg.touchEnabled = false;
        this.bg.setColor(isWaiting ? 0xFBC009 : 0x6597FF);
    };
    Main.prototype.createTitle = function (stageW, myName, hisName) {
        var statHeight = 32;
        var scoreStat = new egret.Sprite();
        scoreStat.graphics.beginFill(0x2676B6, 1);
        scoreStat.graphics.drawRect(0, 0, stageW, statHeight);
        scoreStat.graphics.endFill();
        scoreStat.x = 0;
        scoreStat.y = 0;
        this.addChild(scoreStat);
        // let titleBorderWidth = 2;
        var titleHeight = statHeight;
        var titleWidth = stageW;
        var titleSplitWidth = titleWidth / 2;
        var titleScoreWidth = titleHeight;
        var titleNameWidth = titleSplitWidth - titleScoreWidth;
        var myNameTxt = new egret.TextField();
        myNameTxt.background = true;
        myNameTxt.backgroundColor = 0x2676B6;
        myNameTxt.$setBorder;
        myNameTxt.size = 13;
        myNameTxt.width = titleNameWidth;
        myNameTxt.height = titleHeight;
        myNameTxt.textColor = 0xFFFFFF;
        myNameTxt.text = myName;
        myNameTxt.textAlign = egret.HorizontalAlign.CENTER;
        myNameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        myNameTxt.x = 0;
        myNameTxt.y = 0;
        scoreStat.addChild(myNameTxt);
        var myScoreTxt = new egret.TextField();
        myScoreTxt.background = true;
        myScoreTxt.backgroundColor = 0xffffff;
        myScoreTxt.size = 13;
        myScoreTxt.border = true;
        myScoreTxt.borderColor = 0x2676B6;
        myScoreTxt.width = titleScoreWidth;
        myScoreTxt.height = titleScoreWidth;
        myScoreTxt.textColor = 0x000000;
        myScoreTxt.text = "0";
        myScoreTxt.textAlign = egret.HorizontalAlign.CENTER;
        myScoreTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        myScoreTxt.x = titleNameWidth;
        myScoreTxt.y = 0;
        scoreStat.addChild(myScoreTxt);
        var hisNameTxt = new egret.TextField();
        hisNameTxt.background = true;
        hisNameTxt.backgroundColor = 0xFBD7BB;
        hisNameTxt.size = 13;
        hisNameTxt.border = true;
        hisNameTxt.borderColor = 0xF39448;
        hisNameTxt.width = titleNameWidth;
        hisNameTxt.height = titleHeight;
        hisNameTxt.textColor = 0x000000;
        hisNameTxt.text = hisName;
        hisNameTxt.textAlign = egret.HorizontalAlign.CENTER;
        hisNameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        hisNameTxt.x = titleSplitWidth;
        hisNameTxt.y = 0;
        scoreStat.addChild(hisNameTxt);
        var hisScoreTxt = new egret.TextField();
        hisScoreTxt.background = true;
        hisScoreTxt.backgroundColor = 0xffffff;
        hisScoreTxt.size = 13;
        hisScoreTxt.border = true;
        hisScoreTxt.borderColor = 0xF39448;
        hisScoreTxt.width = titleScoreWidth;
        hisScoreTxt.height = titleScoreWidth;
        hisScoreTxt.textColor = 0x000000;
        hisScoreTxt.text = "0";
        hisScoreTxt.textAlign = egret.HorizontalAlign.CENTER;
        hisScoreTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        hisScoreTxt.x = titleSplitWidth + titleNameWidth;
        hisScoreTxt.y = 0;
        scoreStat.addChild(hisScoreTxt);
        this.title = {
            myNameTxt: myNameTxt,
            myScoreTxt: myScoreTxt,
            hisNameTxt: hisNameTxt,
            hisScoreTxt: hisScoreTxt
        };
    };
    Main.prototype.createGameView = function () {
        // 固定文字
        var scissors_words = this.createBitmapByName("scissors_words_png");
        scissors_words.x = 105;
        scissors_words.y = 74;
        scissors_words.width = 45;
        scissors_words.height = 23;
        this.addChild(scissors_words);
        var rock_words = this.createBitmapByName("rock_words_png");
        rock_words.x = 50;
        rock_words.y = 160;
        rock_words.width = 35;
        rock_words.height = 45;
        this.addChild(rock_words);
        var paper_words = this.createBitmapByName("paper_words_png");
        paper_words.x = 170;
        paper_words.y = 160;
        paper_words.width = 35;
        paper_words.height = 40;
        this.addChild(paper_words);
        // 环形箭头
        var arrow = this.createBitmapByName("arrow_png");
        arrow.x = 35;
        arrow.y = 60;
        arrow.width = 181;
        arrow.height = 165;
        this.addChild(arrow);
        //内圈
        var scissors = this.createBitmapByName("scissors_png");
        scissors.x = 78;
        scissors.y = 113;
        scissors.width = 36;
        scissors.height = 36;
        this.addChild(scissors);
        var rock = this.createBitmapByName("rock_png");
        rock.x = 104;
        rock.y = 165;
        rock.width = 36;
        rock.height = 36;
        this.addChild(rock);
        var paper = this.createBitmapByName("paper_png");
        paper.x = 134;
        paper.y = 113;
        paper.width = 36;
        paper.height = 36;
        this.addChild(paper);
    };
    Main.prototype.initGame = function () {
        this.title.myScoreTxt.text = this.data.myScore.toString();
        this.title.hisScoreTxt.text = this.data.heScore.toString();
        if (this.isSender) {
            if (this.data.receiverRPS == 0) {
                //009 黄色 7ff蓝色
                this.bg.setColor(0xFBC009);
                this.rock_hand_btn.selected = false;
                this.scissors_hand_btn.selected = false;
                this.paper_hand_btn.selected = false;
                this.buttonEnabled(false);
            }
            else {
                this.bg.setColor(0x6597FF);
                this.rock_hand_btn.selected = false;
                this.scissors_hand_btn.selected = false;
                this.paper_hand_btn.selected = false;
                this.buttonEnabled(true);
            }
        }
        else {
            if (this.data.receiverRPS == 0) {
                this.bg.setColor(0x6597FF);
                this.rock_hand_btn.selected = false;
                this.scissors_hand_btn.selected = false;
                this.paper_hand_btn.selected = false;
                this.buttonEnabled(true);
            }
            else {
                if (this.data.receiverRPS == 1) {
                    this.rock_hand_btn.selected = true;
                }
                else if (this.data.receiverRPS == 2) {
                    this.scissors_hand_btn.selected = true;
                }
                else if (this.data.receiverRPS == 3) {
                    this.paper_hand_btn.selected = true;
                }
                this.bg.setColor(0xFBC009);
                this.buttonEnabled(false);
            }
        }
    };
    Main.prototype.createRPSView = function () {
        this.paper_hand_btn = new eui.ToggleButton;
        this.paper_hand_btn.x = 168;
        this.paper_hand_btn.y = 80;
        this.paper_hand_btn.width = 62;
        this.paper_hand_btn.height = 62;
        this.addChild(this.paper_hand_btn);
        this.paper_hand_btn.addEventListener(egret.TouchEvent.CHANGE, this.casePaper, this);
        this.paper_hand_btn.skinName = "resource/eui_skins/PaperButton.exml";
        this.rock_hand_btn = new eui.ToggleButton;
        this.rock_hand_btn.x = 92;
        this.rock_hand_btn.y = 202;
        this.rock_hand_btn.width = 62;
        this.rock_hand_btn.height = 62;
        this.addChild(this.rock_hand_btn);
        this.rock_hand_btn.addEventListener(egret.TouchEvent.CHANGE, this.caseRock, this);
        this.rock_hand_btn.skinName = "resource/eui_skins/RockButton.exml";
        this.scissors_hand_btn = new eui.ToggleButton;
        this.scissors_hand_btn.x = 18;
        this.scissors_hand_btn.y = 80;
        this.scissors_hand_btn.width = 62;
        this.scissors_hand_btn.height = 62;
        this.addChild(this.scissors_hand_btn);
        this.scissors_hand_btn.addEventListener(egret.TouchEvent.CHANGE, this.caseScissors, this);
        this.scissors_hand_btn.skinName = "resource/eui_skins/ScissorsButton.exml";
    };
    Main.prototype.buttonEnabled = function (canTouch) {
        this.scissors_hand_btn.touchEnabled = canTouch;
        this.paper_hand_btn.touchEnabled = canTouch;
        this.rock_hand_btn.touchEnabled = canTouch;
    };
    Main.prototype.tapRps = function (rpsResult) {
        var _this = this;
        //如果是消息的接收方，只负责发送状态
        if (!this.isSender) {
            this.bg.setColor(0xFBC009);
            this.buttonEnabled(false);
            var updateData_1 = { receiverRPS: rpsResult };
            AcmojiNetwork.update(updateData_1, function (response) {
                _this.sendNotification();
                _this.data = {};
                if (typeof (response.receiverRPS) == 'undefined') {
                    _this.data.receiverRPS = 0;
                }
                if (typeof (response.myScore) == 'undefined') {
                    _this.data.myScore = 0;
                }
                if (typeof (response.heScore) == 'undefined') {
                    _this.data.heScore = 0;
                }
                _this.initGame();
            }, function (error) {
                _this.buttonEnabled(true);
            });
            return;
        }
        //如果是消息的发送方，负责比较结果，发送服务器
        this.buttonEnabled(false);
        var rps = this.checWin(rpsResult, this.data.receiverRPS);
        var updateData = this.data;
        updateData.receiverRPS = 0;
        if (rps == 0) {
        }
        else if (rps == -1) {
            updateData.myScore += 1;
        }
        else if (rps == 1) {
            updateData.heScore += 1;
        }
        AcmojiNetwork.update(updateData, function (res) {
            _this.data = res;
            _this.initGame();
            _this.sendNotification();
        }, function (error) {
            _this.initGame();
        });
    };
    Main.prototype.onIntmojiStateChanged = function (event) {
        var _this = this;
        var state = event.intmoji;
        if (state.command == "update") {
            AcmojiNetwork.query(true, function (response) {
                _this.data = response;
                if (typeof (response.receiverRPS) == 'undefined') {
                    _this.data.receiverRPS = 0;
                }
                if (typeof (response.myScore) == 'undefined') {
                    _this.data.myScore = 0;
                }
                if (typeof (response.heScore) == 'undefined') {
                    _this.data.heScore = 0;
                }
                _this.initGame();
            }, function (error) {
                console.log("query error");
            });
        }
    };
    Main.prototype.caseRock = function () {
        this.tapRps(1);
    };
    Main.prototype.caseScissors = function () {
        this.tapRps(2);
    };
    Main.prototype.casePaper = function () {
        this.tapRps(3);
    };
    Main.prototype.bindEvent = function () {
        window.addEventListener("notificationreceiver", this.onIntmojiStateChanged.bind(this), false);
    };
    Main.prototype.sendNotification = function () {
        setTimeout(function () {
            var tm = window['tm'];
            if (!!tm) {
                tm.SendNotification({
                    type: "custom",
                    data: {
                        command: "update"
                    }
                });
            }
        }, 0);
    };
    Main.prototype.checWin = function (myNumber, playerNumber) {
        {
            if ((myNumber == 1 && playerNumber == 1) || (myNumber == 2 && playerNumber == 2) || (myNumber == 3 && playerNumber == 3)) {
                // alert("is tie");
                return 0;
            }
            else if ((myNumber == 1 && playerNumber == 2) || (myNumber == 2 && playerNumber == 3) || (myNumber == 3 && playerNumber == 1)) {
                // alert("you win");
                return -1;
            }
            else {
                // alert("he win");
                return 1;
            }
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map