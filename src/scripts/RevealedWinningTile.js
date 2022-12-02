import { current } from "@reduxjs/toolkit";
import * as PIXI from "pixi.js-legacy";
import { Texture } from "pixi.js-legacy";

export class RevealedWinningTile {
    constructor(resources, x, y, revealedNumbers) {
        this.resources = resources;
        this.x = x;
        this.y = y;
        this.revealedNumbers = revealedNumbers;
        this.isWon;
        // this.basicNumberSpritesMappedtoNumbers = new Map();
        // this.paintedNumberSpritesMappedtoNumbers = new Map();
        // this.smallNumberSpritesMappedtoNumbers = new Map();
        this.numbersAndSprites = [];


        this.numberSelection();

    }

    async createTile(isWon) {

        return new Promise((resolve) => {
            console.log("Create Tile this.isWon : " + isWon);
            if (isWon) {
                console.log("Matched in creation");
                this.revealedWinningTile = new PIXI.Sprite(this.resources.wonBackgroundWinningTile.texture);
                this.revealedWinningTile.anchor.set(0.5, 0.5);
                this.revealedWinningTile.position.x = this.x;
                this.revealedWinningTile.position.y = this.y;

                this.newrevealedWinningTile = new PIXI.AnimatedSprite([
                    this.resources.shimmer21.texture,
                    this.resources.shimmer22.texture,
                    this.resources.shimmer23.texture,
                    this.resources.shimmer24.texture,
                    this.resources.shimmer25.texture,
                    this.resources.shimmer26.texture,
                    this.resources.shimmer27.texture,
                    this.resources.shimmer28.texture,
                    this.resources.shimmer29.texture,
                    this.resources.shimmer210.texture,
                    this.resources.shimmer211.texture,
                    this.resources.shimmer212.texture

                ]);

                this.newrevealedWinningTile.anchor.set(0.5, 0.5);
                this.newrevealedWinningTile.animationSpeed = 0.2;
                this.newrevealedPlayerTile.play();
                this.newrevealedWinningTile.position.x = this.x;
                this.newrevealedWinningTile.position.y = this.y+11;
                this.isWon = true;
                resolve();
            } else {
                console.log("Not Matched in creation");
                this.revealedWinningTile = new PIXI.Sprite(this.resources.revealedWinningTile.texture);
                this.revealedWinningTile.anchor.set(0.5, 0.5);
                this.revealedWinningTile.position.x = this.x;
                this.revealedWinningTile.position.y = this.y;
                resolve();
            }

        });
    }

    async numberSelection() {

        this.numberSelected = Math.floor((Math.random() * 100) + 1);
        const digits = this.numberSelected.toString().split('').map(Number);

        digits.forEach((digit) => {
            this.createbasicNumbers(digit);

        })

        await this.checkForMatch()
            .then((isWon) => {
                console.log(isWon);
                this.createTile(isWon)
            })
            .then(() => { this.completeSprite() });

    }

    checkForMatch() {

        return new Promise((resolve) => {
            console.log(this.revealedNumbers);
            var isWon = false;
            this.revealedNumbers.forEach((tile) => {
                if (tile.numberSelected == this.numberSelected) {
                    console.log("true");
                    isWon = true;
                    resolve(isWon);
                } else {
                    isWon = false;
                }
            });
            isWon = false;
            resolve(isWon);
        })

    }


    alreadyRevealedCheckForMatch(number) {
        var me = this;
        return new Promise((resolve) => {
            console.log("Checking in winning alreadyRevealedCheckForMatch number : "+number+" , numberSelected : "+this.numberSelected);
            if (number == me.numberSelected) {
                console.log("Into the if");
                
                // var children =[];
                // this.revealedWinningTile.children.forEach((sprite)=>{
                //     children.push(sprite);
                // })

                this.revealedWinningTile.texture = this.resources.wonBackgroundWinningTile.texture;
            
                // console.log("Start Winning");
                // console.log(children);
                // console.log("children.length ", children.length);
                // console.log("END");

                // children.forEach((child)=>{
                //     console.log("Adding this Child" + child);
                //     this.revealedWinningTile.addChild(child);
                // });
                console.log(this.revealedWinningTile);
                this.newrevealedWinningTile = new PIXI.AnimatedSprite([
                    this.resources.shimmer21.texture,
                    this.resources.shimmer22.texture,
                    this.resources.shimmer23.texture,
                    this.resources.shimmer24.texture,
                    this.resources.shimmer25.texture,
                    this.resources.shimmer26.texture,
                    this.resources.shimmer27.texture,
                    this.resources.shimmer28.texture,
                    this.resources.shimmer29.texture,
                    this.resources.shimmer210.texture,
                    this.resources.shimmer211.texture,
                    this.resources.shimmer212.texture

                ]);
                this.newrevealedWinningTile.anchor.set(0.5, 0.5);
                this.newrevealedWinningTile.animationSpeed = 0.2;
                this.newrevealedWinningTile.play();
                this.newrevealedWinningTile.position.x = this.x;
                this.newrevealedWinningTile.position.y = this.y+11;
                this.isWon = true;
                console.log("Resolving True From Winning");
                resolve(true);
            } else {
                resolve(false);
                console.log("Not match")
            }
        resolve(false);
        })
    }

    createbasicNumbers(number) {


        switch (number) {
            case 1:
                var number1 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(12, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 1, "sprite": number1 });
                return number1;
            case 2:
                var number2 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(65, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 2, "sprite": number2 });
                return number2;
            case 3:
                var number3 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(123, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 3, "sprite": number3 });
                return number3;
            case 4:
                var number4 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(181, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 4, "sprite": number4 });
                return number4;
            case 5:
                var number5 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(239, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 5, "sprite": number5 });
                return number5;
            case 6:
                var number6 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(298, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 6, "sprite": number6 });
                return number6;
            case 7:
                var number7 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(356, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 7, "sprite": number7 });
                return number7;
            case 8:
                var number8 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(414, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 8, "sprite": number8 });
                return number8;
            case 9:
                var number9 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(474, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 9, "sprite": number9 });
                return number9;
            case 0:
                var number0 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicBig.texture, new PIXI.Rectangle(532, 14, 36, 74)));
                this.numbersAndSprites.push({ number: 0, "sprite": number0 });
                return number0;

        }


    }

    async completeSprite() {
        var size = this.numbersAndSprites.length;
        var currentDigit = 1;
        this.numbersAndSprites.forEach((column) => {

            column.sprite.anchor.set(0.5);
            column.sprite.scale.set(0.8);
            column.sprite.position.y = 0;
            switch (size) {
                case 1:
                    column.sprite.position.x = 0;
                    break;
                case 2:
                    switch (currentDigit) {

                        case 1:

                            column.sprite.position.x = -15;
                            break;
                        case 2:

                            column.sprite.position.x = 15;
                            break;
                    }
                    break;
                case 3:
                    switch (currentDigit) {
                        case 1:
                            column.sprite.position.x = -30;
                            break;
                        case 2:
                            column.sprite.position.x = 0;
                            break;
                        case 3:
                            column.sprite.position.x = 30;
                            break;
                    }
                    break;
            }
            currentDigit += 1;
            this.revealedWinningTile.addChild(column.sprite);
        });
    }

    createPaintedNumbers() {
        //Creating Sprites with a custom Texture wich is made by cropping the main .png Image with the help of a PIXI.Rectangle
        var number1 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(210, 55, 121, 218)));
        var number2 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(399, 55, 121, 218)));
        var number3 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(611, 55, 121, 218)));
        var number4 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(825, 55, 121, 218)));
        var number5 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1035, 55, 121, 218)));
        var number6 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1458, 55, 121, 218)));
        var number7 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1246, 55, 121, 218)));
        var number8 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1669, 55, 121, 218)));
        var number9 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1882, 55, 121, 218)));
        var number0 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2094, 55, 121, 218)));
        var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2309, 55, 121, 218)));
        var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2524, 196, 71, 93)));
        var dot = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2684, 190, 68, 83)));

    }


}