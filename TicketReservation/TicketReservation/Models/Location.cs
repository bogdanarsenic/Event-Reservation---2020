using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Location
    {
        public Guid Id { get; set; }
        public float Lattitude { get; set; }
        public float Longitude { get; set; }
        public string Address { get; set; }

        public Location()
        {

        }
        public Location(float lattitude, float longitude, string address)
        {
            Id = Guid.NewGuid();
            Lattitude = lattitude;
            Longitude = longitude;
            Address = address;
        }
    }
}