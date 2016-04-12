//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/Boards.d.ts" />
//#endregion References

/* File Created: feb 12, 2015
** Created By: Chadnan Singh bajetha
*/
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');

export module Models {
	export class ItemCodeDescriptionStandardMappings {
		ID: number;
		ItemId: number;
		Description: string;
		AccessorialID: number;
		Code: string;
		IsNew: boolean;

		constructor(args?: IItemCodeDescriptionStandardMappings) {
			if (args) {
				this.ID = args.ID;
				this.ItemId = args.ItemId;
				this.Description = args.Description;
				this.AccessorialID = args.AccessorialID;
				this.Code = args.Code;
				this.IsNew = args.IsNew;
			}
		}
	}
}