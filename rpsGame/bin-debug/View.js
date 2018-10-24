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
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        return _super.call(this) || this;
    }
    View.prototype.layoutSubviews = function () {
        if (this.color) {
            this.setColor(this.color);
        }
    };
    View.prototype.setColor = function (color) {
        this.graphics.beginFill(color);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.color = color;
    };
    View.prototype.setFrame = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    return View;
}(egret.Sprite));
__reflect(View.prototype, "View");
//# sourceMappingURL=View.js.map