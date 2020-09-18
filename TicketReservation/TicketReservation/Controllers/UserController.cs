using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using TicketReservation.Models;
using TicketReservation.ModelsDB;

namespace TicketReservation.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        UserDB userDB = new UserDB();
        TicketDB ticketDB = new TicketDB();
        ManifestationDB manifestationDB = new ManifestationDB();

        [Route("GetCurrent")]
        public User GetCurrent(string Username, string Password)
        {
            User u = null;
            u = userDB.GetOne(Username);
            if (u == null)
            {
                return null;
            }
            if (u.Password == Password)
            {
                return u;
            }
            return null;
        }


        [Route("GetCurrentByUsername")]
        public User GetCurrentByUsername(string Username)
        {
            User u = null;
            u = userDB.GetOne(Username);
            if (u == null)
            {
                return null;
            }
            return u;
        }


        [HttpGet]
        [Route("GetSession")]
        public User login(string username)
        {
            User u = null;
            u = userDB.GetOne(username);

            User retVal = null;

            retVal = (User)HttpContext.Current.Session["user"];
            if (retVal == null)
            {
                HttpContext.Current.Session["user"] = u;
                retVal = u;
            }
            return retVal;
        }

        [HttpGet]
        [Route("Logout")]
        public bool logout()
        {
            User user = null;
            user = (User)HttpContext.Current.Session["user"];
            if (user != null)
            {
                HttpContext.Current.Session.Abandon();
            }
            return true;
        }

        /*[HttpGet]
        [Route("GetCookie")]
        public HttpResponseMessage GetCookie(string username)
        {
            string cookieTxt = "";
            bool found = false;
            foreach (CookieHeaderValue chv in Request.Headers.GetCookies())
            {
                foreach (CookieState cs in chv.Cookies)
                {
                    cookieTxt += cs.Name + "->" + cs.Value + "\n";

                    if (cs.Name.Equals(username))
                    {
                        found = true;
                    }
                }
            }

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            if (!found)
            {
                var cookie = new System.Net.Http.Headers.CookieHeaderValue(username, username + "Cookie");
                cookie.Expires = DateTime.Now.AddDays(1);
                response.Headers.AddCookies(new System.Net.Http.Headers.CookieHeaderValue[] { cookie });
                cookieTxt += username + "->" + username + "kolacic";
            }
            
            response.Content = new StringContent("'Cookie':" + cookieTxt);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            return response;
        }
        */


        /*   [HttpGet]
           [Route("Logout")]
           public HttpResponseMessage Logout(string username)
           {
               string cookieTxt = "";
               bool found = false;
               foreach (CookieHeaderValue chv in Request.Headers.GetCookies())
               {
                   foreach (CookieState cs in chv.Cookies)
                   {
                       cookieTxt += cs.Name + "->" + cs.Value + "\n";

                       if (cs.Name.Equals(username))
                       {
                           found = true;
                       }
                   }
               }

               HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

               if (found)
               {
                   var cookie = new System.Net.Http.Headers.CookieHeaderValue(username, username + "Cookie");
                   cookie.Expires = DateTime.Now.AddDays(-1);
                   response.Headers.AddCookies(new System.Net.Http.Headers.CookieHeaderValue[] { cookie });
                   cookieTxt += username + "->" + username + "kolacic";

                   response.Content = new StringContent("'Cookie':" + cookieTxt);
                   response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
                   return response;
               }

               else
               {
                   HttpResponseMessage responseBad = new HttpResponseMessage(HttpStatusCode.BadRequest);
                   return responseBad;
               }


           }
        */

        [Route("Register")]
        public string Register(User register)
        {
            if (userDB.GetOne(register.Username) != null)
            {
                return "Username already exists!";
            }

            User temp = new User();

            temp.Username = register.Username;
            temp.Name = register.Name;
            temp.Surname = register.Surname;   
            temp.Password = register.Password;
            temp.Gender = register.Gender;
            temp.DateOfBirth = register.DateOfBirth;
            temp.Role = "Buyer";
            temp.TicketId = "";
            temp.ManifestationId = "";
            temp.Points = 0;
            temp.Type = "";
            temp.NoQuit = 0;
            temp.IsBlocked = false;
            temp.IsActive = true;
            userDB.Insert(temp);
            return "Success!";
        }

        [Route("Update")]
        public string Update(User register)
        {

            User temp = new User();
            temp.Username = register.Username;
            temp.Name = register.Name;
            temp.Surname = register.Surname;
            temp.Password = register.Password;
            temp.Gender = register.Gender;
            temp.Role = register.Role;
            userDB.Update(temp);
            return "Success!";
        }

        [Route("UpdateTypePoints")]
        public string UpdateTypePoints(User register)
        {
            User temp = userDB.GetOne(register.Username);
            temp.TicketId = register.TicketId;
            temp.Type = register.Type;
            temp.Points = register.Points;

            userDB.UpdateTypePoints(temp);
            return "Success!";
        }

        [Route("UpdateUserPointsQuits")]
        public string UpdateUserPointsQuits(User register)
        {
            User temp = userDB.GetOne(register.Username);
            temp.Points = register.Points;
            temp.NoQuit = register.NoQuit;

            userDB.UpdateUserPointsQuits(temp);
            return "Success!";
        }

        [Route("BlockUser")]
        public string BlockUser(User block)
        {
            User temp = userDB.GetOne(block.Username);
            temp.IsActive = block.IsActive;
            temp.IsBlocked = block.IsBlocked;
            userDB.Block(temp);
            return "Success!";
        }


        [HttpPost]
        [Route("DeleteUser")]
        public string DeleteUser(User delete)
        {

            List<Manifestation> m = manifestationDB.GetAllBySellerId(delete.Username);
            List<Ticket> t = null;

            if(m.Count!=0)
            {
                foreach(Manifestation man in m)
                    {
                        string id = man.Id.ToString();
                        manifestationDB.Delete(id);
                        t=ticketDB.GetAllByManifestationId(id);

                        if(t.Count!=0)
                        {
                            foreach(Ticket tic in t)
                            {
                                string idTic = tic.Id.ToString();
                                ticketDB.Delete(idTic);
                            }
                        }
                    }

            }

            else
            {
                t = ticketDB.GetAll();
                if(t.Count!=0)
                {
                    foreach(Ticket tic in t)
                    {
                        string idTic = tic.Id.ToString();

                        if (tic.Buyer == delete.Name + " " + delete.Surname)
                        {
                            ticketDB.Delete(idTic);
                        }
                    }
                }
            }


            userDB.Delete(delete);
            return "Success!";
        }

        [HttpGet]
        [Route("PutSellerId")]
        public string PutSellerId(string idEvent, string idUser)
        {
            User temp = userDB.GetOne(idUser);
            temp.ManifestationId = idEvent;
            userDB.UpdateSeller(temp);
            return "Success!";
        }


        [Route("RegisterSeller")]
        public string RegisterSeller(User register)
        {
            if (userDB.GetOne(register.Username) != null)
            {
                return "Username already exists!";
            }

            User temp = new User();
            temp.Username = register.Username;
            temp.Name = register.Name;
            temp.Surname = register.Surname;
            temp.Password = register.Password;
            temp.Gender = register.Gender;
            temp.DateOfBirth = register.DateOfBirth;
            temp.Role = "Seller";
            temp.ManifestationId = "";
            temp.TicketId = "";
            temp.Type = "";
            temp.Points = 0;
            temp.NoQuit = 0;
            temp.IsBlocked = false;
            temp.IsActive = true;
            userDB.Insert(temp);
            return "Success!";
        }

        [Route("GetAllUsers")]
        public List<User> GetAllUsers()
        {
            List<User> ret = null;
            ret = userDB.GetAll();
            return ret;

        }

        [Route("GetAllUserTicket")]
        public List<User> GetAllUserTicket(string id)
        {
            List<User> ret = new List<User>();
            User temp = new User();
            List<Ticket> ticket = ticketDB.GetAll();
            List<User> tempUsers = userDB.GetAll();

            foreach (Ticket t in ticket)
            {
                if (t.SellerId == id)
                {
                    foreach (User i in tempUsers)

                    {
                        if (t.Buyer == i.Name + " " + i.Surname)
                        {
                            ret.Add(i);
                        }
                    }
                }
            }
            return ret;

        }


    }
}
