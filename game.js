
var buttonColours = ["red", "blue", "green", "yellow"];
var userChosenColor = [];
var gamePattern = [];
var level = 0;
function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);
  level = level + 1;
  changeH1();
  userChosenColor = [];
}
$(".btn").on("click",function(event){
    userChosenColor.push(event.target.id);
    animateClick(event.target.id);
    playSound(event.target.id);
    checkAnswer(userChosenColor.length - 1);
})
function checkAnswer(index)
{
    if(gamePattern[index] === userChosenColor[index])
    {
        if(index === gamePattern.length -1)
        {
        setTimeout(function() {
            nextSequence();    
        },1000);
        }
    }
    else{
        gameOver();
        
    }
    
}
function gameOver() {
    level = 0;
    $("h1").text("Game Over. Press Any Key To Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    },300)
    gamePattern = [];
    userChosenColor = [];

}
function playSound(colorName)
{
    var A = new Audio("sounds/"+colorName+".mp3");
    A.play();
}
function animateClick(colorName)
{
    $("#"+colorName).addClass("pressed");
    setTimeout(function() {
        $("#"+colorName).removeClass("pressed");
    },100);
}
$(document).on("keypress",function() {
    if(level === 0)
    {
        nextSequence();
    }
})

function changeH1()
{
    $("h1").text("Level "+level);
}