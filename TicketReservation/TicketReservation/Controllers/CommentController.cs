using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TicketReservation.Models;
using TicketReservation.ModelsDB;

namespace TicketReservation.Controllers
{
    [RoutePrefix("api/Comment")]
    public class CommentController : ApiController
    {
        CommentDB commentDB = new CommentDB();

        [Route("GetAllByEventId")]
        public List<Comment> GetAllByEventId(string Id)
        {
            List<Comment> ret = null;
            ret = commentDB.GetAllByManifestationId(Id);
            return ret;
        }

        [Route("GetAllComments")]
        public List<Comment> GetAllComments()
        {
            List<Comment> ret = null;
            ret = commentDB.GetAll();
            return ret;
        }

        [Route("GetAllByEventIdGuest")]
        public List<Comment> GetAllByEventIdGuest(string Id)
        {
            List<Comment> ret = null;
            ret = commentDB.GetAllByManifestationIdGuest(Id);
            return ret;
        }


        [Route("RegisterComment")]
        public string RegisterComment(Comment com)
        {
            com.Id = Guid.NewGuid();
            commentDB.Insert(com);
            return "Success";
        }



        [Route("GetOneCommentApproved")]
        public string GetOneCommentApproved(Guid IdA)
        {
            try
            {
                string IdTemp = IdA.ToString();
                commentDB.Approve(IdTemp);
            }
            catch
            {
                return "Error!";
            }

            return "Success!";
        }

    }
}
