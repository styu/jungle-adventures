;(function () {

  process.env.MAIL_URL = "smtp://6.470monkeys:6470m0nk3y@smtp.googlemail.com:465"
  "use strict";

  Teams = new Meteor.Collection('teams');

  ////////////////////////////////////////////////////////////////////
  // Startup
  //

  Meteor.startup(function () {

    ////////////////////////////////////////////////////////////////////
    // Create Admin Users
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

    Accounts.validateNewUser(function (user) {
      var loggedInUser = Meteor.user();

      if (Roles.userIsInRole(loggedInUser, ['admin'])) {
        return true;
      }

      throw new Meteor.Error(403, "Not authorized to create new users");
    });

    Meteor.methods({
      newTeam: function(info) {
        var ids = [];
        _.each(info['members'], function(member) {
          var id,
            user;

          var password = Math.random().toString(36).substring(2, 7);
          id = Accounts.createUser({
            email: member.email,
            password: password,
            profile: { name: member.name, team: info['teamname'] }
          });

          // email verification
          Email.send({
            to: member.email,
            from: '6470-staff@mit.edu',
            replyTo: '6470-staff@mit.edu',
            subject: 'Your 6.470 Jungle Adventures Account',
            html: 'Hello ' + member.name + ',<br /><br />' +
                  'Your JungleAdventures Account has been created. Please login to <url> with your email and the following password: ' + password + '<br /><br />' +
                  'Thanks,<br />' +
                  'Your Friendly 6.470 Monkey'
          });

          ids.push(id);
          Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
        });

        var questions = [];
        var timelengths = [3, 5, 5, 5, 5, 5, 7, 10];
        for (var i = 1; i <= 8; i++) {
          questions.push({title: 'test' + i,
                          time: undefined,
                          locked: true,
                          points: i * 5,
                          file: 'html' + i,
                          timelength: timelengths[i-1]});
        }
        // Unlock first 2 questions
        questions[0]['locked'] = false;
        questions[1]['locked'] = false;
        Teams.insert({teamName: info['teamname'],
                      users: ids,
                      contest: {html: questions,
                                js: questions,
                                sql: questions}});
      }
    });
  });

  Status = new Meteor.Collection('status');
  Meteor.publish("status", function () {
    if (_.isUndefined(Status.findOne({title: "questionStatus"}))) {
      Status.insert({title: "questionStatus",
                     status: "none",
                     time: 0});
    }
    if (_.isUndefined(Status.findOne({title: "timeStatus"}))) {
      Status.insert({title: "timeStatus",
                     started: false,
                     timeStart: 0});
    }
    return Status.find();
  });

  Meteor.publish("users", function () {
    var user = Meteor.users.findOne({_id:this.userId});
    if (Roles.userIsInRole(user, ["admin"])) {
      return Meteor.users.find();
    } // else display limited fields?
  });

  Meteor.publish("teams", function () {
    return Teams.find();
  });
}());