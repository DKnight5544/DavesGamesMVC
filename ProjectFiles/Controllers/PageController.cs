using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class PageController : Controller
    {
        public ActionResult Index(string id)
        {
            ViewBag.Title = "Timer Toys";
            ViewBag.CSS = "~/Content/TimerToys.css";
            ViewBag.JS = "~/Scripts/TimerToys.js";

            // Goto Home Page if no ID.
            if (string.IsNullOrWhiteSpace(id)) {
                return Redirect("/page/TimerToysHomePage");
            }

            ViewBag.PageKey = id;
            return View();
        }

    }
}