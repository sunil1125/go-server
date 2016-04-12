/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: Oct 21, 2014
** Created By: sankesh
*/

export module Models {
    export class SalesOrderClaimDocument{
        ID: number;
        ClaimId: number;
        DocumentPath: string;

        constructor(args?: ISalesOderClaimDocument) {
            this.ID = refSystem.isObject(args) ? args.ID : 0;
            this.ClaimId = refSystem.isObject(args) ? args.ClaimId : 0;
            this.DocumentPath = refSystem.isObject(args) ? args.DocumentPath : '';
        }
    }
}