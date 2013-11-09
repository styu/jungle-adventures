console.log('hey');

var wtf = function(start, end, grid, currentpath) {

	var returnSpot = function(locx, locy, grid){
		if (grid[locx]){
			return grid[locx][locy]
		} 
		return undefined;
	}
	
	var whereGo = function(locx, locy, grid) {
		possibleNext = []
		
		if (returnSpot(locx+1,locy,grid) %2 == 0) possibleNext.push([locx+1, locy])
		if (returnSpot(locx-1,locy,grid) %2 == 0) possibleNext.push([locx-1, locy])
		if (returnSpot(locx,locy+1,grid) %2 == 0) possibleNext.push([locx, locy+1])
		if (returnSpot(locx,locy-1,grid) %2 == 0) possibleNext.push([locx, locy-1])
		return possibleNext
	}
	
	nextloclist = whereGo(start[0], start[1], grid)
	for (i in nextloclist) {
		coords = nextloclist[i]	
		if (coords[0] == end[0] && coords[1] == end[1]) {
			console.log('pathfound')
			return 1
		} else {
		
		} 
	}
}

start = [0,0]
end =[2,2]
grid = [[0,0,0],[0,1,0],[0,0,0]];
wtf(start, end, grid, []);