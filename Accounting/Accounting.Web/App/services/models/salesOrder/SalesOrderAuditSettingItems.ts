/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: Nov 30, 2014
** Created By: Satish
*/
export module Model {
	export class SalesOrderAuditSettingItems {
		Id: number;
		ItemId: number;
		MatchingToken: string;
		UserName: string;
		constructor(args?: ISalesOrderAuditSettingItems) {
			this.Id = refSystem.isObject(args) ? args.Id : 0;
			this.ItemId = refSystem.isObject(args) ? args.ItemId : 0;
			this.MatchingToken = refSystem.isObject(args) ? args.MatchingToken : "";
			this.UserName = refSystem.isObject(args) ? args.UserName : "";
		}
	}
}