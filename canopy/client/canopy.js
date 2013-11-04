console.log("client-canopy");

Status = new Meteor.Collection('status');
Meteor.subscribe('status');

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

Template.admin.helpers({
  hasStarted: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      if (_.isUndefined(Status.findOne({title: "questionStatus"}))) {
        Status.insert({title: "questionStatus",
                       status: "none",
                       time: 0});
      }
      return Status.findOne({title: "questionStatus"}).status !== 'none';
    }
  },
  currentStatus: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      if (_.isUndefined(Status.findOne({title: "questionStatus"}))) {
        Status.insert({title: "questionStatus",
                       status: "none",
                       time: 0});
      }
      return Status.findOne({title: "questionStatus"}).status;
    }
  },
  currentStartTime: function() {
    if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
      var date = Status.findOne({title: "questionStatus"}).timestart;
      return moment(date).format("hh:mm:ss A");
    }
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