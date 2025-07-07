console.log("Module 'npcLogic.mjs' has started !");

import { spriteControl } from "./spriteHandling.mjs";
import { playerEscaped } from "./playerLogic.mjs";
import { sounds } from "./soundHandling.mjs";

import {
  moveableElems,
  staticGameElements,
  callElevatorBtnsStatus,
  shaftRdoorsOpenCheck,
  shaftLdoorsOpenCheck,
  playerOnFloor,
  npcOnFloor,
} from "./hell10.mjs";

let npcIsIdling = false;
// let npcPosSnapshot = ? flexElemsPosInit.npcPosSnapshot : null;
// let npcIdlePathTo = npcPosSnapshot - 100;
let liftRonFloor;
let liftLonFloor;
let npcPosX;
let playerPosX;
let npcOnLiftR;
let npcOnLiftL;
let detectSndRdy = true;
export let npcHeading = "r";
export let playerCatched = false;

// IN THE WORKS !
export function npcRoutine() {
  playerDetectedCheck();
  npcIsIdling && moveableElems.npcPosSnapshot === 0
    ? (moveableElems.npcPosSnapshot = npcPosX)
    : null;
  npcIsIdling ? npcIdlingMovement() : null;
  elemStatusUpdate();
  npcAnimationLogic();
  npcIsOnFloorUpdate();
  if (playerEscaped) {
    return;
  }
  npcMovesToPlayer();
  // console.log("NPC HEADING: " + npcHeading);
}

function playerDetectedCheck() {
  if (
    playerOnFloor.floor === npcOnFloor.floor &&
    detectSndRdy &&
    !(npcOnLiftL || npcOnLiftR)
  ) {
    sounds.playerDetected.play();
    detectSndRdy = false;
  }
}

function elemStatusUpdate() {
  npcOnLiftL || npcOnLiftR ? (moveableElems.npcActMovDir = "s") : null;
  detectSndRdy = npcOnFloor.floor !== playerOnFloor.floor ? true : detectSndRdy;
  playerPosX = moveableElems.playerPosX;
  npcPosX = moveableElems.npcPosX;
  moveableElems.npcPosY = npcPosYupdate();
  liftRonFloor = moveableElems.liftR_isOnFloor;
  liftLonFloor = moveableElems.liftL_isOnFloor;
  npcOnLiftR = moveableElems.npcOnLiftR;
  npcOnLiftL = moveableElems.npcOnLiftL;
  npcHeading =
    moveableElems.npcActMovDir === "l"
      ? "l"
      : moveableElems.npcActMovDir === "r"
      ? "r"
      : npcHeading;
  playerCatched =
    playerPosX + staticGameElements.playerWidth * 0.6 < npcPosX ||
    playerPosX - staticGameElements.playerWidth > npcPosX ||
    playerOnFloor.floor !== npcOnFloor.floor ||
    (moveableElems.playerOnLiftL && !shaftLdoorsOpenCheck()) ||
    (moveableElems.playerOnLiftR && !shaftRdoorsOpenCheck())
      ? false
      : true;
}

function npcAnimationLogic() {
  if (!playerCatched) {
    spriteControl.totalFramesNpc =
      spriteControl.totalFramesNpc !== 11 ? 11 : spriteControl.totalFramesNpc;
  } else {
    spriteControl.totalFramesNpc =
      spriteControl.totalFramesNpc !== 3 ? 3 : spriteControl.totalFramesNpc;
    spriteControl.animationIntervalNpc =
      spriteControl.animationIntervalNpc !== 75
        ? 75
        : spriteControl.animationIntervalNpc;
  }

  spriteControl.animationIntervalNpc =
    npcOnFloor.floor === playerOnFloor.floor &&
    !(npcOnLiftL || npcOnLiftR) &&
    spriteControl.animationIntervalNpc === 40
      ? 20
      : npcOnFloor.floor !== playerOnFloor.floor &&
        spriteControl.animationIntervalNpc === 20
      ? 40
      : spriteControl.animationIntervalNpc;
  // console.log(spriteControl.animationIntervalNpc);
}

function npcMoveToCallBtn() {
  return npcPosX <
    staticGameElements.exitBtnsXpos - staticGameElements.npcWidth / 1.2
    ? "r"
    : npcPosX > 980
    ? "l"
    : moveableElems.npcActMovDir;
}

function npcMoveToLiftR() {
  moveableElems.npcOnXPosLiftR =
    npcPosX < staticGameElements.liftRposXmid - staticGameElements.npcWidth + 10
      ? false
      : true;
  return moveableElems.npcOnXPosLiftR ? "s" : "r";
}

function npcMoveToLiftL() {
  moveableElems.npcOnXPosLiftL =
    npcPosX > staticGameElements.liftLposXmid - staticGameElements.npcWidth + 20
      ? false
      : true;
  return moveableElems.npcOnXPosLiftL ? "s" : "l";
}

function npcEntersLiftR() {
  moveableElems.npcOnLiftR = npcOnLiftR
    ? npcOnLiftR
    : moveableElems.npcOnXPosLiftR
    ? true
    : false;
}

function npcEntersLiftL() {
  moveableElems.npcOnLiftL = npcOnLiftL
    ? npcOnLiftL
    : moveableElems.npcOnXPosLiftL
    ? true
    : false;
}

function npcUsesLiftR() {
  moveableElems.liftR_calledToFloor = playerOnFloor.floor;
}

function npcUsesLiftL() {
  moveableElems.liftL_calledToFloor = playerOnFloor.floor;
}

function npcLeavesLift() {
  moveableElems.npcOnLiftR = npcOnLiftR ? false : npcOnLiftR;
  moveableElems.npcOnLiftL = npcOnLiftL ? false : npcOnLiftL;
}

function npcIdlingMovement() {
  npcPosX > npcIdlePathTo ? (npcPosX -= staticGameElements.npcSpeed) : null;
  // return npcPosX < gameCanvas.width / 1.8
  //   ? "r"
  //   : npcPosX > gameCanvas.width / 1.5
  //   ? "l"
  //   : flexElemsPosInit.npcActMovDir;
}

function npcCallLift() {
  return npcPosX < staticGameElements.callElevatorBtnsXpos
    ? 52
    : staticGameElements.npcPressCallLiftBtn;
}

function npcPosXupdate() {
  npcOnLiftL || npcOnLiftR ? (moveableElems.npcActMovDir = "s") : null;

  return moveableElems.npcActMovDir === "r"
    ? staticGameElements.npcSpeed
    : moveableElems.npcActMovDir === "l"
    ? -staticGameElements.npcSpeed
    : moveableElems.npcActMovDir === "s"
    ? 0.0
    : 0.25;
}

function npcPosYupdate() {
  return moveableElems.npcOnLiftR
    ? moveableElems.liftR_YPos +
        (staticGameElements.liftsHeight - staticGameElements.npcHeight)
    : moveableElems.npcOnLiftL
    ? moveableElems.liftL_YPos +
      (staticGameElements.liftsHeight - staticGameElements.npcHeight)
    : moveableElems.npcPosY;
}

function npcIsOnFloorUpdate() {
  for (let i = 0; i < 7; ++i) {
    npcOnFloor.floor =
      moveableElems.npcPosY ===
      staticGameElements[`floor${i}_YPos`] - staticGameElements.npcHeight
        ? i
        : npcOnFloor.floor;
  }
}

function npcCallLiftBtnsCheck() {
  const npcInteractPos = {
    callLiftBtns: npcPosX < staticGameElements.callElevatorBtnsXpos,
    exitBtns: null,
  };

  for (let i = 0; i < 7; i++) {
    callElevatorBtnsStatus[`floor${i}`] =
      callElevatorBtnsStatus[`floor${i}`] !== 3 &&
      npcOnFloor.floor === i &&
      npcInteractPos.callLiftBtns &&
      playerOnFloor.floor < npcOnFloor.floor
        ? 2
        : callElevatorBtnsStatus[`floor${i}`] !== 3 &&
          npcOnFloor.floor === i &&
          npcInteractPos.callLiftBtns &&
          playerOnFloor.floor > npcOnFloor.floor
        ? 1
        : callElevatorBtnsStatus[`floor${i}`];
  }
}

function npcMovesToPlayer() {
  // console.log(playerCatched);
  // IN THE WORKS !!!
  if (npcOnFloor.floor !== playerOnFloor.floor) {
    npcOnLiftL || npcOnLiftR ? null : npcCallLiftBtnsCheck();

    if (
      liftRonFloor !== npcOnFloor.floor &&
      liftLonFloor !== npcOnFloor.floor
    ) {
      moveableElems.npcActMovDir = npcMoveToCallBtn();
      moveableElems.npcPosX += npcPosXupdate();
    }
    if (liftRonFloor === npcOnFloor.floor) {
      moveableElems.npcActMovDir = npcMoveToLiftR();

      shaftRdoorsOpenCheck() ? npcEntersLiftR() : null;

      npcOnLiftR && shaftRdoorsOpenCheck() ? npcUsesLiftR() : null;
      moveableElems.npcPosX += npcPosXupdate();
    } else if (liftLonFloor === npcOnFloor.floor) {
      moveableElems.npcActMovDir = npcMoveToLiftL();

      shaftLdoorsOpenCheck() ? npcEntersLiftL() : null;

      npcOnLiftL && shaftLdoorsOpenCheck() ? npcUsesLiftL() : null;
      moveableElems.npcPosX += npcPosXupdate();
    }
  } else {
    if (liftRonFloor === playerOnFloor.floor && npcOnLiftR) {
      shaftRdoorsOpenCheck() ? npcLeavesLift() : null;
    } else if (liftLonFloor === playerOnFloor.floor && npcOnLiftL) {
      shaftLdoorsOpenCheck() ? npcLeavesLift() : null;
    }
    if (!npcOnLiftR && !npcOnLiftL) {
      // console.log("PposX -> " + playerPosX + "NposX -> " + npcPosX);

      if (!playerCatched) {
        moveableElems.npcActMovDir =
          playerPosX > npcPosX && playerPosX - npcPosX > 35
            ? "r"
            : playerPosX < npcPosX && npcPosX - playerPosX > 10
            ? "l"
            : "s";
      } else {
        moveableElems.npcActMovDir = "s";
      }
      moveableElems.npcPosX += npcPosXupdate();
    }
  }
}
