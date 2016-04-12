/* File Created: JAN 14, 2015
** Created By: Satish
*/
define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    /// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
    /// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
    /// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
    var refSystem = __refSystem__;

    (function (Models) {
        var MASCustomerFields = (function () {
            /// <summary>
            /// Constructor Initializes the MASCustomerFields
            /// </summary>
            function MASCustomerFields(args) {
                if (args) {
                    this.CustomerId = refSystem.isObject(args) ? (args.CustomerId) : 0;
                    this.CustomerName = refSystem.isObject(args) ? (args.CustomerName) : '';
                }
            }
            return MASCustomerFields;
        })();
        Models.MASCustomerFields = MASCustomerFields;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
