console.log("Hell10 has Started !");

const gameCanvas = document.getElementById("mainCanvas");
const doc = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

let gameElements = {
  floorWidth: gameCanvas.width * 0.9,
  floorHeight: "6",
  WallsHeight: gameCanvas.height * 0.89,
  wallsWidth: "15",
  ceilingWidth: gameCanvas.width * 0.95,
  ceilingHeight: "15",
  liftDoorWidth: "37",
  liftDoorHeight: "90",
  liftWidth: "75",
  liftHeight: "88"
};

// ________ GAME-LABEL _______
createLabel(
  gameCanvas.width / 2,
  gameCanvas.height * 0.08,
  "ELEVATORS FROM HELL",
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

initGame();

// ________ GAME INI _______
function initGame() {
  drawFloors();
  drawWalls();
  drawCeiling();
  drawLifts();
  drawLiftDoors();
}

function drawLifts() {
  doc.fillStyle = "#BFBF00";
  doc.fillRect(
    gameCanvas.width * 0.2 - gameElements.liftWidth / 2,
    gameCanvas.height * 1.0 - gameElements.liftHeight - gameElements.floorHeight,
    gameElements.liftWidth,
    gameElements.liftHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftWidth / 2,
    gameCanvas.height * 1.0 - gameElements.liftHeight - gameElements.floorHeight,
    gameElements.liftWidth,
    gameElements.liftHeight
  );

}

function drawLiftDoors() {
  doc.fillStyle = "#3F0000";

  // Floor 0 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 1.0 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 1.0 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  // Floor 1 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.875 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 0.875 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );
  
  // Floor 2 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.75 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 0.75 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  // Floor 3 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.625 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 0.625 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );
  
  // Floor 4 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.5 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 0.5 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  // Floor 5 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.375 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 0.375 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  // Floor 6 | left
  doc.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.25 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorWidth,
    gameCanvas.height * 0.25 - gameElements.liftDoorHeight - gameElements.floorHeight,
    gameElements.liftDoorWidth,
    gameElements.liftDoorHeight
  );
}

function drawCeiling() {
  doc.fillStyle = "#373737";
  doc.fillRect(
    gameCanvas.width * 0.505 - gameElements.ceilingWidth / 2,
    gameCanvas.height * 0.105,
    gameElements.ceilingWidth,
    gameElements.ceilingHeight
  );
}

function drawWalls() {
  doc.fillStyle = "#373737";
  doc.fillRect(
    gameCanvas.width * 0.05,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight - 130
  );

  doc.fillRect(
    gameCanvas.width * 0.95,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight
  );
}

function drawFloors() {

  // Starting with floor 0 =>
  doc.fillStyle = "#373737";
  gameElements.floorWidth += 500;
  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 1.0 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  doc.fillStyle = "#171717";
  gameElements.floorWidth -= 500;

  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.875 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.75 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.625 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.5 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.375 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  doc.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.25 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );
}

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
  doc.font = font;

  // Textausrichtung festlegen
  doc.textAlign = "center";
  doc.textBaseline = "middle";

  // Textschatten konfigurieren
  doc.shadowColor = shadowColor;
  doc.shadowBlur = shadowBlur;
  doc.shadowOffsetX = shadowOffsetX;
  doc.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  doc.fillStyle = color;

  // Text Style
  doc.strokeStyle = strokeColor; // Randfarbe
  doc.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    doc.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    doc.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  doc.shadowColor = "rgba(0,0,0,0)";
  doc.shadowBlur = 0;
  doc.shadowOffsetX = 0;
  doc.shadowOffsetY = 0;
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
