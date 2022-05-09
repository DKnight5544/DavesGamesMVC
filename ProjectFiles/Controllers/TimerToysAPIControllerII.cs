using System;
using System.Linq;
using System.Web.Mvc;
using DavesGamesMVC.DatabaseAccess.TimerToys;
using DavesGamesMVC.Models;
using System.Web.Script.Serialization;

namespace DavesGamesMVC.Controllers
{
    public class TimerToysAPIController : Controller
    {
        [HttpPost]
        public String Index(TimersIn id)
        {
            string connStr = Environment.GetEnvironmentVariable("DWKDBConnectionString");

            JavaScriptSerializer jss = new JavaScriptSerializer();

            using (TimerToysDBDataContext c = new TimerToysDBDataContext(connStr))
            {
                if (id.Action == "GetAll")
                {
                    TimersPayload results = new Models.TimersPayload();

                    results.Page = c.SelectPage(id.PageKey).SingleOrDefault();
                    results.Timers = c.SelectTimers(id.PageKey).OrderBy(t => t.TimerKey).ToList();
                    results.Links = c.SelectLinks(id.PageKey).OrderBy(l => l.LinkKey).ToList();

                    return jss.Serialize(results);
                }

                else if (id.Action == "GetNewPage")
                {
                    var results = c.InsertPage().SingleOrDefault();
                    return jss.Serialize(results.PageKey);
                }

                else if (id.Action == "AddNewTimer")
                {
                    var results = c.InsertTimer(id.PageKey);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "AddNewLink")
                {
                    var results = c.InsertLink(id.PageKey);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "UpdatePageName")
                {
                    var results = c.UpdatePageName(id.PageKey, id.MyStringValue);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "UpdateTimerName")
                {
                    var results = c.UpdateTimerName(id.PageKey, id.TimerKey, id.MyStringValue);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "AdustTimer")
                {
                    var results = c.AdjustTimer(id.PageKey, id.TimerKey, id.MyIntValue);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "ToggleTimer")
                {
                    var results = c.ToggleTimer(id.PageKey, id.TimerKey);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "ResetTimer")
                {
                    var results = c.ResetTimer(id.PageKey, id.TimerKey);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "DeleteTimer")
                {
                    var results = c.DeleteTimer(id.PageKey, id.TimerKey);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "UpdateLinkName")
                {
                    var results = c.UpdateLinkName(id.PageKey, id.LinkKey, id.MyStringValue);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "UpdateLinkUrl")
                {
                    var results = c.UpdateLinkUrl(id.PageKey, id.LinkKey, id.MyStringValue);
                    return jss.Serialize("OK");
                }

                else if (id.Action == "DeleteLink")
                {
                    var results = c.DeleteTimer(id.PageKey, id.TimerKey);
                    return jss.Serialize("OK");
                }



                else return jss.Serialize("Action Not Found"); ;
            }
        }
    }

}