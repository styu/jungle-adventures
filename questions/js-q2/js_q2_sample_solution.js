pattern = function(){
  isGeo = true;
  isAri = true;
  
  diff = arguments[1] - arguments[0];
  fact = arguments[1] / arguments[0];
  
  for (i in arguments) {
  	arg = arguments[i];
  	if (i != 0) {
	  	if (isGeo) {
	  	  	isGeo = fact == arg/arguments[(i-1)];
	  	}
	  	if (isAri) {
	  	  	isAri = diff == arg - arguments[(i-1)];
	  	}
  	}
  }
  
  newlist = [];
  if (isAri) {
    newlist.push(arguments[0]);
    for (i = 1; i < 10; ++ i){
      newlist.push(newlist[i-1] + diff);
    }
  } else if (isGeo) {
    newlist.push(arguments[0]);
    for (i = 1; i < 10; ++ i){
      newlist.push(newlist[i-1] * fact )
    }
  } else {
    for (i = 0; i < 10; ++ i){
      newlist[i] = arguments[i%arguments.length];
    }
  }
  return newlist;
}

//Tests
pattern(1,2,3);
pattern(2,4);
pattern(1.5,3,6);
pattern(-16,8,-4);
pattern(0,0,0);
pattern(1,4,9);