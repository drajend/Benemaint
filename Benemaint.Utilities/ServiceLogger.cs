using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Benemaint.Utilities
{
    public static class ServiceLogger
    {
        public static readonly ILog log = LogManager.GetLogger("ServiceLogger");

        static ServiceLogger()
        {
            //configure Log4Net to log the message
            log4net.Config.XmlConfigurator.Configure();
        }
    }
}