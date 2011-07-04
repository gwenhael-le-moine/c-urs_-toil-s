LEVEL_HEIGHT = 9;
LEVEL_WIDTH = 16;

cell= {
	WALL: '#',
	BALL: '@',
	CUBE: 'H',
	VOID: ' ',
	GIFT: 'x',
}
direction = {
	UP: 'u',
	DOWN: 'd',
	LEFT: 'l',
	RIGHT: 'r',
}
options = {
	starting_level: 0,
}
state = {
	moving: cell.BALL,
	moves: 0,
	level: 0,
	board: ""
}

levels = [ "#################@##        x#H##          x ####       ##x    ##   ## x      #### x  x     x  ## x      x## x ##     ##x     x#################",
           " #  # # #   # ###   x         @#   #x  #x   x   # # x     x  # #      #   x   # #    #H#  x    #   #  # #   #xx##             #  #  #        #  ",
           "#################           x#@##   ##      ##H##   #x     x   ## x     x##   x## #x  x  x#  x### ##x #x  x x####x    ##x      #################",
           "#################            #H##     #        ###x#x x#x#x#x#x## # #x x# # # ####x#x#x x#x#x#x##     #        ##   #       #@ #################",
           " ############## #@  #   #  #   ##  #x # x  x # ###      #  #   ##x #x#        ####     # x #   ##x#  # # #   #H##   #    x#  #x# ############## ",
           "    ############   #   x   #x x#  #    x    # ## #     x       ##@     x       ###     x  #   ###      x    #  ##H #   x  ##x  #################",
           "#################              # ## ###  #x ##x# #x  #x # # # #   #  #  ### ##   ##  #  #x# #x# #              ##  @#x    H  #x#################",
           "############### #  x##        ###  #x  ## x    ##  x## # #x    ###     ##  #x# ### #       x#x ##xHx#   x  #@# ###             # ###############",
           "  # ###########  #x#x      #  @##x x#    x    #  # #  x##  x#  ##  #x #xHx    x##     x##     # #x#x         #  #           #   ############    ",
           "    ########### #### x         ##   H ###x x# x## x   #x #x   # #     #  x  # x##x#x  # x#  #@#  #x   ###  ###  #         # # #  #########  #  #",
           "#################      #      @##  #xx     xx ####   x   ##   x##x    #x#xx  ##### ##    ##    ##x  x# x    H x###x###    #   ## ## ########### ",
           "##     ##  #### #@#####x ### x###    xx     x  ## ##  ##x  #x# ## # x ###x ##  ## ##  ##   #H# ##     x        ##        x     #################",
           " ############## # @#        x ### #   #x   x## ##       x    # ## x          #x## #      x     ###      x x  #x##H  #    x # # # ############## ",
           "#################x#x        x#x## x#@      ##  ## H        x   ##        x#    ##      x       ## x#        #  ##x#x        x#x#################",
           " ###### ####### #     x#     x ## # x #  #   x ##  @#   #xx #x # # #   # x  H# ##x       #  #x # #      x     # #x            x# ############## ",
           "################## H#x x      x##x @x#x       #### ###    x   ####     x#x#    ##xx       x#x  ### x    ####x  ###x#  #        #################",
           "################# x#        #@ ## #  x#xx#x  # ##    #x##x# x  ## x#       x#  ##  x#x    x#   ## #  # ##x#  # ##    x #x   H  #################",
           "################# x    x  H#   ##  #x#x   #x   ##   #x#    #x  ##   x  #   x#x ## #x#   # x#   ## x#x # x #    ##x#@  #     #  #################",
           "#################x   ##     ##x## #  #      #x ## x#   x##  x  ## #    #x      ##    #   x#    ## ## x# ##x  #H## x# #x     ##@#################",
           "#################   x#x        ###x  x# ##x   ### # # x   #  # ## H #  ##  # @x## #  #   x # # ###   x## #x  x###        x#x   #################",
           "################# ###     x   ###   #       # ###   ##x      x ##  x    x   x ###    #    ###x ##  x x @ H x xx#################                ",
           "#################x#  #x# #x  # ##    #         ##x   #  #x  x  ### #x      x #### x #   ###x   ##     #@#H  x  #################                ",
           " ############## # #  #x# #x  # ##    x  #      ###   #   x #x  ##  #x  #  xx x ###x #   ## x   ##     #@#H  x  # ##############                 ",
           "#################     #       ### ##x x    ##x### #x     x#  #### xx  x# ##    ## #x x #    ## ## ##   @#H###xx#################                ",
           "#################            # ## x ##x   x    ##   #x  x  ##  ## x    ##  #x  ## #x   x#    x ## ##x #@ H     #################                " ];

function count_gifts( state ) {
	n = 0
	for ( i = 0 ; i < LEVEL_HEIGHT * LEVEL_WIDTH ; i++ ) {
		if ( state.board.charAt( i ) == cell.GIFT ) {
			n++;
		}
	}
	return n;
}

function get_pos( state, actor ) {
	p = state.board.indexOf( actor, state.board );
	pos = {}
    pos[ 1 ] = Math.floor( p / LEVEL_WIDTH ); /* y */
    pos[ 0 ] = p - ( pos[ 1 ] * LEVEL_WIDTH ); /* x */

	return pos;
}

function get_cell( state, x, y ) {
	return( state.board.charAt( x + ( y * LEVEL_WIDTH ) ) );
}

function set_cell( state, x, y, value ) {
	p = x + ( y * LEVEL_WIDTH );
	state.board = state.board.substring( 0, p ) + value + state.board.substring( p+1, state.board.length );
	return state;
}

function switch_actor( state ) {
	state.moving = ( state.moving == cell.BALL ) ? cell.CUBE : cell.BALL;
	return state;
}

function won_or_not( state ) {
	return count_gifts( state ) == 0;
}

function format_level( state ) {
	dl = "";
	for ( i = 0 ; i < LEVEL_HEIGHT ; i++ ) {
		for ( j = 0 ; j < LEVEL_WIDTH ; j++ ) {
			c = get_cell( state, j, i );
			classes = "starcell";
			if ( state.moving == c) {
				classes = classes + " selected";
			}
			switch( c ) {
			case cell.BALL:
				classes = classes + " ball";
				break;
			case cell.CUBE:
				classes = classes + " cube";
				break;
			case cell.WALL:
				classes = classes + " wall";
				break;
			case cell.VOID:
				classes = classes + " void";
				break;
			case cell.GIFT:
				classes = classes + " gift";
				break;
			default:
				break;
			}
			dl = dl + "<span class=\"" + classes + "\">" + c + "</span>"
		}
		dl = dl + "<br />"
	}
	return dl;
}

function load_level( levelset, nb ) {
	state.level = nb
	state.board = levelset[ state.level ];
	state.moves = 0;
	state.moving = cell.BALL;
	return state;
}

function display_level( state, elt ) {
	$( elt ).html( format_level( state ) );
}


function make_a_move( state, where ) {
	motion = [ 0, 0 ];
	item_coord = get_pos( state, state.moving );

    /* Setup the motion vector according to direction.*/
    switch( where ) {
    case direction.UP:
        motion[ 1 ]--;
        break;
    case direction.DOWN:
        motion[ 1 ]++;
        break;
    case direction.LEFT:
        motion[ 0 ]--;
        break;
    case direction.RIGHT:
        motion[ 0 ]++;
        break;
    default: break;
    }

	/* Calculating arrival coordinates */
    while (                      /* Hairy conditions ahead */
        /* target cell is within level's boundaries */
        ( ( item_coord[ 0 ] + motion[ 0 ] >= 0 ) && ( item_coord[ 0 ] + motion[ 0 ] < LEVEL_WIDTH ) ) &&
			( ( item_coord[ 1 ] + motion[ 1 ] >= 0 ) && ( item_coord[ 1 ] + motion[ 1 ] < LEVEL_HEIGHT ) ) &&
			/* and target cell is empty */
        ( get_cell( state, item_coord[ 0 ] + motion[ 0 ], item_coord[ 1 ] + motion[ 1 ] ) == cell.VOID )
        /* or, the ball will eat gifts so we can move it on one */
			|| ( state.moving == cell.BALL && ( get_cell( state, item_coord[ 0 ] + motion[ 0 ], item_coord[ 1 ] + motion[ 1 ] ) == cell.GIFT ) )
    )
    {
        state = set_cell( state, item_coord[ 0 ], item_coord[ 1 ], cell.VOID ); /* void the origin cell */

        item_coord[ 0 ] += motion[ 0 ];           /* move coordinate */
        item_coord[ 1 ] += motion[ 1 ];           /* to those of target cells */
        
        state = set_cell( state, item_coord[ 0 ], item_coord[ 1 ], state.moving ); /* move actor into target cell */
    }

    state.moves++;                /* increment moves' counter */
	return state;
}

function start_loop( state, elt ) {
	display_level( state, elt );

	$( document ).keydown( function( e ) {
		switch( e.keyCode ) {
		case 38: // UP
			state = make_a_move( state, direction.UP );
			break;
		case 40: // DOWN
			state = make_a_move( state, direction.DOWN );
			break;
		case 37: // LEFT
			state = make_a_move( state, direction.LEFT );
			break;
		case 39: // RIGHT
			state = make_a_move( state, direction.RIGHT );
			break;
		case 32: // SPACE
			state = switch_actor( state );
			break;
		case 78: // n
			if ( state.level < levels.length - 1 ) {
				state = load_level( levels, state.level + 1 )
			}
			break;
		case 80: // p
			if ( state.level > 0 ) {
				state = load_level( levels, state.level - 1 )
			}
			break;
		default:
			break;
		}
		
		if ( won_or_not( state ) ) {
			if ( state.level < levels.length - 1 ) {
			state = load_level( levels, state.level + 1 )
			}
			else {
				alert( "You won!" );
			}
		}

		display_level( state, elt );
	});
}
