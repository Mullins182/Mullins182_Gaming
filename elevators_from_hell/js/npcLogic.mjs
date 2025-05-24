console.log("Module 'npcLogic.mjs' has started !");

import {
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
  shaftRdoorsOpenCheck,
  playerOnFloor,
  npcOnFloor,
} from "./hell10.mjs";
import { gameCanvas } from "./canvasInit.mjs";

let npcIsIdling = false;
let liftRonFloor;
let liftLonFloor;
let npcPosX;
let playerPosX;
let npcOnLiftR;
let npcOnLiftL;
let playerCatched = false;

// IN THE WORKS !
export function npcRoutine() {
  elemStatusUpdate();
  npcIsOnFloorUpdate();
  npcMovesToPlayer();
  flexElemsPosInit.npcPosY = npcPosYupdate();
}

function elemStatusUpdate() {
  playerPosX = flexElemsPosInit.playerPosX;
  npcPosX = flexElemsPosInit.npcPosX;
  liftRonFloor = flexElemsPosInit.liftR_isOnFloor;
  liftLonFloor = flexElemsPosInit.liftL_isOnFloor;
  npcOnLiftR = flexElemsPosInit.npcOnLiftR;
  npcOnLiftL = flexElemsPosInit.npcOnLiftL;
  playerCatched =
    playerPosX + (gameElements.playerWidth + 15) < npcPosX ||
    playerOnFloor.floor !== npcOnFloor.floor
      ? false
      : true;
}

function npcMoveToCallBtn() {
  return npcPosX < gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? "r"
    : npcPosX > 980
    ? "l"
    : flexElemsPosInit.npcActMovDir;
}

function npcMoveToLiftR() {
  flexElemsPosInit.npcOnXPosLiftR =
    npcPosX < gameElements.liftRposXmid - gameElements.npcWidth + 10
      ? false
      : true;
  return flexElemsPosInit.npcOnXPosLiftR ? "s" : "r";
}

function npcEntersLiftR() {
  flexElemsPosInit.npcOnLiftR = npcOnLiftR
    ? npcOnLiftR
    : flexElemsPosInit.npcOnXPosLiftR
    ? true
    : false;
}

function npcUsesLiftR() {
  flexElemsPosInit.liftR_calledToFloor = playerOnFloor.floor;
}

function npcLeavesLift() {
  flexElemsPosInit.npcOnLiftR = npcOnLiftR ? false : npcOnLiftR;
}

function npcIdlingMovement() {
  return npcPosX < gameCanvas.width / 1.8
    ? "r"
    : npcPosX > gameCanvas.width / 1.5
    ? "l"
    : flexElemsPosInit.npcActMovDir;
}

function npcCallLift() {
  return npcPosX < gameElements.callElevatorBtnsXpos
    ? 52
    : gameElements.npcPressCallLiftBtn;
}

function npcPosXupdate() {
  // console.log(
  //   "NPC Moving To: ",
  //   flexElemsPosInit.npcActMovDir,
  //   "NPC-PosX: ",
  //   flexElemsPosInit.npcPosX,
  //   "gameCanvas Width / 1.5: ",
  //   gameCanvas.width / 1.5
  // );

  if (flexElemsPosInit.npcActMovDir === "r") {
    return 3.5;
  } else if (flexElemsPosInit.npcActMovDir === "l") {
    return -3.5;
  } else if (flexElemsPosInit.npcActMovDir === "s") {
    return 0.0;
  } else {
    return 0.25;
  }
}

function npcPosYupdate() {
  return flexElemsPosInit.npcOnLiftR
    ? flexElemsPosInit.liftR_YPos +
        (gameElements.liftsHeight - gameElements.npcHeight)
    : flexElemsPosInit.npcOnLiftL
    ? flexElemsPosInit.liftL_YPos +
      (gameElements.liftsHeight - gameElements.npcHeight)
    : flexElemsPosInit.npcPosY;
}

function npcIsOnFloorUpdate() {
  for (let i = 0; i < 7; ++i) {
    npcOnFloor.floor =
      flexElemsPosInit.npcPosY ===
      gameElements[`floor${i}_YPos`] - gameElements.npcHeight
        ? i
        : npcOnFloor.floor;
  }
}

function npcCallLiftBtnsCheck() {
  const npcInteractPos = {
    callLiftBtns: npcPosX < gameElements.callElevatorBtnsXpos,
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
  console.log(playerCatched);

  if (npcOnFloor.floor !== playerOnFloor.floor) {
    npcOnFloor.floor !== playerOnFloor.floor ? npcCallLiftBtnsCheck() : null;

    if (
      liftRonFloor !== npcOnFloor.floor &&
      liftLonFloor !== npcOnFloor.floor
    ) {
      flexElemsPosInit.npcPosX += npcPosXupdate();
      flexElemsPosInit.npcActMovDir =
        flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
          ? flexElemsPosInit.npcActMovDir
          : npcMoveToCallBtn();
      gameElements.npcPressCallLiftBtn =
        flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
          ? gameElements.npcPressCallLiftBtn
          : npcCallLift();
    }
    if (liftRonFloor === npcOnFloor.floor) {
      flexElemsPosInit.npcPosX += npcPosXupdate();

      flexElemsPosInit.npcActMovDir =
        flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
          ? flexElemsPosInit.npcActMovDir
          : npcMoveToLiftR();

      shaftRdoorsOpenCheck() ? npcEntersLiftR() : null;

      npcOnLiftR && shaftRdoorsOpenCheck() ? npcUsesLiftR() : null;
    }
  } else {
    if (liftRonFloor === playerOnFloor.floor) {
      shaftRdoorsOpenCheck() ? npcLeavesLift() : null;
    }
    if (!npcOnLiftR && !npcOnLiftL) {
      flexElemsPosInit.npcPosX += npcPosXupdate();

      if (!playerCatched) {
        flexElemsPosInit.npcActMovDir = "l";
      } else {
        flexElemsPosInit.npcActMovDir = "s";
      }
    }
  }
}
