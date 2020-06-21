using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

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

                userDB.Insert(admin);
            }
        }
    }
}
