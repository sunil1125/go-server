/// <reference path="CommonModels.d.ts" />
/// <reference path="SalesOrderModels.d.ts" />

/* File Created: April 15, 2014
** Created By: Achal Rastogi
** Modified By Avinash Dubey
** Added two interface one is for item and another for Notes
*/

interface IVendorBillContainer {
	VendorBill: IVendorBill;
	VendorBillAddress: Array<IVendorBillAddress>;
	VendorBillItemsDetail: Array<IVendorBillItem>;
	VendorBillNotes: Array<IVendorBillNote>;
	VendorBillExceptions: IVendorBillExceptions;
	SuborderCount: number;
	IsNewSubBill: boolean;
	IsSubBill: boolean;
	IsCreateLostBillVisible: boolean;
	IsDisputeWonLostVisible: boolean;
	IsDisputeAmountEditable: boolean;
	IsDisputeLostAmountEditable: boolean;
	IsSaveEnable: boolean;
	IsDisputeSectionEditable: boolean;
	CanForcePushBillToMAS: boolean;
}

interface IVendor {
	ID: number;
	CarrierName: string;
	CarrierType: number;
	CarrierCode: string;
	MCNumber: string;
	ContactName: string;
	City: string;
	State: string;
	CarrierTypeName: string;
}

interface ISalesOrderDetails {
	Addresses: Array<IVendorBillAddress>;
	CheckList: Array<boolean>;
}

interface IVendorBill {
	VendorBillId: number;
	VendorName: string;
	CarrierId: number;
	BillDate: Date;
	DueDate: Date;
	ProNumber: string;
	PoNumber: string;
	BolNumber: string;
	MainVendorBolNumber: string;
	Terms: string;
	Memo: string;
	Amount: number;
	TotalCost: number;
	TotalRevenue: number;
	DisputedAmount: number;
	OriginZip: string;
	DestinationZip: string;
	BillStatus: number;
	ActualCost: number;
	ActualProfit: number;
	IsPurchaseOrder: boolean;
	IsReviewed: boolean;
	ReviewRemarks: string;
	CreatedDate: Date;
	UpdatedBy: number;
	UpdatedDate: number;
	TotalPieces: number;
	TotalWeight: number;
	DeliveryDate: Date;
	DisputedDate: Date;
	ProcessDetails: string;
	ReferenceNumber: string;
	IDBFlag: boolean;
	ProcessFlow: number;
	PickupDate: Date;
	SalesOrderId: number;
	MakeInactive: boolean;
	ForceAttach: boolean;
	QuickPay: boolean;
	HoldVendorBill: boolean;
	MasTransferDate: Date;
	MasClearanceStatus: number;
	DisputeNotes: string;
	IsPurchaseOrderWithBOL: boolean;
	UpdatePRONumberInShipment: boolean;
	IsVendorBillChanged: boolean;
	IsUserWantToShortPay: boolean
	OriginalCost: number;
	BillingStatuses: Array<IEnumValue>;
	MasClearingStatusList: Array<IEnumValue>;
	IsMasStatusVisible: boolean;
	IsBillForcePushToMas: boolean;
	IsPresentInIntermediate: boolean;
	IsPresentInMasPermanent: boolean;
	OriginalBOLNumber: string;
	IsValidationApplicableOnDisputeItems: boolean;
	CarrierType: number;
	ForceAttachSource: string;
	DisputeStatusId: number;
	IsLostBill: boolean;
}

interface IVendorBillFinancialDetails{
    TotalCost: number;
    TotalRevenue: number;
    ActualCost: number;
    ActualProfit: number;
}

interface IVendorBillAddress {
	Id: number;
	VendorBillId: number;
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
	Latitude: number;
	Longitude: number;
}

interface IVendorBillNote {
	Id: number;
	EntityId: number;
	NotesDescription: string;
	NotesBy: string;
	EntityType: number;
	NotesType: number;
	NoteTypeName: string
	NotesDate: Date;
}

interface IVendorBillItem {
	Id: number;
	VendorBillId: number;
	SelectedClassType: number;
	OriginalWeight: number;
	Weight: number;
	EstimatedCost: number;
	Cost: number;
	Hazardous: number;
	DimensionLength: number;
	DimensionWidth: number;
	DimensionHeight: number;
	PieceCount: number;
	OriginalPalletCount: number;
	NewPalletCount: number;
	PackageTypeName: string;
	NMFCNumber: string;
	UserDescription: string;
	ItemId: number;
	ItemName: string;
	AccessorialId: number;
	AccessorialCode: string;
	SelectedItemTypes: IShipmentItemType;
	PackageTypes: IEnumValue;
	ClassTypes: IEnumValue;
	IsMarkForDeletion: boolean;
	IsShippingItem: boolean;
	SelectedPackageType: IEnumValue;
	PackageTypeId: number;
	DisputeAmount: number;
	DisputeLostAmount: number;
	isChecked: boolean;
	isUpdated: boolean;
	IsBackupCopy: number;
	ReasonNote: string;
	SelectedReasonCodes: ISalesOrderShipmentRequoteReason;
	Difference: number;
	SpecialChargeOrAllowanceCode: string;
}

interface IVendorBillItemForInvoiceResolution {
	Id: number;
	VendorBillId: number;
	SelectedClassType: number;
	OriginalWeight: number;
	Weight: number;
	EstimatedCost: number;
	Cost: number;
	Hazardous: number;
	DimensionLength: number;
	DimensionWidth: number;
	DimensionHeight: number;
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
	SelectedPackageType: IEnumValue;
	PackageTypeId: number;
	DisputeAmount: number;
	DisputeLostAmount: number;
	PRONo: string;
}

interface IVendorBillExceptions {
	RowNumber: number;
	VendorBillId: number;
	BOLNumber: string;
	PRONumber: string;
	CarrierName: string;
	CustomerName: string;
	SalesAgent: string;
	DeliveryDate: Date;
	PickupDate: Date;
	ShipmentTypeId: number;
	VendorBillAmount: number;
	Cost: number;
	Revenue: number;
	ProcessStatusId: number;
	InvoiceStatusId: number;
	IsPurchaseOrder: boolean;
	CarrierCode: string;
	CustomerTypeId: number;
	MasTransferDate: Date;
	BillStatus: number;
	VBException: string;
	InvoiceException: string;
	ScheduledAge: number;
	CreatedDate: Date;
	BillDate: Date;
	MasClearanceStatusId: number;
	InvoiceDate: Date;
	ProcessFlowFlag: number;
	OrderFlowFlag: number;
	MasClearanceStatusDate: Date;
	DisputedAmount: number;
	MasException: string;
	MasStatus: number;
	IsProcessed: boolean;
	IDBFlag: boolean;
	BillCreatedDateDisplay: string;
	MasClearanceStatus: string;
	CarrierType: string;
	BillStatusDisplay: string;
}

interface IVendorBillExceptionRulesAndResolution {
	VendorBillId: number;
	VendorBillExceptionRuleDescription: string;
	ExceptionResolution: string;
}

interface IVendorBillExceptionResponse {
	VendorBillExceptions: Array<IVendorBillExceptions>;
	TotalRows: number;
}

interface IVendorBillMasNote {
	VendorBillId: number;
	EffectiveDate: Date;
	MemoText: string;
	Sender: string;
	EffectiveDateDisplay: string;
}

interface IShipmentPaymentDetails {
	Id: number;
	Amount: string;
	Balance: string;
	AmountPaid: string;
	PaymentAmount: string;
	TransactionType: string;
	CommissionType: string;
	RecordType: string;
	ApplyFromTranDate: string;
	PaymentTypeDescription: string;
	FactoringCompany: string;
	BatchComments: string;
	Batch: string;
	Status: string;
}

interface IShipmentRelatedLinks {
	ID: number;
	SalesOrderID: number;
	Value: string;
	Type: string;
	SOValue: string;
	VBValue: string;
	InvoiceValue: string
	IsSameProNumber: boolean;
	IsSameBolNumber: boolean;
	CarrierCode: string;
	CarrierCodeDisplay: string;
}

interface IVendorBillId {
	BillIds: Array<number>;
}
interface IVendorBillHistory {
	VendorBillId: number;
	IsSourceIsElastic: boolean;
	PRONumber: string
	ItemHistoryDates: Array<IVersionMaster>;
	AddressHistoryDates: Array<string>;
	HeaderHistoryDates: Array<IVersionMaster>;
	VendorBillHeaderHistory: Array<IChangeHistoryRecord>;
	VendorBillItemsHistory: Array<IChangeHistoryRecord>;
	VendorBillAddressHistory: Array<IChangeHistoryRecord>;
	OldNewHistoryItems: Array<IVendorBillHistoryItems>;
	NewHistoryItems: Array<IVendorBillHistoryItems>;
}

interface ISalesOrderHistory {
	SalesOrderId: number;
	IsSourceIsElastic: boolean;
    PRONumber: string
	ItemHistoryDates: Array<IVersionMaster>;
    AddressHistoryDates: Array<string>;
    HeaderHistoryDates: Array<IVersionMaster>;
    SalesOrderHeaderHistory: Array<IChangeHistoryRecord>;
    VendorBillItemsHistory: Array<IChangeHistoryRecord>;
    VendorBillAddressHistory: Array<IChangeHistoryRecord>;
    OldNewHistoryItems: Array<IVendorBillHistoryItems>;
    NewHistoryItems: Array<IVendorBillHistoryItems>;
}

interface IVendorBillHistoryItems {
	ID: string;
	Description: string;
	Cost: string;
	Dispute: number;
	DisputeLost: number;
	Class: string;
	Weight: number;
	Length: number;
	Height: number;
	Width: number;
	Pieces: number;
	Pallet: number;
	NMFCNumber: string;
	ChangedBy: string;
	ChangeDate: string;
	Application: string;
	ChangeAction: string;
	CostField: number;

	IsChangeDescription: boolean;
	IsChangeCost: boolean;
	IsChangeDispute: boolean;
	IsChangeDisputeLost: boolean;
	IsChangeClass: boolean;
	IsChangeWeight: boolean;
	IsChangeLength: boolean;
	IsChangeHeight: boolean;
	IsChangeWidth: boolean;
	IsChangePieces: boolean;
	IsChangePallet: boolean;
	IsChangeNMFCNumber: boolean;
	IsChangeChangedBy: boolean;
}

interface IChangeHistoryRecord {
    Application: string;
    ObjectName: string;
    FieldName: string;
    OldValue: string;
    NewValue: string;
    ChangeDate: Date;
    ChangeBy: string;
    ChangeAction: string;
    IsModified: boolean;
    ChangeDateDisplay: string;
    ChangeDateFulldate: string;
}

interface IResponseObject {
	VendorBillId: number;
	PRONumber: string;
}

interface IPurchaseOrderBoard {
	Id: number;
	VendorName: string;
	CarrierId: number;
	BillDate: Date;
	DueDate: Date;
	PRONumber: string;
	PONumber: string;
	ReferenceNumber: string;
	Amount: number;
	TotalEstimateCost: number;
	TotalRevenue: number;
	DisputedAmount: number;
	OriginZip: string;
	DestinationZip: string;
	ActualCost: number;
	ActualProfit: number;
	IsPurchaseOrder: number;
	CreatedDate: Date;
	UpdatedBy: number;
	UpdatedDate: Date;
	IsActive: boolean;
	IsReviewed: boolean;
	TotalWeight: number;
	TotalPieces: number;
	DeliveryDate: Date;
	DisputedDate: Date;
	ProcessDetails: string;
	ReferenceNo: string;
	Shipper: string;
	Consignee: string;
	EmailedDate: Date;
	BillDateDisplay: string;
	CreatedDateDisplay: string;
	EmailedDateDisplay: string;
}

interface IUploadVendorBillResponse{
	InvalidData: Array<IVendorBillUploadItem>;
	SavedCount: number;
}

interface IUploadVendorBillRequest{
	AllRecords: Array<IVendorBillUploadItem>;
	CorrectedRecords: Array<IVendorBillUploadItem>;
	InvalidRecords: Array<IVendorBillUploadItem>;
}

interface IPurchaseOrderPossibility {
	ID: string;
	BOL: string;
	PRO: string;
	PickUpDate: Date;
	CarrierName: string;
	OriginZip: string;
	DestinationZip: string;
	PONumber: string;
	ReferenceNo: string;
	Shipper: string;
	Consignee: string;
	Customer: string;
	Remarks: string;
}

interface IPurchaseOrderEmail {
	AgentName: string;
	EmailAddress: string;
	PurchaseOrderData: Array<IPurchaseOrderBoard>;
	VendorBillDocuments: Array<any>;
	Comments: string;
	CustomerName: string;
}

interface IForeignBolEmail {
	AgentName: string;
	EmailAddress: string;
	Attachments: Array<any>;
	Comments: string;
	CustomerName: string;
	ForeignBolEmailData: IForeignBolEmailData;
	IsForeignBol: boolean;
	VendorBillId: number;
	CustomerId: number;
	SalesRepId: number;
}

interface IForeignBolEmailData{
	VendorBillId: number;
	BillDate: Date;
	CreatedDate: Date;
	PRONumber: string;
	MainBolNumber: string;
	VendorName: string;
	Shipper: string;
	Consignee: string;
	Amount: number;
	PONumber: string;
	DeliveryDate: Date;
}

interface IVolumeCustomerBillsIdentificationMapping {
	Id: number;
	CustomerId: number;
	CompanyToken: string;
	IsMarkedForDeletion: boolean;
}

interface IVolumeCustomerMapping {
	DeletedItems: Array<IVolumeCustomerBillsIdentificationMapping>;
	UpdatesItems: Array<IVolumeCustomerBillsIdentificationMapping>;
	AddedItems: Array<IVolumeCustomerBillsIdentificationMapping>;
}

interface ILinkSectionDetails {
	BolNumber: string;
	InvoiceNumber: string;
	ProNumber: string;
	SalesOrderProcessStatusDisplay: string;
	SalesOrderInvoiceStatusDisplay: string;
	SalesOrderCost: number;
	SalesOrderRevenue: number;
	InvoiceDateDisplay: string;
	InvoiceAmount: number;
	InvoiceBalance: number;
	VendorBillCarrier: string;
	VendorBillStatusDisplay: string;
	VendorBillMasTransferDateDisplay: string;
	VendorBillAmount: number;
	VendorBillBalance: number;
	ClaimNumber: string;
	ClaimBolNumber: string;
	ClaimStatusDateDisplay: string;
	ClaimAmount: number;
}

interface IVendorBillUploadItem {
	CarrierType: string;
	OrderNumber: string;
	ProNumber: string;
	CustomerBOLNumber: string;
	BOLNumber: string;
	PoNumber: string;
	RefPUNumber: string;
	DeliveryDate: string;
	BillDate: string;
	CarrierCode: string;
	OriginZip: string;
	DestinationZip: string;
	Memo: string;
	ItemId: string;
	PCS: string;
	Description: string;
	Cost: string;
	Class: string;
	Length: string;
	Width: string;
	Height: string;
	Wgt: string;
	PT: string;
	ChargeCode: string;
	ShipperCompanyName: string;
	ShipperContactPerson: string;
	ShipperPhone: string;
	ShipperFax: string;
	ShipperAddress1: string;
	ShipperAddress2: string;
	ShipperCity: string;
	ShipperState: string;
	ShipperCountry: string;
	ConsigneeCompanyName: string;
	ConsigneeContactPerson: string;
	ConsigneePhone: string;
	ConsigneeFax: string;
	ConsigneeAddress1: string;
	ConsigneeAddress2: string;
	ConsigneeZip: string;
	ConsigneeCity: string;
	ConsigneeState: string;
	ConsigneeCountry: string;
	BillToCompanyName: string;
	BillToPhone: string;
	BillToFax: string;
	BillToAddress1: string;
	BillToAddress2: string;
	BillToZip: string;
	BillToCity: string;
	BillToState: string;
	BillToCountry: string;
	QuickPayFlag: string;

	IsValidCarrierType: boolean;
	IsValidOrderNumber: boolean;
	IsValidProNumber: boolean;
	IsValidCustomerBOLNumber: boolean;
	IsValidBOLNumber: boolean;
	IsValidPoNumber: boolean;
	IsValidRefPUNumber: boolean;
	IsValidDeliveryDate: boolean;
	IsValidBillDate: boolean;
	IsValidCarrierCode: boolean;
	IsValidOriginZip: boolean;
	IsValidDestinationZip: boolean;
	IsValidMemo: boolean;
	IsValidItemId: boolean;
	IsValidPCS: boolean;
	IsValidDescription: boolean;
	IsValidCost: boolean;
	IsValidClass: boolean;
	IsValidLength: boolean;
	IsValidWidth: boolean;
	IsValidHeight: boolean;
	IsValidWgt: boolean;
	IsValidPT: boolean;
	IsValidChargeCode: boolean;
	IsValidShipperCompanyName: boolean;
	IsValidShipperContactPerson: boolean;
	IsValidShipperPhone: boolean;
	IsValidShipperFax: boolean;
	IsValidShipperAddress1: boolean;
	IsValidShipperAddress2: boolean;
	IsValidShipperCity: boolean;
	IsValidShipperState: boolean;
	IsValidShipperCountry: boolean;
	IsValidConsigneeCompanyName: boolean;
	IsValidConsigneeContactPerson: boolean;
	IsValidConsigneePhone: boolean;
	IsValidConsigneeFax: boolean;
	IsValidConsigneeAddress1: boolean;
	IsValidConsigneeAddress2: boolean;
	IsValidConsigneeZip: boolean;
	IsValidConsigneeCity: boolean;
	IsValidConsigneeState: boolean;
	IsValidConsigneeCountry: boolean;
	IsValidBillToCompanyName: boolean;
	IsValidBillToPhone: boolean;
	IsValidBillToFax: boolean;
	IsValidBillToAddress1: boolean;
	IsValidBillToAddress2: boolean;
	IsValidBillToZip: boolean;
	IsValidBillToCity: boolean;
	IsValidBillToState: boolean;
	IsValidBillToCountry: boolean;
	IsValidQuickPayFlag: boolean;
	IsValidShipperZip: boolean;
	IsThisClassValid: boolean;
}

interface IVendorBillNotesContainer {
	VendorBillNoteDetails: Array<IVendorBillNote>;
	Id: number;
}

interface IVersionMaster {
	StringifiedVersionId: string;
	PrimaryObjectId: number;
	CreatedDate: Date;
	UpdatedBy: string;
	UpdatedById: number;
	MigratedFrom: number;
	ChangeSourceApplication: number;
	CreatedDateDisplay: string;
}