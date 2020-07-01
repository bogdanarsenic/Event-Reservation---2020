using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace TicketReservation
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
           var cors = new EnableCorsAttribute("*", "*", "*");//Ovo na kraju treba zabraniti. Trenutno je ovako kako bi se dozvolilo angular aplikaciji.
           config.EnableCors(cors);


            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
