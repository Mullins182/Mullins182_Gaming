console.log("Module 'credits.mjs' has started !");

import { canvas2, cctx } from "./canvasInit.mjs";
import {
  createButton,
  creditsButton,
  startButton,
  instructButton,
  optionsButton,
  returnBtn,
  homeButton,
  canvas2_fadeoutBtn,
} from "./hell10.mjs";

const optionsLabels = ["| Soundeffects |", "| Music |"];
const options = ["On", "On"];

let crawlDirection;
let crawlSpeed = 2.33; // Speed of the credits crawl
let textPosY = -100; // Initial position of the text
let optionsTextPos = 605; // Position where the text should stop

optionsButton.addEventListener("click", function () {
  if (textPosY > -100 && textPosY < optionsTextPos) {
    return;
  }
  options_init();
  requestAnimationFrame(crawler);
});

function options_init() {
  crawlDirection = "in";
  textPosY = -100;
  canvas2_fadeoutBtn.addEventListener("click", function () {
    if (textPosY < optionsTextPos) {
      return;
    }
    canvas2.style.opacity = 0;
    removeOptionsBtns();
    toggleMenuBtnsVisibility();
    crawlDirection = "out";
    requestAnimationFrame(crawler);
  });

  toggleMenuBtnsVisibility();
  canvas2.style.opacity = 0.95;
  canvas2_fadeoutBtn.style.opacity = 1;
}

async function crawler() {
  cctx.clearRect(0, 0, canvas2.width, canvas2.height);

  //   console.log(textPosY);

  cctx.globalAlpha = 1.0;

  for (let i = 0; i < optionsLabels.length; i++) {
    createLabel(
      canvas2.width / 2,
      canvas2.height - textPosY + i * 100,
      optionsLabels[i],
      "30px Arial Black",
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

  if (crawlDirection === "in") {
    textPosY += crawlSpeed;
    // Continue the animation until the text has scrolled past a certain point
    if (textPosY < optionsTextPos) {
      requestAnimationFrame(crawler);
    } else {
      createOptionsBtns();
    }
  } else if (crawlDirection === "out") {
    textPosY -= crawlSpeed;
    if (textPosY > -100) {
      requestAnimationFrame(crawler);
    }
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

function createOptionsBtns() {
  for (let i = 0; i < options.length; i++) {
    const optionBtn = document.createElement("button");
    createButton(optionBtn);
    optionBtn.textContent = options[i];
    optionBtn.style.position = "absolute";
    optionBtn.style.left = "60%";
    optionBtn.style.top =
      i === 0
        ? "30%"
        : i === 1
          ? "41%"
          : i === 2
            ? "51.5%"
            : i === 3
              ? "62%"
              : "73%";

    optionBtn.id = `optionBtn${i}`;
    optionBtn.addEventListener("click", function () {
      optionBtn.textContent =
        optionBtn.textContent === "On"
          ? "Off"
          : optionBtn.textContent === "Off"
            ? "On"
            : optionBtn.textContent === "arrow keys"
              ? "wasd keys"
              : "arrow keys";
    });
    document.body.appendChild(optionBtn);
  }
}

function removeOptionsBtns() {
  for (let i = 0; i < options.length; i++) {
    document.body.removeChild(document.getElementById(`optionBtn${i}`));
  }
}

function toggleMenuBtnsVisibility() {
  if (startButton.style.visibility === "hidden") {
    creditsButton.style.visibility = "visible";
    startButton.style.visibility = "visible";
    instructButton.style.visibility = "visible";
    optionsButton.style.visibility = "visible";
    canvas2_fadeoutBtn.style.visibility = "hidden";
    returnBtn.style.visibility = "visible";
    homeButton.style.visibility = "visible";
  } else {
    creditsButton.style.visibility = "hidden";
    startButton.style.visibility = "hidden";
    instructButton.style.visibility = "hidden";
    optionsButton.style.visibility = "hidden";
    canvas2_fadeoutBtn.style.visibility = "visible";
    returnBtn.style.visibility = "hidden";
    homeButton.style.visibility = "hidden";
  }
}
