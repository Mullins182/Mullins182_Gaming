console.log("Module 'npcLogic.mjs' has started !");

import { gameCanvas } from "./canvasInit.mjs";
import { spriteControl } from "./spriteHandling.mjs";
import { playerEscaped } from "./playerLogic.mjs";

import {
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
  shaftRdoorsOpenCheck,
  shaftLdoorsOpenCheck,
  playerOnFloor,
  npcOnFloor,
} from "./hell10.mjs";

let npcIsIdling = false;
let liftRonFloor;
let liftLonFloor;
let npcPosX;
let playerPosX;
let npcOnLiftR;
let npcOnLiftL;
export let npcHeading = "r";
export let playerCatched = false;

// IN THE WORKS !
export function npcRoutine() {
  elemStatusUpdate();
  npcAnimationLogic();
  npcIsOnFloorUpdate();
  if (playerEscaped) {
    return;
  }
  npcMovesToPlayer();
  // console.log("NPC HEADING: " + npcHeading);
}

function elemStatusUpdate() {
  playerPosX = flexElemsPosInit.playerPosX;
  npcPosX = flexElemsPosInit.npcPosX;
  flexElemsPosInit.npcPosY = npcPosYupdate();
  liftRonFloor = flexElemsPosInit.liftR_isOnFloor;
  liftLonFloor = flexElemsPosInit.liftL_isOnFloor;
  npcOnLiftR = flexElemsPosInit.npcOnLiftR;
  npcOnLiftL = flexElemsPosInit.npcOnLiftL;
  npcHeading =
    flexElemsPosInit.npcActMovDir === "l"
      ? "l"
      : flexElemsPosInit.npcActMovDir === "r"
      ? "r"
      : npcHeading;
  playerCatched =
    playerPosX + gameElements.playerWidth * 0.6 < npcPosX ||
    playerPosX - gameElements.playerWidth > npcPosX ||
    playerOnFloor.floor !== npcOnFloor.floor
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

function npcMoveToLiftL() {
  flexElemsPosInit.npcOnXPosLiftL =
    npcPosX > gameElements.liftLposXmid - gameElements.npcWidth + 25
      ? false
      : true;
  return flexElemsPosInit.npcOnXPosLiftL ? "s" : "l";
}

function npcEntersLiftR() {
  flexElemsPosInit.npcOnLiftR = npcOnLiftR
    ? npcOnLiftR
    : flexElemsPosInit.npcOnXPosLiftR
    ? true
    : false;
}

function npcEntersLiftL() {
  flexElemsPosInit.npcOnLiftL = npcOnLiftL
    ? npcOnLiftL
    : flexElemsPosInit.npcOnXPosLiftL
    ? true
    : false;
}

function npcUsesLiftR() {
  flexElemsPosInit.liftR_calledToFloor = playerOnFloor.floor;
}

function npcUsesLiftL() {
  flexElemsPosInit.liftL_calledToFloor = playerOnFloor.floor;
}

function npcLeavesLift() {
  flexElemsPosInit.npcOnLiftR = npcOnLiftR ? false : npcOnLiftR;
  flexElemsPosInit.npcOnLiftL = npcOnLiftL ? false : npcOnLiftL;
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
    return gameElements.npcSpeed;
  } else if (flexElemsPosInit.npcActMovDir === "l") {
    return -gameElements.npcSpeed;
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
  // console.log(playerCatched);
  // IN THE WORKS !!!
  if (npcOnFloor.floor !== playerOnFloor.floor) {
    npcOnLiftL || npcOnLiftR ? null : npcCallLiftBtnsCheck();

    if (
      liftRonFloor !== npcOnFloor.floor &&
      liftLonFloor !== npcOnFloor.floor
    ) {
      flexElemsPosInit.npcActMovDir =
        flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
          ? flexElemsPosInit.npcActMovDir
          : npcMoveToCallBtn();
      flexElemsPosInit.npcPosX += npcPosXupdate();
      // gameElements.npcPressCallLiftBtn =
      //   npcOnLiftL || npcOnLiftR ? 0 : npcCallLift();
    }
    if (liftRonFloor === npcOnFloor.floor) {
      flexElemsPosInit.npcActMovDir =
        flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
          ? flexElemsPosInit.npcActMovDir
          : npcMoveToLiftR();

      shaftRdoorsOpenCheck() ? npcEntersLiftR() : null;

      npcOnLiftR && shaftRdoorsOpenCheck() ? npcUsesLiftR() : null;
      flexElemsPosInit.npcPosX += npcPosXupdate();
    } else if (liftLonFloor === npcOnFloor.floor) {
      flexElemsPosInit.npcActMovDir =
        flexElemsPosInit.npcOnLiftL || flexElemsPosInit.npcOnLiftR
          ? flexElemsPosInit.npcActMovDir
          : npcMoveToLiftL();

      shaftLdoorsOpenCheck() ? npcEntersLiftL() : null;

      npcOnLiftL && shaftLdoorsOpenCheck() ? npcUsesLiftL() : null;
      flexElemsPosInit.npcPosX += npcPosXupdate();
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
        flexElemsPosInit.npcActMovDir =
          playerPosX > npcPosX
            ? "r"
            : playerPosX < npcPosX
            ? "l"
            : flexElemsPosInit.npcActMovDir;
      } else {
        flexElemsPosInit.npcActMovDir = "s";
      }
      flexElemsPosInit.npcPosX += npcPosXupdate();
    }
  }
}
