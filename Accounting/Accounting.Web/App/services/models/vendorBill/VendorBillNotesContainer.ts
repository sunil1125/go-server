/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: March 10 2015
** Created By: Bhanu
*/
export module Model {
	export class VendorBillNotesContainer {
		VendorBillNoteDetails: Array<IVendorBillNote>;
		Id: number;
		constructor(args?: IVendorBillNotesContainer) {
			if (args) {
				this.VendorBillNoteDetails = args.VendorBillNoteDetails;
				this.Id = args.Id;
			}
		}
	}
}