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
    public class UserDB
    {
        static string connectionString = ConfigurationManager.ConnectionStrings["Reservation"].ConnectionString;


        public User GetOne(string Username)
        {
            string Query = "SELECT * FROM Users WHERE Username='" + Username + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    User user = null;
                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        user = new User()
                        {
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Name = reader["Name"].ToString(),
                            Surname = reader["Surname"].ToString(),
                            Gender = reader["Gender"].ToString(),
                            Role = reader["Role"].ToString(),
                            Points = float.Parse(reader["Points"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            TicketId = reader["TicketId"].ToString(),
                            ManifestationId = reader["ManifestationId"].ToString(),
                            Type = reader["UserType"].ToString(),
                            NoQuit = Convert.ToInt32(reader["NoQuit"].ToString()),
                            IsBlocked= Convert.ToBoolean(reader["IsBlocked"].ToString()),
                            IsActive = Convert.ToBoolean(reader["IsActive"].ToString()),

                        };
                    }
                    return user;
                }
                catch
                {
                    return null;
                }
            }
        }



        public void Insert(User user)
        {
            string Query = "INSERT INTO Users(Username, Password, Name, Surname,Gender,Role, Points, TicketId, ManifestationId, UserType, NoQuit, IsBlocked, IsActive) VALUES(@Username, @Password, @Name, @Surname, @Gender, @Role, @Points, @TicketId, @ManifestationId, @UserType, @NoQuit, @IsBlocked, @IsActive)";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Username", SqlDbType.NVarChar).Value = user.Username;
                    cmd.Parameters.Add("@Password", SqlDbType.NChar).Value = user.Password;
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = user.Name;
                    cmd.Parameters.Add("@Surname", SqlDbType.NVarChar).Value = user.Surname;
                    cmd.Parameters.Add("@Gender", SqlDbType.NVarChar).Value = user.Gender;
                    cmd.Parameters.Add("@Role", SqlDbType.NVarChar).Value = user.Role;
                    cmd.Parameters.Add("@Points", SqlDbType.Float).Value = user.Points;
                    cmd.Parameters.Add("@TicketId", SqlDbType.NVarChar).Value = user.TicketId;
                    cmd.Parameters.Add("@ManifestationId", SqlDbType.NVarChar).Value = user.ManifestationId;
                    cmd.Parameters.Add("@UserType", SqlDbType.NVarChar).Value = user.Type;
                    cmd.Parameters.Add("@NoQuit", SqlDbType.Int).Value = user.NoQuit;
                    cmd.Parameters.Add("@IsBlocked", SqlDbType.Bit).Value = user.IsBlocked;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = user.IsActive;



                    if (GetOne(user.Username) == null)
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }

        public void Update(User user)
        {
            string Query = "UPDATE Users set  Username = @Username, Password = @Password, Name = @Name, Surname = @Surname, Gender=@Gender, Role=@Role  " +
               "WHERE Username = @Username";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Username", SqlDbType.NVarChar).Value = user.Username;
                    cmd.Parameters.Add("@Password", SqlDbType.NChar).Value = user.Password;
                    cmd.Parameters.Add("@Name", SqlDbType.NVarChar).Value = user.Name;
                    cmd.Parameters.Add("@Surname", SqlDbType.NVarChar).Value = user.Surname;
                    cmd.Parameters.Add("@Gender", SqlDbType.NVarChar).Value = user.Gender;
                    cmd.Parameters.Add("@Role", SqlDbType.NVarChar).Value = user.Role;

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void UpdateTypePoints(User user)
        {
            string Query = "UPDATE Users set Points=@Points, UserType=@UserType, TicketId=@TicketId " +
               "WHERE Username='" + user.Username + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Points", SqlDbType.Float).Value = user.Points;
                    cmd.Parameters.Add("@UserType", SqlDbType.NVarChar).Value = user.Type;
                    cmd.Parameters.Add("@TicketId", SqlDbType.NVarChar).Value = user.TicketId;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateUserPointsQuits(User user)
        {
            string Query = "UPDATE Users set Points=@Points, NoQuit=@NoQuit " +
               "WHERE Username='" + user.Username + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@Points", SqlDbType.Float).Value = user.Points;
                    cmd.Parameters.Add("@NoQuit", SqlDbType.Int).Value = user.NoQuit;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateSeller(User user)
        {
            string Query = "UPDATE Users set ManifestationId=@ManifestationId " +
               "WHERE Username='" + user.Username + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@ManifestationId", SqlDbType.NVarChar).Value = user.ManifestationId;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Block(User user)
        {
            string Query = "UPDATE Users set IsActive=@IsActive, IsBlocked=@IsBlocked " +
               "WHERE Username='" + user.Username + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = user.IsActive;
                    cmd.Parameters.Add("@IsBlocked", SqlDbType.Bit).Value = user.IsBlocked;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(User user)
        {
            string Query = "UPDATE Users set IsActive='False' " +
               "WHERE Username='" + user.Username + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = user.IsActive;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<User> GetAllByRole(string Role)
        {
            List<User> users = new List<User>();

            string Query = "SELECT * FROM Users WHERE Role='" + Role + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        User user = new User()
                        {
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Name = reader["Name"].ToString(),
                            Surname = reader["Surname"].ToString(),
                            Gender = reader["Gender"].ToString(),
                            Role = reader["Role"].ToString(),
                            Points = float.Parse(reader["Points"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            TicketId = reader["TicketId"].ToString(),
                            ManifestationId = reader["ManifestationId"].ToString(),
                            Type = reader["UserType"].ToString()
                        };
                        users.Add(user);
                    }
                }
            }

            return users;
        }



        public List<User> GetAll()
        {
            //LibraryDAL library = new LibraryDAL();
            List<User> users = new List<User>();

            string Query = "SELECT * FROM Users ";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        User user = new User()
                        {
                            Username = reader["Username"].ToString(),
                            Password = reader["Password"].ToString(),
                            Name = reader["Name"].ToString(),
                            Surname = reader["Surname"].ToString(),
                            Gender = reader["Gender"].ToString(),
                            Role = reader["Role"].ToString(),
                            Points = float.Parse(reader["Points"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                            TicketId = reader["TicketId"].ToString(),
                            ManifestationId = reader["ManifestationId"].ToString(),
                            Type = reader["UserType"].ToString(),
                            NoQuit = Convert.ToInt32(reader["NoQuit"].ToString()),
                            IsBlocked = Convert.ToBoolean(reader["IsBlocked"].ToString()),
                            IsActive = Convert.ToBoolean(reader["IsActive"].ToString()),

                        };
                        users.Add(user);
                    }
                }
            }

            return users;
        }

    }
}