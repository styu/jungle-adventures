define('scoreboard', [], function() {

  var singlescoreboard = function(questionType) {
    var teamsList = Teams.find();
    var teams = [];
    teamsList.forEach(function(curTeam) {
      var team = {teamName: curTeam.teamName};
      var solved = _.filter(curTeam.contest[questionType], function(question) { return question.solved; });
      var points = _.map(solved, function(question) { return question.points; });
      var sum = 0;
      if (points.length !== 0) {
        sum = _.reduce(points, function(memo, points) {return memo + points; });
      }
      team['score'] = sum;
      team['beginner'] = curTeam.beginner;
      lastcheckoff = ''
      for (i in curTeam.contest[questionType]) {
        d = curTeam.contest[questionType][i].time
        if (d != null) {        
	      	if (lastcheckoff == ''){
	      		lastcheckoff = d;
	      	} else if (lastcheckoff < d) {
	      		lastcheckoff = d;
	      	}
      	}
      }
      team['lastcheckoff'] = lastcheckoff;
      teams.push(team);
    });
    var finalteams = _.sortBy(teams, function(team) { return team.score; }).reverse();
    for (i in finalteams){
      finalteams[i]['place'] = (parseInt(i) + 1);
    }
    return finalteams;
  }

  var scoreboard = function() {
    var teamsList = Teams.find();
    var teams = [];
    teamsList.forEach(function(curTeam) {
      var team = {teamName: curTeam.teamName};
      var questions = ['html', 'js', 'sql'];
      var solved = [];
      var sum = 0;
      _.each(questions, function(questionType) {
        var solved = _.filter(curTeam.contest[questionType], function(question) { return question.solved; });

        // Calculate total score
        var points = _.map(solved, function(question) { return question.points; });
        if (points.length !== 0) {
          sum += _.reduce(points, function(memo, points) {return memo + points; });
        }
      });
      team['score'] = sum;
      team['topthree'] = false;
      team['beginner'] = curTeam.beginner;
      teams.push(team);
    });
    var finalteams = _.sortBy(teams, function(team) { return team.score; }).reverse();
    finalteams[0]['topthree'] = true;
    if (finalteams.length > 1)
      finalteams[1]['topthree'] = true;
    if (finalteams.length > 2)
      finalteams[2]['topthree'] = true;
    for (i in finalteams){
      finalteams[i]['place'] = (parseInt(i) + 1);
    }
    return finalteams;
  }
  return {
    scoreboard: scoreboard,
    topten: function() {
      var teams = scoreboard();
      var topten = _.initial(teams, teams.length - 10);
      return topten;
    },
    htmltopten: function() {
      var finalteams = singlescoreboard('html');
      return _.initial(finalteams, finalteams.length - 10);
    },
    jstopten: function() {
      var finalteams = singlescoreboard('js')
      return _.initial(finalteams, finalteams.length - 10);
    },
    sqltopten: function() {
      var finalteams = singlescoreboard('sql')
      return _.initial(finalteams, finalteams.length - 10);
    }
  }
});

