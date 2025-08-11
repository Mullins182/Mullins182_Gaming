console.log("Module 'instructions.mjs' has started !");

import { canvas2, cctx } from "./canvasInit.mjs";
import { playerSprite, spriteControl, cabinView } from "./spriteHandling.mjs";
import {
  creditsButton,
  startButton,
  instructButton,
  optionsButton,
  returnBtn,
  staticGameElements,
} from "./hell10.mjs";

let exit = false;
let btnActive = false;
let playerFrame = 0;
let lastFrameTime = 0;
const frameDelay = 120; // Zeit in ms zwischen den Frames

const instructions = [
  "----------- INSTRUCTIONS -----------",
  "Use the left/right arrow keys to run left/right",
  "Use the up/down arrow keys to activate/deactivate buttons, and to enter/leave an elevator",
  "Avoid obstacles and reach the top floor safely!",
  "Good luck!",
];

instructButton.addEventListener("click", function () {
  // Hide the buttons and show the instructions
  creditsButton.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
  instructButton.style.visibility = "hidden";
  optionsButton.style.visibility = "hidden";
  returnBtn.style.visibility = "hidden";

  canvas2.style.opacity = 0.9;
  canvas2.style.zIndex = 10; // Ensure the instructions canvas is on top
  //   cctx.globalAlpha = 0.5;

  creditsButton.style.opacity = 0;
  startButton.style.opacity = 0;
  instructButton.style.opacity = 0;
  optionsButton.style.opacity = 0;
  returnBtn.style.opacity = 0;

  lastFrameTime = 0; // Reset beim Öffnen
  requestAnimationFrame(drawInstructions);

  canvas2.addEventListener("click", function () {
    if (canvas2.style.opacity === "0.9") {
      exit = true;
      creditsButton.style.visibility = "visible";
      startButton.style.visibility = "visible";
      instructButton.style.visibility = "visible";
      optionsButton.style.visibility = "visible";
      returnBtn.style.visibility = "visible";

      canvas2.style.opacity = 0;
      canvas2.style.zIndex = 1; // Reset z-index
      //   cctx.globalAlpha = 1.0;

      creditsButton.style.opacity = 1;
      startButton.style.opacity = 1;
      instructButton.style.opacity = 1;
      optionsButton.style.opacity = 1;
      returnBtn.style.opacity = 1;
    }
  });
});

function drawInstructions(now) {
  cctx.clearRect(0, 0, canvas2.width, canvas2.height);
  cctx.fillStyle = "white";
  cctx.font = "30px Arial";
  cctx.textAlign = "center";
  cctx.textBaseline = "middle";

  cctx.fillText(instructions[0], canvas2.width / 2, 50);
  cctx.fillText(instructions[1], canvas2.width / 2, 170);
  cctx.fillText(instructions[2], canvas2.width / 2, 250);

  // Sprite nur alle frameDelay ms animieren
  if (!lastFrameTime) lastFrameTime = now;
  if (now - lastFrameTime > frameDelay) {
    playerFrame++;
    if (playerFrame >= spriteControl.totalFramesPlayer) playerFrame = 0;
    lastFrameTime = now;
  }
  drawPlayerSprite(playerFrame);
  drawButton(playerFrame, canvas2.width / 8, 240);
  drawLiftCabin(canvas2.width / 1.1, 240);
  drawShaftDoors(canvas2.width / 1.1, 290, 20);

  !exit && requestAnimationFrame(drawInstructions);
}

function drawPlayerSprite(playerFrame) {
  cctx.drawImage(
    playerSprite,
    playerFrame * spriteControl.spriteWidth,
    0,
    spriteControl.spriteWidth,
    spriteControl.spriteHeight,
    canvas2.width / 4,
    80,
    staticGameElements.playerWidth,
    staticGameElements.playerHeight
  );
  playerFrame++;
}

function drawButton(playerFrame, posX, posY) {
  playerFrame < 5 ? (btnActive = false) : (btnActive = true);
  // Plate
  cctx.fillStyle = "#363636";
  cctx.fillRect(posX, posY, 17, 17);

  cctx.fillStyle = btnActive ? "#d4ff00" : "#ff3e00";
  cctx.beginPath();

  // Draw Circle -> (posX, posY, radius, startangle, endangle)
  cctx.arc(posX + 9, posY + 8, 4, 0, 2 * Math.PI);
  cctx.stroke();
  cctx.fill();
}

function drawLiftCabin(posX, posY) {
  cctx.drawImage(
    cabinView,
    posX - staticGameElements.liftsWidth / 2,
    posY - staticGameElements.liftsHeight / 2,
    staticGameElements.liftsWidth,
    staticGameElements.liftsHeight
  );
}

function drawShaftDoors(posX, posY, doorwidth) {
  cctx.fillStyle = "#700";

  cctx.fillRect(
    posX - staticGameElements.liftsWidth / 2,
    posY -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    doorwidth,
    staticGameElements.shaftDoorsHeight
  );

  cctx.fillRect(
    posX +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f0 / 2,
    posY -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    doorwidth,
    staticGameElements.shaftDoorsHeight
  );
}
