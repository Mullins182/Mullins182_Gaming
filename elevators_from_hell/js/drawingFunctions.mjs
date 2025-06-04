console.log("Module 'drawingFunctions.mjs' has started !");

import {
  gameElements,
  flexElemsPosInit,
  debugging,
  exitButtonsStatus,
  callElevatorBtnsStatus,
} from "./hell10.mjs";
import {
  cabinView,
  playerSprite,
  npcSprite,
  changePlayerSprite,
} from "./spriteHandling.mjs";
import { spriteControl } from "./spriteHandling.mjs";
import { gameCanvas, ctx } from "./canvasInit.mjs";
import { drawLabels } from "./drawLabels.mjs";

// ___________________________              ___________________________
// ___________________________   DRAWING    ___________________________
// ___________________________              ___________________________

export function drawLifts() {
  // ctx.fillStyle = "#f4ff51";
  // ctx.fillRect(
  //   gameCanvas.width * 0.2 - gameElements.liftsWidth / 2,
  //   moveableElems.liftL_YPos,
  //   gameElements.liftsWidth,
  //   gameElements.liftsHeight
  // );
  ctx.drawImage(
    cabinView,
    gameCanvas.width * 0.2 - gameElements.liftsWidth / 2,
    flexElemsPosInit.liftL_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );
  ctx.drawImage(
    cabinView,
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
    flexElemsPosInit.liftR_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );

  // ctx.fillRect(
  //   gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
  //   moveableElems.liftR_YPos,
  //   gameElements.liftsWidth,
  //   gameElements.liftsHeight
  // );
}
export function drawLiftDoors() {
  ctx.fillStyle = "#700";

  // Floor 0 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f0,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f0,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f0,
    gameElements.shaftDoorsHeight
  );

  // Floor 0 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f0,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f0,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f0,
    gameElements.shaftDoorsHeight
  );

  // Floor 1 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f1,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f1,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f1,
    gameElements.shaftDoorsHeight
  );

  // Floor 1 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f1,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f1,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f1,
    gameElements.shaftDoorsHeight
  );

  // Floor 2 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f2,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f2,
    gameElements.shaftDoorsHeight
  );

  // Floor 2 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f2,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f2,
    gameElements.shaftDoorsHeight
  );

  // Floor 3 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f3,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f3,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f3,
    gameElements.shaftDoorsHeight
  );

  // Floor 3 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f3,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f3,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f3,
    gameElements.shaftDoorsHeight
  );

  // Floor 4 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f4,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f4,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f4,
    gameElements.shaftDoorsHeight
  );

  // Floor 4 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f4,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f4,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f4,
    gameElements.shaftDoorsHeight
  );

  // Floor 5 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f5,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f5,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f5,
    gameElements.shaftDoorsHeight
  );

  // Floor 5 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f5,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f5,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f5,
    gameElements.shaftDoorsHeight
  );

  // Floor 6 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f6,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f6,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f6,
    gameElements.shaftDoorsHeight
  );

  // Floor 6 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f6,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f6,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f6,
    gameElements.shaftDoorsHeight
  );
}
// __________________________________________________ DEBUGGING - CODE __________________________________________________
export function drawDebugLine() {
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(0, debugging.floorLevelSelected, 1600, 3);
}
export function drawShaftsElements() {
  // ____________________________ SHAFT TOP ELEMENT ____________________________
  ctx.fillStyle = "#060606";
  // Floor 0
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF0PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF0PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  //Floor 1
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF1PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF1PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  // Floor 2
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF2PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF2PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 3
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF3PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF3PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 4
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF4PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF4PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 5
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF5PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF5PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 6
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF6PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF6PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // ____________________________ SHAFT SIDE ELEMENTS ____________________________
  ctx.fillStyle = "#222222";
  // Floor 0 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF0posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF0posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 0 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF0posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF0posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 1 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF1posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF1posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 1 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF1posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF1posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 2 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF2posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF2posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 2 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF2posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF2posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 3 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF3posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF3posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 3 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF3posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF3posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 4 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF4posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF4posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 4 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF4posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF4posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 5 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF5posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF5posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 5 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF5posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF5posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 6 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF6posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF6posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 6 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF6posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF6posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
}
export function drawCeiling() {
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.505 - gameElements.ceilingWidth / 2,
    gameCanvas.height * 0.105,
    gameElements.ceilingWidth,
    gameElements.ceilingHeight
  );
}
export function drawWalls() {
  // EXIT-DOOR
  ctx.fillStyle = "#700";
  ctx.fillRect(
    gameCanvas.width * 0.051,
    flexElemsPosInit.exitDoorPosY,
    gameElements.wallsWidth - 5,
    gameElements.exitDoorHeight
  );
  // ____________________
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.05,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight - 130
  );

  ctx.fillRect(
    gameCanvas.width * 0.95,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight
  );
}
export function drawFloors() {
  // Starting with floor 0 =>
  ctx.fillStyle = "#373737";
  gameElements.floorsWidth += 500;
  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor0_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillStyle = "#171717";
  gameElements.floorsWidth -= 500;

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor1_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor2_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor3_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor4_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor5_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor6_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );
}
export function drawCallElevatorBtns(
  platePosX,
  platePosY,
  triPosx,
  triUpPosY,
  triDwnPosY,
  btnActive,
  floor
) {
  // Plate
  ctx.fillStyle = "#363636";
  ctx.fillRect(platePosX, platePosY, 20, 35);

  if (floor === 0) {
    // Upper Button
    btnActive === 1
      ? drawTriangle(triPosx, triUpPosY, 12, "lime", "up")
      : drawTriangle(triPosx, triUpPosY, 12, "darkred", "up");
    return;
  }

  if (floor === 6) {
    btnActive === 2
      ? drawTriangle(triPosx, triDwnPosY, 12, "lime", "down")
      : drawTriangle(triPosx, triDwnPosY, 12, "darkred", "down");
    return;
  }

  // Upper Button
  btnActive === 1
    ? drawTriangle(triPosx, triUpPosY, 12, "lime", "up")
    : drawTriangle(triPosx, triUpPosY, 12, "darkred", "up");
  // Lower Button
  btnActive === 2
    ? drawTriangle(triPosx, triDwnPosY, 12, "lime", "down")
    : drawTriangle(triPosx, triDwnPosY, 12, "darkred", "down");
  // Both Buttons
  if (btnActive === 3) {
    drawTriangle(triPosx, triUpPosY, 12, "lime", "up");
    drawTriangle(triPosx, triDwnPosY, 12, "lime", "down");
  }
}
export function drawExitButtons(
  platePosX,
  platePosY,
  btnPosX,
  btnPosY,
  btnActivated
) {
  // Plate
  ctx.fillStyle = "#363636";
  ctx.fillRect(platePosX, platePosY, 17, 17);

  ctx.fillStyle = btnActivated ? "#d4ff00" : "#ff3e00";
  ctx.beginPath();

  // Draw Circle -> (posX, posY, radius, startangle, endangle)
  ctx.arc(btnPosX, btnPosY, 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function drawTriangle(posX, posY, width, fillColor, dir) {
  if (dir == "down") {
    ctx.beginPath();
    ctx.moveTo(posX, posY); // Erster Eckpunkt
    ctx.lineTo(posX + width, posY); // Zweiter Eckpunkt
    ctx.lineTo(posX + width / 2, posY + width / 1.5); // Dritter Eckpunkt
    ctx.closePath(); // Pfad schließen (zurück zum Startpunkt)
  }
  if (dir == "up") {
    ctx.beginPath();
    ctx.moveTo(posX + width / 2, posY); // Erster Eckpunkt
    ctx.lineTo(posX, posY + width / 1.5); // Zweiter Eckpunkt
    ctx.lineTo(posX + width, posY + width / 1.5); // Dritter Eckpunkt
    ctx.closePath(); // Pfad schließen (zurück zum Startpunkt)
  }
  ctx.stroke(); // Linien zeichnen
  ctx.fillStyle = fillColor;
  ctx.fill(); // Optional: Dreieck ausfüllen
}
export function drawPlayer(xPos, yPos, direction) {
  ctx.save();

  if (direction === "left") {
    // Spiegeln für Bewegung nach links
    ctx.scale(-1, 1);
    xPos = -xPos - gameElements.playerWidth; // Anpassen der X-Position für gespiegelte Zeichnung
  }

  ctx.drawImage(
    playerSprite,
    spriteControl.currentFramePlayer * spriteControl.spriteWidth,
    0,
    spriteControl.spriteWidth,
    spriteControl.spriteHeight,
    xPos,
    yPos,
    gameElements.playerWidth,
    gameElements.playerHeight
  );
  // Lift L & R X-Pos middle rect show up
  // ctx.fillRect(gameElements.liftRposXmid, gameElements.floor0_YPos, 10, 10);
  // ctx.fillRect(gameElements.liftLposXmid, gameElements.floor0_YPos, 10, 10);

  ctx.restore();
}
export function drawNPC(xPos, yPos, direction) {
  ctx.save();

  if (direction === "r") {
    ctx.scale(-1, 1);
    xPos =
      -xPos - (gameElements.npcWidth + gameElements.npcXaxisMirroringOffset);
  }

  ctx.drawImage(
    npcSprite,
    spriteControl.currentFrameNpc * 512,
    0,
    512,
    380,
    xPos,
    yPos,
    gameElements.npcWidth,
    gameElements.npcHeight
  );

  if (debugging.showNpcRange) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(xPos, yPos + (gameElements.npcHeight / 2 - 5), 5, 5);
  }
  ctx.restore();
}

export function drawTitleScreen() {
  // Frame-Update
  // spriteControl.currentFramePlayer = 5;
  changePlayerSprite("stop");
  drawLifts();
  drawCeiling();
  drawFloors();
  drawWalls();
  flexElemsPosInit.npcOnLiftL
    ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "r")
    : flexElemsPosInit.npcOnLiftR
    ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "l")
    : null;
  drawLiftDoors();
  drawShaftsElements();
  for (let i = 0; i < 7; i++) {
    drawCallElevatorBtns(
      gameCanvas.width / 2,
      gameElements[`floor${i}_YPos`] - 63,
      gameElements.callElevatorBtnsXpos,
      gameElements[`floor${i}_YPos`] - 55,
      gameElements[`floor${i}_YPos`] - 43,
      callElevatorBtnsStatus[`floor${i}`],
      i
    );

    drawExitButtons(
      gameCanvas.width / 1.94,
      gameElements[`floor${i}_YPos`] - 52,
      gameElements.exitBtnsXpos,
      gameElements[`floor${i}_YPos`] - 43,
      exitButtonsStatus[`floor${i}`] ? true : false
    );
  }
  drawPlayer(500, 500, "l");
  !flexElemsPosInit.npcOnLiftL && !flexElemsPosInit.npcOnLiftR
    ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "l")
    : null;
  drawLabels();
}
