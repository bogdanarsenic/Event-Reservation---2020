using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Location
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public float Lattitude { get; set; }

        [Required]
        public float Longitude { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Address max is 100")]
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