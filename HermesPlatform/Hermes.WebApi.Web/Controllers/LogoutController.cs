using System.Net;
using System.Net.Http;
using System.Web.Http;
using Hermes.WebApi.Core;

namespace Hermes.WebApi.Web.Controllers
{
	/// <summary>
	/// API controller of the common login resource which is generic in nature.
	/// </summary>
    [AllowAnonymous]
    [RoutePrefix("API/Controllers")]
    public class LogoutController : ApiController
    {
        /// <summary>
        /// Get action for the login resource.
        /// </summary>
        /// <returns>HttpResponseMessage</returns>
        [Route("Logout")]
        public HttpResponseMessage Get()
        {
            var response = Request.CreateResponse(HttpStatusCode.OK, true);

            if (!User.Identity.IsAuthenticated)
            {
                return response;
            }

            response.LogOff();
            return response;
        }
    }
}