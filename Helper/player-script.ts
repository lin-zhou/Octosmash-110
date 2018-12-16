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

import {
    facingLeft,
    facingRight
} from "./helper-script";

export class Player {
    sprite: Sprite;
    startX: number;
    startY: number = 205;
    vel: number = 0;
    damage: number = 0;
    jumpCount: number = 0;
    canJump: boolean = true;
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

    resetJump() {
        this.jumpCount = 0;
    }

    useShield() {
        if (facingLeft(this.sprite)) {
            if (this.shield.scale.x < 0) {
                this.shield.scale.x *= -1;
            }
            if (this.sprite === ophelia1 || this.sprite === tressa1 || this.sprite === primrose1 || this.sprite === ophelia2 || this.sprite === tressa2 || this.sprite === primrose2) {
                this.shield.x = this.sprite.x - 12;
            } else if (this.sprite === cyrus1 || this.sprite === cyrus2) {
                this.shield.x = this.sprite.x - 2;
            } else if (this.sprite === olberic1 || this.sprite === olberic2) {
            this.shield.x = this.sprite.x - 3;
            } else if (this.sprite === alfyn1 || this.sprite === alfyn2) {
                this.shield.x = this.sprite.x - 15;
                this.shield.y += 3;
            } else if (this.sprite === therion1 || this.sprite === hannit1 || this.sprite === therion2 || this.sprite === hannit2) {
                this.shield.x = this.sprite.x - 8;
            }
        } else if (facingRight(this.sprite)) {
            if (this.shield.scale.x >= 0) {
                this.shield.scale.x *= -1;
            }
            if (this.sprite === ophelia1 || this.sprite === tressa1 || this.sprite === primrose1 || this.sprite === ophelia2 || this.sprite === tressa2 || this.sprite === primrose2) {
                this.shield.x = this.sprite.x + 12;
            } else if (this.sprite === cyrus1 || this.sprite === cyrus2) {
                this.shield.x = this.sprite.x;
            } else if (this.sprite === olberic1 || this.sprite === olberic2) {
                this.shield.x = this.sprite.x + 3;
            } else if (this.sprite === alfyn1 || this.sprite === alfyn2) {
                this.shield.x = this.sprite.x + 15;
            } else if (this.sprite === therion1 || this.sprite === hannit1 || this.sprite === therion2 || this.sprite === hannit2) {
                this.shield.x = this.sprite.x + 8;
            }
        }
        this.shield.y = this.sprite.y - 5;
    }

    sideStepLeft() {
        this.sprite.x -= 30;
    }

    sideStepRight() {
        this.sprite.x += 30;
    }

    resetY() {
        this.sprite.y = 205;
    }

    resetLowY() {
        this.sprite.y = 295;
    }

    leftResetLeft() {
        this.sprite.x = 62;
    }

    leftResetRight() {
        this.sprite.x = 718;
    }

    rightResetLeft() {
        this.sprite.x = 135;
    }

    rightResetRight() {
        this.sprite.x = 788;
    }

}

export let p1 = new Player(1);
export let p2 = new Player(2);
