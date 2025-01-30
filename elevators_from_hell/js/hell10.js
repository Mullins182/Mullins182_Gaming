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
  shaftDoorsLW_f0: 38.75,
  shaftDoorsRW_f0: 38.75,
  shaftDoorsLW_f1: 38.75,
  shaftDoorsRW_f1: 38.75,
  shaftDoorsLW_f2: 38.75,
  shaftDoorsRW_f2: 38.75,
  shaftDoorsLW_f3: 38.75,
  shaftDoorsRW_f3: 38.75,
  shaftDoorsLW_f4: 38.75,
  shaftDoorsRW_f4: 38.75,
  shaftDoorsLW_f5: 38.75,
  shaftDoorsRW_f5: 38.75,
  shaftDoorsLW_f6: 38.75,
  shaftDoorsRW_f6: 38.75,
  liftsWidth: 75,
  liftsHeight: 88,
  liftSpeed: 1.25,
  playerHeight: 40,
  playerWidth: 20,
  playerSpeed: 2.35,
  playerMovement: "stop",
};

let moveableElems = {
  playerPosX: gameCanvas.width / 2,
  playerPosY:
    gameCanvas.height - (gameElements.floorsHeight + gameElements.playerHeight),
  playerOnLiftR: false,
  playerOnLiftL: false,

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

// ___________________________ DEBUGGING ___________________________
let floorLevelSelected = floorLiftLevels.floor0_YPos;
let debugMode = false;
let automaticLeftElevator = false;

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
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor0_YPos;
      resetRliftFloorSelection();
      resetLliftFloorSelection();
      moveableElems.liftR_calledToF0 = true;
      moveableElems.liftL_calledToF0 = true;
      break;
    case "1":
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor1_YPos;
      resetRliftFloorSelection();
      resetLliftFloorSelection();
      moveableElems.liftR_calledToF1 = true;
      moveableElems.liftL_calledToF1 = true;
      break;
    case "2":
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor2_YPos;
      resetRliftFloorSelection();
      moveableElems.liftR_calledToF2 = true;
      break;
    case "3":
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor3_YPos;
      resetRliftFloorSelection();
      moveableElems.liftR_calledToF3 = true;
      break;
    case "4":
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor4_YPos;
      resetRliftFloorSelection();
      moveableElems.liftR_calledToF4 = true;
      break;
    case "5":
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor5_YPos;
      resetRliftFloorSelection();
      moveableElems.liftR_calledToF5 = true;
      break;
    case "6":
      if (moveableElems.liftR_isMoving) {
        break;
      }
      floorLevelSelected = floorLiftLevels.floor6_YPos;
      resetRliftFloorSelection();
      moveableElems.liftR_calledToF6 = true;
      break;
    case "ArrowLeft":
      gameElements.playerMovement = "left";
      break;
    case "ArrowRight":
      gameElements.playerMovement = "right";
      break;
    case "ArrowDown":
      gameElements.playerMovement = "stop";
      break;
    case "ArrowUp":
      gameElements.playerMovement = "stop";
      break;
    case "r":
      automaticLeftElevator = automaticLeftElevator ? false : true;
      break;
    case "d":
      debugMode = debugMode ? false : true;
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

  //   console.log(
  //     "Stockwerk 1 - Türöffnung:",
  //     gameElements.shaftDoorsRW_f1
  // );

  if (debugMode) {
    let isOnLift =
      moveableElems.playerOnLiftR || moveableElems.playerOnLiftL ? true : false;

    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "<Lift-Entered> " +
        isOnLift +
        "<PlayerPosX> " +
        moveableElems.playerPosX.toFixed(2),
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
  } else {
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
  }

  createLabel(
    185,
    gameCanvas.height - 75,
    "EXIT",
    "33px Arial Black",
    "gold",
    "darkred",
    2,
    7,
    20,
    "strokeText",
    "red",
    1.6
  );

  liftsPosUpdate();
  playerPosUpdate(gameElements.playerMovement);
  playerOnLift();
  shaftDoorsLogic();

  drawFloors();
  drawWalls();
  drawCeiling();
  drawLifts();
  drawPlayer(moveableElems.playerPosX, moveableElems.playerPosY);
  drawLiftDoors();

  if (automaticLeftElevator) {
    if (moveableElems.liftL_isMoving || !shaftLdoorsOpenCheck()) {
    } else {
      let randomNum = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
      console.log(randomNum);
      floorLevelSelected =
        randomNum == 6
          ? floorLiftLevels.floor6_YPos
          : randomNum == 5
          ? floorLiftLevels.floor5_YPos
          : randomNum == 4
          ? floorLiftLevels.floor4_YPos
          : randomNum == 3
          ? floorLiftLevels.floor3_YPos
          : randomNum == 2
          ? floorLiftLevels.floor2_YPos
          : randomNum == 1
          ? floorLiftLevels.floor1_YPos
          : randomNum == 0
          ? floorLiftLevels.floor0_YPos
          : floorLiftLevels.floor6_YPos;

      moveableElems.liftL_calledToF6 = randomNum == 6 ? true : false;
      moveableElems.liftL_calledToF5 = randomNum == 5 ? true : false;
      moveableElems.liftL_calledToF4 = randomNum == 4 ? true : false;
      moveableElems.liftL_calledToF3 = randomNum == 3 ? true : false;
      moveableElems.liftL_calledToF2 = randomNum == 2 ? true : false;
      moveableElems.liftL_calledToF1 = randomNum == 1 ? true : false;
      moveableElems.liftL_calledToF0 = randomNum == 0 ? true : false;
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 15));

  requestAnimationFrame(gameRoutine);
}

// ___________________________ PLAYER ON LIFT-CHECK ___________________________

function playerOnLift() {
  moveableElems.playerOnLiftR =
    moveableElems.playerPosX >
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2
      ? true
      : false;
  moveableElems.playerOnLiftL =
    moveableElems.playerPosX < gameCanvas.width * 0.2 ? true : false;
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

  // __________________________________________________ LEFT __________________________________________________

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

  // __________________________________________________ CLOSE-DOORS __________________________________________________
  gameElements.shaftDoorsRW_f0 =
    !moveableElems.liftR_calledToF0 &&
    !shaftRdoorsClosedStatus.floor0_RdoorClosed
      ? (gameElements.shaftDoorsRW_f0 += 0.25)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    !moveableElems.liftR_calledToF1 &&
    !shaftRdoorsClosedStatus.floor1_RdoorClosed
      ? (gameElements.shaftDoorsRW_f1 += 0.25)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    !moveableElems.liftR_calledToF2 &&
    !shaftRdoorsClosedStatus.floor2_RdoorClosed
      ? (gameElements.shaftDoorsRW_f2 += 0.25)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    !moveableElems.liftR_calledToF3 &&
    !shaftRdoorsClosedStatus.floor3_RdoorClosed
      ? (gameElements.shaftDoorsRW_f3 += 0.25)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    !moveableElems.liftR_calledToF4 &&
    !shaftRdoorsClosedStatus.floor4_RdoorClosed
      ? (gameElements.shaftDoorsRW_f4 += 0.25)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    !moveableElems.liftR_calledToF5 &&
    !shaftRdoorsClosedStatus.floor5_RdoorClosed
      ? (gameElements.shaftDoorsRW_f5 += 0.25)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    !moveableElems.liftR_calledToF6 &&
    !shaftRdoorsClosedStatus.floor6_RdoorClosed
      ? (gameElements.shaftDoorsRW_f6 += 0.25)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    !moveableElems.liftL_calledToF0 &&
    !shaftLdoorsClosedStatus.floor0_LdoorClosed
      ? (gameElements.shaftDoorsLW_f0 += 0.25)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    !moveableElems.liftL_calledToF1 &&
    !shaftLdoorsClosedStatus.floor1_LdoorClosed
      ? (gameElements.shaftDoorsLW_f1 += 0.25)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    !moveableElems.liftL_calledToF2 &&
    !shaftLdoorsClosedStatus.floor2_LdoorClosed
      ? (gameElements.shaftDoorsLW_f2 += 0.25)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    !moveableElems.liftL_calledToF3 &&
    !shaftLdoorsClosedStatus.floor3_LdoorClosed
      ? (gameElements.shaftDoorsLW_f3 += 0.25)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    !moveableElems.liftL_calledToF4 &&
    !shaftLdoorsClosedStatus.floor4_LdoorClosed
      ? (gameElements.shaftDoorsLW_f4 += 0.25)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    !moveableElems.liftL_calledToF5 &&
    !shaftLdoorsClosedStatus.floor5_LdoorClosed
      ? (gameElements.shaftDoorsLW_f5 += 0.25)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    !moveableElems.liftL_calledToF6 &&
    !shaftLdoorsClosedStatus.floor6_LdoorClosed
      ? (gameElements.shaftDoorsLW_f6 += 0.25)
      : gameElements.shaftDoorsLW_f6;

  // __________________________________________________ OPEN-DOORS __________________________________________________
  gameElements.shaftDoorsRW_f0 =
    moveableElems.liftR_calledToF0 &&
    moveableElems.liftR_isOnFloor0 &&
    !shaftRdoorsOpenStatus.floor0_RdoorOpen
      ? (gameElements.shaftDoorsRW_f0 -= 0.25)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    moveableElems.liftR_calledToF1 &&
    moveableElems.liftR_isOnFloor1 &&
    !shaftRdoorsOpenStatus.floor1_RdoorOpen
      ? (gameElements.shaftDoorsRW_f1 -= 0.25)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    moveableElems.liftR_calledToF2 &&
    moveableElems.liftR_isOnFloor2 &&
    !shaftRdoorsOpenStatus.floor2_RdoorOpen
      ? (gameElements.shaftDoorsRW_f2 -= 0.25)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    moveableElems.liftR_calledToF3 &&
    moveableElems.liftR_isOnFloor3 &&
    !shaftRdoorsOpenStatus.floor3_RdoorOpen
      ? (gameElements.shaftDoorsRW_f3 -= 0.25)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    moveableElems.liftR_calledToF4 &&
    moveableElems.liftR_isOnFloor4 &&
    !shaftRdoorsOpenStatus.floor4_RdoorOpen
      ? (gameElements.shaftDoorsRW_f4 -= 0.25)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    moveableElems.liftR_calledToF5 &&
    moveableElems.liftR_isOnFloor5 &&
    !shaftRdoorsOpenStatus.floor5_RdoorOpen
      ? (gameElements.shaftDoorsRW_f5 -= 0.25)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    moveableElems.liftR_calledToF6 &&
    moveableElems.liftR_isOnFloor6 &&
    !shaftRdoorsOpenStatus.floor6_RdoorOpen
      ? (gameElements.shaftDoorsRW_f6 -= 0.25)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    moveableElems.liftL_calledToF0 &&
    moveableElems.liftL_isOnFloor0 &&
    !shaftLdoorsOpenStatus.floor0_LdoorOpen
      ? (gameElements.shaftDoorsLW_f0 -= 0.25)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    moveableElems.liftL_calledToF1 &&
    moveableElems.liftL_isOnFloor1 &&
    !shaftLdoorsOpenStatus.floor1_LdoorOpen
      ? (gameElements.shaftDoorsLW_f1 -= 0.25)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    moveableElems.liftL_calledToF2 &&
    moveableElems.liftL_isOnFloor2 &&
    !shaftLdoorsOpenStatus.floor2_LdoorOpen
      ? (gameElements.shaftDoorsLW_f2 -= 0.25)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    moveableElems.liftL_calledToF3 &&
    moveableElems.liftL_isOnFloor3 &&
    !shaftLdoorsOpenStatus.floor3_LdoorOpen
      ? (gameElements.shaftDoorsLW_f3 -= 0.25)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    moveableElems.liftL_calledToF4 &&
    moveableElems.liftL_isOnFloor4 &&
    !shaftLdoorsOpenStatus.floor4_LdoorOpen
      ? (gameElements.shaftDoorsLW_f4 -= 0.25)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    moveableElems.liftL_calledToF5 &&
    moveableElems.liftL_isOnFloor5 &&
    !shaftLdoorsOpenStatus.floor5_LdoorOpen
      ? (gameElements.shaftDoorsLW_f5 -= 0.25)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    moveableElems.liftL_calledToF6 &&
    moveableElems.liftL_isOnFloor6 &&
    !shaftLdoorsOpenStatus.floor6_LdoorOpen
      ? (gameElements.shaftDoorsLW_f6 -= 0.25)
      : gameElements.shaftDoorsLW_f6;
}

// ___________________________ PLAYER-POS-UPDATES ___________________________

function playerPosUpdate(moveDirection) {
  moveableElems.playerPosX =
    moveDirection === "left"
      ? (moveableElems.playerPosX -= gameElements.playerSpeed)
      : moveDirection === "right"
      ? (moveableElems.playerPosX += gameElements.playerSpeed)
      : moveDirection === "stop"
      ? moveableElems.playerPosX
      : gameCanvas.width / 2;

  moveableElems.playerPosY = moveableElems.playerOnLiftR
    ? (moveableElems.playerPosY =
        moveableElems.liftR_YPos +
        (gameElements.liftsHeight - gameElements.playerHeight))
    : moveableElems.playerOnLiftL
    ? (moveableElems.playerPosY =
        moveableElems.liftL_YPos +
        (gameElements.liftsHeight - gameElements.playerHeight))
    : moveableElems.playerPosY;
}

// ___________________________ LIFTS-POS-UPDATES ___________________________

// Lift Floor-Check logic Right
function liftsPosUpdate() {
  if (moveableElems.liftR_YPos === floorLiftLevels.floor0_YPos) {
    moveableElems.liftR_isOnFloor0 = true;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor1_YPos) {
    moveableElems.liftR_isOnFloor1 = true;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor2_YPos) {
    moveableElems.liftR_isOnFloor2 = true;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor3_YPos) {
    moveableElems.liftR_isOnFloor3 = true;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor4_YPos) {
    moveableElems.liftR_isOnFloor4 = true;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor5_YPos) {
    moveableElems.liftR_isOnFloor5 = true;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor6_YPos) {
    moveableElems.liftR_isOnFloor6 = true;
    moveableElems.liftR_isMoving = false;
  }
  // Lift Floor-Check logic Left
  if (moveableElems.liftL_YPos === floorLiftLevels.floor0_YPos) {
    moveableElems.liftL_isOnFloor0 = true;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor1_YPos) {
    moveableElems.liftL_isOnFloor1 = true;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor2_YPos) {
    moveableElems.liftL_isOnFloor2 = true;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor3_YPos) {
    moveableElems.liftL_isOnFloor3 = true;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor4_YPos) {
    moveableElems.liftL_isOnFloor4 = true;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor5_YPos) {
    moveableElems.liftL_isOnFloor5 = true;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor6_YPos) {
    moveableElems.liftL_isOnFloor6 = true;
    moveableElems.liftL_isMoving = false;
  }

  // LIFT MOVEMENT LOGIC
  if (moveableElems.liftR_calledToF0) {
    if (!moveableElems.liftR_isOnFloor0 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos += gameElements.liftSpeed;
    }
  }
  if (moveableElems.liftR_calledToF1) {
    if (!moveableElems.liftR_isOnFloor1 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor1_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToF2) {
    if (!moveableElems.liftR_isOnFloor2 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor2_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToF3) {
    if (!moveableElems.liftR_isOnFloor3 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor3_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToF4) {
    if (!moveableElems.liftR_isOnFloor4 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor4_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToF5) {
    if (!moveableElems.liftR_isOnFloor5 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor5_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToF6) {
    if (!moveableElems.liftR_isOnFloor6 && shaftRdoorsClosedCheck()) {
      moveableElems.liftR_isMoving = true;
      resetRliftFloorStatus();
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor6_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }

  //__________________________________ LEFT LIFT __________________________________

  if (moveableElems.liftL_calledToF0) {
    if (!moveableElems.liftL_isOnFloor0 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor0_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToF1) {
    if (!moveableElems.liftL_isOnFloor1 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor1_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToF2) {
    if (!moveableElems.liftL_isOnFloor2 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor2_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToF3) {
    if (!moveableElems.liftL_isOnFloor3 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor3_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToF4) {
    if (!moveableElems.liftL_isOnFloor4 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor4_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToF5) {
    if (!moveableElems.liftL_isOnFloor5 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor5_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToF6) {
    if (!moveableElems.liftL_isOnFloor6 && shaftLdoorsClosedCheck()) {
      moveableElems.liftL_isMoving = true;
      resetLliftFloorStatus();
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor6_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
}

function resetRliftFloorSelection() {
  moveableElems.liftR_calledToF0 = false;
  moveableElems.liftR_calledToF1 = false;
  moveableElems.liftR_calledToF2 = false;
  moveableElems.liftR_calledToF3 = false;
  moveableElems.liftR_calledToF4 = false;
  moveableElems.liftR_calledToF5 = false;
  moveableElems.liftR_calledToF6 = false;
}

function resetLliftFloorSelection() {
  moveableElems.liftL_calledToF0 = false;
  moveableElems.liftL_calledToF1 = false;
  moveableElems.liftL_calledToF2 = false;
  moveableElems.liftL_calledToF3 = false;
  moveableElems.liftL_calledToF4 = false;
  moveableElems.liftL_calledToF5 = false;
  moveableElems.liftL_calledToF6 = false;
}

function resetRliftFloorStatus() {
  moveableElems.liftR_isOnFloor0 = false;
  moveableElems.liftR_isOnFloor1 = false;
  moveableElems.liftR_isOnFloor2 = false;
  moveableElems.liftR_isOnFloor3 = false;
  moveableElems.liftR_isOnFloor4 = false;
  moveableElems.liftR_isOnFloor5 = false;
  moveableElems.liftR_isOnFloor6 = false;
}

function resetLliftFloorStatus() {
  moveableElems.liftL_isOnFloor0 = false;
  moveableElems.liftL_isOnFloor1 = false;
  moveableElems.liftL_isOnFloor2 = false;
  moveableElems.liftL_isOnFloor3 = false;
  moveableElems.liftL_isOnFloor4 = false;
  moveableElems.liftL_isOnFloor5 = false;
  moveableElems.liftL_isOnFloor6 = false;
}

function shaftRdoorsClosedCheck() {
  return Object.values(shaftRdoorsClosedStatus).every(Boolean);
}

function shaftRdoorsOpenCheck() {
  return Object.values(shaftRdoorsOpenStatus).some(Boolean);
}

function shaftLdoorsClosedCheck() {
  return Object.values(shaftLdoorsClosedStatus).every(Boolean);
}

function shaftLdoorsOpenCheck() {
  return Object.values(shaftLdoorsOpenStatus).some(Boolean);
}

function drawLifts() {
  ctx.fillStyle = "#BFBF00";
  ctx.fillRect(
    gameCanvas.width * 0.2 - gameElements.liftsWidth / 2,
    moveableElems.liftL_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
    moveableElems.liftR_YPos,
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

  // __________________________________________________ DEBUGGING - CODE __________________________________________________

  if (debugMode) {
    // ctx.fillStyle = "#0000FF";
    // ctx.fillRect(0, floorLiftLevels.floor1_YPos, 1600, 3);

    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0, floorLevelSelected, 1600, 3);
  }
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

function drawPlayer(xPos, yPos) {
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(xPos, yPos, gameElements.playerWidth, gameElements.playerHeight);
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
