/* File Created: February 26, 2015
** Created By: Baldev Singh Thakur
*/

/// <reference path="../TypeDefs/PurchaseOrderSearchModel.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export module Models {
    export class Edi210ExceptionBoardSearchFilter {
        SearchText: string;
        Operand: number;
        FieldName: string;

        constructor(args?: IPurchaseOrderSearchFilter) {
            this.SearchText = refSystem.isObject(args) ? (args.SearchText) : '';
            this.Operand = refSystem.isObject(args) ? (args.Operand) : 0;
            this.FieldName = refSystem.isObject(args) ? (args.FieldName) : '';
        }
    }
}