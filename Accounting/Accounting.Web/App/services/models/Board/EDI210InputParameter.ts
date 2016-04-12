//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/Boards.d.ts" />
//#endregion References

/* File Created: feb 6, 2015
** Created By: Chadnan Singh bajetha
*/
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');

export module Models {
	export class EDI210Inputparameter {
		VendorBillDuplicateData: IVendorBillContainer;
		OriginalVBProNumber: string;
		OriginalVBMainBolNumber: string;
		EdiDetailsId: number;

		constructor(args?: IEDI210Inputparameter) {
			if (args) {
				this.VendorBillDuplicateData = args.VendorBillDuplicateData;
				this.OriginalVBProNumber = args.OriginalVBProNumber;
				this.OriginalVBMainBolNumber = args.OriginalVBMainBolNumber;
				this.EdiDetailsId = args.EdiDetailsId;
			}
		}
	}
}