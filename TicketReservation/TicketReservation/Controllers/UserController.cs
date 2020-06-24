using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
            temp.Role = "Buyer";
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
            temp.Role = "Seller";
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

        [Route("GetAllTicketsUsers")]
        public List<User> GetAllTicketsUsers(string Id)
        {
            List<User> ret = new List<User>();
            List<Ticket> ticket = ticketDB.GetAll();
            foreach (Ticket t in ticket)
            {
                Manifestation manTemp = manifestationDB.GetOneById(t.ManifestationId);
                if (manTemp.SellerId == Id)
                {
                    User temp = userDB.GetOne((t.Buyer));
                    ret.Add(temp);
                }
            }
            return ret;

        }
    }
}
