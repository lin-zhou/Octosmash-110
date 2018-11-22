import {
    Sprite,
    Application,
    Graphics
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

import {
    startStyle,
    style,
    gameStyle,
    selectStyle,
    nameStyle,
    nextStyle,
    activeNextStyle,
    reselectStyle,
    activeReselectStyle
} from "./fonts-script";

// Note: How To Download Pixi.js (because sometimes it randomly doesn't work)
// npm install pixi.js
// npm install @types/pixi.js


/* NOTES
    - Attempted to make this object-oriented, had difficulty due to two separate applications
*/

/* MAJOR TO DOS
    - Add weapons and, you know, combat stuff
*/

/* TO FIX
    - Figure out how to get rid of the looper function while still looping
    - Movement issues:
        - Finicky places in the corners of the stage
        - Sometimes can't jump after walking off stage
        - Phase through the ground when holding down after jumping
        - Weird jump when holding "up" or "w" keys
            - Holding up shouldn't do anything different than just tapping it once
*/

/* OTHER THINGS TO DO IF TIME ALLOWS
    - Characters who look farther back should appear farther back
    - Color change for "next" and "play" buttons in character selection screen
    - Multiply lives + respawning
    - Sound effects!
*/

// SET UP - START MENU
const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);


// NUMBERS FOR MOTION
const acc: number = 0.05;
const speed: number = 1.5;

// For some reason, we can't loop without this. Maybe try to get rid of it somehow?
class Looper {
    sprite: Sprite;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

let loops: Looper[] = [];
for (let i: number = 1; i <= 4; i++) {
    let sprite: Sprite = Sprite.fromImage("nonexistent");
    let loop: Looper = new Looper(sprite);
    loops.push(loop);
}

// TWO PLAYER GAME
class Player {
    sprite: Sprite;
    vel: number = 0;
    jumpCount: number = 0;
}

let p1 = new Player();
let p2 = new Player();

// START SCREEN
let startScreen: Sprite = Sprite.fromImage("./Start_Screen.png");
startScreen.scale.x = 34 / 75;
startScreen.scale.y = 34 / 75;
app.stage.addChild(startScreen);

let startMessage = new PIXI.Text("START", startStyle);
startMessage.x = 460;
startMessage.y = 375;
app.stage.addChild(startMessage);

let choosing = false;

// CHARACTER SELECTION SCREEN
window.addEventListener("click", (e: MouseEvent): void  => {
    if (!choosing && e.x >= 455 && e.x <= 740 && e.y >= 385 && e.y <= 465) {
        console.log("Starting...");

        // GET RID OF START MENU COMPONENTS
        app.stage.removeChild(startMessage);
        app.stage.removeChild(startScreen);

        // These prevent certain codes from running more times than they're supposed to
        choosing = true;
        let p1choose: boolean = true;
        let p2choose: boolean = false;
        
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
                p1.sprite = ophelia1;
                p1.sprite.x = 210;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = cyrus1;
                p1.sprite.x = 225;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = tressa1;
                p1.sprite.x = 210;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = olberic1;
                p1.sprite.x = 225;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = primrose1;
                p1.sprite.x = 210;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = alfyn1;
                p1.sprite.x = 212;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = therion1;
                p1.sprite.x = 217;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                p1.sprite = hannit1;
                p1.sprite.x = 215;
                p1.sprite.y = 205;
                if (p1.sprite.scale.x >= 0) {
                    p1.sprite.scale.x *= -1;
                }

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
                play.x = 712;
                play.y = 421;
                app.stage.addChild(play);
        
                app.stage.addChild(reselect);
        
                let activePlay = new PIXI.Text("PLAY", activeNextStyle);
                activePlay.x = 712;
                activePlay.y = 421;

                // PLAYER TWO SELECTION
                window.addEventListener("click", (e: MouseEvent): void  => {
                    if (p2choose && canChoose && e.x >= 55 && e.x <= 145 && e.y >= 125 && e.y <= 402) {
                        console.log("P2 Chose Ophelia");
                        p2.sprite = ophelia2;
                        p2.sprite.x = 650;
                        p2.sprite.y = 205;

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
                        p2.sprite = cyrus2;
                        p2.sprite.x = 637;
                        p2.sprite.y = 205;

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
                        p2.sprite = tressa2;
                        p2.sprite.x = 655;
                        p2.sprite.y = 205;

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
                        p2.sprite = olberic2;
                        p2.sprite.x = 640;
                        p2.sprite.y = 205;

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
                        p2.sprite = primrose2;
                        p2.sprite.x = 655;
                        p2.sprite.y = 205;

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
                        p2.sprite = alfyn2;
                        p2.sprite.x = 652;
                        p2.sprite.y = 205;

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
                        p2.sprite = therion2;
                        p2.sprite.x = 648;
                        p2.sprite.y = 205;

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
                        p2.sprite = hannit2;
                        p2.sprite.x = 650;
                        p2.sprite.y = 205;

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

                        // BUILD IN-GAME COMPONENTS
                        let gameBG: Sprite = Sprite.fromImage("./Final_Destination_Stage.png");
                        gameBG.scale.x = .85;
                        gameBG.scale.y = .85;
                        app.stage.addChild(gameBG);

                        app.stage.addChild(p1.sprite);
                        app.stage.addChild(p2.sprite);

                        // p1.sprite MOVE CONTROLS
                        let A: number = 0;
                        let D: number = 0;
                        let S: number = 0;
                        let W: number = 0;

                        window.addEventListener("keydown", (e: KeyboardEvent): void  => {
                            console.log("key: " + e.keyCode);
                            const LEFT: number = 65;
                            const UP: number = 87;
                            const RIGHT: number = 68;
                            const DOWN: number = 83;
                            if (e.keyCode === LEFT) {
                                A = -1;
                                if (p1.sprite.scale.x < 0) {
                                    p1.sprite.scale.x *= -1;
                                    p1.sprite.x -= 65;
                                }
                            } else if (e.keyCode === UP) {
                                W = -1;
                                if (canJump(p1.sprite)) {
                                    p1.vel =  -3.5;
                                    p1.jumpCount++;
                                } else {
                                    p1.vel = 0;
                                }
                            } else if (e.keyCode === RIGHT) {
                                D = 1;
                                if (p1.sprite.scale.x >= 0 ) {
                                    p1.sprite.scale.x *= -1;
                                    p1.sprite.x += 65;
                                }
                            } else if (e.keyCode === DOWN) {
                                if (!grounded(p1.sprite)) {
                                    S = 1;
                                }
                            }
                        },                      false);

                        window.addEventListener("keyup", (e: KeyboardEvent): void  => {
                            console.log("key: " + e.keyCode);
                            const LEFT: number = 65;
                            const UP: number = 87;
                            const RIGHT: number = 68;
                            const DOWN: number = 83;
                            if (e.keyCode === LEFT) {
                                A = 0;
                            } else if (e.keyCode === UP) {
                                W = 0;
                            } else if (e.keyCode === RIGHT) {
                                D = 0;
                            } else if (e.keyCode === DOWN) {
                                S = 0;
                            }
                        },                      false);

                        // PLAYER TWO MOVE CONTROLS
                        let left: number = 0;
                        let right: number = 0;
                        let down: number = 0;
                        let up: number = 0;

                        window.addEventListener("keydown", (e: KeyboardEvent): void  => {
                            console.log("key: " + e.keyCode);
                            const LEFT: number = 37;
                            const UP: number = 38;
                            const RIGHT: number = 39;
                            const DOWN: number = 40;
                            if (e.keyCode === LEFT) {
                                left = -1;
                                if (p2.sprite.scale.x < 0) {
                                    p2.sprite.scale.x *= -1;
                                    p2.sprite.x -= 65;
                                }
                            } else if (e.keyCode === UP) {
                                up = -1;
                                if (canJump(p2.sprite)) {
                                    p2.vel =  -3.5;
                                    p2.jumpCount++;
                                } else {
                                    p2.vel = 0;
                                }
                            } else if (e.keyCode === RIGHT) {
                                right = 1;
                                if (p2.sprite.scale.x >= 0 ) {
                                    p2.sprite.scale.x *= -1;
                                    p2.sprite.x += 65;
                                }
                            } else if (e.keyCode === DOWN) {
                                if (!grounded(p2.sprite)) {
                                    down = 1;
                                }
                            }
                        },                      false);


                        window.addEventListener("keyup", (e: KeyboardEvent): void  => {
                            console.log("key: " + e.keyCode);
                            const LEFT: number = 37;
                            const UP: number = 38;
                            const RIGHT: number = 39;
                            const DOWN: number = 40;
                            if (e.keyCode === LEFT) {
                                left = 0;
                            } else if (e.keyCode === UP) {
                                up = 0;
                            } else if (e.keyCode === RIGHT) {
                                right = 0;
                            } else if (e.keyCode === DOWN) {
                                down = 0;
                            }
                        },                      false);

                        // HELPER FUNCTIONS
                        let isOutOfBounds = (unit: Sprite): boolean => {
                            return unit.x <= -100 || unit.x >= 970 || unit.y <= -100 || unit.y >= 590;
                        };

                        let facingLeft = (unit: Sprite) => unit.scale.x >= 0;
                        let facingRight = (unit: Sprite) => unit.scale.x < 0;

                        let groundedLeftward = (unit: Sprite) => (facingLeft(unit) && (unit.y >= 205 && unit.y <= 207 && (unit.x < 718 && unit.x > 62)));
                        let groundedRightward = (unit: Sprite) => (facingRight(unit) && (unit.y >= 205 && unit.y <= 207 && (unit.x < 788 && unit.x > 135)));
                        let grounded = (unit: Sprite) => (groundedLeftward(unit) || groundedRightward(unit));

                        let underStageLeftWard = (unit: Sprite) => (facingLeft(unit) && (unit.y >= 208 && unit.y <= 295) && (unit.x < 718 && unit.x > 62));
                        let underStageRightWard = (unit: Sprite) => (facingRight(unit) && (unit.y >= 208 && unit.y <= 295) && (unit.x < 788 && unit.x > 135));
                        let underStage = (unit: Sprite) => (underStageLeftWard(unit) || underStageRightWard(unit));

                        let offSides = (unit: Sprite) => ((facingLeft(unit) && (unit.x >= 718 || unit.x <= 62)) || (facingRight(unit) && (unit.x <= 135 || unit.x >= 788)));

                        let canJump = (unit: Sprite): boolean => {
                            if (grounded(unit)) {
                                if (unit === p1.sprite) {
                                    p1.jumpCount = 0;
                                    return true;
                                } else if (unit === p2.sprite) {
                                    p2.jumpCount = 0;
                                    return true;
                                }
                            } else if (unit === p1.sprite) {
                                if (p1.jumpCount < 2) {
                                    return true;
                                }
                            } else if (unit === p2.sprite) {
                                if (p2.jumpCount < 2) {
                                    return true;
                                }
                            }
                            return false;
                        };

                        // GENERAL RESET FUNCTIONS
                        let resetY = (unit: Sprite): void => {
                            unit.y = 205;
                        };

                        let resetLowY = (unit: Sprite): void => {
                            unit.y = 295;
                        };

                        let leftResetLeft = (unit: Sprite): void => {
                            unit.x = 62;
                        };
                        let leftResetRight = (unit: Sprite): void => {
                            unit.x = 718;
                        };
                        let rightResetLeft = (unit: Sprite): void => {
                            unit.x = 135;
                        };
                        let rightResetRight = (unit: Sprite): void => {
                            unit.x = 788;
                        };

                        // END GAME + TEXT
                        let gameOver: boolean = false;
                        let winner: Sprite;
                        let winnerExists: boolean = false;

                        let game = new PIXI.Text("GAME!", gameStyle);

                        let handleWin = (gameMessage: PIXI.Text, message: PIXI.Text): void => {
                            gameMessage.x = 305;
                            gameMessage.y = 180;
                            message.x = 292;
                            message.y = 280;
                            app.stage.addChild(gameMessage);
                            app.stage.addChild(message);
                        };

                        // RUN GAME
                        app.ticker.add((delta: number): void => {
                            for (let i: number = 0; i < loops.length; i++) {
                                
                                // END GAME TEST
                                if (isOutOfBounds(p1.sprite) || isOutOfBounds(p2.sprite)) {
                                    gameOver = true;
                                }

                                if (gameOver) {
                                    if (isOutOfBounds(p1.sprite)) {
                                        winner = p2.sprite;
                                    } else if (isOutOfBounds(p2.sprite)) {
                                        winner = p1.sprite;
                                    }
                                    if (winner === p2.sprite && !winnerExists) {
                                        let message = new PIXI.Text("Player Two Wins.", style);
                                        handleWin(game, message);
                                        winnerExists = true;
                                    } else if (winner === p1.sprite && !winnerExists) {
                                        let message = new PIXI.Text("Player One Wins.", style);
                                        handleWin(game, message);
                                        winnerExists = true;
                                    }
                                }
                                
                                // PLAYER ONE MOVING
                                p1.sprite.x += (A + D) * speed;
                                p1.sprite.y += (S) * speed;
                                if (p1.vel < 1) {
                                    p1.vel += acc;
                                } else if (grounded(p1.sprite)) {
                                    p1.vel = 0;
                                    resetY(p1.sprite);
                                } else if (underStage(p1.sprite)) {
                                    p1.vel = 0;
                                    resetLowY(p1.sprite);
                                } else if (underStage(p1.sprite)) {
                                    p1.vel = 0;
                                    resetLowY(p1.sprite);
                                } else {
                                    p1.vel = 1;
                                }
                                p1.sprite.y += p1.vel;

                                // PLAYER TWO MOVING
                                p2.sprite.x += (left + right) * speed;
                                p2.sprite.y += (down) * speed;
                                if (p2.vel < 1) {
                                    p2.vel += acc;
                                } else if (grounded(p2.sprite)) {
                                    p2.vel = 0;
                                    resetY(p2.sprite);
                                } else if (underStage(p2.sprite)) {
                                    p2.vel = 0;
                                    resetLowY(p2.sprite);
                                } else if (underStage(p2.sprite)) {
                                    p2.vel = 0;
                                    resetLowY(p2.sprite);
                                } else {
                                    p2.vel = 1;
                                }
                                p2.sprite.y = p2.sprite.y + p2.vel;

                                // PLAYER ONE RESTRAINTS
                                if (grounded(p1.sprite)) {
                                    resetY(p1.sprite);
                                }
                                if (underStage(p1.sprite)) {
                                    resetLowY(p1.sprite);
                                }
                                if (offSides(p1.sprite)) {
                                    p1.sprite.y += .5;
                                }

                                if (facingLeft(p1.sprite)) {
                                    if (p1.sprite.y <= 205 && (p1.sprite.x < 718 && p1.sprite.x > 62)) {
                                        p1.sprite.y += .5;
                                    }
                                    if (p1.sprite.y > 207 && (p1.sprite.x < 718 && p1.sprite.x > 62)) {
                                        p1.sprite.y += .5;
                                    }
                                    if ((p1.sprite.y <= 292 && p1.sprite.y > 207) && (p1.sprite.x > 62 && p1.sprite.x <= 64)) {
                                        leftResetLeft(p1.sprite);
                                    }
                                    if ((p1.sprite.y <= 292 && p1.sprite.y > 207) && (p1.sprite.x < 718 && p1.sprite.x >= 716)) {
                                        leftResetRight(p1.sprite);
                                    }
                                } else {
                                    if (p1.sprite.y <= 205 && (p1.sprite.x < 788 && p1.sprite.x > 135)) {
                                        p1.sprite.y += .5;
                                    }
                                    if (p1.sprite.y > 207 && (p1.sprite.x < 788 && p1.sprite.x > 135)) {
                                        p1.sprite.y += .5;
                                    }
                                    if ((p1.sprite.y <= 292 && p1.sprite.y > 207) && (p1.sprite.x > 135 && p1.sprite.x <= 137)) {
                                        rightResetLeft(p1.sprite);
                                    }
                                    if ((p1.sprite.y <= 292 && p1.sprite.y > 207) && (p1.sprite.x < 788 && p1.sprite.x >= 786)) {
                                        rightResetRight(p1.sprite);
                                    }
                                }

                                // PLAYER TWO RESTRAINTS
                                if (grounded(p2.sprite)) {
                                    resetY(p2.sprite);
                                }
                                if (underStage(p2.sprite)) {
                                    resetLowY(p2.sprite);
                                }
                                if (offSides(p2.sprite)) {
                                    p2.sprite.y += .5;
                                }
                                
                                if (facingLeft(p2.sprite)) {
                                    if (p2.sprite.y <= 205 && (p2.sprite.x < 718 && p2.sprite.x > 62)) {
                                        p2.sprite.y += .5;
                                    }
                                    if (p2.sprite.y > 207 && (p2.sprite.x < 718 && p2.sprite.x > 62)) {
                                        p2.sprite.y += .5;
                                    }
                                    if ((p2.sprite.y >= 207 && p2.sprite.y <= 292) && (p2.sprite.x > 62 && p2.sprite.x <= 64)) {
                                        leftResetLeft(p2.sprite);
                                    }
                                    if ((p2.sprite.y >= 207 && p2.sprite.y <= 292) && (p2.sprite.x < 718 && p2.sprite.x >= 716)) {
                                        leftResetRight(p2.sprite);
                                    }
                                } else {
                                    if (p2.sprite.y <= 205 && (p2.sprite.x < 788 && p2.sprite.x > 135)) {
                                        p2.sprite.y += .5;
                                    }
                                    if (p2.sprite.y > 207 && (p2.sprite.x < 788 && p2.sprite.x > 135)) {
                                        p2.sprite.y += .5;
                                    }
                                    if ((p2.sprite.y <= 292 && p2.sprite.y >= 207) && (p2.sprite.x > 135 && p2.sprite.x <= 137)) {
                                        rightResetLeft(p2.sprite);
                                    }
                                    if ((p2.sprite.y <= 292 && p2.sprite.y >= 207) && (p2.sprite.x < 788 && p2.sprite.x >= 786)) {
                                        rightResetRight(p2.sprite);
                                    }
                                }
                            }   
                        }
                        );

                }
                },                      false);

            }
        },                      false);
    }
},                      false);
