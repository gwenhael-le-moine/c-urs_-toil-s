function initialize_a_star( dom_container ) {
	// kinda enums
	var cell= { WALL: '#', BALL: '@', CUBE: 'H', VOID: ' ', GIFT: 'x' };
	var direction = { UP: 'u', DOWN: 'd', LEFT: 'l', RIGHT: 'r' };

	var assets = {
		levels: [ "#################@##        x#H##          x ####       ##x    ##   ## x      #### x  x     x  ## x      x## x ##     ##x     x#################",
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
				  "#################            # ## x ##x   x    ##   #x  x  ##  ## x    ##  #x  ## #x   x#    x ## ##x #@ H     #################                " ],
		sprites: load_sprites( "HP48" )
	};

	// First of all, setup our little DOM branch
	var starhtml = '<div class="gstar">';
	starhtml +=	'<aside id="help">' + format_help(  ) + '</aside>';
	starhtml +=	'<canvas id="starboard" width="320" height="180"></canvas>';
	starhtml +=	'<aside id="infos"></aside>';
	starhtml +=	'</div>';
	$( dom_container ).html( starhtml );

	// Now we can collect some informations about this DOM branch we have
	var DOM_infos = {
		container: dom_container,
		canvas: {
			//$() returns a jquery object, [0] to get the canvas itself
			context: $( dom_container + " #starboard" )[ 0 ].getContext( '2d' ),
			offset: $( dom_container + " #starboard" ).offset(),
			width: $( dom_container + " #starboard" ).width(),
			height: $( dom_container + " #starboard" ).height()
		}
	};

	var level_infos = {
		height: 9,
		width:16,
		cell: {
			width: DOM_infos.canvas.width / 16,
			height: DOM_infos.canvas.height / 9
		}
	};

	var state = {
		moving				: cell.BALL,
		distance_travelled	: 0,
		level				: 0,
		board				: ""
	};

	////// FUNCTIONS //////
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

	function count_gifts(  ) {
		var n = 0;
		for ( var i = level_infos.height * level_infos.width ; i-- ; ) {
			if ( state.board[ i ] == cell.GIFT ) {
				n++;
			}
		}
		return n;
	}

	function get_pos( actor ) {
		var p = state.board.indexOf( actor, state.board );
		var pos = {  };
		pos[ 1 ] = Math.floor( p / level_infos.width ); /* y */
		pos[ 0 ] = p - ( pos[ 1 ] * level_infos.width ); /* x */

		return pos;
	}

	function get_cell( x, y ) {
		return state.board[ x + ( y * level_infos.width ) ];
	}

	function set_cell( x, y, value ) {
		var p = x + ( y * level_infos.width );
		state.board = [ state.board.substring( 0, p ), value, state.board.substring( p+1, state.board.length ) ].join( '' );
		return state;
	}

	function switch_actor(  ) {
		state.moving = ( state.moving == cell.BALL ) ? cell.CUBE : cell.BALL;
		var ball_pos = get_pos( cell.BALL );
		var cube_pos = get_pos( cell.CUBE );

		// redraw ball
		DOM_infos.canvas.context.drawImage( ( state.moving == cell.BALL ) ? assets.sprites.ball_selected : assets.sprites.ball,
											ball_pos[ 0 ] * level_infos.cell.width,
											ball_pos[ 1 ] * level_infos.cell.height,
											level_infos.cell.width,
											level_infos.cell.height );
		// redraw cube
		DOM_infos.canvas.context.drawImage( ( state.moving == cell.CUBE ) ? assets.sprites.cube_selected : assets.sprites.cube,
											cube_pos[ 0 ] * level_infos.cell.width,
											cube_pos[ 1 ] * level_infos.cell.height,
											level_infos.cell.width,
											level_infos.cell.height );
		return state;
	}

	function won_or_not(  ) {
		return count_gifts(  ) === 0;
	}

	function full_display_on_canvas(  ) {
		for ( var i=0 ; i < level_infos.height ; i++ ) {
			for ( var j=0 ; j < level_infos.width ; j++ ) {
				var c = get_cell( j, i );
				var sprite;
				switch( c ) {
				case "@": sprite = ( state.moving == cell.BALL ) ? assets.sprites.ball_selected : assets.sprites.ball; break;
				case "H": sprite = ( state.moving == cell.CUBE ) ? assets.sprites.cube_selected : assets.sprites.cube; break;
				case "#": sprite = assets.sprites.wall; break;
				case "x": sprite = assets.sprites.gift; break;
				case " ": sprite = assets.sprites.void; break;
				}
				DOM_infos.canvas.context.drawImage( sprite,
													j * level_infos.cell.width,
													i * level_infos.cell.height,
													level_infos.cell.width,
													level_infos.cell.height );
			}
		}
	}

	function update_infos(  ) {
		var infos = "<h1>Star5</h1><br />";
		infos += "Level <em>" + (state.level+1) + "</em> of <em>" + assets.levels.length + "</em><br />";
		infos += "<em>" + count_gifts(  ) + "</em> gifts left<br />";
		infos += "<em>" + state.distance_travelled + "</em> meters travelled";

		$( DOM_infos.container + " .gstar #infos" ).html( infos );
	}

	function format_help(  ) {
		var help = "<em>←↑→↓</em> to move around<br />";
		help += "<em>Space</em> to switch actor<br />";
		help += "<em>r</em> to reload<br />";
		help += "<em>n</em> to pass to the next level<br />";
		help += "<em>p</em> to go back to the previous level<br />";
		return help;
	}

	function display_level(  ) {
		update_infos(  );
		full_display_on_canvas( DOM_infos.container + " #starboard" );
	}

	function load_level( index ) {
		state.level = index;
		state.board = assets.levels[ state.level ];
		state.distance_travelled = 0;
		state.moving = cell.BALL;
		return state;
	}

	function make_a_move( where ) {
		var motion = [ 0, 0 ];
		var item_coord = get_pos( state.moving );

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
			( ( item_coord[ 0 ] + motion[ 0 ] >= 0 ) && ( item_coord[ 0 ] + motion[ 0 ] < level_infos.width ) ) &&
				( ( item_coord[ 1 ] + motion[ 1 ] >= 0 ) && ( item_coord[ 1 ] + motion[ 1 ] < level_infos.height ) ) &&
				/* and target cell is empty */
			( get_cell( item_coord[ 0 ] + motion[ 0 ], item_coord[ 1 ] + motion[ 1 ] ) == cell.VOID )
			/* or, the ball will eat gifts so we can move it on one */
				|| ( state.moving == cell.BALL && ( get_cell( item_coord[ 0 ] + motion[ 0 ], item_coord[ 1 ] + motion[ 1 ] ) == cell.GIFT ) )
		)
		{
			state = set_cell( item_coord[ 0 ], item_coord[ 1 ], cell.VOID ); /* void the origin cell */
			// voiding origin cell on canvas
			DOM_infos.canvas.context.drawImage( assets.sprites.void,
												item_coord[ 0 ] * level_infos.cell.width,
												item_coord[ 1 ] * level_infos.cell.height,
												level_infos.cell.width,
												level_infos.cell.height );
			
			item_coord[ 0 ] += motion[ 0 ];           /* move coordinate */
			item_coord[ 1 ] += motion[ 1 ];           /* to those of target cells */
			
			state = set_cell( item_coord[ 0 ], item_coord[ 1 ], state.moving ); /* move actor into target cell */
			// drawing target cell on canvas
			DOM_infos.canvas.context.drawImage( ( state.moving == cell.BALL ) ? assets.sprites.ball_selected : assets.sprites.cube_selected,
												item_coord[ 0 ] * level_infos.cell.width,
												item_coord[ 1 ] * level_infos.cell.height,
												level_infos.cell.width,
												level_infos.cell.height );

			state.distance_travelled++;                /* increment distance_travelled */
		}
		update_infos(  );
		return state;
	}

	function start_loop(  ) {
		display_level(  );

		$(document).focus(  );
		$(document).click(
			function( e ) {
				var movingpos = get_pos( state.moving );
				var notmovingpos = get_pos( ( state.moving != cell.BALL ) ? cell.BALL : cell.CUBE );
				var click = {  };
				click.x = e.pageX - DOM_infos.canvas.offset.left;
				click.y = e.pageY - DOM_infos.canvas.offset.top;

				if ( ( 0 <= click.x && click.x < DOM_infos.canvas.width )
					&& ( 0 <= click.y && click.y < DOM_infos.canvas.height ) ) {
						// coordinates in cell indexes
						click.x	= Math.floor( click.x / level_infos.cell.width );
						click.y	= Math.floor( click.y / level_infos.cell.height );

						// We're inside the board
						if ( click.x == notmovingpos[0] && click.y == notmovingpos[1] ) {
							state.moving = ( state.moving != cell.BALL ) ? cell.BALL : cell.CUBE;
						} else if ( click.x == movingpos[0] ) {
							if ( click.y > movingpos[1] ) {
								state = make_a_move( direction.DOWN );
							} else if ( click.y < movingpos[1] ) {
								state = make_a_move( direction.UP );
							}
						} else if ( click.y == movingpos[1] ) {
							if ( click.x > movingpos[0] ) {
								state = make_a_move( direction.RIGHT );
							} else {
								state = make_a_move( direction.LEFT );
							}
						}

						if ( won_or_not(  ) ) {
							if ( state.level < assets.levels.length - 1 ) {
								state = load_level( state.level + 1 );
								display_level(  );
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
					state = make_a_move( direction.UP );
					break;
				case 40: // DOWN
					state = make_a_move( direction.DOWN );
					break;
				case 37: // LEFT
					state = make_a_move( direction.LEFT );
					break;
				case 39: // RIGHT
					state = make_a_move( direction.RIGHT );
					break;
				case 32: // SPACE
					state = switch_actor(  );
					break;
				case 78: // n
					if ( state.level < assets.levels.length - 1 ) {
						state = load_level( state.level + 1 );
						display_level(  );
					}
					break;
				case 80: // p
					if ( state.level > 0 ) {
						state = load_level( state.level - 1 );
						display_level(  );
					}
					break;
				case 82: // r
					state = load_level( state.level );
					display_level(  );
					break;
				default:
					break;
				}
				
				if ( won_or_not(  ) ) {
					if ( state.level < assets.levels.length - 1 ) {
						state = load_level( state.level + 1 );
						display_level(  );
					}
					else {
						alert( "You won!" );
					}
				}
			});
	}

	////// MAIN (so to speak) //////
	state = load_level( 0 );

	start_loop(  );

	// kinda ugly workaround around a bug causing the canvas
	// not to refresh the first time (before any event)
	setTimeout( function(){ display_level(  ); }, 100 ); // 1/10 second
}
