/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    /* File Created: nov 26, 2014
    ** Created By: sankesh
    */
    (function (Model) {
        var SalesOrderAuditedBillContainer = (function () {
            function SalesOrderAuditedBillContainer(args) {
                if (args) {
                    this.VendorBill = args.VendorBill;
                    this.VendorBillItemsDetail = args.VendorBillItemsDetail;
                }
            }
            return SalesOrderAuditedBillContainer;
        })();
        Model.SalesOrderAuditedBillContainer = SalesOrderAuditedBillContainer;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
