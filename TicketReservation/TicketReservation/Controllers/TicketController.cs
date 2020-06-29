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
    [RoutePrefix("api/Ticket")]
    public class TicketController : ApiController
    {
        UserDB userDB = new UserDB();
        CommentDB commentDB = new CommentDB();
        LocationDB locationDB = new LocationDB();
        ManifestationDB manifestationDB = new ManifestationDB();
        TicketDB ticketDB = new TicketDB();



        [Route("GetAllTickets")]
        public List<Ticket> GetAllTickets()
        {
            List<Ticket> ret = null;
            ret = ticketDB.GetAll();
            return ret;
        }

        [Route("GetAllTicketsManifestation")]
        public List<Ticket> GetAllTicketsManifestation(string IdMan)
        {
            List<Ticket> ret = null;
            ret = ticketDB.GetAllByManifestationId(IdMan);
            return ret;
        }

        [Route("UpdateTicketStatus")]
        public string UpdateTicketStatus(Ticket ticket)
        {
            ticketDB.UpdateStatus(ticket);

            return "Success!";
        }

        [Route("RegisterTicket")]
        public string RegisterTicket(Ticket ticket)
        {
            string nesto = Convert.ToString(Guid.NewGuid());
            ticket.Id =nesto.Substring(0, 10);
            ticket.IsActive = true;

            ticketDB.Insert(ticket);
            return ticket.Id;
        }

        [Route("GetAllReservedTicketsSeller")]
        public List<Ticket> GetAllReservedTicketsSeller(string IdSeller)
        {
            List<Ticket> ret1 = null;
            List<Ticket> ret2 = new List<Ticket>();
            User u = userDB.GetOne(IdSeller);
            ret1 = ticketDB.GetAll();
            foreach (Ticket t in ret1)
            {
                if(t.SellerId==IdSeller && t.Status=="Reserved")
                { 
                    ret2.Add(t);
                }
            }
            return ret2;
        }

        [Route("GetAllReservedTicketsBuyer")]
        public List<Ticket> GetAllReservedTicketsBuyer(string name,string surname)
        {
            List<Ticket> ret = new List<Ticket>();
            Ticket temp = new Ticket();
            List<Ticket> ticket = ticketDB.GetAll();


            foreach (Ticket t in ticket)
            {
                if(t.Buyer==(name+" "+surname))
                {
                    ret.Add(t);
                }
            }
            return ret;

        }

        [Route("GetTicketUserEvent")]
        public Ticket GetTicketUserEvent(string userId,string idEvent)
        {
            Ticket t = null;
            t = ticketDB.GetOne(userId,idEvent);
            if (t == null)
            {
                return null;
            }
            return t;
        }



    }
}
