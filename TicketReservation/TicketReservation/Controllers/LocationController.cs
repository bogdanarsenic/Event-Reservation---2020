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
    [RoutePrefix("api/Location")]
    public class LocationController : ApiController
    {
        LocationDB locationDB = new LocationDB();
        [Route("GetAllLocations")]
        public List<Location> GetAllLocations()
        {
            List<Location> ret = null;
            ret = locationDB.GetAll();
            return ret;
        }

        [Route("RegisterLocation")]
        public string RegisterLocation(Location location)
        {
            location.Id = Guid.NewGuid();
            locationDB.Insert(location);
            return location.Id.ToString();
        }

        [Route("GetOneLocation")]
        public Location GetOneLocation(string id)
        {
            string idTemp = id;
            Location ret = null;
            ret = locationDB.GetOne(id);
            return ret;
        }
    }
}
