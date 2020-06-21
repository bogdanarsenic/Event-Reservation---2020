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
    public class CommentDB
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Reservation"].ConnectionString;
        UserDB userDB = new UserDB();

        public void Insert(Comment comment)
        {
            string Query = "INSERT INTO Comments(Id, UserId, ManifestationId, Text, Rating, IsActive) VALUES(@Id, @UserId, @ManifestationId, @Text, @Rating, @IsActive)";

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();

                    cmd.Parameters.Add("@Id", SqlDbType.NVarChar).Value = comment.Id.ToString();
                    cmd.Parameters.Add("@UserId", SqlDbType.NVarChar).Value = comment.UserId;
                    cmd.Parameters.Add("@ManifestationId", SqlDbType.NVarChar).Value = comment.ManifestationId;
                    cmd.Parameters.Add("@Text", SqlDbType.NVarChar).Value = comment.Text;
                    cmd.Parameters.Add("@Rating", SqlDbType.Int).Value = comment.Rating;
                    cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = comment.IsActive;

                    if (GetOne(comment.Id) == null)
                    {
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }



        public Comment GetOne(Guid Id)
        {
            string Query = "SELECT * FROM Comments WHERE Id='" + Id + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    Comment comment = null;
                    SqlCommand cmd = new SqlCommand(Query, con);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        comment = new Comment()
                        {
                            Id = new Guid(reader["Id"].ToString()),
                            UserId = reader["UserId"].ToString(),
                            ManifestationId = reader["ApartmentId"].ToString(),
                            Text = reader["Text"].ToString(),
                            Rating = Convert.ToInt32(reader["Rating"]),
                        };
                    }
                    return comment;
                }
                catch
                {
                    return null;
                }
            }
        }

        public List<Comment> GetAllByManifestationId(string ManifestationId)
        {

            List<Comment> comments = new List<Comment>();

            string Query = "SELECT * FROM Comments WHERE ManifestationId='" + ManifestationId + "'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Comment comment = new Comment();
                        comment.Id = new Guid(reader["Id"].ToString());
                        comment.UserId = reader["UserId"].ToString();
                        comment.ManifestationId = reader["ManifestationId"].ToString();
                        comment.Text = reader["Text"].ToString();
                        comment.Rating = Convert.ToInt32(reader["Rating"]);


                        comments.Add(comment);
                    }
                }
            }

            return comments;
        }

        public List<Comment> GetAllByManifestationIdGuest(string ManifestationId)
        {

            List<Comment> comments = new List<Comment>();

            string Query = "SELECT * FROM Comments WHERE ManifestationId='" + ManifestationId + "' and IsActive='True'";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Comment comment = new Comment();
                        comment.Id = new Guid(reader["Id"].ToString());
                        comment.UserId = reader["UserId"].ToString();
                        comment.ManifestationId = reader["ManifestationId"].ToString();
                        comment.Text = reader["Text"].ToString();
                        comment.Rating = Convert.ToInt32(reader["Rating"]);


                        comments.Add(comment);
                    }
                }
            }

            return comments;
        }


        public List<Comment> GetAll()
        {
            //LibraryDAL library = new LibraryDAL();
            List<Comment> comments = new List<Comment>();

            string Query = "SELECT * FROM Comments";
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = new Guid(reader["Id"].ToString()),
                            UserId = reader["UserId"].ToString(),
                            ManifestationId = reader["ManifestationId"].ToString(),
                            Text = reader["Text"].ToString(),
                            Rating = Convert.ToInt32(reader["Rating"]),

                        };
                        comments.Add(comment);
                    }
                }
            }

            return comments;
        }


        public void Approve(string Id)
        {
            string Query = "Update Comments SET IsActive='True' WHERE Id='" + Id + "'";
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

    }
}