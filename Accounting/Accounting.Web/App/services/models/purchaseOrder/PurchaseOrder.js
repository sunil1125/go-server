define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    /* File Created: April 14,2014 */
    /// <reference path="../TypeDefs/VendorBillModels.d.ts" />
    /// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
    /// <reference path="../TypeDefs/CommonModels.d.ts" />
    var refSystem = __refSystem__;

    (function (Models) {
        var PurchaseOrder = (function () {
            function PurchaseOrder(args) {
                this.VendorBillId = refSystem.isObject(args) ? (args.VendorBillId) : 0;
                this.VendorName = refSystem.isObject(args) ? (args.VendorName) : '';
                this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
                this.BolNumber = refSystem.isObject(args) ? (args.BolNumber) : '';
                this.BillDate = refSystem.isObject(args) ? (args.BillDate) : new Date();
                this.PoNumber = refSystem.isObject(args) ? (args.PoNumber) : '';
                this.ReferenceNumber = refSystem.isObject(args) ? (args.ReferenceNumber) : '';
                this.OriginZip = refSystem.isObject(args) ? (args.OriginZip) : '';
                this.DestinationZip = refSystem.isObject(args) ? (args.DestinationZip) : '';
                this.TotalPieces = refSystem.isObject(args) ? (args.TotalPieces) : 0;
                this.TotalWeight = refSystem.isObject(args) ? (args.TotalWeight) : 0;
                this.Amount = refSystem.isObject(args) ? (args.Amount) : 0;
                this.DeliveryDate = refSystem.isObject(args) ? (args.DeliveryDate) : null;
                this.BillStatus = refSystem.isObject(args) ? (args.BillStatus) : 0;
                this.Memo = refSystem.isObject(args) ? (args.Memo) : '';
                this.MakeInactive = refSystem.isObject(args) ? args.MakeInactive : false;
                this.ForceAttach = refSystem.isObject(args) ? args.ForceAttach : false;
                this.QuickPay = refSystem.isObject(args) ? args.QuickPay : false;
                this.HoldVendorBill = refSystem.isObject(args) ? args.HoldVendorBill : false;
                this.CarrierId = refSystem.isObject(args) ? (args.CarrierId) : 0;
                this.DueDate = refSystem.isObject(args) ? (args.DueDate) : new Date();
                this.MainVendorBolNumber = refSystem.isObject(args) ? (args.MainVendorBolNumber) : '';
                this.TotalCost = refSystem.isObject(args) ? (args.TotalCost) : 0;
                this.TotalRevenue = refSystem.isObject(args) ? (args.TotalRevenue) : 0;
                this.DisputedAmount = refSystem.isObject(args) ? (args.DisputedAmount) : 0;
                this.Terms = refSystem.isObject(args) ? (args.Terms) : '';
                this.ActualCost = refSystem.isObject(args) ? (args.ActualCost) : 0;
                this.ActualProfit = refSystem.isObject(args) ? (args.ActualProfit) : 0;
                this.IsPurchaseOrder = refSystem.isObject(args) ? (args.IsPurchaseOrder) : false;
                this.CreatedDate = refSystem.isObject(args) ? (args.CreatedDate) : new Date();
                this.UpdatedBy = refSystem.isObject(args) ? (args.UpdatedBy) : 0;
                this.DisputedDate = refSystem.isObject(args) ? (args.DisputedDate) : null;
                this.ProcessDetails = refSystem.isObject(args) ? (args.ProcessDetails) : '';
                this.ProcessFlow = refSystem.isObject(args) ? (args.ProcessFlow) : 0;
                this.PickupDate = refSystem.isObject(args) ? (args.PickupDate) : null;
                this.fromPickupDate = refSystem.isObject(args) ? (args.PickupDate) : new Date();
                this.toPickupDate = refSystem.isObject(args) ? (args.PickupDate) : new Date();
                this.SalesOrderId = refSystem.isObject(args) ? (args.SalesOrderId) : 0;
                this.MasTransferDate = refSystem.isObject(args) ? (args.MasTransferDate) : null;
                this.IDBFlag = refSystem.isObject(args) ? (args.IDBFlag) : false;
                this.BillingStatuses = refSystem.isObject(args) ? (args.BillingStatuses) : null;
                this.DisputeNotes = refSystem.isObject(args) ? (args.DisputeNotes) : '';
                this.MasClearingStatusList = refSystem.isObject(args) ? (args.MasClearingStatusList) : null;
                this.IsMasStatusVisible = refSystem.isObject(args) ? (args.IsMasStatusVisible) : false;
                this.IsBillForcePushToMas = refSystem.isObject(args) ? (args.IsBillForcePushToMas) : false;
                this.IsPresentInIntermediate = refSystem.isObject(args) ? (args.IsPresentInIntermediate) : false;
                this.IsPresentInMasPermanent = refSystem.isObject(args) ? (args.IsPresentInMasPermanent) : false;
                this.OriginalBOLNumber = refSystem.isObject(args) ? (args.OriginalBOLNumber) : "";
                this.UpdatedDate = refSystem.isObject(args) ? (args.UpdatedDate) : 0;
                this.IsValidationApplicableOnDisputeItems = refSystem.isObject(args) ? (args.IsValidationApplicableOnDisputeItems) : false;
            }
            return PurchaseOrder;
        })();
        Models.PurchaseOrder = PurchaseOrder;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
