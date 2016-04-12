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
/// <reference path="../../Scripts/Utility.ts" />

//#endregion

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
import _reportViewer = require('../templates/reportViewerControlV2');
import refVendorBillClient = require('services/client/VendorBillClient');
import refCommonClient = require('services/client/CommonClient');
import refEnums = require('services/models/common/Enums');
import _refVendorBillModel = require('services/models/vendorBill/VendorBillId');
import _refVendorBillSearchFilterModel = require('services/models/vendorBill/VendorBillSearchFilter');
import _refPurchaseOrderSearchFilterModel = require('services/models/purchaseOrder/PurchaseOrderSearchFilter');

//#endregion

/*
** <summary>
** Vendor Bill Exception View Model.
** </summary>
** <createDetails>
** <id>US8214</id> <by>Satish</by> <date>23rd June, 2014</date>
** </createDetails>}
** <changeHistory>}
** <id>US20856</id> <by>Vasanthakumar</by> <date>25-02-2016</date><description>VB Exception Board 'Resolve' button to be always shown on UI</description>
** </changeHistory>
*/
class VendorBillException {
	//#region Members
	public reportContainer: _reportViewer.ReportViewerControlV2 = null;
	public header: _reportViewer.ReportHeaderOption = null;
	public grid: _reportViewer.ReportGridOption = null;
	public reportAction: _reportViewer.ReportAction = null;
	public reportData: IVendorBillExceptionResponse = null;
	public setReportCriteria: (reportAction: _reportViewer.ReportAction) => any;
	public getReportData: (reportAction: _reportViewer.ReportAction) => any;
	public gridOptions: any;
	public reportType: number;
	public modeType = ko.observable();
	private searchText: KnockoutObservable<string>;
	vendorBillClient: refVendorBillClient.VendorBillClient = new refVendorBillClient.VendorBillClient();
	private vendorBillExcptionReportRequest: _refVendorBillModel.Models.VendorBillId = null;
	//To load grid data
	public loadGridData: (reportActionObj) => any;
	// To hold vendor bill id and proNumber
	vendorBillId: KnockoutObservable<number> = ko.observable(0);
	proNumber: KnockoutObservable<string> = ko.observable('');
	isException: KnockoutObservable<boolean> = ko.observable(false);
	sortCol: KnockoutObservable<string> = ko.observable('');
	sorttype: KnockoutObservable<string> = ko.observable('');
	searchFilterItems: Array<IVendorBillSearchFilter> = new Array<_refVendorBillSearchFilterModel.Models.VendorBillSearchFilter>();
	searchFilterItem: IVendorBillSearchFilter = new _refVendorBillSearchFilterModel.Models.VendorBillSearchFilter();
	localStorageKey: KnockoutObservable<string> = ko.observable('');
	commonClientCommand: refCommonClient.Common = new refCommonClient.Common();
	isLoaded: KnockoutObservable<boolean> = ko.observable(false);
	fromLocalStorage: KnockoutObservable<boolean> = ko.observable(false);
	currentDateTime: KnockoutObservable<string> = ko.observable('');
	isSearchFilterItemsData: KnockoutObservable<boolean> = ko.observable(false);
	commonUtils: CommonStatic = new Utils.Common();
	//// ###START: US20856
	isEnableResolve: KnockoutObservable<boolean> = ko.observable(false);
	//// ###END: US20856
	//#endregion

	//#region Constructor
	constructor() {
		var self = this;
		var CommonUtils = new Utils.Common();

		//## Header Section.
		self.header = new _reportViewer.ReportHeaderOption();
		//self.header.reportHeader = "Vendor Bill Exception Board";
		self.header.preparedOn = " ";
		self.header.createdBy = " ";
		self.header.reportName = "Vendor Bill Exception";
		self.header.gridTitleHeader = " ";
		self.header.reportHeader = " ";
		self.searchText = ko.observable("");

		//## initialize date filters
		self.reportAction = new _reportViewer.ReportAction();
		self.grid = self.setGridOptions(self);

		//## Region Export Options.
		var exportOpt = ko.observableArray([
			{ exportType: _reportViewer.ExportOptions.CSV, name: ko.observable("Csv"), enabled: ko.observable(true) },
			{ exportType: _reportViewer.ExportOptions.EXCEL, name: ko.observable("Excel"), enabled: ko.observable(true) },
			{ exportType: _reportViewer.ExportOptions.FILTER, name: ko.observable(""), enabled: ko.observable(true) }]);

		self.header.reportExportOptions = new _reportViewer.ReportExportControl(exportOpt);
		self.header.reportExportOptions.getUrl = function (exp: _reportViewer.IExportOptions): any {
			var searchClient = new refVendorBillClient.SearchModel();
			searchClient.SearchValue = self.searchText().trim();
			searchClient.SortOrder = self.sorttype();
			searchClient.SortCol = self.sortCol();
			searchClient.PageNumber = 1;
			searchClient.PageSize = exp.exportType === 1 ? 2000 : self.gridOptions.pagingOptions.totalServerItems();

			self.searchFilterItems.forEach(item=> {
				if (item.FieldName === 'BillStatusDisplay') {
					item.FieldName = "BillStatusDescription";
				}
				else if (item.FieldName === 'CreatedDateDisplay') {
					item.FieldName = 'CreatedDate'
				} else { }
			});

			searchClient.SearchFilterItems = self.searchFilterItems;
			searchClient.ExportType = exp.exportType;

			var filterModel = { ExportURL: "Accounting/ExportVendorBillExceptionDataWithFilterInExcel", FilterModel: searchClient };
			return filterModel;
		}
        //self.header.reportExportOptions.getUrl = function (exp: _reportViewer.IExportOptions): string {
        //    return "Accounting/ExportVendorBillExceptionDataInExcel";
        //}
		//## Region Export Options End.

        self.setReportCriteria = function (reportActionObj: _reportViewer.ReportAction) {
			if ((reportActionObj != undefined || reportActionObj != null) && (reportActionObj.gridOptions != undefined || reportActionObj.gridOptions != null) && (refSystem.isObject(reportActionObj.gridOptions.sortInfo())) && (reportActionObj.gridOptions.sortInfo().column != undefined || reportActionObj.gridOptions.sortInfo().column != null) && (reportActionObj.gridOptions.sortInfo().column.field != undefined || reportActionObj.gridOptions.sortInfo().column.field != null)) {
				self.sortCol(reportActionObj.gridOptions.sortInfo().column.field);
				if (self.sortCol() == 'CreatedDateDisplay') {
					self.sortCol('CreatedDate');
				}
				else if (self.sortCol() == 'BillStatusDisplay') {
					self.sortCol('BillStatusDescription');
				}
				self.sorttype(reportActionObj.gridOptions.sortInfo().direction);
			}
			else {
				self.sortCol("PRONo");
				self.sorttype("asc");
			}
			self.gridOptions = reportActionObj.gridOptions;
			if (self.reportAction != null) {
				if ((self.modeType() != reportActionObj.filter1selectedItemId) || (self.reportAction.view != reportActionObj.view) ||
					(reportActionObj.dateFrom != self.reportAction.dateFrom) || (reportActionObj.dateTo != self.reportAction.dateTo)) {
					//self.gridOptions.pagingOptions.currentPage(1);
				}
			}

			// Re-set the Grid Columns since the prev. selection of serviceType is diff. to the Current selection
			// we don't want any data on page load so we commented getReportdata  function.
			self.reportAction = reportActionObj;
            // Flag is added to restrict multiple service calls.
            if (self.reportContainer.reportColumnFilter.isFilterApply || self.reportContainer.isPaginationChanged || self.reportContainer.isSortingChanged) {
                if (self.isLoaded()) {
                    self.getReportData(reportActionObj);
                    self.reportContainer.isPaginationChanged = false;
                    self.reportContainer.isSortingChanged = false;
                }
            }
		};

		//set local storage key by url
		var url = $(location).attr('href');
		var urlArray = url.split('/');
		var localStorageId = urlArray.pop().toString().replace(/#/g, "");
		self.localStorageKey(localStorageId);
		if (localStorageId === "Exception") {
			self.localStorageKey(localStorageId + "6");
		} else {
			self.localStorageKey(localStorageId);
		}

		self.getReportData = function (reportActionObj: _reportViewer.ReportAction) {
			var deferred = $.Deferred();
			var promise = deferred.promise();
			var pageno = 0;
			pageno = Number(self.gridOptions.pagingOptions.currentPage());
			if (pageno > 0) {
				// List View
				self.reportContainer.listProgress(true);
				if (self.reportContainer.reportColumnFilter.isFilterApply) {
					self.searchText('');
					self.gridOptions.filterOptions.filterText('');
                }

                var list = self.reportContainer.reportColumnFilter.reportColumnFilters();
                self.searchFilterItems.removeAll();
                if (list.length > 0) {
                    list.forEach((items) => {
                        self.searchFilterItem = new _refVendorBillSearchFilterModel.Models.VendorBillSearchFilter()
						if (items.selectedserviceType() != undefined && items.selectedOperatorType() != undefined) {
                            if (items.selectedserviceType().field === 'CreatedDateDisplay') {
                                self.searchFilterItem.FieldName = "CreatedDate";
                            }
                            else if (items.selectedserviceType().field === 'BillStatusDisplay') {
                                self.searchFilterItem.FieldName = "BillStatusDescription";
                            }
                            else {
                                self.searchFilterItem.FieldName = items.selectedserviceType().field;
                            }

                            self.searchFilterItem.Operand = +items.selectedOperatorType().opratorId;
                            self.searchFilterItem.SearchText = items.searchText();
                            self.searchFilterItems.push(self.searchFilterItem);
                        }
                        if (self.searchFilterItems.length > 0 || items.selectedserviceType() != undefined) {
                            self.isSearchFilterItemsData(true);
							$('.VBExceptionBoard').addClass('margin-top--29');
                        } else {
                            self.isSearchFilterItemsData(false);
							$('.VBExceptionBoard').removeClass('margin-top--29');
                        }
                    });
                }

                self.loadGridData(reportActionObj);
                //to block unwanted service calls
                self.reportContainer.isPaginationChanged = false;
                self.reportContainer.isSortingChanged = false;
			}

			return promise;
		};

		self.loadGridData = (reportActionObj) => {
			var saveData = { PageSize: self.gridOptions.pagingOptions.pageSize(), Filters: self.searchFilterItems }
		    var filterDataToSave = { UserGridSetting: saveData, GridViewId: refEnums.Enums.FilterViewName.VendorBillExceptionBoard, IsFilterApplied: self.reportContainer.reportColumnFilter.isFilterApply, GridSearchText: self.searchText(), PageNo: self.gridOptions.pagingOptions.currentPage(), SortCol: self.sortCol(), SortOrder: self.sorttype(), FromLocalStorage: self.fromLocalStorage() };

			self.vendorBillClient.getVendorBillExceptions(filterDataToSave,
				function (data) {
					if (data.VendorBillExceptionsElastic != null) {
						self.setPagingData(data.VendorBillExceptionsElastic, data.TotalRows, self.gridOptions.pagingOptions.pageSize());
					}
					self.reportContainer.listProgress(false);
					self.reportContainer.invokeHighlight(self.searchText());
				},
				function () {
					self.reportContainer.listProgress(false);

					var toastrOptions = {
						toastrPositionClass: "toast-top-middle",
						delayInseconds: 30,
						fadeOut: 30,
						typeOfAlert: "",
						title: ""
					}
					Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, ApplicationMessages.Messages.ErrorOccurredWhileFetchingVendorBillException, "error", null, toastrOptions);
				}, self.gridOptions.pagingOptions);
		}
				

		self.reportContainer = new _reportViewer.ReportViewerControlV2(self.header, self.grid);

		// ###START: US20856
		////self.reportContainer.showOptionalHeaderRow(true);
		// ###END: US20856

		self.reportContainer.onFilterChange = self.setReportCriteria;
		self.reportContainer.ForceChange();

		//## redirects to Vendor bill order page
		self.reportContainer.onGridColumnClick = function (shipmentObj) {
			var vendorBillId = shipmentObj.VendorBillId;
			_app.trigger("openVendorBill", vendorBillId, shipmentObj.PRONo, (callback) => {
				if (!callback) {
					return;
				}
			}, false, true);
		}

		//for search filter
		self.reportContainer.onSearchTextChange = function (reportViewer, newSearchValue) {
			if (newSearchValue.length >= 3 || newSearchValue.length == 0) {
				var searchString = newSearchValue;
				self.searchText(searchString.trim());
				if (!self.reportContainer.reportColumnFilter.isFilterApply) {
					self.reportContainer.reportColumnFilter.clearAll();
				}
				self.reportContainer.reportColumnFilter.isFilterApply = false;

				self.getReportData(self.reportAction);
				self.gridOptions.pagingOptions.currentPage(1);
			}
		};

		//## Displays Date without Time Part
		self.reportContainer.getDateFormat = function (shipmentobj) {
			var self = this;
			return CommonUtils.formatDate(new Date(shipmentobj.BillDate), 'mm/dd/yyyy');
		}

		//## Display text based on Bill status in VB status column.
		self.reportContainer.getTextfromId = function (shipmentobj) {
			var self = this;
			var status = CommonUtils.getEnumValueById(refEnums.Enums.VendorBillStatus, shipmentobj.BillStatus.toString());
			return status;
		}

		//## Display text based on MasClearanceStatusID in MAS Clearance Status column.
		self.reportContainer.getMasClearanceStatus = function (obj) {
			var self = this;
			return CommonUtils.getEnumValueById(refEnums.Enums.MasClearanceStatus, obj.MasClearanceStatusId.toString());
		}

		//## Display text based on ShippmentId in Mode column.
		self.reportContainer.getModeType = function (obj) {
			var self = this;
			return CommonUtils.getEnumValueById(refEnums.Enums.CarrierType, obj.ShipmentTypeId.toString());
		}

		//## After selection change re-assign the fields value
		self.reportContainer.afterSelectionChange = function (items: KnockoutObservableArray<any>) {
			var selectedRowCount = items.length;
			// ###START: US20856
			if (selectedRowCount > 0) {
				var selectOpt: Array<any> = self.gridOptions.selectedItems();
				self.vendorBillId(selectOpt[0].VendorBillId);
				self.proNumber(selectOpt[0].PRONumber);
				self.isEnableResolve(true);
			}
			else {
				self.isEnableResolve(false);
			}
			// ###END: US20856
		}
		return self;
	}
	//#endregion

	//#region Internal Methods
	private load() {
		var self = this;
		//server call on change page size and change page number
		var pageRecord = LocalStorageController.Get(self.localStorageKey());
		if (pageRecord != null) {
			self.gridOptions.pagingOptions.currentPage(pageRecord.PageNo);
			self.gridOptions.pagingOptions.pageSize(pageRecord.UserGridSetting.PageSize);
			self.sortCol(pageRecord.SortCol);
			self.sorttype(pageRecord.SortOrder);
			var list = pageRecord.UserGridSetting.Filters;
			self.searchFilterItems.removeAll();
			if (list.length > 0 && list[0].FieldName != null) {
				list.forEach((items) => {
					self.searchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter()
						self.searchFilterItem.FieldName = items.FieldName;
					self.searchFilterItem.Operand = items.Operand;
					self.searchFilterItem.SearchText = items.SearchText;
					self.searchFilterItems.push(self.searchFilterItem);
				});
				self.reportContainer.reportColumnFilter.addFilter(self.searchFilterItems);
			}
			if (typeof pageRecord.isLoaded !== "undefined") {
				self.isLoaded(pageRecord.isLoaded);
			}
			self.gridOptions.filterOptions.filterText(pageRecord.GridSearchText);
			self.searchText(pageRecord.GridSearchText);
			self.fromLocalStorage(true);
		}
		self.getReportData(self.reportAction);
        //to block unwanted service calls
        self.reportContainer.isPaginationChanged = false;
		self.reportContainer.isSortingChanged = false;
		// ###START: US20856
		self.isEnableResolve(false);
		// ###END: US20856
	}
	private setGridOptions(self: VendorBillException): _reportViewer.ReportGridOption {
		var grOption = new _reportViewer.ReportGridOption();
		grOption.enableSelectiveDisplay = true;
		grOption.showGridSearchFilter = true;
		grOption.showPageSize = true;
		grOption.UIGridID = ko.observable("VendorBillExceptionOuterGrid");
		grOption.data = <any> self.reportData;
		grOption.columnDefinition = self.setGridColumnDefinitions();
		grOption.useExternalSorting = false;
		grOption.sortedColumn = <_reportViewer.SortOrder> {
			columnName: "PRONo",
			order: "desc"
		};
		grOption.pageSizes = [10, 25, 50, 100];
		grOption.pageSize = 10;
		grOption.totalServerItems = 0;
		grOption.currentPage = 1;
		grOption.jqueryUIDraggable = true;
		grOption.canSelectRows = true;
		grOption.selectWithCheckboxOnly = true;
		grOption.displaySelectionCheckbox = true;
		grOption.multiSelect = false;
		grOption.enablePaging = false;
		grOption.viewPortOptions = false;
		grOption.enableSaveGridSettings = true;
		grOption.useClientSideFilterAndSort = false;
		grOption.showColumnMenu = true;

		return grOption;
	}

	//## Set Grid Columns.
	private setGridColumnDefinitions() {
		var colDefinition: Array = [];
		var self = this;

		//## PRO Cell Template.
		var proCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'PRONo\'], click: function() { $userViewModel.onGridColumnClick($parent.entity) }, attr: { title: $data.getProperty($parent)}" />';

		colDefinition = [
			{ field: 'PRONo', displayName: 'PRO#', width: 110, isRemovable: false, cellTemplate: proCellTemplate, type: _reportViewer.DataTypes.String },
			{ field: 'BOLNumber', displayName: 'BOL#', width: 90, type: _reportViewer.DataTypes.String },
			{ field: 'BillStatusDisplay', displayName: 'VB Status', width: 120, type: _reportViewer.DataTypes.String },
			{ field: 'Amount', displayName: 'VB Amount', width: 80, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate, type: _reportViewer.DataTypes.Numeric },
			{ field: 'VendorBillId', displayName: 'Vendor Bill Id', width: 140, visible: false, type: _reportViewer.DataTypes.Numeric },
			{ field: 'MasClearanceStatus', displayName: 'Mas Id', width: 50, type: _reportViewer.DataTypes.Numeric },
			{ field: 'MasStatusDescription', displayName: 'Mas Clearance Status', width: 200, type: _reportViewer.DataTypes.String },
			{ field: 'CreatedDateDisplay', displayName: 'Bill Created Date', width: 100, type: _reportViewer.DataTypes.DateTime },
			{ field: 'CarrierName', displayName: 'Carrier', width: 130, type: _reportViewer.DataTypes.String },
			{ field: 'CarrierCode', displayName: 'Carrier Code', width: 100, visible: false, type: _reportViewer.DataTypes.String },
			{ field: 'CustomerName', displayName: 'Customer', width: 150, type: _reportViewer.DataTypes.String },
			{ field: 'AgencyID', displayName: 'Agency #', width: 90, visible: false, type: _reportViewer.DataTypes.Numeric },
			{ field: 'AgencyName', displayName: 'Agency Name', width: 120, visible: false, type: _reportViewer.DataTypes.String },
			{ field: 'ShipmentMode', displayName: 'Mode', width: 100, visible: false, type: _reportViewer.DataTypes.String },
			{ field: 'DisputedAmount', displayName: 'Disputed Amount', width: 150, type: _reportViewer.DataTypes.Numeric, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate },
			{ field: 'VBException', displayName: 'Exception Description', width: 200, type: _reportViewer.DataTypes.String }
		];
		return colDefinition;
	}

	//## Set Data into grid container.
	private setPagingData(data, page, pageSize) {
		var self = this;
		self.gridOptions.data(data);
		self.gridOptions.data.valueHasMutated()
		self.gridOptions.pagingOptions.totalServerItems(page);
	}

	//clearing all filter data
	public onClickClearAll() {
		var self = this;
		self.reportContainer.reportColumnFilter.clearAll();
		self.reportContainer.reportColumnFilter.applyFilter();
		self.isSearchFilterItemsData(false);
		$('.VBExceptionBoard').removeClass('margin-top--29');
	}

	//## Initialize VendorBill Exceptions Grid.
	public initializeVendorBillExceptions(data: IVendorBillExceptionResponse) {
		var self = this;
		if (data) {
			self.reportContainer.OptionalHeaderRowLocation('TOP');
			self.setPagingData(data, self.gridOptions, self.reportAction);
			$("#kgSpanFooterSelectedItems").text('0');
			self.reportContainer.listProgress(false);
			$('.noLeftBorder').parent().css('border-left', '0px');
			$('.noRightBorder').parent().css('border-right', '0px');
		}
		else {
			self.reportContainer.listProgress(false);
		}
	}

	// ###START: US20856
	//## On Click of Action Button1 Perform your action....Here Force Push button
	public onClickResolve(reportActionObj: _reportViewer.ReportAction) {
		var self = this;
		var selectOpt: Array<any> = reportActionObj.gridOptions.selectedItems();

		//## Array to Hold Selected VendorBill Ids
		var vendorBillIds: _refVendorBillModel.Models.VendorBillId = new _refVendorBillModel.Models.VendorBillId(0);
		self.reportContainer.listProgress(true);

		selectOpt.forEach(function (item) {
			vendorBillIds.BillIds.push(item["VendorBillId"]);
		});

		_app.trigger("openVendorBill", self.vendorBillId(), selectOpt[0].PRONo, (callback) => { }, false, true);
		}
	// ###END: US20856

	//#region Private Methods
	public reloadPage() {
		var self = this;
		LocalStorageController.Set(self.localStorageKey(), undefined);
		LocalStorageController.Set(self.localStorageKey() + 'lastReloadDateTime', undefined);
		self.beforeBind();
		// ###START: US20856
		self.isEnableResolve(false);
		// ###END: US20856
	}

	//set Date Time for record of last refreshed
	public setDateTimeOfReload() {
		var self = this;
		if (LocalStorageController.Get(self.localStorageKey() + 'lastReloadDateTime')) {
			var localDateTimeOfReload = LocalStorageController.Get(self.localStorageKey() + 'lastReloadDateTime');
			self.currentDateTime(localDateTimeOfReload);
		} else {
			var onlyDate = self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy');
			var date = new Date();
			var str = 'Last Refreshed: ' + onlyDate + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			LocalStorageController.Set(self.localStorageKey() + 'lastReloadDateTime', str);
			//var reloadDate = LocalStorageController.Get(self.vendorBillDetailsViewModel.proNumber() + 'lastReloadDateTime');
			self.currentDateTime(str);
		}
	}

	//#endregion

	//#region Life Cycle Event
	//## Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button
	public attached() {
		_app.trigger('viewAttached');
	}

	//## The composition engine will execute it prior to calling the binder.
	public activate() {
		return true;
	}

	public beforeBind() {
		var self = this
		self.load();
	}

	public compositionComplete() {
		var self = this;
		var successCallBack = data => {
			self.searchText('');
			var filterlist = data.Filters;
			self.gridOptions.pagingOptions.pageSize(data.PageSize);
			self.gridOptions.pagingOptions.currentPage(1);
			self.searchFilterItems.removeAll();
			if (filterlist.length > 0 && filterlist[0].FieldName != null)	{
				filterlist.forEach((items) => {
					self.searchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter()
						self.searchFilterItem.FieldName = items.FieldName;
					self.searchFilterItem.Operand = items.Operand;
					self.searchFilterItem.SearchText = items.SearchText;
					self.searchFilterItems.push(self.searchFilterItem);
				});
				self.reportContainer.reportColumnFilter.addFilter(self.searchFilterItems);
				if (self.searchFilterItems.length > 0) {
					self.isSearchFilterItemsData(true);
					$('.VBExceptionBoard').addClass('margin-top--29');
				} else {
					self.isSearchFilterItemsData(false);
					$('.VBExceptionBoard').removeClass('margin-top--29');
				}
			}
			self.gridOptions.filterOptions.filterText('');
			self.searchText('');
			self.isLoaded(true);
            self.fromLocalStorage(true);
            //to block unwanted service calls
            self.reportContainer.isPaginationChanged = false;
            self.reportContainer.isSortingChanged = false;
		};

		if (!LocalStorageController.Get(self.localStorageKey())) {
			self.commonClientCommand.GetUserGridSettings(refEnums.Enums.FilterViewName.VendorBillExceptionBoard, successCallBack);
		} else {
			//using to show clear filter button after saving filtered data in local storage and switching between tab
			var filteredData = LocalStorageController.Get(self.localStorageKey());
			if (filteredData.UserGridSetting.Filters.length > 0) {
				self.isSearchFilterItemsData(true);
				$('.VBExceptionBoard').addClass('margin-top--29');
			} else {
				self.isSearchFilterItemsData(false);
				$('.VBExceptionBoard').removeClass('margin-top--29');
			}
		}
	}

	public deactivate() {
		var self = this;
		var saveData = { PageSize: self.gridOptions.pagingOptions.pageSize(), Filters: self.searchFilterItems }
		 var filterDataToSave = { UserGridSetting: saveData, GridViewId: refEnums.Enums.FilterViewName.VendorBillExceptionBoard, IsFilterApplied: self.reportContainer.reportColumnFilter.isFilterApply, GridSearchText: self.searchText(), PageNo: self.gridOptions.pagingOptions.currentPage(), SortCol: self.sortCol(), SortOrder: self.sorttype(), isLoaded: true };
		LocalStorageController.Set(self.localStorageKey(), filterDataToSave);
	}
	//#endregion
}

return VendorBillException;