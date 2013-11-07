define('login', [], function() {
  return {
    register: function() {
      console.log('Creating new team: ' + info['teamname']);
      var ids = [];
      if (!_.isUndefined(Teams.findOne({teamName: info['teamname']}))) {
        _.each(info['members'], function(member) {
          if (!_.isUndefined(Meteor.users.findOne({'emails.address': member.email}))) {
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
          }
        });
        if (info['members'].length > 0) {
          var questions = getQuestions(info['beginner']);
          Teams.insert({teamName: info['teamname'],
                        users: ids,
                        contest: {html: questions['html'],
                                  js: questions['js'],
                                  sql: questions['sql']},
                        beginner: info['beginner']});
        } else {
          throw "No members!";
        }
      } else {
        throw "Team name already exists";
      }
    }
  }
});