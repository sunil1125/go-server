//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
//#endregion References

/* File Created: Nov 17, 2014
** Created By: Chandan Singh
*/

import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');

/*
** <summary>
** Vendor bill dispute container view model for all VB method fetch and save from DB
** </summary>
** <createDetails>
** <id></id> <by></by> <date></date>
** </createDetails>
** <changeHistory>
** <id>US20352</id> <by>Chandan Singh Bajetha</by> <date>14-01-2016</date> <description>Acct: Adjust UI for Dispute Notes Tab in Vendor Bill</description>
** </changeHistory>
*/
export module Models {
	export class VendorBillDisputeContainer {
		// ###START: US20352
		DisputeStatusId: IEnumValue; // Dispute Status ID
		// ###END: US20352
		ShipmentId: number;
		DisputeVendorBill: Array<IDisputeVendorBill>;
        VendorBillItemsDetail: Array<IVendorBillItem>;
		VendorBillNotes: Array<IVendorBillNote>;
		CanSaveReasonCodes: boolean;

        /// <summary>
        /// Constructor Initializes the VendorBillContainer
        /// </summary>
		constructor(args?: IVendorBillDisputeContainer) {
			if (args) {
				// ###START: US20352
				this.DisputeStatusId = args.DisputeStatusId;
				// ###END: US20352
				this.DisputeVendorBill = args.DisputeVendorBill;
                this.VendorBillItemsDetail = args.VendorBillItemDetails;
				this.VendorBillNotes = args.VendorBillNote;
				this.ShipmentId = args.ShipmentId;
				this.CanSaveReasonCodes = args.CanSaveReasonCodes;
            }
        }

        activate() {
            return true;
        }
    }
}