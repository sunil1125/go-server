/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

/* File Created: July 11, 2014
** Created By: Bhanu pratap
*/

export module Models {
	export class VendorBillHistory {
		vendorBillId: number;
		HistoryDates:Array<string>;
		OldItems:Array<IVendorBillHistoryItems>;
		NewItems:Array<IVendorBillHistoryItems>;

		constructor(args?: IVendorBillHistory) {
			if (args) {
				this.vendorBillId = args.VendorBillId;
				this.HistoryDates = args.HeaderHistoryDates;
				this.OldItems = args.OldNewHistoryItems;
				this.NewItems = args.NewHistoryItems;
			}
		}
	}
}