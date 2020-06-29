﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TicketReservation.Models;

namespace TicketReservation.ModelsDB
{
    public class TicketDB
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Reservation"].ConnectionString;

        UserDB userDB = new UserDB();
        ManifestationDB manifestationDB = new ManifestationDB();


        public void Insert(Ticket ticket)
        {
            string Query = "INSERT INTO Tickets(Id, ManifestationId, EventTime, Price, Buyer, SellerId, Status, Type) VALUES(@Id, @ManifestationId, @EventTime, @Price, @Buyer, @SellerId, @Status, @Type)";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Id", SqlDbType.NVarChar).Value = ticket.Id.ToString();
                    cmd.Parameters.Add("@ManifestationId", SqlDbType.NVarChar).Value = ticket.ManifestationId;
                    cmd.Parameters.Add("@EventTime", SqlDbType.DateTime2).Value = ticket.EventTime;
                    cmd.Parameters.Add("@Price", SqlDbType.Int).Value = ticket.Price;
                    cmd.Parameters.Add("@Buyer", SqlDbType.NVarChar).Value = ticket.Buyer;
                    cmd.Parameters.Add("@SellerId", SqlDbType.NVarChar).Value = ticket.SellerId;
                    cmd.Parameters.Add("@Status", SqlDbType.NVarChar).Value = ticket.Status;
                    cmd.Parameters.Add("@Type", SqlDbType.NVarChar).Value = ticket.Type;
                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void UpdateStatus(Ticket ticket)
        {
            string Query = "UPDATE Tickets set Status=@Status " +
               "WHERE Id='" + ticket.Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Status", SqlDbType.NVarChar).Value = ticket.Status;
                    cmd.ExecuteNonQuery();
                }
            }

        }

            public List<Ticket> GetAll()
        {

            List<Ticket> tickets = new List<Ticket>();

            string Query = "SELECT * FROM Tickets";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Ticket ticket = new Ticket();
                        ticket.Id = reader["Id"].ToString();
                        ticket.ManifestationId = reader["ManifestationId"].ToString();
                        ticket.EventTime = Convert.ToDateTime(reader["EventTime"].ToString());
                        ticket.Price = Convert.ToInt32(reader["Price"].ToString());
                        ticket.Buyer = reader["Buyer"].ToString();
                        ticket.SellerId = reader["SellerId"].ToString();
                        ticket.Status = reader["Status"].ToString();
                        ticket.Type = reader["Type"].ToString();
                        tickets.Add(ticket);
                    }
                }
            }

            return tickets;
        }

        public List<Ticket> GetAllByManifestationId(string ManId)
        {

            //LibraryDAL library = new LibraryDAL();
            List<Ticket> tickets = new List<Ticket>();

            string Query = "SELECT * FROM Tickets WHERE ManifestationId='" + ManId + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Ticket ticket = new Ticket();
                        ticket.Id = reader["Id"].ToString();
                        ticket.ManifestationId = reader["ManifestationId"].ToString();
                        ticket.EventTime = Convert.ToDateTime(reader["EventTime"].ToString());
                        ticket.Price = Convert.ToInt32(reader["Price"].ToString());
                        ticket.Buyer = reader["Buyer"].ToString();
                        ticket.SellerId = reader["SellerId"].ToString();
                        ticket.Status = reader["Status"].ToString();
                        ticket.Type = reader["Type"].ToString();
                        tickets.Add(ticket);
                    }
                }
            }

            return tickets;
        }

        public Ticket GetOne(string idUser,string idEvent)
        {


            string Query = "SELECT * FROM Tickets WHERE Buyer='" + idUser + "' AND ManifestationId='"+idEvent+"'";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    Ticket ticket = null;
                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ticket = new Ticket()
                        {
                            Id = reader["Id"].ToString(),
                            ManifestationId = reader["ManifestationId"].ToString(),
                            EventTime = Convert.ToDateTime(reader["EventTime"].ToString()),
                            Price = Convert.ToInt32(reader["Price"].ToString()),
                            Buyer = reader["Buyer"].ToString(),
                            SellerId = reader["SellerId"].ToString(),
                            Status = reader["Status"].ToString(),
                            Type = reader["Type"].ToString(),

                        };
                    }
                    return ticket;
                }
                catch
                {
                    return null;
                }
            }
        }

    }
}