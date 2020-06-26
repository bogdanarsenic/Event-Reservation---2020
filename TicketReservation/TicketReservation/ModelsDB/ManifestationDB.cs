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
            string Query = "INSERT INTO Manifestations(Id, Name, Type, Capacity, EventTime, Price, Status, LocationId, Place, Pictures,SellerId, IsActive) VALUES(@Id, @Name, @Type, @Capacity, @EventTime, @Price, @Status, @LocationId, @Place, @Pictures,@SellerId, @IsActive)";

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
                    cmd.Parameters.Add("@SellerId", SqlDbType.NVarChar).Value = manifestation.SellerId;
                    cmd.Parameters.Add("@LocationId", SqlDbType.NVarChar).Value = manifestation.LocationId;
                    cmd.Parameters.Add("@Place", SqlDbType.NVarChar).Value = manifestation.Place;
                    cmd.Parameters.Add("@Pictures", SqlDbType.NVarChar).Value = manifestation.Pictures;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = manifestation.IsActive;

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void Update(Manifestation manifestation)
        {
            string Query = "UPDATE Manifestations set Name=@Name,Type = @Type,Capacity = @Capacity, EventTime = @EventTime, Price = @Price " +
               "WHERE Id='" + manifestation.Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = manifestation.Name;
                    cmd.Parameters.Add("@Type", SqlDbType.NVarChar).Value = manifestation.Type;
                    cmd.Parameters.Add("@Capacity", SqlDbType.Int).Value = manifestation.Capacity;
                    cmd.Parameters.Add("@EventTime", SqlDbType.DateTime2).Value = manifestation.EventTime;
                    cmd.Parameters.Add("@Price", SqlDbType.Int).Value = manifestation.Price;

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdatePicture(Manifestation manifestation)
        {
            string Query = "UPDATE Manifestations set Pictures=@Pictures " +
               "WHERE Id='" + manifestation.Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Pictures", SqlDbType.NVarChar).Value = manifestation.Pictures;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateStatus(Manifestation manifestation)
        {
            string Query = "UPDATE Manifestations set Status=@Status " +
               "WHERE Id='" + manifestation.Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Status", SqlDbType.NVarChar).Value = manifestation.Status;
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void UpdateCapacity(Manifestation manifestation)
        {
            string Query = "UPDATE Manifestations set Capacity=@Capacity " +
               "WHERE Id='" + manifestation.Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Capacity", SqlDbType.Int).Value = manifestation.Capacity;
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public List<Manifestation> GetAllBySellerId(string SellerId)
        {

            List<Manifestation> manifestations = new List<Manifestation>();

            string Query = "SELECT * FROM Manifestations WHERE SellerId='" + SellerId + "'";
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
                        manifestation.LocationId = reader["LocationId"].ToString();
                        manifestation.Place = reader["Place"].ToString();
                        manifestation.Pictures = reader["Pictures"].ToString();
                        manifestation.SellerId = reader["SellerId"].ToString();
                        manifestation.IsActive = Convert.ToBoolean(reader["IsActive"].ToString());

                        manifestations.Add(manifestation);
                    }
                }
            }

            return manifestations;
        }

        public Manifestation GetOneBySellerId(string SellerId)
        {
            string Query = "SELECT * FROM Manifestations WHERE IsActive='True' and SellerId='" + SellerId + "'";
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
                            SellerId = reader["SellerId"].ToString(),
                            Place = reader["Place"].ToString(),
                            LocationId = reader["LocationId"].ToString(),
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
            string Query = "SELECT * FROM Manifestations WHERE Id='" + Id + "'";
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
                        manifestation.LocationId = reader["LocationId"].ToString();
                        manifestation.SellerId = reader["SellerId"].ToString();
                        manifestation.Place = reader["Place"].ToString();
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

            string Query = "SELECT * FROM Manifestations";
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
                        manifestation.LocationId = reader["LocationId"].ToString();
                        manifestation.Place = reader["Place"].ToString();
                        manifestation.SellerId = reader["SellerId"].ToString();
                        manifestation.Pictures = reader["Pictures"].ToString();
                        manifestation.IsActive = Convert.ToBoolean(reader["IsActive"].ToString());

                        manifestations.Add(manifestation);
                    }
                }
            }

            return manifestations;
        }


    }
}