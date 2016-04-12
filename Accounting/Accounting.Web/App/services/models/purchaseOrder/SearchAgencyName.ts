/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />

import refSystem = require('durandal/system');

export interface IAgencyNameSearch {
	Id: number;
	Name: string;
	IsPlc: boolean;
	IsBillingStation: number;
}

export module Models {
	export class AgencyNameSearch {
		Id: number;
		Name: string;
		IsPlc: boolean;
		IsBillingStation: number;
		display: string;

		constructor(args?: IAgencyNameSearch) {
			this.Id = refSystem.isObject(args) ? (args.Id) : 0;
			this.Name = refSystem.isObject(args) ? (args.Name) : '';
			this.IsPlc = refSystem.isObject(args) ? (args.IsPlc) : false;
			this.IsBillingStation = refSystem.isObject(args) ? (args.IsBillingStation) : 0;
			this.display = this.Name;
		}
	}
}