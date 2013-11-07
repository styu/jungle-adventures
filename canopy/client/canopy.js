require(['login', 'timer', 'admin', 'checkoff', 'scoreboard'], function(login, timer, admin, checkoff, scoreboard) {
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
      if (Status.findOne({title: 'questionStatus'}).status === 'js' ||
          Roles.userIsInRole(Meteor.user(), ['beginner'])) {
        checkoff.js2(event, template);
      } else {
        $('.js2output').html('The JS portion of the contest is over!');
      }
    },
    'click .js3submit': function(event, template) {
      if (Status.findOne({title: 'questionStatus'}).status === 'js' ||
          Roles.userIsInRole(Meteor.user(), ['beginner'])) {
        checkoff.js3(event, template)
      } else {
        $('.js3output').html('The JS portion of the contest is over!');
      }
    },
    'click .b0': function(event, template) {
      if (Status.findOne({title: 'questionStatus'}).status === 'js' ||
          Roles.userIsInRole(Meteor.user(), ['beginner'])) {
        checkoff.js3(event, template);
      } else {
        $('.js3output').html('The JS portion of the contest is over!');
      }
    },
    'click .b1': function(event, template) {
      if (Status.findOne({title: 'questionStatus'}).status === 'js' ||
          Roles.userIsInRole(Meteor.user(), ['beginner'])) {
        checkoff.js3(event, template);
      } else {
        $('.js3output').html('The JS portion of the contest is over!');
      }
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

  Template.htmlnav.helpers({
    currentQuestions: function() {
      if (Meteor.user()) {
        var teamname = Meteor.user().profile.team;
        var team = Teams.findOne({teamName: teamname});
        return team.contest['html'];
      }
    },
    isReady: isReady,
  });

  Template.htmlnav.events({
    'click .hover': function(event, template) {
      if ($('.html').hasClass('hidden')) {
        $('.html').slideDown();
        $('.html').removeClass('hidden');
      } else {
        $('.html').slideUp();
        $('.html').addClass('hidden');
      }
    }
  });

  Template.jsnav.helpers({
    currentQuestions: function() {
      if (Meteor.user()) {
        var teamname = Meteor.user().profile.team;
        var team = Teams.findOne({teamName: teamname});
        return team.contest['js'];
      }
    },
    isReady: isReady,
  });

  Template.jsnav.events({
    'click .hover': function(event, template) {
      if ($('.js').hasClass('hidden')) {
        $('.js').slideDown();
        $('.js').removeClass('hidden');
      } else {
        $('.js').slideUp();
        $('.js').addClass('hidden');
      }
    }
  });

  // Scoreboard
  Template.scoreboard.teams = function() {
    return scoreboard.scoreboard();
  }

  Template.scoreboard.isReady = isReady;

  Template.adminscoreboard.helpers({
    teams: function() { return scoreboard.topten(); },
    htmlteams: function() { return scoreboard.htmltopten(); },
    jsteams: function() { return scoreboard.jstopten(); },
    sqlteams: function() { return scoreboard.sqltopten(); },
    isReady: isReady
  });


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