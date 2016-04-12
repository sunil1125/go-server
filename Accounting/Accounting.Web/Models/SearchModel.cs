using System;
using System.Collections.Generic;

namespace Accounting.Web.Models
{
	public class SearchModel
	{
		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public string SearchValue { get; set; }

		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public int PageNumber { get; set; }

		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public int PageSize { get; set; }

		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public string SortCol { get; set; }

		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public string SortOrder { get; set; }

		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public IList<SearchFilter> SearchFilterItems { get; set; }

		/// <summary>
		/// Gets or sets the values for search
		/// </summary>
		public string ExportURL { get; set; }

		/// <summary>
		/// Gets or Sets the values for Vendor name in vendor bill tracking report
		/// </summary>
		public string VendorName { get; set; }

		/// <summary>
		/// Gets or sets the values for Pro number in vendor bill tracking report
		/// </summary>
		public string ProNumber { get; set; }

		/// <summary>
		/// Gets or sets values of FromDate
		/// </summary>
		public DateTime FromDate { get; set; }

		/// <summary>
		/// Gets or sets values of ToDate
		/// </summary>
		public DateTime ToDate { get; set; }

		/// <summary>
		/// gets or sets SelectedExceptionRule
		/// </summary>
		public int SelectedExceptionRule { get; set; }

		/// <summary>
		/// gets or sets ExportType
		/// </summary>
		public int ExportType { get; set; }

		/// <summary>
		/// gets or sets ExportType
		/// </summary>
		public int CustomerId { get; set; }

		/// <summary>
		/// Gets or sets RebillRepName
		/// </summary>
		public string RebillRepName { get; set; }

		/// <summary>
		/// Gets or sets Uploaded file details
		/// </summary>
		public UploadedFileDetails UploadedItem { get; set; }
	}
}