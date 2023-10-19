// var ans = true;
// var btn = ["green", "red", "yellow", "blue"];
// var keys = [];
// var user_ans = [];
// var level = 0;
// var status = true;

// function checkAnswer(level){
//     if(keys == user_ans){

//         return true;
//     }
//     return false;
// }

// function keyPress(user_ans) {
//   return user_ans;
// }

// function genSeq(level) {
//   var rand = Math.floor(Math.random() * 4);
//   keys.push(btn[rand]);

//   $("h1").text("Level " + level);
//   $("#"+btn[rand]).addClass("pressed");
//     setTimeout(function () {
//       $("#"+btn[rand]).removeClass("pressed");
//     }, 100);
// }

// function highlightBtn(keys) {
//   $("#" + keys[keys.length - 1]).addClass("pressed");

//   setTimeout(function () {
//     $("#" + keys[keys.length - 1]).removeClass("pressed");
//   }, 100);
// }


// for (var i = 0; i < 4; i++) {
//   document.querySelectorAll(".btn")[i].addEventListener("click", function () {
//     user_ans.push(this.id);
//     var idd = this.id;

//     $("#"+idd).addClass("pressed");
//     setTimeout(function () {
//       $("#"+idd).removeClass("pressed");
//     }, 100);

//     switch (idd) {
//       case "green":
//         var audio = new Audio("./sounds/green.mp3");
//         audio.play();
//         break;
//       case "red":
//         var audio = new Audio("./sounds/red.mp3");
//         audio.play();
//         break;
//       case "yellow":
//         var audio = new Audio("./sounds/yellow.mp3");
//         audio.play();
//         break;
//       case "blue":
//         var audio = new Audio("./sounds/blue.mp3");
//         audio.play();
//         break;
//       default:
//         console, log("Error");
//     }
//   });
// }

// $("*").keydown(function(event){
//     if(event.key == "a"){
//         genSeq(level);



//         if(checkAnswer()==true){
//             genSeq(level);
//         }
//         else{
//             $("*").addClass("game-over");
//             setTimeout(function(){
//                 $("*").removeClass("game-over");
//             },100);
//         }
//     }
// })




var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
