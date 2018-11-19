// To be imported to game script

import {
    Sprite,
} from "pixi.js";

// if player one, flip scale x by negative 1
// player one's x is 225
// player two's x is 240

export let cyrus: Sprite = Sprite.fromImage("./Cyrus_Sprite.png");
cyrus.scale.x = .55;
cyrus.scale.y = .55;
cyrus.y = 205;

export let hannit: Sprite = Sprite.fromImage("./Hannit_Sprite.png");
hannit.scale.x = .5;
hannit.scale.y = .5;
hannit.y = 205;

export let olberic: Sprite = Sprite.fromImage("./Olberic_Sprite.png");
olberic.scale.x = .54;
olberic.scale.y = .54;
olberic.y = 205;

export let primrose: Sprite = Sprite.fromImage("./Primrose_Sprite.png");
primrose.scale.x = .54;
primrose.scale.y = .54;
primrose.y = 205;

export let tressa: Sprite = Sprite.fromImage("./Tressa_Sprite.png");
tressa.scale.x = .54;
tressa.scale.y = .54;
tressa.y = 205;

export let ophelia: Sprite = Sprite.fromImage("./Ophelia_Sprite.png");
ophelia.scale.x = .53;
ophelia.scale.y = .53;
ophelia.y = 205;
// Maybe try to fix Ophelia's scaling without having to change her y

export let therion: Sprite = Sprite.fromImage("./Therion_Sprite.png");
therion.scale.x = .58;
therion.scale.y = .58;
therion.y = 205;

export let alfyn: Sprite = Sprite.fromImage("./Alfyn_Sprite.png");
alfyn.scale.x = .55;
alfyn.scale.y = .55;
alfyn.y = 205;
