using System;
using System.Web.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using DavesGamesMVC.Models;

namespace DavesGamesMVC.Controllers
{
    public class SFDController : Controller
    {

        const string StorageAccountName = "davidsmainstorageaccount";
        const string StorageAccountKey = "khl01c+Gf53h2CmjQZ5yyGJSxsf9ao4yEBoQBCTuo5Z+pVVW5Fz3WGVeKMd8IEcrJLaMuPDK0rQFKbl9BpUsKg==";

        // GET: SliderForDevs
        public ActionResult Index()
        {
            ViewBag.Title = "Slider For Devs";
            ViewBag.CSS = "~/Content/SFD.css";
            ViewBag.JS = "~/Scripts/SFD.js";
            ViewBag.MoveJS = "~/Scripts/Move.js";
            ViewBag.GridString = "01020304050607080910111213141516171819202122232425";
            ViewBag.AboutDisplayStatus = "inline-block";
            //In shared folder
            return View("SFD");
        }
    }
}