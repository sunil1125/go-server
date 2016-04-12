/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: Nov 30, 2014
** Created By: Satish
*/

export module Model {
	export class SalesOrderAuditSettingContainer {
		SalesOrderAuditSettingCarrierDetails: ISalesOrderAuditSettingCarrierDetails;
		SalesOrderAuditSettingItems: Array<ISalesOrderAuditSettingItems>;
		constructor(args?: ISalesOrderAuditSettingContainer) {
			this.SalesOrderAuditSettingCarrierDetails = refSystem.isObject(args) ? args.SalesOrderAuditSettingCarrierDetails : null;
			this.SalesOrderAuditSettingItems = refSystem.isObject(args) ? args.SalesOrderAuditSettingItems : null;
		}
	}
}