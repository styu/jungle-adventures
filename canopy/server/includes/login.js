define('login', ['questions'], function(questions) {
  return {
    register: function(info) {
      console.log('Creating new team: ' + info['teamname']);
      var ids = [];
      if (_.isUndefined(Teams.findOne({teamName: info['teamname']}))) {
        _.each(info['members'], function(member) {
          if (_.isUndefined(Meteor.users.findOne({'emails.address': member.email}))) {
            var id,
              user;

            var password = Math.random().toString(36).substring(2, 7);
            id = Accounts.createUser({
              email: member.email,
              password: password,
              profile: { name: member.name, team: info['teamname'] }
            });
            // email verification
            console.log('sending email to...' + member.name + ' ' + member.email + ' ' + password);
            Email.send({
              to: member.email,
              from: '6470-staff@mit.edu',
              replyTo: '6470-staff@mit.edu',
              subject: 'Your 6.470 Jungle Adventures Account',
              html: 'Hello ' + member.name + ',<br /><br />' +
                    'Your JungleAdventures Account has been created. Please login to with your email and the following password: ' + password + '<br /><br />' +
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
          var q = questions.getQuestions(info['beginner']);
          Teams.insert({teamName: info['teamname'],
                        users: ids,
                        contest: {html: q['html'],
                                  js: q['js'],
                                  sql: q['sql']},
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