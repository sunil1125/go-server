/// <reference path="Utilities.ts" />
/// <reference path="TypeDefs/utils.d.ts" />
/**
* View model for the application nav bar
*/
var ApplicationNavBarViewModel = (function () {
    function ApplicationNavBarViewModel() {
    }
    /*
    * Logs the user out of the application
    */
    ApplicationNavBarViewModel.prototype.logoffCommand = function () {
        var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

        ajax.get("Logoff").done(function () {
            return window.location.href = "/portal/login";
        }).fail(function () {
            return window.location.href = "/portal/login";
        });
    };
    return ApplicationNavBarViewModel;
})();

$().ready(function () {
    // initalize the application view model
    var applicationNavBarViewModel = new ApplicationNavBarViewModel();
    ko.applyBindings(applicationNavBarViewModel, document.getElementById('mainSiteNavbar'));
});
