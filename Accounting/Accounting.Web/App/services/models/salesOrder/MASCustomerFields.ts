/* File Created: JAN 14, 2015
** Created By: Satish
*/

/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class MASCustomerFields {
		CustomerId: number;
		CustomerName: string;
		/// <summary>
		/// Constructor Initializes the MASCustomerFields
		/// </summary>
		constructor(args?: IMASCustomerFields) {
			if (args) {
				this.CustomerId = refSystem.isObject(args) ? (args.CustomerId) : 0;
				this.CustomerName = refSystem.isObject(args) ? (args.CustomerName) : '';
			}
		}
	}
}