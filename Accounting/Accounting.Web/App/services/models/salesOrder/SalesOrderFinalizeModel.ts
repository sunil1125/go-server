/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: Feb 7, 2015
** Created By: Bhanu
*/
export module Model{
	export class SalesOrderFinalizeModel {
		ProcessStatusId: number;
		ShipmentId: number;
		TimeSpan: number;

		constructor(args?: ISalesOrderFinalizeDetails) {
			if (args) {
				this.ShipmentId = args.ShipmentId;
				this.ProcessStatusId = args.ProcessStatusId;
				this.TimeSpan = args.TimeSpan;
			}
		}
	}
}