//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
//#endregion References
define(["require", "exports", 'plugins/router', 'durandal/app', 'durandal/system'], function(require, exports, ___router__, ___app__, __refSystem__) {
    
    var _router = ___router__;
    var _app = ___app__;
    var refSystem = __refSystem__;

    (function (Models) {
        var DisputeVendorBill = (function () {
            /// <summary>
            /// Constructor Initializes the DisputeVendorBill
            /// </summary>
            function DisputeVendorBill(args) {
                if (args) {
                    this.VendorBillId = refSystem.isObject(args) ? (args.VendorBillId) : 0;
                    this.ProNumber = refSystem.isObject(args) ? (args.ProNumber) : '';
                    this.DisputedDate = refSystem.isObject(args) ? (args.DisputedDate) : new Date();
                    this.DisputeNotes = refSystem.isObject(args) ? (args.DisputeNotes) : '';
                    this.UpdatedBy = refSystem.isObject(args) ? (args.UpdatedBy) : 0;
                    this.UpdatedDate = refSystem.isObject(args) ? (args.UpdatedDate) : 0;
                    this.DisputedAmount = refSystem.isObject(args) ? (args.DisputedAmount) : 0;

                    //##START: US21147
                    this.LateDisputedAmount = refSystem.isObject(args) ? (args.LateDisputedAmount) : 0;

                    //##END: US21147
                    this.BillStatus = refSystem.isObject(args) ? (args.BillStatus) : 0;
                    this.MasClearanceStatus = refSystem.isObject(args) ? (args.MasClearanceStatus) : 0;
                    this.HoldVendorBill = refSystem.isObject(args) ? (args.HoldVendorBill) : false;
                    this.QuickPay = refSystem.isObject(args) ? (args.QuickPay) : false;
                    this.MasTransferDate = refSystem.isObject(args) ? (args.MasTransferDate) : null;
                    this.ListOfBillStatuses = refSystem.isObject(args) ? (args.ListOfBillStatuses) : null;
                    this.ReasonCodes = refSystem.isObject(args) ? (args.ReasonCodes) : null;
                    this.OriginalBillStatus = refSystem.isObject(args) ? (args.OriginalBillStatus) : 0;
                    this.DisputeStatusId = refSystem.isObject(args) ? (args.DisputeStatusId) : 0;
                    this.CarrierCode = refSystem.isObject(args) ? (args.CarrierCode) : '';
                    this.CarrierName = refSystem.isObject(args) ? (args.CarrierName) : '';
                }
            }
            DisputeVendorBill.prototype.activate = function () {
                return true;
            };
            return DisputeVendorBill;
        })();
        Models.DisputeVendorBill = DisputeVendorBill;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
