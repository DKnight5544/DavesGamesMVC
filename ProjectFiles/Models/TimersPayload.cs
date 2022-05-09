using DavesGamesMVC.DatabaseAccess.TimerToys;
using System.Collections.Generic;

namespace DavesGamesMVC.Models
{
    public class TimersPayload
    {
        public PageModel Page { get; set; }
        public List<TimerModel> Timers { get; set; }
        public List<LinkModel> Links { get; set; }

    }
}