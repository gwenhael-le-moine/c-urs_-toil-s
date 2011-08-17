package com.cycojesus;

public class Star {
     private int HEIGHT = 9;
     private int WIDTH  = 16;

     public static enum direction{ UP, DOWN, LEFT, RIGHT }
     private char BALL = '@';
     private char CUBE = 'H';
     private char GIFT = 'x';
     private char VOID = ' ';
     private char WALL = '#';
     
     private String[] levels = { "#################@##        x#H##          x ####       ##x    ##   ## x      #### x  x     x  ## x      x## x ##     ##x     x#################",
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
                                 "#################            # ## x ##x   x    ##   #x  x  ##  ## x    ##  #x  ## #x   x#    x ## ##x #@ H     #################                " };

     private int levelIndex;
     private String level;

     private int distanceTravelled;
     private char moving;

     // CONSTRUCTORS AND INIT
     public Star() {
          this.loadLevel( 0 );
     }

     public Star( int index ) {
          this.loadLevel( index );
     }

     public void loadLevel( int index ) {
          this.levelIndex = index;
          this.level = this.levels[ this.levelIndex ];
          this.distanceTravelled = 0;
          this.moving = BALL;
     }

     // METHODS
     private int countGifts(  ) {
          int giftsCounter = 0;
          for ( int i = 0 ; i < HEIGHT * WIDTH ; i++ ) {
               if ( this.level.charAt( i ) == 'x' ) {
                    giftsCounter++;
               }
          }
          return giftsCounter;
     }
     
     private int[] getPosition( char actor ) {
          int[] result = { 0, 0 };
          int position = this.level.indexOf( actor );
          result[ 1 ] = position / WIDTH;
          result[ 0 ] = position - ( result[ 1 ] * WIDTH );
          return result;
     }
     
     private char getCellAt( int x, int y ) {
          return this.level.charAt( ( y * WIDTH ) + x );
     }
     
     private void setCellAt( int x, int y, char value ) {
          this.level = this.level.substring( 0, ( y * WIDTH ) + x ) + value + this.level.substring( ( y * WIDTH ) + x + 1 );
     }
     
     public void switchActor(  ) {
          this.moving = ( this.moving == BALL ) ? CUBE : BALL;
     }
     
     private boolean areWeDoneYet(  ) {
          return ( countGifts() == 0 );
     }
     
     public void move( direction where ) {
          // TODO
          int[] motion = { 0, 0 };
          int[] itemCoordinates = getPosition( this.moving ); /* get the coordinates of the moving actor */

          /* Setup the motion vector according to direction.*/
          switch( where ) {
               case UP:
                    motion[ 1 ]--;
                    break;
               case DOWN:
                    motion[ 1 ]++;
                    break;
               case LEFT:
                    motion[ 0 ]--;
                    break;
               case RIGHT:
                    motion[ 0 ]++;
                    break;
               default: break;
          }

          /* Calculating arrival coordinates */
          while (                      /* Hairy conditions ahead */
               /* target cell is within level's boundaries */
               ( ( itemCoordinates[ 0 ] + motion[ 0 ] >= 0 ) && ( itemCoordinates[ 0 ] + motion[ 0 ] < WIDTH ) ) &&
               ( ( itemCoordinates[ 1 ] + motion[ 1 ] >= 0 ) && ( itemCoordinates[ 1 ] + motion[ 1 ] < HEIGHT ) ) &&
               /* and target cell is empty */
               ( getCellAt( itemCoordinates[ 0 ] + motion[ 0 ], itemCoordinates[ 1 ] + motion[ 1 ] ) == VOID )
               /* or, the ball will eat gifts so we can move it on one */
               || ( this.moving == BALL && ( getCellAt( itemCoordinates[ 0 ] + motion[ 0 ], itemCoordinates[ 1 ] + motion[ 1 ] ) == GIFT ) )
               )
          {
               setCellAt( itemCoordinates[ 0 ], itemCoordinates[ 1 ], VOID ); /* void the origin cell */

               itemCoordinates[ 0 ] += motion[ 0 ];           /* move coordinate */
               itemCoordinates[ 1 ] += motion[ 1 ];           /* to those of target cells */
          
               setCellAt( itemCoordinates[ 0 ], itemCoordinates[ 1 ], this.moving ); /* move actor into target cell */

               /*
                 We could update the display here, but in practice it all happen so fast
                 that the move isn't noticeable. So it's commented.
                 (maybe on a very slow machine it adds beauty?...)
               */

               this.distanceTravelled++;                /* increment distance_travelled */
          }
     }
     
     // DEBUG FACILITIES
     public void debugDisplay(  ) {
          int[] positionBall = getPosition( BALL );
          int[] positionCube = getPosition( CUBE );
          System.out.println ( BALL + "("+positionBall[0]+";"+positionBall[1]+")" );
          System.out.println ( CUBE + "("+positionCube[0]+";"+positionCube[1]+")" );
          System.out.println ( countGifts()+" gifts left." );
          System.out.println ( this.moving + " moving." );
          System.out.println ( ( areWeDoneYet() ) ? "YOU WON" : "not won yet." );
          for ( int i = 0 ; i < HEIGHT ; i++ ) {
               for ( int j = 0 ; j < WIDTH ; j++ ) {
                    System.out.print( this.level.charAt( ( i * WIDTH ) + j ) );
               }
               System.out.println( "" );
          }
     }
}
