//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/SalesOrderModels.d.ts" />
//#endregion
define(["require", "exports", 'plugins/router', 'durandal/app', 'salesOrder/SalesOrderRebillItemsModel'], function(require, exports, ___router__, ___app__, __refSalesOrderReBillItemsModel__) {
    
    var _router = ___router__;
    var _app = ___app__;
    
    
    var refSalesOrderReBillItemsModel = __refSalesOrderReBillItemsModel__;

    //#endregion
    /*
    ** <summary>
    ** Sales Order Rebill Items View Model.
    ** </summary>
    ** <createDetails>
    ** <id>US13230</id> <by>Sankesh</by> <date>10th Nov, 2014</date>
    ** </createDetails>
    ** <changeHistory>
    ** <id>DE21018</id> <by>Chandan Singh</by> <date>16/12/2015</date>
    ** <id>US21290</id> <by>Shreesha Adiga</by> <date>21-03-2016</date><description>Show item description based on accessorial id also</description>
    ** <id>US21290</id> <by>Shreesha Adiga</by> <date>23-03-2016</date><description>If item selected based on itemid and accessorialId is undefined, then select based only on itemId</description>
    ** </changeHistory>
    */
    var SalesOrderReBillItemViewModel = (function () {
        //#endregion
        //#region Constructor
        function SalesOrderReBillItemViewModel() {
            //#region Members
            this.salesOrderOriginalItemsList = ko.observableArray([]);
            this.salesOrderAdjustedItemsList = ko.observableArray([]);
            this.classTypes = ko.observableArray([]);
            this.packageTypes = ko.observableArray([]);
            this.shipmentItemTypes = ko.observableArray([]);
            this.orginalItemList = ko.observableArray([]);
            this.isSelect = ko.observable(false);
            this.isBOLnumber = ko.observable(false);
            this.isRev = ko.observable(false);
            this.isHaz = ko.observable(false);
            //isHazTotal: KnockoutObservable<string> = ko.observable('');
            this.selectedorginalItemList = ko.observableArray([]);
            this.gridHeader = ko.observable('');
            this.name = ko.observable('Select All');
            this.selected = ko.observable(false);
            this.html = ko.observable('');
            this.salesOrderItemAmount = ko.observable();
            this.salesOrderRevenue = ko.observable();
            this.salesOrderItemWeight = ko.observable();
            this.salesOrderItemPieces = ko.observable();
            this.salesOrderBsCost = ko.observable();
            this.isBSCost = ko.observable(false);
            this.isSaveEnable = ko.observable(true);
            var self = this;

            self.beforeBind();
        }
        //#endregion}
        //#region Internal public Methods
        // Gets the all needed values like ENUMs
        SalesOrderReBillItemViewModel.prototype.beforeBind = function () {
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
            //self.addDefaultItems();
        };

        // Adds default line items first time
        SalesOrderReBillItemViewModel.prototype.addDefaultItems = function () {
            var self = this;

            if (self.salesOrderOriginalItemsList !== null) {
                self.salesOrderOriginalItemsList.removeAll();
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

            self.salesOrderOriginalItemsList.push(new refSalesOrderReBillItemsModel.Models.SalesOrderReBillItemsModel(shipingItem, function () {
                self.updateCheck();
            }));
            self.salesOrderOriginalItemsList.push(new refSalesOrderReBillItemsModel.Models.SalesOrderReBillItemsModel(discountItem, function () {
                self.updateCheck();
            }));
            self.salesOrderOriginalItemsList.push(new refSalesOrderReBillItemsModel.Models.SalesOrderReBillItemsModel(fuelItem, function () {
                self.updateCheck();
            }));
        };

        // to load the sales order item details
        SalesOrderReBillItemViewModel.prototype.initializeSalesOrderRebillItemDetails = function (items, enable) {
            var self = this;
            var totalCost = 0.0, totalweight = 0.0, totalPices = 0.0, totalRevenue = 0.0, totalPlcCost = 0.00;

            self.orginalItemList(items);
            self.isSaveEnable(enable);

            if (self.salesOrderOriginalItemsList != null)
                self.salesOrderOriginalItemsList.removeAll();

            if (items != null) {
                var BOLNo = '';
                for (var i = 0; i < items.length; i++) {
                    if (BOLNo != items[i].BOLNumber) {
                        BOLNo = items[i].BOLNumber;
                        if (i !== 0) {
                            //##START: US21290
                            var item = $.grep(self.shipmentItemTypes(), function (e) {
                                return e.ItemId === items[i].ItemId.toString() && (e.AccessorialId == null || items[i].AccessorialId == 0 || e.AccessorialId == items[i].AccessorialId);
                            })[0];

                            if (typeof item === "undefined" || item == null) {
                                item = $.grep(self.shipmentItemTypes(), function (e) {
                                    return e.ItemId === items[i].ItemId.toString();
                                })[0];
                            }

                            //##END: US21290
                            var salesOrderItem = new refSalesOrderReBillItemsModel.Models.SalesOrderReBillItemsModel(item, function () {
                                self.updateCheck();
                            });

                            // ###START: DE21018
                            salesOrderItem.initializeTotal(totalRevenue, totalCost, totalPices, totalweight, totalPlcCost, false, item.ItemId);

                            // ###END: DE21018
                            self.salesOrderOriginalItemsList.push(salesOrderItem);

                            self.salesOrderRevenue($.number(totalRevenue.toString(), 2));
                            self.salesOrderItemAmount($.number(totalCost.toString(), 2));
                            self.salesOrderItemPieces(totalPices);
                            self.salesOrderItemWeight(totalweight);
                            self.salesOrderBsCost($.number(totalPlcCost.toString(), 2));

                            totalCost = 0.0;
                            totalweight = 0.0;
                            totalPices = 0.0;
                            totalRevenue = 0.0;
                            totalPlcCost = 0.00;
                        }
                    } else {
                        items[i].BOLNumber = '';
                    }

                    //##START: US21290
                    var item = $.grep(self.shipmentItemTypes(), function (e) {
                        return e.ItemId === items[i].ItemId.toString() && (e.AccessorialId == null || items[i].AccessorialId == 0 || e.AccessorialId == items[i].AccessorialId);
                    })[0];

                    if (typeof item === "undefined" || item == null) {
                        item = $.grep(self.shipmentItemTypes(), function (e) {
                            return e.ItemId === items[i].ItemId.toString();
                        })[0];
                    }

                    //##END: US21290
                    var salesOrderItem = new refSalesOrderReBillItemsModel.Models.SalesOrderReBillItemsModel(item, function () {
                        self.updateCheck();
                    });
                    if (self.selected()) {
                        items[i].isChecked = true;
                    } else {
                        items[i].isChecked = false;
                    }
                    salesOrderItem.initializeSalesOrderItem(items[i], items.length, true);
                    totalCost += items[i].Cost;
                    totalweight += items[i].Weight;
                    totalPices += items[i].PieceCount;
                    totalRevenue += items[i].Revenue;
                    totalPlcCost += items[i].PLCCost;
                    self.salesOrderOriginalItemsList.push(salesOrderItem);

                    self.salesOrderRevenue($.number(totalRevenue.toString(), 2));
                    self.salesOrderItemAmount($.number(totalCost.toString(), 2));
                    self.salesOrderItemPieces(totalPices);
                    self.salesOrderItemWeight(totalweight);
                    self.salesOrderBsCost($.number(totalPlcCost.toString(), 2));
                }
            }
        };

        SalesOrderReBillItemViewModel.prototype.cleanup = function () {
            var self = this;
            self.salesOrderOriginalItemsList.removeAll();
            self.salesOrderAdjustedItemsList.removeAll();
            self.selectedorginalItemList.removeAll();
            self.orginalItemList.removeAll();
            self.classTypes.removeAll();
            self.shipmentItemTypes.removeAll();
            self.packageTypes.removeAll();

            delete self.salesOrderOriginalItemsList;
            delete self.salesOrderAdjustedItemsList;
            delete self.selectedorginalItemList;
            delete self.orginalItemList;
            delete self.classTypes;
            delete self.shipmentItemTypes;
            delete self.packageTypes;

            delete self.salesOrderOriginalItemsList;
            delete self.addDefaultItems;

            delete self.name;
            delete self.html;
            delete self.gridHeader;
            delete self.selected;
            delete self.isBOLnumber;
            delete self.isBSCost;
            delete self.isHaz;
            delete self.isRev;
            delete self.isSelect;
            delete self.isSaveEnable;
            delete self.selected;

            delete self.salesOrderItemAmount;
            delete self.salesOrderRevenue;
            delete self.salesOrderItemWeight;
            delete self.salesOrderItemPieces;
            delete self.salesOrderBsCost;

            delete self;
        };

        //#endregion
        //#region Internal private methods
        SalesOrderReBillItemViewModel.prototype.selectOption = function () {
            var self = this;
            if (!self.selected()) {
                self.selected(true);
                self.html('<i class="icon-ok icon-white active"></i>' + self.name());

                // then check all check boxes
                self.salesOrderOriginalItemsList().forEach(function (item) {
                    item.isCheck(true);
                });
            } else {
                self.selected(false);

                // then uncheck all check boxes
                self.salesOrderOriginalItemsList().forEach(function (item) {
                    item.isCheck(false);
                });
            }
        };

        SalesOrderReBillItemViewModel.prototype.updateCheck = function () {
            var self = this;
            var count = $.grep(self.salesOrderOriginalItemsList(), function (e) {
                return e.isCheck();
            });

            if (count.length == self.salesOrderOriginalItemsList().length) {
                self.selected(true);
                self.html('<i class="icon-ok icon-white active"></i>' + self.name());
            } else {
                self.selected(false);
            }
        };
        return SalesOrderReBillItemViewModel;
    })();
    exports.SalesOrderReBillItemViewModel = SalesOrderReBillItemViewModel;
});
