using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DavesGamesMVC.DatabaseAccess.ChainLetter;

namespace DavesGamesMVC.Controllers
{
    public class CLController : Controller
    {
        // GET: CL
        public ActionResult Index(string id = "$JavaScriptGuru")
        {
            ViewBag.Title = "Virtual Chain Letter";
            ViewBag.CSS = "~/Content/cl.css";
            ViewBag.JS = "~/Scripts/cl.js";

            string userName = id;
            UserModel user;
            string connStr = Environment.GetEnvironmentVariable("DWKDBConnectionString");

            using (DWKDBDataContext c = new DWKDBDataContext(connStr))
            {

                if (id.Contains("add|"))
                {
                    var arr = id.Split('|');

                    userName = arr[1];
                    string sponsorName = arr[2];
                    c.AddUser(sponsorName, userName);
                    return Redirect(string.Format("/cl/{0}", userName));

                }

                else
                {
                    user = c.GetUser(userName).SingleOrDefault();
                    user.u1Name = IsNull(user.u1Name);
                    user.u2Name = IsNull(user.u2Name);
                    user.u3Name = IsNull(user.u3Name);
                    user.u4Name = IsNull(user.u4Name);
                    user.u5Name = IsNull(user.u5Name);
                    return View(user);
                }


            }
        }

        private string IsNull(string testString)
        {
            return string.IsNullOrWhiteSpace(testString) ? "---" : testString;
        }
    }
}