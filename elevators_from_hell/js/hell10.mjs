console.log("Module 'Hell10.mjs' has started !");

import { drawLabels } from "./drawLabels.mjs";
import { gameCanvas, ctx, wrapper } from "./canvasInit.mjs";

import {
  changePlayerSprite,
  playerSprite,
  player_spriteSheet,
  spriteControl,
} from "./spriteHandling.mjs";

import {
  drawLifts,
  drawCeiling,
  drawFloors,
  drawWalls,
  drawPlayer,
  drawNPC,
  drawLiftDoors,
  drawShaftsElements,
  drawCallElevatorBtns,
  drawExitButtons,
  drawDebugLine,
  drawGameOverImg,
} from "./drawingFunctions.mjs";

import {
  playSounds,
  soundState,
  sounds,
  loadAllSounds,
} from "./soundHandling.mjs";

import {
  playerCollisionCheck,
  isColliding,
  playerOnLift,
} from "./playerLogic.mjs";

import { npcRoutine, npcHeading, playerCatched } from "./npcLogic.mjs";

const startButton = document.getElementById("startButton");
const optionsButton = document.getElementById("optionsButton");
const returnBtn = document.getElementById("returnButton");
let soundsLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM INITIALIZED !");

  initialize();

  // --- Lade alle Sounds beim Start des Skripts ---
  console.log("Loading Soundeffects...");
  // Deaktiviere den Button initial, bis alles geladen ist
  if (startButton) {
    startButton.disabled = true;
    startButton.textContent = "loading...";
  }

  loadAllSounds()
    .then(() => {
      console.log("All Soundeffects Successfully Loaded!");
      soundsLoaded = true;
      if (startButton) {
        startButton.disabled = false;
        startButton.textContent = "Play Game";
      }
    })
    .catch((error) => {
      console.error("Error while loading soundeffects:", error);
      // Optional: Spiel trotzdem starten, aber mit Warnung, oder Button ganz deaktivieren
      soundsLoaded = false; // Oder auf true setzen, wenn das Spiel auch ohne alle Sounds funktionieren soll
      if (startButton) {
        startButton.disabled = true;
        startButton.textContent = "Sound Error :(";
      }
    });

  // --- Der Button-Klick-Handler ---
  if (startButton) {
    startButton.addEventListener("click", function () {
      if (!soundsLoaded) {
        console.warn("Sounds are loading, please wait ...");
        return;
      } // Spielstart verhindern

      // Starte den ersten Sound (z.B. Hintergrundmusik), um den AudioContext zu aktivieren
      if (sounds.btnPress) {
        sounds.btnPress.play();
      }

      // Blende den Button aus
      this.style.display = "none";
      optionsButton.style.display = "none";
      gameCanvas.style.opacity = 1;

      // Starte die Haupt-Spiellogik
      requestAnimationFrame(gameRoutine);
    });
  } else {
    console.warn("Start Button with ID 'startButton' not found !");
    // Falls der Button nicht gefunden wird, direkt die Spiellogik starten,
    // aber dann kann es sein, dass Sound nicht direkt funktioniert
    // initialize();
  }
});

if (optionsButton) {
  optionsButton.addEventListener("click", function () {});
}
if (returnBtn) {
  returnBtn.style.display = "none";
  returnBtn.addEventListener("click", function () {
    location.reload();
  });
}

export let playerOnFloor = { floor: 0 };
export let npcOnFloor = { floor: 5 };
let randCallLiftR = Math.random() < 0.5;

// Pause Game
window.addEventListener("blur", pauseGame);
window.addEventListener("focus", resumeGame);
let gamePaused = false;

// Canvas-Element-Variables
export const gameElements = {
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
  liftRposXmid: gameCanvas.width * 0.8,
  liftLposXmid: gameCanvas.width * 0.2,
  liftsWidth: 75,
  liftsHeight: 88,
  liftSpeed: 1.25,
  playerHeight: 121, // 110
  playerWidth: 121, // 100
  playerSpeed: 2.75,
  playerMovement: "stop",
  npcHeight: 70,
  npcWidth: 100,
  npcSpeed: 5.75,
  npcXaxisMirroringOffset: 70,
  npcPressCallLiftBtn: null,

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

export const flexElemsPosInit = {
  // Player/NPC PosInit
  playerPosX: gameCanvas.width / 2,
  playerPosY:
    gameElements[`floor${playerOnFloor.floor}_YPos`] -
    gameElements.playerHeight,
  playerYposOffset: 20,
  playerLastDir: "stop",
  playerOnLiftR: false,
  playerOnLiftL: false,

  npcPosX: gameCanvas.width / 1.65,
  npcPosY:
    gameElements[`floor${npcOnFloor.floor}_YPos`] - gameElements.npcHeight,
  npcActMovDir: "s",
  npcOnLiftR: false,
  npcOnLiftL: false,
  npcOnXPosLiftR: false,
  npcOnXPosLiftL: false,

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

export const exitButtonsStatus = {
  floor0: false,
  floor1: false,
  floor2: false,
  floor3: false,
  floor4: false,
  floor5: false,
  floor6: false,
};

export const callElevatorBtnsStatus = {
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

// ___________________________ GAME-VERSION ___________________________
export const gameVersion = "v0.9";

// ___________________________ DEBUGGING ___________________________
export const debugging = {
  debugMode: false,
  showDebugLine: false,
  showNpcRange: false,
  floorLevelSelected: floorLevels.floor0_YPos,
  automaticElevator: false,
};

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
      if (
        flexElemsPosInit.playerOnLiftL ||
        flexElemsPosInit.playerOnLiftR ||
        playerCatched
      ) {
        break;
      }
      changePlayerSprite("left");
      spriteControl.totalFramesPlayer = 10;
      spriteControl.animationIntervalPlayer = 80;
      gameElements.playerMovement = "left";
      break;
    case KEYS.DIRECTIONS.RIGHT:
      if (
        flexElemsPosInit.playerOnLiftL ||
        flexElemsPosInit.playerOnLiftR ||
        playerCatched
      ) {
        break;
      }
      changePlayerSprite("right");
      spriteControl.totalFramesPlayer = 10;
      spriteControl.animationIntervalPlayer = 80;
      gameElements.playerMovement = "right";
      break;
    case KEYS.DIRECTIONS.DOWN:
      if (playerCatched) {
        break;
      }
      if (playerSprite !== player_spriteSheet.idle) {
        changePlayerSprite("stop");
        spriteControl.totalFramesPlayer = 7;
        spriteControl.currentFramePlayer = 0;
        spriteControl.animationIntervalPlayer = 125; // Reset des Intervalls
        spriteControl.lastTimePlayer = performance.now(); // Reset des Zeitstempels
        gameElements.playerMovement = "stop";
      }
      playerOnFloor.floor !== 0 ? playerCallLiftBtnsCheck(2) : null;
      soundState.callLiftBtnActCount =
        playerOnFloor.floor !== 0 &&
        flexElemsPosInit.playerPosX >
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
        flexElemsPosInit.playerPosX <
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25
          ? ++soundState.callLiftBtnActCount
          : soundState.callLiftBtnActCount;

      playerOnLift(true);
      break;
    case KEYS.DIRECTIONS.UP:
      if (playerCatched) {
        break;
      }
      if (playerSprite !== player_spriteSheet.idle) {
        changePlayerSprite("stop");
        spriteControl.totalFramesPlayer = 7;
        spriteControl.currentFramePlayer = 0;
        spriteControl.animationIntervalPlayer = 125; // Reset des Intervalls
        spriteControl.lastTimePlayer = performance.now(); // Reset des Zeitstempels
        gameElements.playerMovement = "stop";
      }
      playerOnFloor.floor !== 6 ? playerCallLiftBtnsCheck(1) : null;
      soundState.callLiftBtnActCount =
        playerOnFloor.floor !== 6 &&
        flexElemsPosInit.playerPosX >
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 1.5 &&
        flexElemsPosInit.playerPosX <
          gameElements.callElevatorBtnsXpos - gameElements.playerWidth / 2 + 25
          ? ++soundState.callLiftBtnActCount
          : soundState.callLiftBtnActCount;
      exitBtnActCheck();
      playerOnLift(false);
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_AUTO_ELEVATOR:
      debugging.automaticElevator = !debugging.automaticElevator;
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_DEBUG_MODE:
      debugging.debugMode = !debugging.debugMode;
      break;
    case KEYS.SPECIAL_KEYS.TOGGLE_EXIT_DOOR:
      for (let key in exitButtonsStatus) {
        exitButtonsStatus[key] = !exitButtonsStatus[key];
      }
      break;
    case KEYS.SPECIAL_KEYS.CHANGE_PLAYER_YPOS:
      flexElemsPosInit.playerPosY =
        playerOnFloor.floor === 0
          ? gameElements.floor1_YPos - gameElements.playerHeight
          : playerOnFloor.floor === 1
          ? gameElements.floor2_YPos - gameElements.playerHeight
          : playerOnFloor.floor === 2
          ? gameElements.floor3_YPos - gameElements.playerHeight
          : playerOnFloor.floor === 3
          ? gameElements.floor4_YPos - gameElements.playerHeight
          : playerOnFloor.floor === 4
          ? gameElements.floor5_YPos - gameElements.playerHeight
          : playerOnFloor.floor === 5
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

  if (flexElemsPosInit.playerOnLiftL && shaftLdoorsOpenCheck()) {
    debugging.floorLevelSelected = getFloorLevel(floorNumber);
    flexElemsPosInit.liftL_calledToFloor = floorNumber;
  } else if (flexElemsPosInit.playerOnLiftR && shaftRdoorsOpenCheck()) {
    debugging.floorLevelSelected = getFloorLevel(floorNumber);
    flexElemsPosInit.liftR_calledToFloor = floorNumber;
  }
}

// ___________________________ GAME INI ___________________________
async function initialize() {
  ctx.imageSmoothingEnabled = true;
  // Howler.autoUnlock = true; // ➕ Für iOS notwendig
  createButton(startButton);
  createButton(optionsButton);
  createButton(returnBtn);
}

// ___________________________              ___________________________
// ___________________________ GAME-ROUTINE ___________________________
// ___________________________              ___________________________
async function gameRoutine(timestamp) {
  if (!gamePaused) {
    if (!spriteControl.lastTimePlayer) spriteControl.lastTimePlayer = timestamp;
    if (!spriteControl.lastTimeNpc) spriteControl.lastTimeNpc = timestamp;
    const elapsedPlayer = timestamp - spriteControl.lastTimePlayer;
    const elapsedNpc = timestamp - spriteControl.lastTimeNpc;

    if (elapsedPlayer > spriteControl.animationIntervalPlayer && !isColliding) {
      spriteControl.lastTimePlayer = timestamp;
      // Frame-Update
      spriteControl.currentFramePlayer =
        ++spriteControl.currentFramePlayer % spriteControl.totalFramesPlayer;
    }

    if (elapsedNpc > spriteControl.animationIntervalNpc) {
      spriteControl.lastTimeNpc = timestamp;
      // Frame-Update
      spriteControl.currentFrameNpc =
        ++spriteControl.currentFrameNpc % spriteControl.totalFramesNpc;
    }

    flexElemsPosInit.playerLastDir =
      gameElements.playerMovement === "left"
        ? "left"
        : gameElements.playerMovement === "right"
        ? "right"
        : flexElemsPosInit.playerLastDir;

    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    playerCatchedCheck();
    playerCollisionCheck();
    playerIsOnFloor();
    npcRoutine();
    liftsPosUpdate();
    shaftDoors();
    exitDoor();
    automaticLiftControl();
    liftCalledCheck();
    drawGameElements();
    playSounds();

    await new Promise((resolve) => setTimeout(resolve, 15));
  } else {
    playSounds(true);
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
  requestAnimationFrame(gameRoutine);
}

function pauseGame() {
  gamePaused = gamePaused ? null : true;
  playSounds(true);
  console.log("Game Paused !");
}

function resumeGame() {
  gamePaused = !gamePaused ? null : false;
  playSounds(false);
  console.log("Game resumed !");
}

function playerCatchedCheck() {
  if (playerCatched) {
    // drawGameOverImg();
    // wrapper.style.backgroundImage = "./assets/img/defeat.webp";
    gameElements.playerMovement = "stop";
    wrapper.style.backgroundSize = "0%";
    wrapper.style.backgroundColor = "#FF0000";
    gameCanvas.style.opacity = 0.85;
    returnBtn.style.display =
      returnBtn.style.display !== "inline" ? "inline" : returnBtn.style.display;
  }
}

function playerCallLiftBtnsCheck(value) {
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
      playerOnFloor.floor === i &&
      callElevatorBtnsStatus[`floor${i}`] != value &&
      callElevatorBtnsStatus[`floor${i}`] < 3
        ? callElevatorBtnsStatus[`floor${i}`] + value
        : value;

    callElevatorBtnsStatus[`floor${i}`] =
      callElevatorBtnsStatus[`floor${i}`] !== 3 &&
      playerOnFloor.floor === i &&
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
      playerOnFloor.floor === i && playerInteractPos.exitBtns
        ? exitButtonsStatus[`floor${i}`]
          ? false
          : true
        : exitButtonsStatus[`floor${i}`];
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
    flexElemsPosInit.npcOnLiftL
      ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "r")
      : flexElemsPosInit.npcOnLiftR
      ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "l")
      : null;
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

    !flexElemsPosInit.npcOnLiftL && !flexElemsPosInit.npcOnLiftR
      ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, npcHeading)
      : null;

    drawLabels();

    if (debugging.showDebugLine) {
      drawDebugLine();
    }
  } else {
    drawLifts();
    drawCeiling();
    drawFloors();
    drawWalls();
    flexElemsPosInit.npcOnLiftL
      ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "r")
      : flexElemsPosInit.npcOnLiftR
      ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, "l")
      : null;
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
    !flexElemsPosInit.npcOnLiftL && !flexElemsPosInit.npcOnLiftR
      ? drawNPC(flexElemsPosInit.npcPosX, flexElemsPosInit.npcPosY, npcHeading)
      : null;
    drawLabels();
    if (debugging.showDebugLine) {
      drawDebugLine();
    }
  }
}

function automaticLiftControl() {
  if (debugging.automaticElevator) {
    let randomNum;
    let randomNum2;

    for (let i = 256; i > 0; --i) {
      randomNum = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    }
    for (let i = 387; i > 0; --i) {
      randomNum2 = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    }

    // console.log(randomNum, "|", randomNum2);

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

function exitDoor() {
  let exitBtnActCounter = 0;

  for (let key in exitButtonsStatus) {
    exitBtnActCounter = exitButtonsStatus[key]
      ? ++exitBtnActCounter
      : exitBtnActCounter;
  }

  soundState.exitBtnActCounter = exitBtnActCounter;

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

export function playerPosUpdate(moveDirection) {
  flexElemsPosInit.playerPosX =
    moveDirection === "left"
      ? (flexElemsPosInit.playerPosX -= gameElements.playerSpeed)
      : moveDirection === "right"
      ? (flexElemsPosInit.playerPosX += gameElements.playerSpeed)
      : moveDirection === "stop"
      ? flexElemsPosInit.playerPosX
      : gameCanvas.width / 2;

  flexElemsPosInit.playerPosY = flexElemsPosInit.playerOnLiftR
    ? flexElemsPosInit.liftR_YPos +
      (gameElements.liftsHeight - gameElements.playerHeight)
    : flexElemsPosInit.playerOnLiftL
    ? flexElemsPosInit.liftL_YPos +
      (gameElements.liftsHeight - gameElements.playerHeight)
    : flexElemsPosInit.playerPosY;
}

function playerIsOnFloor() {
  playerOnFloor.floor =
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
  // console.log(randCallLiftR);

  for (let i = 0; i < 7; ++i) {
    callElevatorBtnsStatus[`floor${i}`] =
      flexElemsPosInit.liftR_isOnFloor === i ||
      flexElemsPosInit.liftL_isOnFloor === i
        ? 0
        : callElevatorBtnsStatus[`floor${i}`];

    flexElemsPosInit.liftR_calledToFloor =
      callElevatorBtnsStatus[`floor${i}`] !== 0 &&
      flexElemsPosInit.liftR_isOnFloor !== i &&
      !flexElemsPosInit.liftR_isMoving &&
      shaftRdoorsOpenCheck() &&
      Math.abs(i - flexElemsPosInit.liftR_isOnFloor) <
        Math.abs(i - flexElemsPosInit.liftL_isOnFloor)
        ? i
        : callElevatorBtnsStatus[`floor${i}`] !== 0 &&
          flexElemsPosInit.liftR_isOnFloor !== i &&
          !flexElemsPosInit.liftR_isMoving &&
          shaftRdoorsOpenCheck() &&
          Math.abs(i - flexElemsPosInit.liftR_isOnFloor) ===
            Math.abs(i - flexElemsPosInit.liftL_isOnFloor) &&
          randCallLiftR
        ? i
        : flexElemsPosInit.liftR_calledToFloor;

    flexElemsPosInit.liftL_calledToFloor =
      callElevatorBtnsStatus[`floor${i}`] !== 0 &&
      flexElemsPosInit.liftL_isOnFloor !== i &&
      !flexElemsPosInit.liftL_isMoving &&
      shaftLdoorsOpenCheck() &&
      Math.abs(i - flexElemsPosInit.liftL_isOnFloor) <
        Math.abs(i - flexElemsPosInit.liftR_isOnFloor)
        ? i
        : callElevatorBtnsStatus[`floor${i}`] !== 0 &&
          flexElemsPosInit.liftL_isOnFloor !== i &&
          !flexElemsPosInit.liftL_isMoving &&
          shaftLdoorsOpenCheck() &&
          Math.abs(i - flexElemsPosInit.liftR_isOnFloor) ===
            Math.abs(i - flexElemsPosInit.liftL_isOnFloor) &&
          !randCallLiftR
        ? i
        : flexElemsPosInit.liftL_calledToFloor;
  }
  // console.log();
}

function shaftRdoorsClosed() {
  return Object.values(shaftRdoorsClosedStatus).every(Boolean);
}

export function shaftRdoorsOpenCheck() {
  return Object.values(shaftRdoorsOpenStatus).some(Boolean);
}

function shaftLdoorsClosed() {
  return Object.values(shaftLdoorsClosedStatus).every(Boolean);
}

export function shaftLdoorsOpenCheck() {
  return Object.values(shaftLdoorsOpenStatus).some(Boolean);
}

function createButton(btn) {
  btn.textContent =
    btn === startButton
      ? "Play Game"
      : btn === optionsButton
      ? "Options"
      : btn === returnBtn
      ? "Goto Mainmenu"
      : "???";

  // Breite und Höhe anpassen
  btn.style.width = btn === returnBtn ? "300px" : "200px";
  btn.style.height = "50px";

  // Hintergrund- und Textfarbe ändern
  btn.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
  btn.style.color = "darkgoldenrod";

  // Schriftgröße und Schriftart anpassen
  btn.style.fontSize = "33px";
  btn.style.fontFamily = "Times New Roman, Arial";

  // Border Radius
  btn.style.borderRadius = "10px";

  // Border / Cursor
  btn.style.border = "2px solid goldenrod";
  btn.style.cursor = "pointer";

  // Box-Shadow hinzufügen
  btn.style.boxShadow = "0 0 55px red";

  // Übergänge für Hover-Effekt
  btn.style.transition =
    "background-color 0.5s, color 0.5s, border 1.0s, box-shadow 0.5s";

  // Hover-Effekt hinzufügen
  btn.addEventListener("mouseover", function () {
    this.style.backgroundColor = "rgba(200, 200, 0, 1.0)";
    this.style.color = "#000000";
    this.style.border = "2px solid black";
    this.style.boxShadow = "0 0 55px greenyellow";
  });

  btn.addEventListener("mouseout", function () {
    this.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
    this.style.color = "darkgoldenrod";
    this.style.border = "2px solid goldenrod";
    this.style.boxShadow = "0 0 55px red";
  });

  // Korrigierter Event-Listener für Klick-Ereignis
  // startButton.addEventListener("click", function () {
  //   document.body.removeChild(this); // 'this' bezieht sich auf den geklickten Button
  //   sounds.btnPress.play();
  //   initialize();
  // });

  document.body.appendChild(btn);
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
