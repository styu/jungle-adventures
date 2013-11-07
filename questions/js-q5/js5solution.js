$(function() {
  $.ajax({
    url:"http://localhost3000/secret.txt",
    success:function(result){
      console.log(result);
      $("#secret-text-goes-here").html(result);
    }
  });
});