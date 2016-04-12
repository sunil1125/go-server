/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: nov 26, 2014
** Created By: sankesh
*/
export module Model {
	export class SalesOrderAuditedBillContainer {
		VendorBill: IVendorBill;
      	VendorBillItemsDetail: Array<IVendorBillItem>;

		constructor(args?: ISalesOrderAuditedBillContainer) {
			if (args) {
				this.VendorBill = args.VendorBill;
		    	this.VendorBillItemsDetail = args.VendorBillItemsDetail;
			}
		}
	}
}