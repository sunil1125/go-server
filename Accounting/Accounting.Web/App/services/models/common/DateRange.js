define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    /* File Created: April 10, 2014
    ** Created By: Achal Rastogi
    */
    /// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
    var refSystem = __refSystem__;

    (function (Models) {
        var dateRange = (function () {
            function dateRange(args) {
                this.FromDate = refSystem.isObject(args) ? (args.FromDate) : new Date();
                this.ToDate = refSystem.isObject(args) ? (args.ToDate) : new Date();
            }
            return dateRange;
        })();
        Models.dateRange = dateRange;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
