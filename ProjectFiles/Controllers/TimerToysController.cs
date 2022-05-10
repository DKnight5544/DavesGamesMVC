using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DavesGamesMVC.DatabaseAccess.TimerToys;
using DavesGamesMVC.Models;

namespace DavesGamesMVC.Controllers
{
    public class TimerToysController : Controller
    {
        public ActionResult Index(string id)
        {
            ViewBag.Title = "TimerToys";
            ViewBag.CSS = "~/Content/TimerToys.css";
            ViewBag.JS = "~/Scripts/TimerToys.js";

            // Goto Home Page if no ID.
            id = string.IsNullOrWhiteSpace(id) ? "A0EB954A-2C18-48BF-BA9F-570650EAC2F2" : id;

            ViewBag.PageKey = id;
            return View();
        }
    }
}