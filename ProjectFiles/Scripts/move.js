/*------------------------------------------------------------------------
 * 
 *  ** RIGHT CLICK TO SAVE ** 
 *  
 * Select the "Save As" option and save this demo code to your local 
 * computer. From there you can build on this code or start over if 
 * you wish.
 * 
 * REQUIRED FOR CONTEST
 * Your Email Address:
 * Your Inviter's Email Address:
 * 
 * In: A string representing the currrent status of the board.
 * 
 * Out: A single character: L, R, U, D or ?.
 *      Move the blank cell (L)eft, (R)ight, (U)p or (D)own,
 *      Swapping places with the cell that is there.
 *      ? or blank = Stumped or Finished.
 *      
 * NOTE: Any illegal moves returned will be ignored but your move 
 *       count will suffer.
 *      
 * Description: 
 * This demo code moves the outer squares around in a circle.
 *--------------------------------------------------------------------------*/

function move(board) {

    // The blank or empty square is always square #25
    // lets get the position of that square and move
    // it into the top-left square.

    let idx = board.indexOf('25');
    if (idx != 0) {
        return (idx > 8) ? "U" : "L";
    }

    // Now march it around the board . . .
    return "DDDDRRRRUUUULLLL";
}
