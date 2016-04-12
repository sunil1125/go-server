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
	export class EDI210ExceptionDetailsContainer {
		Edi210DuplicateExceptionCarrierDetails: IEdi210DuplicateExceptionCarrierDetails;
		EDI210ExceptionDetailsItems: Array<IEDI210ExceptionDetailsItems>;

		constructor(args?: IEDI210ExceptionDetailsContainer) {
			this.Edi210DuplicateExceptionCarrierDetails = args.Edi210DuplicateExceptionCarrierDetails;
			this.EDI210ExceptionDetailsItems = args.EDI210ExceptionDetailsItems;
		}
	}
}