console.log("Module 'soundHandling.mjs' has started !");

import { moveableElems, gameElements } from "./hell10.mjs";
import { gameCanvas } from "./canvasInit.mjs";
import { playerSprite, player_spriteSheet } from "./spriteHandling.mjs";
import { playerCatched } from "./npcLogic.mjs";

const Howl = window.Howl;

// Sound-Initializing
export const sounds = {
  liftSndR: new Howl({ src: ["./assets/sounds/liftMoves2.wav"] }),
  liftSndL: new Howl({ src: ["./assets/sounds/liftMoves2.wav"] }),
  liftDoorsRop: new Howl({ src: ["./assets/sounds/openLiftDoors.wav"] }),
  liftDoorsLop: new Howl({ src: ["./assets/sounds/openLiftDoors.wav"] }),
  liftDoorsRcl: new Howl({ src: ["./assets/sounds/closeLiftDoors.wav"] }),
  liftDoorsLcl: new Howl({ src: ["./assets/sounds/closeLiftDoors.wav"] }),
  npcAttack: new Howl({ src: ["./assets/sounds/npcAttack.wav"] }),
  runSnd: new Howl({ src: ["./assets/sounds/running.wav"] }),
  btnPress: new Howl({ src: ["./assets/sounds/buttonPressed.wav"] }),
  exitDoorSnd: new Howl({ src: ["./assets/sounds/exitDoorSnd.wav"] }),
};

export const soundState = {
  liftLFading: false,
  liftRFading: false,
  callLiftBtnSndCount: 0,
  callLiftBtnActCount: 0,
  exitBtnSndCount: 0,
  exitBtnActCounter: 0,
  exitDoorMoving: false,
  exitDoorStopped: true,
};

// Exportiere eine Funktion, die Promises für das Laden der Sounds zurückgibt
export function loadAllSounds() {
  const loadPromises = Object.values(sounds).map((sound) => {
    return new Promise((resolve, reject) => {
      // Wenn der Sound bereits geladen ist (z.B. aus Cache), sofort auflösen
      if (sound.state() === "loaded") {
        resolve();
        return;
      }

      // Bei erfolgreichem Laden auflösen
      sound.once("load", () => resolve());
      // Bei Ladefehler ablehnen
      sound.once("loaderror", (id, error) => {
        console.error(`Fehler beim Laden von Sound (ID: ${id}):`, error);
        reject(new Error(`Fehler beim Laden eines Sounds: ${error}`));
      });
    });
  });
  return Promise.all(loadPromises);
}

export async function playSounds(stopAll = false) {
  if (stopAll) {
    sounds.liftDoorsLcl.stop();
    sounds.exitDoorSnd.stop();
    sounds.liftDoorsRcl.stop();
    sounds.liftDoorsLop.stop();
    sounds.liftDoorsRop.stop();
    sounds.liftSndL.stop();
    sounds.liftSndR.stop();
    sounds.npcAttack.stop();
    sounds.runSnd.stop();
    return;
  }
  // LIFTS STEREO Panning
  // if (!soundState.liftLFading || !soundState.liftRFading) {
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

  // NPC-Attack
  if (playerCatched) {
    sounds.npcAttack.rate() !== 2.63 ? sounds.npcAttack.rate(2.63) : null;

    if (!sounds.npcAttack.playing()) {
      sounds.npcAttack.seek(1.35);
      sounds.npcAttack.play();
    } else {
      sounds.npcAttack.seek() > 1.55 ? sounds.npcAttack.seek(1.35) : null;
    }
  }

  // LIFT L
  if (
    moveableElems.liftL_calledToFloor != moveableElems.liftL_isOnFloor &&
    !moveableElems.liftL_isMoving
  ) {
    if (!sounds.liftDoorsLcl.playing()) {
      sounds.liftDoorsLcl.volume(0.45);
      sounds.liftDoorsLcl.rate(0.78);
      sounds.liftDoorsLcl.play();
    }
  }

  if (moveableElems.liftL_isMoving) {
    if (!sounds.liftSndL.playing()) {
      soundState.liftLFading = false;
      sounds.liftSndL.volume(0.55);
      sounds.liftSndL.play();
    }
    soundState.liftLFading = false;
    sounds.liftSndL.seek() > 3.0
      ? sounds.liftSndL.seek(1.0)
      : sounds.liftSndL.seek();
  } else {
    fadeOutLift(sounds.liftSndL, (v) => {
      if (v !== undefined) soundState.liftLFading = v;
      if (!sounds.liftDoorsLop.playing()) {
        sounds.liftDoorsLop.volume(0.45);
        sounds.liftDoorsLop.rate(1.65);
        sounds.liftDoorsLop.play();
      }
      return soundState.liftLFading;
    });
  }

  // LIFT R
  if (
    moveableElems.liftR_calledToFloor != moveableElems.liftR_isOnFloor &&
    !moveableElems.liftR_isMoving
  ) {
    if (!sounds.liftDoorsRcl.playing()) {
      sounds.liftDoorsRcl.volume(0.45);
      sounds.liftDoorsRcl.rate(0.78);
      sounds.liftDoorsRcl.play();
    }
  }

  if (moveableElems.liftR_isMoving) {
    if (!sounds.liftSndR.playing()) {
      soundState.liftRFading = false;
      sounds.liftSndR.volume(0.55);
      sounds.liftSndR.play();
    }
    soundState.liftRFading = false;
    sounds.liftSndR.seek() > 3.0
      ? sounds.liftSndR.seek(1.0)
      : sounds.liftSndR.seek();
  } else {
    fadeOutLift(sounds.liftSndR, (v) => {
      if (v !== undefined) soundState.liftRFading = v;
      if (!sounds.liftDoorsRop.playing()) {
        sounds.liftDoorsRop.volume(0.45);
        sounds.liftDoorsRop.rate(1.65);
        sounds.liftDoorsRop.play();
      }
      return soundState.liftRFading;
    });
  }

  // EXIT BUTTONS
  if (soundState.exitBtnActCounter !== soundState.exitBtnSndCount) {
    sounds.btnPress.play();
    soundState.exitBtnSndCount = soundState.exitBtnActCounter;
  }

  // LIFT CALLING BUTTONS
  if (soundState.callLiftBtnSndCount !== soundState.callLiftBtnActCount) {
    sounds.btnPress.play();
    soundState.callLiftBtnSndCount = soundState.callLiftBtnActCount;
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
    moveableElems.exitDoorPosY >
      gameCanvas.height - gameElements.exitDoorHeight * 1.55
  ) {
    if (!soundState.exitDoorMoving) {
      soundState.exitDoorMoving = true;
    }
    if (soundState.exitDoorStopped) {
      soundState.exitDoorStopped = false;
    }
  } else if (
    !gameElements.exitDoorUnlocked &&
    moveableElems.exitDoorPosY < gameCanvas.height - gameElements.exitDoorHeight
  ) {
    if (!soundState.exitDoorMoving) {
      soundState.exitDoorMoving = true;
    }
    if (soundState.exitDoorStopped) {
      soundState.exitDoorStopped = false;
    }
  } else {
    if (soundState.exitDoorMoving) {
      soundState.exitDoorMoving = false;
    }
    if (!soundState.exitDoorStopped) {
      soundState.exitDoorStopped = true;
    }
  }

  if (soundState.exitDoorMoving) {
    if (!sounds.exitDoorSnd.playing()) {
      sounds.exitDoorSnd.volume(0.6);
      sounds.exitDoorSnd.play();
    }
    sounds.exitDoorSnd.seek() > 2.3
      ? sounds.exitDoorSnd.seek(1.25)
      : sounds.exitDoorSnd.seek();
  } else {
    if (soundState.exitDoorStopped) {
      if (sounds.exitDoorSnd.playing()) {
      } else {
        sounds.exitDoorSnd.seek(5.0);
      }
    }
  }
}
async function fadeOutLift(sound, setFading, duration = 550) {
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
