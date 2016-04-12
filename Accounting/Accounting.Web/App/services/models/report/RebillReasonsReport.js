/// <reference path="../TypeDefs/Report.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    var refSystem = __refSystem__;

    (function (Models) {
        var RebillReasonsReport = (function () {
            function RebillReasonsReport(args) {
                this.ShipmentId = refSystem.isObject(args) ? (args.ShipmentId) : 0;
                this.VendorBillId = refSystem.isObject(args) ? (args.VendorBillId) : 0;
                this.BOLNumber = refSystem.isObject(args) ? (args.BOLNumber) : '';
                this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
                this.Carrier = refSystem.isObject(args) ? (args.Carrier) : '';
                this.PickupDate = refSystem.isObject(args) ? (args.PickupDate) : new Date();
                this.CompanyName = refSystem.isObject(args) ? (args.CompanyName) : '';
                this.EstimatedCost = refSystem.isObject(args) ? (args.EstimatedCost) : 0;
                this.ActualCost = refSystem.isObject(args) ? (args.ActualCost) : 0;
                this.CostDifference = refSystem.isObject(args) ? (args.CostDifference) : 0;
                this.EstimatedRevenue = refSystem.isObject(args) ? (args.EstimatedRevenue) : 0;
                this.ActualRevenue = refSystem.isObject(args) ? (args.ActualRevenue) : 0;
                this.FinalRevenue = refSystem.isObject(args) ? (args.FinalRevenue) : 0;
                this.Carrier = refSystem.isObject(args) ? (args.Carrier) : '';
                this.ReasonForRebill = refSystem.isObject(args) ? (args.ReasonForRebill) : '';
                this.PickupDateDisplay = refSystem.isObject(args) ? (args.PickupDateDisplay) : '';
            }
            return RebillReasonsReport;
        })();
        Models.RebillReasonsReport = RebillReasonsReport;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
