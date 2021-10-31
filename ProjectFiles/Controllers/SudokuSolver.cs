using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class SudokuSolverController : Controller
    {
        // GET: D2D
        public ActionResult Index()
        {
            ViewBag.Title = "SudokuSolver";
            ViewBag.CSS = "~/Content/SudokuSolver.css";
            ViewBag.JS = "~/Scripts/Sudoku.js";
            return View();
        }
    }
}