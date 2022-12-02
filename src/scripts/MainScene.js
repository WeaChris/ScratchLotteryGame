import * as PIXI from "pixi.js-legacy";
import {GameHolder} from "./GameHolder";

export class MainScene{
    constructor(resources){
        this.resources = resources;
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.createawda();

    }

    createawda(){
        this.logo = new PIXI.Sprite(this.resources.logo.texture);
        this.gameholder = new GameHolder(this.resources);
        this.info = new PIXI.Sprite(this.resources.info.texture);
        this.settings = new PIXI.Sprite(this.resources.settings.texture);

        this.settings.interactive = true;
        this.settings.on("click" , (event) => {console.log(event)} , this);

        this.container.addChild(this.gameholder.container);
        this.container.addChild(this.logo);
        this.container.addChild(this.info);
        this.container.addChild(this.settings);
    }
}