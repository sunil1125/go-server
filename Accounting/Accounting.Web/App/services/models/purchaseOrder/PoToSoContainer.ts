//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/PurchaseOrderModel.d.ts" />
//#endregion References

import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');

export module Models {
	export class PoToSoContainer {
		VendorBillContainer: IVendorBillContainer;
		PoToSoDetails: IPOToSOParameter;
		constructor(args?: IPOtoSoContainer) {
			if (args) {
				this.VendorBillContainer = args.VendorBillContainer;
				this.PoToSoDetails = args.PoToSoDetails;
			}
		}
	}
}