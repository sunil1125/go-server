using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Accounting.Web.Models
{
	/// <summary>
	/// A class or model which is used to receive the data coming from client for an uploaded file
	/// </summary>
	/// <createDetails>
	/// <id>US20913</id> <by>Baldev Singh Thakur</by> <date>29-02-2016</date> <description>To download .csv or excel from csv upload.</description>
	/// </createDetails>
	public class UploadedFileDetails
	{
		/// <summary>
		/// Gets or sets the FileContent (String of bytes)
		/// </summary>
		public string FileContent { get; set; }

		/// <summary>
		/// Gets or sets the File Extension
		/// </summary>
		public string FileExtension { get; set; }

		/// <summary>
		/// Gets or sets the File Name
		/// </summary>
		public string FileName { get; set; }

		/// <summary>
		/// Gets or sets the Grid Page Number
		/// </summary>
		public int PageNumber { get; set; }

		/// <summary>
		/// Gets or sets the Grid Page Size
		/// </summary>
		public int PageSize { get; set; }
	}
}