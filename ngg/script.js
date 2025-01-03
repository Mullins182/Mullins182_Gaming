let randomNumber = Math.round(Math.random() * 1000);
let lastGuessedNbr = 0;
let tries = 0;

GuessingField.focus();

function GuessTheNumber() {
  tries += 1;
  lastGuessedNbr = GuessingField.value;
  displayTries.innerHTML = "Tries: " + tries;

  InfoText.innerHTML =
    GuessingField.value > randomNumber
      ? "The Number is Smaller !"
      : GuessingField.value < randomNumber
      ? "The Number is Greater !"
      : GuessingField.value == randomNumber
      ? "You Guessed Right !!!😊"
      : InfoText.innerHTML;
  Guessed.innerHTML = "Guessed Number: " + lastGuessedNbr;
  tries = GuessingField.value == randomNumber ? 0 : tries;

  if (GuessingField.value == randomNumber) {
    // do this for 30 seconds
    var duration = 1 * 1000;
    var end = Date.now() + duration;

    randomNumber = Math.round(Math.random() * 1000);

    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        startVelocity: 80,
        particleCount: 5,
        angle: 65,
        spread: 50,
        origin: { x: 0, y: 1 },
      });
      // and launch a few from the right edge
      confetti({
        startVelocity: 80,
        particleCount: 5,
        angle: 115,
        spread: 50,
        origin: { x: 1, y: 1 },
      });

      // keep going until we are out of time
      // if (Date.now() < end) {
      // requestAnimationFrame(frame);
      // }
      if (InfoText.innerHTML == "You Guessed Right !!!😊") {
        requestAnimationFrame(frame);
      }
    })();
  }

  GuessingField.value = null;
}
