using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;
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
            LoadEntities();
        }

        public void LoadAdmins()
        {
            UserDB userDB = new UserDB();
            User admin = new User();

			var filePath = HttpContext.Current.Server.MapPath("~/Admin/Admin.txt");

			string[] lines = System.IO.File.ReadAllLines(filePath);

			foreach (string line in lines)
            {
                string[] nesto = line.Split(',');

                admin.Username = nesto[0];
                admin.Password = nesto[1];
                admin.Name = nesto[2];
                admin.Surname = nesto[3];
                admin.Gender = nesto[4];
                admin.DateOfBirth = DateTime.ParseExact(nesto[5],"mm/dd/yyyy",System.Globalization.CultureInfo.InvariantCulture);
                admin.Role = "Admin";
                admin.ManifestationId = "";
                admin.TicketId = "";
                admin.Type = "";
                admin.Points = 0;
                admin.NoQuit = 0;
                admin.IsBlocked = false;
                admin.IsActive = true;
                userDB.Insert(admin);     
            }
        }

        public void LoadEntities()
        {

            UserDB userDB = new UserDB();
            ManifestationDB manifestationDB = new ManifestationDB();
            LocationDB locationDB = new LocationDB();
			TicketDB ticketDB = new TicketDB();
			CommentDB commentDB = new CommentDB();

            User user1 = new User();
            user1.Username = "User1";
            user1.Name = "User1";
            user1.Surname = "User1";
            user1.Password = "User1123!";
            user1.Gender = "male";
            user1.Role = "Buyer";
            user1.DateOfBirth = Convert.ToDateTime("12/01/1995");
            user1.ManifestationId = "";
            user1.TicketId = "2894181f-4595-4a3f-8f68-39e937d4d206";
            user1.Type = "Bronze";
            user1.Points = 133;
            user1.NoQuit = 0;
            user1.IsBlocked = false;
            user1.IsActive = true;
            userDB.Insert(user1);

            User user2 = new User();
            user2.Username = "User2";
            user2.Name = "User2";
            user2.Surname = "User2";
            user2.Password = "User2123!";
            user2.Gender = "male";
            user2.Role = "Buyer";
            user2.DateOfBirth = Convert.ToDateTime("12/05/1965");
            user2.ManifestationId = "";
            user2.TicketId = "";
            user2.Type = "";
            user2.Points = 0;
            user2.NoQuit = 0;
            user2.IsBlocked = false;
            user2.IsActive = true;
            userDB.Insert(user2);

            User seller = new User();
            seller.Username = "seller1";
            seller.Name = "seller1";
            seller.Surname = "seller1";
            seller.Password = "Seller1123!";
            seller.Gender = "male";
            seller.Role = "Seller";
            seller.DateOfBirth = Convert.ToDateTime("10/05/1994");
            seller.ManifestationId = "5b6a4143-87c0-4d7b-817b-0458dd7cf726";
            seller.TicketId = "";
            seller.Type = "";
            seller.Points = 0;
            seller.NoQuit = 0;
            seller.IsBlocked = false;
            seller.IsActive = true;
            userDB.Insert(seller);

            User seller2 = new User();
            seller2.Username = "seller2";
            seller2.Name = "seller2";
            seller2.Surname = "seller2";
            seller2.Password = "Seller2123!";
            seller2.Gender = "male";
            seller2.Role = "Seller";
            seller2.DateOfBirth = Convert.ToDateTime("02/11/1945");
            seller2.ManifestationId = "168273d1-fdcb-4527-8c8a-e77bd4b331d4";
            seller2.TicketId = "";
            seller2.Type = "";
            seller2.Points = 0;
            seller2.NoQuit = 0;
            seller2.IsBlocked = false;
            seller2.IsActive = true;
            userDB.Insert(seller2);

			Manifestation event1 = new Manifestation();
			event1.Id = new Guid("d58dfb04-822f-41d7-b170-973e69514fce");
			event1.Name = "Event1";
			event1.Type = "Festival";
			event1.Capacity = 190;
			event1.CapacityVIP = 20;
			event1.CapacityRegular = 130;
			event1.CapacityFunPit = 40;
			event1.Price = 100;
			event1.EventTime = new DateTime(2020, 12, 15);
			event1.Status = "Approved";
			event1.Place = "81 Bulevar  oslobodjenja, Novi Sad, Serbia";
			event1.SellerId = "seller1";
			event1.Pictures = "poster2.png;";
			event1.IsActive = true;
			event1.LocationId = "2d3b287e-ba87-49ab-971f-af431648eb2d";
			manifestationDB.Insert(event1);

			Manifestation event2 = new Manifestation();
			event2.Id = new Guid("5b6a4143-87c0-4d7b-817b-0458dd7cf726");
			event2.Name = "Event2";
			event2.Type = "Concert";
			event2.Capacity = 100;
			event2.CapacityVIP =10;
			event2.CapacityRegular =70;
			event2.CapacityFunPit =20;
			event2.Price = 500;
			event2.EventTime = new DateTime(2021, 1, 25);
			event2.Status = "Approved";
			event2.Place = "Mise Dimitrijevica 2, Novi Sad, Serbia";
			event2.SellerId = "seller1";
			event2.Pictures = "poster1.jpg;";
			event2.IsActive = true;
			event2.LocationId = "28a19974-ea43-46dc-972a-8f8eeb7d52ee";
            manifestationDB.Insert(event2);

            Manifestation event3 = new Manifestation();
            event3.Id = new Guid("168273d1-fdcb-4527-8c8a-e77bd4b331d4");
            event3.Name = "Event3";
            event3.Type = "Festival";
            event3.Capacity = 50;
            event3.CapacityVIP = 5;
            event3.CapacityRegular = 35;
            event3.CapacityFunPit = 10;
            event3.Price = 1000;
            event3.EventTime = new DateTime(2021, 2, 5);
            event3.Status = "Approved";
            event3.Place = "Mise Dimitrijevica 2, Novi Sad, Serbia";
            event3.SellerId = "seller2";
            event3.Pictures = "poster1.jpg;";
            event3.IsActive = true;
            event3.LocationId = "28a19974-ea43-46dc-972a-8f8eeb7d52ee";
            manifestationDB.Insert(event3);

            Location location1 = new Location();
            location1.Id = new Guid("28a19974-ea43-46dc-972a-8f8eeb7d52ee");
            location1.Address = "Mise Dimitrijevica 2, Novi Sad, Serbia";
            location1.Lattitude = 45.247537f;
            location1.Longitude = 19.834377f;
            locationDB.Insert(location1);

            Location location2 = new Location();
            location2.Id = new Guid("2d3b287e-ba87-49ab-971f-af431648eb2d");
            location2.Address = "81 Bulevar  oslobodjenja, Novi Sad, Serbia";
            location2.Lattitude = 45.254244f;
            location2.Longitude = 19.836737f;
            locationDB.Insert(location2);

			Ticket ticket1 = new Ticket();
			ticket1.Id = "2894181f-4595-4a3f-8f68-39e937d4d206";
			ticket1.Buyer = "User1 User1";
			ticket1.EventTime = new DateTime(2020, 12, 15);
			ticket1.IsActive = true;
			ticket1.ManifestationId ="d58dfb04-822f-41d7-b170-973e69514fce";
			ticket1.Price =1000;
			ticket1.SellerId = "seller1";
			ticket1.Status ="Reserved";
			ticket1.Type="Regular";
			ticketDB.Insert(ticket1);


			Comment comment1 = new Comment();
			comment1.Id = new Guid("6cd3d269-ea5b-4110-a4f1-b28518bfffce");
			comment1.IsActive = false;
			comment1.ManifestationId = "d58dfb04-822f-41d7-b170-973e69514fce";
			comment1.Rating = 5;
			comment1.Text = "Ova manifestacija je odlicna!";
			comment1.UserId = "User1";
			commentDB.Insert(comment1);
			

        }

        public override void Init()
        {
            this.PostAuthenticateRequest += MyPostAuthenticateRequest;
            base.Init();
        }

        /// <summary>
        /// Uključuje podršku za Session, samo ako URL od zahteva počinje stringom "/rest/"
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        void MyPostAuthenticateRequest(object sender, EventArgs e)
        {
                System.Web.HttpContext.Current.SetSessionStateBehavior(
                SessionStateBehavior.Required);           
        }
    }
}
