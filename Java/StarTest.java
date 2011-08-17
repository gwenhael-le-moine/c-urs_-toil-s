import com.cycojesus.Star;

public class StarTest {
     public static void main( String[] args ) {
          Star star = new Star(  );
          star.debugDisplay(  );
          star.move( Star.direction.DOWN );
          star.move( Star.direction.RIGHT );
          star.move( Star.direction.DOWN );
          star.move( Star.direction.LEFT );
          star.move( Star.direction.UP );
          star.move( Star.direction.RIGHT );
          star.move( Star.direction.UP );
          star.move( Star.direction.LEFT );
          star.move( Star.direction.DOWN );
          star.move( Star.direction.RIGHT );
          star.move( Star.direction.DOWN );
          star.move( Star.direction.LEFT );
          star.move( Star.direction.RIGHT );
          star.move( Star.direction.UP );
          star.move( Star.direction.LEFT );
          star.move( Star.direction.UP );
          star.move( Star.direction.RIGHT );
          star.move( Star.direction.UP );
          star.move( Star.direction.DOWN );
          star.move( Star.direction.LEFT );
          star.move( Star.direction.UP );
          star.move( Star.direction.RIGHT );
          star.move( Star.direction.DOWN );
          star.move( Star.direction.UP );
          star.move( Star.direction.LEFT );
          star.switchActor(  );
          star.debugDisplay(  );
     }
}
