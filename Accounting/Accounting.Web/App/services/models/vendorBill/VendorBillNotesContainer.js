/// <reference path="../TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    /* File Created: March 10 2015
    ** Created By: Bhanu
    */
    (function (Model) {
        var VendorBillNotesContainer = (function () {
            function VendorBillNotesContainer(args) {
                if (args) {
                    this.VendorBillNoteDetails = args.VendorBillNoteDetails;
                    this.Id = args.Id;
                }
            }
            return VendorBillNotesContainer;
        })();
        Model.VendorBillNotesContainer = VendorBillNotesContainer;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
