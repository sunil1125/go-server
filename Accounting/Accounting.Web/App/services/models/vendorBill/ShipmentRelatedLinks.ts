//#region References

/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />

//#endregion References

/**#Created:
        By: Satish
        On: May 29, 2014
      Desc: To hold Vendorbill shippment links data

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
    export class ShipmentRelatedLinks {
        ID: number;
        SalesOrderID: number;
        Value: string;
        Type: string;
        SOValue: string;
        VBValue: string;
		InvoiceValue: string
		IsSameProNumber: boolean;
		IsSameBolNumber: boolean;
		CarrierCode: string;
		CarrierCodeDisplay: string;
        constructor(args?: IShipmentRelatedLinks) {
            if (args) {
                this.ID = args.ID ? args.ID : 0;
                this.SalesOrderID = args.SalesOrderID ? args.SalesOrderID : 0;
                this.Value = args.Value ? (args.Value) : '';
                this.Type = args.Type ? (args.Type) : '';
                this.SOValue = args.SOValue ? (args.SOValue) : '';
                this.VBValue = args.VBValue ? (args.VBValue) : '';
				this.InvoiceValue = args.InvoiceValue ? (args.InvoiceValue) : '';
                this.IsSameProNumber = args.IsSameProNumber ? (args.IsSameProNumber) : false;
				this.IsSameBolNumber = args.IsSameBolNumber ? (args.IsSameBolNumber) : false;
				this.CarrierCode = args.CarrierCode ? (args.CarrierCode) : '';
				this.CarrierCodeDisplay = args.CarrierCodeDisplay ? (args.CarrierCodeDisplay) : '';
            }
        }
    }
}