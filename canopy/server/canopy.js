(function () {

  process.env.MAIL_URL = "smtp://6.470monkeys:6470m0nk3y@smtp.googlemail.com:465"
  "use strict";

  Teams = new Meteor.Collection('teams');

  var getQuestions = function(isBeginner) {
    var questions = {'html': new Array(),
                     'js': new Array(),
                     'sql': new Array()};
                     
// HTML //////////////////////////////////////////

    var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'responsive', 'photo', 'BONUS'];
    var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
    
    var pointValues = [7, 10, 10, 14, 15, 20, 24, 5];
    var timelengths = [5, 5,  5,  5,  5,  5,  5, 10];
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

// JAVASCRIPT //////////////////////////////////////////

    var shortTitle =  ['alert', 'pattern', 'button', 'arrows', 'ajax', 'moving', 'paths', 'meteor'];
    var longTitle =  ['Alert Jungle', 'Patterns', 'Button Mash', 'Flying Arrows', 'Interception', 'Moving Critters', 'Lost in the Jungle', 'Meteor Attack'];
    
    var pointValues = [10, 10, 10, 10, 10, 15, 15, 20];
    var timelengths = [5, 5,  5,  5,  5,  3,  3, 14];
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

// SQL //////////////////////////////////////////

    var shortTitle =  ['alert', 'pattern', 'button', 'arrows', 'ajax', 'moving', 'paths', 'meteor'];
    var longTitle =  ['Alert Jungle', 'Patterns', 'Button Mash', 'Flying Arrows', 'Interception', 'Moving Critters', 'Lost in the Jungle', 'Meteor Attack'];
    
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

  var getPoints = function(team, questionType) {
    var solved = _.filter(team.contest[questionType],
                           function(question) {
                            return question.solved;
                           });
    var points = _.map(solved, function(question) { return question.points; });
    if (points.length == 0) {
      return 0;
    }
    var sum = _.reduce(points, function(memo, points) {return memo + points; });
    return sum;
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
          {name:"Kim T",email:"toyk2a@mit.edu",roles:['admin']},
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
      checkoffHTML: function(id, questionID) {
        var team = Teams.findOne({_id:id});
        var question = team.contest.html[(questionID-1)];
        if (_.isNull(question.time)){
          var val = new Date();
        } else {
          var val = null;
        }
        Teams.update(
          {_id: id, "contest.html.id": parseInt(questionID)}, 
          {$set: 
            { "contest.html.$.time" : val,
              "contest.html.$.solved" : !question.solved}
        });

        var unlocked = [7, 17, 27, 41, 56, 56];
        team = Teams.findOne({_id:id});
        var totalpoints = getPoints(team, 'html');
        _.each(unlocked, function(points, index) {
          if ( points <= totalpoints) {
            Teams.update(
              {_id: id, "contest.html.id": parseInt(index + 3)}, 
              {$set: 
                { "contest.html.$.locked" : false}
            });
          } else {
            Teams.update(
              {_id: id, "contest.html.id": parseInt(index + 3)}, 
              {$set: 
                { "contest.html.$.locked" : true && !team.beginner}
            });
          }
        });
      },
      checkoffJS: function(id, questionID) {
        var team = Teams.findOne({_id:id});
        var question = team.contest.js[(questionID-1)];
        if (_.isNull(question.time)){
          var val = new Date();
        } else {
          var val = null;
        }
        Teams.update(
          {_id: id, "contest.js.id": parseInt(questionID)}, 
          {$set: 
            { "contest.js.$.time" : val,
              "contest.js.$.solved" : !question.solved}
        });

        var unlocked = [10, 20, 30, 40, 50, 65];
        team = Teams.findOne({_id:id});
        var totalpoints = getPoints(team, 'js');
        _.each(unlocked, function(points, index) {
          if ( points <= totalpoints) {
            Teams.update(
              {_id: id, "contest.js.id": parseInt(index + 3)}, 
              {$set: 
                { "contest.js.$.locked" : false}
            });
          } else {
            Teams.update(
              {_id: id, "contest.js.id": parseInt(index + 3)}, 
              {$set: 
                { "contest.js.$.locked" : true && !team.beginner}
            });
          }
        });
      },
      checkoffSQL: function(id, questionID) {
        var team = Teams.findOne({_id:id});
        var question = team.contest.js[(questionID-1)];
        if (_.isNull(question.time)){
          var val = new Date();
        } else {
          var val = null;
        }
        Teams.update(
          {_id: id, "contest.sql.id": parseInt(questionID)}, 
          {$set: 
            { "contest.sql.$.time" : val,
              "contest.sql.$.solved" : !question.solved}
        });

        var unlocked = [7, 17, 27, 41, 56];
        team = Teams.findOne({_id:id});
        var totalpoints = getPoints(team, 'sql');
        _.each(unlocked, function(points, index) {
          if ( points <= totalpoints) {
            Teams.update(
              {_id: id, "contest.sql.id": parseInt(index + 3)}, 
              {$set: 
                { "contest.sql.$.locked" : false}
            });
          } else {
            Teams.update(
              {_id: id, "contest.sql.id": parseInt(index + 3)}, 
              {$set: 
                { "contest.sql.$.locked" : true && !team.beginner}
            });
          }
        });
      },
      newTeam: function(info) {
        console.log('Creating new team: ' + info['teamname']);
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
          
          var role = info['beginner'] ? ['beginner'] : ['advanced'];
          Roles.addUsersToRoles(id, role);
        });
        if (info['members'].length > 0) {
          var questions = getQuestions(info['beginner']);
          Teams.insert({teamName: info['teamname'],
                        users: ids,
                        contest: {html: questions['html'],
                                  js: questions['js'],
                                  sql: questions['sql']},
                        beginner: info['beginner']});
        }
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
})();
