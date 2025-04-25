console.log("Hell10 has Started !");

const gameCanvas = document.getElementById("mainCanvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = 1650;
gameCanvas.height = 900;

let lastTime = 0;
let animationInterval = 250; // Initial value while idling

let isColliding = false;

// Sprite-Variablen
let spriteSheets = {
  run: new Image(),
  idle: new Image(),
};
// Vorladen der Spritesheets
spriteSheets.run.src = "./assets/sprites/player/run/Run.png";
spriteSheets.idle.src = "./assets/sprites/player/idle/Idle.png";
let playerSprite = spriteSheets.idle;

const spriteWidth = 128; // Breite eines einzelnen Sprite-Frames
const spriteHeight = 128; // Höhe eines einzelnen Sprite-Frames
let currentFrame = 0;
let totalFrames = 7; // Anzahl der Frames in Ihrem Spritesheet

const gameElements = {
  floorsWidth: gameCanvas.width * 0.9,
  floorsHeight: 6,
  WallsHeight: gameCanvas.height * 0.89,
  wallsWidth: 15,
  shaftsWidth: 120,
  shaftsHeight: 23,
  shaftsLWidth: 25,
  shaftsRWidth: 25,
  shaftsLHeight: 113,
  shaftsRHeight: 113,
  exitDoorHeight: 180,
  floorNumbersColor: "yellowgreen",
  floorNumbersShadowColor: "black",
  exitSignColor: "red",
  exitSignShadowColor: "darkred",
  ceilingWidth: gameCanvas.width * 0.95,
  ceilingHeight: 17,
  floor0_YPos: gameCanvas.height * 1.0 - 6,
  floor1_YPos: gameCanvas.height * 0.875 - 6,
  floor2_YPos: gameCanvas.height * 0.75 - 6,
  floor3_YPos: gameCanvas.height * 0.625 - 6,
  floor4_YPos: gameCanvas.height * 0.5 - 6,
  floor5_YPos: gameCanvas.height * 0.375 - 6,
  floor6_YPos: gameCanvas.height * 0.25 - 6,
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
  playerHeight: 110,
  playerWidth: 100,
  playerSpeed: 2.75,
  playerMovement: "stop",

  // TOP ELEMENTS LEFT SHAFT
  shaftTopF0PosX_left: gameCanvas.width * 0.164,
  shaftTopF0PosY_left: gameCanvas.height * 0.875 - 6,
  shaftTopF1PosY_left: gameCanvas.height * 0.75 - 6,
  shaftTopF2PosY_left: gameCanvas.height * 0.625 - 6,
  shaftTopF3PosY_left: gameCanvas.height * 0.5 - 6,
  shaftTopF4PosY_left: gameCanvas.height * 0.375 - 6,
  shaftTopF5PosY_left: gameCanvas.height * 0.25 - 6,
  shaftTopF6PosY_left: gameCanvas.height * 0.13 - 6,

  // TOP ELEMETS RIGHT SHAFT
  shaftTopF0PosX_right: gameCanvas.width * 0.764,
  shaftTopF0PosY_right: gameCanvas.height * 0.875 - 6,
  shaftTopF1PosY_right: gameCanvas.height * 0.75 - 6,
  shaftTopF2PosY_right: gameCanvas.height * 0.625 - 6,
  shaftTopF3PosY_right: gameCanvas.height * 0.5 - 6,
  shaftTopF4PosY_right: gameCanvas.height * 0.375 - 6,
  shaftTopF5PosY_right: gameCanvas.height * 0.25 - 6,
  shaftTopF6PosY_right: gameCanvas.height * 0.13 - 6,

  // SIDE ELEMENTS Y-AXIS EACH FLOOR
  shaftF0posY: gameCanvas.height * 0.875 - 6,
  shaftF1posY: gameCanvas.height * 0.75 - 6,
  shaftF2posY: gameCanvas.height * 0.625 - 6,
  shaftF3posY: gameCanvas.height * 0.5 - 6,
  shaftF4posY: gameCanvas.height * 0.375 - 6,
  shaftF5posY: gameCanvas.height * 0.25 - 6,
  shaftF6posY: gameCanvas.height * 0.13 - 6,

  // SIDE ELEMENTS LEFT SHAFT
  shaftF0LposX_left: gameCanvas.width * 0.161,
  shaftF0RposX_left: gameCanvas.width * 0.2235,

  // SIDE ELEMENTS RIGHT SHAFT
  shaftF0LposX_right: gameCanvas.width * 0.761,
  shaftF0RposX_right: gameCanvas.width * 0.823,
};

const moveableElems = {
  playerPosX: gameCanvas.width / 2,
  playerPosY:
    gameCanvas.height - (gameElements.floorsHeight + gameElements.playerHeight),
  playerOnFloor: 0,
  playerOnLiftR: false,
  playerOnLiftL: false,

  exitDoorUnlocked: false,
  exitDoorPosY: gameCanvas.height * 0.8,

  // LIFTS POSITIONS
  liftR_YPos:
    gameCanvas.height * 1.0 -
    (gameElements.liftsHeight + gameElements.floorsHeight),
  liftR_isMoving: false,
  liftR_isOnFloor: 0,
  liftR_calledToFloor: 0,
  liftL_YPos:
    gameCanvas.height * 1.0 -
    (gameElements.liftsHeight + gameElements.floorsHeight),
  liftL_isMoving: false,
  liftL_isOnFloor: 0,
  liftL_calledToFloor: 0,
};

const shaftRdoorsClosedStatus = {
  floor0_RdoorClosed: true,
  floor1_RdoorClosed: true,
  floor2_RdoorClosed: true,
  floor3_RdoorClosed: true,
  floor4_RdoorClosed: true,
  floor5_RdoorClosed: true,
  floor6_RdoorClosed: true,
};

const shaftLdoorsClosedStatus = {
  floor0_LdoorClosed: true,
  floor1_LdoorClosed: true,
  floor2_LdoorClosed: true,
  floor3_LdoorClosed: true,
  floor4_LdoorClosed: true,
  floor5_LdoorClosed: true,
  floor6_LdoorClosed: true,
};

const shaftRdoorsOpenStatus = {
  floor0_RdoorOpen: false,
  floor1_RdoorOpen: false,
  floor2_RdoorOpen: false,
  floor3_RdoorOpen: false,
  floor4_RdoorOpen: false,
  floor5_RdoorOpen: false,
  floor6_RdoorOpen: false,
};

const shaftLdoorsOpenStatus = {
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

const exitButtonsStatus = {
  floor0: false,
  floor1: false,
  floor2: false,
  floor3: false,
  floor4: false,
  floor5: false,
  floor6: false
};

// Konstanten für bessere Lesbarkeit und Wartbarkeit
const KEYS = {
  NUMBERS: {
    FLOOR_0: "0",
    FLOOR_1: "1",
    FLOOR_2: "2",
    FLOOR_3: "3",
    FLOOR_4: "4",
    FLOOR_5: "5",
    FLOOR_6: "6",
  },
  DIRECTIONS: {
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    UP: "ArrowUp",
    DOWN: "ArrowDown",
  },
  SPECIAL_KEYS: {
    TOGGLE_AUTO_LEFT_ELEVATOR: "r",
    TOGGLE_DEBUG_MODE: "d",
    TOGGLE_EXIT_DOOR: "Escape",
  },
};

const FLOOR_LEVELS = {
  floor0_YPos: floorLiftLevels.floor0_YPos,
  floor1_YPos: floorLiftLevels.floor1_YPos,
  floor2_YPos: floorLiftLevels.floor2_YPos,
  floor3_YPos: floorLiftLevels.floor3_YPos,
  floor4_YPos: floorLiftLevels.floor4_YPos,
  floor5_YPos: floorLiftLevels.floor5_YPos,
  floor6_YPos: floorLiftLevels.floor6_YPos,
};

// ___________________________ DEBUGGING ___________________________
let floorLevelSelected = floorLiftLevels.floor0_YPos;
let debugMode = false;
let automaticLeftElevator = false;

// ___________________________ Keyboard-Event-Listener ___________________________

document.addEventListener("keydown", function (event) {
  // Loggt gedrückte Taste
  console.log(`Taste gedrückt: ${event.key}`);

  // Floor-Level-Auswahl
  if (Object.values(KEYS.NUMBERS).includes(event.key)) {
    const floorNumber = parseInt(event.key);
    handleFloorSelection(floorNumber);
    return;
  }

  // Bewegungssteuerung
  switch (event.key) {
    case KEYS.DIRECTIONS.LEFT:
      if (moveableElems.playerOnLiftL || moveableElems.playerOnLiftR) {
        break;
      }
      changePlayerSprite("left");
      totalFrames = 10;
      animationInterval = 100;
      gameElements.playerMovement = "left";
      break;
    case KEYS.DIRECTIONS.RIGHT:
      if (moveableElems.playerOnLiftL || moveableElems.playerOnLiftR) {
        break;
      }
      changePlayerSprite("right");
      totalFrames = 10;
      animationInterval = 100;
      gameElements.playerMovement = "right";
      break;
    case KEYS.DIRECTIONS.DOWN:
      changePlayerSprite("stop");
      totalFrames = 7;
      // animationInterval = 200;
      currentFrame = 0;
      animationInterval = 200; // Reset des Intervalls
      lastTime = performance.now(); // Reset des Zeitstempels
      gameElements.playerMovement = "stop";
      playerOnLift(true);
      break;
    case KEYS.DIRECTIONS.UP:
      changePlayerSprite("stop");
      totalFrames = 7;
      // animationInterval = 200;
      currentFrame = 0;
      animationInterval = 200; // Reset des Intervalls
      lastTime = performance.now(); // Reset des Zeitstempels
      gameElements.playerMovement = "stop";
      playerOnLift(false);
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_AUTO_LEFT_ELEVATOR:
      automaticLeftElevator = !automaticLeftElevator;
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_DEBUG_MODE:
      debugMode = !debugMode;
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_EXIT_DOOR:
      moveableElems.exitDoorUnlocked = !moveableElems.exitDoorUnlocked;
      break;
  }
});

// Hilfsfunktion zur Floor-Level-Bestimmung
function getFloorLevel(floorNumber) {
  const floorKey = `floor${floorNumber}_YPos`;
  return FLOOR_LEVELS[floorKey];
}

// Floor-Auswahl Logik
function handleFloorSelection(floorNumber) {
  // Prüfung ob Lift bewegt wird
  const isLeftLiftMoving =
    moveableElems.playerOnLiftL && moveableElems.liftL_isMoving;
  const isRightLiftMoving =
    moveableElems.playerOnLiftR && moveableElems.liftR_isMoving;

  if (isLeftLiftMoving || isRightLiftMoving) return;

  if (moveableElems.playerOnLiftL) {
    floorLevelSelected = getFloorLevel(floorNumber);
    moveableElems.liftL_calledToFloor = floorNumber;
  } else if (moveableElems.playerOnLiftR) {
    floorLevelSelected = getFloorLevel(floorNumber);
    moveableElems.liftR_calledToFloor = floorNumber;
  }
}

initialize();

// ___________________________ GAME INI ___________________________
function initialize() {
  ctx.imageSmoothingEnabled = false;
  requestAnimationFrame(gameRoutine);
}

function changePlayerSprite(movement) {
  if (movement === "left" || movement === "right") {
    if (playerSprite === spriteSheets.run) {
    } else {
      playerSprite = spriteSheets.run;
    }
  } else {
    if (playerSprite === spriteSheets.idle) {
    } else {
      playerSprite = spriteSheets.idle;
    }
  }
}

// ___________________________              ___________________________
// ___________________________ GAME-ROUTINE ___________________________
// ___________________________              ___________________________
async function gameRoutine(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (elapsed > animationInterval && !isColliding) {
    lastTime = timestamp;
    // currentFrame = (currentFrame + 1) % totalFrames;
    // Frame-Update
    currentFrame = ++currentFrame % totalFrames;
  }

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  drawLabels();
  movementAndCollisions();
  playerIsOnFloor();
  liftsPosUpdate();
  shaftDoors();
  exitDoor();
  automaticLiftControl();
  drawGameElements();

  await new Promise((resolve) => setTimeout(resolve, 15));

  requestAnimationFrame(gameRoutine);
}

// ___________________________              ___________________________
// ___________________________              ___________________________
// ___________________________              ___________________________

function drawLabels() {
  createLabel(
    185,
    gameCanvas.height - 75,
    "EXIT",
    "33px Arial Black",
    "gold",
    gameElements.exitSignShadowColor,
    2,
    7,
    20,
    "strokeText",
    gameElements.exitSignColor,
    1.6
  );

  if (debugMode) {
    let isOnLift =
      moveableElems.playerOnLiftR || moveableElems.playerOnLiftL ? true : false;

    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "<LiftLOnFloor> " +
        moveableElems.liftL_isOnFloor +
        " <PlayerOnLift> " +
        isOnLift,
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

  for (let i = 0; i < 7; i++) {
    createLabel(
      gameCanvas.width * 0.89,
      i === 0
        ? gameElements.floor0_YPos - 50
        : i === 1
        ? gameElements.floor1_YPos - 50
        : i === 2
        ? gameElements.floor2_YPos - 50
        : i === 3
        ? gameElements.floor3_YPos - 50
        : i === 4
        ? gameElements.floor4_YPos - 50
        : i === 5
        ? gameElements.floor5_YPos - 50
        : gameElements.floor6_YPos - 50,
      i,
      "50px Arial Black",
      "black",
      gameElements.floorNumbersShadowColor,
      3.5,
      6,
      6,
      "strokeText",
      gameElements.floorNumbersColor,
      1.6
    );
  }
}

function movementAndCollisions() {
  if (!playerCollision() || playerCanLeave()) {
    playerPosUpdate(gameElements.playerMovement);
    isColliding = false;
  } else {
    gameElements.playerMovement = "stop";
    isColliding = true;
    // Sichere Initialisierung der Idle-Animation
    currentFrame = 0;
    totalFrames = 7;
    playerSprite = spriteSheets.idle;
    moveableElems.playerPosX =
      moveableElems.playerPosX < gameCanvas.width / 2
        ? moveableElems.playerPosX + 5
        : moveableElems.playerPosX - 5;
    animationInterval = 200; // Reset des Intervalls
    lastTime = performance.now(); // Reset des Zeitstempels
  }
}

function drawGameElements() {
  if (moveableElems.playerOnLiftL || moveableElems.playerOnLiftR) {
    drawLifts();
    drawCeiling();
    drawFloors();
    drawWalls();
    drawPlayer(moveableElems.playerPosX, moveableElems.playerPosY);
    drawLiftDoors();
    drawShaftsElements();
    for (let i = 0; i < 7; i++) {

      drawCallElevatorBtns(
        gameCanvas.width / 2,
        gameElements[`floor${i}_YPos`] - 63,
        gameCanvas.width * 0.5025,
        gameElements[`floor${i}_YPos`] - 55,
        gameElements[`floor${i}_YPos`] - 43
      );

      drawExitButtons(
        gameCanvas.width / 1.8165,
        gameElements[`floor${i}_YPos`] - 64,
        gameCanvas.width / 1.8,
        gameElements[`floor${i}_YPos`] - 55
      )
    }

    if (debugMode) {
      drawDebugLine();
    }
  } else {
    drawLifts();
    drawCeiling();
    drawFloors();
    drawWalls();
    drawLiftDoors();
    drawShaftsElements();
    for (let i = 0; i < 7; i++) {

      drawCallElevatorBtns(
        gameCanvas.width / 2,
        gameElements[`floor${i}_YPos`] - 63,
        gameCanvas.width * 0.5025,
        gameElements[`floor${i}_YPos`] - 55,
        gameElements[`floor${i}_YPos`] - 43
      );

      drawExitButtons(
        gameCanvas.width / 1.8165,
        gameElements[`floor${i}_YPos`] - 55,
        gameCanvas.width / 1.8,
        gameElements[`floor${i}_YPos`] - 46,
        exitButtonsStatus[`floor${i}`] ? true : false
      )
    }
    drawPlayer(moveableElems.playerPosX, moveableElems.playerPosY);
    if (debugMode) {
      drawDebugLine();
    }
  }
}

function automaticLiftControl() {
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

      moveableElems.liftL_calledToFloor = randomNum;
    }
  }
}

function exitDoor() {
  if (moveableElems.exitDoorUnlocked) {
    gameElements.exitSignColor = "yellowgreen";
    gameElements.exitSignShadowColor = "darkgreen";
    moveableElems.exitDoorPosY =
      moveableElems.exitDoorPosY >
      gameCanvas.height - gameElements.exitDoorHeight * 1.55
        ? (moveableElems.exitDoorPosY -= 0.05)
        : moveableElems.exitDoorPosY;
  } else {
    gameElements.exitSignColor = "red";
    gameElements.exitSignShadowColor = "darkred";
    moveableElems.exitDoorPosY =
      moveableElems.exitDoorPosY <
      gameCanvas.height - gameElements.exitDoorHeight
        ? (moveableElems.exitDoorPosY += 0.05)
        : moveableElems.exitDoorPosY;
  }
}

// ___________________________ PLAYER CAN LEAVE BUILDING-CHECK ___________________________

function playerCanLeave() {
  return moveableElems.exitDoorPosY < gameCanvas.height * 0.73 &&
    moveableElems.playerPosX < 500 &&
    moveableElems.playerOnFloor == 0
    ? true
    : false;
}

// ___________________________ PLAYER ON LIFT-CHECK ___________________________

function playerOnLift(getOutOfLift) {
  if (getOutOfLift) {
    if (moveableElems.playerOnLiftL) {
      if (!moveableElems.liftL_isMoving && shaftLdoorsOpenCheck()) {
        moveableElems.playerOnLiftL = false;
      }
    }
    if (moveableElems.playerOnLiftR) {
      if (!moveableElems.liftR_isMoving && shaftRdoorsOpenCheck()) {
        moveableElems.playerOnLiftR = false;
      }
    }
  } else {
    if (
      (moveableElems.playerOnFloor === 0 &&
        moveableElems.liftL_isOnFloor === 0) ||
      (moveableElems.playerOnFloor === 1 &&
        moveableElems.liftL_isOnFloor === 1) ||
      (moveableElems.playerOnFloor === 2 &&
        moveableElems.liftL_isOnFloor === 2) ||
      (moveableElems.playerOnFloor === 3 &&
        moveableElems.liftL_isOnFloor === 3) ||
      (moveableElems.playerOnFloor === 4 &&
        moveableElems.liftL_isOnFloor === 4) ||
      (moveableElems.playerOnFloor === 5 &&
        moveableElems.liftL_isOnFloor === 5) ||
      (moveableElems.playerOnFloor === 6 && moveableElems.liftL_isOnFloor === 6)
    ) {
      if (
        moveableElems.playerPosX > gameCanvas.width * 0.16 &&
        moveableElems.playerPosX < gameCanvas.width * 0.185
      ) {
        moveableElems.playerOnLiftL = true;
      }
    }
    if (
      (moveableElems.playerOnFloor === 0 &&
        moveableElems.liftR_isOnFloor === 0) ||
      (moveableElems.playerOnFloor === 1 &&
        moveableElems.liftR_isOnFloor === 1) ||
      (moveableElems.playerOnFloor === 2 &&
        moveableElems.liftR_isOnFloor === 2) ||
      (moveableElems.playerOnFloor === 3 &&
        moveableElems.liftR_isOnFloor === 3) ||
      (moveableElems.playerOnFloor === 4 &&
        moveableElems.liftR_isOnFloor === 4) ||
      (moveableElems.playerOnFloor === 5 &&
        moveableElems.liftR_isOnFloor === 5) ||
      (moveableElems.playerOnFloor === 6 && moveableElems.liftR_isOnFloor === 6)
    ) {
      if (
        moveableElems.playerPosX > gameCanvas.width * 0.76 &&
        moveableElems.playerPosX < gameCanvas.width * 0.79
      ) {
        moveableElems.playerOnLiftR = true;
      }
    }
  }
}

function playerCollision() {
  return moveableElems.playerPosX >=
    gameCanvas.width * 0.95 - gameElements.playerWidth / 1.85
    ? true
    : moveableElems.playerPosX <=
      gameCanvas.width * 0.05 +
        gameElements.wallsWidth -
        gameElements.playerWidth / 2.25
    ? true
    : false;
}

// ___________________________ SHAFT-DOORS-LOGIC ___________________________

function shaftDoors() {
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
    moveableElems.liftR_calledToFloor != 0 &&
    !shaftRdoorsClosedStatus.floor0_RdoorClosed
      ? (gameElements.shaftDoorsRW_f0 += 0.25)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    moveableElems.liftR_calledToFloor != 1 &&
    !shaftRdoorsClosedStatus.floor1_RdoorClosed
      ? (gameElements.shaftDoorsRW_f1 += 0.25)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    moveableElems.liftR_calledToFloor != 2 &&
    !shaftRdoorsClosedStatus.floor2_RdoorClosed
      ? (gameElements.shaftDoorsRW_f2 += 0.25)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    moveableElems.liftR_calledToFloor != 3 &&
    !shaftRdoorsClosedStatus.floor3_RdoorClosed
      ? (gameElements.shaftDoorsRW_f3 += 0.25)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    moveableElems.liftR_calledToFloor != 4 &&
    !shaftRdoorsClosedStatus.floor4_RdoorClosed
      ? (gameElements.shaftDoorsRW_f4 += 0.25)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    moveableElems.liftR_calledToFloor != 5 &&
    !shaftRdoorsClosedStatus.floor5_RdoorClosed
      ? (gameElements.shaftDoorsRW_f5 += 0.25)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    moveableElems.liftR_calledToFloor != 6 &&
    !shaftRdoorsClosedStatus.floor6_RdoorClosed
      ? (gameElements.shaftDoorsRW_f6 += 0.25)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    moveableElems.liftL_calledToFloor != 0 &&
    !shaftLdoorsClosedStatus.floor0_LdoorClosed
      ? (gameElements.shaftDoorsLW_f0 += 0.25)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    moveableElems.liftL_calledToFloor != 1 &&
    !shaftLdoorsClosedStatus.floor1_LdoorClosed
      ? (gameElements.shaftDoorsLW_f1 += 0.25)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    moveableElems.liftL_calledToFloor != 2 &&
    !shaftLdoorsClosedStatus.floor2_LdoorClosed
      ? (gameElements.shaftDoorsLW_f2 += 0.25)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    moveableElems.liftL_calledToFloor != 3 &&
    !shaftLdoorsClosedStatus.floor3_LdoorClosed
      ? (gameElements.shaftDoorsLW_f3 += 0.25)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    moveableElems.liftL_calledToFloor != 4 &&
    !shaftLdoorsClosedStatus.floor4_LdoorClosed
      ? (gameElements.shaftDoorsLW_f4 += 0.25)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    moveableElems.liftL_calledToFloor != 5 &&
    !shaftLdoorsClosedStatus.floor5_LdoorClosed
      ? (gameElements.shaftDoorsLW_f5 += 0.25)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    moveableElems.liftL_calledToFloor != 6 &&
    !shaftLdoorsClosedStatus.floor6_LdoorClosed
      ? (gameElements.shaftDoorsLW_f6 += 0.25)
      : gameElements.shaftDoorsLW_f6;

  // __________________________________________________ OPEN-DOORS __________________________________________________
  gameElements.shaftDoorsRW_f0 =
    moveableElems.liftR_calledToFloor == 0 &&
    moveableElems.liftR_isOnFloor == 0 &&
    !shaftRdoorsOpenStatus.floor0_RdoorOpen
      ? (gameElements.shaftDoorsRW_f0 -= 0.25)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    moveableElems.liftR_calledToFloor == 1 &&
    moveableElems.liftR_isOnFloor == 1 &&
    !shaftRdoorsOpenStatus.floor1_RdoorOpen
      ? (gameElements.shaftDoorsRW_f1 -= 0.25)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    moveableElems.liftR_calledToFloor == 2 &&
    moveableElems.liftR_isOnFloor == 2 &&
    !shaftRdoorsOpenStatus.floor2_RdoorOpen
      ? (gameElements.shaftDoorsRW_f2 -= 0.25)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    moveableElems.liftR_calledToFloor == 3 &&
    moveableElems.liftR_isOnFloor == 3 &&
    !shaftRdoorsOpenStatus.floor3_RdoorOpen
      ? (gameElements.shaftDoorsRW_f3 -= 0.25)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    moveableElems.liftR_calledToFloor == 4 &&
    moveableElems.liftR_isOnFloor == 4 &&
    !shaftRdoorsOpenStatus.floor4_RdoorOpen
      ? (gameElements.shaftDoorsRW_f4 -= 0.25)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    moveableElems.liftR_calledToFloor == 5 &&
    moveableElems.liftR_isOnFloor == 5 &&
    !shaftRdoorsOpenStatus.floor5_RdoorOpen
      ? (gameElements.shaftDoorsRW_f5 -= 0.25)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    moveableElems.liftR_calledToFloor == 6 &&
    moveableElems.liftR_isOnFloor == 6 &&
    !shaftRdoorsOpenStatus.floor6_RdoorOpen
      ? (gameElements.shaftDoorsRW_f6 -= 0.25)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    moveableElems.liftL_calledToFloor == 0 &&
    moveableElems.liftL_isOnFloor == 0 &&
    !shaftLdoorsOpenStatus.floor0_LdoorOpen
      ? (gameElements.shaftDoorsLW_f0 -= 0.25)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    moveableElems.liftL_calledToFloor == 1 &&
    moveableElems.liftL_isOnFloor == 1 &&
    !shaftLdoorsOpenStatus.floor1_LdoorOpen
      ? (gameElements.shaftDoorsLW_f1 -= 0.25)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    moveableElems.liftL_calledToFloor == 2 &&
    moveableElems.liftL_isOnFloor == 2 &&
    !shaftLdoorsOpenStatus.floor2_LdoorOpen
      ? (gameElements.shaftDoorsLW_f2 -= 0.25)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    moveableElems.liftL_calledToFloor == 3 &&
    moveableElems.liftL_isOnFloor == 3 &&
    !shaftLdoorsOpenStatus.floor3_LdoorOpen
      ? (gameElements.shaftDoorsLW_f3 -= 0.25)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    moveableElems.liftL_calledToFloor == 4 &&
    moveableElems.liftL_isOnFloor == 4 &&
    !shaftLdoorsOpenStatus.floor4_LdoorOpen
      ? (gameElements.shaftDoorsLW_f4 -= 0.25)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    moveableElems.liftL_calledToFloor == 5 &&
    moveableElems.liftL_isOnFloor == 5 &&
    !shaftLdoorsOpenStatus.floor5_LdoorOpen
      ? (gameElements.shaftDoorsLW_f5 -= 0.25)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    moveableElems.liftL_calledToFloor == 6 &&
    moveableElems.liftL_isOnFloor == 6 &&
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

function playerIsOnFloor() {
  moveableElems.playerOnFloor =
    moveableElems.playerPosY > gameElements.floor1_YPos
      ? 0
      : moveableElems.playerPosY > gameElements.floor2_YPos
      ? 1
      : moveableElems.playerPosY > gameElements.floor3_YPos
      ? 2
      : moveableElems.playerPosY > gameElements.floor4_YPos
      ? 3
      : moveableElems.playerPosY > gameElements.floor5_YPos
      ? 4
      : moveableElems.playerPosY > gameElements.floor6_YPos
      ? 5
      : moveableElems.playerPosY === floorLiftLevels.floor6_YPos + 48
      ? 6
      : 101;
}

// ___________________________ LIFTS-POS-UPDATES ___________________________

// Lift Floor-Check logic Right
function liftsPosUpdate() {
  if (moveableElems.liftR_YPos === floorLiftLevels.floor0_YPos) {
    moveableElems.liftR_isOnFloor = 0;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor1_YPos) {
    moveableElems.liftR_isOnFloor = 1;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor2_YPos) {
    moveableElems.liftR_isOnFloor = 2;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor3_YPos) {
    moveableElems.liftR_isOnFloor = 3;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor4_YPos) {
    moveableElems.liftR_isOnFloor = 4;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor5_YPos) {
    moveableElems.liftR_isOnFloor = 5;
    moveableElems.liftR_isMoving = false;
  }
  if (moveableElems.liftR_YPos === floorLiftLevels.floor6_YPos) {
    moveableElems.liftR_isOnFloor = 6;
    moveableElems.liftR_isMoving = false;
  }
  // Lift Floor-Check logic Left
  if (moveableElems.liftL_YPos === floorLiftLevels.floor0_YPos) {
    moveableElems.liftL_isOnFloor = 0;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor1_YPos) {
    moveableElems.liftL_isOnFloor = 1;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor2_YPos) {
    moveableElems.liftL_isOnFloor = 2;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor3_YPos) {
    moveableElems.liftL_isOnFloor = 3;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor4_YPos) {
    moveableElems.liftL_isOnFloor = 4;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor5_YPos) {
    moveableElems.liftL_isOnFloor = 5;
    moveableElems.liftL_isMoving = false;
  }
  if (moveableElems.liftL_YPos === floorLiftLevels.floor6_YPos) {
    moveableElems.liftL_isOnFloor = 6;
    moveableElems.liftL_isMoving = false;
  }

  // LIFT MOVEMENT LOGIC - RIGHT LIFT
  if (moveableElems.liftR_calledToFloor == 0) {
    if (moveableElems.liftR_isOnFloor != 0 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos += gameElements.liftSpeed;
    }
  }
  if (moveableElems.liftR_calledToFloor == 1) {
    if (moveableElems.liftR_isOnFloor != 1 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor1_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToFloor == 2) {
    if (moveableElems.liftR_isOnFloor != 2 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor2_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToFloor == 3) {
    if (moveableElems.liftR_isOnFloor != 3 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor3_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToFloor == 4) {
    if (moveableElems.liftR_isOnFloor != 4 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor4_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToFloor == 5) {
    if (moveableElems.liftR_isOnFloor != 5 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor5_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftR_calledToFloor == 6) {
    if (moveableElems.liftR_isOnFloor != 6 && shaftRdoorsClosed()) {
      moveableElems.liftR_isMoving = true;
      moveableElems.liftR_YPos =
        moveableElems.liftR_YPos < floorLiftLevels.floor6_YPos
          ? (moveableElems.liftR_YPos += gameElements.liftSpeed)
          : (moveableElems.liftR_YPos -= gameElements.liftSpeed);
    }
  }

  //__________________________________ LEFT LIFT __________________________________

  if (moveableElems.liftL_calledToFloor == 0) {
    if (moveableElems.liftL_isOnFloor != 0 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor0_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToFloor == 1) {
    if (moveableElems.liftL_isOnFloor != 1 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor1_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToFloor == 2) {
    if (moveableElems.liftL_isOnFloor != 2 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor2_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToFloor == 3) {
    if (moveableElems.liftL_isOnFloor != 3 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor3_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToFloor == 4) {
    if (moveableElems.liftL_isOnFloor != 4 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor4_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToFloor == 5) {
    if (moveableElems.liftL_isOnFloor != 5 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor5_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (moveableElems.liftL_calledToFloor == 6) {
    if (moveableElems.liftL_isOnFloor != 6 && shaftLdoorsClosed()) {
      moveableElems.liftL_isMoving = true;
      moveableElems.liftL_YPos =
        moveableElems.liftL_YPos < floorLiftLevels.floor6_YPos
          ? (moveableElems.liftL_YPos += gameElements.liftSpeed)
          : (moveableElems.liftL_YPos -= gameElements.liftSpeed);
    }
  }
}

function shaftRdoorsClosed() {
  return Object.values(shaftRdoorsClosedStatus).every(Boolean);
}

function shaftRdoorsOpenCheck() {
  return Object.values(shaftRdoorsOpenStatus).some(Boolean);
}

function shaftLdoorsClosed() {
  return Object.values(shaftLdoorsClosedStatus).every(Boolean);
}

function shaftLdoorsOpenCheck() {
  return Object.values(shaftLdoorsOpenStatus).some(Boolean);
}

function drawLifts() {
  ctx.fillStyle = "#f4ff51";
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
  ctx.fillStyle = "#700";

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
}

// __________________________________________________ DEBUGGING - CODE __________________________________________________

function drawDebugLine() {
  // ctx.fillStyle = "#0000FF";
  // ctx.fillRect(0, floorLiftLevels.floor1_YPos, 1600, 3);

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(0, floorLevelSelected, 1600, 3);
}

function drawShaftsElements() {
  // ____________________________ SHAFT TOP ELEMENT ____________________________

  ctx.fillStyle = "#060606";
  // Floor 0
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF0PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF0PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  //Floor 1
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF1PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF1PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  // Floor 2
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF2PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF2PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 3
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF3PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF3PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 4
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF4PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF4PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 5
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF5PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF5PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // Floor 6
  ctx.fillRect(
    gameElements.shaftTopF0PosX_left,
    gameElements.shaftTopF6PosY_left,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );
  ctx.fillRect(
    gameElements.shaftTopF0PosX_right,
    gameElements.shaftTopF6PosY_right,
    gameElements.shaftsWidth,
    gameElements.shaftsHeight
  );

  // ____________________________ SHAFT SIDE ELEMENTS ____________________________

  ctx.fillStyle = "#111111";
  // Floor 0 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF0posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF0posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 0 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF0posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF0posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 1 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF1posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF1posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 1 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF1posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF1posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 2 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF2posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF2posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 2 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF2posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF2posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 3 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF3posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF3posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 3 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF3posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF3posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 4 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF4posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF4posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 4 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF4posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF4posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 5 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF5posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF5posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 5 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF5posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF5posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 6 LEFT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_left,
    gameElements.shaftF6posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_left,
    gameElements.shaftF6posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
  );
  // Floor 6 RIGHT | Left Elem, then Right Elem
  ctx.fillRect(
    gameElements.shaftF0LposX_right,
    gameElements.shaftF6posY,
    gameElements.shaftsLWidth,
    gameElements.shaftsLHeight
  );
  ctx.fillRect(
    gameElements.shaftF0RposX_right,
    gameElements.shaftF6posY,
    gameElements.shaftsRWidth,
    gameElements.shaftsRHeight
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
  // EXIT-DOOR
  ctx.fillStyle = "#111111";
  ctx.fillRect(
    gameCanvas.width * 0.051,
    moveableElems.exitDoorPosY,
    gameElements.wallsWidth - 5,
    gameElements.exitDoorHeight
  );
  // ____________________

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
    gameElements.floor0_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillStyle = "#171717";
  gameElements.floorsWidth -= 500;

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor1_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor2_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor3_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor4_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor5_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorsWidth / 2,
    gameElements.floor6_YPos,
    gameElements.floorsWidth,
    gameElements.floorsHeight
  );
}

function drawCallElevatorBtns(platePosX,platePosY, triPosx, triUpPosY, triDwnPosY) {
  // Plate
  ctx.fillStyle = "#AE000065";
  ctx.fillRect(
    platePosX,
    platePosY,
    20,
    35
  );
  // Upper Button
  drawTriangle(
    triPosx,
    triUpPosY,
    12,
    "darkgreen",
    "up"
  );
  // Lower Button
  drawTriangle(
    triPosx,
    triDwnPosY,
    12,
    "darkgreen",
    "down"
  );
}

function drawExitButtons(platePosX, platePosY, btnPosX, btnPosY, btnActivated) {
    // Plate
    ctx.fillStyle = "#FF000095";
    ctx.fillRect(
      platePosX,
      platePosY,
      17,
      17
    );

    ctx.fillStyle = btnActivated ? "#00FF0088" : "#FF0000FF";
    ctx.beginPath();

    // Draw Circle -> (posX, posY, radius, startangle, endangle)
    ctx.arc(btnPosX, btnPosY, 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function drawTriangle(posX, posY, width, fillColor, dir) {
  if (dir == "down") {
    ctx.beginPath();
      ctx.moveTo(posX, posY);      // Erster Eckpunkt
      ctx.lineTo(posX + width, posY);     // Zweiter Eckpunkt
      ctx.lineTo(posX + (width / 2), posY + (width / 1.5));     // Dritter Eckpunkt
      ctx.closePath();         // Pfad schließen (zurück zum Startpunkt)
  }
  if (dir == "up") {
    ctx.beginPath();
    ctx.moveTo(posX + width / 2, posY);      // Erster Eckpunkt
    ctx.lineTo(posX, posY + (width / 1.5));     // Zweiter Eckpunkt
    ctx.lineTo(posX + width, posY + (width / 1.5));     // Dritter Eckpunkt
    ctx.closePath();         // Pfad schließen (zurück zum Startpunkt)
  }
    ctx.stroke();            // Linien zeichnen
    ctx.fillStyle = fillColor;
    ctx.fill();             // Optional: Dreieck ausfüllen
}

function drawPlayer(xPos, yPos) {
  ctx.save(); // Speichern des aktuellen Kontextzustands

  if (gameElements.playerMovement === "left") {
    // Spiegeln für Bewegung nach links
    ctx.scale(-1, 1);
    xPos = -xPos - gameElements.playerWidth; // Anpassen der X-Position für gespiegelte Zeichnung
  }

  ctx.drawImage(
    playerSprite,
    currentFrame * spriteWidth,
    0,
    spriteWidth,
    spriteHeight,
    xPos,
    yPos,
    gameElements.playerWidth,
    gameElements.playerHeight
  );

  ctx.restore(); // Wiederherstellen des ursprünglichen Kontextzustands
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
