;(function () {

  process.env.MAIL_URL = "smtp://6.470monkeys:6470m0nk3y@smtp.googlemail.com:465"
  "use strict";


////////////////////////////////////////////////////////////////////
// Startup
//

Meteor.startup(function () {

  ////////////////////////////////////////////////////////////////////
  // Create Test Secrets
  //
    
  // if (Meteor.secrets.find().fetch().length === 0) {
  //   Meteor.secrets.insert({secret:"ec2 password: apple2"});
  //   Meteor.secrets.insert({secret:"domain registration pw: apple3"});
  // }


  ////////////////////////////////////////////////////////////////////
  // Create Test Users
  //

  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');

     var users = [
        //{name:"Normal User",email:"normal@example.com",roles:[]},
        {name:"Steph Yu",email:"styu@mit.edu",roles:['admin']},
        {name:"Victor H",email:"vhung@mit.edu",roles:['admin']},
        //{name:"Admin User",email:"admin@example.com",roles:['admin']}
      ];

    _.each(users, function (userData) {
      var id,
          user;
      
      console.log(userData);

      var password = Math.random().toString(36).substring(2, 7);
      id = Accounts.createUser({
        email: userData.email,
        password: password,
        profile: { name: userData.name }
      });

      // email verification
      Email.send({
        to: userData.email,
        from: '6470-staff@mit.edu',
        replyTo: '6470-staff@mit.edu',
        subject: 'Your Meteor Admin Account',
        html: 'Hello ' + userData.name + ',<br /><br />' +
              'Your JungleAdventures Admin Account has been created. Please login to <url> with your email and the following password: ' + password + '<br /><br />' +
              'Thanks,<br />' +
              'Your Friendly 6.470 Monkey'
      });
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });
  }



  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

  // Accounts.validateNewUser(function (user) {
  //   var loggedInUser = Meteor.user();

  //   if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
  //     return true;
  //   }

  //   throw new Meteor.Error(403, "Not authorized to create new users");
  // });

});

Status = new Meteor.Collection('status');
Meteor.publish("status", function () {
  if (_.isUndefined(Status.findOne({title: "questionStatus"}))) {
    Status.insert({title: "questionStatus",
                   status: "none",
                   time: 0});
  }
  return Status.find();
});

////////////////////////////////////////////////////////////////////
// Publish
//


// Authorized users can view secrets
// Meteor.publish("secrets", function () {
//   var user = Meteor.users.findOne({_id:this.userId});

//   if (Roles.userIsInRole(user, ["admin","view-secrets"])) {
//     console.log('publishing secrets', this.userId)
//     return Meteor.secrets.find();
//   }

//   this.stop();
//   return;
// });

// // Authorized users can manage user accounts
// Meteor.publish("users", function () {
//   var user = Meteor.users.findOne({_id:this.userId});

//   if (Roles.userIsInRole(user, ["admin","manage-users"])) {
//     console.log('publishing users', this.userId)
//     return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
//   } 

//   this.stop();
//   return;
// });

}());