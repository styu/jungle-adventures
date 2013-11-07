console.log("client-canopy");


var statusHandle = Meteor.subscribe('status');
var userHandle = Meteor.subscribe('users');
var teamHandle = Meteor.subscribe('teams');
Teams = new Meteor.Collection('teams');
Status = new Meteor.Collection('status');

Template.login.rendered = function()
{
    Accounts._loginButtonsSession.set('dropdownVisible', true);
};

Template.login.greeting = function () {
  if (!Meteor.user()) {
    return "Curious...you don't seem to be logged in";
  }
};

function timeLeft(date) {
  var end = moment(date).add('minutes', 45);
  var now = moment(new Date()).unix();
  var timeleft = end.unix() - now;
  if (timeleft < 0) {
    timeleft = 0;
  }
  return timeleft;
}

var isReady = function() {
  return statusHandle.ready() && teamHandle.ready();
}

var timer = 0;
var timerDep = new Deps.Dependency;

Template.content.timer = function() {
  if (Meteor.user()) {
    var date = Status.findOne({title: "timeStatus"}).timeStart;
    var time = timeLeft(date);
    timer = time;
    timerDep.depend();
    var minutes = Math.floor(timer / 60) + ":";
    var seconds = timer % 60;
    if (seconds.toString().length < 2) {
      seconds = "0" + seconds;
    }
    return minutes + seconds;
  }
}

function updateTimer() {
  if (Meteor.user()) {
    if (timer - 1 >= 0) {
      timer = timer - 1;
      var elapsed = Math.floor((45 * 60 - timer)/60);
      var teamname = Meteor.user().profile.team;
      var team = Teams.findOne({teamName: teamname});
      var status = Status.findOne({title: "questionStatus"}).status;
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
  }
}

      
Meteor.setInterval(updateTimer, 1000);

Template.content.helpers({
  isReady: isReady,
  teamname: function() {
    if (Meteor.user()) {
      return Meteor.user().profile.team;
    }
  },
  score: function() {
    var questions = ['html', 'js', 'sql'];
    var solved = [];
    var team = Teams.findOne({teamName: Meteor.user().profile.team});
    _.each(questions, function(questionType) {
      _.extend(solved, _.filter(team.contest[questionType],
                           function(question) {
                            return question.solved;
                           }));
    });
    var points = _.map(solved, function(question) { return question.points; });
    if (points.length == 0) {
      return 0;
    }
    var sum = _.reduce(points, function(memo, points) {return memo + points; });
    return sum;
  }
});

var currentQuestions = function() {
  if (Meteor.user()) {
    var teamname = Meteor.user().profile.team;
    var team = Teams.findOne({teamName: teamname});
    var status = Status.findOne({title: "questionStatus"}).status;
    return team.contest[status];
  }
}

Template.nav.helpers({
  currentQuestions: currentQuestions,
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
      var titles = ['HTML/CSS', 'JS', 'SQL ATTACK'];
      return titles[index];
    }
  }
});

var test = function (event, template) {
    if (Meteor.user() && !event.currentTarget.classList.contains('locked')) {
      var template = event.currentTarget.id;
      console.log(template);
      $('.content').html(Template[template]());
    }
  }

var output = ""
var js2  = function (event, template) {
  var usercode = $('.js2textarea').val();
  var error = "";
  eval(usercode); // This is the Scariest Function Ever
  var checkEquals = function(a, b) {
  	if (a.length != b.length) return false;
  	for (i in a){
  	  if (a[i] != b[i]) return false;
  	}
  	return true;
  }
  
  var good = true;
  if (typeof(pattern) === "function") {
    // Tests
  	if (!checkEquals(pattern(1,2,3), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])){
  	  error += "<span class='testfailed'>Failed Test1: pattern(1,2,3)</span> You output: " + pattern(1,2,3) + " <br />";

  	  good = false;
  	} else {
  	  error += "Passed Test1<br />";
  	} 
  	
  	if (!checkEquals(pattern(2,4,6,8), [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] )){
  	  error += "<span class='testfailed'>Failed Test2: pattern(2,4,6,8)</span> You output: " + pattern(2,4,6,8) + " <br />";
  	  good = false;
  	} else {
  	  error += "Passed Test2<br />";
  	} 
  	
  	if (!checkEquals(pattern(1.5,3,6,12), [1.5, 3, 6, 12, 24, 48, 96, 192, 384, 768] )) {
  	  error += "<span class='testfailed'>Failed Test3:  pattern(1.5,3,6,12)</span> You output: " + pattern(1.5,3,6,12) + " <br />";
  	  good = false;
  	} else {
  	  error += "Passed Test3<br />";
  	} 
  	
  	if (!checkEquals(pattern(0,0,0), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] )) {
  	  error += "<span class='testfailed'>Failed Test4: pattern(0,0,0)</span> You output: " + pattern(0,0,0) + " <br />";
  	  good = false;
  	} else {
  	  error += "Passed Test4<br />";
  	} 
  	
  	if (!checkEquals(pattern(1,4,5), [1, 4, 5, 1, 4, 5, 1, 4, 5, 1] )) {
  	  error += "<span class='testfailed'>Failed Test5: pattern(1,4,5)</span> You output: " + pattern(1,4,5) + " <br />";
  	  good = false;
  	} else {
  	  error += "Passed Test5<br />";
  	} 
  	
  	if (!checkEquals(pattern(2,4,8, 16, 9), [2,4,8, 16, 9,2,4,8, 16, 9] )) {
  	  error += "<span class='testfailed'>Failed Test6: pattern(2,4,8,16,9)</span> You output: " + pattern(2,4,8, 16, 9) + " <br />";
  	  good = false;
  	} else {
  	  error += "Passed Test6<br />";
  	} 
  	
  } else {
  	good = false;
    error = "pattern is not a function";
  }
  
  if (good){
    $('.js2output').html('PASS!');
    //Meteor.call("unlockJS", Teams.findOne({teamName: Meteor.user().profile.team})._id, 1);
    id =  Teams.findOne({teamName: Meteor.user().profile.team})._id
    setTimeout(function(){Meteor.call('checkoffJS', id, 2)}, 1000);
  } else {
    $('.js2output').html(error);
  }
}

var shouldClick = 0;
var inARow = 0;
var js3 = function(event, template){
  var $cur = $(event.currentTarget);
  if ($cur.attr('class') === 'js3submit'){
    eval($('.js3textarea').val());
  } else {
	  shouldClick = $('.should-click').text();
	  if ($cur.attr('class')[1] == shouldClick){
	  	++ inARow;
	  } else {
	  	inARow = 0;
	  }
	  shouldClick = Math.round(Math.random());
	  $('.should-click').text(shouldClick);
	  $('.inarow').text(inARow);
	  if (inARow >= 1000) {
	    inARow = 0;
	    console.log("YOU DID IT!");
	    $('.js3controls').append('<br />PASS!');
	    id =  Teams.findOne({teamName: Meteor.user().profile.team})._id
	  	setTimeout(function(){Meteor.call('checkoffJS', id, 3)}, 1000);
	  }
  }
}

Template.content.events({
  'click .question': test,
  'click .js2submit': js2,
  'click .js3submit': js3,
  'click .b0': js3,
  'click .b1': js3
});

Template.admin.teams = function(){
  return Teams.find();
}

Template.admin.helpers({
  hasStarted: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      Status.find().forEach(function(status) {
        console.log(status);
      });
      return Status.findOne({title: "questionStatus"}).status !== 'none';
    }
  },
  currentStatus: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      return Status.findOne({title: "questionStatus"}).status;
    }
  },
  currentStartTime: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      var date = Status.findOne({title: "questionStatus"}).timestart;
      return moment(date).format("hh:mm:ss A");
    }
  },
  isReady: function() {
    return statusHandle.ready();
  },
  isSet: function(q, n) {
    if (n == 1){
      if (q == '1' || q == '2' || q == '3' || q == '4'){
      return true
      } else {
        return false
      }
    } else {
      if (q == '1' || q == '2' || q == '3' || q == '4'){
      return false
      } else {
        return true
      }
    }
  },
  currentQuestions: function(id) {
    var team = Teams.findOne({_id: id});
    var status = Status.findOne({title: "questionStatus"}).status;
    return team.contest[status];
  }
});

var checkoffClick = function(event, template) {
  console.log('click');
  var $cur = $(event.currentTarget);
  var id = $cur.parent().attr('data-teamid');
  var questionId = $cur.attr('data-questionId');
  var questionType = $cur.attr('data-questionType');
  
  var team = Teams.findOne({_id:id});
  Meteor.call('checkoff' + questionType.toUpperCase(), id, questionId);
}

Template.admin.events({
  'click .start': function (event, template) {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      var newstatus = event.currentTarget.id;
      var status = Status.findOne({title: "questionStatus"});
      var date = new Date();
      if (newstatus === 'none') {
        date = 0;
      }
      Status.update({_id: status._id}, {$set:{'status': newstatus,
                                   'timestart': date}});
      status = Status.findOne({title: "timeStatus"});
      Status.update({_id: status._id},
                    {$set:{'started': true, 'timeStart':date}});
      timer = 0;
      timerDep.changed();
    }
  },
  'click .newteam': function (event, template) {
    console.log('Creating new team');
    var info = {};
    if ($('#teamname').val() !== '') {
      info['teamname'] = $('#teamname').val();
      info['members'] = [];
      for (var i = 1; i <= 3; i++) {
        if ($('#member' + i + 'name').val() !== '' && $('#member' + i + 'email').val() !== '') {
          var email = $('#member' + i + 'email').val();
          if (_.isUndefined(Meteor.users.findOne({'emails.address': email}))) {
            info['members'].push({email: email,
                                    name: $('#member' + i + 'name').val()});
          }
        }
      }
      info['beginner'] = $('#beginnerteam').is(':checked');
      if (info['members'].length > 0) {
        Meteor.call('newTeam', info);
      } else {
        console.log('error in form');
      }
    }
    event.preventDefault();
  },
  'tap .checkoffbtn': checkoffClick,
  'click .checkoffbtn': checkoffClick
});

Template.login.events({
  'click .newteam': function (event, template) {
    console.log('Creating new team');
    var info = {};
    if ($('#teamname').val() !== '') {
      info['teamname'] = $('#teamname').val();
      info['members'] = [];
      for (var i = 1; i <= 3; i++) {
        if ($('#member' + i + 'name').val() !== '' && $('#member' + i + 'email').val() !== '') {
          var email = $('#member' + i + 'email').val();
          if (_.isUndefined(Meteor.users.findOne({'emails.address': email}))) {
            info['members'].push({email: email,
                                    name: $('#member' + i + 'name').val()});
          }
        }
      }
      console.log(info);
      info['beginner'] = $('#beginnerteam').is(':checked');
      console.log(info['beginner']);
      if (info['members'].length > 0) {
        Meteor.call('newTeam', info);
      } else {
        console.log('error in form');
      }
    }
    event.preventDefault();
  }
});
