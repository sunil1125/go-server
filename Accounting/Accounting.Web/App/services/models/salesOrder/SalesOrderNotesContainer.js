/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    

    /* File Created: Aug 9, 2014
    ** Created By: Bhanu
    */
    (function (Model) {
        var SalesOrderNotesContainer = (function () {
            function SalesOrderNotesContainer(args) {
                if (args) {
                    this.SalesOrderNoteDetails = args.SalesOrderNoteDetails;
                    this.Id = args.Id;
                }
            }
            return SalesOrderNotesContainer;
        })();
        Model.SalesOrderNotesContainer = SalesOrderNotesContainer;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
