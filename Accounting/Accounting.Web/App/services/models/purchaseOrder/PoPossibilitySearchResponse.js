define(["require", "exports"], function(require, exports) {
    

    (function (Models) {
        var PoPossibilityFindMoreRequest = (function () {
            function PoPossibilityFindMoreRequest(args) {
                if (args) {
                    this.VendorName = args.VendorName ? (args.VendorName) : '';
                    this.ProNumber = args.ProNumber ? (args.ProNumber) : '';
                    this.BolNumber = args.BolNumber ? (args.BolNumber) : '';
                    this.PoNumber = args.PoNumber ? (args.PoNumber) : '';
                    this.ReferenceNumber = args.ReferenceNumber ? (args.ReferenceNumber) : '';
                    this.PickUpFromDate = args.PickUpFromDate ? args.PickUpFromDate : new Date();
                    this.PickUpToDate = args.PickUpToDate ? args.PickUpToDate : new Date();
                    this.ShipperZipCode = args.ShipperZipCode ? args.ShipperZipCode : '';
                    this.ConsigneeZipCode = args.ConsigneeZipCode ? args.ConsigneeZipCode : '';
                    this.PageNumber = args.PageNumber ? args.PageNumber : 0;
                    this.PageSize = args.PageSize ? args.PageSize : 0;
                }
            }
            return PoPossibilityFindMoreRequest;
        })();
        Models.PoPossibilityFindMoreRequest = PoPossibilityFindMoreRequest;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
