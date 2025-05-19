import {
  gameCanvas,
  playerPosUpdate,
  gameElements,
  flexElemsPosInit,
  shaftLdoorsOpenCheck,
  shaftRdoorsOpenCheck,
} from "./hell10.mjs";
import { changePlayerSprite } from "./spriteHandling.mjs";

// Collision-Variables
export let isColliding = false;

export function playerMovandColl() {
  if (!playerCollision() || playerCanLeave()) {
    playerPosUpdate(gameElements.playerMovement);
    isColliding = false;
  } else {
    isColliding = true;
    changePlayerSprite("stop");
    gameElements.playerMovement = "stop";
    flexElemsPosInit.playerPosX =
      flexElemsPosInit.playerPosX < gameCanvas.width / 2
        ? flexElemsPosInit.playerPosX + 5
        : flexElemsPosInit.playerPosX - 5;
  }
} // ___________________________ PLAYER CAN LEAVE BUILDING-CHECK ___________________________

export function playerCanLeave() {
  return flexElemsPosInit.exitDoorPosY < gameCanvas.height * 0.73 &&
    flexElemsPosInit.playerPosX < 500 &&
    flexElemsPosInit.playerOnFloor == 0
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
      (flexElemsPosInit.playerOnFloor === 0 &&
        flexElemsPosInit.liftL_isOnFloor === 0) ||
      (flexElemsPosInit.playerOnFloor === 1 &&
        flexElemsPosInit.liftL_isOnFloor === 1) ||
      (flexElemsPosInit.playerOnFloor === 2 &&
        flexElemsPosInit.liftL_isOnFloor === 2) ||
      (flexElemsPosInit.playerOnFloor === 3 &&
        flexElemsPosInit.liftL_isOnFloor === 3) ||
      (flexElemsPosInit.playerOnFloor === 4 &&
        flexElemsPosInit.liftL_isOnFloor === 4) ||
      (flexElemsPosInit.playerOnFloor === 5 &&
        flexElemsPosInit.liftL_isOnFloor === 5) ||
      (flexElemsPosInit.playerOnFloor === 6 &&
        flexElemsPosInit.liftL_isOnFloor === 6)
    ) {
      if (
        flexElemsPosInit.playerPosX > gameCanvas.width * 0.16 &&
        flexElemsPosInit.playerPosX < gameCanvas.width * 0.185
      ) {
        flexElemsPosInit.playerOnLiftL = true;
      }
    }
    if (
      (flexElemsPosInit.playerOnFloor === 0 &&
        flexElemsPosInit.liftR_isOnFloor === 0) ||
      (flexElemsPosInit.playerOnFloor === 1 &&
        flexElemsPosInit.liftR_isOnFloor === 1) ||
      (flexElemsPosInit.playerOnFloor === 2 &&
        flexElemsPosInit.liftR_isOnFloor === 2) ||
      (flexElemsPosInit.playerOnFloor === 3 &&
        flexElemsPosInit.liftR_isOnFloor === 3) ||
      (flexElemsPosInit.playerOnFloor === 4 &&
        flexElemsPosInit.liftR_isOnFloor === 4) ||
      (flexElemsPosInit.playerOnFloor === 5 &&
        flexElemsPosInit.liftR_isOnFloor === 5) ||
      (flexElemsPosInit.playerOnFloor === 6 &&
        flexElemsPosInit.liftR_isOnFloor === 6)
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
