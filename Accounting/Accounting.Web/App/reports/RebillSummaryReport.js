//#region References
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
define(["require", "exports", 'plugins/router', 'durandal/app', 'durandal/system', 'services/client/ReportClient', '../templates/reportViewerControlV2', 'services/models/report/BoardReportRequest', 'services/models/common/Enums', 'services/client/VendorBillClient'], function(require, exports, ___router__, ___app__, __refSystem__, __refReportClient__, ___reportViewer__, __refBoardReportRequestModel__, __refEnums__, __refVendorBillClient__) {
    
    var _router = ___router__;
    var _app = ___app__;
    var refSystem = __refSystem__;
    var refReportClient = __refReportClient__;
    var _reportViewer = ___reportViewer__;
    var refBoardReportRequestModel = __refBoardReportRequestModel__;
    var refEnums = __refEnums__;
    var refVendorBillClient = __refVendorBillClient__;

    //#endregion
    /*
    ** <summary>
    ** Report Vendor Bill Exception report View Model.
    ** </summary>
    ** <createDetails>
    ** <id>US8214</id> <by>Baldev Singh Thakur</by> <date>12-11-2014</date>}
    ** </createDetails>}
    ** <changeHistory>}
    ** <id>DE20737</id> <by>Vasanthakumar</by> <date>26-11-2015</date><description>Enabled the grid setting saving option</description>
    ** <id>US20647</id> <by>Chandan Singh Bajetha</by> <date>17-02-2016</date><description>Acct: Implement Search on all Reports</description>
    ** </changeHistory>
    */
    var RebillSummaryReportViewModel = (function () {
        //#endregion
        //#region Constructor
        function RebillSummaryReportViewModel() {
            //#region Members
            this.reportClient = null;
            this.listProgress = ko.observable(false);
            this.boardReportRequest = null;
            //#endregion
            //#region public report viewer members
            this.reportContainer = null;
            this.headerOptions = null;
            this.grid = null;
            this.reportAction = null;
            this.reportData = null;
            this.modeType = ko.observable();
            var self = this;
            self.headerOptions = new _reportViewer.ReportHeaderOption();
            self.headerOptions.gridTitleHeader = " ";
            self.headerOptions.reportHeader = "Rebill Summary Report";
            self.headerOptions.reportName = "Rebill Summary Report";
            self.reportAction = new _reportViewer.ReportAction();
            self.grid = self.setGridOptions(self);

            self.reportClient = new refReportClient.ReportClient();

            self.searchText = ko.observable("");

            //#region Export Options
            var exportOptions = ko.observableArray([
                { exportType: _reportViewer.ExportOptions.CSV, name: ko.observable("Csv"), enabled: ko.observable(true) },
                { exportType: _reportViewer.ExportOptions.EXCEL, name: ko.observable("Excel"), enabled: ko.observable(true) }
            ]);

            self.headerOptions.reportExportOptions = new _reportViewer.ReportExportControl(exportOptions);

            self.headerOptions.reportExportOptions.getUrl = function (exp) {
                var searchClient = new refVendorBillClient.SearchModel();

                searchClient.PageSize = exp.exportType === 1 ? 2000 : self.gridOptions.pagingOptions.totalServerItems();
                searchClient.PageNumber = 1;
                searchClient.ExportType = exp.exportType;

                var filterModel = { ExportURL: "Accounting/ExportRebillSummaryReportInExcel", FilterModel: searchClient };
                return filterModel;
            };

            //#endregion
            self.setReportCriteria = function (reportActionObject) {
                self.gridOptions = reportActionObject.gridOptions;
                if (self.reportAction != null) {
                    if ((self.modeType() != reportActionObject.filter1selectedItemId) || (self.reportAction.view != reportActionObject.view)) {
                    }
                }

                self.reportAction = reportActionObject;
                self.getReportData(reportActionObject);
            };

            self.getReportData = function (reportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageNo = 0;
                pageNo = Number(self.gridOptions.pagingOptions.currentPage());
                if (pageNo > 0) {
                    self.reportContainer.listProgress(true);
                    self.boardReportRequest = new refBoardReportRequestModel.Models.BoardReportRequest();
                    self.boardReportRequest.PageNumber = self.gridOptions.pagingOptions.currentPage();
                    self.boardReportRequest.PageSize = self.gridOptions.pagingOptions.pageSize();

                    // ###START: US20647
                    self.boardReportRequest.GridSearchText = self.searchText().trim();

                    // ###END: US20647
                    self.reportClient.getRebillSummaryReport(self.boardReportRequest, function (data) {
                        self.setPagingData(data.range, data.TotalCount, self.gridOptions.pagingOptions.pageSize());
                        self.reportContainer.listProgress(false);
                        deferred.resolve(data, reportActionObj.view);
                        self.reportContainer.invokeHighlight(self.searchText());
                    }, function () {
                        self.reportContainer.listProgress(false);
                        ////var toasterOptions = {
                        ////    toastrPositionClass: "toast-top-middle",
                        ////    delayInSeconds: 10,
                        ////    fadeOut: 10,
                        ////    typeOfAlert: "",
                        ////    title: ""
                        ////}
                        ////Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, ApplicationMessages.Messages.ErrorOccurredWhileFetchingRebillSummaryReport, "error", null, toasterOptions);
                    });
                }
                return promise;
            };

            self.reportContainer = new _reportViewer.ReportViewerControlV2(self.headerOptions, self.grid);
            self.reportContainer.onFilterChange = self.setReportCriteria;
            self.reportContainer.ForceChange();

            //#region Redirects to Vendor Bill Order Page
            self.reportContainer.onProNumberClick = function (obj) {
                var vendorBillId = obj.VendorBillId;
                _app.trigger("openVendorBill", vendorBillId, obj.VendorBillProNo, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            //#endregion
            //#region Redirect to Sales Order Edit page
            self.reportContainer.onSalesOrderClick = function (obj) {
                var salesOrderId = obj.SalesOrder;
                _app.trigger("openSalesOrder", salesOrderId, obj.SalesOrder, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            //#endregion
            //#region Search Fillter
            self.reportContainer.onSearchTextChange = function (reportViewer, newSearchValue) {
                if (newSearchValue.length >= 3 || newSearchValue.length == 0) {
                    // ###START: US20647
                    var data = new Array();
                    var searchString = newSearchValue;

                    //to blank grid data
                    self.setPagingData(data, 0, self.gridOptions.pagingOptions.pageSize());
                    self.searchText(searchString.trim());
                    self.getReportData(self.reportAction);
                    self.gridOptions.pagingOptions.currentPage(1);
                    // ###END: US20647
                }
            };

            //#endregion
            return self;
        }
        //#endregion
        //#region Private Function
        RebillSummaryReportViewModel.prototype.setPagingData = function (data, page, pageSize) {
            var self = this;
            self.gridOptions.data(data);
            self.gridOptions.data.valueHasMutated();
            self.gridOptions.pagingOptions.totalServerItems(page);
        };

        RebillSummaryReportViewModel.prototype.setGridOptions = function (self) {
            var gridOption = new _reportViewer.ReportGridOption();
            gridOption.enableSelectiveDisplay = true;
            gridOption.showGridSearchFilter = true;
            gridOption.showPageSize = true;
            gridOption.UIGridID = ko.observable("RebillSummaryReportGrid");
            gridOption.data = self.reportData;
            gridOption.columnDefinition = self.setGridColumnDefinitions();
            gridOption.useExternalSorting = false;
            gridOption.sortedColumn = { columnName: "ProNumber", order: "DESC" };
            gridOption.pageSizes = [10, 25, 50, 100];
            gridOption.pageSize = 10;
            gridOption.totalServerItems = 0;
            gridOption.currentPage = 1;
            gridOption.jqueryUIDraggable = true;
            gridOption.canSelectRows = true;
            gridOption.selectWithCheckboxOnly = false;
            gridOption.displaySelectionCheckbox = false;
            gridOption.multiSelect = false;
            gridOption.enablePaging = false;
            gridOption.viewPortOptions = false;

            // ###START: DE20737
            gridOption.enableSaveGridSettings = true;

            // ###END: DE20737
            gridOption.useClientSideFilterAndSort = true;
            gridOption.showColumnMenu = true;
            return gridOption;
        };

        RebillSummaryReportViewModel.prototype.setGridColumnDefinitions = function () {
            var columnDefintion = [];
            var self = this;

            //var vbcellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[VendorBillId], click: function() { $userViewModel.onGridColumnClick($parent.entity)}" />';
            var soCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'SalesOrder\'], click: function() { $userViewModel.onSalesOrderClick($parent.entity)}" />';
            var proCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'VendorBillProNo\'], click: function() { $userViewModel.onProNumberClick($parent.entity) }" />';

            columnDefintion = [
                { field: 'VendorBillProNo', displayName: 'PRO #', width: 120, cellTemplate: proCellTemplate },
                { field: 'SalesOrder', displayName: 'BOL #', width: 120, cellTemplate: soCellTemplate },
                { field: 'VendorBillId', displayName: 'Vendor Bill #', width: 120 },
                { field: 'VBCarrier', displayName: 'VB Carrier', width: 120 },
                { field: 'BillStatus', displayName: 'Bill Status', width: 120 },
                { field: 'PickupDate', displayName: 'Pick Up Date', width: 120 },
                { field: 'CompanyName', displayName: 'Company Name', width: 120 },
                { field: 'OldWeight', displayName: 'Old Weight', width: 120 },
                { field: 'NewWeight', displayName: 'New Weight', width: 120 },
                { field: 'OldCost', displayName: 'Old Cost', width: 120, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate },
                { field: 'NewCost', displayName: 'New Cost', width: 120, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate },
                { field: 'SalesRep', displayName: 'Sales Rep', width: 120 },
                { field: 'Name', displayName: 'Agent #', width: 120 },
                { field: 'RequoteDateDisplay', displayName: 'Requote Date', width: 120 },
                { field: 'ShipmentNotes', displayName: 'Shipment Note', width: 120 },
                { field: 'DisputeNotes', displayName: 'Dispute Note', width: 120 },
                { field: 'RequoteNotes', displayName: 'Requote Note', width: 120 }
            ];
            return columnDefintion;
        };

        RebillSummaryReportViewModel.prototype.load = function (bindedData) {
            if (!bindedData)
                return;

            var self = this;
            if (refSystem.isObject(self.gridOptions)) {
                self.gridOptions.pagingOptions.pageSize(bindedData.pageSize);
                self.gridOptions.pagingOptions.currentPage(bindedData.currentPage);
                self.getReportData(self.reportAction);
            }
        };

        //#endregion
        //#region Life Cycle Events
        // Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button
        RebillSummaryReportViewModel.prototype.attached = function () {
            _app.trigger('viewAttached');
        };

        //The composition engine will execute it prior to calling the binder.
        RebillSummaryReportViewModel.prototype.activate = function () {
            return true;
        };

        RebillSummaryReportViewModel.prototype.deactivate = function () {
            var self = this;
            var data = {
                //carrierName
                pageSize: self.gridOptions.pagingOptions.pageSize(),
                currentPage: self.gridOptions.pagingOptions.currentPage()
            };
            _app.trigger("registerMyData", data);

            self.cleanup();
        };

        //To load the registered data if any existed.
        RebillSummaryReportViewModel.prototype.beforeBind = function () {
            var self = this;

            _app.trigger("loadMyData", function (data) {
                if (data) {
                    self.load(data);
                } else {
                }
            });
        };

        RebillSummaryReportViewModel.prototype.cleanup = function () {
            var self = this;

            self.reportContainer.cleanup("RebillSummaryReportGrid");

            for (var prop in self) {
                if (prop !== "cleanup")
                    delete self[prop];
            }
            delete self;
        };
        return RebillSummaryReportViewModel;
    })();

    return RebillSummaryReportViewModel;
});
