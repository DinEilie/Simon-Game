// Start
var difficulty = 0;
var gamePattern = [];
var p = 0;
var isOver = false;
var isPaused = false;
var soundVolume = 0.50;
var isMuted = false;
var colors = ["red", "blue", "green", "yellow"];
var level = 0;
var stopColor = false;
$("#restart").fadeToggle(0);

// Add to all buttons behaviour
$(".game-btn").click(function () {
  if (
    (this.id == "red" ||
      this.id == "blue" ||
      this.id == "green" ||
      this.id == "yellow") &&
    level > 0
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
    if (level < 1) {
      $("#start").addClass("disabled");
      $("#start").html('Pause <i class="bi bi-pause-fill"></i>');
      $("#restart").fadeToggle(200);
      $("#restart").addClass("disabled");
      stopColor = true;
      resetBtnColor();
    } else {
      if (isPaused) {
        isPaused = false;
        $("#start").html('Pause <i class="bi bi-pause-fill"></i>');
      } else {
        isPaused = true;
        $("#start").html('Resume <i class="bi bi-play-fill"></i>');
      }
    }
    gameStart();
  } else if (this.id == "restart") {
    $("#start").addClass("disabled");
    $("#restart").addClass("disabled");
    isOver = true;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
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

// Activate buttons color
btnColor("yellow", "yellow");
btnColor("red", "red");
btnColor("green", "green");
btnColor("blue", "blue");

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
  if (!isOver) {
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
    audio.play();
  }
}

// Play auto animation color
function playAnimation(value) {
  if (!isOver) {
    $("#" + value).animate({ opacity: 0.5 }, 400);
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
    playSound("yellow");
  }, 4200);
  setTimeout(function () {
    $("#restart").removeClass("disabled");
    $("#start").removeClass("disabled");
    $("#level-title").text("Level " + level);
    nextSequence();
  }, 5200);
}

// Game over screen
function gameOver() {
  isOver = true;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
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
  $("#start").removeClass("disabled");
  $("#start").html('Start <i class="bi bi-play-fill">');
  $("#restart").fadeToggle(200);
  isOver = false;
  p = 0;
  gamePattern = [];
  level = 0;
  resetBtnColor();
  btnColor("yellow", "yellow");
  btnColor("red", "red");
  btnColor("green", "green");
  btnColor("blue", "blue");
  $("#level-title").text("Simon Game");
}

// Menu button color
function btnColor(idValue, value) {
  if (!stopColor) {
    switch (value) {
      case "red":
        $("#" + idValue).removeClass("red");
        $("#" + idValue).addClass("green");
        setTimeout(function () {
          btnColor(idValue, "green");
        }, 900);
        break;
      case "green":
        $("#" + idValue).removeClass("green");
        $("#" + idValue).addClass("blue");
        setTimeout(function () {
          btnColor(idValue, "blue");
        }, 900);
        break;
      case "blue":
        $("#" + idValue).removeClass("blue");
        $("#" + idValue).addClass("yellow");
        setTimeout(function () {
          btnColor(idValue, "yellow");
        }, 900);
        break;
      case "yellow":
        $("#" + idValue).removeClass("yellow");
        $("#" + idValue).addClass("red");
        setTimeout(function () {
          btnColor(idValue, "red");
        }, 900);
        break;
    }
  }
}

function resetBtnColor() {
  $("#red").removeClass("green");
  $("#red").removeClass("blue");
  $("#red").removeClass("yellow");
  $("#yellow").removeClass("green");
  $("#yellow").removeClass("blue");
  $("#yellow").removeClass("red");
  $("#blue").removeClass("green");
  $("#blue").removeClass("red");
  $("#blue").removeClass("yellow");
  $("#green").removeClass("red");
  $("#green").removeClass("blue");
  $("#green").removeClass("yellow");
  $("#red").addClass("red");
  $("#blue").addClass("blue");
  $("#yellow").addClass("yellow");
  $("#green").addClass("green");
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
