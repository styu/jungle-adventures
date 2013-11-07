$(function() {

  var arrow_timer = setInterval(function(){
    var start_vel = 40*Math.random() + 40;
    var start_y = Math.random()*100;
    var a = Arrow(0.0, start_y, start_vel, $(window).width(), $(window).height());
    var timer = setInterval(function(){
      if(a.step()){
        clearInterval(timer);
      }
    },200);
  }, 400);

});

Arrow = function(startx, starty, startvel, windowx, windowy){
  var h_velocity = startvel;
  var pos_x = startx;
  var pos_y = starty;
  var vel_y = 0.0;
  var gravity = 10;
  var rotation = 0;

  var that = Object.create(Arrow.prototype);
  that.arrow = document.createElement('img');
  $(that.arrow).attr('src', 'arrow.png');
  $(that.arrow).css('position', 'absolute');
  $(that.arrow).css('top', pos_y);
  $(that.arrow).css('left', pos_x);
  $('body').append(that.arrow);

  that.step = function(){
    vel_y += gravity*1.1;
    pos_x += h_velocity;
    pos_y += vel_y*1.1;
    rotation += vel_y/8;
    $(that.arrow).css('top', pos_y);
    $(that.arrow).css('left', pos_x);
    $(that.arrow).css('-webkit-transform', 'rotate('+rotation+'deg)');
    if(pos_x > windowx || pos_y > windowy-100){
      return true;
    }
    else{
      return false;
    }
  }
  return that;

}