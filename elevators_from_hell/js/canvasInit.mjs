console.log("Module 'canvasInit.mjs' has started !");

// Make gameCanvas eventually responsive !
// gameCanvas.width = window.innerWidth;
// gameCanvas.height = window.innerHeight;

const gameCanvas = document.getElementById("mainCanvas");
const ctx = gameCanvas.getContext("2d");
gameCanvas.width = 1650;
gameCanvas.height = 900;

export { gameCanvas, ctx };
