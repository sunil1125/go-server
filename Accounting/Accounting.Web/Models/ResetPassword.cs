namespace Accounting.Web.Models
{
	public class ResetPassword
	{
		public string NewPassword { get; set; }

		public string Tocken { get; set; }

		public bool IsTokenValid { get; set; }
	}
}