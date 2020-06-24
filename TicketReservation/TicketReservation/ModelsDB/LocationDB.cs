using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;
using TicketReservation.Models;

namespace TicketReservation.ModelsDB
{
    public class LocationDB
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Reservation"].ConnectionString;

        public Location GetOne(Guid Id)
        {
            string Query = "SELECT * FROM Locations WHERE Id='" + Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    Location location = null;
                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        location = new Location()
                        {
                            Id = new Guid(reader["Id"].ToString()),
                            Lattitude = float.Parse(reader["Lattitude"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            Longitude = float.Parse(reader["Longitude"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            Address = reader["Address"].ToString(),
                        };
                    }
                    return location;
                }
                catch
                {
                    return null;
                }
            }
        }

        public List<Location> GetAll()
        {
            List<Location> locations = new List<Location>();

            string Query = "SELECT * FROM Locations";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Location location = new Location()
                        {
                            Id = new Guid(reader["Id"].ToString()),
                            Lattitude = float.Parse(reader["Lattitude"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            Longitude = float.Parse(reader["Longitude"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            Address = reader["Address"].ToString(),
                        };
                        locations.Add(location);
                    }
                }
            }

            return locations;
        }


        public void Insert(Location location)
        {
            string Query = "INSERT INTO Locations(Id, Lattitude, Longitude, Address) VALUES(@Id, @Lattitude, @Longitude, @Address)";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Id", SqlDbType.NVarChar).Value = location.Id.ToString();
                    cmd.Parameters.Add("@Lattitude", SqlDbType.Float).Value = location.Lattitude;
                    cmd.Parameters.Add("@Longitude", SqlDbType.Float).Value = location.Longitude;
                    cmd.Parameters.Add("@Address", SqlDbType.NVarChar).Value = location.Address;

                }
            }
        }
    }
}