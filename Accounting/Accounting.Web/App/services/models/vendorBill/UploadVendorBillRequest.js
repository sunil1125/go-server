define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    /* File Created: April 14,2014 */
    /// <reference path="../TypeDefs/VendorBillModels.d.ts" />
    /// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
    var refSystem = __refSystem__;

    (function (Models) {
        var UploadVendorBillRequest = (function () {
            function UploadVendorBillRequest(args) {
                this.AllRecords = refSystem.isObject(args) ? args.AllRecords : null;
                this.CorrectedRecords = refSystem.isObject(args) ? args.CorrectedRecords : null;
                this.InvalidRecords = refSystem.isObject(args) ? args.InvalidRecords : null;
            }
            return UploadVendorBillRequest;
        })();
        Models.UploadVendorBillRequest = UploadVendorBillRequest;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
