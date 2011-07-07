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
var css_classes = {
	"@"					: "ball",
	"H"					: "cube",
	"#"					: "wall",
	" "					: "void",
	"x"					: "gift"
};
var options = {
	starting_level		: 0,
	dom_place           : ""
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

function format_level( state, text ) {
	function Replacer( conversionObject ) {

        var regexpStr = '';
        for ( var k in conversionObject ) {
            regexpStr += ( regexpStr.length ? '|' : '' ) + k;
		}
        var regexpr = new RegExp( regexpStr, 'mig' ); // g: global, m:multi-line i: ignore case
        return function(s) {
			return s.replace( regexpr, function(str, p1, p2, offset, s) {
								 var a = conversionObject[ str ];
								 return a == undefined ? str : a;
							 } );
		};
	}

	var substitutions = {
		'#': '<span class="starcell wall">#</span>',
		'x': '<span class="starcell gift">x</span>',
		' ': '<span class="starcell void"> </span>',
		'H': '<span class="starcell cube">H</span>',
		'@': '<span class="starcell ball">@</span>'
		};
	substitutions[ state.moving ] = substitutions[ state.moving ].replace( '">', '_selected">' );
	if ( text == false ) {
		for ( var c in substitutions ) {
			substitutions[ c ] = substitutions[ c ].replace( />.</, '><' );
		}
	}
	var myReplacer = Replacer( substitutions );
	return myReplacer( state.board );
}

function format_infos( state ) {
	var infos = "<h1>Star5</h1><br />";
	infos += "Level " + (state.level+1) + " of " + levels.length + "<br />";
	infos += count_gifts( state ) + " gifts left<br />";
	infos += state.distance_travelled + " meters travelled";
	return infos;
}
function format_help(  ) {
	var help = "←↑→↓ to move around<br />";
	help += "Space to switch actor<br />";
	help += "'r' to reload<br />";
	help += "'n' to pass to the next level<br />";
	help += "'p' to go back to the previous level<br />";
	return help;
}

function display_level( state, elt ) {
	var starhtml = '<div class="gstar"><div id="blackboard">' + format_level( state, false ) + '</div><aside id="infos">' + format_infos( state ) + '</aside><aside id="help">' + format_help( state ) + '</aside></div>';
	$( elt ).html( starhtml );
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

function start_loop( state, elt ) {
	options.dom_place = elt;
	display_level( state, options.dom_place );

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

		display_level( state, options.dom_place );
	});
}
