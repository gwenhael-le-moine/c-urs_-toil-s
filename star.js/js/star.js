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
	level: "",
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
		if ( state.level.charAt( i ) == GIFTS ) {
			n++;
		}
	}
	return n;
}
function get_pos( state, actor ) {
	p = state.level.indexOf( actor, state.level );
	pos = {}
    pos[ 1 ] = Math.floor( p / LEVEL_WIDTH ); /* y */
    pos[ 0 ] = p - ( pos[ 1 ] * LEVEL_WIDTH ); /* x */

	return pos;
}
function get_cell( state, x, y ) {
	return( state.level.charAt( x + ( y * LEVEL_WIDTH ) ) );
}
function set_cell( state, x, y, value ) {
	p = x + ( y * LEVEL_WIDTH );
	state.level = state.level.substring( 0, p ) + value + state.level.substring( p+1, state.level.length );
	return state;
}
function won_or_not( state ) {
	return count_gifts( state ) == 0;
}

function format_level( state ) {
	dl = "";
	for ( i = 0 ; i < LEVEL_HEIGHT ; i++ ) {
		dl = dl + (state.level).substr( i*LEVEL_WIDTH, LEVEL_WIDTH ) + "\n";
	}
	return dl;
}

function load_level( levelset, nb ) {
	state.level = levelset[ nb ];
	state.moves = 0;
	state.moving = cell.BALL;
	return state;
}
function display_level( elt, state ) {
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

          /*
            We could update the display here, but in practice it all happen so fast
            that the move isn't noticeable. So it's commented.
            (maybe on a very slow machine it adds beauty?...)
          */
          /* display_level( s ); */
     }

     state.moves++;                /* increment moves' counter */
	return state;
}
