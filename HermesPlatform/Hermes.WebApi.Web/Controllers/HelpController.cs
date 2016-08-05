using System.Web.Http;
using System.Web.Mvc;

namespace Hermes.WebApi.Web.Controllers
{
	/// <summary>
	/// This controllers take cares the help page of the api.
	/// </summary>
	/// <seealso cref="System.Web.Mvc.Controller" />
	public class HelpController : Controller
	{
		/// <summary>
		/// Indexes this instance.
		/// </summary>
		/// <returns>Help View</returns>
		public ActionResult Index()
		{
			var apiExplorer = GlobalConfiguration.Configuration.Services.GetApiExplorer();
			return View(apiExplorer);
		}
	}
}