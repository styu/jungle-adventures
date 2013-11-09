define('questions', [], function() {
  return {
    getQuestions: function(isBeginner) {
      var questions = {'html': new Array(),
                   'js': new Array(),
                   'sql': new Array()};
                     
// HTML //////////////////////////////////////////

    var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'responsive', 'photo', 'BONUS'];
    var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Responsive', 'Photography', 'BONUS'];
    
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

    var shortTitle =  ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];
    var longTitle =  ['Finder', 'Sourcery', 'Profiles', 'Cross Country', 'Poison Syringe', 'A and B'];
    
    var pointValues = [10, 12, 15, 18, 20, 25];
    var timelengths = [3, 5,  7,  10,  10,  10];
    for (var i = 1; i <= 6 ; i++) {
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
  }
});