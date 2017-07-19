//array holding questions and answers. 
var questionArr = [
  {
    id:1,
    question: "Who is the author behind famous detective Sherlock Holmes?", 
    answerArr: ["Agatha Christie", "J. K. Rowling", "Arthur Conan Doyle", "Benedict Cumberbatch"],
    answerKey: 3
  },
  {
    id:2,
    question: "How many people are killed in 'And Then There Were None?'",
    answerArr: ["10", "12", "3", "5"],
    answerKey: 1
  },
  {
    id:3,
    question: "Who is Sherlock Holmes' most famous nemesis?",
    answerArr: ["John Watson", "Irene Adler", "James Moriarty", "Herlock Sholmes"],
    answerKey: 3
  },   
  {
    id:4,
    question: "How did the Victim die in 'Murder on the Orient Express?'",
    answerArr: ["Gunshot", "Stabbing", "Poison", "Run Over by a Train"],
    answerKey: 2
  },
  {
    id:5,
    question: "What is the name of Raymond Chandler's first Novel?",
    answerArr: ["Casablanca", "The Big Sleep", "The Long Goodbye", "A Study in Pink"],
    answerKey: 2
  },
  {
    id:6,
    question: "What is the name of Agatha Christie's most famous detective?",
    answerArr: ["Philip Marlowe", "Hercule Poirot", "Sherlock Holmes", "Philo Vance"],
    answerKey: 2
  },
  {
    id:7,
    question: "Which of these is the only Soji Shimada novel to be translated into english.",
    answerArr: ["Vertigo", "The Final Pitch", "The Crystal Pyramid", "The Tokyo Zodiac Murders"],
    answerKey: 4
  }, 
  {
    id:8,
    question: "What is the alternative title of John Dickson Carr's 'The Three Coffins'",
    answerArr: ["Vertigo", "Death Watch", "The Hollow Man", "The Unicorn Murders"],
    answerKey: 3
  },
  {
    id:9,
    question: "What was Agatha Christie's first novel?",
    answerArr: ["The Mysterious Affair at Styles", "The Murder of Roger Ackroyd", "Why Didn't They Ask Evans?", "Curtain"],
    answerKey: 1
  },
  {
    id:10,
    question: "Who among these writers has written mystery novels?",
    answerArr: ["Mark Twain", "Charles Dickens", "Edgar Allen Poe", "William Shakespeare"],
    answerKey: 3
  }
]
//global variables and the function object
var stage = 0;
var timer;
var answerCorrect = 0;
var trivia= {
  //renders answer buttons for each question
  answerFill:function(){
    for (var i = 0; i <= 3; i++) {
      $("#" + i + " > p").html(questionArr[stage].answerArr[i])
    }
  },
  //handers all timers. Timeout argument notes if the timer completion causes a question to be answered wrong
  countdown:function(duration, display, timeout){ 
    $("#" + display).html("Time: " + duration);
    timer = setInterval(function(){
      --duration;
      if(duration <= 0){
        if (timeout === false){
          $(".popup").hide();
          clearInterval(timer);
          ++stage;
          trivia.newQuestion();
        }
        else if (timeout === true){
          clearInterval(timer);
          trivia.popupHandler("timeout");
        }
      }
      $("#" + display).html("Time: " + duration);
    }, 1000);
  }, 
  //prints question, begins timer
  newQuestion:function(){
    console.log(stage);
    if (stage <= 9){
      $(".container").show();
      $("#title-text").html("Question: #" + questionArr[stage].id);
      $("#question").html(questionArr[stage].question);
      trivia.answerFill();
      trivia.countdown(45, "timer", true);
    }
    else{
      trivia.gameEnder()
    }
  },
  //handles all pop ups
  popupHandler:function(targetid){
    var timerid = "timer" + targetid;
    $("#" + targetid).show();
    console.log(timerid);
    $(".container").hide();
    trivia.countdown(5, timerid, false);
  },
  //ends the game
  gameEnder:function(){
    $("#score").html("You got " + answerCorrect + "/10 correct!");
    $("#modaltext").html("Thank you for playing! Please click the button to play again!")
    stage = 0;
    answerCorrect = 0;
    $("#myModal").moda1l('show');
  }
}
//DOM based functions
$(window).on("load", function(){
  $("#myModal").modal('show');
});
$("#startgame").click(function(){
  trivia.newQuestion();
  $(".container").show();
});
$(".answer").click(function(){
  clearInterval(timer);
  if (this.id == (questionArr[stage].answerKey - 1)){
    answerCorrect++;
    trivia.popupHandler("correct");
  }
  else{
    trivia.popupHandler("incorrect");
  }
});