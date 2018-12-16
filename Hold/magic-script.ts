import { 
    Application, 
    Sprite
} from "pixi.js";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

export class Magic {
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

window.addEventListener("keydown", (e: KeyboardEvent): void  => {
    console.log("key: " + e.keyCode);
    const ATTACK: number = 51;

    if (e.keyCode === ATTACK) {
        // Create a new Magic object every time the 3 key is pressed
        let sprite: Sprite = Sprite.fromImage("./Magic_Blast.png");
        let magic: Magic = new Magic(sprite);
        magic.getPoint(50, 50);
        // Use player's coordinates as arguments for getPoint()
        magicArr.push(magic);
        // Adds new Magic object to magicArr
        app.stage.addChild(magic.sprite);
    }
},                      false);

app.ticker.add((delta: number): void => {
    for (let i: number = 0; i < magicArr.length; i++) {
        let magic: Magic = magicArr[i];
        // Arrow on magic in this frame on the stack points to magicArr[i] in the heap
        magic.sprite.x += 10 * magic.direction;
    }
},             false);
