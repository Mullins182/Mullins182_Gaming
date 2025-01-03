console.log("Skript geladen !!");

/*
**************************************************************************************
VARIABLEN INITIALISIEREN !
**************************************************************************************
*/
let canvas, game;
canvas = document.getElementById("flappyCanvas");

const homeButton = document.createElement("button");
const FRAME_INTERVAL = 15; // 115ms zwischen Frames
const birdStartscreen = new Image();
const birdFrame1 = new Image();
const birdFrame2 = new Image();
const frameSwitchInterval = 75; // Time (in ms) between bird frames
const pipesTextureGround = new Image();
const pipesTextureCeiling = new Image();
const grilledChicken = new Image();
const gravestone = new Image();
const gameOverImage = new Image();
const pipesGapX = 995; // Horizontaler Abstand zwischen Pipe-Paaren
const pipeHeight = 1500;
const pipeWidth = 150;

let pipesMinGapY = 130; // Minimaler Abstand zwischen oberer und unterer Pipe
let pipesMaxGapY = 200; // Maximaler Abstand zwischen oberer und unterer Pipe
let snd_pipeCollision, snd_bonesBreaking, snd_wingFlapNorm, snd_collectPoint;
let soundsInitialized = false;
let activeFrame = 1;
let rotationAngle = 0; // Rotationswinkel für 'Death Animation Image'
let lastTime = 0;
let pointsCollected = 0;
let showPointsCounter = 50;
let deathAnimPosXcurve = 2.0;
let deathAnimPosYcurve = 0.15;
let leaveStartscreen = false;
let birdUp = false;
let useDeathAnim = getRandomInt(1, 2);
let showPoints = false;
let isDeathAnimRunning = false;
let isGameOverSoundsPlayed = false;
let gameOver = false;
let pipes = [];
let birdPosX = canvas.width / 3;
let birdPosY = canvas.height / 2;
let pipeX = canvas.width;
let pipeY = canvas.height + 400;
let birdFrameInterval = 0;
let lastFrameTime = 0;
let pipeDrawInterval = 0;

/*
**************************************************************************************
START !
**************************************************************************************
*/
window.onload = function () {
  console.log("Window loaded");
  initGame();
};

/*
**************************************************************************************
EVENT-LISTENER !
**************************************************************************************
*/

// Bei Größenänderung des Fensters aufrufen
window.addEventListener("resize", resizeCanvas);

// Tastatur-Event-Listener
document.addEventListener("keydown", function (event) {
  console.log("Taste gedrückt: " + event.key);

  if (
    event.key === " " ||
    event.key === "Control" ||
    event.key === "w" ||
    event.key === "ArrowUp"
  ) {
    birdPosY -= 42;
  }
});

// Mausklick-Event-Listener
// document.addEventListener("mousedown", function (event) {
//   // button 0 => l.mouseBtn, 1 => middle.mouseBtn, 2 => right.mouseBtn
//   if (event.button === 0) {
//     console.log("Linke Maustaste gedrückt");
//     birdPosY -= 35;
//   }
// });

/*
**************************************************************************************
GAME INIT !
**************************************************************************************
*/
async function initGame() {
  console.log("initGame aufgerufen");
  game = canvas.getContext("2d");
  console.log("Canvas gefunden:", canvas);

  game.clearRect(0, 0, canvas.width, canvas.height);

  birdStartscreen.onload = function () {
    game.drawImage(
      birdStartscreen,
      canvas.width / 3,
      canvas.height * 0.6,
      160,
      110
    );
  };
  birdStartscreen.src = "assets/images/bird1.png";

  game.imageSmoothingEnabled = true;

  await resizeCanvas();
  createHomeButton();
  createStartButton();

  createLabel(
    canvas.width / 2,
    canvas.height * 0.42,
    "FLAPPY BIRD",
    "bold 200px Comic Sans MS",
    "black",
    "black",
    3,
    3,
    17,
    "strokeText",
    "goldenrod",
    5
  );

  createLabel(
    canvas.width / 2,
    canvas.height * 0.14,
    "| PRESS [SPACE], [STRG], [W] Or [Arrow Up] Several Times (Or Hold Key) To Let Flappy Bird Fly ! |",
    "bold 32px Arial",
    "goldenrod",
    "black",
    2,
    3,
    3,
    "fillText"
  );
}

/*
**************************************************************************************
IMAGES INIT !
**************************************************************************************
*/
function loadImages() {
  birdFrame1.src = "assets/images/bird1.png";
  birdFrame2.src = "assets/images/bird2.png";
  pipesTextureGround.src = "assets/images/pipe.png";
  pipesTextureCeiling.src = "assets/images/pipe_turned.png";
  grilledChicken.src = "assets/images/grilledChicken.png";
  gravestone.src = "assets/images/gravestone.png";
  gameOverImage.src = "assets/images/gameOver.png";

  // Initialisiere Pipes
  for (let i = 0; i < 4; i++) {
    let x = canvas.width + i * pipesGapX;
    let y = getRandomPipeHeight();
    let Ygap = getRandomInt(pipesMinGapY, pipesMaxGapY);
    pipes.push({ x: x, y: y, type: "ceiling" });
    pipes.push({ x: x, y: y + pipeHeight + Ygap, type: "ground" });
  }

  Promise.all([
    new Promise((resolve) => (birdFrame1.onload = resolve)),
    new Promise((resolve) => (birdFrame2.onload = resolve)),
    new Promise((resolve) => (pipesTextureGround.onload = resolve)),
    new Promise((resolve) => (pipesTextureCeiling.onload = resolve)),
    new Promise((resolve) => (grilledChicken.onload = resolve)),
    new Promise((resolve) => (gravestone.onload = resolve)),
    new Promise((resolve) => (gameOverImage.onload = resolve)),
  ]).then(() => {
    console.log("Alle Bilder geladen");
    requestAnimationFrame(gameLoop);
  });
}

/*
**************************************************************************************
SOUND INIT !
**************************************************************************************
*/
function initSounds() {
  return new Promise((resolve) => {
    snd_pipeCollision = new Audio();
    snd_bonesBreaking = new Audio();
    snd_wingFlapNorm = new Audio();
    snd_collectPoint = new Audio();

    snd_pipeCollision.preload = "auto";
    snd_bonesBreaking.preload = "auto";
    snd_wingFlapNorm.preload = "auto";
    snd_collectPoint.preload = "auto";

    snd_pipeCollision.src = "assets/sounds/pipeCollision.mp3";
    snd_bonesBreaking.src = "assets/sounds/boneBreak.mp3";
    snd_wingFlapNorm.src = "assets/sounds/wingflap_fast_long.mp3";
    snd_collectPoint.src = "assets/sounds/pointCollect.mp3";

    Promise.all([
      new Promise((res) =>
        snd_pipeCollision.addEventListener("canplaythrough", res, {
          once: true,
        })
      ),
      new Promise((res) =>
        snd_bonesBreaking.addEventListener("canplaythrough", res, {
          once: true,
        })
      ),
      new Promise((res) =>
        snd_wingFlapNorm.addEventListener("canplaythrough", res, {
          once: true,
        })
      ),
      new Promise((res) =>
        snd_collectPoint.addEventListener("canplaythrough", res, {
          once: true,
        })
      ),
    ])
      .then(() => {
        soundsInitialized = true;
        resolve();
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Sounds:", error);
        resolve();
      });
  });
}

/*
**************************************************************************************
SOUND FUNCTIONS !
**************************************************************************************
*/

function playGameOverSounds() {
  if (soundsInitialized) {
    snd_pipeCollision
      .play()
      .catch((e) =>
        console.error("Fehler beim Abspielen von pipeCollision:", e)
      );
    // snd_bonesBreaking
    //   .play()
    //   .catch((e) =>
    //     console.error("Fehler beim Abspielen von bonesBreaking:", e)
    //   );
  }
}

function playWingFlapSound(playbackRate) {
  if (soundsInitialized) {
    if (snd_wingFlapNorm.isPlaying) {
    } else {
      snd_wingFlapNorm.playbackRate = playbackRate; // Setze die Abspielgeschwindigkeit
      snd_wingFlapNorm.volume = 1.0;
      snd_wingFlapNorm
        .play()
        .catch((e) =>
          console.error("Fehler beim Abspielen von wingFlap-Sound:", e)
        );
    }
  }
}

function playCollectSound() {
  snd_collectPoint
    .play()
    .catch((e) =>
      console.error("Fehler beim Abspielen von pointCollect.mp3:", e)
    );
}

function stopWingflapPlayback() {
  snd_wingFlapNorm.pause();
  snd_wingFlapNorm.currentTime = 0;
}
/*
**************************************************************************************
POSITIONS UPDATE FUNCTION !
**************************************************************************************
*/

function updatePositions() {
  if (isDeathAnimRunning) {
    birdUp = birdPosY > canvas.height - 50 ? true : birdUp;

    birdPosX -= deathAnimPosXcurve;
    birdPosY = birdUp ? (birdPosY -= 2.45) : (birdPosY += deathAnimPosYcurve);
    deathAnimPosXcurve =
      deathAnimPosXcurve > 0
        ? (deathAnimPosXcurve -= 0.0055)
        : deathAnimPosXcurve;
    deathAnimPosYcurve =
      deathAnimPosYcurve < 2.55
        ? (deathAnimPosYcurve += 0.02)
        : deathAnimPosYcurve;
    rotationAngle += 0.01; // Erhöhe den Rotationswinkel
    console.log("Bird PosY: " + birdPosY);
  } else {
    // PIPE Positionen aktualisieren
    for (let i = 0; i < pipes.length; i += 2) {
      pipes[i].x -= 2.75;
      pipes[i + 1].x -= 2.75;

      if (pipes[i].x <= -pipeWidth) {
        let maxX = Math.max(...pipes.map((p) => p.x));
        let newY = getRandomPipeHeight();
        // let newYgap = getRandomInt(145, 230);
        let newYgap = getRandomInt(pipesMinGapY, pipesMaxGapY); // Pipes Y-Gap Random Value
        pipes[i].x = maxX + pipesGapX;
        pipes[i].y = newY;
        pipes[i + 1].x = maxX + pipesGapX;
        pipes[i + 1].y = newY + pipeHeight + newYgap;
      }
    }

    // BIRD Fallgeschwindigkeit
    birdPosY += 2.0;
  }
}

/*
**************************************************************************************
COLLISION CHECK FUNCTIONS !
**************************************************************************************
*/

function checkCollision(bird) {
  if (birdPosY > canvas.height - bird.height * 1.5 || birdPosY < -20) {
    gameOver = true;
    isDeathAnimRunning = true;
  }

  // Kollisionsprüfung mit Pipes
  pipes.forEach((pipe) => {
    if (
      birdPosX < pipe.x - 30 + pipeWidth &&
      birdPosX + (bird.width - 30) > pipe.x &&
      birdPosY < pipe.y - 20 + pipeHeight &&
      birdPosY + (bird.height - 20) > pipe.y
    ) {
      gameOver = true;
      isDeathAnimRunning = true;

      if (!isGameOverSoundsPlayed) {
        playGameOverSounds();
      }
      isGameOverSoundsPlayed = true;
    }
  });
}

function checkPointCollection() {
  pipes.forEach((pipe) => {
    if (birdPosX > pipe.x + pipeWidth && birdPosX < pipe.x + pipeWidth + 20) {
      if (showPointsCounter == 50) {
        showPointsCounter--;
        pointsCollected++;
        showPoints = true;
        snd_collectPoint.play();
      }
    }
  });
}

/*
**************************************************************************************
GAME RESET FUNCTION !
**************************************************************************************
*/
function resetGame() {
  birdPosX = canvas.width / 3;
  birdPosY = canvas.height / 2;
  pointsCollected = 0;
  isDeathAnimRunning = false;
  isGameOverSoundsPlayed = false;
  deathAnimPosXcurve = 2.0;
  deathAnimPosYcurve = 0.15;
  useDeathAnim = getRandomInt(1, 2);
  birdUp = false;
  gameOver = false;
  pipes = [];

  game.globalAlpha = 1.0;

  document.body.removeChild(homeButton);

  // Initialisiere Pipes erneut
  for (let i = 0; i < 4; i++) {
    let x = canvas.width + i * pipesGapX;
    let y = getRandomPipeHeight();
    let Ygap = getRandomInt(pipesMinGapY, pipesMaxGapY);
    pipes.push({ x: x, y: y, type: "ceiling" });
    pipes.push({ x: x, y: y + pipeHeight + Ygap, type: "ground" });
  }

  requestAnimationFrame(gameLoop); // Game Neustart
}

/*
**************************************************************************************
GAME LOOP !
**************************************************************************************
*/

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  // Bird animation frame switching
  birdFrameInterval += deltaTime;
  if (birdFrameInterval >= frameSwitchInterval) {
    activeFrame = activeFrame === 1 ? 2 : 1;
    birdFrameInterval = 0; // Reset interval after switching frames
  }

  drawOnCanvasOps(timestamp);

  if (gameOver == true) {
    stopWingflapPlayback();

    if (isDeathAnimRunning) {
      drawOnCanvasOps(timestamp);
      requestAnimationFrame(gameLoop);
    } else {
      if (!isGameOverSoundsPlayed) {
        if (soundsInitialized) {
          try {
            playGameOverSounds();
          } catch (error) {
            console.error("Fehler beim Abspielen der Sounds:", error);
          }
        }
      }

      game.globalAlpha = 0.45;
      game.fillStyle = "red";
      game.fillRect(0, 0, window.innerWidth, window.innerHeight);

      game.drawImage(
        gameOverImage,
        canvas.width / 2 - gameOverImage.width / 2,
        canvas.height / 2 - gameOverImage.height / 2
      );

      createHomeButton();
      createRestartButton();
    }
  } else {
    playWingFlapSound(1.0);

    if (showPoints) {
      drawPoints();
    }
    if (showPointsCounter == 0) {
      showPointsCounter = 50;
      showPoints = false;
    }
    requestAnimationFrame(gameLoop);
  }
  drawPointsInfo();
}

/*
**************************************************************************************
CANVAS RESIZE FUNCTION !
**************************************************************************************
*/
function resizeCanvas() {
  // Asynchrone Operationen hier
  return new Promise((resolve) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resolve();
  });
}

/*
**************************************************************************************
RANDOM FUNCTIONS !
**************************************************************************************
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPipeHeight() {
  return -getRandomInt(pipeHeight - 600, pipeHeight - 50);
}

/*
**************************************************************************************
DRAW ON CANVAS FUNCTIONS !
**************************************************************************************
*/
function drawOnCanvasOps(timestamp) {
  birdFrameInterval += 1;

  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (gameOver && elapsed > FRAME_INTERVAL) {
    deathAnimation();
  } else if (elapsed > FRAME_INTERVAL) {
    // console.log("Canvas breite: ", canvas.width);
    // console.log("Canvas höhe: ", canvas.height);

    birdAnimation(timestamp);
  }
}

function birdAnimation(timestamp) {
  game.clearRect(0, 0, canvas.width, canvas.height);

  // DRAW PIPES
  drawPipes();

  // POSITIONS UPDATE
  updatePositions();

  console.log("birdFrameInterval = ", birdFrameInterval);

  // DRAW BIRD
  if (birdFrameInterval > 5) {
    const bird = activeFrame === 1 ? birdFrame1 : birdFrame2;

    game.drawImage(bird, birdPosX, birdPosY, bird.width, bird.height);

    checkCollision(bird);
    checkPointCollection();
  } else {
    const bird = activeFrame === 1 ? birdFrame1 : birdFrame2;

    game.drawImage(bird, birdPosX, birdPosY, bird.width, bird.height);
    checkCollision(bird);
    checkPointCollection();
  }
  console.log("Bild gezeichnet:", activeFrame);
  lastTime = timestamp;
}

function deathAnimation() {
  // console.log("Death animation running !");

  const bird =
    useDeathAnim === 1
      ? grilledChicken
      : useDeathAnim === 2
      ? gravestone
      : birdFrame2;

  game.clearRect(0, 0, canvas.width, canvas.height);

  // DRAW PIPES
  drawPipes();

  // Speichern des aktuellen Kontexts
  game.save();

  // Verschieben des Koordinatensystems zum Mittelpunkt des Bildes
  game.translate(birdPosX + bird.width * 0.325, birdPosY + bird.height * 0.325);

  // Rotieren des Kontexts
  game.rotate(rotationAngle);

  // Zeichnen des rotierten Bildes
  game.drawImage(
    bird,
    -bird.width * 0.325,
    -bird.height * 0.325,
    bird.width * 0.65,
    bird.height * 0.65
  );

  // Wiederherstellen des ursprünglichen Kontexts
  game.restore();

  // game.drawImage(bird, birdPosX, birdPosY, bird.width * 0.65, bird.height * 0.65);
  updatePositions();

  if (birdPosY > canvas.height || birdPosY < 0 - bird.height) {
    isDeathAnimRunning = false;
  }
}

function drawPipes() {
  pipes.forEach((pipe) => {
    if (pipe.type === "ceiling") {
      game.drawImage(
        pipesTextureCeiling,
        pipe.x,
        pipe.y,
        pipeWidth,
        pipeHeight
      );
    } else {
      game.drawImage(pipesTextureGround, pipe.x, pipe.y, pipeWidth, pipeHeight);
    }
  });
}

/*
**************************************************************************************
CREATE LABEL FUNCTION !
**************************************************************************************
*/

function drawPointsInfo() {
  createLabel(
    200,
    canvas.height * 0.05,
    "Your Points: " + pointsCollected,
    "50px Arial",
    "yellow",
    "black",
    5,
    5,
    5,
    "strokeText"
  );
}

function drawPoints() {
  createLabel(
    canvas.width / 2,
    canvas.height * 0.25,
    pointsCollected,
    "200px Arial Black",
    "darkgoldenrod",
    "black",
    5,
    8,
    8,
    "fillText"
  );
  showPointsCounter--;
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
  game.font = font;

  // Textausrichtung festlegen
  game.textAlign = "center";
  game.textBaseline = "middle";

  // Textschatten konfigurieren
  game.shadowColor = shadowColor;
  game.shadowBlur = shadowBlur;
  game.shadowOffsetX = shadowOffsetX;
  game.shadowOffsetY = shadowOffsetY;

  // Textfarbe festlegen
  game.fillStyle = color;

  // Text Style
  game.strokeStyle = strokeColor; // Randfarbe
  game.lineWidth = strokeLineWidth; // Linienbreite

  // Text zeichnen
  if (textStyle == "fillText") {
    game.fillText(text, xPos, yPos);
  } else if (textStyle == "strokeText") {
    game.strokeText(text, xPos, yPos);
  }

  // Schatten zurücksetzen (optional, aber empfohlen)
  game.shadowColor = "rgba(0,0,0,0)";
  game.shadowBlur = 0;
  game.shadowOffsetX = 0;
  game.shadowOffsetY = 0;
}

/*
**************************************************************************************
CREATE BUTTONS FUNCTIONS !
**************************************************************************************
*/
function createHomeButton() {
  homeButton.textContent = "Home";
  homeButton.style.position = "absolute";
  homeButton.style.top = "5%";
  homeButton.style.left = "50%";
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

function createStartButton() {
  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.style.position = "absolute";
  startButton.style.top = "23%";
  startButton.style.left = "50%";
  startButton.style.transform = "translate(-50%, -50%)";

  // Breite und Höhe anpassen
  startButton.style.width = "200px";
  startButton.style.height = "50px";

  // Hintergrund- und Textfarbe ändern
  startButton.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
  startButton.style.color = "darkgoldenrod";

  // Schriftgröße und Schriftart anpassen
  startButton.style.fontSize = "33px";
  startButton.style.fontFamily = "Times New Roman, Arial";

  // Border Radius
  startButton.style.borderRadius = "10px";

  // Border / Cursor
  startButton.style.border = "2px solid goldenrod";
  startButton.style.cursor = "pointer";

  // Box-Shadow hinzufügen
  startButton.style.boxShadow = "0 0 55px red";

  // Übergänge für Hover-Effekt
  startButton.style.transition =
    "background-color 0.5s, color 0.5s, border 1.0s, box-shadow 0.5s";

  // Hover-Effekt hinzufügen
  startButton.addEventListener("mouseover", function () {
    this.style.backgroundColor = "rgba(200, 200, 0, 1.0)";
    this.style.color = "#000000";
    this.style.border = "2px solid black";
    this.style.boxShadow = "0 0 55px greenyellow";
  });

  startButton.addEventListener("mouseout", function () {
    this.style.backgroundColor = "#111111";
    this.style.color = "darkgoldenrod";
    this.style.border = "2px solid goldenrod";
    this.style.boxShadow = "0 0 55px red";
  });

  // Event-Listener für Klick-Ereignis
  startButton.addEventListener("click", function () {
    document.body.removeChild(this);
    document.body.removeChild(homeButton);
    initSounds().then(() => {
      loadImages();
      snd_wingFlapNorm.play();
    });
  });

  document.body.appendChild(startButton);
}

function createRestartButton() {
  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart Game";
  restartButton.style.position = "absolute";
  restartButton.style.top = "20%";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translate(-50%, -50%)";

  // Breite und Höhe anpassen
  restartButton.style.width = "200px";
  restartButton.style.height = "50px";

  // Hintergrund- und Textfarbe ändern
  restartButton.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
  restartButton.style.color = "darkgoldenrod";

  // Schriftgröße und Schriftart anpassen
  restartButton.style.fontSize = "33px";
  restartButton.style.fontFamily = "Times New Roman, Arial";

  // Border Radius
  restartButton.style.borderRadius = "10px";

  // Border / Cursor
  restartButton.style.border = "2px solid goldenrod";
  restartButton.style.cursor = "pointer";

  // Box-Shadow hinzufügen
  restartButton.style.boxShadow = "0 0 55px red";

  // Übergänge für Hover-Effekt
  restartButton.style.transition =
    "background-color 0.5s, color 0.5s, border 1.0s, box-shadow 0.5s";

  // Hover-Effekt hinzufügen
  restartButton.addEventListener("mouseover", function () {
    this.style.backgroundColor = "rgba(200, 200, 0, 1.0)";
    this.style.color = "#000000";
    this.style.border = "2px solid black";
    this.style.boxShadow = "0 0 55px greenyellow";
  });

  restartButton.addEventListener("mouseout", function () {
    this.style.backgroundColor = "rgba(55, 0, 0, 1.0)";
    this.style.color = "darkgoldenrod";
    this.style.border = "2px solid goldenrod";
    this.style.boxShadow = "0 0 55px red";
  });

  // Event-Listener für Klick-Ereignis
  restartButton.addEventListener("click", function () {
    resetGame(); // Ihre Funktion zum Neustarten des Spiels
    document.body.removeChild(this); // Button entfernen nach Klick
  });

  document.body.appendChild(restartButton);
}
