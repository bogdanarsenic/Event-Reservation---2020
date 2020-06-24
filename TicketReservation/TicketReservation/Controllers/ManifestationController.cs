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
            return ret;

        }


        [Route("GetOneManifestationAddedImage")]
        public string GetOneManifestationAddedImage(string IdMan, string ImgName)
        {
            Manifestation temp = manifestationDB.GetOneById(IdMan);
            if (temp.Pictures == "")
            {
                temp.Pictures = ImgName;
            }
            else
            {
                temp.Pictures = temp.Pictures + ";" + ImgName;
            }

            manifestationDB.Update(temp);
            return "Success";

        }




        [Route("RegisterManifestation")]
        public string RegisterManifestation(Manifestation register)
        {
            register.Id = Guid.NewGuid();
            register.Pictures = "";
            register.IsActive = false;


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
        public List<Manifestation> GetAllManifestationsByUserId(string IdAp)
        {
            List<Manifestation> ret = null;
            ret = manifestationDB.GetAllBySellerId(IdAp);
            return ret;

        }

        [Route("GetOneManifestation")]
        public Manifestation GetOneManifestation(Guid Id)
        {
            string idTemp = Id.ToString();
            Manifestation ret = null;
            ret = manifestationDB.GetOneById(idTemp);
            return ret;
        }

        [Route("GetOneManifestationUpdate")]
        public string GetOneManifestationUpdate(Guid IdA)
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

    }
}
