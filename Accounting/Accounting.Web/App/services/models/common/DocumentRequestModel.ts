/* File Created: JAN 16, 2015
** Created By: Satish
*/

/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../TypeDefs/CommonModels.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class DocumentRequestModel {
		BolNumber: string;
		InvoiceNumber: string;
		CustomerBolNumber: string;
		PdfHeight: number;
		PdfWidth: number;
		/// <summary>
		/// Constructor Initializes the DocumentRequestModel
		/// </summary>
		constructor(args?: IDocumentRequestModel) {
			if (args) {
				this.BolNumber = refSystem.isObject(args) ? (args.BolNumber) : '';
				this.InvoiceNumber = refSystem.isObject(args) ? (args.InvoiceNumber) : '';
				this.CustomerBolNumber = refSystem.isObject(args) ? (args.CustomerBolNumber) : '';
				this.PdfHeight = refSystem.isObject(args) ? (args.PdfHeight) : 0;
				this.PdfWidth = refSystem.isObject(args) ? (args.PdfWidth) : 0;
			}
		}
	}
}