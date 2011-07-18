sys = require 'sys'

class StarBoard
    cell =
        WALL: '#'
        BALL: '@'
        CUBE: 'H'
        VOID: ' '
        GIFT: 'x'

    direction =
        UP: 38
        DOWN: 40
        LEFT: 37
        RIGHT: 39

    collected_gifts = 0
    distance_travelled = 0
    moving_actor = cell.BALL

    height = 9
    width = 16

    board = "#################@##        x#H##          x ####       ##x    ##   ## x      #### x  x     x  ## x      x## x ##     ##x     x#################"

    display =  ->
        sys.puts "Hello World!"

sb = new StarBoard
sb.display
