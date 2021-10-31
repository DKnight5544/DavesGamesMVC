using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Dave's Games";
            ViewBag.CSS = "~/Content/Home.css";
            ViewBag.JS = "~/Scripts/Home.js";
            return View();
        }

    }
}