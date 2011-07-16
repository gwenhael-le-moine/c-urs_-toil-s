function initialize_a_star( dom_container, level_index ) {
	// kinda enums
	var cell = { WALL: '#', BALL: '@', CUBE: 'H', EMPTY: ' ', GIFT: 'x' };
	var direction = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };

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
				  "#################            # ## x ##x   x    ##   #x  x  ##  ## x    ##  #x  ## #x   x#    x ## ##x #@ H     #################                " ]
	};

	////// FUNCTIONS //////
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
		var pos = [  ];
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
	}

	function switch_actor(  ) {
		state.moving = ( state.moving == cell.BALL ) ? cell.CUBE : cell.BALL;
	}

	function won_or_not(  ) {
		return count_gifts(  ) === 0;
	}

	function load_level( index ) {
		return( { moving:             cell.BALL,
				  distance_travelled: 0,
				  level:              index,
				  board:              assets.levels[ index ],
				  it_s_over:          false } );
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

		var path = [  ];
		path[ 0 ] = [  ];
		path[ 0 ][ 0 ] = item_coord[ 0 ];
		path[ 0 ][ 1 ] = item_coord[ 1 ];
		/* Calculating arrival coordinates */
		while (                      /* Hairy conditions ahead */
			/* target cell is within level's boundaries */
			( ( item_coord[ 0 ] + motion[ 0 ] >= 0 ) && ( item_coord[ 0 ] + motion[ 0 ] < level_infos.width ) ) &&
				( ( item_coord[ 1 ] + motion[ 1 ] >= 0 ) && ( item_coord[ 1 ] + motion[ 1 ] < level_infos.height ) ) &&
				/* and target cell is empty */
			( get_cell( item_coord[ 0 ] + motion[ 0 ], item_coord[ 1 ] + motion[ 1 ] ) == cell.EMPTY )
			/* or, the ball will eat gifts so we can move it on one */
				|| ( state.moving == cell.BALL && ( get_cell( item_coord[ 0 ] + motion[ 0 ], item_coord[ 1 ] + motion[ 1 ] ) == cell.GIFT ) )
		)
		{
			set_cell( item_coord[ 0 ], item_coord[ 1 ], cell.EMPTY ); /* empty the origin cell */
			item_coord[ 0 ] += motion[ 0 ];           /* move coordinate */
			item_coord[ 1 ] += motion[ 1 ];           /* to those of target cells */
			
			var push_pos = path.length;
			path[ push_pos ] = [  ];
			path[ push_pos ][ 0 ] = item_coord[ 0 ];
			path[ push_pos ][ 1 ] = item_coord[ 1 ];

			set_cell( item_coord[ 0 ], item_coord[ 1 ], state.moving ); /* move actor into target cell */
		}
		return path;
	}

	////// HTML/Canvas version specific functions
	function load_sprites( theme ) {
		assets.sprites = {  };
		assets.sprites.ball = new Image();
		assets.sprites.ball.src = "themes/" + theme + "/tex_ball.png";
		assets.sprites.ball_selected = new Image();
		assets.sprites.ball_selected.src = "themes/" + theme + "/tex_ball_selected.png";
		assets.sprites.cube = new Image();
		assets.sprites.cube.src = "themes/" + theme + "/tex_cube.png";
		assets.sprites.cube_selected = new Image();
		assets.sprites.cube_selected.src = "themes/" + theme + "/tex_cube_selected.png";
		assets.sprites.wall = new Image();
		assets.sprites.wall.src = "themes/" + theme + "/tex_wall.png";
		assets.sprites.empty = new Image();
		assets.sprites.empty.src = "themes/" + theme + "/tex_empty.png";
		assets.sprites.gift = new Image();
		assets.sprites.gift.src = "themes/" + theme + "/tex_gift.png";
	}

	function draw_cell( sprite, x, y ) {
		DOM_infos.canvas.context.drawImage( sprite,
											x * level_infos.cell.width,
											y * level_infos.cell.height,
											level_infos.cell.width,
											level_infos.cell.height );		
	}

 	function display_switch_actor(  ) {
		var ball_pos = get_pos( cell.BALL );
		var cube_pos = get_pos( cell.CUBE );

		// redraw ball
		draw_cell( ( state.moving == cell.BALL ) ? assets.sprites.ball_selected : assets.sprites.ball, ball_pos[ 0 ], ball_pos[ 1 ] );
		// redraw cube
		draw_cell( ( state.moving == cell.CUBE ) ? assets.sprites.cube_selected : assets.sprites.cube, cube_pos[ 0 ], cube_pos[ 1 ] );
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
				case " ": sprite = assets.sprites.empty; break;
				default: break;
				}
				draw_cell( sprite, j, i );
			}
		}
	}

	function update_infos(  ) {
		var infos = "<h1>Star5</h1><br />";
		infos += "Level <em>" + (state.level+1) + "</em> of <em>" + assets.levels.length + "</em><br />";
		infos += "<em>" + count_gifts(  ) + "</em> gifts left<br />";
		infos += "<em>" + state.distance_travelled + "</em> meters travelled";

		jQuery( DOM_infos.container + " .gstar #infos" ).html( infos );
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

	function display_move_actor( path ) {
		for ( var i=0 ; i < path.length-1 ; i++ ) {
			draw_cell( assets.sprites.empty, path[ i ][ 0 ], path[ i ][ 1 ] );
			draw_cell( ( state.moving == cell.BALL ) ? assets.sprites.ball_selected : assets.sprites.cube_selected,
					   path[ i+1 ][ 0 ], path[ i+1 ][ 1 ] );

			state.distance_travelled++;                /* increment distance_travelled */
		}
		update_infos(  );
	}

	function event_handler( e ) {
		if ( !state.it_s_over ) {
			if ( e.type === "click" ) {
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
							switch_actor(  );
							display_switch_actor(  );
						} else if ( click.x == movingpos[0] ) {
							if ( click.y > movingpos[1] ) {
								display_move_actor( make_a_move( direction.DOWN ) );
							} else if ( click.y < movingpos[1] ) {
								display_move_actor( make_a_move( direction.UP ) );
							}
						} else if ( click.y == movingpos[1] ) {
							if ( click.x > movingpos[0] ) {
								display_move_actor( make_a_move( direction.RIGHT ) );
							} else {
								display_move_actor( make_a_move( direction.LEFT ) );
							}
						}
					}
			} else if ( e.type === "keydown" ) {
				switch( e.keyCode ) {
				case 37: // LEFT
				case 38: // UP
				case 39: // RIGHT
				case 40: // DOWN
					display_move_actor( make_a_move( e.keyCode ) );
					break;
				case 32: // SPACE
					switch_actor(  );
					display_switch_actor(  );
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
			}

			if ( won_or_not(  ) ) {
				if ( state.level < assets.levels.length - 1 ) {
					state = load_level( state.level + 1 );
					display_level(  );
				}
				else {
					state.it_s_over = true;
					alert( "You won!" );
				}
			}
		}
	}

	////// MAIN (so to speak) //////

	// First of all, setup our little DOM branch
	var starhtml = '<div class="gstar">';
	starhtml +=	'<aside id="help">' + format_help(  ) + '</aside>';
	starhtml +=	'<canvas id="starboard" width="320" height="180"></canvas>';
	starhtml +=	'<aside id="infos"></aside>';
	starhtml +=	'</div>';
	jQuery( dom_container ).html( starhtml );

	// Now we can collect some informations about this DOM branch we have
	load_sprites( "HP48" );
	var DOM_infos = {
		container: dom_container,
		canvas: {
			//jQuery() returns a jquery object, [0] to get the canvas itself
			context: jQuery( dom_container + " #starboard" )[ 0 ].getContext( '2d' ),
			offset:  jQuery( dom_container + " #starboard" ).offset(),
			width:   jQuery( dom_container + " #starboard" ).width(),
			height:  jQuery( dom_container + " #starboard" ).height()
		}
	};

	var level_infos = {
		height: 9,
		width:  16,
		cell: {
			width:  DOM_infos.canvas.width / 16,
			height: DOM_infos.canvas.height / 9
		}
	};

	var state = load_level( ( level_index === undefined ) ? 0 : 
							( level_index >= assets.levels.length ) ? assets.levels.length - 1 :
							( level_index < 0 ) ? 0 : level_index );

	// kinda ugly workaround around a mysterious bug causing the canvas
	// not to refresh the first time (before any event)
	setTimeout( function(){ display_level(  ); }, 100 ); // 1/10 second

	// Start main "loop"
	jQuery(document).focus(  );
	jQuery(document).click( event_handler );
	jQuery(document).keydown( event_handler );
}
