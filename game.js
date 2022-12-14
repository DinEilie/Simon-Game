// Start
var difficulty;
var gamePattern = [];
var p = 0;
var isOver = false;
var colors = ["red","blue","green","yellow"];
var level = 0;
$("#difficulty").slideToggle(0);
$("#colors").slideToggle(0);
$("#info").slideToggle(0);

// Add to all buttons behaviour
$(".btn").click(function(){
    playPress(this.id);
    playSound(this.id);
    if(this.id == "red" || this.id == "blue" || this.id == "green" || this.id == "yellow"){
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
    } else if (this.id == "start"){
        $("#menu").slideToggle(200);
        $("#info").slideUp(200);
        $("#difficulty").slideToggle(200);
        $("#level-title").text("Choose difficulty");
        
    } else if (this.id == "easy") {
        $("#difficulty").slideToggle(200);
        $("#colors").slideToggle(200);
        difficulty = 0;
        setTimeout(function(){nextSequence()}, 1000);
    } else if (this.id == "medium"){
        $("#difficulty").slideToggle(200);
        $("#colors").slideToggle(200);
        difficulty = 1;
        setTimeout(function(){nextSequence()}, 1000);
    } else if (this.id == "hard") {
        $("#difficulty").slideToggle(200);
        $("#colors").slideToggle(200);
        difficulty = 2;
        setTimeout(function(){nextSequence()}, 1000);
    } else if (this.id == "explain") {
        $("#info").slideToggle(200);
    } else {}
});

// Press A to start/restart game
$("body").keypress(function(event){
    if (event.key == "a" && level == 0){
        $(".container").slideToggle(200);
        setTimeout(function(){nextSequence()}, 400);
    }
});

// Activate buttons color
btnColor("yellow");

// <!> FUNCTIONS <!>
// Perfrom next color sequence
function nextSequence(){
    if(!isOver){
        level += 1;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = colors[randomNumber];
        gamePattern.push(randomChosenColor);

        // Show all the colors depends on difficulty
        if (difficulty == 0)
            showPattern(0, 600);
        if (difficulty == 1)
            showPattern(0, 450);
        if (difficulty == 2)
            showPattern(gamePattern.length - 1, 450);
    }
}

// Play the color sound
function playSound(value){
    if (!isOver){
        // Default button sound
        if(value != "red" && value != "blue" && value != "green" && value != "yellow")
            value = "blue";
        var audio = new Audio("sounds/" + value + ".mp3");
        audio.play();
    }
}

// Play auto animation color
function playAnimation(value){
    if (!isOver){
        $("#" + value).animate({opacity:0.5},400);
        $("#" + value).animate({opacity:1},400);
    }
}

// Play button press animation
function playPress(value){
    if (!isOver){
        $("#" + value).addClass("pressed");
        setTimeout(function (){$("#" + value).removeClass("pressed");} , 200);
    }
}

// Game over screen
function gameOver(){
    isOver = true;
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function (){$("body").removeClass("game-over");} , 200);
    $("#colors").slideToggle(100);
    $("#level-title").text("Game Over 💀, shall we play again?");

    setTimeout(function (){
        isOver = false;
        p = 0;
        gamePattern = [];
        level = 0;
        $("#menu").slideToggle(200);
    } , 2000);
}

// Menu button color
function btnColor(value){
    switch (value){
        case "red":
            $(".menu").removeClass("red");
            $(".menu").addClass("green")
            setTimeout(function (){btnColor("green");} , 900);
            break;
        case "green":
            $(".menu").removeClass("green");
            $(".menu").addClass("blue")
            setTimeout(function (){btnColor("blue");} , 900);
            break;
        case "blue":
            $(".menu").removeClass("blue");
            $(".menu").addClass("yellow")
            setTimeout(function (){btnColor("yellow");} , 900);
            break;
        case "yellow":
            $(".menu").removeClass("yellow");
            $(".menu").addClass("red")
            setTimeout(function (){btnColor("red");} , 900);
            break;
    }
}

// Show colors pattern
function showPattern(value, speed){
    if (!isOver){
        var i = value + 0;
        var showInterval = setInterval(function () {
            if (i >= gamePattern.length){
                clearInterval(showInterval);
            } else {
                if (difficulty == 0){
                    playPress(gamePattern[i]);
                    playSound(gamePattern[i]);
                }
                if (difficulty == 1){
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
