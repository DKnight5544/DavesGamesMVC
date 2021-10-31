using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class D2DController : Controller
    {
        // GET: D2D
        public ActionResult Index()
        {
            ViewBag.Title = "Dot To Dots";
            ViewBag.CSS = "~/Content/D2D.css";
            ViewBag.JS = "~/Scripts/D2D.js";
            return View();
        }
    }
}