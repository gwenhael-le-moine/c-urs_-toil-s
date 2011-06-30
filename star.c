#include <stdio.h>

#define LEVEL_HEIGHT 9
#define LEVEL_WIDTH 16
char* levels[] = { "WWWWWWWWWWWWWWWWWBWWVVVVVVVVGWCWWVVVVVVVVVVGVWWWWVVVVVVVWWGVVVVWWVVVWWVGVVVVVVWWWWVGVVGVVVVVGVVWWVGVVVVVVGWWVGVWWVVVVVWWGVVVVVGWWWWWWWWWWWWWWWWW" };

void display_level( char* lvl )
{
   int i;
   for( i = 0 ; i < LEVEL_HEIGHT * LEVEL_WIDTH ; i++ ) {
	  if ( ( i > 0 ) && ( i % LEVEL_WIDTH == 0 ) ) {
		 printf( "\n" );
	  }
	  switch( lvl[ i ] ) {
		 case 'W':
			printf( "##" );
			break;
		 case 'V':
			printf( "  " );
			break;
		 case 'B':
			printf( "()" );
			break;
		 case 'C':
			printf( "[]" );
			break;
		 case 'G':
			printf( "<>" );
			break;
		 default: break;
	  }
   }
   printf( "\n" );
}

int main( int argc, char* argv[] )
{
   display_level( levels[ 0 ] );
   return 0;
}
