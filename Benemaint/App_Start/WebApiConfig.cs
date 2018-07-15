using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Benemaint
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {        // Web API routes
           
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{para}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "",
                routeTemplate: "api/{controller}/{action}/{param1}/{param2}/{param3}/{param4}/{param5}/{param6}/{param7}",
                defaults: new {
                    param2 = RouteParameter.Optional,
                    param3 = RouteParameter.Optional,
                    param4 = RouteParameter.Optional,
                    param5 = RouteParameter.Optional,
                    param6 = RouteParameter.Optional,
                    param7 = RouteParameter.Optional,
                }
            );

           

        }
    }
}
