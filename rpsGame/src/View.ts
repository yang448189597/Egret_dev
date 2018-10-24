class View extends egret.Sprite {
    color: number
    public constructor() {
        super();
    }
    public layoutSubviews () {
        if (this.color) {
            this.setColor(this.color);
        }
    }

    public setColor(color) {
        this.graphics.beginFill(color);
        this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        this.color = color;
    }

    public setFrame(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}