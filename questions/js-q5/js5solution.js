$(document).ready(function() {
  $.post('http://6.470.scripts.mit.edu/jungleadventures/secret.php', function(data) {
    $('#secret-text-goes-here').text(data);
  });
});