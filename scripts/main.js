var randInt = function (min, max) {
  return Math.floor((Math.random() * (max - min)) + min);
}


require({
  baseUrl: './',
  paths: {
    'physicsjs': 'scripts/physicsjs-full',
    'jquery': 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min'
  }
}, [
  'jquery',
  'physicsjs'
], function (
  $,
  Physics
) {





	
  console.log('creating a physics world');
  Physics(function (world) {
  
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function () {
        tilt([event.beta, event.gamma]);
    }, true);
	} else if (window.DeviceMotionEvent) {
	    window.addEventListener('devicemotion', function () {
	        tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
	    }, true);
	} else {
	    window.addEventListener("MozOrientation", function () {
	        tilt([orientation.x * 50, orientation.y * 50]);
	    }, true);
	}



    var viewWidth = $(document).width();
    var viewHeight = 300;

    var renderer = Physics.renderer('canvas', {
      el: 'c',
      width: viewWidth,
      height: viewHeight,
      meta: false, // don't display meta data
    });
    rigidConstraints = Physics.behavior('rigid-constraint-manager', {
      targetLength: 1
    })
    // the "basket"
    var basket = [];
    MAX_SEG = 100;
    bmax = 12
    start = 0
    for (var b = 0; b < bmax; b += 1) {
      SCALE = MAX_SEG / randInt(8, 11);
      console.log(randInt(5, 11));
      dist = Math.random()*1.1 + 0.4
      distaway = randInt(6, 100);
      mid = MAX_SEG / SCALE / 2

      for (var i = 0; i < MAX_SEG; i += 1) {

        l = basket.push(
          Physics.body('circle', {
            x: i * dist + 40 + b * distaway,
            y: -Math.pow(i / SCALE - mid, 2) + (mid * mid),
            radius: 0,
            restitution: 0,
            mass: .5,
            hidden: true
          })
        );
        //console.log(Math.pow(i/10 - 3,2));
        rigidConstraints.constrain(basket[l - 1], basket[l - 2]);
      }

      basket[start].fixed = true;
      basket[l - 1].fixed = true;
      start = l;
      //console.log(l)
    }

    basket[0].hidden = false;
    basket[l - 1].hidden = false;

    world.add(basket);




    world.subscribe('render', function (data) {

      var renderer = data.renderer;
      for (var i = 1, l = basket.length; i < l; ++i) {
        if ((i) % 100 != 0) {
          renderer.drawLine(basket[i - 1].state.pos, basket[i].state.pos, {
            strokeStyle: '#8a9c8c',
            lineWidth: 5
          });
        }
      }
    });
    // fix the ends


    lineConstraints = Physics.behavior('rigid-constraint-manager', {
      targetLength: 4
    })
    
    //NOW GENERATE THE SINGLE LINE THINGS
    var falllineCollection = []
    for (var f = 0; f < viewWidth/20; f += 1){
    	var fallline = []
    	distRand = randInt(0,100);
    	lengthRand = randInt(10,150)
	    for (var i = 0; i < lengthRand; i += 4) {
	      l = fallline.push(
	        Physics.body('circle', {
	          x: 40*f+distRand,
	          y: i,
	          radius: 0,
	          restitution: 0,
	          mass: .5,
	          hidden: true
	        })
	      );
	      //console.log(Math.pow(i/10 - 3,2));
	      lineConstraints.constrain(fallline[l - 1], fallline[l - 2]);
	    }
	    fallline[0].fixed = true;
	    falllineCollection.push(fallline)
    }

    world.subscribe('render', function (data) {

      var renderer = data.renderer;
      for (var f = 0; f < falllineCollection.length; ++f) {
      	fallline = falllineCollection[f];
	      for (var i = 1, l = fallline.length; i < l; ++i) {
	        renderer.drawLine(fallline[i - 1].state.pos, fallline[i].state.pos, {
	          strokeStyle: '#8a9c8c',
	          lineWidth: 5
	        });
	      }
	      
	    }
    });


    // add the renderer
    world.add(renderer);
    world.add(rigidConstraints);
    world.add(lineConstraints);

    // render on each step
    world.subscribe('step', function () {
      world.render();
    });

    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // ensure objects bounce when edge collision is detected
    world.add(Physics.behavior('body-impulse-response'));

    // add some gravity 

    var gravity = Physics.behavior('constant-acceleration', {
      acc: {
        x: 0.00001,
        y: 0.0002
      } // this is the default
    });

    world.add(gravity);
    
    
		var tilt = function(x){
			xval = x[1]/100000;
			gravity.setAcceleration({ x: xval, y: 0.0004 });
		}
		
    for (var f = 0; f < falllineCollection.length; ++f) {
      world.add(falllineCollection[f]);
    }



    // subscribe to ticker to advance the simulation
    Physics.util.ticker.subscribe(function (time, dt) {
      world.step(time);
    });

    // start the ticker
    Physics.util.ticker.start();

  });

});