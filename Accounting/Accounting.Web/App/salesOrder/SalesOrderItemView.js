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
/// <reference path="../services/models/TypeDefs/SalesOrderModels.d.ts" />
//#endregion
define(["require", "exports", 'plugins/router', 'durandal/app', 'services/models/common/Enums', 'salesOrder/SalesOrderItemsModel', 'services/client/SalesOrderClient', 'services/models/salesOrder/SalesOrderItemDetail'], function(require, exports, ___router__, ___app__, __refEnums__, __refSalesOrderItemModel__, __refSalesOrderClient__, __refSalesOrderItemDetail__) {
    
    var _router = ___router__;
    var _app = ___app__;
    
    
    var refEnums = __refEnums__;
    
    
    var refSalesOrderItemModel = __refSalesOrderItemModel__;
    
    var refSalesOrderClient = __refSalesOrderClient__;
    
    var refSalesOrderItemDetail = __refSalesOrderItemDetail__;

    //#endregion
    /*
    ** <summary>
    ** Sales Order Item View Model.
    ** </summary>
    ** <createDetails>
    ** <id>US12101</id> <by>Chandan</by> <date>27th Aug, 2014</date>
    ** </createDetails>
    ** <changeHistory>
    ** <id>US21290</id> <by>Shreesha Adiga</by> <date>17-03-2016</date><description>Select item based on itemid and accessorial id</description>
    ** <id>US21290</id> <by>Shreesha Adiga</by> <date>23-03-2016</date><description>If item selected based on itemid and accessorialId is undefined, then select based only on itemId</description>
    ** </changeHistory>
    */
    var SalesOrderItemViewModel = (function () {
        //#endregion
        //#region Constructor
        function SalesOrderItemViewModel(costOrWeightChangedCallBack, keyListenerCallback, hazmatCallBack) {
            //#region Members
            this.salesOrderItemsList = ko.observableArray([]);
            this.classTypes = ko.observableArray([]);
            this.packageTypes = ko.observableArray([]);
            this.shipmentItemTypes = ko.observableArray([]);
            this.isAllCheckedForDelete = ko.observable(false);
            this.salesOrderItemAmount = ko.observable();
            this.salesOrderRevenue = ko.observable();
            this.salesOrderItemWeight = ko.observable();
            this.salesOrderItemPieces = ko.observable();
            this.salesOrderBsCost = ko.observable();
            this.isBSCost = ko.observable(false);
            this.isBSCostEditable = ko.observable(false);
            this.costHeader = ko.observable("Cost");
            this.salesOrderId = ko.observable('');
            this.estimatedProfitPerc = ko.observable($.number(0, 2));
            this.finalProfitPerc = ko.observable($.number(0, 2));
            this.plcorBSCost = ko.observable(0);
            this.plcorBSRevenue = ko.observable(0);
            this.customerTypeOf = ko.observable(0);
            this.isBillingStation = ko.observable(false);
            this.gtzMargin = ko.observable($.number(0, 2));
            this.feeStructure = ko.observable(0);
            this.plcMargin = ko.observable(0);
            this.gtMinMargin = ko.observable(0);
            this.isCallForEdit = ko.observable(false);
            this.CanEditItemsDescription = ko.observable(false);
            this.isSubOrder = ko.observable(false);
            this.originalTotalRevenue = ko.observable(0);
            this.originalTotalBSCost = ko.observable(0);
            this.originalTotalCost = ko.observable(0);
            this.copySalesOrderItemsList = ko.observableArray([]);
            this.adjustedOrderItemList = ko.observableArray([]);
            this.copyAdjustedOrderItemList = ko.observableArray([]);
            this.matchrowArray = ko.observableArray([]);
            this.calculateRevenue = ko.observable(false);
            this.isVbVisible = ko.observable(false);
            this.shipmentId = ko.observable(0);
            this.listProgress = ko.observable(false);
            this.returnValue = ko.observable(false);
            this.isSaveEnable = ko.observable(true);
            this.IsValidationShown = false;
            this.isNotAtLoadingTime = false;
            this.isNotAtLoadingTimeForCopyCostRevenue = false;
            this.salesOrderClient = new refSalesOrderClient.SalesOrderClient();
            this.commonUtils = new Utils.Common();
            this.checkMsgDisplay = true;
            this.carrierType = ko.observable(0);
            var self = this;

            self.costOrWeightChanged = costOrWeightChangedCallBack;
            self.keyListenerCallback = keyListenerCallback;
            self.hazardousChanged = hazmatCallBack;

            //set the flag allow decimal: true to accepts decimals
            self.NumericInputWithDecimalPoint = { allowdecimal: ko.observable(true), maxlength: 11, autodigit: ko.observable(true) };

            self.updateHazardousValue = function () {
                var hazardousItems;

                hazardousItems = $.grep(self.salesOrderItemsList(), function (item) {
                    return item.isHazardous() === true;
                });
                self.hazardousChanged(hazardousItems);
            };

            self.updateAuditedBill = function (auditedItem, salesOrderId, estimatedProfitPer, finalProfitPer, customerTypeOf, feeStructure, gtMinMargin, isBillingStation, gtzMargin, plcMargin) {
                self.salesOrderId(salesOrderId.toString());
                self.estimatedProfitPerc(estimatedProfitPer);
                self.finalProfitPerc(finalProfitPer);
                self.customerTypeOf(customerTypeOf);
                self.feeStructure(feeStructure);
                self.gtMinMargin(gtMinMargin);
                self.gtzMargin(gtzMargin);
                self.isBillingStation(isBillingStation);
                self.plcMargin(plcMargin);
                self.copyCostOnlyFromAuditBill(auditedItem);
            };

            // initialize the Add command
            self.onAdd = function () {
                var shipmentItemTypesLength = self.shipmentItemTypes().length;
                if ((shipmentItemTypesLength)) {
                    var result = $.grep(self.shipmentItemTypes(), function (e) {
                        return e.ItemId === "10";
                    })[0];
                    self.salesOrderItemsList.push(new refSalesOrderItemModel.Models.SalesOrderItemsModel(result, function () {
                        self.updateTotalCostAndWeight();
                    }, self.onChangesMadeInItem, self.updateHazardousValue, self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isCallForEdit(), self.isSubOrder(), self.isSaveEnable(), self.CanEditItemsDescription(), true, self.carrierType()));
                }

                self.onChangesMadeInItem(true);

                if (self.isAllCheckedForDelete())
                    self.isAllCheckedForDelete(false);
            };

            self.canDelete = ko.computed(function () {
                var isAnySelected = false;

                // Check if any one item is selected for deletion
                self.salesOrderItemsList().forEach(function (item) {
                    if (item.isMarkForDeletion()) {
                        isAnySelected = true;
                    }
                });
                return isAnySelected;
            });

            // Making sure that input is number only
            self.IsNumber = function (data, event) {
                var charCode = (event.which) ? event.which : event.keyCode;

                if (event.ctrlKey && (charCode == 99 || charCode == 67)) {
                    return true;
                }
                if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                    return false;
                }
                return true;
            };

            // Check uncheck all the items as per the user selection}
            self.markAllForDelete = function () {
                var isAllChecked = self.isAllCheckedForDelete();

                self.salesOrderItemsList().forEach(function (item) {
                    item.isMarkForDeletion(isAllChecked);
                });
                return true;
            };

            // Handles the checkbox click event for each item
            self.itemCliked = function () {
                if (self.salesOrderItemsList().length === 0) {
                    self.isAllCheckedForDelete(false);
                    return true;
                }

                // Get an item which is not selected for deletion
                var isAnyitemNotMarkedForDeletion = $.grep(self.salesOrderItemsList(), function (e) {
                    return e.isMarkForDeletion() == false;
                });

                if (isAnyitemNotMarkedForDeletion != undefined && isAnyitemNotMarkedForDeletion.length > 0) {
                    self.isAllCheckedForDelete(false);
                } else {
                    self.isAllCheckedForDelete(true);
                }

                return true;
            };

            //Removing line when click on delete image
            self.removeLineItem = function (lineItem) {
                // Delete from the collection
                var totalPlcCost = 0.00;

                self.selectedlineitem = lineItem;
                for (var i = 0; i < self.salesOrderItemsList().length; i++) {
                    totalPlcCost += self.salesOrderItemsList()[i].bSCost();
                }
                totalPlcCost = totalPlcCost - self.selectedlineitem.bSCost();
                self.salesOrderBsCost(totalPlcCost.toFixedDecimal(2));
                self.deleteSalesOrderItemsList();

                self.onChangesMadeInItem(true);
            };

            // Getting called by each and every item in the list
            self.onChangesMadeInItem = function (dirty) {
                if (self.isNotAtLoadingTime)
                    return false;

                self.returnValue(dirty);
                if (self.onChangesMade && typeof (self.onChangesMade) === 'function') {
                    self.onChangesMade(dirty);
                }
            };
            self.beforeBind();

            self.isTabPress = function (data, event) {
                var charCode = (event.which) ? event.which : event.keyCode;
                if ((charCode === 9)) {
                    var rowCount = $('#tblSalesOrderItems').find("tbody tr").length - 1;
                    var index = event.target.id;
                    if (rowCount === +index) {
                        self.keyListenerCallback();
                    }
                }
                return true;
            };

            //calling sales Order Items List remove
            self.deleteSalesOrderItemsList = function () {
                self.checkMsgDisplay = true;
                self.salesOrderItemsList.remove(self.selectedlineitem);

                //self.salesOrderItemsList.remove(self.selectedlineitem);
                self.updateTotalCostAndWeight();
            };

            return self;
        }
        //#endregion
        //#region Internal Methods
        //#endregion
        //#region private Method
        // Updates the main view as per the change in the items
        SalesOrderItemViewModel.prototype.updateTotalCostAndWeight = function () {
            var self = this;

            var totalCost = 0.0, totalweight = 0.0, totalPices = 0.0, totalDisputeCost = 0.0, totalRevenue = 0.0, totalBSCost = 0.0;

            self.salesOrderItemsList().forEach(function (item) {
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

                if (item.weight()) {
                    totalweight += parseInt(item.weight().toString());
                }

                if (item.pieceCount()) {
                    totalPices += parseInt(item.pieceCount().toString());
                }

                if (item.rev()) {
                    var revenueWithoutComma = item.rev().toString();
                    var checkRev = revenueWithoutComma.indexOf(",");
                    if (checkRev === -1) {
                        totalRevenue += parseFloat(item.rev().toString());
                    } else {
                        totalRevenue += parseFloat(revenueWithoutComma.replace(/,/g, ""));
                    }
                }

                if (item.bSCost()) {
                    var bsCostWithoutComma = item.bSCost().toString();
                    var check;
                    check = bsCostWithoutComma.indexOf(",");
                    if (check === -1) {
                        totalBSCost += parseFloat(item.bSCost().toString());
                    } else {
                        //For removing comma before addition because parseFloat is not taking digit after comma at adding time
                        totalBSCost += parseFloat(bsCostWithoutComma.replace(/,/g, ""));
                    }
                }
            });

            //To check if Msg is clicked
            self.checkMsgClick = function () {
                self.checkMsgDisplay = true;
            };

            // to Check if Msg is hidden or closed
            self.checkMsgHide = function () {
                self.checkMsgDisplay = true;
            };

            self.salesOrderItemAmount(totalCost.toFixed(2));
            self.salesOrderRevenue(totalRevenue.toFixed(2));
            self.salesOrderItemWeight(totalweight);
            self.salesOrderItemPieces(totalPices);
            self.salesOrderBsCost($.number(totalBSCost, 2));
            if (self.isNotAtLoadingTime === true && self.isNotAtLoadingTimeForCopyCostRevenue === true) {
                self.originalTotalBSCost(totalBSCost);
                self.originalTotalRevenue(totalRevenue);
                self.originalTotalCost(totalCost);
            }
            self.costOrWeightChanged(totalCost, totalweight, totalPices, totalRevenue, totalBSCost);
        };

        //#endregion
        //#region public method
        // Gets the all needed values like ENUMs
        SalesOrderItemViewModel.prototype.beforeBind = function () {
            var self = this;

            // Load all classes if not loaded already
            var classTypesLength = self.classTypes().length;
            if (!(classTypesLength)) {
                _app.trigger("GetClassTypesAndPackageTypes", function (data) {
                    if (data) {
                        self.classTypes.removeAll();
                        self.classTypes.push.apply(self.classTypes, data['FakTypeEnums']);

                        self.packageTypes.removeAll();
                        self.packageTypes.push.apply(self.packageTypes, data['PackageTypeEnums']);
                    }
                });
            }

            // Load all shipment types if not loaded already
            var shipmentItemTypesLength = self.shipmentItemTypes().length;
            if (!(shipmentItemTypesLength)) {
                _app.trigger("GetItemsTypes", function (items) {
                    self.shipmentItemTypes.removeAll();
                    self.shipmentItemTypes.push.apply(self.shipmentItemTypes, items);
                });
            }

            if (!self.isCallForEdit()) {
                self.addDefaultItems();
            }
        };

        // Adds default line items first time
        SalesOrderItemViewModel.prototype.addDefaultItems = function () {
            var self = this;

            if (self.salesOrderItemsList !== null) {
                self.salesOrderItemsList.removeAll();
            }

            var shipingItem = $.grep(self.shipmentItemTypes(), function (e) {
                return e.ItemId === "10";
            })[0];
            var discountItem = $.grep(self.shipmentItemTypes(), function (e) {
                return e.ItemId === "70";
            })[0];
            var fuelItem = $.grep(self.shipmentItemTypes(), function (e) {
                return e.ItemId === "30";
            })[0];

            self.salesOrderItemsList.push(new refSalesOrderItemModel.Models.SalesOrderItemsModel(shipingItem, function () {
                self.updateTotalCostAndWeight();
            }, self.onChangesMadeInItem, self.updateHazardousValue, self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isCallForEdit(), self.isSubOrder(), self.CanEditItemsDescription()));
            self.salesOrderItemsList.push(new refSalesOrderItemModel.Models.SalesOrderItemsModel(discountItem, function () {
                self.updateTotalCostAndWeight();
            }, self.onChangesMadeInItem, self.updateHazardousValue, self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isCallForEdit(), self.isSubOrder(), self.CanEditItemsDescription()));
            self.salesOrderItemsList.push(new refSalesOrderItemModel.Models.SalesOrderItemsModel(fuelItem, function () {
                self.updateTotalCostAndWeight();
            }, self.onChangesMadeInItem, self.updateHazardousValue, self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isCallForEdit(), self.isSubOrder(), self.CanEditItemsDescription()));
        };

        // to load the sales order item details
        SalesOrderItemViewModel.prototype.initializeSalesOrderItemDetails = function (CanEditItemsDescription, soitems, estimatedProfitPer, gtMinMargin, feeStructure, gtzMargin, isBillingStation, visible, shipmentId, isCallForEdit, iscopyRevenu, isCopyCostOnly) {
            var self = this;
            self.isNotAtLoadingTime = true;
            if (isCopyCostOnly || iscopyRevenu) {
                self.isNotAtLoadingTimeForCopyCostRevenue = false;
            } else {
                self.isNotAtLoadingTimeForCopyCostRevenue = true;
            }
            var totalPlcCost = 0.00;
            if (!self.isSubOrder()) {
                self.estimatedProfitPerc(estimatedProfitPer);
            }
            self.gtMinMargin(gtMinMargin);
            self.feeStructure(feeStructure);
            self.gtzMargin(gtzMargin);
            self.isBillingStation(isBillingStation);
            self.isCallForEdit(isCallForEdit);
            self.CanEditItemsDescription(CanEditItemsDescription);

            if (self.salesOrderItemsList() != null) {
                //self.salesOrderItemsList().forEach(item => {
                //	item.cleanUp();
                //	delete item;
                //});
                self.salesOrderItemsList().removeAll();
            }

            self.isVbVisible(!visible);
            self.isSaveEnable(visible);
            self.shipmentId(shipmentId);

            if (soitems != null) {
                for (var i = 0; i < soitems.length; i++) {
                    // ##START: US21290
                    var item = $.grep(self.shipmentItemTypes(), function (e) {
                        return e.ItemId === soitems[i].ItemId.toString() && (e.AccessorialId == null || soitems[i].AccessorialId == 0 || e.AccessorialId == soitems[i].AccessorialId);
                    })[0];

                    if (typeof item === "undefined" || item == null) {
                        item = $.grep(self.shipmentItemTypes(), function (e) {
                            return e.ItemId === soitems[i].ItemId.toString();
                        })[0];
                    }

                    // ##END: US21290
                    var salesOrderItem = new refSalesOrderItemModel.Models.SalesOrderItemsModel(item, function () {
                        self.updateTotalCostAndWeight();
                    }, self.onChangesMadeInItem, self.updateHazardousValue, self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isCallForEdit(), self.isSubOrder(), self.isSaveEnable());
                    salesOrderItem.initializeVendorBillItem(soitems[i], self.isSaveEnable(), iscopyRevenu, CanEditItemsDescription, isCopyCostOnly);
                    totalPlcCost += soitems[i].PLCCost;
                    self.salesOrderItemsList.push(salesOrderItem);
                }

                self.salesOrderBsCost(totalPlcCost);
                self.updateHazardousValue();
                self.updateTotalCostAndWeight();
            }

            self.isNotAtLoadingTime = false;
            self.isNotAtLoadingTimeForCopyCostRevenue = false;
        };

        // Shows the message box as pr the given title and message
        SalesOrderItemViewModel.prototype.showConfirmationMessage = function (message, title, fisrtButtoName, secondButtonName, yesCallBack, noCallBack) {
            var self = this;

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
            _app.showDialog('templates/messageBox', optionControlArgs, 'slideDown');
        };

        // Checks validation in all the items
        SalesOrderItemViewModel.prototype.validateItems = function () {
            var self = this;
            var isInvalid = false;
            if (self.salesOrderItemsList().length > 0) {
                self.salesOrderItemsList().forEach(function (item) {
                    if (item.checkValidation()) {
                        isInvalid = true;
                    }
                });
            } else {
                isInvalid = true;
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.ThereShouldBeAtLeastOneLineItem, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
            }

            return isInvalid;
        };

        //For Copying Cost and Revenue
        SalesOrderItemViewModel.prototype.copyCostRevenue = function (OrgItem) {
            var self = this;

            var items = $.grep(OrgItem, function (e) {
                return e.isCheck();
            });

            self.copyAdjustedOrderItemList(self.adjustedOrderItemList());
            if (items.length > 0) {
                //When we are copying the cost and revenue then no need to calculate the Revenue again
                self.copyCostAndRevenueFromTab(items, true);
                self.calculateRevenue(true);

                //Calculate BS,PLC Cost and Revenue
                //self.calculateRevenueForChanges();
                //After updating populate the items
                self.initializeSalesOrderItemDetails(self.CanEditItemsDescription(), self.adjustedOrderItemList(), self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isSaveEnable(), self.shipmentId(), self.isCallForEdit(), true, false);

                self.calculateRevenue(false);
            } else {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 3,
                        fadeOut: 3,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectanItem, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
            }
        };

        //For Copying Cost
        SalesOrderItemViewModel.prototype.copyCostOnly = function (orgItem) {
            var self = this;
            var items = $.grep(orgItem, function (e) {
                return e.isCheck();
            });

            if (items.length > 0) {
                //When we are copying the cost and revenue then no need to calculate the Revenue again
                self.copyCostAndRevenueFromTab(items, false);

                //Calculate BS,PLC Cost and Revenue
                //self.calculateRevenueForChanges();
                //After updating populate the items
                self.initializeSalesOrderItemDetails(self.CanEditItemsDescription(), self.adjustedOrderItemList(), self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isSaveEnable(), self.shipmentId(), self.isCallForEdit(), false, true);
                //Make revert back calculateRevenue to false for further calculation
            } else {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 3,
                        fadeOut: 3,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectanItem, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
            }
        };

        SalesOrderItemViewModel.prototype.copyCostOnlyFromAuditBill = function (orgItem) {
            var self = this;
            var items = $.grep(orgItem, function (e) {
                return e.isCheck();
            });

            if (items.length > 0) {
                self.copyRowtoother(self.salesOrderItemsList());

                //When we are copying the cost and revenue then no need to calculate the Revenue again
                self.copyCostFromAuditBill(items);
                self.initializeSalesOrderItemDetails(self.CanEditItemsDescription(), self.adjustedOrderItemList(), self.estimatedProfitPerc(), self.gtMinMargin(), self.feeStructure(), self.gtzMargin(), self.isBillingStation(), self.isSaveEnable(), self.shipmentId(), self.isCallForEdit(), false, true);
            } else {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 3,
                        fadeOut: 3,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectanItem, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
            }
        };

        //Copy the Cost and revenue to the item tab
        SalesOrderItemViewModel.prototype.copyCostAndRevenueFromTab = function (adjustedOrderCopy, isCopyCostRevenue) {
            var self = this;
            self.matchrowArray().removeAll();
            var count = adjustedOrderCopy.length;

            adjustedOrderCopy.forEach(function (row) {
                var itemId = row.itemId();
                var itemArr = $.grep(self.adjustedOrderItemList(), function (e) {
                    return e.ItemId === itemId;
                });
                if (itemArr != null && itemArr.length > 0) {
                    //Filter out the matched row
                    self.fetchTheMatchedRow(row);

                    if (self.matchrowArray().length == 1) {
                        self.matchrowArray()[0].IsCalculateRevenue = true;
                        if (!self.matchrowArray()[0].isUpdated) {
                            self.matchrowArray()[0].Cost = row.cost();
                            if (isCopyCostRevenue) {
                                self.matchrowArray()[0].PLCCost = row.bSCost();
                                self.matchrowArray()[0].Revenue = row.rev();
                            }
                            self.matchrowArray()[0].isUpdated = true;
                            self.copyRow(row, self.matchrowArray()[0], isCopyCostRevenue);
                        } else {
                            self.addnewRow(row);
                        }
                    } else if (self.matchrowArray().length > 1) {
                        var counter = 0;
                        self.matchrowArray()[counter].IsCalculateRevenue = true;
                        if (!self.matchrowArray()[counter].isUpdated) {
                            self.matchrowArray()[counter].Cost = row.cost();
                            if (isCopyCostRevenue) {
                                self.matchrowArray()[counter].PLCCost = row.bSCost();
                                self.matchrowArray()[counter].Revenue = row.rev();
                            }
                            self.matchrowArray()[counter].isUpdated = true;
                            self.addnewRow(row);
                        } else {
                            counter = counter + 1;
                            self.matchrowArray()[counter].Cost = row.cost();
                            if (isCopyCostRevenue) {
                                self.matchrowArray()[counter].PLCCost = row.bSCost();
                                self.matchrowArray()[counter].Revenue = row.rev();
                            }
                            self.matchrowArray()[counter].isUpdated = true;
                        }
                    } else {
                        self.addnewRow(row);
                    }
                } else {
                    self.addnewRow(row);
                }
            });
        };

        //Copy the Cost and revenue to the item tab
        SalesOrderItemViewModel.prototype.copyCostFromAuditBill = function (adjustedOrderCopy) {
            var self = this;
            self.matchrowArray().removeAll();
            var count = adjustedOrderCopy.length;
            adjustedOrderCopy.forEach(function (row) {
                var itemId = row.itemId();
                var itemArr = $.grep(self.adjustedOrderItemList(), function (e) {
                    return e.ItemId === itemId;
                });

                if (itemArr != null && itemArr.length > 0) {
                    //Filter out the matched row
                    self.fetchTheMatchedRowFromAuditBill(row);

                    if (self.matchrowArray().length == 1) {
                        self.matchrowArray()[0].IsCalculateRevenue = true;
                        if (!self.matchrowArray()[0].isUpdated) {
                            self.matchrowArray()[0].Cost = row.cost();
                            self.matchrowArray()[0].isUpdated = true;
                            self.copyRowFromAuditBill(row, self.matchrowArray()[0]);
                        } else {
                            self.addnewRowFromAuditBill(row);
                        }
                    } else if (self.matchrowArray().length > 1) {
                        var counter = 0;
                        self.matchrowArray()[counter].IsCalculateRevenue = true;
                        if (!self.matchrowArray()[counter].isUpdated) {
                            self.matchrowArray()[counter].Cost = row.cost();
                            self.matchrowArray()[counter].isUpdated = true;
                            self.addnewRowFromAuditBill(row);
                        } else {
                            counter = counter + 1;
                            self.matchrowArray()[counter].Cost = row.cost();
                            self.matchrowArray()[counter].isUpdated = true;
                        }
                    } else {
                        self.addnewRowFromAuditBill(row);
                    }
                } else {
                    self.addnewRowFromAuditBill(row);
                }
            });
        };

        //Fetch Only Matched Row For SalesOrder-- According to the ItemId,Class,Description
        SalesOrderItemViewModel.prototype.fetchTheMatchedRow = function (row) {
            var self = this;
            self.matchrowArray().removeAll();
            if (row.itemId() == parseInt(Constants.ApplicationConstants.ShippingItemId)) {
                self.adjustedOrderItemList().forEach(function (item) {
                    self.matchrowArray($.grep(self.adjustedOrderItemList(), function (e) {
                        return e.ItemId === row.itemId() && e.UserDescription === row.userDescription() && e.Class === row.selectedClassType();
                    }));
                });
            } else {
                self.adjustedOrderItemList().forEach(function (item) {
                    self.matchrowArray($.grep(self.adjustedOrderItemList(), function (e) {
                        return e.ItemId === row.itemId() && e.UserDescription === row.userDescription();
                    }));
                });
            }
        };

        //Fetch Only Matched Row For SalesOrder-- According to the ItemId,Class,Description From Audit Bill
        SalesOrderItemViewModel.prototype.fetchTheMatchedRowFromAuditBill = function (row) {
            var self = this;
            self.matchrowArray().removeAll();
            if (row.itemId() == parseInt(Constants.ApplicationConstants.ShippingItemId)) {
                self.adjustedOrderItemList().forEach(function (item) {
                    self.matchrowArray($.grep(self.adjustedOrderItemList(), function (e) {
                        return e.ItemId === row.itemId() && e.UserDescription === row.userDescription() && e.Class === row.selectedClassType();
                    }));
                });
            } else {
                self.adjustedOrderItemList().forEach(function (item) {
                    self.matchrowArray($.grep(self.adjustedOrderItemList(), function (e) {
                        return e.ItemId === row.itemId() && e.UserDescription === row.userDescription();
                    }));
                });
            }
        };

        /// Calculate Revenue for the cost which is copied
        /// Also calculate the BS or PLC cost according to the CustomerType
        SalesOrderItemViewModel.prototype.calculateRevenueForChanges = function () {
            var self = this;
            var isAorder = false;

            // find out the current order is A order or main order
            var check = self.salesOrderId().search(' ');
            if (check != -1) {
                isAorder = true;
            }

            var profitPercentage = 0;
            if (!isAorder) {
                profitPercentage = self.estimatedProfitPerc();
            } else {
                profitPercentage = self.finalProfitPerc();
            }

            //Calculate the revenue and BS or Plc cost
            self.adjustedOrderItemList().forEach(function (row) {
                if (row.isUpdated) {
                    self.plcorBSCost(0);
                    self.plcorBSRevenue(0);
                    self.calculatePLCorBSCostAndRevenue(row.Cost, self.customerTypeOf(), profitPercentage);
                    if (!self.calculateRevenue()) {
                        row.Revenue = $.number(self.plcorBSRevenue(), 2);
                        row.PLCCost = $.number(self.plcorBSCost(), 2);
                    }
                }
            });
        };

        //Calculate BS or PLC Cost and corresponding revenue
        SalesOrderItemViewModel.prototype.calculatePLCorBSCostAndRevenue = function (cost, customerType, profitPercentage) {
            var self = this;
            var gtMarginPercentage = self.commonUtils.isNullOrEmptyOrWhiteSpaces(self.gtzMargin()) ? self.gtzMargin() : 0;
            var plcMarginPercentage = self.commonUtils.isNullOrEmptyOrWhiteSpaces(self.plcMargin()) ? self.plcMargin() : 0;
            var plcCostOriginal = 0.0;
            var plcCostFlat = 0.0;
            var gtMinMarginFlat = self.gtMinMargin();

            switch (self.feeStructure()) {
                case refEnums.Enums.FeeStructure.OverCost.ID:
                    if (self.isBillingStation()) {
                        plcCostOriginal = $.number(parseFloat(cost.toString().replace(/,/g, "")) / (1 - (parseFloat(gtMarginPercentage.toString().replace(/,/g, "")) / 100)), 2);
                        if (cost != 0) {
                            plcCostFlat = $.number(parseFloat(cost.toString().replace(/,/g, "")) + parseFloat(gtMinMarginFlat.toString().replace(/,/g, "")), 2);
                        }
                        self.plcorBSCost(plcCostOriginal > plcCostFlat ? plcCostOriginal : plcCostFlat);
                    } else {
                        self.plcorBSCost($.number(parseFloat(cost.toString().replace(/,/g, "")) + (parseFloat(cost.toString().replace(/,/g, "")) * parseFloat(cost.toString().replace(/,/g, ""))) / 100, 2));
                    }

                    if (self.isBillingStation()) {
                        self.plcorBSRevenue($.number((parseFloat(cost.toString().replace(/,/g, "")) * 100) / (100 - parseFloat(plcMarginPercentage.toString().replace(/,/g, ""))), 2));
                    }

                    break;
                case refEnums.Enums.FeeStructure.OverRevenue.ID:
                    if (self.plcorBSRevenue() == 0) {
                        if (self.isBillingStation()) {
                            self.plcorBSRevenue($.number((parseFloat(cost.toString().replace(/,/g, "")) * 100) / (100 - parseFloat(plcMarginPercentage.toString().replace(/,/g, ""))), 2));
                        }
                    }
                    plcCostOriginal = $.number(parseFloat(cost.toString().replace(/,/g, "")) + ((parseFloat(self.plcorBSRevenue().toString().replace(/,/g, "")) - parseFloat(cost.toString().replace(/,/g, ""))) + (parseFloat(gtMarginPercentage.toString().replace(/,/g, "")) / 100)), 2);
                    if (cost != 0) {
                        plcCostFlat = $.number(parseFloat(cost.toString().replace(/,/g, "")) + parseFloat(gtMinMarginFlat.toString().replace(/,/g, "")), 2);
                    }
                    self.plcorBSCost(plcCostOriginal > plcCostFlat ? plcCostOriginal : plcCostFlat);
                    break;
                default:
                    if (customerType != refEnums.Enums.CustomerType.PLC_Customer.ID && customerType != refEnums.Enums.CustomerType.BillingStation_Customer.ID) {
                        self.plcorBSCost(0);
                        if (self.plcorBSRevenue() == 0) {
                            self.plcorBSRevenue($.number(parseFloat(cost.toString().replace(/,/g, "")) / (1 - (parseFloat(profitPercentage.toString().replace(/,/g, "")) / 100)), 2));
                        }
                    }

                    break;
            }
        };

        SalesOrderItemViewModel.prototype.addnewRow = function (row, onlyCopyCost) {
            var self = this;
            var newitem = new refSalesOrderItemDetail.Models.SalesOrderItemDetail();
            newitem.Id = 0;
            newitem.isUpdated = false;
            newitem.Items = row.items();
            newitem.UserDescription = row.userDescription();
            newitem.Cost = row.cost();
            newitem.Revenue = row.rev();
            newitem.IsCalculateRevenue = true;
            if (!onlyCopyCost) {
                newitem.Revenue = row.rev();
                newitem.PLCCost = row.bSCost();
            }
            newitem.SalesOrderId = row.salesOrderId();
            newitem.ItemId = row.itemId();
            newitem.AccessorialId = row.accessorialId();

            newitem.ProductCode = row.productCode();

            if (row.itemId() == 10) {
                newitem.NMFC = row.nmfc();
                newitem.Class = row.selectedClassType();
                newitem.Length = row.dimensionLength();
                newitem.Weight = row.weight();
                newitem.Width - row.dimensionWidth();
                newitem.Height = row.dimensionHeight();
                newitem.Hazardous = row.isHazardous();

                //newitem.PackageTypeId = row.packageTypes()[0].ID;
                //newitem.PackageTypeName = row.packageTypes()[0].Value;
                //newitem.PackageTypes.ID = row.packageTypes()[0].ID;
                //newitem.PackageTypes.Value = row.packageTypes()[0].Value;
                newitem.HazardousUNNo = row.hazmatUnNumber();
                newitem.PalletCount = row.palletCount();
                newitem.PackingGroupNo = row.packingGroup();
            } else {
                newitem.Class = null;
                newitem.HazardousUNNo = null;
                newitem.Height = null;
                newitem.Length = null;
                newitem.Weight = null;
                newitem.Width = null;
                newitem.NMFC = null;
                newitem.PackageTypes = null;
                newitem.PackingGroupNo = null;
                newitem.PalletCount = null;
            }

            self.adjustedOrderItemList().push(newitem);
        };

        // Adds New Row For Audited Bill
        SalesOrderItemViewModel.prototype.addnewRowFromAuditBill = function (row) {
            var self = this;
            var newitem = new refSalesOrderItemDetail.Models.SalesOrderItemDetail();
            newitem.Id = 0;
            newitem.isUpdated = false;
            newitem.Items = row.items();
            newitem.UserDescription = row.userDescription();
            newitem.Cost = row.cost();
            newitem.ItemId = row.itemId();
            newitem.IsCalculateRevenue = true;
            if (row.itemId() == 10) {
                newitem.Class = row.selectedClassType() ? row.selectedClassType() : null;
                newitem.Weight = row.weight() ? row.weight() : null;
                newitem.PieceCount = row.pieceCount() ? row.pieceCount() : null;
            } else {
                newitem.Class = null;
                newitem.HazardousUNNo = null;
                newitem.Height = null;
                newitem.Length = null;
                newitem.Weight = null;
                newitem.Width = null;
                newitem.NMFC = null;
                newitem.PackageTypes = null;
                newitem.PackingGroupNo = null;
                newitem.PalletCount = null;
            }

            self.adjustedOrderItemList().push(newitem);
        };

        SalesOrderItemViewModel.prototype.copyRowtoother = function (items) {
            var self = this;
            self.adjustedOrderItemList().removeAll();
            items.forEach(function (item) {
                self.adjustedOrderItem = new refSalesOrderItemDetail.Models.SalesOrderItemDetail();
                self.adjustedOrderItem.BsCost = item.bSCost();

                //self.adjustedOrderItem.Class = parseInt(item.classTypes()[0].Value);
                //self.adjustedOrderItem.ClassTypes[0]. = item.classTypes()[0]
                self.adjustedOrderItem.Cost = item.cost();

                //self.adjustedOrderItem.Items = item.items();
                self.adjustedOrderItem.UserDescription = item.userDescription();
                self.adjustedOrderItem.Cost = item.cost();

                self.adjustedOrderItem.Revenue = item.rev();
                self.adjustedOrderItem.PLCCost = item.bSCost();

                //self.adjustedOrderItem.SalesOrderId = item.salesOrderId();
                self.adjustedOrderItem.ItemId = item.itemId();

                if (item.itemId() == 10) {
                    self.adjustedOrderItem.NMFC = item.nmfc();
                    self.adjustedOrderItem.Class = typeof (item.selectedClassType()) != 'undefined' ? item.selectedClassType() : null;
                    self.adjustedOrderItem.Length = item.dimensionLength();
                    self.adjustedOrderItem.Weight = item.weight();
                    self.adjustedOrderItem.Width - item.dimensionWidth();
                    self.adjustedOrderItem.Height = item.dimensionHeight();
                    self.adjustedOrderItem.Hazardous = item.isHazardous();
                    self.adjustedOrderItem.HazardousUNNo = item.hazmatUnNumber();
                    self.adjustedOrderItem.PalletCount = item.palletCount();
                    self.adjustedOrderItem.PackingGroupNo = item.packingGroup();
                    self.adjustedOrderItem.PackageTypeId = item.selectedPackageType();
                    self.adjustedOrderItem.PieceCount = item.pieceCount();
                } else {
                    self.adjustedOrderItem.Class = null;
                    self.adjustedOrderItem.HazardousUNNo = null;
                    self.adjustedOrderItem.Height = null;
                    self.adjustedOrderItem.Length = null;
                    self.adjustedOrderItem.Weight = null;
                    self.adjustedOrderItem.Width = null;
                    self.adjustedOrderItem.NMFC = null;
                    self.adjustedOrderItem.PackageTypes = null;
                    self.adjustedOrderItem.PackingGroupNo = null;
                    self.adjustedOrderItem.PalletCount = null;
                }
                self.adjustedOrderItemList().push(self.adjustedOrderItem);
            });
        };

        SalesOrderItemViewModel.prototype.copyRow = function (row, items, onlyCopyCost) {
            var self = this;
            self.adjustedOrderItemList().forEach(function (item) {
                if (item.ItemId == parseInt(Constants.ApplicationConstants.ShippingItemId)) {
                    if (item.ItemId == items.ItemId && item.Class == items.Class && item.UserDescription == items.UserDescription) {
                        item.isUpdated = false;
                        item.Items = row.items();
                        item.UserDescription = row.userDescription();
                        item.Cost = row.cost();
                        if (onlyCopyCost) {
                            item.Revenue = row.rev();
                            item.PLCCost = row.bSCost();
                        }

                        item.SalesOrderId = row.salesOrderId();
                        item.ItemId = row.itemId();
                        item.AccessorialId = row.accessorialId();

                        item.ProductCode = row.productCode();
                        if (row.itemId() == 10) {
                            item.NMFC = row.nmfc();
                            item.Class = row.selectedClassType();
                            item.Length = row.dimensionLength();
                            item.Weight = row.weight();
                            item.Width - row.dimensionWidth();
                            item.Height = row.dimensionHeight();
                            item.Hazardous = row.isHazardous();
                            item.HazardousUNNo = row.hazmatUnNumber();
                            item.PalletCount = row.palletCount();
                            item.PackingGroupNo = row.packingGroup();
                        } else {
                            item.Class = null;
                            item.HazardousUNNo = null;
                            item.Height = null;
                            item.Length = null;
                            item.Weight = null;
                            item.Width = null;
                            item.NMFC = null;
                            item.PackageTypes = null;
                            item.PackingGroupNo = null;
                            item.PalletCount = null;
                        }
                    }
                } else {
                    if (item.ItemId == items.ItemId && item.UserDescription == items.UserDescription) {
                        item.isUpdated = false;
                        item.Items = row.items();
                        item.UserDescription = row.userDescription();
                        item.Cost = row.cost();
                        if (onlyCopyCost) {
                            item.Revenue = row.rev();
                            item.PLCCost = row.bSCost();
                        }

                        item.SalesOrderId = row.salesOrderId();
                        item.ItemId = row.itemId();
                        item.AccessorialId = row.accessorialId();

                        item.ProductCode = row.productCode();
                        if (row.itemId() == 10) {
                            item.NMFC = row.nmfc();
                            item.Class = row.selectedClassType();
                            item.Length = row.dimensionLength();
                            item.Weight = row.weight();
                            item.Width - row.dimensionWidth();
                            item.Height = row.dimensionHeight();
                            item.Hazardous = row.isHazardous();
                            item.HazardousUNNo = row.hazmatUnNumber();
                            item.PalletCount = row.palletCount();
                            item.PackingGroupNo = row.packingGroup();
                        } else {
                            item.Class = null;
                            item.HazardousUNNo = null;
                            item.Height = null;
                            item.Length = null;
                            item.Weight = null;
                            item.Width = null;
                            item.NMFC = null;
                            item.PackageTypes = null;
                            item.PackingGroupNo = null;
                            item.PalletCount = null;
                        }
                    }
                }
            });
        };

        // Copy Row Of Audit Bill
        SalesOrderItemViewModel.prototype.copyRowFromAuditBill = function (row, items) {
            var self = this;
            self.adjustedOrderItemList().forEach(function (item) {
                if (item.ItemId == parseInt(Constants.ApplicationConstants.ShippingItemId)) {
                    if (item.ItemId == items.ItemId && item.Class == items.Class && item.UserDescription == items.UserDescription) {
                        item.isUpdated = false;
                        item.Items = row.items();
                        item.UserDescription = row.userDescription();
                        item.Cost = row.cost();
                        item.ItemId = row.itemId();
                        if (row.itemId() == 10) {
                            item.Class = row.selectedClassType() ? row.selectedClassType() : null;
                            item.Weight = row.weight() ? row.weight() : null;
                            item.PieceCount = row.pieceCount() ? row.pieceCount() : null;
                        } else {
                            item.Class = null;
                            item.HazardousUNNo = null;
                            item.Height = null;
                            item.Length = null;
                            item.Weight = null;
                            item.Width = null;
                            item.NMFC = null;
                            item.PackageTypes = null;
                            item.PackingGroupNo = null;
                            item.PalletCount = null;
                        }
                    }
                } else {
                    if (item.ItemId == items.ItemId && item.UserDescription == items.UserDescription) {
                        item.isUpdated = false;
                        item.Items = row.items();
                        item.UserDescription = row.userDescription();
                        item.Cost = row.cost();
                        item.ItemId = row.itemId();
                        if (row.itemId() == 10) {
                            item.Class = row.selectedClassType() ? row.selectedClassType() : null;
                            item.Weight = row.weight() ? row.weight() : null;
                            item.PieceCount = row.pieceCount() ? row.pieceCount() : null;
                        } else {
                            item.Class = null;
                            item.HazardousUNNo = null;
                            item.Height = null;
                            item.Length = null;
                            item.Weight = null;
                            item.Width = null;
                            item.NMFC = null;
                            item.PackageTypes = null;
                            item.PackingGroupNo = null;
                            item.PalletCount = null;
                        }
                    }
                }
            });
        };

        SalesOrderItemViewModel.prototype.copyRevenueAndCost = function (item, type) {
            var self = this;
            self.copyRowtoother(self.salesOrderItemsList());
            if (type == 1) {
                self.copyCostOnly(item);
            } else {
                self.copyCostRevenue(item);
            }
        };

        SalesOrderItemViewModel.prototype.cleanUp = function () {
            var self = this;

            self.salesOrderItemsList().forEach(function (item) {
                item.cleanUp();
                delete item;
            });

            self.salesOrderItemsList.removeAll();

            for (var property in self) {
                delete self[property];
            }

            //delete self.salesOrderItemsList;
            //delete self.salesOrderItemsList;
            //delete self.onAdd;
            //delete self.markAllForDelete;
            //delete self.IsNumber;
            //delete self.isCurrency;
            //delete self.itemCliked;
            //delete self.costOrWeightChanged;
            //delete self.removeLineItem;
            //delete self.onChangesMade;
            //delete self.onChangesMadeInItem;
            //delete self.deleteSalesOrderItemsList;
            //delete self.checkMsgDisplay;
            //delete self.checkMsgClick;
            //delete self.checkMsgHide;
            //delete self.keyListenerCallback;
            //delete self.isTabPress;
            //delete self.hazardousChanged;
            //delete self.updateHazardousValue;
            //delete self.updateAuditedBill;
            delete self;
        };

        //#endregion
        //#region Life Cycle Event
        SalesOrderItemViewModel.prototype.compositionComplete = function (view, parent) {
        };

        SalesOrderItemViewModel.prototype.activate = function () {
            return true;
        };

        //** Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button. */
        SalesOrderItemViewModel.prototype.attached = function () {
            _app.trigger('viewAttached');
        };
        return SalesOrderItemViewModel;
    })();
    exports.SalesOrderItemViewModel = SalesOrderItemViewModel;
});
