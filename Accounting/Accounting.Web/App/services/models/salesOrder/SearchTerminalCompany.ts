/* File Created: Oct 20, 2014
** Created By: Bhanu pratap
*/
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export interface ISearchTerminalCompany {
	ShipperCountryCode: number;
	ShipperStateCode: string;
	ShipperCity: string;
	ShipperZip: string;
	ConsigneeCountryCode: number;
	ConsigneeStateCode: string;
	ConsigneeCity: string;
	ConsigneeZip: string;
	CarrierId: number;
	SearchValue:string
}

export module Models {
	export class SearchTerminalCompany {
		ShipperCountryCode: number;
		ShipperStateCode: string;
		ShipperCity: string;
		ShipperZip: string;
		ConsigneeCountryCode: number;
		ConsigneeStateCode: string;
		ConsigneeCity: string;
		ConsigneeZip: string;
		CarrierId: number;
		SearchValue: string;

		constructor(args?: ISearchTerminalCompany) {
			this.ShipperCountryCode = refSystem.isObject(args) ? (args.ShipperCountryCode) : 0;
			this.ShipperStateCode = refSystem.isObject(args) ? (args.ShipperStateCode) : '';
			this.ShipperCity = refSystem.isObject(args) ? (args.ShipperCity) : '';
			this.ShipperZip = refSystem.isObject(args) ? (args.ShipperZip) : '';
			this.ConsigneeCountryCode = refSystem.isObject(args) ? (args.ConsigneeCountryCode) : 0;
			this.ConsigneeStateCode = refSystem.isObject(args) ? (args.ConsigneeStateCode) : '';
			this.ConsigneeCity = refSystem.isObject(args) ? (args.ConsigneeCity) : '';
			this.ConsigneeZip = refSystem.isObject(args) ? (args.ConsigneeZip) : '';
			this.CarrierId = refSystem.isObject(args) ? (args.CarrierId) : 0;
			this.SearchValue = refSystem.isObject(args) ? (args.SearchValue) : '';
		}
	}
}