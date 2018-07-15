using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Benemaint
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "ValicAISearch", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "",
                url: "{controller}/{action}/{param1}/{param2}/{param3}/{param4}/{param5}/{param6}/{param7}",
                defaults: new
                {
                    controller = "Valic",
                    action = "Index",
                    param1 = UrlParameter.Optional,
                    param2 = UrlParameter.Optional,
                    param3 = UrlParameter.Optional,
                    param4 = UrlParameter.Optional,
                    param5 = UrlParameter.Optional,
                    param6 = UrlParameter.Optional,
                    param7 = UrlParameter.Optional,
                }
            );
           
        }
    }
}