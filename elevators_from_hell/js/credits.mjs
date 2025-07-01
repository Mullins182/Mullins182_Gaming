console.log("Module 'credits.mjs' has started !");

import { credits, cctx } from "./canvasInit.mjs";
import {
  creditsButton,
  startButton,
  optionsButton,
  returnBtn,
} from "./hell10.mjs";

creditsButton.addEventListener("click", function () {
  credits.style.opacity = 0.8;
  creditsButton.style.opacity = 0.05;
  startButton.style.opacity = 0.05;
  optionsButton.style.opacity = 0.05;
  returnBtn.style.opacity = 0.05;
  requestAnimationFrame(runCredits);
});

const credit = [
  "----------- CREDITS -----------",
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
  "The author of the original, 1992 released MS-DOS Game",
  "",
  "And very Special Thanks go out to YOU!",
  "for playing my Game ;)",
];

let textPosY = 0;

async function runCredits() {
  cctx.clearRect(0, 0, credits.width, credits.height);

  //   console.log(textPosY);

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

  ++textPosY;
  await new Promise((resolve) => setTimeout(resolve, 30));
  if (textPosY < 2400) {
    requestAnimationFrame(runCredits);
  } else {
    credits.style.opacity = 0;
    creditsButton.style.opacity = 1;
    startButton.style.opacity = 1;
    optionsButton.style.opacity = 1;
    returnBtn.style.opacity = 1;
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
