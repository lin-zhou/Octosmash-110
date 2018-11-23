import {
    Sprite,
    Application,
    Rectangle,
    DisplayObject
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
    style,
    gameStyle
} from "./fonts-script";
let orientation = 1;

// Note: How To Download Pixi.js (because sometimes it randomly doesn't work)
// npm install pixi.js
// npm install @types/pixi.js

/* TO FIX
    - Figure out how to get rid of the looper function while still looping
    - Movement issues:
        - Finicky places in the corners of the stage
        - Sometimes can't jump after walking off stage
        - Weird jump when holding "up" or "w" keys
            - Holding up shouldn't do anything different than just tapping it once
*/

/* OTHER THINGS TO DO IF TIME ALLOWS
    - Characters who look farther back should appear farther back
    - Multiply lives + respawning
    - Sound effects!
*/

// SET UP
const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

// BUILD IN-GAME COMPONENTS
let gameBG: Sprite = Sprite.fromImage("./Final_Destination_Stage.png");
gameBG.scale.x = .85;
gameBG.scale.y = .85;
app.stage.addChild(gameBG);

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

// MAGIC
class Magic {
    sprite: Sprite;
    x: number = 0;
    y: number = 0;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
    getPoint(unitX: number, unitY: number): void {
        this.sprite.x += unitX;
        this.sprite.y += unitY;
    }
}

let magic = new Magic(Sprite.fromImage("./Magic_Blast.png"));
let magicArr: Magic[] = [];

// TWO PLAYER GAME
class Player {
    sprite: Sprite;
    vel: number = 0;
    jumpCount: number = 0;
}

let p1 = new Player();
p1.sprite = cyrus1;
p1.sprite.x = 225;
p1.sprite.y = 205;
p1.sprite.scale.x *= -1;
app.stage.addChild(p1.sprite);

let p2 = new Player();
p2.sprite = hannit1;
p2.sprite.x = 640;
p2.sprite.y = 205;
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
    const ATTACK: number = 51;
   
    if (e.keyCode === LEFT) {
        A = -1;
        if (p1.sprite.scale.x < 0) {
            p1.sprite.scale.x *= -1;
            p1.sprite.x -= 65;
            orientation = 1;
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
            orientation = -1;
        }
    } else if (e.keyCode === DOWN) {
        if (!grounded(p1.sprite)) {
            S = 1;
        }          
    } else if (e.keyCode === ATTACK) {
        if (magicArr.length < 3) {
            let sprite: Sprite = Sprite.fromImage("./Magic_Blast.png");
            let magic: Magic = new Magic(sprite);
            magic.getPoint(p1.sprite.x, p1.sprite.y + 20);
            if (facingLeft(p1.sprite)) {
                magic.direction = -1;
            } else {
                magic.direction = 1;
            }
            magicArr.push(magic);
            app.stage.addChild(magic.sprite);
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
let isOutOfBounds = (sprite: Sprite): boolean => {
    return sprite.x <= -100 || sprite.x >= 970 || sprite.y <= -100 || sprite.y >= 590;
};

let isOffScreen = (sprite: Sprite): boolean => {
    return sprite.x <= -40 || sprite.x >= 1024 * .85 || sprite.y <= 0 || sprite.y >= 576 * .85;
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
let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

// let tryColliding = (a: Sprite, b: Sprite): boolean => {

// }

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
       
let hitback = (unit: Sprite): void => {
    unit.x += 60;
};
if (isColliding(p2.sprite, magic.sprite)) {
    hitback(p2.sprite);
}
if (isColliding(p1.sprite, p2.sprite)) {
    leftResetLeft(p1.sprite);
}
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
        for (let i: number = 0; i < magicArr.length; i++) {
            let magic: Magic = magicArr[i];
            magic.sprite.x += 2 * magic.direction;
            if (isOffScreen(magicArr[i].sprite)) {
                app.stage.removeChild(magicArr[i].sprite);
                magicArr.splice(i, 1);
            }
        }
        
        // PLAYER ONE MOVING
        p1.sprite.x += (A + D) * speed;
        // p1.sprite.y += (S) * speed;
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
        // p2.sprite.y += (down) * speed;
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
