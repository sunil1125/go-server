//#region REFERENCES
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/Report.d.ts" />
/// <reference path="../../Scripts/Constants/ApplicationMessages.ts" />
//#endregion

//#region IMPORT
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
import refReportClient = require('services/client/ReportClient');
import refBoardReportRequestModel = require('services/models/report/BoardReportRequest');
import refEnums = require('services/models/common/Enums');
import refValidations = require('services/validations/Validations');
//#endregion

/*
** <summary>
** Display of Duplicate Bill Items.
** </summary>
** <createDetails>
** <id>US13250</id> <by>Chandan</by> <date>11-27-2014</date>}
** </createDetails>}
** <changeHistory>}
** <id></id> <by></by> <date></date>
** </changeHistory>
*/

export class Edi210CarrierExceptionDuplicateBillItemViewModel {
	//#region MEMBERS
    ediDuplicateItemsList: KnockoutObservableArray<ediDuplicateItemsModel> = ko.observableArray([]);
    totalCost: KnockoutObservable<number> = ko.observable(0);
    totalDifferenceCost: KnockoutObservable<number> = ko.observable(0);
    selected: KnockoutObservable<boolean> = ko.observable(false);
    html: KnockoutObservable<string> = ko.observable('');
    name: KnockoutObservable<string> = ko.observable('Select All');
    selectedLineItems: KnockoutObservableArray<number> = ko.observableArray([]);
	itemSelectionCallBack: (ediDuplicateItemsModel) => any;
	checkBoxSelectionCallBack: () => any;
    isDifferenceAmountAvailable: boolean = false;
    isDiscountSelected: boolean = false;
    isShippingServiceSelected: boolean = false;
    isCount: boolean = false;
	//#endregion

	//#region CONSTRUCTOR
	constructor(itemSelectionCallBack?: (ediDuplicateItemsModel) => any, checkBoxSelectionCallBack?: () => any)  {
		var self = this;

        if (typeof(itemSelectionCallBack) !== 'undefined') {
            self.itemSelectionCallBack = itemSelectionCallBack;
		}

		if (typeof (checkBoxSelectionCallBack) !== 'undefined')
		{
			self.checkBoxSelectionCallBack = checkBoxSelectionCallBack;
		}

		return self;
		//#endregion
	}

	//#region Public Method
	public initilizeDuplicateItems(items: Array<IVendorBillItem>) {
		var self = this;
		self.ediDuplicateItemsList.removeAll();
        items.forEach(function (item) {
            if (item.Difference !== 0) {
                self.isDifferenceAmountAvailable = true;
            }
            else {
                self.isDifferenceAmountAvailable = false;
            }
			self.ediDuplicateItemsList.push(new ediDuplicateItemsModel(item, function () { self.itemCheck(); }, () => { self.checkBoxSelectionCallBack();}));
        });
        self.updateTotalCostAndWeight();
	}
	//#endregion Public Method

	//#region Private Method

    private updateTotalCostAndWeight() {
        var self = this;

        var totalCost: number = 0.0,
            totalDifferenceCost: number = 0.0;

        self.ediDuplicateItemsList().forEach(function (item) {
            if (item.cost()) {
                var costWithoutComma = item.cost().toString();
                var check = costWithoutComma.indexOf(",");
                if (check === -1) {
                    totalCost += parseFloat(item.cost().toString());
                } else {
                    //For removing comma before addition because parseFloat is not taking digit after comma at adding time
                    totalCost += parseFloat(costWithoutComma.replace(/,/g, ""));
                }
            }

            if (item.differenceAmount()) {
                var differenceCostWithoutComma = item.differenceAmount().toString();
                var check = differenceCostWithoutComma.indexOf(",");
                if (check === -1) {
                    totalDifferenceCost += parseFloat(item.differenceAmount().toString());
                } else {
                    totalDifferenceCost += parseFloat(differenceCostWithoutComma.replace(/,/g, ""));
                }
            }
        });

        self.totalCost($.number(totalCost, 2));
        self.totalDifferenceCost($.number(totalDifferenceCost, 2));
    }

    private itemCheck() {
        var self = this;
        var item = 0;
        var count = $.grep(self.ediDuplicateItemsList(), function (e) { return e.isCheck(); });
        if (count.length == self.ediDuplicateItemsList().length) {
            self.selected(true);
            self.html('<i class="icon-ok icon-white active"></i>' + self.name());
        }
        else {
            self.selected(false);
        }

       count.forEach(function (selectedItem) {
            selectedItem.isSelectedItem(true);
            if (selectedItem.itemId() === 10) {
                if (!self.isDiscountSelected) {
                    self.isShippingServiceSelected = true;
                    self.ediDuplicateItemsList().forEach(function (item) {
                        if (item.itemId() === 70 && !item.isCheck()) {
                            item.isCheck(true);
                            self.isDiscountSelected = true;
                        }
                    });
                }
            }
            else if (selectedItem.itemId() === 70) {
                if (!self.isShippingServiceSelected) {
                    self.isDiscountSelected = true;
                    self.ediDuplicateItemsList().forEach(function (item) {
                        if (item.itemId() === 10 && !item.isCheck()) {
                            item.isCheck(true);
                            self.isShippingServiceSelected = true;
                        }
                    });
                }
            }
        });

        self.ediDuplicateItemsList().forEach(function (item) {
            if (item.itemId() === 10 && !item.isCheck()) {
                self.ediDuplicateItemsList().forEach(function (item) {
                    if (item.itemId() === 70) {
                        self.isShippingServiceSelected = false;
                        item.isCheck(false);
                    }
                });
            }
            else if (item.itemId() === 70 && !item.isCheck()) {
                self.ediDuplicateItemsList().forEach(function (item) {
                    if (item.itemId() === 10) {
                        self.isDiscountSelected = false;
                        item.isCheck(false);
                    }
                });
            }
        });

        count = $.grep(self.ediDuplicateItemsList(), function (e) {
            return e.isCheck();
        });

        self.itemSelectionCallBack(count);
        self.isDifferenceAmountAvailable = true; // This variable is set to true as once the check box was being checked, the check box was being disabled.
    }

	//#region Private Method

	//#region LIFE CYCLE EVENT
	// Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button
	public attached() {
		_app.trigger('viewAttached');
	}

	//The composition engine will execute it prior to calling the binder.
	public activate() {
		return true;
	}

	//To load the registered data if any existed.
	public beforeBind() {
		var self = this

		//_app.trigger("loadMyData", function (data) {
		//	if (data) {
		//		self.load(data);

		//	} else {
		//	}
		//});
	}
	//#endregion
}

export class ediDuplicateItemsModel {
	//#region MEMBERS
	items: KnockoutObservable<string> = ko.observable('');
	description: KnockoutObservable<string> = ko.observable('');
	cost: KnockoutObservable<number> = ko.observable(0);
	selectedClass: KnockoutObservable<number> = ko.observable(0);
	weight: KnockoutObservable<number> = ko.observable(0);
	pcs: KnockoutObservable<number> = ko.observable(0);
	dimensionLength: KnockoutObservable<number> = ko.observable(0);
	dimensionWidth: KnockoutObservable<number> = ko.observable(0);
	dimensionHeight: KnockoutObservable<number> = ko.observable(0);
	differenceAmount: KnockoutObservable<number> = ko.observable(0);
    isCheck: KnockoutObservable<boolean> = ko.observable(false);
    isSelectedItem: KnockoutObservable<boolean> = ko.observable(false);
	itemId: KnockoutObservable<number> = ko.observable(0);
	onClickCheckBoxCallBack: () => any;
	SpecialChargeOrAllowanceCode: KnockoutObservable<string> = ko.observable('');
	//#region CONSTRUCTOR
	constructor(item: IVendorBillItem, selectChanged?: () => any, onClickCheckBoxCallBack?: () => any) {
		var self = this;
		self.onClickCheckBoxCallBack = onClickCheckBoxCallBack;
		if (typeof (item) !== 'undefined') {
			self.items(item.ItemName);
			self.description(item.UserDescription);
			self.cost($.number((item.Cost), 2));
			self.selectedClass(item.SelectedClassType);
			self.weight(item.Weight);
			self.pcs(item.PieceCount);
			self.dimensionLength(item.DimensionLength);
			self.dimensionWidth(item.DimensionWidth);
			self.dimensionHeight(item.DimensionHeight);
			self.differenceAmount($.number(item.Difference, 2));
			self.itemId(item.ItemId);
			self.SpecialChargeOrAllowanceCode(item.SpecialChargeOrAllowanceCode);
		}

		self.isCheck.subscribe((newvalue) => {
			selectChanged();
			self.onClickCheckBoxCallBack();
		});

		return self;
		//#endregion
	}
	//#region Public Method

	//#endregion Public Method

	//#region Private Method

	//#endregion Private Method
}