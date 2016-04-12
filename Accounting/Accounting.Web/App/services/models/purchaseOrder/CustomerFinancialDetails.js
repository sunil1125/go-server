/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    var refSystem = __refSystem__;

    (function (Models) {
        var CustomerFinancialDetails = (function () {
            function CustomerFinancialDetails(args) {
                this.CustomerId = refSystem.isObject(args) ? (args.CustomerId) : 0;
                this.Terms = refSystem.isObject(args) ? (args.Terms) : '';
                this.CreditLimit = refSystem.isObject(args) ? (args.CreditLimit) : 0;
            }
            return CustomerFinancialDetails;
        })();
        Models.CustomerFinancialDetails = CustomerFinancialDetails;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
