import {
    Sprite,
    Application,
    Graphics
} from "pixi.js";

import {
    selectStyle,
    nextStyle,
    reselectStyle,
    nameStyle
} from "./fonts-script";
import { test } from "../ps04-list-utils/test-util";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

let selectScreen: Sprite = Sprite.fromImage("./Character_Select.png");
selectScreen.scale.x = 34 / 75;
selectScreen.scale.y = 34 / 75;
app.stage.addChild(selectScreen);

let opheliaName = new PIXI.Text("OPHELIA", nameStyle);
opheliaName.x = 65;
opheliaName.y = 105;
app.stage.addChild(opheliaName);

let cyrusName = new PIXI.Text("CYRUS", nameStyle);
cyrusName.x = 168;
cyrusName.y = 105;
app.stage.addChild(cyrusName);

let tressaName = new PIXI.Text("TRESSA", nameStyle);
tressaName.x = 263;
tressaName.y = 105;
app.stage.addChild(tressaName);

let olbericName = new PIXI.Text("OLBERIC", nameStyle);
olbericName.x = 354;
olbericName.y = 105;
app.stage.addChild(olbericName);

let primroseName = new PIXI.Text("PRIMROSE", nameStyle);
primroseName.x = 446;
primroseName.y = 105;
app.stage.addChild(primroseName);

let alfynName = new PIXI.Text("ALFYN", nameStyle);
alfynName.x = 555;
alfynName.y = 105;
app.stage.addChild(alfynName);

let therionName = new PIXI.Text("THERION", nameStyle);
therionName.x = 646;
therionName.y = 105;
app.stage.addChild(therionName);

let hannitName = new PIXI.Text("HANNIT", nameStyle);
hannitName.x = 745;
hannitName.y = 105;
app.stage.addChild(hannitName);

let nextBox: Graphics = new Graphics;
nextBox.beginFill(0x6f6f6f, 0.6);
nextBox.drawRect(0, 0, 120, 45);
nextBox.x = 700;
nextBox.y = 420;
app.stage.addChild(nextBox);

let reselectBox: Graphics = new Graphics;
reselectBox.beginFill(0x6f6f6f, 0.6);
reselectBox.drawRect(0, 0, 170, 45);
reselectBox.x = 50;
reselectBox.y = 420;
app.stage.addChild(reselectBox);

let next = new PIXI.Text("NEXT", nextStyle);
next.x = 708;
next.y = 421;
app.stage.addChild(next);

let reselect = new PIXI.Text("RESELECT", reselectStyle);
reselect.x = 53;
reselect.y = 424;
app.stage.addChild(reselect);

let choose1 = new PIXI.Text("Player One: Choose Your Character", selectStyle);
choose1.x = 270;
choose1.y = 430;
app.stage.addChild(choose1);

let testOphelia = new PIXI.Text("OPHELIA", selectStyle);
let testCyrus = new PIXI.Text("CYRUS", selectStyle);
let testTressa = new PIXI.Text("TRESSA", selectStyle);
let testOlberic = new PIXI.Text("OLBERIC", selectStyle);
let testPrimrose = new PIXI.Text("PRIMROSE", selectStyle);
let testAlfyn = new PIXI.Text("ALFYN", selectStyle);
let testTherion = new PIXI.Text("THERION", selectStyle);
let testHannit = new PIXI.Text("HANNIT", selectStyle);

let canChoose = true;
let hasChosen = false;

window.addEventListener("click", (e: MouseEvent): void  => {
    if (canChoose && e.x >= 55 && e.x <= 145 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Ophelia");
        app.stage.addChild(testOphelia);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 153 && e.x <= 246 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Cyrus");
        app.stage.addChild(testCyrus);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 252 && e.x <= 342 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Tressa");
        app.stage.addChild(testTressa);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 349 && e.x <= 438 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Olberic");
        app.stage.addChild(testOlberic);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 446 && e.x <= 536 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Primrose");
        app.stage.addChild(testPrimrose);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 544 && e.x <= 634 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Alfyn");
        app.stage.addChild(testAlfyn);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 642 && e.x <= 732 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Therion");
        app.stage.addChild(testTherion);
        canChoose = false;
        hasChosen = true;
    }
    if (canChoose && e.x >= 738 && e.x <= 828 && e.y >= 125 && e.y <= 402) {
        console.log("Chose Hannit");
        app.stage.addChild(testHannit);
        canChoose = false;
        hasChosen = true;
    }
    if (hasChosen && e.x >= 50 && e.x <= 220 && e.y >= 420 && e.y <= 465) {
        canChoose = true;
        hasChosen = false;
    }
    if (hasChosen && e.x >= 700 && e.x <= 820 && e.y >= 420 && e.y <= 465) {
        canChoose = true;
        hasChosen = false;

        app.stage.removeChild(choose1);
        let choose2 = new PIXI.Text("Player Two: Choose Your Character", selectStyle);
        choose2.x = 270;
        choose2.y = 430;

        app.stage.addChild(choose2);

        app.stage.removeChild(nextBox);
        app.stage.removeChild(next);

        let playBox: Graphics = new Graphics();
        playBox.beginFill(0x6f6f6f, 0.6);
        playBox.drawRect(0, 0, 120, 45);
        playBox.x = 700;
        playBox.y = 420;
        app.stage.addChild(playBox);

        let play = new PIXI.Text("PLAY", nextStyle);
        play.x = 710;
        play.y = 431;
        app.stage.addChild(play);


        window.addEventListener("click", (e: MouseEvent): void  => {
            if (canChoose && e.x >= 55 && e.x <= 145 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Ophelia");
                app.stage.addChild(testOphelia);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 153 && e.x <= 246 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Cyrus");
                app.stage.addChild(testCyrus);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 252 && e.x <= 342 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Tressa");
                app.stage.addChild(testTressa);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 349 && e.x <= 438 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Olberic");
                app.stage.addChild(testOlberic);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 446 && e.x <= 536 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Primrose");
                app.stage.addChild(testPrimrose);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 544 && e.x <= 634 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Alfyn");
                app.stage.addChild(testAlfyn);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 642 && e.x <= 732 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Therion");
                app.stage.addChild(testTherion);
                canChoose = false;
                hasChosen = true;
            }
            if (canChoose && e.x >= 738 && e.x <= 828 && e.y >= 125 && e.y <= 402) {
                console.log("Chose Hannit");
                app.stage.addChild(testHannit);
                canChoose = false;
                hasChosen = true;
            }
            if (hasChosen && e.x >= 50 && e.x <= 220 && e.y >= 420 && e.y <= 465) {
                canChoose = true;
                hasChosen = false;
            }
        },                      false);
    }
},                      false);
