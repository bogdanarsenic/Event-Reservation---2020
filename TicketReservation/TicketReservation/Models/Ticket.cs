using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Ticket
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string ManifestationId { get; set; }
        public Manifestation Manifestation { get; set; }

        [Required]
        public DateTime? EventTime { get; set; }

        [Required(ErrorMessage = "Price is required!")]
        [Range(1, 10000, ErrorMessage = "Price must be in range 1 - 10000")]
        public int Price { get; set; }

        [Required]
        public string Buyer { get; set; }
        public string SellerId { get; set; }

        [Required]
        public string Status { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }

        public Ticket()
        {

        }

        public Ticket(string manifestationId,DateTime eventTime, int price, string buyer,string sellerId, string status, string type,bool isActive)
        {
            ManifestationId = manifestationId;
            Price = price;
            Buyer = buyer;
            SellerId = sellerId;
            Status = status;
            Type = type;
            IsActive = isActive;
        }
    }
}