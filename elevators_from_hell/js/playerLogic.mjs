console.log("Module 'playerLogic.mjs' has started !");

import {
  playerOnFloor,
  playerPosUpdate,
  gameElements,
  flexElemsPosInit,
  shaftLdoorsOpenCheck,
  shaftRdoorsOpenCheck,
  returnBtn,
} from "./hell10.mjs";
import { gameCanvas, wrapper } from "./canvasInit.mjs";
import { changePlayerSprite, spriteControl } from "./spriteHandling.mjs";
import { playerCatched } from "./npcLogic.mjs";

// Collision-Variables
export let isColliding = false;

export function playerCollisionCheck() {
  if (!playerCollision() || playerCanLeave()) {
    playerPosUpdate(gameElements.playerMovement);
    isColliding = false;
  } else {
    isColliding = true;

    // Sichere Initialisierung der Idle-Animation
    spriteControl.currentFramePlayer = 0;
    spriteControl.totalFramesPlayer = 7;
    spriteControl.animationIntervalPlayer = 125; // Reset des Intervalls
    spriteControl.lastTimePlayer = performance.now(); // Reset des Zeitstempels

    changePlayerSprite("stop");
    gameElements.playerMovement = "stop";
    flexElemsPosInit.playerPosX =
      flexElemsPosInit.playerPosX < gameCanvas.width / 2
        ? flexElemsPosInit.playerPosX + 5
        : flexElemsPosInit.playerPosX - 5;
  }
} // ___________________________ PLAYER CAN LEAVE BUILDING-CHECK ___________________________

function playerCanLeave() {
  return flexElemsPosInit.exitDoorPosY < gameCanvas.height * 0.72 &&
    flexElemsPosInit.playerPosX < gameCanvas.width / 2 &&
    playerOnFloor.floor === 0
    ? true
    : false;
}
// ___________________________ PLAYER ON LIFT-CHECK ___________________________
export function playerOnLift(getOutOfLift) {
  if (getOutOfLift) {
    if (flexElemsPosInit.playerOnLiftL) {
      if (!flexElemsPosInit.liftL_isMoving && shaftLdoorsOpenCheck()) {
        flexElemsPosInit.playerOnLiftL = false;
      }
    }
    if (flexElemsPosInit.playerOnLiftR) {
      if (!flexElemsPosInit.liftR_isMoving && shaftRdoorsOpenCheck()) {
        flexElemsPosInit.playerOnLiftR = false;
      }
    }
  } else {
    if (
      (playerOnFloor.floor === 0 && flexElemsPosInit.liftL_isOnFloor === 0) ||
      (playerOnFloor.floor === 1 && flexElemsPosInit.liftL_isOnFloor === 1) ||
      (playerOnFloor.floor === 2 && flexElemsPosInit.liftL_isOnFloor === 2) ||
      (playerOnFloor.floor === 3 && flexElemsPosInit.liftL_isOnFloor === 3) ||
      (playerOnFloor.floor === 4 && flexElemsPosInit.liftL_isOnFloor === 4) ||
      (playerOnFloor.floor === 5 && flexElemsPosInit.liftL_isOnFloor === 5) ||
      (playerOnFloor.floor === 6 && flexElemsPosInit.liftL_isOnFloor === 6)
    ) {
      if (
        flexElemsPosInit.playerPosX > gameCanvas.width * 0.16 &&
        flexElemsPosInit.playerPosX < gameCanvas.width * 0.185
      ) {
        flexElemsPosInit.playerOnLiftL = true;
      }
    }
    if (
      (playerOnFloor.floor === 0 && flexElemsPosInit.liftR_isOnFloor === 0) ||
      (playerOnFloor.floor === 1 && flexElemsPosInit.liftR_isOnFloor === 1) ||
      (playerOnFloor.floor === 2 && flexElemsPosInit.liftR_isOnFloor === 2) ||
      (playerOnFloor.floor === 3 && flexElemsPosInit.liftR_isOnFloor === 3) ||
      (playerOnFloor.floor === 4 && flexElemsPosInit.liftR_isOnFloor === 4) ||
      (playerOnFloor.floor === 5 && flexElemsPosInit.liftR_isOnFloor === 5) ||
      (playerOnFloor.floor === 6 && flexElemsPosInit.liftR_isOnFloor === 6)
    ) {
      if (
        flexElemsPosInit.playerPosX > gameCanvas.width * 0.76 &&
        flexElemsPosInit.playerPosX < gameCanvas.width * 0.79
      ) {
        flexElemsPosInit.playerOnLiftR = true;
      }
    }
  }
}

export function playerCollision() {
  return flexElemsPosInit.playerPosX >=
    gameCanvas.width * 0.95 - gameElements.playerWidth / 1.85
    ? true
    : flexElemsPosInit.playerPosX <=
      gameCanvas.width * 0.05 +
        gameElements.wallsWidth -
        gameElements.playerWidth / 2.25
    ? true
    : false;
}

export function playerCatchedCheck() {
  if (playerCatched) {
    // drawGameOverImg();
    // wrapper.style.backgroundImage = "./assets/img/defeat.webp";
    gameElements.playerMovement = "stop";
    wrapper.style.backgroundSize = "0%";
    wrapper.style.backgroundColor = "#FF0000";
    gameCanvas.style.opacity = 0.85;
    returnBtn.style.display =
      returnBtn.style.display !== "inline" ? "inline" : returnBtn.style.display;
  }
}

export function playerCallLiftBtnsCheck(value) {
  const playerInteractPos = {
    callLiftBtns:
      flexElemsPosInit.playerPosX >
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25,
    exitBtns:
      flexElemsPosInit.playerPosX >
        gameElements.exitBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.exitBtnsXpos - gameElements.playerWidth / 2 + 25,
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
      flexElemsPosInit.playerPosX >
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25,
    exitBtns:
      flexElemsPosInit.playerPosX >
        gameElements.exitBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.exitBtnsXpos - gameElements.playerWidth / 2 + 25,
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
