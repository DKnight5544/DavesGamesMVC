using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DavesGamesMVC.Models
{
    public class Timer
    {
        //PageKey = @PageKey
        //, ReadOnlyKey = p.ReadOnlyKey
        //, p.PageName
        //, t.TimerName
        //, t.SortIndex
        //, TimerKey = iif(@PageKey = p.PageKey, t.TimerKey, null)
        //, [ReadOnly] = iif(@PageKey = p.PageKey, 0, 1)
        //, IsRunning = iif(t.StartTime is null, 0, 1)
        //, ElapsedTime = iif(
        //					  t.StartTime is null
        //					, t.ElapsedTime
        //					, datediff(second, t.StartTime, getutcdate()) + t.ElapsedTime
        //					)

        public string PageKey { get; set; }
        public string ReadOnlyKey { get; set; }
        public string PageName { get; set; }
        public string TimerName { get; set; }
        public int SortIndex { get; set; }
        public String TimerKey { get; set; }
        public bool IsReadOnly { get; set; }
        public bool IsRunning { get; set; }
        public int ElapsedSeconds { get; set; }

    }
}