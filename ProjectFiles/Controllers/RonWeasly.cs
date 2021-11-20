
using System.Web.Mvc;

namespace DavesGamesMVC.Controllers
{
    public class RonWeaslyController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Gamebot: Weasly";
            ViewBag.CSS = "~/Content/RonWeasly.css";
            ViewBag.JS = "~/Scripts/RonWeasly.js";

            return View();

        }
    }
}