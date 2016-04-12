/* File Created: April 14,2014 */
/// <reference path="../TypeDefs/SalesOrderSearchModel.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
	export class SalesOrderSearchResult {
		Id: number;
		BolNumber: string;
		ProNumber: string;
		PickupDate: Date;
		CustomerBolNumber: string;
		Customer: string;
		Vendor: string
		ShipperCompName: string;
		ConsigneeCompName: string;
		ShipperZipCode: string;
		ConsigneeZipCode: string;
		ServiceType: string;
		TotalWeight: number;
		TotalPieces: number;
		Revenue: number;
		ProcessStatus: string;
		InvoiceStatus: string;
		PickupDateDisplay: string;
		ProcessStatusDisplay: string;
        InvoiceStatusDisplay: string;
        ProcessFlowType: string;

		constructor(args?: ISalesOrderSearchResult) {
			this.Id = refSystem.isObject(args) ? (args.Id) : 0;
			this.BolNumber = refSystem.isObject(args) ? (args.BolNumber) : '';
			this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
			this.CustomerBolNumber = refSystem.isObject(args) ? (args.CustomerBolNumber) : '';
			this.Vendor = refSystem.isObject(args) ? (args.Vendor) : '';
			this.Customer = refSystem.isObject(args) ? (args.Customer) : '';
			this.Revenue = refSystem.isObject(args) ? (args.Revenue) : 0;
			this.ShipperCompName = refSystem.isObject(args) ? (args.ShipperCompName) : '';
			this.ConsigneeCompName = refSystem.isObject(args) ? (args.ConsigneeCompName) : '';
			this.ShipperZipCode = refSystem.isObject(args) ? (args.ShipperZipCode) : '';
			this.ConsigneeZipCode = refSystem.isObject(args) ? (args.ConsigneeZipCode) : '';
			this.ServiceType = refSystem.isObject(args) ? (args.ServiceType) : '';
			this.TotalWeight = refSystem.isObject(args) ? (args.TotalWeight) : 0;
			this.TotalPieces = refSystem.isObject(args) ? (args.TotalPieces) : 0;
			this.PickupDate = refSystem.isObject(args) ? (args.PickupDate) : new Date();
			this.ProcessStatus = refSystem.isObject(args) ? (args.ProcessStatus) : '';
			this.InvoiceStatus = refSystem.isObject(args) ? (args.InvoiceStatus) : '';
			this.PickupDateDisplay = refSystem.isObject(args) ? (args.PickupDateDisplay) : '';
			this.ProcessStatusDisplay = refSystem.isObject(args) ? (args.ProcessStatusDisplay) : '';
            this.InvoiceStatusDisplay = refSystem.isObject(args) ? (args.InvoiceStatusDisplay) : '';
            this.ProcessFlowType = refSystem.isObject(args) ? (args.ProcessFlowType) : '';
		}
	}
}