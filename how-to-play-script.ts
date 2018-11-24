import { 
    Application,
    Sprite,
    Graphics
    } from "pixi.js"; 

import {
    howToTitleStyle,
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
howTo.x = 310;
howTo.y = 25;
app.stage.addChild(howTo);

const WASD: Sprite = Sprite.fromImage("./WASD.png");
WASD.scale.x = .1;
WASD.scale.y = .1;
WASD.x = 22;
WASD.y = 110;
app.stage.addChild(WASD);

const p1Move = new PIXI.Text("Player One moves with WASD.", howToStyle);
p1Move.x = 110;
p1Move.y = 115;
app.stage.addChild(p1Move);

const arrowKeys: Sprite = Sprite.fromImage("./Arrow_Keys.png");
arrowKeys.scale.x = .3;
arrowKeys.scale.y = .3;
arrowKeys.x = 450;
arrowKeys.y = 112;
app.stage.addChild(arrowKeys);

const p2Move = new PIXI.Text("Player Two moves with arrow keys.", howToStyle);
p2Move.x = 525;
p2Move.y = 115;
app.stage.addChild(p2Move);

const threeKey: Sprite = Sprite.fromImage("./3_Key.png");
threeKey.x = 37;
threeKey.y = 200;
app.stage.addChild(threeKey);

const p1Attack = new PIXI.Text("Player One attacks using the 3 key.", howToStyle);
p1Attack.x = 76;
p1Attack.y = 205;
app.stage.addChild(p1Attack);

const backslash: Sprite = Sprite.fromImage("./Backslash_Key.png");
backslash.scale.x = .19;
backslash.scale.y = .19;
backslash.x = 450;
backslash.y = 197;
app.stage.addChild(backslash);

const p2Attack = new PIXI.Text("Player Two attacks with the backslash key.", howToStyle);
p2Attack.x = 495;
p2Attack.y = 205;
app.stage.addChild(p2Attack);

const explanation0 = new PIXI.Text("Each player can only have four attacks on screen at once.", howToStyle);
explanation0.x = 200;
explanation0.y = 285;
app.stage.addChild(explanation0);

const explanation1 = new PIXI.Text("Knock your opponent off the screen to win.", howToStyle);
explanation1.x = 252;
explanation1.y = 312;
app.stage.addChild(explanation1);

const pressToStart = new PIXI.Text("PRESS                                                   TO PLAY", howToTitleStyle);
pressToStart.x = 134;
pressToStart.y = 390;
app.stage.addChild(pressToStart);

const spacebar: Sprite = Sprite.fromImage("./Space_Bar.png");
spacebar.scale.x = .9;
spacebar.scale.y = .9;
spacebar.x = 235;
spacebar.y = 373;
app.stage.addChild(spacebar);

window.addEventListener("keydown", (e: KeyboardEvent): void  => {
    console.log("To selection...");
    const START: number = 32;
    if (e.keyCode === START) {
    // Character Selection starts here!
    }
},                      false);
