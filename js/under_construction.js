console.log("Script Started !");

let drawSmth;
let gameCanvas = document.getElementById("mainCanvas");

const homeButton = document.createElement("button");

drawSmth = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

createHomeButton("50%", "92%");

createLabel(
  gameCanvas.width / 2,
  gameCanvas.height * 0.08,
  "HIER ENTSTEHT ETWAS WUNDERBARES :)",
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
