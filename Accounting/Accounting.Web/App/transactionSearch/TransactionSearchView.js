//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/VendorBillSearchModel.d.ts" />
/// <reference path="../../Scripts/Constants/ApplicationMessages.ts" />
/// <reference path="../localStorage/LocalStorage.ts" />
//#endregion
define(["require", "exports", 'plugins/router', 'durandal/app', 'durandal/system', 'services/models/common/Enums', 'transactionSearch/TransactionSearchCriteria', '../templates/reportViewerControlV2', 'services/client/CommonClient', 'services/models/transactionSearch/TransactionSearchRequest', 'services/models/common/searchVendorName', 'services/models/common/searchUserName', 'services/models/common/searchCustomerName', 'services/models/purchaseOrder/PurchaseOrderSearchFilter'], function(require, exports, ___router__, ___app__, __refSystem__, __refEnums__, ___refTransactionSearchCriteria__, ___reportViewer__, __refCommonClient__, __refSearchModel__, __refVendorNameSearch__, __refUserNameSearch__, __refCustomerNameSearch__, ___refPurchaseOrderSearchFilterModel__) {
    
    var _router = ___router__;
    var _app = ___app__;
    var refSystem = __refSystem__;
    var refEnums = __refEnums__;
    var _refTransactionSearchCriteria = ___refTransactionSearchCriteria__;
    var _reportViewer = ___reportViewer__;
    var refCommonClient = __refCommonClient__;
    var refSearchModel = __refSearchModel__;
    var refVendorNameSearch = __refVendorNameSearch__;
    var refUserNameSearch = __refUserNameSearch__;
    var refCustomerNameSearch = __refCustomerNameSearch__;
    var _refPurchaseOrderSearchFilterModel = ___refPurchaseOrderSearchFilterModel__;

    //#endregion
    /***********************************************
    TRANSACTION SEARCH VIEW VIEW MODEL
    ************************************************
    ** <createDetails>
    ** <id>US12574</id><by>Satish</by> <date>11th Sep, 2014</date>
    ** </createDetails>}
    ** <changeHistory>}
    ** <id></id><by></by> <date></date>
    ** </changeHistory>
    
    ***********************************************/
    var TransactionSearchViewModel = (function () {
        //#endregion
        //#region Constructor
        function TransactionSearchViewModel() {
            this.searchType = ko.observable(0);
            this.vbreportClick = ko.observable(false);
            this.soreportClick = ko.observable(false);
            this.tqreportClick = ko.observable(false);
            this.inreportClick = ko.observable(false);
            this.SalesOrderContainer = null;
            this.VendorBillOrPurchaseOrderContainer = null;
            this.InvoiceContainer = null;
            this.TruckloadContainer = null;
            this.soHeader = null;
            this.vbHeader = null;
            this.invHeader = null;
            this.tqHeader = null;
            this.soGrid = null;
            this.vbGrid = null;
            this.invGrid = null;
            this.tqGrid = null;
            this.soReportAction = null;
            this.vbReportAction = null;
            this.invReportAction = null;
            this.tqReportAction = null;
            this.soData = null;
            this.vbData = null;
            this.invData = null;
            this.tqData = null;
            this.sortCol = ko.observable('ProNumber');
            this.sorttype = ko.observable('asc');
            //Search Filter
            this.soSearchFilterItems = new Array();
            this.soSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
            this.vbSearchFilterItems = new Array();
            this.vbSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
            this.localStorageKey = ko.observable('');
            this.isSearchFilterItemsData = ko.observable(false);
            this.isSearchFilterItemsDataForVB = ko.observable(false);
            this.modeType = ko.observable();
            // Utility class object
            this.commonUtils = new Utils.Common();
            // client commond
            this.commonClient = new refCommonClient.Common();
            this.searchRequestParam = new refSearchModel.Model.TransactionSearchRequest();
            //
            this.pageRecord = ko.observableArray([]);
            var self = this;
            self.transactionSearchcriteriaViewModel = new _refTransactionSearchCriteria.TransactionSearchCriteriaViewModel(function (searchType) {
                self.searchType(searchType);
            });

            self.soHeader = new _reportViewer.ReportHeaderOption();
            self.soHeader.reportHeader = "";
            self.soHeader.reportName = "Transaction Search Result";
            self.soHeader.gridTitleHeader = " ";

            self.vbHeader = new _reportViewer.ReportHeaderOption();
            self.vbHeader.reportHeader = "";
            self.vbHeader.reportName = "Transaction Search Result";
            self.vbHeader.gridTitleHeader = " ";

            self.invHeader = new _reportViewer.ReportHeaderOption();
            self.invHeader.reportHeader = "";
            self.invHeader.reportName = "Transaction Search Result";
            self.invHeader.gridTitleHeader = " ";

            self.tqHeader = new _reportViewer.ReportHeaderOption();
            self.tqHeader.reportHeader = "";
            self.tqHeader.reportName = "Transaction Search Result";
            self.tqHeader.gridTitleHeader = " ";

            //set local storage key by url
            var url = $(location).attr('href');
            var urlArray = url.split('/');
            var localStorageId = urlArray.pop().toString().replace(/#/g, "");
            self.localStorageKey(localStorageId.toString().replace(/#/g, ""));
            if (localStorageId === "TransactionSearch") {
                self.localStorageKey(localStorageId + "26");
            } else {
                self.localStorageKey(localStorageId);
            }

            //initialize date filters
            self.soReportAction = new _reportViewer.ReportAction();
            self.vbReportAction = new _reportViewer.ReportAction();
            self.invReportAction = new _reportViewer.ReportAction();
            self.tqReportAction = new _reportViewer.ReportAction();

            self.soGrid = self.setSoGridOptions(self);
            self.vbGrid = self.setVbGridOptions(self);
            self.invGrid = self.setInvGridOptions(self);
            self.tqGrid = self.setTqGridOptions(self);

            //## Region Export Options.
            //For vendorBill
            var vbExportOpt = ko.observableArray([
                { exportType: _reportViewer.ExportOptions.FILTER, name: ko.observable(""), enabled: ko.observable(true) }
            ]);

            self.vbHeader.reportExportOptions = new _reportViewer.ReportExportControl(vbExportOpt);

            //For Sales Order
            var soExportOpt = ko.observableArray([
                { exportType: _reportViewer.ExportOptions.FILTER, name: ko.observable(""), enabled: ko.observable(true) }
            ]);
            self.soHeader.reportExportOptions = new _reportViewer.ReportExportControl(soExportOpt);

            //## Region Export Options End.
            self.setVbReportCriteria = function (vbReportActionObj) {
                if ((vbReportActionObj != undefined || vbReportActionObj != null) && (vbReportActionObj.gridOptions != undefined || vbReportActionObj.gridOptions != null) && (refSystem.isObject(vbReportActionObj.gridOptions.sortInfo())) && (vbReportActionObj.gridOptions.sortInfo().column != undefined || vbReportActionObj.gridOptions.sortInfo().column != null) && (vbReportActionObj.gridOptions.sortInfo().column.field != undefined || vbReportActionObj.gridOptions.sortInfo().column.field != null)) {
                    self.sortCol(vbReportActionObj.gridOptions.sortInfo().column.field);
                    if (self.sortCol() == 'BillDateDisplay') {
                        self.sortCol('BillDate');
                    } else if (self.sortCol() == 'BillStatusDisplay') {
                        self.sortCol('BillStatus');
                    }

                    self.sorttype(vbReportActionObj.gridOptions.sortInfo().direction);
                } else {
                    self.sortCol("PRONo");
                    self.sorttype("desc");
                }
                if (vbReportActionObj.filter1selectedItemId == undefined || vbReportActionObj.filter1selectedItemId == 0) {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 15,
                        fadeOut: 15,
                        typeOfAlert: "",
                        title: ""
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectModeFromTheList, "info", null, toastrOptions);
                    self.VendorBillOrPurchaseOrderContainer.listProgress(false);
                    self.VendorBillOrPurchaseOrderContainer.selectedFilter1Item(self.modeType());
                } else {
                    self.vbGridOptions = vbReportActionObj.gridOptions;
                    if (self.modeType() != vbReportActionObj.filter1selectedItemId) {
                        self.modeType(vbReportActionObj.filter1selectedItemId);
                        self.VendorBillOrPurchaseOrderContainer.columnDefinition(self.setVbGridColumnDefinitions());
                    }
                    self.vbReportAction = vbReportActionObj;

                    if (self.vbreportClick())
                        self.getVbReportData(vbReportActionObj);
                }
            };

            self.setSoReportCriteria = function (soReportActionObj) {
                if ((soReportActionObj != undefined || soReportActionObj != null) && (soReportActionObj.gridOptions != undefined || soReportActionObj.gridOptions != null) && (refSystem.isObject(soReportActionObj.gridOptions.sortInfo())) && (soReportActionObj.gridOptions.sortInfo().column != undefined || soReportActionObj.gridOptions.sortInfo().column != null) && (soReportActionObj.gridOptions.sortInfo().column.field != undefined || soReportActionObj.gridOptions.sortInfo().column.field != null)) {
                    self.sortCol(soReportActionObj.gridOptions.sortInfo().column.field);
                    if (self.sortCol() == 'BillDateDisplay') {
                        self.sortCol('BillDate');
                    } else if (self.sortCol() == 'PickupDateDisplay') {
                        self.sortCol('PickupDate');
                    } else if (self.sortCol() == 'ProcessStatusDisplay') {
                        self.sortCol('ProcessStatusDescription');
                    } else if (self.sortCol() == 'InvoiceStatusDisplay') {
                        self.sortCol('InvoiceStatusDescription');
                    } else if (self.sortCol() == 'CustomerType') {
                        self.sortCol('ProcessFlow');
                    } else if (self.sortCol() == 'CompanyNameDisplay') {
                        self.sortCol('AccountName');
                    }
                    self.sorttype(soReportActionObj.gridOptions.sortInfo().direction);
                } else {
                    self.sortCol("BOLNumber");
                    self.sorttype("desc");
                }
                if (soReportActionObj.filter1selectedItemId == undefined || soReportActionObj.filter1selectedItemId == 0) {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 15,
                        fadeOut: 15,
                        typeOfAlert: "",
                        title: ""
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectModeFromTheList, "info", null, toastrOptions);
                    self.SalesOrderContainer.listProgress(false);
                    self.SalesOrderContainer.selectedFilter1Item(self.modeType());
                } else {
                    self.soGridOptions = soReportActionObj.gridOptions;
                    if (self.modeType() != soReportActionObj.filter1selectedItemId) {
                        self.SalesOrderContainer.columnDefinition(self.setSoGridColumnDefinitions());
                    }
                    self.soReportAction = soReportActionObj;

                    if (self.soreportClick())
                        self.getSoReportData(soReportActionObj);
                }
            };

            self.setInvReportCriteria = function (invReportActionObj) {
                if (invReportActionObj.filter1selectedItemId == undefined || invReportActionObj.filter1selectedItemId == 0) {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 15,
                        fadeOut: 15,
                        typeOfAlert: "",
                        title: ""
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectModeFromTheList, "info", null, toastrOptions);
                    self.InvoiceContainer.listProgress(false);
                    self.InvoiceContainer.selectedFilter1Item(self.modeType());
                } else {
                    self.invGridOptions = invReportActionObj.gridOptions;
                    if (self.modeType() != invReportActionObj.filter1selectedItemId) {
                        self.InvoiceContainer.columnDefinition(self.setInvGridColumnDefinitions());
                    }
                    self.invReportAction = invReportActionObj;

                    if (self.inreportClick())
                        self.getInvReportData(invReportActionObj);
                }
            };

            self.setTqReportCriteria = function (tqReportActionObj) {
                if (tqReportActionObj.filter1selectedItemId == undefined || tqReportActionObj.filter1selectedItemId == 0) {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 15,
                        fadeOut: 15,
                        typeOfAlert: "",
                        title: ""
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectModeFromTheList, "info", null, toastrOptions);
                    self.TruckloadContainer.listProgress(false);
                    self.TruckloadContainer.selectedFilter1Item(self.modeType());
                } else {
                    self.tqGridOptions = tqReportActionObj.gridOptions;
                    if (self.modeType() != tqReportActionObj.filter1selectedItemId) {
                        self.TruckloadContainer.columnDefinition(self.setTqGridColumnDefinitions());
                    }
                    self.tqReportAction = tqReportActionObj;

                    if (self.tqreportClick())
                        self.getTqReportData(tqReportActionObj);
                }
            };

            self.getSoReportData = function (soReportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageno = 0;

                // List View
                pageno = Number(self.soGridOptions.pagingOptions.currentPage());
                if (pageno > 0) {
                    self.SalesOrderContainer.listProgress(true);
                    if (self.SalesOrderContainer.reportColumnFilter.isFilterApply) {
                        var list = self.SalesOrderContainer.reportColumnFilter.reportColumnFilters();
                        self.soSearchFilterItems.removeAll();
                        if (list.length > 0) {
                            list.forEach(function (items) {
                                self.soSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
                                if (items.selectedserviceType() != undefined && items.selectedOperatorType() != undefined) {
                                    if (items.selectedserviceType().field === 'BillDateDisplay') {
                                        self.soSearchFilterItem.FieldName = "BillDate";
                                    } else if (items.selectedserviceType().field === 'PickupDateDisplay') {
                                        self.soSearchFilterItem.FieldName = "PickupDate";
                                    } else if (items.selectedserviceType().field === 'ProcessStatusDisplay') {
                                        self.soSearchFilterItem.FieldName = "ProcessStatusDescription";
                                    } else if (items.selectedserviceType().field === 'InvoiceStatusDisplay') {
                                        self.soSearchFilterItem.FieldName = "InvoiceStatusDescription";
                                    } else if (items.selectedserviceType().field === 'CompanyNameDisplay') {
                                        self.soSearchFilterItem.FieldName = "AccountName";
                                    } else {
                                        self.soSearchFilterItem.FieldName = items.selectedserviceType().field;
                                    }

                                    self.soSearchFilterItem.Operand = +items.selectedOperatorType().opratorId;
                                    self.soSearchFilterItem.SearchText = items.searchText();
                                    self.soSearchFilterItems.push(self.soSearchFilterItem);
                                }
                                if (self.soSearchFilterItems.length > 0 || items.selectedserviceType() != undefined) {
                                    self.isSearchFilterItemsData(true);
                                    //$('#SOGrid').removeClass('margin-top--29');
                                    //$('#SOGrid').addClass('margin-top--29');
                                } else {
                                    self.isSearchFilterItemsData(false);
                                    //$('#SOGrid').removeClass('margin-top--29');
                                }
                            });
                        }
                    }
                    if (self.sortCol() == 'PRONo') {
                        self.sortCol('PRONumber');
                    } else if (self.sortCol() == 'CustomerType') {
                        self.sortCol('ProcessFlow');
                    }
                    self.assignCriteriaValues();
                    var successCallBack = function (responce) {
                        var pageRecord = "";

                        self.setPagingData(responce.SalesOrderResponse, responce.NumberOfRows, self.soGridOptions.pagingOptions.pageSize(), self.searchType());
                        self.SalesOrderContainer.listProgress(false);

                        deferred.resolve(responce, soReportActionObj.view);
                        //var saveData = { ColumnDefination: self.soGridOptions.columnDefs(), PageNumber: self.soGridOptions.pagingOptions.currentPage(), PageSize: self.soGridOptions.pagingOptions.pageSize(), SavedData: responce, }
                        //LocalStorageController.Set(self.localStorageKey(), saveData);
                    };
                    var faliureCallBack = function (message) {
                        self.SalesOrderContainer.listProgress(false);
                    };

                    ////server call on change page size and change page number
                    //if (LocalStorageController.Get(self.localStorageKey())) {
                    //	var pageRecord = LocalStorageController.Get(self.localStorageKey());
                    //	if (pageRecord.PageNumber !== self.soGridOptions.pagingOptions.currentPage() || pageRecord.PageSize !== self.soGridOptions.pagingOptions.pageSize() || pageRecord.SortCol !== self.sortCol() || pageRecord.SortType !== self.sorttype() )
                    //			LocalStorageController.Set(self.localStorageKey(), undefined);
                    //}
                    //Checking if we have data in local storage then we will not call server call
                    var saveData = { PageSize: self.soGridOptions.pagingOptions.pageSize(), Filters: self.soSearchFilterItems };
                    var filterDataToSave = { UserGridSetting: saveData, GridViewId: refEnums.Enums.FilterViewName.TransactionSearchSalesOrder, IsFilterApplied: self.SalesOrderContainer.reportColumnFilter.isFilterApply, GridSearchText: null, PageNo: self.soGridOptions.pagingOptions.currentPage(), SortCol: self.sortCol(), SortOrder: self.sorttype() };
                    var searchParam = { SearchModel: self.searchRequestParam, SearchFilterModel: filterDataToSave };
                    self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //if (!LocalStorageController.Get(self.localStorageKey())) {
                    //	self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //} else {
                    //	var localData = LocalStorageController.Get(self.localStorageKey());
                    //	self.soGridOptions.pagingOptions.columnDefinition = localData.ColumnDefination;
                    //	successCallBack(localData.SavedData);
                    //}
                }
                return promise;
            };

            self.getVbReportData = function (vbReportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageno = 0;

                // List View
                pageno = Number(self.vbGridOptions.pagingOptions.currentPage());
                if (pageno > 0) {
                    self.VendorBillOrPurchaseOrderContainer.listProgress(true);
                    if (self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.isFilterApply) {
                        var list = self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.reportColumnFilters();
                        self.vbSearchFilterItems.removeAll();
                        if (list.length > 0) {
                            list.forEach(function (items) {
                                self.vbSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
                                if (items.selectedserviceType() != undefined && items.selectedOperatorType() != undefined) {
                                    if (items.selectedserviceType().field === 'BillDateDisplay') {
                                        self.vbSearchFilterItem.FieldName = "BillDate";
                                    } else if (items.selectedserviceType().field === 'PickupDateDisplay') {
                                        self.vbSearchFilterItem.FieldName = "PickupDate";
                                    } else if (items.selectedserviceType().field === 'ProcessStatusDisplay') {
                                        self.vbSearchFilterItem.FieldName = "ProcessStatusDescription";
                                    } else if (items.selectedserviceType().field === 'InvoiceStatusDisplay') {
                                        self.vbSearchFilterItem.FieldName = "InvoiceStatusDescription";
                                    } else if (items.selectedserviceType().field === 'BillStatusDisplay') {
                                        self.vbSearchFilterItem.FieldName = "BillStatusDescription";
                                    } else {
                                        self.vbSearchFilterItem.FieldName = items.selectedserviceType().field;
                                    }

                                    self.vbSearchFilterItem.Operand = +items.selectedOperatorType().opratorId;
                                    self.vbSearchFilterItem.SearchText = items.searchText();
                                    self.vbSearchFilterItems.push(self.vbSearchFilterItem);
                                }
                                if (self.vbSearchFilterItems.length > 0 || items.selectedserviceType() != undefined) {
                                    self.isSearchFilterItemsDataForVB(true);
                                    //$('#VBGrid').addClass('margin-top--29');
                                } else {
                                    self.isSearchFilterItemsDataForVB(false);
                                    //$('#VBGrid').removeClass('margin-top--29');
                                }
                            });
                        }
                    }

                    if (self.sortCol() == 'PRONumber') {
                        self.sortCol('PRONo');
                    }
                    self.assignCriteriaValues();

                    var successCallBack = function (responce) {
                        var pageRecord = "";

                        self.setPagingData(responce.VendorBillOrPurchaseOrderResponse, responce.NumberOfRows, self.vbGridOptions.pagingOptions.pageSize(), self.searchType());
                        self.VendorBillOrPurchaseOrderContainer.listProgress(false);

                        deferred.resolve(responce, vbReportActionObj.view);
                        //var saveData = { PageNumber: self.vbGridOptions.pagingOptions.currentPage(), PageSize: self.vbGridOptions.pagingOptions.pageSize(), SavedData: responce,SortCol: self.sortCol(), SortType: self.sorttype() }
                        //LocalStorageController.Set(self.localStorageKey(), saveData);
                    };
                    var faliureCallBack = function (message) {
                        self.SalesOrderContainer.listProgress(false);
                    };

                    //server call on change page size and change page number
                    //if (LocalStorageController.Get(self.localStorageKey())) {
                    //	var pageRecord = LocalStorageController.Get(self.localStorageKey());
                    //	if (pageRecord.PageNumber !== self.vbGridOptions.pagingOptions.currentPage() || pageRecord.PageSize !== self.vbGridOptions.pagingOptions.pageSize() || pageRecord.SortCol !== self.sortCol() || pageRecord.SortType !== self.sorttype() )
                    //		LocalStorageController.Set(self.localStorageKey(), undefined);
                    //}
                    //Checking if we have data in local storage then we will not call server call
                    var saveData = { PageSize: self.vbGridOptions.pagingOptions.pageSize(), Filters: self.vbSearchFilterItems };
                    var filterDataToSave = { UserGridSetting: saveData, GridViewId: refEnums.Enums.FilterViewName.TransactionSearchBill, IsFilterApplied: self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.isFilterApply, GridSearchText: null, PageNo: self.vbGridOptions.pagingOptions.currentPage(), SortCol: self.sortCol(), SortOrder: self.sorttype() };

                    var searchParam = { SearchModel: self.searchRequestParam, SearchFilterModel: filterDataToSave };
                    self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //if (!LocalStorageController.Get(self.localStorageKey())) {
                    //	self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //} else {
                    //	var localData = LocalStorageController.Get(self.localStorageKey());
                    //	successCallBack(localData.SavedData);
                    //}
                }
                return promise;
            };

            self.getInvReportData = function (invReportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageno = 0;

                // List View
                pageno = Number(self.invGridOptions.pagingOptions.currentPage());
                if (pageno > 0) {
                    self.InvoiceContainer.listProgress(true);
                    self.assignCriteriaValues();
                    var searchRequestParameter = self.searchRequestParam, successCallBack = function (responce) {
                        var pageRecord = "";

                        self.setPagingData(responce.InvoicesResponse, responce.NumberOfRows, self.invGridOptions.pagingOptions.pageSize(), self.searchType());
                        self.InvoiceContainer.listProgress(false);

                        deferred.resolve(responce, invReportActionObj.view);
                        //var saveData = { PageNumber: self.invGridOptions.pagingOptions.currentPage(), PageSize: self.invGridOptions.pagingOptions.pageSize(), SavedData: responce, }
                        //LocalStorageController.Set(self.localStorageKey(), saveData);
                    }, faliureCallBack = function (message) {
                        self.SalesOrderContainer.listProgress(false);
                        ////var toastrOptions = {
                        ////	toastrPositionClass: "toast-top-middle",
                        ////	delayInseconds: 15,
                        ////	fadeOut: 15,
                        ////	typeOfAlert: "",
                        ////	title: ""
                        ////}
                        ////Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, ApplicationMessages.Messages.ErrorOccurredWhileFetchingInvoiceList, "error", null, toastrOptions);
                    };

                    var searchParam = { SearchModel: self.searchRequestParam, SearchFilterModel: null };
                    self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //server call on change page size and change page number
                    //if (LocalStorageController.Get(self.localStorageKey())) {
                    //	var pageRecord = LocalStorageController.Get(self.localStorageKey());
                    //	if (pageRecord.PageNumber !== self.invGridOptions.pagingOptions.currentPage() || pageRecord.PageSize !== self.invGridOptions.pagingOptions.pageSize())
                    //		LocalStorageController.Set(self.localStorageKey(), undefined);
                    //}
                    ////Checking if we have data in local storage then we will not call server call
                    //if (!LocalStorageController.Get(self.localStorageKey())) {
                    //	var searchParam = { SearchModel: self.searchRequestParam, SearchFilterModel: null }
                    //	self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //} else {
                    //	var localData = LocalStorageController.Get(self.localStorageKey());
                    //	successCallBack(localData.SavedData);
                    //}
                }
                return promise;
            };

            self.getTqReportData = function (tqReportActionObj) {
                var deferred = $.Deferred();
                var promise = deferred.promise();
                var pageno = 0;

                // List View
                pageno = Number(self.tqGridOptions.pagingOptions.currentPage());
                if (pageno > 0) {
                    self.TruckloadContainer.listProgress(true);
                    self.assignCriteriaValues();
                    var searchRequestParameter = self.searchRequestParam, successCallBack = function (responce) {
                        var pageRecord = "";

                        self.setPagingData(responce.TruckloadQuoteResponse, responce.NumberOfRows, self.tqGridOptions.pagingOptions.pageSize(), self.searchType());
                        self.TruckloadContainer.listProgress(false);

                        deferred.resolve(responce, tqReportActionObj.view);
                        //var saveData = { PageNumber: self.tqGridOptions.pagingOptions.currentPage(), PageSize: self.tqGridOptions.pagingOptions.pageSize(), SavedData: responce, }
                        //LocalStorageController.Set(self.localStorageKey(), saveData);
                    }, faliureCallBack = function (message) {
                        self.TruckloadContainer.listProgress(false);
                        ////var toastrOptions = {
                        ////	toastrPositionClass: "toast-top-middle",
                        ////	delayInseconds: 15,
                        ////	fadeOut: 15,
                        ////	typeOfAlert: "",
                        ////	title: ""
                        ////}
                        ////Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, ApplicationMessages.Messages.ErrorOccurredWhileFetchingTruckLoadQuoteList, "error", null, toastrOptions);
                    };

                    var searchParam = { SearchModel: self.searchRequestParam, SearchFilterModel: null };
                    self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //server call on change page size and change page number
                    //if (LocalStorageController.Get(self.localStorageKey())) {
                    //	var pageRecord = LocalStorageController.Get(self.localStorageKey());
                    //	if (pageRecord.PageNumber !== self.tqGridOptions.pagingOptions.currentPage() || pageRecord.PageSize !== self.tqGridOptions.pagingOptions.pageSize())
                    //		LocalStorageController.Set(self.localStorageKey(), undefined);
                    //}
                    ////Checking if we have data in local storage then we will not call server call
                    //if (!LocalStorageController.Get(self.localStorageKey())) {
                    //	var searchParam = { SearchModel: self.searchRequestParam, SearchFilterModel: null }
                    //	self.commonClient.getTransactionSearchResponse(searchParam, successCallBack, faliureCallBack);
                    //} else {
                    //	var localData = LocalStorageController.Get(self.localStorageKey());
                    //	successCallBack(localData.SavedData);
                    //}
                }
                return promise;
            };

            // Assign the Sales Order grid settings
            self.SalesOrderContainer = new _reportViewer.ReportViewerControlV2(self.soHeader, self.soGrid);
            self.SalesOrderContainer.onFilterChange = self.setSoReportCriteria;
            self.SalesOrderContainer.ForceChange();

            // Assign the Vendor Bill Grid settings
            self.VendorBillOrPurchaseOrderContainer = new _reportViewer.ReportViewerControlV2(self.vbHeader, self.vbGrid);
            self.VendorBillOrPurchaseOrderContainer.onFilterChange = self.setVbReportCriteria;
            self.VendorBillOrPurchaseOrderContainer.ForceChange();

            // Assign Invoice Grid Settings
            self.InvoiceContainer = new _reportViewer.ReportViewerControlV2(self.invHeader, self.invGrid);
            self.InvoiceContainer.onFilterChange = self.setInvReportCriteria;
            self.InvoiceContainer.ForceChange();

            // Assign Truck Load Grid Settings
            self.TruckloadContainer = new _reportViewer.ReportViewerControlV2(self.tqHeader, self.tqGrid);
            self.TruckloadContainer.onFilterChange = self.setTqReportCriteria;
            self.TruckloadContainer.ForceChange();

            // redirects to sales order details page
            self.SalesOrderContainer.onBolNumberClick = function (shipmentObj) {
                var salesOrderId = shipmentObj.ShipmentId;
                _app.trigger("openSalesOrder", salesOrderId, shipmentObj.BOLNumber, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            // redirects to sales order details page
            self.VendorBillOrPurchaseOrderContainer.onBolNumberClick = function (shipmentObj) {
                var salesOrderId = shipmentObj.SalesOrderId;
                if (salesOrderId > 0) {
                    _app.trigger("openSalesOrder", salesOrderId, shipmentObj.BOLNumber, function (callback) {
                        if (!callback) {
                            return;
                        }
                    });
                }
            };

            // redirects to sales order details page
            self.VendorBillOrPurchaseOrderContainer.onProNumberClick = function (shipmentObj) {
                var vendorBillId = shipmentObj.VendorBillId;
                var checkPo = shipmentObj.IsPurchaseOrder;
                if (checkPo) {
                    _app.trigger("openPurchaseOrder", vendorBillId, shipmentObj.PRONo, function (callback) {
                        if (!callback) {
                            return;
                        }
                    });
                } else {
                    _app.trigger("openVendorBill", vendorBillId, shipmentObj.PRONo, function (callback) {
                        if (!callback) {
                            return;
                        }
                    });
                }
            };

            // redirects to sales order details page
            self.InvoiceContainer.onProNumberClick = function (shipmentObj) {
                var vendorBillId = shipmentObj.Id;
                _app.trigger("openVendorBill", vendorBillId, shipmentObj.ProNumber, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            // redirects to sales order details page
            self.TruckloadContainer.onBolNumberClick = function (shipmentObj) {
                var salesOrderId = shipmentObj.SalesOrderId;
                _app.trigger("openSalesOrder", salesOrderId, shipmentObj.BolNumber, function (callback) {
                    if (!callback) {
                        return;
                    }
                });
            };

            self.searchType.subscribe(function (newValue) {
                self.setFilter(newValue);

                if (newValue === refEnums.Enums.TransactionSearchType.SalesOrder.ID) {
                    self.sortCol('BOLNumber');
                    self.sorttype('desc');
                } else if (newValue === refEnums.Enums.TransactionSearchType.Bills.ID) {
                    self.sortCol('PRONo');
                    self.sorttype('desc');
                }
            });
        }
        //#endregion
        //#region Internal Methods
        //clearing all filter data
        TransactionSearchViewModel.prototype.onClickClearAllSOFilter = function () {
            var self = this;
            self.SalesOrderContainer.reportColumnFilter.clearAll();
            self.SalesOrderContainer.reportColumnFilter.applyFilter();
            self.isSearchFilterItemsData(false);
            //$('#SOGrid').removeClass('margin-top--29');
        };

        //clearing all filter data
        TransactionSearchViewModel.prototype.onClickClearAllVBFilter = function () {
            var self = this;
            self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.clearAll();
            self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.applyFilter();
            self.isSearchFilterItemsDataForVB(false);
            //$('#VBGrid').removeClass('margin-top--29');
        };

        TransactionSearchViewModel.prototype.setPagingData = function (data, page, pageSize, type) {
            var self = this;
            if (type === refEnums.Enums.TransactionSearchType.SalesOrder.ID) {
                self.soGridOptions.data(data);
                self.soGridOptions.data.valueHasMutated();
                self.soGridOptions.pagingOptions.totalServerItems(page);
            } else if (type === refEnums.Enums.TransactionSearchType.Bills.ID) {
                self.vbGridOptions.data(data);
                self.vbGridOptions.data.valueHasMutated();
                self.vbGridOptions.pagingOptions.totalServerItems(page);
            } else if (type === refEnums.Enums.TransactionSearchType.Invoices.ID) {
                self.invGridOptions.data(data);
                self.invGridOptions.data.valueHasMutated();
                self.invGridOptions.pagingOptions.totalServerItems(page);
            } else {
                self.tqGridOptions.data(data);
                self.tqGridOptions.data.valueHasMutated();
                self.tqGridOptions.pagingOptions.totalServerItems(page);
            }
        };

        TransactionSearchViewModel.prototype.setSoGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = true;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("TransactionSearchGridSO");
            grOption.columnDefinition = self.setSoGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
                columnName: "BOLNumber",
                order: "desc"
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
            grOption.enableSaveGridSettings = false;
            grOption.useClientSideFilterAndSort = false;
            grOption.showColumnMenu = true;
            return grOption;
        };

        TransactionSearchViewModel.prototype.setVbGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = true;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("TransactionSearchGridVb");
            grOption.columnDefinition = self.setVbGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
                columnName: "PRONo",
                order: "desc"
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
            grOption.enableSaveGridSettings = false;
            grOption.useClientSideFilterAndSort = false;
            grOption.showColumnMenu = true;

            return grOption;
        };

        TransactionSearchViewModel.prototype.setInvGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = true;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("TransactionSearchGridInvoice");
            grOption.columnDefinition = self.setInvGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
                columnName: "ProNumber",
                order: "desc"
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
            grOption.showColumnMenu = true;
            return grOption;
        };

        TransactionSearchViewModel.prototype.setTqGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = true;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("TransactionSearchGridTruckload");
            grOption.columnDefinition = self.setTqGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
                columnName: "BolNumber",
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
            grOption.showColumnMenu = true;
            return grOption;
        };

        TransactionSearchViewModel.prototype.setSoGridColumnDefinitions = function () {
            var colDefinition = [];
            var self = this;

            // For BOLnumber
            var bolCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'BOLNumber\'], click: function() { $userViewModel.onBolNumberClick($parent.entity) }" />';

            colDefinition = [
                { field: 'BOLNumber', displayName: 'BOL#', cellTemplate: bolCellTemplate, isRemovable: false, width: 110, type: _reportViewer.DataTypes.String },
                { field: 'PRONumber', displayName: 'PRO#', width: 110, type: _reportViewer.DataTypes.String },
                { field: 'PickupDateDisplay', displayName: 'Pickup Date', width: 100, type: _reportViewer.DataTypes.DateTime },
                { field: 'CustomerBolNumber', displayName: 'Customer BOL', isRemovable: true, width: 100, type: _reportViewer.DataTypes.String },
                { field: 'CompanyNameDisplay', displayName: 'Customer', isRemovable: true, width: 120, type: _reportViewer.DataTypes.String },
                { field: 'CarrierName', displayName: 'Vendor', isRemovable: false, width: 120, type: _reportViewer.DataTypes.String },
                { field: 'ShipperName', displayName: 'Shipper', width: 130, type: _reportViewer.DataTypes.String },
                { field: 'ConsigneeName', displayName: 'Consignee', width: 130, type: _reportViewer.DataTypes.String },
                { field: 'ShipperZipCode', displayName: 'Origin', width: 80, type: _reportViewer.DataTypes.String },
                { field: 'ConsigneeZipCode', displayName: 'Destination ', width: 90, type: _reportViewer.DataTypes.String },
                { field: 'ShipmentMode', displayName: 'Service Type', width: 110, type: _reportViewer.DataTypes.String },
                { field: 'TotalWeight', displayName: 'Total Weight', width: 80, type: _reportViewer.DataTypes.Numeric },
                { field: 'TotalPieces', displayName: 'Total Pieces', width: 80, type: _reportViewer.DataTypes.Numeric },
                { field: 'Revenue', displayName: 'Revenue', width: 80, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate, type: _reportViewer.DataTypes.Numeric },
                { field: 'ProcessStatusDisplay', displayName: 'Process Status', width: 120, isRemovable: false, type: _reportViewer.DataTypes.String },
                { field: 'InvoiceStatusDisplay', displayName: 'Invoice Status', width: 130, isRemovable: false, type: _reportViewer.DataTypes.String },
                { field: 'CustomerType', displayName: 'Customer Type', width: 100, display: false, dntApplyFilter: true, type: _reportViewer.DataTypes.String }
            ];
            return colDefinition;
        };

        TransactionSearchViewModel.prototype.setVbGridColumnDefinitions = function () {
            var colDefinition = [];
            var self = this;

            // For ProNumber
            var proCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'PRONo\'], click: function() { $userViewModel.onProNumberClick($parent.entity) }" />';

            //For BOL Number
            var bolCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'BOLNumber\'], click: function() { $userViewModel.onBolNumberClick($parent.entity) }" />';

            colDefinition = [
                { field: 'PRONo', displayName: 'PRO#', cellTemplate: proCellTemplate, width: 100, type: _reportViewer.DataTypes.String },
                { field: 'BillDateDisplay', displayName: 'Date', width: 100, isRemovable: false, type: _reportViewer.DataTypes.DateTime },
                { field: 'BOLNumber', displayName: 'BOL#', isRemovable: false, width: 95, cellTemplate: bolCellTemplate, type: _reportViewer.DataTypes.String },
                { field: 'VendorBillId', displayName: 'Id', isRemovable: false, visible: false, type: _reportViewer.DataTypes.Numeric, dntApplyFilter: true },
                { field: 'IsPurchaseOrder', displayName: 'IsPurchaseOrder', isRemovable: false, visible: false, type: _reportViewer.DataTypes.String, dntApplyFilter: true },
                { field: 'CustomerBOLNumber', displayName: 'Customer BOL', width: 100, isRemovable: true, type: _reportViewer.DataTypes.String },
                { field: 'CarrierName', displayName: 'Carrier', isRemovable: false, width: 200, type: _reportViewer.DataTypes.String },
                { field: 'ShipperName', displayName: 'Shipper', width: 200, type: _reportViewer.DataTypes.String },
                { field: 'ConsigneeName', displayName: 'Consignee', width: 200, type: _reportViewer.DataTypes.String },
                { field: 'Origin', displayName: 'Origin', width: 80, type: _reportViewer.DataTypes.String },
                { field: 'Destination', displayName: 'Destination', width: 90, type: _reportViewer.DataTypes.String },
                { field: 'Amount', displayName: 'Amount', width: 80, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate, type: _reportViewer.DataTypes.Numeric },
                { field: 'BillStatusDisplay', displayName: 'Bill Status', width: 150, isRemovable: false, type: _reportViewer.DataTypes.String }
            ];
            return colDefinition;
        };

        TransactionSearchViewModel.prototype.setInvGridColumnDefinitions = function () {
            var colDefinition = [];
            var self = this;

            // For ProNumber
            var proCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'ProNumber\'], click: function() { $userViewModel.onProNumberClick($parent.entity) }" />';

            colDefinition = [
                { field: 'ProNumber', displayName: 'PRO#', cellTemplate: proCellTemplate, width: 100 },
                { field: 'PickupDateDisplay', displayName: 'Pickup Date', width: 150, isRemovable: false },
                { field: 'BolNumber', displayName: 'BOL#', isRemovable: false, width: 95 },
                { field: 'Customer', displayName: 'Customer', visible: false, width: 120, isRemovable: true },
                { field: 'Vendor', displayName: 'Vendor', isRemovable: false, width: 120 },
                { field: 'ShipperCompName', displayName: 'Shipper', width: 130 },
                { field: 'ConsigneeCompName', displayName: 'Consignee', width: 130 },
                { field: 'ShipperZipCode', displayName: 'Origin', width: 80 },
                { field: 'ConsigneeZipCode', displayName: 'Destination', width: 80 },
                { field: 'ServiceType', displayName: 'Service Type', width: 110 },
                { field: 'TotalWeight', displayName: 'Total Weight', width: 80 },
                { field: 'TotalPieces', displayName: 'Total Pieces', width: 80 },
                { field: 'Revenue', displayName: 'Amount', width: 80, cellTemplate: refEnums.Enums.GridCellFormatTemplates.RightAlignCurrencyTemplate }
            ];
            return colDefinition;
        };

        TransactionSearchViewModel.prototype.setTqGridColumnDefinitions = function () {
            var colDefinition = [];
            var self = this;

            //For BOL Number
            var bolCellTemplate = '<a style="cursor: pointer" data-bind="text: $parent.entity[\'BolNumber\'], click: function() { $userViewModel.onBolNumberClick($parent.entity) }" />';

            colDefinition = [
                { field: 'BolNumber', displayName: 'BOL#', isRemovable: false, width: 95, cellTemplate: bolCellTemplate },
                { field: 'QuoteNumber', displayName: 'Quote#', width: 95, isRemovable: false },
                { field: 'StatusDisplay', displayName: 'Status', width: 150, isRemovable: true },
                { field: 'Customer', displayName: 'Customer', isRemovable: false, width: 200 },
                { field: 'Agent', displayName: 'Agent', isRemovable: false, width: 200 },
                { field: 'Carrier', displayName: 'Carrier', width: 200 },
                { field: 'TruckTypeDisplay', displayName: 'Truck Type', width: 150 },
                { field: 'TruckLengthDisplay', displayName: 'Truck Length', width: 150 },
                { field: 'ServiceTypeDisplay', displayName: 'Service Type', width: 150 },
                { field: 'Tarps', displayName: 'Tarps', width: 80 },
                { field: 'OriginZipCode', displayName: 'OZip', width: 100 },
                { field: 'OriginCity', displayName: 'OCity', width: 100 },
                { field: 'OriginState', displayName: 'OState', width: 100 },
                { field: 'DestinationZipCode', displayName: 'DZip', width: 100 },
                { field: 'DestinationState', displayName: 'DState', width: 100 },
                { field: 'DestinationCity', displayName: 'DCity', width: 100 }
            ];
            return colDefinition;
        };

        TransactionSearchViewModel.prototype.getSearchData = function () {
            var self = this;

            //removing local storage data on search click
            LocalStorageController.Set(self.localStorageKey(), undefined);
            $('#collapseTransactionSearch').css("overflow", "hidden");
            self.collapseView('collapseTransactionSearch');
            self.expandView('collapseSearchResults');
            self.isSearchFilterItemsData(false);
            self.isSearchFilterItemsDataForVB(false);
            self.transactionSearchcriteriaViewModel.selectedItemNumberList = self.getCommaSeperatedItemNumbers();
            if (self.searchType() === refEnums.Enums.TransactionSearchType.SalesOrder.ID) {
                self.soreportClick(true);
                self.soGridOptions.pagingOptions.currentPage(1);
                self.SalesOrderContainer.reportColumnFilter.isFilterApply = false;
                self.SalesOrderContainer.reportColumnFilter.clearAll();
                self.getSoReportData(self.soReportAction);
            } else if (self.searchType() === refEnums.Enums.TransactionSearchType.Bills.ID) {
                self.vbreportClick(true);
                self.vbGridOptions.pagingOptions.currentPage(1);
                self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.isFilterApply = false;
                self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.clearAll();
                self.getVbReportData(self.vbReportAction);
            } else if (self.searchType() === refEnums.Enums.TransactionSearchType.Invoices.ID) {
                self.inreportClick(true);
                self.invGridOptions.pagingOptions.currentPage(1);
                self.getInvReportData(self.invReportAction);
            } else {
                self.tqreportClick(true);
                self.tqGridOptions.pagingOptions.currentPage(1);
                self.getTqReportData(self.invReportAction);
            }
            self.fillLocalStorage();
        };

        //function to set the overflow property to the Accordion
        TransactionSearchViewModel.prototype.onCriteriaClick = function () {
            var self = this;
            self.collapseView('collapseSearchResults');
            $('#collapseTransactionSearch').css("overflow", "hidden");
            //if ($("#collapseTransactionSearch").css("overflow") === "hidden") {
            //	setTimeout(function () {
            //		$('#collapseTransactionSearch').css("overflow", "visible");
            //	}, 500);
            //}
            //else {
            //	$('#collapseTransactionSearch').css("overflow", "hidden");
            //}
        };

        TransactionSearchViewModel.prototype.onSearchResultClick = function () {
            var self = this;
            $('#collapseTransactionSearch').css("overflow", "hidden");
            self.collapseView('collapseTransactionSearch');
        };

        //## function to expand the view by ID, if any case we required
        TransactionSearchViewModel.prototype.expandView = function (viewId) {
            if (!$('#' + viewId).hasClass('in')) {
                $('#' + viewId).addClass('in');
                $('#' + viewId).css("height", 'auto');
                $('#Achor' + viewId).removeClass('collapsed');
            }
        };

        //## function to collapse the items view by ID, if any case we required
        TransactionSearchViewModel.prototype.collapseView = function (viewId) {
            $('#' + viewId).removeClass('in');
            $('#' + viewId).css("height", '0');
            $('#Achor' + viewId).addClass('collapsed');
        };

        TransactionSearchViewModel.prototype.load = function () {
            var self = this;
            var pageRecord = LocalStorageController.Get(self.localStorageKey());
            if (pageRecord != null && typeof (pageRecord.SearchData.transactionSearch) !== 'undefined') {
                self.transactionSearchcriteriaViewModel.selectedtypeList(pageRecord.SearchData.transactionSearch.selectedtypeList());

                //** holds the vendor name. */
                self.transactionSearchcriteriaViewModel.vendorNameSearchList.name(new refVendorNameSearch.Models.VendorNameSearch());
                self.transactionSearchcriteriaViewModel.userSearchList.name(new refUserNameSearch.Models.UserNameSearch());
                self.transactionSearchcriteriaViewModel.customerNameSearchList.name(new refCustomerNameSearch.Models.CustomerNameSearch());
                self.transactionSearchcriteriaViewModel.amount($.number((pageRecord.SearchData.transactionSearch.amount()), 2));
                self.transactionSearchcriteriaViewModel.bolNumber(pageRecord.SearchData.transactionSearch.bolNumber());
                self.transactionSearchcriteriaViewModel.shipperCompanyName(pageRecord.SearchData.transactionSearch.shipperCompanyName());
                self.transactionSearchcriteriaViewModel.consigneeCompanyName(pageRecord.SearchData.transactionSearch.consigneeCompanyName());
                self.transactionSearchcriteriaViewModel.vendorNameSearchList.vendorName(self.commonUtils.isNullOrEmptyOrWhiteSpaces(pageRecord.SearchData.transactionSearch.vendorName()) ? pageRecord.SearchData.transactionSearch.vendorName() : '');
                self.transactionSearchcriteriaViewModel.poNumber(pageRecord.SearchData.transactionSearch.poNumber());
                self.transactionSearchcriteriaViewModel.shipperCity(pageRecord.SearchData.transactionSearch.shipperCity());
                self.transactionSearchcriteriaViewModel.consigneeCity(pageRecord.SearchData.transactionSearch.consigneeCity());
                self.transactionSearchcriteriaViewModel.userSearchList.userName(self.commonUtils.isNullOrEmptyOrWhiteSpaces(pageRecord.SearchData.transactionSearch.userName()) ? pageRecord.SearchData.transactionSearch.userName() : '');
                self.transactionSearchcriteriaViewModel.shipperZip(pageRecord.SearchData.transactionSearch.shipperZip());
                self.transactionSearchcriteriaViewModel.consigneeZip(pageRecord.SearchData.transactionSearch.consigneeZip());
                self.transactionSearchcriteriaViewModel.customerBOLNumber(pageRecord.SearchData.transactionSearch.customerBOLNumber());
                self.transactionSearchcriteriaViewModel.proNumber(pageRecord.SearchData.transactionSearch.proNumber());
                self.transactionSearchcriteriaViewModel.customerNameSearchList.customerName(self.commonUtils.isNullOrEmptyOrWhiteSpaces(pageRecord.SearchData.transactionSearch.customerName()) ? pageRecord.SearchData.transactionSearch.customerName() : '');
                self.transactionSearchcriteriaViewModel.truckLoadQuoteNumber(pageRecord.SearchData.transactionSearch.truckLoadQuoteNumber());
                self.transactionSearchcriteriaViewModel.refNumber(pageRecord.SearchData.transactionSearch.refNumber());
                self.transactionSearchcriteriaViewModel.totalWeight(pageRecord.SearchData.transactionSearch.totalWeight());
                self.transactionSearchcriteriaViewModel.totalPieces(pageRecord.SearchData.transactionSearch.totalPieces());
                self.transactionSearchcriteriaViewModel.fromDate(pageRecord.SearchData.transactionSearch.fromDate());
                self.transactionSearchcriteriaViewModel.toDate(pageRecord.SearchData.transactionSearch.toDate());
                self.transactionSearchcriteriaViewModel.searchType(pageRecord.SearchData.transactionSearch.searchType());

                // TODO: we have to change the logic to fill the dropdown selected values.
                self.transactionSearchcriteriaViewModel.dateRangeSelectedOption(pageRecord.SearchData.transactionSearch.dateRangeSelectedOption());
                self.transactionSearchcriteriaViewModel.selectedorderStatusList(pageRecord.SearchData.transactionSearch.selectedorderStatusList());
                self.transactionSearchcriteriaViewModel.selectedInvoiceStatusList(pageRecord.SearchData.transactionSearch.selectedInvoiceStatusList());
                self.transactionSearchcriteriaViewModel.selectedModeList(pageRecord.SearchData.transactionSearch.selectedModeList());
                self.transactionSearchcriteriaViewModel.selectedItemNumberList = pageRecord.SearchData.transactionSearch.selectedItemNumberList;

                self.soreportClick(pageRecord.SearchData.soreportClick);
                self.vbreportClick(pageRecord.SearchData.vbreportClick);
                self.inreportClick(pageRecord.SearchData.inreportClick);
                self.tqreportClick(pageRecord.SearchData.tqreportClick);
                if (pageRecord.SearchData.transactionSearch.searchType() === refEnums.Enums.TransactionSearchType.SalesOrder.ID) {
                    if (refSystem.isObject(self.soGridOptions)) {
                        self.soGridOptions.pagingOptions.pageSize(pageRecord.SearchData.soPageSize);
                        self.soGridOptions.pagingOptions.currentPage(pageRecord.SearchData.soCurrentPage);
                        self.sortCol(pageRecord.soData.SortCol);
                        self.sorttype(pageRecord.soData.SortOrder);

                        var list = pageRecord.soData.UserGridSetting.Filters;
                        self.soSearchFilterItems.removeAll();
                        if (list.length > 0 && list[0].FieldName) {
                            list.forEach(function (items) {
                                self.soSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
                                if (items.FieldNamed === 'BillDateDisplay') {
                                    self.soSearchFilterItem.FieldName = "BillDate";
                                } else if (items.FieldName === 'PickupDateDisplay') {
                                    self.soSearchFilterItem.FieldName = "PickupDate";
                                } else if (items.FieldName === 'ProcessStatusDisplay') {
                                    self.soSearchFilterItem.FieldName = "ProcessStatusDescription";
                                } else if (items.FieldName === 'InvoiceStatusDisplay') {
                                    self.soSearchFilterItem.FieldName = "InvoiceStatusDescription";
                                }
                                self.soSearchFilterItem.FieldName = items.FieldName;
                                self.soSearchFilterItem.Operand = items.Operand;
                                self.soSearchFilterItem.SearchText = items.SearchText;
                                self.soSearchFilterItems.push(self.soSearchFilterItem);
                            });
                            self.SalesOrderContainer.reportColumnFilter.addFilter(self.soSearchFilterItems);
                            self.SalesOrderContainer.reportColumnFilter.isFilterApply = true;
                            if (self.soSearchFilterItems.length > 0) {
                                self.isSearchFilterItemsData(true);
                                //$('#SOGrid').removeClass('margin-top--29');
                                //$('#SOGrid').addClass('margin-top--29');
                            } else {
                                self.isSearchFilterItemsData(false);
                                //$('#SOGrid').removeClass('margin-top--29');
                            }
                        }
                    }
                    if (self.soreportClick()) {
                        self.getSoReportData(self.soReportAction);
                    }
                } else if (pageRecord.SearchData.transactionSearch.searchType() === refEnums.Enums.TransactionSearchType.Bills.ID) {
                    if (refSystem.isObject(self.vbGridOptions)) {
                        self.vbGridOptions.pagingOptions.pageSize(pageRecord.SearchData.vbPageSize);
                        self.vbGridOptions.pagingOptions.currentPage(pageRecord.SearchData.vbCurrentPage);
                        self.sortCol(pageRecord.vbData.SortCol);
                        self.sorttype(pageRecord.vbData.SortOrder);
                        var list = pageRecord.vbData.UserGridSetting.Filters;
                        self.vbSearchFilterItems.removeAll();
                        if (list.length > 0 && list[0].FieldName) {
                            list.forEach(function (items) {
                                self.vbSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
                                if (items.FieldNamed === 'BillDateDisplay') {
                                    self.vbSearchFilterItem.FieldName = "BillDate";
                                } else if (items.FieldName === 'PickupDateDisplay') {
                                    self.vbSearchFilterItem.FieldName = "PickupDate";
                                } else if (items.FieldName === 'ProcessStatusDisplay') {
                                    self.vbSearchFilterItem.FieldName = "ProcessStatusDescription";
                                } else if (items.FieldName === 'InvoiceStatusDisplay') {
                                    self.vbSearchFilterItem.FieldName = "InvoiceStatusDescription";
                                } else if (items.FieldName === 'BillStatusDisplay') {
                                    self.vbSearchFilterItem.FieldName = "BillStatusDescription";
                                }

                                self.vbSearchFilterItem.FieldName = items.FieldName;
                                self.vbSearchFilterItem.Operand = items.Operand;
                                self.vbSearchFilterItem.SearchText = items.SearchText;
                                self.vbSearchFilterItems.push(self.vbSearchFilterItem);
                            });
                            self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.addFilter(self.vbSearchFilterItems);
                            self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.isFilterApply = true;
                            if (self.vbSearchFilterItems.length > 0) {
                                self.isSearchFilterItemsDataForVB(true);
                                //$('#VBGrid').addClass('margin-top--29');
                            } else {
                                self.isSearchFilterItemsDataForVB(false);
                                //$('#VBGrid').removeClass('margin-top--29');
                            }
                        }
                    }
                    if (self.vbreportClick()) {
                        self.getVbReportData(self.vbReportAction);
                    }
                } else if (pageRecord.SearchData.transactionSearch.searchType() === refEnums.Enums.TransactionSearchType.Invoices.ID) {
                    if (refSystem.isObject(self.invGridOptions)) {
                        self.invGridOptions.pagingOptions.pageSize(pageRecord.SearchData.invPageSize);
                        self.invGridOptions.pagingOptions.currentPage(pageRecord.SearchData.invCurrentPage);
                        if (self.inreportClick()) {
                            self.getInvReportData(self.vbReportAction);
                        }
                    }
                } else {
                    if (refSystem.isObject(self.tqGridOptions)) {
                        self.tqGridOptions.pagingOptions.pageSize(pageRecord.SearchData.tqPageSize);
                        self.tqGridOptions.pagingOptions.currentPage(pageRecord.SearchData.tqCurrentPage);
                        if (self.tqreportClick()) {
                            self.getTqReportData(self.tqReportAction);
                        }
                    }
                }
            }
            window.kg.toggleSelection(false);
        };

        // assign the criteria values for search result
        TransactionSearchViewModel.prototype.assignCriteriaValues = function () {
            var self = this;
            self.searchRequestParam.CustomerName = self.transactionSearchcriteriaViewModel.customerName();

            self.searchRequestParam.DateType = self.transactionSearchcriteriaViewModel.dateRangeSelectedOption();
            self.searchRequestParam.FromDate = self.transactionSearchcriteriaViewModel.fromDate();
            self.searchRequestParam.ToDate = self.transactionSearchcriteriaViewModel.toDate();
            if (self.searchType() === refEnums.Enums.TransactionSearchType.SalesOrder.ID) {
                self.searchRequestParam.PageSize = self.soGridOptions.pagingOptions.pageSize();
                self.searchRequestParam.PageNumber = self.soGridOptions.pagingOptions.currentPage();
            } else if (self.searchType() === refEnums.Enums.TransactionSearchType.Bills.ID) {
                self.searchRequestParam.PageSize = self.vbGridOptions.pagingOptions.pageSize();
                self.searchRequestParam.PageNumber = self.vbGridOptions.pagingOptions.currentPage();
            } else if (self.searchType() === refEnums.Enums.TransactionSearchType.Invoices.ID) {
                self.searchRequestParam.PageSize = self.invGridOptions.pagingOptions.pageSize();
                self.searchRequestParam.PageNumber = self.invGridOptions.pagingOptions.currentPage();
            } else {
                self.searchRequestParam.PageSize = self.tqGridOptions.pagingOptions.pageSize();
                self.searchRequestParam.PageNumber = self.tqGridOptions.pagingOptions.currentPage();
            }

            self.searchRequestParam.TransactionSearchType = self.transactionSearchcriteriaViewModel.selectedtypeList() > 0 ? self.transactionSearchcriteriaViewModel.selectedtypeList() : 0;
            self.searchRequestParam.VendorName = self.transactionSearchcriteriaViewModel.vendorName() ? self.transactionSearchcriteriaViewModel.vendorName() : "";
            self.searchRequestParam.Amount = self.transactionSearchcriteriaViewModel.amount() > 0 ? $.number(self.transactionSearchcriteriaViewModel.amount(), 2) : -1;
            self.searchRequestParam.OrderStatus = self.transactionSearchcriteriaViewModel.selectedorderStatusList() > -1 ? self.transactionSearchcriteriaViewModel.selectedorderStatusList() : -1;
            self.searchRequestParam.BolNumber = self.transactionSearchcriteriaViewModel.bolNumber() ? self.transactionSearchcriteriaViewModel.bolNumber().trim() : "";
            self.searchRequestParam.ProNumber = self.transactionSearchcriteriaViewModel.proNumber() ? self.transactionSearchcriteriaViewModel.proNumber().trim() : "";
            self.searchRequestParam.ShipperCompanyName = self.transactionSearchcriteriaViewModel.shipperCompanyName() ? self.transactionSearchcriteriaViewModel.shipperCompanyName().trim() : "";
            self.searchRequestParam.ConsigneeCompanyName = self.transactionSearchcriteriaViewModel.consigneeCompanyName() ? self.transactionSearchcriteriaViewModel.consigneeCompanyName().trim() : "";
            self.searchRequestParam.ShipperZipCode = self.transactionSearchcriteriaViewModel.shipperZip() ? self.transactionSearchcriteriaViewModel.shipperZip().trim() : "";
            self.searchRequestParam.ConsigneeZipCode = self.transactionSearchcriteriaViewModel.consigneeZip() ? self.transactionSearchcriteriaViewModel.consigneeZip().trim() : "";
            self.searchRequestParam.PoNumber = self.transactionSearchcriteriaViewModel.poNumber() ? self.transactionSearchcriteriaViewModel.poNumber().trim() : "";
            self.searchRequestParam.ShipperCity = self.transactionSearchcriteriaViewModel.shipperCity() ? self.transactionSearchcriteriaViewModel.shipperCity().trim() : "";
            self.searchRequestParam.ConsigneeCity = self.transactionSearchcriteriaViewModel.consigneeCity() ? self.transactionSearchcriteriaViewModel.consigneeCity().trim() : "";
            self.searchRequestParam.SalesRepName = self.transactionSearchcriteriaViewModel.userName() ? self.transactionSearchcriteriaViewModel.userName().trim() : "";
            self.searchRequestParam.SalesRepId = self.transactionSearchcriteriaViewModel.userId() > 0 ? self.transactionSearchcriteriaViewModel.userId() : -1;
            self.searchRequestParam.CompanyName = self.searchRequestParam.TransactionSearchType === 0 && self.transactionSearchcriteriaViewModel.customerName() ? self.transactionSearchcriteriaViewModel.customerName() : "";
            self.searchRequestParam.CustomerBolNumber = self.transactionSearchcriteriaViewModel.customerBOLNumber() ? self.transactionSearchcriteriaViewModel.customerBOLNumber().trim() : "";
            self.searchRequestParam.SortCol = self.sortCol();
            self.searchRequestParam.SortOrder = self.sorttype();
            self.searchRequestParam.IsPurchaseOrder = refEnums.Enums.SearchTransactionType.Both;
            var items = $('#multiSelect').val(), selectedItems = '';

            //if (items) {
            //	for (var i = 0; i < items.length; i++) {
            //		selectedItems = selectedItems + items[i] + ",";
            //	}
            //}
            //self.transactionSearchcriteriaViewModel.selectedItemNumberList = selectedItems;
            selectedItems = self.transactionSearchcriteriaViewModel.selectedItemNumberList;
            self.searchRequestParam.ItemNumbers = selectedItems;
            self.searchRequestParam.TruckloadQuoteNumber = self.transactionSearchcriteriaViewModel.truckLoadQuoteNumber() ? self.transactionSearchcriteriaViewModel.truckLoadQuoteNumber() : '';
            self.searchRequestParam.InvoiceStatus = self.transactionSearchcriteriaViewModel.selectedInvoiceStatusList() > -1 ? self.transactionSearchcriteriaViewModel.selectedInvoiceStatusList() : -1;
            self.searchRequestParam.ReferenceNumber = self.transactionSearchcriteriaViewModel.refNumber() ? self.transactionSearchcriteriaViewModel.refNumber().trim() : "";
            self.searchRequestParam.TotalWeight = self.transactionSearchcriteriaViewModel.totalWeight() > 0 ? self.transactionSearchcriteriaViewModel.totalWeight() : -1;
            self.searchRequestParam.TotalPiece = self.transactionSearchcriteriaViewModel.totalPieces() > 0 ? self.transactionSearchcriteriaViewModel.totalPieces() : -1;
            if ((self.transactionSearchcriteriaViewModel.selectedModeList() && self.transactionSearchcriteriaViewModel.selectedModeList() !== -1 && self.transactionSearchcriteriaViewModel.selectedModeList() !== 12) || self.transactionSearchcriteriaViewModel.selectedModeList() === 0) {
                self.searchRequestParam.CarrierServiceMode = self.transactionSearchcriteriaViewModel.selectedModeList();
                self.searchRequestParam.NewShipmentType = -1;
            } else if (self.transactionSearchcriteriaViewModel.selectedModeList() && self.transactionSearchcriteriaViewModel.selectedModeList() === 12) {
                self.searchRequestParam.CarrierServiceMode = -1;
                self.searchRequestParam.NewShipmentType = 2;
            } else {
                self.searchRequestParam.CarrierServiceMode = -1;
                self.searchRequestParam.NewShipmentType = -1;
            }
        };

        TransactionSearchViewModel.prototype.getCommaSeperatedItemNumbers = function () {
            var items = $('#multiSelect').val(), selectedItems = '';

            if (items) {
                for (var i = 0; i < items.length; i++) {
                    selectedItems = selectedItems + items[i] + ",";
                }
            }
            return selectedItems;
        };

        TransactionSearchViewModel.prototype.setFilter = function (newvalue) {
            var self = this;

            var pageRecord = LocalStorageController.Get(self.localStorageKey());
            if (pageRecord != null) {
                if (newvalue === refEnums.Enums.TransactionSearchType.Bills.ID) {
                    self.vbGridOptions.pagingOptions.currentPage(pageRecord.SearchData.vbCurrentPage);
                    self.vbGridOptions.pagingOptions.pageSize(pageRecord.vbData.UserGridSetting.PageSize);

                    var list = pageRecord.vbData.UserGridSetting.Filters;
                    self.vbSearchFilterItems.removeAll();
                    if (list.length > 0 && list[0].FieldName) {
                        list.forEach(function (items) {
                            self.vbSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
                            self.vbSearchFilterItem.FieldName = items.FieldName;
                            self.vbSearchFilterItem.Operand = items.Operand;
                            self.vbSearchFilterItem.SearchText = items.SearchText;
                            self.vbSearchFilterItems.push(self.vbSearchFilterItem);
                        });
                        self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.addFilter(self.vbSearchFilterItems);
                        self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.isFilterApply = true;
                    }
                    if (self.vbreportClick()) {
                        self.getVbReportData(self.vbReportAction);
                    }
                } else if (newvalue === refEnums.Enums.TransactionSearchType.SalesOrder.ID) {
                    self.soGridOptions.pagingOptions.currentPage(pageRecord.SearchData.soCurrentPage);
                    self.soGridOptions.pagingOptions.pageSize(pageRecord.soData.UserGridSetting.PageSize);

                    var list = pageRecord.soData.UserGridSetting.Filters;
                    self.soSearchFilterItems.removeAll();
                    if (list.length > 0 && list[0].FieldName) {
                        list.forEach(function (items) {
                            self.soSearchFilterItem = new _refPurchaseOrderSearchFilterModel.Models.PurchaseOrderSearchFilter();
                            self.soSearchFilterItem.FieldName = items.FieldName;
                            self.soSearchFilterItem.Operand = items.Operand;
                            self.soSearchFilterItem.SearchText = items.SearchText;
                            self.soSearchFilterItems.push(self.soSearchFilterItem);
                        });
                        self.SalesOrderContainer.reportColumnFilter.addFilter(self.soSearchFilterItems);
                        self.SalesOrderContainer.reportColumnFilter.isFilterApply = true;
                    }
                    if (self.soreportClick()) {
                        self.getSoReportData(self.soReportAction);
                    }
                }
            }
        };

        //#endregion
        //#region Life Cycle Event
        // Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button
        TransactionSearchViewModel.prototype.attached = function () {
            _app.trigger('viewAttached');
            var self = this;

            //Using Document Key press for search result on enter key press
            document.onkeypress = function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode === 13) {
                    $('#btnSearch').focus();
                    self.getSearchData();
                    return false;
                }
            };
        };

        TransactionSearchViewModel.prototype.activate = function () {
            return true;
        };

        TransactionSearchViewModel.prototype.deactivate = function () {
            var self = this;

            //ko.cleanNode($("#mainDiv")[0]);
            self.cleanup();

            //ko.removeNode($("#mainDiv")[0]);
            // Remove the event registration from Document
            document.onkeypress = undefined;
        };

        TransactionSearchViewModel.prototype.cleanup = function () {
            var self = this;

            self.transactionSearchcriteriaViewModel.cleanup();
        };

        TransactionSearchViewModel.prototype.fillLocalStorage = function () {
            var self = this;
            var vbCurrentPage = 1;
            var soCurrentPage = 1;
            if (self.vbGridOptions.pagingOptions.currentPage() !== undefined) {
                vbCurrentPage = self.vbGridOptions.pagingOptions.currentPage();
            }
            if (self.soGridOptions.pagingOptions.currentPage() !== undefined) {
                soCurrentPage = self.soGridOptions.pagingOptions.currentPage();
            }
            var data = {
                isSalesOrder: self.searchType(),
                transactionSearch: self.transactionSearchcriteriaViewModel,
                soPageSize: self.soGridOptions.pagingOptions.pageSize(),
                soCurrentPage: soCurrentPage,
                vbPageSize: self.vbGridOptions.pagingOptions.pageSize(),
                vbCurrentPage: vbCurrentPage,
                invPageSize: self.invGridOptions.pagingOptions.pageSize(),
                invCurrentPage: self.invGridOptions.pagingOptions.currentPage(),
                tqPageSize: self.tqGridOptions.pagingOptions.pageSize(),
                tqCurrentPage: self.tqGridOptions.pagingOptions.currentPage(),
                soreportClick: self.soreportClick(),
                vbreportClick: self.vbreportClick(),
                inreportClick: self.inreportClick(),
                tqreportClick: self.tqreportClick()
            };

            var sosaveData = { PageSize: self.soGridOptions.pagingOptions.pageSize(), Filters: self.soSearchFilterItems };

            var sofilterDataToSave = { UserGridSetting: sosaveData, GridViewId: refEnums.Enums.FilterViewName.TransactionSearchSalesOrder, IsFilterApplied: self.SalesOrderContainer.reportColumnFilter.isFilterApply, GridSearchText: null, PageNo: self.soGridOptions.pagingOptions.currentPage(), SortCol: self.sortCol(), SortOrder: self.sorttype(), View: "SO" };
            var vbsaveData = { PageSize: self.vbGridOptions.pagingOptions.pageSize(), Filters: self.vbSearchFilterItems };
            var vbfilterDataToSave = { UserGridSetting: vbsaveData, GridViewId: refEnums.Enums.FilterViewName.TransactionSearchBill, IsFilterApplied: self.VendorBillOrPurchaseOrderContainer.reportColumnFilter.isFilterApply, GridSearchText: null, PageNo: self.vbGridOptions.pagingOptions.currentPage(), SortCol: self.sortCol(), SortOrder: self.sorttype(), View: "Bills" };

            var filterDataToSave = { soData: sofilterDataToSave, vbData: vbfilterDataToSave, SearchData: data };

            LocalStorageController.Set(self.localStorageKey(), filterDataToSave);
        };

        TransactionSearchViewModel.prototype.beforeBind = function () {
            var self = this;

            //_app.trigger("loadMyData", function (data) {
            //	if (data) {
            //		self.load(data);
            //	} else {
            //		//_app.trigger("closeActiveTab");
            //		//_app.trigger("NavigateTo", 'Home');
            //	}
            //});
            self.load();
        };

        TransactionSearchViewModel.prototype.compositionComplete = function () {
            var self = this;

            if (LocalStorageController.Get(self.localStorageKey())) {
                self.collapseView('collapseTransactionSearch');
                self.expandView('collapseSearchResults');
            } else {
                $('#collapseSearchResults').css("overflow", "hidden");
                self.collapseView('collapseSearchResults');
                self.expandView('collapseTransactionSearch');
            }
        };
        return TransactionSearchViewModel;
    })();

    return TransactionSearchViewModel;
});
