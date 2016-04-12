//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/Boards.d.ts" />
//#endregion References

/* File Created: jan 5, 2015
** Created By: Chadnan Singh bajetha
*/
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');

export module Models {
	export class GenerateVendorBillContainer {
		VenderBillDuplicateContainer: IVendorBillContainer;
		VenderBillOriginalContainer: IVendorBillContainer;
		ExceptionDetailsMetaSource: IEdi210DuplicateExceptionCarrierDetails;

		constructor(args?: IGenerateVendorBillContainer) {
			this.VenderBillDuplicateContainer = args.VenderBillDuplicateContainer;
			this.VenderBillOriginalContainer = args.VenderBillOriginalContainer;
			this.ExceptionDetailsMetaSource = args.ExceptionDetailsMetaSource;
		}
	}
}