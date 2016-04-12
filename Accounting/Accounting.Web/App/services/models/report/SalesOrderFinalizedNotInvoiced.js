define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    /// <reference path="../TypeDefs/Report.d.ts" />
    /// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
    var refSystem = __refSystem__;

    (function (Models) {
        var SalesOrderFinalizedNotInvoicedReport = (function () {
            function SalesOrderFinalizedNotInvoicedReport(args) {
                this.Id = refSystem.isObject(args) ? (args.Id) : 0;
                this.BOLNumber = refSystem.isObject(args) ? (args.BOLNumber) : '';
                this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
                this.FinalizedDate = refSystem.isObject(args) ? (args.FinalizedDate) : new Date();
                this.PickupDate = refSystem.isObject(args) ? (args.PickupDate) : new Date();
                this.SOCreatedDate = refSystem.isObject(args) ? (args.SOCreatedDate) : new Date();
                this.Revenue = refSystem.isObject(args) ? (args.Revenue) : 0;
                this.Customer = refSystem.isObject(args) ? (args.Customer) : '';
                this.RepName = refSystem.isObject(args) ? (args.RepName) : '';
                this.ProcessFlow = refSystem.isObject(args) ? (args.ProcessFlow) : 0;
                this.CustomerTermType = refSystem.isObject(args) ? (args.CustomerTermType) : '';
                this.CarrierName = refSystem.isObject(args) ? (args.CarrierName) : '';
                this.ProcessStatusDisplay = refSystem.isObject(args) ? (args.ProcessStatusDisplay) : '';
                this.BillStatusDisplay = refSystem.isObject(args) ? (args.BillStatusDisplay) : '';
                this.InvoiceStatusDisplay = refSystem.isObject(args) ? (args.InvoiceStatusDisplay) : '';
                this.FinalizedDateDisplay = refSystem.isObject(args) ? (args.FinalizedDateDisplay) : '';
                this.PickupDateDisplay = refSystem.isObject(args) ? (args.PickupDateDisplay) : '';
                this.SOCreatedDateDisplay = refSystem.isObject(args) ? (args.SOCreatedDateDisplay) : '';
                this.Mode = refSystem.isObject(args) ? (args.Mode) : '';
                this.CustomerID = refSystem.isObject(args) ? (args.CustomerID) : 0;
            }
            return SalesOrderFinalizedNotInvoicedReport;
        })();
        Models.SalesOrderFinalizedNotInvoicedReport = SalesOrderFinalizedNotInvoicedReport;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
