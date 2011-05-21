require 'test/unit'

class Star
   def initialize
      @levelsets = {
         :gstar => {
            :l01 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'B', 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'C', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'G', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'G', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'W', 'V', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l02 => [ [ 'V', 'W', 'V', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'V', 'V', 'W', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'B', 'W', ],
                      [ 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'W', 'G', 'V', 'V', 'V', 'G', 'V', 'V', 'V', ],
                      [ 'W', 'V', 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', 'V', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'W', 'C', 'W', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'V', 'V', 'V', 'W', 'V', 'V', 'W', 'V', 'W', 'V', 'V', 'V', 'W', 'G', 'G', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', ],
                      [ 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', ],
                    ],
            :l03 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'B', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'C', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'W', 'V', 'V', 'V', 'G', 'W', ],
                      [ 'W', 'V', 'W', 'G', 'V', 'V', 'G', 'V', 'V', 'G', 'W', 'V', 'V', 'G', 'W', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'G', 'V', 'W', 'G', 'V', 'V', 'G', 'V', 'G', 'W', 'W', 'W', ],
                      [ 'W', 'G', 'V', 'V', 'V', 'V', 'W', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l04 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'C', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'G', 'W', 'G', 'V', 'G', 'W', 'G', 'W', 'G', 'W', 'G', 'W', 'G', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'W', 'G', 'V', 'G', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'W', ],
                      [ 'W', 'W', 'G', 'W', 'G', 'W', 'G', 'V', 'G', 'W', 'G', 'W', 'G', 'W', 'G', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'B', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l05 => [ [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'B', 'V', 'V', 'W', 'V', 'V', 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'W', 'G', 'V', 'W', 'V', 'G', 'V', 'V', 'G', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'V', 'W', 'G', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'G', 'V', 'W', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'W', 'V', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'V', 'V', 'W', 'C', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'W', 'G', 'W', ],
                      [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                    ],
            :l06 => [ [ 'V', 'V', 'V', 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', 'G', 'V', 'G', 'W', ],
                      [ 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'V', 'W', 'W', ],
                      [ 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'B', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'W', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'C', 'V', 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'W', 'W', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l07 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'V', 'W', 'W', 'V', 'W', 'W', 'W', 'V', 'V', 'W', 'G', 'V', 'W', 'W', 'G', 'W', ],
                      [ 'V', 'W', 'G', 'V', 'V', 'W', 'G', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', ],
                      [ 'V', 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'W', 'W', 'W', 'V', 'W', 'W', 'V', 'V', ],
                      [ 'V', 'W', 'W', 'V', 'V', 'W', 'V', 'V', 'W', 'G', 'W', 'V', 'W', 'G', 'W', 'V', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'B', 'W', 'G', 'V', 'V', 'V', 'V', 'C', 'V', 'V', 'W', 'G', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l08 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'V', 'V', 'G', 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'W', 'G', 'V', 'V', 'W', 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'G', 'W', 'W', 'V', 'W', 'V', 'W', 'G', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'W', 'G', 'W', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'G', 'V', 'W', ],
                      [ 'W', 'G', 'C', 'G', 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'W', 'B', 'W', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l09 => [ [ 'V', 'V', 'W', 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'V', 'W', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'B', 'W', ],
                      [ 'W', 'G', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'V', ],
                      [ 'V', 'W', 'V', 'W', 'V', 'V', 'G', 'W', 'W', 'V', 'V', 'G', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'W', 'G', 'V', 'W', 'G', 'C', 'G', 'V', 'V', 'V', 'V', 'G', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', ],
                      [ 'W', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', 'V', 'V', 'V', ],
                    ],
            :l10 => [ [ 'V', 'V', 'V', 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'W', 'W', 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'C', 'V', 'W', 'W', 'W', 'G', 'V', 'G', 'W', 'V', 'G', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'V', 'V', 'W', 'G', 'V', 'W', 'G', 'V', 'V', 'V', 'W', 'V', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'G', 'V', 'V', 'W', 'V', 'G', 'W', ],
                      [ 'W', 'G', 'W', 'G', 'V', 'V', 'W', 'V', 'G', 'W', 'V', 'V', 'W', 'B', 'W', 'V', ],
                      [ 'V', 'W', 'G', 'V', 'V', 'V', 'W', 'W', 'W', 'V', 'V', 'W', 'W', 'W', 'V', 'V', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'W', 'V', 'W', 'V', ],
                      [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', 'V', 'W', 'V', 'V', 'W', ],
                    ],
            :l11 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'B', 'W', ],
                      [ 'W', 'V', 'V', 'W', 'G', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'G', 'V', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'V', 'G', 'W', ],
                      [ 'W', 'G', 'V', 'V', 'V', 'V', 'W', 'G', 'W', 'G', 'G', 'V', 'V', 'W', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'W', 'W', 'V', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'V', 'V', 'G', 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'C', 'V', 'G', 'W', ],
                      [ 'W', 'W', 'G', 'W', 'W', 'W', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'V', 'W', 'W', 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                    ],
            :l12 => [ [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'B', 'W', 'W', 'W', 'W', 'W', 'G', 'V', 'W', 'W', 'W', 'V', 'G', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'G', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'V', 'V', 'W', 'W', 'G', 'V', 'V', 'W', 'G', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'G', 'V', 'W', 'W', 'W', 'G', 'V', 'W', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'V', 'V', 'W', 'W', 'V', 'V', 'V', 'W', 'C', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l13 => [ [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'V', 'B', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'V', 'G', 'W', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'G', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'G', 'V', 'V', 'W', 'G', 'W', ],
                      [ 'W', 'C', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'W', 'V', 'W', 'V', 'W', ],
                      [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                    ],
            :l14 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'G', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'B', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'C', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'G', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l15 => [ [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'G', 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'B', 'W', 'V', 'V', 'V', 'W', 'G', 'G', 'V', 'W', 'G', 'V', 'W', ],
                      [ 'V', 'W', 'V', 'W', 'V', 'V', 'V', 'W', 'V', 'G', 'V', 'V', 'C', 'W', 'V', 'W', ],
                      [ 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'W', 'G', 'V', 'W', ],
                      [ 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'W', 'V', ],
                      [ 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', ],
                      [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                    ],
            :l16 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'C', 'W', 'G', 'V', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', ],
                      [ 'W', 'G', 'V', 'B', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'W', 'W', 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'G', 'W', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'W', 'W', 'W', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'G', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l17 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'B', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'G', 'W', 'G', 'G', 'W', 'G', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'W', 'G', 'W', 'W', 'G', 'W', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'W', 'V', 'W', 'W', 'G', 'W', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'W', 'G', 'V', 'V', 'V', 'C', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l18 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'C', 'W', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'W', 'G', 'W', 'G', 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'G', 'W', 'V', 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'G', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'W', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'G', 'W', 'V', 'V', 'V', 'W', 'V', 'G', 'W', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'G', 'V', 'W', 'V', 'G', 'V', 'W', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'W', 'B', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l19 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'G', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'G', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'V', 'V', 'V', 'G', 'W', 'W', 'V', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'V', 'G', 'W', 'V', 'W', 'W', 'G', 'V', 'V', 'W', 'C', 'W', ],
                      [ 'W', 'V', 'G', 'W', 'V', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'W', 'W', 'B', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l20 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'G', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'G', 'V', 'V', 'G', 'W', 'V', 'W', 'W', 'G', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'W', 'V', 'G', 'V', 'V', 'V', 'W', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'C', 'V', 'W', 'V', 'V', 'W', 'W', 'V', 'V', 'W', 'V', 'B', 'G', 'W', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'V', 'W', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'G', 'W', 'W', 'V', 'W', 'G', 'V', 'V', 'G', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'G', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                    ],
            :l21 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'W', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'G', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'W', 'W', 'W', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'G', 'V', 'G', 'V', 'B', 'V', 'C', 'V', 'G', 'V', 'G', 'G', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', ],
                    ],
            :l22 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'G', 'W', 'V', 'V', 'W', 'G', 'W', 'V', 'W', 'G', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'G', 'V', 'V', 'V', 'W', 'V', 'V', 'W', 'G', 'V', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'V', 'G', 'V', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'W', 'V', 'V', 'V', 'W', 'W', 'W', 'G', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'B', 'W', 'C', 'V', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', ],
                    ],
            :l23 => [ [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'W', 'V', 'W', 'V', 'V', 'W', 'G', 'W', 'V', 'W', 'G', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'G', 'V', 'W', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'W', 'G', 'V', 'V', 'W', 'V', 'V', 'G', 'G', 'V', 'G', 'V', 'W', ],
                      [ 'W', 'W', 'G', 'V', 'W', 'V', 'V', 'V', 'W', 'W', 'V', 'G', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'B', 'W', 'C', 'V', 'V', 'G', 'V', 'V', 'W', ],
                      [ 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'V', ],
                      [ 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', ],
                    ],
            :l24 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'G', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'W', 'G', 'W', 'W', ],
                      [ 'W', 'V', 'W', 'G', 'V', 'V', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'G', 'G', 'V', 'V', 'G', 'W', 'V', 'W', 'W', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'G', 'V', 'G', 'V', 'W', 'V', 'V', 'V', 'V', 'W', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'V', 'V', 'V', 'B', 'W', 'C', 'W', 'W', 'W', 'G', 'G', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', ],
                    ],
            :l25 => [ [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'W', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'W', 'W', 'G', 'V', 'V', 'V', 'G', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'V', 'V', 'W', 'G', 'V', 'V', 'G', 'V', 'V', 'W', 'W', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'G', 'V', 'V', 'V', 'V', 'W', 'W', 'V', 'V', 'W', 'G', 'V', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'G', 'V', 'V', 'V', 'G', 'W', 'V', 'V', 'V', 'V', 'G', 'V', 'W', ],
                      [ 'W', 'V', 'W', 'W', 'G', 'V', 'W', 'B', 'V', 'C', 'V', 'V', 'V', 'V', 'V', 'W', ],
                      [ 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', ],
                      [ 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', ],
                    ],
         }
      }
      @elements = {
         'B' => { :text => "()", :fg => "#0000ff", :bg => "#000000" },
         'C' => { :text => "[]", :fg => "#ff0000", :bg => "#000000" },
         'W' => { :text => "##", :fg => "#007700", :bg => "#000000" },
         'G' => { :text => "<>", :fg => "#ffff00", :bg => "#000000" },
         'V' => { :text => "  ", :fg => "#000000", :bg => "#000000" },
      }
      @counters = {
         :gifts => 0,
         :moves => 0,
      }
      @level = {
         :width => 16,
         :height => 9,
         :levelset => 0,
         :name => 0,
      }
      @whats_moving = :ball
      @positions = {
         :ball => { :x => 0, :y => 0 },
         :cube => { :x => 0, :y => 0 },
      }

      @level[ :levelset ] = @levelsets.keys.sort.first
      @level[ :name ] = @levelsets[ @level[ :levelset ] ].keys.sort.first

      load_level
   end
   def positions()
      @positions
   end

   def move_1_step( direction, objectToMove)
      dx = { :left => -1, :right => 1 }[ direction ]
      dy = { :down => 1, :up => -1 }[ direction ]
      dx = 0 unless dx
      dy = 0 unless dy
      new_x = @positions[ objectToMove ][ :x ] + dx 
      new_y = @positions[ objectToMove ][ :y ] + dy 
      { :x => new_x, :y => new_y }
      
   end

   def move( direction, objectToMove )
      
      d = { :h => 0, :v => 0 }
      d[ :h ] = -1 if direction == :left
      d[ :h ] = 1 if direction == :right
      d[ :v ] = -1 if direction == :up
      d[ :v ] = 1 if direction == :down

      newpos = { :x => 0, :y => 0 }
      newpos[ :x ] = @positions[ objectToMove ][ :x ]
      newpos[ :y ] = @positions[ objectToMove ][ :y ]

      while ( 0 <= newpos[ :y ] + d[ :v ] && newpos[ :y ] + d[ :v ] < @level[ :height ] ) &&
              ( 0 <= newpos[ :x ] + d[ :h ] && newpos[ :x ] + d[ :h ] < @level[ :width ] ) &&
              ( @board[ newpos[ :y ] + d[ :v ] ][ newpos[ :x ] + d[ :h ] ] == 'V' ) ||
              ( objectToMove == :ball &&
                @board[ newpos[ :y ] + d[ :v ] ][ newpos[ :x ] + d[ :h ] ] == 'G' )
         
         newpos[ :x ] = newpos[ :x ] + d[ :h ]
         newpos[ :y ] = newpos[ :y ] + d[ :v ]

         if objectToMove == :ball && @board[ newpos[ :y ] ][ newpos[ :x ] ] == 'G'
         then
            @board[ newpos[ :y ] ][ newpos[ :x ] ] = 'V'
            @counters[ :gifts ] = @counters[ :gifts ] - 1
         end
      end

      if newpos[ :x ] != @positions[ objectToMove][ :x ] ||
            newpos[ :y ] != @positions[ objectToMove][ :y ]
      then
         @board[ @positions[ objectToMove][ :y ] ][ @positions[ objectToMove][ :x ] ] = 'V'
         @positions[ objectToMove][ :x ] = newpos[ :x ]
         @positions[ objectToMove][ :y ] = newpos[ :y ]

         @board[ @positions[ objectToMove][ :y ] ][ @positions[ objectToMove][ :x ] ] = objectToMove == :ball ? 'B' : 'C'
         @counters[ :moves ] = @counters[ :moves ] + 1
      end
   end

   def load_level
      @board = @levelsets[ @level[ :levelset ] ][ @level[ :name ] ]
      @counters[ :gifts ] = 0

      @level[ :height ].times do
         |y|
         @level[ :width ].times do
            |x|
            case @board[ y ][ x ]
            when 'G'
               @counters[ :gifts ] = @counters[ :gifts ] + 1
            when 'B'
               @positions[ :ball ][ :x ] = x
               @positions[ :ball ][ :y ] = y
            when 'C'
               @positions[ :cube ][ :x ] = x
               @positions[ :cube ][ :y ] = y
            end
         end
      end

   end

   def switch_moving
      @whats_moving = @whats_moving == :ball ? :cube : :ball
   end

   def is_it_over?
      @counters[ :gifts ] == 0
   end

   def list_levelsets
      @levelsets.keys
   end

   def list_levels_in_levelset( levelset )
      @levelsets[ levelset ].keys
   end

   def to_s
      s = @elements[ 'G' ][ :text ] + ":" + @counters[ :gifts ].to_s + " "
      s = s + @elements[ 'B' ][ :text ] + ":(" + @positions[ :ball ][ :x ].to_s + "," + @positions[ :ball ][ :y ].to_s + ") "
      s = s + @elements[ 'C' ][ :text ] + ":(" + @positions[ :cube ][ :x ].to_s + "," + @positions[ :cube ][ :y ].to_s + ") "
      s = s + "m:" + @counters[ :moves ].to_s + "\n"
      @level[ :height ].times do
         |y|
         @level[ :width ].times do
            |x|
            s = s + @elements[ @board[ y ][ x ] ][ :text ]
         end
         s = s + "\n"
      end
      return s
   end
end


class TestBla < Test::Unit::TestCase
   def test_level_completion
      st = Star.new
      puts st.to_s

      moves = [ :down, :right, :down, :left, :up, :right, :up, :left, :down, :right, :down, :left, :right, :up, :left, :up, :right, :up, :down, :left, :up, :right, :down, :up, :left, ]

      moves.each do
         |direction|
         st.move( direction, :ball )
         # puts st.is_it_over? ? "YES \o/" : "not yet"
      end

      puts st.to_s
      assert_equal( true, st.is_it_over? )
   end

   def test_move_1_step
      st = Star.new
      puts st.to_s

      result = st.move_1_step( :down, :ball )
      
      assert_equal( 1, result[ :x ] )
      assert_equal( 2, result[ :y ] )
   end
end
