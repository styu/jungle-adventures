define('login', [], function() {
  var teamnameError = false;
  var teamnameErrorDep = new Deps.Dependency;
  return {
    register: function() {
      $('.newteam').css({opacity: 0.1});
      $('.newteam').attr('disabled','disabled');
      console.log('Creating new team');
      var info = {};
      var showButtonAgain = function(){
      
      	$('.newteam').css({opacity:1});
      	$('.newteam').removeAttr('disabled');
      }
      if ($('#teamname').val() !== '') {
        info['teamname'] = $('#teamname').val();
        info['members'] = [];
        for (var i = 1; i <= 3; i++) {
          if ($('#member' + i + 'name').val() !== '' && $('#member' + i + 'email').val() !== '') {
            var email = $('#member' + i + 'email').val();
            var name = $('#member' + i + 'name').val();
            info['members'].push({name: name, email: email});
          }
        }
        info['beginner'] = $('#beginnerteam').is(':checked');
        if (info['members'].length > 0) {
          Meteor.call('newTeam', info, function(err, res) {
            if (err) {
              teamnameError = true;
              teamnameErrorDep.changed();
              console.log(err);
              showButtonAgain();
            } else {
              console.log('Team Registered!');
              $('.register-box').text('Team Registered! Check your emails!');
            }
          });
        } else {
          console.log('error in form');
          showButtonAgain();
        }
      } else {
        console.log('error in form');
        showButtonAgain();
      }
    },
    teamnameError: function() {
      teamnameErrorDep.depend();
      return teamnameError;
    }
  }
});