using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Ticket
    {
        public string Id { get; set; }
        public string ManifestationId { get; set; }
        public Manifestation Manifestation { get; set; }
        public DateTime? EventTime { get; set; }
        public int Price { get; set; }
        public string Buyer { get; set; }
        public string SellerId { get; set; }
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