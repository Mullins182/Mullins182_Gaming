console.log("Module 'drawLabels.mjs' has started !");

import { gameCanvas, ctx } from "./canvasInit.mjs";

import {
  gameVersion,
  staticGameElements,
  debugging,
  moveableElems,
} from "./hell10.mjs";

import { playerCatched } from "./npcLogic.mjs";
import { playerEscaped } from "./playerLogic.mjs";

export function drawLabels() {
  // EXIT SIGN
  createLabel(
    185,
    gameCanvas.height - 75,
    "EXIT",
    "33px Arial Black",
    "gold",
    staticGameElements.exitSignShadowColor,
    2,
    7,
    20,
    "strokeText",
    staticGameElements.exitSignColor,
    1.6
  );

  if (debugging.debugMode) {
    let playerOnLift =
      moveableElems.playerOnLiftR || moveableElems.playerOnLiftL ? true : false;

    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "<NPC X-Pos> " +
        (moveableElems.npcPosX < 1000 ? "  " : "") +
        moveableElems.npcPosX.toFixed(0) +
        " <NPC Y-Pos> " +
        (moveableElems.npcPosY < 1000 ? "  " : "") +
        moveableElems.npcPosY.toFixed(0),
      "63px Arial Black",
      "gold",
      "black",
      3,
      8,
      17,
      "strokeText",
      "gold",
      3
    );
  } else if (playerCatched) {
    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "YOU GOT TOASTED !!!",
      "63px Arial Black",
      "red",
      "black",
      3,
      8,
      17,
      "strokeText",
      "red",
      2
    );
  } else if (playerEscaped) {
    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "YOU ESCAPED THE BUILDING ... CONGRATS :)",
      "63px Arial Black",
      "greenyellow",
      "black",
      3,
      8,
      17,
      "strokeText",
      "greenyellow",
      2
    );
  } else {
    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "ELEVATORS FROM HELL",
      "63px Arial Black",
      "goldenrod",
      "black",
      3,
      8,
      17,
      "strokeText",
      "goldenrod",
      2
    );
    createLabel(
      gameCanvas.width / 1.29,
      gameCanvas.height * 0.085,
      gameVersion,
      "15px Arial Black",
      "darkgoldenrod",
      "black",
      3,
      8,
      17,
      "fillText",
      "darkgoldenrod",
      2
    );
  }
  // Floor Numbers for each Floor
  for (let i = 0; i < 7; i++) {
    createLabel(
      gameCanvas.width * 0.37,
      i === 0
        ? staticGameElements.floor0_YPos - 75
        : i === 1
        ? staticGameElements.floor1_YPos - 75
        : i === 2
        ? staticGameElements.floor2_YPos - 75
        : i === 3
        ? staticGameElements.floor3_YPos - 75
        : i === 4
        ? staticGameElements.floor4_YPos - 75
        : i === 5
        ? staticGameElements.floor5_YPos - 75
        : staticGameElements.floor6_YPos - 75,
      "Floor " + i,
      "25px Arial Black",
      "black",
      staticGameElements.floorNumbersShadowColor,
      2.25,
      6,
      6,
      "strokeText",
      staticGameElements.floorNumbersColor,
      1.15
    );
  }
  // Left Shaft Lift Position Display
  for (let i = 0; i < 7; i++) {
    createLabel(
      moveableElems.liftL_isOnFloor === 0
        ? gameCanvas.width * 0.18
        : moveableElems.liftL_isOnFloor === 1
        ? gameCanvas.width * 0.18 + 13
        : moveableElems.liftL_isOnFloor === 2
        ? gameCanvas.width * 0.18 + 23
        : moveableElems.liftL_isOnFloor === 3
        ? gameCanvas.width * 0.18 + 33
        : moveableElems.liftL_isOnFloor === 4
        ? gameCanvas.width * 0.18 + 43
        : moveableElems.liftL_isOnFloor === 5
        ? gameCanvas.width * 0.18 + 53
        : gameCanvas.width * 0.18 + 63,
      i === 0
        ? staticGameElements.floor0_YPos - 100
        : i === 1
        ? staticGameElements.floor1_YPos - 100
        : i === 2
        ? staticGameElements.floor2_YPos - 100
        : i === 3
        ? staticGameElements.floor3_YPos - 100
        : i === 4
        ? staticGameElements.floor4_YPos - 100
        : i === 5
        ? staticGameElements.floor5_YPos - 100
        : staticGameElements.floor6_YPos - 95,

      moveableElems.liftL_isOnFloor == 0 ? "E" : moveableElems.liftL_isOnFloor,
      "14px Arial Black",
      "orange",
      "transparent",
      0,
      0,
      0,
      "fillText",
      "greenyellow",
      1.6
    );
  }
  // Right Shaft Lift Position Display
  for (let i = 0; i < 7; i++) {
    createLabel(
      moveableElems.liftR_isOnFloor === 0
        ? gameCanvas.width * 0.78
        : moveableElems.liftR_isOnFloor === 1
        ? gameCanvas.width * 0.78 + 13
        : moveableElems.liftR_isOnFloor === 2
        ? gameCanvas.width * 0.78 + 23
        : moveableElems.liftR_isOnFloor === 3
        ? gameCanvas.width * 0.78 + 33
        : moveableElems.liftR_isOnFloor === 4
        ? gameCanvas.width * 0.78 + 43
        : moveableElems.liftR_isOnFloor === 5
        ? gameCanvas.width * 0.78 + 53
        : gameCanvas.width * 0.78 + 63,
      i === 0
        ? staticGameElements.floor0_YPos - 100
        : i === 1
        ? staticGameElements.floor1_YPos - 100
        : i === 2
        ? staticGameElements.floor2_YPos - 100
        : i === 3
        ? staticGameElements.floor3_YPos - 100
        : i === 4
        ? staticGameElements.floor4_YPos - 100
        : i === 5
        ? staticGameElements.floor5_YPos - 100
        : staticGameElements.floor6_YPos - 95,
      moveableElems.liftR_isOnFloor == 0 ? "E" : moveableElems.liftR_isOnFloor,
      "14px Arial Black",
      "orange",
      "transparent",
      0,
      0,
      0,
      "fillText",
      "greenyellow",
      1.6
    );
  }
}

export function createLabel(
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
  ctx.font = font;

  // Textausrichtung festlegen
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Textschatten konfigurieren
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  ctx.fillStyle = color;

  // Text Style
  ctx.strokeStyle = strokeColor; // Randfarbe
  ctx.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    ctx.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    ctx.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
