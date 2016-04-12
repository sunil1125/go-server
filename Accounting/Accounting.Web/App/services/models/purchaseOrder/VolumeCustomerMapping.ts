//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />

//#endregion References

/***********************************************
   REXNORD MAPPED COMPANIES CLIENT CUSTOMER MAPPING MODEL
************************************************
** <summary>
** Rexnord Mapped Companies Model.
** </summary>
** <createDetails>
** <id>US10953</id><by>Satish</by> <date>29th July, 2014</date>
** </createDetails>}
***********************************************/

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
//#endregion Import

export module Models {
	export class VolumeCustomerMapping {
		DeletedItems: Array<IVolumeCustomerBillsIdentificationMapping>;
		UpdatesItems: Array<IVolumeCustomerBillsIdentificationMapping>;
		AddedItems: Array<IVolumeCustomerBillsIdentificationMapping>;
		constructor(args?: IVolumeCustomerMapping) {
			if (args) {
				this.DeletedItems = args.DeletedItems;
				this.AddedItems = args.AddedItems;
				this.UpdatesItems = args.UpdatesItems;
			}
		}
	}
}