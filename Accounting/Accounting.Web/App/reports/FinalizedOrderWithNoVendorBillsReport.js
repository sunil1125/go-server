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
    ** Report Finalized Order With No Vendor Bills View Model.
    ** </summary>
    ** <createDetails>
    ** <id>US13840</id> <by>SATISH</by> <date>11-25-2014</date>}
    ** </createDetails>}
    ** <changeHistory>}
    ** <id>DE20737</id> <by>Vasanthakumar</by> <date>26-11-2015</date><description>Enabled the grid setting saving option</description>
    ** <id>US20647</id> <by>Chandan Singh Bajetha</by> <date>17-02-2016</date><description>Acct: Implement Search on all Reports</description>
    ** </changeHistory>
    */
    var ReportsFinalizedOrderWithNoVendorBillsReportViewModel = (function () {
        //#endregion
        //#region CONSTRUCTOR
        function ReportsFinalizedOrderWithNoVendorBillsReportViewModel() {
            //#region MEMBERS
            this.FinalizedOrderWithNoVendorBillsReportContainer = null;
            this.header = null;
            this.grid = null;
            this.reportAction = null;
            this.reportData = null;
            this.modeType = ko.observable();
            this.commonUtils = new Utils.Common();
            this.boardReportRequest = null;
            this.reportClient = null;
            var self = this;
            self.searchText = ko.observable("");
            self.header = new _reportViewer.ReportHeaderOption();
            self.header.reportHeader = "Finalized Orders With No Vendor Bills";
            self.header.reportName = "Finalized Order With No Vendor Bills";
            self.header.preparedOn = " ";
            self.header.createdBy = " ";
            self.header.gridTitleHeader = " ";

            self.reportClient = new refReportClient.ReportClient();

            self.reportAction = new _reportViewer.ReportAction();
            self.grid = self.setGridOptions(self);

            //##region Export Options.
            var exportOpt = ko.observableArray([
                { exportType: _reportViewer.ExportOptions.CSV, name: ko.observable("Csv"), enabled: ko.observable(true) },
                { exportType: _reportViewer.ExportOptions.EXCEL, name: ko.observable("Excel"), enabled: ko.observable(true) }
            ]);

            self.header.reportExportOptions = new _reportViewer.ReportExportControl(exportOpt);
            self.header.reportExportOptions.getUrl = function (exp) {
                var searchClient = new refVendorBillClient.SearchModel();
                searchClient.PageSize = exp.exportType === 1 ? 2000 : self.gridOptions.pagingOptions.totalServerItems();
                searchClient.PageNumber = 1;
                searchClient.ExportType = exp.exportType;
                var filterModel = { ExportURL: "Accounting/ExportFinalizedOrderWithNoVendorBillsReportInExcel", FilterModel: searchClient };
                return filterModel;
            };

            //##endregion Export Options End.
            self.reportCriteria = function (reportActionObj) {
                self.gridOptions = reportActionObj.gridOptions;
                self.reportAction = reportActionObj;
                self.getReportData(reportActionObj);
            };

            self.getReportData = function (reportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageno = 0;

                // List View
                pageno = Number(self.gridOptions.pagingOptions.currentPage());
                if (pageno > 0) {
                    self.FinalizedOrderWithNoVendorBillsReportContainer.listProgress(true);
                    self.boardReportRequest = new refBoardReportRequestModel.Models.BoardReportRequest();
                    self.boardReportRequest.PageNumber = self.gridOptions.pagingOptions.currentPage();
                    self.boardReportRequest.PageSize = self.gridOptions.pagingOptions.pageSize();

                    // ###START: US20647
                    self.boardReportRequest.GridSearchText = self.searchText().trim();

                    // ###END: US20647
                    self.reportClient.getFinalizedOrderWithNoVendorBills(self.boardReportRequest, function (data) {
                        self.setPagingData(data.range, data.TotalCount, self.gridOptions.pagingOptions.pageSize());
                        self.FinalizedOrderWithNoVendorBillsReportContainer.listProgress(false);

                        deferred.resolve(data, reportActionObj.view);
                        self.FinalizedOrderWithNoVendorBillsReportContainer.invokeHighlight(self.searchText());
                    }, function () {
                        self.FinalizedOrderWithNoVendorBillsReportContainer.listProgress(false);
                        ////var toastrOptions = {
                        ////	toastrPositionClass: "toast-top-middle",
                        ////	delayInseconds: 10,
                        ////	fadeOut: 10,
                        ////	typeOfAlert: "",
                        ////	title: ""
                        ////}
                        ////Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, ApplicationMessages.Messages.ErrorOccurredWhileFetchingFinalizedOrders, "error", null, toastrOptions);
                    });
                }

                return promise;
            };

            // Assign the Sales Order grid settings
            self.FinalizedOrderWithNoVendorBillsReportContainer = new _reportViewer.ReportViewerControlV2(self.header, self.grid);
            self.FinalizedOrderWithNoVendorBillsReportContainer.onFilterChange = self.reportCriteria;
            self.FinalizedOrderWithNoVendorBillsReportContainer.ForceChange();

            // redirects to sales order details page
            self.FinalizedOrderWithNoVendorBillsReportContainer.onBolNumberClick = function (shipmentObj) {
                var salesOrderId = shipmentObj.Id;
                _app.trigger("openSalesOrder", salesOrderId, shipmentObj.BOLNumber, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            //for search filter
            self.FinalizedOrderWithNoVendorBillsReportContainer.onSearchTextChange = function (reportViewer, newSearchValue) {
                if (newSearchValue.length >= 3 || newSearchValue.length == 0) {
                    // ###START: US20647
                    var data = new Array();
                    var searchString = newSearchValue;

                    //to blank the grid data
                    self.setPagingData(data, 0, self.gridOptions.pagingOptions.pageSize());
                    self.searchText(searchString.trim());

                    self.getReportData(self.reportAction);
                    self.gridOptions.pagingOptions.currentPage(1);
                    // ###END: US20647
                }
            };
        }
        //#endregion
        //#region INTERNAL METHODS
        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.setPagingData = function (data, page, pageSize) {
            var self = this;
            self.gridOptions.data(data);
            self.gridOptions.data.valueHasMutated();
            self.gridOptions.pagingOptions.totalServerItems(page);
        };

        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.setGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.UIGridID = ko.observable("FinalizedOrdersWithNoVendorBillsGridReport");
            grOption.data = self.reportData;
            grOption.columnDefinition = self.setGridColumnDefinitions();
            grOption.enableSelectiveDisplay = true;
            grOption.useExternalSorting = false;
            grOption.showGridSearchFilter = true;
            grOption.sortedColumn = {
                columnName: "CreatedDate",
                order: "DESC"
            };
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

            // ###START: DE20737
            grOption.enableSaveGridSettings = true;

            // ###END: DE20737
            grOption.useClientSideFilterAndSort = true;
            grOption.showColumnMenu = true;
            return grOption;
        };

        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.setGridColumnDefinitions = function () {
            var colDefinition = [];
            var self = this;

            // For BOLnumber
            var bolCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'BOLNumber\'], click: function() { $userViewModel.onBolNumberClick($parent.entity) }" />';

            colDefinition = [
                { field: 'BOLNumber', displayName: 'BOL#', width: 80, cellTemplate: bolCellTemplate, isRemovable: false },
                { field: 'ProNumber', displayName: 'PRO#', width: 80 },
                { field: 'ShipmentDateDisplay', displayName: 'Shipment Date', width: 120 },
                { field: 'Cost', displayName: 'Total Cost', width: 100, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate },
                { field: 'Customer', displayName: 'Customer', width: 120 },
                { field: 'Shipper', displayName: 'Shipper', width: 120 },
                { field: 'TotalPieces', displayName: 'Total Pieces', width: 130 },
                { field: 'TotalWeight', displayName: 'Total Weight', width: 130 },
                { field: 'Carrier', displayName: 'Carrier', width: 95 },
                { field: 'OriginZip', displayName: 'Origin Zip ', width: 100 },
                { field: 'OriginCity', displayName: 'Origin City', width: 100 },
                { field: 'OriginState', displayName: 'Origin State', width: 100 },
                { field: 'DestinationZip', displayName: 'Destination Zip', width: 110 },
                { field: 'DestinationCity', displayName: 'Destination City', width: 110 },
                { field: 'DestinationState', displayName: 'Destination State', width: 110 },
                { field: 'SalesRepName', displayName: 'Sales Rep Name', width: 120 },
                { field: 'PartnerCompanyName', displayName: 'Agent#', width: 120 },
                { field: 'Mode', displayName: 'Mode', width: 120 },
                { field: 'CustomerTermType', displayName: 'Customer TermType', width: 130 }
            ];
            return colDefinition;
        };

        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.load = function (bindedData) {
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
        //#region LIFE CYCLE EVENT
        // Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button
        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.attached = function () {
            _app.trigger('viewAttached');
        };

        //The composition engine will execute it prior to calling the binder.
        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.activate = function () {
            return true;
        };

        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.deactivate = function () {
            var self = this;
            var data = {
                //carrierName
                pageSize: self.gridOptions.pagingOptions.pageSize(),
                currentPage: self.gridOptions.pagingOptions.currentPage()
            };
            _app.trigger("registerMyData", data);
            document.onkeypress = undefined;

            self.cleanup();
        };

        //To load the registered data if any existed.
        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.beforeBind = function () {
            var self = this;

            _app.trigger("loadMyData", function (data) {
                if (data) {
                    self.load(data);
                } else {
                    //_app.trigger("closeActiveTab");
                    //_app.trigger("NavigateTo", 'Home');
                }
            });
        };

        ReportsFinalizedOrderWithNoVendorBillsReportViewModel.prototype.cleanup = function () {
            var self = this;

            self.FinalizedOrderWithNoVendorBillsReportContainer.cleanup("FinalizedOrdersWithNoVendorBillsGridReport");

            for (var prop in self) {
                if (prop !== "cleanup")
                    delete self[prop];
            }
            delete self;
        };
        return ReportsFinalizedOrderWithNoVendorBillsReportViewModel;
    })();

    return ReportsFinalizedOrderWithNoVendorBillsReportViewModel;
});
