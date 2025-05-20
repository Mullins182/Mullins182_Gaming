import {
  gameCanvas,
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
  playerOnFloor,
  npcOnFloor,
} from "./hell10.mjs";

let npcIsIdling = false;

// IN THE WORKS !
export function npcRoutine(liftRonFloor, liftLonFloor) {
  // npcIsIdling = true;
  // flexElemsPosInit.npcActMovDir = npcIsIdling
  //   ? npcIdlingMovement()
  //   : flexElemsPosInit.npcActMovDir;
  // flexElemsPosInit.npcPosX += npcPosUpdate();
  npcMovesToPlayer();
}

function npcMovToCallBtn() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? "r"
    : flexElemsPosInit.npcPosX > 980
    ? "l"
    : flexElemsPosInit.npcActMovDir;
}

function npcIdlingMovement() {
  return flexElemsPosInit.npcPosX < gameCanvas.width / 1.8
    ? "r"
    : flexElemsPosInit.npcPosX > gameCanvas.width / 1.5
    ? "l"
    : flexElemsPosInit.npcActMovDir;
}

function npcCallLift() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? 52
    : gameElements.npcPressCallLiftBtn;
}

function npcPosUpdate() {
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

// function npcCallLiftBtnsCheck() {
//   const npcInteractPos = {
//     callLiftBtns: flexElemsPosInit.npcPosX < gameElements.callElevatorBtnsXpos,
//     exitBtns: null,
//   };

//   for (let i = 0; i < 7; i++) {
//     callElevatorBtnsStatus[`floor${i}`] =
//       callElevatorBtnsStatus[`floor${i}`] !== 3 &&
//       flexElemsPosInit.npcOnFloor === i &&
//       npcInteractPos.callLiftBtns &&
//       flexElemsPosInit.playerOnFloor < flexElemsPosInit.npcOnFloor
//         ? 2
//         : callElevatorBtnsStatus[`floor${i}`] !== 3 &&
//           flexElemsPosInit.npcOnFloor === i &&
//           npcInteractPos.callLiftBtns &&
//           flexElemsPosInit.playerOnFloor > flexElemsPosInit.npcOnFloor
//         ? 1
//         : callElevatorBtnsStatus[`floor${i}`];
//   }
// }

function npcMovesToPlayer() {
  if (npcOnFloor !== playerOnFloor) {
    if (playerOnFloor === 6) {
      if (
        flexElemsPosInit.liftR_isOnFloor !== npcOnFloor &&
        flexElemsPosInit.liftL_isOnFloor !== npcOnFloor
      ) {
        flexElemsPosInit.npcActMovDir = npcMovToCallBtn();
        flexElemsPosInit.npcPosX += npcPosUpdate();
      }
    }
  } else {
  }
}
