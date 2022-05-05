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

            id = string.IsNullOrWhiteSpace(id) ? "Home" : id;

            ViewBag.PageKey = id;
            return View();
        }
    }
}