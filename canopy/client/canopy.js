console.log("client-canopy");


if (Meteor.isClient) {

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
}