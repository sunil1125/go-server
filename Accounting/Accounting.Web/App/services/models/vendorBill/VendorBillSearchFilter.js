/* File Created: 2 Feb 2015
** Created By: Sankesh Poojari
*/
define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    /// <reference path="../TypeDefs/VendorBillSearchModel.d.ts" />
    /// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
    var refSystem = __refSystem__;

    (function (Models) {
        var VendorBillSearchFilter = (function () {
            function VendorBillSearchFilter(args) {
                this.SearchText = refSystem.isObject(args) ? (args.SearchText) : '';
                this.Operand = refSystem.isObject(args) ? (args.Operand) : 0;
                this.FieldName = refSystem.isObject(args) ? (args.FieldName) : '';
            }
            return VendorBillSearchFilter;
        })();
        Models.VendorBillSearchFilter = VendorBillSearchFilter;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
