console.log("Module 'playerLogic.mjs' has started !");

import {
  playerOnFloor,
  playerPosUpdate,
  staticGameElements,
  moveableElems,
  shaftLdoorsOpenCheck,
  shaftRdoorsOpenCheck,
  callElevatorBtnsStatus,
  exitButtonsStatus,
  returnBtn,
} from "./hell10.mjs";
import { gameCanvas, wrapper } from "./canvasInit.mjs";
import { changePlayerSprite, spriteControl } from "./spriteHandling.mjs";
import { playerCatched } from "./npcLogic.mjs";

// Collision-Variables
export let isColliding = false;
export let playerEscaped = false;

export function playerCollisionCheck() {
  if (!playerCollision() || playerCanLeave()) {
    playerPosUpdate(staticGameElements.playerMovement);
    isColliding = false;
  } else {
    isColliding = true;

    // Sichere Initialisierung der Idle-Animation
    spriteControl.currentFramePlayer = 0;
    spriteControl.totalFramesPlayer = 7;
    spriteControl.animationIntervalPlayer = 125; // Reset des Intervalls
    spriteControl.lastTimePlayer = performance.now(); // Reset des Zeitstempels

    changePlayerSprite("stop");
    staticGameElements.playerMovement = "stop";
    moveableElems.playerPosX =
      moveableElems.playerPosX < gameCanvas.width / 2
        ? moveableElems.playerPosX + 5
        : moveableElems.playerPosX - 5;
  }
}
// ___________________________ PLAYER CAN LEAVE BUILDING CHECK ___________________________
function playerCanLeave() {
  return moveableElems.exitDoorPosY < gameCanvas.height * 0.72 &&
    moveableElems.playerPosX < gameCanvas.width / 2 &&
    playerOnFloor.floor === 0
    ? true
    : false;
}
// ___________________________ PLAYER ON LIFT-CHECK ___________________________
export function playerOnLift(getOutOfLift) {
  if (getOutOfLift) {
    if (moveableElems.playerOnLiftL) {
      if (!moveableElems.liftL_isMoving && shaftLdoorsOpenCheck()) {
        moveableElems.playerOnLiftL = false;
      }
    }
    if (moveableElems.playerOnLiftR) {
      if (!moveableElems.liftR_isMoving && shaftRdoorsOpenCheck()) {
        moveableElems.playerOnLiftR = false;
      }
    }
  } else {
    if (
      (playerOnFloor.floor === 0 && moveableElems.liftL_isOnFloor === 0) ||
      (playerOnFloor.floor === 1 && moveableElems.liftL_isOnFloor === 1) ||
      (playerOnFloor.floor === 2 && moveableElems.liftL_isOnFloor === 2) ||
      (playerOnFloor.floor === 3 && moveableElems.liftL_isOnFloor === 3) ||
      (playerOnFloor.floor === 4 && moveableElems.liftL_isOnFloor === 4) ||
      (playerOnFloor.floor === 5 && moveableElems.liftL_isOnFloor === 5) ||
      (playerOnFloor.floor === 6 && moveableElems.liftL_isOnFloor === 6)
    ) {
      if (
        moveableElems.playerPosX > gameCanvas.width * 0.16 &&
        moveableElems.playerPosX < gameCanvas.width * 0.185
      ) {
        moveableElems.playerOnLiftL = true;
      }
    }
    if (
      (playerOnFloor.floor === 0 && moveableElems.liftR_isOnFloor === 0) ||
      (playerOnFloor.floor === 1 && moveableElems.liftR_isOnFloor === 1) ||
      (playerOnFloor.floor === 2 && moveableElems.liftR_isOnFloor === 2) ||
      (playerOnFloor.floor === 3 && moveableElems.liftR_isOnFloor === 3) ||
      (playerOnFloor.floor === 4 && moveableElems.liftR_isOnFloor === 4) ||
      (playerOnFloor.floor === 5 && moveableElems.liftR_isOnFloor === 5) ||
      (playerOnFloor.floor === 6 && moveableElems.liftR_isOnFloor === 6)
    ) {
      if (
        moveableElems.playerPosX > gameCanvas.width * 0.76 &&
        moveableElems.playerPosX < gameCanvas.width * 0.79
      ) {
        moveableElems.playerOnLiftR = true;
      }
    }
  }
}
// ___________________________ PLAYER COLLISION-CHECK ___________________________
export function playerCollision() {
  return moveableElems.playerPosX >=
    gameCanvas.width * 0.95 - staticGameElements.playerWidth / 1.85
    ? true
    : moveableElems.playerPosX <=
      gameCanvas.width * 0.05 +
        staticGameElements.wallsWidth -
        staticGameElements.playerWidth / 2.25
    ? true
    : false;
}
// ___________________________ PLAYER CATCHED-CHECK ___________________________
export function playerCatchedCheck() {
  if (playerCatched) {
    // drawGameOverImg();
    // wrapper.style.backgroundImage = "./assets/img/defeat.webp";
    staticGameElements.playerMovement = "stop";
    wrapper.style.backgroundSize = "0%";
    wrapper.style.backgroundColor = "#FF0000";
    gameCanvas.style.opacity = 0.85;
    returnBtn.style.display =
      returnBtn.style.display !== "inline" ? "inline" : returnBtn.style.display;
  }
}
// ___________________________ PLAYER HAS LEFT BUILDING CHECK ___________________________
export function playerEscapedCheck() {
  if (moveableElems.playerPosX < -100) {
    playerEscaped = playerEscaped ? playerEscaped : true;
    staticGameElements.playerMovement = "stop";
    wrapper.style.backgroundSize = "0%";
    wrapper.style.backgroundColor = "#33FF00";
    gameCanvas.style.opacity = 0.85;
    returnBtn.style.display =
      returnBtn.style.display !== "inline" ? "inline" : returnBtn.style.display;
  }
}

export function playerCallLiftBtnsCheck(value) {
  const playerInteractPos = {
    callLiftBtns:
      moveableElems.playerPosX >
        staticGameElements.callElevatorBtnsXpos -
          staticGameElements.playerWidth / 1.5 &&
      moveableElems.playerPosX <
        staticGameElements.callElevatorBtnsXpos -
          staticGameElements.playerWidth / 2 +
          25,
    exitBtns:
      moveableElems.playerPosX >
        staticGameElements.exitBtnsXpos -
          staticGameElements.playerWidth / 1.5 &&
      moveableElems.playerPosX <
        staticGameElements.exitBtnsXpos -
          staticGameElements.playerWidth / 2 +
          25,
  };

  for (let i = 0; i < 7; i++) {
    value =
      playerOnFloor.floor === i &&
      callElevatorBtnsStatus[`floor${i}`] != value &&
      callElevatorBtnsStatus[`floor${i}`] < 3
        ? callElevatorBtnsStatus[`floor${i}`] + value
        : value;

    callElevatorBtnsStatus[`floor${i}`] =
      callElevatorBtnsStatus[`floor${i}`] !== 3 &&
      playerOnFloor.floor === i &&
      playerInteractPos.callLiftBtns
        ? value
        : callElevatorBtnsStatus[`floor${i}`];
  }
}

export function exitBtnActCheck() {
  const playerInteractPos = {
    callLiftBtns:
      moveableElems.playerPosX >
        staticGameElements.callElevatorBtnsXpos -
          staticGameElements.playerWidth / 1.5 &&
      moveableElems.playerPosX <
        staticGameElements.callElevatorBtnsXpos -
          staticGameElements.playerWidth / 2 +
          25,
    exitBtns:
      moveableElems.playerPosX >
        staticGameElements.exitBtnsXpos -
          staticGameElements.playerWidth / 1.5 &&
      moveableElems.playerPosX <
        staticGameElements.exitBtnsXpos -
          staticGameElements.playerWidth / 2 +
          25,
  };

  for (let i = 0; i < 7; i++) {
    exitButtonsStatus[`floor${i}`] =
      playerOnFloor.floor === i && playerInteractPos.exitBtns
        ? exitButtonsStatus[`floor${i}`]
          ? false
          : true
        : exitButtonsStatus[`floor${i}`];
  }
}
