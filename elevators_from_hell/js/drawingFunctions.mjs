console.log("Module 'drawingFunctions.mjs' has started !");

import { gameCanvas, ctx } from "./canvasInit.mjs";
import { createLabel } from "./drawLabels.mjs";
import { playerCatched } from "./npcLogic.mjs";

import {
  staticGameElements,
  moveableElems,
  playerOnFloor,
  debugging,
  exitButtonsStatus,
  callElevatorBtnsStatus,
} from "./hell10.mjs";
import {
  spriteControl,
  cabinView,
  playerSprite,
  npcSprite,
  changePlayerSprite,
} from "./spriteHandling.mjs";
import { playerOnLift } from "./playerLogic.mjs";

// ___________________________              ___________________________
// ___________________________   DRAWING    ___________________________
// ___________________________              ___________________________

export function drawLifts() {
  ctx.drawImage(
    cabinView,
    gameCanvas.width * 0.2 - staticGameElements.liftsWidth / 2,
    moveableElems.liftL_YPos,
    staticGameElements.liftsWidth,
    staticGameElements.liftsHeight
  );
  ctx.drawImage(
    cabinView,
    gameCanvas.width * 0.8 - staticGameElements.liftsWidth / 2,
    moveableElems.liftR_YPos,
    staticGameElements.liftsWidth,
    staticGameElements.liftsHeight
  );
}
export function drawLiftDoors() {
  ctx.fillStyle = "#700";

  // Floor 0 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 1.0 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f0,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f0,
    gameCanvas.height * 1.0 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f0,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 0 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 1.0 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f0,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f0,
    gameCanvas.height * 1.0 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f0,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 1 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.875 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f1,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f1,
    gameCanvas.height * 0.875 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f1,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 1 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.875 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f1,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f1,
    gameCanvas.height * 0.875 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f1,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 2 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.75 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f2,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f2,
    gameCanvas.height * 0.75 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f2,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 2 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.75 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f2,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f2,
    gameCanvas.height * 0.75 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f2,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 3 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.625 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f3,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f3,
    gameCanvas.height * 0.625 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f3,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 3 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.625 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f3,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f3,
    gameCanvas.height * 0.625 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f3,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 4 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.5 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f4,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f4,
    gameCanvas.height * 0.5 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f4,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 4 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.5 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f4,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f4,
    gameCanvas.height * 0.5 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f4,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 5 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.375 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f5,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f5,
    gameCanvas.height * 0.375 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f5,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 5 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.375 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f5,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f5,
    gameCanvas.height * 0.375 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f5,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 6 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.25 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f6,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsLW_f6,
    gameCanvas.height * 0.25 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsLW_f6,
    staticGameElements.shaftDoorsHeight
  );

  // Floor 6 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - staticGameElements.liftsWidth / 2,
    gameCanvas.height * 0.25 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f6,
    staticGameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      staticGameElements.liftsWidth / 2 -
      staticGameElements.shaftDoorsRW_f6,
    gameCanvas.height * 0.25 -
      staticGameElements.shaftDoorsHeight -
      staticGameElements.floorsHeight,
    staticGameElements.shaftDoorsRW_f6,
    staticGameElements.shaftDoorsHeight
  );
}
// __________________________________________________ DEBUGGING - CODE __________________________________________________
export function drawDebugLine() {
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(0, debugging.floorLevelSelected, 1600, 3);
  // Entry area left Lift
  ctx.fillRect(
    gameCanvas.width * 0.152 + spriteControl.spriteWidth / 2.7,
    debugging.floorLevelSelected,
    2,
    100
  );
  ctx.fillRect(
    gameCanvas.width * 0.175 + spriteControl.spriteWidth / 1.95,
    debugging.floorLevelSelected,
    2,
    100
  );
  // Entry area right lift
  ctx.fillRect(
    gameCanvas.width * 0.755 + spriteControl.spriteWidth / 2.7,
    debugging.floorLevelSelected,
    2,
    100
  );
  ctx.fillRect(
    gameCanvas.width * 0.775 + spriteControl.spriteWidth / 2.01,
    debugging.floorLevelSelected,
    2,
    100
  );
}
export function drawShaftsElements() {
  // ____________________________ SHAFT TOP ELEMENT ____________________________
  ctx.fillStyle = "#060606";
  // Floor 0
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF0PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF0PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  //Floor 1
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF1PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF1PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  // Floor 2
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF2PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF2PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );

  // Floor 3
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF3PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF3PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );

  // Floor 4
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF4PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF4PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );

  // Floor 5
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF5PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF5PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );

  // Floor 6
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_left,
    staticGameElements.shaftTopF6PosY_left,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );
  ctx.fillRect(
    staticGameElements.shaftTopF0PosX_right,
    staticGameElements.shaftTopF6PosY_right,
    staticGameElements.shaftsWidth,
    staticGameElements.shaftsHeight
  );

  // ____________________________ SHAFT SIDE ELEMENTS ____________________________
  ctx.fillStyle = "#222222";
  // Floor 0 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF0posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF0posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 0 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF0posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF0posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 1 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF1posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF1posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 1 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF1posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF1posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 2 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF2posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF2posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 2 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF2posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF2posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 3 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF3posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF3posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 3 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF3posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF3posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 4 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF4posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF4posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 4 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF4posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF4posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 5 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF5posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF5posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 5 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF5posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF5posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 6 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_left,
    staticGameElements.shaftF6posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_left,
    staticGameElements.shaftF6posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
  // Floor 6 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    staticGameElements.shaftF0LposX_right,
    staticGameElements.shaftF6posY,
    staticGameElements.shaftsLWidth,
    staticGameElements.shaftsLHeight
  );
  ctx.fillRect(
    staticGameElements.shaftF0RposX_right,
    staticGameElements.shaftF6posY,
    staticGameElements.shaftsRWidth,
    staticGameElements.shaftsRHeight
  );
}
export function drawCeiling() {
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.505 - staticGameElements.ceilingWidth / 2,
    gameCanvas.height * 0.105,
    staticGameElements.ceilingWidth,
    staticGameElements.ceilingHeight
  );
}
export function drawWalls() {
  // EXIT-DOOR
  ctx.fillStyle = "#700";
  ctx.fillRect(
    gameCanvas.width * 0.051,
    moveableElems.exitDoorPosY,
    staticGameElements.wallsWidth - 5,
    staticGameElements.exitDoorHeight
  );
  // ____________________
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.05,
    gameCanvas.height * 0.12,
    staticGameElements.wallsWidth,
    staticGameElements.WallsHeight - 130
  );

  ctx.fillRect(
    gameCanvas.width * 0.95,
    gameCanvas.height * 0.12,
    staticGameElements.wallsWidth,
    staticGameElements.WallsHeight
  );
}
export function drawFloors() {
  // Starting with floor 0 =>
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    0,
    staticGameElements.floor0_YPos,
    gameCanvas.width,
    staticGameElements.floorsHeight
  );

  ctx.fillStyle = "#171717";

  ctx.fillRect(
    gameCanvas.width * 0.5 - staticGameElements.floorsWidth / 2,
    staticGameElements.floor1_YPos,
    staticGameElements.floorsWidth,
    staticGameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - staticGameElements.floorsWidth / 2,
    staticGameElements.floor2_YPos,
    staticGameElements.floorsWidth,
    staticGameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - staticGameElements.floorsWidth / 2,
    staticGameElements.floor3_YPos,
    staticGameElements.floorsWidth,
    staticGameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - staticGameElements.floorsWidth / 2,
    staticGameElements.floor4_YPos,
    staticGameElements.floorsWidth,
    staticGameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - staticGameElements.floorsWidth / 2,
    staticGameElements.floor5_YPos,
    staticGameElements.floorsWidth,
    staticGameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - staticGameElements.floorsWidth / 2,
    staticGameElements.floor6_YPos,
    staticGameElements.floorsWidth,
    staticGameElements.floorsHeight
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
export function drawFloorSelectKeys(position) {
  // Y-Positionen für die Kreise vorbereiten
  const circleYPositions = [
    gameCanvas.height * 0.935, // Floor 0
    gameCanvas.height * 0.811, // Floor 1
    gameCanvas.height * 0.685, // Floor 2
    gameCanvas.height * 0.558, // Floor 3
    gameCanvas.height * 0.435, // Floor 4
    gameCanvas.height * 0.31, // Floor 5
    gameCanvas.height * 0.185, // Floor 6
  ];
  // Y-Positionen für die Labels vorbereiten
  const labelYPositions = [
    staticGameElements.floor0_YPos - 50,
    staticGameElements.floor1_YPos - 50,
    staticGameElements.floor2_YPos - 50,
    staticGameElements.floor3_YPos - 50,
    staticGameElements.floor4_YPos - 50,
    staticGameElements.floor5_YPos - 50,
    staticGameElements.floor6_YPos - 50,
  ];
  // Draw Floor Selection Label
  createLabel(
    position === "right" ? gameCanvas.width * 0.93 : gameCanvas.width * 0.08,
    gameCanvas.height * 0.08,
    "Select Floor",
    "25px Arial Black",
    "goldenrod",
    staticGameElements.floorNumbersShadowColor,
    0,
    0,
    0,
    "fillText",
    staticGameElements.floorNumbersColor,
    1.15
  );

  // Draw Circle -> (posX, posY, radius, startangle, endangle)
  circleYPositions.forEach((y, i) => {
    ctx.fillStyle =
      (moveableElems.playerOnLiftL &&
        moveableElems.liftL_calledToFloor === i &&
        (i !== playerOnFloor.floor || moveableElems.liftL_isMoving)) ||
      (moveableElems.playerOnLiftR &&
        moveableElems.liftR_calledToFloor === i &&
        (i !== playerOnFloor.floor || moveableElems.liftR_isMoving))
        ? "#449100ff"
        : "#720000ff";

    ctx.beginPath();
    ctx.arc(
      position === "right" ? gameCanvas.width * 0.98 : gameCanvas.width * 0.03,
      y,
      23,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
  // Draw numbers in circles
  // ctx.fillStyle = "#565656";
  labelYPositions.forEach((y, i) => {
    createLabel(
      position === "right" ? gameCanvas.width * 0.98 : gameCanvas.width * 0.03,
      y,
      i, // Zahl in den Kreis
      "25px Arial Black",
      "greenyellow",
      staticGameElements.floorNumbersShadowColor,
      0,
      0,
      0,
      "fillText",
      staticGameElements.floorNumbersColor,
      1.15
    );
  });
  // console.log("drawFloorSelectKeys() called with position:", position);
}

export function drawPlayer(xPos, yPos, direction) {
  ctx.save();

  if (direction === "left") {
    // Spiegeln für Bewegung nach links
    ctx.scale(-1, 1);
    xPos = -xPos - staticGameElements.playerWidth; // Anpassen der X-Position für gespiegelte Zeichnung
  }

  ctx.drawImage(
    playerSprite,
    spriteControl.currentFramePlayer * spriteControl.spriteWidth,
    0,
    spriteControl.spriteWidth,
    spriteControl.spriteHeight,
    xPos,
    yPos,
    staticGameElements.playerWidth,
    staticGameElements.playerHeight
  );
  // Lift L & R X-Pos middle rect show up
  // ctx.fillRect(gameElements.liftRposXmid, gameElements.floor0_YPos, 10, 10);
  // ctx.fillRect(gameElements.liftLposXmid, gameElements.floor0_YPos, 10, 10);
  if (debugging.showPlayerspriteCenter) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      xPos + staticGameElements.playerWidth / 2,
      gameCanvas.height - 50,
      5,
      5
    );
  }

  ctx.restore();

  if (debugging.showPlayerspriteCenter) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      xPos + staticGameElements.playerWidth / 2,
      gameCanvas.height - 50,
      5,
      5
    );
  }
}
export function drawNPC(xPos, yPos, direction) {
  ctx.save();

  if (direction === "r") {
    ctx.scale(-1, 1);
    xPos =
      -xPos -
      (staticGameElements.npcWidth +
        staticGameElements.npcXaxisMirroringOffset);
  }

  if (!playerCatched) {
    ctx.drawImage(
      npcSprite,
      spriteControl.currentFrameNpc * 512,
      0,
      512,
      380,
      xPos,
      yPos,
      staticGameElements.npcWidth,
      staticGameElements.npcHeight
    );
  } else {
    ctx.drawImage(
      npcSprite,
      (spriteControl.currentFrameNpc + 11) * 512,
      0,
      512,
      380,
      xPos,
      yPos,
      staticGameElements.npcWidth,
      staticGameElements.npcHeight
    );
  }

  if (debugging.showNpcRange) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(xPos, yPos + (staticGameElements.npcHeight / 2 - 5), 5, 5);
  }
  ctx.restore();

  if (debugging.showNpcRange) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(xPos, yPos + (staticGameElements.npcHeight / 2 - 5), 5, 5);
  }
}

export function drawGameOverImg() {
  ctx.drawImage(defeatImg, 0, 0, 350, 300);
}
