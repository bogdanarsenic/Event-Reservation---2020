using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TicketReservation.AuthorizeHelper;
using TicketReservation.Models;
using TicketReservation.ModelsDB;

namespace TicketReservation.Controllers
{
    [RoutePrefix("api/Manifestation")]
    public class ManifestationController : ApiController
    {
        UserDB userDB = new UserDB();
        ManifestationDB manifestationDB = new ManifestationDB();
        CommentDB commentDB = new CommentDB();
        LocationDB locationDB = new LocationDB();
        TicketDB ticketDB = new TicketDB();

        [Route("GetAllManifestations")]
        public List<Manifestation> GetAllManifestations()
        {
            List<Manifestation> ret = null;
            ret = manifestationDB.GetAll();
            ret = ret.Where(p => p.EventTime != null).OrderBy(p => p.EventTime).ToList();

            return ret;

        }


        [Route("GetImage")]
        public string GetImage(string idEvent, string ImgName)
        {
            Manifestation temp = manifestationDB.GetOneById(idEvent);
            if (temp.Pictures == "")
            {
                temp.Pictures = ImgName;
            }
            else
            {
                temp.Pictures = temp.Pictures + ";" + ImgName;
            }

            manifestationDB.UpdatePicture(temp);
            return "Success";

        }




        [Route("RegisterManifestation")]
		[AuthorizeJwt]

		public string RegisterManifestation(Manifestation register)
        {
            register.Id = Guid.NewGuid();
            register.Pictures = "";
            register.IsActive = true;

            List<Manifestation> manifestations = new List<Manifestation>();
            manifestations = GetAllManifestations();

            if(manifestations.Count!=0)
            {
                foreach (Manifestation m in manifestations)
                {
                    if (m.EventTime == register.EventTime && m.Place == register.Place)
                    {
                        return "Already has event in that time and place";
                    }
                }
            }
            
            manifestationDB.Insert(register);

            return register.Id.ToString();
        }



        [Route("GetAllManifestationsByUserId")]
        public List<Manifestation> GetAllManifestationsByUserId(string id)
        {
            List<Manifestation> ret = null;
            ret = manifestationDB.GetAllBySellerId(id);

            ret = ret.Where(p => p.EventTime != null).OrderBy(p => p.EventTime).ToList();
    
            return ret;

        }

        [Route("GetOneManifestation")]
        public Manifestation GetOneManifestation(string idEvent)
        {
            string idTemp = idEvent;
            Manifestation ret = null;
            ret = manifestationDB.GetOneById(idTemp);
            return ret;
        }

        [HttpGet]
        [Route("GetStatus")]
        public string GetStatus(string idEvent, string status)
        {
            Manifestation temp = manifestationDB.GetOneById(idEvent);
            if (temp.Status == "NotApproved")
            {
                temp.Status = "Approved";
            }

            manifestationDB.UpdateStatus(temp);
            return "Success";

        }

        [Route("GetOneManifestationDelete")]
        public string GetOneManifestationDelete(Guid IdA)
        {
            try
            {
                string IdTemp = IdA.ToString();
                manifestationDB.Delete(IdTemp);
            }
            catch
            {
                return "Error!";
            }

            return "Success!";
        }

        [Route("Update")]
		[AuthorizeJwt]

		public string Update(Manifestation manifestation)
        {

            Manifestation temp = new Manifestation();
      
            temp.Id = manifestation.Id;
            temp.Name = manifestation.Name;
            temp.Type = manifestation.Type;
            temp.Price = manifestation.Price;
            temp.Capacity = manifestation.Capacity;
            temp.CapacityVIP = manifestation.CapacityVIP;
            temp.CapacityRegular = manifestation.CapacityRegular;
            temp.CapacityFunPit = manifestation.CapacityFunPit;
            temp.EventTime = manifestation.EventTime;

            manifestationDB.Update(temp);
            return "Success!";
        }

        [HttpPost]
		[AuthorizeJwt]

		[Route("Delete")]
        public string Delete(Manifestation delete)
        {
            string idEvent = delete.Id.ToString();
            Manifestation m = null;
            m = manifestationDB.GetOneById(idEvent);

            List<Ticket> t = null;
            t = ticketDB.GetAllByManifestationId(idEvent);

            if(t.Count!=0)
            {
                foreach (Ticket tic in t)
                    {
                        string idTic = tic.Id.ToString();
                        ticketDB.Delete(idTic);
                    }
            }

            manifestationDB.Delete(idEvent);
            return "Success!";
        }

        [Route("UpdateCapacity")]
        public string UpdateCapacity(Manifestation manifestation)
        {
            Manifestation temp = manifestationDB.GetOneById(Convert.ToString(manifestation.Id));
            temp.Capacity = manifestation.Capacity;
            temp.CapacityFunPit = manifestation.CapacityFunPit;
            temp.CapacityRegular = manifestation.CapacityRegular;
            temp.CapacityVIP = manifestation.CapacityVIP;

            manifestationDB.UpdateCapacity(temp);
            return "Success!";
        }

    }
}
