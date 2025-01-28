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
  liftDoorFloor0Left_Width: 39,
  liftDoorFloor0Right_Width: 10,
  liftDoorFloor1Left_Width: 39,
  liftDoorFloor1Right_Width: 39,
  liftDoorFloor2Left_Width: 39,
  liftDoorFloor2Right_Width: 39,
  liftDoorFloor3Left_Width: 39,
  liftDoorFloor3Right_Width: 39,
  liftDoorFloor4Left_Width: 39,
  liftDoorFloor4Right_Width: 39,
  liftDoorFloor5Left_Width: 39,
  liftDoorFloor5Right_Width: 39,
  liftDoorFloor6Left_Width: 39,
  liftDoorFloor6Right_Width: 39,
  liftWidth: 75,
  liftHeight: 88,
};

let movingElementsStatusAndPos = {
  liftR_YPos:
    gameCanvas.height * 1.0 -
    gameElements.liftHeight -
    gameElements.floorHeight,
  liftRightIsMoving: false,
  liftRightIsOnFloor0: true,
  liftRightSetFloor0: true,
  liftRightIsOnFloor1: false,
  liftRightSetFloor1: false,
  liftRightIsOnFloor2: false,
  liftRightIsOnFloor3: false,
  liftRightIsOnFloor4: false,
  liftRightIsOnFloor5: false,
  liftRightIsOnFloor6: false,
};

let shaftDoorsStatus = {
  floor0_RdoorOpen: true,
  floor0_RdoorClosed: false,
  floor1_RdoorOpen: false,
  floor1_RdoorClosed: false,
};

const floor0_YPos =
  gameCanvas.height * 1.0 -
  (gameElements.liftHeight + gameElements.floorHeight);

const floor1_YPos =
  gameCanvas.height * 0.875 -
  gameElements.floorHeight -
  gameElements.liftHeight;

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

  if (event.key === "0") {
    movingElementsStatusAndPos.liftRightSetFloor0 = !movingElementsStatusAndPos.liftRightIsMoving
      ? true
      : movingElementsStatusAndPos.liftRightSetFloor0;
    movingElementsStatusAndPos.liftRightSetFloor1 = !movingElementsStatusAndPos.liftRightIsMoving
      ? false
      : movingElementsStatusAndPos.liftRightSetFloor1;
  }
  if (event.key === "1") {
    movingElementsStatusAndPos.liftRightSetFloor0 = !movingElementsStatusAndPos.liftRightIsMoving
      ? false
      : movingElementsStatusAndPos.liftRightSetFloor0;
    movingElementsStatusAndPos.liftRightSetFloor1 = !movingElementsStatusAndPos.liftRightIsMoving
      ? true
      : movingElementsStatusAndPos.liftRightSetFloor1;
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

  liftsPosUpdate();
  shaftDoorsStatusCheck();

  drawFloors();
  drawWalls();
  drawCeiling();
  drawLifts();
  drawLiftDoors();

  await new Promise((resolve) => setTimeout(resolve, 30));

  requestAnimationFrame(gameRoutine);
}

// ___________________________ SHAFT-DOORS-LOGIC ___________________________
function shaftDoorsStatusCheck() {
  if (gameElements.liftDoorFloor0Right_Width > 38.5) {
    shaftDoorsStatus.floor0_RdoorClosed = true;
  } else {
    shaftDoorsStatus.floor0_RdoorClosed = false;
  }

  if (gameElements.liftDoorFloor0Right_Width < 10.5) {
    shaftDoorsStatus.floor0_RdoorOpen = true;
  } else {
    shaftDoorsStatus.floor0_RdoorOpen = false;
  }

  if (gameElements.liftDoorFloor1Right_Width > 38.5) {
    shaftDoorsStatus.floor1_RdoorClosed = true;
  } else {
    shaftDoorsStatus.floor1_RdoorClosed = false;
  }

  if (gameElements.liftDoorFloor1Right_Width < 10.5) {
    shaftDoorsStatus.floor1_RdoorOpen = true;
  } else {
    shaftDoorsStatus.floor1_RdoorOpen = false;
  }

  if (
    !movingElementsStatusAndPos.liftRightSetFloor0 &&
    !shaftDoorsStatus.floor0_RdoorClosed
  ) {
    gameElements.liftDoorFloor0Right_Width += 0.5;
  }

  if (
    !movingElementsStatusAndPos.liftRightSetFloor1 &&
    !shaftDoorsStatus.floor1_RdoorClosed
  ) {
    gameElements.liftDoorFloor1Right_Width += 0.5;
  }

  if (
    movingElementsStatusAndPos.liftRightSetFloor0 &&
    movingElementsStatusAndPos.liftRightIsOnFloor0 &&
    !shaftDoorsStatus.floor0_RdoorOpen
  ) {
    gameElements.liftDoorFloor0Right_Width -= 0.5;
  }

  if (
    movingElementsStatusAndPos.liftRightSetFloor1 &&
    movingElementsStatusAndPos.liftRightIsOnFloor1 &&
    !shaftDoorsStatus.floor1_RdoorOpen
  ) {
    gameElements.liftDoorFloor1Right_Width -= 0.5;
  }
}

// ___________________________ LIFTS-POS-UPDATES ___________________________
function liftsPosUpdate() {
  if (movingElementsStatusAndPos.liftR_YPos >= floor0_YPos) {
    movingElementsStatusAndPos.liftRightIsOnFloor0 = true;
    movingElementsStatusAndPos.liftRightIsOnFloor1 = false;
  }

  if (movingElementsStatusAndPos.liftR_YPos <= floor1_YPos) {
    movingElementsStatusAndPos.liftRightIsOnFloor0 = false;
    movingElementsStatusAndPos.liftRightIsOnFloor1 = true;
  }

  movingElementsStatusAndPos.liftRightIsMoving =
    shaftDoorsStatus.floor0_RdoorClosed && shaftDoorsStatus.floor1_RdoorClosed
      ? true
      : false;

  movingElementsStatusAndPos.liftR_YPos =
    movingElementsStatusAndPos.liftRightSetFloor1 &&
    shaftDoorsStatus.floor0_RdoorClosed &&
    !movingElementsStatusAndPos.liftRightIsOnFloor1
      ? (movingElementsStatusAndPos.liftR_YPos -= 1.3)
      : movingElementsStatusAndPos.liftRightSetFloor0 &&
        shaftDoorsStatus.floor1_RdoorClosed &&
        !movingElementsStatusAndPos.liftRightIsOnFloor0
      ? (movingElementsStatusAndPos.liftR_YPos += 1.3)
      : movingElementsStatusAndPos.liftR_YPos;
}

function drawLifts() {
  ctx.fillStyle = "#BFBF00";
  ctx.fillRect(
    gameCanvas.width * 0.2 - gameElements.liftWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.liftHeight -
      gameElements.floorHeight,
    gameElements.liftWidth,
    gameElements.liftHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.8 - gameElements.liftWidth / 2,
    movingElementsStatusAndPos.liftR_YPos,
    gameElements.liftWidth,
    gameElements.liftHeight
  );
}

function drawLiftDoors() {
  ctx.fillStyle = "#3F0000";

  // Floor 0 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor0Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor0Left_Width,
    gameCanvas.height * 1.0 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor0Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 0 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 1.0 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor0Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor0Right_Width,
    gameCanvas.height * 1.0 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor0Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 1 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.875 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor1Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor1Left_Width,
    gameCanvas.height * 0.875 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor1Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 1 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.875 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor1Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor1Right_Width,
    gameCanvas.height * 0.875 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor1Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 2 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.75 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor2Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor2Left_Width,
    gameCanvas.height * 0.75 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor2Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 2 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.75 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor2Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor2Right_Width,
    gameCanvas.height * 0.75 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor2Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 3 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.625 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor3Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor3Left_Width,
    gameCanvas.height * 0.625 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor3Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 3 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.625 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor3Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor3Right_Width,
    gameCanvas.height * 0.625 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor3Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 4 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.5 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor4Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor4Left_Width,
    gameCanvas.height * 0.5 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor4Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 4 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.5 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor4Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor4Right_Width,
    gameCanvas.height * 0.5 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor4Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 5 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.375 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor5Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor5Left_Width,
    gameCanvas.height * 0.375 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor5Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 5 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.375 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor5Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor5Right_Width,
    gameCanvas.height * 0.375 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor5Right_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 6 | left
  ctx.fillRect(
    gameCanvas.width * 0.199 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.25 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor6Left_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.201 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor6Left_Width,
    gameCanvas.height * 0.25 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor6Left_Width,
    gameElements.liftDoorsHeight
  );

  // Floor 6 | right
  ctx.fillRect(
    gameCanvas.width * 0.799 - gameElements.liftWidth / 2,
    gameCanvas.height * 0.25 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
    gameElements.liftDoorFloor6Right_Width,
    gameElements.liftDoorsHeight
  );

  ctx.fillRect(
    gameCanvas.width * 0.801 +
      gameElements.liftWidth / 2 -
      gameElements.liftDoorFloor6Right_Width,
    gameCanvas.height * 0.25 -
      gameElements.liftDoorsHeight -
      gameElements.floorHeight,
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
