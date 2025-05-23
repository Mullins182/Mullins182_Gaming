console.log("Module 'spriteHandling.mjs' has started !");

// Lift Cabins inner view
export const cabinView = new Image();
cabinView.src = "./assets/img/liftCabins/cabinView4.png";

// Spritesheets Initializing
export let player_spriteSheet = {
  idle: new Image(),
  run: new Image(),
};

let npc_spriteSheet = {
  idle: new Image(),
};

export let playerSprite = player_spriteSheet.idle;
export let npcSprite = npc_spriteSheet.idle;

player_spriteSheet.run.src = "./assets/sprites/player/run/Run_2.png";
player_spriteSheet.idle.src = "./assets/sprites/player/idle/Idle_3.png";
npc_spriteSheet.idle.src = "./assets/sprites/securityBot/idle/Idle.png";

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
