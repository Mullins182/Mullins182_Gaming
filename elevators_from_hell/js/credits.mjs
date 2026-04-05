console.log("Module 'credits.mjs' has started !");

import { canvas2, cctx } from "./canvasInit.mjs";
import {
  creditsButton,
  startButton,
  instructButton,
  optionsButton,
  returnBtn,
  homeButton,
} from "./hell10.mjs";

creditsButton.addEventListener("click", function () {
  // Hide the buttons and show the credits
  creditsButton.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  instructButton.style.visibility = "hidden";
  optionsButton.style.visibility = "hidden";
  returnBtn.style.visibility = "hidden";
  homeButton.style.visibility = "hidden";

  canvas2.style.opacity = 0.8;

  // creditsButton.style.opacity = 0;
  // startButton.style.opacity = 0;
  // instructButton.style.opacity = 0;
  // optionsButton.style.opacity = 0;
  // returnBtn.style.opacity = 0;
  initializeCredits();
  requestAnimationFrame(crawler);
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
  "     & giving me inspirations for the Game ;D",
  "",
  "Arne Juergensen",
  "For speeding up the credits crawl & inspiring me too ;D",
  "",
  "John Shramko",
  "The author of the original 1992 released MS - DOS Game",
  "",
  "And very Special Thanks go out to YOU!",
  "for playing the Game ;)",
];

const wheelInstr = new Image();

let crawlSpeed; // Speed of the credits crawl
let textPosY; // Initial position of the text

function initializeCredits() {
  if (!wheelInstr.src) {
    wheelInstr.src = "./assets/img/creditsCrawl.webp";
  }
  crawlSpeed = 0.2;
  textPosY = 0;

  window.addEventListener("wheel", function (event) {
    // deltaY < 0  Mouse wheel up
    // deltaY > 0  Mouse wheel down

    event.deltaY < 0 && crawlSpeed < 1.5
      ? (crawlSpeed += 0.005)
      : event.deltaY > 0 && crawlSpeed > 0.2
        ? (crawlSpeed -= 0.01)
        : null;
  });
}

async function crawler() {
  cctx.clearRect(0, 0, canvas2.width, canvas2.height);

  //   console.log(textPosY);

  cctx.globalAlpha = 0.5;
  cctx.drawImage(wheelInstr, 0, canvas2.height / 15, 250, 150);
  cctx.globalAlpha = 1.0;

  for (let i = 0; i < credit.length; i++) {
    createLabel(
      canvas2.width / 2,
      canvas2.height - textPosY + i * 100,
      credit[i],
      "50px Arial Black",
      "goldenrod",
      "red",
      2,
      4,
      6,
      "strokeText",
      "goldenrod",
      2.3,
    );
  }

  textPosY += crawlSpeed;
  // Continue the animation until the text has scrolled past a certain point
  if (textPosY < 3100) {
    requestAnimationFrame(crawler);
  } else {
    initializeCredits();
    canvas2.style.opacity = 0;
    // creditsButton.style.opacity = 1;
    // startButton.style.opacity = 1;
    // instructButton.style.opacity = 1;
    // optionsButton.style.opacity = 1;
    // returnBtn.style.opacity = 1;
    creditsButton.style.visibility = "visible";
    startButton.style.visibility = "visible";
    instructButton.style.visibility = "visible";
    optionsButton.style.visibility = "visible";
    returnBtn.style.visibility = "visible";
    homeButton.style.visibility = "visible";
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
  strokeLineWidth = 2,
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
