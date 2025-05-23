console.log("Module 'npcLogic.mjs' has started !");

import {
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
  playerOnFloor,
  npcOnFloor,
} from "./hell10.mjs";
import { gameCanvas } from "./canvasInit.mjs";

let npcIsIdling = false;
let liftRonFloor;
let liftLonFloor;
let npcPosX;

// IN THE WORKS !
export function npcRoutine() {
  elemPositionsUpdate();
  npcMovesToPlayer();
  npcCallLiftBtnsCheck();
  flexElemsPosInit.npcPosY = npcPosYupdate();
}

function elemPositionsUpdate() {
  liftRonFloor = flexElemsPosInit.liftR_isOnFloor;
  liftLonFloor = flexElemsPosInit.liftL_isOnFloor;
  npcPosX = flexElemsPosInit.npcPosX;
}

function npcMovToCallBtn() {
  return npcPosX < gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? "r"
    : flexElemsPosInit.npcPosX > 980
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
  flexElemsPosInit.npcOnLiftR = flexElemsPosInit.npcOnLiftR
    ? flexElemsPosInit.npcOnLiftR
    : flexElemsPosInit.npcOnXPosLiftR
    ? true
    : false;
}

function npcLeavesLiftR() {
  flexElemsPosInit.npcOnLiftR = flexElemsPosInit.npcOnLiftR
    ? false
    : flexElemsPosInit.npcOnLiftR;
}

function npcIdlingMovement() {
  return flexElemsPosInit.npcPosX < gameCanvas.width / 1.8
    ? "r"
    : flexElemsPosInit.npcPosX > gameCanvas.width / 1.5
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

function npcCallLiftBtnsCheck() {
  const npcInteractPos = {
    callLiftBtns: npcPosX < gameElements.callElevatorBtnsXpos,
    exitBtns: null,
  };

  for (let i = 0; i < 7; i++) {
    callElevatorBtnsStatus[`floor${i}`] =
      callElevatorBtnsStatus[`floor${i}`] !== 3 &&
      npcOnFloor === i &&
      npcInteractPos.callLiftBtns &&
      playerOnFloor < npcOnFloor
        ? 2
        : callElevatorBtnsStatus[`floor${i}`] !== 3 &&
          npcOnFloor === i &&
          npcInteractPos.callLiftBtns &&
          playerOnFloor > npcOnFloor
        ? 1
        : callElevatorBtnsStatus[`floor${i}`];
  }
}

function npcMovesToPlayer() {
  if (npcOnFloor !== playerOnFloor) {
    if (playerOnFloor === 6) {
      if (liftRonFloor !== npcOnFloor && liftLonFloor !== npcOnFloor) {
        flexElemsPosInit.npcPosX += npcPosXupdate();
        flexElemsPosInit.npcActMovDir =
          flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
            ? flexElemsPosInit.npcActMovDir
            : npcMovToCallBtn();
        gameElements.npcPressCallLiftBtn =
          flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
            ? gameElements.npcPressCallLiftBtn
            : npcCallLift();
      }
      if (liftRonFloor === npcOnFloor) {
        flexElemsPosInit.npcPosX += npcPosXupdate();

        flexElemsPosInit.npcActMovDir =
          flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
            ? flexElemsPosInit.npcActMovDir
            : npcMoveToLiftR();
        npcEntersLiftR();
        // console.log(flexElemsPosInit.npcOnLiftR);
      }
    }
  } else {
  }
}
