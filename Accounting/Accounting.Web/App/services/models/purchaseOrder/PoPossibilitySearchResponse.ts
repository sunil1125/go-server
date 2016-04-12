/* File Created: Sept 30, 2014
** Created By: Chandan Singh Bajetha
*/
/// <reference path="../TypeDefs/PurchaseOrderSearchModel.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class PoPossibilitySearchResponse {
		PoPossibilityResponse: Array<IPOPossibility>;
		NumberOfRows: number;

		constructor(args?: IPoPossibilitySearchResponse) {
			if (args) {
				this.PoPossibilityResponse = args.PoPossibilityResponse ? (args.PoPossibilityResponse) : null;
				this.NumberOfRows = args.NumberOfRows ? (args.NumberOfRows) : 0;
			}
		}
	}
}