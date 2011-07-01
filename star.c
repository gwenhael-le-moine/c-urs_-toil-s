#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include <ncurses.h>

/* levels have fixed, hardcoded dimensions */
#define LEVEL_HEIGHT 9
#define LEVEL_WIDTH 16

typedef enum {
   WALL ='#',
   BALL ='@',
   CUBE ='H',
   VOID =' ',
   GIFT ='x'
} cell;

typedef enum {
   UP    ='u',
   DOWN  ='d',
   LEFT  ='l',
   RIGHT ='r'
} direction;

struct state {
   char level[ LEVEL_HEIGHT * LEVEL_WIDTH ];
   char moving;
   int moves;
};

int count_gifts( struct state *s )
{
   int i, n = 0;
   for( i = 0 ; i < LEVEL_HEIGHT * LEVEL_WIDTH ; i++ ) {
      if ( s->level[ i ] == GIFT ) {
         n++;
      }
   }
   return n;
}

void get_pos( struct state *s, int* pos )
{
   int p;

   p = (int)( strchr( s->level, s->moving ) - s->level );

   pos[ 1 ] = p / LEVEL_WIDTH;
   pos[ 0 ] = p - ( pos[ 1 ] * LEVEL_WIDTH );
}

char get_cell( struct state *s, int x, int y )
{
   return s->level[ y * LEVEL_WIDTH + x ];
}

void set_cell( struct state *s, int x, int y, cell value )
{
   s->level[ y * LEVEL_WIDTH + x ] = value;
}

void load_level( struct state *s, char* lvl )
{
   strncpy( s->level, lvl, LEVEL_HEIGHT * LEVEL_WIDTH );
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

   free( item_coord );
}

/* below for testing, my kind-of/sort-of unti-testing */

/* so if I declare level as cell* levels[] I get a warning :/ */
char *levels[] = { "################"
                   "#@##        x#H#"
                   "#          x ###"
                   "#       ##x    #"
                   "#   ## x      ##"
                   "## x  x     x  #"
                   "# x      x## x #"
                   "#     ##x     x#"
                   "################",

                   " #  # # #   # ##"
                   "#   x         @#"
                   "   #x  #x   x   "
                   "# # x     x  # #"
                   "      #   x   # "
                   "#    #H#  x    #"
                   "   #  # #   #xx#"
                   "#             # "
                   " #  #        #  ",

                   "################"
                   "#           x#@#"
                   "#   ##      ##H#"
                   "#   #x     x   #"
                   "# x     x##   x#"
                   "# #x  x  x#  x##"
                   "# ##x #x  x x###"
                   "#x    ##x      #"
                   "################",

                   "################"
                   "#            #H#"
                   "#     #        #"
                   "##x#x x#x#x#x#x#"
                   "# # #x x# # # ##"
                   "##x#x#x x#x#x#x#"
                   "#     #        #"
                   "#   #       #@ #"
                   "################",

                   " ############## "
                   "#@  #   #  #   #"
                   "#  #x # x  x # #"
                   "##      #  #   #"
                   "#x #x#        ##"
                   "##     # x #   #"
                   "#x#  # # #   #H#"
                   "#   #    x#  #x#"
                   " ############## ",

                   "    ############"
                   "   #   x   #x x#"
                   "  #    x    # ##"
                   " #     x       #"
                   "#@     x       #"
                   "##     x  #   ##"
                   "#      x    #  #"
                   "#H #   x  ##x  #"
                   "################",

                   "################"
                   "#              #"
                   " ## ###  #x ##x#"
                   " #x  #x # # # # "
                   "  #  #  ### ##  "
                   " ##  #  #x# #x# "
                   "#              #"
                   "#  @#x    H  #x#"
                   "################",

                   "############### "
                   "#  x##        ##"
                   "#  #x  ## x    #"
                   "#  x## # #x    #"
                   "##     ##  #x# #"
                   "## #       x#x #"
                   "#xHx#   x  #@# #"
                   "##             #"
                   " ###############",

                   "  # ########### "
                   " #x#x      #  @#"
                   "#x x#    x    # "
                   " # #  x##  x#  #"
                   "#  #x #xHx    x#"
                   "#     x##     # "
                   "#x#x         #  "
                   "#           #   "
                   "############    ",

                   "    ########### "
                   "#### x         #"
                   "#   H ###x x# x#"
                   "# x   #x #x   # "
                   "#     #  x  # x#"
                   "#x#x  # x#  #@# "
                   " #x   ###  ###  "
                   "#         # # # "
                   " #########  #  #",

                   "################"
                   "#      #      @#"
                   "#  #xx     xx ##"
                   "##   x   ##   x#"
                   "#x    #x#xx  ###"
                   "## ##    ##    #"
                   "#x  x# x    H x#"
                   "##x###    #   ##"
                   " ## ########### ",

                   "##     ##  #### "
                   "#@#####x ### x##"
                   "#    xx     x  #"
                   "# ##  ##x  #x# #"
                   "# # x ###x ##  #"
                   "# ##  ##   #H# #"
                   "#     x        #"
                   "#        x     #"
                   "################",

                   " ############## "
                   "# @#        x ##"
                   "# #   #x   x## #"
                   "#       x    # #"
                   "# x          #x#"
                   "# #      x     #"
                   "##      x x  #x#"
                   "#H  #    x # # #"
                   " ############## ",

                   "################"
                   "#x#x        x#x#"
                   "# x#@      ##  #"
                   "# H        x   #"
                   "#        x#    #"
                   "#      x       #"
                   "# x#        #  #"
                   "#x#x        x#x#"
                   "################",

                   " ###### ####### "
                   "#     x#     x #"
                   "# # x #  #   x #"
                   "#  @#   #xx #x #"
                   " # #   # x  H# #"
                   "#x       #  #x #"
                   " #      x     # "
                   "#x            x#"
                   " ############## ",

                   "################"
                   "## H#x x      x#"
                   "#x @x#x       ##"
                   "## ###    x   ##"
                   "##     x#x#    #"
                   "#xx       x#x  #"
                   "## x    ####x  #"
                   "##x#  #        #"
                   "################",

                   "################"
                   "# x#        #@ #"
                   "# #  x#xx#x  # #"
                   "#    #x##x# x  #"
                   "# x#       x#  #"
                   "#  x#x    x#   #"
                   "# #  # ##x#  # #"
                   "#    x #x   H  #"
                   "################",

                   "################"
                   "# x    x  H#   #"
                   "#  #x#x   #x   #"
                   "#   #x#    #x  #"
                   "#   x  #   x#x #"
                   "# #x#   # x#   #"
                   "# x#x # x #    #"
                   "#x#@  #     #  #"
                   "################",

                   "################"
                   "#x   ##     ##x#"
                   "# #  #      #x #"
                   "# x#   x##  x  #"
                   "# #    #x      #"
                   "#    #   x#    #"
                   "# ## x# ##x  #H#"
                   "# x# #x     ##@#"
                   "################",

                   "################"
                   "#   x#x        #"
                   "##x  x# ##x   ##"
                   "# # # x   #  # #"
                   "# H #  ##  # @x#"
                   "# #  #   x # # #"
                   "##   x## #x  x##"
                   "#        x#x   #"
                   "################",

                   "################"
                   "# ###     x   ##"
                   "#   #       # ##"
                   "#   ##x      x #"
                   "#  x    x   x ##"
                   "#    #    ###x #"
                   "#  x x @ H x xx#"
                   "################"
                   "                ",

                   "################"
                   "#x#  #x# #x  # #"
                   "#    #         #"
                   "#x   #  #x  x  #"
                   "## #x      x ###"
                   "# x #   ###x   #"
                   "#     #@#H  x  #"
                   "################"
                   "                ",

                   " ############## "
                   "# #  #x# #x  # #"
                   "#    x  #      #"
                   "##   #   x #x  #"
                   "#  #x  #  xx x #"
                   "##x #   ## x   #"
                   "#     #@#H  x  #"
                   " ############## "
                   "                ",

                   "################"
                   "#     #       ##"
                   "# ##x x    ##x##"
                   "# #x     x#  ###"
                   "# xx  x# ##    #"
                   "# #x x #    ## #"
                   "# ##   @#H###xx#"
                   "################"
                   "                ",

                   "################"
                   "#            # #"
                   "# x ##x   x    #"
                   "#   #x  x  ##  #"
                   "# x    ##  #x  #"
                   "# #x   x#    x #"
                   "# ##x #@ H     #"
                   "################"
                   "                " };

void display_level( struct state *s )
{
   int i, j, *ball, *cube;

   mvprintw( 0, 0, "%i gifts left, ", count_gifts( s ) );
   if ( won_or_not( s ) ) {
      mvprintw( 0, 17, "You WON !\n");
   }
   else {
      mvprintw( 0, 17, "go on.\n");
   }

   for( i = 0 ; i < LEVEL_HEIGHT ; i++ ) {
      for( j = 0 ; j < LEVEL_WIDTH ; j++ ) {
         switch( get_cell( s, j, i ) ) {
            case WALL:
               mvprintw( i+1, j*2, "##" );
               break;
            case VOID:
               mvprintw( i+1, j*2, "  " );
               break;
            case BALL:
               mvprintw( i+1, j*2, "()" );
               break;
            case CUBE:
               mvprintw( i+1, j*2, "[]" );
               break;
            case GIFT:
               mvprintw( i+1, j*2, "<>" );
               break;
            default: break;     /* ignore newlines */
         }
      }
   }
   refresh();
}

int main( int argc, char* argv[] )
{
   int i = 0, lvl = 0, key;
   struct state *s = malloc( sizeof( struct state ) );

   /* trick to count how many levels we have */
   int nb_levels = sizeof( levels ) / sizeof( levels[ 0 ] );
   
   /* ncurses */
   WINDOW *w_main = initscr(  );
   cbreak();
   noecho();
   nonl();
   intrflush( w_main, FALSE );
   keypad( w_main, TRUE );

   /* load the first level to start the loop in a correct state */
   load_level( s, levels[ lvl ] );
   
   do {
	  if ( won_or_not( s ) ) {
	  	 lvl++;
		 load_level( s, levels[ lvl ] );
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
		 default:
			break;
	  }
   } while( lvl < nb_levels && (( key != 'q' ) && ( key != 'Q' )) );
   display_level( s );

   free( s );

   echo();
   nocbreak();
   endwin();
   return 0;
}
