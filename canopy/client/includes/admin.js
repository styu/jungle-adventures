define('admin', [], function() {
  var timer = 0;
  var timerDep = new Deps.Dependency;

  return {
    teams: function() {
      var teams = Teams.find().fetch(); 
      return _.sortBy(teams, function(team) {
        console.log(team.teamName);
	    return team.teamName.toUpperCase();
	  }); 
    },

    hasStarted: function() {
      if (Meteor.user() && Roles.userIsInRole(Meteor.user(), ["admin"])) {
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

    isSet: function(q, n) {
      if (n == 1){
        if (q == '1' || q == '2' || q == '3' || q == '4'){
        return true
        } else {
          return false
        }
      } else {
        if (q == '1' || q == '2' || q == '3' || q == '4'){
        return false
        } else {
          return true
        }
      }
    },

    currentQuestions: function(id) {
      var team = Teams.findOne({_id: id});
      // Restrict to contest
      var status = Status.findOne({title: "questionStatus"}).status;
      return team.contest[status];
    },

    checkoffClick: function(event, template) {
      console.log('checkoff');
      var $cur = $(event.currentTarget);
      var id = $cur.parent().attr('data-teamid');
      var questionId = $cur.attr('data-questionId');
      var questionType = $cur.attr('data-questionType');
      console.log(questionType);
      Meteor.call('checkoff' + questionType.toUpperCase(), id, questionId, Meteor.user());
    }
  }
});