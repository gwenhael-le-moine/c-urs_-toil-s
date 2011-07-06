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

p (coord[ 'x' ] + d[ 'x' ]).to_s + ", " + (coord[ 'y' ] + d[ 'y' ]).to_s + ": " + get_cell( coord[ 'x' ] + d[ 'x' ], coord[ 'y' ] + d[ 'y' ] )
      while ( 0 <= coord[ 'y' ] + d[ 'y' ] && coord[ 'y' ] + d[ 'y' ] < LEVEL_HEIGHT ) &&
            ( 0 <= coord[ 'x' ] + d[ 'x' ] && coord[ 'x' ] + d[ 'x' ] < LEVEL_WIDTH ) &&
            ( get_cell( coord[ 'x' ] + d[ 'x' ], coord[ 'y' ] + d[ 'y' ] ) == " " )  ||
            ( @whats_moving == "@" &&
              get_cell( coord[ 'x' ] + d[ 'x' ], coord[ 'y' ] + d[ 'y' ] ) == "x" )

         p "moving"
         set_cell( coord[ 'x' ], coord[ 'y' ], ' ' )

         coord[ 'x' ] = coord[ 'x' ] + d[ 'x' ]
         coord[ 'y' ] = coord[ 'y' ] + d[ 'y' ]

         set_cell( coord[ 'x' ], coord[ 'y' ], @whats_moving )
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
            s = s + @elements[ @board[ y * LEVEL_WIDTH + x ] ][ :text ]
         end
         s = s + "\n"
      end
      return s
   end
end

st = Star.new
puts st.to_s

moves = [ :down, :right, :down, :left, :up, :right, :up, :left, :down, :right, :down, :left, :right, :up, :left, :up, :right, :up, :down, :left, :up, :right, :down, :up, :left, ]

moves.each do
   |direction|
   st.move( direction )
   puts st.is_it_over? ? "YES \o/" : "not yet"
end

puts st.to_s
