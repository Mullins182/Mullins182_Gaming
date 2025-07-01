console.log("Module 'drawLabels.mjs' has started !");

import { gameCanvas, ctx } from "./canvasInit.mjs";

import {
  gameVersion,
  gameElements,
  playerOnFloor,
  npcOnFloor,
  debugging,
  flexElemsPosInit,
} from "./hell10.mjs";

import { playerCatched } from "./npcLogic.mjs";

export function drawLabels() {
  // EXIT SIGN
  createLabel(
    185,
    gameCanvas.height - 75,
    "EXIT",
    "33px Arial Black",
    "gold",
    gameElements.exitSignShadowColor,
    2,
    7,
    20,
    "strokeText",
    gameElements.exitSignColor,
    1.6
  );

  if (debugging.debugMode) {
    let playerOnLift =
      flexElemsPosInit.playerOnLiftR || flexElemsPosInit.playerOnLiftL
        ? true
        : false;

    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "<NPC X-Pos> " +
        (flexElemsPosInit.npcPosX < 1000 ? "  " : "") +
        flexElemsPosInit.npcPosX.toFixed(0) +
        " <NPC Y-Pos> " +
        (flexElemsPosInit.npcPosY < 1000 ? "  " : "") +
        flexElemsPosInit.npcPosY.toFixed(0),
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
      gameCanvas.width / 1.3,
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
        ? gameElements.floor0_YPos - 75
        : i === 1
        ? gameElements.floor1_YPos - 75
        : i === 2
        ? gameElements.floor2_YPos - 75
        : i === 3
        ? gameElements.floor3_YPos - 75
        : i === 4
        ? gameElements.floor4_YPos - 75
        : i === 5
        ? gameElements.floor5_YPos - 75
        : gameElements.floor6_YPos - 75,
      "Floor " + i,
      "25px Arial Black",
      "black",
      gameElements.floorNumbersShadowColor,
      2.25,
      6,
      6,
      "strokeText",
      gameElements.floorNumbersColor,
      1.15
    );
  }
  // Left Shaft Lift Position Display
  for (let i = 0; i < 7; i++) {
    createLabel(
      flexElemsPosInit.liftL_isOnFloor === 0
        ? gameCanvas.width * 0.18
        : flexElemsPosInit.liftL_isOnFloor === 1
        ? gameCanvas.width * 0.18 + 13
        : flexElemsPosInit.liftL_isOnFloor === 2
        ? gameCanvas.width * 0.18 + 23
        : flexElemsPosInit.liftL_isOnFloor === 3
        ? gameCanvas.width * 0.18 + 33
        : flexElemsPosInit.liftL_isOnFloor === 4
        ? gameCanvas.width * 0.18 + 43
        : flexElemsPosInit.liftL_isOnFloor === 5
        ? gameCanvas.width * 0.18 + 53
        : gameCanvas.width * 0.18 + 63,
      i === 0
        ? gameElements.floor0_YPos - 100
        : i === 1
        ? gameElements.floor1_YPos - 100
        : i === 2
        ? gameElements.floor2_YPos - 100
        : i === 3
        ? gameElements.floor3_YPos - 100
        : i === 4
        ? gameElements.floor4_YPos - 100
        : i === 5
        ? gameElements.floor5_YPos - 100
        : gameElements.floor6_YPos - 95,

      flexElemsPosInit.liftL_isOnFloor == 0
        ? "E"
        : flexElemsPosInit.liftL_isOnFloor,
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
      flexElemsPosInit.liftR_isOnFloor === 0
        ? gameCanvas.width * 0.78
        : flexElemsPosInit.liftR_isOnFloor === 1
        ? gameCanvas.width * 0.78 + 13
        : flexElemsPosInit.liftR_isOnFloor === 2
        ? gameCanvas.width * 0.78 + 23
        : flexElemsPosInit.liftR_isOnFloor === 3
        ? gameCanvas.width * 0.78 + 33
        : flexElemsPosInit.liftR_isOnFloor === 4
        ? gameCanvas.width * 0.78 + 43
        : flexElemsPosInit.liftR_isOnFloor === 5
        ? gameCanvas.width * 0.78 + 53
        : gameCanvas.width * 0.78 + 63,
      i === 0
        ? gameElements.floor0_YPos - 100
        : i === 1
        ? gameElements.floor1_YPos - 100
        : i === 2
        ? gameElements.floor2_YPos - 100
        : i === 3
        ? gameElements.floor3_YPos - 100
        : i === 4
        ? gameElements.floor4_YPos - 100
        : i === 5
        ? gameElements.floor5_YPos - 100
        : gameElements.floor6_YPos - 95,
      flexElemsPosInit.liftR_isOnFloor == 0
        ? "E"
        : flexElemsPosInit.liftR_isOnFloor,
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
