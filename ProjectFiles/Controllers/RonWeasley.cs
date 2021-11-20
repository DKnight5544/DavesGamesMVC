
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class RonWeasleyController : Controller
    {
        public ActionResult Index(string id)
        {
            //06011122040325130918210805101715190220121407232416
            //            ^^
            //06 01 11 22 04
            //03 25 13 09 18
            //21 08 05 10 17
            //15 19 02 20 12
            //14 07 23 24 16            

            string move = "";

            if (string.IsNullOrWhiteSpace(id))
            {
                ViewBag.Title = "Gamebot: Weasley";
                ViewBag.CSS = "~/Content/RonWeasley.css";
                ViewBag.JS = "~/Scripts/RonWeasley.js";
                return View();
            }

            // bail if position 1 is already solved.
            if (id.IndexOf("01") == 0)
            {
                Response.Write("?");
                return null;
            }

            // get column and row of the blank square (25)
            Cell blank = Locate(id, "25");
            Cell cell01 = Locate(id, "01");


            if (blank.Row < cell01.Row) move = "D";
            else if (blank.Col < cell01.Col) move = "L";
            else if (blank.Row > cell01.Row + 1) move = "U";
            else if (blank.Col > cell01.Col) move = "R";
            else move = "?";

            Response.Write(move);
            return null;

        }

        private Cell Locate(string board, string number)
        {
            Cell result = new Cell();

            int idx = board.IndexOf(number);

            result.Row = (idx < 10) ? 1
                       : (idx < 15) ? 2
                       : (idx < 20) ? 3
                       : (idx < 25) ? 4 : 5;


            result.Col = idx - ((result.Row - 1) * 10);

            return result;
        }


        private class Cell
        {
            public int Row { get; set; }
            public int Col { get; set; }
        }

    }
}