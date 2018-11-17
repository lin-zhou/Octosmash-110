import {
    Sprite,
    Application,
} from "pixi.js";

/* TO FIX
    - Write "on ground" test & other helper functions
    - Create end state for the game so only one "GAME" message shows up
    - Figure out how to get rid of the enemy function while still looping
    - Fix a couple of jumps in the corners of the stage
    - Double check facing left or right
*/

// SET UP

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

let acc: number = 0.05;
let cyrusV: number = 0;
let hannitV: number = 0;

class Enemy {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

class Unit {
    sprite: Sprite;
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

let hannit: Sprite = Sprite.fromImage("./Hannit_Sprite.png");
hannit.scale.x = .5;
hannit.scale.y = .5;
hannit.x = 640;
hannit.y = 210;
app.stage.addChild(hannit);

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
        cyrusV = -4;
    } else if (e.keyCode === RIGHT) {
        D = 1;
        if (cyrus.scale.x >= 0 ) {
            cyrus.scale.x *= -1;
            cyrus.x += 65;
        }
    } else if (e.keyCode === DOWN) {
        S = 1;
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
        hannitV = -4;
    } else if (e.keyCode === RIGHT) {
        right = 1;
        if (hannit.scale.x >= 0 ) {
            hannit.scale.x *= -1;
            hannit.x += 65;
        }
    } else if (e.keyCode === DOWN) {
        down = 1;
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

let isCyrusOnStageLeft = (): boolean => {
    return (cyrus.scale.x >= 0 && ((cyrus.y >= 205 && cyrus.y <= 207 && (cyrus.x < 718 && cyrus.x > 62))));
};

let isCyrusOnStageRight = (): boolean => {
    return (cyrus.scale.x < 0 && ((cyrus.y >= 205 && cyrus.y <= 207 && (cyrus.x < 718 && cyrus.x > 135))));
};

let isHannitOnStageLeft = (): boolean => {
    return (hannit.scale.x >= 0 && ((hannit.y >= 210 && hannit.y <= 212 && (hannit.x < 718 && hannit.x > 62))));
};

let isHannitOnStageRight = (): boolean => {
    return (hannit.scale.x < 0 && ((hannit.y >= 210 && hannit.y <= 212 && (hannit.x < 718 && hannit.x > 135))));
};

// END GAME + TEXT

let hasWon: boolean = false;

// NOTE: Create an end state.

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

let game = new PIXI.Text("GAME!", gameStyle);

let handleWin = (gameMessage: PIXI.Text, message: PIXI.Text): void => {
    gameMessage.x = 305;
    gameMessage.y = 180;
    message.x = 327;
    message.y = 280;
    app.stage.addChild(gameMessage);
    app.stage.addChild(message);
    hasWon = true;
};

// GENERAL RESET FUNCTIONS

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

// CYRUS RESET FUNCTIONS

let resetCyrusY = (): void => {
    cyrus.y = 205;
};

// HANNIT RESET FUNCTIONS

let resetHannitY = (): void => {
    hannit.y = 210;
};

// RUN GAME

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < enemies.length; i++) {
        cyrus.x += (A + D) * speed;
        // cyrus.y += (S) * speed;
        if (cyrusV < 1) {
            cyrusV = cyrusV + acc;
        } else if (isCyrusOnStageLeft()) {
            cyrusV = 0;
            resetCyrusY();
        } else if (isCyrusOnStageRight()) {
            cyrusV = 0;
            resetCyrusY();
        } else if (cyrus.scale.x >= 0 && ((cyrus.y >= 208 && cyrus.y <= 295) && (cyrus.x < 718 && cyrus.x > 62))) {
            cyrusV = 0;
            resetLowY(cyrus);
        } else if (cyrus.scale.x < 0 && ((cyrus.y >= 208 && cyrus.y <= 295) && (cyrus.x < 718 && cyrus.x > 135))) {
            cyrusV = 0;
            resetLowY(cyrus);
        } else {
            cyrusV = 1;
        }
        cyrus.y = cyrus.y + cyrusV;

        hannit.x += (left + right) * speed;
        // hannit.y += (down) * speed;
        if (hannitV < 1) {
            hannitV = hannitV + acc;
        } else if (isHannitOnStageLeft()) {
            hannitV = 0;
            resetHannitY();
        } else if (isHannitOnStageRight()) {
            hannitV = 0;
            resetHannitY();
        } else if (hannit.scale.x >= 0 && ((hannit.y >= 213 && hannit.y <= 295) && (hannit.x < 718 && hannit.x > 62))) {
            hannitV = 0;
            resetLowY(hannit);
        } else if (hannit.scale.x >= 0 && ((hannit.y >= 213 && hannit.y <= 295) && (hannit.x < 718 && hannit.x > 135))) {
            hannitV = 0;
            resetLowY(hannit);
        } else {
            hannitV = 1;
        }
        hannit.y = hannit.y + hannitV;

        // END GAME TEST

        if (isOutOfBounds(cyrus)) {
            let message = new PIXI.Text("Hannit wins.", style);
            handleWin(game, message);
        } else if (isOutOfBounds(hannit)) {
            let message = new PIXI.Text("Cyrus wins.", style);
            handleWin(game, message);
            message.x = 331;
        }

        // CYRUS RESTRAINTS

        // NOTE: Cyrus turns weirdly in the bottom left of the stage

        if (cyrus.scale.x >= 0) {
            if (cyrus.x >= 718 || cyrus.x <= 62) {
            cyrus.y += .5;
            }
            if (cyrus.y <= 205 && (cyrus.x < 718 && cyrus.x > 62)) {
                cyrus.y += .5;
            }
            if (cyrus.y > 207 && (cyrus.x < 718 && cyrus.x > 62)) {
                cyrus.y += .5;
            }
            if (cyrus.y >= 205 && cyrus.y <= 207 && (cyrus.x < 718 && cyrus.x > 62)) {
                resetCyrusY();
            }
            if ((cyrus.y >= 208 && cyrus.y <= 295) && (cyrus.x < 718 && cyrus.x > 62)) {
                resetLowY(cyrus);
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x > 62 && cyrus.x <= 64)) {
                leftResetLeft(cyrus);
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x < 718 && cyrus.x >= 716)) {
                leftResetRight(cyrus);
            }
        } else {
            if (cyrus.x >= 788 || cyrus.x <= 135) {
                cyrus.y += .5;
            }
            if (cyrus.y <= 205 && (cyrus.x < 788 && cyrus.x > 135)) {
                cyrus.y += .5;
            }
            if (cyrus.y > 207 && (cyrus.x < 788 && cyrus.x > 135)) {
                cyrus.y += .5;
            }
            if (cyrus.y >= 205 && cyrus.y <= 207 && (cyrus.x < 788 && cyrus.x > 135)) {
                resetCyrusY();
            }
            if ((cyrus.y >= 208 && cyrus.y <= 295) && (cyrus.x < 788 && cyrus.x > 135)) {
                resetLowY(cyrus);
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x > 135 && cyrus.x <= 137)) {
                rightResetLeft(cyrus);
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x < 788 && cyrus.x >= 786)) {
                rightResetRight(cyrus);
            }
        }

        // HANNIT RESTRAINTS
          
        if (hannit.scale.x >= 0) {
            if (hannit.x >= 718 || hannit.x <= 62) {
                hannit.y += .5;
            }
            if (hannit.y <= 210 && (hannit.x < 718 && hannit.x > 62)) {
                hannit.y += .5;
            }
            if (hannit.y > 212 && (hannit.x < 718 && hannit.x > 62)) {
                hannit.y += .5;
            }
            if (hannit.y >= 210 && hannit.y <= 212 && (hannit.x < 718 && hannit.x > 62)) {
                resetHannitY();
            }
            if ((hannit.y >= 213 && hannit.y <= 295) && (hannit.x < 718 && hannit.x > 62)) {
                resetLowY(hannit);
            }
            if ((hannit.y <= 292 && hannit.y >= 207) && (hannit.x > 62 && hannit.x <= 64)) {
                leftResetLeft(hannit);
            }
            if ((hannit.y <= 292 && hannit.y >= 207) && (hannit.x < 718 && hannit.x >= 716)) {
                leftResetRight(hannit);
            }
        } else {
            if (hannit.x >= 788 || hannit.x <= 135) {
                hannit.y += .5;
            }
            if (hannit.y <= 210 && (hannit.x < 788 && hannit.x > 135)) {
                hannit.y += .5;
            }
            if (hannit.y > 212 && (hannit.x < 788 && hannit.x > 135)) {
                hannit.y += .5;
            }
            if (hannit.y >= 210 && hannit.y <= 212 && (hannit.x < 788 && hannit.x > 135)) {
                resetHannitY();
            }
            if ((hannit.y >= 213 && hannit.y <= 295) && (hannit.x < 788 && hannit.x > 135)) {
                resetLowY(hannit);
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
