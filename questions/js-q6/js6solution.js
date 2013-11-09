$(function() {
  var elephant = document.createElement('img');
  $(elephant).attr('src', 'domephant.png');
  $(elephant).css('position', 'absolute');
  $(elephant).css("left", 0);
  $(elephant).css("top", 0);
  $('body').append(elephant);
  var is_left = true; //facing left

  $(document).keydown(function(e){
    if (e.keyCode == 37) {//left
      $(elephant).animate({left: "-=5"}, 1);
      if(!is_left){
        flip_left(elephant);
        is_left = true;
      }
    }
    else if(e.keyCode == 38){//up
      $(elephant).animate({top: "-=5"}, 1);
    }
    else if(e.keyCode == 39){//right
      $(elephant).animate({left: "+=5"}, 1);
      if(is_left){
        flip_right(elephant);
        is_left = false;
        console.log(is_left);
      }
    }
    else if(e.keyCode == 40){//down
      $(elephant).animate({top: "+=5"}, 1);
    }
    else{
      console.log("Unhandled key press");
    }
  });
});

var flip_right = function(image){
  $(image).css("-webkit-transform", "scaleX(-1)");
  $(image).css("transform", "scaleX(-1)");
  $(image).css("filter", "FlipH");
}

var flip_left = function(image){
  $(image).css("-webkit-transform", "scaleX(1)");
  $(image).css("transform", "scaleX(1)");
  $(image).css("filter", "FlipH");
}