using System.Web;
using System.Web.Optimization;

namespace Benemaint
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/JB").Include(
               "~/Scripts/jquery-1.12.4.js",
               "~/Scripts/bootstrap.3.3.7.min.js",
               "~/Scripts/jquery.dataTables1.10.13.min.js",
               "~/Scripts/dataTables.select.min-1.2.1.js",
               "~/Scripts/dataTables.keyTable.min-2.2.0.js",
               "~/Scripts/dataTables.responsive-2.1.1.min.js",
               "~/Scripts/moment.min.js",
               "~/Scripts/datetime-moment.js",
               "~/Scripts/dataTables.datetime.js",
               "~/Scripts/Benemaint/Common.js"
               ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.v3.3.7.min.css",
                "~/Content/jquery.dataTables.min.css",
                "~/Content/dataTables.responsive.css",
                "~/Content/responsive.dataTables.min.css",
                "~/Content/font-awesome.min.css",
                "~/Content/keyTable.dataTables-2.2.0.min.css",
                "~/Content/select.dataTables-1.2.1.min.css",
                "~/Content/Benemaint.css"
                ));

            
            bundles.Add(new StyleBundle("~/bundles/Benemaint").Include(
                 "~/Scripts/Benemaint/Benemaint.js"));

            bundles.Add(new StyleBundle("~/bundles/ValicAISearch").Include(
                 "~/Scripts/Benemaint/ValicAISearch.js"));

        }
    }
}