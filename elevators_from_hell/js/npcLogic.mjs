import {
  flexElemsPosInit,
  gameElements,
  callElevatorBtnsStatus,
} from "./hell10.mjs";

// IN THE WORKS !
export async function npcRoutine() {
  npcCallLiftBtnsCheck();
  flexElemsPosInit.npcActMovDir = npcMovement();
  gameElements.npcPressCallLiftBtn = npcButtonPress();
  flexElemsPosInit.npcPosX += npcPosUpdate();
}

export function npcMovement() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? "right"
    : flexElemsPosInit.npcPosX > 1050
    ? "left"
    : flexElemsPosInit.npcActMovDir;
}

export function npcButtonPress() {
  return flexElemsPosInit.npcPosX <
    gameElements.exitBtnsXpos - gameElements.npcWidth / 1.2
    ? 52
    : null;
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
