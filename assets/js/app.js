var questionArr = [
  {
    id:1,
    question: "The Answer is A.", 
    answerArr: ["A", "B", "C", "D"],
    answerKey: 1


  },
  {
    id:2,
    question: "Mother's Madien Name?",
    answerArr: ["Kasten", "Ketover", "Cassie", "Zeno"],
    answerKey: 2
  },
  {
    id:3,
    question: "testtesttest",
    answerArr: ["test", "test", "test", "test"],
    answerKey: 2
  }  
]

var stage = 0;
var timer;

var triva= {
  answerFill:function(){
    for (var i = 0; i <= 3; i++) {
      $("#" + i + " > p").html(questionArr[stage].answerArr[i])
    }
  },
  countdown:function(duration, display){ 
    $("#" + display).html("Time :" + duration);
    timer = setInterval(function(){
      --duration;
      if(duration <= 0){
        clearInterval(timer);
        ++stage;
        triva.newQuestion();
      }
      $("#" + display).html("Time :" + duration);
    }, 1000);
  }, 
  newQuestion:function(){
    $("#title-text").html("Question: #" + questionArr[stage].id);
    $("#question").html(questionArr[stage].question);
    triva.answerFill();
    triva.countdown(5, "timer")
  }
  

}

$(window).on("load", function(){
$("#myModal").modal('show');
});
$("#startgame").click(function(){
  triva.newQuestion();
  $(".container").show();
});
$(".answer").click(function(){
  clearInterval(timer);
  ++stage;
  triva.newQuestion();
});



