using System;
using System.Configuration;
using System.Web;
using System.Web.Mvc;
using Accounting.Models;
using Accounting.Web.Common;
using AmadeusConsulting.Simplex.Base.Net;
using AmadeusConsulting.Simplex.Security;

namespace Accounting.Web.Controllers
{
	[Authorize]
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			//set Theme cookie for logged in user.
			SetThemeCookie();
			//Retrive User Theme
			UserUISettingsModel uisettings = GetUserTheme();
			return View(uisettings);
		}

		/// <summary>
		/// Set Cookie for user
		/// </summary>
		private void SetThemeCookie()
		{
			Response.Cookies["UserInfo"].Value = ((SimplexPrincipal)HttpContext.User).Identity.Name;
			Response.Cookies["UserInfo"].Expires = DateTime.MaxValue;
		}

		/// <summary>
		/// Get User Theme
		/// </summary>
		/// <returns>UserUISettingsModel</returns>
		private UserUISettingsModel GetUserTheme()
		{
            string baseurl = ConfigurationManager.AppSettings["Accounting"];
			return Http.Get<UserUISettingsModel>(string.Format("{0}/Accounting/GetThemeName", baseurl), CookieHelper.CookiesContainer);
		}
	}
}