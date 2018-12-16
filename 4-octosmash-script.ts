import {
    Sprite,
    Application,
    Graphics,
    DisplayObject,
    Rectangle
} from "pixi.js";

import {
    alfyn1,
    alfyn2,
    cyrus1,
    cyrus2,
    hannit1,
    hannit2,
    olberic1,
    olberic2,
    ophelia1,
    ophelia2,
    primrose1,
    primrose2,
    therion1,
    therion2,
    tressa1,
    tressa2
} from "./characters-script";

import { Player, p1, p2 } from "./player-script";

import { Magic } from "./magic-script";

import {
    startStyle,
    style,
    gameTextStyle,
    howToTitleStyle,
    howToSubStyle,
    howToStyle,
    selectStyle,
    nameStyle,
    nextStyle,
    activeNextStyle,
    reselectStyle,
    activeReselectStyle,
    playAgainStyle,
    damageStyle,
    playerDamageStyle
} from "./fonts-script";

import {
    Looper,
    Game
} from "./game-script";


// Note: How To Download Pixi.js (in case you need to reinstall after pulling for COMP class)
// npm install pixi.js
// npm install @types/pixi.js

/* TO FIX
    - Only one player can shoot at a time
        - Not as big of a problem now that players can't hold to shoot
    - Finicky places in the corners of the stage
    - Sometimes can't jump after walking off stage
    - Game gets slower with every ENTER reset
        - Remove all old objects
    - Sometimes moves super fast after shielding or sidestepping
*/

/* OTHER THINGS TO DO IF TIME ALLOWS
    - Different colored magic blast sprites either between p1 and p2 or for each character
    - Multiple lives + respawning
    - Sound effects!
    - Shielding System
        - Shield can only take x number of hits
            - Cooldown = x number of hits must be taken by the player maybe
        - Maybe make shield a property in player class
    - Healing items/other item spawns
    - Nicer title screen
    - Make the "press ENTER" text less ugly
    - Characters who look farther back should appear farther back
        - Low priority
        - Idea
            - howForward property in player class
            - If statements that assign a value (0-7) for howForward based on what sprite the player has
                - Can do this during character selection
                - Higher degree of forwardness = more front-appearing
            - If (p1.degreeOfForwardness < p2.degreeOfForwardness), render p1's sprite before p2's
        - Just for appearance reasons
*/

// SET UP - START MENU
const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

// LOOPS IN THE TICKER
let loops: Looper[] = [];
for (let i: number = 1; i <= 4; i++) {
    let sprite: Sprite = Sprite.fromImage("nonexistent");
    let loop: Looper = new Looper(sprite);
    loops.push(loop);
}

let magicArr: Magic[] = [];
let magicArrTwo: Magic[] = [];

// DAMAGE DISPLAY
let damageToString = (player: Player): string => player.damage + "";

let p1DamageDisplay = new PIXI.Text(damageToString(p1), damageStyle);
p1DamageDisplay.x = 300;
p1DamageDisplay.y = 440;

let p2DamageDisplay = new PIXI.Text(damageToString(p2), damageStyle);
p2DamageDisplay.x = 650;
p2DamageDisplay.y = 440;

let p1Name = new PIXI.Text("Player One", playerDamageStyle);
p1Name.x = 185;
p1Name.y = 447;
let p2Name = new PIXI.Text("Player Two", playerDamageStyle);
p2Name.x = 535;
p2Name.y = 447;

// START SCREEN
let startScreen: Sprite = Sprite.fromImage("./Start_Screen.png");
startScreen.scale.x = 34 / 75;
startScreen.scale.y = 34 / 75;
app.stage.addChild(startScreen);

let startMessage = new PIXI.Text("START", startStyle);
startMessage.x = 460;
startMessage.y = 375;
app.stage.addChild(startMessage);

// LIMIT EVENT LISTENERS
let onHowTo = false;
let choosing = false;
let isPlaying = false;

// HOW TO PLAY SCREEN
window.addEventListener("click", (e: MouseEvent): void  => {
    if (!onHowTo && e.x >= 455 && e.x <= 740 && e.y >= 385 && e.y <= 465) {
        console.log("Starting...");
        onHowTo = true;

        // GET RID OF START MENU COMPONENTS
        app.stage.removeChild(startMessage);
        app.stage.removeChild(startScreen);

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
            if (!choosing && e.keyCode === START) {

                // These prevent certain codes from running more times than they're supposed to
                choosing = true;
                let p1choose: boolean = true;
                let p2choose: boolean = false;

                // GET RID OF HOW TO COMPONENTS
                app.stage.removeChild(spacebar);
                app.stage.removeChild(pressToStart);
                app.stage.removeChild(explanation1);
                app.stage.removeChild(explanation0);
                app.stage.removeChild(p2Sidestep);
                app.stage.removeChild(comma);
                app.stage.removeChild(p1Sidestep);
                app.stage.removeChild(r);
                app.stage.removeChild(p2Attack);
                app.stage.removeChild(slash);
                app.stage.removeChild(p1Attack);
                app.stage.removeChild(threeKey);
                app.stage.removeChild(p2Move);
                app.stage.removeChild(arrowKeys);
                app.stage.removeChild(p1Move);
                app.stage.removeChild(WASD);
                app.stage.removeChild(howTo);
                app.stage.removeChild(black);
                app.stage.removeChild(htBG);
                // Not really necessary but seems to run slightly faster after removing? Might just be my imagination.
                // Could also remove selection screen components after game starts, but there are a lot more things to remove there
                
                // SELECTION SCREEN SETUP
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
                
                let hannitName = new PIXI.Text("H'ANNIT", nameStyle);
                hannitName.x = 743;
                hannitName.y = 105;
                app.stage.addChild(hannitName);

                let choose1 = new PIXI.Text("Player One: Choose Your Character", selectStyle);
                choose1.x = 270;
                choose1.y = 430;
                app.stage.addChild(choose1);
                
                // "BUTTONS"
                let nextBox: Graphics = new Graphics;
                nextBox.beginFill(0x6f6f6f, 0.6);
                nextBox.drawRect(0, 0, 120, 45);
                nextBox.x = 701;
                nextBox.y = 420;
                app.stage.addChild(nextBox);
                
                let reselectBox: Graphics = new Graphics;
                reselectBox.beginFill(0x6f6f6f, 0.6);
                reselectBox.drawRect(0, 0, 170, 45);
                reselectBox.x = 50;
                reselectBox.y = 420;
                app.stage.addChild(reselectBox);

                // "Active" texts are used when a character has been chosen; just for effect       
                let next = new PIXI.Text("NEXT", nextStyle);
                next.x = 712;
                next.y = 421;
                app.stage.addChild(next);
                
                let activeNext = new PIXI.Text("NEXT", activeNextStyle);
                activeNext.x = 712;
                activeNext.y = 421;
                
                let reselect = new PIXI.Text("RESELECT", reselectStyle);
                reselect.x = 59;
                reselect.y = 424;
                app.stage.addChild(reselect);
                
                let activeReselect = new PIXI.Text("RESELECT", activeReselectStyle);
                activeReselect.x = 59;
                activeReselect.y = 424;
                
                let canChoose = true;
                let hasChosen = false;
                
                let blockBox: Graphics = new Graphics();
                
                // PLAYER ONE SELECTION
                window.addEventListener("click", (e: MouseEvent): void  => {
                    if (p1choose && canChoose && e.x >= 55 && e.x <= 145 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Ophelia");
                        p1.select(ophelia1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 90, 277);
                        blockBox.x = 50,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);
                
                        canChoose = false;
                        hasChosen = true;
                
                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 153 && e.x <= 246 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Cyrus");
                        p1.select(cyrus1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 90, 277);
                        blockBox.x = 148,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 252 && e.x <= 342 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Tressa");
                        p1.select(tressa1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 91, 277);
                        blockBox.x = 245,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 349 && e.x <= 438 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Olberic");
                        p1.select(olberic1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 90, 277);
                        blockBox.x = 342,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 446 && e.x <= 536 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Primrose");
                        p1.select(primrose1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 91, 277);
                        blockBox.x = 439,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 544 && e.x <= 634 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Alfyn");
                        p1.select(alfyn1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 91, 277);
                        blockBox.x = 536,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 642 && e.x <= 732 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Therion");
                        p1.select(therion1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 91, 277);
                        blockBox.x = 633,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && canChoose && e.x >= 738 && e.x <= 828 && e.y >= 125 && e.y <= 402) {
                        console.log("P1 Chose Hannit");
                        p1.select(hannit1);

                        blockBox = new Graphics();
                        blockBox.beginFill(0xffffff, 0.5);
                        blockBox.drawRect(0, 0, 90, 277);
                        blockBox.x = 731,
                        blockBox.y = 125;
                        app.stage.addChild(blockBox);

                        canChoose = false;
                        hasChosen = true;

                        app.stage.removeChild(reselect);
                        app.stage.removeChild(next);
                        app.stage.addChild(activeNext);
                        app.stage.addChild(activeReselect);
                    }
                    if (p1choose && hasChosen && e.x >= 50 && e.x <= 220 && e.y >= 420 && e.y <= 465) {
                        console.log("P1 Unselected");
                        canChoose = true;
                        hasChosen = false;
                
                        app.stage.removeChild(blockBox);
                        app.stage.removeChild(activeReselect);
                        app.stage.removeChild(activeNext);
                        app.stage.addChild(reselect);
                        app.stage.addChild(next);
                    }
                    // "NEXT" --> PLAYER TWO'S SELECTION
                    if (p1choose && hasChosen && e.x >= 701 && e.x <= 827 && e.y >= 428 && e.y <= 473) {
                        console.log("P2's Turn");
                        p1choose = false;
                        p2choose = true;

                        canChoose = true;
                        hasChosen = false;

                        app.stage.removeChild(blockBox);
                        app.stage.removeChild(activeReselect);
                        app.stage.removeChild(activeNext);
                        app.stage.removeChild(choose1);
                
                        let choose2 = new PIXI.Text("Player Two: Choose Your Character", selectStyle);
                        choose2.x = 270;
                        choose2.y = 430;
                        app.stage.addChild(choose2);
                
                        let playBox: Graphics = new Graphics();
                        playBox.beginFill(0x6f6f6f, 0.6);
                        playBox.drawRect(0, 0, 120, 45);
                        playBox.x = 701;
                        playBox.y = 420;
                        app.stage.addChild(playBox);
                
                        let play = new PIXI.Text("PLAY", nextStyle);
                        play.x = 714;
                        play.y = 421;
                        app.stage.addChild(play);
                
                        app.stage.addChild(reselect);
                
                        let activePlay = new PIXI.Text("PLAY", activeNextStyle);
                        activePlay.x = 714;
                        activePlay.y = 421;

                        // PLAYER TWO SELECTION
                        window.addEventListener("click", (e: MouseEvent): void  => {
                            if (p2choose && canChoose && e.x >= 55 && e.x <= 145 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Ophelia");
                                p2.select(ophelia2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 90, 277);
                                blockBox.x = 50,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 153 && e.x <= 246 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Cyrus");
                                p2.select(cyrus2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 90, 277);
                                blockBox.x = 148,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 252 && e.x <= 342 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Tressa");
                                p2.select(tressa2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 91, 277);
                                blockBox.x = 245,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 349 && e.x <= 438 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Olberic");
                                p2.select(olberic2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 90, 277);
                                blockBox.x = 342,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 446 && e.x <= 536 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Primrose");
                                p2.select(primrose2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 91, 277);
                                blockBox.x = 439,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 544 && e.x <= 634 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Alfyn");
                                p2.select(alfyn2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 91, 277);
                                blockBox.x = 536,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 642 && e.x <= 732 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Therion");
                                p2.select(therion2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 91, 277);
                                blockBox.x = 633,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && canChoose && e.x >= 738 && e.x <= 828 && e.y >= 125 && e.y <= 402) {
                                console.log("P2 Chose Hannit");
                                p2.select(hannit2);

                                blockBox = new Graphics();
                                blockBox.beginFill(0xffffff, 0.5);
                                blockBox.drawRect(0, 0, 90, 277);
                                blockBox.x = 731,
                                blockBox.y = 125;
                                app.stage.addChild(blockBox);

                                canChoose = false;
                                hasChosen = true;

                                app.stage.removeChild(reselect);
                                app.stage.removeChild(play);
                                app.stage.addChild(activePlay);
                                app.stage.addChild(activeReselect);
                            }
                            if (p2choose && hasChosen && e.x >= 50 && e.x <= 220 && e.y >= 420 && e.y <= 465) {
                                console.log("P2 Unselected");
                                canChoose = true;
                                hasChosen = false;
                                app.stage.removeChild(blockBox);
                                app.stage.removeChild(activeReselect);
                                app.stage.removeChild(activePlay);
                                app.stage.addChild(play);
                                app.stage.addChild(reselect);
                            }
                            // "PLAY" --> START GAME
                            if (p2choose && hasChosen && e.x >= 701 && e.x <= 827 && e.y >= 428 && e.y <= 473) {
                                console.log("Game Starting");

                                isPlaying = true;

                                let game = new Game(app, p1, p2, magicArr, magicArrTwo, loops);
                                game.runGame();

                            }
                        },                      false);

                    }
                },                      false);
            }
        },                      false);
    }
},                      false);
