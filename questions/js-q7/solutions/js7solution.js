PathFinder = function(){

    // create Life object with the prototype Life.prototype
    var that = Object.create(PathFinder.prototype);

    var grid =   [[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
                  [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
                  [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
                  [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1],
                  [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
                  [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
                  [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1]];

    // function to return current state of Life board
    that.container = function(){
        return grid.deepClone();
    },
    // return the number of live neighboring cells
    that.countNeighbors = function(vertex){
        var queue = [];
        var neighborLocs_x = [-1, 0, 1, 0];
        var neighborLocs_y = [0, -1, 0, 1]
        var aliveNeighbors = 0;
        var x = vertex.x;
        var y = vertex.y;
        for (var i = 0; i < neighborLocs_x.length; i++){
          if(that.validLocation(x + neighborLocs_x[i]) && that.validLocation(y + neighborLocs_y[i])){
                  if(grid[x + neighborLocs_x[i]][y + neighborLocs_y[i]]===1){ 
                      queue.push(Vertex(x + neighborLocs_x[i], y + neighborLocs_y[i]));
                   }
          }
        }
        return queue;
    },

    that.breadth_first_search = function(vertex, sol){
      var queue = [];
      var set = [];
      var numPaths = 0;
      var solutions = [];
      queue.push(Path([vertex])); 
      set.push(Path([vertex])); 
      while(queue.length>0){
        var t = queue.shift(); //get a path
        if(sol.compare(t.get_last_vertex_in_path())){ //fix
          console.log("I WIN");
          numPaths++;
          solutions.push(t);
          //return numPaths;
        }
        else{
          //get neighboring vertices
          var next_vertices = [];
          var last_vertex = t.get_last_vertex_in_path();
          if(last_vertex !== null){
            var neighbors = that.countNeighbors(last_vertex);
            for(var i = 0; i < neighbors.length; i++){
              if(!t.contains_vertex(neighbors[i]))
                next_vertices.push(neighbors[i]);
            }
          }
          //add new paths to set
          for(var i = 0; i < next_vertices.length; i++){ //fix
            var new_path = t.clone();
            new_path.append(next_vertices[i]);
            if(!set.contains(new_path)){
              set.push(new_path);
              queue.push(new_path);
            }
          }
          
        }//end else
      }
      return solutions;
    },
    // returns true if (x, y) is a valid location
    that.validLocation = function(x, y){
        if(0 > x || x >= grid.length || 0 > y || y >= grid[0].length){
            return false;
        }
        return true;
    }
    
    // prevent object slots from being overwritten
    Object.freeze(that);
    return that;
}

Vertex = function(x, y){
  var that = Object.create(Vertex.prototype);
  that.compare = function(v){
    if(v !==null){
      if(v.x == x && v.y == y){
        return true;
      }
    }
    return false;
  },
  that.to_string = function(){
    return "V (" + x + ","+ y+")";
  }
  that.x = x;
  that.y = y;
  Object.freeze(that);
  return that;
}

Path = function(vertex_list){
  var that = Object.create(Path.prototype);
  that.path = vertex_list;//list of vertices

  that.compare = function(other_path){
    // console.log("comparing");
    // console.log(that.path);
    // console.log(other_path.path);
    if(other_path.path.length === that.path.length){
      for(var i = 0; i < other_path.path.length; i++){
        if(!other_path.path[i].compare(that.path[i]))
          return false;
      }
      return true;
    }
    return false;
  },
  that.clone = function(){
    return Path(this.path.deepClone());
  },
  that.append = function(vertex){
    that.path.push(vertex);
  }, 
  that.contains_vertex = function(vertex){
    for(var i = 0; i < this.path.length; i++){
      if(this.path[i].compare(vertex))
        return true;
    }
    return false;
  },
  that.get_last_vertex_in_path = function(){
    if(that.path.length>0){
      return that.path[that.path.length-1];
    }
    return null;
  },
  that.to_string = function(){
    var ts = "";
    for(var i = 0; i< that.path.length; i++){ 
      ts += " " + that.path[i].to_string();
    }
    return ts;
  },
  that.print = function(){
    console.log('PATH');
    //console.log(that.to_string());
    console.log(that.path.length);
  }
  Object.freeze(that);
  return that;
}