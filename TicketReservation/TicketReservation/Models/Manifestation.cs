using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Manifestation
    {
        [Required]
        public Guid Id { get; set; }

        [StringLength(50,MinimumLength =1,ErrorMessage = "Name is required!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Capacity is required!")]
        [Range(1, 10000, ErrorMessage = "Capacity must be in range 1 - 10000")]
        public int Capacity { get; set; }

        [Required(ErrorMessage = "Type is required!")]
        public string Type { get; set; }
        public DateTime EventTime { get; set; }

        [Required(ErrorMessage = "Price is required!")]
        [Range(1, 10000, ErrorMessage = "Price must be in range 1 - 10000")]
        public int Price { get; set; }
        public string Status { get; set; }

        public string LocationId { get; set; }

        [Required(ErrorMessage = "Place is required!")]
        public string Place { get; set; }
        public bool IsActive { get; set; }
        public string Pictures { get; set; }
        public string SellerId { get; set; }



        public Manifestation()
        {

        }

        public Manifestation(string name, int capacity, string type, DateTime eventTime, int price, string status, string locationId,string place, bool isActive, string pictures,string sellerId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Capacity = capacity;
            Type = type;
            EventTime = eventTime;
            Price = price;
            Status = status;
            LocationId = locationId;
            Place = place;
            IsActive = isActive;
            Pictures = pictures;
            SellerId = sellerId;
        }
    }
}