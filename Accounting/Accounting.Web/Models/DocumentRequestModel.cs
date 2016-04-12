namespace Accounting.Web.Models
{
	public class DocumentRequestModel
	{
		/// <summary>
		/// Gets or Sets BolNumber
		/// </summary>
		public string BolNumber { get; set; }

		/// <summary>
		/// Gets or Sets InvoiceNumber
		/// </summary>
		public string InvoiceNumber { get; set; }

		/// <summary>
		///  Gets or Sets CustomerBolNumber
		/// </summary>
		public string CustomerBolNumber { get; set; }

		/// <summary>
		///  Gets or Sets PdfHeight
		/// </summary>
		public float PdfHeight { get; set; }

		/// <summary>
		/// Gets or Sets PdfWidth
		/// </summary>
		public float PdfWidth { get; set; }
	}
}