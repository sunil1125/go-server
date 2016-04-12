/* File Created : August 26, 2014
** Created By Bhanu pratap
*/

//#region References
/// <reference path="../../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/Simplex.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/toastr.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../models/salesOrder/SearchTerminalCompany.ts" />
/// <reference path="../models/TypeDefs/SalesOrderModels.d.ts" />
//#endregion

//#region Import
import refSalesOrderSearchRes = require('services/models/salesOrder/SalesOrderSearchResult');
import refSystem = require('durandal/system');
import _app = require('durandal/app');
import refSearchOceanCarrier = require('services/models/salesOrder/SearchOceanCarrierDetail');
import refSearchCompanyName = require('services/models/salesOrder/SearchCompanyName');
import refSearchTerminalCompanyModel = require('services/models/salesOrder/SearchTerminalCompany');
import refSearchSalesOrderAddress = require('services/models/salesOrder/SalesOrderAddress');
//#endregion

export class PaginationObject {
	public TotalCount: number;
	public range: Array
	constructor(totalcount: number, range: Array) {
		this.TotalCount = totalcount;
		this.range = range;
	}
}

/*
** <summary>
** All calls to Atlas from Sales Order Model.
** </summary>
** <createDetails>
** <id>USXXXX</id> <by>Bhanu Pratap</by> <date>26-08-2014</date>
** </createDetails>
** <changeHistory>
** <id>DE20779</id> <by>Baldev Singh Thakur</by> <date>20-11-2015</date>
** <id>US19882</id> <by>Shreesha Adiga</by> <date>23-12-2015</date> <description>Added methods to save the uploaded records</description>
** <id>US20288</id> <by>Shreesha Adiga</by> <date>14-01-2016</date> <description>Added GetCreditMemoDetails </description>
** <id>US20961</id> <by>Shreesha Adiga</by> <date>08-03-2016</date> <description>Added SaveDisputeStatusFromSalesOrder </description>
** </changeHistory>
*/
export class SalesOrderClient {
	//#region Public Methods
	// Get the sales order list
	public quickSearchSalesOrder(salesOrderQuickSearchParameter: ISalesOrderQuickSearch, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderQuickSearchResult';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, salesOrderQuickSearchParameter)
			.done((data) => {
				var newItems = ko.utils.arrayMap(data.SalesOrderSearchResults, function (item) {
					return new refSalesOrderSearchRes.Models.SalesOrderSearchResult(item);
				});

				var newObj = new PaginationObject(data.NumberOfRows, newItems);
				successCallBack(newObj);
			})
			.fail((arg) => {
				self.failureProxyCallback('quickSearchSalesOreder', arg);
				faliureCallBack();
			});
	}

	//Gets the Address Book based on customer Id
	public getCustomerDefaultBillingAddress(customerId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetCustomerDefaultBillingAddress/?customerId=' + customerId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetCustomerDefaultBillingAddress', arg);
				faliureCallBack();
			});
	}

	// get the shiv via list
	public getSalesOrderShipViaList(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderShipViaList';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderShipViaList', arg);
			});
	}

	// get the order status list}
	public getSalesOrderStatusForEntry(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderStatusForEntry';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('getSalesOrderStatusForEntry', arg);
			});
	}

	// get the order status list
	public getSalesOrderInvoiceStatusList(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderInvoiceStatusList';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderInvoiceStatusList', arg);
			});
	}

	// Get Sales Order Details By SalesOrderId
	public getSalesOrderDetailsBySalesOrderId(salesOrderId: number, successCallBack: Function, faliureCallBack: Function, isSuborder: boolean = false) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderDetailsBySalesOrderId/?salesOrderId=' + salesOrderId + '&isSuborder=' + isSuborder;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderDetailsBySalesOrderId', arg);
				faliureCallBack();
			});
	}

	// Get Sales Order Details By SalesOrderId
	public getSalesOrderFinancialDetailsBySalesOrderId(salesOrderId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderFinancialDetailsBySalesOrderId/?salesOrderId=' + salesOrderId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('getSalesOrderFinancialDetailsBySalesOrderId', arg);
				faliureCallBack();
			});
	}

	// get the carrier service type list
	public getSalesOrderCarrierServiceTypeList(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderCarrierServiceTypeList';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderCarrierServiceTypeList', arg);
			});
	}

	// gets the model after uploading the file
	public uploadAndGetUploadedResponse(uploadModel: any, successCallBack: Function, failCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/SaveSalesOrderUploadFileModel';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, uploadModel)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('quickSearchSalesOreder', arg);
				failCallBack();
			});
	}

	//Deletes the selected Sales Order POD Document
	public deletePodDoc(documentId: number, successCallBack: Function, failCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/DeleteSalesOrderFile/?documentId=' + documentId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, documentId)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('DeleteSalesOrderFile', arg);
				failCallBack();
			});
	}

	//Updates the selected Sales Order POD Document
	public updatePodDoc(uploadModel: any, successCallBack: Function, failCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/UpdateSalesOrderFile';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, uploadModel)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('UpdateSalesOrderFile', arg);
				failCallBack();
			});
	}

	// gets the model after uploading the file
	public getSalesOrderPodDocDetails(salesOrderUploadFileModel: any, successCallBack: Function, failCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderPodDocDetails';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, salesOrderUploadFileModel)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderPodDocDetails', arg);
				failCallBack();
			});
	}

	public SaveSystemHistory(salesOrderContainer: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveSystemHistory", salesOrderContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveSystemHistory', message);
			});
	}

	// gets the Ocean Carrier Details
	public searchOceanCarrierDetails(startValue: string, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetCarrierDetailsByCustomerId";

		var _searchValue = new SearchModel(startValue);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, _searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, function (item: ISearchOceanCarrier) {
					return new refSearchOceanCarrier.Models.SearchOceanCarrier(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.failureProxyCallback('searchOceanCarrierDetails', arg);
			});
	}

	// gets the Ocean Carrier Details
	public searchCompanyName(searchTerminalCompanyModel: refSearchTerminalCompanyModel.ISearchTerminalCompany, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetTerminalCompanyDetails";
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchTerminalCompanyModel)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, (item: ISearchCompanyName) => {
					return new refSearchCompanyName.Models.SearchCompanyName(item);
				});
				successCallBack(result);
			})
			.fail((arg) => {
				self.failureProxyCallback('searchCompanyName', arg);
			});
	}

	//Gets the Sales Order Claim
	public getSalesOrderClaim(bolNo: string, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderClaim/?bolNo=' + bolNo;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderClaim', arg);
				faliureCallBack();
			});
	}

	// To get Multileg Details
	public getMultilegDetails(shipmentId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetMultilegDetailsBySalesOrderId/?shipmentId=' + shipmentId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetMultilegDetails', arg);
				faliureCallBack();
			});
	}

	// To Save Sales Order Details
	public SaveSalesOrderDetail(salesOrderContainer: ISalesOrderContainer, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveSalesOrderDetail", salesOrderContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveSalesOrderDetail', message);
			});
	}

	// To Save Sales Order Notes Details
	public SaveSalesOrderNotesDetail(salesOrderNotesContainer: ISalesOrderNotesContainer, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveSalesOrderNotesDetail", salesOrderNotesContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveSalesOrderNotesDetail', message);
			});
	}

	//## Service to get the history of the sales order#/
	public GetShipmentHistoryByShipmentId(salesOrderId: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (salesOrderId) {
			ajax.get("Accounting/GetShipmentHistoryByShipmentId/" + salesOrderId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetShipmentHistoryByShipmentId', message);
				});
		}

		// Set grid progress false
		//if (failureCallBack && typeof failureCallBack === 'function') {
		//	failureCallBack("Sales order ID is zero.");
		//}
	}

	public GetShipmentHistoryHeaderDetailsByShipmentId(salesOrderId: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (salesOrderId) {
			ajax.get("Accounting/GetShipmentHistoryHeaderDetailsByShipmentId/" + salesOrderId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetShipmentHistoryHeaderDetailsByShipmentId', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("Sales order ID is zero.");
		}
	}

	//## Service to get the history details of the sales order#/
	public GetShipmentHistoryDetailsByShipmentId(salesOrderId: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (salesOrderId) {
			ajax.get("Accounting/GetShipmentHistoryDetailsByShipmentId/" + salesOrderId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetShipmentHistoryDetailsByShipmentId', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("Vendor bill ID is zero.");
		}
	}

	//## Service to get vendor bill item for invoice resolution#/
	public GetVendorBillItemsForInvoiceResolution(salesOrderId: number, successCallBack, failureCallBack) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (salesOrderId) {
			ajax.get("Accounting/GetVendorBillItemsForInvoiceResolution/" + salesOrderId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetVendorBillItemsForInvoiceResolution', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("Vendor bill ID is zero.");
		}
	}

	//## Service to get vendor bill addresses for invoice resolution#/
	public GetVendorBillAddressForInvoiceResolution(vendorBillId: number, successCallBack, failureCallBack) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (vendorBillId) {
			ajax.get("Accounting/GetVendorBillAddressForInvoiceResolution/" + vendorBillId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetVendorBillAddressForInvoiceResolution', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("Vendor bill ID is zero.");
		}
	}

	// gets the model after uploading the file
	public SendAgentNotificationMail(sendAgentNotificationMailDetail: any, successCallBack: Function, failCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/SendAgentNotificationMailDetail';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, sendAgentNotificationMailDetail)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('SendAgentNotificationMail', arg);
				failCallBack(arg);
			});
	}

	// To Save Sales Order Details
	public CopySalesOrderDetail(salesOrderContainer: ISalesOrderContainer, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/CopySalesOrderDetail", salesOrderContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('CopySalesOrderDetail', message);
			});
	}

	// To Cancel SalesOrder
	public cancelSalesOrder(shipmentId: number, updatedDateTime: number, orderStatus: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/CancelSalesOrder/?shipmentId=' + shipmentId + '&updatedDateTime=' + updatedDateTime + '&orderStatus=' + orderStatus;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('cancelSalesOrder', arg);
				// ###START: DE20779
				faliureCallBack(arg);
				// ###END: DE20779
			});
	}

	// To Un Cancel SalesOrder
	public UnCancelSalesOrder(shipmentId: number, updatedDateTime: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/UnCancelSalesOrder/?shipmentId=' + shipmentId + '&updatedDateTime=' + updatedDateTime;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('UnCancelSalesOrder', arg);
				// ###START: DE20779
				faliureCallBack(arg);
				// ###END: DE20779
			});
	}

	// To get Requote Reason codes
	public GetRequoteReasonCodes(successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetRequoteReasonCodes';
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetRequoteReasonCodes', arg);
				faliureCallBack();
			});
	}

	// To get Requote Reason codes
	public GetAgentDisputes(shipmentId: number, vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetAgentDisputes/?shipmentId=' + shipmentId + '&vendorBillId=' + vendorBillId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetAgentDisputes', arg);
				faliureCallBack();
			});
	}
	public getInvoiceExceptionDetails(shipmentId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetInvoiceExceptionDetailsBySalesOrderId/?shipmentId=' + shipmentId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('getInvoiceExceptionDetails', arg);
				faliureCallBack();
			});
	}

	// Force Invoice Reason
	public forceInvoiceShipment(requestParameter: any, successCallBack: Function, failCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/ForceInvoiceShipment';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, requestParameter)
			.done((data) => {
				successCallBack(data);
			})
			.fail((data) => {
				self.failureProxyCallback('forceInvoiceShipment', data);
				failCallBack(data);
			});
	}

	// To SalesOrder Rebill
	public GetSalesOrderRebill(salesOrderId: string, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderRebill/?salesOrderId=' + salesOrderId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderRebill', arg);
				faliureCallBack();
			});
	}

	// To save Rebill Details
	// To Save Sales Order Details
	public SaveSalesOrderRebillDetail(salesOrderRebillContainer: ISalesOrderREBillContainer, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveRebillDetail", salesOrderRebillContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveSalesOrderRebillDetail', message);
			});
	}

	// To Save Sales Order Details
	public SaveAgentDispute(agentDisputeDetails: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveAgentDispute", agentDisputeDetails)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveAgentDispute', message);
			});
	}

	// To Save Sales Order Details
	public SaveSalesOrderDisputeVBDetails(salesOrderDisputeVendorBillContainer: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveSalesOrderDisputeVBDetails", salesOrderDisputeVendorBillContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveSalesOrderDisputeVBDetails', message);
			});
	}

	//##START: US20961
	// To save dispute status for VBs that are already in mas
	public SaveDisputeStatusFromSalesOrder(salesOrderDisputeVendorBillContainer: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveDisputeStatusFromSalesOrder", salesOrderDisputeVendorBillContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveDisputeStatusFromSalesOrder', message);
			});
	}
	//##END: US20961

	// To SalesOrder Dispute
	public GetMultipleVendorBillDetailsForIterm(salesOrderId: number, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetMultipaleVendorBillDetailsForIterm/?shipmentId=' + salesOrderId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetMultipaleVendorBillDetailsForIterm', arg);
				failureCallBack();
			});
	}

	public searchAutoCompleteCompanyDetails(startValue: string, customerId: number, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetCompanyAddressDetailsByCustomerId";

		var _searchValue = new SearchModel(startValue);
		_searchValue.CustomerId = customerId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, _searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, function (item: ISalesOrderAddress) {
					return new refSearchSalesOrderAddress.Models.SalesOrderAddress(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.failureProxyCallback('searchAutoCompleteCompanyDetails', arg);
			});
	}

	// To SalesOrder GetFAKDetails
	public GetFAKDetails(carrierId: number, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetFAKDetailsByCarrierId/?carrierId=' + carrierId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetFAKDetails', arg);
				failureCallBack();
			});
	}

	// To Save FAK Details
	public SaveFAKSetup(auditSettingContainer: any, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveFAKMappingSetup", auditSettingContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				failureCallBack(message);
				self.failureProxyCallback('SaveFAKSetup', message);
			});
	}

	// To Get SalesOrder Audited bill detail
	public GetSalesOrderAuditedBillDetailByVendorBillId(vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderAuditedBillDetailByVendorBillId/?vendorBillId=' + vendorBillId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetSalesOrderAuditedBillDetailByVendorBillId', arg);
				faliureCallBack();
			});
	}

	// To Revert Sales Order Scheduled To Pending
	public MakeSoScheduledToPending(shipmentId: number, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/MakeSoScheduledToPending/?shipmentId=' + shipmentId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('MakeSoScheduledToPending', arg);
				failureCallBack();
			});
	}

	// To Send Invoice
	public ScheduleInvoice(salesOrderContainer: any, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/SalesOrderScheduleInvoice';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, salesOrderContainer)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('ScheduleInvoice', arg);
				failureCallBack(arg);
			});
	}

	// To Save Schedule Invoice
	public SaveScheduleInvoiceZeroRevenue(scheduleInvoiceContainer: any, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/SaveScheduleInvoiceZeroRevenue';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, scheduleInvoiceContainer)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('SaveScheduleInvoiceZeroRevenue', arg);
				failureCallBack(arg);
			});
	}

	// To Save Schedule Invoice SaveScheduleInvoiceWithRevenueAdjustment
	public SaveScheduleInvoiceWithRevenueAdjustment(scheduleInvoiceContainer: any, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/SaveScheduleInvoiceWithRevenueAdjustment';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, scheduleInvoiceContainer)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('SaveScheduleInvoiceZeroRevenue', arg);
				failureCallBack(arg);
			});
	}

	// Get MAS Customer Fields based on Customer Id
	public GetMasCustomerFields(CustomerId: number, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetMASCustomerFields/?customerId=' + CustomerId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetMasCustomerFields', arg);
				failureCallBack(arg);
			});
	}

	// To set order status as shipment finalized
	public SetFinalize(salesOrderFinalizeDetails: ISalesOrderFinalizeDetails, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SetSalesOrderFinalized", salesOrderFinalizeDetails)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				failureCallBack(message);
				self.failureProxyCallback('SetFinalize', message);
			});
	}

	public GetSalesOrderFinancialDetailsOnSubscribe(salesOrderFinancialDetails: ISalesOrderFinancialDetails, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/GetSalesOrderFinancialDetailsOnSubscribe", salesOrderFinancialDetails)
			.done((data) => {
				successCallBack(data);
			})
			.fail((message) => {
				failureCallBack(message);
				self.failureProxyCallback('GetSalesOrderFinancialDetailsOnSubscribe', message);
			});
	}

	//## Service to get the history details of the sales order by Version Id#/
	public GetShipmentHistoryDetailsByVersionId(salesOrderId: number, VersionId: string, headerType: string, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var url: string = 'Accounting/GetShipmentHistoryDetailsByVersionId/?salesOrderId=' + salesOrderId + '&versionId=' + VersionId + '&tabType=' + headerType;
		if (VersionId) {
			ajax.get(url)
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetShipmentHistoryDetailsByVersionId', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("VersionId ID is zero.");
		}
	}

	/*
	** Gets the response after uploading the CSV
	*/
	///	<createDetails>
	/// <id>US19882</id> <by>Shreesha Adiga</by> <date>23-12-2015</date>
	/// </createDetails>
	public GetSalesOrderUploadResponce(uploadedItem: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/SalesOrderCSVUpload';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (uploadedItem) {
			ajax.post(url, uploadedItem)
				.done((message) => { successCallBack(message); })
				.fail((message) => {
					faliureCallBack(message);
					self.failureProxyCallback('GetSalesOrderUploadResponce', message);
				});
		}
	}

	/// Submit grid rows and get back the invalid rows, and uploaded row count as response
	///	<createDetails>
	/// <id>US19882</id> <by>Shreesha Adiga</by> <date>23-12-2015</date>
	/// </createDetails>
	public GetSalesOrderUploadResponseAfterSubmitFromGrid(uploadedFileDetails: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderUploadResponseAfterSubmitFromGrid';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (uploadedFileDetails) {
			ajax.post(url, uploadedFileDetails)
				.done((response) => { successCallBack(response); })
				.fail((message) => {
					faliureCallBack(message);
					self.failureProxyCallback('GetSalesOrderUploadResponseAfterSubmitFromGrid', message);
				});
		}
	}

	/// Get the credit memo details on click of the tab
	///	<createDetails>
	/// <id>US20288</id> <by>Shreesha Adiga</by> <date>14-01-2016</date>
	/// </createDetails>
	public GetCreditMemoDetails(bolNumber: string, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var url: string = 'Accounting/GetCreditMemoDetails/?bolNumber=' + bolNumber;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('GetCreditMemoDetails', arg);
				faliureCallBack();
			});
	}

	//#endregion

	//#region Private Methods
	// For Log the Error record
	private failureProxyCallback(context, error) {
		if (error.responseText) {
			if (error.responseText.indexOf("HTTP_STATUS_CODE:401") != -1) {
				refSystem.log(error.responseText, error, context + ' error callback');
				return;
			}
		}

		try {
			var errorDetails = JSON.parse(error.responseText);
			if (error) {
				refSystem.log(errorDetails.Message, error, context + ' error callback');
				return;
			}
			else {
				refSystem.log(errorDetails.responseText, error, context + ' error callback');
				return;
			}
		}
		catch (err) {
			var status = error.status;
			var statusText = error.statusText;
			refSystem.log((status ? error.status + ': ' : 'Error : ') + (statusText ? error.statusText : ''), error, context + ' failure/error callback');
			return;
		}
	}

	//#endregion
}

export class SearchModel {
	SearchValue: string;
	PageSize: number;
	PageNumber: number;
	CustomerId: number;
	CompanyId: number;
	ShipType: number;
	constructor(searchValue: string, PageNumber?: number, PageSize?: number) {
		this.SearchValue = searchValue;
		this.PageNumber = PageNumber;
		this.PageSize = PageSize;
	}
}