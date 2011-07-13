var LEVEL_HEIGHT = 9;
var LEVEL_WIDTH = 16;

var cell= {
	WALL				: '#',
	BALL				: '@',
	CUBE				: 'H',
	VOID				: ' ',
	GIFT				: 'x'
};
var direction = {
	UP					: 'u',
	DOWN				: 'd',
	LEFT				: 'l',
	RIGHT				: 'r'
};
var sprites = {};
var board_infos = {};
var options = {
	starting_level		: 0
};
var state = {
	moving				: cell.BALL,
	distance_travelled	: 0,
	level				: 0,
	board				: ""
};

var levels = [ "#################@##        x#H##          x ####       ##x    ##   ## x      #### x  x     x  ## x      x## x ##     ##x     x#################",
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
	var n = 0;
	for ( var i = LEVEL_HEIGHT * LEVEL_WIDTH ; i-- ; ) {
		if ( state.board[ i ] == cell.GIFT ) {
			n++;
		}
	}
	return n;
}

function get_pos( state, actor ) {
	var p = state.board.indexOf( actor, state.board );
	var pos = {};
    pos[ 1 ] = Math.floor( p / LEVEL_WIDTH ); /* y */
    pos[ 0 ] = p - ( pos[ 1 ] * LEVEL_WIDTH ); /* x */

	return pos;
}

function get_cell( state, x, y ) {
	return state.board[ x + ( y * LEVEL_WIDTH ) ];
}

function set_cell( state, x, y, value ) {
	var p = x + ( y * LEVEL_WIDTH );
	state.board = [ state.board.substring( 0, p ), value, state.board.substring( p+1, state.board.length ) ].join( '' );
	return state;
}

function switch_actor( state ) {
	state.moving = ( state.moving == cell.BALL ) ? cell.CUBE : cell.BALL;
	return state;
}

function won_or_not( state ) {
	return count_gifts( state ) === 0;
}

function display_on_canvas( state, canvas_elt ) {
	var ctx= $( canvas_elt )[ 0 ].getContext( '2d' );
	for ( var i=0 ; i < LEVEL_HEIGHT ; i++ ) {
		for ( var j=0 ; j < LEVEL_WIDTH ; j++ ) {
			var c = get_cell( state, j, i );
			var sprite = "bla";
			switch( c ) {
				case "@": sprite = ( state.moving == cell.BALL ) ? sprites.ball_selected : sprites.ball; break;
				case "H": sprite = ( state.moving == cell.CUBE ) ? sprites.cube_selected : sprites.cube; break;
				case "#": sprite = sprites.wall; break;
				case "x": sprite = sprites.gift; break;
				case " ": sprite = sprites.void; break;
			}
			ctx.drawImage( sprite,
						   j * board_infos.cell_dimensions.width,
						   i * board_infos.cell_dimensions.height,
						   board_infos.cell_dimensions.width,
						   board_infos.cell_dimensions.height );
		}
	}
}

function format_infos( state ) {
	var infos = "<h1>Star5</h1><br />";
	infos += "Level <em>" + (state.level+1) + "</em> of <em>" + levels.length + "</em><br />";
	infos += "<em>" + count_gifts( state ) + "</em> gifts left<br />";
	infos += "<em>" + state.distance_travelled + "</em> meters travelled";
	return infos;
}
function format_help(  ) {
	var help = "<em>←↑→↓</em> to move around<br />";
	help += "<em>Space</em> to switch actor<br />";
	help += "<em>r</em> to reload<br />";
	help += "<em>n</em> to pass to the next level<br />";
	help += "<em>p</em> to go back to the previous level<br />";
	return help;
}

function display_level( state, elt ) {
	$( elt + " .gstar #infos" ).html( format_infos( state ) );
	display_on_canvas( state, elt + " #starboard" );
}

function load_level( levelset, nb ) {
	state.level = nb;
	state.board = levelset[ state.level ];
	state.distance_travelled = 0;
	state.moving = cell.BALL;
	return state;
}

function make_a_move( state, where ) {
	var motion = [ 0, 0 ];
	var item_coord = get_pos( state, state.moving );

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

		state.distance_travelled++;                /* increment distance_travelled */
    }
	return state;
}

function start_loop( state, elt, board_infos ) {
	display_level( state, elt );

	$(document).focus(  );
	$(document).click(
		function( e ) {
			var movingpos = get_pos( state, state.moving );
			var notmovingpos = get_pos( state, ( state.moving != cell.BALL ) ? cell.BALL : cell.CUBE );
			var click = {};
			click.x = e.pageX - board_infos.offset.left;
			click.y = e.pageY - board_infos.offset.top;

			if ( ( 0 <= click.x && click.x < board_infos.dimensions.width )
				&& ( 0 <= click.y && click.y < board_infos.dimensions.height ) ) {
					// coordinates in cell indexes
					click.x	= Math.floor( click.x / board_infos.cell_dimensions.width );
					click.y	= Math.floor( click.y / board_infos.cell_dimensions.height );

					// We're inside the board
					if ( click.x == notmovingpos[0] && click.y == notmovingpos[1] ) {
						state.moving = ( state.moving != cell.BALL ) ? cell.BALL : cell.CUBE;
					} else if ( click.x == movingpos[0] ) {
						if ( click.y > movingpos[1] ) {
							state = make_a_move( state, direction.DOWN );
						} else if ( click.y < movingpos[1] ) {
							state = make_a_move( state, direction.UP );
						}
					} else if ( click.y == movingpos[1] ) {
						if ( click.x > movingpos[0] ) {
							state = make_a_move( state, direction.RIGHT );
						} else {
							state = make_a_move( state, direction.LEFT );
						}
					}

					if ( won_or_not( state ) ) {
						if ( state.level < levels.length - 1 ) {
							state = load_level( levels, state.level + 1 );
						}
						else {
							alert( "You won!" );
						}
					}

					display_level( state, elt );
				}
		});
	$(document).keydown(
		function( e ) {
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
					state = load_level( levels, state.level + 1 );
				}
				break;
			case 80: // p
				if ( state.level > 0 ) {
					state = load_level( levels, state.level - 1 );
				}
				break;
			case 82: // r
				state = load_level( levels, state.level );
				break;
			default:
				break;
			}
			
			if ( won_or_not( state ) ) {
				if ( state.level < levels.length - 1 ) {
					state = load_level( levels, state.level + 1 );
				}
				else {
					alert( "You won!" );
				}
			}

			display_level( state, elt );
		});

	display_level( state, elt );
}

function initialize_a_star( elt ) {
	// load sprites
	sprites.ball = new Image();
	sprites.ball.src = "themes/HP48/tex_ball.png";
	sprites.ball_selected = new Image();
	sprites.ball_selected.src = "themes/HP48/tex_ball_selected.png";
	sprites.cube = new Image();
	sprites.cube.src = "themes/HP48/tex_cube.png";
	sprites.cube_selected = new Image();
	sprites.cube_selected.src = "themes/HP48/tex_cube_selected.png";
	sprites.wall = new Image();
	sprites.wall.src = "themes/HP48/tex_wall.png";
	sprites.void = new Image();
	sprites.void.src = "themes/HP48/tex_empty.png";
	sprites.gift = new Image();
	sprites.gift.src = "themes/HP48/tex_gift.png";

	var starhtml = '<div class="gstar">';
	starhtml +=	'<aside id="help">' + format_help( state ) + '</aside>';
	starhtml +=	'<canvas id="starboard" width="320" height="180"></canvas>';
	starhtml +=	'<aside id="infos"></aside>';
	starhtml +=	'</div>';

	$( elt ).html( starhtml );

	board_infos.offset = $(elt + " #starboard").offset();
	board_infos.dimensions = {};
	board_infos.dimensions.width = $(elt + " #starboard").width();
	board_infos.dimensions.height = $(elt + " #starboard").height();
	board_infos.cell_dimensions = {};
	board_infos.cell_dimensions.width = board_infos.dimensions.width / LEVEL_WIDTH;
	board_infos.cell_dimensions.height = board_infos.dimensions.height / LEVEL_HEIGHT;

	state = load_level( levels, options.starting_level );

	start_loop( state, elt, board_infos );
}
