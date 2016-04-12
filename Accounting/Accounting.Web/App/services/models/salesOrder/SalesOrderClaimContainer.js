/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    /* File Created: Oct 21, 2014
    ** Created By: Sankesh
    */
    (function (Model) {
        var SalesOrderClaimContainer = (function () {
            function SalesOrderClaimContainer(args) {
                this.SalesOrderClaimDetail = args.SalesOrderClaimDetail;
                this.SalesOrderClaimDocument = args.SalesOrderClaimDocument;
                this.SalesOrderClaimNotes = args.SalesOrderClaimNotes;
                this.SalesOrderClaimNoteDetails = args.SalesOrderClaimNoteDetails;
            }
            return SalesOrderClaimContainer;
        })();
        Model.SalesOrderClaimContainer = SalesOrderClaimContainer;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
