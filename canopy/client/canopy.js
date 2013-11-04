console.log("client-canopy");


var statusHandle = Meteor.subscribe('status');
var userHandle = Meteor.subscribe('users');
Status = new Meteor.Collection('status');

Template.login.greeting = function () {
  if (!Meteor.user()) {
    return "Curious...you don't seem to be logged in";
  }
};

Template.content.greeting = function() {
  if (Meteor.user()) {
    return "HELLO, " + Meteor.user().emails[0].address;
  }
}

function timeLeft(date) {
  var end = moment(date).add('minutes', 45);
  var now = moment(new Date()).unix();
  var timeleft = end.unix() - now;
  if (timeleft < 0) {
    timeleft = 0;
  }
  return timeleft;
}

Template.content.timer = function() {
  if (Meteor.user()) {
    if (_.isUndefined(Session.get("timer"))) {
      var date = Status.findOne({title: "questionStatus"}).timestart;
      Session.set("timer", timeLeft(date));
    }
    var minutes = Math.round(Session.get("timer") / 60) + ":";
    var seconds = Session.get("timer") % 60;
    if (seconds.toString().length < 2) {
      seconds = "0" + seconds;
    }
    return minutes + seconds;
  }
}

function updateTimer() {
  var date = Status.findOne({title: "questionStatus"}).timestart;
  if (Session.get("timer") - 1 >= 0) {
    Session.set("timer", Session.get("timer") - 1);
  } else {
    Session.set("timer", 0);
  }
}

Meteor.setInterval(updateTimer, 1000);

Template.content.helpers({
  isHTML: function() {
    if (Meteor.user()) {
      return !_.isUndefined(Status.findOne({title: "questionStatus"})) &&
                Status.findOne({title: "questionStatus"}).status === 'html';
    }
  },
  isJS: function() {
    if (Meteor.user()) {
      return !_.isUndefined(Status.findOne({title: "questionStatus"})) &&
                Status.findOne({title: "questionStatus"}).status === 'js';
    }
  },
  isSQL: function() {
    if (Meteor.user()) {
      return !_.isUndefined(Status.findOne({title: "questionStatus"})) &&
                Status.findOne({title: "questionStatus"}).status === 'sql';
    }
  },
  isReady: function() {
    return statusHandle.ready() && userHandle.ready();
  }
});

var test = function (event, template) {
    if (Meteor.user() && !event.currentTarget.classList.contains('locked')) {
      var template = event.currentTarget.id;
      console.log(template);
      $('.content').html(Meteor.render(function() {
        return Template[template]()
      }));
    }
  }

Template.content.events({
  'click .question': test
});


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
  }
});

var checkoffClick = function(event, template) {
	alert('hey');
}

Template.admin.events({
  'click .start': function (event, template) {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      var newstatus = event.currentTarget.id;
      var status = Status.findOne({title: "questionStatus"});
      var date = new Date();
      Status.update({_id: status._id}, {$set:{'status': newstatus,
                                   'timestart': date}});
      Session.set("timer", timeLeft(date));
      console.log(Session.get("timer"));
    }
  },
  'click .newteam': function (event, template) {
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
