import { 
    Application,
    Sprite,
    Graphics
    } from "pixi.js"; 

import {
    howToTitleStyle,
    howToSubStyle,
    howToStyle,
} from "./fonts-script";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

const htBG: Sprite = Sprite.fromImage("./how_to_background.png");
htBG.scale.x = 1088 / 1175;
htBG.scale.y = 2448 / 2645;
app.stage.addChild(htBG);

const black: Graphics = new Graphics();
black.beginFill(0x000000, .7);
black.drawRect(0, 0, 1024 * .85, 576 * .85);
app.stage.addChild(black);

const howTo = new PIXI.Text("> HOW TO PLAY <", howToTitleStyle);
howTo.x = 305;
howTo.y = 25;
app.stage.addChild(howTo);

const playerOne = new PIXI.Text("PLAYER ONE", howToSubStyle);
playerOne.x = 143;
playerOne.y = 80;
app.stage.addChild(playerOne);

const playerTwo = new PIXI.Text("PLAYER TWO", howToSubStyle);
playerTwo.x = 590;
playerTwo.y = 80;
app.stage.addChild(playerTwo);

const WASD: Sprite = Sprite.fromImage("./WASD.png");
WASD.scale.x = .1;
WASD.scale.y = .1;
WASD.x = 22;
WASD.y = 115;
app.stage.addChild(WASD);

const p1Move = new PIXI.Text("Player One moves with WASD.", howToStyle);
p1Move.x = 110;
p1Move.y = 120;
app.stage.addChild(p1Move);

const arrowKeys: Sprite = Sprite.fromImage("./Arrow_Keys.png");
arrowKeys.scale.x = .3;
arrowKeys.scale.y = .3;
arrowKeys.x = 450;
arrowKeys.y = 117;
app.stage.addChild(arrowKeys);

const p2Move = new PIXI.Text("Player Two moves with arrow keys.", howToStyle);
p2Move.x = 525;
p2Move.y = 120;
app.stage.addChild(p2Move);

const threeKey: Sprite = Sprite.fromImage("./3_Key.png");
threeKey.x = 37;
threeKey.y = 195;
app.stage.addChild(threeKey);

const p1Attack = new PIXI.Text("Use the 3 key to shoot projectiles.", howToStyle);
p1Attack.x = 76;
p1Attack.y = 200;
app.stage.addChild(p1Attack);

const slash: Sprite = Sprite.fromImage("./Backslash_Key.png");
slash.scale.x = .19;
slash.scale.y = .19;
slash.x = 450;
slash.y = 192;
app.stage.addChild(slash);

const p2Attack = new PIXI.Text("Use the forward slash to shoot projectiles.", howToStyle);
p2Attack.x = 495;
p2Attack.y = 200;
app.stage.addChild(p2Attack);

const r: Sprite = Sprite.fromImage("./R_Key.png");
r.scale.x = .07;
r.scale.y = .07;
r.x = 37;
r.y = 251;
app.stage.addChild(r);

const p1Sidestep = new PIXI.Text("Press R while moving to sidestep", howToStyle);
p1Sidestep.x = 81;
p1Sidestep.y = 248;
app.stage.addChild(p1Sidestep);

const p1Block = new PIXI.Text("or while stationary to shield.", howToStyle);
p1Block.x = 81;
p1Block.y = 267;
app.stage.addChild(p1Block);

const comma: Sprite = Sprite.fromImage("./Comma_Key.png");
comma.scale.x = .065;
comma.scale.y = .065;
comma.x = 456;
comma.y = 250;
app.stage.addChild(comma);

const p2Sidestep = new PIXI.Text("Press the comma while moving to sidestep", howToStyle);
p2Sidestep.x = 500;
p2Sidestep.y = 248;
app.stage.addChild(p2Sidestep);

const p2Block = new PIXI.Text("or while stationary to shield.", howToStyle);
p2Block.x = 500;
p2Block.y = 267;
app.stage.addChild(p2Block);

const explanation0 = new PIXI.Text("Each player can only have four projectiles on screen at once.", howToStyle);
explanation0.x = 182;
explanation0.y = 315;
app.stage.addChild(explanation0);

const explanation1 = new PIXI.Text("Knock your opponent off the screen to win.", howToStyle);
explanation1.x = 252;
explanation1.y = 342;
app.stage.addChild(explanation1);

const pressToStart = new PIXI.Text("PRESS                                                   TO PLAY", howToTitleStyle);
pressToStart.x = 134;
pressToStart.y = 405;
app.stage.addChild(pressToStart);

const spacebar: Sprite = Sprite.fromImage("./Space_Bar.png");
spacebar.scale.x = .9;
spacebar.scale.y = .9;
spacebar.x = 235;
spacebar.y = 388;
app.stage.addChild(spacebar);

window.addEventListener("keydown", (e: KeyboardEvent): void  => {
    console.log("To selection...");
    const START: number = 32;
    if (e.keyCode === START) {
    // Character Selection starts here!
    }
},                      false);
