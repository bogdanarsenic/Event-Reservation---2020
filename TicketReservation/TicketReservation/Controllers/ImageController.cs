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

            var httpReq = HttpContext.Current.Request;
            var file = httpReq.Files["Image"];
            string content = @"C:\Users\Bogdan\Desktop\Web-2020\TicketReservation\TicketReservation\Content"; //MENJA SE OVO

            var path = Path.Combine(content, file.FileName);
            file.SaveAs(path);
            HttpResponseMessage message = new HttpResponseMessage();
            return message;
        }
    }
}
