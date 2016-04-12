/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: Aug 9, 2014
** Created By: sankesh
*/
export module Model {
	export class RequoteBillModel {
		name: string ;
		id: number ;
		IsEnable:boolean;
		constructor(args?: IRequoteReasonCodes) {
			if (args) {
				this.id = args.ReQuoteReasonID;
				this.name = args.ShortDescription;
				this.IsEnable = args.IsEnable;
			}
		}
	}
}