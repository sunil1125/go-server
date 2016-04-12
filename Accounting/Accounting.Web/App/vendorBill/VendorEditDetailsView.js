//#region References
/// <reference path="../localStorage/LocalStorage.ts" />
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
define(["require", "exports", 'plugins/router', 'durandal/app', 'vendorBill/VendorAddressView', 'vendorBill/VendorBillItemView', 'vendorBill/VendorBillDetailsView', 'vendorBill/VendorBillNotesView', 'vendorBill/VendorBillPaymentDetails', 'vendorBill/VendorBillLinks', 'services/client/VendorBillClient', 'services/models/vendorBill/VendorBill', 'services/models/vendorBill/VendorBillItemDetails', 'services/models/vendorBill/VendorBillContainer', 'services/models/vendorBill/VendorBillAddress', 'services/models/vendorBill/VendorBillNote', 'services/models/common/Enums', 'templates/saveStatusIndicatorControl', 'vendorBill/VendorBillHistory', 'vendorBill/VendorBillException', 'vendorBill/VendorBillDispute', 'vendorBill/VendorBillPODDocView', 'services/models/vendorBill/VendorBillUploadFileModel'], function(require, exports, ___router__, ___app__, ___refVendorAddress__, ___refVendorItem__, ___refVendorBill__, ___refVendorBillNotes__, ___refVendorBillPayments__, ___refVendorBillLinks__, __refVendorBillClient__, ___refVendorBillModel__, ___refVendorBillItemModel__, ___refVendorBillContainerModel__, ___refVendorBillAddressModel__, ___refVendorBillNotesModel__, __refEnums__, __refsaveStatusIndicatorControl__, ___refVendorHistory__, ___refVendorBillException__, ___refVendorBillDispute__, ___refVendorBillPODDocViewModel__, __refPodDocModel__) {
    
    var _router = ___router__;
    var _app = ___app__;
    
    var _refVendorAddress = ___refVendorAddress__;
    var _refVendorItem = ___refVendorItem__;
    var _refVendorBill = ___refVendorBill__;
    var _refVendorBillNotes = ___refVendorBillNotes__;
    var _refVendorBillPayments = ___refVendorBillPayments__;
    var _refVendorBillLinks = ___refVendorBillLinks__;
    var refVendorBillClient = __refVendorBillClient__;
    var _refVendorBillModel = ___refVendorBillModel__;
    var _refVendorBillItemModel = ___refVendorBillItemModel__;
    var _refVendorBillContainerModel = ___refVendorBillContainerModel__;
    var _refVendorBillAddressModel = ___refVendorBillAddressModel__;
    var _refVendorBillNotesModel = ___refVendorBillNotesModel__;
    
    var refEnums = __refEnums__;
    
    var refsaveStatusIndicatorControl = __refsaveStatusIndicatorControl__;
    var _refVendorHistory = ___refVendorHistory__;
    var _refVendorBillException = ___refVendorBillException__;
    
    var _refVendorBillDispute = ___refVendorBillDispute__;
    var _refVendorBillPODDocViewModel = ___refVendorBillPODDocViewModel__;
    var refPodDocModel = __refPodDocModel__;

    //#endregion
    /*
    ** <summary>
    ** Vendor Edit details View Model.
    ** </summary>
    ** <createDetails>
    ** <id>US8214</id> <by>Satish</by> <date>27th May, 2014</date>
    ** </createDetails>}
    ** <changeHistory>}
    ** <id>US9669</id> <by>Achal Rastogi</by> <date>6-3-2014</date>
    ** <id>DE20309</id> <by>Shreesha Adiga</by> <date>26-10-2015</date>
    ** <description>Set iscallforedit true, because validation for international shipment was failing</description>
    ** <id>DE21426</id> <by>Vasanthakumar</by> <date>19-01-2016</date> <description>Change detection toastr msg is not showing editing the notes in Invoiced SO/VB</description>
    ** <id>DE21533</id> <by>Chandan Singh Bajetha</by> <date>22-01-2016</date> <description>Refresh button does not work as expected on VB Dipsute Notes tab</description>
    ** <id>US20305</id> <by>Chandan Singh Bajetha</by> <date>07-01-2016</date> <description>Acct: Remove extra ADD button from SO & VB Notes Section</description>
    ** <id>DE21616</id> <by>Shreesha Adiga</by> <date>09-02-2016</date> <description>Removed the disabling of inputs using jquery</description>
    ** <id>US20585</id> <by>Chandan Singh Bajetha</by> <date>11-02-2016</date> <description>Acct: Capture history for Dispute Notes Status</description>
    ** <id>US21146</id> <by>Shreesha Adiga</by> <date>15-03-2016</date> <description>If bill status is overcharge claim, then enable bill status dropdown and save button, even if moved to mas</description>
    ** <id>US20884</id> <by>Baldev Singh Thakur</by> <date>18-03-2016</date> <description>Create Lost Bill Functionality</description>
    ** <id>DE22371</id> <by>Baldev Singh Thakur</by> <date>04-04-2016</date> <description>CC Vendor Bill Link creating sub bills</description>
    ** </changeHistory>
    */
    var VendorBillEditDetailsViewModel = (function () {
        //##END: US21146
        //#endregion
        //#region Constructor
        function VendorBillEditDetailsViewModel() {
            this.saveStatusIndicatorControl = new refsaveStatusIndicatorControl.SaveStatusIndicatorControl();
            this.vendorBillClient = new refVendorBillClient.VendorBillClient();
            this.carrierId = ko.observable(0);
            this.canForceAttach = false;
            this.isSubBill = false;
            this.isUpdateProNo = false;
            this.isPoWithBol = false;
            this.rowaffected = 0;
            this.checkMsgDisplay = true;
            this.checkCompCalled = false;
            // to show the progress bar
            this.listProgress = ko.observable(false);
            this.listProgressAccordian = ko.observable(false);
            this.listProgressTabbed = ko.observable(false);
            this.listProgressPayment = ko.observable(false);
            this.listProgressLinks = ko.observable(false);
            this.listProgressLinksTabbed = ko.observable(false);
            this.listProgressHistory = ko.observable(false);
            this.listProgressException = ko.observable(false);
            this.listProgressDispute = ko.observable(false);
            this.listProgressDisputeTabbed = ko.observable(false);
            // Check vendor bill is in intermediate state
            this.isPresentInIntermediate = false;
            // Check vendor bill is in mas status permanent
            this.isPresentInMasPermanent = false;
            // To get the logged in user
            this.currentUser = ko.observable();
            // flag for navigation to show changes
            this.isChange = ko.observable(false);
            //src of expand
            this.expandSourceImage = ko.observable('Content/images/expand.png');
            //src of collapse
            this.collapseSourceImage = ko.observable('Content/images/collapse.png');
            this.isNotAtLoadingTime = false;
            this.isSearchByUrl = false;
            this.isAccordion = ko.observable(false);
            this.isExceptionTabAndAccordion = ko.observable(false);
            this.isExceptionShowPopup = ko.observable(false);
            this.vendorBillExceptionRule = ko.observable('');
            this.VendorBillExceptionResulation = ko.observable('');
            this.vendorBillId = ko.observable(0);
            this.OriginZip = ko.observable('');
            // ###START: US20884
            this.isLostBill = ko.observable(false);
            // ###END: US20884
            // for validation
            this.isValidVendorBill = false;
            this.isValidAddress = false;
            this.isValidItems = false;
            // keep the suborder count
            this.subOrderCount = 0;
            // To disable Create SubBill Button
            this.isSubOrderBill = ko.observable(true);
            // keep the header of vendor bill whether it's I term or T term
            this.vendorBillHeader = ko.observable('Vendor Bill');
            // to keep the visibility of create lost bill button
            this.isCreateLostBillVisible = ko.observable(false);
            // keep the vendor bill container object
            this.originalVendorBillContainer = new _refVendorBillContainerModel.Models.VendorBillContainer();
            // to keep the visibility of dispute won/lost bill button
            this.isDisputeWonLostVisible = ko.observable(true);
            // to keep the clicked status of dispute won / lost button
            this.isDisputeWonLostButtonClicked = false;
            // to keep the bill status of dispute won/lost button
            this.billStatusOfDisputeWonLostButtonClicked = 0;
            //once call load from inside compositionComplete
            this.iscompositionCompleteCalled = ko.observable(true);
            // to keep the visibility of Revert bill button
            this.isRevertBillVisible = ko.observable(false);
            this.billStatus = 0;
            this.commonUtils = new Utils.Common();
            this.currentDateTime = ko.observable('');
            this.msgAmountDiffrenceToShowOnValidationMessage = 0;
            // to keep force attach, make inactive, quick pay, hold vendor bill state
            this.isForceAttachOptionSelecteed = false;
            this.isMakeInactiveSelecteed = false;
            this.isQuickPaySelecteed = false;
            this.isHoldvendorBillSelecetedSelecteed = false;
            this.isSaveEnable = false;
            this.isViewOnly = false;
            this.IsClearedPermission = false;
            this.canForcePushToMasVisible = ko.observable(false);
            var self = this;

            //Call to populate Shipper and consignee Address
            self.vendorBillDetailsViewModel = new _refVendorBill.VendorBillDetailsViewModel(function (shipperAddress) {
                self.vendorAddressViewModel.populateShipperAddress(shipperAddress);
            }, function (consigneeAddress) {
                self.vendorAddressViewModel.populateConsigneeAddress(consigneeAddress);
            }, //Call back to expand either items or Address when user press 'TAB' form reference number.
            function () {
                if (self.isAccordion()) {
                    //this.collapseView('collapseVendorBill');
                    //self.expandView('collapseAddress');
                    //$('#addressDiv').focus();
                    //$('#collapseAddress').css("overflow", "visible");
                    self.expandView('collapseItems');
                    $('#itemsDiv').focus();
                    $('#collapseItems').css("overflow", "visible");
                } else {
                    self.collapseAllTabs();

                    //$('#address').addClass('active in');
                    //$('#addressLink').addClass('active');
                    $('#item').addClass('active in');
                    $('#itemLink').addClass('active');
                }
            }, function (isDisputeStatus, isDisputeLostStatus) {
                if (isDisputeStatus) {
                    self.vendorBillItemViewModel.isDisputeAmountEditable(true);
                } else {
                    self.vendorBillItemViewModel.isDisputeAmountEditable(false);
                }

                if (isDisputeLostStatus) {
                    self.vendorBillItemViewModel.isDisputeLostAmountEditable(true);
                } else {
                    self.vendorBillItemViewModel.isDisputeLostAmountEditable(false);
                }
            });

            self.vendorBillItemViewModel = new _refVendorItem.VendorBillItemViewModel(function (totalCost, totalWeght, totalPices, totalDisputeAmount) {
                self.vendorBillDetailsViewModel.totalWeigth(totalWeght);

                //self.vendorBillDetailsViewModel.vendorAmount($.number(totalCost, 2));Commented as to be in format with dispute amount
                self.vendorBillDetailsViewModel.vendorAmount(totalCost.toFixed(2).toString());
                self.vendorBillDetailsViewModel.totalPieces(totalPices);
                self.vendorBillDetailsViewModel.disputedAmount(totalDisputeAmount.toFixed(2).toString());
                //self.vendorBillDetailsViewModel.disputedAmount(totalDisputeAmount);//Commented as the validation was throwing error by including comma
            }, function () {
                var bolNumber = self.vendorBillDetailsViewModel.bolNumber();
                if (!self.isAccordion()) {
                    self.collapseAllTabs();
                    if (bolNumber.trim() !== "") {
                        self.collapseView('collapseItems');
                        $('#notes').addClass('active in');
                        $('#notesLink').addClass('active');
                        self.expandView('collapseNotes');
                        $("#notesDiv").focus();
                    } else {
                        self.collapseView('collapseItems');
                        self.expandView('collapseAddress');
                        $('#addressDiv').focus();
                    }
                } else {
                    if (bolNumber.trim() !== "") {
                        self.collapseView('collapseItems');
                        $('#collapseItems').css("overflow", "hidden");
                        self.expandView('collapseNotes');
                        $("#notesDiv").focus();
                    } else {
                        self.collapseView('collapseItems');
                        $('#collapseItems').css("overflow", "hidden");
                        self.expandView('collapseAddress');
                        $('#addressDiv').focus();
                    }
                }
            });

            self.vendorAddressViewModel = new _refVendorAddress.VendorAddressViewModel(function (originZip, destinationZip) {
                self.vendorBillDetailsViewModel.originZip(originZip);
                self.vendorBillDetailsViewModel.destinationZip(destinationZip);
            }, //Call back to expand either items or Address when user press 'TAB' form reference number.
            function () {
                if (self.isAccordion()) {
                    //if BOL number is exists then expand items;
                    self.collapseView('collapseAddress');
                    self.expandView('collapseNotes');
                    $('#notesDiv').focus();
                } else {
                    self.collapseAllTabs();
                    $('#notes').addClass('active in');
                    $('#notesLink').addClass('active');
                }
            });

            self.vendorBillPaymentDetailsViewModel = new _refVendorBillPayments.VendorBillPaymentDetailsViewModel();

            self.vendorBillNotesViewModel = new _refVendorBillNotes.vendorBillNotesViewModel();

            self.vendorBillLinksViewModel = new _refVendorBillLinks.VendorBillLinksViewModel();

            self.vendorBillHistoryViewModel = new _refVendorHistory.VendorBillHistory();

            self.VendorBillException = new _refVendorBillException.VendorBillExceptionViewModel();

            self.VendorBillDispute = new _refVendorBillDispute.VendorBillisputeViewModel();

            self.vendorBillPODDocViewModel = new _refVendorBillPODDocViewModel.VendorBillPODDocViewModel();

            // Enables or disables the save button and also makes the window as dirty flag
            self.changesDetected = function (dirty) {
                if (self.isNotAtLoadingTime === false) {
                    if (dirty || (self.vendorBillNotesViewModel.ischange()) || (self.vendorBillNotesViewModel.returnValue()) || (self.vendorAddressViewModel.shipperLocation.returnValue) || (self.vendorAddressViewModel.consigneeLocation.returnValue) || (self.vendorAddressViewModel.returnValue) || (self.vendorBillDetailsViewModel.vendorNameSearchList.returnValue) || (self.vendorBillDetailsViewModel.returnValueFlag) || (self.vendorBillDetailsViewModel.ischange) || (self.vendorBillItemViewModel.returnValue()) || (self.vendorBillDetailsViewModel.obcvendorBillOptionList.ischange())) {
                        if (self.isSaveEnable) {
                            self.isChange(false);
                            //##START: DE21616
                            //self.DisableAlltheControls();
                            //##END: DE21616
                        } else {
                            self.isChange(true);
                        }

                        if (self.billStatusOnLoad == refEnums.Enums.VendorBillStatus.OverchargeClaim.ID && self.billStatusOnLoad != self.vendorBillDetailsViewModel.selectedbillStatus()) {
                            self.isChange(true);
                        }
                        //##END: US21146
                        //window.ischange = true;
                    } else {
                        self.isChange(false);
                        //window.ischange = false;
                    }

                    _app.trigger("IsBIDirtyChange", self.isChange());

                    if (self.vendorBillNotesViewModel.returnValue() && self.isSaveEnable && self.isChange() === false) {
                        _app.trigger("IsBIDirtyChange", true);
                    }
                    // ###END: DE21426
                }
            };

            if (!self.currentUser()) {
                // Get the logged in user for name for new note}
                _app.trigger("GetCurrentUserDetails", function (currentUser) {
                    self.currentUser(currentUser);
                });
            }

            //## function to disable international shipment  checkbox of address view if bill status is cleared.
            self.vendorBillDetailsViewModel.selectedbillStatus.subscribe(function (newValue) {
                if (newValue === refEnums.Enums.VendorBillStatus.Cleared.ID) {
                    if (self.vendorAddressViewModel.shouldBeReadOnly()) {
                        self.vendorAddressViewModel.isBillStatusCleared(true);
                    } else
                        self.vendorAddressViewModel.isBillStatusCleared(false);
                } else {
                    if (self.vendorAddressViewModel.shouldBeReadOnly()) {
                        self.vendorAddressViewModel.isBillStatusCleared(true);
                    } else
                        self.vendorAddressViewModel.isBillStatusCleared(false);
                }

                self.GetDisputeDetails(newValue);
            });

            //## Expands all the accordions in one click
            self.expandAllAccordions = function () {
                var self = this;

                //self.expandView('collapseVendorBill');
                self.expandView('collapseAddress');
                self.expandView('collapseItems');
                self.expandView('collapseNotes');
                self.expandSourceImage('Content/images/expand_hit.png');
                self.collapseSourceImage('Content/images/collapse.png');

                // first load the data then expand for links, payments, mas notes and history
                self.getShipmentLinks();
                self.expandView('collapseLinks');
                self.getPaymentDetails();
                self.expandView('collapsePaymentDetails');
                self.getHistorydetails();
                self.expandView('collapseHistory');
                self.GetDisputeDetails(undefined);
                self.expandView('collapseDispute');
            };

            //## Collapse all the accordions in one click
            self.collapseAllAccordions = function () {
                var self = this;

                //self.collapseView('collapseVendorBill');
                self.collapseView('collapseAddress');
                self.collapseView('collapseItems');
                self.collapseView('collapseNotes');
                self.collapseView('collapsePaymentDetails');
                self.collapseView('collapseLinks');
                self.collapseView('collapseHistory');
                self.collapseView('collapseException');
                self.collapseView('collapseDispute');
                self.collapseSourceImage('Content/images/collapse_hit.png');
                self.expandSourceImage('Content/images/expand.png');
            };

            // for calling CheckForceAttachOptions
            self.callvalidateVendorBill = function () {
                self.validateVendorBill();
            };

            // for calling ValidateVendorNotes
            self.callValidateVendorNotes = function () {
                self.ValidateVendorNotes();
            };

            //display msg to check  if suborder is create
            self.callCheckSubOrderCreate = function () {
                self.ShowProgressBar(true);

                // ###START: US20884
                var vendorBillId = self.vendorBillDetailsViewModel.vendorBillId();
                var proNumber = self.findProNumber();
                self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
                _app.trigger("openVendorBill", vendorBillId, proNumber, function (callback) {
                    if (!callback) {
                        return;
                    }
                }, false, false, true);
                // ###END: US20884
            };

            self.callisNegativeMarginYes = function () {
                self.checkMsgDisplay = true;
                var notesDescription = "The bill is cleared leading to $ " + self.msgAmountDiffrenceToShowOnValidationMessage.toFixed(2) + " reduction in margin, by " + self.currentUser().FullName + new Date().toString();
                self.vendorBillNotesViewModel.vendorBillNoteItems.push(new _refVendorBillNotes.vendorBillNoteItem(0, self.vendorBillDetailsViewModel.vendorBillId(), notesDescription, self.currentUser().FullName, Date.now(), "General"));
                self.setUpModelAndSave();
            };

            self.callisNegativeMarginNo = function () {
                self.checkMsgDisplay = true;
                if (self.vendorBillDetailsViewModel.selectedbillStatus() !== self.vendorBillDetailsViewModel.originalBillStatus) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 10,
                            fadeOut: 10,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.ChangePreviousStatusOnNegativeMargin, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                }

                self.vendorBillDetailsViewModel.selectedbillStatus(self.vendorBillDetailsViewModel.originalBillStatus);
            };

            self.callCheckBolValidationNo = function () {
                self.checkMsgDisplay = true;
                self.isPoWithBol = false;
                if (!$("#collapseVendorBill").hasClass("in")) {
                    $('#collapseVendorBill').collapse('toggle');
                }

                $("#bolNumberInput").focus();
                $("#bolNumberInput").select();
            };

            self.callCheckBolValidationYes = function () {
                self.checkMsgDisplay = true;
                self.isPoWithBol = true;

                // Call next validation
                self.ValidatePRONumber();
            };

            self.callForceAttchNo = function () {
                self.checkMsgDisplay = true;
                self.canForceAttach = false;
                self.isNegativeMargin();
            };

            self.callForceAttchYes = function () {
                self.checkMsgDisplay = true;
                self.canForceAttach = true;
                self.vendorBillDetailsViewModel.obcvendorBillOptionList.getOptionsById(1).selected(false);
                self.vendorBillDetailsViewModel.obcvendorBillOptionList.getOptionsById(2).selected(true);
                if (self.MsgexistingProNo.toString() != "" && !self.isSubBill) {
                    self.matchingSalesMsg(self.MsgexistingProNo);
                } else {
                    self.isNegativeMargin();
                }
            };

            self.callMatchingsalesYes = function () {
                self.checkMsgDisplay = true;
                self.canForceAttach = true;
                self.isUpdateProNo = true;
                self.isNegativeMargin();
            };

            self.callMatchingsalesNo = function () {
                self.checkMsgDisplay = true;
                self.canForceAttach = false;
                self.isNegativeMargin();
            };

            //To check if Msg is clicked
            self.checkMsgClick = function () {
                self.checkMsgDisplay = true;
            };

            // to Check if Msg is hidden or closed
            self.checkMsgHide = function () {
                self.checkMsgDisplay = true;
            };

            self.VendorBillDispute.callReloadVendorBill = function () {
                self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
                self.beforeBind();

                //self.loadViewAfterComposition();
                self.GetDisputeDetails(undefined);
            };

            self.resizeFunction = function () {
                if (self.vendorBillNotesViewModel) {
                    //on click we are calling this flag to show grid column resizebal as per browser window
                    self.vendorBillNotesViewModel.reportContainer.isAttachedToView(false);
                    self.vendorBillNotesViewModel.reportContainer.isAttachedToView(true);
                }

                if (self.vendorBillPODDocViewModel) {
                    //on click we are calling this flag to show grid column resizebal as per browser window
                    self.vendorBillPODDocViewModel.reportContainer.isAttachedToView(false);
                    self.vendorBillPODDocViewModel.reportContainer.isAttachedToView(true);
                }

                if (self.vendorBillPaymentDetailsViewModel) {
                    //on click we are calling this flag to show grid column resizebal as per browser window
                    self.vendorBillPaymentDetailsViewModel.reportContainer.isAttachedToView(false);
                    self.vendorBillPaymentDetailsViewModel.reportContainer.isAttachedToView(true);
                }
            };

            //TO set grid column after browser resizing
            window.addEventListener("resize", self.resizeFunction);

            self.CallChangeMadeFunctions();

            //#endregion
            return self;
        }
        //#endregion
        //#region Internal Methods
        //#region Save
        // For Validating
        VendorBillEditDetailsViewModel.prototype.onSave = function () {
            var self = this;

            // Show all the validation as once (All section validation)
            var isVendorBillValid = false, isVendorAddressesValid = false, isVendorItemValid = false;

            isVendorBillValid = self.vendorBillDetailsViewModel.validateBill();
            isVendorItemValid = self.vendorBillItemViewModel.validateItems();
            isVendorAddressesValid = self.vendorAddressViewModel.validateAddresses();

            if (self.isAccordion()) {
                self.validateAccordionView(isVendorAddressesValid, isVendorItemValid);
            } else {
                self.validateTabbedView(isVendorAddressesValid, isVendorItemValid);
            }

            if (self.isLostBill() && !self.validateLostBillCostWithRevenueOfOrder()) {
                return;
            } else if (!(!isVendorBillValid && self.isValidAddress && self.isValidItems)) {
                return;
            } else {
                if (self.vendorBillDetailsViewModel.carrierId() != 0) {
                    self.saveVendorBill();
                    self.saveStatusIndicatorControl.applySettings(refEnums.Enums.SavingStatus.ChangesSaved.ID);
                    self.isChange(false);

                    //window.ischange = false;
                    _app.trigger("IsBIDirtyChange", self.isChange(false));
                } else {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 10,
                            fadeOut: 10,
                            typeOfAlert: "",
                            title: ""
                        };

                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.CarrierValidationMessage, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                }
            }
        };

        // function to validate tab view section
        VendorBillEditDetailsViewModel.prototype.validateTabbedView = function (isVendorAddressesValid, isVendorItemValid) {
            var self = this;
            self.collapseAllTabs();

            if (isVendorItemValid) {
                $('#item').addClass('active in');
                $('#itemLink').addClass('active');
                self.isValidItems = false;
            } else {
                self.isValidItems = true;
            }

            if (isVendorAddressesValid && !isVendorItemValid) {
                $('#address').addClass('active in');
                $('#addressLink').addClass('active');
                self.isValidAddress = false;
            } else {
                self.isValidAddress = true;
            }

            if (!isVendorItemValid && !isVendorAddressesValid) {
                $('#item').addClass('active in');
                $('#itemLink').addClass('active');
            }
        };

        // function to validate accordion view section
        VendorBillEditDetailsViewModel.prototype.validateAccordionView = function (isVendorAddressesValid, isVendorItemValid) {
            var self = this;

            if ($('#collapseNotes').hasClass('in')) {
                $('#collapseNotes').collapse('toggle');
                $('#AchorcollapseNotes').addClass('collapsed');
            }
            if ($('#collapsePaymentDetails').hasClass('in')) {
                $('#collapsePaymentDetails').collapse('toggle');
                $('#AchorcollapsePaymentDetails').addClass('collapsed');
            }
            if ($('#collapseLinks').hasClass('in')) {
                $('#collapseLinks').collapse('toggle');
                $('#AchorcollapseLinks').addClass('collapsed');
            }
            if ($('#collapseHistory').hasClass('in')) {
                $('#collapseHistory').collapse('toggle');
                $('#AchorcollapseHistory').addClass('collapsed');
            }
            if ($('#collapseDispute').hasClass('in')) {
                $('#collapseDispute').collapse('toggle');
                $('#AchorcollapseDispute').addClass('collapsed');
            }

            if (isVendorAddressesValid) {
                $('#collapseAddress').collapse('show');
                $('#AchorcollapseAddress').removeClass('collapsed');
                self.isValidAddress = false;
                setTimeout(function () {
                    $('#collapseAddress').css("overflow", "visible");
                }, 500);
            } else {
                self.isValidAddress = true;
                self.collapseAchorcAddress();
            }

            if (isVendorItemValid) {
                $('#collapseItems').collapse('show');
                $('#AchorcollapseItems').removeClass('collapsed');
                self.isValidItems = false;
            } else {
                self.isValidItems = true;
                self.colapseAchorItems();
            }
        };

        //to collapse all the tabs
        VendorBillEditDetailsViewModel.prototype.collapseAllTabs = function () {
            if ($('#address').hasClass('in')) {
                $('#address').removeClass('active in');
                $('#addressLink').removeClass('active');
            }
            if ($('#item').hasClass('in')) {
                $('#item').removeClass('active in');
                $('#itemLink').removeClass('active');
            }
            if ($('#notes').hasClass('in')) {
                $('#notes').removeClass('active in');
                $('#notesLink').removeClass('active in');
            }
            if ($('#payment').hasClass('in')) {
                $('#payment').removeClass('active in');
                $('#paymentLink').removeClass('active in');
            }
            if ($('#links').hasClass('in')) {
                $('#links').removeClass('active in');
                $('#linksLink').removeClass('active in');
            }
            if ($('#history').hasClass('in')) {
                $('#history').removeClass('active in');
                $('#historyLink').removeClass('active in');
            }
            if ($('#dispute').hasClass('in')) {
                $('#dispute').removeClass('active in');
                $('#disputeLink').removeClass('active in');
            }
            if ($('#exception').hasClass('in')) {
                $('#exception').removeClass('active in');
                $('#exceptionLink').removeClass('active in');
            }
            if ($('#tab_podDoc').hasClass('in')) {
                $('#tab_podDoc').removeClass('active in');
                $('#podDocLink').removeClass('active in');
            }
        };

        VendorBillEditDetailsViewModel.prototype.collapseAllTabAndOpenItem = function () {
            var self = this;
            self.collapseAllTabs();
            $('#item').addClass('active in');
            $('#itemLink').addClass('active in');
            self.ActiveDisputeTab(self.vendorBillDetailsViewModel.selectedbillStatus());
        };

        //To collapse one by one if we have no validation in VendorBill Address and Items
        VendorBillEditDetailsViewModel.prototype.collapseAchorVendorBill = function () {
            var self = this;
            if ($('#collapseVendorBill').hasClass('in') && self.isValidVendorBill) {
                $('#collapseVendorBill').collapse('toggle');
                $('#AchorcollapseVendorBill').addClass('collapsed');
            }
        };

        VendorBillEditDetailsViewModel.prototype.collapseAchorcAddress = function () {
            var self = this;
            if ($('#collapseAddress').hasClass('in') && self.isValidAddress) {
                $('#collapseAddress').collapse('toggle');
                $('#AchorcollapseAddress').addClass('collapsed');
            }

            $('#collapseAddress').css("overflow", "hidden");
        };
        VendorBillEditDetailsViewModel.prototype.colapseAchorItems = function () {
            var self = this;
            if ($('#collapseItems').hasClass('in') && self.isValidItems) {
                $('#collapseItems').collapse('toggle');
                $('#AchorcollapseItems').addClass('collapsed');
            }
        };

        // For Saving Vendor Bill Detail
        VendorBillEditDetailsViewModel.prototype.saveVendorBill = function () {
            var self = this;

            if (self.validateCostDisputeAmount() && self.vendorBillDetailsViewModel.validateDisputeData()) {
                if (self.checkStatusIsDisputeWonOrDisputeLost()) {
                    self.checkStatusIsPendingOrNot();
                }
            }
        };

        // Gets the data from all the different view model and sends those to service
        VendorBillEditDetailsViewModel.prototype.setUpModelAndSave = function () {
            var self = this;
            var vendorBillData = new _refVendorBillContainerModel.Models.VendorBillContainer();
            self.ShowProgressBar(true);
            vendorBillData.VendorBill = self.getVendorBillDetails();
            vendorBillData.VendorBillAddress = self.getVendorBillAddress();
            vendorBillData.VendorBillItemsDetail = self.getVendorBillItemsDetails();
            vendorBillData.VendorBillNotes = self.getVendorBillNotes();
            self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
            refVendorBillClient.VendorBillClient.prototype.SaveVendorBillDetail(vendorBillData, function (message) {
                // Saving successful callback
                self.ShowProgressBar(false);

                if (self.commonUtils.isNullOrEmptyOrWhiteSpaces(vendorBillData.VendorBill.OriginalBOLNumber) && !self.commonUtils.isNullOrEmptyOrWhiteSpaces(vendorBillData.VendorBill.BolNumber)) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions1 = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 10,
                            fadeOut: 10,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.VendorBillIsNowPO, "info", self.checkMsgClick, toastrOptions1, self.checkMsgHide);

                        _app.trigger('closeActiveTab');
                        _app.trigger("openPurchaseOrder", self.vendorBillDetailsViewModel.vendorBillId(), self.vendorBillDetailsViewModel.proNumber().replace(/ PURGE/g, ""), function (callback) {
                            if (!callback) {
                                return;
                            }
                        });
                    }
                } else {
                    var proNumber = self.vendorBillDetailsViewModel.proNumber().replace(" PURGE", "");
                    if (self.isMakeInactiveSelecteed) {
                        proNumber = proNumber + " PURGE";
                    }

                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.SavedSuccessfullyMessage, "success", null, toastrOptions);
                    self.isSubBill = false;

                    ////var data = { vendorBillId: message, isSubBill: false};
                    ////self.load(data);
                    self.registerData(message, false);
                    self.beforeBind();
                    //self.loadViewAfterComposition();
                }
            }, function (message) {
                // Saving failed call back
                self.ShowProgressBar(false);
                var toastrOptions = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 10,
                    fadeOut: 10,
                    typeOfAlert: "",
                    title: ""
                };
                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, message, "error", null, toastrOptions);
            });
        };

        VendorBillEditDetailsViewModel.prototype.reloadPage = function () {
            var self = this;
            self.ShowProgressBar(true);
            self.clearLocalStorage(self.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
            LocalStorageController.Set(self.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber() + 'lastReloadDateTime', undefined);
            self.beforeBind();

            if ($('#dispute').hasClass('in')) {
                self.getVendorBillDisputeItemDetails();
            }
            // ###END: DE21533
            //self.loadViewAfterComposition();
        };

        //set Date Time for record of last refreshed
        VendorBillEditDetailsViewModel.prototype.setDateTimeOfReload = function () {
            var self = this;
            if (LocalStorageController.Get(self.vendorBillDetailsViewModel.proNumber() + 'lastReloadDateTime')) {
                var localDateTimeOfReload = LocalStorageController.Get(self.vendorBillDetailsViewModel.vendorBillId() + 'lastReloadDateTime');
                self.currentDateTime(localDateTimeOfReload);
            } else {
                var onlyDate = self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy');
                var date = new Date();
                var str = 'Last Refreshed: ' + onlyDate + ' ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                LocalStorageController.Set(self.vendorBillDetailsViewModel.vendorBillId() + 'lastReloadDateTime', str);

                //var reloadDate = LocalStorageController.Get(self.vendorBillDetailsViewModel.proNumber() + 'lastReloadDateTime');
                self.currentDateTime(str);
            }
        };

        // ###START: US20884
        VendorBillEditDetailsViewModel.prototype.validateLostBillCostWithRevenueOfOrder = function () {
            var self = this;
            var sumOfLostBillCost = $.grep(self.vendorBillItemViewModel.vendorBillItemsList(), function (e) {
                return e.cost() && e.cost() !== null && e.cost() && e.cost() !== null;
            });

            if (sumOfLostBillCost && sumOfLostBillCost.length > 0) {
                var totalLostBillAmount = 0;

                // get total dispute amount
                sumOfLostBillCost.forEach(function (item) {
                    totalLostBillAmount = totalLostBillAmount + parseFloat(item.cost().toString());
                    return totalLostBillAmount;
                });
            }

            if ((totalLostBillAmount.toFixedDecimal(2) > self.vendorBillDetailsViewModel.totalRevenue())) {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 15,
                        fadeOut: 15,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.LostBillCostValidation, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
                return false;
            }

            return true;
        };

        // ###END: US20884
        // Gets the vendor bill details
        VendorBillEditDetailsViewModel.prototype.getVendorBillDetails = function () {
            var self = this;

            var vendorBillDetails = new _refVendorBillModel.Models.VendorBill();

            // For new vendor bill id should be 0 and the bill status will be pending (0)
            vendorBillDetails.BillStatus = self.isDisputeWonLostButtonClicked ? self.billStatusOfDisputeWonLostButtonClicked : self.vendorBillDetailsViewModel.selectedbillStatus();
            vendorBillDetails.VendorBillId = self.vendorBillDetailsViewModel.vendorBillId();
            vendorBillDetails.CarrierId = self.vendorBillDetailsViewModel.carrierId();
            vendorBillDetails.Amount = parseFloat(self.vendorBillDetailsViewModel.vendorAmount());
            vendorBillDetails.BillDate = self.vendorBillDetailsViewModel.billDate();
            vendorBillDetails.BolNumber = self.vendorBillDetailsViewModel.bolNumber();
            vendorBillDetails.DeliveryDate = self.vendorBillDetailsViewModel.deliveryDate();
            vendorBillDetails.DestinationZip = self.vendorBillDetailsViewModel.destinationZip();
            vendorBillDetails.MainVendorBolNumber = self.vendorBillDetailsViewModel.mainBolNumber();
            vendorBillDetails.ProNumber = self.vendorBillDetailsViewModel.proNumber();
            vendorBillDetails.SalesOrderId = self.vendorBillDetailsViewModel.salesOrderId;
            vendorBillDetails.IsPurchaseOrder = self.isPoWithBol;
            vendorBillDetails.UpdatePRONumberInShipment = self.isUpdateProNo;
            vendorBillDetails.ProcessDetails = self.vendorAddressViewModel.processDetails();
            vendorBillDetails.OriginalBOLNumber = self.vendorBillDetailsViewModel.originalBolNumber;
            vendorBillDetails.Memo = self.vendorBillDetailsViewModel.memo();
            vendorBillDetails.MasClearanceStatus = self.vendorBillDetailsViewModel.selectedMasClearingStatus();

            //##START: US21146
            vendorBillDetails.MasTransferDate = self.vendorBillDetailsViewModel.moveToMasDate();

            //##END: US21146
            vendorBillDetails.PickupDate = self.vendorBillDetailsViewModel.pickupDate();
            vendorBillDetails.DueDate = self.vendorBillDetailsViewModel.dueDate();

            // ###START: US20884
            vendorBillDetails.IsLostBill = self.isLostBill();

            // ###END: US20884
            vendorBillDetails.ProcessFlow = self.vendorBillDetailsViewModel.processFlow;
            var selecetedList = self.vendorBillDetailsViewModel.obcvendorBillOptionList.getSelectedOptions(true);

            selecetedList.forEach(function (item) {
                if (item.id === refEnums.Enums.vendorBillOptionConstant.FroceAttach) {
                    self.isForceAttachOptionSelecteed = true;
                } else if (item.id === refEnums.Enums.vendorBillOptionConstant.HoldVendorBill) {
                    self.isHoldvendorBillSelecetedSelecteed = true;
                } else if (item.id === refEnums.Enums.vendorBillOptionConstant.Quickpay) {
                    self.isQuickPaySelecteed = true;
                } else if (item.id === refEnums.Enums.vendorBillOptionConstant.MakeInactive) {
                    self.isMakeInactiveSelecteed = true;
                }
            });

            vendorBillDetails.ForceAttach = self.isForceAttachOptionSelecteed || self.canForceAttach;
            vendorBillDetails.HoldVendorBill = self.isHoldvendorBillSelecetedSelecteed;
            vendorBillDetails.QuickPay = self.isQuickPaySelecteed;
            vendorBillDetails.MakeInactive = self.isMakeInactiveSelecteed;
            vendorBillDetails.Memo = self.vendorBillDetailsViewModel.memo();
            vendorBillDetails.OriginZip = self.vendorBillDetailsViewModel.originZip();
            vendorBillDetails.PoNumber = self.vendorBillDetailsViewModel.poNumber();
            vendorBillDetails.ReferenceNumber = self.vendorBillDetailsViewModel.refNumber();
            vendorBillDetails.TotalPieces = self.vendorBillDetailsViewModel.totalPieces();
            vendorBillDetails.TotalWeight = self.vendorBillDetailsViewModel.totalWeigth();
            vendorBillDetails.VendorName = self.vendorBillDetailsViewModel.vendorName();
            vendorBillDetails.UpdatedBy = self.currentUser().GlobalNetUserId;
            vendorBillDetails.UpdatedDate = self.vendorBillDetailsViewModel.updatedDate;
            vendorBillDetails.DisputeNotes = self.vendorBillDetailsViewModel.disputeNotes();
            vendorBillDetails.MainVendorBolNumber = self.vendorBillDetailsViewModel.mainBolNumber();
            vendorBillDetails.IDBFlag = self.originalVendorBillContainer.VendorBill.IDBFlag;
            vendorBillDetails.DisputedAmount = parseFloat(self.vendorBillDetailsViewModel.disputedAmount());
            vendorBillDetails.DisputedDate = self.vendorBillDetailsViewModel.disputedDate();
            vendorBillDetails.CreatedDate = self.vendorBillDetailsViewModel.createdDate();

            // ###START: US20585
            vendorBillDetails.DisputeStatusId = self.vendorBillDetailsViewModel.disputeStatusId();

            // ###END: US20585
            return vendorBillDetails;
        };

        // Gets the vendor bill address details
        VendorBillEditDetailsViewModel.prototype.getVendorBillAddress = function () {
            var self = this;

            var addresses;
            addresses = ko.observableArray([])();

            var vendorShipperAddress = new _refVendorBillAddressModel.Models.VendorBillAddress();
            var vendorConsigneeAddress = new _refVendorBillAddressModel.Models.VendorBillAddress();
            var vendorBillToAddress = new _refVendorBillAddressModel.Models.VendorBillAddress();

            // Create shipper address model
            vendorShipperAddress.Id = self.vendorAddressViewModel.shipperAddressId();
            vendorShipperAddress.VendorBillId = self.vendorBillDetailsViewModel.vendorBillId();
            vendorShipperAddress.Street = self.vendorAddressViewModel.shipperAddress1();
            vendorShipperAddress.Street2 = self.vendorAddressViewModel.shipperAddress2();
            vendorShipperAddress.CompanyName = self.vendorAddressViewModel.shipperCompanyName();
            vendorShipperAddress.ContactPerson = self.vendorAddressViewModel.shipperContactPerson();
            vendorShipperAddress.City = self.vendorAddressViewModel.shipperLocation.location().City;
            vendorShipperAddress.State = self.vendorAddressViewModel.shipperLocation.location().StateCode;
            vendorShipperAddress.ZipCode = self.vendorAddressViewModel.shipperLocation.location().Zip;
            vendorShipperAddress.Phone = self.vendorAddressViewModel.shipperPhone();
            vendorShipperAddress.Fax = self.vendorAddressViewModel.shipperFax();
            vendorShipperAddress.Country = self.vendorAddressViewModel.isInternationalShipmentSelected() ? self.vendorAddressViewModel.selectedShipperCountryCode() : $.number(self.vendorAddressViewModel.shipperLocation.location().CountryCode);
            vendorShipperAddress.AddressType = 1;

            // Create consignee address model
            vendorConsigneeAddress.Id = self.vendorAddressViewModel.consigneeAddressId();
            vendorConsigneeAddress.VendorBillId = self.vendorBillDetailsViewModel.vendorBillId();
            vendorConsigneeAddress.Street = self.vendorAddressViewModel.consigneeAddress1();
            vendorConsigneeAddress.Street2 = self.vendorAddressViewModel.consigneeAddress2();
            vendorConsigneeAddress.CompanyName = self.vendorAddressViewModel.consigneeCompanyName();
            vendorConsigneeAddress.ContactPerson = self.vendorAddressViewModel.consigneeContactPerson();
            vendorConsigneeAddress.City = self.vendorAddressViewModel.consigneeLocation.location().City;
            vendorConsigneeAddress.State = self.vendorAddressViewModel.consigneeLocation.location().StateCode;
            vendorConsigneeAddress.ZipCode = self.vendorAddressViewModel.consigneeLocation.location().Zip;
            vendorConsigneeAddress.Phone = self.vendorAddressViewModel.consigneePhone();
            vendorConsigneeAddress.Fax = self.vendorAddressViewModel.consigneeFax();
            vendorConsigneeAddress.Country = self.vendorAddressViewModel.isInternationalShipmentSelected() ? self.vendorAddressViewModel.selectedConsigneeCountryCode() : $.number(self.vendorAddressViewModel.consigneeLocation.location().CountryCode);
            vendorConsigneeAddress.AddressType = 2;

            // Create Bill To address model
            vendorBillToAddress.Id = self.vendorAddressViewModel.billToAddressId();
            vendorBillToAddress.VendorBillId = self.vendorBillDetailsViewModel.vendorBillId();
            vendorBillToAddress.Street = self.vendorAddressViewModel.billToAddress1();
            vendorBillToAddress.Street2 = self.vendorAddressViewModel.billToAddress2();
            vendorBillToAddress.CompanyName = self.vendorAddressViewModel.billToCompanyName();
            vendorBillToAddress.City = self.vendorAddressViewModel.billToLocation.location().City;
            vendorBillToAddress.State = self.vendorAddressViewModel.billToLocation.location().StateCode;
            vendorBillToAddress.ZipCode = self.vendorAddressViewModel.billToLocation.location().Zip;
            vendorBillToAddress.Phone = self.vendorAddressViewModel.billToPhone();
            vendorBillToAddress.Fax = self.vendorAddressViewModel.billToFax();
            vendorBillToAddress.Country = self.vendorAddressViewModel.isInternationalShipmentSelected() ? self.vendorAddressViewModel.selectedBillToCountryCode() : $.number(self.vendorAddressViewModel.billToLocation.location().CountryCode);
            vendorBillToAddress.AddressType = 3;

            addresses.push(vendorShipperAddress);
            addresses.push(vendorConsigneeAddress);
            addresses.push(vendorBillToAddress);

            return addresses;
        };

        // Gets the vendor bill Item details
        VendorBillEditDetailsViewModel.prototype.getVendorBillItemsDetails = function () {
            var self = this;

            var vendorBillItems;
            vendorBillItems = ko.observableArray([])();

            self.vendorBillItemViewModel.vendorBillItemsList().forEach(function (item, collection) {
                var vendorBillItem = new _refVendorBillItemModel.Models.VendorBillItemDetails();
                vendorBillItem.Cost = item.cost();
                vendorBillItem.DimensionHeight = item.dimensionHeight();
                vendorBillItem.DimensionLength = item.dimensionLength();
                vendorBillItem.DimensionWidth = item.dimensionWidth();
                vendorBillItem.Id = item.id();
                vendorBillItem.PackageTypeId = item.selectedPackageType();
                vendorBillItem.PieceCount = item.pieceCount();
                vendorBillItem.SelectedClassType = item.selectedClassType();
                vendorBillItem.SelectedItemTypes = item.selectedItemTypes();
                vendorBillItem.UserDescription = item.userDescription();
                vendorBillItem.Weight = item.weight();
                vendorBillItem.DisputeAmount = item.disputeAmount();
                if (item.disputeLostAmount() !== null && item.disputeLostAmount() !== "") {
                    vendorBillItem.DisputeLostAmount = item.disputeLostAmount();
                } else {
                    vendorBillItem.DisputeLostAmount = 0;
                }

                vendorBillItems.push(vendorBillItem);
            });

            return vendorBillItems;
        };

        // Gets the vendor bill notes details
        VendorBillEditDetailsViewModel.prototype.getVendorBillNotes = function () {
            var self = this, commonUtils = new Utils.Common(), vendorBillNotes, notesDescription, itemNew;
            vendorBillNotes = ko.observableArray([])();

            if (self.vendorBillDetailsViewModel.orginalMasClearingStatus() != self.vendorBillDetailsViewModel.selectedMasClearingStatus()) {
                var note = "Mas move status is modified from " + commonUtils.getEnumValueById(refEnums.Enums.MasClearanceStatus, self.vendorBillDetailsViewModel.orginalMasClearingStatus().toString()) + " to " + commonUtils.getEnumValueById(refEnums.Enums.MasClearanceStatus, self.vendorBillDetailsViewModel.selectedMasClearingStatus().toString()) + " by " + self.currentUser().FullName;
                itemNew = new _refVendorBillNotes.vendorBillNoteItem(0, self.vendorBillDetailsViewModel.vendorBillId(), note, self.currentUser().FullName, Date.now(), "General", refEnums.Enums.Note.General.ID);
                vendorBillNotes.push(self.addNoteItem(itemNew));
            }
            self.vendorBillNotesViewModel.vendorBillNoteItems().forEach(function (item) {
                vendorBillNotes.push(self.addNoteItem(item));
            });

            if (commonUtils.isNullOrEmptyOrWhiteSpaces(self.vendorBillDetailsViewModel.disputeNotes())) {
                var disputeNotes = $.grep(self.originalVendorBillContainer.VendorBillNotes, function (e) {
                    return e.NotesType === 4;
                });

                if (disputeNotes && disputeNotes.length > 0) {
                    itemNew = new _refVendorBillNotes.vendorBillNoteItem(disputeNotes[0].Id, self.vendorBillDetailsViewModel.vendorBillId(), self.vendorBillDetailsViewModel.disputeNotes(), disputeNotes[0].NotesBy, disputeNotes[0].NotesDate, disputeNotes[0].NoteTypeName, disputeNotes[0].NotesType);
                } else {
                    itemNew = new _refVendorBillNotes.vendorBillNoteItem(0, self.vendorBillDetailsViewModel.vendorBillId(), self.vendorBillDetailsViewModel.disputeNotes(), self.currentUser().FullName, Date.now(), "Dispute", refEnums.Enums.Note.Dispute.ID);
                }

                vendorBillNotes.push(self.addNoteItem(itemNew));
            }

            if (self.vendorBillDetailsViewModel.originalBillStatus !== self.vendorBillDetailsViewModel.selectedbillStatus()) {
                notesDescription = "Vendor Bill Status Change: " + commonUtils.getEnumValueById(refEnums.Enums.VendorBillStatus, self.vendorBillDetailsViewModel.originalBillStatus.toString()) + " - " + commonUtils.getEnumValueById(refEnums.Enums.VendorBillStatus, self.vendorBillDetailsViewModel.selectedbillStatus().toString());
                itemNew = new _refVendorBillNotes.vendorBillNoteItem(0, self.vendorBillDetailsViewModel.vendorBillId(), notesDescription, self.currentUser().FullName, Date.now(), "System", refEnums.Enums.Note.System.ID);
                vendorBillNotes.push(self.addNoteItem(itemNew));
            }

            if (self.isDisputeWonLostButtonClicked) {
                notesDescription = "User " + self.currentUser().FullName + " Changed Bill from " + commonUtils.getEnumValueById(refEnums.Enums.VendorBillStatus, self.vendorBillDetailsViewModel.selectedbillStatus().toString()) + " to " + commonUtils.getEnumValueById(refEnums.Enums.VendorBillStatus, self.billStatusOfDisputeWonLostButtonClicked.toString());
                itemNew = new _refVendorBillNotes.vendorBillNoteItem(0, self.vendorBillDetailsViewModel.vendorBillId(), notesDescription, self.currentUser().FullName, Date.now(), "System", refEnums.Enums.Note.System.ID);
                vendorBillNotes.push(self.addNoteItem(itemNew));
            }

            return vendorBillNotes;
        };

        // function to use get item note model
        VendorBillEditDetailsViewModel.prototype.addNoteItem = function (item) {
            var itemNote = new _refVendorBillNotesModel.Models.VendorBillNote();

            // For the entity ID will be filled by server
            itemNote.Id = item.id();
            itemNote.EntityId = item.entityId();
            itemNote.NotesBy = item.noteBy();
            itemNote.NotesDate = new Date(item.noteDate());
            itemNote.NotesDescription = item.description();
            itemNote.NoteTypeName = item.noteType();
            itemNote.NotesType = item.noteTypeValue();

            return itemNote;
        };

        //#endregion Internal Methods
        //#region Validation
        //To Validated Vendor Bill
        VendorBillEditDetailsViewModel.prototype.validateVendorBill = function () {
            var self = this;
            var commonUtils = new Utils.Common();

            if (commonUtils.isNullOrEmptyOrWhiteSpaces(self.vendorBillDetailsViewModel.bolNumber())) {
                if (self.vendorBillDetailsViewModel.bolNumber().indexOf(' ') > 0) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 10,
                            fadeOut: 10,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.SubOrderBOL, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                    return false;
                }
            }

            if (parseFloat(self.vendorBillDetailsViewModel.vendorAmount()) < 0) {
                var toastrOptions = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 10,
                    fadeOut: 10,
                    typeOfAlert: "",
                    title: ""
                };
                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.BillAmountShouldNotbeNegative, "info", null, toastrOptions);

                return false;
            }

            if (self.vendorBillDetailsViewModel.listCheck != null && self.vendorBillDetailsViewModel.listCheck()[0] === true) {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions1 = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PROAlreadyExists, "info", self.checkMsgClick, toastrOptions1, self.checkMsgHide);

                    return false;
                }
            }

            self.checkForceAttachOptions();

            return true;
        };

        // Shows the message box as pr the given title and message
        VendorBillEditDetailsViewModel.prototype.showConfirmationMessage = function (message, title, fisrtButtoName, secondButtonName, yesCallBack, noCallBack) {
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

            //Call the dialog Box functionality to open a Popup
            _app.showDialog('templates/messageBox', optionControlArgs, 'slideDown');
        };

        // When we are making the bill cleared then we have to check the difference of SO cost and VB Cost
        // If VB Cost-SO Cost > 9 then we have to show an message that bill is clears with $(cost difference) Do you want to continue?
        // If yes then save as usual
        // If no then he can adjust cost before saving
        VendorBillEditDetailsViewModel.prototype.isNegativeMargin = function () {
            var self = this;

            if ((self.vendorBillDetailsViewModel.selectedbillStatus() === refEnums.Enums.VendorBillStatus.Cleared.ID || self.vendorBillDetailsViewModel.selectedbillStatus() === refEnums.Enums.VendorBillStatus.ShortPaid.ID) && !self.isPresentInMasPermanent) {
                var surPlusVendorBillAmount = 0, totalVendorBillCost = 0, costDifference = 0, actualProfit = 0, totalProfit = 0, grossProfit = 0, amountDiffrenceToShowOnValidationMessage = 0;

                surPlusVendorBillAmount = parseFloat(self.vendorBillDetailsViewModel.vendorAmount().replace(/,/g, "")) - parseFloat(self.vendorBillDetailsViewModel.originalVendorAmount.toString().replace(/,/g, ""));
                totalVendorBillCost = parseFloat(self.vendorBillDetailsViewModel.actualCost().toString().replace(/,/g, "")) + surPlusVendorBillAmount;
                var totalCalculatedRevenue = parseFloat(self.vendorBillDetailsViewModel.totalRevenue().toString().replace(/,/g, ""));
                var totalEstimateCost = parseFloat(self.vendorBillDetailsViewModel.totalCost().toString().replace(/,/g, ""));
                actualProfit = totalCalculatedRevenue - totalVendorBillCost;
                totalProfit = parseFloat(self.vendorBillDetailsViewModel.actualProfit().toString().replace(/,/g, "")) - surPlusVendorBillAmount;
                grossProfit = totalCalculatedRevenue - totalEstimateCost;
                costDifference = totalVendorBillCost - parseFloat(self.vendorBillDetailsViewModel.totalCost().toString().replace(/,/g, ""));
                amountDiffrenceToShowOnValidationMessage = grossProfit - actualProfit;
                self.msgAmountDiffrenceToShowOnValidationMessage = amountDiffrenceToShowOnValidationMessage;
                if (costDifference > 9) {
                    var message = ApplicationMessages.Messages.NegativeMarginValidation_1 + amountDiffrenceToShowOnValidationMessage.toFixed(2) + '. ' + ApplicationMessages.Messages.NegativeMarginValidation_2 + totalProfit.toFixed(2) + '. ' + ApplicationMessages.Messages.NegativeMarginValidation_3;
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var actionButtons = [];
                        actionButtons.push({
                            actionButtonName: "Yes",
                            actionClick: self.callisNegativeMarginYes
                        });

                        actionButtons.push({
                            actionButtonName: "No",
                            actionClick: self.callisNegativeMarginNo
                        });

                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 0,
                            fadeOut: 0,
                            typeOfAlert: "",
                            title: "",
                            actionButtons: actionButtons
                        };

                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, message, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                } else {
                    self.setUpModelAndSave();
                    return true;
                }
            } else {
                self.setUpModelAndSave();
                return true;
            }
        };

        // Check what is the original status and selected status is pending or not
        // if original status is other than pending and selected status is pending then order will convert into purchase order so show the validation message.
        VendorBillEditDetailsViewModel.prototype.checkStatusIsPendingOrNot = function () {
            var self = this, isBolNoEditable;
            if (self.vendorBillDetailsViewModel.bolNumber() !== self.vendorBillDetailsViewModel.originalBolNumber) {
                self.vendorBillDetailsViewModel.selectedbillStatus(refEnums.Enums.VendorBillStatus.Pending.ID);
                isBolNoEditable = true;
            } else {
                isBolNoEditable = false;
            }

            if (!isBolNoEditable && self.vendorBillDetailsViewModel.selectedbillStatus() === refEnums.Enums.VendorBillStatus.Pending.ID && self.vendorBillDetailsViewModel.originalBillStatus !== refEnums.Enums.VendorBillStatus.Pending.ID) {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var actionButtons = [];
                    actionButtons.push({
                        actionButtonName: "Yes",
                        actionClick: self.callValidateVendorNotes
                    });

                    actionButtons.push({
                        actionButtonName: "No",
                        actionClick: self.checkMsgClick
                    });

                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 0,
                        fadeOut: 0,
                        typeOfAlert: "",
                        title: "",
                        actionButtons: actionButtons
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.VendorBillStatusChangedToPending, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
            } else {
                self.ValidateVendorNotes();
                return true;
            }
        };

        // Validates the PRO number
        VendorBillEditDetailsViewModel.prototype.ValidatePRONumber = function () {
            var self = this;
            var existingProNo;
            var commonUtils = new Utils.Common();

            if (commonUtils.isNullOrEmptyOrWhiteSpaces(self.vendorBillDetailsViewModel.bolNumber())) {
                if (self.vendorBillDetailsViewModel.bolNumber().trim() !== self.vendorBillDetailsViewModel.originalBolNumber) {
                    if (self.vendorBillDetailsViewModel.listCheck != null && self.vendorBillDetailsViewModel.listCheck()[1] === true && self.isPoWithBol != true && !self.vendorBillDetailsViewModel.obcvendorBillOptionList.getOptionsById(2).selected()) {
                        self.vendorBillClient.getExistingProNo(self.vendorBillDetailsViewModel.bolNumber(), function (data) {
                            existingProNo = data;
                            self.forceAttachMsg(existingProNo);
                        });
                    } else {
                        self.isNegativeMargin();
                    }
                } else {
                    self.isNegativeMargin();
                }
            } else {
                self.isNegativeMargin();
            }
        };

        // Validates the vendor notes, as if user has only written something not clicked on add
        VendorBillEditDetailsViewModel.prototype.ValidateVendorNotes = function () {
            var self = this;

            if (self.vendorBillNotesViewModel.canAdd()) {
                self.vendorBillNotesViewModel.onAdd();
                self.validateVendorBill();
            } else {
                self.validateVendorBill();
            }
        };

        // Checks the force attach options and gets the user input
        // And then calls the save service
        VendorBillEditDetailsViewModel.prototype.checkForceAttachOptions = function () {
            var self = this;
            var commonUtils = new Utils.Common();
            if (commonUtils.isNullOrEmptyOrWhiteSpaces(self.vendorBillDetailsViewModel.bolNumber())) {
                if (self.vendorBillDetailsViewModel.listCheck != null && self.vendorBillDetailsViewModel.listCheck()[1] === false) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var actionButtons = [];
                        actionButtons.push({
                            actionButtonName: "Yes",
                            actionClick: self.callCheckBolValidationYes
                        });
                        actionButtons.push({
                            actionButtonName: "No",
                            actionClick: self.callCheckBolValidationNo
                        });
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 0,
                            fadeOut: 0,
                            typeOfAlert: "",
                            title: "",
                            actionButtons: actionButtons
                        };

                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.BOLValidationMessage, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                } else {
                    self.ValidatePRONumber();
                }
            } else {
                self.isNegativeMargin();
            }
        };

        // If at least one item should contains the dispute lost amount.
        VendorBillEditDetailsViewModel.prototype.validateDisputeLost = function () {
            var self = this;
            var validateDispute = true;

            var disputeItems = $.grep(self.originalVendorBillContainer.VendorBillItemsDetail, function (e) {
                return e.DisputeLostAmount !== null && e.DisputeLostAmount > 0;
            });

            if (disputeItems && disputeItems.length === 0) {
                validateDispute = false;
            }

            return validateDispute;
        };

        // validate cost and dispute amount
        VendorBillEditDetailsViewModel.prototype.validateCostDisputeAmount = function () {
            var self = this, negativeCost = $.grep(self.vendorBillItemViewModel.vendorBillItemsList(), function (e) {
                return e.cost() && e.cost() < 0 && e.selectedItemTypes().ItemId !== "70";
            });

            if (negativeCost && negativeCost.length > 0) {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 5,
                        fadeOut: 5,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.NegativeLineItemCostValidation, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
                return false;
            }

            var invalidCost = $.grep(self.vendorBillItemViewModel.vendorBillItemsList(), function (e) {
                return e.disputeAmount() && e.cost() && parseFloat(e.cost()) < parseFloat(e.disputeAmount()) && e.selectedItemTypes().ItemId !== "70" && e.selectedItemTypes().ItemId !== "10";
            }), invalidShippingServiceCost = $.grep(self.vendorBillItemViewModel.vendorBillItemsList(), function (e) {
                return e.disputeAmount() && e.cost() && e.selectedItemTypes().ItemId === "10";
            }), sumOfShippingServiceCost = $.grep(self.vendorBillItemViewModel.vendorBillItemsList(), function (e) {
                return e.disputeAmount() && e.cost() && (e.selectedItemTypes().ItemId === "10" || e.selectedItemTypes().ItemId === "70");
            });
            var totalDisputeAmount = 0, totalAmount = 0;
            if (invalidShippingServiceCost && invalidShippingServiceCost.length > 0) {
                // get total dispute amount
                invalidShippingServiceCost.forEach(function (item) {
                    totalDisputeAmount = totalDisputeAmount + parseFloat(item.disputeAmount().toString());
                    return totalDisputeAmount;
                });

                // get total actual amount
                invalidShippingServiceCost.forEach(function (item) {
                    totalAmount = totalAmount + parseFloat(item.cost().toString());
                    return totalAmount;
                });

                if (totalAmount.toFixedDecimal(2) < totalDisputeAmount.toFixedDecimal(2)) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions1 = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 5,
                            fadeOut: 5,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.InvalidCost, "info", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                    }
                    return false;
                } else if (invalidCost && invalidCost.length > 0) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions2 = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 5,
                            fadeOut: 5,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.NegativeLineItemDisputeCostValidation, "info", self.checkMsgClick, toastrOptions2, self.checkMsgHide);
                    }
                    return false;
                }
            }

            if (sumOfShippingServiceCost && sumOfShippingServiceCost.length > 0) {
                totalAmount = 0, totalDisputeAmount = 0;

                // get total dispute amount
                sumOfShippingServiceCost.forEach(function (item) {
                    totalDisputeAmount = totalDisputeAmount + parseFloat(item.disputeAmount().toString().replace(/,/g, ""));
                    return totalDisputeAmount;
                });

                // get total actual amount
                sumOfShippingServiceCost.forEach(function (item) {
                    totalAmount = totalAmount + parseFloat(item.cost().toString().replace(/,/g, ""));
                    return totalAmount;
                });

                if (totalAmount.toFixedDecimal(2) < totalDisputeAmount.toFixedDecimal(2)) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptionss = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 5,
                            fadeOut: 5,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.InvalidTotalCost, "info", self.checkMsgClick, toastrOptionss, self.checkMsgHide);
                    }
                    return false;
                }
            }

            return true;
        };

        // when status is dispute lost or dispute won validate amount
        VendorBillEditDetailsViewModel.prototype.checkStatusIsDisputeWonOrDisputeLost = function () {
            var self = this;
            if ((self.vendorBillDetailsViewModel.selectedbillStatus() === refEnums.Enums.VendorBillStatus.DisputeWon.ID || self.vendorBillDetailsViewModel.selectedbillStatus() === refEnums.Enums.VendorBillStatus.DisputeLost.ID) && !self.validateWonVsLost()) {
                return false;
            }

            if (self.vendorBillDetailsViewModel.selectedbillStatus() === refEnums.Enums.VendorBillStatus.DisputeWon.ID && self.vendorBillDetailsViewModel.originalBillStatus === refEnums.Enums.VendorBillStatus.DisputeLost.ID) {
                if (!self.originalVendorBillContainer.IsCreateLostBillVisible) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 5,
                            fadeOut: 5,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.CanNotChangeStatusToDisputeWonMessage, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);

                        self.vendorBillDetailsViewModel.selectedbillStatus(refEnums.Enums.VendorBillStatus.DisputeLost.ID);
                    }
                    return false;
                }
            }

            return true;
        };

        // validate dispute and lost dispute amount when status is dispute won or dispute lost
        VendorBillEditDetailsViewModel.prototype.validateWonVsLost = function () {
            var self = this, sumOfShippingServiceCost = $.grep(self.vendorBillItemViewModel.vendorBillItemsList(), function (e) {
                return e.disputeAmount() && e.disputeAmount() !== null && e.disputeLostAmount() && e.disputeLostAmount() !== null;
            });

            if (sumOfShippingServiceCost && sumOfShippingServiceCost.length > 0) {
                var totalDisputeLostAmount = 0, totalDisputeAmount = 0;

                // get total dispute amount
                sumOfShippingServiceCost.forEach(function (item) {
                    totalDisputeAmount = totalDisputeAmount + parseFloat(item.disputeAmount().toString());
                    return totalDisputeAmount;
                });

                // get total actual amount
                sumOfShippingServiceCost.forEach(function (item) {
                    totalDisputeLostAmount = totalDisputeLostAmount + parseFloat(item.disputeLostAmount().toString());
                    return totalDisputeLostAmount;
                });

                if (totalDisputeAmount.toFixedDecimal(2) < totalDisputeLostAmount.toFixedDecimal(2)) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 15,
                            fadeOut: 15,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.DisputeCostValidation, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                    return false;
                }

                if (totalDisputeLostAmount.toFixedDecimal(2) < 0) {
                    if (self.checkMsgDisplay) {
                        self.checkMsgDisplay = false;
                        var toastrOptions = {
                            toastrPositionClass: "toast-top-middle",
                            delayInseconds: 5,
                            fadeOut: 5,
                            typeOfAlert: "",
                            title: ""
                        };
                        Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.DisputeCostValidation, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                    }
                    return false;
                }
            }

            return true;
        };

        //#endregion
        //#region Message
        // If PRO does not matches in the order the ask for force attach,
        VendorBillEditDetailsViewModel.prototype.forceAttachMsg = function (existingProNo) {
            var self = this;
            self.MsgexistingProNo = existingProNo;
            if (self.checkMsgDisplay) {
                self.checkMsgDisplay = false;
                var actionButtons = [];
                actionButtons.push({
                    actionButtonName: "Yes",
                    actionClick: self.callForceAttchYes
                });
                actionButtons.push({
                    actionButtonName: "No",
                    actionClick: self.callForceAttchNo
                });
                var toastrOptions = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 0,
                    fadeOut: 0,
                    typeOfAlert: "",
                    title: "",
                    actionButtons: actionButtons
                };

                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.PROValidationMessage, "warning", self.checkMsgClick, toastrOptions, self.checkMsgHide);
            }
        };

        // If PRO does not matches then ask to user weather he wants to update that PRO in order or not
        VendorBillEditDetailsViewModel.prototype.matchingSalesMsg = function (existingProNo) {
            var self = this;
            if (self.checkMsgDisplay) {
                self.checkMsgDisplay = false;
                var actionButtons = [];
                actionButtons.push({
                    actionButtonName: "Yes",
                    actionClick: self.callMatchingsalesYes
                });
                actionButtons.push({
                    actionButtonName: "No",
                    actionClick: self.callMatchingsalesNo
                });
                var toastrOptions = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 0,
                    fadeOut: 0,
                    typeOfAlert: "",
                    title: "",
                    actionButtons: actionButtons
                };

                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.ForceAttachInputeMessage + existingProNo.toString() + "\n to match the Vendor Bills PRO# :" + self.vendorBillDetailsViewModel.proNumber(), "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
            }
        };

        //#endregion
        //#region Click Handler
        // Handles the click event of the Address accordion
        VendorBillEditDetailsViewModel.prototype.onAddressClick = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#address').addClass('active in');
            $('#addressLink').addClass('active');

            self.addressOverflowManage();

            $("#shipperCompanyName").focus();
        };

        // Sets the notes section focus
        VendorBillEditDetailsViewModel.prototype.onNotesClick = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#notes').addClass('active in');
            $('#notesLink').addClass('active in');

            $("#txtuserNote").focus();

            //on click we are calling this flag to show grid column resizebal as per browser window
            self.vendorBillNotesViewModel.reportContainer.isAttachedToView(false);
            self.vendorBillNotesViewModel.reportContainer.isAttachedToView(true);
        };

        // Handles the Item accordion click
        VendorBillEditDetailsViewModel.prototype.onItemClick = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#item').addClass('active in');
            $('#itemLink').addClass('active');

            $("#addItemButton").focus();
        };

        // Handles the VendorBill accordion click
        VendorBillEditDetailsViewModel.prototype.onVendorBillClick = function () {
            $("#shipperCityStateZip").focus();
        };

        //## function to expand the view by ID, if any case we required
        VendorBillEditDetailsViewModel.prototype.expandView = function (viewId) {
            if (!$('#' + viewId).hasClass('in')) {
                $('#' + viewId).addClass('in');
                $('#' + viewId).css("height", 'auto');
                $('#Achor' + viewId).removeClass('collapsed');
            }
        };

        //## function to collapse the items view by ID, if any case we required
        VendorBillEditDetailsViewModel.prototype.collapseView = function (viewId) {
            $('#' + viewId).removeClass('in');
            $('#' + viewId).css("height", '0');
            $('#Achor' + viewId).addClass('collapsed');
            $('#collapseAddress').css("overflow", "hidden");
        };

        // click handler on open create sub bill
        VendorBillEditDetailsViewModel.prototype.onCreateSubBill = function () {
            var self = this, vendorBillId = self.vendorBillDetailsViewModel.vendorBillId(), proNumber = self.findProNumber();
            self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
            _app.trigger("openVendorBill", vendorBillId, proNumber, function (callback) {
                if (!callback) {
                    return;
                }
            }, true);
        };

        // click handler on create lost bill
        VendorBillEditDetailsViewModel.prototype.onCreateLostBill = function () {
            var self = this;
            if (self.validateDisputeLost()) {
                var disputeItems = $.grep(self.originalVendorBillContainer.VendorBillItemsDetail, function (e) {
                    return e.DisputeLostAmount !== null && e.DisputeLostAmount > 0;
                });
                var vbTotalDisputeLostAmount = 0;
                disputeItems.forEach(function (item) {
                    vbTotalDisputeLostAmount = vbTotalDisputeLostAmount + parseFloat(item.DisputeLostAmount.toString());
                    return vbTotalDisputeLostAmount;
                });

                var message = ApplicationMessages.Messages.LostAmountValidation_1 + "$" + vbTotalDisputeLostAmount.toFixed(2).toString() + ApplicationMessages.Messages.LostAmountValidation_2;
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;

                    var actionButtons = [];
                    actionButtons.push({
                        actionButtonName: "Yes",
                        actionClick: self.callCheckSubOrderCreate
                    });
                    actionButtons.push({
                        actionButtonName: "No",
                        actionClick: self.checkMsgHide
                    });
                    var toastrOptions1 = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 0,
                        fadeOut: 0,
                        typeOfAlert: "",
                        title: "",
                        actionButtons: actionButtons
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, message, "warning", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                }
            } else {
                if (self.checkMsgDisplay) {
                    self.checkMsgDisplay = false;
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 5,
                        fadeOut: 5,
                        typeOfAlert: "",
                        title: ""
                    };
                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.NoDisputeLostAmountValidation, "info", self.checkMsgClick, toastrOptions, self.checkMsgHide);
                }
                return;
            }
        };

        // click handler on dispute won bill
        VendorBillEditDetailsViewModel.prototype.onDisputeWon = function () {
            var self = this;
            self.isDisputeWonLostButtonClicked = true;
            self.billStatusOfDisputeWonLostButtonClicked = refEnums.Enums.VendorBillStatus.DisputeWon.ID;
            self.onSave();
            self.isDisputeWonLostButtonClicked = false;
        };

        // click handler on dispute lost bill
        VendorBillEditDetailsViewModel.prototype.onDisputeLost = function () {
            var self = this;

            var refresh = function () {
                self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
                self.beforeBind();
                //self.loadViewAfterComposition();
            };

            _app.showDialog('vendorBill/VendorBillDisputeLost', refresh, 'slideDown');
        };

        // login to find next pro number
        VendorBillEditDetailsViewModel.prototype.findProNumber = function () {
            var self = this, proNumber = self.vendorBillDetailsViewModel.proNumber(), count = self.subOrderCount + 65;

            proNumber = proNumber + " " + String.fromCharCode(count);

            return proNumber;
        };

        VendorBillEditDetailsViewModel.prototype.loadPodDocDetails = function () {
            $('#selectDocOwner').focus();
            var self = this;

            if (self.isAccordion()) {
                if (!$('#collapsePOD').hasClass('in')) {
                    //if (!self.isNewSubOrder()) {
                    self.callPodDocDetails();
                    //}
                }
            } else {
                if (!$('#podDocLink').hasClass('in') && !$('#tab_podDoc').hasClass('in')) {
                    //if (!self.isNewSubOrder()) {
                    self.callPodDocDetails();
                    //}
                }
            }

            self.collapseAllTabs();
            $('#tab_podDoc').addClass('active in');
            $('#podDocLink').addClass('active in');

            //on click we are calling this flag to show grid column resizebal as per browser window
            self.vendorBillPODDocViewModel.reportContainer.isAttachedToView(false);
            self.vendorBillPODDocViewModel.reportContainer.isAttachedToView(true);
        };

        VendorBillEditDetailsViewModel.prototype.callPodDocDetails = function () {
            var self = this;
            var data = new Array();
            var uploadFileDetails = new refPodDocModel.Models.VendorBillUploadFileModel();
            uploadFileDetails.CarrierId = self.vendorBillDetailsViewModel.vendorNameSearchList.ID();
            if (self.vendorBillDetailsViewModel.proNumber().indexOf(' ') >= 0) {
                var str = self.vendorBillDetailsViewModel.proNumber().split(' ');
                uploadFileDetails.ProNumber = str[0];
            } else {
                uploadFileDetails.ProNumber = self.vendorBillDetailsViewModel.proNumber();
            }

            if (self.vendorBillDetailsViewModel.bolNumber() != '') {
                uploadFileDetails.BolNumber = self.vendorBillDetailsViewModel.bolNumber();
            } else if (self.vendorBillDetailsViewModel.mainBolNumber() != '') {
                uploadFileDetails.BolNumber = self.vendorBillDetailsViewModel.mainBolNumber();
            }
            uploadFileDetails.VendorBillId = self.vendorBillDetailsViewModel.vendorBillId();
            uploadFileDetails.CarrierName = self.vendorBillDetailsViewModel.vendorName();
            uploadFileDetails.OriginZip = self.OriginZip();
            uploadFileDetails.ServiceType = self.vendorBillDetailsViewModel.vendorNameSearchList.carrierType();

            //** if there is no data is registered then make a server call. */
            var successCallBack = function (data) {
                self.vendorBillPODDocViewModel.vendorBillPodDocDetail.removeAll();
                self.vendorBillPODDocViewModel.reportContainer.listProgress(true);
                self.vendorBillPODDocViewModel.initializeVendorBillPodDocDetails(data, self.vendorBillDetailsViewModel.proNumber(), self.vendorBillDetailsViewModel.vendorNameSearchList.ID(), self.vendorBillDetailsViewModel.bolNumber(), self.vendorBillDetailsViewModel.vendorBillId(), !self.isViewOnly, self.vendorBillDetailsViewModel.vendorName(), self.OriginZip());
                self.vendorBillPODDocViewModel.reportContainer.listProgress(false);
            }, faliureCallBack = function (message) {
                console.log(message);
                self.vendorBillPODDocViewModel.reportContainer.listProgress(false);
            };
            self.vendorBillPODDocViewModel.reportContainer.listProgress(false);
            self.vendorBillClient.getVendorBillPodDocDetails(uploadFileDetails, successCallBack, faliureCallBack);
        };

        VendorBillEditDetailsViewModel.prototype.onForcePushBillToMas = function () {
            var self = this;
            self.ShowProgressBar(true);
            self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
            var successCallBack = function (data) {
                var toastrOptions1 = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 0,
                    fadeOut: 0,
                    typeOfAlert: "",
                    title: ""
                };

                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.UpdatedSuccessfullyMessage, "success", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                self.beforeBind();
            }, failureCallBack = function (message) {
                var toastrOptions1 = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 0,
                    fadeOut: 0,
                    typeOfAlert: "",
                    title: ""
                };

                self.ShowProgressBar(false);
                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, message, "error", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
            };

            self.vendorBillClient.ForcePushBillToMas(self.vendorBillDetailsViewModel.vendorBillId(), self.vendorBillDetailsViewModel.updatedDate, successCallBack, failureCallBack);
        };

        // Click event for reverting the Vendor Bill From IDB
        VendorBillEditDetailsViewModel.prototype.onRevertBill = function () {
            var self = this;
            self.ShowProgressBar(true);
            self.clearLocalStorage(self.vendorBillDetailsViewModel.vendorBillId() + '_' + self.vendorBillDetailsViewModel.proNumber());
            var successCallBack = function (data) {
                var toastrOptions1 = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 0,
                    fadeOut: 0,
                    typeOfAlert: "",
                    title: ""
                };
                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.UpdatedSuccessfullyMessage, "success", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                self.beforeBind();
            }, failureCallBack = function (message) {
                var toastrOptions1 = {
                    toastrPositionClass: "toast-top-middle",
                    delayInseconds: 0,
                    fadeOut: 0,
                    typeOfAlert: "",
                    title: ""
                };
                Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, message, "error", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                self.ShowProgressBar(false);
            };
            self.vendorBillClient.RevertBillFromIdb(self.vendorBillDetailsViewModel.vendorBillId(), self.vendorBillDetailsViewModel.updatedDate, successCallBack, failureCallBack);
        };

        //#endregion
        //#region Load Data
        VendorBillEditDetailsViewModel.prototype.load = function (bindedData) {
            if (!bindedData) {
                return;
            } else if (typeof (bindedData.vendorBillId) === 'undefined') {
                return;
            }

            var self = this;

            //** if there is no data is registered then make a server call. */
            self.ShowProgressBar(true);
            var vendorBillId = bindedData.vendorBillId, isSubOrderBill = bindedData.isSubBill, isException = bindedData.isException, vbStorageKey = bindedData.vendorBillId + '_' + bindedData.proNumber, isLostBill = (typeof (bindedData.isLostBill) === 'undefined' ? false : (typeof (bindedData.isLostBill) === 'boolean' ? bindedData.isLostBill ? true : false : bindedData.isLostBill === 'false' ? false : true)), successCallBack = function (data) {
                self.originalVendorBillContainer = data;
                if (data.VendorBill.ProcessFlow === 0) {
                    self.vendorBillHeader('Vendor Bill');
                } else {
                    self.vendorBillHeader('Vendor Bill ITerm');
                }

                //var reloadDateTime = LocalStorageController.Get('lastReloadDateTime');
                //self.currentDateTime(reloadDateTime);
                self.isSaveEnable = data.IsSaveEnable;
                self.isViewOnly = data.IsReadOnly;
                self.isNotAtLoadingTime = true;
                self.subOrderCount = data.SuborderCount;

                if (isLostBill) {
                    self.isSubOrderBill(false);
                } else {
                    self.isSubOrderBill(!data.IsSubBill);
                }

                if (isLostBill) {
                    self.isLostBill(isLostBill);
                } else {
                    self.isLostBill(data.VendorBill.IsLostBill);
                }

                // ###END: US20884
                self.isExceptionShowPopup(isException === 'false' ? false : true);
                self.isCreateLostBillVisible(data.IsCreateLostBillVisible);
                self.isDisputeWonLostVisible(data.IsDisputeWonLostVisible);
                self.IsClearedPermission = data.IsClearedPermission;
                self.vendorBillId(vendorBillId);
                self.vendorAddressViewModel.isSubOrderBill(data.IsSubBill);
                self.canForcePushToMasVisible(data.CanForcePushBillToMAS);
                self.isRevertBillVisible(data.IsRevertBillVisible);
                self.vendorAddressViewModel.shouldBeReadOnly(data.VendorBill.IDBFlag);

                //##START: US21146
                self.billStatusOnLoad = data.VendorBill.BillStatus;

                if (self.isSaveEnable) {
                    //self.DisableAlltheControls();
                    self.vendorAddressViewModel.shouldBeReadOnly(self.isSaveEnable);
                } else {
                    if (data.VendorBill.BillStatus == 2) {
                        self.billStatus = data.VendorBill.BillStatus;

                        if (!self.IsClearedPermission && !isLostBill) {
                            self.isSaveEnable = true;
                            self.vendorAddressViewModel.shouldBeReadOnly(self.isSaveEnable);
                            self.DisableAlltheControls();
                        }
                    }
                }

                // load vendor bill details
                self.vendorBillDetailsViewModel.initializeVendorBillDetails(data.VendorBill, data.IsNewSubBill, data.IsDisputeAmountEditable, data.IsDisputeLostAmountEditable, data.IsDisputeSectionEditable, self.isViewOnly, data.IsSubBill, self.isSaveEnable, self.isLostBill());

                // load notes details
                self.vendorBillNotesViewModel.initializeVendorBillNotes(data.VendorBillNotes, data.VendorBill.MasTransferDate, data.VendorBill.VendorBillId, data.VendorBill.BillStatus);

                if (data.VendorBillItemsDetail.length > 0) {
                    self.vendorBillItemViewModel.initializeVendorBillItemDetails(data.VendorBillItemsDetail, data.IsDisputeAmountEditable, data.IsDisputeLostAmountEditable, self.isSaveEnable, self.isLostBill());
                } else {
                    self.vendorBillItemViewModel.addDefaultItems();
                }
                self.ShowProgressBar(false);
                if (data.VendorBillExceptionRulesAndResolutions.length > 0) {
                    self.isExceptionTabAndAccordion(true);
                    if (self.isExceptionShowPopup()) {
                        var vendorbillId = { vendorBillId: self.vendorBillId() };
                        var optionControlArgs = {
                            options: undefined,
                            message: '',
                            title: 'Revenue Adjustment',
                            bindingObject: vendorbillId
                        };
                        _app.showDialog('vendorBill/VendorBillExceptionPopup', optionControlArgs);
                    }
                } else {
                    self.isExceptionTabAndAccordion(false);
                    self.isExceptionShowPopup(false);
                }

                // load address details
                var shipperAddress = $.grep(data.VendorBillAddress, function (e) {
                    return e.AddressType === refEnums.Enums.AddressType.Origin.ID;
                })[0], consigneeAddress = $.grep(data.VendorBillAddress, function (e) {
                    return e.AddressType === refEnums.Enums.AddressType.Destination.ID;
                })[0], billToAddress = $.grep(data.VendorBillAddress, function (e) {
                    return e.AddressType === refEnums.Enums.AddressType.BillTo.ID;
                })[0];

                //** flag to specify whether address fields are read only or not.? */
                //##START: DE20309
                //self.vendorAddressViewModel.isCallForEdit(!data.CanEditBillToAddress);
                //self.vendorAddressViewModel.isCallForEdit(true);
                self.vendorAddressViewModel.canEdit(true);

                //##END: DE20309
                self.vendorAddressViewModel.populateAddressByUser = false;
                self.vendorAddressViewModel.populateShipperAddress(shipperAddress);
                self.vendorAddressViewModel.populateConsigneeAddress(consigneeAddress);
                self.vendorAddressViewModel.populateBillToAddress(billToAddress);
                self.vendorAddressViewModel.processDetails(data.VendorBill.ProcessDetails);
                self.vendorAddressViewModel.populateAddressByUser = true;
                if (shipperAddress !== undefined) {
                    self.OriginZip(shipperAddress.ZipCode);
                }

                //** set vendor bill id and pro number to purchase order */
                self.vendorBillHistoryViewModel.vendorBillId = vendorBillId;
                self.vendorBillHistoryViewModel.proNumber = data.VendorBill.ProNumber;
                self.ShowProgressBar(false);
                self.isChange(false);

                if (self.checkCompCalled) {
                    self.isNotAtLoadingTime = false;
                }

                if (self.changeTermType) {
                    self.changeTermType(data.VendorBill.ProcessFlow);
                }

                //To save date time in local storage
                self.setDateTimeOfReload();

                if (typeof (bindedData.proNumber) === 'undefined') {
                    vbStorageKey = vendorBillId + '_' + data.VendorBill.ProNumber;
                    var dataToRegister = { vendorBillId: vendorBillId, proNumber: data.VendorBill.ProNumber, isSubBill: 'false', isException: 'false' };
                    _app.trigger("registerMyData", dataToRegister);
                }

                // ###START: US20305
                self.vendorBillNotesViewModel.vbStorageKey = vbStorageKey;

                // ###END: US20305
                // Store in the local variable to get the data again from that variable do not need to get the data from the database
                LocalStorageController.Set(vbStorageKey + 'VB', data);

                _app.trigger("IsBIDirtyChange", self.isChange(false));

                if (isLostBill) {
                    self.isChange(true);
                }
                // ###END: US20884
            }, faliureCallBack = function (message) {
                console.log(message);
                self.ShowProgressBar(false);
                _app.trigger("IsBIDirtyChange", false);
            };

            if (!LocalStorageController.Get(vbStorageKey + 'VB')) {
                if (!isLostBill) {
                    self.vendorBillClient.getVendorBillDetailsByVendorBillId(vendorBillId, successCallBack, faliureCallBack, isSubOrderBill);
                } else {
                    self.vendorBillClient.getVendorBillDetailsForLostBill(vendorBillId, successCallBack, faliureCallBack);
                }
            } else {
                successCallBack(LocalStorageController.Get(vbStorageKey + 'VB'));
                self.ShowProgressBar(false);
            }

            self.getVendorBillFinancialDetails(vendorBillId, bindedData.proNumber, vbStorageKey);
        };

        // To load financial details
        VendorBillEditDetailsViewModel.prototype.getVendorBillFinancialDetails = function (vendorBillId, targetProNumber, storageKey) {
            var self = this;
            var successCallBack = function (data) {
                if (data) {
                    self.vendorBillDetailsViewModel.initializeVendorBillFinancialDetails(data);
                    LocalStorageController.Set(storageKey + 'VBFinancialDetails', data);
                }
            }, failureCallBack = function (message) {
            };
            if (!LocalStorageController.Get(storageKey + 'VBFinancialDetails')) {
                self.vendorBillClient.getVendorBillFinancialDetailsByVendorBillId(vendorBillId, successCallBack, failureCallBack);
            } else {
                successCallBack(LocalStorageController.Get(storageKey + 'VBFinancialDetails'));
            }
        };

        //To load Shipment Details
        VendorBillEditDetailsViewModel.prototype.getShipmentLinks = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#links').addClass('active in');
            $('#linksLink').addClass('active in');

            if (!$('#collapseLinks').hasClass('in')) {
                self.vendorBillLinksViewModel.listProgress(true);
                self.listProgressLinks(true);
                self.listProgressLinksTabbed(true);
                var successCallBack = function (data) {
                    var commonUtils = new Utils.Common();

                    // load Links details
                    self.vendorBillLinksViewModel.initializeLinksDetails(data, self.vendorBillDetailsViewModel.vendorBillId());
                    self.vendorBillLinksViewModel.listProgress(false);
                    self.listProgressLinks(false);
                    self.listProgressLinksTabbed(false);
                }, faliureCallBack = function () {
                    self.vendorBillLinksViewModel.listProgress(false);
                    self.listProgressLinks(false);
                    self.listProgressLinksTabbed(false);
                };
                self.vendorBillClient.getShipmentRelatedLinks(self.vendorBillDetailsViewModel.bolNumber(), self.vendorBillDetailsViewModel.vendorBillId(), successCallBack, faliureCallBack);
            }
        };

        //To load Payment Details
        VendorBillEditDetailsViewModel.prototype.getPaymentDetails = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#payment').addClass('active in');
            $('#paymentLink').addClass('active in');

            if (!$('#collapsePaymentDetails').hasClass('in')) {
                if (self.vendorBillDetailsViewModel.moveToMasDate()) {
                    self.listProgressPayment(true);
                    var successCallBack = function (data) {
                        var commonUtils = new Utils.Common();

                        // To load payment Details
                        self.vendorBillPaymentDetailsViewModel.initializePaymentDetails(data);
                        self.listProgressPayment(false);
                    }, faliureCallBack = function () {
                        self.listProgressPayment(false);
                    };
                    self.vendorBillClient.getShipmentPaymentDetails("vendorBill", self.vendorBillDetailsViewModel.vendorBillId(), successCallBack, faliureCallBack);
                }
            }

            //on click we are calling this flag to show grid column resizebal as per browser window
            self.vendorBillPaymentDetailsViewModel.reportContainer.isAttachedToView(false);
            self.vendorBillPaymentDetailsViewModel.reportContainer.isAttachedToView(true);
        };

        //To Load History details
        VendorBillEditDetailsViewModel.prototype.getHistorydetails = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#history').addClass('active in');
            $('#historyLink').addClass('active in');

            self.vendorBillHistoryViewModel.historyNewValueContainer.listProgress(true);
            if (!$('#collapseHistory').hasClass('in')) {
                var successCallBack = function (data) {
                    var commonUtils = new Utils.Common();

                    // To load History Details
                    self.vendorBillHistoryViewModel.initializeHistoryDetails(data, data.VendorBillId, true);

                    self.vendorBillHistoryViewModel.historyNewValueContainer.listProgress(false);
                }, faliureCallBack = function () {
                    self.vendorBillHistoryViewModel.historyNewValueContainer.listProgress(false);
                };
                self.vendorBillClient.GetVendorBillHistoryByVendorBillId(self.vendorBillDetailsViewModel.vendorBillId(), successCallBack, faliureCallBack);
            }
        };

        //To load Exception Rule and description
        VendorBillEditDetailsViewModel.prototype.getVendorBillExceptionRulesAndResolution = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#exception').addClass('active in');
            $('#exceptionLink').addClass('active in');

            if (!$('#collapseException').hasClass('in')) {
                self.listProgressException(true);
                var successCallBack = function (data) {
                    var commonUtils = new Utils.Common();
                    self.isExceptionTabAndAccordion(true);
                    self.isExceptionShowPopup(true);
                    self.VendorBillException.selectedBillStatus(self.vendorBillDetailsViewModel.selectedbillStatus());

                    // To load History Details
                    self.VendorBillException.initializeExeptionruleAndResolution(data);

                    self.listProgressException(false);
                }, faliureCallBack = function () {
                    self.listProgressException(false);
                };
                self.vendorBillClient.GetVendorBillExceptionRulesAndResolution(self.vendorBillDetailsViewModel.vendorBillId(), successCallBack, faliureCallBack);
            }
        };

        // To load Vendor bill dispute details
        VendorBillEditDetailsViewModel.prototype.getVendorBillDisputeItemDetails = function () {
            var self = this;

            // To avoid tabs goes blank on quick move between tabs
            self.collapseAllTabs();
            $('#dispute').addClass('active in');
            $('#disputeLink').addClass('active in');

            self.GetDisputeDetails(self.vendorBillDetailsViewModel.selectedbillStatus());
        };

        VendorBillEditDetailsViewModel.prototype.GetDisputeDetails = function (newSelectedbillStatus) {
            var self = this;
            if (self.vendorBillDetailsViewModel.vendorBillId() !== 0) {
                if (!$('#collapseDispute').hasClass('in')) {
                    self.listProgressDispute(true);
                    self.listProgressDisputeTabbed(true);
                    var successCallBack = function (data) {
                        self.VendorBillDispute.initializeDisputeItem(data, self.vendorBillDetailsViewModel.vendorBillId(), self.isViewOnly, self.isSaveEnable);
                        self.listProgressDispute(false);
                        self.listProgressDisputeTabbed(false);

                        if (newSelectedbillStatus) {
                            self.ActiveDisputeTab(newSelectedbillStatus);
                        }
                    }, failureCallBack = function (errorMessage) {
                        self.listProgressDispute(false);
                        self.listProgressDisputeTabbed(false);
                    };
                    self.vendorBillClient.getVendorBillDisputeDetails(self.vendorBillDetailsViewModel.vendorBillId(), self.vendorBillDetailsViewModel.bolNumber(), successCallBack, failureCallBack);
                } else {
                    if (newSelectedbillStatus) {
                        self.ActiveDisputeTab(newSelectedbillStatus);
                    }
                }
            }
        };

        // change dispute tab on changinf of bill status in header
        VendorBillEditDetailsViewModel.prototype.ActiveDisputeTab = function (newSelectedbillStatus) {
            var self = this;
            if (newSelectedbillStatus !== undefined && newSelectedbillStatus !== null) {
                self.VendorBillDispute.billstatuId(newSelectedbillStatus);
                if (newSelectedbillStatus === refEnums.Enums.VendorBillStatus.Dispute.ID) {
                    self.VendorBillDispute.isBillStatusDispute(true);
                } else {
                    self.VendorBillDispute.isBillStatusDispute(false);
                }
                if (!self.isViewOnly) {
                    if (newSelectedbillStatus === refEnums.Enums.VendorBillStatus.Dispute.ID) {
                        self.collapseAllTabs();
                        $('#disputeLink').addClass('active');
                        $('#dispute').addClass('active in');
                    }
                }
            }
        };

        // To set address accordion to overflow
        VendorBillEditDetailsViewModel.prototype.addressOverflowManage = function () {
            if ($("#collapseAddress").css("overflow") === "hidden") {
                setTimeout(function () {
                    $('#collapseAddress').css("overflow", "visible");
                }, 500);
            } else {
                $('#collapseAddress').css("overflow", "hidden");
            }
        };

        //To show the progress bar.
        VendorBillEditDetailsViewModel.prototype.ShowProgressBar = function (progress) {
            var self = this;
            self.listProgressAccordian(progress);
            self.listProgressTabbed(progress);
        };

        //#endregion
        VendorBillEditDetailsViewModel.prototype.DisableAlltheControls = function () {
            var self = this;
            if (self.isViewOnly) {
                $('#mainDiv').find('span, textarea, button, select').attr('disabled', 'disabled');
                $('#mainDiv').find('span, textarea, button, select').attr('disabled', 'disabled');
                $('#topButtonsDiv').find('input, textarea, button, select').attr('disabled', 'disabled');
                $('#notesDiv').find('input, textarea, button, select').attr('disabled', 'disabled');
                $('#notes').find('input, textarea, button, select').attr('disabled', 'disabled');
            }
            $('#detailsDiv').find('input, textarea, button, select').attr('disabled', 'disabled');
            $('#addressDiv').find('input, textarea, button, select').attr('disabled', 'disabled');
            $('#itemsDiv').find('input, textarea, button, select').attr('disabled', 'disabled');

            $('#vendorDetails').find('input, textarea, button, select').attr('disabled', 'disabled');
            $('#item').find('input, textarea, button, select').attr('disabled', 'disabled');
            $('#address').find('input, textarea, button, select').attr('disabled', 'disabled');
        };

        // To Clear the Local storage
        // Change 1: VendorBill Id: Changed to ProNumber. Because When creating sub bill we are replacing the suborder data as main order in local storage as we didn't clear the Vendor bill Id until saving the sub bill.
        // Change 2:ProNumber Reverted back to VendorBillId_PRO#, because incase of same pro# is making the problem. So problem is sorted out.
        VendorBillEditDetailsViewModel.prototype.clearLocalStorage = function (targetId) {
            if (LocalStorageController.Get(targetId + 'VB')) {
                LocalStorageController.Set(targetId + 'VB', undefined);
            }

            if (LocalStorageController.Get(targetId + 'VBFinancialDetails')) {
                LocalStorageController.Set(targetId + 'VBFinancialDetails', undefined);
            }
        };

        //#endregion
        //#region Life Cycle Event}
        //** Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button. */
        VendorBillEditDetailsViewModel.prototype.attached = function () {
            _app.trigger('viewAttached');
        };

        //** The composition engine will execute it prior to calling the binder. */
        VendorBillEditDetailsViewModel.prototype.activate = function () {
            var self = this;

            //self.ShowProgressBar(true);
            return true;
        };

        VendorBillEditDetailsViewModel.prototype.deactivate = function () {
            var self = this;

            self.cleanup();
        };

        VendorBillEditDetailsViewModel.prototype.registerData = function (vendorBillId, isSubBill) {
            var self = this;

            //data object will keep the viewModels.
            var data = { vendorBillId: vendorBillId, isSubBill: 'false', isException: 'false', isLostBill: 'false' };
            _app.trigger("registerMyData", data);
        };

        VendorBillEditDetailsViewModel.prototype.overFlowManage = function () {
            var self = this;
            if (self.isAccordion()) {
                if (!$('#collapseAddress').hasClass('in')) {
                    $('#collapseAddress').css("overflow", "hidden");
                } else {
                    $('#collapseAddress').css("overflow", "visible");
                }
            }
        };

        //**When the value of the activator is switched to a new value, before the switch occurs, we register the view data. */
        VendorBillEditDetailsViewModel.prototype.beforeBind = function (vendorBillId) {
            var self = this;

            //if (vendorBillId === undefined || vendorBillId === 0) {
            _app.trigger("loadMyData", function (data) {
                if (data) {
                    //if (!LocalStorageController.Get(data.vendorBillId + '_' + data.proNumber + 'VB')) {
                    self.load(data);
                    //}
                } else {
                    if (vendorBillId === undefined || vendorBillId === 0) {
                        self.isSearchByUrl = true;
                        _app.trigger("closeActiveTab");
                    }
                }
            });
            //} else {
            //	self.ShowProgressBar(false);
            //}
        };

        //** Using for focus cursor on last cycle for focusing in vendor name
        VendorBillEditDetailsViewModel.prototype.compositionComplete = function () {
            //setTimeout(function () {
            //	if (self.vendorBillId() == 0) {
            //		$('.txtVendorName').focus();
            //	} else {
            //		$('.btnCreateSubBill').focus();
            //	}
            //}, 500);
            _app.trigger("IsBIDirtyChange", false);
            var self = this;
            if (self.isSaveEnable) {
                //##START: DE21616
                //self.DisableAlltheControls();
                //##END: DE21616
            } else {
                if (self.billStatus == 2) {
                    if (!self.IsClearedPermission) {
                        self.DisableAlltheControls();
                    }
                }
            }
            if (self.isViewOnly) {
                self.DisableAlltheControls();
            }
            self.checkCompCalled = true;
            self.isNotAtLoadingTime = false;
            //self.getVendorBillExceptionRulesAndResolution();
            ////if data present in localStorage then bind data from local Storage
            //_app.trigger("loadMyData", data => {
            //	if (data) {
            //		if (LocalStorageController.Get(data.vendorBillId + '_' + data.proNumber + 'VB')) {
            //			if (self.iscompositionCompleteCalled()) {
            //				self.load(data);
            //				self.iscompositionCompleteCalled(false);
            //			}
            //		}
            //	} else {
            //		if (self.isSearchByUrl) {
            //			_app.trigger("closeActiveTab");
            //		}
            //	}
            //});
        };

        ////public loadViewAfterComposition(vendorBillId?: number) {
        ////	var self = this;
        ////	_app.trigger("loadMyData", data => {
        ////		if (data) {
        ////			self.load(data);
        ////		} else {
        ////			if (vendorBillId === undefined || vendorBillId === 0) {
        ////				_app.trigger("closeActiveTab");
        ////			}
        ////		}
        ////	});
        ////}
        VendorBillEditDetailsViewModel.prototype.CallChangeMadeFunctions = function () {
            var self = this;

            // to detect changes for vendor Bill Items.
            self.vendorBillItemViewModel.onChangesMade = self.changesDetected;

            //#region Call change functions
            // for address
            self.vendorAddressViewModel.onChangesMade = self.changesDetected;

            // for shipper address
            self.vendorAddressViewModel.shipperLocation.onChangesMade = self.changesDetected;

            //for consignee address
            self.vendorAddressViewModel.consigneeLocation.onChangesMade = self.changesDetected;

            // For vendor Bill section
            self.vendorBillDetailsViewModel.onChangesMade = self.changesDetected;

            // for vendor name in vendor bill section
            self.vendorBillDetailsViewModel.vendorNameSearchList.onChangesMade = self.changesDetected;

            //for buttons in vendor bill section
            self.vendorBillDetailsViewModel.obcvendorBillOptionList.onChangesMade = self.changesDetected;

            // for Vendor bill Notes section
            self.vendorBillNotesViewModel.onChangesMade = self.changesDetected;
        };

        VendorBillEditDetailsViewModel.prototype.cleanup = function () {
            var self = this;

            try  {
                window.removeEventListener("resize", self.resizeFunction);

                delete self.vendorBillNotesViewModel.onChangesMade;

                delete self.vendorAddressViewModel.shipperLocation.onChangesMade;
                delete self.vendorAddressViewModel.consigneeLocation.onChangesMade;
                delete self.vendorAddressViewModel.billToLocation.onChangesMade;
                delete self.setDateTimeOfReload;

                self.vendorAddressViewModel.cleanUp();
                self.vendorBillItemViewModel.cleanUp();
                self.vendorBillNotesViewModel.cleanup();
                self.vendorBillHistoryViewModel.cleanUp();
                self.VendorBillDispute.cleanup();
                self.vendorBillPaymentDetailsViewModel.cleanUp();

                self.vendorBillLinksViewModel.cleanUp();
                delete self.vendorBillLinksViewModel;

                self.vendorBillPODDocViewModel.cleanUp();
                self.VendorBillException.cleanUp();

                self.vendorBillDetailsViewModel.cleanUp();

                delete self.vendorBillItemViewModel;
                delete self.vendorBillNotesViewModel;
                delete self.VendorBillDispute;
                delete self.vendorAddressViewModel;
                delete self.vendorBillPODDocViewModel;
                delete self.changesDetected;
                delete self.vendorBillHistoryViewModel;
                delete self.VendorBillException;

                for (var prop in self) {
                    if (typeof self[prop].dispose === "function") {
                        self[prop].dispose();
                    }
                    if (prop !== "cleanup")
                        delete self[prop];
                }

                delete self;
            } catch (exception) {
                delete self;
            }
        };
        return VendorBillEditDetailsViewModel;
    })();
    exports.VendorBillEditDetailsViewModel = VendorBillEditDetailsViewModel;
});
