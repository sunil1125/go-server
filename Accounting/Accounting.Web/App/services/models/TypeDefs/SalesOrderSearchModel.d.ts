/// <reference path="CommonModels.d.ts" />

/* File Created: Aug 26, 2014
** Created By: Bhanu pratap
*/

interface ISalesOrderSearchContainer {
	SalesOrderQuickSearch: ISalesOrderQuickSearch;
	SalesOrderSearchResult: ISalesOrderSearchResult;
}

interface ISalesOrderQuickSearch {
	ProNumber: string;
	BolNumber: string;
	PoNumber: string;
	ShipperZipCode: string;
	ConsigneeZipCode: string;
	PageNumber: number;
	PageSize: number;
	PagesFound: number;
}

interface ISalesOrderExtendedSearch {
}

interface ISalesOrderSearchResult {
    Id: number;
    BolNumber: string;
    ProNumber: string;
    PickupDate: Date;
    CustomerBolNumber: string;
    Customer: string;
    Vendor: string
	ShipperCompName: string;
    ConsigneeCompName: string;
    ShipperZipCode: string;
    ConsigneeZipCode: string;
    ServiceType: string;
    TotalWeight: number;
    TotalPieces: number;
    Revenue: number;
    ProcessStatus: string;
    InvoiceStatus: string;
    PickupDateDisplay: string;
    InvoiceStatusDisplay: string;
    ProcessStatusDisplay: string;
    ProcessFlowType: string;
}