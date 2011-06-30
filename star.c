#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define LEVEL_HEIGHT 9
#define LEVEL_WIDTH 16

#define WALL 'W'
#define BALL 'B'
#define CUBE 'C'
#define VOID 'V'
#define GIFT 'G'

char* levels[] = { "WWWWWWWWWWWWWWWWWBWWVVVVVVVVGWCWWVVVVVVVVVVGVWWWWVVVVVVVWWGVVVVWWVVVWWVGVVVVVVWWWWVGVVGVVVVVGVVWWVGVVVVVVGWWVGVWWVVVVVWWGVVVVVGWWWWWWWWWWWWWWWWW" };

struct {
   char level[ LEVEL_HEIGHT * LEVEL_WIDTH ];
} state;

int count_gifts( char* lvl )
{
   int i, n = 0;
   for( i = 0 ; i < LEVEL_HEIGHT * LEVEL_WIDTH ; i++ ) {
	  if ( lvl[ i ] == GIFT ) {
		 n++;
	  }
   }
   return n;
}

void get_pos( char* lvl, char item, int* pos )
{
   int p;
   
   p = (int)( strchr( lvl, item ) - lvl );
   fprintf( stderr, "### %i\n", p );

   pos[ 1 ] = p / LEVEL_WIDTH;
   pos[ 0 ] = p - ( pos[ 1 ] * LEVEL_WIDTH );
}

char get_cell( char* lvl, int x, int y )
{
   return lvl[ y * LEVEL_WIDTH + x ];
}

void load_level( char* lvl )
{
   strncpy( state.level, lvl, LEVEL_HEIGHT * LEVEL_WIDTH );
}

void display_level( char* lvl )
{
   int i, j, *ball, *cube;
   ball = malloc( sizeof( int ) * 2 );
   cube = malloc( sizeof( int ) * 2 );
   
   printf( "%i gifts\n", count_gifts( lvl ) );
   get_pos( lvl, BALL, ball );
   get_pos( lvl, CUBE, cube );
   printf( "Ball: ( %i, %i) ; Cube: ( %i, %i)\n", ball[ 0 ], ball[ 1 ], cube[ 0 ], cube[ 1 ] );
   
   for( i = 0 ; i < LEVEL_HEIGHT ; i++ ) {
	  for( j = 0 ; j < LEVEL_WIDTH ; j++ ) {
		 switch( get_cell( lvl, j, i ) ) {
			case WALL:
			   printf( "##" );
			   break;
			case VOID:
			   printf( "  " );
			   break;
			case BALL:
			   printf( "()" );
			   break;
			case CUBE:
			   printf( "[]" );
			   break;
			case GIFT:
			   printf( "<>" );
			   break;
			default: break;
		 }
	  }
	  printf( "\n" );
   }

   free( ball );
   free( cube );
}

int main( int argc, char* argv[] )
{
   load_level( levels[ 0 ] );
   
   display_level( state.level );
   return 0;
}
