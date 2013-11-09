// Anonymous function to initialize drawing pad and draw Life board
// on the index page
// Author: Kimberly Toy

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
                if (currState[j][i] === 1) {
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
    pp(sol);
    //console.log(life.breadth_first_search(Vertex(0, 0), Vertex(2, 2)));


    // // define the paint function to redraw the current state of the board
    // var paint = function(){
    //     var currState = life.container();
    //     var tbody = $("#canvas_container").find("tbody");
    //     // loop through the table and recolor the table cells
    //     for (var i = 0; i < grid_y; i++) {
    //         for (var j = 0; j < grid_x; j++) {
    //             if (currState[j][i] === true) {
    //                 revive_cell(tbody.find('tr').eq(i).find('td').eq(j));
    //             } else {
    //                 kill_cell(tbody.find('tr').eq(i).find('td').eq(j));
    //             }
    //         }
    //     }
    // };

    // // clear the grid display to show a blank board
    // // this does not clear the board in the Life object
    // var clear = function(){
    //     var tbody = $("#canvas_container").find("tbody");
    //     for (var i = 0; i < grid_y; i++) {
    //         for (var j = 0; j < grid_x; j++) {
    //             kill_cell(tbody.find('tr').eq(i).find('td').eq(j));
    //         }
    //     }
    // };

    // // define repaint to clear and redraw the board
    // // if the board has reached endgame, pause the simulation if the timer is running
    // var repaint = function(){
    //     // refresh the Life object if the user has painted cells in the grid
    //     if(user_changed_board){
    //         player_init_board();
    //         user_changed_board = false;
    //     }
    //     var endgame = life.step();
    //     paint();
    //     if(endgame){
    //         if(timer !== undefined){
    //             pause();
    //         }
    //     }
    // };

    // // construct a new Life board and redraw the simulation
    // // if the timer is still running, leave it on "play" mode
    // var reset = function(){
    //     life = Life(64, 40, 0.4);
    //     repaint();
    // };

    // // reinitialize the Life object to match the UI grid
    // // called when the user paints new cells on the board
    // var player_init_board = function(){
    //     var tbody = $("#canvas_container").find('tbody');
    //     // create a fresh 2D array
    //     var grid = new Array(grid_x);
    //     for (var i = 0; i< grid_x; i++) {
    //         grid[i] = new Array(grid_y);
    //     }
    //     // iterate through the UI grid to get the current board setup
    //     for (var i = 0; i < grid_y; i++) {
    //         for (var j = 0; j < grid_x; j++) {
    //             if (tbody.find('tr').eq(i).find('td').eq(j).hasClass("alive")) {
    //                 grid[j][i] = true;
    //             } else {
    //                 grid[j][i] = false;
    //             }
    //         }
    //     }
    //     // create a new Life object with the same conditions as displayed in the UI
    //     life = Life(0, 0, 0, grid);
    // };

    // // start the timer for continuous play
    // var play = function(){
    //     timer = setInterval(repaint, 250);
    //     // switch the play button to a pause button
    //     document.getElementById("play").innerHTML = "Pause";
    //     document.getElementById("play").id = "pause";
    //     // add event listener to pause button
    //     document.getElementById("pause").removeEventListener("click", play, false);
    //     document.getElementById("pause").addEventListener("click", pause, false);
    // };

    // // stop the timer
    // var pause = function(){
    //     clearInterval(timer);
    //     timer = undefined;
    //     // switch pause button to play
    //     document.getElementById("pause").innerHTML = "Play";
    //     document.getElementById("pause").id = "play";
    //     // add event listener back to play button
    //     document.getElementById("play").removeEventListener("click", pause, false)
    //     document.getElementById("play").addEventListener("click", play, false);
    // };

    // /************************** ADD EVENT LISTENERS ************************************/

    // // add event listeners to the grid UI to allow the user to paint cells on the board
    // // the user is only able to paint cells when the animation is not playing continuously
    // $('#canvas_container').mousedown(function(e){
    //     e.originalEvent.preventDefault();
    //     if(timer === undefined){
    //         $('.cell').bind('mouseover', function(){
    //             revive_cell($(this));
    //             user_changed_board = true;
    //         });
    //     }
    // }).mouseup(function(){
    //     $('.cell').unbind('mouseover');
    // });

    // $(document).on('mousedown', '.cell', function() { 
    //     if(timer === undefined){
    //         revive_cell($(this));
    //         user_changed_board = true;
    //     }
    // });

    // // add color event listener
    // $('.color').click(function(){
    //     color = $(this).css('background-color');
    //     $('.alive').css('background-color', color);
    // });

    // // add event listener to random button
    // var random_button = document.getElementById("random");
    // random_button.addEventListener("click", reset, false);

    // // add event listener to clear board so the player can draw their own pattern
    // var clear_button = document.getElementById("clear");
    // clear_button.addEventListener("click", clear, false);

    // // add event listener to step button 
    // var step_button = document.getElementById("nextstep");
    // step_button.addEventListener("click", repaint, false);

    // // add event listener to play button
    // var play_button = document.getElementById("play");
    // play_button.addEventListener("click", play, false);

});

//sol is an array of path solutions
var pp = function(sol){
    for(var i = 0; i < sol.length; i++){
        sol[i].print();
    }
}