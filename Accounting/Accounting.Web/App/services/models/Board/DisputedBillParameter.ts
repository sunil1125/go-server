/// <reference path="../TypeDefs/Boards.d.ts" />
/// <reference path="../TypeDefs/CommonModels.d.ts" />

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
//#endregion Import

export module Models {
	export class DisputedBillParameter {
		FromDate: Date;
		ToDate: Date;
		PageNumber: number;
		PageSize: number;
		PagesFound: number;
		constructor(args?: IDisputedBillLoadParameter) {
			this.FromDate = refSystem.isObject(args) ? args.FromDate : new Date();
			this.ToDate = refSystem.isObject(args) ? args.ToDate : new Date();
			this.PageNumber = refSystem.isObject(args) ? args.PageNumber : 0;
			this.PageSize = refSystem.isObject(args) ? args.PageSize : 0;
		}
	}
}