import {
    Sprite,
    Container,
    Application,
    Rectangle,
    Graphics,
    DisplayObject,
    Text
} from "pixi.js";

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
cyrus.scale.x = .55;
cyrus.scale.y = .55;
cyrus.x = 145;
cyrus.y = 205;


app.stage.addChild(cyrus);
const speed: number = 1.5;

let hannit: Sprite = Sprite.fromImage("./Hannit_Sprite.png");
hannit.scale.x = .5;
hannit.scale.y = .5;
hannit.x = 640;
hannit.y = 210;
app.stage.addChild(hannit);

let enemies: Enemy[] = [];
for (let i: number = 1; i <= 4; i++) {
    let sprite: Sprite = Sprite.fromImage("./blob.png");
    sprite.x = 450 / 4 * i - 20;
    sprite.y = 256;
    let enemy: Enemy = new Enemy(sprite);
    enemies.push(enemy);
    app.stage.addChild(enemy.sprite);
}

let L: number = 0;
let R: number = 0;
let D: number = 0;
let U: number = 0;

window.addEventListener("keydown", (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const LEFT: number = 37;
    const UP: number = 38;
    const RIGHT: number = 39;
    const DOWN: number = 40;
    if (e.keyCode === LEFT) {
        L = -1;
    } else if (e.keyCode === UP) {
        U = -1;
    } else if (e.keyCode === RIGHT) {
        R = 1;
    } else if (e.keyCode === DOWN) {
        D = 1;
    }
},                      false);

// const LEFT: number = 37;
// const UP: number = 38;
// const RIGHT: number = 39;
// const DOWN: number = 40; 

window.addEventListener("keyup", (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const LEFT: number = 37;
    const UP: number = 38;
    const RIGHT: number = 39;
    const DOWN: number = 40;
    if (e.keyCode === LEFT) {
        L = 0;
    } else if (e.keyCode === UP) {
        U = 0;
    } else if (e.keyCode === RIGHT) {
        R = 0;
    } else if (e.keyCode === DOWN) {
        D = 0;
    }
},                      false);

let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

let resetCyrus = (): void => {
    cyrus.x = 145;
    cyrus.y = 205;
};

let hasWon: boolean = false;

let message: Text = new Text("You won!!");
let messageBox: Graphics = new Graphics();

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < enemies.length; i++) {
        cyrus.x += (L + R) * speed;
        cyrus.y += (U + D) * speed;

        if (isColliding(cyrus, messageBox) && hasWon) {
            resetCyrus();
            app.stage.removeChild(message);
            app.stage.removeChild(messageBox);
            hasWon = false;
        }

        if (cyrus.x >= 718 || cyrus.x <= 62) {
            cyrus.y += .5;
        }

        if (cyrus.y <= 205 && (cyrus.x < 718 && cyrus.x > 62)) {
            cyrus.y += .5;
        }
    }
}
);
