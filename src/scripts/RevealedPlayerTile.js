
import { current } from "@reduxjs/toolkit";
import * as PIXI from "pixi.js-legacy";
import { Texture } from "pixi.js-legacy";

export class RevealedPlayerTile {
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
        this.smallNumbersAndSprites = [];
        this.doubleNumberFlag = false;

        this.numberSelection();


    }



    createTile(isWon) {

        return new Promise((resolve) => {
            console.log("Is Won for Player Tile is : " + isWon);
            if (isWon) {
                console.log("Matched in creation");
                
                this.revealedPlayerTile = new PIXI.Sprite(this.resources.wonBackgroundPlayerTile.texture);
                this.revealedPlayerTile.anchor.set(0.5, 0.5);
                this.revealedPlayerTile.position.x = this.x;
                this.revealedPlayerTile.position.y = this.y;
                

                this.newrevealedPlayerTile = new PIXI.AnimatedSprite([
                    this.resources.shimmer1.texture,
                    this.resources.shimmer2.texture,
                    this.resources.shimmer3.texture,
                    this.resources.shimmer4.texture,
                    this.resources.shimmer5.texture,
                    this.resources.shimmer6.texture,
                    this.resources.shimmer7.texture,
                    this.resources.shimmer8.texture,
                    this.resources.shimmer9.texture,
                    this.resources.shimmer10.texture,
                    this.resources.shimmer11.texture,
                    this.resources.shimmer12.texture
                ]);
                this.newrevealedPlayerTile.anchor.set(0.5, 0.5);
                this.newrevealedPlayerTile.animationSpeed = 0.2;
                this.newrevealedPlayerTile.play();
                this.newrevealedPlayerTile.position.x = this.x;
                this.newrevealedPlayerTile.position.y = this.y+11;
                this.isWon = true;
                resolve();
            } else {
                console.log("Not Matched in creation");
                this.revealedPlayerTile = new PIXI.Sprite(this.resources.revealedPlayerTile.texture);
                this.revealedPlayerTile.anchor.set(0.5, 0.5);
                this.revealedPlayerTile.position.x = this.x;
                this.revealedPlayerTile.position.y = this.y;
                resolve();
            }
        });
    }


    async numberSelection() {
       

        let possibility = Math.floor((Math.random() * 100) + 1);
        let firstSelection = Math.floor((Math.random() * 3) + 1);

        let randomPriceSelector = Math.floor((Math.random() * 5));
        let winnablePrices = [10, 100, 1000, 10000, 100000];


        if (possibility < 95) {
            this.numberSelected = Math.floor((Math.random() * 100) + 1);
            var digits = this.numberSelected.toString().split('').map(Number);

            digits.forEach((digit) => {
                this.createbasicNumbers(digit);

            })
            this.priceWon = winnablePrices[randomPriceSelector];
            digits = this.priceWon.toString().split('').map(Number);

            digits.forEach((digit) => {

                this.createSmallNumbers(digit);
            });
            await this.checkForMatch()
                .then((isWon) => {
                    this.createTile(isWon)
                })
                .then(() => { this.completeSprite() });

            return;
        } else {

            switch (firstSelection) {
                case 1:

                    var stackOfMoney = new PIXI.Sprite(this.resources.moneySymbol.texture);
                    this.priceWon = winnablePrices[randomPriceSelector];
                    var isWon = false;
                    digits = this.priceWon.toString().split('').map(Number);

                    digits.forEach((digit) => {
                        this.createSmallNumbers(digit);
                    });
                    isWon = true;
                    this.createTile(isWon);
                    this.completeSpriteStackofMoney(stackOfMoney);
                    return;
                case 2:

                    var coin = new PIXI.Sprite(this.resources.coinSymbol.texture);
                    this.priceWon = winnablePrices[randomPriceSelector];
                    var isWon = false;
                    digits = this.priceWon.toString().split('').map(Number);

                    digits.forEach((digit) => {
                        this.createSmallNumbers(digit);
                    });
                    isWon = true;
                    this.createTile(isWon);
                    this.completeSpriteStackofMoney(coin);
                    return;

                case 3:
                    var diamondSymbol = new PIXI.Sprite(this.resources.diamondSymbol.texture);
                    this.priceWon = winnablePrices[randomPriceSelector];
                    var isWon = false;
                    digits = this.priceWon.toString().split('').map(Number);

                    digits.forEach((digit) => {
                        this.createSmallNumbers(digit);
                    });
                    isWon = true;
                    this.createTile(isWon);
                    this.completeSpriteStackofMoney(diamondSymbol);
                    return;
            }
        }
    }

    checkForMatch() {
        return new Promise((resolve) => {
            console.log(this.revealedNumbers);
            var iswon = false;
            this.revealedNumbers.forEach((tile) => {
                if (tile.numberSelected == this.numberSelected) {
                    iswon = true;
                    resolve(iswon);
                } else {
                    iswon = false;
                }
            });
            iswon = false;
            resolve(iswon);
        })

    }

    alreadyRevealedCheckForMatch(number) {
        var me = this;
        return new Promise((resolve) => {
            console.log("Checking in alreadyRevealedCheckForMatch number : "+number+" , numberSelected : "+this.numberSelected);
            if (number == me.numberSelected) {
                console.log("Into the if");
            
                
                this.revealedPlayerTile.texture = this.resources.wonBackgroundPlayerTile.texture;
                
                console.log(this.revealedPlayerTile);
                this.newrevealedPlayerTile = new PIXI.AnimatedSprite([
                    this.resources.shimmer1.texture,
                    this.resources.shimmer2.texture,
                    this.resources.shimmer3.texture,
                    this.resources.shimmer4.texture,
                    this.resources.shimmer5.texture,
                    this.resources.shimmer6.texture,
                    this.resources.shimmer7.texture,
                    this.resources.shimmer8.texture,
                    this.resources.shimmer9.texture,
                    this.resources.shimmer0.texture,
                    this.resources.shimmer11.texture,
                    this.resources.shimmer12.texture
                ]);
                this.newrevealedPlayerTile.anchor.set(0.5, 0.5);
                this.newrevealedPlayerTile.animationSpeed = 0.2;
                this.newrevealedPlayerTile.play();
                this.newrevealedPlayerTile.position.x = this.x;
                this.newrevealedPlayerTile.position.y = this.y+11;
                this.isWon = true;
                console.log("Resolving True From Player");
                resolve(true);
            } else {
                console.log("Not match")
                resolve(false);
                
            }

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
                this.numbersAndSprites.push({ number: 10, "sprite": number0 });
                return number0;

        }


    }

    createSmallNumbers(number) {
        
        switch (number) {
            case 1:
                var number1 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(3, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 1, "sprite": number1 });
                return number1;
            case 2:
                var number2 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(21, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 2, "sprite": number2 });
                return number2;
            case 3:
                var number3 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(41, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 3, "sprite": number3 });
                return number3;
            case 4:
                var number4 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(61, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 4, "sprite": number4 });
                return number4;
            case 5:
                var number5 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(81, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 5, "sprite": number5 });
                return number5;
            case 6:
                var number6 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(101, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 6, "sprite": number6 });
                return number6;
            case 7:
                var number7 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(121, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 7, "sprite": number7 });
                return number7;
            case 8:
                var number8 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(141, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 8, "sprite": number8 });
                return number8;
            case 9:
                var number9 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(161, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 9, "sprite": number9 });
                return number9;
            case 0:
                var number0 = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(181, 4, 16, 28)));
                this.smallNumbersAndSprites.push({ number: 0, "sprite": number0 });
                return number0;
        }
    }


    async completeSprite() {
        var size = this.numbersAndSprites.length;

        var currentDigit = 1;
        this.numbersAndSprites.forEach((column) => {
            column.sprite.anchor.set(0.5);
            column.sprite.scale.set(0.8);
            column.sprite.position.y = -10;
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
            this.revealedPlayerTile.addChild(column.sprite);
        });

        this.placingSmallNumbers(this.revealedPlayerTile);
    }


    completeSpriteStackofMoney(stackOfMoney) {

        stackOfMoney.anchor.set(0.5);
        stackOfMoney.scale.set(0.9);
        stackOfMoney.position.x = 0;
        stackOfMoney.position.y = -20;
        this.revealedPlayerTile.addChild(stackOfMoney);
        this.placingSmallNumbers(this.revealedPlayerTile);

    }

    placingSmallNumbers(tileSprite) {
        var size2 = this.smallNumbersAndSprites.length;
        var currentDigit2 = 1;
        this.smallNumbersAndSprites.forEach((column) => {

            column.sprite.anchor.set(0.5);
            column.sprite.scale.set(1);
            column.sprite.position.y = 30;

            switch (size2) {
                case 2:
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(202, 4, 16, 28)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(1);
                            dollarSign.position.x = -10;
                            dollarSign.position.y = 30;
                            column.sprite.position.x = 0;
                            tileSprite.addChild(dollarSign);
                            break;
                        case 2:
                            column.sprite.position.x = 10;
                            break;
                    }
                    break;
                case 3:

                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(202, 4, 16, 28)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = -20;
                            dollarSign.position.y = 30;
                            tileSprite.addChild(dollarSign);
                            column.sprite.position.x = -10;
                            break;
                        case 2:
                            column.sprite.position.x = 5;
                            break;
                        case 3:
                            column.sprite.position.x = 20;
                            break;
                    }
                    break;
                case 4:
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(202, 4, 16, 28)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = -30;
                            dollarSign.position.y = 30;
                            tileSprite.addChild(dollarSign);
                            column.sprite.position.x = -20;
                            break;
                        case 2:
                            var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(221, 20, 12, 13)));
                            comma.anchor.set(0.5);
                            comma.scale.set(0.8);
                            comma.position.x = -10;
                            comma.position.y = 40;
                            tileSprite.addChild(comma);
                            column.sprite.position.x = 0;
                            break;
                        case 3:
                            column.sprite.position.x = 15;
                            break;
                        case 4:
                            column.sprite.position.x = 30;
                            break;
                    }
                    break;
                case 5:
                    console.log("case 5");
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(202, 4, 16, 28)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = -35;
                            dollarSign.position.y = 30;
                            tileSprite.addChild(dollarSign);
                            column.sprite.position.x = -25;
                            break;
                        case 2:

                            column.sprite.position.x = -15;
                            break;
                        case 3:
                            var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(221, 20, 12, 13)));
                            comma.anchor.set(0.5);
                            comma.scale.set(0.8);
                            comma.position.x = -5;
                            comma.position.y = 40;
                            tileSprite.addChild(comma);
                            column.sprite.position.x = 5;
                            break;
                        case 4:
                            column.sprite.position.x = 20;
                            break;
                        case 5:
                            column.sprite.position.x = 35;
                            break;
                    }
                    break;
                case 6:
                    console.log("case 6");
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(202, 4, 16, 28)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = -45;
                            dollarSign.position.y = 30;
                            tileSprite.addChild(dollarSign);
                            column.sprite.position.x = -35;
                            break;
                        case 2:

                            column.sprite.position.x = -25;
                            break;
                        case 3:

                            column.sprite.position.x = -10;
                            break;
                        case 4:
                            var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.basicSmall.texture, new PIXI.Rectangle(221, 20, 12, 13)));
                            comma.anchor.set(0.5);
                            comma.scale.set(0.8);
                            comma.position.x = 0;
                            comma.position.y = 40;
                            tileSprite.addChild(comma);
                            column.sprite.position.x = 10;
                            break;
                        case 5:
                            column.sprite.position.x = 25;
                            break;
                        case 6:
                            column.sprite.position.x = 40;
                            break;
                    }
                    break;

            }
            currentDigit2 += 1;
            tileSprite.addChild(column.sprite);
        });
    }
}
