$(function () {
    // initialize the Life board
    var path_finder = PathFinder();

    // initialize timer object to play the simulation continuously
    var timer = undefined;

    var color = 'rgb(200,200,200)';
    var black = 'rgb(0,0,0)';

    // manipulate cell DOM element to have the color and class to indicate death
    var kill_cell = function(elem){
        elem.removeClass("alive");
        elem.css('background-color', black);
    };

    // manipulate cell DOM element to have the color and class to indicate life
    var revive_cell = function(elem){
        elem.addClass("alive");
        elem.css('background-color', color);
    }

        // // define the paint function to redraw the current state of the board
    var paint = function(currState){
        var div = $("<div></div>");
        var table = $("<table></table>");
        var tbody = $("<tbody></tbody>");
        // loop through the table and recolor the table cells
        for (var i = 0; i < currState.length; i++) {
            var row = $("<tr></tr>");
            for (var j = 0; j < currState[0].length; j++) {
                // color the table cells based on the Life object's board
                var new_cell = $("<td class='cell'></td>"); 
                new_cell.css("width", 3);
                new_cell.css("height", 3);
                if (currState[i][j] === 1) {
                    revive_cell(new_cell);
                } else {
                    kill_cell(new_cell);
                }
                row.append(new_cell);
            }
            tbody.append(row);
        }
        div.css("display", "inline-block");
        div.append(table);
        table.append(tbody);
        $("body").append(div);
    };

    // function to initialize the table element that will represent the grid of cells
    var init_dom = function(){
        var tbody = $("<tbody></tbody>");
        var currState = path_finder.container();
        // create a table of the same dimensions as the Life board 
        for (var i = 0; i < currState.length; i++) {
            var row = $("<tr></tr>");
            for (var j = 0; j < currState[0].length; j++) {
                // color the table cells based on the Life object's board
                var new_cell = $("<td class='cell'></td>"); 
                console.log("CELL");
                console.log(new_cell);
                if (currState[i][j] === 1) {
                    revive_cell(new_cell);
                } else {
                    kill_cell(new_cell);
                }
                row.append(new_cell);
            }
            tbody.append(row);
        }
        $("#canvas_container").append(tbody);
    };

    init_dom();
    var sol = path_finder.breadth_first_search(Vertex(0, 0), Vertex(11, 11));
    //pp(sol);
    for(var i = 0; i < sol.length; i++){
        console.log(sol[i]);
        var grid = makeGrid(sol[i].path);
        paint(grid);
    }
});

//sol is an array of path solutions
var pp = function(sol){
    for(var i = 0; i < sol.length; i++){
        sol[i].print();
    }
}


//sol is an array of vertices
var makeGrid = function(sol){
    var grid = new Array(12);
    for (var i = 0; i < 12; i++){
        grid[i] = new Array(12);
        for (var j = 0; j < 12; j++){
            grid[i][j] = 0; 
        }
    }
    for(var i = 0; i < sol.length; i++){
        grid[sol[i].x][sol[i].y] = 1;
    }
    return grid;
}