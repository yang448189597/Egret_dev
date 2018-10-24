class Main extends eui.UILayer {

    private isSender: boolean;
    private isDeviceReady: boolean;
    private isStageReady: boolean;

    public constructor() {
        super();
        this.isDeviceReady = true;
        this.isStageReady = true;
    }

    private deviceready() {
        // dly
        let self = this;
        this.isDeviceReady = true;
    }

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.isStageReady = true;
        console.log('isStageReady--' + new Date());
        this.startGame();
    }

    private startGame() {
        if (this.isReady()) {
            console.log('isReady--' + new Date());
            this.runGame().catch(e => {
                console.log(e);
            })
        }
    }

    private isReady() {
        return this.isDeviceReady && this.isStageReady
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        window["switchGameScenme"]();

        // 背景色
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        // 添加老虎机
        let slotMachine = new SlotMachine();
        slotMachine.horizontalCenter = 0;
        slotMachine.top = 100;

        
        let gradient = new egret.Shape();
        var matrix = new egret.Matrix();
        matrix.createGradientBox(stageW, stageH, Math.PI * 0.5, 0, 0); 
        gradient.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xFBE85E, 0xF9DF28], [1, 1], [0, 255], matrix);
        gradient.graphics.drawRect(0, 0, stageW, stageH);
        gradient.graphics.endFill();
      
        this.addChild(gradient);
        this.addChild(slotMachine);
    }

    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
