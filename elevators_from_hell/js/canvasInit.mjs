console.log("Module 'canvasInit.mjs' has started !");

// Make gameCanvas eventually responsive !
// gameCanvas.width = window.innerWidth;
// gameCanvas.height = window.innerHeight;

const wrapper = document.getElementById("gameWrapper");
const credits = document.getElementById("creditsCanvas");
const cctx = credits.getContext("2d");
const gameCanvas = document.getElementById("mainCanvas");
const ctx = gameCanvas.getContext("2d");

// wrapper.width = 1650;
// wrapper.height = 900;
gameCanvas.width = 1650;
gameCanvas.height = 900;
credits.width = 1650;
credits.height = 900;

export { gameCanvas, ctx, wrapper, credits, cctx };
