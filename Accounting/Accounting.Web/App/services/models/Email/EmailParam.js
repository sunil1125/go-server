//#region References
define(["require", "exports", 'plugins/router', 'durandal/app', 'durandal/system'], function(require, exports, ___router__, ___app__, __refSystem__) {
    
    var _router = ___router__;
    var _app = ___app__;
    var refSystem = __refSystem__;

    //#endregion Import
    (function (Models) {
        var EmailParameters = (function () {
            function EmailParameters(args) {
                this.emailAddress = refSystem.isObject(args) ? args.EmailAddress : '';
            }
            return EmailParameters;
        })();
        Models.EmailParameters = EmailParameters;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
