require(['login', 'timer', 'admin', 'checkoff'], function(login, timer, admin, checkoff) {
  var statusHandler = Meteor.subscribe('status');
  var teamsHandler = Meteor.subscribe('teams')
  Teams = new Meteor.Collection('teams');
  Status = new Meteor.Collection('status');

  var isReady = function() {
    return statusHandler.ready() && teamsHandler.ready();
  }

  Template.login.events({
    'click .newteam': function (event, template) {
      login.register();
      event.preventDefault();
    }
  });
  
  Template.login.helpers({
    teamnameError: function() { return login.teamnameError(); }  
  });


  // Main Site Content

  Template.content.isReady = isReady;

  Template.content.events({
    'click .question': function (event, template) {
      if (Meteor.user() && !event.currentTarget.classList.contains('locked')) {
        var template = event.currentTarget.id;
        console.log(template);
        $('.content').html(Template[template]());
      }
    },
    'click .js2submit': function(event, template) {
      checkoff.js2(event, template);
    },
    'click .js3submit': function(event, template) {
      checkoff.js3(event, template)
    },
    'click .b0': function(event, template) {
      checkoff.js2(event, template);
    },
    'click .b1': function(event, template) {
      checkoff.js3(event, template);
    }
  });

  Template.nav.helpers({
    currentQuestions: function() {
      if (Meteor.user()) {
        var teamname = Meteor.user().profile.team;
        var team = Teams.findOne({teamName: teamname});
        var status = Status.findOne({title: "questionStatus"}).status;
        return team.contest[status];
      }
    },
    isReady: isReady,
    chapter: function() {
      if (Meteor.user()) {
        var status = Status.findOne({title: "questionStatus"}).status;
        return _.indexOf(['html', 'js', 'sql'], status) + 1;
      }
    },
    chapterTitle: function() {
      if (Meteor.user()) {
        var status = Status.findOne({title: "questionStatus"}).status;
        var index = _.indexOf(['html', 'js', 'sql'], status);
        var titles = ['HTML/CSS', 'JavaScript', 'Web Security Puzzles'];
        return titles[index];
      }
    }
  });

  // Scoreboard
  Template.scoreboard.teams = function() {
    var teamsList = Teams.find();
    console.log(teamsList);
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
      teams.push(team);
    });
    var finalteams = _.sortBy(teams, function(team) { return team.score; }).reverse();
    finalteams[0]['topthree'] = true;
    finalteams[1]['topthree'] = true;
    finalteams[2]['topthree'] = true;
    for (i in finalteams){
      finalteams[i]['place'] = (parseInt(i) + 1);
    }
    return finalteams;
  }

  Template.scoreboard.isReady = isReady;

  // Admin

  Template.admin.helpers({
    currentQuestions: function(id) {
      return admin.currentQuestions(id);
    },
    isSet: function(n, q) {
      return admin.isSet(n, q);
    },
    currentStatus: function() { return admin.currentStatus(); },
    isReady: isReady
  });

  Template.admin.events({
    'click .start': function (event, template) {
      if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
        var newstatus = event.currentTarget.id;
        var t = timer;
        Meteor.call("updateStatus", newstatus, Meteor.user(), function(err, res) {
          t.resetTimer();
        });
      }
    },
    'tap .checkoffbtn': admin.checkoffClick,
    'click .checkoffbtn': admin.checkoffClick
  });
});