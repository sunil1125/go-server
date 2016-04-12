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
define(["require", "exports", 'plugins/router', 'durandal/app', 'services/models/vendorBill/VendorBillItemDetails', 'services/models/vendorBill/VendorBillContainer', 'services/client/VendorBillClient', 'services/models/common/Enums'], function(require, exports, ___router__, ___app__, ___refVendorBillItemModel__, ___refVendorBillContainerModel__, __refVendorBillClient__, __refEnums__) {
    
    var _router = ___router__;
    var _app = ___app__;
    
    
    var _refVendorBillItemModel = ___refVendorBillItemModel__;
    var _refVendorBillContainerModel = ___refVendorBillContainerModel__;
    var refVendorBillClient = __refVendorBillClient__;
    var refEnums = __refEnums__;

    //#endregion
    /*
    ** <summary>
    ** Vendor Bill Dispute Losts View Model.
    ** </summary>
    ** <createDetails>
    ** <id></id> <by>Satish</by> <date>27th May, 2014</date>
    ** </createDetails>}
    ** <changeHistory>}
    ** <id>US9669</id> <by>Achal Rastogi</by> <date>6-3-2014</date>
    ** </changeHistory>
    */
    var VendorBillDisputeLost = (function () {
        //#region Constructor
        function VendorBillDisputeLost() {
            this.vendorBillClient = new refVendorBillClient.VendorBillClient();
            this.vendorBillItemsList = ko.observableArray([]);
            this.proNumber = ko.observable('');
            this.totalDisputeLostShouldNotBeZero = ko.observable('');
            this.isSaveEnable = ko.observable(true);
            this.listProgress = ko.observable(false);
            var self = this;

            //set the flag allow decimal: true to accepts decimals
            self.NumericInputWithDecimalPoint = { allowdecimal: ko.observable(true), maxlength: 11, autodigit: ko.observable(true) };

            self.onSave = function () {
                if (!self.validateItems()) {
                    self.listProgress(true);
                    var vendorBillData = new _refVendorBillContainerModel.Models.VendorBillContainer();

                    vendorBillData.VendorBillItemsDetail = self.getVendorBillItemsDetails();

                    var successCallBack = function () {
                        self.isSaveEnable(true);
                        if (self.refresh && typeof self.refresh === "function") {
                            self.refresh();
                        }

                        self.closePopup(self);
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 10,
                            fadeOut: 10,
                            typeOfAlert: "",
                            title: ""
                        };

                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.SavedSuccessfullyMessage, "success", null, toastrOptions);
                    }, faliureCallBack = function (message) {
                        self.isSaveEnable(false);
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 10,
                            fadeOut: 10,
                            typeOfAlert: "",
                            title: ""
                        };

                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, message, "error", null, toastrOptions);
                    };

                    self.isSaveEnable(false);
                    self.vendorBillClient.saveVendorBillDisputeLostItems(vendorBillData, successCallBack, faliureCallBack);
                    //self.listProgress(false);
                }
            };

            self.totalCost = ko.computed(function () {
                var totalCost = 0;

                if (self.vendorBillItemsList()) {
                    self.vendorBillItemsList().forEach(function (item) {
                        totalCost += parseFloat(item.cost());
                    });
                }

                return totalCost.toFixed(2);
            });

            self.totalDispute = ko.computed(function () {
                var totalCost = 0;

                if (self.vendorBillItemsList()) {
                    self.vendorBillItemsList().forEach(function (item) {
                        totalCost += parseFloat(item.disputeAmount());
                    });
                }

                return totalCost.toFixed(2);
            });

            self.totalDisputeLost = ko.computed(function () {
                var totalCost = 0;

                if (self.vendorBillItemsList()) {
                    self.vendorBillItemsList().forEach(function (item) {
                        totalCost += isNaN(item.disputeLostAmount()) ? 0 : parseFloat(item.disputeLostAmount().toString());
                    });
                }

                return totalCost.toFixed(2);
            });

            self.isValidateAllDisputZero = ko.computed(function () {
                if (self.totalDisputeLost() === '0.00') {
                    self.totalDisputeLostShouldNotBeZero('Total Dispute Lost Amount should be greater then Zero.');
                    return true;
                } else {
                    return false;
                }
            });
        }
        // Checks validation in all the items
        VendorBillDisputeLost.prototype.validateItems = function () {
            var self = this;
            var isInvalid = false;
            self.vendorBillItemsList().forEach(function (item) {
                if (self.isValidateAllDisputZero()) {
                    isInvalid = true;
                } else {
                    if (item.checkValidation()) {
                        isInvalid = true;
                    }
                }
            });

            return isInvalid;
        };

        //#region Public Methods
        VendorBillDisputeLost.prototype.initializeItemsDetails = function (data) {
            var self = this;

            if (data) {
                data.forEach(function (item) {
                    self.vendorBillItemsList.push(new VendorBillItemsModel(item.ItemName, item.Cost, item.UserDescription, item.DisputeAmount, item.DisputeLostAmount, item.Id));
                });
            }
        };

        //#region Load Data
        VendorBillDisputeLost.prototype.load = function (bindedData) {
            var _this = this;
            if (!bindedData)
                return;

            var self = this;

            self.vendorBillId = bindedData.vendorBillId;

            //** if there is no data is registered then make a server call. */
            var vendorBillId = bindedData.vendorBillId;
            self.proNumber(bindedData.proNumber);

            var successCallBack = function (data) {
                // To load items in UI Details
                _this.initializeItemsDetails(data);
            }, faliureCallBack = function () {
            };

            self.vendorBillClient.getvendorBillItems(vendorBillId, successCallBack, faliureCallBack);
        };

        // Gets the vendor bill Item details
        VendorBillDisputeLost.prototype.getVendorBillItemsDetails = function () {
            var self = this;

            var vendorBillItems;
            vendorBillItems = ko.observableArray([])();

            self.vendorBillItemsList().forEach(function (item) {
                var vendorBillItem = new _refVendorBillItemModel.Models.VendorBillItemDetails();
                vendorBillItem.Id = item.id();
                vendorBillItem.VendorBillId = self.vendorBillId;
                vendorBillItem.DisputeLostAmount = item.disputeLostAmount();

                vendorBillItems.push(vendorBillItem);
            });

            return vendorBillItems;
        };

        //close popup
        VendorBillDisputeLost.prototype.closePopup = function (dialogResult) {
            dialogResult.__dialog__.close(this, dialogResult);
            return true;
        };

        VendorBillDisputeLost.prototype.compositionComplete = function (view, parent) {
            var self = this;
            _app.trigger("loadMyData", function (data) {
                if (data) {
                    self.load(data);
                }
            });
        };

        VendorBillDisputeLost.prototype.activate = function (refresh) {
            var self = this;
            self.refresh = refresh;
            return true;
        };
        return VendorBillDisputeLost;
    })();

    // Item which will show in the grid
    var VendorBillItemsModel = (function () {
        //
        function VendorBillItemsModel(selectedItemType, cost, userDescription, disputeAmount, disputeLostAmount, id) {
            this.id = ko.observable();
            this.selectedItemTypes = ko.observable();
            this.cost = ko.observable();
            this.userDescription = ko.observable();
            this.disputeAmount = ko.observable();
            this.disputeLostAmount = ko.observable();
            var self = this;

            self.requiredColor = ko.computed(function () {
                if (self.disputeAmount() || self.disputeAmount() === "0.0") {
                    return '';
                }

                return "requiredFieldBgColor";
            });

            self.id(id);
            self.selectedItemTypes(selectedItemType);
            self.cost(cost.toFixed(2));
            self.userDescription(userDescription);
            self.disputeAmount(disputeAmount.toFixed(2));
            self.disputeLostAmount($.number(disputeLostAmount, 2));

            self.enableDisputeLostAmount = ko.computed(function () {
                if (parseFloat(self.disputeAmount()) === 0) {
                    return true;
                }
            });

            self.disputeLostAmount.extend({
                required: {
                    message: 'Dispute lost amount is required.',
                    onlyIf: function () {
                        return ((parseFloat(self.disputeAmount()) !== parseFloat("0.00")));
                    }
                },
                //number: true, //Comented this because of it was throwing erroe if we put number with dot like "12."
                //min: {
                //	params: 1,
                //	message: 'Amount should be greater than zero.',
                //	onlyIf: () => {
                //		return ((parseFloat(self.disputeAmount()) !== parseFloat("0.00")));
                //	}
                //},
                max: {
                    params: 1,
                    message: 'Amount should not be greater than dispute amount.',
                    onlyIf: function () {
                        return ((parseFloat(self.disputeAmount()) < parseFloat(self.disputeLostAmount().toString())) && parseFloat(self.disputeAmount()) !== 0);
                    }
                }
            });

            // The vendors item bill object
            self.errorVendorItemDetail = ko.validatedObservable({
                disputeLostAmount: self.disputeLostAmount
            });
        }
        // Check validation for each line item}
        VendorBillItemsModel.prototype.checkValidation = function () {
            var self = this;
            if (self.errorVendorItemDetail.errors().length != 0) {
                self.errorVendorItemDetail.errors.showAllMessages();
                return true;
            } else {
                return false;
            }
        };
        return VendorBillItemsModel;
    })();

    return VendorBillDisputeLost;
});
