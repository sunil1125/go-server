/// <reference path="VendorBillModels.d.ts" />
/// <reference path="CommonModels.d.ts" />

/*
** <summary>
** Sales Order interfaces
** </summary>
** <createDetails>
** <id></id> <by>Chandan</by> <date>28-08-2015</date>
** </createDetails>
** <changeHistory>
** <id>US19763</id> <by>Shreesha Adiga</by> <date>23-12-2015</date> <description>Added interfaces for csv upload in sales order</description>
** <id>US20264</id> <by>Shreesha Adiga</by> <date>11-01-2016</date> <description>Added some properties to ISalesOrderUploadResponse</description>
** <id>US20288</id> <by>Shreesha Adiga</by> <date>14-01-2016</date> <description>Added credit memo interfaces</description>
** <id>US20647</id> <by>Chandan Singh Bajetha</by> <date>17-02-2016</date> <description>Acct: Implement Search on all Reports.</description>
** <id>US21147</id> <by>Shreesha Adiga</by> <date>15-03-2016</date> <description>Added LateDisputedAmount to IDisputeVendorBill</description>
** </changeHistory>
*/

interface ISalesOrderItem {
	Id: number;
	BOLNumber?: string;
	SalesOrderId: number;
	SelectedClassType: number;
	OriginalWeight: number;
	Weight: number;
	EstimatedCost: number;
	Cost: number;
	BsCost: number;
	Revenue: number;
	Hazardous: boolean;
	Length: number;
	Width: number;
	Height: number;
	PieceCount: number;
	OriginalPalletCount: number;
	NewPalletCount: number;
	PackageTypeName: string;
	NMFCNumber: string;
	UserDescription: string;
	ItemId: number;
	ItemName: string;
	AccessorialId: number;
	SelectedItemTypes: IShipmentItemType;
	PackageTypes: IEnumValue;
	ClassTypes: IEnumValue;
	IsMarkForDeletion: boolean;
	IsShippingItem: boolean;
	Items: number;
	Pieces: number;
	DisputeAmount: number;
	NMFC: string;
	Class: number;
	PalletCount: number;
	HazardousUNNo: string;
	SelectedPackageType: IEnumValue;
	PackingGroupNo: string;
	PLCCost: number;
	ProductCode; string;
	PackageTypeId: number;
	PoNumber: string;
	HazmatClass: number;
	isChecked: boolean;
	isUpdated: boolean;
	OriginalRevenue: number;
	OriginalLineItemRevenue: number;
	OriginalLineItemPLCCost: number;
	IsCalculateRevenue: boolean;
}

interface IDisputeVendorBill {
	VendorBillId: number;
	ProNumber: string;
	DisputedDate: Date;
	DisputeNotes: string;
	UpdatedBy: number;
	UpdatedDate: number;
	DisputedAmount: number;
	//##START: US21147
	LateDisputedAmount: number;
	//##END: US21147
	BillStatus: number;
	MasClearanceStatus: number;
	HoldVendorBill: boolean;
	QuickPay: boolean;
	MasTransferDate: Date;
	ListOfBillStatuses: Array<IEnumValue>;
	ReasonCodes: Array<ISalesOrderShipmentRequoteReason>
	OriginalBillStatus: number;
	DisputeStatusId: number;
	// ###START: US20687
	CarrierCode: string;
	CarrierName: string;
	// ###END: US20687
}

interface IAgentDispute {
	Id: number;
	ShipmentId: number;
	DisputeAmount: number;
	DisputeDate: Date;
	DisputeNotes: string;
	DisputeReason: number;
	UpdatedBy: number;
	CreatedDate: Date;
	UpdatedDate: number;
	DisputedBy: number;
	BillStatus: number;
	VendorBillId: number;
	DisputedRepName: string;
}

interface IShipmentAddress {
	Id: number;
	ShipmentId: number;
	CompanyName: string;
	Street: string;
	Street2: string;
	ThirdPartyAddressId: number;
	City: string;
	State: string;
	Country: string;
	CountryCode: number;
	ZipCode: string;
	Phone: string;
	Ext: string;
	Fax: string;
	Email: string;
	AddressType: IEnumValue;
	ContactPerson: string;
	AddressCode: string;
	Latitude: number;
	Longitude: number;
	DeliveryReadyTime: string;
	DeliveryCloseTime: string;
	DefaultTime: boolean;
	PickupRemarks: string;
	DeliveryRemarks: string;
}

interface ISalesOrderAddress {
	Id: number;
	SalesOrderId: number;
	CompanyName: string;
	CompanyName1: string;
	Street: string;
	Street2: string;
	ThirdPartyAddressId: number;
	City: string;
	State: string;
	ZipCode: string;
	CountryName: string;
	Country: number;
	ContactPerson: string;
	Phone: string;
	Fax: string;
	Ext: string;
	AddressType: number;
	AddressCode: string;
}

interface ISalesOrderNotes {
	Id: number;
	EntityId: number;
	Description: string;
	NotesBy: string;
	NotesDate: Date;
	EntityType: number;
	NotesType: number;
	NoteTypeName: string;
	NotesDateShort: string;
}

interface ISalesOrderContainer {
	SalesOrderDetail: ISalesOrderDetail;
	SalesOrderAddressDetails: Array<ISalesOrderAddress>;
	SalesOrderItemDetails: Array<ISalesOrderItem>;
	SalesOrderNoteDetails: Array<ISalesOrderNotes>;
	SalesOrderFinancialDetailsBySalesOrderId: ISalesOrderFinancialDetails;
	SalesOrderShipmentProfitSummarys: ISalesOrderShipmentProfitSummary;
	SalesOrderOriginalSODetails: ISalesOrderOriginalSODetails;
	MultilegCarrierHubAddress: ISalesOrderTerminalAddress;
	MultilegCarrierDetails: ISalesOrderMultilegCarrierDetail;
	SalesOrderReQuoteReviewDetails: ISalesOrderRequoteReviewDetail;
	SalesOrderReQuoteReasons: Array<ISalesOrderShipmentRequoteReason>;
	SalesOrderNegativeMargins: ISalesOrderNegativeMargin;
	SuborderCount: number;
	MakeSubOrder: boolean;
	IsCanceledOrder: boolean;
	IsAOrder: boolean;
	CustomersBSPlcInfo: ICustomersBSPlcInfo;
	IsSuborder: boolean;
	CanEnterZeroRevenue: boolean;
	PreviousValues: any;
	FinalProfitForScheduleInvoice: number;
	GrossProfitForScheduleInvoice: number;
	AllowNeagtiveMargin: boolean;
	CostDifferenceForScheduleInvoice: number;
	EstimatedRevenue: number;
}

interface ISalesOrderDetail {
	Id: number;
	CustomerId: number;
	BookedDate: Date;
	SalesOrderNo: number;
	PoNo: string;
	BolNumber: string;
	MainBolNo: string;
	ProNo: string;
	CustomerBolNo: string;
	BolID: number;
	SalesRepId: number;
	ReferenceNo: string;
	OriginZip: string;
	DestinationZip: string;
	TotalPieces: number;
	TotalWeight: number;
	Url: string;
	CarrierId: number;
	OrderStatusId: number;
	RequestedPickupDate: Date;
	PickupDate: Date;
	InvoiceDate: Date;
	TransitDays: string;
	ShipmentBy: string;
	OriginTerminalPhone: string;
	DestinationTerminalPhone: string;
	ServiceType: number;
	EmergencyContactNo: string;
	EmergencyContactExtension: string;
	PickupRemarks: string;
	DeliveryRemarks: string;
	Cost: number;
	Revenue: number;
	CustomerName: string;
	SalesRepName: string;
	CarrierName: string;
	InvoiceStatus: number;
	UpdatedDateTime: number
    EstimatedDueDate: Date;
	VendorBillId: number;
	ActualCost: number;
	ActualProfit: number;
	ActualProfitPer: number;
	TotalCost: number;
	TotalRevenue: number;
	TotalPLCCost: number;
	ProcessStatusId: number;
	DeliveryDate: Date;
	InsuredAmount: number;
	AllowEDI204Dispatch: boolean;
	InsuranceNumber: number;
	IsEDISupport: boolean;
	GTMargin: number;
	PLCMargin: number;
	PLCVendorBillId: number;
	PlcCost: number;
	IsPROAllowed: boolean;
	CarrierPickupNumber: string;
	BillToLocationType: number;
	InternalBOL: string;
	NewShipmentType: number;
	ProcessFlowFlag: number;
	TariffType: string;
	OrderStatusList: Array<IEnumValue>;
	SelectedShipVia: number;
	ReadyTime: string;
	CloseTime: string;
	ReadyTimeString: string;
	CloseTimeString: string;
	AgencyName: string;
	PartnerCompanyId: number;
	IsBillingStation: boolean;
	ProcessFlow: number;
	Distance: number;
	CarrierType: number;
	IsSaveEnable: boolean;
	OriginalRevenue: number;
	CanEditCustomer: boolean;
	CanEditCarrier: boolean;
	CanEditBSCOST: boolean;
	CanEditItemsDescription: boolean;
	CarrierCode: string;
	OriginalPLCCost: number;
	ContactName: string;
	CalendarDays: string;
	LTLCalendarDays: string;
	OceanCalendarDays: string;
	IsCalendarDaysNull: boolean;
	// ###START: DE21747
	ShipmentCarrierType: number;

	// ###END: DE21747
}

interface ISalesOrderUploadFileModel {
	ShipmentId: number;
	Description: string;
	DocumentType: string;
	OwnerType: string;
	UploadedFilePath: string;
	UploadedFileDetails: any;
	CarrierId: number;
	ProNumber: string;
	UpdatedBy: number;
	BolNumber: string;
	Id: number;
	DocType: number;
	OwnType: number;
	VendorBillId: number;
	CarrierName: string;
	OriginZip: string;
	ServiceType: number;
}

interface ISalesOrderDocuments {
	Id: number;
	Description: string;
	UploadedBy: string;
	CreatedDateDisplay: string;
	DocOwnerDisplay: string;
	FileTypeDisplay: string;
	UploadedFilePath: string;
	DocOwner: number;
	FileType: number;
	UploadedPOFilePath: string;
	CanDeleteDoc: boolean;
}

interface ISalesOrderException {
	RowNumber: number;
	SalesOrderlId: number;
	BOLNumber: string;
	PRONumber: string;
	CarrierName: string;
	CustomerName: string;
	SalesAgent: string;
	BookedDate: Date;
	PickupDate: Date;
	FinalizeDate: Date;
	AdjustmentDate: Date;
	CRRReviewDate: Date;
	Mode: string;
	Cost: number;
	Revenue: number;
	VBAmount: number;
	SOStatus: string;
	InvoiceStatus: string;
	VBStatus: string;
	ExceptionReason: string;
	ScheduledAge: number;
}

interface ISalesOrderExceptionResponse {
	SalesOrderException: Array<ISalesOrderException>;
	TotalRows: number;
}

interface ISearchCompanyName {
	ID: number;
	CompanyId: number;
	CompanyName: string;
	CustAddressID: number;
	CustomerId: number;
	AddressType: number;
	ContactName: string;
	City: string;
	Street: string;
	StateCode: string;
	ZipCode: string;
	EmailId: string;
	PhoneNo: string;
	Fax: string;
	Country: number;
	AddressNumber: string;
	UserID: number;
	UserName: string;
	IsNationalAccount: number;
	IsPROAllowed: number;
	IsVolumeCustomer: number;
	AgencyName: string;
	display: string;
	count: number;
}

interface ISearchOceanCarrier {
	CarrierId: number;
	CarrierName: string;
	CarrierCode: string;
	CarrierType: string;
	display: string;
	TransitDays: string;
	PRONumber: string;
}

interface ISalesOrderClaimDetail {
	Id: number;
	CustomerId: number;
	CustomerName: string;
	BOLNumber: string;
	PRONumber: string;
	CarrierName: string;
	ConsigneeName: string;
	ClaimNumber: string;
	AmountFiled: number;
	DateFiled: Date;
	ClaimDate: Date;
	Status: string;
	UpdatedDate: number;
	SettledAmount: number;
	UpdatedBy: number;
	ShipperName: string;
	CompanyName: string;
}

interface ISalesOderClaimDocument {
	ID: number;
	ClaimId: number;
	DocumentPath: string;
}

interface ISaleOrderClaimContainer {
	SalesOrderClaimDetail: ISalesOrderClaimDetail;
	SalesOrderClaimDocument: Array<ISalesOderClaimDocument>;
	SalesOrderClaimNotes: Array<ISalesOrderNotes>;
	SalesOrderClaimNoteDetails: Array<ISalesOrderNotes>;
}

interface ISalesOrderMultilegDetails {
	OceanCarrierDetails: ISearchOceanCarrier;
	TerminalAddress: IShipmentAddress;
}

interface ISalesOrderTerminalAddress {
	Id: number;
	CarrierId: number;
	CompanyName: string;
	Street1: string;
	Street2: string;
	ContactName: string;
	Email: string;
	Phone: string;
	FreePhone: string;
	Fax: string;
	City: string;
	State: string;
	Zip: string;
	Country: number;
	AddressType: string;
	QuoteType: string;
	Term: string;
	OriginServiceType: string;
	DestinationServiceType: string;
}

interface ISalesOrderMultilegCarrierDetail {
	Id: number;
	CarrierId: number;
	ShipmentId: number;
	CarrierName: string;
	CarrierCode: string;
	CarrierType: string;
	CarrierTypeId: number;
	TransitDays: string;
	PRONumber: string;
	ServiceType: number;
	CalendarDays: string;
}
interface ISalesOrderShipmentProfitSummary {
	MainBillBillStatus: number;
	EstimatedCost: number;
	EstimatedRevenue: number;
	EstimatedProfit: number;
	EstimatedProfitPer: number;
	MainBillDisputeCost: number;
	GrossCost: number;
	GrossRevenue: number;
	GrossDisputeCost: number;
	GrossProfit: number;
	GrossProfitPer: number;
	DisputeDate: Date;
	IsBillsInDispute: boolean;
	VendorBill: number;
	MainBillCost: number;
	GrossBSCost: number;
	EstimatedBSCost: number;
}

interface ISalesOrderOriginalSODetails {
	EstimatedCost: number;
	EstimatedBSCost: number;
	EstimatedRevenue: number;
	RowCount: number;
	GrossDispute: number;
	MainBillCost: number;
}

interface ISendAgentNotificationMailDetail {
	ScenarioId: number;
	SalesRepId: number;
	Subject: string;
	DetailsToBeMailed: string;
	PartnerCompanyId: number;
	IsTQLCustomer: boolean;
	CustomerId: number;
}

interface ICustomersBSPlcInfo {
	GTMargin: number;
	GetCustomerType: number;
	PlcMargin: number;
	GTMarginMin: number;
	FeeStructure: number;
}

interface ISalesOrderRebill {
	Id: number;
	Items: string;
	Desc: string;
	Cost: number;
	Rev: number;
	Class: number;
	Weigth: number;
	PCS: number;
	HazmatClass: number;
}

interface IRequoteReasonCodes {
	ReQuoteReasonID: number;
	ShortDescription: string;
	FullDescription: string;
	ItemId: number;
	IsEnable: boolean;
}

interface ISalesOrderInvoiceExceptionDetails {
	BatchId: number;
	ExceptionMessage: string;
	InvoicedReason: string;
	ScheduledAge: number;
	UpdatedBy: string;
	ShipmentId: number;
}

interface ISalesOrderInvoiceExceptionParameter {
	BatchId: number;
	ShipmentId: number;
	BolNumber: string;
	UpdateDateTime: number;
	UserId: number;
	UserName: string;
	InvoicedReason: string;
}

interface ISalesOrderRequoteReviewDetail {
	ID: number;
	CRReviewDate: Date;
	TotalCostAdjustment: number;
	TotalRevenueAdjustment: number;
	AdjustmentDate: Date;
	ReviewedBy: string;
	Reviewed: number;
	IsManualReviewed: boolean;
	IsBillAudited: boolean;
	CRReviewDateDisplay: string;
	AdjustmentDateDisplay: string;
	SalesOrderId: number;
}

interface ISalesOrderShipmentRequoteReason {
	ID: number;
	Remarks: string;
	RequoteReasonID: number;
}

interface ISalesOrderREBillContainer {
	SalesOrderDetails: ISalesOrderDetail;
	AdjustedItemDetail: Array<ISalesOrderItem>;
	OriginalItemDetail: Array<ISalesOrderItem>;
	SalesOrderShipmentRequoteReasons: Array<ISalesOrderShipmentRequoteReason>;
	SalesOrderRequoteReviewDetails: ISalesOrderRequoteReviewDetail;
	SalesOrderRequoteReasonCodes: Array<IRequoteReasonCodes>;
	OldClass: string;
	NewClass: string;
}

interface IVendorBillDisputeContainer {
	DisputeStatusId: IEnumValue; // Dispute Status ID
	ShipmentId: number;
	DisputeVendorBill: Array<IDisputeVendorBill>;
	VendorBillItemDetails: Array<IVendorBillItem>;
	VendorBillNote: Array<IVendorBillNote>;
	ReasonCodes: Array<ISalesOrderShipmentRequoteReason>;
	CanSaveReasonCodes: boolean;
}

interface ISalesOrderNegativeMargin {
	Id: number;
	GTAbsorbingPer: number;
	RepAbsorbingPer: number;
	NegativeMargin: number;
}

interface ISalesOrderAuditedBillContainer {
	VendorBill: IVendorBill;
	VendorBillItemsDetail: Array<IVendorBillItem>;
}

interface ISalesOrderAuditSettingCarrierDetails {
	CarrierId: number;
	IsFAKMapping: boolean;
}

interface ISalesOrderAuditSettingItems {
	Id: number;
	ItemId: number;
	MatchingToken: string;
	UserName: string;
}

interface ISalesOrderAuditSettingContainer {
	SalesOrderAuditSettingCarrierDetails: ISalesOrderAuditSettingCarrierDetails;
	SalesOrderAuditSettingItems: Array<ISalesOrderAuditSettingItems>;
}

interface ICustomerTypeAndMasterCustomerId {
	TermType: number;
	TermDescription: string;
	MasterCustomerId: number;
}

interface ISalesOrderNotesContainer {
	SalesOrderNoteDetails: Array<ISalesOrderNotes>;
	Id: number;
}

interface IRebillReasonCode {
	ShipmentId: number;
	ReasonCode: string;
	RequoteReasonID: number;
}

interface ISalesOrderFinancialDetails {
	SalesOrderId: number;
	CostDifference: number;
	EstimatedRevenue: number;
	EstimatedCost: number;
	EstimatedBSCost: number;
	FinalRevenue: number;
	OriginalFinalRevenue: number;
	OriginalFinalBSCost: number;
	VBFinalCost: number;
	SOFinalCost: number;
	FinalBSCost: number;
	VendorBillCost: number;
	DisputedAmount: number;
	EstimatedProfit: number;
	EstimatedProfitPercent: number;
	FinalProfit: number;
	FinalProfitPercent: number;
	ActualCost: number;
	ActualProfit: number;
	ActualProfitPercent: number;
	Revenue: number;
	TotalCost: number;
	OriginalPLCCost: number;
	TotalPLCCost: number;
	GrossProfit: number;
}

interface IMASCustomerFields {
	CustomerId: number;
	CustomerName: string;
}

interface ISalesOrderFinalizeDetails {
	ProcessStatusId: number;
	ShipmentId: number;
	TimeSpan: number;
}

//##START: US19763
interface ISalesOrderUploadResponse {
	InvalidData: Array<ISalesOrderUploadItem>;
	SavedCount: number;
	//##START: US20264
	BatchId: number;
	RunId: number;
	ErrorMessages: Array<string>;
	//##END: US20264
}

interface ISalesOrderUploadItem {
	Status: string;
	CompanyName: string;
	Notes: string;
	Created: string;
	Client: string;
	GLCheck: string;
	CodeMatch: string;
	CarrierType: string;
	GLCode: string;
	BOL: string;
	Reference: string;
	Direction: string;
	ItemCode: string;
	SuggestedProdCode: string;
	InvItemID: string;
	Item: string;
	PONumber: string;
	MONumber: string;
	InvoiceId: string;
	RexBOL: string;
	PRONumber: string;
	Carrier: string;
	RefNumber: string;
	BillToCode: string;
	CRInventoryAddBillItemId: string;
	BillToComp: string;
	BillToAddress: string;
	BillToCity: string;
	BillToState: string;
	BillToZip: string;
	ShipperCode: string;
	ShipperId: string;
	ShipperName: string;
	ShipperAddress: string;
	ShipperCity: string;
	ShipperState: string;
	ShipperZip: string;
	ConsigneeCode: string;
	CRAddConsigneeId: string;
	ConsigneeName: string;
	ConsigneeAddress: string;
	ConsigneeCity: string;
	ConsigneeState: string;
	ConsigneeZip: string;
	Invoice: string;
	CreatedDate: string;
	UniqueId: string;
	InvalidColumnNames: Array<string>;

	IsStatusInvalid: boolean;
	IsCompanyNameInvalid: boolean;
	IsNotesInvalid: boolean;
	IsCreatedInvalid: boolean;
	IsClientInvalid: boolean;
	IsGLCheckInvalid: boolean;
	IsCodeMatchInvalid: boolean;
	IsCarrierTypeInvalid: boolean;
	IsGLCodeInvalid: boolean;
	IsBOLInvalid: boolean;
	IsReferenceInvalid: boolean;
	IsDirectionInvalid: boolean;
	IsItemCodeInvalid: boolean;
	IsSuggestedProdCodeInvalid: boolean;
	IsInvItemIDInvalid: boolean;
	IsItemInvalid: boolean;
	IsPONumberInvalid: boolean;
	IsMONumberInvalid: boolean;
	IsInvoiceIdInvalid: boolean;
	IsRexBOLInvalid: boolean;
	IsPRONumberInvalid: boolean;
	IsCarrierInvalid: boolean;
	IsRefNumberInvalid: boolean;
	IsBillToCodeInvalid: boolean;
	IsCRInventoryAddBillItemIdInvalid: boolean;
	IsBillToCompInvalid: boolean;
	IsBillToAddressInvalid: boolean;
	IsBillToCityInvalid: boolean;
	IsBillToStateInvalid: boolean;
	IsBillToZipInvalid: boolean;
	IsShipperCodeInvalid: boolean;
	IsShipperIdInvalid: boolean;
	IsShipperNameInvalid: boolean;
	IsShipperAddressInvalid: boolean;
	IsShipperCityInvalid: boolean;
	IsShipperStateInvalid: boolean;
	IsShipperZipInvalid: boolean;
	IsConsigneeCodeInvalid: boolean;
	IsCRAddConsigneeIdInvalid: boolean;
	IsConsigneeNameInvalid: boolean;
	IsConsigneeAddressInvalid: boolean;
	IsConsigneeCityInvalid: boolean;
	IsConsigneeStateInvalid: boolean;
	IsConsigneeZipInvalid: boolean;
	IsInvoiceInvalid: boolean;
	IsCreatedDateInvalid: boolean;
	IsUniqueIdInvalid: boolean;
}
//##END: US19763

//##START: US20288
interface ICreditMemoContainer {
	InvoiceId: number;
	CreditMemoItems: Array<ICreditMemoItem>;
}

interface ICreditMemoItem {
	Key: number;
	Id: string;
	ProNumber: string;
	DisputeDateDisplay: string;
	RevenueAdjustedDateDisplay: string;
	Amount: number;
	BOLNumber: string;
	SalesOrderCost: number;
	SalesOrderRevenue: number;
	TotalProfit: number;
	InputtedAmount: number;
	CreditMemoAmount: number;
	DebitMemoAmount: number;
	GNBillCount: number;
	InvoiceBalance: number;
}
//##END: US20288

