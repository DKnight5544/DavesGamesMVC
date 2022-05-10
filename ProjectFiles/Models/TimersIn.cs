using DavesGamesMVC.DatabaseAccess.TimerToys;
using System.Collections.Generic;

namespace DavesGamesMVC.Models
{
    public class TimersIn
    {
        public string Action { get; set; }
        public string PageKey { get; set; }
        public int ObjectKey { get; set; }
        public string StringValue { get; set; }
        public int IntegerValue { get; set; }

    }
}