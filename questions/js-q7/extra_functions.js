// Add function to Array.prototype to compare 2D arrays
// Will not work if an element of the 2D array was another array
// Unfortunately gets added to every level of an array
Array.prototype.compare2d = function(other){
    if(other.length != this.length)
        return false;
    for(var i = 0; i < this.length; i++){
        if(this[i].length != other[i].length)
            return false;
        for(var j = 0; j < this[i].length; j++){
            if(this[i][j] !== other[i][j])
                return false;
        }
    }
    return true;
}

// Add clone functionality for multidimensional arrays
Array.prototype.deepClone = function(){
    var arrays = this.slice(0);
    for(var i = 0; i < this.length; i++) {
        if(this[i].deepClone) {
            //recursively clone
            arrays[i] = this[i].deepClone();
        }
    }
    return arrays;
}

Array.prototype.contains = function(thing){
    for(var i = 0; i < this.length; i++) {
        if(this[i].compare(thing)) {
            return true;
        }
    }
}
