import {
    Sprite,
    Application
} from "pixi.js";

import {
    Player
} from "./player-script";

import {
    gameTextStyle,
    damageStyle,
    playerDamageStyle,
    style,
    playAgainStyle
} from "./fonts-script";

import {
    damageToString,
    grounded,
    canJump,
    facingLeft,
    facingRight,
    moving,
    isOutOfBounds,
    isColliding,
    hitRight,
    hitLeft,
    isOffScreen,
    underStage
} from "./helper-script";

import { Magic } from "./magic-script";

export class Looper {
    sprite: Sprite;
    constructor(sprite: Sprite) {
        this.sprite = sprite;
    }
}

export class Game {

    app: Application;
    gameBG: Sprite = Sprite.fromImage("./Final_Destination_Stage.png");

    isPlaying: boolean = true;

    // NUMBERS FOR MOTION
    acc: number = 0.08;
    speed: number = 1.5;

    p1: Player;
    p2: Player;

    previousP1Damage: number = 0;
    previousP2Damage: number = 0;

    p1DamageDisplay: PIXI.Text;
    p2DamageDisplay: PIXI.Text;

    p1Name: PIXI.Text;
    p2Name: PIXI.Text;

    magicArr: Magic[];
    magicArrTwo: Magic[];

    loops: Looper[];

    // PLAYER ONE CONTROLS
    A: number = 0;
    D: number = 0;
    S: number = 0;
    W: number = 0;
    lastKey1: number = 0;

    // PLAY TWO CONTROLS
    left: number = 0;
    right: number = 0;
    down: number = 0;
    up: number = 0;
    lastKey2: number = 0;

    // END GAME
    gameOver: boolean = false;
    winner: Player;
    winnerExists: boolean = false;
    gameText: PIXI.Text = new PIXI.Text("GAME!", gameTextStyle);

    constructor(app: Application, p1: Player, p2: Player, magic1: Magic[], magic2: Magic[], loops: Looper[]) {
        this.app = app;
        this.p1 = p1;
        this.p2 = p2;
        this.magicArr = magic1;
        this.magicArrTwo = magic2;
        this.loops = loops;
    }

    runGame(): void {
        document.body.appendChild(this.app.view);

        this.gameBG.scale.x = .85;
        this.gameBG.scale.y = .85;
        this.app.stage.addChild(this.gameBG);

        this.app.stage.addChild(this.p1.sprite);
        this.app.stage.addChild(this.p2.sprite);

        this.p1DamageDisplay = new PIXI.Text(damageToString(this.p1), damageStyle);
        this.p1DamageDisplay.x = 300;
        this.p1DamageDisplay.y = 440;

        this.p2DamageDisplay = new PIXI.Text(damageToString(this.p2), damageStyle);
        this.p2DamageDisplay.x = 650;
        this.p2DamageDisplay.y = 440;

        this.p1Name = new PIXI.Text("Player One", playerDamageStyle);
        this.p1Name.x = 185;
        this.p1Name.y = 447;

        this.p2Name = new PIXI.Text("Player Two", playerDamageStyle);
        this.p2Name.x = 535;
        this.p2Name.y = 447;

        this.app.stage.addChild(this.p1DamageDisplay);
        this.app.stage.addChild(this.p2DamageDisplay);
        this.app.stage.addChild(this.p1Name);
        this.app.stage.addChild(this.p2Name);

        window.addEventListener("keydown", (e: KeyboardEvent): void  => {
            console.log("key: " + e.keyCode);
            const LEFT: number = 65;
            const UP: number = 87;
            const RIGHT: number = 68;
            const DOWN: number = 83;
            const ATTACK: number = 51;
            const SIDESTEP: number = 82;

            if (e.keyCode === LEFT) {
                this.p1.movingLeft = true;
                this.A = -1;
                if (this.p1.sprite.scale.x < 0) {
                    this.p1.sprite.scale.x *= -1;
                    this.p1.sprite.x -= 65;
                }
                window.addEventListener("keydown", (e: KeyboardEvent): void => {
                    if (grounded(this.p1.sprite) && this.p1.movingLeft && !this.p1.movingRight && !(this.lastKey1 === SIDESTEP) && e.keyCode === SIDESTEP) {
                        this.p1.sideStepLeft();
                        this.lastKey1 = SIDESTEP;
                    }
                },                      false);
                window.addEventListener("keyup", (e: KeyboardEvent): void => {
                    if (e.keyCode === SIDESTEP) {
                        this.lastKey1 = 0;
                    }
                },                      false);
            } else if (e.keyCode === UP) {
                this.W = -1;
                if (!(this.lastKey1 === UP)) {
                    if (canJump(this.p1)) {
                        this.p1.vel = -4;
                        this.p1.jumpCount++;
                    }
                    this.lastKey1 = UP;
                }
            } else if (e.keyCode === RIGHT) {
                this.p1.movingRight = true;
                this.D = 1;
                if (this.p1.sprite.scale.x >= 0) {
                    this.p1.sprite.scale.x *= -1;
                    this.p1.sprite.x += 65;
                }
                window.addEventListener("keydown", (e: KeyboardEvent): void => {
                    if (grounded(this.p1.sprite) && this.p1.movingRight && !this.p1.movingLeft && !(this.lastKey1 === SIDESTEP) && e.keyCode === SIDESTEP) {
                        this.p1.sideStepRight();
                        this.lastKey1 = SIDESTEP;
                    }
                },                      false);
                window.addEventListener("keyup", (e: KeyboardEvent): void => {
                    if (e.keyCode === SIDESTEP) {
                        this.lastKey1 = 0;
                    }
                },                      false);
            } else if (e.keyCode === DOWN) {
                if (!grounded(this.p1.sprite)) {
                    this.S = 1;
                }
            } else if (e.keyCode === ATTACK) {
                this.p1.shooting = true;
                if (!(this.lastKey1 === ATTACK)) {
                    if (this.magicArr.length < 4) {
                        let sprite: Sprite = Sprite.fromImage("./Magic_Blast.png");
                        let magic: Magic = new Magic(sprite);
                        magic.getPoint(this.p1.sprite.x, this.p1.sprite.y + 20);
                        if (facingLeft(this.p1.sprite)) {
                            magic.direction = -1;
                            magic.sprite.scale.x *= 1;
                        } else {
                            magic.direction = 1;
                            magic.sprite.scale.x *= -1;
                        }
                        this.magicArr.push(magic);
                        this.app.stage.addChild(magic.sprite);
                    }
                    this.lastKey1 = ATTACK;
                }
            } else if (grounded(this.p1.sprite) && !moving(this.p1) && !this.p1.shooting && e.keyCode === SIDESTEP) {
                this.p1.shieldUp = true;
                this.p1.useShield();
                this.app.stage.addChild(this.p1.shield);
            }
        },                      false);

        window.addEventListener("keyup", (e: KeyboardEvent): void  => {
            console.log("key: " + e.keyCode);
            const LEFT: number = 65;
            const UP: number = 87;
            const RIGHT: number = 68;
            const DOWN: number = 83;
            const ATTACK: number = 51;
            const SIDESTEP: number = 82;

            if (e.keyCode === LEFT) {
                this.p1.movingLeft = false;
                this.A = 0;
                this.lastKey1 = 0;
            } else if (e.keyCode === UP) {
                this.W = 0;
                this.lastKey1 = 0;
            } else if (e.keyCode === RIGHT) {
                this.p1.movingRight = false;
                this.D = 0;
                this.lastKey1 = 0;
            } else if (e.keyCode === DOWN) {
                this.S = 0;
                this.lastKey1 = 0;
            } else if (e.keyCode === ATTACK) {
                this.p1.shooting = false;
                this.lastKey1 = 0;
            } else if (e.keyCode === SIDESTEP && this.p1.shieldUp) {
                this.app.stage.removeChild(this.p1.shield);
                this.p1.shieldUp = false;
            }
        },                      false);

        window.addEventListener("keydown", (e: KeyboardEvent): void  => {
            console.log("key: " + e.keyCode);
            const LEFT: number = 37;
            const UP: number = 38;
            const RIGHT: number = 39;
            const DOWN: number = 40;
            const ATTACK: number = 191;
            const SIDESTEP: number = 188;

            if (e.keyCode === LEFT) {
                this.p2.movingLeft = true;
                this.left = -1;
                if (this.p2.sprite.scale.x < 0) {
                    this.p2.sprite.scale.x *= -1;
                    this.p2.sprite.x -= 65;
                }
                window.addEventListener("keydown", (e: KeyboardEvent): void => {
                    if (grounded(this.p2.sprite) && this.p2.movingLeft && !this.p2.movingRight && !(this.lastKey2 === SIDESTEP) && e.keyCode === SIDESTEP) {
                        this.p2.sideStepLeft();
                        this.lastKey2 = SIDESTEP;
                    }
                },                      false);
                window.addEventListener("keyup", (e: KeyboardEvent): void => {
                    if (e.keyCode === SIDESTEP) {
                        this.lastKey2 = 0;
                    }
                },                      false);
            } else if (e.keyCode === UP) {
                this.up = -1;
                if (!(this.lastKey2 === UP)) {
                    if (canJump(this.p2)) {
                        this.p2.vel = -4;
                        this.p2.jumpCount++;
                    }
                    this.lastKey2 = UP;
                }
            } else if (e.keyCode === RIGHT) {
                this.p2.movingRight = true;
                this.right = 1;
                if (this.p2.sprite.scale.x >= 0) {
                    this.p2.sprite.scale.x *= -1;
                    this.p2.sprite.x += 65;
                }
                window.addEventListener("keydown", (e: KeyboardEvent): void => {
                    if (grounded(this.p2.sprite) && this.p2.movingRight && !this.p2.movingLeft && !(this.lastKey2 === SIDESTEP) && e.keyCode === SIDESTEP) {
                        this.p2.sideStepRight();
                        this.lastKey2 = SIDESTEP;
                    }
                },                      false);
                window.addEventListener("keyup", (e: KeyboardEvent): void => {
                    if (e.keyCode === SIDESTEP) {
                        this.lastKey2 = 0;
                    }
                },                      false);
            } else if (e.keyCode === DOWN) {
                if (!grounded(this.p2.sprite)) {
                    this.down = 1;
                }
            } else if (e.keyCode === ATTACK) {
                this.p2.shooting = true;
                if (!(this.lastKey2 === ATTACK)) {
                    if (this.magicArrTwo.length < 4) {
                        let sprite: Sprite = Sprite.fromImage("./Magic_Blast.png");
                        let magicTwo: Magic = new Magic(sprite);
                        magicTwo.getPoint(this.p2.sprite.x, this.p2.sprite.y + 20);
                        if (facingLeft(this.p2.sprite)) {
                            magicTwo.direction = -1;
                            magicTwo.sprite.scale.x *= 1;
                        } else {
                            magicTwo.direction = 1;
                            magicTwo.sprite.scale.x *= -1;
                        }
                        this.magicArrTwo.push(magicTwo);
                        this.app.stage.addChild(magicTwo.sprite);
                    }
                    this.lastKey2 = ATTACK;
                }
            } else if (grounded(this.p2.sprite) && !moving(this.p2) && !this.p2.shooting && e.keyCode === SIDESTEP) {
                this.p2.shieldUp = true;
                this.p2.useShield();
                this.app.stage.addChild(this.p2.shield);
            }
        },                      false);


        window.addEventListener("keyup", (e: KeyboardEvent): void  => {
            console.log("key: " + e.keyCode);
            const LEFT: number = 37;
            const UP: number = 38;
            const RIGHT: number = 39;
            const DOWN: number = 40;
            const ATTACK: number = 191;
            const SIDESTEP: number = 188;

            if (e.keyCode === LEFT) {
                this.p2.movingLeft = false;
                this.left = 0;
                this.lastKey2 = 0;
            } else if (e.keyCode === UP) {
                this.up = 0;
                this.lastKey2 = 0;
            } else if (e.keyCode === RIGHT) {
                this.p2.movingRight = false;
                this.right = 0;
                this.lastKey2 = 0;
            } else if (e.keyCode === DOWN) {
                this.down = 0;
                this.lastKey2 = 0;
            } else if (e.keyCode === ATTACK) {
                this.p2.shooting = false;
                this.lastKey2 = 0;
            } else if (e.keyCode === SIDESTEP && this.p2.shieldUp) {
                this.app.stage.removeChild(this.p2.shield);
                this.p2.shieldUp = false;
            }
        },                      false);

        // END GAME
        let handleWin = (gameMessage: PIXI.Text, message: PIXI.Text): void => {
            gameMessage.x = 278;
            gameMessage.y = 180;
            message.x = 275;
            message.y = 280;
            this.app.stage.addChild(gameMessage);
            this.app.stage.addChild(message);
        };

        // RUN GAME
        this.app.ticker.add((delta: number): void => {
            for (let i: number = 0; i < this.loops.length; i++) {
                
                // END GAME TEST
                if (isOutOfBounds(this.p1.sprite) || isOutOfBounds(this.p2.sprite)) {
                    this.gameOver = true;
                }

                if (this.gameOver) {
                    this.isPlaying = false;
                    this.p1.damage = 0;
                    this.p2.damage = 0;
                    if (isOutOfBounds(this.p1.sprite)) {
                        this.winner = this.p2;
                    } else if (isOutOfBounds(this.p2.sprite)) {
                        this.winner = this.p1;
                    }
                    if (this.winner === this.p2 && !this.winnerExists) {
                        let message = new PIXI.Text("Player Two Wins", style);
                        handleWin(this.gameText, message);
                        this.winnerExists = true;
                    } else if (this.winner === this.p1 && !this.winnerExists) {
                        let message = new PIXI.Text("Player One Wins", style);
                        handleWin(this.gameText, message);
                        this.winnerExists = true;
                    }

                    let playAgain = new PIXI.Text("Press ENTER to play again", playAgainStyle);
                    playAgain.x = 327;
                    playAgain.y = 330;
                    this.app.stage.addChild(playAgain);

                    let orRefresh = new PIXI.Text("or refresh to choose new characters", playAgainStyle);
                    orRefresh.x = 293;
                    orRefresh.y = 350;
                    this.app.stage.addChild(orRefresh);

                    window.addEventListener("keydown", (e: KeyboardEvent): void  => {
                        console.log("Running Game...");
                        const REPLAY: number = 13;
                        if (!this.isPlaying && e.keyCode === REPLAY) {
                            this.app.stage.removeChild(this.p1.sprite);
                            this.app.stage.removeChild(this.p2.sprite);

                            this.app.stage.removeChild(playAgain);
                            this.app.stage.removeChild(orRefresh);

                            this.app.stage.removeChild(this.p1DamageDisplay);
                            this.app.stage.removeChild(this.p2DamageDisplay);
                            this.app.stage.removeChild(this.p1Name);
                            this.app.stage.removeChild(this.p2Name);

                            this.gameOver = false;
                            this.winnerExists = false;

                            this.app.stage.addChild(this.gameBG);
                            this.app.stage.addChild(this.p1DamageDisplay);
                            this.app.stage.addChild(this.p2DamageDisplay);
                            this.app.stage.addChild(this.p1Name);
                            this.app.stage.addChild(this.p2Name);

                            this.p1.sprite.x = this.p1.startX;
                            this.p1.sprite.y = this.p1.startY;
                            if (facingLeft(this.p1.sprite)) {
                                this.p1.sprite.scale.x += -1;
                            }
                            this.p2.sprite.x = this.p2.startX;
                            this.p2.sprite.y = this.p2.startY;
                            if (facingRight(this.p2.sprite)) {
                                this.p2.sprite.scale.x *= -1;
                            }
                            this.app.stage.addChild(this.p1.sprite);
                            this.app.stage.addChild(this.p2.sprite);

                            this.isPlaying = true;
                        }
                    },                      false);

                }

                if (moving(this.p1) || this.p1.shooting || !grounded(this.p1.sprite)) {
                    this.p1.shieldUp = false;
                    this.app.stage.removeChild(this.p1.shield);
                }
                if (moving(this.p2) || this.p2.shooting || !grounded(this.p2.sprite)) {
                    this.p2.shieldUp = false;
                    this.app.stage.removeChild(this.p2.shield);
                }

                // PROJECTILES
                for (let i: number = 0; i < this.magicArr.length; i++) {
                    let magic: Magic = this.magicArr[i];
                    magic.sprite.x += (2 * magic.direction);
                    if (isColliding(this.p2.sprite, magic.sprite)) {
                        if (!this.p2.shieldUp) {
                            this.previousP2Damage = this.p2.damage;
                            if (this.p2.damage <= 999) {
                                this.p2.damage += 2;
                            }
                            if (magic.direction >= 0) { 
                            hitRight(this.p2);
                            } else {
                                hitLeft(this.p2);
                            }
                        }
                        this.app.stage.removeChild(this.magicArr[i].sprite);
                        this.magicArr.splice(i, 1);
                    } else if (isOffScreen(this.magicArr[i].sprite)) {
                        this.app.stage.removeChild(this.magicArr[i].sprite);
                        this.magicArr.splice(i, 1);
                    }
                }

                for (let i: number = 0; i < this.magicArrTwo.length; i++) {
                    let magicTwo: Magic = this.magicArrTwo[i];
                    magicTwo.sprite.x += (2 * magicTwo.direction);
                    if (isColliding(this.p1.sprite, magicTwo.sprite)) {
                        if (!this.p1.shieldUp) {
                            this.previousP1Damage = this.p1.damage;
                            if (this.p1.damage <= 999) {
                                this.p1.damage += 2;
                            }
                            if (magicTwo.direction >= 0) {
                            hitRight(this.p1);
                            } else {
                                hitLeft(this.p1);
                            }
                        }
                        this.app.stage.removeChild(this.magicArrTwo[i].sprite);
                        this.magicArrTwo.splice(i, 1);
                    } else if (isOffScreen(this.magicArrTwo[i].sprite)) {
                        this.app.stage.removeChild(this.magicArrTwo[i].sprite);
                        this.magicArrTwo.splice(i, 1);
                    }
                }

                // DAMAGE DISPLAY
                if (!(this.p1.damage === this.previousP1Damage)) {
                    this.app.stage.removeChild(this.p1DamageDisplay);
                    this.p1DamageDisplay = new PIXI.Text(damageToString(this.p1), damageStyle);
                    this.p1DamageDisplay.x = 300;
                    this.p1DamageDisplay.y = 440;
                    this.app.stage.addChild(this.p1DamageDisplay);
                    }

                if (!(this.p2.damage === this.previousP2Damage)) {
                    this.app.stage.removeChild(this.p2DamageDisplay);
                    this.p2DamageDisplay = new PIXI.Text(damageToString(this.p2), damageStyle);
                    this.p2DamageDisplay.x = 650;
                    this.p2DamageDisplay.y = 440;
                    this.app.stage.addChild(this.p2DamageDisplay);
                    }

                // PLAYER ONE MOVING
                this.p1.sprite.x += (this.A + this.D) * this.speed;
                // this.p1.sprite.y += (S) * speed;
                if (this.p1.vel < 1.5) {
                    this.p1.vel += this.acc;
                } else if (grounded(this.p1.sprite)) {
                    this.p1.vel = 0;
                    this.p1.resetY();
                } else if (underStage(this.p1.sprite)) {
                    this.p1.vel = 0;
                    this.p1.resetLowY();
                } else {
                    this.p1.vel = 1;
                }
                this.p1.sprite.y += this.p1.vel;

                // PLAYER TWO MOVING
                this.p2.sprite.x += (this.left + this.right) * this.speed;
                // this.p2.sprite.y += (down) * speed;
                if (this.p2.vel < 1.5) {
                    this.p2.vel += this.acc;
                } else if (grounded(this.p2.sprite)) {
                    this.p2.vel = 0;
                    this.p2.resetY();
                } else if (underStage(this.p2.sprite)) {
                    this.p2.vel = 0;
                    this.p2.resetLowY();
                } else {
                    this.p2.vel = 1;
                }
                this.p2.sprite.y = this.p2.sprite.y + this.p2.vel;

                // PLAYER ONE RESTRAINTS
                if (grounded(this.p1.sprite)) {
                    this.p1.resetY();
                }
                if (underStage(this.p1.sprite)) {
                    this.p1.resetLowY();
                }
                if (facingLeft(this.p1.sprite)) {
                    if ((this.p1.sprite.y <= 292 && this.p1.sprite.y > 207) && (this.p1.sprite.x > 62 && this.p1.sprite.x <= 64)) {
                        this.p1.leftResetLeft();
                    }
                    if ((this.p1.sprite.y <= 292 && this.p1.sprite.y > 207) && (this.p1.sprite.x < 718 && this.p1.sprite.x >= 716)) {
                        this.p1.leftResetRight();
                    }
                } else {
                    if ((this.p1.sprite.y <= 292 && this.p1.sprite.y > 207) && (this.p1.sprite.x > 135 && this.p1.sprite.x <= 137)) {
                        this.p1.rightResetLeft();
                    }
                    if ((this.p1.sprite.y <= 292 && this.p1.sprite.y > 207) && (this.p1.sprite.x < 788 && this.p1.sprite.x >= 786)) {
                        this.p1.rightResetRight();
                    }
                }

                // PLAYER TWO RESTRAINTS
                if (grounded(this.p2.sprite)) {
                    this.p2.resetY();
                }
                if (underStage(this.p2.sprite)) {
                    this.p2.resetLowY();
                }
                if (facingLeft(this.p2.sprite)) {
                    if ((this.p2.sprite.y >= 207 && this.p2.sprite.y <= 292) && (this.p2.sprite.x > 62 && this.p2.sprite.x <= 64)) {
                        this.p2.leftResetLeft();
                    }
                    if ((this.p2.sprite.y >= 207 && this.p2.sprite.y <= 292) && (this.p2.sprite.x < 718 && this.p2.sprite.x >= 716)) {
                        this.p2.leftResetRight();
                    }
                } else {
                    if ((this.p2.sprite.y <= 292 && this.p2.sprite.y >= 207) && (this.p2.sprite.x > 135 && this.p2.sprite.x <= 137)) {
                        this.p2.rightResetLeft();
                    }
                    if ((this.p2.sprite.y <= 292 && this.p2.sprite.y >= 207) && (this.p2.sprite.x < 788 && this.p2.sprite.x >= 786)) {
                        this.p2.rightResetRight();
                    }
                }
            }
        },                  false);

    } 
}
