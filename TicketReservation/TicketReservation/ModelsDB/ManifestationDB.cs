using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using TicketReservation.Models;

namespace TicketReservation.ModelsDB
{
    public class ManifestationDB
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Reservation"].ConnectionString;
        UserDB userDB = new UserDB();
        LocationDB locationDB = new LocationDB();





        public void Insert(Manifestation manifestation)
        {
            string Query = "INSERT INTO Manifestations(Id, Name, Type, Capacity, EventTime, Price, Status, PlaceId, Pictures,UserId, IsActive) VALUES(@Id, @Name, @Type, @Capacity, @EventTime, @Price, @Status, @PlaceId, @Pictures,@UserId, @IsActive)";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Id", SqlDbType.NVarChar).Value = manifestation.Id.ToString();
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = manifestation.Name;
                    cmd.Parameters.Add("@Type", SqlDbType.NVarChar).Value = manifestation.Type;
                    cmd.Parameters.Add("@Capacity", SqlDbType.Int).Value = manifestation.Capacity;
                    cmd.Parameters.Add("@EventTime", SqlDbType.DateTime2).Value = manifestation.EventTime;
                    cmd.Parameters.Add("@Price", SqlDbType.Int).Value = manifestation.Price;
                    cmd.Parameters.Add("@Status", SqlDbType.NVarChar).Value = manifestation.Status;
                    cmd.Parameters.Add("@UserId", SqlDbType.NVarChar).Value = manifestation.UserId;
                    cmd.Parameters.Add("@PlaceId", SqlDbType.NVarChar).Value = manifestation.PlaceId;
                    cmd.Parameters.Add("@Pictures", SqlDbType.NVarChar).Value = manifestation.Pictures;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = manifestation.IsActive;

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Update(Manifestation manifestation)
        {
            string Query = "UPDATE Manifestations set Id = @Id, Name=@Name,Type = @Type,Capacity = @Capacity, EventTime = @EventTime, Price = @Price, Status=@Status, PlaceId=@PlaceId, UserId=@UserId, Pictures=@Pictures, IsActive=@IsActive" +
               "WHERE Id = @id";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Id", SqlDbType.NVarChar).Value = manifestation.Id.ToString();
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = manifestation.Name;
                    cmd.Parameters.Add("@Type", SqlDbType.NVarChar).Value = manifestation.Type;
                    cmd.Parameters.Add("@Capacity", SqlDbType.Int).Value = manifestation.Capacity;
                    cmd.Parameters.Add("@EventTime", SqlDbType.DateTime2).Value = manifestation.EventTime;
                    cmd.Parameters.Add("@Price", SqlDbType.Int).Value = manifestation.Price;
                    cmd.Parameters.Add("@Status", SqlDbType.NVarChar).Value = manifestation.Status;
                    cmd.Parameters.Add("@PlaceId", SqlDbType.NVarChar).Value = manifestation.PlaceId;
                    cmd.Parameters.Add("@UserId", SqlDbType.NVarChar).Value = manifestation.UserId;
                    cmd.Parameters.Add("@Pictures", SqlDbType.NVarChar).Value = manifestation.Pictures;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = manifestation.IsActive;

                    cmd.ExecuteNonQuery();
                }
            }
        }



        public List<Manifestation> GetAllByUserId(string UserId)
        {

            List<Manifestation> manifestations = new List<Manifestation>();

            string Query = "SELECT * FROM Manifestation WHERE isActive='True' and UserId='" + UserId + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Manifestation manifestation = new Manifestation();
                        manifestation.Id = new Guid(reader["Id"].ToString());
                        manifestation.Name = reader["Name"].ToString();
                        manifestation.Type = reader["Type"].ToString();
                        manifestation.Capacity = Convert.ToInt32(reader["Capacity"].ToString());
                        manifestation.EventTime = Convert.ToDateTime(reader["EventTime"].ToString());
                        manifestation.Price = Convert.ToInt32(reader["Price"].ToString());
                        manifestation.Status = reader["Status"].ToString();
                        manifestation.PlaceId = reader["PlaceId"].ToString();
                        manifestation.Pictures = reader["Pictures"].ToString();
                        manifestation.UserId = reader["UserId"].ToString();
                        manifestation.IsActive = Convert.ToBoolean(reader["IsActive"].ToString());

                        manifestations.Add(manifestation);
                    }
                }
            }

            return manifestations;
        }

        public Manifestation GetOneByUserId(string UserId)
        {
            string Query = "SELECT * FROM Manifestations WHERE IsActive='True' and UserId='" + UserId + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    Manifestation manifestation = null;
                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        manifestation = new Manifestation()
                        {
                            Id = new Guid(reader["Id"].ToString()),
                            Name = reader["Type"].ToString(),
                            Type = reader["Type"].ToString(),
                            Capacity = Convert.ToInt32(reader["Capacity"].ToString()),
                            EventTime = Convert.ToDateTime(reader["EventTime"].ToString()),
                            Price = Convert.ToInt32(reader["Price"].ToString()),
                            Status = reader["Status"].ToString(),
                            UserId = reader["UserId"].ToString(),
                            PlaceId = reader["PlaceId"].ToString(),
                            Pictures = reader["Pictures"].ToString(),
                            IsActive = Convert.ToBoolean(reader["IsActive"].ToString()),

                        };
                    }
                    return manifestation;
                }
                catch
                {
                    return null;
                }
            }
        }

        public Manifestation GetOneById(string Id)
        {
            string Query = "SELECT * FROM Manifestations WHERE IsActive='True' and Id='" + Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    Manifestation manifestation = null;
                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        manifestation = new Manifestation();
                        manifestation.Id = new Guid(reader["Id"].ToString());
                        manifestation.Name = reader["Name"].ToString();
                        manifestation.Type = reader["Type"].ToString();
                        manifestation.Capacity = Convert.ToInt32(reader["Capacity"].ToString());
                        manifestation.EventTime = Convert.ToDateTime(reader["EventTime"].ToString());
                        manifestation.Price = Convert.ToInt32(reader["Price"].ToString());
                        manifestation.Status = reader["Status"].ToString();
                        manifestation.PlaceId = reader["PlaceId"].ToString();
                        manifestation.UserId = reader["UserId"].ToString();
                        manifestation.Pictures = reader["Pictures"].ToString();
                        manifestation.IsActive = Convert.ToBoolean(reader["IsActive"].ToString());



                    }
                    return manifestation;
                }
                catch
                {
                    return null;
                }
            }
        }

        public void Delete(string Id)
        {
            string Query = "Update Apartments SET IsActive='False' WHERE Id='" + Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();


                }
                catch
                {
                    return;
                }

            }
        }

        public List<Manifestation> GetAll()
        {

            List<Manifestation> manifestations = new List<Manifestation>();

            string Query = "SELECT * FROM Manifestations WHERE IsActive='True'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Manifestation manifestation = new Manifestation();
                        manifestation.Id = new Guid(reader["Id"].ToString());
                        manifestation.Name = reader["Name"].ToString();
                        manifestation.Type = reader["Type"].ToString();
                        manifestation.Capacity = Convert.ToInt32(reader["Capacity"].ToString());
                        manifestation.EventTime = Convert.ToDateTime(reader["EventTime"].ToString());
                        manifestation.Price = Convert.ToInt32(reader["Price"].ToString());
                        manifestation.Status = reader["Status"].ToString();
                        manifestation.PlaceId = reader["PlaceId"].ToString();
                        manifestation.UserId = reader["UserId"].ToString();
                        manifestation.Pictures = reader["Pictures"].ToString();
                        manifestation.IsActive = Convert.ToBoolean(reader["IsActive"].ToString());

                    }
                }
            }

            return manifestations;
        }


    }
}