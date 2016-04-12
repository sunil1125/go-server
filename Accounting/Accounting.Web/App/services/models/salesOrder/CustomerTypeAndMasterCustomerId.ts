/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

import refSystem = require('durandal/system');

/* File Created: Dec 12, 2014
** Created By: Chandan
*/
export module Model {
    export class CustomerTypeAndMasterCustomerId {
        TermType: number;
        TermDescription: string;
        MasterCustomerId: number;
        constructor(args?: ICustomerTypeAndMasterCustomerId) {
            this.TermType = refSystem.isObject(args) ? args.TermType : 0;
            this.TermDescription = refSystem.isObject(args) ? args.TermDescription : '';
            this.MasterCustomerId = refSystem.isObject(args) ? args.MasterCustomerId : 0;
        }
    }
}