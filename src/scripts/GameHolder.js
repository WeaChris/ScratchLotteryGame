import { RevealedWinningTile } from "./RevealedWinningTile"
import { RevealedPlayerTile } from "./RevealedPlayerTile"
import * as PIXI from "pixi.js-legacy";
import * as TWEEN from "@tweenjs/tween.js"
import { TextureLoader } from "pixi.js-legacy";
import { EndingScenario } from "./EndingScenario";


export class GameHolder {
    constructor(resources) {
        this.resources = resources;
        this.container = new PIXI.Container();
        this.container.interactive = true;


        this.winningTiles = [];
        this.sparklesArray = [];
        this.sparkles2Array = [];
        
        this.holderforWinningTiles = new Map();
        this.playerTiles = [];
        this.revealedWinningNumbers = [];
        this.revealedPlayerNumbers = [];

        this.createTickerforstars();
        this.createGameHolder();
        this.createWiningTiles();
        this.createPlayersTiles();

        
    }

    createGameHolder() {
        this.gameholder = new PIXI.Sprite(this.resources.gameholder.texture);
        this.gameholder.interactive = true;
        this.container.addChild(this.gameholder);

    }

    createWiningTiles() {

        const limiter = 0;

        for (let i = 0; i < 5; i++) {
            var winningTile = new PIXI.Sprite(this.resources.winningTile.texture);
            var tileReflection = new PIXI.Sprite(this.resources.tileReflection.texture);
            var sparkle = new PIXI.Sprite(this.resources.sparkle.texture);
            var sparkle2 = new PIXI.Sprite(this.resources.sparkle.texture);
            var holderforWinningTile = new PIXI.Sprite(this.resources.holderforWinningTiles.texture);


            //positioning of the Sprites
            winningTile.anchor.set(0.5, 0.5);
            winningTile.position.x = (winningTile.width * i / 2) + 370;
            winningTile.position.y = winningTile.height / 1.5;
            winningTile.hitArea = new PIXI.Rectangle(-50, -30, 100, 80);

            holderforWinningTile.anchor.set(0.5, 0.5);
            holderforWinningTile.scale.set(0.7);
            holderforWinningTile.alpha = 0.6;
            // holderforWinningTile.position.x = 
            holderforWinningTile.position.y = 15;
            winningTile.addChild(holderforWinningTile);
            
            tileReflection.anchor.set(0.5);
            tileReflection.position.x = 0;
            tileReflection.position.y = 0;
            tileReflection.alpha = 0.2;
            winningTile.addChild(tileReflection);

            sparkle.anchor.set(0.5);
            sparkle.scale.set(0.6);
            sparkle.position.x = -50;
            sparkle.position.y = -22;
            winningTile.addChild(sparkle);
            
            sparkle2.anchor.set(0.5);
            sparkle2.scale.set(0.6);
            sparkle2.position.x = 50;
            sparkle2.position.y = +22;
            winningTile.addChild(sparkle2);

            

            winningTile.interactive = true;
            winningTile.on('pointerover', (event) => {
                this.onpointerover(event);
            });
            winningTile.on('pointerout', (event) => {
                this.onpointerout(event);
            });
            winningTile.on('click', (event) => {
                this.onclickWinningTile(event);
            });

            this.sparklesArray.push(sparkle);
            this.sparkles2Array.push(sparkle2);
            
            
            this.winningTiles.push(winningTile);

            this.container.addChild(winningTile);

        }

    }

    createPlayersTiles() {

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                var playerTile = new PIXI.Sprite(this.resources.playerTile.texture);
                var tileReflection = new PIXI.Sprite(this.resources.tileReflection.texture);
                var sparkle = new PIXI.Sprite(this.resources.sparkle.texture);
                var sparkle2 = new PIXI.Sprite(this.resources.sparkle.texture);


                playerTile.anchor.set(0.5, 0.5); // very important setting the start of the sprite at the center 
                playerTile.position.x = (playerTile.width * i / 2.1) + 170;
                playerTile.position.y = (playerTile.height * j / 2.55) + 350;
                playerTile.hitArea = new PIXI.Rectangle(-50, -30, 100, 80);

                sparkle.scale.set(0.5);
                sparkle.anchor.set(0.5, 0.5);
                sparkle.position.x = -52;
                sparkle.position.y = -10;
                playerTile.addChild(sparkle)

                sparkle2.scale.set(0.5);
                sparkle2.anchor.set(0.5, 0.5);
                sparkle2.position.x = 52;
                sparkle2.position.y = 10;
                playerTile.addChild(sparkle2)

                playerTile.interactive = true;
                playerTile.on('pointerover', (event) => {
                    this.onpointeroverPlayer(event);
                });
                playerTile.on('pointerout', (event) => {
                    this.onpointeroutPlayer(event,);
                });
                playerTile.on('click', (event) => {
                    this.onclickPlayerTile(event);
                });

                this.sparklesArray.push(sparkle);
                this.sparkles2Array.push(sparkle2);
                
                this.playerTiles.push(playerTile);

                this.container.addChild(playerTile);

            }
        }
    }

    onpointerover(event) {
        console.log();
        var currentWinningTile = event.currentTarget;
        this.tileHilight = new PIXI.Sprite(this.resources.tileHilight.texture);
        this.holderforWinningTilesOverlay = new PIXI.Sprite(this.resources.holderforWinningTilesOverlay.texture);
        // this.glow = new PIXI.Sprite(this.resources.glow.texture);

        this.tileHilight.anchor.set(0.5, 0.5);
        this.tileHilight.position.x = currentWinningTile.position.x;
        this.tileHilight.position.y = currentWinningTile.position.y;



        this.holderforWinningTilesOverlay.anchor.set(0.5, 0.5);
        this.holderforWinningTilesOverlay.scale.set(1);
        this.holderforWinningTilesOverlay.alpha = 0.2;
        this.holderforWinningTilesOverlay.position.x = currentWinningTile.position.x;
        this.holderforWinningTilesOverlay.position.y = currentWinningTile.position.y;
        // this.glow.anchor.set(0.5,0.5);
        // this.glow.position.x = currentWinningTile.position.x;
        // this.glow.position.y = currentWinningTile.position.y;

        this.container.addChild(this.holderforWinningTilesOverlay)
        this.container.addChild(this.tileHilight);
        this.createTween(currentWinningTile);

        // this.container.addChild(this.glow);
    }

    onpointerout(event) {
        console.log();
        this.container.removeChild(this.tileHilight);
        // this.container.removeChild(this.glow);
        this.tween1.stop();
        this.tween2.stop();
        this.tween3.stop();
        this.tween4.stop();
        this.mouseOverAnimationTicker.stop();
        this.container.removeChild(this.holderforWinningTilesOverlay);
        this.container.removeChild(this.particle1);
        this.container.removeChild(this.particle2);
        this.container.removeChild(this.particle3);
        this.container.removeChild(this.particle4);

    }

    onpointeroverPlayer(event) {
        console.log();
        var currentplayerTile = event.currentTarget;
        this.tileHilight2 = new PIXI.Sprite(this.resources.tileHilight.texture);
        this.holderforPlayerTilesOverlay = new PIXI.Sprite(this.resources.holderforWinningTilesOverlay.texture);

        this.tileHilight2.scale.set(1.05);
        this.tileHilight2.anchor.set(0.5, 0.5);
        this.tileHilight2.position.x = currentplayerTile.position.x;
        this.tileHilight2.position.y = currentplayerTile.position.y - 3;

        this.holderforPlayerTilesOverlay.anchor.set(0.5, 0.5);
        this.holderforPlayerTilesOverlay.scale.set(1);
        this.holderforPlayerTilesOverlay.alpha = 0.2;
        this.holderforPlayerTilesOverlay.width = this.holderforPlayerTilesOverlay.width + 17;
        this.holderforPlayerTilesOverlay.position.x = currentplayerTile.position.x;
        this.holderforPlayerTilesOverlay.position.y = currentplayerTile.position.y - 10;

        this.createTween(currentplayerTile);

        this.container.addChild(this.holderforPlayerTilesOverlay);
        this.container.addChild(this.tileHilight2);
    }

    onpointeroutPlayer() {

        this.tween1.stop();
        this.tween2.stop();
        this.tween3.stop();
        this.tween4.stop();
        this.mouseOverAnimationTicker.stop();
        this.container.removeChild(this.holderforPlayerTilesOverlay);
        this.container.removeChild(this.particle1);
        this.container.removeChild(this.particle2);
        this.container.removeChild(this.particle3);
        this.container.removeChild(this.particle4);
        this.container.removeChild(this.tileHilight2);
    }

    onclickWinningTile(event) {
        var currentWinningTile = event.currentTarget;

        this.tween1.stop();
        this.tween2.stop();
        this.tween3.stop();
        this.tween4.stop();
        this.mouseOverAnimationTicker.stop();
        this.container.removeChild(this.holderforWinningTilesOverlay);

        //accessing the sparkles items using as key the current winning tile in order to access the right one's.
        // this.container.removeChild(this.sparklesMap.get(currentWinningTile));
        // this.container.removeChild(this.sparkles2Map.get(currentWinningTile));

        this.container.removeChild(this.particle1);
        this.container.removeChild(this.particle2);
        this.container.removeChild(this.particle3);
        this.container.removeChild(this.particle4);


        this.createTweenforClickedWinningTile(currentWinningTile);
    }

    onclickPlayerTile(event) {

        var currentplayerTile = event.currentTarget;

        this.tween1.stop();
        this.tween2.stop();
        this.tween3.stop();
        this.tween4.stop();
        this.mouseOverAnimationTicker.stop();
        this.container.removeChild(this.holderforPlayerTilesOverlay);

        // this.container.removeChild(this.sparklesMap.get(currentplayerTile));
        // this.container.removeChild(this.sparkles2Map.get(currentplayerTile));

        this.container.removeChild(this.particle1);
        this.container.removeChild(this.particle2);
        this.container.removeChild(this.particle3);
        this.container.removeChild(this.particle4);


        this.createTweenforClickedPlayerTile(currentplayerTile);
    }



    update() {

        this.sparklesArray.forEach((sparkle) => {
            sparkle.rotation += 0.01;
        })
        this.sparkles2Array.forEach((sparkle2) => {
            sparkle2.rotation -= 0.01;
        })

    }

    createTween(currentTile) {

        this.particle1 = new PIXI.Sprite(this.resources.particle1.texture);
        this.particle2 = new PIXI.Sprite(this.resources.particle2.texture);
        this.particle3 = new PIXI.Sprite(this.resources.particle1.texture);
        this.particle4 = new PIXI.Sprite(this.resources.particle2.texture);

        this.particle1.position.x = currentTile.position.x - 5;
        this.particle1.position.y = currentTile.position.y;

        this.particle2.position.x = currentTile.position.x - 3;
        this.particle2.position.y = currentTile.position.y;

        this.particle3.scale.set(0.6);
        this.particle3.alpha = 0.8;
        this.particle3.position.x = currentTile.position.x - 40;
        this.particle3.position.y = currentTile.position.y;

        this.particle4.scale.set(0.7);
        this.particle4.alpha = 0.8;
        this.particle4.position.x = currentTile.position.x - 30;
        this.particle4.position.y = currentTile.position.y;

        this.container.addChild(this.particle1);
        this.container.addChild(this.particle2);
        this.container.addChild(this.particle3);
        this.container.addChild(this.particle4);

        this.tweenGroupA = new TWEEN.Group();  //creating the Twenn animation group 
        this.tween1 = new TWEEN.Tween(this.particle1, this.tweenGroupA);
        this.tween2 = new TWEEN.Tween(this.particle2, this.tweenGroupA);
        this.tween3 = new TWEEN.Tween(this.particle3, this.tweenGroupA);
        this.tween4 = new TWEEN.Tween(this.particle4, this.tweenGroupA);

        this.tween1.to({ y: this.particle1.y - 50 }, 5000).start().repeat(Infinity);
        this.tween2.to({ y: this.particle2.y - 50 }, 1000).start().repeat(Infinity);
        this.tween3.to({ y: this.particle1.y - 50 }, 4000).start().repeat(Infinity);
        this.tween4.to({ y: this.particle2.y - 50 }, 800).start().repeat(Infinity);

        this.createTickerformouseOverAnimation(currentTile);

    }
    createTweenforClickedWinningTile(currentWinningTile) {
        this.tweenGroupForClickedAnimation = new TWEEN.Group();  //creating the Twenn animation group 
        this.first = new TWEEN.Tween(currentWinningTile, this.tweenGroupForClickedAnimation).to({ height: [currentWinningTile.height - 100] }, 500);
        this.second = new TWEEN.Tween(currentWinningTile, this.tweenGroupForClickedAnimation).to({ height: [currentWinningTile.height + 200] }, 100);
        this.firstforborder = new TWEEN.Tween(this.tileHilight, this.tweenGroupForClickedAnimation).to({ height: [currentWinningTile.height - 100] }, 500);
        this.secondforborder = new TWEEN.Tween(this.tileHilight, this.tweenGroupForClickedAnimation).to({ height: [currentWinningTile.height + 200] }, 100);

        this.first.chain(this.second).start();
        this.firstforborder.chain(this.secondforborder).start();
        this.second.onComplete(() => {

            this.createExplosionForWinningTiles(currentWinningTile);
        })

        this.createTickerforclickedWinningTile();
    }

    createTweenforClickedPlayerTile(currentplayerTile) {
        this.tweenGroupForClickedAnimation = new TWEEN.Group();  //creating the Twenn animation group 
        this.first = new TWEEN.Tween(currentplayerTile, this.tweenGroupForClickedAnimation).to({ height: [currentplayerTile.height - 100] }, 500);
        this.second = new TWEEN.Tween(currentplayerTile, this.tweenGroupForClickedAnimation).to({ height: [currentplayerTile.height + 200] }, 50);
        this.firstforborder = new TWEEN.Tween(this.tileHilight2, this.tweenGroupForClickedAnimation).to({ height: [currentplayerTile.height - 100] }, 500);
        this.secondforborder = new TWEEN.Tween(this.tileHilight2, this.tweenGroupForClickedAnimation).to({ height: [currentplayerTile.height + 200] }, 50);

        this.first.chain(this.second).start();
        this.firstforborder.chain(this.secondforborder).start();
        this.second.onComplete(() => {

            this.createExplosionForPlayerTiles(currentplayerTile);
        })

        this.createTickerforclickedPlayerTile();
    }

    createTweenForEndingScenario(){
        this.tweenGroupForEndingScenario = new TWEEN.Group();
        this.endingScenarioTweenfirst = new TWEEN.Tween(this.container, this.tweenGroupForEndingScenario).to( {x : [this.container.x+200], x:[[this.container.x-2000]]}, 1000).delay(5000).start();
        // this.endingScenarioTweenfirst2 = new TWEEN.Tween(this.container, this.tweenGroupForEndingScenario).to( {x : }, 800).start();
        // this.endingScenarioTweenfirst.chain(this.endingScenarioTweenfirst2);
        this.createTickerForEndingScenario();
        this.endingScenarioTweenfirst.onComplete(() => {
            this.endingScenario();
        });
        
    }

    createExplosionForWinningTiles(currentWinningTile) {
        this.clickedWinningTileAnimationTicker.stop();
        this.explosion = new PIXI.Sprite(this.resources.explosion.texture);

        this.explosion.anchor.set(0.5);
        this.explosion.alpha = 10000;
        this.explosion.position.x = currentWinningTile.position.x;
        this.explosion.position.y = currentWinningTile.position.y;

        this.container.addChild(this.explosion);
        this.explosiontween = new TWEEN.Tween(this.explosion).to({ width: this.explosion.width + 500, height: this.explosion.height + 500 }, 100);
        this.explosiontween.start();
        this.createTickerForExplosion();
        this.explosiontween.onComplete(() => {
            console.log("After Explosion");

            this.container.removeChild(this.explosion);
            this.container.removeChild(currentWinningTile);
            this.container.removeChild(this.tileHilight);
            
            this.container.removeChild(this.holderforWinningTiles.get(currentWinningTile));


            this.createRevealedWinningTile(currentWinningTile);

        });
    }

    createExplosionForPlayerTiles(currentplayerTile) {
        this.clickedPlayerTileAnimationTicker.stop();
        this.explosion = new PIXI.Sprite(this.resources.explosion.texture);

        this.explosion.anchor.set(0.5);
        this.explosion.alpha = 10000;
        this.explosion.position.x = currentplayerTile.position.x;
        this.explosion.position.y = currentplayerTile.position.y;

        this.container.addChild(this.explosion);
        this.explosiontween = new TWEEN.Tween(this.explosion).to({ width: this.explosion.width + 500, height: this.explosion.height + 500 }, 100);
        this.explosiontween.start();
        this.createTickerForExplosion();
        this.explosiontween.onComplete(() => {
            console.log("After Explosion");

            this.container.removeChild(this.explosion);
            this.container.removeChild(currentplayerTile);
            this.container.removeChild(this.tileHilight2);
            
            this.container.removeChild(this.holderforWinningTiles.get(currentplayerTile));

            this.createRevealedPlayerTile(currentplayerTile);

        });
    }

    createTickerForExplosion() {
        this.tickerForExplosion = new PIXI.Ticker();
        this.tickerForExplosion.autoStart = false;
        this.tickerForExplosion.stop();
        this.tickerForExplosion.add(() => {
            this.explosiontween.update();
            // this.explosion.alpha += 2000;
        });
        this.tickerForExplosion.start();
    }
    createTickerformouseOverAnimation(currentTile) {
        this.mouseOverAnimationTicker = new PIXI.Ticker();
        this.mouseOverAnimationTicker.autoStart = false;
        this.mouseOverAnimationTicker.stop();
        this.mouseOverAnimationTicker.add(() => {
            this.tweenGroupA.update();
            //checking the current position of the particles so i can reset their alpha at the right timing
            if (this.particle1.position.y + 0.5 > currentTile.position.y) {
                this.particle1.alpha = 1;
            }
            if (this.particle2.position.y + 0.5 > currentTile.position.y) {
                this.particle2.alpha = 1;
            }
            if (this.particle3.position.y + 0.5 > currentTile.position.y) {
                this.particle3.alpha = 1;
            }
            if (this.particle4.position.y + 0.5 > currentTile.position.y) {
                this.particle4.alpha = 0.8;
            }
            //substracting some alpha in every repetition to create the fade out effect
            this.particle1.alpha -= 0.006;
            this.particle2.alpha -= 0.006;
            this.particle3.alpha -= 0.006;
            this.particle4.alpha -= 0.006;
        });
        this.mouseOverAnimationTicker.start();
    }

    createTickerforclickedWinningTile() {
        this.clickedWinningTileAnimationTicker = new PIXI.Ticker();
        this.clickedWinningTileAnimationTicker.autoStart = false;
        this.clickedWinningTileAnimationTicker.stop();
        this.clickedWinningTileAnimationTicker.add(() => {
            this.tweenGroupForClickedAnimation.update();
        });
        this.clickedWinningTileAnimationTicker.start();
    }

    createTickerforclickedPlayerTile() {
        this.clickedPlayerTileAnimationTicker = new PIXI.Ticker();
        this.clickedPlayerTileAnimationTicker.autoStart = false;
        this.clickedPlayerTileAnimationTicker.stop();
        this.clickedPlayerTileAnimationTicker.add(() => {
            this.tweenGroupForClickedAnimation.update();
        });
        this.clickedPlayerTileAnimationTicker.start();
    }
    createTickerforstars() {
        this.ticker = new PIXI.Ticker();
        this.ticker.autoStart = false;
        this.ticker.stop();
        this.ticker.add(() => {
            this.update();
        });
        this.ticker.start();
    }
    createTickerForEndingScenario(){
        this.ticker = new PIXI.Ticker();
        this.ticker.autoStart = false;
        this.ticker.stop();
        this.ticker.add(() => {
            this.tweenGroupForEndingScenario.update();
        });
        this.ticker.start();
    }

    async createRevealedWinningTile(currentWinningTile) {
        
        var tile = await new RevealedWinningTile(this.resources, currentWinningTile.position.x, currentWinningTile.position.y, this.revealedPlayerNumbers);
        tile.revealedWinningTile.position.y += 12;
        
        this.revealedWinningNumbers.push(tile);
        this.container.addChild(tile.revealedWinningTile);
        try{
            this.container.addChild(tile.newrevealedWinningTile);
        }catch(err){
            console.log(err);
        }
        

        this.revealedPlayerNumbers.forEach((playerTile) => {
            console.log(tile.numberSelected);
            playerTile.alreadyRevealedCheckForMatch(tile.numberSelected).then((boolean)=>{
                console.log("Made it with boolean : "+boolean);
                if(boolean){
                    this.container.addChild(playerTile.revealedPlayerTile);
                    this.container.addChild(playerTile.newrevealedPlayerTile);
                }
            });
        });
        this.container.addChild(tile.revealedWinningTile);

        if(this.revealedPlayerNumbers.length == 24 && this.revealedWinningNumbers.length == 5){
            this.wonPriceSum =0;
            this.revealedPlayerNumbers.forEach((playerTile) => {
                
                playerTile.isWon ? this.wonPriceSum += playerTile.priceWon : this.wonPriceSum=this.wonPriceSum;
                console.log(this.wonPriceSum);
            });
            
            this.createTweenForEndingScenario();
        }
        
    }


    async createRevealedPlayerTile(currentPlayerTile) {
        
        var tile = await new RevealedPlayerTile(this.resources, currentPlayerTile.position.x, currentPlayerTile.position.y, this.revealedWinningNumbers);
        tile.revealedPlayerTile.position.y += 11;
        
        this.revealedPlayerNumbers.push(tile);
        this.container.addChild(tile.revealedPlayerTile);
        try{
            this.container.addChild(tile.newrevealedPlayerTile);
        }catch(err){
            console.log(err);
        }

        this.revealedWinningNumbers.forEach((winningTile) => {
            console.log(tile.numberSelected);
            winningTile.alreadyRevealedCheckForMatch(tile.numberSelected).then((boolean)=>{
                console.log("Made it with boolean : "+boolean);
                if(boolean){
                    this.container.addChild(winningTile.revealedWinningTile);
                    this.container.addChild(winningTile.newrevealedWinningTile);
                }

            });
        });
        
        if(this.revealedPlayerNumbers.length == 24 && this.revealedWinningNumbers.length == 5){
            this.wonPriceSum =0;
            this.revealedPlayerNumbers.forEach((playerTile) => {
                
                playerTile.isWon ? this.wonPriceSum += playerTile.priceWon : this.wonPriceSum=this.wonPriceSum;
                console.log(this.wonPriceSum);
            });
            this.createTweenForEndingScenario();
        }
        

    }

    endingScenario(){
        this.container.removeChildren();
        this.container.position.x = 0;
        this.container.position.y = 0;
        console.log("MADE IT TO ENDING SCENARIO WITH WON PRICE : " , this.wonPriceSum);

        var endingContainer = new EndingScenario(this.resources, this.wonPriceSum , true);

        this.container.addChild(endingContainer.container);
    }

}
