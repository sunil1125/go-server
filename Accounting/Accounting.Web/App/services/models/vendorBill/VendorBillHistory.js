/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    /* File Created: July 11, 2014
    ** Created By: Bhanu pratap
    */
    (function (Models) {
        var VendorBillHistory = (function () {
            function VendorBillHistory(args) {
                if (args) {
                    this.vendorBillId = args.VendorBillId;
                    this.HistoryDates = args.HeaderHistoryDates;
                    this.OldItems = args.OldNewHistoryItems;
                    this.NewItems = args.NewHistoryItems;
                }
            }
            return VendorBillHistory;
        })();
        Models.VendorBillHistory = VendorBillHistory;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
