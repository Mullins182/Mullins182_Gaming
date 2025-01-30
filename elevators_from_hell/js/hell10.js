console.log("Hell10 has Started !");

const gameCanvas = document.getElementById("mainCanvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = 1650;
gameCanvas.height = 900;

let gameElements = {
  floorsWidth: gameCanvas.width * 0.9,
  floorsHeight: 6,
  WallsHeight: gameCanvas.height * 0.89,
  wallsWidth: 15,
  ceilingWidth: gameCanvas.width * 0.95,
  ceilingHeight: 23,
  shaftDoorsHeight: 90,
  shaftDoorsLW_f0: 39,
  shaftDoorsRW_f0: 39,
  shaftDoorsLW_f1: 39,
  shaftDoorsRW_f1: 39,
  shaftDoorsLW_f2: 39,
  shaftDoorsRW_f2: 39,
  shaftDoorsLW_f3: 39,
  shaftDoorsRW_f3: 39,
  shaftDoorsLW_f4: 39,
  shaftDoorsRW_f4: 39,
  shaftDoorsLW_f5: 39,
  shaftDoorsRW_f5: 39,
  shaftDoorsLW_f6: 39,
  shaftDoorsRW_f6: 39,
  liftsWidth: 75,
  liftsHeight: 88,
  liftSpeed: 1.25,
};

let movingElementsStatusAndPos = {
  liftR_YPos:
    gameCanvas.height * 1.0 -
    (gameElements.liftsHeight + gameElements.floorsHeight),
  liftR_isMoving: false,
  liftR_isOnFloor0: true,
  liftR_calledToF0: true,
  liftR_isOnFloor1: false,
  liftR_calledToF1: false,
  liftR_isOnFloor2: false,
  liftR_calledToF2: false,
  liftR_isOnFloor3: false,
  liftR_calledToF3: false,
  liftR_isOnFloor4: false,
  liftR_calledToF4: false,
  liftR_isOnFloor5: false,
  liftR_calledToF5: false,
  liftR_isOnFloor6: false,
  liftR_calledToF6: false,
  liftL_YPos:
    gameCanvas.height * 1.0 -
    (gameElements.liftsHeight + gameElements.floorsHeight),
  liftL_isMoving: false,
  liftL_isOnFloor0: true,
  liftL_calledToF0: true,
  liftL_isOnFloor1: false,
  liftL_calledToF1: false,
  liftL_isOnFloor2: false,
  liftL_calledToF2: false,
  liftL_isOnFloor3: false,
  liftL_calledToF3: false,
  liftL_isOnFloor4: false,
  liftL_calledToF4: false,
  liftL_isOnFloor5: false,
  liftL_calledToF5: false,
  liftL_isOnFloor6: false,
  liftL_calledToF6: false,
};

let shaftRdoorsClosedStatus = {
  floor0_RdoorClosed: true,
  floor1_RdoorClosed: true,
  floor2_RdoorClosed: true,
  floor3_RdoorClosed: true,
  floor4_RdoorClosed: true,
  floor5_RdoorClosed: true,
  floor6_RdoorClosed: true,
};

let shaftLdoorsClosedStatus = {
  floor0_LdoorClosed: true,
  floor1_LdoorClosed: true,
  floor2_LdoorClosed: true,
  floor3_LdoorClosed: true,
  floor4_LdoorClosed: true,
  floor5_LdoorClosed: true,
  floor6_LdoorClosed: true,
};

let shaftRdoorsOpenStatus = {
  floor0_RdoorOpen: false,
  floor1_RdoorOpen: false,
  floor2_RdoorOpen: false,
  floor3_RdoorOpen: false,
  floor4_RdoorOpen: false,
  floor5_RdoorOpen: false,
  floor6_RdoorOpen: false,
};

let shaftLdoorsOpenStatus = {
  floor0_LdoorOpen: false,
  floor1_LdoorOpen: false,
  floor2_LdoorOpen: false,
  floor3_LdoorOpen: false,
  floor4_LdoorOpen: false,
  floor5_LdoorOpen: false,
  floor6_LdoorOpen: false,
};

const floorLiftLevels = {
  floor0_YPos:
    gameCanvas.height - (gameElements.liftsHeight + gameElements.floorsHeight),
  floor1_YPos:
    gameCanvas.height * 0.875 -
    gameElements.floorsHeight -
    gameElements.liftsHeight,
  floor2_YPos:
    gameCanvas.height * 0.75 -
    gameElements.floorsHeight -
    gameElements.liftsHeight,
  floor3_YPos:
    gameCanvas.height * 0.625 -
    gameElements.floorsHeight -
    gameElements.liftsHeight,
  floor4_YPos:
    gameCanvas.height * 0.5 -
    gameElements.floorsHeight -
    gameElements.liftsHeight,
  floor5_YPos:
    gameCanvas.height * 0.375 -
    gameElements.floorsHeight -
    gameElements.liftsHeight,
  floor6_YPos:
    gameCanvas.height * 0.25 -
    gameElements.floorsHeight -
    gameElements.liftsHeight,
};

// For debugging
let floorLevelSelected = floorLiftLevels.floor0_YPos;

// ___________________________ GAME-LABEL ___________________________
createLabel(
  gameCanvas.width / 2,
  gameCanvas.height * 0.07,
  "ELEVATORS FROM HELL",
  "63px Arial Black",
  "gold",
  "black",
  3,
  8,
  17,
  "strokeText",
  "gold",
  3
);

// ___________________________ Tastatur-Event-Listener ___________________________
document.addEventListener("keydown", function (event) {
  console.log("Taste gedrückt: " + event.key);

  switch (event.key) {
    case "0":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor0_YPos;
      resetRliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF0 = true;
      break;
    case "1":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor1_YPos;
      resetRliftFloorSelection();
      resetLliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF1 = true;
      movingElementsStatusAndPos.liftL_calledToF1 = true;
      break;
    case "2":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor2_YPos;
      resetRliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF2 = true;
      break;
    case "3":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor3_YPos;
      resetRliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF3 = true;
      break;
    case "4":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor4_YPos;
      resetRliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF4 = true;
      break;
    case "5":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor5_YPos;
      resetRliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF5 = true;
      break;
    case "6":
      if (movingElementsStatusAndPos.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor6_YPos;
      resetRliftFloorSelection();
      movingElementsStatusAndPos.liftR_calledToF6 = true;
      break;
    default:
      break;
  }
});

initGame();

// ___________________________ GAME INI ___________________________
function initGame() {
  gameRoutine();
}

// ___________________________ GAME-ROUTINE ___________________________
async function gameRoutine() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  createLabel(
    gameCanvas.width / 2,
    gameCanvas.height * 0.07,
    "<Floor-Level> " +
      floorLevelSelected.toFixed(2) +
      " <Lift-Level> " +
      movingElementsStatusAndPos.liftR_YPos.toFixed(2),
    "63px Arial Black",
    "gold",
    "black",
    3,
    8,
    17,
    "strokeText",
    "gold",
    3
  );
  // createLabel(
  //   gameCanvas.width / 2,
  //   gameCanvas.height * 0.07,
  //   "ELEVATORS FROM HELL",
  //   "63px Arial Black",
  //   "gold",
  //   "black",
  //   3,
  //   8,
  //   17,
  //   "strokeText",
  //   "gold",
  //   3
  // );

  liftsPosUpdate();
  shaftDoorsLogic();

  drawFloors();
  drawWalls();
  drawCeiling();
  drawLifts();
  drawLiftDoors();

  await new Promise((resolve) => setTimeout(resolve, 15));

  requestAnimationFrame(gameRoutine);
}

// ___________________________ SHAFT-DOORS-LOGIC ___________________________
function shaftDoorsLogic() {
  shaftRdoorsClosedStatus.floor0_RdoorClosed =
    gameElements.shaftDoorsRW_f0 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor0_RdoorOpen =
    gameElements.shaftDoorsRW_f0 < 10.5 ? true : false;
  shaftRdoorsClosedStatus.floor1_RdoorClosed =
    gameElements.shaftDoorsRW_f1 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor1_RdoorOpen =
    gameElements.shaftDoorsRW_f1 < 10.5 ? true : false;
  shaftRdoorsClosedStatus.floor2_RdoorClosed =
    gameElements.shaftDoorsRW_f2 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor2_RdoorOpen =
    gameElements.shaftDoorsRW_f2 < 10.5 ? true : false;
  shaftRdoorsClosedStatus.floor3_RdoorClosed =
    gameElements.shaftDoorsRW_f3 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor3_RdoorOpen =
    gameElements.shaftDoorsRW_f3 < 10.5 ? true : false;
  shaftRdoorsClosedStatus.floor4_RdoorClosed =
    gameElements.shaftDoorsRW_f4 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor4_RdoorOpen =
    gameElements.shaftDoorsRW_f4 < 10.5 ? true : false;
  shaftRdoorsClosedStatus.floor5_RdoorClosed =
    gameElements.shaftDoorsRW_f5 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor5_RdoorOpen =
    gameElements.shaftDoorsRW_f5 < 10.5 ? true : false;
  shaftRdoorsClosedStatus.floor6_RdoorClosed =
    gameElements.shaftDoorsRW_f6 > 38.5 ? true : false;
  shaftRdoorsOpenStatus.floor6_RdoorOpen =
    gameElements.shaftDoorsRW_f6 < 10.5 ? true : false;

  shaftLdoorsClosedStatus.floor0_LdoorClosed =
    gameElements.shaftDoorsLW_f0 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor0_LdoorOpen =
    gameElements.shaftDoorsLW_f0 < 10.5 ? true : false;
  shaftLdoorsClosedStatus.floor1_LdoorClosed =
    gameElements.shaftDoorsLW_f1 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor1_LdoorOpen =
    gameElements.shaftDoorsLW_f1 < 10.5 ? true : false;
  shaftLdoorsClosedStatus.floor2_LdoorClosed =
    gameElements.shaftDoorsLW_f2 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor2_LdoorOpen =
    gameElements.shaftDoorsLW_f2 < 10.5 ? true : false;
  shaftLdoorsClosedStatus.floor3_LdoorClosed =
    gameElements.shaftDoorsLW_f3 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor3_LdoorOpen =
    gameElements.shaftDoorsLW_f3 < 10.5 ? true : false;
  shaftLdoorsClosedStatus.floor4_LdoorClosed =
    gameElements.shaftDoorsLW_f4 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor4_LdoorOpen =
    gameElements.shaftDoorsLW_f4 < 10.5 ? true : false;
  shaftLdoorsClosedStatus.floor5_LdoorClosed =
    gameElements.shaftDoorsLW_f5 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor5_LdoorOpen =
    gameElements.shaftDoorsLW_f5 < 10.5 ? true : false;
  shaftLdoorsClosedStatus.floor6_LdoorClosed =
    gameElements.shaftDoorsLW_f6 > 38.5 ? true : false;
  shaftLdoorsOpenStatus.floor6_LdoorOpen =
    gameElements.shaftDoorsLW_f6 < 10.5 ? true : false;

  // CLOSE-DOORS
  gameElements.shaftDoorsRW_f0 =
    !movingElementsStatusAndPos.liftR_calledToF0 &&
    !shaftRdoorsClosedStatus.floor0_RdoorClosed
      ? (gameElements.shaftDoorsRW_f0 += 0.5)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    !movingElementsStatusAndPos.liftR_calledToF1 &&
    !shaftRdoorsClosedStatus.floor1_RdoorClosed
      ? (gameElements.shaftDoorsRW_f1 += 0.5)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    !movingElementsStatusAndPos.liftR_calledToF2 &&
    !shaftRdoorsClosedStatus.floor2_RdoorClosed
      ? (gameElements.shaftDoorsRW_f2 += 0.5)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    !movingElementsStatusAndPos.liftR_calledToF3 &&
    !shaftRdoorsClosedStatus.floor3_RdoorClosed
      ? (gameElements.shaftDoorsRW_f3 += 0.5)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    !movingElementsStatusAndPos.liftR_calledToF4 &&
    !shaftRdoorsClosedStatus.floor4_RdoorClosed
      ? (gameElements.shaftDoorsRW_f4 += 0.5)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    !movingElementsStatusAndPos.liftR_calledToF5 &&
    !shaftRdoorsClosedStatus.floor5_RdoorClosed
      ? (gameElements.shaftDoorsRW_f5 += 0.5)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    !movingElementsStatusAndPos.liftR_calledToF6 &&
    !shaftRdoorsClosedStatus.floor6_RdoorClosed
      ? (gameElements.shaftDoorsRW_f6 += 0.5)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    !movingElementsStatusAndPos.liftL_calledToF0 &&
    !shaftLdoorsClosedStatus.floor0_LdoorClosed
      ? (gameElements.shaftDoorsLW_f0 += 0.5)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsRW_f1 =
    !movingElementsStatusAndPos.liftL_calledToF1 &&
    !shaftLdoorsClosedStatus.floor1_LdoorClosed
      ? (gameElements.shaftDoorsLW_f1 += 0.5)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsRW_f2 =
    !movingElementsStatusAndPos.liftL_calledToF2 &&
    !shaftLdoorsClosedStatus.floor2_LdoorClosed
      ? (gameElements.shaftDoorsLW_f2 += 0.5)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsRW_f3 =
    !movingElementsStatusAndPos.liftL_calledToF3 &&
    !shaftLdoorsClosedStatus.floor3_LdoorClosed
      ? (gameElements.shaftDoorsLW_f3 += 0.5)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsRW_f4 =
    !movingElementsStatusAndPos.liftL_calledToF4 &&
    !shaftLdoorsClosedStatus.floor4_LdoorClosed
      ? (gameElements.shaftDoorsLW_f4 += 0.5)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsRW_f5 =
    !movingElementsStatusAndPos.liftL_calledToF5 &&
    !shaftLdoorsClosedStatus.floor5_LdoorClosed
      ? (gameElements.shaftDoorsLW_f5 += 0.5)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsRW_f6 =
    !movingElementsStatusAndPos.liftL_calledToF6 &&
    !shaftLdoorsClosedStatus.floor6_LdoorClosed
      ? (gameElements.shaftDoorsLW_f6 += 0.5)
      : gameElements.shaftDoorsLW_f6;

  // OPEN-DOORS
  gameElements.shaftDoorsRW_f0 =
    movingElementsStatusAndPos.liftR_calledToF0 &&
    movingElementsStatusAndPos.liftR_isOnFloor0 &&
    !shaftRdoorsOpenStatus.floor0_RdoorOpen
      ? (gameElements.shaftDoorsRW_f0 -= 0.5)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    movingElementsStatusAndPos.liftR_calledToF1 &&
    movingElementsStatusAndPos.liftR_isOnFloor1 &&
    !shaftRdoorsOpenStatus.floor1_RdoorOpen
      ? (gameElements.shaftDoorsRW_f1 -= 0.5)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    movingElementsStatusAndPos.liftR_calledToF2 &&
    movingElementsStatusAndPos.liftR_isOnFloor2 &&
    !shaftRdoorsOpenStatus.floor2_RdoorOpen
      ? (gameElements.shaftDoorsRW_f2 -= 0.5)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    movingElementsStatusAndPos.liftR_calledToF3 &&
    movingElementsStatusAndPos.liftR_isOnFloor3 &&
    !shaftRdoorsOpenStatus.floor3_RdoorOpen
      ? (gameElements.shaftDoorsRW_f3 -= 0.5)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    movingElementsStatusAndPos.liftR_calledToF4 &&
    movingElementsStatusAndPos.liftR_isOnFloor4 &&
    !shaftRdoorsOpenStatus.floor4_RdoorOpen
      ? (gameElements.shaftDoorsRW_f4 -= 0.5)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    movingElementsStatusAndPos.liftR_calledToF5 &&
    movingElementsStatusAndPos.liftR_isOnFloor5 &&
    !shaftRdoorsOpenStatus.floor5_RdoorOpen
      ? (gameElements.shaftDoorsRW_f5 -= 0.5)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    movingElementsStatusAndPos.liftR_calledToF6 &&
    movingElementsStatusAndPos.liftR_isOnFloor6 &&
    !shaftRdoorsOpenStatus.floor6_RdoorOpen
      ? (gameElements.shaftDoorsRW_f6 -= 0.5)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    movingElementsStatusAndPos.liftL_calledToF0 &&
    movingElementsStatusAndPos.liftL_isOnFloor0 &&
    !shaftLdoorsOpenStatus.floor0_LdoorOpen
      ? (gameElements.shaftDoorsLW_f0 -= 0.5)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    movingElementsStatusAndPos.liftL_calledToF1 &&
    movingElementsStatusAndPos.liftL_isOnFloor1 &&
    !shaftLdoorsOpenStatus.floor1_LdoorOpen
      ? (gameElements.shaftDoorsLW_f1 -= 0.5)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    movingElementsStatusAndPos.liftL_calledToF2 &&
    movingElementsStatusAndPos.liftL_isOnFloor2 &&
    !shaftLdoorsOpenStatus.floor2_LdoorOpen
      ? (gameElements.shaftDoorsLW_f2 -= 0.5)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    movingElementsStatusAndPos.liftL_calledToF3 &&
    movingElementsStatusAndPos.liftL_isOnFloor3 &&
    !shaftLdoorsOpenStatus.floor3_LdoorOpen
      ? (gameElements.shaftDoorsLW_f3 -= 0.5)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    movingElementsStatusAndPos.liftL_calledToF4 &&
    movingElementsStatusAndPos.liftL_isOnFloor4 &&
    !shaftLdoorsOpenStatus.floor4_LdoorOpen
      ? (gameElements.shaftDoorsLW_f4 -= 0.5)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    movingElementsStatusAndPos.liftL_calledToF5 &&
    movingElementsStatusAndPos.liftL_isOnFloor5 &&
    !shaftLdoorsOpenStatus.floor5_LdoorOpen
      ? (gameElements.shaftDoorsLW_f5 -= 0.5)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    movingElementsStatusAndPos.liftL_calledToF6 &&
    movingElementsStatusAndPos.liftL_isOnFloor6 &&
    !shaftLdoorsOpenStatus.floor6_LdoorOpen
      ? (gameElements.shaftDoorsLW_f6 -= 0.5)
      : gameElements.shaftDoorsLW_f6;
}

// ___________________________ LIFTS-POS-UPDATES ___________________________

// Lift Floor-Check logic Right
function liftsPosUpdate() {
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor0_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor0 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor1_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor1 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
    console.log(movingElementsStatusAndPos.liftR_isOnFloor1);
  }
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor2_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor2 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor3_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor3 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor4_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor4 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor5_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor5 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftR_YPos === floorLiftLevels.floor6_YPos) {
    resetRliftFloorStatus();
    movingElementsStatusAndPos.liftR_isOnFloor6 = true;
    movingElementsStatusAndPos.liftR_isMoving = false;
  }
  // Lift Floor-Check logic Left
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor0_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor0 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor1_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor1 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
    console.log(movingElementsStatusAndPos.liftR_isOnFloor1);
  }
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor2_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor2 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor3_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor3 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor4_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor4 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor5_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor5 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
  }
  if (movingElementsStatusAndPos.liftL_YPos === floorLiftLevels.floor6_YPos) {
    resetLliftFloorStatus();
    movingElementsStatusAndPos.liftL_isOnFloor6 = true;
    movingElementsStatusAndPos.liftL_isMoving = false;
  }

  // LIFT MOVEMENT LOGIC
  if (movingElementsStatusAndPos.liftR_calledToF0) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor0 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed;
    }
  }
  if (movingElementsStatusAndPos.liftR_calledToF1) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor1 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos =
        movingElementsStatusAndPos.liftR_YPos < floorLiftLevels.floor1_YPos
          ? (movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed)
          : (movingElementsStatusAndPos.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (movingElementsStatusAndPos.liftR_calledToF2) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor2 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos =
        movingElementsStatusAndPos.liftR_YPos < floorLiftLevels.floor2_YPos
          ? (movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed)
          : (movingElementsStatusAndPos.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (movingElementsStatusAndPos.liftR_calledToF3) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor3 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos =
        movingElementsStatusAndPos.liftR_YPos < floorLiftLevels.floor3_YPos
          ? (movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed)
          : (movingElementsStatusAndPos.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (movingElementsStatusAndPos.liftR_calledToF4) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor4 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos =
        movingElementsStatusAndPos.liftR_YPos < floorLiftLevels.floor4_YPos
          ? (movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed)
          : (movingElementsStatusAndPos.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (movingElementsStatusAndPos.liftR_calledToF5) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor5 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos =
        movingElementsStatusAndPos.liftR_YPos < floorLiftLevels.floor5_YPos
          ? (movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed)
          : (movingElementsStatusAndPos.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (movingElementsStatusAndPos.liftR_calledToF6) {
    if (
      !movingElementsStatusAndPos.liftR_isOnFloor6 &&
      shaftRdoorsClosedCheck()
    ) {
      movingElementsStatusAndPos.liftR_isMoving = true;
      movingElementsStatusAndPos.liftR_YPos =
        movingElementsStatusAndPos.liftR_YPos < floorLiftLevels.floor6_YPos
          ? (movingElementsStatusAndPos.liftR_YPos += gameElements.liftSpeed)
          : (movingElementsStatusAndPos.liftR_YPos -= gameElements.liftSpeed);
    }
  }
}

function resetRliftFloorSelection() {
  movingElementsStatusAndPos.liftR_calledToF0 = false;
  movingElementsStatusAndPos.liftR_calledToF1 = false;
  movingElementsStatusAndPos.liftR_calledToF2 = false;
  movingElementsStatusAndPos.liftR_calledToF3 = false;
  movingElementsStatusAndPos.liftR_calledToF4 = false;
  movingElementsStatusAndPos.liftR_calledToF5 = false;
  movingElementsStatusAndPos.liftR_calledToF6 = false;
}

function resetLliftFloorSelection() {
  movingElementsStatusAndPos.liftL_calledToF0 = false;
  movingElementsStatusAndPos.liftL_calledToF1 = false;
  movingElementsStatusAndPos.liftL_calledToF2 = false;
  movingElementsStatusAndPos.liftL_calledToF3 = false;
  movingElementsStatusAndPos.liftL_calledToF4 = false;
  movingElementsStatusAndPos.liftL_calledToF5 = false;
  movingElementsStatusAndPos.liftL_calledToF6 = false;
}

function resetRliftFloorStatus() {
  movingElementsStatusAndPos.liftR_isOnFloor0 = false;
  movingElementsStatusAndPos.liftR_isOnFloor1 = false;
  movingElementsStatusAndPos.liftR_isOnFloor2 = false;
  movingElementsStatusAndPos.liftR_isOnFloor3 = false;
  movingElementsStatusAndPos.liftR_isOnFloor4 = false;
  movingElementsStatusAndPos.liftR_isOnFloor5 = false;
  movingElementsStatusAndPos.liftR_isOnFloor6 = false;
}

function resetLliftFloorStatus() {
  movingElementsStatusAndPos.liftL_isOnFloor0 = false;
  movingElementsStatusAndPos.liftL_isOnFloor1 = false;
  movingElementsStatusAndPos.liftL_isOnFloor2 = false;
  movingElementsStatusAndPos.liftL_isOnFloor3 = false;
  movingElementsStatusAndPos.liftL_isOnFloor4 = false;
  movingElementsStatusAndPos.liftL_isOnFloor5 = false;
  movingElementsStatusAndPos.liftL_isOnFloor6 = false;
}

function shaftRdoorsClosedCheck() {
  return Object.values(shaftRdoorsClosedStatus).every(Boolean);
}

function shaftLdoorsClosedCheck() {
  return Object.values(shaftLdoorsClosedStatus).every(Boolean);
}

function drawLifts() {
  ctx.fillStyle = "#BFBF00";
  ctx.fillRect(
    gameCanvas.width * 0.2 - gameElements.liftsWidth / 2,
    movingElementsStatusAndPos.liftL_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
    movingElementsStatusAndPos.liftR_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );
}

function drawLiftDoors() {
  ctx.fillStyle = "#3F0000";

  // Floor 0 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f0,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f0,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f0,
    gameElements.shaftDoorsHeight
  );

  // Floor 0 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f0,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f0,
    gameCanvas.height * 1.0 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f0,
    gameElements.shaftDoorsHeight
  );

  // Floor 1 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f1,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f1,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f1,
    gameElements.shaftDoorsHeight
  );

  // Floor 1 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f1,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f1,
    gameCanvas.height * 0.875 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f1,
    gameElements.shaftDoorsHeight
  );

  // Floor 2 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f2,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f2,
    gameElements.shaftDoorsHeight
  );

  // Floor 2 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f2,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f2,
    gameCanvas.height * 0.75 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f2,
    gameElements.shaftDoorsHeight
  );

  // Floor 3 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f3,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f3,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f3,
    gameElements.shaftDoorsHeight
  );

  // Floor 3 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f3,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f3,
    gameCanvas.height * 0.625 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f3,
    gameElements.shaftDoorsHeight
  );

  // Floor 4 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f4,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f4,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f4,
    gameElements.shaftDoorsHeight
  );

  // Floor 4 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f4,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f4,
    gameCanvas.height * 0.5 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f4,
    gameElements.shaftDoorsHeight
  );

  // Floor 5 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f5,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f5,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f5,
    gameElements.shaftDoorsHeight
  );

  // Floor 5 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f5,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f5,
    gameCanvas.height * 0.375 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f5,
    gameElements.shaftDoorsHeight
  );

  // Floor 6 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f6,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsLW_f6,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsLW_f6,
    gameElements.shaftDoorsHeight
  );

  // Floor 6 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftsWidth / 2,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f6,
    gameElements.shaftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftsWidth / 2 -
      gameElements.shaftDoorsRW_f6,
    gameCanvas.height * 0.25 -
      gameElements.shaftDoorsHeight -
      gameElements.floorsHeight,
    gameElements.shaftDoorsRW_f6,
    gameElements.shaftDoorsHeight
  );

  // DEBUGGING - CODE
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
    floorLiftLevels.floor1_YPos,
    100,
    3
  );

  ctx.fillStyle = "#0000AA";
  ctx.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
    floorLevelSelected,
    100,
    3
  );
}

function drawCeiling() {
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.505 - gameElements.ceilingWidth / 2,
    gameCanvas.height * 0.105,
    gameElements.ceilingWidth,
    gameElements.ceilingHeight
  );
}

function drawWalls() {
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.05,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight - 130
  );

  ctx.fillRect(
    gameCanvas.width * 0.95,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight
  );
}

function drawFloors() {
  // Starting with floor 0 =>
  ctx.fillStyle = "#373737";
  gameElements.floorsWidth += 500;
  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 1.0 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillStyle = "#171717";
  gameElements.floorsWidth -= 500;

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 0.875 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 0.75 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 0.625 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 0.5 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 0.375 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameCanvas.height * 0.25 - gameElements.floorsHeight,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );
}

function createLabel(
  xPos,
  yPos,
  text,
  font,
  color,
  shadowColor = "rgba(0,0,0,0.5)",
  shadowBlur = 4,
  shadowOffsetX = 2,
  shadowOffsetY = 2,
  textStyle = "fillText",
  strokeColor = "goldenrod",
  strokeLineWidth = 2
) {
  // Schriftart und -größe festlegen
  ctx.font = font;

  // Textausrichtung festlegen
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Textschatten konfigurieren
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  ctx.fillStyle = color;

  // Text Style
  ctx.strokeStyle = strokeColor; // Randfarbe
  ctx.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    ctx.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    ctx.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function createHomeButton(posX, posY) {
  homeButton.textContent = "Home";
  homeButton.style.position = "absolute";
  homeButton.style.top = posY;
  homeButton.style.left = posX;
  homeButton.style.transform = "translate(-50%, -50%)";

  // Breite und Höhe anpassen
  homeButton.style.width = "200px";
  homeButton.style.height = "50px";

  // Hintergrund- und Textfarbe ändern
  homeButton.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
  homeButton.style.color = "darkgoldenrod";

  // Schriftgröße und Schriftart anpassen
  homeButton.style.fontSize = "33px";
  homeButton.style.fontFamily = "Times New Roman, Arial";

  // Border Radius
  homeButton.style.borderRadius = "10px";

  // Border / Cursor
  homeButton.style.border = "2px solid goldenrod";
  homeButton.style.cursor = "pointer";

  // Box-Shadow hinzufügen
  homeButton.style.boxShadow = "0 0 55px red";

  // Übergänge für Hover-Effekt
  homeButton.style.transition =
    "background-color 0.5s, color 0.5s, border 1.0s, box-shadow 0.5s";

  // Hover-Effekt hinzufügen
  homeButton.addEventListener("mouseover", function () {
    this.style.backgroundColor = "rgba(200, 200, 0, 1.0)";
    this.style.color = "#000000";
    this.style.border = "2px solid black";
    this.style.boxShadow = "0 0 55px greenyellow";
  });

  homeButton.addEventListener("mouseout", function () {
    this.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
    this.style.color = "darkgoldenrod";
    this.style.border = "2px solid goldenrod";
    this.style.boxShadow = "0 0 55px red";
  });

  // Korrigierter Event-Listener für Klick-Ereignis
  homeButton.addEventListener("click", function () {
    document.body.removeChild(this); // 'this' bezieht sich auf den geklickten Button
    window.location.href = "../index.html";
  });

  document.body.appendChild(homeButton);
}
