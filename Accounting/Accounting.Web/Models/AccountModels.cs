using System;
using System.ComponentModel.DataAnnotations;

namespace Accounting.Models
{
	public class RPModel
	{
		/// <summary>
		/// Email id
		/// </summary>
		[Required]
		[Display(Name = "Email")]
		public string UserName { get; set; }

		/// <summary>
		/// Password
		/// </summary>
		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; }

		/// <summary>
		/// isValid
		/// </summary>
		public bool isValid { get; set; }

		/// <summary>
		/// isSuccess
		/// </summary>
		public bool isSuccess { get; set; }

		/// <summary>
		/// requestedDate
		/// </summary>
		public DateTime requestedDate { get; set; }

		/// <summary>
		/// token
		/// </summary>
		public string token { get; set; }
	}
}