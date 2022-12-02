import * as PIXI from "pixi.js-legacy";

export class Background {
    constructor(resources){
        this.resources = resources;
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.createBgImage();
        this.createLeftSideCoinsImage();
        this.createRightSideCoinsImage();
    }

    createBgImage(){
        
        this.bg = new PIXI.Sprite(this.resources.bg.texture);
        this.container.addChild(this.bg);
    }

    createLeftSideCoinsImage(){
        this.leftCoin = new PIXI.Sprite(this.resources.bg_sides.texture);
        this.leftCoin.height = this.container.height;
        this.container.addChild(this.leftCoin);
    }

    createRightSideCoinsImage(){
        this.rightCoin = new PIXI.Sprite(this.resources.bg_sides.texture);
        this.rightCoin.height = this.container.height;
        this.rightCoin.position.x = this.container.width;               //placing it at the right side of bg.
        this.rightCoin.scale.x=-1;                                     //rotating it
        this.container.addChild(this.rightCoin);
    }
}