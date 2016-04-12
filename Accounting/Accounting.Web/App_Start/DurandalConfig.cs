using System.Web.Optimization;

namespace Accounting.Web
{
	public class DurandalConfig
	{
		public static void PreStart()
		{
			// Add your start logic here
			BundleConfig.RegisterBundles(BundleTable.Bundles);
		}
	}
}