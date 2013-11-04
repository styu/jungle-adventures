console.log("client-canopy");


var statusHandle = Meteor.subscribe('status');
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
    return statusHandle.ready();
  }
});

Template.content.events({
  'click .question': function (event, template) {
    if (Meteor.user() && !event.currentTarget.classList.contains('locked')) {
      var template = event.currentTarget.id;
      console.log(template);
      $('.content').html(Meteor.render(function() {
        return Template[template]()
      }));
    }
  }
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

Template.admin.events({
  'click .start': function (event, template) {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      var newstatus = event.currentTarget.id;
      var status = Status.findOne({title: "questionStatus"});
      Status.update({_id: status._id}, {$set:{'status': newstatus,
                                   'timestart': (new Date())}});
    }
  }
});