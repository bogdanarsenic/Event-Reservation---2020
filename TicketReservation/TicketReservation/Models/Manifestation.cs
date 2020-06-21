using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Manifestation
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Type { get; set; }
        public DateTime EventTime { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
        public string PlaceId { get; set; }
        public Location Place { get; set; }
        public bool IsActive { get; set; }
        public string Pictures { get; set; }
        public string UserId { get; set; }



        public Manifestation()
        {

        }

        public Manifestation(string name, int capacity, string type, DateTime eventTime, int price, string status, string placeId, bool isActive, string pictures,string userId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Capacity = capacity;
            Type = type;
            EventTime = eventTime;
            Price = price;
            Status = status;
            PlaceId = placeId;
            IsActive = isActive;
            Pictures = pictures;
            UserId = userId;
        }
    }
}