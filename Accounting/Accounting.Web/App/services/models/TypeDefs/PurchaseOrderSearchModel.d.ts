/// <reference path="CommonModels.d.ts" />

/* File Created: July 11, 2014
** Created By: Achal Rastogi
*/

interface IPurchaseOrderSearchContainer {
	PurchaseOrderQuickSearch: IPurchaseOrderQuickSearch;
	PurchaseOrderSearchResult: IPurchaseOrderSearchResult;
}

interface IPurchaseOrderQuickSearch {
	VendorName: string;
	ProNumber: string;
	BolNumber: string;
	PoNumber: string;
	FromDate: Date;
	ToDate: Date;
	RoleId: number;
	PageNumber: number;
	PageSize: number;
	PagesFound: number;
	SortField: string;
	SortOrder: string;
	IsPurchaseOrder: number;
}

interface IPurchaseOrderSearchParameter {
	ItemID: string;
	VendorName: string;
	FromDate: Date;
	ToDate: Date;
	Amount: number;
	ProcessStatus: number;
	CustomerBol: string;
	ProNumber: string;
	BolNumber: string;
	ShipperComName: string;
	ConsigneeCompName: string;
	ShipperZipCode: string;
	ConsigneeZipcode: string;
	CustomerName: string;
	UserId: number;
	RoleId: number;
	PageNumber: number;
	PageSize: number;
	PagesFound: number;
	PoNumber: string;
	RefNumber: string;
	ShipperCity: string;
	ConsigneeCity: string;
	TotalWeight: number;
	TotalPieces: number;
	DateRange: number;
}

interface IPurchaseOrderSearchResult {
    Id: number;
    ShipmentId: number;
	BolNumber: string;
	CustomerBolNumber: string;
	ProNumber: string;
	Vendor: string
    Revenue: number;
	ShipCompanyName: string;
	ConsigneeCompName: string;
	ShipperZipCode: string;
	ConsigneeZipCode: string;
	TransactionType: string;
	BillDate: Date;
	BillStatus: string;
	ProcessFlowFlag: number;
	ProcessFlow: boolean;
}

interface IPurchaseOrderSearchFilter {
	SearchText: string;
	Operand: number ;
	FieldName: string;
}