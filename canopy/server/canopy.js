require(['login', 'admin'], function(login, admin) {
  process.env.MAIL_URL = "smtp://6.470monkeys:6470m0nk3y@smtp.googlemail.com:465"
  "use strict";

  Teams = new Meteor.Collection('teams');

  var getQuestions = function(isBeginner) {
    var questions = {'html': new Array(),
                     'js': new Array(),
                     'sql': new Array()};
    var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'footprint', 'photo', 'BONUS'];
    var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
    
    var pointValues = [7, 10, 10, 14, 15, 20, 24, 0];
    var timelengths = [5, 5,  5,  5,  5,  5,  15, 0];
    for (var i = 1; i <= 8 ; i++) {
      questions['html'].push({id: i,
                             shorttitle: shortTitle[i-1],
                             title: longTitle[i-1],
                              time: undefined,
                              locked: !isBeginner,
                              points: pointValues[i-1],
                              file: 'html' + i,
                              timelength: timelengths[i-1],
                             solved: false});
    }

    // Unlock first 2 questions
    questions['html'][0]['locked'] = false;
    questions['html'][1]['locked'] = false;

    var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'footprint', 'photo', 'BONUS'];
    var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
    
    var pointValues = [7, 10, 10, 14, 15, 20, 24, 0];
    var timelengths = [5, 5,  5,  5,  5,  5,  15, 0];
    for (var i = 1; i <= 8 ; i++) {
      questions['js'].push({id: i,
                            shorttitle: shortTitle[i-1],
                            title: longTitle[i-1],
                            time: undefined,
                            locked: !isBeginner,
                            points: pointValues[i-1],
                            file: 'js' + i,
                            timelength: timelengths[i-1],
                            solved: false});
    }

    // Unlock first 2 questions
    questions['js'][0]['locked'] = false;
    questions['js'][1]['locked'] = false;

    var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'footprint', 'photo', 'BONUS'];
    var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
    
    var pointValues = [7, 10, 10, 14, 15, 20, 24, 0];
    var timelengths = [5, 5,  5,  5,  5,  5,  15, 0];
    for (var i = 1; i <= 8 ; i++) {
      questions['sql'].push({id: i,
                            shorttitle: shortTitle[i-1],
                            title: longTitle[i-1],
                            time: undefined,
                            locked: !isBeginner,
                            points: pointValues[i-1],
                            file: 'sql' + i,
                            timelength: timelengths[i-1],
                            solved: false});
    }

    // Unlock first 2 questions
    questions['sql'][0]['locked'] = false;
    questions['sql'][1]['locked'] = false;

    return questions;
  }

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

    // Accounts.validateNewUser(function (user) {
    //   var loggedInUser = Meteor.user();

    //   // if (Roles.userIsInRole(loggedInUser, ['admin'])) {
    //   //   return true;
    //   // }

    //   throw new Meteor.Error(403, "Not authorized to create new users");
    // });

    Meteor.methods({
      checkoffHTML: function(id, questionID, user) {
        console.log('html checkoff');
        admin.checkoffHTML(id, questionID, user);
      },
      checkoffJS: function(id, questionID, user) {
        admin.checkoffJS(id, questionID, user);
      },
      checkoffSQL: function(id, questionID, user) {
        admin.checkoffSQL(id, questionID, user);
      },
      newTeam: function(info) {
        login.register(info);
      },
      unlockHTML: function(id, question) {
        var questionID = parseInt(question) + 1;
        Teams.update({_id:id, "contest.html.file": "html" + questionID},
                     {$set: {"contest.html.$.locked": false}});
      },
      unlockJS: function(id, question) {
        var questionID = parseInt(question) + 1;
        Teams.update({_id:id, "contest.js.file": "js" + questionID},
                     {$set: {"contest.js.$.locked": false}});
      },
      unlockSQL: function(id, question) {
        var questionID = parseInt(question) + 1;
        Teams.update({_id:id, "contest.sql.file": "sql" + questionID},
                     {$set: {"contest.sql.$.locked": false}});
      },
      updateStatus: function(newstatus, user) {
        if (Roles.userIsInRole(user, ["admin"])) {
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
        }
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
});
