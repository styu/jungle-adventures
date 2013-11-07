require(['timer', 'admin'], function(timer, admin) {
  Router.map(function() {
    this.route('home', {
      path: '/',
      layoutTemplate: 'home',

      waitOn: function() {
        return [Meteor.subscribe('status'),
                Meteor.subscribe('teams')];
      },

      before: function() {
        if (!Meteor.user()) {
          this.render('login', {to: 'main'});
          Accounts._loginButtonsSession.set('dropdownVisible', true);
          this.stop();
        } else if (Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
          this.redirect('/admin');
        }
      },

      data: function() {
        return {
          timer: function() {
            return timer.timer();
          },
          teamname: function() {
            return Meteor.user().profile.team;
          },
          score: function() {
            var questions = ['html', 'js', 'sql'];
            var solved = [];
            var team = Teams.findOne({teamName: Meteor.user().profile.team});
            var sum = 0;
            _.each(questions, function(questionType) {
              var solved = _.filter(team.contest[questionType],
                                   function(question) {
                                    return question.solved;
                                   });
              var points = _.map(solved, function(question) { return question.points; });
              if (points.length != 0) {
                sum += _.reduce(points, function(memo, points) {return memo + points; });
              }
            });
            return sum;
          }
        }
      },

      action: function() {
        this.render('content', {to: 'main'});
      },

      after: function() {
        Meteor.setInterval(timer.updateTimer, 1000);
      }
    });

    this.route('admin', {
      layoutTemplate: 'home',

      waitOn: function() {
        return [Meteor.subscribe('status'),
                Meteor.subscribe('teams')];
      },

      data: function() {
        return {
          teams: function() { return admin.teams(); },
          hasStarted: function() { return admin.hasStarted(); },
          currentStartTime: function() { return admin.currentStartTime(); }
        }
      },

      before: function() {
        if (!Meteor.user()) {
          this.render('login', {to: 'main'});
          Accounts._loginButtonsSession.set('dropdownVisible', true);
          this.stop();
        } else if (!Roles.userIsInRole(Meteor.user()._id, ['admin'])) {
          this.render('authorized', {to: 'main'});
          this.stop();
        }
      },

      action: function() {
        this.render('admin', {to: 'main'});
      }
    });

    this.route('scoreboard', {
      layoutTemplate: 'home',

      waitOn: function() {
        return [Meteor.subscribe('status'),
                Meteor.subscribe('teams')];
      },

      before: function() {
        if (!Meteor.user()) {
          this.redirect('/');
          this.stop();
        }
      },

      action: function() {
        this.render('scoreboard', {to: 'main'});
      }
    })
  });
});