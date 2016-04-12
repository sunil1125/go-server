/* File Created: April 14,2014 */
/// <reference path="../TypeDefs/VendorBillSearchModel.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
    export class VendorBillSearchResult {
        BolNumber: string;
        Id: number;
        ShipmentId: number;
        CustomerBolNumber: string;
        ProNumber: string;
        Vendor: string
        Revenue: number;
        ShipCompanyName: string;
        ConsigneeCompName: string;
        ShipperZipCode: string;
        ConsigneeZipCode: string;
        TransactionType: string;
        BillDate: Date;
        BillStatus: string;
        ProcessFlag: number;
		ProcessFlow: boolean;
		BillDateDisplay:string;

        constructor(args?: IVendorBillSearchResult) {
            this.BolNumber = refSystem.isObject(args) ? (args.BolNumber) : '';
            this.Id = refSystem.isObject(args) ? (args.Id) : 0;
            this.ShipmentId = refSystem.isObject(args) ? (args.ShipmentId) : 0;
            this.CustomerBolNumber = refSystem.isObject(args) ? (args.CustomerBolNumber) : '';
            this.Vendor = refSystem.isObject(args) ? (args.Vendor) : '';
            this.Revenue = refSystem.isObject(args) ? (args.Revenue) : 0;
            this.ShipCompanyName = refSystem.isObject(args) ? (args.ShipCompanyName) : '';
            this.ConsigneeCompName = refSystem.isObject(args) ? (args.ConsigneeCompName) : '';
            this.ShipperZipCode = refSystem.isObject(args) ? (args.ShipperZipCode) : '';
            this.ConsigneeZipCode = refSystem.isObject(args) ? (args.ConsigneeZipCode) : '';
            this.TransactionType = refSystem.isObject(args) ? (args.TransactionType) : '';
            this.BillStatus = refSystem.isObject(args) ? (args.BillStatus) : '';
            this.ProcessFlag = refSystem.isObject(args) ? (args.ProcessFlowFlag) : 0;
            this.ProcessFlow = refSystem.isObject(args) ? (args.ProcessFlow) : false;
            this.BillDate = refSystem.isObject(args) ? (args.BillDate) : new Date();
            this.ProcessFlow = refSystem.isObject(args) ? (args.ProcessFlow) : false;
			this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
			this.BillDateDisplay = refSystem.isObject(args) ? (args.BillDateDisplay) : '';
        }
    }
}