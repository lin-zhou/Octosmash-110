import { 
    Application, 
    Sprite
} from "pixi.js";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

class Magic {
    sprite: Sprite;
    x: number = 0;
    y: number = 0;
    direction: number = 1;
    vel: number = 0;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
    getPoint(unitX: number, unitY: number): void {
        this.sprite.x += unitX;
        this.sprite.y += unitY;
    }
}

let magicArr: Magic[] = [];

let keyThree: number = 0;

window.addEventListener("keydown", (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const ATTACK: number = 51;

    if (e.keyCode === ATTACK) {
        keyThree = 1;
        if (keyThree === 1) {
            let sprite: Sprite = Sprite.fromImage("./Magic_Blast.png");
            let magic: Magic = new Magic(sprite);
            magic.getPoint(50, 50);
            magicArr.push(magic);
            app.stage.addChild(magic.sprite);
        }
    }
},                      false);

window.addEventListener("keyup", (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const ATTACK: number = 51;

    if (e.keyCode === ATTACK) {
        keyThree = 0;
    }
    
},                      false);

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < magicArr.length; i++) {
        let magic: Magic = magicArr[i];
        magic.sprite.x += 10 * magic.direction;
    }
},             false);
