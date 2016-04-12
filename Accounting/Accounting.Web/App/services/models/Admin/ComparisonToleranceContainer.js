/// <reference path="../TypeDefs/Admin.d.ts" />
/// <reference path="../TypeDefs/CommonModels.d.ts" />
define(["require", "exports", 'plugins/router', 'durandal/app'], function(require, exports, ___router__, ___app__) {
    
    var _router = ___router__;
    var _app = ___app__;
    

    //#endregion Import
    (function (Models) {
        var ComparisonToleranceContainer = (function () {
            function ComparisonToleranceContainer(args) {
                if (args) {
                    this.ComparisonTolerance = args.ComparisonTolerance;
                    this.ComparisonToleranceItems = args.ComparisonToleranceItems;
                    this.CustomerTariff = args.CustomerTariff;
                }
            }
            return ComparisonToleranceContainer;
        })();
        Models.ComparisonToleranceContainer = ComparisonToleranceContainer;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
