//&>/dev/null;x="${0%.*}";[ ! "$x" -ot "$0" ]||(rm -f "$x";cc -lncurses -o "$x" "$0")&&"$x" $*;exit

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include <ncurses.h>
#include <getopt.h>

char *levels[] = { "################" /* 0 */
                   "#@##        x#H#"
                   "#          x ###"
                   "#       ##x    #"
                   "#   ## x      ##"
                   "## x  x     x  #"
                   "# x      x## x #"
                   "#     ##x     x#"
                   "################",

                   " #  # # #   # ##" /* 1 */
                   "#   x         @#"
                   "   #x  #x   x   "
                   "# # x     x  # #"
                   "      #   x   # "
                   "#    #H#  x    #"
                   "   #  # #   #xx#"
                   "#             # "
                   " #  #        #  ",

                   "################" /* 2 */
                   "#           x#@#"
                   "#   ##      ##H#"
                   "#   #x     x   #"
                   "# x     x##   x#"
                   "# #x  x  x#  x##"
                   "# ##x #x  x x###"
                   "#x    ##x      #"
                   "################",

                   "################" /* 3 */
                   "#            #H#"
                   "#     #        #"
                   "##x#x x#x#x#x#x#"
                   "# # #x x# # # ##"
                   "##x#x#x x#x#x#x#"
                   "#     #        #"
                   "#   #       #@ #"
                   "################",

                   " ############## " /* 4 */
                   "#@  #   #  #   #"
                   "#  #x # x  x # #"
                   "##      #  #   #"
                   "#x #x#        ##"
                   "##     # x #   #"
                   "#x#  # # #   #H#"
                   "#   #    x#  #x#"
                   " ############## ",

                   "    ############" /* 5 */
                   "   #   x   #x x#"
                   "  #    x    # ##"
                   " #     x       #"
                   "#@     x       #"
                   "##     x  #   ##"
                   "#      x    #  #"
                   "#H #   x  ##x  #"
                   "################",

                   "################" /* 6 */
                   "#              #"
                   " ## ###  #x ##x#"
                   " #x  #x # # # # "
                   "  #  #  ### ##  "
                   " ##  #  #x# #x# "
                   "#              #"
                   "#  @#x    H  #x#"
                   "################",

                   "############### " /* 7 */
                   "#  x##        ##"
                   "#  #x  ## x    #"
                   "#  x## # #x    #"
                   "##     ##  #x# #"
                   "## #       x#x #"
                   "#xHx#   x  #@# #"
                   "##             #"
                   " ###############",

                   "  # ########### " /* 8 */
                   " #x#x      #  @#"
                   "#x x#    x    # "
                   " # #  x##  x#  #"
                   "#  #x #xHx    x#"
                   "#     x##     # "
                   "#x#x         #  "
                   "#           #   "
                   "############    ",

                   "    ########### " /* 9 */
                   "#### x         #"
                   "#   H ###x x# x#"
                   "# x   #x #x   # "
                   "#     #  x  # x#"
                   "#x#x  # x#  #@# "
                   " #x   ###  ###  "
                   "#         # # # "
                   " #########  #  #",

                   "################" /* 10 */
                   "#      #      @#"
                   "#  #xx     xx ##"
                   "##   x   ##   x#"
                   "#x    #x#xx  ###"
                   "## ##    ##    #"
                   "#x  x# x    H x#"
                   "##x###    #   ##"
                   " ## ########### ",

                   "##     ##  #### " /* 11 */
                   "#@#####x ### x##"
                   "#    xx     x  #"
                   "# ##  ##x  #x# #"
                   "# # x ###x ##  #"
                   "# ##  ##   #H# #"
                   "#     x        #"
                   "#        x     #"
                   "################",

                   " ############## " /* 12 */
                   "# @#        x ##"
                   "# #   #x   x## #"
                   "#       x    # #"
                   "# x          #x#"
                   "# #      x     #"
                   "##      x x  #x#"
                   "#H  #    x # # #"
                   " ############## ",

                   "################" /* 13 */
                   "#x#x        x#x#"
                   "# x#@      ##  #"
                   "# H        x   #"
                   "#        x#    #"
                   "#      x       #"
                   "# x#        #  #"
                   "#x#x        x#x#"
                   "################",

                   " ###### ####### " /* 14 */
                   "#     x#     x #"
                   "# # x #  #   x #"
                   "#  @#   #xx #x #"
                   " # #   # x  H# #"
                   "#x       #  #x #"
                   " #      x     # "
                   "#x            x#"
                   " ############## ",

                   "################" /* 15 */
                   "## H#x x      x#"
                   "#x @x#x       ##"
                   "## ###    x   ##"
                   "##     x#x#    #"
                   "#xx       x#x  #"
                   "## x    ####x  #"
                   "##x#  #        #"
                   "################",

                   "################" /* 16 */
                   "# x#        #@ #"
                   "# #  x#xx#x  # #"
                   "#    #x##x# x  #"
                   "# x#       x#  #"
                   "#  x#x    x#   #"
                   "# #  # ##x#  # #"
                   "#    x #x   H  #"
                   "################",

                   "################" /* 17 */
                   "# x    x  H#   #"
                   "#  #x#x   #x   #"
                   "#   #x#    #x  #"
                   "#   x  #   x#x #"
                   "# #x#   # x#   #"
                   "# x#x # x #    #"
                   "#x#@  #     #  #"
                   "################",

                   "################" /* 18 */
                   "#x   ##     ##x#"
                   "# #  #      #x #"
                   "# x#   x##  x  #"
                   "# #    #x      #"
                   "#    #   x#    #"
                   "# ## x# ##x  #H#"
                   "# x# #x     ##@#"
                   "################",

                   "################" /* 19 */
                   "#   x#x        #"
                   "##x  x# ##x   ##"
                   "# # # x   #  # #"
                   "# H #  ##  # @x#"
                   "# #  #   x # # #"
                   "##   x## #x  x##"
                   "#        x#x   #"
                   "################",

                   "################" /* 20 */
                   "# ###     x   ##"
                   "#   #       # ##"
                   "#   ##x      x #"
                   "#  x    x   x ##"
                   "#    #    ###x #"
                   "#  x x @ H x xx#"
                   "################"
                   "                ",

                   "################" /* 21 */
                   "#x#  #x# #x  # #"
                   "#    #         #"
                   "#x   #  #x  x  #"
                   "## #x      x ###"
                   "# x #   ###x   #"
                   "#     #@#H  x  #"
                   "################"
                   "                ",

                   " ############## " /* 22 */
                   "# #  #x# #x  # #"
                   "#    x  #      #"
                   "##   #   x #x  #"
                   "#  #x  #  xx x #"
                   "##x #   ## x   #"
                   "#     #@#H  x  #"
                   " ############## "
                   "                ",

                   "################" /* 23 */
                   "#     #       ##"
                   "# ##x x    ##x##"
                   "# #x     x#  ###"
                   "# xx  x# ##    #"
                   "# #x x #    ## #"
                   "# ##   @#H###xx#"
                   "################"
                   "                ",

                   "################" /* 24 */
                   "#            # #"
                   "# x ##x   x    #"
                   "#   #x  x  ##  #"
                   "# x    ##  #x  #"
                   "# #x   x#    x #"
                   "# ##x #@ H     #"
                   "################"
                   "                " };

/* levels have fixed, hardcoded dimensions */
#define LEVEL_HEIGHT 9
#define LEVEL_WIDTH 16

enum {
   color_BALL,
   color_CUBE,
   color_VOID,
   color_GIFT,
   color_WALL,
   color_BALL_SELECTED,
   color_CUBE_SELECTED,
};

typedef enum {
   WALL = '#',
   BALL = '@',
   CUBE = 'H',
   VOID = ' ',
   GIFT = 'x'
} cell;

typedef enum {
   UP    = 'u',
   DOWN  = 'd',
   LEFT  = 'l',
   RIGHT = 'r'
} direction;

struct options {
     int black_and_white;
     int starting_level;
};

struct state {
   char board[ LEVEL_HEIGHT * LEVEL_WIDTH ];
   char moving;
   int  moves;
   int  level;
   int  nb_levels;
};

int count_gifts( struct state *s )
{
   int i, n = 0;
   for( i = 0 ; i < LEVEL_HEIGHT * LEVEL_WIDTH ; i++ ) {
      if ( s->board[ i ] == GIFT ) {
         n++;
      }
   }
   return n;
}

void get_pos( struct state *s, int* pos )
{
   int p;

   p = (int)( strchr( s->board, s->moving ) - s->board );

   pos[ 1 ] = p / LEVEL_WIDTH;
   pos[ 0 ] = p - ( pos[ 1 ] * LEVEL_WIDTH );
}

char get_cell( struct state *s, int x, int y )
{
   return s->board[ y * LEVEL_WIDTH + x ];
}

void set_cell( struct state *s, int x, int y, cell value )
{
   s->board[ y * LEVEL_WIDTH + x ] = value;
}

void load_level( struct state *s, char* lvl[], int nb )
{
   strncpy( s->board, lvl[ nb ], LEVEL_HEIGHT * LEVEL_WIDTH );
   s->level = nb;
   s->moving = BALL;
   s->moves = 0;
}

void switch_actor( struct state *s )
{
   s->moving = (s->moving == BALL) ? CUBE : BALL;
}

int won_or_not( struct state *s )
{
   return( count_gifts( s ) == 0 );
}

void make_a_move( struct state *s, direction where )
{
   int dx = 0, dy = 0, tmpx, tmpy, *item_coord;
   item_coord = malloc( sizeof( int ) * 2 );
   get_pos( s, item_coord );
   tmpx = item_coord[ 0 ];
   tmpy = item_coord[ 1 ];

   switch( where ) {
      case UP:
         dy--;
         break;
      case DOWN:
         dy++;
         break;
      case LEFT:
         dx--;
         break;
      case RIGHT:
         dx++;
         break;
      default: break;
   }

   /* Calculating arrival coordinates */
   while (                      /* Hairy conditions ahead */
      /* target cell is within level's boundaries */
      ( ( tmpx + dx >= 0 ) && ( tmpx + dx < LEVEL_WIDTH ) ) &&
      ( ( tmpy + dy >= 0 ) && ( tmpy + dy < LEVEL_HEIGHT ) ) &&
      /* and target cell is empty */
      ( get_cell( s, tmpx + dx, tmpy + dy ) == VOID )
      /* or, in case the ball is moving, target cell can be a gift (which we'll eat) */
      || ( s->moving == BALL && ( get_cell( s, tmpx + dx, tmpy + dy ) == GIFT ) )
      )
   {
      tmpx += dx;
      tmpy += dy;

      if ( s->moving == BALL && get_cell( s, tmpx, tmpy ) == GIFT ) {
         set_cell( s, tmpx, tmpy, VOID );
      }
   }

   /* Moving to arrival coordinates */
   set_cell( s, item_coord[ 0 ], item_coord[ 1 ], VOID );
   set_cell( s, tmpx, tmpy, s->moving );

   s->moves++;
   
   free( item_coord );
}

void display_level( struct state *s )
{
   int i, j, *ball, *cube;

   for( i = 0 ; i < LEVEL_HEIGHT ; i++ ) {
      for( j = 0 ; j < LEVEL_WIDTH ; j++ ) {
         switch( get_cell( s, j, i ) ) {
            case WALL:
			   attron( COLOR_PAIR( color_WALL ));
               mvprintw( i+1, j*2, "##" );
			   attroff( COLOR_PAIR( color_WALL ));
               break;
            case VOID:
			   attron( COLOR_PAIR( color_VOID ));
               mvprintw( i+1, j*2, "  " );
			   attroff( COLOR_PAIR( color_VOID ));
               break;
            case BALL:
			   if ( s->moving == BALL ) {
				  attron( A_BOLD );
				  attron( COLOR_PAIR( color_BALL_SELECTED ));
			   }
			   else {
				  attron( COLOR_PAIR( color_BALL ));
			   }
               mvprintw( i+1, j*2, "()" );
			   if ( s->moving == BALL ) {
				  attroff( A_BOLD );
			   }
               break;
            case CUBE:
			   if ( s->moving == CUBE ) {
				  attron( A_BOLD );
				  attron( COLOR_PAIR( color_BALL_SELECTED ));
			   }
			   else {
				  attron( COLOR_PAIR( color_BALL ));
			   }
               mvprintw( i+1, j*2, "[]" );
			   if ( s->moving == CUBE ) {
				  attroff( A_BOLD );
				  attroff( COLOR_PAIR( color_CUBE_SELECTED ));
			   }
			   else {
				  attroff( COLOR_PAIR( color_CUBE ));
			   }
               break;
            case GIFT:
			   attron( COLOR_PAIR( color_GIFT ));
               mvprintw( i+1, j*2, "<>" );
			   attroff( COLOR_PAIR( color_GIFT ));
               break;
            default: break;     /* ignore newlines */
         }
      }
   }

   mvprintw( 1, 35, "level %i of %i", s->level + 1, s->nb_levels );
   mvprintw( 2, 35, "%i gifts left", count_gifts( s ) );
   mvprintw( 3, 35, "%i moves made", s->moves );

   refresh();
}

int parse_args( int argc, char* argv[], struct options *o, struct state *s )
{
     int option_index;
     char c = '?';
  
     char* optstring = "l:bhv";
     static struct option long_options[] = {
          {"black-and-white" , no_argument,       NULL, 'b'},
          {"level"           , required_argument, NULL, 'l'},
          {"help"            , no_argument,       NULL, 'h'},
          {"version"         , no_argument,       NULL, 'v'},
          {0, 0, 0, 0}
     };
  
     char* help_text = "ngstar [options]\n"
          "\t-h --help :\n\t\t what you are reading\n"
          "\t-b --black-and-white :\n\t\t don't use colors (ncurses)\n"
          "\t-l<n> --level=<n> :\n\t\t wrap to level n\n";

     while(c != EOF) {
          c = getopt_long(argc, argv, optstring, long_options, &option_index);
    
          switch(c) {
               case 'h' :
                    printf( "%s\n", help_text );
                    exit(0);
                    break;
               case 'b' :
                    o->black_and_white = 1;
                    break;
               case 'l' :
                    o->starting_level = atoi( optarg ) - 1;
                    if ( o->starting_level > s->nb_levels ) {
                         o->starting_level = s->nb_levels - 1;
                    } else {
                         if ( o->starting_level < 0 ) {
                              o->starting_level = 0;
                         }
                    }
                    break;
               case '?' :
               case ':' :
                    exit(0);
                    break;
               default : break;
          }
     }

     if (optind < argc) {
          fprintf( stderr, "Invalid arguments :\n" );
          while (optind < argc)
               fprintf( stderr, "%s\n", argv[optind++] );
     }
  
     return optind;
}

int main( int argc, char* argv[] )
{
   int key;
   struct state *s = malloc( sizeof( struct state ) );
   struct options *o = malloc( sizeof( struct options ) );

   /* trick to count how many levels we have */
   s->nb_levels = sizeof( levels ) / sizeof( levels[ 0 ] );
   
   o->starting_level = 0;
   o->black_and_white = 0;
   
   parse_args( argc, argv, o, s ); /* not caring about return value here, it's treated inside the function */
   
   /* ncurses */
   WINDOW *w_main = initscr(  ); /* why can't stdscr be used transparently? */
   cbreak();
   noecho();
   nonl();
   intrflush( w_main, FALSE );
   keypad( w_main, TRUE );
   if ( ( ! o->black_and_white ) && has_colors(  ) == TRUE ) {
	  start_color(  );
	  init_pair( color_CUBE,          COLOR_RED,    COLOR_BLACK  );
	  init_pair( color_BALL,          COLOR_BLUE,   COLOR_BLACK  );
	  init_pair( color_GIFT,          COLOR_YELLOW, COLOR_BLACK  );
	  init_pair( color_WALL,          COLOR_WHITE,  COLOR_WHITE  );
	  init_pair( color_VOID,          COLOR_BLACK,  COLOR_BLACK  );
	  init_pair( color_CUBE_SELECTED, COLOR_RED,    COLOR_YELLOW );
	  init_pair( color_BALL_SELECTED, COLOR_BLUE,   COLOR_YELLOW );
   }

   /* load the first level to start the loop in a correct state */
   load_level( s, levels, o->starting_level );
   
   do {
	  if ( won_or_not( s ) ) {
		 if ( s->level < s->nb_levels - 1 ) {
			load_level( s, levels, s->level + 1 );
		 }
		 else {
			// TODO:Damn it you finished the whole game!!
		 }
	  }

      display_level( s );
	  key = getch();
	  switch( key ) {
		 case KEY_UP:
			make_a_move( s, UP );
			break;
		 case KEY_DOWN:
			make_a_move( s, DOWN );
			break;
		 case KEY_LEFT:
			make_a_move( s, LEFT );
			break;
		 case KEY_RIGHT:
			make_a_move( s, RIGHT );
			break;
		 case ' ':
			switch_actor( s );
			break;
		 case 'n':
			if ( s->level < s->nb_levels - 1 ) {
			   load_level( s, levels, s->level + 1 );
			}
			break;
		 case 'p':
			if ( s->level > 0 ) {
			   load_level( s, levels, s->level - 1 );
			}
			break;
		 case 'r':
			load_level( s, levels, s->level );
			break;
		 default:
			break;
	  }
   } while( ( s->level < s->nb_levels ) && (( key != 'q' ) && ( key != 'Q' )) );
   display_level( s );

   free( s );

   echo();
   nocbreak();
   endwin();
   return 0;
}
