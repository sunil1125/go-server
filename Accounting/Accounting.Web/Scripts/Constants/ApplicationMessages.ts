/*
** <summary>
** Module to hold all the constants used in the application.
** </summary>
** <createDetails>
** <id></id> <by>Avinash Dubey</by> <date>06-07-2014</date>
** </createDetails>
** <changeHistory>
** <id>US19330</id> <by>Baldev Singh Thakur</by> <date>02-11-2015</date>
** <id>US20208</id> <by>Vasanthakumar</by> <date>01-01-2016</date> <description>Modification of SO Cancellation Process for the Insurance on BOLs in Accounting</description>
** <id>US20264</id> <by>Shreesha Adiga</by> <date>11-01-2016</date> <description>Added sales order upload related error/success messages</description>
** <id>US20961</id> <by>Shreesha Adiga</by> <date>08-03-2016</date> <description>Added DisputeStatusSavedSuccessfully</description>
** <id>US20884</id> <by>Baldev Singh Thakur</by> <date>21-03-2016</date> <description>Added LostBillCostValidation</description>
** </changeHistory>
*/
module ApplicationMessages {
	//#region UI Constants
	//Constants class to hold all the static constant values used in the UI.
	//All the Message box related constants will be present in this class.
	export class Messages {
		//#region Page Title display values

		//Application title name.
		public static VendorBillNotesValidationMessage: string = "You have not yet submitted vendor bill notes. Do you wish to continue without saving the vendor bill notes?";

		// PROAlreadyExists
		public static PROAlreadyExists: string = "Entered PRO# already exist for this Vendor";

		// The title of the application message
		public static ApplicationMessageTitle: string = "GlobalTranz Enterprise";

		// Saved successfully message
		public static SavedSuccessfullyMessage: string = "VendorBill saved successfully";

		// Saved successfully message
		public static SalesOrderSavedSuccessfullyMessage: string = "Sales Order created successfully with BOL# :";

		// Saved successfully message
		public static SalesOrderCopiedSuccessfullyMessage: string = "Sales Order saved successfully with BOL# :";

		public static CostIsNotMoreThanRevenueMessage: string = "Current Revenue can not be accepted as it is resulting in negative margin for this shipment";

		//EmptyDeliveryDate
		public static EmptyDeliveryDate: string = "Delivery Date should be empty";

		//GreaterDeliveryDate
		public static GreaterDeliveryDate: string = "Delivery Date should be greater than Pickup Date";

		// Saved successfully message
		public static MappingsSavedSuccessfullyMessage: string = "Mapping Details saved successfully";

		// Saved successfully message
		public static ContactSavedSuccessfullyMessage: string = "Contact Details saved successfully";

		// BOL validation message
		public static BOLValidationMessage: string = "Entered BOL Number is either Cancelled/Invalid. Do you want to create a UVB with this BOL Number?";

		// Message for PRO validation
		public static PROValidationMessage: string = "This given Sales Order does not have a PRO#.  Do you want to force attach this VB to the Order?";

		// Message which required some of the other words as well
		public static ForceAttachInputeMessage: string = "Please Note:  You are attaching a Vendor Bill to a Sales Order.  The Sales Order does not have a matching PRO#.  Would you like to update the Sales Order PRO# :";

		// Message for date time validation
		public static DateTimeValidation: string = "Please Select Date Time frame ...";

		// Message for valid PRO number
		public static ValidPRORequired: string = "A valid PRO Number is required";

		// Valid date required
		public static ValidDateRequired: string = " A valid Bill Date is required";

		// Valid time required
		public static ValidTimeRequired: string = " A valid Bill Date is required";

		// Valid time required
		public static ValidPickupReadyTimeRequired: string = " A Valid Pickup Ready Time is required";

		// Valid time required
		public static ValidPickupCloseTimeRequired: string = " A Valid Pickup Close Time is required";

		// Valid origin required
		public static ValidOriginZIPRequired: string = "A valid Origin ZIP is required";

		// Valid destination required
		public static ValidDestinationZIPRequired: string = "A valid Destination ZIP is required";

		// bill data is required
		public static BillDateIsRequired: string = 'Bill date is required.';

		// pickup date is required
		public static PickupDateIsRequired: string = 'Pickup date is required.';

		// requested pickup date is required
		public static RequestedPickupDateIsRequired: string = 'Requested Pickup date is required.';

		// Not a valid date
		public static NotAValidDate: string = 'Not a valid date';

		// Not a valid To Pick Up Date
		public static ToValidPickUpDateNotLessThenFromDate: string = 'To PickUp Date should be greater than or equal to From PickUp Date and till today date';

		// Delivery date required
		public static DeliveryDateRequired: string = 'Delivery  date is required.'

		// Force attach required
		public static ForceAttachRequired: string = "Force Attach Required PRO# as well as BOL#"

		// Vendor bill amount should not be negative
		public static BillAmountShouldNotbeNegative: string = "Vendor bill amount should not be negative."

		// When hold vendor bill is checked and try to bill send into mas forcefully.
		public static ForcePushToMasValidationMessage: string = "Vendor bill is on hold. Please uncheck hold vendor bill in vendor bill form before force push";

		// Enter Dispute Amount
		public static EnterDisputeAmount: string = "Please enter dispute amount";

		// Dispute date cannot be blank or empty.
		public static EnterDisputeDate: string = "Dispute date cannot be blank or empty";

		// Dispute Notes cannot be blank
		public static EnterDisputeNotes: string = "Dispute Notes cannot be blank."

		// User changed VB status to pending from any other status.
		public static VendorBillStatusChangedToPending: string = "Bill will be converted to Unmatched Vendor Bill and order will no longer be attached.Do you want to continue?";

		// If Negative margin is there and customer not want to save and status is changed
		public static ChangePreviousStatusOnNegativeMargin: string = "The current bill's status has been set to its previous value";

		// Negative margin validation message
		public static NegativeMarginValidation_1: string = "Clearing the bill will cause a reduction in margin of $ ";
		public static NegativeMarginValidation_2: string = "\nTotal Profit will now be $ ";
		public static NegativeMarginValidation_3: string = "\nDo you want to continue?";

		// used to show the message when any changes are detect in the existing bill
		public static ChangesMadeMessage: string = "You have not yet submitted the changes you made to this record. Do you want to move on without saving your changes?";

		// If bol having spaces in between
		public static SubOrderBOL: string = "Sub order BOL# cannot be given for attaching";

		// Message for valid Dispute Amount
		public static ValidDisputeAmountRequired: string = "A valid Dispute Amount is required";

		// Message for valid Dispute Date
		public static ValidDisputeDateRequired: string = "A valid Dispute Date is required";

		// Message for valid Dispute notes
		public static ValidDisputeNotesRequired: string = "A valid Dispute Notes is required";

		// Message for create lost sub bill amount
		public static LostAmountValidation_1: string = "Sub bill with lost amount ";
		public static LostAmountValidation_2: string = " will be created . Do you want to continue?";

		// Message for when there is no dispute lost amount and trying to create lost bill
		public static NoDisputeLostAmountValidation: string = "At least one dispute lost amount should be there for the line items";

		// Message when Sub order and sub bill is created
		public static CreateSubOrderAndSubBillSuccessFullMessage: string = "Sub Bill and Sub Order is successfully created";

		// Saved successfully message
		public static SendSuccessfullyMail: string = "Mail sent successfully";

		// Message when selected carrier is not valid
		public static CarrierValidationMessage: string = "Save Failed: Please select a valid carrier";

		// Invalid cost
		public static InvalidCost: string = "Total Dispute amount of Shipping item cannot be more than Total Cost of Shipping item."

		// Invalid total cost
		public static InvalidTotalCost: string = "Total Dispute amount(Shipping + Discount item) cannot be more than Total Cost(Shipping + Discount item)";

		// Negative line item cost
		public static NegativeLineItemCostValidation: string = "Line item cost cannot be negative";

		// Negative line item dispute amount
		public static NegativeLineItemDisputeCostValidation: string = "Line item Cost cannot be less than Dispute amount";

		// 	DisputeCostValidation
		public static DisputeCostValidation: string = "Total Dispute Lost Amount can not be more than Total Dispute Amount";

		// Purchase order Saved successfully message
		public static POSavedSuccessfullyMessage: string = "Unmatched Vendor Bill saved successfully";

		// Purchase order Force Attached successfully message
		public static POForceAttachedSuccessfullyMessage: string = "Converted to Bill successfully";

		// Purchase order Force Attached saved successfully message
		public static POForceAttachedSavedSuccessfullyMessage: string = "Result saved as UVB Possibility";

		// CanNotChangeStatusToDisputeWonMessage
		public static CanNotChangeStatusToDisputeWonMessage: string = "Suborder has been invoiced,so you cannot change the status to Dispute Won";

		//Please Select Date Time frame
		public static PleaseSelectDateTimeFrame: string = "Please Select Date Time frame .";

		//Records uploaded Message
		public static RecordsUploadedMessage: string = " Records uploaded successfully";

		//Record(s) moved to the GlobalTranz Board
		public static RecordsMovedToTheGlobalTranzBoard: string = "Record(s) moved to the GlobalTranz Board";

		//Error in add/modify rexnord company
		public static ErrorinAddModifyRexnordCompany: string = "Error in add/modify rexnord company";

		//Please Select Mode from the list ...
		public static PleaseSelectModeFromTheList: string = "Please Select Mode from the list .";

		//Only Files with type Image, Pdf and Word document are allowed to be uploaded.
		public static OnlyFilesWithTypeImagePdfAndWordDocumentAreAllowedToBeUploaded: string = "Only Files with type Image, Pdf and Word document are allowed to be uploaded";

		//Error occurred while fetching shipment list.
		public static ErrorOccurredWhileFetchingShipmentList: string = "Error occurred while fetching shipment list";

		// error occured while fetching carrier details
		public static ErrorOccurredWhileFetchingCarrierDetails: string = "Error occurred while fetching Carrier details";

		//Error occurred while fetching dispute board details
		public static ErrorOccurredWhileFetchingDisputeBoardDetails: string = "Error occurred while fetching Dispute Board Details";

		// Error occured while fetching Rexnord Board Details
		public static ErrorOccurredWhileFetchingRexnordList: string = "Error occurred while fetching Rexnord Board Details";

		//error occured while fetching vendor bill exception details
		public static ErrorOccurredWhileFetchingVendorBillException: string = "Error occurred while fetching Vendor Bill Exception Details";

		// error occured while fetching vendor bill tracking list
		public static ErrorOccurredWhileFetchingVendorBillTrackingList: string = "Error occurred while fetching Vendor Bill Tracking Details";

		//Error occurred while fetching Requote list.
		public static ErrorOccurredWhileFetchingRequoteList: string = "Error occurred while fetching Requote Board Details";

		//Error occurred while fetching Invoice Exception list.
		public static ErrorOccurredWhileFetchingInvoiceExceptionList: string = "Error occurred while fetching Invoice Exception Details";

		//Error occurred while fetching Dispute Board Details list.
		public static ErrorOccurredWhileFetchingDisputeBoardList: string = "Error occurred while fetching Dispute Board Details";

		//Error occurred while fetching Dispute Won/Loss Details list.
		public static ErrorOccurredWhileFetchingDisputeWonLossList: string = "Error occurred while fetching Dispute Won/Loss Details";

		//Error occurred while fetching shipment list.
		public static ErrorOccurredWhileFetchingPurchaseOrderList: string = "Error occurred while fetching Unmatched Vendor Bill list";

		//Maximum limit 10 uploads reached.
		public static MaximumLimit10UploadsReached: string = "Maximum limit of 10 uploads reached";

		//Record(s) moved to the Rexnord Board
		public static RecordsMovedToTheRexnordBoard: string = "Record(s) moved to Rexnord Board";

		//There should be at least one line item.
		public static ThereShouldBeAtLeastOneLineItem: string = "There should be at least one line item";

		//Error occurred while fetching Sales Order list.
		public static ErrorOccurredWhileFetchingSalesOrderList: string = "Error occurred while fetching Sales Order list";

		//The maximum number of tabs has been reached. Close an existing tab to view more
		public static MaxTab: string = "The maximum number of tabs have been reached. Close an existing tab to view more...";

		//Please select the customer to get Billto
		public static PleaseSelectTheCustomerToGetBillto: string = "Please select the customer to get Billto";

		//No records to download.
		public static NoRecordsToDownload: string = "No records to download";

		//Report generate data has not been set.
		public static ReportGenerateDataHasNotBeenSet: string = "Data to generate Report has not been set";

		//There are no records present to be downloaded.
		public static ThereAreNoRecordsPresentToBeDownloaded: string = "There are no records present to be downloaded";

		//Report generate url has not been set.
		public static ReportGenerateUrlHasNotBeenSet: string = "URL to generate Report has not been set";

		// Provide UI Grid ID, it is Missing...
		public static ProvideUIGridIDItIsMissing: string = " Provide UI Grid ID, it is Missing.";

		//Please select the customer to get Billto.
		public static PleaseSelecttheCustomerToGetBillTo: string = "Please select the customer to get Bill To";

		//Do you really want to delete this Attached File?
		public static DoYouReallyWantToDeleteThisAttachedFile: string = "Do you really want to delete this Attached File?";

		//Do you really want to remove this Attached File?
		public static DoYouReallyWantToRemoveThisAttachedFile: string = "Do you really want to remove this Attached File?";

		//Do you really want to delete this vendor bill item?
		public static DoYouReallyWantToDeleteThisvendorBillItem: string = "Do you really want to delete this Vendor Bill item?";

		//Do you really want to delete this Purchase Order Item?
		public static DoYouReallyWantToDeleteThisPurchaseOrderItem: string = "Do you really want to delete this Unmatched Vendor Bill Item?";

		//Do you really want to delete this sales Order item?
		public static DoYouReallyWantToDeleteThisSalesOrderItem: string = "Do you really want to delete this Sales Order item?";

		//Upload File Only for Image And PDF
		public static MessageForOnlyImageAndPdfFile: string = "Only Files with type Image and Pdf document are allowed to be uploaded";

		//Upload File Only for Image And PDF
		public static MessageForOnlyCSVAndXLSFile: string = "Only Files with type CSV and EXCEL document are allowed to be uploaded";

		//Upload File Only For Images
		public static MessageForOnlyImagesFile: string = "Only Files with type Image are allowed to be uploaded";

		//Upload File only for PDF and Word Document
		public static MessageForOnlyPDFandWordDocument: string = "Only Files with type pdf and word document are allowed to be uploaded";

		//Do you really want to delete this sales Order item?
		public static AreYouSureWantToRemoveThis: string = "Are you sure want to remove this?";

		//Do you really want to delete this sales Order item?
		public static DeleteThisSalesOrderPodDocList: string = "Deleted Sales Order POD/DOC List Items";

		//Upload SuccessFully
		public static UplodedSuccessFully: string = "Document have uploaded successfully";

		//Are you sure you want to delete this record
		public static AreYouSureYouWantToDeleteThisRecord: string = "Are you sure you want to delete this record";

		//Changing The Shipment To International Will Result In Shipper And Consignee Details Being Reset.  Would you like to continue?
		public static ChaningInternationalShipment: string = "Changing The Shipment To International Will Result In Shipper And Consignee Details Being Reset.  Would you like to continue?";

		// Valid from date required
		public static ValidFromDateRequired: string = " A valid From Date is required";

		// Valid to date required
		public static ValidToDateRequired: string = " A valid To Date is required";

		// Cost required
		public static CostRequired: string = "Cost is required";

		// Revenue required
		public static RevenueRequired: string = "Revenue is required";

		// Description Required
		public static DescriptionRequired: string = "Description is required";

		// packingGroup
		public static PackingGroupRequired: string = "PackingGroupNo is required";

		// hazmatClass
		public static HazmatClassRequired: string = "HazmatClass is required";

		// hazardousClass value should be between 0 and 9
		public static HazmatClassMinMax: string = "HazmatClass value should be between 0 and 9";

		// hazmatUnNumber
		public static HazmatUnNumberRequired: string = "HazmatUNNo is required";

		// Choose Item Type
		public static ChooseItemType: string = "Please Choose Item Type";

		// Choose Class Type
		public static ChooseClass: string = "Please Choose Class";

		// Choose Class Type
		public static ChoosePackageType: string = "Please Choose Package Type";

		// Choose Class Type
		public static weight: string = "Please Choose Weight";

		// Choose Class Type
		public static pieceCount: string = "Please Choose Piece Count";

		// Choose Class Type
		public static palletCount: string = "Please Choose Pallet Count";

		// EnterCompanyName
		public static EnterCompanyName: string = "Enter Company Name";

		//Record Updated Successfully
		public static RecordUpdatedSuccessfully: string = "Record Updated Successfully";

		//Record Saved Successfully
		public static RecordSavedSuccessfully: string = "Record Saved Successfully";

		// Minimum Characters Required.
		public static MinimumCharactersRequired: string = "Minimum 3 characters required";

		//Error occurred while fetching Bills list.
		public static ErrorOccurredWhileFetchingBillsList: string = "Error occurred while fetching Bills list";

		//Error occurred while fetching Invoice list.
		public static ErrorOccurredWhileFetchingInvoiceList: string = "Error occurred while fetching Invoice list";

		//Error occurred while fetching TruckLoadQuote# list.
		public static ErrorOccurredWhileFetchingTruckLoadQuoteList: string = "Error occurred while fetching TruckLoadQuote list";

		//For checking this message from server
		public static VendorBillSavedButMatchingProcessNotWorking: string = "Vendor Bill saved successfully but matching process is not working. Please try after some time";
		//Pro Exists
		public static PROExists: string = "PRONo entered in the PO is already used by other Sales order,Order cannot be created.Please change the PRONO and try again";

		// To select the customer
		public static SelectCustomer: string = "Please Select the Customer";

		// Created Sales Order successfully message
		public static CreatedSalesOrderSuccessfullyMessage: string = "Created Sales Order successfully";

		// Created Sales Order successfully message
		public static MailSentSuccessfullyMessage: string = "Mail sent successfully";

		// Error Message For Saving the user theme
		public static ErrorWhileSavingUserTheme: string = "Some error occurred while saving the theme.Please try again";

		//Theme Save Successfully
		public static SavingUserThemeSuccessfully: string = "The information has been updated successfully";

		// To show message before copy the shipment for requested pickup date
		public static ShowRequestedPickupDateMessage: string = "Are you sure you want to make a copy of this Order? The Requested Pickup date will be today. To modify the Requested Pickup date, please update after creating the order";

		//Validation Message For Manually Finalization
		public static ManuallyFinalizedValidation: string = "For Finalization, PRO# and Pick up date should not be empty";

		//Do you want to cancel the sales order
		public static ConfirmCancelSalesOrder: string = "Do you want to cancel the Sales Order?";

		//Cancel Sales Order successfully
		public static CancelSalesOrderSuccessfully: string = "Sales Order has been Cancelled successfully";

		//##START: US20208
		//Sales Order canceled successfully; but the insurance cancellation failed.
		public static CancelSalesOrderSuccessfullyInsuranceCancelFailed: string = "Sales Order canceled successfully; but the insurance cancellation failed.";

		//Sales Order cancellation failed.
		public static CancelSalesOrderFailed: string = "Sales Order cancellation failed.";
		//##END: US20208

		//Do you want to Uncancel the sales order
		public static ConfirmUnCancelSalesOrder: string = "Do you want to Un-Cancel the Sales Order?";

		//Cancel Sales Order successfully
		public static UnCancelSalesOrderSuccessfully: string = "Sales Order has been Un-Cancelled successfully";

		//Cancel Sales Order successfully
		public static SaveSalesOrderNotesSuccessfully: string = "Notes Saved Successfully";

		public static SaveVendorBillNotesSuccessfully: string = "Notes Saved Successfully";

		//Force Invoice Reason
		public static ForceInvoiceReason: string = "Please enter Force Invoice Reason";

		// Shipment Force Invoiced
		public static ShipmentForceInvoiced: string = "Shipment force invoiced";

		//Sales Order Updated
		public static SalesOrderUpdateSuccessful: string = "Sales Order has been Updated successfully";

		//Sales Order Finalixed
		public static SalesOrderFinalizedSuccessful: string = "Sales Order has been Finalized successfully";

		// Please select an item.
		public static PleaseSelectanItem: string = "Please select an item";

		// Please select an PleaseSelectCRRReviewDate.
		public static PleaseSelectCRRReviewDate: string = "CRR Review Date cannot be blank";

		// Rebill saved successfully.
		public static RebillSavedSuccessfully: string = "Rebill saved successfully";

		//Sales Order Saved
		public static SalesOrderSavedSuccessful: string = "Sales Order saved successfully";

		//Sales Order Saved
		public static RecordInsertedSuccessfully: string = "Record inserted successfully";

		//Auto Dispatch Status Message
		public static AutoDispatchMessage: string = "Click Dispatch EDI link to make Auto Dispatch";

		public static SalesOrderNotesValidationMessage = "You have not yet submitted sales order notes. Do you wish to continue without saving the sales order notes?";

		// Valid Credit Charge
		public static ValidCCharge: string = "Invalid credit card charge. Please enter a valid credit card charge";

		// Valid Credit Charge
		public static ValidECharge: string = "Invalid E-Check charge. Please enter a valid E-Check charge";

		//Delete Payment Configuration Details Message
		public static DeletePaymentDetailsMessage: string = "Are you sure you want to remove record from database?";

		// Rebill saved successfully.
		public static AgentDisputeSavedSuccessfully: string = "Agent disputes saved successfully";

		//Error occurred while fetching shipment list.
		public static ErrorOccurredWhileFetchingVBExceptionList: string = "Error occurred while fetching Vendor Bill Exception Details";

		//Error occurred while fetching Finalized Orders With No Vendor Bills.
		public static ErrorOccurredWhileFetchingFinalizedOrders: string = "Error occurred while fetching Finalized Order With No Vendor Bills";

		// To Date should be greater than or equal to From Date
		public static ToValidToDateNotLessThenFromDate: string = 'To Date should be greater than or equal to From Date and till today date';

		//Error occurred while fetching Finalized Orders With No Vendor Bills.
		public static ErrorOccurredWhileFetchingFinalizedNotInvoicedOrders: string = "Error occurred while fetching Sales Orders Finalized Not Invoiced";

		//Error occurred while fetching Rexnord Invoicing Reports.
		public static ErrorOccurredWhileFetchingRexnordInvoicingReport: string = "Error occurred while fetching Rexnord Invoicing Report";

		//You are creating a Sales Order with cost but no revenue, the Sales Order will be marked as invoiced but it will NOT invoice the customer.
		public static RevenueIsZeroAndCostIsGreaterThenZero: string = "You are creating a Sales Order with cost but no revenue, the Sales Order will be marked as invoiced but it will NOT be invoiced to customer";

		//You are creating a Sales Order with no cost and no revenue, the Sales Order will be Canceled it will NOT invoice the customer.
		public static RevenueIsZeroAndCostIsZero: string = "You are creating a Sales Order with no cost and no revenue, the Sales Order will be Canceled it will NOT be invoiced to customer."

		////##START: DE20749
		//You are creating a Sales Order with cost but no BS Cost, the Sales Order will be marked as invoiced but it will NOT invoice the customer.
		public static BSCostIsZeroAndCostIsGreaterThanZero: string = "You are creating a Sales Order with cost but no BS Cost, the Sales Order will be marked as invoiced but it will NOT be invoiced to customer";
		////##END: DE20749

		//Please enter force invoice reason
		public static selectForceInvoiceReason: string = "Please enter force invoice reason";

		//FAKCannotBeLessThanThreeCharacters
		public static FAKCannotBeLessThanThreeCharacters: string = "FAK Description cannot be less than 3 character";

		//FAKDescriptionRequired
		public static FAKDescriptionRequired: string = "FAK Description is required";

		//FAKDescriptionRequired
		public static FAKItemRequired: string = "Item is required";

		//FAK Mapping Saved Successfully.
		public static FAKSavedSuccessFully: string = "FAK mapping saved successfully";

		//Error occurred while fetching purchase Order list.
		public static ErrorOccurredWhileFetchingPOList: string = "Error occurred while fetching Unmatched Vendor Bill list";

		public static InvoiceStatusRevertBackToPending = "Invoice status reverted to pending";

		//Error occurred while fetching EDI 210 Details.
		public static ErrorOccurredWhileFetchingEDI210CarrierException: string = "Error occurred while fetching EDI 210 Carrier Exception Details";

		//Error occurred while fetching Rebill Summary Report
		public static ErrorOccurredWhileFetchingRebillSummaryReport: string = "Error occurred while fetching Rebill Summary Data";
		//Error occurred while fetching Disputed Vendor Bills.
		public static ErrorOccurredWhileFetchingDisputedVendorBills: string = "Error occurred while fetching Disputed Vendor Bills";

		//Error occurred while fetching Re Bill Reasons Report Data.
		public static ErrorOccurredWhileFetchingReBillReasonsReport: string = "Error occurred while fetching Re Bill Reasons";

		//Error occurred while fetching weekly dashboard details.
		public static ErrorOccurredWhileFetchingWeeklyDashboardReport: string = "Error occurred while fetching Weekly Dashboard details";

		//Error occurred while fetching Lost cost details.
		public static ErrorOccurredWhileFetchingLowestCostReport: string = "Error occurred while fetching lowest cost carrier details";

		//Error occurred while fetching Post Audit Report
		public static ErrorOccurredWhileFetchingRexnordPostAuditReport: string = "Error occurred while fetching Post Audit Data";

		//Error occurred while Order Will Not Be Finalized
		public static OrderWillNotBeFinalized: string = "The current order will not be finalized with a reduction in margin";

		//Error occurred while PRO# should not be empty
		public static ProShouldNotBeEmpty: string = "PRO# should not be empty";

		// ###START: US19330
		//Message while exception is resolved
		public static applicationResolved: string = "Record has been updated in EDI Tables";
		// ###END: US19330

		// ###START: US19330
		//Message while exception is not resolved
		public static applicationNoResolved: string = "Entered BOL is Canceled/Invalid. System cannot reprocess it";
		/// ###END: US19330

		//Message EDI successFully changed to inactive
		public static ChangeEDIToInactive: string = "EDI marked as inactive";

		//Message EDI does not successFully changed to inactive
		public static ChangeEDIToInactiveErrorMessage: string = "EDI is not marked as inactive";

		//Message EDI does not successFully changed to inactive
		public static UpdatedEDIForPro: string = "Changes Saved for ProNumber ";

		//Message Total revenue cannot be less than total cost.
		public static TotalRevenueCannotbelessthantotalcost: string = "Total revenue cannot be less than total cost";

		//Message Total BS cost cannot be less than total cost.
		public static TotalBScostcannotbelessthantotalcost: string = "Total BS cost cannot be less than total cost";

		//Message Total PLC cost cannot be less than total cost.
		public static TotalPLCcostcannotbelessthantotalcost: string = "Total PLC cost cannot be less than total cost";

		//Message for confirum vendor Name.
		public static confirmVendorName: string = "Did you confirm the vendor Name?";

		//Message for Bill has sent for Process after create sub bill in EDI210.
		public static billhasSentForProcess: string = "Bill has been sent to Process";

		//Message for Valid Tolerance Amount.
		public static ValidToleranceAmountIsRequired: string = "A valid Tolerance Amount is required";

		//Message for No Original bill found in EDI.
		public static NoOriginalBillFound: string = "No original bill found, so this bill has been sent to process";

		// Message to handle to show a message when dispute amount is negative.
		public static DisputeAmountShouldNotBeNegative: string = "Total dispute amount cannot be negative or zero value";

		// Message to notify the user to convey that association was removed between the SO and PO
		public static VendorBillIsNowPO: string = "VendorBill is no longer associated with a Sales Order. VendorBill is now an Unmatched Vendor Bill";

		// Vendor Bill Updated successfully message
		public static UpdatedSuccessfullyMessage: string = "VendorBill updated successfully.  ";

		//Validation Message Rexnord Manager, If tries to force attach with Non-Rexnord Bol
		public static ValidationForNonRexnordBol: string = "Permission denied. Entered BOL Number either Cancelled/Invalid";

		//Validation Message ForeignBolAddressSuccess
		public static ForeignBolAddressSuccess: string = "Address saved successfully";

		//Validation Message ForeignBolACustomerSettings
		public static ForeignBolCustomerSettingsSuccess: string = "Customer settings saved successfully";

		//Do you really want to delete this Foreign Bol Customer?
		public static AreYouSureWantToRemoveForeignBolCustomer: string = "Choose the action which need to be performed to Disassociate Customer and <br\> ";

		//sucessfull UnMapped
		public static sucessfullUnMapped: string = "Successfully Unmapped customer";

		//sucessfull UnMapped Associated Address and Deleted Customer
		public static sucessfullUnMappedAndDeletedCustomer: string = "Successfully Unmapped customer and Deleted address";

		//Dissociate UVB as Foreign BOL Customer
		public static DissociatePoAsFBOL: string = "Do you want to dissociate the UVB as FBOL?";

		//Associated UVB as FBOL Customer
		public static AssociatedWithFBOL: string = "Do you want to change the customer associated with the FBOL? ";

		//Dissociated Customer After customer selection change
		public static DissociatedPOAsFBOLOnCustomerChanged: string = "Please choose an action that the system needs to perform <br\> <b> Dissociate Customer &: </b>";

		// AreYouSureWantToDisassociateForeignBolCustomer
		public static AreYouSureWantToDisassociateForeignBolCustomer = "Performing the action will delete the Foreign BOL Customer and will unmap all the associated addresses. Do you want to continue?";

		//Disput Lost item shoud be greater then zero.
		public static DisputLostItemShoudBeGreaterThenZero: string = "Disput Lost Amount shoud be greater then zero";

		//ChangeCostAndRevenue
		public static ChangeCostAndRevenue: string = "Changing the value might change Cost & Revenue. Do you want to proceed. ";

		//RevertChanges
		public static RevertChanges: string = "Changes have been reverted to previous values";

		//Changing The Shipment To International Will Result In Shipper And Consignee Details Being Reset.  Would you like to continue?
		public static ChangingBillToInternationalShipment: string = "Changing The Shipment To International Will Result In Bill To Details Being Reset.  Would you like to continue?";

		//##START: US20264
		//Message to be shown after uploading a Valid CSV file
		public static SuccessMessageForSalesOrderUploadPopup: string = "{0} record(s) uploaded successfully and {1} record(s) have error. Please correct the same on UI and reprocess those again";

		//Records uploaded Message for sales order
		public static SuccessMessageForSOUploadToastr: string = " records were uploaded successfully";

		public static ParameterNotFoundForDisputeWithCarrierLink: string = " value not found. Please update the same and try clicking the hyperlink again";
		//##END: US20264

		// ##START: US20961
		//message when a dispute status is changed for VB that has moved to mas already
		public static DisputeStatusSavedSuccessfully: string = "Vendor Bill State was saved successfully";
		// ##ENd: US20961

		// ###START: US20884
		// LostBill Validation
		public static LostBillCostValidation: string = "Total Lost bill cost cannot be more than Revenue of the order.";
		// ###END: US20884
	}
	//#endregion UI Constants
}