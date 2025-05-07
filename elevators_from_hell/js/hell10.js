console.log("Hell10 has Started !");

const gameCanvas = document.getElementById("mainCanvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = 1650;
gameCanvas.height = 900;

// Sound-Initializing
const sounds = {
  liftSndR: new Howl({ src: ["./assets/sounds/liftMoves2.wav"] }),
  liftSndL: new Howl({ src: ["./assets/sounds/liftMoves2.wav"] }),
  liftDoorsRop: new Howl({ src: ["./assets/sounds/openLiftDoors.wav"] }),
  liftDoorsLop: new Howl({ src: ["./assets/sounds/openLiftDoors.wav"] }),
  liftDoorsRcl: new Howl({ src: ["./assets/sounds/closeLiftDoors.wav"] }),
  liftDoorsLcl: new Howl({ src: ["./assets/sounds/closeLiftDoors.wav"] }),
  runSnd: new Howl({ src: ["./assets/sounds/running.wav"] }),
  btnPress: new Howl({ src: ["./assets/sounds/buttonPressed.wav"] }),
  exitDoorSnd: new Howl({ src: ["./assets/sounds/exitDoorSnd.wav"] }),
};

// Sprite-Variables
let player_spriteSheet = {
  idle: new Image(),
  run: new Image(),
};

let npc_spriteSheet = {
  idle: new Image(),
  move: new Image(),
};

// Spritesheets Initializing
player_spriteSheet.run.src = "./assets/sprites/player/run/Run_2.png";
player_spriteSheet.idle.src = "./assets/sprites/player/idle/Idle_3.png";
let playerSprite = player_spriteSheet.idle;

npc_spriteSheet.idle.src = "";
npc_spriteSheet.move.src = "";
let npcSprite = npc_spriteSheet.idle;

// Lift Cabins inner view
const cabinView = new Image();
cabinView.src = "./assets/img/liftCabins/cabinView4.png";

// Sound-Variables
let liftLFading = false;
let liftRFading = false;
let callLiftBtnSndCount = 0;
let callLiftBtnActCount = 0;
let exitBtnSndCount = 0;
let exitBtnActCounter = 0;
let exitDoorMoving = false;
let exitDoorStopped = true;

// Sprite-Variables
const spriteWidth = 128; // Breite eines einzelnen Sprite-Frames
const spriteHeight = 128; // Höhe eines einzelnen Sprite-Frames
let currentFrame = 0;
let totalFrames = 7; // Anzahl der Frames in Ihrem Spritesheet
let lastTime = 0;
let animationInterval = 125; // 250 Initial value while idling

// Collision-Variables
let isColliding = false;

// Canvas-Element-Variables
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
  exitDoorUnlocked: false,
  floorNumbersColor: "darkgoldenrod",
  floorNumbersShadowColor: "orangered",
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
  exitBtnsXpos: gameCanvas.width / 1.921,
  callElevatorBtnsXpos: gameCanvas.width * 0.5025,
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
  playerHeight: 121, // 110
  playerWidth: 121, // 100
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

const flexElemsPosInit = {
  playerPosX: gameCanvas.width / 2,
  playerPosY: gameElements.floor0_YPos - gameElements.playerHeight,
  playerYposOffset: 20,
  playerLastDir: "stop",
  playerOnFloor: 0,
  playerOnLiftR: false,
  playerOnLiftL: false,

  exitDoorPosY: gameCanvas.height * 0.8,

  // Lifts
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

const floorLevels = {
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
  floor6: false,
};

const callElevatorBtnsStatus = {
  floor0: 0,
  floor1: 0,
  floor2: 0,
  floor3: 0,
  floor4: 0,
  floor5: 0,
  floor6: 0,
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
    TOGGLE_AUTO_ELEVATOR: "r",
    TOGGLE_DEBUG_MODE: "d",
    CHANGE_PLAYER_YPOS: "t",
    TOGGLE_EXIT_DOOR: "Escape",
  },
};

const FLOOR_LEVELS = {
  floor0_YPos: floorLevels.floor0_YPos,
  floor1_YPos: floorLevels.floor1_YPos,
  floor2_YPos: floorLevels.floor2_YPos,
  floor3_YPos: floorLevels.floor3_YPos,
  floor4_YPos: floorLevels.floor4_YPos,
  floor5_YPos: floorLevels.floor5_YPos,
  floor6_YPos: floorLevels.floor6_YPos,
};

// ___________________________ DEBUGGING ___________________________
let floorLevelSelected = floorLevels.floor0_YPos;
let debugMode = false;
let automaticElevator = false;

// ___________________________ Keyboard-Event-Listener ___________________________

document.addEventListener("keydown", function (event) {
  // Log pressed key
  console.log(`Taste gedrückt: ${event.key}`);

  // Floor-Level-Selection
  if (Object.values(KEYS.NUMBERS).includes(event.key)) {
    const floorNumber = parseInt(event.key);
    handleFloorSelection(floorNumber);
    return;
  }

  // Player Movement
  switch (event.key) {
    case KEYS.DIRECTIONS.LEFT:
      if (flexElemsPosInit.playerOnLiftL || flexElemsPosInit.playerOnLiftR) {
        break;
      }
      changePlayerSprite("left");
      totalFrames = 10;
      animationInterval = 80;
      gameElements.playerMovement = "left";
      break;
    case KEYS.DIRECTIONS.RIGHT:
      if (flexElemsPosInit.playerOnLiftL || flexElemsPosInit.playerOnLiftR) {
        break;
      }
      changePlayerSprite("right");
      totalFrames = 10;
      animationInterval = 80;
      gameElements.playerMovement = "right";
      break;
    case KEYS.DIRECTIONS.DOWN:
      if (playerSprite !== player_spriteSheet.idle) {
        changePlayerSprite("stop");
        totalFrames = 7;
        currentFrame = 0;
        animationInterval = 125; // Reset des Intervalls
        lastTime = performance.now(); // Reset des Zeitstempels
        gameElements.playerMovement = "stop";
      }
      flexElemsPosInit.playerOnFloor !== 0 ? callElevatorBtnsCheck(2) : null;
      callLiftBtnActCount =
        flexElemsPosInit.playerOnFloor !== 0 &&
        flexElemsPosInit.playerPosX >
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
        flexElemsPosInit.playerPosX <
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25
          ? ++callLiftBtnActCount
          : callLiftBtnActCount;

      playerOnLift(true);
      break;
    case KEYS.DIRECTIONS.UP:
      if (playerSprite !== player_spriteSheet.idle) {
        changePlayerSprite("stop");
        totalFrames = 7;
        currentFrame = 0;
        animationInterval = 125; // Reset des Intervalls
        lastTime = performance.now(); // Reset des Zeitstempels
        gameElements.playerMovement = "stop";
      }
      flexElemsPosInit.playerOnFloor !== 6 ? callElevatorBtnsCheck(1) : null;
      callLiftBtnActCount =
        flexElemsPosInit.playerOnFloor !== 6 &&
        flexElemsPosInit.playerPosX >
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
        flexElemsPosInit.playerPosX <
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25
          ? ++callLiftBtnActCount
          : callLiftBtnActCount;
      exitBtnActCheck();
      playerOnLift(false);
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_AUTO_ELEVATOR:
      automaticElevator = !automaticElevator;
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_DEBUG_MODE:
      debugMode = !debugMode;
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_EXIT_DOOR:
      for (let key in exitButtonsStatus) {
        exitButtonsStatus[key] = !exitButtonsStatus[key];
      }
      break;
    case KEYS.SPECIAL_KEYS.CHANGE_PLAYER_YPOS:
      flexElemsPosInit.playerPosY =
        flexElemsPosInit.playerOnFloor === 0
          ? gameElements.floor1_YPos - gameElements.playerHeight
          : flexElemsPosInit.playerOnFloor === 1
          ? gameElements.floor2_YPos - gameElements.playerHeight
          : flexElemsPosInit.playerOnFloor === 2
          ? gameElements.floor3_YPos - gameElements.playerHeight
          : flexElemsPosInit.playerOnFloor === 3
          ? gameElements.floor4_YPos - gameElements.playerHeight
          : flexElemsPosInit.playerOnFloor === 4
          ? gameElements.floor5_YPos - gameElements.playerHeight
          : flexElemsPosInit.playerOnFloor === 5
          ? gameElements.floor6_YPos - gameElements.playerHeight
          : gameElements.floor0_YPos - gameElements.playerHeight;
  }
});

// Hilfsfunktion zur Floor-Level-Bestimmung
function getFloorLevel(floorNumber) {
  const floorKey = `floor${floorNumber}_YPos`;
  return FLOOR_LEVELS[floorKey];
}

// Floor-Auswahl Logik
function handleFloorSelection(floorNumber) {
  // Prüfung ob Lift L/R bewegt wird und Spieler sich in ihm befindet
  const isLeftLiftMoving =
    flexElemsPosInit.playerOnLiftL && flexElemsPosInit.liftL_isMoving;
  const isRightLiftMoving =
    flexElemsPosInit.playerOnLiftR && flexElemsPosInit.liftR_isMoving;

  if (isLeftLiftMoving || isRightLiftMoving) return;

  if (flexElemsPosInit.playerOnLiftL) {
    floorLevelSelected = getFloorLevel(floorNumber);
    flexElemsPosInit.liftL_calledToFloor = floorNumber;
  } else if (flexElemsPosInit.playerOnLiftR) {
    floorLevelSelected = getFloorLevel(floorNumber);
    flexElemsPosInit.liftR_calledToFloor = floorNumber;
  }
}

initialize();

// ___________________________ GAME INI ___________________________
function initialize() {
  html5: true;
  ctx.imageSmoothingEnabled = true;
  Howler.autoUnlock = true; // ➕ Für iOS notwendig[3]
  requestAnimationFrame(gameRoutine);
}

function changePlayerSprite(movement) {
  if (movement === "left" || movement === "right") {
    if (playerSprite === player_spriteSheet.run) {
    } else {
      playerSprite = player_spriteSheet.run;
    }
  } else {
    if (playerSprite === player_spriteSheet.idle) {
    } else {
      playerSprite = player_spriteSheet.idle;
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

  flexElemsPosInit.playerLastDir =
    gameElements.playerMovement === "left"
      ? "left"
      : gameElements.playerMovement === "right"
      ? "right"
      : flexElemsPosInit.playerLastDir;

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  playerMovandColl();
  playerIsOnFloor();
  liftsPosUpdate();
  shaftDoors();
  exitDoor();
  automaticLiftControl();
  liftCalledCheck();
  drawGameElements();
  playSounds();

  await new Promise((resolve) => setTimeout(resolve, 15));

  requestAnimationFrame(gameRoutine);
}

// ___________________________              ___________________________
// ___________________________              ___________________________
// ___________________________              ___________________________

function drawLabels() {
  // EXIT SIGN
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
      flexElemsPosInit.playerOnLiftR || flexElemsPosInit.playerOnLiftL
        ? true
        : false;

    createLabel(
      gameCanvas.width / 2,
      gameCanvas.height * 0.07,
      "<ActCount> " +
        exitBtnActCounter +
        " <PlayerOnFloor> " +
        flexElemsPosInit.playerOnFloor,
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
      "goldenrod",
      "black",
      3,
      8,
      17,
      "strokeText",
      "goldenrod",
      2
    );
  }
  // Floor Numbers for each Floor
  for (let i = 0; i < 7; i++) {
    createLabel(
      gameCanvas.width * 0.37,
      i === 0
        ? gameElements.floor0_YPos - 75
        : i === 1
        ? gameElements.floor1_YPos - 75
        : i === 2
        ? gameElements.floor2_YPos - 75
        : i === 3
        ? gameElements.floor3_YPos - 75
        : i === 4
        ? gameElements.floor4_YPos - 75
        : i === 5
        ? gameElements.floor5_YPos - 75
        : gameElements.floor6_YPos - 75,
      "Floor " + i,
      "25px Arial Black",
      "black",
      gameElements.floorNumbersShadowColor,
      2.25,
      6,
      6,
      "strokeText",
      gameElements.floorNumbersColor,
      1.15
    );
  }
  // Left Shaft Lift Position Display
  for (let i = 0; i < 7; i++) {
    createLabel(
      flexElemsPosInit.liftL_isOnFloor === 0
        ? gameCanvas.width * 0.18
        : flexElemsPosInit.liftL_isOnFloor === 1
        ? gameCanvas.width * 0.18 + 13
        : flexElemsPosInit.liftL_isOnFloor === 2
        ? gameCanvas.width * 0.18 + 23
        : flexElemsPosInit.liftL_isOnFloor === 3
        ? gameCanvas.width * 0.18 + 33
        : flexElemsPosInit.liftL_isOnFloor === 4
        ? gameCanvas.width * 0.18 + 43
        : flexElemsPosInit.liftL_isOnFloor === 5
        ? gameCanvas.width * 0.18 + 53
        : gameCanvas.width * 0.18 + 63,
      i === 0
        ? gameElements.floor0_YPos - 100
        : i === 1
        ? gameElements.floor1_YPos - 100
        : i === 2
        ? gameElements.floor2_YPos - 100
        : i === 3
        ? gameElements.floor3_YPos - 100
        : i === 4
        ? gameElements.floor4_YPos - 100
        : i === 5
        ? gameElements.floor5_YPos - 100
        : gameElements.floor6_YPos - 95,

      flexElemsPosInit.liftL_isOnFloor == 0
        ? "E"
        : flexElemsPosInit.liftL_isOnFloor,
      "14px Arial Black",
      "orange",
      "transparent",
      0,
      0,
      0,
      "fillText",
      "greenyellow",
      1.6
    );
  }
  // Right Shaft Lift Position Display
  for (let i = 0; i < 7; i++) {
    createLabel(
      flexElemsPosInit.liftR_isOnFloor === 0
        ? gameCanvas.width * 0.78
        : flexElemsPosInit.liftR_isOnFloor === 1
        ? gameCanvas.width * 0.78 + 13
        : flexElemsPosInit.liftR_isOnFloor === 2
        ? gameCanvas.width * 0.78 + 23
        : flexElemsPosInit.liftR_isOnFloor === 3
        ? gameCanvas.width * 0.78 + 33
        : flexElemsPosInit.liftR_isOnFloor === 4
        ? gameCanvas.width * 0.78 + 43
        : flexElemsPosInit.liftR_isOnFloor === 5
        ? gameCanvas.width * 0.78 + 53
        : gameCanvas.width * 0.78 + 63,
      i === 0
        ? gameElements.floor0_YPos - 100
        : i === 1
        ? gameElements.floor1_YPos - 100
        : i === 2
        ? gameElements.floor2_YPos - 100
        : i === 3
        ? gameElements.floor3_YPos - 100
        : i === 4
        ? gameElements.floor4_YPos - 100
        : i === 5
        ? gameElements.floor5_YPos - 100
        : gameElements.floor6_YPos - 95,
      flexElemsPosInit.liftR_isOnFloor == 0
        ? "E"
        : flexElemsPosInit.liftR_isOnFloor,
      "14px Arial Black",
      "orange",
      "transparent",
      0,
      0,
      0,
      "fillText",
      "greenyellow",
      1.6
    );
  }
}

function callElevatorBtnsCheck(value) {
  const playerInteractPos = {
    callLiftBtns:
      flexElemsPosInit.playerPosX >
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25,
    exitBtns:
      flexElemsPosInit.playerPosX >
        gameElements.exitBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.exitBtnsXpos - gameElements.playerWidth / 2 + 25,
  };

  for (let i = 0; i < 7; i++) {
    value =
      flexElemsPosInit.playerOnFloor === i &&
      callElevatorBtnsStatus[`floor${i}`] != value &&
      callElevatorBtnsStatus[`floor${i}`] < 3
        ? callElevatorBtnsStatus[`floor${i}`] + value
        : value;

    // callLiftBtnActCount = playerInteractPos.callLiftBtns;

    callElevatorBtnsStatus[`floor${i}`] =
      callElevatorBtnsStatus[`floor${i}`] !== 3 &&
      flexElemsPosInit.playerOnFloor === i &&
      playerInteractPos.callLiftBtns
        ? value
        : callElevatorBtnsStatus[`floor${i}`];
  }
}

function exitBtnActCheck() {
  const playerInteractPos = {
    callLiftBtns:
      flexElemsPosInit.playerPosX >
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25,
    exitBtns:
      flexElemsPosInit.playerPosX >
        gameElements.exitBtnsXpos - gameElements.playerWidth / 1.5 &&
      flexElemsPosInit.playerPosX <
        gameElements.exitBtnsXpos - gameElements.playerWidth / 2 + 25,
  };

  for (let i = 0; i < 7; i++) {
    exitButtonsStatus[`floor${i}`] =
      flexElemsPosInit.playerOnFloor === i && playerInteractPos.exitBtns
        ? exitButtonsStatus[`floor${i}`]
          ? false
          : true
        : exitButtonsStatus[`floor${i}`];
  }
}

function playerMovandColl() {
  if (!playerCollision() || playerCanLeave()) {
    playerPosUpdate(gameElements.playerMovement);
    isColliding = false;
  } else {
    gameElements.playerMovement = "stop";
    isColliding = true;
    // Sichere Initialisierung der Idle-Animation
    currentFrame = 0;
    totalFrames = 7;
    playerSprite = player_spriteSheet.idle;
    flexElemsPosInit.playerPosX =
      flexElemsPosInit.playerPosX < gameCanvas.width / 2
        ? flexElemsPosInit.playerPosX + 5
        : flexElemsPosInit.playerPosX - 5;
    animationInterval = 125; // Reset des Intervalls
    lastTime = performance.now(); // Reset des Zeitstempels
  }
}

function drawGameElements() {
  if (flexElemsPosInit.playerOnLiftL || flexElemsPosInit.playerOnLiftR) {
    drawLifts();
    drawCeiling();
    drawFloors();
    drawWalls();
    drawPlayer(
      flexElemsPosInit.playerPosX,
      flexElemsPosInit.playerPosY,
      flexElemsPosInit.playerLastDir
    );
    drawLiftDoors();
    drawShaftsElements();
    for (let i = 0; i < 7; i++) {
      drawCallElevatorBtns(
        gameCanvas.width / 2,
        gameElements[`floor${i}_YPos`] - 63,
        gameElements.callElevatorBtnsXpos,
        gameElements[`floor${i}_YPos`] - 55,
        gameElements[`floor${i}_YPos`] - 43,
        callElevatorBtnsStatus[`floor${i}`],
        i
      );

      drawExitButtons(
        gameCanvas.width / 1.94,
        gameElements[`floor${i}_YPos`] - 52,
        gameElements.exitBtnsXpos,
        gameElements[`floor${i}_YPos`] - 43,
        exitButtonsStatus[`floor${i}`] ? true : false
      );
    }

    drawLabels();

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
        gameElements.callElevatorBtnsXpos,
        gameElements[`floor${i}_YPos`] - 55,
        gameElements[`floor${i}_YPos`] - 43,
        callElevatorBtnsStatus[`floor${i}`],
        i
      );

      drawExitButtons(
        gameCanvas.width / 1.94,
        gameElements[`floor${i}_YPos`] - 52,
        gameElements.exitBtnsXpos,
        gameElements[`floor${i}_YPos`] - 43,
        exitButtonsStatus[`floor${i}`] ? true : false
      );
    }
    drawPlayer(
      flexElemsPosInit.playerPosX,
      flexElemsPosInit.playerPosY,
      flexElemsPosInit.playerLastDir
    );
    drawLabels();
    if (debugMode) {
      drawDebugLine();
    }
  }
}

function automaticLiftControl() {
  if (automaticElevator) {
    let randomNum;
    let randomNum2;

    for (let i = 256; i > 0; --i) {
      randomNum = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    }
    for (let i = 387; i > 0; --i) {
      randomNum2 = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    }

    console.log(randomNum, "|", randomNum2);

    flexElemsPosInit.liftL_calledToFloor =
      !flexElemsPosInit.liftL_isMoving && shaftLdoorsOpenCheck()
        ? randomNum
        : flexElemsPosInit.liftL_calledToFloor;

    flexElemsPosInit.liftR_calledToFloor =
      !flexElemsPosInit.liftR_isMoving && shaftRdoorsOpenCheck()
        ? randomNum2
        : flexElemsPosInit.liftR_calledToFloor;

    // floorLevelSelected =
    //   randomNum == 6
    //     ? floorLiftLevels.floor6_YPos
    //     : randomNum == 5
    //     ? floorLiftLevels.floor5_YPos
    //     : randomNum == 4
    //     ? floorLiftLevels.floor4_YPos
    //     : randomNum == 3
    //     ? floorLiftLevels.floor3_YPos
    //     : randomNum == 2
    //     ? floorLiftLevels.floor2_YPos
    //     : randomNum == 1
    //     ? floorLiftLevels.floor1_YPos
    //     : randomNum == 0
    //     ? floorLiftLevels.floor0_YPos
    //     : floorLiftLevels.floor6_YPos;
  }
}

async function fadeOutLift(sound, setFading, duration = 800) {
  if (!sound.playing() || setFading()) return;
  setFading(true);
  sound.fade(sound.volume(), 0, duration);
  sound.once("fade", () => {
    // Nur stoppen, wenn der Sound nicht zwischenzeitlich neu gestartet wurde
    if (sound.volume() === 0 && sound.playing()) {
      sound.stop();
    }
    setFading(false);
  });
}

async function playSounds() {
  // LIFTS STEREO Panning

  // if (!liftLFading || !liftRFading) {

  //   if (moveableElems.liftL_isMoving && !moveableElems.liftR_isMoving) {
  //     liftSndL.stereo(-0.65);
  //     liftSndR.stereo(0);
  //   } else if (moveableElems.liftR_isMoving && !moveableElems.liftL_isMoving) {
  //     liftSndL.stereo(0);
  //     liftSndR.stereo(0.65);
  //   } else {
  //     liftSndL.stereo(0);
  //     liftSndR.stereo(0);
  //   }
  // }

  // LIFT L
  if (
    flexElemsPosInit.liftL_calledToFloor != flexElemsPosInit.liftL_isOnFloor &&
    !flexElemsPosInit.liftL_isMoving
  ) {
    if (!sounds.liftDoorsLcl.playing()) {
      sounds.liftDoorsLcl.volume(0.45);
      sounds.liftDoorsLcl.rate(0.78);
      sounds.liftDoorsLcl.play();
    }
  }

  if (flexElemsPosInit.liftL_isMoving) {
    if (!sounds.liftSndL.playing()) {
      liftLFading = false;
      sounds.liftSndL.volume(0.55);
      sounds.liftSndL.play();
    }
    liftLFading = false;
    sounds.liftSndL.seek() > 3.0
      ? sounds.liftSndL.seek(1.0)
      : sounds.liftSndL.seek();
  } else {
    fadeOutLift(sounds.liftSndL, (v) => {
      if (v !== undefined) liftLFading = v;
      if (!sounds.liftDoorsLop.playing()) {
        sounds.liftDoorsLop.volume(0.45);
        sounds.liftDoorsLop.rate(1.65);
        sounds.liftDoorsLop.play();
      }
      return liftLFading;
    });
  }

  // LIFT R
  if (
    flexElemsPosInit.liftR_calledToFloor != flexElemsPosInit.liftR_isOnFloor &&
    !flexElemsPosInit.liftR_isMoving
  ) {
    if (!sounds.liftDoorsRcl.playing()) {
      sounds.liftDoorsRcl.volume(0.45);
      sounds.liftDoorsRcl.rate(0.78);
      sounds.liftDoorsRcl.play();
    }
  }

  if (flexElemsPosInit.liftR_isMoving) {
    if (!sounds.liftSndR.playing()) {
      liftRFading = false;
      sounds.liftSndR.volume(0.55);
      sounds.liftSndR.play();
    }
    liftRFading = false;
    sounds.liftSndR.seek() > 3.0
      ? sounds.liftSndR.seek(1.0)
      : sounds.liftSndR.seek();
  } else {
    fadeOutLift(sounds.liftSndR, (v) => {
      if (v !== undefined) liftRFading = v;
      if (!sounds.liftDoorsRop.playing()) {
        sounds.liftDoorsRop.volume(0.45);
        sounds.liftDoorsRop.rate(1.65);
        sounds.liftDoorsRop.play();
      }
      return liftRFading;
    });
  }

  // EXIT BUTTONS
  if (exitBtnActCounter !== exitBtnSndCount) {
    sounds.btnPress.play();
    exitBtnSndCount = exitBtnActCounter;
  }

  // LIFT CALLING BUTTONS
  if (callLiftBtnSndCount !== callLiftBtnActCount) {
    sounds.btnPress.play();
    callLiftBtnSndCount = callLiftBtnActCount;
  }
  // PLAYER MOVEMENT
  if (playerSprite === player_spriteSheet.run) {
    if (!sounds.runSnd.playing()) {
      sounds.runSnd.rate(0.58);
      sounds.runSnd.play();
    }
  } else {
    sounds.runSnd.playing() ? sounds.runSnd.stop() : null;
  }

  // EXIT DOOR LOGIC
  if (
    gameElements.exitDoorUnlocked &&
    flexElemsPosInit.exitDoorPosY >
      gameCanvas.height - gameElements.exitDoorHeight * 1.55
  ) {
    if (!exitDoorMoving) {
      exitDoorMoving = true;
    }
    if (exitDoorStopped) {
      exitDoorStopped = false;
    }
  } else if (
    !gameElements.exitDoorUnlocked &&
    flexElemsPosInit.exitDoorPosY <
      gameCanvas.height - gameElements.exitDoorHeight
  ) {
    if (!exitDoorMoving) {
      exitDoorMoving = true;
    }
    if (exitDoorStopped) {
      exitDoorStopped = false;
    }
  } else {
    if (exitDoorMoving) {
      exitDoorMoving = false;
    }
    if (!exitDoorStopped) {
      exitDoorStopped = true;
    }
  }

  // console.log(exitDoorMoving, exitDoorStopped, moveableElems.exitDoorUnlocked);

  if (exitDoorMoving) {
    if (!sounds.exitDoorSnd.playing()) {
      sounds.exitDoorSnd.volume(0.6);
      sounds.exitDoorSnd.play();
    }
    sounds.exitDoorSnd.seek() > 2.3
      ? sounds.exitDoorSnd.seek(1.25)
      : sounds.exitDoorSnd.seek();
  } else {
    if (exitDoorStopped) {
      if (sounds.exitDoorSnd.playing()) {
      } else {
        sounds.exitDoorSnd.seek(5.0);
      }
    }
  }
}

function exitDoor() {
  exitBtnActCounter = 0;

  for (let key in exitButtonsStatus) {
    exitBtnActCounter = exitButtonsStatus[key]
      ? ++exitBtnActCounter
      : exitBtnActCounter;
  }

  gameElements.exitDoorUnlocked = exitBtnActCounter === 7 ? true : false;

  if (gameElements.exitDoorUnlocked) {
    gameElements.exitSignColor = "yellowgreen";
    gameElements.exitSignShadowColor = "darkgreen";
    flexElemsPosInit.exitDoorPosY =
      flexElemsPosInit.exitDoorPosY >
      gameCanvas.height - gameElements.exitDoorHeight * 1.55
        ? (flexElemsPosInit.exitDoorPosY -= 0.05)
        : flexElemsPosInit.exitDoorPosY;
  } else {
    gameElements.exitSignColor = "red";
    gameElements.exitSignShadowColor = "darkred";
    flexElemsPosInit.exitDoorPosY =
      flexElemsPosInit.exitDoorPosY <
      gameCanvas.height - gameElements.exitDoorHeight
        ? (flexElemsPosInit.exitDoorPosY += 0.05)
        : flexElemsPosInit.exitDoorPosY;
  }
}

// ___________________________ PLAYER CAN LEAVE BUILDING-CHECK ___________________________

function playerCanLeave() {
  return flexElemsPosInit.exitDoorPosY < gameCanvas.height * 0.73 &&
    flexElemsPosInit.playerPosX < 500 &&
    flexElemsPosInit.playerOnFloor == 0
    ? true
    : false;
}

// ___________________________ PLAYER ON LIFT-CHECK ___________________________

function playerOnLift(getOutOfLift) {
  if (getOutOfLift) {
    if (flexElemsPosInit.playerOnLiftL) {
      if (!flexElemsPosInit.liftL_isMoving && shaftLdoorsOpenCheck()) {
        flexElemsPosInit.playerOnLiftL = false;
      }
    }
    if (flexElemsPosInit.playerOnLiftR) {
      if (!flexElemsPosInit.liftR_isMoving && shaftRdoorsOpenCheck()) {
        flexElemsPosInit.playerOnLiftR = false;
      }
    }
  } else {
    if (
      (flexElemsPosInit.playerOnFloor === 0 &&
        flexElemsPosInit.liftL_isOnFloor === 0) ||
      (flexElemsPosInit.playerOnFloor === 1 &&
        flexElemsPosInit.liftL_isOnFloor === 1) ||
      (flexElemsPosInit.playerOnFloor === 2 &&
        flexElemsPosInit.liftL_isOnFloor === 2) ||
      (flexElemsPosInit.playerOnFloor === 3 &&
        flexElemsPosInit.liftL_isOnFloor === 3) ||
      (flexElemsPosInit.playerOnFloor === 4 &&
        flexElemsPosInit.liftL_isOnFloor === 4) ||
      (flexElemsPosInit.playerOnFloor === 5 &&
        flexElemsPosInit.liftL_isOnFloor === 5) ||
      (flexElemsPosInit.playerOnFloor === 6 &&
        flexElemsPosInit.liftL_isOnFloor === 6)
    ) {
      if (
        flexElemsPosInit.playerPosX > gameCanvas.width * 0.16 &&
        flexElemsPosInit.playerPosX < gameCanvas.width * 0.185
      ) {
        flexElemsPosInit.playerOnLiftL = true;
      }
    }
    if (
      (flexElemsPosInit.playerOnFloor === 0 &&
        flexElemsPosInit.liftR_isOnFloor === 0) ||
      (flexElemsPosInit.playerOnFloor === 1 &&
        flexElemsPosInit.liftR_isOnFloor === 1) ||
      (flexElemsPosInit.playerOnFloor === 2 &&
        flexElemsPosInit.liftR_isOnFloor === 2) ||
      (flexElemsPosInit.playerOnFloor === 3 &&
        flexElemsPosInit.liftR_isOnFloor === 3) ||
      (flexElemsPosInit.playerOnFloor === 4 &&
        flexElemsPosInit.liftR_isOnFloor === 4) ||
      (flexElemsPosInit.playerOnFloor === 5 &&
        flexElemsPosInit.liftR_isOnFloor === 5) ||
      (flexElemsPosInit.playerOnFloor === 6 &&
        flexElemsPosInit.liftR_isOnFloor === 6)
    ) {
      if (
        flexElemsPosInit.playerPosX > gameCanvas.width * 0.76 &&
        flexElemsPosInit.playerPosX < gameCanvas.width * 0.79
      ) {
        flexElemsPosInit.playerOnLiftR = true;
      }
    }
  }
}

function playerCollision() {
  return flexElemsPosInit.playerPosX >=
    gameCanvas.width * 0.95 - gameElements.playerWidth / 1.85
    ? true
    : flexElemsPosInit.playerPosX <=
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
    flexElemsPosInit.liftR_calledToFloor != 0 &&
    !shaftRdoorsClosedStatus.floor0_RdoorClosed
      ? (gameElements.shaftDoorsRW_f0 += 0.25)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    flexElemsPosInit.liftR_calledToFloor != 1 &&
    !shaftRdoorsClosedStatus.floor1_RdoorClosed
      ? (gameElements.shaftDoorsRW_f1 += 0.25)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    flexElemsPosInit.liftR_calledToFloor != 2 &&
    !shaftRdoorsClosedStatus.floor2_RdoorClosed
      ? (gameElements.shaftDoorsRW_f2 += 0.25)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    flexElemsPosInit.liftR_calledToFloor != 3 &&
    !shaftRdoorsClosedStatus.floor3_RdoorClosed
      ? (gameElements.shaftDoorsRW_f3 += 0.25)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    flexElemsPosInit.liftR_calledToFloor != 4 &&
    !shaftRdoorsClosedStatus.floor4_RdoorClosed
      ? (gameElements.shaftDoorsRW_f4 += 0.25)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    flexElemsPosInit.liftR_calledToFloor != 5 &&
    !shaftRdoorsClosedStatus.floor5_RdoorClosed
      ? (gameElements.shaftDoorsRW_f5 += 0.25)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    flexElemsPosInit.liftR_calledToFloor != 6 &&
    !shaftRdoorsClosedStatus.floor6_RdoorClosed
      ? (gameElements.shaftDoorsRW_f6 += 0.25)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    flexElemsPosInit.liftL_calledToFloor != 0 &&
    !shaftLdoorsClosedStatus.floor0_LdoorClosed
      ? (gameElements.shaftDoorsLW_f0 += 0.25)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    flexElemsPosInit.liftL_calledToFloor != 1 &&
    !shaftLdoorsClosedStatus.floor1_LdoorClosed
      ? (gameElements.shaftDoorsLW_f1 += 0.25)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    flexElemsPosInit.liftL_calledToFloor != 2 &&
    !shaftLdoorsClosedStatus.floor2_LdoorClosed
      ? (gameElements.shaftDoorsLW_f2 += 0.25)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    flexElemsPosInit.liftL_calledToFloor != 3 &&
    !shaftLdoorsClosedStatus.floor3_LdoorClosed
      ? (gameElements.shaftDoorsLW_f3 += 0.25)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    flexElemsPosInit.liftL_calledToFloor != 4 &&
    !shaftLdoorsClosedStatus.floor4_LdoorClosed
      ? (gameElements.shaftDoorsLW_f4 += 0.25)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    flexElemsPosInit.liftL_calledToFloor != 5 &&
    !shaftLdoorsClosedStatus.floor5_LdoorClosed
      ? (gameElements.shaftDoorsLW_f5 += 0.25)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    flexElemsPosInit.liftL_calledToFloor != 6 &&
    !shaftLdoorsClosedStatus.floor6_LdoorClosed
      ? (gameElements.shaftDoorsLW_f6 += 0.25)
      : gameElements.shaftDoorsLW_f6;

  // __________________________________________________ OPEN-DOORS __________________________________________________
  gameElements.shaftDoorsRW_f0 =
    flexElemsPosInit.liftR_calledToFloor == 0 &&
    flexElemsPosInit.liftR_isOnFloor == 0 &&
    !shaftRdoorsOpenStatus.floor0_RdoorOpen
      ? (gameElements.shaftDoorsRW_f0 -= 0.25)
      : gameElements.shaftDoorsRW_f0;

  gameElements.shaftDoorsRW_f1 =
    flexElemsPosInit.liftR_calledToFloor == 1 &&
    flexElemsPosInit.liftR_isOnFloor == 1 &&
    !shaftRdoorsOpenStatus.floor1_RdoorOpen
      ? (gameElements.shaftDoorsRW_f1 -= 0.25)
      : gameElements.shaftDoorsRW_f1;

  gameElements.shaftDoorsRW_f2 =
    flexElemsPosInit.liftR_calledToFloor == 2 &&
    flexElemsPosInit.liftR_isOnFloor == 2 &&
    !shaftRdoorsOpenStatus.floor2_RdoorOpen
      ? (gameElements.shaftDoorsRW_f2 -= 0.25)
      : gameElements.shaftDoorsRW_f2;

  gameElements.shaftDoorsRW_f3 =
    flexElemsPosInit.liftR_calledToFloor == 3 &&
    flexElemsPosInit.liftR_isOnFloor == 3 &&
    !shaftRdoorsOpenStatus.floor3_RdoorOpen
      ? (gameElements.shaftDoorsRW_f3 -= 0.25)
      : gameElements.shaftDoorsRW_f3;

  gameElements.shaftDoorsRW_f4 =
    flexElemsPosInit.liftR_calledToFloor == 4 &&
    flexElemsPosInit.liftR_isOnFloor == 4 &&
    !shaftRdoorsOpenStatus.floor4_RdoorOpen
      ? (gameElements.shaftDoorsRW_f4 -= 0.25)
      : gameElements.shaftDoorsRW_f4;

  gameElements.shaftDoorsRW_f5 =
    flexElemsPosInit.liftR_calledToFloor == 5 &&
    flexElemsPosInit.liftR_isOnFloor == 5 &&
    !shaftRdoorsOpenStatus.floor5_RdoorOpen
      ? (gameElements.shaftDoorsRW_f5 -= 0.25)
      : gameElements.shaftDoorsRW_f5;

  gameElements.shaftDoorsRW_f6 =
    flexElemsPosInit.liftR_calledToFloor == 6 &&
    flexElemsPosInit.liftR_isOnFloor == 6 &&
    !shaftRdoorsOpenStatus.floor6_RdoorOpen
      ? (gameElements.shaftDoorsRW_f6 -= 0.25)
      : gameElements.shaftDoorsRW_f6;

  gameElements.shaftDoorsLW_f0 =
    flexElemsPosInit.liftL_calledToFloor == 0 &&
    flexElemsPosInit.liftL_isOnFloor == 0 &&
    !shaftLdoorsOpenStatus.floor0_LdoorOpen
      ? (gameElements.shaftDoorsLW_f0 -= 0.25)
      : gameElements.shaftDoorsLW_f0;

  gameElements.shaftDoorsLW_f1 =
    flexElemsPosInit.liftL_calledToFloor == 1 &&
    flexElemsPosInit.liftL_isOnFloor == 1 &&
    !shaftLdoorsOpenStatus.floor1_LdoorOpen
      ? (gameElements.shaftDoorsLW_f1 -= 0.25)
      : gameElements.shaftDoorsLW_f1;

  gameElements.shaftDoorsLW_f2 =
    flexElemsPosInit.liftL_calledToFloor == 2 &&
    flexElemsPosInit.liftL_isOnFloor == 2 &&
    !shaftLdoorsOpenStatus.floor2_LdoorOpen
      ? (gameElements.shaftDoorsLW_f2 -= 0.25)
      : gameElements.shaftDoorsLW_f2;

  gameElements.shaftDoorsLW_f3 =
    flexElemsPosInit.liftL_calledToFloor == 3 &&
    flexElemsPosInit.liftL_isOnFloor == 3 &&
    !shaftLdoorsOpenStatus.floor3_LdoorOpen
      ? (gameElements.shaftDoorsLW_f3 -= 0.25)
      : gameElements.shaftDoorsLW_f3;

  gameElements.shaftDoorsLW_f4 =
    flexElemsPosInit.liftL_calledToFloor == 4 &&
    flexElemsPosInit.liftL_isOnFloor == 4 &&
    !shaftLdoorsOpenStatus.floor4_LdoorOpen
      ? (gameElements.shaftDoorsLW_f4 -= 0.25)
      : gameElements.shaftDoorsLW_f4;

  gameElements.shaftDoorsLW_f5 =
    flexElemsPosInit.liftL_calledToFloor == 5 &&
    flexElemsPosInit.liftL_isOnFloor == 5 &&
    !shaftLdoorsOpenStatus.floor5_LdoorOpen
      ? (gameElements.shaftDoorsLW_f5 -= 0.25)
      : gameElements.shaftDoorsLW_f5;

  gameElements.shaftDoorsLW_f6 =
    flexElemsPosInit.liftL_calledToFloor == 6 &&
    flexElemsPosInit.liftL_isOnFloor == 6 &&
    !shaftLdoorsOpenStatus.floor6_LdoorOpen
      ? (gameElements.shaftDoorsLW_f6 -= 0.25)
      : gameElements.shaftDoorsLW_f6;
}

// ___________________________ PLAYER-POS-UPDATES ___________________________

function playerPosUpdate(moveDirection) {
  flexElemsPosInit.playerPosX =
    moveDirection === "left"
      ? (flexElemsPosInit.playerPosX -= gameElements.playerSpeed)
      : moveDirection === "right"
      ? (flexElemsPosInit.playerPosX += gameElements.playerSpeed)
      : moveDirection === "stop"
      ? flexElemsPosInit.playerPosX
      : gameCanvas.width / 2;

  flexElemsPosInit.playerPosY = flexElemsPosInit.playerOnLiftR
    ? (flexElemsPosInit.playerPosY =
        flexElemsPosInit.liftR_YPos +
        (gameElements.liftsHeight - gameElements.playerHeight))
    : flexElemsPosInit.playerOnLiftL
    ? (flexElemsPosInit.playerPosY =
        flexElemsPosInit.liftL_YPos +
        (gameElements.liftsHeight - gameElements.playerHeight))
    : flexElemsPosInit.playerPosY;
}

function playerIsOnFloor() {
  flexElemsPosInit.playerOnFloor =
    flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset >
    gameElements.floor1_YPos
      ? 0
      : flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset >
        gameElements.floor2_YPos
      ? 1
      : flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset >
        gameElements.floor3_YPos
      ? 2
      : flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset >
        gameElements.floor4_YPos
      ? 3
      : flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset >
        gameElements.floor5_YPos
      ? 4
      : flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset >
        gameElements.floor6_YPos
      ? 5
      : flexElemsPosInit.playerPosY + flexElemsPosInit.playerYposOffset <
        gameElements.floor6_YPos
      ? 6
      : 101;
}

// ___________________________ LIFTS-POS-UPDATES ___________________________

// Lift Floor-Check logic Right
function liftsPosUpdate() {
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor0_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 0;
    flexElemsPosInit.liftR_isMoving = false;
  }
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor1_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 1;
    flexElemsPosInit.liftR_isMoving = false;
  }
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor2_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 2;
    flexElemsPosInit.liftR_isMoving = false;
  }
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor3_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 3;
    flexElemsPosInit.liftR_isMoving = false;
  }
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor4_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 4;
    flexElemsPosInit.liftR_isMoving = false;
  }
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor5_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 5;
    flexElemsPosInit.liftR_isMoving = false;
  }
  if (flexElemsPosInit.liftR_YPos === floorLevels.floor6_YPos) {
    flexElemsPosInit.liftR_isOnFloor = 6;
    flexElemsPosInit.liftR_isMoving = false;
  }
  // Lift Floor-Check logic Left
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor0_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 0;
    flexElemsPosInit.liftL_isMoving = false;
  }
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor1_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 1;
    flexElemsPosInit.liftL_isMoving = false;
  }
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor2_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 2;
    flexElemsPosInit.liftL_isMoving = false;
  }
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor3_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 3;
    flexElemsPosInit.liftL_isMoving = false;
  }
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor4_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 4;
    flexElemsPosInit.liftL_isMoving = false;
  }
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor5_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 5;
    flexElemsPosInit.liftL_isMoving = false;
  }
  if (flexElemsPosInit.liftL_YPos === floorLevels.floor6_YPos) {
    flexElemsPosInit.liftL_isOnFloor = 6;
    flexElemsPosInit.liftL_isMoving = false;
  }

  // LIFT MOVEMENT LOGIC - RIGHT LIFT
  if (flexElemsPosInit.liftR_calledToFloor == 0) {
    if (flexElemsPosInit.liftR_isOnFloor != 0 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos += gameElements.liftSpeed;
    }
  }
  if (flexElemsPosInit.liftR_calledToFloor == 1) {
    if (flexElemsPosInit.liftR_isOnFloor != 1 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos =
        flexElemsPosInit.liftR_YPos < floorLevels.floor1_YPos
          ? (flexElemsPosInit.liftR_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftR_calledToFloor == 2) {
    if (flexElemsPosInit.liftR_isOnFloor != 2 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos =
        flexElemsPosInit.liftR_YPos < floorLevels.floor2_YPos
          ? (flexElemsPosInit.liftR_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftR_calledToFloor == 3) {
    if (flexElemsPosInit.liftR_isOnFloor != 3 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos =
        flexElemsPosInit.liftR_YPos < floorLevels.floor3_YPos
          ? (flexElemsPosInit.liftR_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftR_calledToFloor == 4) {
    if (flexElemsPosInit.liftR_isOnFloor != 4 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos =
        flexElemsPosInit.liftR_YPos < floorLevels.floor4_YPos
          ? (flexElemsPosInit.liftR_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftR_calledToFloor == 5) {
    if (flexElemsPosInit.liftR_isOnFloor != 5 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos =
        flexElemsPosInit.liftR_YPos < floorLevels.floor5_YPos
          ? (flexElemsPosInit.liftR_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftR_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftR_calledToFloor == 6) {
    if (flexElemsPosInit.liftR_isOnFloor != 6 && shaftRdoorsClosed()) {
      flexElemsPosInit.liftR_isMoving = true;
      flexElemsPosInit.liftR_YPos =
        flexElemsPosInit.liftR_YPos < floorLevels.floor6_YPos
          ? (flexElemsPosInit.liftR_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftR_YPos -= gameElements.liftSpeed);
    }
  }

  //__________________________________ LEFT LIFT __________________________________

  if (flexElemsPosInit.liftL_calledToFloor == 0) {
    if (flexElemsPosInit.liftL_isOnFloor != 0 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor0_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftL_calledToFloor == 1) {
    if (flexElemsPosInit.liftL_isOnFloor != 1 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor1_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftL_calledToFloor == 2) {
    if (flexElemsPosInit.liftL_isOnFloor != 2 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor2_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftL_calledToFloor == 3) {
    if (flexElemsPosInit.liftL_isOnFloor != 3 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor3_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftL_calledToFloor == 4) {
    if (flexElemsPosInit.liftL_isOnFloor != 4 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor4_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftL_calledToFloor == 5) {
    if (flexElemsPosInit.liftL_isOnFloor != 5 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor5_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
  if (flexElemsPosInit.liftL_calledToFloor == 6) {
    if (flexElemsPosInit.liftL_isOnFloor != 6 && shaftLdoorsClosed()) {
      flexElemsPosInit.liftL_isMoving = true;
      flexElemsPosInit.liftL_YPos =
        flexElemsPosInit.liftL_YPos < floorLevels.floor6_YPos
          ? (flexElemsPosInit.liftL_YPos += gameElements.liftSpeed)
          : (flexElemsPosInit.liftL_YPos -= gameElements.liftSpeed);
    }
  }
}
// In THE WORKS !
function liftCalledCheck() {
  for (let i = 0; i < 7; ++i) {
    callElevatorBtnsStatus[`floor${i}`] =
      flexElemsPosInit.liftR_isOnFloor === i ||
      flexElemsPosInit.liftL_isOnFloor === i
        ? 0
        : callElevatorBtnsStatus[`floor${i}`];

    flexElemsPosInit.liftR_calledToFloor =
      callElevatorBtnsStatus[`floor${i}`] !== 0 &&
      flexElemsPosInit.liftR_isOnFloor !== i &&
      Math.abs(i - flexElemsPosInit.liftR_isOnFloor) <
        Math.abs(i - flexElemsPosInit.liftL_isOnFloor)
        ? i
        : callElevatorBtnsStatus[`floor${i}`] !== 0 &&
          flexElemsPosInit.liftR_isOnFloor !== i &&
          Math.abs(i - flexElemsPosInit.liftR_isOnFloor) ===
            Math.abs(i - flexElemsPosInit.liftL_isOnFloor)
        ? i
        : flexElemsPosInit.liftR_calledToFloor;

    flexElemsPosInit.liftL_calledToFloor =
      callElevatorBtnsStatus[`floor${i}`] !== 0 &&
      flexElemsPosInit.liftL_isOnFloor !== i &&
      Math.abs(i - flexElemsPosInit.liftL_isOnFloor) <
        Math.abs(i - flexElemsPosInit.liftR_isOnFloor)
        ? i
        : flexElemsPosInit.liftL_calledToFloor;
  }
  // console.log();
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
  // ctx.fillStyle = "#f4ff51";
  // ctx.fillRect(
  //   gameCanvas.width * 0.2 - gameElements.liftsWidth / 2,
  //   moveableElems.liftL_YPos,
  //   gameElements.liftsWidth,
  //   gameElements.liftsHeight
  // );

  ctx.drawImage(
    cabinView,
    gameCanvas.width * 0.2 - gameElements.liftsWidth / 2,
    flexElemsPosInit.liftL_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );
  ctx.drawImage(
    cabinView,
    gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
    flexElemsPosInit.liftR_YPos,
    gameElements.liftsWidth,
    gameElements.liftsHeight
  );

  // ctx.fillRect(
  //   gameCanvas.width * 0.8 - gameElements.liftsWidth / 2,
  //   moveableElems.liftR_YPos,
  //   gameElements.liftsWidth,
  //   gameElements.liftsHeight
  // );
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

  ctx.fillStyle = "#222222";
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
  ctx.fillStyle = "#700";
  ctx.fillRect(
    gameCanvas.width * 0.051,
    flexElemsPosInit.exitDoorPosY,
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

function drawCallElevatorBtns(
  platePosX,
  platePosY,
  triPosx,
  triUpPosY,
  triDwnPosY,
  btnActive,
  floor
) {
  // Plate
  ctx.fillStyle = "#9d3a08";
  ctx.fillRect(platePosX, platePosY, 20, 35);

  if (floor === 0) {
    // Upper Button
    btnActive === 1
      ? drawTriangle(triPosx, triUpPosY, 12, "lime", "up")
      : drawTriangle(triPosx, triUpPosY, 12, "darkred", "up");
    return;
  }

  if (floor === 6) {
    btnActive === 2
      ? drawTriangle(triPosx, triDwnPosY, 12, "lime", "down")
      : drawTriangle(triPosx, triDwnPosY, 12, "darkred", "down");
    return;
  }

  // Upper Button
  btnActive === 1
    ? drawTriangle(triPosx, triUpPosY, 12, "lime", "up")
    : drawTriangle(triPosx, triUpPosY, 12, "darkred", "up");
  // Lower Button
  btnActive === 2
    ? drawTriangle(triPosx, triDwnPosY, 12, "lime", "down")
    : drawTriangle(triPosx, triDwnPosY, 12, "darkred", "down");
  // Both Buttons
  if (btnActive === 3) {
    drawTriangle(triPosx, triUpPosY, 12, "lime", "up");
    drawTriangle(triPosx, triDwnPosY, 12, "lime", "down");
  }
}

function drawExitButtons(platePosX, platePosY, btnPosX, btnPosY, btnActivated) {
  // Plate
  ctx.fillStyle = "#9d3a08";
  ctx.fillRect(platePosX, platePosY, 17, 17);

  ctx.fillStyle = btnActivated ? "#d4ff00" : "#ff3e00";
  ctx.beginPath();

  // Draw Circle -> (posX, posY, radius, startangle, endangle)
  ctx.arc(btnPosX, btnPosY, 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

function drawTriangle(posX, posY, width, fillColor, dir) {
  if (dir == "down") {
    ctx.beginPath();
    ctx.moveTo(posX, posY); // Erster Eckpunkt
    ctx.lineTo(posX + width, posY); // Zweiter Eckpunkt
    ctx.lineTo(posX + width / 2, posY + width / 1.5); // Dritter Eckpunkt
    ctx.closePath(); // Pfad schließen (zurück zum Startpunkt)
  }
  if (dir == "up") {
    ctx.beginPath();
    ctx.moveTo(posX + width / 2, posY); // Erster Eckpunkt
    ctx.lineTo(posX, posY + width / 1.5); // Zweiter Eckpunkt
    ctx.lineTo(posX + width, posY + width / 1.5); // Dritter Eckpunkt
    ctx.closePath(); // Pfad schließen (zurück zum Startpunkt)
  }
  ctx.stroke(); // Linien zeichnen
  ctx.fillStyle = fillColor;
  ctx.fill(); // Optional: Dreieck ausfüllen
}

function drawPlayer(xPos, yPos, lastDirection) {
  ctx.save(); // Speichern des aktuellen Kontextzustands

  if (flexElemsPosInit.playerLastDir === "left") {
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
