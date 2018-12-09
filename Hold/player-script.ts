import { Sprite } from "pixi.js";

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

export class Player {
    sprite: Sprite;
    startX: number;
    startY: number = 205;
    vel: number = 0;
    jumpCount: number = 0;
    damage: number = 0;
    shieldUp: boolean = false;
    movingLeft: boolean = false;
    movingRight: boolean = false;
    shooting: boolean = false;
    shield: Sprite;
    
    constructor(player: number) {
        if (player === 1) {
            this.shield = Sprite.fromImage("./Red_Shield.png");
        } else {
            this.shield = Sprite.fromImage("./Blue_Shield.png");
        }
        this.shield.scale.x = .2;
        this.shield.scale.y = .2;
        this.shield.alpha = .6;
    }

    select(sprite: Sprite) {
        if (sprite === ophelia1) {
            this.sprite = ophelia1;
            this.sprite.x = this.startX = 210;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === cyrus1) {
            this.sprite = cyrus1;
            this.sprite.x = this.startX = 225;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }

        } else if (sprite === tressa1) {
            this.sprite = tressa1;
            this.sprite.x = this.startX = 210;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === olberic1) {
            this.sprite = olberic1;
            this.sprite.x = this.startX = 225;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === primrose1) {
            this.sprite = primrose1;
            this.sprite.x = this.startX = 210;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === alfyn1) {
            this.sprite = alfyn1;
            this.sprite.x = this.startX = 212;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === therion1) {
            this.sprite = therion1;
            this.sprite.x = this.startX = 217;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === hannit1) {
            this.sprite = hannit1;
            this.sprite.x = this.startX = 215;
            this.sprite.y = 205;
            if (this.sprite.scale.x >= 0) {
                this.sprite.scale.x *= -1;
            }
        } else if (sprite === ophelia2) {
            this.sprite = ophelia2;
            this.sprite.x = this.startX = 650;
            this.sprite.y = 205;
        } else if (sprite === cyrus2) {
            this.sprite = cyrus2;
            this.sprite.x = this.startX = 637;
            this.sprite.y = 205;
        } else if (sprite === tressa2) {
            this.sprite = tressa2;
            this.sprite.x = this.startX = 655;
            this.sprite.y = 205;
        } else if (sprite === olberic2) {
            this.sprite = olberic2;
            this.sprite.x = this.startX = 640;
            this.sprite.y = 205;
        } else if (sprite === primrose2) {
            this.sprite = primrose2;
            this.sprite.x = this.startX = 655;
            this.sprite.y = 205;
        } else if (sprite === alfyn2) {
            this.sprite = alfyn2;
            this.sprite.x = this.startX = 652;
            this.sprite.y = 205;
        } else if (sprite === therion2) {
            this.sprite = therion2;
            this.sprite.x = this.startX = 648;
            this.sprite.y = 205;
        } else if (sprite === hannit2) {
            this.sprite = hannit2;
            this.sprite.x = this.startX = 650;
            this.sprite.y = 205;
        }
    }

}
