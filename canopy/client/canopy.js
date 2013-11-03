console.log("client-canopy");


if (Meteor.isClient) {

  Template.hello.greeting = function () {
    if (Meteor.user()){
      t = Meteor.render(function() {
      	return Template.letsgo();
      });
      // this can't be the right way to do it… :(
      document.body.appendChild(t);
      return "HELLO, " + Meteor.user().emails[0].address;
    } else {
      return "Curious.. you don't seem to be logged in";
    }
  };
}