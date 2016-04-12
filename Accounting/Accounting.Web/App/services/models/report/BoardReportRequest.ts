/* File Created: April 14,2014 */
/// <reference path="../TypeDefs/Report.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class BoardReportRequest {
		VendorName: string;
		ProNumber: string;
		PageNumber: number;
		PageSize: number;
		FromDate: Date;
        ToDate: Date;
		RebillRepName: string;
		GridSearchText: string;
		constructor(args?: IBoardReportRequest) {
			this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
			this.VendorName = refSystem.isObject(args) ? (args.VendorName) : '';
			this.PageNumber = refSystem.isObject(args) ? (args.PageNumber) : 0;
			this.PageSize = refSystem.isObject(args) ? (args.PageSize) : 0;
			this.FromDate = refSystem.isObject(args) ? (args.FromDate) : new Date();
            this.ToDate = refSystem.isObject(args) ? (args.ToDate) : new Date();
			this.RebillRepName = refSystem.isObject(args) ? (args.RebillRepName) : '';
			this.GridSearchText = refSystem.isObject(args) ? (args.GridSearchText) : '';
		}
	}
}