console.log("Hell10 has Started !");

const gameCanvas = document.getElementById("mainCanvas");
const ctx = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

let gameElements = {
  floorWidth: gameCanvas.width * 0.9,
  floorHeight: 6,
  WallsHeight: gameCanvas.height * 0.89,
  wallsWidth: 15,
  ceilingWidth: gameCanvas.width * 0.95,
  ceilingHeight: 15,
  liftDoorsHeight: 90,
  liftDoorFloor0Left_Width: 30,
  liftDoorFloor0Right_Width: 10,
  liftDoorFloor1Left_Width: 37,
  liftDoorFloor1Right_Width: 37,
  liftDoorFloor2Left_Width: 37,
  liftDoorFloor2Right_Width: 37,
  liftDoorFloor3Left_Width: 37,
  liftDoorFloor3Right_Width: 37,
  liftDoorFloor4Left_Width: 37,
  liftDoorFloor4Right_Width: 37,
  liftDoorFloor5Left_Width: 37,
  liftDoorFloor5Right_Width: 37,
  liftDoorFloor6Left_Width: 37,
  liftDoorFloor6Right_Width: 37,
  liftWidth: 75,
  liftHeight: 88,
};

let gameElementsPos = {

  liftRightPos: gameCanvas.height * 1.0 - gameElements.liftHeight - gameElements.floorHeight,
  liftRightIsOnFloor0: true,
  liftRightIsOnFloor1: false,
  liftRightIsOnFloor2: false,
  liftRightIsOnFloor3: false,
  liftRightIsOnFloor4: false,
  liftRightIsOnFloor5: false,
  liftRightIsOnFloor6: false
}

let shaftDoorsStatus = {

  floor0RightDoorClosing: false,
  floor0RightDoorIsClosed: false,
  floor1RightDoorClosing: false,
  floor1RightDoorIsClosed: true,
  floor2RightDoorIsClosed: true
}

let liftRightSetFloor1 = false;
let liftRightSetFloor0 = false;

// ___________________________ GAME-LABEL ___________________________
createLabel(
  gameCanvas.width / 2,
  gameCanvas.height * 0.07,
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

// ___________________________ Tastatur-Event-Listener ___________________________
document.addEventListener("keydown", function (event) {
  console.log("Taste gedrückt: " + event.key);

  if (
    event.key === "0") {
    liftRightSetFloor0 =  true;
  }
  if (
    event.key === "1") {
    liftRightSetFloor1 = true;
  }
});


initGame();

// ___________________________ GAME INI ___________________________
function initGame() {

  gameRoutine();
}

// ___________________________ GAME-ROUTINE ___________________________
async function gameRoutine() {

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  createLabel(
  gameCanvas.width / 2,
  gameCanvas.height * 0.07,
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


  console.log('Drawing Elements !');

  liftsPosUpdate();
  shaftDoorsStatusCheck();

  drawFloors();
  drawWalls();
  drawCeiling();
  drawLifts();
  drawLiftDoors();
  
  await new Promise(resolve => setTimeout(resolve, 30));

  requestAnimationFrame(gameRoutine);
}

function shaftDoorsStatusCheck() {


  if (liftRightSetFloor1 && gameElementsPos.liftRightIsOnFloor0) {
    shaftDoorsStatus.floor0RightDoorIsClosed = gameElements.liftDoorFloor0Right_Width > 36 ? true : false;
    shaftDoorsStatus.floor0RightDoorClosing = shaftDoorsStatus.floor0RightDoorIsClosed ? false : true;
    gameElements.liftDoorFloor0Right_Width = shaftDoorsStatus.floor0RightDoorClosing ? gameElements.liftDoorFloor0Right_Width += 0.5 : gameElements.liftDoorFloor0Right_Width;
  }

  if (gameElementsPos.liftRightIsOnFloor0 && !liftRightSetFloor1) {

    if (gameElements.liftDoorFloor0Right_Width > 10) {
      gameElements.liftDoorFloor0Right_Width -= 0.5;
    }
    else {
      shaftDoorsStatus.floor0RightDoorIsClosed = false;
    }
  }

  if (gameElementsPos.liftRightIsOnFloor1) {

    if (gameElements.liftDoorFloor1Right_Width > 10) {
      gameElements.liftDoorFloor1Right_Width -= 0.5;
    }
    else {
      shaftDoorsStatus.floor1RightDoorIsClosed = false;
    }
  }
}

function liftsPosUpdate() {

  if (gameElementsPos.liftRightPos <= gameCanvas.height * 1.0 - (gameElements.liftHeight * 2 + 37) - gameElements.floorHeight) {
    gameElementsPos.liftRightIsOnFloor1 = true;
  }

  if (liftRightSetFloor1 && !shaftDoorsStatus.floor0RightDoorClosing) {
    
    liftRightSetFloor1 = 
    gameElementsPos.liftRightPos <= gameCanvas.height * 1.0 - (gameElements.liftHeight * 2 + 37) - gameElements.floorHeight ? false : true;

    gameElementsPos.liftRightPos = liftRightSetFloor1 && shaftDoorsStatus.floor0RightDoorIsClosed ? gameElementsPos.liftRightPos -= 1.3 : gameElementsPos.liftRightPos;
  }

  if (liftRightSetFloor0) {
    
    liftRightSetFloor0 = 
    gameElementsPos.liftRightPos >= gameCanvas.height * 1.0 - gameElements.liftHeight - gameElements.floorHeight ? false : true;

    gameElementsPos.liftRightPos = liftRightSetFloor0 ? gameElementsPos.liftRightPos += 1.3 : gameElementsPos.liftRightPos;
  }
}

function drawLifts() {
  ctx.fillStyle = "#BFBF00";
  ctx.fillRect(
    gameCanvas.width * 0.2 - gameElements.liftWidth / 2,
    gameCanvas.height * 1.0 - gameElements.liftHeight - gameElements.floorHeight,
    gameElements.liftWidth,
    gameElements.liftHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftWidth / 2,
    gameElementsPos.liftRightPos,
    gameElements.liftWidth,
    gameElements.liftHeight
  );
}

function drawLiftDoors() {
  ctx.fillStyle = "#3F0000";

  // Floor 0 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 1.0 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor0Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor0Left_Width,
    gameCanvas.height * 1.0 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor0Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 0 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 1.0 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor0Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor0Right_Width,
    gameCanvas.height * 1.0 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor0Right_Width,
    gameElements.liftDoorsHeight
  );


  // Floor 1 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.875 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor1Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor1Left_Width,
    gameCanvas.height * 0.875 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor1Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 1 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.875 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor1Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor1Right_Width,
    gameCanvas.height * 0.875 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor1Right_Width,
    gameElements.liftDoorsHeight
  );
  
  // Floor 2 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.75 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor2Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor2Left_Width,
    gameCanvas.height * 0.75 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor2Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 2 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.75 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor2Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor2Right_Width,
    gameCanvas.height * 0.75 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor2Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 3 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.625 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor3Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor3Left_Width,
    gameCanvas.height * 0.625 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor3Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 3 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.625 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor3Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor3Right_Width,
    gameCanvas.height * 0.625 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor3Right_Width,
    gameElements.liftDoorsHeight
  );
  
  // Floor 4 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.5 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor4Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor4Left_Width,
    gameCanvas.height * 0.5 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor4Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 4 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.5 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor4Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor4Right_Width,
    gameCanvas.height * 0.5 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor4Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 5 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.375 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor5Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor5Left_Width,
    gameCanvas.height * 0.375 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor5Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 5 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.375 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor5Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor5Right_Width,
    gameCanvas.height * 0.375 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor5Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 6 | left
  ctx.fillRect(
    gameCanvas.width * 0.2 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.25 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor6Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.2 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor6Left_Width,
    gameCanvas.height * 0.25 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor6Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 6 | right
  ctx.fillRect(
    gameCanvas.width * 0.8 - (gameElements.liftWidth / 2),
    gameCanvas.height * 0.25 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor6Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 + (gameElements.liftWidth / 2) - gameElements.liftDoorFloor6Right_Width,
    gameCanvas.height * 0.25 - gameElements.liftDoorsHeight - gameElements.floorHeight,
    gameElements.liftDoorFloor6Right_Width,
    gameElements.liftDoorsHeight
  );
}

function drawCeiling() {
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.505 - gameElements.ceilingWidth / 2,
    gameCanvas.height * 0.105,
    gameElements.ceilingWidth,
    gameElements.ceilingHeight
  );
}

function drawWalls() {
  ctx.fillStyle = "#373737";
  ctx.fillRect(
    gameCanvas.width * 0.05,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight - 130
  );

  ctx.fillRect(
    gameCanvas.width * 0.95,
    gameCanvas.height * 0.12,
    gameElements.wallsWidth,
    gameElements.WallsHeight
  );
}

function drawFloors() {

  // Starting with floor 0 =>
  ctx.fillStyle = "#373737";
  gameElements.floorWidth += 500;
  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 1.0 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  ctx.fillStyle = "#171717";
  gameElements.floorWidth -= 500;

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.875 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.75 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.625 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.5 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.5 - gameElements.floorWidth / 2,
    gameCanvas.height * 0.375 - gameElements.floorHeight,
    gameElements.floorWidth,
    gameElements.floorHeight
  );

  ctx.fillRect(
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
  ctx.font = font;

  // Textausrichtung festlegen
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Textschatten konfigurieren
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  ctx.fillStyle = color;

  // Text Style
  ctx.strokeStyle = strokeColor; // Randfarbe
  ctx.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    ctx.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    ctx.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
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
