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
let btnActive = 0; // Green-Draw of Btns -> 0 = none, 1 = up, 2 = down, 3 = both
let playerFrame = 0;
let lastFrameTime = 0;
const frameDelay = 200; // Zeit in ms zwischen den Frames

const instructions = [
  "----------- INSTRUCTIONS -----------",
  "Use the left/right arrow keys to run left/right",
  "Use the up/down arrow keys to activate/deactivate buttons, and to enter/leave an elevator",
  "When you are in an elevator, press the num keys 0-6 to select a floor",
  "The Security Bot is hunting you, so be quick!",
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
  exit = false; // Reset exit state

  requestAnimationFrame(drawInstructions);
});

canvas2.addEventListener("click", function () {
  if (canvas2.style.opacity === "0.9") {
    exit = true; // Set exit state
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

function drawInstructions(now) {
  cctx.clearRect(0, 0, canvas2.width, canvas2.height);
  cctx.fillStyle = "white";
  cctx.font = "30px Arial";
  cctx.textAlign = "center";
  cctx.textBaseline = "middle";

  cctx.fillText(instructions[0], canvas2.width / 2, 50);
  cctx.fillText(instructions[1], canvas2.width / 2, 170);
  cctx.fillText(instructions[2], canvas2.width / 2, 250);
  cctx.fillText(instructions[3], canvas2.width / 2, 330);
  cctx.fillText(instructions[4], canvas2.width / 2, 410);
  cctx.fillText(instructions[5], canvas2.width / 2, 490);

  // Sprite nur alle frameDelay ms animieren
  if (!lastFrameTime) lastFrameTime = now;
  if (now - lastFrameTime > frameDelay) {
    playerFrame++;
    if (playerFrame >= spriteControl.totalFramesPlayer) playerFrame = 0;
    lastFrameTime = now;
    btnActive++;
    btnActive = btnActive === 3 ? 0 : btnActive;
  }

  drawPlayerSprite(playerFrame);
  drawButton(canvas2.width / 9, 240);
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
}

function drawTriangle(posX, posY, width, fillColor, dir) {
  if (dir == "down") {
    cctx.beginPath();
    cctx.moveTo(posX, posY); // Erster Eckpunkt
    cctx.lineTo(posX + width, posY); // Zweiter Eckpunkt
    cctx.lineTo(posX + width / 2, posY + width / 1.5); // Dritter Eckpunkt
    cctx.closePath(); // Pfad schließen (zurück zum Startpunkt)
  }
  if (dir == "up") {
    cctx.beginPath();
    cctx.moveTo(posX + width / 2, posY); // Erster Eckpunkt
    cctx.lineTo(posX, posY + width / 1.5); // Zweiter Eckpunkt
    cctx.lineTo(posX + width, posY + width / 1.5); // Dritter Eckpunkt
    cctx.closePath(); // Pfad schließen (zurück zum Startpunkt)
  }
  cctx.stroke(); // Linien zeichnen
  cctx.fillStyle = fillColor;
  cctx.fill(); // Optional: Dreieck ausfüllen
}

function drawButton(posX, posY) {
  // Call Lift Buttons

  // Plate
  cctx.fillStyle = "#363636";
  cctx.fillRect(posX, posY - 17, 20, 35);

  // Upper Button
  btnActive === 1
    ? drawTriangle(posX + 3, posY - 10, 15, "lime", "up")
    : drawTriangle(posX + 3, posY - 10, 15, "darkred", "up");
  // Lower Button
  btnActive === 2
    ? drawTriangle(posX + 3, posY + 2.5, 15, "lime", "down")
    : drawTriangle(posX + 3, posY + 2.5, 15, "darkred", "down");
  // Both Buttons
  if (btnActive === 3) {
    drawTriangle(posX + 3, posY, 15, "lime", "up");
    drawTriangle(posX + 3, posY, 15, "lime", "down");
  }

  // Exit Button

  // Plate
  cctx.fillStyle = "#363636";
  cctx.fillRect(posX - 25, posY, 17, 17);

  cctx.fillStyle = btnActive ? "#d4ff00" : "#ff3e00";
  cctx.beginPath();

  // Draw Circle -> (posX, posY, radius, startangle, endangle)
  cctx.arc(posX - 25 + 9, posY + 8, 4, 0, 2 * Math.PI);
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
