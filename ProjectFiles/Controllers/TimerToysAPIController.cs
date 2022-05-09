using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DavesGamesMVC.DatabaseAccess.TimerToys;
using DavesGamesMVC.Models;
using System.Web.Script.Serialization;

namespace DavesGamesMVC.Controllers
{
    public class TimerToysAPIController : Controller
    {
        [HttpGet]
        public String Index(string id)
        {
            string connStr = Environment.GetEnvironmentVariable("DWKDBConnectionString");
            JavaScriptSerializer jss = new JavaScriptSerializer();

            using (TimerToysDBDataContext c = new TimerToysDBDataContext(connStr))
            {
                string[] arr = id.Split("|".ToCharArray());
                string action = arr[0];

                if (action == "GetAll")
                {
                    string pageKey = arr[1];

                    TimersPayload results = new Models.TimersPayload();

                    results.Page = c.SelectPage(pageKey).SingleOrDefault();
                    results.Timers = c.SelectTimers(pageKey).OrderBy(t => t.TimerKey).ToList();
                    results.Links = c.SelectLinks(pageKey).OrderBy(l => l.LinkKey).ToList();

                    return jss.Serialize(results);
                }

                else if (action == "GetNewPage")
                {
                    var results = c.InsertPage().SingleOrDefault();
                    return jss.Serialize(results.PageKey);
                }

                else if (action == "AddNewTimer")
                {
                    string pageKey = arr[1];
                    var results = c.InsertTimer(pageKey);
                    return jss.Serialize("OK");
                }

                else if (action == "AddNewLink")
                {
                    string pageKey = arr[1];
                    var results = c.InsertLink(pageKey);
                    return jss.Serialize("OK");
                }

                else if (action == "UpdatePageName")
                {
                    string pageKey = arr[1];
                    string pageName = arr[2];
                    var results = c.UpdatePageName(pageKey, pageName);
                    return jss.Serialize("OK");
                }

                else if (action == "UpdateTimerName")
                {
                    string pageKey = arr[1];
                    string timerKey = arr[2];
                    string timerName = arr[3];
                    var results = c.UpdateTimerName(pageKey, timerKey, timerName);
                    return jss.Serialize("OK");
                }

                else if (action == "AdustTimer")
                {
                    string pageKey = arr[1];
                    string timerKey = arr[2];
                    int offset = int.Parse(arr[3]);
                    var results = c.AdjustTimer(pageKey, timerKey, offset);
                    return jss.Serialize("OK");
                }

                else if (action == "ToggleTimer")
                {
                    string pageKey = arr[1];
                    string timerKey = arr[2];
                    var results = c.ToggleTimer(pageKey, timerKey);
                    return jss.Serialize("OK");
                }

                else if (action == "ResetTimer")
                {
                    string pageKey = arr[1];
                    string timerKey = arr[2];
                    var results = c.ResetTimer(pageKey, timerKey);
                    return jss.Serialize("OK");
                }

                else if (action == "DeleteTimer")
                {
                    string pageKey = arr[1];
                    string timerKey = arr[2];
                    var results = c.DeleteTimer(pageKey, int.Parse(timerKey));
                    return jss.Serialize("OK");
                }

                else if (action == "UpdateLinkName")
                {
                    string pageKey = arr[1];
                    string linkKey = arr[2];
                    string linkName = arr[3];
                    var results = c.UpdateLinkName(pageKey, linkKey, linkName);
                    return jss.Serialize("OK");
                }

                else if (action == "UpdateLinkUrl")
                {
                    string pageKey = arr[1];
                    string linkKey = arr[2];
                    string linkUrl = arr[3];
                    var results = c.UpdateLinkUrl(pageKey, linkKey, linkUrl);
                    return jss.Serialize("OK");
                }

                else if (action == "DeleteLink")
                {
                    string pageKey = arr[1];
                    string linkKey = arr[2];
                    var results = c.DeleteTimer(pageKey, int.Parse(linkKey));
                    return jss.Serialize("OK");
                }



                else return jss.Serialize("Action Not Found"); ;
            }
        }
    }
}