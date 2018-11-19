// To be imported to game script later

import {
    Sprite,
} from "pixi.js";

export class Unit {
    sprite: Sprite;
    vel: number = 0;
    jumpCount: number = 0;
}

export class Enemy {
    sprite: Sprite;
    direction: number = 1;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

export let cyrus: Sprite = Sprite.fromImage("./Cyrus_Sprite.png");
cyrus.scale.x = -.55;
cyrus.scale.y = .55;
cyrus.x = 225;
cyrus.y = 205;
const speed: number = 1.5;

export let _cyrus = new Unit();
_cyrus.sprite = cyrus;

export let hannit: Sprite = Sprite.fromImage("./Hannit_Sprite.png");
hannit.scale.x = .5;
hannit.scale.y = .5;
hannit.x = 640;
hannit.y = 205;

export let _hannit = new Unit();
_hannit.sprite = hannit;
