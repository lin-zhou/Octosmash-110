import {
    Sprite
} from "pixi.js";

export class Magic {
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
