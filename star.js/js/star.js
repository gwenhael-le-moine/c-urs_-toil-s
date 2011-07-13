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
	var pos = {  };
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
	var ball_pos = get_pos( state, cell.BALL );
	var cube_pos = get_pos( state, cell.CUBE );
	// we're going to update the canvas right here and there so we need it
	var ctx= state.board_infos.canvas.getContext( '2d' ); //$() returns a jquery object, [0] to get the canvas itself

	// redraw ball
	ctx.drawImage( ( state.moving == cell.BALL ) ? state.board_infos.sprites.ball_selected : state.board_infos.sprites.ball,
				   ball_pos[ 0 ] * state.board_infos.cell_dimensions.width,
				   ball_pos[ 1 ] * state.board_infos.cell_dimensions.height,
				   state.board_infos.cell_dimensions.width,
				   state.board_infos.cell_dimensions.height );
	// redraw cube
	ctx.drawImage( ( state.moving == cell.CUBE ) ? state.board_infos.sprites.cube_selected : state.board_infos.sprites.cube,
				   cube_pos[ 0 ] * state.board_infos.cell_dimensions.width,
				   cube_pos[ 1 ] * state.board_infos.cell_dimensions.height,
				   state.board_infos.cell_dimensions.width,
				   state.board_infos.cell_dimensions.height );
	return state;
}

function won_or_not( state ) {
	return count_gifts( state ) === 0;
}

function full_display_on_canvas( state ) {
	var ctx= state.board_infos.canvas.getContext( '2d' ); //$() returns a jquery object, [0] to get the canvas itself
	for ( var i=0 ; i < LEVEL_HEIGHT ; i++ ) {
		for ( var j=0 ; j < LEVEL_WIDTH ; j++ ) {
			var c = get_cell( state, j, i );
			var sprite;
			switch( c ) {
				case "@": sprite = ( state.moving == cell.BALL ) ? state.board_infos.sprites.ball_selected : state.board_infos.sprites.ball; break;
				case "H": sprite = ( state.moving == cell.CUBE ) ? state.board_infos.sprites.cube_selected : state.board_infos.sprites.cube; break;
				case "#": sprite = state.board_infos.sprites.wall; break;
				case "x": sprite = state.board_infos.sprites.gift; break;
				case " ": sprite = state.board_infos.sprites.void; break;
			}
			ctx.drawImage( sprite,
						   j * state.board_infos.cell_dimensions.width,
						   i * state.board_infos.cell_dimensions.height,
						   state.board_infos.cell_dimensions.width,
						   state.board_infos.cell_dimensions.height );
		}
	}
}

function update_infos( state ) {
	var infos = "<h1>Star5</h1><br />";
	infos += "Level <em>" + (state.level+1) + "</em> of <em>" + levels.length + "</em><br />";
	infos += "<em>" + count_gifts( state ) + "</em> gifts left<br />";
	infos += "<em>" + state.distance_travelled + "</em> meters travelled";

	$( state.dom_container + " .gstar #infos" ).html( infos );
}

function format_help(  ) {
	var help = "<em>←↑→↓</em> to move around<br />";
	help += "<em>Space</em> to switch actor<br />";
	help += "<em>r</em> to reload<br />";
	help += "<em>n</em> to pass to the next level<br />";
	help += "<em>p</em> to go back to the previous level<br />";
	return help;
}

function display_level( state ) {
	update_infos( state );
	full_display_on_canvas( state, state.dom_container + " #starboard" );
}

function load_level( state, levelset, index ) {
	state.level = index;
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

	// we're going to update the canvas right here and there so we need it
	var ctx= state.board_infos.canvas.getContext( '2d' ); //$() returns a jquery object, [0] to get the canvas itself

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
		// voiding origin cell on canvas
		ctx.drawImage( state.board_infos.sprites.void,
					   item_coord[ 0 ] * state.board_infos.cell_dimensions.width,
					   item_coord[ 1 ] * state.board_infos.cell_dimensions.height,
					   state.board_infos.cell_dimensions.width,
					   state.board_infos.cell_dimensions.height );
		
        item_coord[ 0 ] += motion[ 0 ];           /* move coordinate */
        item_coord[ 1 ] += motion[ 1 ];           /* to those of target cells */
        
        state = set_cell( state, item_coord[ 0 ], item_coord[ 1 ], state.moving ); /* move actor into target cell */
		// drawing target cell on canvas
		ctx.drawImage( ( state.moving == cell.BALL ) ? state.board_infos.sprites.ball_selected : state.board_infos.sprites.cube_selected,
					   item_coord[ 0 ] * state.board_infos.cell_dimensions.width,
					   item_coord[ 1 ] * state.board_infos.cell_dimensions.height,
					   state.board_infos.cell_dimensions.width,
					   state.board_infos.cell_dimensions.height );

		state.distance_travelled++;                /* increment distance_travelled */
    }
	update_infos( state );
	return state;
}

function start_loop( state ) {
	display_level( state );

	$(document).focus(  );
	$(document).click(
		function( e ) {
			var movingpos = get_pos( state, state.moving );
			var notmovingpos = get_pos( state, ( state.moving != cell.BALL ) ? cell.BALL : cell.CUBE );
			var click = {  };
			click.x = e.pageX - state.board_infos.offset.left;
			click.y = e.pageY - state.board_infos.offset.top;

			if ( ( 0 <= click.x && click.x < state.board_infos.dimensions.width )
				&& ( 0 <= click.y && click.y < state.board_infos.dimensions.height ) ) {
					// coordinates in cell indexes
					click.x	= Math.floor( click.x / state.board_infos.cell_dimensions.width );
					click.y	= Math.floor( click.y / state.board_infos.cell_dimensions.height );

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
							state = load_level( state, levels, state.level + 1 );
							display_level( state );
						}
						else {
							alert( "You won!" );
						}
					}
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
					state = load_level( state, levels, state.level + 1 );
					display_level( state );
				}
				break;
			case 80: // p
				if ( state.level > 0 ) {
					state = load_level( state, levels, state.level - 1 );
					display_level( state );
				}
				break;
			case 82: // r
				state = load_level( state, levels, state.level );
				display_level( state );
				break;
			default:
				break;
			}
			
			if ( won_or_not( state ) ) {
				if ( state.level < levels.length - 1 ) {
					state = load_level( state, levels, state.level + 1 );
					display_level( state );
				}
				else {
					alert( "You won!" );
				}
			}
		});
}

function load_sprites( theme ) {
	var sprites = {  };
	sprites.ball = new Image();
	sprites.ball.src = "themes/" + theme + "/tex_ball.png";
	sprites.ball_selected = new Image();
	sprites.ball_selected.src = "themes/" + theme + "/tex_ball_selected.png";
	sprites.cube = new Image();
	sprites.cube.src = "themes/" + theme + "/tex_cube.png";
	sprites.cube_selected = new Image();
	sprites.cube_selected.src = "themes/" + theme + "/tex_cube_selected.png";
	sprites.wall = new Image();
	sprites.wall.src = "themes/" + theme + "/tex_wall.png";
	sprites.void = new Image();
	sprites.void.src = "themes/" + theme + "/tex_empty.png";
	sprites.gift = new Image();
	sprites.gift.src = "themes/" + theme + "/tex_gift.png";
	
	return sprites;
}

function initialize_a_star( dom_container ) {
	var state = {
		moving				: cell.BALL,
		distance_travelled	: 0,
		level				: 0,
		board				: "",
		board_infos         : {  },
		dom_container : dom_container
	};

	var starhtml = '<div class="gstar">';
	starhtml +=	'<aside id="help">' + format_help( state ) + '</aside>';
	starhtml +=	'<canvas id="starboard" width="320" height="180"></canvas>';
	starhtml +=	'<aside id="infos"></aside>';
	starhtml +=	'</div>';

	$( state.dom_container ).html( starhtml );

	state.board_infos.sprites = load_sprites( "HP48" );

	state.board_infos.canvas = $( state.dom_container + " #starboard" )[ 0 ];
	state.board_infos.offset = $( state.dom_container + " #starboard" ).offset();
	state.board_infos.dimensions = {  };
	state.board_infos.dimensions.width = $( state.dom_container + " #starboard" ).width();
	state.board_infos.dimensions.height = $( state.dom_container + " #starboard" ).height();
	state.board_infos.cell_dimensions = {  };
	state.board_infos.cell_dimensions.width = state.board_infos.dimensions.width / LEVEL_WIDTH;
	state.board_infos.cell_dimensions.height = state.board_infos.dimensions.height / LEVEL_HEIGHT;

	state = load_level( state, levels, 0 );

	start_loop( state );

	// kinda ugly workaround around a bug causing the canvas
	// not to refresh the first time (before any event)
	setTimeout( function(){ display_level( state ); }, 100 ); // 1/10 second
}
