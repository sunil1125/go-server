/* File Created: April 10, 2014
** Created By: Achal Rastogi
*/
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export interface IdateRange {
	FromDate: Date;
	ToDate: Date;
}

export module Models {
	export class dateRange {
		FromDate: Date;
		ToDate: Date;

		constructor(args?: IdateRange) {
			this.FromDate = refSystem.isObject(args) ? (args.FromDate) : new Date();
			this.ToDate = refSystem.isObject(args) ? (args.ToDate) : new Date();
		}
	}
}