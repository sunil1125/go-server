//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../../Scripts/Constants/ApplicationMessages.ts" />
//#endregion

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
import refVendorNameSearchControl = require('templates/searchVendorNameControl');
import refVendorNameSearch = require('services/models/common/searchVendorName');
import refCommon = require('services/client/CommonClient');
//#endregion

/*
** <summary>
** Vendor Bill Quick search View Model.
** </summary>
** <createDetails>
** <id>US8967</id> <by>SANKESH POOJARI</by> <date>05-02-2014</date>
** </createDetails>}
** <changeHistory>}
** <id></id> <by></by> <date></date>
** </changeHistory>
*/
export class VendorBillQuickSearchViewModel {
	//#region Members

	// client command
	commonClient: refCommon.Common = new refCommon.Common();

	vendorNameSearchList: refVendorNameSearchControl.SearchVendorNameControl;
	vendorId: KnockoutComputed<number>;
	vendorName: KnockoutComputed<string>;
	proNumber: KnockoutObservable<string> = ko.observable('');
	bolNumber: KnockoutObservable<string> = ko.observable('');
	poNumber: KnockoutObservable<string> = ko.observable('');
	// list of all bill status
	billStatusList: KnockoutObservableArray<IEnumValue> = ko.observableArray([]);
	// selected bill sattus
	selectedbillStatus: KnockoutObservable<number> = ko.observable();

	// width to apply when there is no validation.
	normalWidth: KnockoutObservable<string> = ko.observable('36.3%');

	// width to apply when there is validation.
	errorWidth: KnockoutObservable<string> = ko.observable('233px');

	// error list for vendor bill quick search
	errorVendorBillQuickSearch: KnockoutValidationGroup;

	//#endregion

	//#region Constructor
	constructor() {
		var self = this;
		self.vendorNameSearchList = new refVendorNameSearchControl.SearchVendorNameControl('', '36.3%','', false);
		// to get the vendorId after selecting vendor
		self.vendorId = ko.computed(function () {
			if (self.vendorNameSearchList.name() != null)
				return self.vendorNameSearchList.ID();

			return 0;
		});

		// to get the vendor Name after selecting vendor
		self.vendorName = ko.computed(function () {
			if (self.vendorNameSearchList.name() != null)
				return self.vendorNameSearchList.vendorName();

			return null;
		});

		// Load all classes if not loaded already
		var statusLength: number = self.billStatusList().length;
		if (!(statusLength)) {
			_app.trigger("GetStatusList", function (data: IEnumValue) {
				self.billStatusList.removeAll();
				self.billStatusList.push.apply(self.billStatusList, data);
			});
		}

		// pro validation for minimum three characters
		self.proNumber.extend({
			minLength:
			{
				message: ApplicationMessages.Messages.MinimumCharactersRequired, params: 3
			}
		});

		// pro validation for minimum three characters
		self.bolNumber.extend({
			minLength:
			{
				message: ApplicationMessages.Messages.MinimumCharactersRequired, params: 3
			}
		});

		// po validation for minimum three characters
		self.poNumber.extend({
			minLength:
			{
				message: ApplicationMessages.Messages.MinimumCharactersRequired, params: 3
			}
		});

		self.errorVendorBillQuickSearch = ko.validatedObservable({
			proNumber: self.proNumber,
			bolNumber: self.bolNumber,
			poNumber: self.poNumber
		});
	}
	//#endregion

	//#region Internal Methods
	public validateQuickSearch() {
		var self = this;
		var isInvalid = false;
		if (self.errorVendorBillQuickSearch.errors().length != 0) {
			self.errorVendorBillQuickSearch.errors.showAllMessages();
			return true;
		} else {
			return false;
		}
	}
	//#endregion

	//#region Life Cycle Event
	public activate() {
		return true;
    }

    public cleanup() {
        var self = this;
        self.vendorNameSearchList.cleanUp();
    }
	//#endregion
}