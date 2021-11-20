using System;
using System.Web.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using DavesGamesMVC.Models;

namespace DavesGamesMVC.Controllers
{
    public class SFD2Controller : Controller
    {

        // GET: SliderForDevs
        public ActionResult Index()
        {
            ViewBag.Title = "Slider For Devs";
            ViewBag.CSS = "~/Content/SFD2.css";
            ViewBag.JS = "~/Scripts/SFD2.js";

            return View();

        }
    }
}