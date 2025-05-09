// import { playerSprite } from "./hell10.mjs";

export let player_spriteSheet = {
  idle: new Image(),
  run: new Image(),
};

export let playerSprite = player_spriteSheet.idle;

export function changePlayerSprite(movement) {
  if (movement === "left" || movement === "right") {
    playerSprite =
      playerSprite === player_spriteSheet.run
        ? playerSprite
        : player_spriteSheet.run;
  } else {
    playerSprite =
      playerSprite === player_spriteSheet.idle
        ? playerSprite
        : player_spriteSheet.idle;
  }
}
