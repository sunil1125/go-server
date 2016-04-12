/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />

import refSystem = require('durandal/system');

export interface ICustomerFinancialDetails {
	CustomerId: number;
	Terms: string;
	CreditLimit: number;
}

export module Models {
	export class CustomerFinancialDetails {
		CustomerId: number;
		Terms: string;
		CreditLimit: number;
		constructor(args?: ICustomerFinancialDetails) {
			this.CustomerId = refSystem.isObject(args) ? (args.CustomerId) : 0;
			this.Terms = refSystem.isObject(args) ? (args.Terms) : '';
			this.CreditLimit = refSystem.isObject(args) ? (args.CreditLimit) : 0;
		}
	}
}