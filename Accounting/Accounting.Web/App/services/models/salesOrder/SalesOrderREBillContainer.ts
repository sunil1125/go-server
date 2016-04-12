/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: nov 12, 2014
** Created By: sankesh
*/
export module Model {
	export class SalesOrderREBillContainer {
		SalesOrderDetails: ISalesOrderDetail;
		AdjustedItemDetail: Array<ISalesOrderItem>;
		OriginalItemDetail: Array<ISalesOrderItem>;
		SalesOrderShipmentRequoteReasons: Array<ISalesOrderShipmentRequoteReason>;
		SalesOrderRequoteReviewDetails: ISalesOrderRequoteReviewDetail;
		SalesOrderRequoteReasonCodes: Array<IRequoteReasonCodes>;
		OldClass: string;
		NewClass: string;

		constructor(args?: ISalesOrderREBillContainer) {
			if (args) {
				this.SalesOrderDetails = args.SalesOrderDetails;
				this.AdjustedItemDetail = args.AdjustedItemDetail;
				this.OriginalItemDetail = args.OriginalItemDetail;
				this.SalesOrderShipmentRequoteReasons = args.SalesOrderShipmentRequoteReasons;
				this.SalesOrderRequoteReviewDetails = args.SalesOrderRequoteReviewDetails;
				this.SalesOrderRequoteReasonCodes = args.SalesOrderRequoteReasonCodes;
				this.OldClass = args.OldClass;
				this.NewClass = args.NewClass;
			}
		}
	}
}