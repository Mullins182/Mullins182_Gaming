console.log("Script geladen !");

let canvas = document.getElementById("portalCanvas");
let drawSmth = canvas.getContext("2d");
let dpr = window.devicePixelRatio || 1;

// Setzen Sie die tatsächliche Größe des Canvas
canvas.width = 650 * dpr;
canvas.height = 400 * dpr;

// Skalieren Sie den Kontext
drawSmth.scale(dpr, dpr);

// Setzen Sie die CSS-Größe des Canvas
// canvas.style.width = "600px";
// canvas.style.height = "600px";

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

window.onload = function () {
  console.log("Window Loaded !");

  createLabel(
    canvas.width / 2.1,
    canvas.height * 0.1,
    "Mullins182's",
    "60px Arial Black",
    "gold",
    "black",
    3,
    8,
    17,
    "strokeText",
    "gold",
    3
  );

  createLabel(
    canvas.width / 2.1,
    canvas.height * 0.6,
    "JavaScript",
    "60px Arial Black",
    "gold",
    "black",
    3,
    8,
    17,
    "strokeText",
    "gold",
    3
  );
  createLabel(
    canvas.width / 2.1,
    canvas.height * 0.8,
    "Gaming Page :)",
    "60px Arial Black",
    "gold",
    "black",
    3,
    8,
    17,
    "strokeText",
    "gold",
    3
  );
};

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
  drawSmth.font = font;

  // Textausrichtung festlegen
  drawSmth.textAlign = "center";
  drawSmth.textBaseline = "middle";

  // Textschatten konfigurieren
  drawSmth.shadowColor = shadowColor;
  drawSmth.shadowBlur = shadowBlur;
  drawSmth.shadowOffsetX = shadowOffsetX;
  drawSmth.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  drawSmth.fillStyle = color;

  // Text Style
  drawSmth.strokeStyle = strokeColor; // Randfarbe
  drawSmth.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    drawSmth.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    drawSmth.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  drawSmth.shadowColor = "rgba(0,0,0,0)";
  drawSmth.shadowBlur = 0;
  drawSmth.shadowOffsetX = 0;
  drawSmth.shadowOffsetY = 0;
}
