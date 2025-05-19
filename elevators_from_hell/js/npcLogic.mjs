import {
  gameCanvas,
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
} from "./hell10.mjs";

let npcIsIdling = false;

// IN THE WORKS !
export function npcRoutine(playerOnFloor, liftRonFloor, liftLonFloor) {
  npcIsIdling = true;
  flexElemsPosInit.npcActMovDir = npcIdling(npcIsIdling);
  flexElemsPosInit.npcPosX += npcPosUpdate();
}

function npcMovToCallBtn() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? "r"
    : flexElemsPosInit.npcPosX > 980
    ? "l"
    : flexElemsPosInit.npcActMovDir;
}

function npcIdling(npcIsIdling) {
  return npcIsIdling && flexElemsPosInit.npcPosX < gameCanvas.width / 1.8
    ? "r"
    : npcIsIdling && flexElemsPosInit.npcPosX > gameCanvas.width / 1.5
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
  if (flexElemsPosInit.npcActMovDir === "r") {
    return 3.5;
  } else if (flexElemsPosInit.npcActMovDir === "l") {
    return -3.5;
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
