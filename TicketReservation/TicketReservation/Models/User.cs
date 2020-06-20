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
        public List<Ticket> Tickets { get; set; }
        public List<Manifestation>Manifestations { get; set; }
        public int Points { get; set; }


        public User()
        {

        }

        public User(string username, string password, string name, string surname, string gender, string role, string type,int points)
        {
            Username = username;
            Password = password;
            Name = name;
            Surname = surname;
            Gender = gender;
            Role = role;
            Type = type;

            if (role == "Buyer")
            {
                Tickets = new List<Ticket>();
                Points = points;
            }
            else if (role == "Seller")
            {
                Manifestations = new List<Manifestation>();
            }
        }
    }
}