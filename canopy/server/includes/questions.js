define('questions', [], function() {
  return {
    getQuestions: function(isBeginner) {
      var questions = {'html': new Array(),
                       'js': new Array(),
                       'sql': new Array()};
      var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'footprint', 'photo', 'BONUS'];
      var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
      
      var pointValues = [7, 10, 10, 14, 15, 20, 24, 0];
      var timelengths = [5, 5,  5,  5,  5,  5,  15, 0];
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

      var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'footprint', 'photo', 'BONUS'];
      var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
      
      var pointValues = [7, 10, 10, 14, 15, 20, 24, 0];
      var timelengths = [5, 5,  5,  5,  5,  5,  15, 0];
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

      var shortTitle =  ['hello', 'badge', 'folder', 'table', 'compass', 'footprint', 'photo', 'BONUS'];
      var longTitle =  ['Hello Jungle', 'Badger Badge', 'Mission Report', 'Shopping List', 'Some Compass', 'Footprints', 'Photography', 'BONUS'];
      
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
  }
})