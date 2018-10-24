// TypeScript file
/**
 * 轮播图组件
 */

class Utils {
public constructor() {
}

static getTexture(url: string) {
    return new Promise( (resolve, reject) => {
        RES.getResByUrl(url, function(texture:egret.Texture):void {
            resolve(texture);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    })
}
}

class SlotMachine extends eui.Group {
    data: any;
    layerName:string = '老虎机'
    container: any;
  
    // static uuType = UUType.SLOT_MACHINE;
    
    private btn_start: eui.Button;
    private isAnimating: boolean = false;
    draw (): void {
        
    }
	dispose(){

	}

	private itemWidth: number = 80;
	private itemHeight: number = 120;
	private gap: number = 20;
	private tweenFlag: number = 3; // 动画标记
	private tweenFinsh: number = 0; // 动画标记

	// 组件宽、高固定
	width: number = 800;
	height: number = 400;

	lastStep1 :number = 0;
	lastStep2 :number = 0;
	lastStep3 :number = 0;

	firstIndex:number;
	secondIndex:number;
	thirdIndex:number;
	// props中用到的参数
	bgColor: string | number = '0XFFC600';
	tittleColor: string | number = '0XFF9E3B';
	bdUrl: string = '/assets/pic/item_1.png';


	// 奖励
	private rewardTxt: egret.TextField ;
	private coinTxt: egret.TextField ;
	private reward:number = 0;
	private coin:number = 100;
	
	private awardsTotal: any[] = [    
		{
			url: '/assets/pic/item_1.png'
		},{
			url: '/assets/pic/item_2.png'
		},{
			url: '/assets/pic/item_3.png'
		},{
			url: '/assets/pic/item_4.png'
		},	{
			url: '/assets/pic/item_5.png'
		},	{
			url: '/assets/pic/item_6.png'
		},	{
			url: '/assets/pic/item_7.png'
		},	{
			url: '/assets/pic/item_8.png'
		},	{
			url: '/assets/pic/item_9.png'
		},	{
			url: '/assets/pic/item_10.png'
		},	{
			url: '/assets/pic/item_11.png'
		},	{
			url: '/assets/pic/item_12.png'
		},	{
			url: '/assets/pic/item_13.png'
		},	{
			url: '/assets/pic/item_14.png'
		},
    ];
	private _awards : any[] = [    
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
    ]
	public get awards() : Array<any> {
		return this._awards;
	}
	public set awards(v : Array<any>) {
		this._awards = v;
		let firstItem = v.slice(0,1);
		this.awardsTotal = [...v,...firstItem];
	}
	
    private itemGroup: eui.Group;
    constructor () {
        super();
        this.touchEnabled = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    getProps () {
        return {
			bgColor: this.bgColor,
			bdUrl: this.bdUrl,
            awards: this.awards,
        }
    }

	setProps (d: any) {
        this.awards = d.awards;
		this.bdUrl = d.bdUrl;
		this.bgColor = d.bgColor;
    }

    redraw () {
		this.removeChildren();
		this.init();
    }

    private onAddToStage (event:egret.Event) {
		this.init()
    }

    private onRemoveFromStage (event: egret.Event) {

    }

	private async init(){
		// let vLayout = new eui.VerticalLayout();
		// vLayout.horizontalAlign = 'center';
		// this.layout = vLayout;
		
        let mainBox = await this.createMainBox();
		let tittle = await this.createTitle();
		let btn = this.createStartBtn();
		this.addChild(mainBox);
		this.addChild(tittle);
		this.addChild(btn);
		
	}

    private async createTitle(){
        let group = new eui.Group();
		group.horizontalCenter = 0;
		let stageW = this.stage.stageWidth >= 375 ? 375-40 : this.stage.stageWidth - 40;
        let stageH = this.stage.stageHeight;
		group.width = stageW;
		group.height = 44;
		

        let scoreStat: egret.Sprite = new egret.Sprite();
		scoreStat.graphics.beginFill(0xFF9E3B, 1);
        scoreStat.graphics.drawRoundRect(0, 0, group.width, group.height,30,30);
        scoreStat.graphics.endFill();
        scoreStat.x = 0;
        scoreStat.y = 0;

		this.rewardTxt = new egret.TextField();
        this.rewardTxt.background = true;
        this.rewardTxt.backgroundColor = 0xFF9E3B;
        this.rewardTxt.size = 18;
        this.rewardTxt.width = group.width/2;
        this.rewardTxt.height = group.height;
        this.rewardTxt.textColor = 0xFFFFFF;
        this.rewardTxt.text = "Reward: "+this.reward;
		this.rewardTxt.cacheAsBitmap = true;
        this.rewardTxt.textAlign = egret.HorizontalAlign.CENTER;
        this.rewardTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.rewardTxt.x = 0;
        this.rewardTxt.y = 0;

		this.coinTxt = new egret.TextField();
        this.coinTxt .background = true;
        this.coinTxt .backgroundColor = 0x33A6FF;
        this.coinTxt .size = 18;
        this.coinTxt .width = group.width/2;
        this.coinTxt .height = group.height;
        this.coinTxt .textColor = 0xFFFFFF;
        this.coinTxt .text = "Coin: "+ this.coin;
        this.coinTxt .textAlign = egret.HorizontalAlign.CENTER;
		this.rewardTxt.cacheAsBitmap = true;
        this.coinTxt .verticalAlign = egret.VerticalAlign.MIDDLE;
        this.coinTxt .x = group.width/2;
        this.coinTxt .y = 0;

        scoreStat.addChild(this.rewardTxt);
		scoreStat.addChild(this.coinTxt);
			
		let shape = new egret.Shape();
		shape.graphics.beginFill(0xFF0000, 1);
		shape.graphics.drawRoundRect(0, 0, stageW, 44, 30, 30);
		shape.graphics.endFill();
	
		group.addChild(shape);
		group.addChild(scoreStat);
		scoreStat.mask = shape;
        return group;
    }

	private async createMainBox(){
		let group = new eui.Group();
		group.horizontalCenter = 0;
		let stageW = this.stage.stageWidth >= 375 ? 375 - 40 : this.stage.stageWidth - 40;
		group.width = stageW;
		group.height = this.itemHeight + 2 * this.gap;
		group.top = 75;
		// 背景
		let shape = new egret.Shape();
		shape.graphics.beginFill(<number>this.bgColor, 1);
		shape.graphics.drawRoundRect(0, 0, group.width, group.height,20,20);
		shape.graphics.endFill();
		// 主容器
		let itemGroup = new eui.Group();
		itemGroup.horizontalCenter = 0;
		itemGroup.width = group.width;
		itemGroup.height = group.height;
		this.itemGroup = itemGroup;
		itemGroup.mask = new egret.Rectangle(0,0,itemGroup.width,itemGroup.height);
		// 生成3项竖向轮播图容器
		for(let i = 0, len = 3; i < len; i++){
			let itemBox = await this.createItemBox();
			itemBox.x = (25+ this.itemWidth) * i + 25;

			itemBox.y = this.gap;	
			itemGroup.addChild(itemBox);
		};
		group.addChild(shape);
		group.addChild(itemGroup);
		return group;
	}
	// 竖向轮播图容器
	private async createItemBox(){
		let group = new eui.Group();
	
		group.width = this.itemWidth;
		group.height = (this.itemWidth + this.gap) * this.awardsTotal.length - this.gap;
		let vLayout = new eui.VerticalLayout();
		vLayout.gap = this.gap;
		vLayout.paddingTop = 0;
		group.layout = vLayout;
		let promiseArr = [];
		for (let i = 0, len = this.awardsTotal.length; i< len; i++){
 			promiseArr.push(this.createItem(this.awardsTotal[i].url));
		};
		await Promise.all(promiseArr).then(itemArr => {
			for(let i = 0, len = itemArr.length; i < len; i++){
				let item = itemArr[i];
				group.addChild(item);
			}
		});
		return group;
	}

	private async createItem(url){
		let group = new eui.Group();
		group.width = this.itemWidth;
		group.height = this.itemHeight;
		let bg = await this.createImg(this.bdUrl);
		let img = await this.createImg(url);
		group.addChild(bg);
		group.addChild(img);
		return group;
	}

	private async createImg(url){
		var img: egret.Bitmap = new egret.Bitmap();
		var t = await Utils.getTexture("resource/"+url);
		img.width = this.itemWidth
		img.height = this.itemHeight;            
		img.texture = <egret.Texture>t;
		return img;
	}

	private createStartBtn(){
		let btn = new eui.Button();
		btn.horizontalCenter = 0;
		btn.top = this.stage.stageHeight-250;
		// btn.bottom = 400;
		btn.height = 88;
		btn.width = 88; 
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnClick, this);
		btn.skinName = "resource/eui_skins/startButton.exml";
		return btn;
	}

	public OnClick(evt: TouchEvent){
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		if(this.tweenFlag !== 3) return;
		this.tweenFlag = 0;
		let stepRandomMax = this.awardsTotal.length - 1;
		let stepRandomMIn = 4;
		let step1 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
		let step2 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;
		let step3 = Math.floor(Math.random() * stepRandomMax) + stepRandomMIn;

		console.log('this.awardsTotal.length...'+this.awardsTotal.length);
		console.log('step1...'+step1);
		console.log('step2...'+step2);
		console.log('step3...'+step3);

		let timeRandomMax = (this.awardsTotal.length - 1) * 200;
		let timeRandomMIn = 1000;
		let time1 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
		let time2 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;
		let time3 = Math.floor(Math.random() * timeRandomMax) + timeRandomMIn;		
				
		let firstBox = <eui.Group>this.itemGroup.getChildAt(0);
		let secondBox = <eui.Group>this.itemGroup.getChildAt(1);
		let thirdBox = <eui.Group>this.itemGroup.getChildAt(2);

		this.lastStep1+=step1;
		this.lastStep2+=step2;
		this.lastStep3+=step3;

		this.firstIndex = this.lastStep1%(this.awardsTotal.length-1);
		this.secondIndex = this.lastStep2%(this.awardsTotal.length-1);
		this.thirdIndex = this.lastStep3%(this.awardsTotal.length-1);

		this.endTween(firstBox, step1, time1);
		this.endTween(secondBox, step2, time2);
		this.endTween(thirdBox, step3, time3);

		this.updateCoin();


	}

	private endTween(item:eui.Group, step: number, duration: number = 500){

		let initY = item.y;
		let addY = -(this.itemHeight + this.gap) * step;
		let totalY = initY + addY;
		let maxY = -(this.itemHeight + this.gap) * (this.awardsTotal.length - 1) + this.gap;
		
		if(totalY < maxY){
			let oneStepTime = duration / step;
			let step1 = (maxY - initY) / -(this.itemHeight + this.gap);
			let step2 = step - step1;
			let time1 = step1 * oneStepTime;
			let time2 = duration - time1;
			
			let t = egret.Tween.get(item);
			t.to({y: maxY }, time1)
				.call(() => {
					item.y = 20;
					this.endTween(item, step2, time2);

				})
				
		}else if(totalY > maxY) {
			egret.Tween.get(item)
				.to({y: totalY }, duration)
				.call(() => {
					this.tweenFlag += 1;
					this.tweenFinsh += 1; // 动画标记
					if(this.tweenFinsh == 3){
						this.updateReward();
					}
				})
		}else if(totalY == maxY) {
			egret.Tween.get(item)
				.to({y: totalY }, duration)
				.call(() => {
					item.y = 20;
					this.tweenFlag += 1;
				    this.tweenFinsh += 1; // 动画标记
					if(this.tweenFinsh == 3){
						this.updateReward();
					}
				})
		}
	}

	private updateCoin(){
		this.coin -= 1;
		this.coinTxt .text = "Coin: "+ this.coin;
	}

	private updateReward() {
		if(this.firstIndex == this.secondIndex && this.firstIndex == this.thirdIndex){
			if(this.firstIndex == 6 && this.secondIndex == 6 && this.thirdIndex == 6){
				this.reward += 7;
			}
			else{
				this.reward += 2;
			}
			this.rewardTxt.text = "Reward: "+ this.reward;
		}
		else if (this.firstIndex == this.secondIndex || this.firstIndex == this.thirdIndex || this.secondIndex == this.thirdIndex){
			this.reward += 1;
		  	this.rewardTxt.text = "Reward: "+ this.reward;
		}

		this.tweenFinsh = 0;
		console.log('firstIndex...'+this.firstIndex);
		console.log('secondIndex...'+this.secondIndex);
		console.log('thirdIndex...'+this.thirdIndex);
	}

}