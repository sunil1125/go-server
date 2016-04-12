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
    ** <id>US8214</id> <by>BHANU PRATAP</by> <date>08-21-2014</date>}
    ** </createDetails>}
    ** <changeHistory>}
    ** <id>DE20737</id> <by>Vasanthakumar</by> <date>26-11-2015</date><description>Enabled the grid setting saving option</description>
    ** </changeHistory>
    */
    var ReportsVendorBillExceptionReportViewModel = (function () {
        //#endregion
        //#endregion
        //#region Constructor
        function ReportsVendorBillExceptionReportViewModel() {
            //#region Members
            this.reportClient = null;
            this.listProgress = ko.observable(false);
            //#region public report viewer members
            this.reportContainer = null;
            this.headerOptions = null;
            this.grid = null;
            this.reportAction = null;
            this.reportData = null;
            this.modeType = ko.observable();
            this.boardReportRequest = null;
            this.isLoaded = ko.observable(false);
            this.vendorBillClient = new refVendorBillClient.VendorBillClient();
            var self = this;
            self.headerOptions = new _reportViewer.ReportHeaderOption();
            self.headerOptions.reportHeader = "Vendor Bill Exception Report";
            self.headerOptions.reportName = "Vendor Bill Exception Report";
            self.headerOptions.gridTitleHeader = " ";
            self.reportAction = new _reportViewer.ReportAction();
            self.grid = self.setGridOptions(self);
            self.reportClient = new refReportClient.ReportClient();

            //## Region Export Options.
            var exportOpt = ko.observableArray([
                { exportType: _reportViewer.ExportOptions.CSV, name: ko.observable("Csv"), enabled: ko.observable(true) },
                { exportType: _reportViewer.ExportOptions.EXCEL, name: ko.observable("Excel"), enabled: ko.observable(true) }
            ]);

            self.headerOptions.reportExportOptions = new _reportViewer.ReportExportControl(exportOpt);
            self.headerOptions.reportExportOptions.getUrl = function (exp) {
                var searchClient = new refVendorBillClient.SearchModel();
                searchClient.PageSize = exp.exportType === 1 ? 2000 : self.gridOptions.pagingOptions.totalServerItems();
                searchClient.PageNumber = 1;
                searchClient.ExportType = exp.exportType;
                var filterModel = { ExportURL: "Accounting/ExportVendorBillExceptionReportInExcel", FilterModel: searchClient };
                return filterModel;
            };

            //## Region Export Options End.
            self.setReportCriteria = function (reportActionObj) {
                self.gridOptions = reportActionObj.gridOptions;
                if (self.reportAction != null) {
                    if ((self.modeType() != reportActionObj.filter1selectedItemId) || (self.reportAction.view != reportActionObj.view) || (reportActionObj.dateFrom != self.reportAction.dateFrom) || (reportActionObj.dateTo != self.reportAction.dateTo)) {
                        //self.gridOptions.pagingOptions.currentPage(1);
                    }
                }

                // Re-set the Grid Columns since the prev. selection of serviceType is diff. to the Current selection
                // we don't want any data on page load so we commented getReportdata  function.
                // self.getReportData();
                self.reportAction = reportActionObj;

                if (self.isLoaded()) {
                    self.getReportData(reportActionObj);
                }
            };

            self.getReportData = function (reportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageno = 0;
                pageno = Number(self.gridOptions.pagingOptions.currentPage());
                if (pageno > 0) {
                    // List View
                    self.reportContainer.listProgress(true);
                    self.boardReportRequest = new refBoardReportRequestModel.Models.BoardReportRequest();
                    self.boardReportRequest.PageNumber = self.gridOptions.pagingOptions.currentPage();
                    self.boardReportRequest.PageSize = self.gridOptions.pagingOptions.pageSize();
                    self.reportClient.getVendorBillExceptionReport(self.boardReportRequest, function (data) {
                        self.setPagingData(data.range, data.TotalCount, self.gridOptions.pagingOptions.pageSize());
                        self.reportContainer.listProgress(false);

                        deferred.resolve(data, reportActionObj.view);
                    }, function () {
                        self.reportContainer.listProgress(false);
                        ////		var toastrOptions = {
                        ////			toastrPositionClass: "toast-top-middle",
                        ////			delayInseconds: 10,
                        ////			fadeOut: 10,
                        ////			typeOfAlert: "",
                        ////			title: ""
                        ////		}
                        ////Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, ApplicationMessages.Messages.ErrorOccurredWhileFetchingVendorBillException, "error", null, toastrOptions);
                    });
                }

                return promise;
            };

            self.reportContainer = new _reportViewer.ReportViewerControlV2(self.headerOptions, self.grid);
            self.reportContainer.onFilterChange = self.setReportCriteria;

            //self.reportContainer.showOptionalHeaderRow(false);
            //self.reportContainer.OptionalHeaderRowLocation('TOP');
            self.reportContainer.ForceChange();

            //## redirects to Vendor bill order page
            self.reportContainer.onGridColumnClick = function (obj) {
                var vendorBillId = obj.VendorBillId;
                _app.trigger("openVendorBill", vendorBillId, obj.ProNumber, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            return self;
        }
        //#endregion
        ReportsVendorBillExceptionReportViewModel.prototype.setPagingData = function (data, page, pageSize) {
            var self = this;
            self.gridOptions.data(data);
            self.gridOptions.data.valueHasMutated();
            self.gridOptions.pagingOptions.totalServerItems(page);
        };

        ReportsVendorBillExceptionReportViewModel.prototype.setGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = true;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("VendorBillExceptionReportGrid");
            grOption.data = self.reportData;
            grOption.columnDefinition = self.setGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
                columnName: "ProNumber",
                order: "DESC"
            };

            //grOption.enableSaveGridSettings = true;
            grOption.pageSizes = [10, 25, 50, 100];
            grOption.pageSize = 10;
            grOption.totalServerItems = 0;
            grOption.currentPage = 1;
            grOption.jqueryUIDraggable = true;
            grOption.canSelectRows = true;
            grOption.selectWithCheckboxOnly = false;
            grOption.displaySelectionCheckbox = false;
            grOption.multiSelect = false;
            grOption.enablePaging = false;
            grOption.viewPortOptions = false;

            //grOption.UIGridID = ko.observable("Shipment Board"); // TODO : Replace the value with GUID
            // ###START: DE20737
            grOption.enableSaveGridSettings = true;

            // ###END: DE20737
            grOption.useClientSideFilterAndSort = true;
            grOption.showColumnMenu = true;
            return grOption;
        };

        ReportsVendorBillExceptionReportViewModel.prototype.setGridColumnDefinitions = function () {
            var colDefinition = [];
            var self = this;
            var proCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'ProNumber\'], click: function() { $userViewModel.onGridColumnClick($parent.entity) }" />';

            colDefinition = [
                { field: 'ProNumber', displayName: 'PRO #', width: 120, cellTemplate: proCellTemplate },
                { field: 'Exception', displayName: 'Exception', width: 182 },
                { field: 'VendorBillId', displayName: 'Vendor Bill Id', width: 120 },
                { field: 'BolNumber', displayName: 'BOL #', width: 90 },
                { field: 'Carrier', displayName: 'Carrier', width: 120 },
                { field: 'CarrierCode', displayName: 'Carrier Code', width: 120 },
                { field: 'MassId', displayName: 'Mass Id', width: 120 },
                { field: 'VBAmount', displayName: 'Bill Amount', width: 120, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate },
                { field: 'DisputedAmount', displayName: 'Disputed Amount', width: 140, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate },
                { field: 'VBBillStatus', displayName: 'Bill Status', width: 123 }
            ];
            return colDefinition;
        };

        ReportsVendorBillExceptionReportViewModel.prototype.load = function (bindedData) {
            if (!bindedData)
                return;

            var self = this;
            if (refSystem.isObject(self.gridOptions)) {
                self.gridOptions.pagingOptions.pageSize(bindedData.pageSize);
                self.gridOptions.pagingOptions.currentPage(bindedData.currentPage);
                self.getReportData(self.reportAction);
            }

            if (typeof bindedData.isLoaded !== "undefined") {
                self.isLoaded(bindedData.isLoaded);
            }
        };

        //#endregion
        //#region Life Cycle event
        // Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button
        ReportsVendorBillExceptionReportViewModel.prototype.attached = function () {
            _app.trigger('viewAttached');
        };

        //The composition engine will execute it prior to calling the binder.
        ReportsVendorBillExceptionReportViewModel.prototype.activate = function () {
            return true;
        };

        ReportsVendorBillExceptionReportViewModel.prototype.deactivate = function () {
            var self = this;
            var data = {
                //carrierName
                pageSize: self.gridOptions.pagingOptions.pageSize(),
                currentPage: self.gridOptions.pagingOptions.currentPage(),
                isLoaded: true
            };
            _app.trigger("registerMyData", data);

            self.cleanup();
        };

        //To load the registered data if any existed.
        ReportsVendorBillExceptionReportViewModel.prototype.beforeBind = function () {
            var self = this;

            _app.trigger("loadMyData", function (data) {
                if (data) {
                    self.load(data);
                } else {
                    var data = {
                        isLoaded: true,
                        pageSize: 10,
                        currentPage: 1
                    };

                    self.load(data);
                }
            });
        };

        ReportsVendorBillExceptionReportViewModel.prototype.cleanup = function () {
            var self = this;

            self.reportContainer.cleanup("VendorBillExceptionReportGrid");

            for (var prop in self) {
                if (prop !== "cleanup")
                    delete self[prop];
            }
            delete self;
        };
        return ReportsVendorBillExceptionReportViewModel;
    })();

    return ReportsVendorBillExceptionReportViewModel;
});
