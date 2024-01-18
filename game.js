var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var randomColor;
var level = 0;

$(".btn").on("click", function () {
  var userColor;
  userColor = $(this).attr("id");
  animatePress(userColor);
  playSound(userColor);
  userPattern.push(userColor);
  checkSequence(userPattern.length - 1);
  console.log(userPattern);
});

$(document).on("keydown", function () {
  if (level === 0) {
    nextSequence();
  }
});

function nextSequence() {
  var randomNumber;
  randomNumber = Math.floor(Math.random() * 4);
  randomColor = buttonColors[randomNumber];
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
  gamePattern.push(randomColor);
  level++;
  $("h1").text("Level " + level);
  console.log(gamePattern);
}

function playSound(soundName) {
  var sound = new Audio("./sounds/" + soundName + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function animateGameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function checkSequence(index) {
  if (userPattern[index] === gamePattern[index]) {
    console.log("right");
    if (userPattern.length === level) {
      userPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 200);
    }
  } else {
    resetGame();
    playSound("wrong");
    console.log("wrong");
  }
}

function resetGame() {
  level = 0;
  gamePattern = [];
  userPattern = [];
  animateGameOver();
  $("h1").text("Game Over, Press Any Key to Restart ");
}
