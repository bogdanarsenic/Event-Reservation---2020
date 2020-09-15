using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class User
    {
        [Required]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Username need to be between 1 and 50 long")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required!"), MinLength(8), MaxLength(50)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Name is required!"), MinLength(1), MaxLength(30)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname is required!"), MinLength(1), MaxLength(30)]
        public string Surname { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Type { get; set; }

        public DateTime DateOfBirth { get; set; }
        public string TicketId { get; set; }
        public string ManifestationId { get; set; }
        public float Points { get; set; }
        public int NoQuit { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsActive { get; set; }


        public User()
        {

        }

        public User(string username, string password, string name, string surname, DateTime dateOfBirth,string gender, string role, string type,string ticketId,float points,string manifestationId, int noQuit, bool isBlocked, bool isActive)
        {
            Username = username;
            Password = password;
            Name = name;
            Surname = surname;
            Gender = gender;
            Role = role;
            Type = type;
            DateOfBirth = dateOfBirth;
            NoQuit = noQuit;
            IsBlocked = isBlocked;
            IsActive = isActive;

            if (role == "Buyer")
            {
                TicketId = ticketId;
                Points = points;
            }
            else if (role == "Seller")
            {
                ManifestationId = manifestationId;
            }
        }
    }
}