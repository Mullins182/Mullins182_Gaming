console.log("Module 'soundHandling.mjs' has started !");

import { flexElemsPosInit, gameElements } from "./hell10.mjs";
import { gameCanvas } from "./canvasInit.mjs";
import { playerSprite, player_spriteSheet } from "./spriteHandling.mjs";

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

export async function playSounds(stopAll = false) {
  if (stopAll) {
    sounds.liftDoorsLcl.stop();
    sounds.exitDoorSnd.stop();
    sounds.liftDoorsRcl.stop();
    sounds.liftDoorsLop.stop();
    sounds.liftDoorsRop.stop();
    sounds.liftSndL.stop();
    sounds.liftSndR.stop();
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
    flexElemsPosInit.exitDoorPosY >
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
    flexElemsPosInit.exitDoorPosY <
      gameCanvas.height - gameElements.exitDoorHeight
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
