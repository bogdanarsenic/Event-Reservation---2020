using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using TicketReservation.Models;
using TicketReservation.ModelsDB;

namespace TicketReservation
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings
           .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters
            .Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            LoadAdmins();
        }

        public void LoadAdmins()
        {
            UserDB userDB = new UserDB();
            User admin = new User();

            string[] lines = System.IO.File.ReadAllLines(@"C:\Users\Bogdan\Desktop\Web-2020\Admin.txt");


            foreach (string line in lines)
            {
                string[] nesto = line.Split(',');

                admin.Username = nesto[0];
                admin.Password = nesto[1];
                admin.Name = nesto[2];
                admin.Surname = nesto[3];
                admin.Gender = nesto[4];
                admin.Role = "Admin";
                admin.ManifestationId = "";
                admin.TicketId = "";
                admin.Type = "";
                admin.Points = 0;
                admin.NoQuit = 0;
                admin.IsBlocked = false;
                userDB.Insert(admin);

                
            }
        }
    }
}
