using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Benemaint.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public string Index(string policyNumber, string COCD)
        {
            ViewBag.Response = "PolicyNumber = " + policyNumber + " COCD=" + COCD;
            return "";
        }

    }
}
