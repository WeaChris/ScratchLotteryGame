import * as PIXI from "pixi.js-legacy";
import { Background } from "./Background";
import { MainScene } from "./MainScene";

export class Screen {
    constructor(resources){
        this.resources = resources;
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.createBackground();
        this.createMainScene();
    }

    createBackground(){
        this.background = new Background(this.resources);
        this.container.addChild(this.background.container);
    }

    createMainScene(){
        this.mainScene = new MainScene(this.resources);
        
        //position of logo sprite
        this.mainScene.logo.position.x = this.container.width/6;
        this.mainScene.logo.position.y = -100;
        
        //position of gameholder sprite
        if(this.mainScene.gameholder.gameholder){
            this.mainScene.gameholder.gameholder.position.x = 30;
            this.mainScene.gameholder.gameholder.position.y = this.container.height/12;
        }
        
        
        //position of info sprite
        this.mainScene.info.position.x = this.container.width/6 - 120;
        this.mainScene.info.position.y = this.container.height/1.5+ 140;

        //position of settings sprite
        this.mainScene.settings.position.y = this.container.height - 160;

        this.container.addChild(this.mainScene.container);
    }
}