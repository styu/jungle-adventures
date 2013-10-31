if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to canopy.";
  };

  Template.hello.events({
    'click #go' : function (evt) {
      // template data, if any, is available in 'this'
      console.log(this);
      username = $('#username').val();
      password = $('#password').val();
      Meteor.loginWithPassword(username, password, function(err){
        if (err){
          console.log("HELLO! you fucked up");
        } else {
          // The user has been logged in.
          console.log("HELLO! You bitch be loggin in, arg");
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
   /*
 Accounts.createUser({username: "bob",
    	email: "bob@bob.bob",
    	password: "notbob",
    	profile: {}});
*/
  });
}
