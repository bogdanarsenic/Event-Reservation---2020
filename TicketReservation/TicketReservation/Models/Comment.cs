using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class Comment
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "UserId needs to be maximum 50 long")]
        public string UserId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "EventId needs to be maximum 50 long")]
        public string ManifestationId { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Text needs to be maximum 100 long")]
        public string Text { get; set; }

        [Required]
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