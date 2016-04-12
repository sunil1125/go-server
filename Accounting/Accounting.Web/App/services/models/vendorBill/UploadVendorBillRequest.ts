/* File Created: April 14,2014 */
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class UploadVendorBillRequest {
		AllRecords: Array<IVendorBillUploadItem>;
		CorrectedRecords: Array<IVendorBillUploadItem>;
		InvalidRecords: Array<IVendorBillUploadItem>;

		constructor(args?: IUploadVendorBillRequest) {
			this.AllRecords = refSystem.isObject(args) ? args.AllRecords : null;
			this.CorrectedRecords = refSystem.isObject(args) ? args.CorrectedRecords : null;
			this.InvalidRecords = refSystem.isObject(args) ? args.InvalidRecords : null;
		}
	}
}