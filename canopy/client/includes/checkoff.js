define('checkoff', [], function() {
  var inARow = 0;
  return {
    js2: function (event, template) {
      var usercode = $('.js2textarea').val();
      var error = "";
      eval(usercode); // This is the Scariest Function Ever
      console.log("hello" + pattern);
      console.log(typeof(pattern));
      
      var checkEquals = function(a, b) {
      console.log(a)
      console.log(b)
        if (a.length != b.length) return false;
        for (i in a){
          if (a[i] != b[i]) return false;
        }
        return true;
      }
      
      var good = true;
      if (typeof(pattern) === "function") {
        if (!checkEquals(pattern(1,2,3), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])){
            error += "<span class='testfailed'>Failed Test1: pattern(1,2,3)</span> You output: " + pattern(1,2,3) + " <br />";

            good = false;
          } else {
            error += "Passed Test1<br />";
          } 
          
          if (!checkEquals(pattern(2,4,6,8), [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] )){
            error += "<span class='testfailed'>Failed Test2: pattern(2,4,6,8)</span> You output: " + pattern(2,4,6,8) + " <br />";
            good = false;
          } else {
            error += "Passed Test2<br />";
          } 
          
          if (!checkEquals(pattern(1.5,3,6,12), [1.5, 3, 6, 12, 24, 48, 96, 192, 384, 768] )) {
            error += "<span class='testfailed'>Failed Test3:  pattern(1.5,3,6,12)</span> You output: " + pattern(1.5,3,6,12) + " <br />";
            good = false;
          } else {
            error += "Passed Test3<br />";
          } 
          
          if (!checkEquals(pattern(0,0,0), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] )) {
            error += "<span class='testfailed'>Failed Test4: pattern(0,0,0)</span> You output: " + pattern(0,0,0) + " <br />";
            good = false;
          } else {
            error += "Passed Test4<br />";
          } 
          
          if (!checkEquals(pattern(1,4,5), [1, 4, 5, 1, 4, 5, 1, 4, 5, 1] )) {
            error += "<span class='testfailed'>Failed Test5: pattern(1,4,5)</span> You output: " + pattern(1,4,5) + " <br />";
            good = false;
          } else {
            error += "Passed Test5<br />";
          } 
          
          if (!checkEquals(pattern(2,4,8, 16, 9), [2,4,8, 16, 9,2,4,8, 16, 9] )) {
            error += "<span class='testfailed'>Failed Test6: pattern(2,4,8,16,9)</span> You output: " + pattern(2,4,8, 16, 9) + " <br />";
            good = false;
          } else {
            error += "Passed Test6<br />";
          } 
        
      } else {
        good = false;
        error = "pattern is not a function";
      }
      
      if (good){
        $('.js2output').html('PASS!');
        //Meteor.call("unlockJS", Teams.findOne({teamName: Meteor.user().profile.team})._id, 1);
        id =  Teams.findOne({teamName: Meteor.user().profile.team})._id
        Meteor.call('checkoffJS', id, 2, undefined);
      } else {
        $('.js2output').html(error);
      }
    },

    js3: function(event, template){
  var $cur = $(event.currentTarget);
  if ($cur.attr('class') === 'js3submit'){
    eval($('.js3textarea').val());
  } else {
          shouldClick = $('.should-click').text();
          if ($cur.attr('class')[1] == shouldClick){
                  ++ inARow;
          } else {
                  inARow = 0;
          }
          shouldClick = Math.round(Math.random());
          $('.should-click').text(shouldClick);
          $('.inarow').text(inARow);
          if (inARow >= 1000) {
            inARow = 0;
            console.log("YOU DID IT!");
            $('.js3controls').append('<br />PASS!');
            id =  Teams.findOne({teamName: Meteor.user().profile.team})._id
        Meteor.call('checkoffJS', id, 3, undefined);
      }
    }
    }
  }
});