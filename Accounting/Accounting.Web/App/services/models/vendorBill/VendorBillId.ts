//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />

//#endregion References

/**#Created:
		<By>Satish</By><On>June 26, 2014 </On><Desc>To hold VendorBill IDs.</Desc>
##Modified:
	<By></By><On></On><Desc></Desc>
*/

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
//#endregion Import

export module Models {
	export class VendorBillId {
		BillIds: Array<number> = new Array < number>();

		constructor(args?: number) {
			this.BillIds.push(args);
		}
	}
}