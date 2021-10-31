using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class SliderPuzzleController : Controller
    {
        // GET: SliderPuzzle
        public ActionResult Index(string id)
        {
            ViewBag.Title = "Slider Puzzle";
            ViewBag.CSS = "~/Content/SliderPuzzle.css";
            ViewBag.JS = "~/Scripts/SliderPuzzle.js";
            ViewBag.PicName = id;
            return View();
        }

    }
}