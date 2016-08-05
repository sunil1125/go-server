// ***********************************************************************
// Assembly         : Hermes.WebApi.Web
// Author           : avinash.dubey
// Created          : 01-19-2016
//
// Last Modified By : avinash.dubey
// Last Modified On : 01-19-2016
// ***********************************************************************
// <copyright file="LoginController.cs" company="">
//     Copyright ©  2015
// </copyright>
// <summary>This file has a controller which is used for the authentication.</summary>
// ***********************************************************************
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Hermes.WebApi.Core;
using Hermes.WebApi.Web.Models;


namespace Hermes.WebApi.Web.Controllers
{
    /// <summary>
    /// This controller class handles the login/authentication.
    /// </summary>
    [AllowAnonymous]
    public class LoginController : ApiController
    {
        /// <summary>
        /// Posts the specified login object to authentication of the API.
        /// </summary>
        /// <returns><c>HttpStatusCode.OK</c> if [login success]; otherwise, <c>HttpStatusCode.Unauthorized</c>.</returns>
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, true);
        }

        /// <summary>
        /// Posts the specified login object to authentication of the API.
        /// </summary>
        /// <param name="login">The login object with the username and password.</param>
        /// <returns><c>HttpStatusCode.OK</c> if [login success]; otherwise, <c>HttpStatusCode.Unauthorized</c>.</returns>
        public HttpResponseMessage Post(Login login)
        {
            string loginMessage = string.Empty;
            if (login == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Bad request.");
            }

            try
            {
                var principal = AmadeusConsulting.Simplex.Security.AuthenticationCommands.AuthenticateUsernamePassword(login.Username, login.Password);

                if (principal != null)
                {
                    loginMessage = "Login was successful!";
                    var response = Request.CreateResponse(HttpStatusCode.OK, true);
                    response.SetAuthentication(principal.Identity.SecureTicketString, login.RememberMe);

                    return response;
                }
            }
            catch (Exception ex)
            {
                loginMessage = ex.Message;
            }

            return Request.CreateResponse(HttpStatusCode.Unauthorized, loginMessage);
        }
    }
}