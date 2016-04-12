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
define(["require", "exports", 'plugins/router', 'durandal/app', '../templates/reportViewerControlV2', 'services/client/VendorBillClient', 'services/client/SalesOrderClient', 'services/models/common/Enums'], function(require, exports, ___router__, ___app__, ___reportViewer__, __refVendorBillClient__, __refSalesOrderClient__, __refEnums__) {
    
    var _router = ___router__;
    var _app = ___app__;
    
    var _reportViewer = ___reportViewer__;
    var refVendorBillClient = __refVendorBillClient__;
    
    var refSalesOrderClient = __refSalesOrderClient__;
    var refEnums = __refEnums__;

    //#endregion
    /*
    ** <summary>
    ** Sales Order History Details .
    ** </summary>
    ** <createDetails>
    ** <id>US8214</id> <by>Satish</by> <date>27th May, 2014</date>
    ** </createDetails>}
    ** <changeHistory>}
    ** <id></id> <by></by> <date></date>
    ** </changeHistory>
    */
    var SalesOrderHistoryDetails = (function () {
        //#endregion
        //#region Constructor
        function SalesOrderHistoryDetails() {
            var _this = this;
            //#region Members
            this.historyDetailsDatesList = ko.observableArray([]);
            this.historyOldValueContainer = null;
            this.historyNewValueContainer = null;
            this.newHeader = null;
            this.oldHeader = null;
            this.newGrid = null;
            this.oldGrid = null;
            this.newReportAction = null;
            this.oldReportAction = null;
            this.reportOldData = null;
            this.reportNewData = null;
            this.modeType = ko.observable();
            this.proNumber = ko.observable('');
            //Sales Order Client
            this.salesOrderClient = new refSalesOrderClient.SalesOrderClient();
            this.vendorBillClient = new refVendorBillClient.VendorBillClient();
            //oldComputedHistoryValues: KnockoutComputed<Array<IVendorBillHistoryItems>>;
            this.selectedHistoryDate = ko.observable('');
            this.selectedVersionId = ko.observable();
            this.salesOrderId = ko.observable(0);
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

            self.setNewReportCriteria = function (reportActionObj) {
                _this.newGridOptions = reportActionObj.gridOptions;
                if (_this.newReportAction != null) {
                    if ((_this.modeType() != reportActionObj.filter1selectedItemId) || (_this.newReportAction.view != reportActionObj.view) || (reportActionObj.dateFrom != _this.newReportAction.dateFrom) || (reportActionObj.dateTo != _this.newReportAction.dateTo)) {
                        _this.newGridOptions.pagingOptions.currentPage(1);
                    }
                }

                // Re-set the newGrid Columns since the prev. selection of serviceType is diff. to the Current selection
                // we don't want any data on page load so we commented getReportdata  function.
                // self.getReportData();
                _this.newReportAction = reportActionObj;

                if (reportActionObj.dateFrom !== null && reportActionObj.dateTo !== null) {
                    // self.getReportData();
                } else {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectDateTimeFrame, "info", null, toastrOptions);
                }
            };

            self.changeRecord = function (data) {
                self.selectedHistoryDate(data.historyDateSelected());

                // change selected date color
                self.historyDetailsDatesList().forEach(function (item) {
                    item.isSelectedDate(false);
                });
                data.isSelectedDate(true);

                if (data.versionIdSelected()) {
                    self.selectedVersionId(data.versionIdSelected());
                }
                self.historyOldValueContainer.listProgress(true);
                self.historyNewValueContainer.listProgress(true);

                if (data.versionIdSelected() && data.isSourceIdElastic()) {
                    var successCallBack = function (dataResult) {
                        // To load payment Details
                        self.initializeHistoryDetails(dataResult);
                    }, faliureCallBack = function () {
                    };

                    ////self.selectedVersionId(data.versionIdSelected);
                    self.salesOrderClient.GetShipmentHistoryDetailsByVersionId(self.salesOrderId(), self.selectedVersionId(), "items", successCallBack, faliureCallBack);
                } else {
                    self.applyFilter();
                }
                ////self.applyFilter();
            };

            self.setOldReportCriteria = function (reportActionObj) {
                _this.oldGridOptions = reportActionObj.gridOptions;
                if (_this.oldReportAction != null) {
                    if ((_this.modeType() != reportActionObj.filter1selectedItemId) || (_this.oldReportAction.view != reportActionObj.view) || (reportActionObj.dateFrom != _this.oldReportAction.dateFrom) || (reportActionObj.dateTo != _this.oldReportAction.dateTo)) {
                        _this.oldGridOptions.pagingOptions.currentPage(1);
                    }
                }

                // Re-set the oldGrid Columns since the prev. selection of serviceType is diff. to the Current selection
                // we don't want any data on page load so we commented getReportdata  function.
                // self.getReportData();
                _this.oldReportAction = reportActionObj;

                if (reportActionObj.dateFrom !== null && reportActionObj.dateTo !== null) {
                    // self.getReportData();
                } else {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };
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
        SalesOrderHistoryDetails.prototype.initializeHistoryDetails = function (data) {
            var self = this;
            if (data) {
                self.originalData = data;
                self.salesOrderId(data.SalesOrderId);

                if (data.ItemHistoryDates !== null && data.ItemHistoryDates.length > 0) {
                    self.selectedHistoryDate(data.ItemHistoryDates[0].CreatedDateDisplay);
                    if (data.ItemHistoryDates[0].StringifiedVersionId) {
                        self.selectedVersionId(data.ItemHistoryDates[0].StringifiedVersionId);
                    }
                }

                if (data.ItemHistoryDates) {
                    //self.reportItemHistoryDates.removeAll();
                    self.historyDetailsDatesList.removeAll();
                    data.ItemHistoryDates.forEach(function (item) {
                        //self.reportItemHistoryDates.push(item);
                        self.historyDetailsDatesList.push(new HistoryDeatilsDatesVodel(item, data.IsSourceIsElastic, self.selectedHistoryDate()));
                    });
                }

                // Select the first item
                //if (data.ItemHistoryDates !== null && data.ItemHistoryDates.length > 0) {
                //	self.selectedHistoryDate(data.ItemHistoryDates[0]);
                //}
                self.applyFilter();

                $('.noLeftBorder').parent().css('border-left', '0');
                $('.noRightBorder').parent().css('border-right', '0');
            } else {
                self.historyOldValueContainer.listProgress(false);
                self.historyNewValueContainer.listProgress(false);
            }
        };

        /*
        // Apply the filter as per the selected history date
        */
        SalesOrderHistoryDetails.prototype.applyFilter = function () {
            var self = this;
            if (self.originalData.IsSourceIsElastic) {
                //self.historyOldValueContainer.OptionalHeaderRowLocation('TOP');
                self.setPagingData(ko.observableArray(self.originalData.OldNewHistoryItems), self.oldGridOptions, self.oldReportAction);
                self.historyOldValueContainer.listProgress(false);

                //self.historyNewValueContainer.OptionalHeaderRowLocation('TOP');
                self.setPagingData(ko.observableArray(self.originalData.NewHistoryItems), self.newGridOptions, self.newReportAction);
                self.historyNewValueContainer.listProgress(false);
            } else {
                if (self.originalData && self.selectedHistoryDate) {
                    self.oldHistoryValues = ko.utils.arrayFilter(self.originalData.OldNewHistoryItems, function (item) {
                        return item.ChangeDate === self.selectedHistoryDate();
                    });
                } else {
                    self.oldHistoryValues = ko.observableArray()();
                }

                if (self.originalData && self.selectedHistoryDate) {
                    self.newHistoryValues = ko.utils.arrayFilter(self.originalData.NewHistoryItems, function (item) {
                        return item.ChangeDate === self.selectedHistoryDate();
                    });
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
        };

        //close popup
        SalesOrderHistoryDetails.prototype.closePopup = function (dialogResult) {
            dialogResult.__dialog__.close(this, dialogResult);
            return true;
        };

        //#endregion
        //#region Private Methods
        SalesOrderHistoryDetails.prototype.setPagingData = function (data, grid, gridOption) {
            Utils.kgSetClientsidePagination(data, gridOption, grid, undefined);
        };

        SalesOrderHistoryDetails.prototype.setGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = true;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("SalesOrderHistoryDetailsGrid");
            grOption.columnDefinition = self.setGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
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
        };

        SalesOrderHistoryDetails.prototype.setGridColumnDefinitions = function () {
            // ReSharper disable once AssignedValueIsNeverUsed, this is for return purpose
            //#region Templates
            var changeDescriptionTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeDescription\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>';

            var changeCostTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeCost\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2)"></div>';

            var changePLCCostTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangePLCCost\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2)"></div>';

            var changeRevenueTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeRevenue\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2)"></div>';

            var changeDisputeTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeDispute\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2)"></div>';

            var changeDisputeLostTemplate = '<div data-bind="style: { color: $parent.entity[\'IsChangeDisputeLost\'] ? \'#e80c4d\' : \'black\' }, attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: \'$\' + $data.getProperty($parent).toFixed(2)"></div>';

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
            var colDefinition = [];

            colDefinition = [
                { field: 'Description', displayName: 'Description', width: 210, cellTemplate: changeDescriptionTemplate },
                { field: 'CostField', displayName: 'Cost', width: 85, cellTemplate: changeCostTemplate },
                { field: 'PLCCostField', displayName: 'BS Cost', width: 200, cellTemplate: changePLCCostTemplate },
                { field: 'RevenueField', displayName: 'Revenue', width: 100, cellTemplate: changeRevenueTemplate },
                { field: 'Class', displayName: 'Class', width: 80, cellTemplate: changeClassTemplate },
                { field: 'Weight', displayName: 'Weight', width: 90, cellTemplate: changeWeightTemplate },
                { field: 'Length', displayName: 'Length', width: 90, cellTemplate: changeLengthTemplate },
                { field: 'Height', displayName: 'Height', width: 80, cellTemplate: changeHeightTemplate },
                { field: 'Width', displayName: 'Width', width: 80, cellTemplate: changeWidthTemplate },
                { field: 'Pieces', displayName: 'Pieces', width: 90, cellTemplate: changePieceTemplate },
                { field: 'Pallet', displayName: 'Pallet', width: 90, cellTemplate: changePalletTemplate },
                { field: 'NMFCNumber', displayName: 'NMFC', width: 90, cellTemplate: changeNmfcTemplate },
                { field: 'ChangedBy', displayName: 'Changed By', width: 150, cellTemplate: changeChangeByTemplate }
            ];

            return colDefinition;
        };

        //#region Load Data
        SalesOrderHistoryDetails.prototype.load = function (bindedData) {
            var _this = this;
            if (!bindedData)
                return;

            var self = this;

            //** if there is no data is registered then make a server call. */
            var salesOrderId = bindedData.salesOrderId;

            //self.proNumber(bindedData.proNumber);
            var successCallBack = function (data) {
                // To load payment Details
                _this.initializeHistoryDetails(data);
            }, faliureCallBack = function () {
            };

            self.historyOldValueContainer.listProgress(true);
            self.historyNewValueContainer.listProgress(true);
            self.salesOrderClient.GetShipmentHistoryDetailsByShipmentId(salesOrderId, successCallBack, faliureCallBack);
        };

        //#endregion
        //**When the value of the activator is switched to a new value, before the switch occurs, we register the view data. */
        SalesOrderHistoryDetails.prototype.beforeBind = function () {
            var self = this;
            _app.trigger("loadMyData", function (data) {
                if (data) {
                    self.load(data);
                } else {
                    _app.trigger("closeActiveTab");
                    _app.trigger("NavigateTo", 'Home');
                }
            });
        };

        SalesOrderHistoryDetails.prototype.compositionComplete = function (view, parent) {
        };

        SalesOrderHistoryDetails.prototype.activate = function () {
            return true;
        };

        //** Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button. */
        SalesOrderHistoryDetails.prototype.attached = function () {
            _app.trigger('viewAttached');
        };
        return SalesOrderHistoryDetails;
    })();
    exports.SalesOrderHistoryDetails = SalesOrderHistoryDetails;

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
    var HistoryDeatilsDatesVodel = (function () {
        function HistoryDeatilsDatesVodel(item, isSourceIsElastic, selectedHistoryDate) {
            this.historyDateSelected = ko.observable('');
            this.versionIdSelected = ko.observable('');
            this.isSourceIdElastic = ko.observable(false);
            this.isSelectedDate = ko.observable(false);
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
        return HistoryDeatilsDatesVodel;
    })();
    exports.HistoryDeatilsDatesVodel = HistoryDeatilsDatesVodel;
});
