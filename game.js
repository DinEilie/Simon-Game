// Start
var gamePattern = [];
var p = 0;
var colors = ["red","blue","green","yellow"];
var level = 0;
$(".container").slideToggle(0);

// Add to all buttons behaviour
$(".btn").click(function(){
    playPress(this.id);
    playSound(this.id);
    if (p == gamePattern.length - 1){
        if (this.id == gamePattern[p]){
            // Next level
            console.log("Level completed!")
            setTimeout(function (){
                p = 0;
                nextSequence();
            } , 1000);
            
        } else {
            // Wrong color
            console.log("Wrong!")
            gameOver();
        }
    } else {
        if (this.id == gamePattern[p]){
            // Correct color
            console.log("Correct!")
            p += 1;
        } else {
            // Wrong Color
            console.log("Wrong!");
            gameOver();
        }
    }
});

// Press A to start/restart game
$("body").keypress(function(event){
    if (event.key == "a" && level == 0){
        $(".container").slideToggle(200);
        setTimeout(function(){nextSequence()}, 400);
    }
});

// <!> FUNCTIONS <!>
// Perfrom next color sequence
function nextSequence(){
    // Add a new color to Game Pattern by random number between 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);
    level += 1;
    $("#level-title").text("Level " + level);
    playAnimation(randomChosenColor);
    playSound(randomChosenColor);
}

// Play the color sound
function playSound(value){
    var audio = new Audio("sounds/" + value + ".mp3");
    audio.play();
}

// Play auto animation color
function playAnimation(value){
    $("#" + value).animate({opacity:0.5},400);
    $("#" + value).animate({opacity:1},400);
}

// Play button press animation
function playPress(value){
    $("#" + value).addClass("pressed");
    setTimeout(function (){$("#" + value).removeClass("pressed");} , 100);
}

// Game over screen
function gameOver(){
    $(".container").slideToggle(100);
    setTimeout(function (){
        p = 0;
        gamePattern = [];
        level = 0;
        $("#level-title").text("Game Over 💀, Press 'A' Key to Restart");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function (){$("body").removeClass("game-over");} , 200);
    } , 90);
    
}

