﻿using System;
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
            temp.TicketId = "";
            temp.ManifestationId = "";
            temp.Points = 0;
            temp.Type = "";
            temp.NoQuit = 0;
            temp.IsBlocked = false;
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
            temp.Role = "Seller";
            temp.ManifestationId = "";
            temp.TicketId = "";
            temp.Type = "";
            temp.Points = 0;
            temp.NoQuit = 0;
            temp.IsBlocked = false;
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
        public List<User> GetAllUserTicket()
        {
            List<User> ret = new List<User>();
            User temp = new User();
            List<Ticket> ticket = ticketDB.GetAll();
            List<User> tempUsers = userDB.GetAll();

            foreach (Ticket t in ticket)
            {
                foreach(User i in tempUsers)

                {
                    if(t.Buyer==i.Name+" "+i.Surname)
                    {
                        ret.Add(i);
                    }
                }
            }
            return ret;

        }


    }
}