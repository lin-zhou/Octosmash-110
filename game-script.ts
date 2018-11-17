import {
    Sprite,
    Container,
    Application,
    Rectangle,
    Graphics,
    DisplayObject,
    Text
} from "pixi.js";

// SET UP

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

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
hannit.scale.x = -.5;
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
        /* if (hannit.scale.x < 0) {
            hannit.scale.x *= -1;
            hannit.x -= 65;
        } */
    } else if (e.keyCode === UP) {
        up = -1;
    } else if (e.keyCode === RIGHT) {
        right = 1;
        /* if (hannit.scale.x >= 0 ) {
            hannit.scale.x *= -1;
            hannit.x += 65;
        }*/
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

// NOTE: Do something about characters colliding into each other.

let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

// END GAME CONDITIONS

let isOutOfBounds = (unit: Sprite): boolean => {
    return unit.x <= -100 || unit.x >= 970 || unit.y <= -100 || unit.y >= 590;
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

// CYRUS RESET FUNCTIONS

let leftResetCyrusY = (): void => {
    cyrus.y = 205;
};
let leftResetCyrusLowY = (): void => {
    cyrus.y = 295;
};
let leftResetCyrusLeft = (): void => {
    cyrus.x = 62;
};
let leftResetCyrusRight = (): void => {
    cyrus.x = 718;
};

let rightResetCyrusY = (): void => {
    cyrus.y = 205;
};
let rightResetCyrusLowY = (): void => {
    cyrus.y = 295;
};
let rightResetCyrusLeft = (): void => {
    cyrus.x = 135;
};
let rightResetCyrusRight = (): void => {
    cyrus.x = 788;
};
// HANNIT RESET FUNCTIONS

let resetHannitY = (): void => {
    hannit.y = 210;
};
let resetHannitLowY = (): void => {
    hannit.y = 295;
};
let resetHannitLeft = (): void => {
    hannit.x = 112;
};
let resetHannitRight = (): void => {
    hannit.x = 718;
};

// RUN GAME

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < enemies.length; i++) {
        cyrus.x += (A + D) * speed;
        cyrus.y += (W + S) * speed;

        hannit.x += (left + right) * speed;
        hannit.y += (up + down) * speed;

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
                leftResetCyrusY();
            }
            if ((cyrus.y >= 293 && cyrus.y <= 295) && (cyrus.x < 718 && cyrus.x > 62)) {
                leftResetCyrusLowY();
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x > 62 && cyrus.x <= 64)) {
                leftResetCyrusLeft();
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x < 718 && cyrus.x >= 716)) {
                leftResetCyrusRight();
            }
        } else if (cyrus.scale.x < 0) {
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
                rightResetCyrusY();
            }
            if ((cyrus.y >= 293 && cyrus.y <= 295) && (cyrus.x < 788 && cyrus.x > 135)) {
                rightResetCyrusLowY();
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x > 135 && cyrus.x <= 137)) {
                rightResetCyrusLeft();
            }
            if ((cyrus.y <= 292 && cyrus.y > 207) && (cyrus.x < 788 && cyrus.x >= 786)) {
                rightResetCyrusRight();
            }
        }

        // HANNIT RESTRAINTS
                
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
        if ((hannit.y >= 293 && hannit.y <= 295) && (hannit.x < 718 && hannit.x > 62)) {
            resetHannitLowY();
        }
        if ((hannit.y <= 292 && hannit.y >= 207) && (hannit.x > 62 && hannit.x <= 64)) {
            resetHannitLeft();
        }
        if ((hannit.y <= 292 && hannit.y >= 207) && (hannit.x < 718 && hannit.x >= 716)) {
            resetHannitRight();
        }
  
    }
}
);
