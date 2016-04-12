/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

/***********************************************
   REXNORD MAPPED COMPANIES CLIENT MODEL
************************************************
** <summary>
** Rexnord Mapped Companies Model.
** </summary>
** <createDetails>
** <id>US10953</id><by>Satish</by> <date>29th July, 2014</date>
** </createDetails>}
***********************************************/

export module Models {
	export class VolumeCustomerBillsIdentificationMapping {
		Id: number;
		CustomerId: number;
		CompanyToken: string;
		IsMarkedForDeletion: boolean;

		constructor(args?: IVolumeCustomerBillsIdentificationMapping) {
			this.Id = refSystem.isObject(args) ? (args.Id) : 0;
			this.CustomerId = refSystem.isObject(args) ? (args.CustomerId) : 0;
			this.CompanyToken = refSystem.isObject(args) ? (args.CompanyToken) : '';
			this.IsMarkedForDeletion = refSystem.isObject(args) ? (args.IsMarkedForDeletion) : false;
		}
	}
}