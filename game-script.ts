import {
    Sprite,
    Application,
} from "pixi.js";

// How To Download Pixi.js
// npm install pixi.js
// npm install @types/pixi.js

/* TO FIX
    - Figure out how to get rid of the enemy function while still looping
    - Fix a couple of finicky places in the corners of the stage
    - Double check facing left or right
    - Fix error: sometimes can't jump after walking off stage
    - Fix weird jump when holding "up" or "w" keys
    - Consider moving helpers to another file
    - If introducing multiple characters to pick from, tie controls to a player rather than a character
*/

// SET UP

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

let acc: number = 0.05;
// This is the acceleration used to determine fall rate to simulate gravity.

class Enemy {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

class Unit {
    sprite: Sprite;
    vel: number = 0;
    jumpCount: number = 0;
}

let background: Sprite = Sprite.fromImage("./Final_Destination_Stage.png");
background.scale.x = .85;
background.scale.y = .85;
app.stage.addChild(background);

let cyrus: Sprite = Sprite.fromImage("./Cyrus_Sprite.png");
cyrus.scale.x = -.55;
cyrus.scale.y = .55;
cyrus.x = 225;
cyrus.y = 205;
app.stage.addChild(cyrus);
const speed: number = 1.5;

let _cyrus = new Unit();
_cyrus.sprite = cyrus;

let hannit: Sprite = Sprite.fromImage("./Hannit_Sprite.png");
hannit.scale.x = .5;
hannit.scale.y = .5;
hannit.x = 640;
hannit.y = 205;
app.stage.addChild(hannit);

let _hannit = new Unit();
_hannit.sprite = hannit;

// NOTE: Find a way to loop without "enemies."

let enemies: Enemy[] = [];
for (let i: number = 1; i <= 4; i++) {
    let sprite: Sprite = Sprite.fromImage("./blob.png");
    sprite.x = 450 / 4 * i - 20;
    sprite.y = 256;
    let enemy: Enemy = new Enemy(sprite);
    enemies.push(enemy);
    app.stage.addChild(enemy.sprite);
}

// CYRUS MOVE CONTROLS

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
        if (cyrus.scale.x < 0) {
            cyrus.scale.x *= -1;
            cyrus.x -= 65;
        }
    } else if (e.keyCode === UP) {
        W = -1;
        if (canJump(cyrus)) {
            _cyrus.vel =  -4;
            _cyrus.jumpCount++;
        } else {
            _cyrus.vel = 0;
        }
    } else if (e.keyCode === RIGHT) {
        D = 1;
        if (cyrus.scale.x >= 0 ) {
            cyrus.scale.x *= -1;
            cyrus.x += 65;
        }
    } else if (e.keyCode === DOWN) {
        if (!grounded(cyrus)) {
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

// HANNIT MOVE CONTROLS

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
        if (hannit.scale.x < 0) {
            hannit.scale.x *= -1;
            hannit.x -= 65;
        }
    } else if (e.keyCode === UP) {
        up = -1;
        if (canJump(hannit)) {
            _hannit.vel =  -4;
            _hannit.jumpCount++;
        } else {
            _hannit.vel = 0;
        }
    } else if (e.keyCode === RIGHT) {
        right = 1;
        if (hannit.scale.x >= 0 ) {
            hannit.scale.x *= -1;
            hannit.x += 65;
        }
    } else if (e.keyCode === DOWN) {
        if (!grounded(hannit)) {
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
        if (unit === cyrus) {
            _cyrus.jumpCount = 0;
            return true;
        } else if (unit === hannit) {
            _hannit.jumpCount = 0;
            return true;
        }
    } else if (unit === cyrus) {
        if (_cyrus.jumpCount < 2) {
            return true;
        }
    } else if (unit === hannit) {
        if (_hannit.jumpCount < 2) {
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

let style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"], // gradient
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

let gameStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 75,
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"], // gradient
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

let gameOver: boolean = false;
let winner: Sprite;
let winnerExists: boolean = false;

let game = new PIXI.Text("GAME!", gameStyle);

let handleWin = (gameMessage: PIXI.Text, message: PIXI.Text): void => {
    gameMessage.x = 305;
    gameMessage.y = 180;
    message.x = 327;
    message.y = 280;
    app.stage.addChild(gameMessage);
    app.stage.addChild(message);
};

// RUN GAME

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < enemies.length; i++) {
        // END GAME TEST

        if (isOutOfBounds(cyrus) || isOutOfBounds(hannit)) {
            gameOver = true;
        }

        if (gameOver) {
            if (isOutOfBounds(cyrus)) {
                winner = hannit;
            } else if (isOutOfBounds(hannit)) {
                winner = cyrus;
            }
            if (winner === hannit && !winnerExists) {
                let message = new PIXI.Text("Hannit wins.", style);
                handleWin(game, message);
                winnerExists = true;
            } else if (winner === cyrus && !winnerExists) {
                let message = new PIXI.Text("Cyrus wins.", style);
                handleWin(game, message);
                message.x = 331;
                winnerExists = true;
            }
        }
        
        cyrus.x += (A + D) * speed;
        cyrus.y += (S) * speed;
        if (_cyrus.vel < 1) {
            _cyrus.vel += acc;
        } else if (grounded(cyrus)) {
            _cyrus.vel = 0;
            resetY(cyrus);
        } else if (underStage(cyrus)) {
            _cyrus.vel = 0;
            resetLowY(cyrus);
        } else if (underStage(cyrus)) {
            _cyrus.vel = 0;
            resetLowY(cyrus);
        } else {
            _cyrus.vel = 1;
        }
        cyrus.y += _cyrus.vel;

        hannit.x += (left + right) * speed;
        hannit.y += (down) * speed;
        if (_hannit.vel < 1) {
            _hannit.vel += acc;
        } else if (grounded(hannit)) {
            _hannit.vel = 0;
            resetY(hannit);
        } else if (underStage(hannit)) {
            _hannit.vel = 0;
            resetLowY(hannit);
        } else if (underStage(hannit)) {
            _hannit.vel = 0;
            resetLowY(hannit);
        } else {
            _hannit.vel = 1;
        }
        hannit.y = hannit.y + _hannit.vel;

        // CYRUS RESTRAINTS

        // NOTE: Cyrus turns weirdly in the bottom left of the stage

        if (grounded(cyrus)) {
            resetY(cyrus);
        }
        if (underStage(cyrus)) {
            resetLowY(cyrus);
        }
        if (offSides(cyrus)) {
            cyrus.y += .5;
        }

        if (facingLeft(cyrus)) {
            if (cyrus.y <= 205 && (cyrus.x < 718 && cyrus.x > 62)) {
                cyrus.y += .5;
            }
            if (cyrus.y > 207 && (cyrus.x < 718 && cyrus.x > 62)) {
                cyrus.y += .5;
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x > 62 && cyrus.x <= 64)) {
                leftResetLeft(cyrus);
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x < 718 && cyrus.x >= 716)) {
                leftResetRight(cyrus);
            }
        } else {
            if (cyrus.y <= 205 && (cyrus.x < 788 && cyrus.x > 135)) {
                cyrus.y += .5;
            }
            if (cyrus.y > 207 && (cyrus.x < 788 && cyrus.x > 135)) {
                cyrus.y += .5;
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x > 135 && cyrus.x <= 137)) {
                rightResetLeft(cyrus);
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x < 788 && cyrus.x >= 786)) {
                rightResetRight(cyrus);
            }
        }

        // HANNIT RESTRAINTS

        if (grounded(hannit)) {
            resetY(hannit);
        }
        if (underStage(hannit)) {
            resetLowY(hannit);
        }
        if (offSides(hannit)) {
            hannit.y += .5;
        }
          
        if (facingLeft(hannit)) {
            if (hannit.y <= 205 && (hannit.x < 718 && hannit.x > 62)) {
                hannit.y += .5;
            }
            if (hannit.y > 207 && (hannit.x < 718 && hannit.x > 62)) {
                hannit.y += .5;
            }
            if ((hannit.y >= 207 && hannit.y <= 292) && (hannit.x > 62 && hannit.x <= 64)) {
                leftResetLeft(hannit);
            }
            if ((hannit.y >= 207 && hannit.y <= 292) && (hannit.x < 718 && hannit.x >= 716)) {
                leftResetRight(hannit);
            }
        } else {
            if (hannit.y <= 205 && (hannit.x < 788 && hannit.x > 135)) {
                hannit.y += .5;
            }
            if (hannit.y > 207 && (hannit.x < 788 && hannit.x > 135)) {
                hannit.y += .5;
            }
            if ((hannit.y <= 292 && hannit.y >= 207) && (hannit.x > 135 && hannit.x <= 137)) {
                rightResetLeft(hannit);
            }
            if ((hannit.y <= 292 && hannit.y >= 207) && (hannit.x < 788 && hannit.x >= 786)) {
                rightResetRight(hannit);
            }
        }
    }   
}
);
