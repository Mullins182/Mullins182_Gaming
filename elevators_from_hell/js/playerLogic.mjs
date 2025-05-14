import {
  playerCollision,
  playerCanLeave,
  playerPosUpdate,
  gameElements,
  currentFramePlayer,
  totalFramesPlayer,
  flexElemsPosInit,
  animationIntervalPlayer,
  lastTimePlayer,
} from "./hell10.mjs";
import { changePlayerSprite } from "./spriteHandling.mjs";

// Collision-Variables
export let isColliding = false;

export function playerMovandColl() {
  if (!playerCollision() || playerCanLeave()) {
    playerPosUpdate(gameElements.playerMovement);
    isColliding = false;
  } else {
    isColliding = true;
    // Sichere Initialisierung der Idle-Animation
    currentFramePlayer = 0;
    totalFramesPlayer = 7;
    changePlayerSprite("stop");
    gameElements.playerMovement = "stop";
    flexElemsPosInit.playerPosX =
      flexElemsPosInit.playerPosX < gameCanvas.width / 2
        ? flexElemsPosInit.playerPosX + 5
        : flexElemsPosInit.playerPosX - 5;
    animationIntervalPlayer = 125; // Reset des Intervalls
    lastTimePlayer = performance.now(); // Reset des Zeitstempels
  }
}
