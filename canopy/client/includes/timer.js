define('timer', [], function() {
  var timer = 0;
  var timerDep = new Deps.Dependency;

  var timeLeft = function(date) {
    var end = moment(date).add('minutes', 45);
    var now = moment(new Date()).unix();
    var timeleft = end.unix() - now;
    if (timeleft < 0) {
      timeleft = 0;
    }
    return timeleft;
  }
  return {
    timer: function() {
      var date = Status.findOne({title: 'timeStatus'}).timeStart;
      var time = timeLeft(date);
      timer = time;
      timerDep.depend();
      var minutes = Math.floor(timer / 60) + ":";
      var seconds = timer % 60;
      if (seconds.toString().length < 2) {
        seconds = "0" + seconds;
      }
      return minutes + seconds;
    },
    updateTimer: function() {
      if (timer - 1 >= 0) {
        timer = timer - 1;
        var elapsed = Math.floor((45 * 60 - timer)/60);
        var teamname = Meteor.user().profile.team;
        var team = Teams.findOne({teamName: teamname});
        var status = 'html';
        //var status = Status.findOne({title: "questionStatus"}).status;
        var totalTime = 0;
        _.each(team.contest[status], function(question, index) {
          totalTime += question.timelength;
          var nextQuestion = team.contest[status][index + 1];
          if (totalTime <= elapsed  && nextQuestion.locked) {
            Meteor.call("unlock" + status.toUpperCase(), team._id, index + 1);
          }
        });
      } else {
        timer = 0;
      }
      timerDep.changed();
    },
    resetTimer: function() {
      timer = 0;
      timerDep.changed();
    }
  }
});