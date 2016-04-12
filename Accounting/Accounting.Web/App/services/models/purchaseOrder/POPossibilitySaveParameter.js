/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../TypeDefs/PurchaseOrderModel.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    (function (Models) {
        var POPossibilitySaveParameter = (function () {
            function POPossibilitySaveParameter(args) {
                if (args) {
                    this.VendorBillId = args.VendorBillId;
                    this.SalesOrderId.push(args.SalesOrderId);
                }
            }
            return POPossibilitySaveParameter;
        })();
        Models.POPossibilitySaveParameter = POPossibilitySaveParameter;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
