import {
    Application,
    Sprite,
    Graphics
} from "pixi.js";

const app: Application = new Application(1024 * .85, 576 * .85);
document.body.appendChild(app.view);

let background: Sprite = Sprite.fromImage("./Start_Screen.png");
background.scale.x = 34 / 75;
background.scale.y = 34 / 75;
app.stage.addChild(background);

let startStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 80,
    fontWeight: "bold",
    fill: ["#000000", "#DE8526"], // gradient
    stroke: "#ffffff",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

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
