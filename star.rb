require 'ncursesw'

LEVEL_HEIGHT = 9
LEVEL_WIDTH = 16

class Star
   def initialize
      @levels = [
                 '#################@##        x#H##          x ####       ##x    ##   ## x      #### x  x     x  ## x      x## x ##     ##x     x#################',
                 ' #  # # #   # ###   x         @#   #x  #x   x   # # x     x  # #      #   x   # #    #H#  x    #   #  # #   #xx##             #  #  #        #  ',
                 '#################           x#@##   ##      ##H##   #x     x   ## x     x##   x## #x  x  x#  x### ##x #x  x x####x    ##x      #################',
                 '#################            #H##     #        ###x#x x#x#x#x#x## # #x x# # # ####x#x#x x#x#x#x##     #        ##   #       #@ #################',
                 ' ############## #@  #   #  #   ##  #x # x  x # ###      #  #   ##x #x#        ####     # x #   ##x#  # # #   #H##   #    x#  #x# ############## ',
                 '    ############   #   x   #x x#  #    x    # ## #     x       ##@     x       ###     x  #   ###      x    #  ##H #   x  ##x  #################',
                 '#################              # ## ###  #x ##x# #x  #x # # # #   #  #  ### ##   ##  #  #x# #x# #              ##  @#x    H  #x#################',
                 '############### #  x##        ###  #x  ## x    ##  x## # #x    ###     ##  #x# ### #       x#x ##xHx#   x  #@# ###             # ###############',
                 '  # ###########  #x#x      #  @##x x#    x    #  # #  x##  x#  ##  #x #xHx    x##     x##     # #x#x         #  #           #   ############    ',
                 '    ########### #### x         ##   H ###x x# x## x   #x #x   # #     #  x  # x##x#x  # x#  #@#  #x   ###  ###  #         # # #  #########  #  #',
                 '#################      #      @##  #xx     xx ####   x   ##   x##x    #x#xx  ##### ##    ##    ##x  x# x    H x###x###    #   ## ## ########### ',
                 '##     ##  #### #@#####x ### x###    xx     x  ## ##  ##x  #x# ## # x ###x ##  ## ##  ##   #H# ##     x        ##        x     #################',
                 ' ############## # @#        x ### #   #x   x## ##       x    # ## x          #x## #      x     ###      x x  #x##H  #    x # # # ############## ',
                 '#################x#x        x#x## x#@      ##  ## H        x   ##        x#    ##      x       ## x#        #  ##x#x        x#x#################',
                 ' ###### ####### #     x#     x ## # x #  #   x ##  @#   #xx #x # # #   # x  H# ##x       #  #x # #      x     # #x            x# ############## ',
                 '################## H#x x      x##x @x#x       #### ###    x   ####     x#x#    ##xx       x#x  ### x    ####x  ###x#  #        #################',
                 '################# x#        #@ ## #  x#xx#x  # ##    #x##x# x  ## x#       x#  ##  x#x    x#   ## #  # ##x#  # ##    x #x   H  #################',
                 '################# x    x  H#   ##  #x#x   #x   ##   #x#    #x  ##   x  #   x#x ## #x#   # x#   ## x#x # x #    ##x#@  #     #  #################',
                 '#################x   ##     ##x## #  #      #x ## x#   x##  x  ## #    #x      ##    #   x#    ## ## x# ##x  #H## x# #x     ##@#################',
                 '#################   x#x        ###x  x# ##x   ### # # x   #  # ## H #  ##  # @x## #  #   x # # ###   x## #x  x###        x#x   #################',
                 '################# ###     x   ###   #       # ###   ##x      x ##  x    x   x ###    #    ###x ##  x x @ H x xx#################                ',
                 '#################x#  #x# #x  # ##    #         ##x   #  #x  x  ### #x      x #### x #   ###x   ##     #@#H  x  #################                ',
                 ' ############## # #  #x# #x  # ##    x  #      ###   #   x #x  ##  #x  #  xx x ###x #   ## x   ##     #@#H  x  # ##############                 ',
                 '#################     #       ### ##x x    ##x### #x     x#  #### xx  x# ##    ## #x x #    ## ## ##   @#H###xx#################                ',
                 '#################            # ## x ##x   x    ##   #x  x  ##  ## x    ##  #x  ## #x   x#    x ## ##x #@ H     #################                ' ]
      @elements = {
         '@' => { :text => "()", :fg => "#0000ff", :bg => "#000000" },
         'H' => { :text => "[]", :fg => "#ff0000", :bg => "#000000" },
         '#' => { :text => "##", :fg => "#007700", :bg => "#000000" },
         'x' => { :text => "<>", :fg => "#ffff00", :bg => "#000000" },
         ' ' => { :text => "  ", :fg => "#000000", :bg => "#000000" },
      }
      @whats_moving = '@'
      @distance = 0
      @level = 0
      @board = ""

      load_level( @level )
   end

   def get_pos( actor )
      pos = {}
      p = @board.index( actor )
      pos[ 'y' ] = ( p / LEVEL_WIDTH ).floor
      pos[ 'x' ] = p - ( pos[ 'y' ] * LEVEL_WIDTH )

      return pos
   end

   def get_cell( x, y )
      return @board[ y * LEVEL_WIDTH + x ]
   end

   def set_cell( x, y, value )
      @board[ y * LEVEL_WIDTH + x ] = value
   end

   def move( direction )
      d = { 'x' => 0, 'y' => 0 }
      d[ 'x' ] = -1 if direction == :left
      d[ 'x' ] = 1 if direction == :right
      d[ 'y' ] = -1 if direction == :up
      d[ 'y' ] = 1 if direction == :down

      coord = get_pos( @whats_moving )

      while ( 0 <= coord[ 'y' ] + d[ 'y' ] && coord[ 'y' ] + d[ 'y' ] < LEVEL_HEIGHT ) &&
            ( 0 <= coord[ 'x' ] + d[ 'x' ] && coord[ 'x' ] + d[ 'x' ] < LEVEL_WIDTH ) &&
            ( get_cell( coord[ 'x' ] + d[ 'x' ], coord[ 'y' ] + d[ 'y' ] ) == " " )  ||
            ( @whats_moving == "@" &&
              get_cell( coord[ 'x' ] + d[ 'x' ], coord[ 'y' ] + d[ 'y' ] ) == "x" )

         set_cell( coord[ 'x' ], coord[ 'y' ], ' ' )

         coord[ 'x' ] = coord[ 'x' ] + d[ 'x' ]
         coord[ 'y' ] = coord[ 'y' ] + d[ 'y' ]

         set_cell( coord[ 'x' ], coord[ 'y' ], @whats_moving )

         @distance = @distance + 1
      end
   end

   def load_level( level )
      @board = @levels[ level ]
   end

   def switch_moving
      @whats_moving = @whats_moving == '@' ? 'H' : '@'
   end

   def count_gifts
      return @board.count( 'x' )
   end

   def is_it_over?
      return count_gifts == 0
   end

   def to_s
      s = ""
      LEVEL_HEIGHT.times do
         |y|
         LEVEL_WIDTH.times do
            |x|
            s = s + @elements[ get_cell( x, y ) ][ :text ]
         end
         s = s + "\n"
      end
      return s
   end

   def nc_display(  )
      LEVEL_HEIGHT.times do
         |y|
         LEVEL_WIDTH.times do
            |x|
            Ncurses.stdscr.mvprintw( y+1, x*2, @elements[ get_cell( x, y ) ][ :text ] )
         end
      end
   end
end

Ncurses.initscr
begin
   # if (Ncurses.has_colors?)
   #    bg = Ncurses::COLOR_BLACK
   #    Ncurses.start_color
   #    if (Ncurses.respond_to?("use_default_colors"))
   #       if (Ncurses.use_default_colors == Ncurses::OK)
   #          bg = -1
   #       end
   #    end
   #    Ncurses.init_pair(1, Ncurses::COLOR_BLUE, bg);
   #    Ncurses.init_pair(2, Ncurses::COLOR_CYAN, bg);
   # end
   Ncurses.nl()
   Ncurses.noecho()
   Ncurses.curs_set(0)
   Ncurses.stdscr.nodelay(true)

   st = Star.new

   begin
      case(Ncurses.getch())
      when 'q'[0], 'Q'[0]
         Ncurses.curs_set(1)
         Ncurses.endwin()
         exit
      when 'h'
         st.move( :left )
         st.nc_display(  )
      when 'j'[0]
         st.move( :down )
         st.nc_display(  )
      when 'k'[0]
         st.move( :up )
         st.nc_display(  )
      when 'l'[0]
         st.move( :right )
         st.nc_display(  )
      end

      st.nc_display(  )
      Ncurses.refresh
   end while true
ensure
   Ncurses.curs_set(1)
   Ncurses.endwin()
end


# moves = [ :down, :right, :down, :left, :up, :right, :up, :left, :down, :right, :down, :left, :right, :up, :left, :up, :right, :up, :down, :left, :up, :right, :down, :up, :left, ]

# moves.each do
#    |direction|
#    st.move( direction )
#    puts st.is_it_over? ? "YES \o/" : "not yet"
# end

#puts st.to_s
