using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TicketReservation.Models
{
    public class User
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public string Role { get; set; }
        public string Type { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string TicketId { get; set; }
        public string ManifestationId { get; set; }
        public float Points { get; set; }


        public User()
        {

        }

        public User(string username, string password, string name, string surname, DateTime dateOfBirth,string gender, string role, string type,string ticketId,float points,string manifestationId)
        {
            Username = username;
            Password = password;
            Name = name;
            Surname = surname;
            Gender = gender;
            Role = role;
            Type = type;
            DateOfBirth = dateOfBirth;

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