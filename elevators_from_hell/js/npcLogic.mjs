import {
  gameCanvas,
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
} from "./hell10.mjs";

let npcIdling = false;

// IN THE WORKS !
export function npcRoutine() {
  npcCallLiftBtnsCheck();
  gameElements.npcPressCallLiftBtn = npcButtonPress();
  npcIdling = gameElements.npcPressCallLiftBtn == 52 ? true : false;

  npcIdling
    ? (flexElemsPosInit.npcActMovDir = npcIsIdling())
    : (flexElemsPosInit.npcActMovDir = npcMovToCallBtn());
  flexElemsPosInit.npcPosX += npcPosUpdate();
  console.log(
    flexElemsPosInit.npcActMovDir,
    gameElements.npcPressCallLiftBtn,
    npcIdling
  );
}

export function npcMovToCallBtn() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? "right"
    : flexElemsPosInit.npcPosX > 980
    ? "left"
    : flexElemsPosInit.npcActMovDir;
}

function npcIsIdling() {
  npcIdling = true;
  return flexElemsPosInit.npcPosX < gameCanvas.width / 1.8
    ? "right"
    : flexElemsPosInit.npcPosX > gameCanvas.width / 1.5
    ? "left"
    : flexElemsPosInit.npcActMovDir;
}

export function npcButtonPress() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? 52
    : gameElements.npcPressCallLiftBtn;
}

export function npcPosUpdate() {
  if (flexElemsPosInit.npcActMovDir === "right") {
    return 3.5;
  } else if (flexElemsPosInit.npcActMovDir === "left") {
    return -3.5;
  } else {
    return 0.25;
  }
}

export function npcCallLiftBtnsCheck() {
  const npcInteractPos = {
    callLiftBtns: flexElemsPosInit.npcPosX < gameElements.callElevatorBtnsXpos,
    exitBtns: null,
  };

  for (let i = 0; i < 7; i++) {
    callElevatorBtnsStatus[`floor${i}`] =
      callElevatorBtnsStatus[`floor${i}`] !== 3 &&
      flexElemsPosInit.npcOnFloor === i &&
      npcInteractPos.callLiftBtns &&
      flexElemsPosInit.playerOnFloor < flexElemsPosInit.npcOnFloor
        ? 2
        : callElevatorBtnsStatus[`floor${i}`] !== 3 &&
          flexElemsPosInit.npcOnFloor === i &&
          npcInteractPos.callLiftBtns &&
          flexElemsPosInit.playerOnFloor > flexElemsPosInit.npcOnFloor
        ? 1
        : callElevatorBtnsStatus[`floor${i}`];
  }
}
