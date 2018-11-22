import {
    Application,
    Sprite,
} from "pixi.js";

import {
    startStyle
} from "./fonts-script";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

let startScreen: Sprite = Sprite.fromImage("./Start_Screen.png");
startScreen.scale.x = 34 / 75;
startScreen.scale.y = 34 / 75;
app.stage.addChild(startScreen);

let startMessage = new PIXI.Text("START", startStyle);
startMessage.x = 460;
startMessage.y = 375;
app.stage.addChild(startMessage);

let test = new PIXI.Text("TESTING", startStyle);

window.addEventListener("click", (e: MouseEvent): void  => {
    if (e.x >= 455 && e.x <= 740 && e.y >= 385 && e.y <= 465) {
        console.log("Starting...");
        app.stage.addChild(test);
    }
},                      false);
