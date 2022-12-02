import * as PIXI from "pixi.js-legacy";
import * as TWEEN from "@tweenjs/tween.js";

export class EndingScenario {
    constructor(resources , priceWon , isWon){
        this.resources = resources;
        this.priceWon = priceWon;
        this.isWon = isWon;
        this.container = new PIXI.Container();
        this.coinsArray = [];
        this.tweenArray = [];
        this.numbersAndSprites = [];
        this.createScenario(isWon);
    }

    createScenario(isWon){
        if(isWon){
            this.createCoins();
            this.createTickerForCoinsAnimation();
            if(this.priceWon <20){
                this.titleSprite = new PIXI.Sprite(this.resources.youWon.texture);

                this.titleSprite.anchor.set(0.5);
                this.titleSprite.position.x= 650;
                this.titleSprite.position.y = 200;
                this.container.addChild(this.titleSprite);

                var digits = this.priceWon.toString().split('').map(Number);
                digits.forEach((digit) =>{
                    this.createNumbers(digit);
                });

                this.completePlacingNumbers();

            }else if(this.priceWon<200){
                this.titleSprite = new PIXI.Sprite(this.resources.niceWin.texture);

                this.titleSprite.anchor.set(0.5);
                this.titleSprite.position.x= 650;
                this.titleSprite.position.y = 200;
                this.container.addChild(this.titleSprite);

                var digits = this.priceWon.toString().split('').map(Number);
                digits.forEach((digit) =>{
                    this.createNumbers(digit);
                });

                this.completePlacingNumbers();
            }else if(this.priceWon<5000){
                this.titleSprite = new PIXI.Sprite(this.resources.bigWin.texture);

                this.titleSprite.anchor.set(0.5);
                this.titleSprite.position.x= 650;
                this.titleSprite.position.y = 200;
                this.container.addChild(this.titleSprite);

                var digits = this.priceWon.toString().split('').map(Number);
                digits.forEach((digit) =>{
                    this.createNumbers(digit);
                });

                this.completePlacingNumbers();
            }else if(this.priceWon<200000){
                this.titleSprite = new PIXI.Sprite(this.resources.megaWin.texture);

                this.titleSprite.anchor.set(0.5);
                this.titleSprite.position.x= 650;
                this.titleSprite.position.y = 200;
                this.container.addChild(this.titleSprite);

                var digits = this.priceWon.toString().split('').map(Number);
                digits.forEach((digit) =>{
                    this.createNumbers(digit);
                });


                this.completePlacingNumbers();
            }else if(this.priceWon == 200000){
                this.titleSprite = new PIXI.Sprite(this.resources.jackpot.texture);

                this.titleSprite.anchor.set(0.5);
                this.titleSprite.position.x= 650;
                this.titleSprite.position.y = 200;
                this.container.addChild(this.titleSprite);

                var digits = this.priceWon.toString().split('').map(Number);
                digits.forEach((digit) =>{
                    this.createNumbers(digit);
                });

                this.completePlacingNumbers();
            }
            var button = new PIXI.Sprite(this.resources.finishButton.texture);
            button.anchor.set(0.5);
            button.position.x= this.titleSprite.x;
            button.position.y= this.titleSprite.y + 380;
            this.container.addChild(button);
            
        }else if(!isWon){
            this.titleSprite = new PIXI.Sprite(this.resources.betterLuckNextTime.texture);
            this.titleSprite.anchor.set(0.5);
            this.titleSprite.position.x= 650;
            this.titleSprite.position.y = 300;
            
            var button = new PIXI.Sprite(this.resources.finishButton.texture);
            button.anchor.set(0.5);
            button.position.x= this.titleSprite.x;
            button.position.y= this.titleSprite.y + 280;
            
            this.container.addChild(button);
            this.container.addChild(this.titleSprite);

        }
    }

    createCoins(){
        var numberofCoins = Math.floor((Math.random() * 20) + 10);
        
        console.log(numberofCoins);
        for(var i=1; i<numberofCoins; i++){
            var randomPositionX = Math.floor((Math.random() * (this.container.width+500)) + 10);
            var randomPositionY = Math.floor((Math.random() * (this.container.height)) + 10);
            var randomSpeed = Math.floor(Math.random() * 4000)+4000;
            var sprite = new PIXI.AnimatedSprite([
                this.resources.coin1.texture,
                this.resources.coin2.texture,
                this.resources.coin3.texture,
                this.resources.coin4.texture,
                this.resources.coin5.texture,
                this.resources.coin6.texture,
                this.resources.coin7.texture,
                this.resources.coin8.texture,
            ]);

            sprite.anchor.set(0.5);
            sprite.animationSpeed = -0.2;
            sprite.play();
            sprite.position.x = randomPositionX;
            sprite.position.y = randomPositionY;

            this.coinsArray.push(sprite);
            this.container.addChild(sprite);

            var tween = new TWEEN.Tween(sprite).to({y:this.container.height+700} , randomSpeed).repeat(Infinity).start();
            this.tweenArray.push(tween);
        }
    }
    createTickerForCoinsAnimation(){
        this.tickerForCoinsAnimation = new PIXI.Ticker();
        this.tickerForCoinsAnimation.autoStart = false;
        this.tickerForCoinsAnimation.stop();
        this.tickerForCoinsAnimation.add(() => {
            this.tweenArray.forEach((tween)=>{
                tween.update();
            });
        });
        this.tickerForCoinsAnimation.start();
    }

    createNumbers(number) {

        switch (number) {
            case 1:
                var number1 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(210, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 1, "sprite": number1 });
                return number1;
            case 2:
                var number2 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(399, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 2, "sprite": number2 });
                return number2;
            case 3:
                var number3 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(611, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 3, "sprite": number3 });
                return number3;
            case 4:
                var number4 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(825, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 4, "sprite": number4 });
                return number4;
            case 5:
                var number5 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1035, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 5, "sprite": number5 });
                return number5;
            case 6:
                var number6 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1458, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 6, "sprite": number6 });
                return number6;
            case 7:
                var number7 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1246, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 7, "sprite": number7 });
                return number7;
            case 8:
                var number8 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1669, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 8, "sprite": number8 });
                return number8;
            case 9:
                var number9 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(1882, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 9, "sprite": number9 });
                return number9;
            case 0:
                var number0 = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2094, 55, 121, 218)));
                this.numbersAndSprites.push({ number: 10, "sprite": number0 });
                return number0;

        }


    }

    completePlacingNumbers(){
        var size2 = this.numbersAndSprites.length;
        var currentDigit2 = 1;
        var settinganchors_x = this.titleSprite.x;
        var settinganchors_y = this.titleSprite.y+200;
        this.numbersAndSprites.forEach((column) => {

            column.sprite.anchor.set(0.5);
            column.sprite.scale.set(1);
            column.sprite.position.y = settinganchors_y;

            switch (size2) {
                case 2:
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2309, 55, 121, 218)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(1);
                            dollarSign.position.x = settinganchors_x -100;
                            dollarSign.position.y = settinganchors_y;
                            column.sprite.position.x = this.titleSprite.x;
                            this.container.addChild(dollarSign);
                            break;
                        case 2:
                            column.sprite.position.x = settinganchors_x+100;
                            break;
                    }
                    break;
                case 3:

                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2309, 55, 121, 218)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(1);
                            dollarSign.position.x = settinganchors_x-200;
                            dollarSign.position.y = this.titleSprite.y;
                            this.container.addChild(dollarSign);
                            column.sprite.position.x = -100;
                            break;
                        case 2:
                            column.sprite.position.x = settinganchors_x;
                            break;
                        case 3:
                            column.sprite.position.x = settinganchors_x +100;
                            break;
                    }
                    break;
                case 4:
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2309, 55, 121, 218)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = settinganchors_x-400;
                            dollarSign.position.y = settinganchors_y;
                            this.container.addChild(dollarSign);
                            column.sprite.position.x = settinganchors_x-300;
                            break;
                        case 2:
                            var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2524, 196, 71, 93)));
                            comma.anchor.set(0.5);
                            comma.scale.set(0.8);
                            comma.position.x = settinganchors_x-200;
                            comma.position.y = settinganchors_y+70;
                            this.container.addChild(comma);
                            column.sprite.position.x = settinganchors_x-100;
                            break;
                        case 3:
                            column.sprite.position.x = settinganchors_x;
                            break;
                        case 4:
                            column.sprite.position.x = settinganchors_x+100;
                            break;
                    }
                    break;
                case 5:
                    console.log("case 5");
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2309, 55, 121, 218)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = settinganchors_x-300;
                            dollarSign.position.y = settinganchors_y;
                            this.container.addChild(dollarSign);
                            column.sprite.position.x = settinganchors_x-200;
                            break;
                        case 2:

                            column.sprite.position.x = settinganchors_x-100;
                            break;
                        case 3:
                            var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2524, 196, 71, 93)));
                            comma.anchor.set(0.5);
                            comma.scale.set(0.8);
                            comma.position.x = settinganchors_x;
                            comma.position.y = settinganchors_y+70;
                            this.container.addChild(comma);
                            column.sprite.position.x = settinganchors_x +100;
                            break;
                        case 4:
                            column.sprite.position.x = settinganchors_x+200;
                            break;
                        case 5:
                            column.sprite.position.x = settinganchors_x+300;
                            break;
                    }
                    break;
                case 6:
                    console.log("case 6");
                    switch (currentDigit2) {
                        case 1:
                            var dollarSign = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2309, 55, 121, 218)));
                            dollarSign.anchor.set(0.5);
                            dollarSign.scale.set(0.8);
                            dollarSign.position.x = settinganchors_x-400;
                            dollarSign.position.y = settinganchors_y;
                            this.container.addChild(dollarSign);
                            column.sprite.position.x = settinganchors_x-300;
                            break;
                        case 2:

                            column.sprite.position.x = settinganchors_x-200;
                            break;
                        case 3:

                            column.sprite.position.x = settinganchors_x-100;
                            break;
                        case 4:
                            var comma = new PIXI.Sprite(new PIXI.Texture(this.resources.paintedBig.texture, new PIXI.Rectangle(2524, 196, 71, 93)));
                            comma.anchor.set(0.5);
                            comma.scale.set(0.8);
                            comma.position.x = settinganchors_x;
                            comma.position.y = settinganchors_y+70;
                            this.container.addChild(comma);
                            column.sprite.position.x = settinganchors_x+100;
                            break;
                        case 5:
                            column.sprite.position.x = settinganchors_x+200;
                            break;
                        case 6:
                            column.sprite.position.x = settinganchors_x+300;
                            break;
                    }
                    break;

            }
            currentDigit2 += 1;
            this.container.addChild(column.sprite);
        });
    }
}



        
        
        
        
        
        
        
       