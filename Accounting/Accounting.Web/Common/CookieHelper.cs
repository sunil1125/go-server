using System.Net;
using System.Web;
using AmadeusConsulting.Simplex.Rest.Security;
using System.Configuration;

namespace Accounting.Web.Common
{
	/// <summary>
	/// Cookie Helper class
	/// </summary>
	/// <changeHistory>
	/// <id>US19934</id> <by>Chandan Singh</by> <date>1-1-2015</date> <description>Acct: Perform Code Refactoring for Internal and External Component (Added CookiesContainer for Internal)</description>
	/// </changeHistory>
	public static class CookieHelper
	{
		/// <summary>
		/// Cookie container containing SimplexAuth cookie - to be passed in server to server calls
		/// </summary>
		/// <returns>cookie container</returns>
		public static CookieContainer CookiesContainer
		{
			get
			{
				HttpRequest request = HttpContext.Current.Request;
				HttpCookie authCookie = request.Cookies[SimplexRestAuthenticationModule.CookieName];

				if (authCookie != null)
				{
					Cookie oC = new System.Net.Cookie();

					// Convert between the System.Net.Cookie to a System.Web.HttpCookie...
					oC.Domain = request.Url.Host;
					oC.Expires = authCookie.Expires;
					oC.Name = authCookie.Name;
					oC.Path = authCookie.Path;
					oC.Secure = authCookie.Secure;
					oC.Value = authCookie.Value;

					CookieContainer cookieCollection = new CookieContainer();
					cookieCollection.Add(oC);
					return cookieCollection;
				}

				return null;
			}
		}

		/// <summary>
		/// Cookie container containing SimplexAuth cookie - to be passed in server to server calls
		/// Which are not accessible directly from client 
		/// </summary>
		/// <returns>Cookie container with the same/different domain</returns>
		public static CookieContainer CookiesContainerInternal
		{
			//// ###START: US19934
			get
			{
				HttpRequest request = HttpContext.Current.Request;
				HttpCookie authCookie = request.Cookies[SimplexRestAuthenticationModule.CookieName];

				if (authCookie != null)
				{
					System.Net.Cookie oC = new System.Net.Cookie();

					oC.Domain = string.IsNullOrEmpty(ConfigurationManager.AppSettings["AppHostedDomainNameInternal"]) ? request.Url.Host : ConfigurationManager.AppSettings["AppHostedDomainNameInternal"];
					oC.Expires = authCookie.Expires;
					oC.Name = authCookie.Name;
					oC.Path = authCookie.Path;
					oC.Secure = authCookie.Secure;
					oC.Value = authCookie.Value;

					CookieContainer cookieCollection = new System.Net.CookieContainer();
					cookieCollection.Add(oC);
					return cookieCollection;
				}

				return null;
			}
			//// ###END: US19934
		}
	}
}