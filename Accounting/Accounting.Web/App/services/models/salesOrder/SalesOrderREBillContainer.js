/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    /* File Created: nov 12, 2014
    ** Created By: sankesh
    */
    (function (Model) {
        var SalesOrderREBillContainer = (function () {
            function SalesOrderREBillContainer(args) {
                if (args) {
                    this.SalesOrderDetails = args.SalesOrderDetails;
                    this.AdjustedItemDetail = args.AdjustedItemDetail;
                    this.OriginalItemDetail = args.OriginalItemDetail;
                    this.SalesOrderShipmentRequoteReasons = args.SalesOrderShipmentRequoteReasons;
                    this.SalesOrderRequoteReviewDetails = args.SalesOrderRequoteReviewDetails;
                    this.SalesOrderRequoteReasonCodes = args.SalesOrderRequoteReasonCodes;
                    this.OldClass = args.OldClass;
                    this.NewClass = args.NewClass;
                }
            }
            return SalesOrderREBillContainer;
        })();
        Model.SalesOrderREBillContainer = SalesOrderREBillContainer;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
