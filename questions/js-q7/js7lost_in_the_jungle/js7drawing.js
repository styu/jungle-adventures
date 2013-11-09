$(function () {
    var gray = 'rgb(200,200,200)';
    var black = 'rgb(0,0,0)';

    // color grid cells black
    var nocolor = function(elem){
        elem.css('background-color', black);
    };

    // color grid cells white
    var color = function(elem){
        elem.css('background-color', gray);
    }

    // define the paint function to redraw the current state of the board
    var paint = function(grid){
        var table = $("<table></table>");
        var tbody = $("<tbody></tbody>");
        // loop through the table and recolor the table cells
        for (var i = 0; i < grid.length; i++) {
            var row = $("<tr></tr>");
            for (var j = 0; j < grid[i].length; j++) {
                var new_cell = $("<td class='cell'></td>"); 
                if (grid[i][j] === 1) {
                    color(new_cell);
                } else {
                    nocolor(new_cell);
                }
                row.append(new_cell);
            }
            tbody.append(row);
        }
        table.append(tbody);
        $("body").append(table);
        $("body").append("<br/>");
    };

    paint(grid);
});