//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/VendorBillModels.d.ts" />
//#endregion

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
import _reportViewer = require('../templates/reportViewerControlV2');
import refVendorBillClient = require('services/client/VendorBillClient');
import refVendorBillHistoryModel = require('services/models/vendorBill/VendorBillHistoryNewItems');
import refEnums = require('services/models/common/Enums');
//#endregion
/*
** <summary>
** Vendor Bill History Detail View Model
** </summary>
** <createDetails>
** <id>US8214</id> <by>Satish</by> <date>27th May, 2014</date>
** </createDetails>}
** <changeHistory>}
** <id></id> <by></by> <date></date>
** </changeHistory>
*/
export class VendorBillHistoryDetails {
	//#region Members
	historyDetailsDatesList: KnockoutObservableArray<HistoryDeatilsDatesVodel> = ko.observableArray([]);
	public historyOldValueContainer: _reportViewer.ReportViewerControlV2 = null;
	public historyNewValueContainer: _reportViewer.ReportViewerControlV2 = null;

	public newHeader: _reportViewer.ReportHeaderOption = null;
	public oldHeader: _reportViewer.ReportHeaderOption = null;
	public newGrid: _reportViewer.ReportGridOption = null;
	public oldGrid: _reportViewer.ReportGridOption = null;
	public newReportAction: _reportViewer.ReportAction = null;
	public oldReportAction: _reportViewer.ReportAction = null;
	public reportOldData: KnockoutObservableArray<IVendorBillHistoryItems> = null;
	public reportNewData: KnockoutObservableArray<IVendorBillHistoryItems> = null;
	public reportItemHistoryDates: KnockoutObservableArray<string> = ko.observableArray<string>();

	public setNewReportCriteria: (newReportAction: _reportViewer.ReportAction) => any;
	public setOldReportCriteria: (oldReportAction: _reportViewer.ReportAction) => any;
	public getReportData: () => void;
	public newGridOptions: any;
	public oldGridOptions: any;
	public reportType: number;
	public modeType = ko.observable();
	public proNumber: KnockoutObservable<string> = ko.observable('');
	changeRecord: (data) => any;
	vendorBillClient: refVendorBillClient.VendorBillClient = new refVendorBillClient.VendorBillClient();
	newHistoryValues: Array<IVendorBillHistoryItems>;
	oldHistoryValues: Array<IVendorBillHistoryItems>;
	//oldComputedHistoryValues: KnockoutComputed<Array<IVendorBillHistoryItems>>;
	selectedHistoryDate: KnockoutObservable<string> = ko.observable('');
	originalData: IVendorBillHistory;
	vendorBillId: KnockoutObservable<number> = ko.observable(0);
	selectedVersionId: KnockoutObservable<string> = ko.observable();
	//#endregion

	//#region Constructor
	constructor() {
		var self = this;
		self.newHeader = new _reportViewer.ReportHeaderOption();
		self.newHeader.reportHeader = "";
		self.newHeader.reportName = "Vendor Bill Payment Details";
		self.newHeader.gridTitleHeader = "New Value";

		self.oldHeader = new _reportViewer.ReportHeaderOption();
		self.oldHeader.reportHeader = "";
		self.oldHeader.reportName = "Vendor Bill Payment Details";
		self.oldHeader.gridTitleHeader = "Old Value";

		//initialize date filters
		self.newReportAction = new _reportViewer.ReportAction();
		self.oldReportAction = new _reportViewer.ReportAction();
		self.newGrid = self.setGridOptions(self);
		self.oldGrid = self.setGridOptions(self);

		self.setNewReportCriteria = (reportActionObj: _reportViewer.ReportAction) => {
			this.newGridOptions = reportActionObj.gridOptions;
			if (this.newReportAction != null) {
				if ((this.modeType() != reportActionObj.filter1selectedItemId) || (this.newReportAction.view != reportActionObj.view) ||
					(reportActionObj.dateFrom != this.newReportAction.dateFrom) || (reportActionObj.dateTo != this.newReportAction.dateTo)) {
					this.newGridOptions.pagingOptions.currentPage(1);
				}
			}

			// Re-set the newGrid Columns since the prev. selection of serviceType is diff. to the Current selection
			// we don't want any data on page load so we commented getReportdata  function.
			// self.getReportData();
			this.newReportAction = reportActionObj;

			if (reportActionObj.dateFrom !== null && reportActionObj.dateTo !== null) {
				// self.getReportData();
			}
			else {
				var toastrOptions = {
					toastrPositionClass: "toast-top-middle",
					delayInseconds: 10,
					fadeOut: 10,
					typeOfAlert: "",
					title: ""
				}
					Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectDateTimeFrame, "info", null, toastrOptions);
			}
		};

		self.changeRecord = (data) => {
			self.selectedHistoryDate(data.historyDateSelected());
			// change selected date color
			self.historyDetailsDatesList().forEach((item) => {
				item.isSelectedDate(false);
			});
			data.isSelectedDate(true);

			if (data.versionIdSelected()) {
				self.selectedVersionId(data.versionIdSelected());
			}
			self.historyOldValueContainer.listProgress(true);
			self.historyNewValueContainer.listProgress(true);

			if (data.versionIdSelected() && data.isSourceIdElastic()) {
				var successCallBack = dataResult => {
					// To load payment Details
					self.initializeHistoryDetails(dataResult);
				},
					faliureCallBack = () => {
					};
				////self.selectedVersionId(data.versionIdSelected);
				self.vendorBillClient.GetVendorBillHistoryDetailsByVersionId(self.vendorBillId(), self.selectedVersionId(), "items", successCallBack, faliureCallBack)
			} else {
				self.applyFilter();
			}
		};

		self.setOldReportCriteria = (reportActionObj: _reportViewer.ReportAction) => {
			this.oldGridOptions = reportActionObj.gridOptions;
			if (this.oldReportAction != null) {
				if ((this.modeType() != reportActionObj.filter1selectedItemId) || (this.oldReportAction.view != reportActionObj.view) ||
					(reportActionObj.dateFrom != this.oldReportAction.dateFrom) || (reportActionObj.dateTo != this.oldReportAction.dateTo)) {
					this.oldGridOptions.pagingOptions.currentPage(1);
				}
			}

			// Re-set the oldGrid Columns since the prev. selection of serviceType is diff. to the Current selection
			// we don't want any data on page load so we commented getReportdata  function.
			// self.getReportData();
			this.oldReportAction = reportActionObj;

			if (reportActionObj.dateFrom !== null && reportActionObj.dateTo !== null) {
				// self.getReportData();
			}
			else {
				var toastrOptions = {
					toastrPositionClass: "toast-top-middle",
					delayInseconds: 10,
					fadeOut: 10,
					typeOfAlert: "",
					title: ""
				}
			Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectDateTimeFrame, "info", null, toastrOptions);
			}
		};

		// Assign the Old value oldGrid settings
		self.historyOldValueContainer = new _reportViewer.ReportViewerControlV2(self.oldHeader, self.oldGrid);
		self.historyOldValueContainer.onFilterChange = self.setOldReportCriteria;
		self.historyOldValueContainer.ForceChange();

		// Assign the New value newGrid settings
		self.historyNewValueContainer = new _reportViewer.ReportViewerControlV2(self.newHeader, self.newGrid);
		self.historyNewValueContainer.onFilterChange = self.setNewReportCriteria;
		self.historyNewValueContainer.ForceChange();
	}

	//#endregion}

	//#region Public Methods
	public initializeHistoryDetails(data: IVendorBillHistory) {
		var self = this;
		if (data) {
			self.originalData = data;
			self.vendorBillId(data.VendorBillId);

			// Select the first item
			if (data.ItemHistoryDates !== null && data.ItemHistoryDates.length > 0) {
				self.selectedHistoryDate(data.ItemHistoryDates[0].CreatedDateDisplay);
				if (data.ItemHistoryDates[0].StringifiedVersionId) {
					self.selectedVersionId(data.ItemHistoryDates[0].StringifiedVersionId);
				}
			}

			// Assign the date to the history date
			if (data.ItemHistoryDates) {
				// self.reportItemHistoryDates.removeAll();
				self.historyDetailsDatesList.removeAll();
				data.ItemHistoryDates.forEach(item => {
					// self.reportItemHistoryDates.push(item);
					self.historyDetailsDatesList.push(new HistoryDeatilsDatesVodel(item, data.IsSourceIsElastic, self.selectedHistoryDate()));
				});
			}

			self.applyFilter();

			$('.noLeftBorder').parent().css('border-left', '0');
			$('.noRightBorder').parent().css('border-right', '0');
		}
		else {
			self.historyOldValueContainer.listProgress(false);
			self.historyNewValueContainer.listProgress(false);
		}
	}

	/*
	// Apply the filter as per the selected history date
	*/
	public applyFilter() {
		var self = this;
		if (self.originalData.IsSourceIsElastic) {
			//self.historyOldValueContainer.OptionalHeaderRowLocation('TOP');
			self.setPagingData(ko.observableArray(self.originalData.OldNewHistoryItems), self.oldGridOptions, self.oldReportAction);
			self.historyOldValueContainer.listProgress(false);

			//self.historyNewValueContainer.OptionalHeaderRowLocation('TOP');
			self.setPagingData(ko.observableArray(self.originalData.NewHistoryItems), self.newGridOptions, self.newReportAction);
			self.historyNewValueContainer.listProgress(false);
		}
		else {
			if (self.originalData && self.selectedHistoryDate) {
				self.oldHistoryValues = ko.utils.arrayFilter(self.originalData.OldNewHistoryItems, (item: IVendorBillHistoryItems) => item.ChangeDate === self.selectedHistoryDate());
			} else {
				self.oldHistoryValues = ko.observableArray()();
			}

			if (self.originalData && self.selectedHistoryDate) {
				self.newHistoryValues = ko.utils.arrayFilter(self.originalData.NewHistoryItems, (item: IVendorBillHistoryItems) => item.ChangeDate === self.selectedHistoryDate());
			} else {
				self.newHistoryValues = ko.observableArray()();
			}

			//self.historyOldValueContainer.OptionalHeaderRowLocation('TOP');
			self.setPagingData(ko.observableArray(self.oldHistoryValues), self.oldGridOptions, self.oldReportAction);
			self.historyOldValueContainer.listProgress(false);

			//self.historyNewValueContainer.OptionalHeaderRowLocation('TOP');
			self.setPagingData(ko.observableArray(self.newHistoryValues), self.newGridOptions, self.newReportAction);
			self.historyNewValueContainer.listProgress(false);
		}
	}

	//close popup
	public closePopup(dialogResult) {
		dialogResult.__dialog__.close(this, dialogResult);
		return true;
	}

	//#endregion

	//#region Private Methods
	private setPagingData(data, grid, gridOption) {
		Utils.kgSetClientsidePagination(data, gridOption, grid, undefined);
	}

	private setGridOptions(self: VendorBillHistoryDetails): _reportViewer.ReportGridOption {
		var grOption = new _reportViewer.ReportGridOption();
		grOption.enableSelectiveDisplay = true;
		grOption.showGridSearchFilter = false;
		grOption.showPageSize = true;
		grOption.UIGridID = ko.observable("VendorBillGridHistoryDetails");
		grOption.columnDefinition = self.setGridColumnDefinitions();
		grOption.useExternalSorting = false;
		grOption.sortedColumn = <_reportViewer.SortOrder> {
			columnName: "ID",
			order: "DESC"
		};
		//grOption.enableSaveGridSettings = true;
		grOption.pageSizes = [10, 25, 50, 100];
		grOption.pageSize = 10;
		grOption.totalServerItems = 0;
		grOption.currentPage = 1;
		grOption.jqueryUIDraggable = true;
		grOption.canSelectRows = false;
		grOption.selectWithCheckboxOnly = false;
		grOption.displaySelectionCheckbox = false;
		grOption.multiSelect = false;
		grOption.enablePaging = false;
		grOption.viewPortOptions = false;
		grOption.enableSaveGridSettings = false;
		grOption.useClientSideFilterAndSort = true;
		grOption.showColumnMenu = false;
		return grOption;
	}

	private setGridColumnDefinitions() {
		// ReSharper disable once AssignedValueIsNeverUsed, this is for return purpose

		//#region Templates
		var changeDescriptionTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeDescription\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeCostTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeCost\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2)"></div>';

		var changeDisputeTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeDispute\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2) "></div>';

		var changeDisputeLostTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeDisputeLost\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2) "></div>';

		var changeClassTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeClass\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeWeightTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeWeight\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeLengthTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeLength\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeHeightTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeHeight\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeWidthTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeWidth\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changePieceTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangePieces\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changePalletTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangePallet\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeNmfcTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeNMFCNumber\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		var changeChangeByTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeChangedBy\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

		// ReSharper disable once AssignedValueIsNeverUsed THIS IS USED TO return
		var colDefinition: Array = [];

		colDefinition = [
			{ field: 'Description', displayName: 'Description', width: 180, cellTemplate: changeDescriptionTemplate },
			{ field: 'CostField', displayName: 'Cost', width: 85, cellTemplate: changeCostTemplate },
			{ field: 'DisputeCostField', displayName: 'Dispute', width: 100, cellTemplate: changeDisputeTemplate },
			{ field: 'DisputeLostField', displayName: 'Dispute Lost', width: 100, cellTemplate: changeDisputeLostTemplate },
			{ field: 'Class', displayName: 'Class', width: 80, cellTemplate: changeClassTemplate },
			{ field: 'Weight', displayName: 'Weight', width: 90, cellTemplate: changeWeightTemplate },
			{ field: 'Length', displayName: 'Length', width: 90, cellTemplate: changeLengthTemplate },
			{ field: 'Height', displayName: 'Height', width: 80, cellTemplate: changeHeightTemplate },
			{ field: 'Width', displayName: 'Width', width: 80, cellTemplate: changeWidthTemplate },
			{ field: 'Pieces', displayName: 'Pieces', width: 90, cellTemplate: changePieceTemplate },
			{ field: 'Pallet', displayName: 'Pallet', width: 90, cellTemplate: changePalletTemplate },
			{ field: 'NMFCNumber', displayName: 'NMFC', width: 90, cellTemplate: changeNmfcTemplate },
			{ field: 'ChangedBy', displayName: 'Changed By', width: 100, cellTemplate: changeChangeByTemplate }

		];

		return colDefinition;
	}

	//#region Load Data
	public load(bindedData) {
		//** if bindedData is null then return false. */
		if (!bindedData)
			return;

		var self = this;

		//** if there is no data is registered then make a server call. */
		var vendorBillId = bindedData.vendorBillId;
		self.proNumber(bindedData.proNumber);

		var successCallBack = data => {
			// To load payment Details
			this.initializeHistoryDetails(data);
		},
			faliureCallBack = () => {
			};

		self.historyOldValueContainer.listProgress(true);
		self.historyNewValueContainer.listProgress(true);
		self.vendorBillClient.GetVendorBillHistoryDetailsByVendorBillId(vendorBillId, successCallBack, faliureCallBack);
	}

	//#endregion

	//**When the value of the activator is switched to a new value, before the switch occurs, we register the view data. */
	public beforeBind() {
		var self = this;
		_app.trigger("loadMyData", data => {
			if (data) {
				self.load(data);
			} else {
				_app.trigger("closeActiveTab");
				_app.trigger("NavigateTo", 'Home');
			}
		});
	}

	public compositionComplete(view, parent) {
	}

	public activate() {
		return true;
	}

	//** Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button. */
	public attached() {
		_app.trigger('viewAttached');
	}

	public cleanUp() {
		var self = this;
		try {
			delete self.historyNewValueContainer.afterSelectionChange;
			delete self.historyNewValueContainer.onFilterChange;

			delete self.historyOldValueContainer.afterSelectionChange;
			delete self.historyOldValueContainer.onFilterChange;

			delete self.setGridColumnDefinitions;

			self.historyDetailsDatesList().forEach((items) => {
				items.cleanUp();
				delete items;
			});

			for (var prop in self) {
				delete self[prop];
			}

			delete self;
		}
		catch (e) {
		}
	}
}
/*
** <summary>
** ForHistoryDetails
** </summary>
** <createDetails>}
** <id></id> <by>chandan Singh</by> <date>16june2015</date>
** </createDetails>}
** <changeHistory>
** <id></id> <by></by> <date></date>
** </changeHistory>
*/
export class HistoryDeatilsDatesVodel {
	historyDateSelected: KnockoutObservable<string> = ko.observable('');
	versionIdSelected: KnockoutObservable<string> = ko.observable('');
	isSourceIdElastic: KnockoutObservable<boolean> = ko.observable(false);
	isSelectedDate: KnockoutObservable<boolean> = ko.observable(false);
	constructor(item: any, isSourceIsElastic, selectedHistoryDate) {
		var self = this;
		self.historyDateSelected(item.CreatedDateDisplay);
		self.versionIdSelected(item.StringifiedVersionId);
		if (isSourceIsElastic === true) {
			self.versionIdSelected(item.StringifiedVersionId);
			self.isSourceIdElastic(isSourceIsElastic);
		}

		if (self.historyDateSelected() == selectedHistoryDate) {
			self.isSelectedDate(true);
		} else {
			self.isSelectedDate(false);
		}
	}

	public cleanUp() {
		try {
			for (var prop in self) {
				if (typeof self[prop].dispose === "function") {
					self[prop].dispose();
				}
				delete self[prop];
			}

			delete self;
		}
		catch (e) {
		}
	}
}