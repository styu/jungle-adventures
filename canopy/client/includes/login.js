define('login', [], function() {
  return {
    register: function() {
      console.log('Creating new team');
      var info = {};
      if ($('#teamname').val() !== '') {
        info['teamname'] = $('#teamname').val();
        info['members'] = [];
        for (var i = 1; i <= 3; i++) {
          if ($('#member' + i + 'name').val() !== '' && $('#member' + i + 'email').val() !== '') {
            var email = $('#member' + i + 'email').val();
          }
        }
        info['beginner'] = $('#beginnerteam').is(':checked');
        if (info['members'].length > 0) {
          Meteor.call('newTeam', info, function(err, res) {
            if (err) {
              console.log('error in form');
            }
          });
        } else {
          console.log('error in form');
        }
      } else {
        console.log('error in form');
      }
    }
  }
});