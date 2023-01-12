// Start
var difficulty = 0;
var gamePattern = [];
var p = 0;
var isOver = false;
var isPaused = false;
var soundVolume = 0.5;
var isMuted = false;
var colors = ["red", "blue", "green", "yellow"];
var level = 0;
$("#restart").fadeToggle(0);

// Add to all buttons behaviour
$(".game-btn").click(function () {
  if (
    (this.id == "red" ||
      this.id == "blue" ||
      this.id == "green" ||
      this.id == "yellow") &&
    level > 0 &&
    !isOver
  ) {
    playPress(this.id);
    playSound(this.id);
    if (p == gamePattern.length - 1) {
      if (this.id == gamePattern[p]) {
        // Next level
        console.log("Level completed!");
        setTimeout(function () {
          p = 0;
          nextSequence();
        }, 1000);
      } else {
        // Wrong color
        console.log("Wrong!");
        gameOver();
      }
    } else {
      if (this.id == gamePattern[p]) {
        // Correct color
        console.log("Correct!");
        p += 1;
      } else {
        // Wrong Color
        console.log("Wrong!");
        gameOver();
      }
    }
  } else if (this.id == "start") {
    $("#start").fadeToggle(200);
    $("#restart").fadeToggle(200);
    $("#restart").addClass("disabled");
    resetColor();
    gameStart();
  } else if (this.id == "restart") {
    $("#restart").fadeToggle(200);
    playSound("wrong");
    isOver = true;
    $("body").addClass("game-over");
    $(".color-btn").removeClass("red");
    $(".color-btn").removeClass("blue");
    $(".color-btn").removeClass("green");
    $(".color-btn").removeClass("yellow");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $(".color-btn").addClass("pressed");
    }, 200);
    $("#level-title").text("Restarted!");
    setTimeout(function () {
      restartGame();
    }, 2000);
  } else if (this.id == "btnradio1") difficulty = 0;
  else if (this.id == "btnradio2") difficulty = 1;
  else if (this.id == "btnradio3") difficulty = 2;
  else if (this.id == "up") {
    if (soundVolume <= 0.5 && !isMuted) {
      if (soundVolume == 0.5)
        $("#mute").html('<i class="bi bi-volume-up-fill"></i>');
      else $("#mute").html('<i class="bi bi-volume-down-fill"></i>');
      soundVolume *= 2;
      console.log("sV=" + soundVolume);
    }
  } else if (this.id == "down") {
    if (soundVolume > 0.25 && !isMuted) {
      if (soundVolume == 1)
        $("#mute").html('<i class="bi bi-volume-down-fill"></i>');
      else $("#mute").html('<i class="bi bi-volume-off-fill"></i>');
      soundVolume /= 2;
      console.log("sV=" + soundVolume);
    }
  } else if (this.id == "muteButton") {
    if (!isMuted) {
      $("#mute").html('<i class="bi bi-volume-mute-fill"></i>');
      isMuted = true;
      console.log("MUTED");
    } else {
      if (soundVolume == 1)
        $("#mute").html('<i class="bi bi-volume-up-fill"></i>');
      if (soundVolume == 0.5)
        $("#mute").html('<i class="bi bi-volume-down-fill"></i>');
      if (soundVolume == 0.25)
        $("#mute").html('<i class="bi bi-volume-off-fill"></i>');
      isMuted = false;
      console.log("UN-MUTED");
    }
  }
});

// Perfrom next color sequence
function nextSequence() {
  if (!isOver) {
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Show all the colors depends on difficulty
    if (difficulty == 0) showPattern(0, 600);
    if (difficulty == 1) showPattern(0, 450);
    if (difficulty == 2) showPattern(gamePattern.length - 1, 450);
  }
}

// Play the color sound
function playSound(value) {
  // Default button sound
  if (
    value != "red" &&
    value != "blue" &&
    value != "green" &&
    value != "yellow" &&
    value != "wrong"
  )
    value = "blue";
  var audio = new Audio("sounds/" + value + ".mp3");
  audio.volume = soundVolume;
  audio.play();
}

// Play auto animation color
function playAnimation(value) {
  if (!isOver) {
    $("#" + value).animate({ opacity: 0.5 }, 0);
    $("#" + value).animate({ opacity: 1 }, 400);
  }
}

// Play button press animation
function playPress(value) {
  if (!isOver) {
    $("#" + value).addClass("pressed");
    setTimeout(function () {
      $("#" + value).removeClass("pressed");
    }, 200);
  }
}

// Start game
function gameStart() {
  $("#level-title").text("Let the game begins!");
  setTimeout(function () {
    $("#level-title").text("Game begins in 3");
    playSound("button");
  }, 1200);
  setTimeout(function () {
    $("#level-title").text("Game begins in 2");
    playSound("button");
  }, 2200);
  setTimeout(function () {
    $("#level-title").text("Game begins in 1");
    playSound("button");
  }, 3200);
  setTimeout(function () {
    $("#level-title").text("Go!!!");
    playSound("red");
  }, 4200);
  setTimeout(function () {
    $("#restart").removeClass("disabled");
    $("#level-title").text("Level " + level);
    nextSequence();
  }, 5200);
}

// Game over screen
function gameOver() {
  $("#restart").fadeToggle(200);
  playSound("wrong");
  isOver = true;
  $("body").addClass("game-over");
  $(".color-btn").removeClass("red");
  $(".color-btn").removeClass("blue");
  $(".color-btn").removeClass("green");
  $(".color-btn").removeClass("yellow");
  setTimeout(function () {
    $("body").removeClass("game-over");
    $(".color-btn").addClass("pressed");
  }, 200);
  $("#level-title").text("💀 Game Over 💀");
  setTimeout(function () {
    $("#level-title").text("Shall we play again?");
  }, 2000);
  setTimeout(function () {
    restartGame();
  }, 5000);
}

function restartGame() {
  $("#start").fadeToggle(200);
  isOver = false;
  p = 0;
  gamePattern = [];
  level = 0;
  swapColor();
  $("#level-title").text("Simon Game");
}

// Reset the button colors to their original color
function resetColor() {
  $(".color-btn").removeClass("colorSwapR");
  $(".color-btn").removeClass("colorSwapB");
  $(".color-btn").removeClass("colorSwapG");
  $(".color-btn").removeClass("colorSwapY");
  $(".color-btn").removeClass("pressed");
  $("#red").addClass("red");
  $("#blue").addClass("blue");
  $("#yellow").addClass("yellow");
  $("#green").addClass("green");
}

// Swap the button colors from their original color
function swapColor() {
  $(".color-btn").removeClass("red");
  $(".color-btn").removeClass("blue");
  $(".color-btn").removeClass("green");
  $(".color-btn").removeClass("yellow");
  $(".color-btn").removeClass("pressed");
  $("#red").addClass("colorSwapR");
  $("#yellow").addClass("colorSwapY");
  $("#blue").addClass("colorSwapB");
  $("#green").addClass("colorSwapG");
}

// Show colors pattern
function showPattern(value, speed) {
  if (!isOver) {
    var i = value;
    var showInterval = setInterval(function () {
      if (i >= gamePattern.length) {
        clearInterval(showInterval);
      } else {
        if (difficulty == 0) {
          playPress(gamePattern[i]);
          playSound(gamePattern[i]);
        }
        if (difficulty == 1) {
          playAnimation(gamePattern[i]);
          playSound(gamePattern[i]);
        }
        if (difficulty == 2) {
          playAnimation(gamePattern[i]);
          playSound(gamePattern[i]);
        }
        i++;
      }
    }, speed);
  }
}
