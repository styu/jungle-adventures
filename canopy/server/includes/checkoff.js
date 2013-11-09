define('checkoff', [], function() {

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

  return {
    checkoffHTML: function(id, questionID, user) {
      console.log(user);
      console.log(Roles.userIsInRole(user, ["admin"]));
      if (Roles.userIsInRole(user, ["admin"])) {
        console.log('hello');
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

        var unlocked = [7, 17, 27, 41, 56, 60];
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
      }
    },
    checkoffJS: function(id, questionID, user) {
      if (Status.findOne({title: 'questionStatus'}).status === 'js' ||
          Roles.userIsInRole(user, ['beginner']) ||
          Roles.userIsInRole(user, ['admin'])) {
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
          }
        );

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
      }
    },
    checkoffSQL: function(id, questionID, user) {
      if (Roles.userIsInRole(user, ["admin"])) {
        var team = Teams.findOne({_id:id});
        var question = team.contest.sql[(questionID-1)];
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

        var unlocked = [10, 22, 37, 55];
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
      }
    }
  }
});