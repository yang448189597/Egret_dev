interface TitleInfo {
    myNameTxt: egret.TextField,
    myScoreTxt: egret.TextField,
    hisNameTxt: egret.TextField,
    hisScoreTxt: egret.TextField
};

interface UserInfo {
    name: string
}

class Main extends eui.UILayer {

    private isSender: boolean;
    private isWaiting: boolean;
    private isDeviceReady: boolean;
    private isStageReady: boolean;
    private otherNumber : number;
    private myNumber : number;
    private title: TitleInfo;
    private hisInfo: UserInfo;
    private myInfo: UserInfo;
    private bg: View;
    private paper_hand_btn:eui.ToggleButton;
    private rock_hand_btn:eui.ToggleButton;
    private scissors_hand_btn:eui.ToggleButton;

    private data;
    
    loadingView: LoadingUI

    public constructor() {
        super();
        this.hisInfo = {name : ""};
        this.myInfo = {name : ""};
        document.addEventListener("deviceready", this.deviceready.bind(this));
    }


    private initdata(){

// {
//     receiverRPS :0,
//     myScore:0,
//     heScore:0
// }

    AcmojiNetwork.query(true, (response)=>
        {
            this.data = response;
            if(typeof(response.receiverRPS) == 'undefined'){
                this.data.receiverRPS = 0;
            }
            if(typeof(response.myScore) == 'undefined'){
                this.data.myScore = 0;
            }
            if(typeof(response.heScore) == 'undefined'){
                this.data.heScore = 0;
            }
            this.isDeviceReady = true;
            this.startGame();
        }, (error)=>
        {
            console.log("query error");
        
        });
    }

    private deviceready() {
        let self = this;
        let tm = window['tm'];
        if (!!tm) {
            tm.GetMessageInfo({
                keys: ["direct","sessionId","messageId"],
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
                            } else {
                                self.myInfo.name = data1.name;
                            }
                            tm.GetMyInfo({
                                keys: ['name'], success: function (data2) {
                                    if (!self.isSender) {
                                        self.hisInfo.name = data2.name;
                                    } else {
                                        self.myInfo.name = data2.name;
                                    }
                                    console.log('isDeviceReady--' + new Date());
                                    self.initdata();
                                }
                            })
                        }
                    })
                },
                fail: function () { }
            });
        }
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
        this.createBg(246,278,this.isSender);
        this.createTitle(246,this.myInfo.name,this.hisInfo.name);
        this.createGameView();
        this.createRPSView();
        this.initGame();
        this.bindEvent();
    }

    private createBg(stageW: number, stageH: number,isWaiting:boolean) {
        this.bg = new View();
        this.bg.setFrame(0, 0, 246, 278);
        this.addChild(this.bg);
        this.bg.layoutSubviews();
        this.bg.touchEnabled = false;
        this.bg.setColor(isWaiting?0xFBC009:0x6597FF);
    }

    private createTitle(stageW: number, myName: string, hisName: string) {
        let statHeight = 32;
        let scoreStat: egret.Sprite = new egret.Sprite();
        scoreStat.graphics.beginFill(0x2676B6, 1);
        scoreStat.graphics.drawRect(0, 0, stageW, statHeight);
        scoreStat.graphics.endFill();
        scoreStat.x = 0;
        scoreStat.y = 0;
        this.addChild(scoreStat);

        // let titleBorderWidth = 2;
        let titleHeight = statHeight;
        let titleWidth = stageW;
        let titleSplitWidth = titleWidth / 2;
        let titleScoreWidth = titleHeight;
        let titleNameWidth = titleSplitWidth - titleScoreWidth;

        let myNameTxt: egret.TextField = new egret.TextField();
        myNameTxt.background = true;
        myNameTxt.backgroundColor = 0x2676B6;
        myNameTxt.$setBorder
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

        let myScoreTxt: egret.TextField = new egret.TextField();
        myScoreTxt.background = true;
        myScoreTxt.backgroundColor = 0xffffff;
        myScoreTxt.size = 13;
        myScoreTxt.border=true;
        myScoreTxt.borderColor =0x2676B6;
        myScoreTxt.width = titleScoreWidth;
        myScoreTxt.height = titleScoreWidth;
        myScoreTxt.textColor = 0x000000;
        myScoreTxt.text = "0";
        myScoreTxt.textAlign = egret.HorizontalAlign.CENTER;
        myScoreTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        myScoreTxt.x = titleNameWidth;
        myScoreTxt.y = 0;
        scoreStat.addChild(myScoreTxt);

        let hisNameTxt: egret.TextField = new egret.TextField();
        hisNameTxt.background = true;
        hisNameTxt.backgroundColor = 0xFBD7BB;
        hisNameTxt.size = 13;
        hisNameTxt.border=true;
        hisNameTxt.borderColor =0xF39448;
        hisNameTxt.width = titleNameWidth;
        hisNameTxt.height = titleHeight;
        hisNameTxt.textColor = 0x000000;
        hisNameTxt.text = hisName;
        hisNameTxt.textAlign = egret.HorizontalAlign.CENTER;
        hisNameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        hisNameTxt.x = titleSplitWidth;
        hisNameTxt.y = 0;
        scoreStat.addChild(hisNameTxt);

        let hisScoreTxt: egret.TextField = new egret.TextField();
        hisScoreTxt.background = true;
        hisScoreTxt.backgroundColor = 0xffffff;
        hisScoreTxt.size = 13;
        hisScoreTxt.border=true;
        hisScoreTxt.borderColor =0xF39448;
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
        }
    }

    private createGameView(){

        // 固定文字
        var scissors_words: egret.Bitmap = this.createBitmapByName("scissors_words_png");
        scissors_words.x=105;
        scissors_words.y=74;
        scissors_words.width=45;
        scissors_words.height=23;
        this.addChild(scissors_words);

        var rock_words: egret.Bitmap = this.createBitmapByName("rock_words_png");
        rock_words.x = 50;
        rock_words.y = 160;
        rock_words.width=35;
        rock_words.height=45;
        this.addChild(rock_words);

        var paper_words: egret.Bitmap = this.createBitmapByName("paper_words_png");
        paper_words.x=170;
        paper_words.y=160;
        paper_words.width=35;
        paper_words.height=40;
        this.addChild(paper_words);

        // 环形箭头
        let arrow: egret.Bitmap = this.createBitmapByName("arrow_png");
        arrow.x=35;
        arrow.y=60;
        arrow.width=181;
        arrow.height=165;
        this.addChild(arrow);

        //内圈
        var scissors: egret.Bitmap = this.createBitmapByName("scissors_png");
        scissors.x = 78;
        scissors.y = 113;
        scissors.width = 36;
        scissors.height = 36;
        this.addChild(scissors);

        var rock: egret.Bitmap = this.createBitmapByName("rock_png");
        rock.x = 104;
        rock.y = 165;
        rock.width = 36;
        rock.height = 36;
        this.addChild(rock);


        var paper: egret.Bitmap = this.createBitmapByName("paper_png");
        paper.x = 134;
        paper.y = 113;
        paper.width = 36;
        paper.height = 36;
        this.addChild(paper);

    }

    private initGame(){
        this.title.myScoreTxt.text = this.data.myScore.toString();
        this.title.hisScoreTxt.text = this.data.heScore.toString();

         if(this.isSender){
             if(this.data.receiverRPS == 0){
                 //009 黄色 7ff蓝色
                 this.bg.setColor(0xFBC009);
                 this.rock_hand_btn.selected = false;
                 this.scissors_hand_btn.selected = false;
                 this.paper_hand_btn.selected = false;
                 this.buttonEnabled(false);
             }
             else{
                 this.bg.setColor(0x6597FF);
                 this.rock_hand_btn.selected = false;
                 this.scissors_hand_btn.selected = false;
                 this.paper_hand_btn.selected = false;
                 this.buttonEnabled(true);
             }
         }
         else{
             if(this.data.receiverRPS == 0){
                 this.bg.setColor(0x6597FF);
                 this.rock_hand_btn.selected = false;
                 this.scissors_hand_btn.selected = false;
                 this.paper_hand_btn.selected = false;
                 this.buttonEnabled(true);
             }
             else{
                 if(this.data.receiverRPS == 1){
                     this.rock_hand_btn.selected = true;
                 }
                 else if (this.data.receiverRPS == 2){
                     this.scissors_hand_btn.selected = true;
                 }
                 else if(this.data.receiverRPS == 3){
                     this.paper_hand_btn.selected = true;
                 }
                 this.bg.setColor(0xFBC009);
                 this.buttonEnabled(false);
             }
         }
    }
    
    private createRPSView(){
        this.paper_hand_btn = new eui.ToggleButton;
        this.paper_hand_btn.x = 168;
        this.paper_hand_btn.y = 80;
        this.paper_hand_btn.width = 62;
        this.paper_hand_btn.height = 62;
        this.addChild(this.paper_hand_btn);
        this.paper_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.casePaper,this);
        this.paper_hand_btn.skinName = "resource/eui_skins/PaperButton.exml";

        this.rock_hand_btn = new eui.ToggleButton;
        this.rock_hand_btn.x = 92;
        this.rock_hand_btn.y = 202;
        this.rock_hand_btn.width = 62;
        this.rock_hand_btn.height = 62;
        this.addChild(this.rock_hand_btn);
        this.rock_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.caseRock,this);
        this.rock_hand_btn.skinName = "resource/eui_skins/RockButton.exml";

        this.scissors_hand_btn = new eui.ToggleButton;
        this.scissors_hand_btn .x = 18;
        this.scissors_hand_btn .y = 80;
        this.scissors_hand_btn .width = 62;
        this.scissors_hand_btn .height = 62;
        this.addChild(this.scissors_hand_btn);
        this.scissors_hand_btn.addEventListener(egret.TouchEvent.CHANGE,this.caseScissors,this);
        this.scissors_hand_btn.skinName = "resource/eui_skins/ScissorsButton.exml";
    }

    private buttonEnabled(canTouch:boolean){
        this.scissors_hand_btn.touchEnabled = canTouch;
        this.paper_hand_btn.touchEnabled = canTouch;
        this.rock_hand_btn.touchEnabled = canTouch;
    }

    private tapRps(rpsResult:number){
         //如果是消息的接收方，只负责发送状态
         if(!this.isSender) {
            this.bg.setColor(0xFBC009);
            this.buttonEnabled(false);
            let updateData = {receiverRPS: rpsResult};
            AcmojiNetwork.update(updateData,(response: any)=> {
                    this.sendNotification();
                    this.data = {};
                    if(typeof(response.receiverRPS) == 'undefined'){
                        this.data.receiverRPS = 0;
                    }
                    if(typeof(response.myScore) == 'undefined'){
                        this.data.myScore = 0;
                    }
                    if(typeof(response.heScore) == 'undefined'){
                        this.data.heScore = 0;
                    }
                    this.initGame();
                },
                (error: AcmojiNetworkError)=> {
                  this.buttonEnabled(true);
                }
            )
            return;
        }
        //如果是消息的发送方，负责比较结果，发送服务器
        this.buttonEnabled(false);
        let rps = this.checWin(rpsResult,this.data.receiverRPS);
        let updateData = this.data;
        updateData.receiverRPS = 0;
        if(rps == 0){
        }else if (rps == -1 ){
            updateData.myScore += 1;
        }else if (rps == 1){
            updateData.heScore += 1;
        }
        AcmojiNetwork.update(updateData, (res) => {
            this.data = res;
            this.initGame();
            this.sendNotification();
        }, (error)=> {
            this.initGame();
        });

    }

    private onIntmojiStateChanged(event) {
        let state = event.intmoji;
        if (state.command == "update") {
            AcmojiNetwork.query(true, (response)=>
        {
            this.data = response;
            if(typeof(response.receiverRPS) == 'undefined'){
                this.data.receiverRPS = 0;
            }
            if(typeof(response.myScore) == 'undefined'){
                this.data.myScore = 0;
            }
            if(typeof(response.heScore) == 'undefined'){
                this.data.heScore = 0;
            }
            this.initGame();
        }, (error)=>
        {
            console.log("query error");
        });
        }
    }

    
    private caseRock(){
        this.tapRps(1);
    }

    private caseScissors(){
        this.tapRps(2);
    }

    private casePaper(){
        this.tapRps(3);
    }

    private bindEvent() {
        window.addEventListener("notificationreceiver", this.onIntmojiStateChanged.bind(this), false);
    }
    
    private sendNotification() {
        setTimeout(function () {
            let tm = window['tm'];
            if (!!tm) {
                tm.SendNotification({
                    type: "custom",
                    data: {
                        command:"update"
                    }
                })
            }
        }, 0);
    }
   

    private checWin(myNumber : number, playerNumber: number){{
		if ((myNumber == 1 && playerNumber == 1) || (myNumber == 2 && playerNumber == 2) || (myNumber == 3 && playerNumber == 3)){
            // alert("is tie");
            return 0;
        }
        else if((myNumber == 1 && playerNumber == 2) || (myNumber == 2 && playerNumber == 3) || (myNumber == 3&& playerNumber == 1)){
            // alert("you win");
            return -1;
        }
        else{
            // alert("he win");
            return 1;
        }
      }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
