using System;
using System.Web.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using DavesGamesMVC.Models;

namespace DavesGamesMVC.Controllers
{
    public class SFD3Controller : Controller
    {

        // GET: SliderForDevs
        public ActionResult Index()
        {
            ViewBag.Title = "Slider For Devs";
            ViewBag.CSS = "~/Content/SFD3.css";
            ViewBag.JS = "~/Scripts/SFD3.js";

            return View();

        }
    }
}