/// <reference path="../TypeDefs/Admin.d.ts" />
/// <reference path="../TypeDefs/CommonModels.d.ts" />

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
//#endregion Import

export module Models {
	export class ComparisonToleranceContainer {
		ComparisonTolerance: Array<IComparisonTolerance>;
		ComparisonToleranceItems: Array<IComparisonToleranceItems>;
		CustomerTariff: ICustomerTariff;

		constructor(args?: IComparisonToleranceContainer) {
			if (args) {
				this.ComparisonTolerance = args.ComparisonTolerance;
				this.ComparisonToleranceItems = args.ComparisonToleranceItems;
				this.CustomerTariff = args.CustomerTariff;
			}
		}
	}
}