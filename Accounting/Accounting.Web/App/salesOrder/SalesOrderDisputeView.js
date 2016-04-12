//#region References
/// <reference path="../services/models/TypeDefs/SalesOrderModels.d.ts" />
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../Scripts/Constants/ApplicationMessages.ts" />
//#endregion
define(["require", "exports", 'plugins/router', 'durandal/app', 'services/models/common/Enums', 'services/validations/Validations', 'services/client/SalesOrderClient', 'services/models/salesOrder/DisputeVendorBill', 'services/models/salesOrder/VendorBillDisputeContainer', 'services/models/vendorBill/VendorBillItemDetails', 'services/models/salesOrder/SalesOrderShipmentRequoteReason'], function(require, exports, ___router__, ___app__, __refEnums__, __refValidations__, __refSalesOrderClient__, __refSalesOrderDisputeVendorBill__, __refSalesOrderVendorBillDisputeContainer__, __refSalesOrderItemModel__, __refSalesOrderShipmentRequoteReasonModel__) {
    
    var _router = ___router__;
    var _app = ___app__;
    
    
    var refEnums = __refEnums__;
    var refValidations = __refValidations__;
    var refSalesOrderClient = __refSalesOrderClient__;
    
    
    var refSalesOrderDisputeVendorBill = __refSalesOrderDisputeVendorBill__;
    var refSalesOrderVendorBillDisputeContainer = __refSalesOrderVendorBillDisputeContainer__;
    var refSalesOrderItemModel = __refSalesOrderItemModel__;
    var refSalesOrderShipmentRequoteReasonModel = __refSalesOrderShipmentRequoteReasonModel__;

    //#endregion
    /***********************************************
    Sales Order Dispute ViewModel
    ************************************************
    ** <summary>
    ** Sales Order Dispute ViewModel
    ** </summary>
    ** <createDetails>
    ** <id>US13232</id><by>Chandan Singh Bajetha</by><date>31st Oct, 2014</date>
    ** </createDetails>}
    ** <changeHistory>}
    ** <id>DE20630</id><by>Chandan Singh Bajetha</by><date>04/11/2014</date> <description>Wrong Dispute Amount Calculation in Sales Order from Dispute Tab</description>
    ** <id>US20352</id><by>Chandan Singh Bajetha</by><date>20-01-2016</date> <description>Acct: Adjust UI for Dispute Notes Tab in Vendor Bill</description>
    ** <id>DE21416</id><by>Chandan Singh Bajetha</by><date>20-01-2016</date> <description>Dispute Date always shows the current date on Dispute Tab in Sales Order</description>
    ** <id>US20584</id><by>Chandan Singh Bajetha</by><date>03-02-2016</date> <description>Acct: Add Dispute Status Drop Down in SO Dispute Tab</description>
    ** <id>DE21749</id> <by>Chandan Singh Bajetha</by> <date>08-0202016</date>
    <description>Disable the Status drop down when user directly updates the bill status to Dispute Short Paid from any status other than Dispute</description>
    ** <id>US20647</id> <by>Chandan Singh Bajetha</by> <date>17-02-2016</date> <description>Acct: Implement Search on all Reports.</description>
    ** <id>US20687</id> <by>Chandan Singh Bajetha</by> <date>17-02-2016</date> <description>Acct: Add Dispute HTML Link in Dispute Tab</description>
    ** <id>US20961</id> <by>Shreesha Adiga</by> <date>08-03-2016</date> <description>Save only dispute status if bill moved to mas; changed to some validations</description>
    ** <id>US21147</id> <by>Shreesha Adiga</by> <date>15-03-2016</date> <description>If late dispute amount then show it in dispute amount's place</description>
    ** <id>DE22259</id> <by>Shreesha Adiga</by> <date>22-03-2016</date> <description>Select item based on ItemId and AccessorialId</description>
    ** <id>DE22259</id> <by>Shreesha Adiga</by> <date>22-03-2016</date><description>Updated accessorialId to VB item before saving dispute</description>
    ** <id>US21290</id> <by>Shreesha Adiga</by> <date>23-03-2016</date><description>If item selected based on itemid and accessorialId is undefined, then select based only on itemId</description>
    ** </changeHistory>
    
    ***********************************************/
    var SalesOrderDisputeViewModel = (function () {
        // ##END: US20961
        //#region Constructor
        function SalesOrderDisputeViewModel(disputeCallback) {
            //#region Members
            //Creating Reference of Dispute Vendor bill details model
            this.disputeVendorBillDetailsModels = ko.observableArray([]);
            //Creating Reference of Dispute Vendor bill details Item model
            this.DisputeVendorBillItemsModel = ko.observableArray([]);
            //disputeVendorBillDetails: KnockoutObservableArray<VendorBillItemsModel> = ko.observableArray([]);
            this.shipmentItemTypes = ko.observableArray([]);
            //For Bill Status list
            this.billStatusList = ko.observableArray([]);
            //For Selected Bill Status
            this.selectedbillStatus = ko.observable();
            //For sales Order client for call save and get data
            this.salesOrderClient = new refSalesOrderClient.SalesOrderClient();
            //For get Agent Dispute Reason
            this.agentDisputeDetails = ko.observableArray([]);
            //Hold Vendor Bill
            this.isHoldVB = ko.observable(false);
            //Quick pAy
            this.isQuickPay = ko.observable(false);
            //Internal Dispute Date
            this.internalDisputeDate = ko.observable('');
            //For Vendor BIll Dispute Date
            this.VBDisputeDate = ko.observable('');
            //For Header PRO Number
            this.proNumberHeader = ko.observable('');
            //Main Vendor BIll Id For Saving purpose
            this.mainVendorBillId = ko.observable(0);
            //Bill status id for bind selected bill
            this.billstatuId = ko.observable();
            //Updated Date
            this.updatedDate = ko.observable('');
            //Dispute Notes for Vendor BIll
            this.disputeNotes = ko.observable('');
            //Sales Order Total Cost of item for bind in right side Vendor BIll
            this.salesOrderTotalCost = ko.observable('0.00');
            //Sales Order Total Dispute of item for bind in right side Vendor BIll
            this.salesOrderTotalDisputeAmount = ko.observable('0.00');
            //Sales Order Total Pay of item for bind in right side Vendor BIll
            this.salesOrderTotalPayAmount = ko.observable('0.00');
            //Flag for Check is bill Status Is dispute or not
            this.isBillStatusDispute = ko.observable(false);
            // ###START: DE21749
            //Flag for Check is bill Status Is dispute or not
            this.isBillStatusDisputeOnly = ko.observable(false);
            // ###END: DE21
            //for enable or disable save button
            this.isSelected = ko.observable(false);
            //for enable or disable save button
            this.isVisibleDisputeDetails = ko.observable(false);
            //Sales Order Id for save and get purpose
            this.salesOrderIdMain = ko.observable(0);
            //All KO Internal Dispute
            this.internalDisputedId = ko.observable();
            this.internalDisputedBy = ko.observable('');
            this.internalDisputedAmount = ko.observable($.number(0, 2));
            this.internalDisputedDate = ko.observable('');
            this.internalDisputedReason = ko.observable('');
            this.internalDisputedNotes = ko.observable('');
            this.internalDisputedNotespopup = ko.observable('');
            // ###START: US20352
            this.internalDisputeStatusId = ko.observable();
            // ###START: US20687
            this.bolNumber = ko.observable('');
            this.commonUtils = new Utils.Common();
            this.disputeData = ko.observableArray([]);
            this.isViewOnly = ko.observable(true);
            this.disputeNoteString = ko.observable('');
            //Bill status id for bind selected bill
            this.originalBillStatusId = ko.observable();
            this.onSaveClick = ko.observable(false);
            this.CommonUtils = new Utils.Common();
            // ###START: US20584
            this.salesOrderStatusTypes = ko.observableArray([]);
            this.selectedStatusType = ko.observable();
            this.checkMsgDisplay = true;
            this.isViewMessage = true;
            //#endregion
            // ##START: US20961
            this.isBillMovedToMas = ko.observable(false);
            var self = this;
            self.disputeCallback = disputeCallback;

            //To set The date picker options
            self.datepickerOptions = {
                blockWeekend: true,
                blockPreviousDays: false,
                blockHolidaysDays: true,
                autoClose: true,
                placeBelowButton: false
            };

            //Validate total Dispute Amount
            self.salesOrderTotalDisputeAmount.extend({
                max: {
                    params: 1,
                    message: ApplicationMessages.Messages.InvalidTotalCost,
                    onlyIf: function () {
                        return ((parseFloat(self.salesOrderTotalCost().toString().replace(/,/g, "")) < parseFloat(self.salesOrderTotalDisputeAmount().toString())) && (self.billstatuId() === refEnums.Enums.VendorBillStatus.Dispute.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeWon.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeShortPaid.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.ShortPaid.ID));
                    }
                },
                number: true,
                min: {
                    params: 1,
                    message: ApplicationMessages.Messages.DisputeAmountShouldNotBeNegative,
                    onlyIf: function () {
                        return (self.onSaveClick() && (self.billstatuId() === refEnums.Enums.VendorBillStatus.Dispute.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeWon.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeShortPaid.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.ShortPaid.ID));
                    }
                }
            });

            ////Validate Dispute Date
            self.VBDisputeDate.extend({
                required: {
                    message: 'A valid Dispute Date is required.',
                    onlyIf: function () {
                        return (self.onSaveClick() && (self.billstatuId() === refEnums.Enums.VendorBillStatus.Dispute.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeWon.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeShortPaid.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.ShortPaid.ID));
                    }
                }
            });

            //Validating Dispute notes
            self.disputeNoteString.extend({
                required: {
                    message: 'A valid Dispute Notes is required',
                    onlyIf: function () {
                        return (self.isBillStatusDispute() && self.onSaveClick());
                    }
                }
            });

            //set the flag allow decimal: true to accepts decimals
            self.NumericInputWithDecimalPoint = { allowdecimal: ko.observable(true), maxlength: 11, autodigit: ko.observable(true) };

            // ###START: US20687
            self.selectDisputeWithCarrierLink = function (lineItem) {
                var parameter = '';
                if (lineItem.proNumber() === '' || lineItem.proNumber() === undefined) {
                    parameter = 'PRONumber';
                    self.disputeWithCarrierErrorMessage(parameter);
                } else if (lineItem.salesOrderId() === null || lineItem.salesOrderId() === 0) {
                    parameter = 'Shipment ID';
                    self.disputeWithCarrierErrorMessage(parameter);
                } else if (lineItem.carrierCode() === '' || lineItem.carrierCode() === undefined) {
                    parameter = 'SCAC';
                    self.disputeWithCarrierErrorMessage(parameter);
                } else if (self.bolNumber() === '' || self.bolNumber() === undefined) {
                    parameter = 'BOL';
                    self.disputeWithCarrierErrorMessage(parameter);
                } else if (lineItem.CarrierName() === '' || lineItem.CarrierName() === undefined) {
                    parameter = 'CarrierName';
                    self.disputeWithCarrierErrorMessage(parameter);
                } else {
                    var left = screen.width / 2 - 700 / 2;
                    var top = screen.height / 2 - 450 / 2;
                    if (self.disputeVendorBillDetailsModels().length >= 1) {
                        window.open(lineItem.disputeWithCarrierUrl(), 'ctcCodes', 'height=450,width=700,scrollbars=0,resizable=0,menubar=0,status=0,toolbar=0,top=' + top + ',left=' + left + '');
                    }
                }
            };

            // ###END: US20687
            //Click on select
            self.selectItem = function (lineItem) {
                // Delete from the collection
                self.isVisibleDisputeDetails(true);
                self.onSaveClick(false);
                if (self.disputeVendorBillDetailsModels().length >= 1) {
                    self.selecteLineItem = lineItem;
                    self.isSelected(true);

                    if (self.selecteLineItem.moveToMasDate() !== null) {
                        self.isBillMovedToMas(true);
                        self.isSelected(false);
                    } else {
                        self.isBillMovedToMas(false);
                    }

                    // ##END: US20961
                    // ###START: DE21749
                    self.internalDisputeStatusId(undefined);

                    // ###END: DE21749
                    // self.VBDisputeDate(self.selecteLineItem.disputedDate());
                    self.billstatuId(self.selecteLineItem.billStatusId());
                    self.proNumberHeader(self.selecteLineItem.proNumber());
                    self.mainVendorBillId(self.selecteLineItem.vendorBillId());

                    //self.disputeNotes(self.selecteLineItem.disputeNotes());
                    self.disputeNoteString(self.selecteLineItem.disputeNotes());
                    self.updatedDate(self.selecteLineItem.updatedDate());
                    self.isHoldVB(self.selecteLineItem.isHoldVB());
                    self.isQuickPay(self.selecteLineItem.isQuickPay());
                    self.billStatusList(self.selecteLineItem.billStatusList());
                    self.originalBillStatusId(self.selecteLineItem.originalBillingStatus());

                    // ###START: US20352
                    self.internalDisputeStatusId(self.selecteLineItem.internalSelectedDisputedStatusId());

                    if (self.billstatuId() === refEnums.Enums.VendorBillStatus.Dispute.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeWon.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeShortPaid.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.ShortPaid.ID) {
                        self.isBillStatusDispute(true);
                        if (self.VBDisputeDate() === undefined || self.VBDisputeDate() === null || self.VBDisputeDate() === "") {
                            self.VBDisputeDate(self.CommonUtils.formatDate(new Date(), 'mm/dd/yyyy'));
                        }
                    } else {
                        self.isBillStatusDispute(false);
                        self.VBDisputeDate('');
                    }

                    if (lineItem.billStatusId() === refEnums.Enums.VendorBillStatus.Dispute.ID) {
                        self.isBillStatusDisputeOnly(true);
                    } else {
                        self.isBillStatusDisputeOnly(false);
                    }

                    if (!self.isViewOnly()) {
                        self.isBillStatusDispute(false);
                        self.isSelected(false);
                    }
                    self.initializeDisputeItem(self.disputeData(), self.selecteLineItem.vendorBillId());

                    if (self.selecteLineItem.lateDisputedAmount() != 0) {
                        self.salesOrderTotalDisputeAmount(self.selecteLineItem.lateDisputedAmount().toString());
                    }

                    //##END: US21147
                    // ###START: DE21416
                    self.VBDisputeDate(self.CommonUtils.formatDate(self.selecteLineItem.disputedDate(), 'mm/dd/yyyy'));
                    // ###END: DE21416
                }

                var requoteReasonCodeLength = self.agentDisputeDetails().length;
                self.internalDisputedBy('');
                self.internalDisputedAmount(0.00);
                self.internalDisputeDate('');
                self.internalDisputedNotes('');
                self.salesOrderClient.GetAgentDisputes(self.salesOrderIdMain(), self.mainVendorBillId(), function (data) {
                    if (data) {
                        self.internalDisputedBy(data.DisputedRepName);
                        self.internalDisputedAmount($.number(data.DisputeAmount, 2));
                        self.internalDisputeDate(self.commonUtils.formatDate(data.DisputeDate, 'mm/dd/yyyy'));
                        self.internalDisputedReason(data.DisputeReason);
                        self.internalDisputedNotes(data.DisputeNotes);
                        self.internalDisputedNotespopup(data.DisputeNotes);
                        self.internalDisputedId(data.Id);
                    }
                }, function () {
                });

                //For highlight selected row
                var alltr = $('tr');
                $('td a').on('click', function () {
                    alltr.removeClass('selected');
                    $(this).closest('tr').addClass('selected');
                });
            };

            //For internal Dispute Popup
            self.internalDispute = function (lineItemVB) {
                self.salesOrderClient.GetAgentDisputes(self.salesOrderIdMain(), lineItemVB.vendorBillId(), function (data) {
                    //if (data) {
                    lineItemVB.internalDisputeNotes(data.DisputeNotes);
                    lineItemVB.internalDisputeId(data.Id);
                    lineItemVB.disputedReason(data.DisputeReason);
                    lineItemVB.internalDisputedAmount(data.DisputeAmount);
                    lineItemVB.internalDiputeDate(data.DisputeDate);
                    lineItemVB.internalDisputedBy(data.DisputedRepName);

                    ////initialize message box control arguments
                    var optionControlArgs = {
                        options: undefined,
                        message: '',
                        title: 'Revenue Adjustment',
                        bindingObject: lineItemVB
                    };

                    //Call the dialog Box functionality to open a Popup
                    _app.showDialog('salesOrder/SalesOrderInternalDispute', optionControlArgs).then(function (object) {
                        self.internalDisputedBy(object.disputedBy());
                        self.internalDisputedAmount($.number(object.disputeAmount(), 2));
                        self.internalDisputedNotes(object.internalDisputeNotes());
                        self.internalDisputeDate(self.commonUtils.formatDate(object.internalDisputeDatePopup(), 'mm/dd/yyyy'));
                    });
                    //}
                }, function () {
                });

                //for heighLight selected row
                var all_tr = $('tr');
                $('td a').on('click', function () {
                    all_tr.removeClass('selected');
                    $(this).closest('tr').addClass('selected');
                });
            };

            //#region Error Details Object
            self.errorSalesOrderDispute = ko.validatedObservable({
                internalDisputeDate: self.internalDisputeDate,
                VBDisputeDate: self.VBDisputeDate,
                disputeNoteString: self.disputeNoteString,
                salesOrderTotalDisputeAmount: self.salesOrderTotalDisputeAmount
            });

            // Subscribe to change the cost as negative if that is discount
            self.billstatuId.subscribe(function () {
                if (self.billstatuId() === refEnums.Enums.VendorBillStatus.Dispute.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeWon.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.DisputeShortPaid.ID || self.billstatuId() === refEnums.Enums.VendorBillStatus.ShortPaid.ID) {
                    self.isBillStatusDispute(true);
                    if (self.VBDisputeDate() === undefined || self.VBDisputeDate() === null || self.VBDisputeDate() === "") {
                        self.VBDisputeDate(self.CommonUtils.formatDate(new Date(), 'mm/dd/yyyy'));
                    }
                } else {
                    self.isBillStatusDispute(false);
                    self.VBDisputeDate('');
                }

                if (self.billstatuId() === refEnums.Enums.VendorBillStatus.Dispute.ID) {
                    self.isBillStatusDisputeOnly(true);
                } else {
                    self.isBillStatusDisputeOnly(false);
                }
                // ###END: DE21749
            });

            // ###START: US20584
            // Load all ship via if not loaded already
            var salesOrderStatusTypes = self.salesOrderStatusTypes().length;
            if (!(salesOrderStatusTypes)) {
                _app.trigger("GetDisputeStatusList", function (data) {
                    if (data) {
                        self.salesOrderStatusTypes.removeAll();
                        self.salesOrderStatusTypes.push.apply(self.salesOrderStatusTypes, data);
                    }
                });
            }

            // Calling subscribe call to save Dispute status
            self.internalDisputeStatusId.subscribe(function (selectedStatus) {
                // ##START: US20961
                self.isSelected(true);

                // ##END: US20961
                self.internalDisputeStatusId(selectedStatus);
            });

            // ###END: US20584
            // ###START: US20687
            //To check if Msg is clicked
            self.checkMsgClick = function () {
                self.checkMsgDisplay = true;
                self.isViewMessage = true;
            };

            //to Check if Msg is hidden or closed
            self.checkMsgHide = function () {
                self.checkMsgDisplay = true;
                self.isViewMessage = true;
            };

            // ###END: US20687
            return self;
        }
        //#endregion
        //#region Public Methods
        // ###START: US20687
        SalesOrderDisputeViewModel.prototype.disputeWithCarrierErrorMessage = function (parameter) {
            var self = this;
            if (self.checkMsgDisplay) {
                self.checkMsgDisplay = false;
                var toastrOptions1 = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 10,
                    fadeOut: 10,
                    typeOfAlert: "",
                    title: ""
                };
                if (self.isViewMessage) {
                    //changed in true as per requirement
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, parameter + ' ' + ApplicationMessages.Messages.ParameterNotFoundForDisputeWithCarrierLink, "error", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                }
            }
        };

        // ###END: US20687
        //Click On Save For vendor Bill Dispute
        SalesOrderDisputeViewModel.prototype.onSave = function () {
            var self = this;
            self.onSaveClick(true);

            if (typeof self.selecteLineItem.moveToMasDate() !== "undefined" && self.selecteLineItem.moveToMasDate() !== null) {
                self.saveOnlyDisputeStatusForVBsMovedToMas();
                return;
            }

            // ##END: US20961
            var errorDisputeResult = $.grep(self.DisputeVendorBillItemsModel(), function (e) {
                return (e.lineItemIsInvalid());
            });

            if (self.errorSalesOrderDispute.errors().length === 0 && errorDisputeResult.length === 0) {
                self.isVisibleDisputeDetails(false);

                // ###START: DE21749
                self.isBillStatusDisputeOnly(false);

                // ###END: DE21749
                self.isSelected(false);
                self.onSaveClick(false);
                var salesOrderDisputeVendorBillContainer = new refSalesOrderVendorBillDisputeContainer.Models.VendorBillDisputeContainer();
                salesOrderDisputeVendorBillContainer.ShipmentId = self.salesOrderIdMain();
                salesOrderDisputeVendorBillContainer.DisputeVendorBill = self.getSalesOrderDisputeVendorBillDetails();
                salesOrderDisputeVendorBillContainer.VendorBillItemsDetail = self.getDisputeSalesOrderItemDetails();
                salesOrderDisputeVendorBillContainer.CanSaveReasonCodes = self.isBillStatusDispute();

                if (self.internalDisputeStatusId() > 0) {
                    var disputeStatus = {
                        ID: self.internalDisputeStatusId(),
                        Value: ''
                    };
                } else {
                    var disputeStatus = {
                        ID: undefined,
                        Value: ''
                    };
                }

                salesOrderDisputeVendorBillContainer.DisputeStatusId = disputeStatus;

                // ###END: US20352
                self.isBillStatusDispute(false);
                self.salesOrderClient.SaveSalesOrderDisputeVBDetails(salesOrderDisputeVendorBillContainer, function () {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.SavedSuccessfullyMessage, "success", null, toastrOptions);
                    self.clearAllData();
                    self.disputeCallback();
                }, function () {
                    //self.isSelected(true);
                    self.isVisibleDisputeDetails(true);
                });
            } else {
                self.errorSalesOrderDispute.errors.showAllMessages();
                errorDisputeResult.forEach(function (item) {
                    item.errorDisputeVendorItemDetail.errors.showAllMessages();
                });
            }

            return false;
        };

        // ##START: US20961
        // To save dispute status for VBs that are already in mas
        SalesOrderDisputeViewModel.prototype.saveOnlyDisputeStatusForVBsMovedToMas = function () {
            var self = this;

            var salesOrderDisputeVendorBillContainer = new refSalesOrderVendorBillDisputeContainer.Models.VendorBillDisputeContainer();
            var disputeStatus = {
                ID: self.internalDisputeStatusId(),
                Value: ''
            };

            salesOrderDisputeVendorBillContainer.DisputeVendorBill = self.getSalesOrderDisputeVendorBillDetails();
            salesOrderDisputeVendorBillContainer.DisputeStatusId = disputeStatus;

            self.isBillStatusDispute(false);
            self.salesOrderClient.SaveDisputeStatusFromSalesOrder(salesOrderDisputeVendorBillContainer, function () {
                var toastrOptions = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 10,
                    fadeOut: 10,
                    typeOfAlert: "",
                    title: ""
                };
                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.DisputeStatusSavedSuccessfully, "success", null, toastrOptions);
                self.clearAllData();
                self.disputeCallback();
            }, function () {
                //self.isSelected(true);
                self.isVisibleDisputeDetails(true);
            });
        };

        // ##END: US20961
        //Clear all Data from view self.DisputeVendorBillItemsModel.removeAll();
        SalesOrderDisputeViewModel.prototype.clearAllData = function () {
            var self = this;
            self.DisputeVendorBillItemsModel.removeAll();
            self.disputeVendorBillDetailsModels.removeAll();
            self.internalDisputedBy('');
            self.internalDisputedAmount($.number(0, 2));
            self.internalDisputeDate('');
            self.internalDisputedNotes('');
            self.billStatusList.removeAll();
            self.salesOrderTotalDisputeAmount($.number(0, 2));
            self.VBDisputeDate('');
            self.disputeNotes('');
            self.salesOrderTotalPayAmount($.number(0, 2));
            self.salesOrderTotalCost($.number(0, 2));
            self.isBillStatusDispute(false);
            self.disputeNoteString('');

            // ###START: US20584
            self.internalDisputeStatusId(undefined);
            // ###END: US20584
        };

        //Initialize Dispute from main sales order accordion or tabbed
        SalesOrderDisputeViewModel.prototype.initializeDispute = function (data, enable) {
            var self = this;
            if (data != null) {
                self.disputeVendorBillDetailsModels.removeAll();
                data.DisputeVendorBill.forEach(function (item) {
                    self.disputeVendorBillDetailsModels.push(new DisputeVendorBillDetailsModel(item, self.salesOrderIdMain(), self.internalDisputedNotespopup(), self.internalDisputedId(), self.bolNumber()));
                });
                self.isViewOnly(enable);
            }
        };

        //initialize Vendor Bill Item after select click
        SalesOrderDisputeViewModel.prototype.initializeDisputeItem = function (data, vendorBillId) {
            var self = this;
            if (data != null) {
                var shipmentItemTypesLength = self.shipmentItemTypes().length;
                if (!(shipmentItemTypesLength)) {
                    _app.trigger("GetItemsTypes", function (items) {
                        self.shipmentItemTypes.removeAll();
                        self.shipmentItemTypes.push.apply(self.shipmentItemTypes, items);
                    });
                }

                var totalShippingAndDiscountCost = 0.0;

                self.DisputeVendorBillItemsModel.removeAll();

                data.VendorBillItemsDetail.forEach(function (item) {
                    if (item.VendorBillId === vendorBillId) {
                        if (item.ItemId === 10 || item.ItemId === 70) {
                            var costWithoutComma = item.Cost.toString();
                            var check = costWithoutComma.indexOf(",");
                            if (check === -1) {
                                totalShippingAndDiscountCost += parseFloat(item.Cost.toString());
                            } else {
                                //For removing comma before addition because parseFloat is not taking digit after comma at adding time
                                totalShippingAndDiscountCost += parseFloat(costWithoutComma.replace(/,/g, ""));
                            }
                        }
                    }
                });

                data.VendorBillItemsDetail.forEach(function (item) {
                    if (item.VendorBillId === vendorBillId) {
                        //##START: DE22259
                        var selectedItem = $.grep(self.shipmentItemTypes(), function (e) {
                            return e.ItemId === item.ItemId.toString() && (e.AccessorialId == null || item.AccessorialId == 0 || e.AccessorialId == item.AccessorialId);
                        })[0];

                        if (typeof selectedItem === "undefined" || selectedItem == null) {
                            selectedItem = $.grep(self.shipmentItemTypes(), function (e) {
                                return e.ItemId === item.ItemId.toString();
                            })[0];
                        }

                        // ##END: US21290
                        self.DisputeVendorBillItemsModel.push(new DisputeVendorBillItemsModel(selectedItem, item, function () {
                            self.updateTotalCostPayDisputeAmount();
                        }, data.ReasonCodes, function () {
                            self.UpdateDisputeLineItemsDescription();
                        }, totalShippingAndDiscountCost));
                    }
                });

                // Update the totals in the totals section
                self.updateTotalCostPayDisputeAmount();
            }
        };

        SalesOrderDisputeViewModel.prototype.cleanup = function () {
            var self = this;

            if (self.selecteLineItem)
                self.selecteLineItem.cleanup();

            self.disputeVendorBillDetailsModels.removeAll();
            self.DisputeVendorBillItemsModel.removeAll();
            self.shipmentItemTypes.removeAll();
            self.billStatusList.removeAll();
            self.agentDisputeDetails.removeAll();

            for (var property in self) {
                if (property != "cleanup")
                    delete self[property];
            }

            delete self;
        };

        //#endregion
        //#region Private Methods
        //Get Vendor bill details For
        SalesOrderDisputeViewModel.prototype.getSalesOrderDisputeVendorBillDetails = function () {
            var self = this;
            var salesOrderDisputeDetails;
            salesOrderDisputeDetails = ko.observableArray([])();
            var vendorBillDisputeData = new refSalesOrderDisputeVendorBill.Models.DisputeVendorBill();
            vendorBillDisputeData.DisputedDate = self.VBDisputeDate();
            vendorBillDisputeData.DisputedAmount = parseFloat(self.salesOrderTotalDisputeAmount());
            vendorBillDisputeData.DisputeNotes = self.disputeNotes();
            vendorBillDisputeData.BillStatus = self.billstatuId();
            vendorBillDisputeData.VendorBillId = self.mainVendorBillId();
            vendorBillDisputeData.UpdatedDate = self.updatedDate();
            vendorBillDisputeData.HoldVendorBill = self.isHoldVB();
            vendorBillDisputeData.QuickPay = self.isQuickPay();
            vendorBillDisputeData.OriginalBillStatus = self.originalBillStatusId();
            vendorBillDisputeData.DisputeNotes = self.disputeNoteString();

            // ###START: US20352
            vendorBillDisputeData.DisputeStatusId = self.internalDisputeStatusId();

            // ###END: US20352
            salesOrderDisputeDetails.push(vendorBillDisputeData);
            return salesOrderDisputeDetails;
        };

        // Gets the vendor bill Item details for save
        SalesOrderDisputeViewModel.prototype.getDisputeSalesOrderItemDetails = function () {
            var self = this;
            var salesOrderDisputeItems;
            salesOrderDisputeItems = ko.observableArray([])();

            self.DisputeVendorBillItemsModel().forEach(function (item) {
                var salesOrderDisputreVBItem = new refSalesOrderItemModel.Models.VendorBillItemDetails();
                salesOrderDisputreVBItem.Id = item.id();
                salesOrderDisputreVBItem.Cost = item.cost();
                salesOrderDisputreVBItem.ItemId = item.selectedItemTypeId();
                salesOrderDisputreVBItem.UserDescription = item.description();
                salesOrderDisputreVBItem.DisputeAmount = item.disputeAmount();
                salesOrderDisputreVBItem.VendorBillId = self.mainVendorBillId();
                salesOrderDisputreVBItem.ReasonNote = item.reasonNotes();
                salesOrderDisputreVBItem.SelectedReasonCodes = item.selectedReasonCode();

                //##START: DE22259
                salesOrderDisputreVBItem.AccessorialId = item.accessorialId() == null ? 0 : item.accessorialId();

                //##END: DE22259
                salesOrderDisputeItems.push(salesOrderDisputreVBItem);
            });
            return salesOrderDisputeItems;
        };

        // Converting if date is not valid
        SalesOrderDisputeViewModel.prototype.convertToBookedDate = function () {
            var self = this;
            if (!self.internalDisputeDate().match('/') && self.internalDisputeDate().length > 0) {
                self.internalDisputeDate(refValidations.Validations.CommonDate.prototype.ConvertToDate(self.internalDisputeDate()));
            }
        };

        // Converting if date is not valid
        SalesOrderDisputeViewModel.prototype.convertToVBDisputeDate = function () {
            var self = this;
            if (!self.VBDisputeDate().match('/') && self.VBDisputeDate().length > 0) {
                self.VBDisputeDate(refValidations.Validations.CommonDate.prototype.ConvertToDate(self.VBDisputeDate()));
            }
        };

        //For add total cost , dispute and pay
        SalesOrderDisputeViewModel.prototype.updateTotalCostPayDisputeAmount = function () {
            var self = this;

            var totalCost = 0.0, totalDisputeCost = 0.0, totalPay = 0.0;

            self.DisputeVendorBillItemsModel().forEach(function (item) {
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

                if (item.pay()) {
                    var costWithoutComma = item.pay().toString();
                    var check = costWithoutComma.indexOf(",");
                    if (check === -1) {
                        totalPay += parseFloat(item.pay().toString());
                    } else {
                        //For removing comma before addition because parseFloat is not taking digit after comma at adding time
                        totalPay += parseFloat(costWithoutComma.replace(/,/g, ""));
                    }
                }

                if (item.disputeAmount()) {
                    if (item.selectedItemTypeId() == 70 && item.disputeAmount().toString().indexOf('-') < 0) {
                        item.disputeAmount(item.disputeAmount());
                    }
                    var costWithoutComma = item.disputeAmount().toString();
                    var check = costWithoutComma.indexOf(",");
                    if (check === -1) {
                        totalDisputeCost += parseFloat(item.disputeAmount().toString());
                    } else {
                        //For removing comma before addition because parseFloat is not taking digit after comma at adding time
                        totalDisputeCost += parseFloat(costWithoutComma.replace(/,/g, ""));
                    }
                }
            });

            //bind all total Cost, pay and dispute
            self.salesOrderTotalCost(totalCost.toFixed(2));
            self.salesOrderTotalPayAmount(totalPay.toFixed(2));
            self.salesOrderTotalDisputeAmount(totalDisputeCost.toFixed(2));
        };

        // function to update line items reason note to dispute note.
        SalesOrderDisputeViewModel.prototype.UpdateDisputeLineItemsDescription = function () {
            var self = this;
            var updatereasonNotes = '';
            var disputeDescriptionString = '';
            var count = 0;
            self.DisputeVendorBillItemsModel().forEach(function (item) {
                if (typeof (item.reasonNotes()) !== 'undefined' && item.reasonNotes() !== null && item.reasonNotes() !== '') {
                    count++;
                    updatereasonNotes += item.reasonNotes() + ';';
                }
                self.disputeNoteString(updatereasonNotes);
            });

            for (var i = 0; i < count; i++) {
                var splittedString = self.disputeNoteString().split(';');
                if (splittedString[i] !== '') {
                    disputeDescriptionString += splittedString[i] + ';';
                }
            }

            self.disputeNoteString(disputeDescriptionString);
        };
        return SalesOrderDisputeViewModel;
    })();
    exports.SalesOrderDisputeViewModel = SalesOrderDisputeViewModel;

    var DisputeVendorBillDetailsModel = (function () {
        function DisputeVendorBillDetailsModel(item, salesOrderId, internalDisputeNotes, internalDisputeId, bolNumber) {
            this.salesOrderId = ko.observable(0);
            this.vendorBillId = ko.observable(0);
            this.itemId = ko.observable(0);
            this.proNumber = ko.observable('');
            this.updatedDate = ko.observable('');
            // Disputed date
            this.disputedDate = ko.observable('');
            // Disputed amount
            this.disputedAmount = ko.observable('');
            //##START: US21147
            this.lateDisputedAmount = ko.observable(0);
            //##END: US21147
            this.selectedbillStatus = ko.observable('');
            this.billStatusId = ko.observable(0);
            this.moveToMasDate = ko.observable('');
            // Dispute Notes
            this.disputeNotes = ko.observable('');
            this.internalDisputeNotes = ko.observable('');
            this.internalDisputeId = ko.observable();
            this.internalDisputedAmount = ko.observable();
            this.internalDiputeDate = ko.observable('');
            this.internalDisputedBy = ko.observable('');
            // ###START: US20352
            this.internalSelectedDisputedStatusId = ko.observable();
            // ###END: US20352
            this.carrierCode = ko.observable('');
            this.CarrierName = ko.observable('');
            this.disputeWithCarrierUrl = ko.observable('');
            this.selectedMasClearingStatus = ko.observable('');
            this.disputedReason = ko.observable();
            this.isHoldVB = ko.observable(false);
            this.isQuickPay = ko.observable(false);
            this.billStatusList = ko.observableArray([]);
            this.reasonCodesList = ko.observableArray([]);
            // to hold original Billing status of the bill
            this.originalBillingStatus = ko.observable(0);
            this.commonUtils = new Utils.Common();
            var self = this;

            //self. = item.BillStatus;
            self.billStatusId(item.BillStatus);
            self.selectedbillStatus(self.commonUtils.getEnumValueById(refEnums.Enums.VendorBillStatus, item.BillStatus.toString()));
            self.proNumber(item.ProNumber);
            self.disputedDate(item.DisputedDate ? self.commonUtils.formatDate(item.DisputedDate.toString(), 'mm/dd/yyyy') : '');
            self.disputedAmount('$' + $.number(item.DisputedAmount, 2));

            //##START: US21147
            self.lateDisputedAmount($.number(item.LateDisputedAmount, 2));

            //##END: US21147
            self.selectedMasClearingStatus(self.commonUtils.getEnumValueById(refEnums.Enums.MasClearanceStatus, item.MasClearanceStatus.toString()));
            self.disputeNotes(item.DisputeNotes);
            self.vendorBillId(item.VendorBillId);
            self.salesOrderId(salesOrderId);
            self.internalDisputeId(internalDisputeId);
            self.internalDisputeNotes(internalDisputeNotes);
            self.billStatusList(item.ListOfBillStatuses);
            self.moveToMasDate(item.MasTransferDate);

            // ###START: US20352
            self.internalSelectedDisputedStatusId(item.DisputeStatusId);

            // ###END: US20352
            // ###START: US20687
            self.carrierCode(item.CarrierCode);
            self.CarrierName(item.CarrierName);

            // ###END: US20687
            self.originalBillingStatus(item.OriginalBillStatus);
            if (item.QuickPay) {
                self.isQuickPay(true);
            }
            if (item.HoldVendorBill) {
                self.isHoldVB(true);
            }
            self.updatedDate(item.UpdatedDate);

            self.reasonCodesList.removeAll();
            item.ReasonCodes.forEach(function (reasonCodeItem) {
                self.reasonCodesList.push(new refSalesOrderShipmentRequoteReasonModel.Model.SalesOrderShipmentRequoteReason(reasonCodeItem));
            });

            // ###START: US20687
            var url = Utils.Constants.DisputeCarrierContactToolUrl + '?bol=' + bolNumber + '&SCAC=' + self.carrierCode() + '&ProNo=' + self.proNumber() + '&ShipmentId=' + self.salesOrderId() + '&CarrierName=' + self.CarrierName();
            self.disputeWithCarrierUrl(encodeURI(url));

            // ###END: US20687
            return self;
        }
        // Cleans up the view model properties
        DisputeVendorBillDetailsModel.prototype.cleanup = function () {
            var self = this;

            for (var property in self) {
                if (property != "cleanup")
                    delete self[property];
            }

            delete self;
        };
        return DisputeVendorBillDetailsModel;
    })();
    exports.DisputeVendorBillDetailsModel = DisputeVendorBillDetailsModel;

    var DisputeVendorBillItemsModel = (function () {
        //##END: DE22259
        function DisputeVendorBillItemsModel(selectedItem, item, lineDisputeValueChanged, reasonCodes, reasonNotesModifiedCallBack, totalShippingAndDiscountCost) {
            this.id = ko.observable();
            this.item = ko.observable('');
            this.selectedItemTypeId = ko.observable();
            this.description = ko.observable('');
            this.disputedDate = ko.observable('');
            this.cost = ko.observable(0);
            this.pay = ko.observable(0);
            this.disputeAmount = ko.observable(0);
            this.reasonNotes = ko.observable('');
            this.reasonCodesListFoBinding = ko.observableArray([]);
            this.selectedReasonCode = ko.observable();
            this.commonUtils = new Utils.Common();
            this.lineItemIsInvalid = ko.observable(false);
            this.shippingAndDiscountCost = ko.observable();
            //##START: DE22259
            this.accessorialId = ko.observable();
            var self = this;
            self.id(item.Id);
            self.item(selectedItem.LongDescription);
            self.selectedItemTypeId(item.ItemId);
            self.description(item.UserDescription);

            //##START: DE22259
            self.accessorialId(selectedItem.AccessorialId);

            //##END: DE22259
            self.cost($.number(item.Cost, 2));

            self.disputeAmount($.number(item.DisputeAmount, 2));

            if (totalShippingAndDiscountCost !== 0) {
                self.shippingAndDiscountCost(($.number((totalShippingAndDiscountCost), 2)).replace(/,/g, ""));
            }

            var DisputeAmountWithoutComma;

            if (item.DisputeAmount !== null && item.DisputeAmount !== undefined && item.DisputeAmount !== 0.00) {
                DisputeAmountWithoutComma = parseFloat(item.DisputeAmount.toString().replace(/,/g, ""));
                var payLoadingAmount = item.Cost - +DisputeAmountWithoutComma;
            } else {
                DisputeAmountWithoutComma = item.DisputeAmount;
            }

            if (item.ItemId === 70) {
                var payLoadingAmount = item.Cost - (-DisputeAmountWithoutComma);
                self.pay($.number(payLoadingAmount, 2));
            } else {
                var payLoadingAmount = item.Cost - DisputeAmountWithoutComma;
                self.pay($.number(payLoadingAmount, 2));
            }

            //self.reasonNotes(item.ReasonNote);
            self.reasonCodesListFoBinding.removeAll();

            reasonCodes.forEach(function (reasonCodeItem) {
                self.reasonCodesListFoBinding.push(new refSalesOrderShipmentRequoteReasonModel.Model.SalesOrderShipmentRequoteReason(reasonCodeItem));
            });

            if (item.SelectedReasonCodes !== null && item.SelectedReasonCodes !== undefined) {
                var selectedReasonCodeItem = $.grep(self.reasonCodesListFoBinding(), function (e) {
                    return e.Remarks === item.SelectedReasonCodes.Remarks;
                })[0];
                self.selectedReasonCode(selectedReasonCodeItem);
            }

            self.reasonNotes(item.ReasonNote);

            self.disputeAmount.subscribe(function () {
                if (typeof (lineDisputeValueChanged) === 'function') {
                    var lineDisputeAmountWithOutComma;

                    if (self.disputeAmount() !== null && self.disputeAmount() !== undefined && self.disputeAmount() !== 0.00 && self.disputeAmount().toString() !== '') {
                        lineDisputeAmountWithOutComma = parseFloat(self.disputeAmount().toString().replace(/,/g, ""));
                    } else {
                        lineDisputeAmountWithOutComma = "0.00";
                    }

                    if (self.selectedItemTypeId() && self.selectedItemTypeId() === 70) {
                        var pay = (+item.Cost) - (+lineDisputeAmountWithOutComma * -1);
                        self.pay($.number(pay, 2));
                    } else {
                        var pay = (+item.Cost) - (+lineDisputeAmountWithOutComma);
                        self.pay($.number(pay, 2));
                    }

                    lineDisputeValueChanged();
                }
            });

            self.reasonNotes.subscribe(function () {
                if (typeof (reasonNotesModifiedCallBack) === 'function') {
                    reasonNotesModifiedCallBack();
                }
            });

            self.errorDisputeVendorItemDetail = ko.validatedObservable({
                disputeAmount: self.disputeAmount
            });

            self.disputeAmount.extend({
                max: {
                    params: 1,
                    message: 'Dispute amount should not be greater than cost.',
                    onlyIf: function () {
                        var result;
                        if (self.selectedItemTypeId() && self.selectedItemTypeId() === 70) {
                            result = (self.cost() != null && self.disputeAmount() != null && (Number(parseFloat(self.cost().toString().replace(/,/g, "")) * -1) < parseFloat(self.disputeAmount().toString().replace(/,/g, ""))));
                            self.lineItemIsInvalid(result);
                            return (result);
                        } else if (self.selectedItemTypeId() && self.selectedItemTypeId() === 10) {
                            result = (self.shippingAndDiscountCost() != null && self.disputeAmount() != null && (parseFloat(self.shippingAndDiscountCost().toString().replace(/,/g, "")) < parseFloat(self.disputeAmount().toString().replace(/,/g, ""))));
                            self.lineItemIsInvalid(result);
                            return (result);
                        } else {
                            result = (self.cost() != null && self.disputeAmount() != null && (parseFloat(self.cost().toString().replace(/,/g, "")) < parseFloat(self.disputeAmount().toString().replace(/,/g, ""))));
                            self.lineItemIsInvalid(result);
                            return (result);
                        }
                    }
                },
                number: true
            });

            return self;
        }
        // Cleans up the view model properties
        DisputeVendorBillItemsModel.prototype.cleanup = function () {
            var self = this;

            self.reasonCodesListFoBinding.removeAll();
            self.disputeAmount.extend({ validatable: false });

            for (var property in self) {
                if (property != "cleanup")
                    delete self[property];
            }

            delete self;
        };
        return DisputeVendorBillItemsModel;
    })();
    exports.DisputeVendorBillItemsModel = DisputeVendorBillItemsModel;
});
