using DavesGamesMVC.DatabaseAccess.TimerToys;
using System.Collections.Generic;

namespace DavesGamesMVC.Models
{
    public class TimersIn
    {
        public string Action { get; set; }
        public string PageKey { get; set; }
        public int TimerKey { get; set; }
        public int LinkKey { get; set; }
        public string MyStringValue { get; set; }
        public int MyIntValue { get; set; }

    }
}