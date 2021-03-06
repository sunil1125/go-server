//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
define(["require", "exports", 'plugins/router', 'durandal/app'], function(require, exports, ___router__, ___app__) {
    
    var _router = ___router__;
    var _app = ___app__;
    

    //#endregion Import
    (function (Models) {
        var VendorBillId = (function () {
            function VendorBillId(args) {
                this.BillIds = new Array();
                this.BillIds.push(args);
            }
            return VendorBillId;
        })();
        Models.VendorBillId = VendorBillId;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
