/// <reference path="../TypeDefs/Report.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />

import refSystem = require('durandal/system');

export module Models {
    export class DisputedVendorBillsReport {
        ShipmentId: number;
        VendorBillId: number;
        BOLNumber: string;
        ProNumber: string;
        Carrier: string;
        Customer: string;
        SalesRepNumber: string;
        SalesRep: string;
        EstimatedCost: number;
        ActualCost: number;
        DisputedDate: Date;
        InternalDisputeDate: Date;
        DisputedAmount: number;
        VendorBillDate: Date;
        APDisputeNote: string;
        CRRDispNote: string;
        DisputedBy: string;
        DisputedDateDisplay: string;
        InternalDisputeDateDisplay: string;
        VendorBillDateDisplay: string;

        constructor(args?: IDisputedVendorBills) {
            this.ShipmentId = refSystem.isObject(args) ? (args.ShipmentId) : 0;
            this.VendorBillId = refSystem.isObject(args) ? (args.VendorBillId) : 0;
            this.BOLNumber = refSystem.isObject(args) ? (args.BOLNumber) : '';
            this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
            this.Carrier = refSystem.isObject(args) ? (args.Carrier) : '';
            this.Customer = refSystem.isObject(args) ? (args.Customer) : '';
            this.SalesRepNumber = refSystem.isObject(args) ? (args.SalesRepNumber) : '';
            this.SalesRep = refSystem.isObject(args) ? (args.SalesRep) : '';
            this.EstimatedCost = refSystem.isObject(args) ? (args.EstimatedCost) : 0;
            this.ActualCost = refSystem.isObject(args) ? (args.ActualCost) : 0;
            this.DisputedDate = refSystem.isObject(args) ? (args.DisputedDate) : new Date();
            this.InternalDisputeDate = refSystem.isObject(args) ? (args.InternalDisputeDate) : new Date();
            this.DisputedAmount = refSystem.isObject(args) ? (args.DisputedAmount) : 0;
            this.VendorBillDate = refSystem.isObject(args) ? (args.VendorBillDate) : new Date();
            this.APDisputeNote = refSystem.isObject(args) ? (args.APDisputeNote) : '';
            this.CRRDispNote = refSystem.isObject(args) ? (args.CRRDispNote) : '';
            this.DisputedBy = refSystem.isObject(args) ? (args.DisputedBy) : '';
            this.DisputedDateDisplay = refSystem.isObject(args) ? (args.DisputedDateDisplay) : '';
            this.InternalDisputeDateDisplay = refSystem.isObject(args) ? (args.InternalDisputeDateDisplay) : '';
            this.VendorBillDateDisplay = refSystem.isObject(args) ? (args.VendorBillDateDisplay) : '';
        }
    }
}