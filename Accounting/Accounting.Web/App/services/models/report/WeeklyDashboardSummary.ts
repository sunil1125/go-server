/// <reference path="../TypeDefs/Report.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class WeeklyDashboardSummary {
		ShipmentType: string;
		LtlCount: number;
		TotalWeight: number;
		TotalCost: number;
		ChargePerWeight: number;
		constructor(args?: IWeeklyDashboardSummary) {
			this.ShipmentType = refSystem.isObject(args) ? (args.ShipmentType) : '';
			this.LtlCount = refSystem.isObject(args) ? (args.LtlCount) : 0;
			this.TotalWeight = refSystem.isObject(args) ? (args.TotalWeight) : 0;
			this.TotalCost = refSystem.isObject(args) ? (args.TotalCost) : 0;
			this.ChargePerWeight = refSystem.isObject(args) ? (args.ChargePerWeight) : 0;
		}
	}
}