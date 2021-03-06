/// <reference path="localStorage/LocalStorage.ts" />
/// <reference path="../Scripts/Utility.ts" />
/// <reference path="config.ts" />
/// <reference path="../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../Scripts/Constants/ApplicationMessages.ts" />
/// <reference path="services/models/TypeDefs/CommonModels.d.ts" />
define(["require", "exports", 'config', 'plugins/router', 'durandal/app', 'durandal/system', 'services/client/CommonClient', 'services/client/UserClient', 'services/client/SalesOrderClient', 'services/models/common/Enums'], function(require, exports, ___config__, ___router__, ___app__, __refSystem__, __refCommon__, ___refUserClient__, ___refSalesOrderClient__, __refEnums__) {
    var _config = ___config__;
    var _router = ___router__;
    var _app = ___app__;
    var refSystem = __refSystem__;
    var refCommon = __refCommon__;
    var _refUserClient = ___refUserClient__;
    var _refSalesOrderClient = ___refSalesOrderClient__;
    var refEnums = __refEnums__;

    /*
    ** <summary>
    ** Shell class backbone of the Durandal routes for the application.
    ** </summary>
    ** <createDetails>
    ** <id></id> <by>ACHAL RASTOGI</by> <date>03-14-2014</date>
    ** </createDetails>
    ** <changeHistory>
    ** <id>US20352</id> <by>Chandan Singh Bajetha</by> <date>14-01-2016</date> <description>Acct: Adjust UI for Dispute Notes Tab in Vendor Bill</description>
    ** </changeHistory>
    */
    var shell = (function () {
        //#endregion
        function shell() {
            var _this = this;
            this.app = _app;
            this.config = new _config.Config();
            this.userClient = new _refUserClient.UserClient();
            this.salesOrderClient = new _refSalesOrderClient.SalesOrderClient();
            this.searchBtnClicked = ko.observable(false);
            this.MyAccountSubMenu = ko.observableArray([]);
            this.selectedMainMenu = ko.observable("Home");
            this.selectedSubMenuLink = ko.observable("");
            this.tabVisible = ko.observable(false);
            this.tabContainerList = ko.observableArray([]);
            this.showProgress = ko.observable(false);
            this.blockFullUI = ko.observable(false);
            this.currentUser = ko.observable();
            this.showContentProgress = ko.observable(false);
            this.logicalResources = {};
            this.shipmentItemTypes = ko.observableArray([]);
            this.billStatusList = ko.observableArray([]);
            // ###START: US20352
            this.salesOrderStatusTypes = ko.observableArray([]);
            // ###END: US20352
            this.typeList = ko.observableArray([]);
            this.invoiceStatusList = ko.observableArray([]);
            this.modeList = ko.observableArray([]);
            this.transactionSearchDropdownList = ko.observableArray([]);
            this.classTypesAndPackageTypes = ko.observable();
            this.OrderStatusListForSOEntry = ko.observableArray([]);
            this.InvoiceStatusListForSOEntry = ko.observableArray([]);
            this.SalesOrderServiceTypeList = ko.observableArray([]);
            this.SalesOrderShipViaList = ko.observableArray([]);
            this.isBIDirtyChanges = ko.observable(false);
            this.isWorkingDay = ko.observable(false);
            this.gettabListByName = null;
            this.isGlobalSearch = ko.observable(false);
            this.isDenimBackground = ko.observable(false);
            // Global Transaction Search option
            this.globalSearchOptions = {
                minLength: 3,
                displaykey: "Display",
                isCategorizedResult: true,
                items: 20,
                throttle: true,
                templates: [
                    { name: 'Vendor Bill', header: '<span class="padding-global-search-VB">Vendor Bill</span>', slicecount: 3, moreresult: '<a href="#">All Vendor Bill Results<span class="greatericon">&nbsp;&rsaquo;&rsaquo;</span></a>' },
                    { name: 'Sales Order', header: '<span class="padding-global-search-SO">Sales Order</span>', slicecount: 3, moreresult: '<a href="#">All Sales Order Results<span class="greatericon">&nbsp;&rsaquo;&rsaquo;</span></a>' },
                    { name: 'EDI', header: '<span class="padding-global-search-EDI">EDI</span>', slicecount: 3, moreresult: '<a href="#">All EDI Results<span class="greatericon">&nbsp;&rsaquo;&rsaquo;</span></a>' }
                ],
                filteredDisplayKey: 'FilterDisplay'
            };
            this.checkMsgDisplay = true;
            var self = this;
            self.router = _router;
            self.ROUTE_VENDORBILL_DETAILS = "VendorBillDetails";
            self.ROUTE_PURCHASEORDER_DETAILS = "PurchaseOrderDetails";
            self.ROUTE_HISTORY_DETAILS = "HistoryDetails";
            self.ROUTE_SALES_ORDER = "SalesOrderDetails";
            self.ROUTE_INVOICE = "Invoice";
            self.ROUTE_SearchResult = "SearchResult";
            self.ROUTE_REXNORD_BOARD = "RexnordBoard";
            self.ROUTE_REXNORD_BOARD_MAPPING = "RexnordBoardMapping";
            self.ROUTE_PURCHASE_ORDER_BOARD = "PurchaseOrderBoard";
            self.SALES_ORDER_ENTRY = "salesOrderEntry";
            self.ROUTE_REBILL = "Rebill";
            self.ROUTE_SALES_ORDER_HISTORY_DETAILS = "SalesOrderHistoryHeaderDetails";
            self.ROUTE_PRINTBOL = 'PrintBol';
            self.ROUTE_TRANSACTION_SEARCH = "TransactionSearch";
            self.ROUTE_EDI210_BOARD = 'Edi210CarrierException';
            self.selectedThemeName = ko.observable('');
            self.beforeBind = function () {
                //added to prevent dropdown shadow when pages gets reloaded.
                /*jQuery('#Shipments').attr("data-toggle", "");*/
                jQuery('#Home').attr("data-toggle", "");
                jQuery('#Admin').attr("data-toggle", "");
                jQuery('#Reports').attr("data-toggle", "");

                if (self.router.activeRouteInstruction()) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;

                    if (currentActiveRoute) {
                        var isVendorBillMenu = currentActiveRoute.settings != null && (currentActiveRoute.settings.VendorBill || currentActiveRoute.title === self.ROUTE_VENDORBILL_DETAILS), isPurchaseOrderMenu = currentActiveRoute.settings != null && (currentActiveRoute.settings.PurchaseOrder || currentActiveRoute.title === self.ROUTE_PURCHASEORDER_DETAILS), isSalesOrderMenu = currentActiveRoute.settings != null && (currentActiveRoute.settings.SalesOrder || currentActiveRoute.title === self.ROUTE_SALES_ORDER), parentName = 'parent';

                        ko.utils.arrayForEach(self.tabContainerList(), function (tab) {
                            tab.cssActive(false);
                            if (tab.parent && parentName === tab.parent) {
                                tab.showTabHeader(true);
                            } else {
                                tab.showTabHeader(false);
                            }
                        });

                        var currentActiveItem = self.activeItem();
                        if (currentActiveItem) {
                            currentActiveItem.cssActive(true);
                            self.tabVisible(currentActiveItem.settings.allowTab);
                        } else {
                            var filterResult = self.filterRoute(currentActiveRoute.route);
                            if (filterResult) {
                                var items = self.getTabItems(currentActiveRoute.title);
                                if (items.length === 0 || !isVendorBillMenu) {
                                    self.tabContainerList.removeAll();
                                    self.initialTab();
                                    self.tabContainerList.push({
                                        tab: filterResult.route,
                                        header: ko.observable(filterResult.title),
                                        tabId: filterResult.route + filterResult.settings.itemId,
                                        cssActive: ko.observable(true),
                                        moduleId: filterResult.moduleId,
                                        settings: filterResult.settings,
                                        showTabHeader: ko.observable(filterResult.settings.allowTab),
                                        parent: parentName,
                                        pageLoader: ko.observable(false),
                                        headerDisplay: ko.computed(function () {
                                            if (filterResult.title.length > 15) {
                                                return filterResult.title.substring(0, 13) + "..";
                                            }

                                            return filterResult.title;
                                        })
                                    });
                                    self.tabVisible(filterResult.settings.allowTab);
                                }
                            }
                        }

                        var activeRoute = self.router.activeItem();
                        if (activeRoute) {
                            if (activeRoute.beforeBind) {
                                activeRoute.beforeBind(arguments[0], arguments[1], arguments[2]);
                            }
                        }
                        var currentMainMenu = '';
                        if (currentActiveRoute.settings.VendorBill || isVendorBillMenu) {
                            currentMainMenu = 'Vendor Bill';
                        } else if (currentActiveRoute.settings.PurchaseOrder || isPurchaseOrderMenu) {
                            currentMainMenu = 'Unmatched Vendor Bill';
                        } else if (currentActiveRoute.settings.Reports) {
                            currentMainMenu = 'Reports';
                        } else if (currentActiveRoute.settings.Carrier) {
                            currentMainMenu = 'Carrier';
                        } else if (currentActiveRoute.settings.Board) {
                            currentMainMenu = 'Board';
                        } else if (currentActiveRoute.settings.SalesOrder || isSalesOrderMenu) {
                            currentMainMenu = 'Sales Order';
                        } else if (currentActiveRoute.settings.Search) {
                            currentMainMenu = 'Transaction Search';
                        } else if (currentActiveRoute.settings.Admin) {
                            currentMainMenu = 'Admin';
                        } else {
                            currentMainMenu = currentActiveRoute.route;
                        }

                        self.selectedMainMenu(currentMainMenu);

                        if (currentActiveRoute.settings.isDenimBackground) {
                            self.isDenimBackground(true);
                        } else {
                            self.isDenimBackground(false);
                        }

                        self.ChangeIconsBasedOnThemes(currentMainMenu);
                    }
                }

                return true;
            };

            self.getThemeName = function () {
                var regex = /theme/;
                var themeFromLink = $("body> link").attr("href");
                var themeName = themeFromLink.substring(themeFromLink.lastIndexOf('/') + 1);
                return themeName;
            };

            //#region Subscribing to an app-wide message.
            self.subscriptionOnShowOrHideProgressBar = this.app.on('ShowOrHideProgressBar').then(function (showProgress, blockFullUI) {
                self.showProgress(showProgress);
                if (refSystem.isBoolean(blockFullUI)) {
                    self.blockFullUI(blockFullUI);
                }
            });

            self.subscriptionOnShowOrHideAjaxLoader = this.app.on('ShowOrHideAjaxLoader').then(function (showProgress, blockFullUI, ElementId) {
                //if (showProgress && refSystem.isBoolean(blockFullUI) && blockFullUI) {
                //	AjaxLoader.AjaxLoader.prototype.ajaxLoader(ElementId, blockFullUI);
                //	return
                //}
                //else if (showProgress) {
                //	AjaxLoader.AjaxLoader.prototype.ajaxLoader(ElementId);
                //}
                //else if (!showProgress) {
                //	AjaxLoader.AjaxLoader.prototype.remove(ElementId);
                //}
            });

            self.subscriptionToGetCurrentUserDetails = this.app.on('GetCurrentUserDetails').then(function (callback) {
                callback(self.currentUser());
            });

            self.subscriptionGetItemsTypes = this.app.on('GetItemsTypes').then(function (callback) {
                callback(self.shipmentItemTypes());
            });

            self.subscriptionGetStatusList = this.app.on('GetStatusList').then(function (callback) {
                callback(self.billStatusList());
            });

            // ###START: US20352
            self.subscriptionGetDisputeStatusList = this.app.on('GetDisputeStatusList').then(function (callback) {
                callback(self.salesOrderStatusTypes());
            });

            // ###END: US20352
            self.subscriptionStatusListForTransactionSearch = this.app.on('GetStatusListForTransactionSearch').then(function (callback) {
                callback(self.transactionSearchDropdownList());
            });

            self.subscriptionGetClassTypesAndPackageTypes = this.app.on('GetClassTypesAndPackageTypes').then(function (callback) {
                callback(self.classTypesAndPackageTypes());
            });

            self.subscriptionOrderStatusListSOEntry = this.app.on('GetOrderStatusListForSOEntry').then(function (callback) {
                callback(self.OrderStatusListForSOEntry());
            });
            self.subscriptionInvoiceStatusListSOEntry = this.app.on('GetInvoiceStatusListForSOEntry').then(function (callback) {
                callback(self.InvoiceStatusListForSOEntry());
            });

            self.subscriptionSalesOrderServiceTypeList = this.app.on('GetSalesOrderServiceTypeList').then(function (callback) {
                callback(self.SalesOrderServiceTypeList());
            });

            self.subscriptionShipViaList = this.app.on('GetSalesOrderShipViaList').then(function (callback) {
                callback(self.SalesOrderShipViaList());
            });

            self.subscriptionOnCloseActiveTab = this.app.on('closeActiveTab').then(function () {
                var currentActiveItem = self.activeItem();
                if (currentActiveItem) {
                    var currentActiveTab = self.getTabFirstItem(true, 'cssActive'), currentTab = self.getTabFirstItem(currentActiveItem.tabId, 'tabId');

                    self.tabContainerList.remove(function (tab) {
                        return tab === currentTab && tab.tab !== "Home";
                    });

                    //#region Deleting the current/active route(s)
                    /* Deleting the current/active tab route(s) which are created dynamically.*/
                    var routesToBeRemoved = new Array();
                    if (currentTab.settings.VendorBill) {
                        if (currentTab.tab === 'Entry') {
                            if (currentTab.settings.itemId !== 3) {
                                routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                    return item.settings === currentTab.settings;
                                });
                            }
                        } else if (currentTab.tab === 'VendorBillEdit') {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        } else if (currentTab.tab === 'Exception') {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        }
                    } else if (currentTab.tab === self.ROUTE_VENDORBILL_DETAILS) {
                        routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                            return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                        });
                    } else if (currentTab.settings.PurchaseOrder) {
                        if (currentTab.tab === 'PurchaseOrderEdit') {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        } else if (currentTab.tab === 'PurchaseOrderBoard') {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        }
                    } else if (currentTab.tab === self.ROUTE_PURCHASEORDER_DETAILS) {
                        routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                            return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                        });
                    }

                    if (routesToBeRemoved.length) {
                        self.router.routes.removeAll(routesToBeRemoved);
                    }

                    if (_this.tabContainerList().length > 0) {
                        var activeItems = $.grep(_this.tabContainerList(), function (items) {
                            return items.tab !== "Home";
                        });

                        if (activeItems.length === 0) {
                            var tabNeedToBeActive;
                            var existingTabItems;
                            existingTabItems = self.getTabItems('Home', 'tab');
                            tabNeedToBeActive = existingTabItems[existingTabItems.length - 1];
                            tabNeedToBeActive.cssActive(false);
                            self.setTabActive(tabNeedToBeActive);
                        }
                    }
                }
            });

            self.subscriptionOnViewAttached = this.app.on('viewAttached').then(function () {
                /*Setting the page loader and blank UI to false*/
                var currentActiveItem = self.activeItem();
                if (currentActiveItem) {
                    currentActiveItem.pageLoader(false);
                }
                self.showContentProgress(false);
            });

            self.subscriptionToOpenVendorBill = this.app.on('openVendorBill').then(function (vendorBillId, proNumber, vendorBillOrderCallback, isSubBill, isException, isLostBill) {
                if (typeof isSubBill === "undefined") { isSubBill = false; }
                if (typeof isException === "undefined") { isException = false; }
                if (typeof isLostBill === "undefined") { isLostBill = false; }
                var vendorBillAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "VB #" + proNumber && (self.tabContainerList()[i].uniqueId() !== undefined && self.tabContainerList()[i].uniqueId() === vendorBillId)) {
                        vendorBillAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === proNumber && (tabItem.uniqueId() !== undefined && tabItem.uniqueId() === vendorBillId)) {
                        vendorBillAlreadyOpened = true;
                    }
                });

                if (!vendorBillAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_VENDORBILL_DETAILS, parentName, vendorBillId, proNumber, isSubBill, isException, isLostBill);

                            if (refSystem.isFunction(vendorBillOrderCallback)) {
                                vendorBillOrderCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(vendorBillOrderCallback)) {
                                vendorBillOrderCallback(false);
                            }

                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            self.subscriptionOnLoadMyData = this.app.on('loadMyData').then(function (callback, containerFlag, key) {
                if (containerFlag) {
                    var fetchedItem;
                    var financialData = ko.utils.arrayFirst(self.CommonContainer, function (item) {
                        fetchedItem = item;
                        return item.key === key;
                    });
                    ko.utils.arrayRemoveItem(self.CommonContainer, fetchedItem);
                    callback(financialData);
                } else {
                    var currentActiveItem = self.activeItem();
                    if (currentActiveItem) {
                        if (currentActiveItem.data) {
                            callback(typeof currentActiveItem.data === 'function' ? currentActiveItem.data() : currentActiveItem.data);
                        } else {
                            callback(undefined);
                        }
                    }
                }
            });

            /**
            * Event to register the data of current active tab.
            * Trigger this event in your view model inside {deactivate} method / when and where you want to store the data to tab container.
            * registerMyData Call back function details
            * @param {any} data pass the data which you want to register.
            * @param {boolean} deleteAllAndAdd to decide to delete all existing item and add or add the data as new item for the current route. Default = false. pass true when you want to delete and add.
            * @param {boolean} containerFlag set true to update the existing data / add the new item in the container for a particular key. Default = false.
            * @param {string} containerKey key for the given data.
            */
            self.subscriptionOnRegisterMyData = this.app.on('registerMyData').then(function (data, deleteAllAndAdd, containerFlag, containerKey) {
                if (containerFlag) {
                    /// common container object which can hold any data along with key value. can be used wherever data transfer between pages is required
                    var obj = { key: containerKey, value: data };

                    var financialData = ko.utils.arrayFirst(self.CommonContainer, function (item) {
                        return item.key === containerKey;
                    });
                    if (financialData) {
                        financialData.value = data;
                    } else {
                        self.CommonContainer.push(obj);
                    }
                } else {
                    var currentActiveItem = self.activeItem();
                    if (currentActiveItem) {
                        if (currentActiveItem.data && !deleteAllAndAdd) {
                            var dataKeys = null, myData = data;
                            if (typeof currentActiveItem.data === 'function') {
                                if (currentActiveItem.data()) {
                                    dataKeys = Object.keys(currentActiveItem.data());
                                }
                            } else if (typeof currentActiveItem.data === 'object') {
                                dataKeys = Object.keys(currentActiveItem.data);
                            }
                            if (dataKeys) {
                                for (var i = 0; i < dataKeys.length; i++) {
                                    var key = dataKeys[i];
                                    if (data[key]) {
                                        myData[key] = data[key];
                                    } else {
                                        var activeData = null;
                                        if (typeof currentActiveItem.data === 'function') {
                                            activeData = currentActiveItem.data();
                                        } else if (typeof currentActiveItem.data === 'object') {
                                            activeData = currentActiveItem.data;
                                        }
                                        myData[key] = activeData[key];
                                    }
                                }
                            }
                            currentActiveItem.data = ko.observable(myData);
                        } else {
                            currentActiveItem.data = ko.observable(data);
                        }
                    }
                }
            });

            self.subscriptionOnIsBiDirtyChange = this.app.on('IsBIDirtyChange').then(function (data, deleteAllAndAdd, containerFlag, containerKey) {
                self.isBIDirtyChanges(data);
            });

            self.subscriptionStatusOfLoginDay = this.app.on('IsTodayHoliday').then(function (callback) {
                callback(self.isWorkingDay());
            });

            /** Event to open duplicate tab
            */
            self.subscriptionOnDuplicateTab = this.app.on('openDuplicateTab').then(function (name, parentName, vendorBillId) {
                self.addDuplicateTab(name, parentName, vendorBillId);
            });

            self.subscriptionOpenTransactionTab = this.app.on('openTransactionSearchTab').then(function () {
                var logicalResourcesArray = $.map(self.logicalResources, function (value, index) {
                    return [value];
                });

                var isAR = $.grep(logicalResourcesArray, function (item) {
                    return item.ResourceName === "Show Transaction Search As First Page";
                });
                if (isAR.length > 0) {
                    var filterResult = _this.filterRoute(self.ROUTE_TRANSACTION_SEARCH);

                    self.createNewTab(filterResult.route, filterResult.title, filterResult.moduleId, filterResult.settings, filterResult.hash);
                }
            });

            self.subscriptionShowGlobalSearch = this.app.on('showGlobalSearch').then(function () {
                var logicalResourcesArray = $.map(self.logicalResources, function (value, index) {
                    return [value];
                });

                var isSearch = $.grep(logicalResourcesArray, function (item) {
                    return item.ResourceName === "Access Global Search";
                });
                if (isSearch.length == 0) {
                    self.isGlobalSearch(false);
                } else {
                    self.isGlobalSearch(true);
                }
            });

            self.subscriptionOpenPurchaseOrder = this.app.on('openPurchaseOrder').then(function (vendorBillId, proNumber, purchaseOrderCallback) {
                var purchaseOrderAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    //To remove PURGE From the header and Pro Number
                    var header = self.tabContainerList()[i].header().replace(" PURGE", "");
                    var prono = "UVB #" + proNumber;
                    prono = prono.replace(" PURGE", "");

                    if (header === prono && (self.tabContainerList()[i].uniqueId() !== undefined && self.tabContainerList()[i].uniqueId() === vendorBillId)) {
                        purchaseOrderAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === proNumber) {
                        purchaseOrderAlreadyOpened = true;
                    }
                });

                if (!purchaseOrderAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_PURCHASEORDER_DETAILS, parentName, vendorBillId, proNumber);

                            if (refSystem.isFunction(purchaseOrderCallback)) {
                                purchaseOrderCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(purchaseOrderCallback)) {
                                purchaseOrderCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            self.subscriptionOpenEdi210Board = this.app.on('openEdi210Board').then(function (exceptionType, ediDetailId, batchId, proNumber, edi210OrderCallback) {
                var edi210ItemAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    //To remove PURGE From the header and Pro Number
                    var header = self.tabContainerList()[i].header();
                    var prono = "EDI210 #" + ediDetailId;

                    if (header === prono) {
                        edi210ItemAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === ediDetailId) {
                        edi210ItemAlreadyOpened = true;
                    }
                });

                if (!edi210ItemAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_EDI210_BOARD, parentName, ediDetailId, proNumber);
                            var filterResult = _this.filterRoute(self.ROUTE_EDI210_BOARD);
                            var parentName = 'parent';

                            var data = {
                                //isLoaded: self.isLoaded(),
                                ExceptionRuleId: exceptionType,
                                EdiDetailId: ediDetailId,
                                BatchId: batchId
                            };

                            LocalStorageController.Set('EDI210ExceptionDetailsFromSuperSearch', data);

                            if (refSystem.isFunction(edi210OrderCallback)) {
                                edi210OrderCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(edi210OrderCallback)) {
                                edi210OrderCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
                //var filterResult: DurandalRouteConfiguration = this.filterRoute(self.ROUTE_EDI210_BOARD);
                //var parentName: string = 'parent';
                //var data = {
                //	//isLoaded: self.isLoaded(),
                //	ExceptionRuleId: exceptionType,
                //	EdiDetailId: ediDetailId,
                //	BatchId: batchId
                //}
                //LocalStorageController.Set('EDI210ExceptionDetailsFromSuperSearch', data);
                ////self.addDuplicateTab(self.ROUTE_EDI210_BOARD, parentName, exceptionType, ediDetailId);
                //self.createNewTab(filterResult.route, filterResult.title, filterResult.moduleId, filterResult.settings, filterResult.hash);
            });

            self.subscriptionOpenHistoryDetails = this.app.on('openHistoryDetails').then(function (vendorBillId, proNumber, historyDetailsCallback) {
                var isHistoryDetailsAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "History #" + proNumber) {
                        isHistoryDetailsAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === proNumber) {
                        isHistoryDetailsAlreadyOpened = true;
                    }
                });

                if (!isHistoryDetailsAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_HISTORY_DETAILS, parentName, vendorBillId, proNumber);

                            if (refSystem.isFunction(historyDetailsCallback)) {
                                historyDetailsCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(historyDetailsCallback)) {
                                historyDetailsCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            // to open sales order
            self.subscriptionOpenSalesOrder = this.app.on('openSalesOrder').then(function (salesOrderId, bolNumber, salesOrderCallback, isSubOrder) {
                if (typeof isSubOrder === "undefined") { isSubOrder = false; }
                var isSalesOrderAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "SO #" + bolNumber) {
                        isSalesOrderAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === bolNumber) {
                        isSalesOrderAlreadyOpened = true;
                    }
                });

                if (!isSalesOrderAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_SALES_ORDER, parentName, salesOrderId, bolNumber, isSubOrder);

                            if (refSystem.isFunction(salesOrderCallback)) {
                                salesOrderCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(salesOrderCallback)) {
                                salesOrderCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            // to open Rebill Tab
            self.subscriptionOpenRebill = this.app.on('openRebill').then(function (salesOrderId, salesOrderCallback) {
                var isRebillAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "Rebill #" + salesOrderId) {
                        isRebillAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === salesOrderId) {
                        isRebillAlreadyOpened = true;
                    }
                });

                if (!isRebillAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_REBILL, parentName, salesOrderId);

                            if (refSystem.isFunction(salesOrderCallback)) {
                                salesOrderCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(salesOrderCallback)) {
                                salesOrderCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            // to open invoice
            self.subscriptionOpenInvoice = this.app.on('openInvoice').then(function (bolNumber, invoiceNumber, salesOrderCallback) {
                var isInvoiceOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "IN #" + invoiceNumber) {
                        isInvoiceOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === invoiceNumber) {
                        isInvoiceOpened = true;
                    }
                });

                if (!isInvoiceOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_INVOICE, parentName, bolNumber, invoiceNumber);

                            if (refSystem.isFunction(salesOrderCallback)) {
                                salesOrderCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(salesOrderCallback)) {
                                salesOrderCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };
                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            self.subscriptionOpenTransactionSearchResult = this.app.on('openTransactionSearchResult').then(function (searchValue, searchResultCallback) {
                var isSearchResultOpened = false;

                if (searchValue.category == "MoreResult") {
                    for (var i = 0; i < self.tabContainerList().length; i++) {
                        if (self.tabContainerList()[i].header() === "Search Result") {
                            isSearchResultOpened = true;

                            //self.closeTab(self.tabContainerList()[i].tabId, "Search Result");
                            self.tabContainerList()[i].data.query = searchValue.query;
                            self.setTabActive(self.tabContainerList()[i]);
                            break;
                        }
                    }

                    self.tabContainerList().forEach(function (tabItem) {
                        if (tabItem.header() === "Search Result") {
                            isSearchResultOpened = true;
                            //self.closeTab(tabItem.tabId, "Search Result");
                        }
                    });
                } else {
                    for (var i = 0; i < self.tabContainerList().length; i++) {
                        if (self.tabContainerList()[i].header() === searchValue.category + " Result") {
                            isSearchResultOpened = true;

                            //self.closeTab(self.tabContainerList()[i].tabId, searchValue.category + " Result");
                            self.tabContainerList()[i].data.query = searchValue.query;
                            self.setTabActive(self.tabContainerList()[i]);
                            break;
                        }
                    }

                    self.tabContainerList().forEach(function (tabItem) {
                        if (tabItem.header() === searchValue.category + " Result") {
                            isSearchResultOpened = true;
                            //self.closeTab(tabItem.tabId, searchValue.category + " Result");
                        }
                    });
                }

                if (!isSearchResultOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_SearchResult, parentName, searchValue);

                            if (refSystem.isFunction(searchResultCallback)) {
                                searchResultCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(searchResultCallback)) {
                                searchResultCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };
                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            // to open Rexnord
            self.subscriptionOpenRexnordBoard = this.app.on('openRexnordBoard').then(function () {
                var filterResult = _this.filterRoute(self.ROUTE_REXNORD_BOARD);

                self.createNewTab(filterResult.route, filterResult.title, filterResult.moduleId, filterResult.settings, filterResult.hash);
            });

            // to open Rexnord Board Mapping
            self.subscriptionOpenRexnordBoard = this.app.on('openRexnordBoardMapping').then(function () {
                var filterResult = _this.filterRoute(self.ROUTE_REXNORD_BOARD_MAPPING);

                self.createNewTab(filterResult.route, "Mapped Companies", filterResult.moduleId, filterResult.settings, filterResult.hash);
            });

            // to open PO Board
            self.subscriptionOpenBoard = this.app.on('openPurchaseOrderBoard').then(function () {
                var filterResult = _this.filterRoute(self.ROUTE_PURCHASE_ORDER_BOARD);

                self.createNewTab(filterResult.route, filterResult.title, filterResult.moduleId, filterResult.settings, filterResult.hash);
            });

            self.subscriptionOnNavigation = this.app.on('NavigateTo').then(function (routeName) {
                if (routeName) {
                    var routeInConfig = self.filterRoute(routeName);
                    if (routeInConfig) {
                        self.createNewTab(routeInConfig.route, routeInConfig.title, routeInConfig.moduleId, routeInConfig.settings, routeInConfig.hash);
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });

            self.subscriptionOpenSalesOrderHistoryDetails = this.app.on('openSalesOrderHistoryDetails').then(function (salesOrderId, historyDetailsCallback) {
                var isHistoryDetailsAlreadyOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "History #" + salesOrderId) {
                        isHistoryDetailsAlreadyOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === salesOrderId) {
                        isHistoryDetailsAlreadyOpened = true;
                    }
                });

                if (!isHistoryDetailsAlreadyOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_SALES_ORDER_HISTORY_DETAILS, parentName, salesOrderId, salesOrderId.toString());

                            if (refSystem.isFunction(historyDetailsCallback)) {
                                historyDetailsCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(historyDetailsCallback)) {
                                historyDetailsCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };

                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            // to open invoice
            self.subscriptionOpenPrintBOL = this.app.on('openPrintBOL').then(function (bolNumber, customerBolNumber, salesOrderPrintBolCallback) {
                var isPrintBolOpened = false;

                for (var i = 0; i < self.tabContainerList().length; i++) {
                    if (self.tabContainerList()[i].header() === "BOL #" + bolNumber) {
                        isPrintBolOpened = true;
                        self.setTabActive(self.tabContainerList()[i]);
                        break;
                    }
                }

                self.tabContainerList().forEach(function (tabItem) {
                    if (tabItem.header() === bolNumber) {
                        isPrintBolOpened = true;
                    }
                });

                if (!isPrintBolOpened) {
                    var currentActiveRoute = self.router.activeRouteInstruction().config;
                    if (currentActiveRoute) {
                        var parentName = 'parent';
                        if (self.getTabItems(parentName, 'parent').length < (Utils.Constants.DefaultTabCounts)) {
                            self.showContentProgress(true);
                            self.addDuplicateTab(self.ROUTE_PRINTBOL, parentName, bolNumber, customerBolNumber);

                            if (refSystem.isFunction(salesOrderPrintBolCallback)) {
                                salesOrderPrintBolCallback(true);
                            }
                        } else {
                            if (refSystem.isFunction(salesOrderPrintBolCallback)) {
                                salesOrderPrintBolCallback(false);
                            }
                            if (self.checkMsgDisplay) {
                                self.checkMsgDisplay = false;
                                var toastrOptions = {
                                    toastrPositionClass: "toast-top-middle",
                                    delayInseconds: 15,
                                    fadeOut: 15,
                                    typeOfAlert: "",
                                    title: ""
                                };
                                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                            }
                        }
                    }
                } else {
                    return false;
                }

                return false;
            });

            //#endregion Subscribing to an app-wide message.
            self.getDefaultItemFromConfig = function (itemId, title) {
                return ko.utils.arrayFirst(_this.config.routes, function (item) {
                    return (item.settings.itemId === itemId && item.route === title);
                });
            };

            refCommon.Common.prototype.GetCurrentUser(function (data) {
                self.currentUser(data);
            }, function () {
                console.log('Error in Ajax Call Method: GetCurrentUser()');
            });

            self.welcomeNote = ko.computed(function () {
                if (refSystem.isObject(self.currentUser())) {
                    return self.currentUser().FullName;
                }
                return 'Welcome';
            });

            // Get all the item types
            refCommon.Common.prototype.GetListShipmentType(function (data) {
                if (data) {
                    self.shipmentItemTypes.removeAll();
                    self.shipmentItemTypes.push.apply(self.shipmentItemTypes, data);
                }
            });

            refCommon.Common.prototype.GetVendorBillStatusList(function (data) {
                if (data) {
                    self.billStatusList.removeAll();
                    self.billStatusList.push.apply(self.billStatusList, data);
                }
            });

            // ###START: US20352
            refCommon.Common.prototype.GetListDisputeStatus(function (disputeData) {
                if (disputeData) {
                    self.salesOrderStatusTypes.removeAll();
                    self.salesOrderStatusTypes.push.apply(self.salesOrderStatusTypes, disputeData);
                }
            });

            // ###END: US20352
            refCommon.Common.prototype.GetEnums(function (data) {
                if (data) {
                    self.classTypesAndPackageTypes(data);
                }
            });

            refCommon.Common.prototype.IsHoliday(function (data) {
                if (data) {
                    self.isWorkingDay(data);
                }
            });

            refCommon.Common.prototype.getStatusListForTransactionSearch(function (data) {
                if (data) {
                    // bind transaction search type list
                    self.transactionSearchDropdownList(data);
                }
            });

            self.salesOrderClient.getSalesOrderStatusForEntry(function (data) {
                if (data) {
                    self.OrderStatusListForSOEntry(data);
                }
            });

            self.salesOrderClient.getSalesOrderInvoiceStatusList(function (data) {
                if (data) {
                    self.InvoiceStatusListForSOEntry(data);
                }
            });

            self.salesOrderClient.getSalesOrderCarrierServiceTypeList(function (data) {
                if (data) {
                    self.SalesOrderServiceTypeList(data);
                }
            });

            self.salesOrderClient.getSalesOrderShipViaList(function (data) {
                if (data) {
                    self.SalesOrderShipViaList(data);
                }
            });

            self.accountName = ko.computed(function () {
                return 'ACCOUNTING CENTER';
            });

            self.Logout = function () {
                self.deactivate();
                var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

                ajax.get('logoff').done(function (data) {
                    console.log(data);
                    if (data) {
                        var url = window.location.toString();
                        if (url.indexOf('#') != -1) {
                            url = url.substring(0, url.indexOf('#'));
                        }
                        window.location.replace(url);

                        _app.trigger("ChatSignOut", function () {
                            return true;
                        });
                        return true;
                    }
                    return true;
                }).fail(function (arg) {
                    return false;
                });
            };

            self.getSubMenuListByTitle = function (title) {
                switch (title) {
                    case 'Vendor Bill':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.VendorBill;
                        }));
                        break;
                    case 'Unmatched Vendor Bill':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.PurchaseOrder;
                        }));
                        break;
                    case 'Sales Order':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.SalesOrder;
                        }));
                        break;
                    case 'Reports':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.Reports;
                        }));
                        break;
                    case 'Carrier':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.Carrier;
                        }));
                        break;
                    case 'Board':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.Board;
                        }));
                        break;
                    case 'MyAccount':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.MyAccount;
                        }));
                        break;
                    case 'Admin':
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.Admin;
                        }));
                        break;
                    default:
                        return ko.observableArray(self.router.routes.filter(function (r) {
                            return r.settings.dashboard;
                        }));
                        break;
                }
            };

            self.setTabActive = function (newTab) {
                var url = null;
                self.Changestab = newTab;
                if (self.isBIDirtyChanges() === true && self.isBIDirtyChanges() !== undefined) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var actionButtons = [];
                        actionButtons.push({
                            actionButtonName: "Yes",
                            actionClick: self.unSavedChanges
                        });

                        actionButtons.push({
                            actionButtonName: "No",
                            actionClick: self.unSavedChangesNoClick
                        });

                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 0,
                            fadeOut: 0,
                            typeOfAlert: "",
                            title: "",
                            actionButtons: actionButtons
                        };

                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.ChangesMadeMessage, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                } else {
                    if (!newTab.cssActive()) {
                        ko.utils.arrayForEach(self.tabContainerList(), function (tab) {
                            tab.cssActive(false);
                        });
                        newTab.cssActive(true);
                        url = (newTab.settings.itemId === 3 || newTab.settings.itemId === 4 || newTab.settings.itemId === 5 || newTab.settings.itemId === 6 || newTab.settings.itemId === 8 || newTab.settings.itemId === 9 || newTab.settings.itemId === 10 || newTab.settings.itemId === 11 || newTab.settings.itemId === 12 || newTab.settings.itemId === 13 || newTab.settings.itemId === 14 || newTab.settings.itemId === 15 || newTab.settings.itemId === 16 || newTab.settings.itemId === 17 || newTab.settings.itemId === 18 || newTab.settings.itemId === 19 || newTab.settings.itemId === 20 || newTab.settings.itemId === 21 || newTab.settings.itemId === 23 || newTab.settings.itemId === 24 || newTab.settings.itemId === 26 || newTab.settings.itemId === 27 || newTab.settings.itemId === 28 || newTab.settings.itemId === 29 || newTab.settings.itemId === 30 || newTab.settings.itemId === 31 || newTab.settings.itemId === 32 || newTab.settings.itemId === 33 || newTab.settings.itemId === 34 || newTab.settings.itemId === 35 || newTab.settings.itemId === 36 || newTab.settings.itemId === 37 || newTab.settings.itemId === 38 || newTab.settings.itemId === 39 || newTab.settings.itemId === 40 || newTab.settings.itemId === 41 || newTab.settings.itemId === 42 || newTab.settings.itemId === 43 || newTab.settings.itemId === 44 || newTab.settings.itemId === 45 || newTab.settings.itemId === 46 || newTab.settings.itemId === 47 || newTab.settings.itemId === 48 || newTab.settings.itemId === 49 || newTab.settings.itemId === 50 || newTab.settings.itemId === 51 || newTab.settings.itemId === 52 || newTab.settings.itemId === 53 || newTab.settings.itemId === 25) ? newTab.tab : newTab.tabId;
                        self.router.navigate('#/' + url);
                    }
                }
            };

            self.gettabListByName = function (subMenuTitle, mainMenuTitle) {
                //if (mainMenuTitle === 'Vendor Bill' && subMenuTitle === 'Entry') {
                //	return self.getTabItems(subMenuTitle, 'tab');
                //}
                //else {
                return [];
                //}
            };

            self.navigateOnMouseClick = function (routeConfig) {
                if (routeConfig.title === 'Home') {
                    self.createNewTab(routeConfig.route, routeConfig.title, routeConfig.moduleId, routeConfig.settings, routeConfig.hash);
                }
            };

            // for Unsaved Changes
            self.unSavedChanges = function () {
                var url = null;
                self.checkMsgDisplay = true;
                if (!self.Changestab.cssActive()) {
                    ko.utils.arrayForEach(self.tabContainerList(), function (tab) {
                        tab.cssActive(false);
                    });
                    self.Changestab.cssActive(true);
                    url = (self.Changestab.settings.itemId === 3 || self.Changestab.settings.itemId === 4 || self.Changestab.settings.itemId === 5 || self.Changestab.settings.itemId === 6 || self.Changestab.settings.itemId === 8 || self.Changestab.settings.itemId === 9 || self.Changestab.settings.itemId === 10 || self.Changestab.settings.itemId === 11 || self.Changestab.settings.itemId === 12 || self.Changestab.settings.itemId === 13 || self.Changestab.settings.itemId === 14 || self.Changestab.settings.itemId === 15 || self.Changestab.settings.itemId === 16 || self.Changestab.settings.itemId === 17 || self.Changestab.settings.itemId === 18 || self.Changestab.settings.itemId === 19 || self.Changestab.settings.itemId === 20 || self.Changestab.settings.itemId === 21 || self.Changestab.settings.itemId === 23 || self.Changestab.settings.itemId === 24 || self.Changestab.settings.itemId === 26 || self.Changestab.settings.itemId === 27 || self.Changestab.settings.itemId === 28 || self.Changestab.settings.itemId === 29 || self.Changestab.settings.itemId === 30 || self.Changestab.settings.itemId === 31 || self.Changestab.settings.itemId === 32 || self.Changestab.settings.itemId === 33 || self.Changestab.settings.itemId === 34 || self.Changestab.settings.itemId === 35 || self.Changestab.settings.itemId === 36 || self.Changestab.settings.itemId === 37 || self.Changestab.settings.itemId === 38 || self.Changestab.settings.itemId === 39 || self.Changestab.settings.itemId === 40 || self.Changestab.settings.itemId === 41 || self.Changestab.settings.itemId === 42 || self.Changestab.settings.itemId === 43 || self.Changestab.settings.itemId === 44 || self.Changestab.settings.itemId === 45 || self.Changestab.settings.itemId === 45 || self.Changestab.settings.itemId === 46 || self.Changestab.settings.itemId === 47 || self.Changestab.settings.itemId === 48 || self.Changestab.settings.itemId === 49 || self.Changestab.settings.itemId === 50 || self.Changestab.settings.itemId === 51 || self.Changestab.settings.itemId === 52 || self.Changestab.settings.itemId === 53 || self.Changestab.settings.itemId === 25) ? self.Changestab.tab : self.Changestab.tabId;

                    self.router.navigate('#/' + url);
                }
                self.isBIDirtyChanges(false);
            };

            // for click of NO while Navigation with Unsaved changes
            self.unSavedChangesNoClick = function () {
                var currentActiveTab = self.getTabFirstItem(true, 'cssActive');
                ko.utils.arrayForEach(self.tabContainerList(), function (tab) {
                    if (tab.settings.itemId === self.Changestab.settings.itemId) {
                        tab.cssActive(true);
                        tab.cssActive(false);
                    }
                    if (tab.settings.itemId === currentActiveTab.settings.itemId) {
                        tab.cssActive(false);
                        tab.cssActive(true);
                    }
                });
            };

            // for Unsaved Changes
            self.unSavedChangesNewtab = function () {
                self.checkMsgDisplay = true;
                if (self.getTabItems('parent', 'parent').length > (Utils.Constants.DefaultTabCounts - 1)) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 15,
                            fadeOut: 15,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                    return;
                }

                self.showContentProgress(true);
                self.addTab(self.name, self.caption, self.moduleId, self.settings, self.hash);
                self.isBIDirtyChanges(false);
            };

            //To check if Msg is clicked
            self.checkMsgClick = function () {
                self.checkMsgDisplay = true;
            };

            // to Check if Msg is hidden or closed
            self.checkMsgHide = function () {
                self.checkMsgDisplay = true;
            };

            // for Unsaved Changes
            self.unSavedChangesClosetab = function () {
                var self = _this, currentTab, routesToBeRemoved = new Array(), previousTab, tabItem;
                self.checkMsgDisplay = true;

                if (self.tabContainerList().length > 1) {
                    currentTab = self.getTabFirstItem(self.name, 'tabId');

                    if (typeof (currentTab.settings) !== 'undefined') {
                        if (currentTab.settings.VendorBill) {
                            if (currentTab.tab === 'Entry') {
                                if (currentTab.settings.itemId !== 3) {
                                    routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                        return item.settings === currentTab.settings;
                                    });
                                }
                            } else {
                                routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                    return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                                });
                            }
                        } else if (currentTab.settings.PurchaseOrder) {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        } else {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        }
                    }

                    if (routesToBeRemoved.length) {
                        self.router.routes.removeAll(routesToBeRemoved);
                    }

                    //#endregion Deleting the current/active route(s)
                    self.tabContainerList.remove(function (tab) {
                        return tab === currentTab;
                    });

                    if (self.getTabItems('parent', 'parent').length === 0) {
                        tabItem = self.getTabItems('Home', 'tab');
                    } else {
                        tabItem = self.getTabItems('parent', 'parent');
                    }

                    self.isBIDirtyChanges(false);

                    if (tabItem && tabItem.length) {
                        previousTab = tabItem[tabItem.length - 1];
                        self.setTabActive(previousTab);

                        if (typeof currentTab.uniqueId != 'undefined') {
                            if (LocalStorageController.Get(currentTab.uniqueId() + 'PO')) {
                                LocalStorageController.Set(currentTab.uniqueId() + 'PO', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueKey() + 'SO')) {
                                LocalStorageController.Set(currentTab.uniqueKey() + 'SO', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueKey() + 'SOFinancialDetails')) {
                                LocalStorageController.Set(currentTab.uniqueKey() + 'SOFinancialDetails', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueKey() + 'SOMASCustomerFields')) {
                                LocalStorageController.Set(currentTab.uniqueKey() + 'SOMASCustomerFields', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VB')) {
                                LocalStorageController.Set(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VB', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VBFinancialDetails')) {
                                LocalStorageController.Set(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VBFinancialDetails', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId)) {
                                LocalStorageController.Set(currentTab.tabId, undefined);
                            }
                        }

                        if (typeof currentTab.tabId != 'undefined') {
                            if (LocalStorageController.Get(currentTab.tabId)) {
                                LocalStorageController.Set(currentTab.tabId, undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId + 'EDI210ExceptionDetails')) {
                                LocalStorageController.Set(currentTab.tabId + 'EDI210ExceptionDetails', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId + 'EDI210ExceptionBoardDetailsResult')) {
                                LocalStorageController.Set(currentTab.tabId + 'EDI210ExceptionBoardDetailsResult', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId + '_foreignBol')) {
                                LocalStorageController.Set(currentTab.tabId + '_foreignBol', undefined);
                            }
                        }
                    }
                }
                return true;
            };

            self.changeTheme = function (themeDetails) {
                jQuery('#themeColorContainer > div').removeClass('selectedTheme');
                jQuery('#div' + themeDetails.themeName).addClass('selectedTheme');
                var regex = /theme/;
                var themeFromLink = $("body> link").attr("href");
                var themePath = themeFromLink.substring(0, themeFromLink.lastIndexOf('/') + 1);
                var newTheme = themePath + themeDetails.themeName + '.css';
                if (regex.test($("body> link").attr("href"))) {
                    $("body> link").attr("href", newTheme);

                    self.userClient.SaveThemeName(themeDetails.themeName, function (data) {
                    }, function () {
                        //_app.showDialog('templates/messageBox', { title: "Alert", message: "Some error occurred while saving the theme. Please try again." }, 'slideDown');
                    });

                    self.ChangeIconsBasedOnThemes(_router.activeRouteInstruction().config);
                    if (_router.activeRouteInstruction().config.route !== "Home") {
                        $('#homeImage').css('background-image', 'url(content/images/icons_home2.png)');
                    }
                }
            };

            //#region Change Icons on themes
            //Changing the icons based on themes//
            self.ChangeIconsBasedOnThemes = function (currentMainMenu) {
                var regex = /theme/;
                var themeFromLink = $("body> link").attr("href");
                var themeName = themeFromLink.substring(themeFromLink.lastIndexOf('/') + 1);

                if (currentMainMenu === 'Search') {
                    ////self.cssSearch(false);
                    self.searchBtnClicked(true);
                } else {
                    ////self.cssSearch(true);
                    self.searchBtnClicked(false);
                }
            };
            //#endregion
        }
        //#region Internal Methods
        shell.prototype.getRandomItemId = function () {
            var itemId = Math.floor((Math.random() * 999) + 1);
            ;
            var existsItem = this.router.routes.filter(function (r) {
                return r.settings.itemId === itemId;
            });
            if (existsItem.length) {
                this.getRandomItemId();
            } else if (itemId === undefined) {
                this.getRandomItemId();
            } else {
                return itemId;
            }
        };

        //function to hide submenu after their click}
        shell.prototype.hidesubmenu = function () {
            $('#mainMenu li div').removeClass('open');
        };

        shell.prototype.onMyDashboardClick = function () {
            this.router.navigate("Expired", true);
        };

        shell.prototype.onMyAccountClick = function () {
            this.router.navigate("MyAccount", true);
        };

        shell.prototype.filterRoute = function (name) {
            return ko.utils.arrayFirst(this.router.routes, function (item) {
                return item.route === name;
            });
        };

        shell.prototype.getTabItems = function (value, key) {
            return ko.utils.arrayFilter(this.tabContainerList(), function (item) {
                if (typeof item[key ? key : "header"] === 'function') {
                    return Utils.removeNumberWithbrackets(item[key ? key : "header"]()) === Utils.removeNumberWithbrackets(value);
                } else {
                    return Utils.removeNumberWithbrackets(item[key ? key : "header"]) === Utils.removeNumberWithbrackets(value);
                }
            });
        };

        // function of the get the first item in the array
        shell.prototype.getTabFirstItem = function (value, key) {
            return ko.utils.arrayFirst(this.tabContainerList(), function (item) {
                if (typeof item[key ? key : "header"] === 'function') {
                    return item[key ? key : "header"]() === value;
                } else {
                    return item[key ? key : "header"] === value;
                }
            });
        };

        //function called on the click of the main-navigation
        shell.prototype.showTabHeaderMain = function (route, title, moduleId, settings, hash) {
            var self = this;
            var currentActiveRoute = self.router.activeRouteInstruction().config;
            if ((title == 'Vendor Bill' && currentActiveRoute.route != 'Vendor Bill') ? true : (title == 'Unmatched Vendor Bill' && currentActiveRoute.route != 'Unmatched Vendor Bill') ? true : (title == 'Admin' && currentActiveRoute.route != 'Admin') ? true : (title == 'Home' && currentActiveRoute.route != 'Home') ? true : (title == 'Reports' && currentActiveRoute.route != 'Reports') ? true : false) {
                this.selectedMainMenu(title);
                this.createNewTab(route, title, moduleId, settings, hash);
            }
            if (title === 'Vendor Bill') {
                var isVendorBillMenu = settings != null && (title === 'Vendor Bill');
                var parentName = (isVendorBillMenu ? 'VendorBill' : null);

                var prevtab = ko.utils.arrayFirst(this.tabContainerList(), function (tab) {
                    if (tab.parent === parentName && tab.showTabHeader()) {
                        return true;
                    }
                });
            }
        };

        // function is called for creation of new tab
        // name : route, caption: title, modeuleId: moduleId, settings: settings, hash: hash
        shell.prototype.createNewTab = function (name, caption, moduleId, settings, hash) {
            var self = this;
            self.name = name;
            self.caption = caption;
            self.moduleId = moduleId;
            self.settings = settings;
            self.hash = hash;
            if (self.isBIDirtyChanges() === true && self.isBIDirtyChanges() !== undefined) {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var actionButtons = [];
                    actionButtons.push({
                        actionButtonName: "Yes",
                        actionClick: self.unSavedChangesNewtab
                    });

                    actionButtons.push({
                        actionButtonName: "No",
                        actionClick: self.checkMsgClick
                    });

                    var toastrOptions1 = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 0,
                        fadeOut: 0,
                        typeOfAlert: "",
                        title: "",
                        actionButtons: actionButtons
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.ChangesMadeMessage, "warning", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                }
            } else {
                if (self.getTabItems('parent', 'parent').length > (Utils.Constants.DefaultTabCounts - 1)) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 15,
                            fadeOut: 15,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.MaxTab, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }

                    return;
                }
                this.showContentProgress(true);
                this.addTab(name, caption, moduleId, settings, hash);
                return true;
            }
        };

        // function is adding new tabs or moving to previously opened tabs
        // name : route, caption: title, modeuleId: moduleId, settings: settings, hash: hash
        shell.prototype.addTab = function (name, caption, moduleId, settings, hash) {
            var self = this, parentName = 'parent', str = self.getTabFirstItem(name, 'tab');

            if (str == null) {
                var randomNo = self.getRandomItemId();
                while (randomNo === undefined) {
                    randomNo = this.getRandomItemId();
                }

                ko.utils.arrayForEach(self.tabContainerList(), function (tab) {
                    tab.cssActive(false);
                    if (tab.parent && parentName === tab.parent) {
                        tab.showTabHeader(true);
                    } else {
                        tab.showTabHeader(false);
                    }
                });

                self.tabContainerList.push({
                    tab: name,
                    header: ko.observable(caption),
                    tabId: name + (settings.itemId || randomNo),
                    cssActive: ko.observable(true),
                    moduleId: moduleId,
                    settings: settings,
                    showTabHeader: ko.observable(settings.allowTab),
                    parent: parentName,
                    pageLoader: ko.observable(true),
                    headerDisplay: ko.computed(function () {
                        if (caption.length > 15) {
                            return caption.substring(0, 13) + "..";
                        }

                        return caption;
                    })
                });

                self.tabVisible(settings.allowTab);
                self.router.navigate(hash);
            } else if (name === 'Entry' || name === self.ROUTE_PURCHASE_ORDER_BOARD || name === self.ROUTE_TRANSACTION_SEARCH) {
                self.addDuplicateTab(name, parentName);
            } else {
                ko.utils.arrayForEach(this.tabContainerList(), function (tab) {
                    if (tab.tab != name) {
                        tab.cssActive(false);
                        //tab.showTabHeader(false);
                    } else {
                        tab.cssActive(true);
                        tab.showTabHeader(true);
                        if (str.tab !== (name || caption)) {
                            tab.pageLoader(true);
                        }
                    }
                });
                var firstTabItem = self.getTabFirstItem(name, 'tab');
                firstTabItem.cssActive(true);
                self.tabVisible(firstTabItem.settings.allowTab);
                self.router.navigate(hash);
                self.showContentProgress(false);
            }
        };

        // function adding multiple tabs for Entry flow/ Vendor Bill Details
        shell.prototype.addDuplicateTab = function (name, parentName, id, proOrBolNumber, isSubBill, isException, isLostBill) {
            var self = this;
            var filterResult = this.filterRoute(name);
            var randomNo = this.getRandomItemId();
            if (typeof randomNo === undefined) {
                randomNo = this.getRandomItemId();
            }
            while (randomNo === undefined) {
                randomNo = this.getRandomItemId();
            }
            if (filterResult) {
                ko.utils.arrayForEach(this.tabContainerList(), function (tab) {
                    tab.cssActive(false);
                    tab.showTabHeader(tab.parent === parentName);
                });

                var tabItem = this.getTabItems((filterResult.route + filterResult.settings.itemId), 'tabId');
                var itemId;
                itemId = (tabItem.length == 0 ? filterResult.settings.itemId : randomNo);

                var settings = {
                    allowTab: (filterResult.settings.allowTab),
                    itemId: itemId,
                    tabType: (filterResult.settings.tabType)
                };
                if (filterResult.settings.VendorBill) {
                    settings.VendorBill = filterResult.settings.VendorBill;
                }

                if (filterResult.settings.SalesOrder) {
                    settings.SalesOrder = filterResult.settings.SalesOrder;
                }

                if (filterResult.title === self.ROUTE_VENDORBILL_DETAILS || filterResult.title === self.ROUTE_INVOICE) {
                    settings.VendorBill = filterResult.settings.VendorBill;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.title === self.ROUTE_PURCHASEORDER_DETAILS) {
                    settings.PurchaseOrder = filterResult.settings.PurchaseOrder;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.title === self.ROUTE_HISTORY_DETAILS) {
                    settings.HistoryDetails = filterResult.settings.HistoryDetails;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.title === self.ROUTE_SALES_ORDER || filterResult.title === self.ROUTE_PRINTBOL) {
                    settings.SalesOrder = filterResult.settings.SalesOrder;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.title === self.ROUTE_SearchResult) {
                    settings.Search = filterResult.settings.Search;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.title === self.ROUTE_REBILL) {
                    settings.Rebill = filterResult.settings.Rebill;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.title === self.ROUTE_SALES_ORDER_HISTORY_DETAILS) {
                    settings.HistoryDetails = filterResult.settings.HistoryDetails;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.route === self.ROUTE_PURCHASE_ORDER_BOARD) {
                    settings.PurchaseOrder = filterResult.settings.PurchaseOrder;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.route === self.ROUTE_TRANSACTION_SEARCH) {
                    settings.Search = filterResult.settings.Search;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                if (filterResult.route === self.ROUTE_EDI210_BOARD) {
                    settings.Search = filterResult.settings.Search;
                    settings.defaultSettings = (tabItem.length == 0 ? filterResult.settings.defaultSettings : false);
                }

                var headerTitle = filterResult.route;
                var tabTitle = filterResult.title;
                if (filterResult.title === self.ROUTE_VENDORBILL_DETAILS && proOrBolNumber) {
                    headerTitle = 'VB #' + proOrBolNumber;
                } else if (filterResult.title === self.ROUTE_PURCHASEORDER_DETAILS && proOrBolNumber) {
                    headerTitle = 'UVB #' + proOrBolNumber;
                } else if (filterResult.title === self.ROUTE_HISTORY_DETAILS && proOrBolNumber) {
                    headerTitle = 'History #' + proOrBolNumber;
                } else if (filterResult.title === self.ROUTE_SALES_ORDER && proOrBolNumber) {
                    headerTitle = 'SO #' + proOrBolNumber;
                } else if (filterResult.title === self.ROUTE_INVOICE && proOrBolNumber) {
                    headerTitle = 'IN #' + proOrBolNumber;
                } else if (filterResult.title === self.ROUTE_PRINTBOL && id) {
                    headerTitle = 'BOL #' + id;
                } else if (filterResult.title === self.ROUTE_SearchResult) {
                    if (id.category == "MoreResult") {
                        headerTitle = "Search Result";
                    } else {
                        headerTitle = id.category + " Result";
                    }
                    ;
                } else if (filterResult.route === self.SALES_ORDER_ENTRY) {
                    headerTitle = 'Entry';
                    tabTitle = filterResult.route;
                } else if (filterResult.route === self.ROUTE_REBILL) {
                    headerTitle = 'Rebill #' + id;
                } else if (filterResult.route === self.ROUTE_SALES_ORDER_HISTORY_DETAILS && proOrBolNumber) {
                    headerTitle = 'History #' + proOrBolNumber;
                } else if (filterResult.route === self.ROUTE_PURCHASE_ORDER_BOARD) {
                    headerTitle = filterResult.title;
                    tabTitle = filterResult.route;
                } else if (filterResult.route === self.ROUTE_TRANSACTION_SEARCH) {
                    headerTitle = filterResult.title;
                    tabTitle = filterResult.route;
                } else if (filterResult.route === self.ROUTE_EDI210_BOARD) {
                    headerTitle = "EDI210 #" + proOrBolNumber;
                }

                var title = null;
                if (filterResult.title === 'Entry' && id) {
                    title = { vendorBillId: id, isDuplicated: true };
                } else if (filterResult.title === self.ROUTE_VENDORBILL_DETAILS || filterResult.title === self.ROUTE_PURCHASEORDER_DETAILS || filterResult.title === self.ROUTE_HISTORY_DETAILS) {
                    title = { vendorBillId: id, proNumber: proOrBolNumber, isSubBill: isSubBill, isException: isException, isLostBill: isLostBill };
                } else if (filterResult.title === self.ROUTE_SALES_ORDER || filterResult.title === self.ROUTE_SALES_ORDER_HISTORY_DETAILS) {
                    title = { salesOrderId: id, bolNumber: proOrBolNumber, isSubOrder: isSubBill };
                } else if (filterResult.title === self.ROUTE_INVOICE) {
                    title = { bolNumber: id, invoiceNumber: proOrBolNumber };
                } else if (filterResult.title === self.ROUTE_SearchResult) {
                    title = id;
                } else if (filterResult.title === self.ROUTE_REBILL) {
                    title = id;
                } else if (filterResult.title === self.ROUTE_PRINTBOL) {
                    title = { bolNumber: id, customerBolNumber: proOrBolNumber };
                } else if (filterResult.route === self.ROUTE_EDI210_BOARD) {
                    title = { exceptionType: id, proNumber: proOrBolNumber };
                }

                this.tabContainerList.push({
                    tab: tabTitle,
                    header: ko.observable(headerTitle),
                    tabId: tabTitle + itemId,
                    cssActive: ko.observable(true),
                    moduleId: filterResult.moduleId,
                    settings: settings,
                    showTabHeader: ko.observable(filterResult.settings.allowTab),
                    parent: parentName,
                    data: title,
                    pageLoader: ko.observable(true),
                    headerDisplay: ko.computed(function () {
                        if (headerTitle.length > 15) {
                            return headerTitle.substring(0, 13) + "..";
                        }

                        return headerTitle;
                    }),
                    uniqueId: ko.observable(id),
                    uniqueKey: ko.observable(proOrBolNumber)
                });

                var duplicateTabItems = this.getTabItems(headerTitle);
                if (duplicateTabItems.length > 1) {
                    var tabcount = 1;
                    duplicateTabItems.forEach(function (i) {
                        if (i.tab === filterResult.title) {
                            if (Utils.removeNumberWithbrackets(i.header()) === filterResult.route) {
                                i.header(Utils.removeNumberWithbrackets(i.header()) + ' (' + tabcount + ')');
                                tabcount += 1;
                            }
                        }
                    });
                }

                this.tabVisible(filterResult.settings.allowTab);

                if (tabItem.length) {
                    this.router.map({
                        moduleId: filterResult.moduleId,
                        route: filterResult.route + randomNo,
                        title: filterResult.title,
                        nav: filterResult.nav,
                        hash: filterResult.hash + randomNo,
                        settings: settings
                    });

                    return this.router.navigate('#/' + filterResult.route + randomNo);
                }

                return this.router.navigate('#/' + filterResult.route, true);
            }
        };

        //Changes done in SignOut for removing the alert box.
        shell.prototype.SignOut = function () {
            if (this.Logout()) {
                return true;
            } else {
                return false;
            }
        };

        // function to show mouse over sub menu
        shell.prototype.showTabHeaderMainOnMouserHover = function (routeConfig) {
            if (routeConfig.title === 'Transaction Search') {
                $('.mainMenuId').removeClass('open');
                $('.menuBtn').removeClass('hover');
                return;
            } else {
                jQuery('.mainMenuId').removeClass('open');
                jQuery('.mainMenuId > div').removeClass('hover');
                jQuery('#' + routeConfig.id).addClass('hover').parent().addClass('open');
                jQuery('#buttonContainerColumn > div').removeClass('open');
            }
        };

        //function to remove sub-menu
        shell.prototype.mouseoutFromNav = function () {
            jQuery('.mainMenuId').removeClass('open');
            jQuery('.mainMenuId > div').removeClass('hover');
            if (jQuery('#buttonContainerColumn > div').hasClass('open'))
                jQuery('#buttonContainerColumn > div').removeClass('open');
        };

        shell.prototype.showUserSettings = function () {
            this.mouseoutFromNav();
            jQuery('#buttonContainerColumn > div').addClass('open');
        };

        //function to close the respective tab.
        shell.prototype.closeTab = function (name, title) {
            var self = this, currentTab, routesToBeRemoved = new Array(), previousTab, tabItem;
            self.name = name;

            if (self.isBIDirtyChanges() === true && self.isBIDirtyChanges() !== undefined) {
                var actionButtons = [];
                actionButtons.push({
                    actionButtonName: "Yes",
                    actionClick: self.unSavedChangesClosetab
                });

                actionButtons.push({
                    actionButtonName: "No",
                    actionClick: null
                });

                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions1 = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 0,
                        fadeOut: 0,
                        typeOfAlert: "",
                        title: "",
                        actionButtons: actionButtons
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.ChangesMadeMessage, "warning", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                }
            } else {
                if (this.tabContainerList().length > 1) {
                    currentTab = this.getTabFirstItem(name, 'tabId');

                    if (currentTab.settings.VendorBill) {
                        if (currentTab.tab === 'Entry') {
                            if (currentTab.settings.itemId !== 3) {
                                routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                    return item.settings === currentTab.settings;
                                });
                            }
                        } else {
                            routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                                return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                            });
                        }
                    } else if (currentTab.settings.PurchaseOrder) {
                        routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                            return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                        });
                    } else {
                        routesToBeRemoved = ko.utils.arrayFilter(self.router.routes, function (item) {
                            return (!currentTab.settings.defaultSettings) && item.settings.itemId === currentTab.settings.itemId;
                        });
                    }

                    if (routesToBeRemoved.length) {
                        self.router.routes.removeAll(routesToBeRemoved);
                    }

                    //#endregion Deleting the current/active route(s)
                    self.tabContainerList.remove(function (tab) {
                        return tab === currentTab;
                    });

                    if (self.getTabItems('parent', 'parent').length === 0) {
                        tabItem = self.getTabItems('Home', 'tab');
                    } else {
                        tabItem = self.getTabItems('parent', 'parent');
                    }

                    self.isBIDirtyChanges(false);

                    if (tabItem && tabItem.length) {
                        this.tabContainerList().forEach(function (items) {
                            if (items.cssActive() && items.tab !== "Home") {
                                previousTab = items;
                            }
                        });

                        if (previousTab == null) {
                            previousTab = tabItem[tabItem.length - 1];
                            previousTab.cssActive(false);
                            self.setTabActive(previousTab);
                        }

                        if (typeof currentTab.uniqueId != 'undefined') {
                            if (LocalStorageController.Get(currentTab.uniqueId() + 'PO')) {
                                LocalStorageController.Set(currentTab.uniqueId() + 'PO', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueKey() + 'SO')) {
                                LocalStorageController.Set(currentTab.uniqueKey() + 'SO', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VB')) {
                                LocalStorageController.Set(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VB', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId)) {
                                LocalStorageController.Set(currentTab.tabId, undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueKey() + 'SOFinancialDetails')) {
                                LocalStorageController.Set(currentTab.uniqueKey() + 'SOFinancialDetails', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueKey() + 'SOMASCustomerFields')) {
                                LocalStorageController.Set(currentTab.uniqueKey() + 'SOMASCustomerFields', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VBFinancialDetails')) {
                                LocalStorageController.Set(currentTab.uniqueId() + '_' + currentTab.uniqueKey() + 'VBFinancialDetails', undefined);
                            }
                            ////To Clear Edi Details
                            //if (LocalStorageController.Get(currentTab.tabId + 'EDI210ExceptionDetails')) {
                            //	LocalStorageController.Set(currentTab.tabId + 'EDI210ExceptionDetails', undefined);
                            //}
                        }

                        if (typeof currentTab.tabId != 'undefined') {
                            if (LocalStorageController.Get(currentTab.tabId)) {
                                LocalStorageController.Set(currentTab.tabId, undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId + 'EDI210ExceptionDetails')) {
                                LocalStorageController.Set(currentTab.tabId + 'EDI210ExceptionDetails', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId + 'EDI210ExceptionBoardDetailsResult')) {
                                LocalStorageController.Set(currentTab.tabId + 'EDI210ExceptionBoardDetailsResult', undefined);
                            }

                            if (LocalStorageController.Get(currentTab.tabId + '_foreignBol')) {
                                LocalStorageController.Set(currentTab.tabId + '_foreignBol', undefined);
                            }
                        }
                    }
                }
                return true;
            }

            return true;
        };

        //creation of the initial tab
        shell.prototype.initialTab = function () {
            var randomNo = this.getRandomItemId();
            var filterResult = this.filterRoute(this.config.startModule);
            if (filterResult) {
                if (this.getTabItems(filterResult.title).length == 0) {
                    this.tabContainerList.push({
                        tab: filterResult.route,
                        header: ko.observable(filterResult.title),
                        tabId: filterResult.route + (filterResult.settings.itemId || randomNo),
                        cssActive: ko.observable(true),
                        moduleId: filterResult.moduleId,
                        settings: filterResult.settings,
                        showTabHeader: ko.observable(filterResult.settings.allowTab),
                        parent: 'parent',
                        pageLoader: ko.observable(false),
                        headerDisplay: ko.computed(function () {
                            if (filterResult.title.length > 15) {
                                return filterResult.title.substring(0, 13) + "..";
                            }

                            return filterResult.title;
                        })
                    });
                    this.tabVisible(filterResult.settings.allowTab);
                    this.selectedMainMenu(filterResult.route);
                }
            }

            return true;
        };

        //#endregion Internal Methods
        //#region Methods for Header Transaction Search
        shell.prototype.SearchBOLAndPRO = function (query, process) {
            refCommon.Common.prototype.searchBolAndPro(query.trim(), process);
        };

        shell.prototype.onSelectSearchResult = function (sender, event, data) {
            switch (event.obj.category) {
                case 'Vendor Bill':
                    if (event.obj.IsPurchaseOrder) {
                        this.app.trigger("openPurchaseOrder", event.obj.VendorBillId, event.obj.PRONumber, function (callback) {
                            if (!callback) {
                                return;
                            }
                        });
                    } else {
                        this.app.trigger("openVendorBill", event.obj.VendorBillId, event.obj.PRONumber, function (callback) {
                            if (!callback) {
                                return;
                            }
                        });
                    }

                    break;
                case 'Sales Order':
                    this.app.trigger("openSalesOrder", event.obj.ShipmentId, event.obj.BOLNumber, function (callback) {
                        if (!callback) {
                            return;
                        }
                    });
                    break;
                case 'EDI':
                    if (event.obj.ExceptionRuleId != null && event.obj.ExceptionRuleId != undefined && event.obj.ExceptionRuleId != 0) {
                        this.app.trigger("openEdi210Board", event.obj.ExceptionRuleId, event.obj.EDIDetailID, event.obj.BatchId, event.obj.PRONumber, function (callback) {
                            if (!callback) {
                                return;
                            }
                        });
                    }
                    break;
            }

            $(event.target).val('');
        };

        shell.prototype.onClickMoreResult = function (sender, event, data) {
            this.app.trigger("openTransactionSearchResult", event.resultData);
            $(event.target).val('');
        };

        //#endregion
        //#region Un-subscribing from an app-wide message.
        shell.prototype.unSubscribtion = function () {
            this.subscriptionOnShowOrHideProgressBar.off();
            this.subscriptionOnShowOrHideAjaxLoader.off();
            this.subscriptionOnViewAttached.off();
            this.subscriptionToOpenVendorBill.off();
            this.subscriptionOnLoadMyData.off();
            this.subscriptionOnRegisterMyData.off();
            this.subscriptionOnCloseActiveTab.off();
            this.subscriptionOpenHistoryDetails.off();
            this.subscriptionOpenSalesOrder.off();
            this.subscriptionOpenInvoice.off();
            this.subscriptionOpenBoard.off();
            this.subscriptionOpenRexnordBoard.off();
            this.subscriptionOnNavigation.off();
            this.subscriptionOpenRebill.off();
            this.subscriptionOpenSalesOrderHistoryDetails.off();
            this.subscriptionOpenPrintBOL.off();
        };

        //#endregion Un-subscribing from an app-wide message
        shell.prototype.activeItem = function () {
            var self = this;
            if (self.router.activeRouteInstruction()) {
                var currentActiveRoute = self.router.activeRouteInstruction().config;
                if (currentActiveRoute) {
                    var activeItem;
                    var duplicateItems = ko.utils.arrayFilter(self.tabContainerList(), function (item) {
                        return item.tabId === currentActiveRoute.route || item.tab === currentActiveRoute.route;
                    });
                    if (duplicateItems && duplicateItems.length === 1) {
                        activeItem = duplicateItems[0];
                    } else if (duplicateItems) {
                        activeItem = ko.utils.arrayFirst(duplicateItems, function (tabItem) {
                            var defaultItem = self.getDefaultItemFromConfig(tabItem.settings.itemId, tabItem.tab);
                            if (defaultItem) {
                                return defaultItem.route === currentActiveRoute.route;
                            }
                        });
                    }
                    if (activeItem) {
                        return activeItem;
                    } else {
                        return ko.utils.arrayFirst(self.tabContainerList(), function (item) {
                            return item.settings != null;
                        });
                    }
                }
            }
        };

        // Shows the message box as pr the given title and message
        shell.prototype.showConfirmationMessage = function (message, title, fisrtButtoName, secondButtonName, yesCallBack, noCallBack) {
            var varMsgBox = [
                {
                    id: 0,
                    name: fisrtButtoName,
                    callback: function () {
                        return yesCallBack();
                    }
                },
                {
                    id: 1,
                    name: secondButtonName,
                    callback: function () {
                        return noCallBack();
                    }
                }
            ];

            ////initialize message box control arguments
            var optionControlArgs = {
                options: varMsgBox,
                message: message,
                title: title
            };

            //Call the dialog Box functionality to open a Pop up
            _app.showDialog('templates/messageBox', optionControlArgs, 'slideDown');
        };

        //#region Life Cycle Events of Durandal
        shell.prototype.activate = function () {
            var self = this;

            refCommon.Common.prototype.GetCurrentCustomerResourceSettings(function (result) {
                self.logicalResources = Object.freeze(result);
                var routes = self.getConfiguredRoutesByPermission();
                self.showProgress(true);

                self.router.map(routes).buildNavigationModel();
                var myAccountMenu = self.router.routes.filter(function (r) {
                    return r.settings.MyAccount;
                });
                self.MyAccountSubMenu(myAccountMenu);
                self.router.mapUnknownRoutes(function (instruction) {
                    var actualRoute = ko.utils.arrayFirst(self.router.routes, function (item) {
                        return item.route === instruction.fragment;
                    });
                    if (actualRoute) {
                        instruction.config = actualRoute;
                        return instruction;
                    } else {
                        actualRoute = ko.utils.arrayFirst(self.router.routes, function (item) {
                            return item.route === self.config.startModule;
                        });

                        instruction.config = actualRoute;
                        instruction.fragment = actualRoute.route;
                        instruction.params = null;

                        return instruction;
                    }
                });

                self.router.navigate(self.config.startModule);

                //self.router.navigate("TransactionSearch")
                _app.trigger("showGlobalSearch");
                self.showProgress(false);

                return self.router.activate();
            });

            self.showProgress(false);
        };

        shell.prototype.deactivate = function () {
            var self = this;
            var activeRoute = self.router.activeItem();
            if (activeRoute) {
                if (activeRoute.deactivate && refSystem.isFunction(activeRoute.deactivate)) {
                    activeRoute.deactivate();
                }
            }
        };

        //#endregion Life Cycle Events of Durandal
        /**
        * Method to get the configured routes by access role permission.
        * @returns {Array<DurandalRouteConfiguration>} new configured routes.
        */
        shell.prototype.getConfiguredRoutesByPermission = function () {
            var self = this;
            self.showProgress(true);

            /**
            * variable to hold the permission based routes.
            */
            var newRoutesToConfigure = new Array();

            /*
            * Looping through all the configured routes and adding those into {newRoutesToConfigure} variable.
            * Filtering logical resource for each routes and checking with user permission by using {resourceName}, {rqdPermission} variables.
            * If it has correct permission adding that into {newRoutesToConfigure} variable, else it won't.
            * Also, if route is not setup with any resource it will add into {newRoutesToConfigure} variable.
            */
            self.config.routes.forEach(function (item) {
                if (item.settings.resourceName) {
                    var logicalResourcesArray = $.map(self.logicalResources, function (value, index) {
                        return [value];
                    });

                    var logicalResource = ko.utils.arrayFirst(logicalResourcesArray, function (lrItem) {
                        return (item.settings.resourceName === lrItem.ResourceName) && (item.settings.rqdPermission === lrItem.RequiredPermission);
                    });
                    if (logicalResource) {
                        newRoutesToConfigure.push(item);
                    }
                } else {
                    newRoutesToConfigure.push(item);
                }
            });

            /**
            * Variable to holding the main menu items from configured routes.
            */
            var mainMenuList = ko.utils.arrayFilter(newRoutesToConfigure, function (item) {
                return (item.settings.isMainMenu);
            });

            if (mainMenuList) {
                /**
                * Looping through all the main menus from configured routes and removing those which are not having submenus in {newRoutesToConfigure} object.
                */
                mainMenuList.forEach(function (mmItem) {
                    switch (mmItem.title) {
                        case Constants.UIConstants.VendorBillPageTitle:
                            var VBSubMenu = ko.utils.arrayFirst(newRoutesToConfigure, function (accountingmenuItem) {
                                return accountingmenuItem.settings.VendorBill;
                            });
                            if (!VBSubMenu) {
                                newRoutesToConfigure.remove(mmItem);
                            }
                            break;
                        case Constants.UIConstants.PurchaseOrderPageTitle:
                            var purchaseOrderSubMenu = ko.utils.arrayFirst(newRoutesToConfigure, function (accountingmenuItem) {
                                return accountingmenuItem.settings.PurchaseOrder;
                            });
                            if (!purchaseOrderSubMenu) {
                                newRoutesToConfigure.remove(mmItem);
                            }
                            break;
                        case Constants.UIConstants.SalesOrderTitle:
                            var salesorderSubMenu = ko.utils.arrayFirst(newRoutesToConfigure, function (accountingmenuItem) {
                                return accountingmenuItem.settings.SalesOrder;
                            });
                            if (!salesorderSubMenu) {
                                newRoutesToConfigure.remove(mmItem);
                            }
                            break;
                        case Constants.UIConstants.CarrierMapping:
                            var carrierSubMenu = ko.utils.arrayFirst(newRoutesToConfigure, function (accountingmenuItem) {
                                return accountingmenuItem.settings.Carrier;
                            });
                            if (!carrierSubMenu) {
                                newRoutesToConfigure.remove(mmItem);
                            }
                            break;
                        case Constants.UIConstants.BoardPageTitle:
                            var boardSubMenu = ko.utils.arrayFirst(newRoutesToConfigure, function (accountingmenuItem) {
                                return accountingmenuItem.settings.Board;
                            });
                            if (!boardSubMenu) {
                                newRoutesToConfigure.remove(mmItem);
                            }
                            break;
                        case Constants.UIConstants.ReportsPageTitle:
                            var reportSubMenu = ko.utils.arrayFirst(newRoutesToConfigure, function (accountingmenuItem) {
                                return accountingmenuItem.settings.Reports;
                            });
                            if (!reportSubMenu) {
                                newRoutesToConfigure.remove(mmItem);
                            }
                            break;
                    }
                });
            }
            self.showProgress(false);

            return newRoutesToConfigure;
        };
        return shell;
    })();

    return new shell();
});
