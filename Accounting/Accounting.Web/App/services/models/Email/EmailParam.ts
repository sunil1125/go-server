//#region References

/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />

//#endregion References

/**#Created:
		By: Bhanu
		On: July 30, 2014
	  Desc: To hold Email parameters

**#Modified:
		By:
		On:
	  Desc:
*/

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
//#endregion Import

export module Models {
	export class EmailParameters {
		emailAddress: string;
		constructor(args?:IPurchaseOrderEmail) {
			this.emailAddress = refSystem.isObject(args) ? args.EmailAddress : '';
		}
		}
}