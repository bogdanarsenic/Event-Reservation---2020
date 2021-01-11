using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace TicketReservation.Controllers
{
    public class ImageController : ApiController
    {
        [HttpPost]
        [Route("api/Upload")]
        public HttpResponseMessage Upload()
        {
			string finalPath = "http://localhost:52294/";
			var httpReq = HttpContext.Current.Request;
            var file = httpReq.Files["Image"];

			var filePath = HttpContext.Current.Server.MapPath("~/Content/images/" + file.FileName);
			finalPath = finalPath + "Content/images/" + file.FileName;
            file.SaveAs(filePath);
            HttpResponseMessage message = new HttpResponseMessage();
            return message;
        }
    }
}
