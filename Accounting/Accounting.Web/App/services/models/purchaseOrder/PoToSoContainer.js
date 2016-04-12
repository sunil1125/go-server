//#region References
/// <reference path="../TypeDefs/CommonModels.d.ts" />
/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../TypeDefs/PurchaseOrderModel.d.ts" />
//#endregion References
define(["require", "exports", 'plugins/router', 'durandal/app'], function(require, exports, ___router__, ___app__) {
    
    var _router = ___router__;
    var _app = ___app__;
    

    (function (Models) {
        var PoToSoContainer = (function () {
            function PoToSoContainer(args) {
                if (args) {
                    this.VendorBillContainer = args.VendorBillContainer;
                    this.PoToSoDetails = args.PoToSoDetails;
                }
            }
            return PoToSoContainer;
        })();
        Models.PoToSoContainer = PoToSoContainer;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
