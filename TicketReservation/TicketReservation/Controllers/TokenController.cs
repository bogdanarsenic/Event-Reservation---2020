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
	[RoutePrefix("api/Token")]
	public class TokenController : ApiController
    {
			UserDB userDB = new UserDB();

			[AllowAnonymous]
			[HttpGet]
			[Route("GetSession")]
			public string GetSession(string username, string password)
			{
				User u1 = new User();

				if ((u1=CheckUser(username, password))!=null)
				{
					return JWTManager.GenerateToken(u1.Username,u1.Role);
				}

				throw new HttpResponseException(HttpStatusCode.Unauthorized);
			}

			public User CheckUser(string username, string password)
			{
					User u = userDB.GetOne(username);

					if(u==null || u.Password!=password)

					{
						return null;
					}

					return u;
			}
		
	}
}
