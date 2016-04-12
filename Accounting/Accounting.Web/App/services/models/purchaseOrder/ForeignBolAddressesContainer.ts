//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/PurchaseOrderModel.d.ts" />

//#endregion References
//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
//#endregion Import

export module Models {
	export class ForeignBolAddressesContainer {
		ForeignBolAddressesList: Array<IForeignBolAddress>;
		constructor(args?: IForeignBolAddressesContainer) {
			if (args) {
				this.ForeignBolAddressesList = args.ForeignBolAddressesList;
			}
		}
	}
}