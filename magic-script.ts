import { 
    Application, 
    Sprite
} from "pixi.js";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

class Magic {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

let shootCount1 = 0;
let magic = new Magic(Sprite.fromImage("./Magic_Blast.png"));

window.addEventListener("keydown", (e: KeyboardEvent): void  => {
    const ATTACK: number = 51;

    if (e.keyCode === ATTACK) {
        shootCount1++;
        magic = new Magic(Sprite.fromImage("./Magic_Blast.png"));
        magic.sprite.x = 50 + shootCount1 * 100;
        app.stage.addChild(magic.sprite);
    }
},                      false);
