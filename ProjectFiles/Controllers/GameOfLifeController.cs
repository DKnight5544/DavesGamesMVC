using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DavesGamesMVC.Content
{
    public class GameOfLifeController : Controller
    {
        // GET: GameOfLife
        public ActionResult Index()
        {
            ViewBag.Title = "Game Of Life";
            ViewBag.CSS = "~/Content/GameOfLife.css";
            ViewBag.JS = "~/Scripts/GameOfLife.js";
            return View();
        }
    }
}