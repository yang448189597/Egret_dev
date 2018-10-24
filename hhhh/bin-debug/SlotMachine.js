// TypeScript file
/**
 * 轮播图组件
 */
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
var Utils = (function () {
    function Utils() {
    }
    Utils.getTexture = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            RES.getResByUrl(url, function (texture) {
                resolve(texture);
            }, _this, RES.ResourceItem.TYPE_IMAGE);
        });
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
var SlotMachine = (function (_super) {
    __extends(SlotMachine, _super);
    function SlotMachine() {
        var _this = _super.call(this) || this;
        _this.layerName = '老虎机';
        _this.isAnimating = false;
        _this.itemWidth = 80;
        _this.itemHeight = 120;
        _this.gap = 20;
        _this.tweenFlag = 3; // 动画标记
        _this.tweenFinsh = 0; // 动画标记
        // 组件宽、高固定
        _this.width = 800;
        _this.height = 400;
        _this.lastStep1 = 0;
        _this.lastStep2 = 0;
        _this.lastStep3 = 0;
        // props中用到的参数
        _this.bgColor = '0XFFC600';
        _this.tittleColor = '0XFF9E3B';
        _this.bdUrl = '/assets/pic/item_1.png';
        _this.reward = 0;
        _this.coin = 100;
        _this.awardsTotal = [
            {
                url: '/assets/pic/item_1.png'
            }, {
                url: '/assets/pic/item_2.png'
            }, {
                url: '/assets/pic/item_3.png'
            }, {
                url: '/assets/pic/item_4.png'
            }, {
                url: '/assets/pic/item_5.png'
            }, {
                url: '/assets/pic/item_6.png'
            }, {
                url: '/assets/pic/item_7.png'
            }, {
                url: '/assets/pic/item_8.png'
            }, {
                url: '/assets/pic/item_9.png'
            }, {
                url: '/assets/pic/item_10.png'
            }, {
                url: '/assets/pic/item_11.png'
            }, {
                url: '/assets/pic/item_12.png'
            }, {
                url: '/assets/pic/item_13.png'
            }, {
                url: '/assets/pic/item_14.png'
            },
        ];
        _this._awards = [
            {
                url: '/assets/pic/post_item_2.png'
            },
            {
                url: '/assets/pic/post_item_3.png'
            },
            {
                url: '/assets/pic/post_item_1.png'
            },
            {
                url: '/assets/pic/post_item_4.png'
            },
            {
                url: '/assets/pic/post_item_6.png'
            },
            {
                url: '/assets/pic/post_item_5.png'
            },
        ];
        _this.touchEnabled = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    SlotMachine.prototype.draw = function () {
    };
    SlotMachine.prototype.dispose = function () {
    };
    Object.defineProperty(SlotMachine.prototype, "awards", {
        get: function () {
            return this._awards;
        },
        set: function (v) {
            this._awards = v;
            var firstItem = v.slice(0, 1);
            this.awardsTotal = v.concat(firstItem);
        },
        enumerable: true,
        configurable: true
    });
    SlotMachine.prototype.getProps = function () {
        return {
            bgColor: this.bgColor,
            bdUrl: this.bdUrl,
            awards: this.awards,
        };
    };
    SlotMachine.prototype.setProps = function (d) {
        this.awards = d.awards;
        this.bdUrl = d.bdUrl;
        this.bgColor = d.bgColor;
    };
    SlotMachine.prototype.redraw = function () {
        this.removeChildren();
        this.init();
    };
    SlotMachine.prototype.onAddToStage = function (event) {
        this.init();
    };
    SlotMachine.prototype.onRemoveFromStage = function (event) {
    };
    SlotMachine.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mainBox, tittle, btn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createMainBox()];
                    case 1:
                        mainBox = _a.sent();
                        return [4 /*yield*/, this.createTitle()];
                    case 2:
                        tittle = _a.sent();
                        btn = this.createStartBtn();
                        this.addChild(mainBox);
                        this.addChild(tittle);
                        this.addChild(btn);
                        return [2 /*return*/];
                }
            });
        });
    };
    SlotMachine.prototype.createTitle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var group, stageW, stageH, scoreStat, shape;
            return __generator(this, function (_a) {
                group = new eui.Group();
                group.horizontalCenter = 0;
                stageW = this.stage.stageWidth >= 375 ? 375 - 40 : this.stage.stageWidth - 40;
                stageH = this.stage.stageHeight;
                group.width = stageW;
                group.height = 44;
                scoreStat = new egret.Sprite();
                scoreStat.graphics.beginFill(0xFF9E3B, 1);
                scoreStat.graphics.drawRoundRect(0, 0, group.width, group.height, 30, 30);
                scoreStat.graphics.endFill();
                scoreStat.x = 0;
                scoreStat.y = 0;
                this.rewardTxt = new egret.TextField();
                this.rewardTxt.background = true;
                this.rewardTxt.backgroundColor = 0xFF9E3B;
                this.rewardTxt.size = 18;
                this.rewardTxt.width = group.width / 2;
                this.rewardTxt.height = group.height;
                this.rewardTxt.textColor = 0xFFFFFF;
                this.rewardTxt.text = "Reward: " + this.reward;
                this.rewardTxt.cacheAsBitmap = true;
                this.rewardTxt.textAlign = egret.HorizontalAlign.CENTER;
                this.rewardTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.rewardTxt.x = 0;
                this.rewardTxt.y = 0;
                this.coinTxt = new egret.TextField();
                this.coinTxt.background = true;
                this.coinTxt.backgroundColor = 0x33A6FF;
                this.coinTxt.size = 18;
                this.coinTxt.width = group.width / 2;
                this.coinTxt.height = group.height;
                this.coinTxt.textColor = 0xFFFFFF;
                this.coinTxt.text = "Coin: " + this.coin;
                this.coinTxt.textAlign = egret.HorizontalAlign.CENTER;
                this.rewardTxt.cacheAsBitmap = true;
                this.coinTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.coinTxt.x = group.width / 2;
                this.coinTxt.y = 0;
                scoreStat.addChild(this.rewardTxt);
                scoreStat.addChild(this.coinTxt);
                shape = new egret.Shape();
                shape.graphics.beginFill(0xFF0000, 1);
                shape.graphics.drawRoundRect(0, 0, stageW, 44, 30, 30);
                shape.graphics.endFill();
                group.addChild(shape);
                group.addChild(scoreStat);
                scoreStat.mask = shape;
                return [2 /*return*/, group];
            });
        });
    };
    SlotMachine.prototype.createMainBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var group, stageW, shape, itemGroup, i, len, itemBox;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        group = new eui.Group();
                        group.horizontalCenter = 0;
                        stageW = this.stage.stageWidth >= 375 ? 375 - 40 : this.stage.stageWidth - 40;
                        group.width = stageW;
                        group.height = this.itemHeight + 2 * this.gap;
                        group.top = 75;
                        shape = new egret.Shape();
                        shape.graphics.beginFill(this.bgColor, 1);
                        shape.graphics.drawRoundRect(0, 0, group.width, group.height, 20, 20);
                        shape.graphics.endFill();
                        itemGroup = new eui.Group();
                        itemGroup.horizontalCenter = 0;
                        itemGroup.width = group.width;
                        itemGroup.height = group.height;
                        this.itemGroup = itemGroup;
                        itemGroup.mask = new egret.Rectangle(0, 0, itemGroup.width, itemGroup.height);
                        i = 0, len = 3;
                        _a.label = 1;
                    case 1:
                        if (!(i < len)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.createItemBox()];
                    case 2:
                        itemBox = _a.sent();
                        itemBox.x = (25 + this.itemWidth) * i + 25;
                        itemBox.y = this.gap;
                        itemGroup.addChild(itemBox);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        ;
                        group.addChild(shape);
                        group.addChild(itemGroup);
                        return [2 /*return*/, group];
                }
            });
        });
    };
    // 竖向轮播图容器
    SlotMachine.prototype.createItemBox = function () {
        return __awaiter(this, void 0, void 0, function () {
            var group, vLayout, promiseArr, i, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        group = new eui.Group();
                        group.width = this.itemWidth;
                        group.height = (this.itemWidth + this.gap) * this.awardsTotal.length - this.gap;
                        vLayout = new eui.VerticalLayout();
                        vLayout.gap = this.gap;
                        vLayout.paddingTop = 0;
                        group.layout = vLayout;
                        promiseArr = [];
                        for (i = 0, len = this.awardsTotal.length; i < len; i++) {
                            promiseArr.push(this.createItem(this.awardsTotal[i].url));
                        }
                        ;
                        return [4 /*yield*/, Promise.all(promiseArr).then(function (itemArr) {
                                for (var i = 0, len = itemArr.length; i < len; i++) {
                                    var item = itemArr[i];
                                    group.addChild(item);
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, group];
                }
            });
        });
    };
    SlotMachine.prototype.createItem = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var group, bg, img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        group = new eui.Group();
                        group.width = this.itemWidth;
                        group.height = this.itemHeight;
                        return [4 /*yield*/, this.createImg(this.bdUrl)];
                    case 1:
                        bg = _a.sent();
                        return [4 /*yield*/, this.createImg(url)];
                    case 2:
                        img = _a.sent();
                        group.addChild(bg);
                        group.addChild(img);
                        return [2 /*return*/, group];
                }
            });
        });
    };
    SlotMachine.prototype.createImg = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var img, t;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        img = new egret.Bitmap();
                        return [4 /*yield*/, Utils.getTexture("resource/" + url)];
                    case 1:
                        t = _a.sent();
                        img.width = this.itemWidth;
                        img.height = this.itemHeight;
                        img.texture = t;
                        return [2 /*return*/, img];
                }
            });
        });
    };
    SlotMachine.prototype.createStartBtn = function () {
        var btn = new eui.Button();
        btn.horizontalCenter = 0;
        btn.top = this.stage.stageHeight - 250;
        // btn.bottom = 400;
        btn.height = 88;
        btn.width = 88;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClick, this);
        btn.skinName = "resource/eui_skins/startButton.exml";
        return btn;
    };
    SlotMachine.prototype.OnClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        if (this.tweenFlag !== 3)
            return;
        this.tweenFlag = 0;
        var stepRandomMax = this.awardsTotal.length - 1;
        var stepRandomMIn = 4;
        var step1 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
        var step2 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
        var step3 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
        console.log('this.awardsTotal.length...' + this.awardsTotal.length);
        console.log('step1...' + step1);
        console.log('step2...' + step2);
        console.log('step3...' + step3);
        var timeRandomMax = (this.awardsTotal.length - 1) * 200;
        var timeRandomMIn = 1000;
        var time1 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
        var time2 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
        var time3 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
        var firstBox = this.itemGroup.getChildAt(0);
        var secondBox = this.itemGroup.getChildAt(1);
        var thirdBox = this.itemGroup.getChildAt(2);
        this.lastStep1 += step1;
        this.lastStep2 += step2;
        this.lastStep3 += step3;
        this.firstIndex = this.lastStep1 % (this.awardsTotal.length - 1);
        this.secondIndex = this.lastStep2 % (this.awardsTotal.length - 1);
        this.thirdIndex = this.lastStep3 % (this.awardsTotal.length - 1);
        this.endTween(firstBox, step1, time1);
        this.endTween(secondBox, step2, time2);
        this.endTween(thirdBox, step3, time3);
        this.updateCoin();
    };
    SlotMachine.prototype.endTween = function (item, step, duration) {
        var _this = this;
        if (duration === void 0) { duration = 500; }
        var initY = item.y;
        var addY = -(this.itemHeight + this.gap) * step;
        var totalY = initY + addY;
        var maxY = -(this.itemHeight + this.gap) * (this.awardsTotal.length - 1) + this.gap;
        if (totalY < maxY) {
            var oneStepTime = duration / step;
            var step1 = (maxY - initY) / -(this.itemHeight + this.gap);
            var step2_1 = step - step1;
            var time1 = step1 * oneStepTime;
            var time2_1 = duration - time1;
            var t = egret.Tween.get(item);
            t.to({ y: maxY }, time1)
                .call(function () {
                item.y = 20;
                _this.endTween(item, step2_1, time2_1);
            });
        }
        else if (totalY > maxY) {
            egret.Tween.get(item)
                .to({ y: totalY }, duration)
                .call(function () {
                _this.tweenFlag += 1;
                _this.tweenFinsh += 1; // 动画标记
                if (_this.tweenFinsh == 3) {
                    _this.updateReward();
                }
            });
        }
        else if (totalY == maxY) {
            egret.Tween.get(item)
                .to({ y: totalY }, duration)
                .call(function () {
                item.y = 20;
                _this.tweenFlag += 1;
                _this.tweenFinsh += 1; // 动画标记
                if (_this.tweenFinsh == 3) {
                    _this.updateReward();
                }
            });
        }
    };
    SlotMachine.prototype.updateCoin = function () {
        this.coin -= 1;
        this.coinTxt.text = "Coin: " + this.coin;
    };
    SlotMachine.prototype.updateReward = function () {
        if (this.firstIndex == this.secondIndex && this.firstIndex == this.thirdIndex) {
            if (this.firstIndex == 6 && this.secondIndex == 6 && this.thirdIndex == 6) {
                this.reward += 7;
            }
            else {
                this.reward += 2;
            }
            this.rewardTxt.text = "Reward: " + this.reward;
        }
        else if (this.firstIndex == this.secondIndex || this.firstIndex == this.thirdIndex || this.secondIndex == this.thirdIndex) {
            this.reward += 1;
            this.rewardTxt.text = "Reward: " + this.reward;
        }
        this.tweenFinsh = 0;
        console.log('firstIndex...' + this.firstIndex);
        console.log('secondIndex...' + this.secondIndex);
        console.log('thirdIndex...' + this.thirdIndex);
    };
    return SlotMachine;
}(eui.Group));
__reflect(SlotMachine.prototype, "SlotMachine");
