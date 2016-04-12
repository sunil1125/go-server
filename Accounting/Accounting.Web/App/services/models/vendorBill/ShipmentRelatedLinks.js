//#region References
define(["require", "exports", 'plugins/router', 'durandal/app'], function(require, exports, ___router__, ___app__) {
    
    var _router = ___router__;
    var _app = ___app__;
    

    //#endregion Import
    (function (Models) {
        var ShipmentRelatedLinks = (function () {
            function ShipmentRelatedLinks(args) {
                if (args) {
                    this.ID = args.ID ? args.ID : 0;
                    this.SalesOrderID = args.SalesOrderID ? args.SalesOrderID : 0;
                    this.Value = args.Value ? (args.Value) : '';
                    this.Type = args.Type ? (args.Type) : '';
                    this.SOValue = args.SOValue ? (args.SOValue) : '';
                    this.VBValue = args.VBValue ? (args.VBValue) : '';
                    this.InvoiceValue = args.InvoiceValue ? (args.InvoiceValue) : '';
                    this.IsSameProNumber = args.IsSameProNumber ? (args.IsSameProNumber) : false;
                    this.IsSameBolNumber = args.IsSameBolNumber ? (args.IsSameBolNumber) : false;
                    this.CarrierCode = args.CarrierCode ? (args.CarrierCode) : '';
                    this.CarrierCodeDisplay = args.CarrierCodeDisplay ? (args.CarrierCodeDisplay) : '';
                }
            }
            return ShipmentRelatedLinks;
        })();
        Models.ShipmentRelatedLinks = ShipmentRelatedLinks;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
