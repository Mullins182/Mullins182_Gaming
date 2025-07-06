console.log("Module 'credits.mjs' has started !");

import { credits, cctx } from "./canvasInit.mjs";
import {
  creditsButton,
  startButton,
  optionsButton,
  returnBtn,
} from "./hell10.mjs";

creditsButton.addEventListener("click", function () {
  // Hide the buttons and show the credits
  // deltaY < 0  Mouse wheel up
  // deltaY > 0  Mouse wheel down
  creditsButton.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  optionsButton.style.visibility = "hidden";
  returnBtn.style.visibility = "hidden";

  credits.style.opacity = 0.8;

  creditsButton.style.opacity = 0;
  startButton.style.opacity = 0;
  optionsButton.style.opacity = 0;
  returnBtn.style.opacity = 0;
  requestAnimationFrame(crawler);
});

window.addEventListener("wheel", function (event) {
  event.deltaY < 0 && crawlSpeed < 7
    ? (crawlSpeed += 0.03)
    : event.deltaY > 0 && crawlSpeed >= 0.5
    ? (crawlSpeed -= 0.03)
    : null;
});

const credit = [
  "----------- CREDITS -----------",
  "",
  "I wish to thank the following . . .",
  "",
  "Pixabay.com",
  "For Providing the Soundeffects for the Game",
  "",
  "pngwing.com",
  "For Providing the Sprites in the Game",
  "",
  "Abed Sebahi",
  "For being 'mr.zero' aka 'my_very_best_beta_tester :D",
  "",
  "Arne Juergensen",
  "For speeding up the credits crawl &",
  "giving me inspirations for the Game ;D",
  "",
  "The author of the original, 1992 released MS-DOS Game",
  "",
  "And very Special Thanks go out to YOU!",
  "for playing the Game ;)",
];

const wheelInstr = new Image();
wheelInstr.src = "./assets/img/creditsCrawl.png";

let crawlSpeed = 0.5; // Speed of the credits crawl
let textPosY = 0; // Initial position of the text

async function crawler() {
  cctx.clearRect(0, 0, credits.width, credits.height);

  //   console.log(textPosY);

  cctx.globalAlpha = 0.5;
  cctx.drawImage(wheelInstr, 50, credits.height / 15, 120, 200);
  cctx.globalAlpha = 1.0;

  for (let i = 0; i < credit.length; i++) {
    createLabel(
      credits.width / 2,
      credits.height - textPosY + i * 100,
      credit[i],
      "50px Arial Black",
      "goldenrod",
      "red",
      2,
      4,
      6,
      "strokeText",
      "goldenrod",
      2.3
    );
  }

  textPosY += crawlSpeed;
  if (textPosY < 3000) {
    requestAnimationFrame(crawler);
  } else {
    credits.style.opacity = 0;
    creditsButton.style.opacity = 1;
    startButton.style.opacity = 1;
    optionsButton.style.opacity = 1;
    returnBtn.style.opacity = 1;
    textPosY = 0;
    creditsButton.style.visibility = "visible";
    startButton.style.visibility = "visible";
    optionsButton.style.visibility = "visible";
    returnBtn.style.visibility = "visible";
  }
}

function createLabel(
  xPos,
  yPos,
  text,
  font,
  color,
  shadowColor = "rgba(0,0,0,0.5)",
  shadowBlur = 4,
  shadowOffsetX = 2,
  shadowOffsetY = 2,
  textStyle = "fillText",
  strokeColor = "goldenrod",
  strokeLineWidth = 2
) {
  // Schriftart und -größe festlegen
  cctx.font = font;

  // Textausrichtung festlegen
  cctx.textAlign = "center";
  cctx.textBaseline = "middle";

  // Textschatten konfigurieren
  cctx.shadowColor = shadowColor;
  cctx.shadowBlur = shadowBlur;
  cctx.shadowOffsetX = shadowOffsetX;
  cctx.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  cctx.fillStyle = color;

  // Text Style
  cctx.strokeStyle = strokeColor; // Randfarbe
  cctx.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    cctx.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    cctx.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  cctx.shadowColor = "rgba(0,0,0,0)";
  cctx.shadowBlur = 0;
  cctx.shadowOffsetX = 0;
  cctx.shadowOffsetY = 0;
}
