/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    var refSystem = __refSystem__;

    (function (Models) {
        var AgencyNameSearch = (function () {
            function AgencyNameSearch(args) {
                this.Id = refSystem.isObject(args) ? (args.Id) : 0;
                this.Name = refSystem.isObject(args) ? (args.Name) : '';
                this.IsPlc = refSystem.isObject(args) ? (args.IsPlc) : false;
                this.IsBillingStation = refSystem.isObject(args) ? (args.IsBillingStation) : 0;
                this.display = this.Name;
            }
            return AgencyNameSearch;
        })();
        Models.AgencyNameSearch = AgencyNameSearch;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
