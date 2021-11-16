/*------------------------------------------------------------------------
 * 
 *  ** RIGHT CLICK TO SAVE ** 
 *  
 * Select the "Save As" option and save this demo code to your local 
 * computer. From there you can build on this code or start over if 
 * you wish.
 *  
 * In: A string representing the currrent status of the board.
 *     The string describes the board from left to right, top to bottom.
 *     The string is 50 chars long and every 2 chars is the numeric
 *     value of that square. The blank square is always #25.
 *     
 *     Example:
 *     20211013052425081917060711161203220204011815091423
 *                 ^^ Blank Square
 *                 
 *     Your first challange will be to parse this string
 *     into some kind of in-memory representation of the board.
 *     
 * Out: A string of characters representing your move or moves.
 * 
 *      Legal Chars: L, R, U, D and ?.
 *      
 *      Move the blank cell (L)eft, (R)ight, (U)p or (D)own,
 *      Swapping places with the cell that is there.
 *      
 *      ? or blank = Stumped or Finished.
 *      
 * GOAL: Is of course to put the puzzle back into numerical order
 *       in the fewest number of moves.
 *
 *       01 02 03 04 05
 *       06 07 08 09 10
 *       11 12 13 14 15
 *       16 17 18 19 20
 *       21 22 23 24 25
 *       
 *       I can usually solve the puzzle by hand in less than
 *       250 Moves.  It takes my Script about 500 or so moves.
 *      
 * NOTE: Any illegal moves returned will be ignored but your move 
 *       count will suffer. 
 *       
 * TO RUN YOUR CODE:  
 * From the user interface click the "Upload Script" button, find
 * your script and upload it.  Then use either the Move button to
 * step through your code 1 move at a time or the Animate button.
 *      
 * Description: 
 * This demo code moves the outer squares around in a circle.
 *--------------------------------------------------------------------------*/

function move(board) {

    // The blank or empty square is always square #25

    // lets get the position of the empty square and move
    // it into the top-left corner of the puzzle, and then
    // marching it around the perimeter.

    // demonstrates returning a single move
    let idx = board.indexOf('25');
    if (idx != 0) {
        return (idx > 8) ? "U" : "L";
    }

    // demonstrates returning multiple moves
    return "DDDDRRRRUUUULLLL";
}
