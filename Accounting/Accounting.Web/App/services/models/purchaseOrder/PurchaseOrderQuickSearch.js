define(["require", "exports"], function(require, exports) {
    

    (function (Models) {
        var PurchaseOrderQuickSearch = (function () {
            function PurchaseOrderQuickSearch(args) {
                if (args) {
                    this.VendorName = args.VendorName ? (args.VendorName) : '';
                    this.ProNumber = args.ProNumber ? (args.ProNumber) : '';
                    this.BolNumber = args.BolNumber ? (args.BolNumber) : '';
                    this.PoNumber = args.PoNumber ? (args.PoNumber) : '';
                    this.FromDate = args.FromDate ? args.FromDate : new Date();
                    this.ToDate = args.ToDate ? args.ToDate : new Date();
                    this.PageNumber = args.PageNumber ? args.PageNumber : 0;
                    this.PageSize = args.PageSize ? args.PageSize : 0;
                    this.PagesFound = args.PagesFound ? args.PagesFound : 0;
                    this.SortField = args.SortField ? (args.SortField) : '';
                    this.SortOrder = args.SortOrder ? (args.SortOrder) : '';
                    this.IsPurchaseOrder = args.IsPurchaseOrder ? (args.IsPurchaseOrder) : 0;
                }
            }
            return PurchaseOrderQuickSearch;
        })();
        Models.PurchaseOrderQuickSearch = PurchaseOrderQuickSearch;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
