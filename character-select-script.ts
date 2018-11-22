// WIP - Character Selection Screen; will go between start screen and game

import {
    Sprite,
    Application,
    Graphics
} from "pixi.js";

import {
    selectStyle
} from "./fonts-script";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

let selectScreen: Sprite = Sprite.fromImage("./Character_Select.png");
selectScreen.scale.x = 34 / 75;
selectScreen.scale.y = 34 / 75;
app.stage.addChild(selectScreen);

// PLEASE FIX FONT STYLE LATER

let choose = new PIXI.Text("Player 1: Choose Your Character", selectStyle);
choose.x = 265;
choose.y = 440;
app.stage.addChild(choose);

// let showBox: Graphics = new Graphics();
// showBox.beginFill(0xffffff, 0.5);
// showBox.drawRect(0, 0, 90, 277);
// showBox.x = 246;
// showBox.y = 125;
// app.stage.addChild(showBox);

let testOphelia = new PIXI.Text("OPHELIA", selectStyle);
let testCyrus = new PIXI.Text("CYRUS", selectStyle);
let testTressa = new PIXI.Text("TRESSA", selectStyle);
let testOlberic = new PIXI.Text("OLBERIC", selectStyle);
let testPrimrose = new PIXI.Text("PRIMROSE", selectStyle);
let testAlfyn = new PIXI.Text("ALFYN", selectStyle);
let testTherion = new PIXI.Text("THERION", selectStyle);
let testHannit = new PIXI.Text("HANNIT", selectStyle);

let canChoose = true;

window.addEventListener("click", (e: MouseEvent): void  => {
    if (canChoose && e.x >= 50 && e.x <= 140 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Ophelia");
        app.stage.addChild(testOphelia);
        canChoose = false;
    }
    if (canChoose && e.x >= 148 && e.x <= 238 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Cyrus");
        app.stage.addChild(testCyrus);
        canChoose = false;
    }
    if (canChoose && e.x >= 246 && e.x <= 336 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Tressa");
        app.stage.addChild(testTressa);
        canChoose = false;
    }
    if (canChoose && e.x >= 344 && e.x <= 434 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Olberic");
        app.stage.addChild(testOlberic);
        canChoose = false;
    }
},                      false);

// Note: Be able to change characters after selecting & click next to choose player 2
