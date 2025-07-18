<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ELEVATORS FROM HELL</title>
  <link rel="stylesheet" href="css/style.css" />
</head>

<body>
  <?php include 'logger_efh.php'; ?>

  <div id="gameWrapper">
    <canvas id="mainCanvas"></canvas>
    <canvas id="creditsCanvas"></canvas>
    <button id="startButton"></button>
    <button id="optionsButton"></button>
    <button id="returnButton"></button>
    <button id="creditsButton"></button>
  </div>
  <script src="./js/howler.min.js"></script>
  <script src="./js/credits.mjs" type="module"></script>
  <script src="./js/hell10.mjs" type="module"></script>
</body>

</html>