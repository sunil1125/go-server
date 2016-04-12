/* File Created: 2 Feb 2015
** Created By: Sankesh Poojari
*/

/// <reference path="../TypeDefs/VendorBillSearchModel.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class VendorBillSearchFilter {
		SearchText: string;
		Operand: number;
		FieldName: string;

		constructor(args?: IVendorBillSearchFilter) {
			this.SearchText = refSystem.isObject(args) ? (args.SearchText) : '';
			this.Operand = refSystem.isObject(args) ? (args.Operand) : 0;
			this.FieldName = refSystem.isObject(args) ? (args.FieldName) : '';
		}
	}
}