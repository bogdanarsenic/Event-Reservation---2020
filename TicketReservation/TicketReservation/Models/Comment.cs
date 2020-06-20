using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string ManifestationId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public bool IsActive { get; set; }

        public Comment()
        {

        }

        public Comment(string userId, string manifestationId, string text, int rating, bool isActive)
        {
            Id = Guid.NewGuid();
            UserId = userId;
            ManifestationId = manifestationId;
            Text = text;
            Rating = rating;
            IsActive = isActive;
        }
    }
}