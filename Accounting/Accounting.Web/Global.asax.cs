using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using AmadeusConsulting.Simplex.Rest.Security;
using AmadeusConsulting.Simplex.Security;

namespace Accounting.Web
{
	// Note: For instructions on enabling IIS6 or IIS7 classic mode,
	// visit http://go.microsoft.com/?LinkId=9394801
	public class MvcApplication : System.Web.HttpApplication
	{
		protected void Application_Start()
		{
			AreaRegistration.RegisterAllAreas();

			FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);
		}

		/// <summary>
		/// Handles the OnAuthenticate event of the FormsAuthentication control.
		/// </summary>
		/// <param name="sender">The source of the event.</param>
		/// <param name="args">The <see cref="FormsAuthenticationEventArgs"/> instance containing the event data.</param>
		public void FormsAuthentication_OnAuthenticate(object sender, FormsAuthenticationEventArgs args)
		{
			if (args == null) return;
			try
			{
				if (Request.Cookies[SimplexRestAuthenticationModule.CookieName] != null)
				{
					args.User = AuthenticationCommands.AuthenticateTicket(Request.Cookies[SimplexRestAuthenticationModule.CookieName].Value);

					// Add the details in the cookis which is uesed to navigate to the details page in case of opening from other application (CC)
					if (Request.QueryString["ReturnUrl"] != null && Request.QueryString["ReturnUrl"].Contains("VendorBillDetails"))
					{
						var authCookie = new HttpCookie("ReturnUrl", Request.QueryString["ReturnUrl"].ToString());

						// Removed Remember Me support due to ticket expiration conflict
						HttpContext.Current.Response.Cookies.Add(authCookie);
					}
				}
				else if (Request.QueryString[SimplexRestAuthenticationModule.CookieName] != null && !string.IsNullOrEmpty(Request.QueryString[SimplexRestAuthenticationModule.CookieName]))
				{
					// Authenticate the external tickets
					args.User = AuthenticationCommands.AuthenticateTicket(Request.QueryString[SimplexRestAuthenticationModule.CookieName].ToString());
					if (args.User.Identity.IsAuthenticated)
					{
						if (Request.Cookies[SimplexRestAuthenticationModule.CookieName] == null)
						{
							var authCookie = new HttpCookie(SimplexRestAuthenticationModule.CookieName, Request.QueryString[SimplexRestAuthenticationModule.CookieName].ToString());

							// Removed Remember Me support due to ticket expiration conflict
							HttpContext.Current.Response.Cookies.Add(authCookie);
						}

						if (Request.QueryString["ReturnUrl"] != null)
						{
							var authCookie = new HttpCookie("ReturnUrl", Request.QueryString["ReturnUrl"].ToString());

							// Removed Remember Me support due to ticket expiration conflict
							HttpContext.Current.Response.Cookies.Add(authCookie);
						}
					}
				}
			}
			catch (ExpiredTicketException)
			{
				FormsAuthentication.SignOut();
				FormsAuthentication.RedirectToLoginPage();
			}
			catch (AuthenticationException)
			{
				FormsAuthentication.SignOut();
				FormsAuthentication.RedirectToLoginPage();
			}
		}
	}
}