import { Sprite } from "pixi.js";
import { Player, p1, p2 } from "./player-script";

export let moving = (p: Player) => p.movingLeft || p.movingRight;

export let isOutOfBounds = (unit: Sprite): boolean => {
    return unit.x <= -100 || unit.x >= 970 || unit.y <= -100 || unit.y >= 590;
};

export let isOffScreen = (sprite: Sprite): boolean => {
    return sprite.x <= -40 || sprite.x >= 1024 * .85 || sprite.y <= 0 || sprite.y >= 576 * .85;
};

export let facingLeft = (unit: Sprite) => unit.scale.x >= 0;
export let facingRight = (unit: Sprite) => unit.scale.x < 0;

let groundedLeftward = (unit: Sprite) => (facingLeft(unit) && (unit.y >= 205 && unit.y <= 207 && (unit.x < 718 && unit.x > 62)));
let groundedRightward = (unit: Sprite) => (facingRight(unit) && (unit.y >= 205 && unit.y <= 207 && (unit.x < 788 && unit.x > 135)));
export let grounded = (unit: Sprite) => (groundedLeftward(unit) || groundedRightward(unit));

let underStageLeftWard = (unit: Sprite) => (facingLeft(unit) && (unit.y >= 208 && unit.y <= 295) && (unit.x < 718 && unit.x > 62));
let underStageRightWard = (unit: Sprite) => (facingRight(unit) && (unit.y >= 208 && unit.y <= 295) && (unit.x < 788 && unit.x > 135));
export let underStage = (unit: Sprite) => (underStageLeftWard(unit) || underStageRightWard(unit));

export let offSides = (unit: Sprite) => ((facingLeft(unit) && (unit.x <= 62 || unit.x >= 718)) || (facingRight(unit) && (unit.x <= 135 || unit.x >= 788)));

export let canJump = (player: Player): boolean => {
    if (grounded(player.sprite)) {
        if (player === p1) {
            p1.resetJump();
            return true;
        } else if (player === p2) {
            p2.resetJump();
            return true;
        }
    } else if (player === p1) {
        if (p1.jumpCount < 2) {
            return true;
        }
    } else if (player === p2) {
        if (p2.jumpCount < 2) {
            return true;
        }
    }
    return false;
};
