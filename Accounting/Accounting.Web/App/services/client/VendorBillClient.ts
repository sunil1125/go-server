/* File Created : April 10, 2014
** Created By Achal Rastogi
*/

//#region References
/// <reference path="../../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/Simplex.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/toastr.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../models/TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../models/TypeDefs/VendorBillSearchModel.d.ts" />
/// <reference path="../models/TypeDefs/CommonModels.d.ts" />
//#endregion

//#region Import
import refVendorNameSearch = require('services/models/common/searchVendorName');
import refVendorBillAddress = require('services/models/vendorBill/VendorBillAddress');
import refVendorBillSearchRes = require('services/models/vendorBill/VendorBillSearchResult');
import refSystem = require('durandal/system');
import _app = require('durandal/app');
//#endregion

export class VendorBillClient {
	//#region Public Methods

	//For Search Vendor Detail on the based od Vendor Name
	public searchSalesOrderByBOL(proNo: string, carrierId: number, bolNo: string, vendorBillId: number, successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetSalesOrderDetailByBOL/?proNo=' + proNo + '&carrierId=' + carrierId + '&bolNo=' + bolNo + '&vendorBillId=' + vendorBillId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				var result: ISalesOrderDetails = data;
				//var newItems = ko.utils.arrayMap(result, function (item) {
				//    return new refVendorBillAddress.Models.VendorBillAddress(item);
				//});
				successCallBack(result);
			})
			.fail((arg) => {
				self.failureProxyCallback('searchSalesOrderByBOL', arg);
			});
	}

	//To Check if Pro no Exists
	public getExistingProNo(bolNo: string, successCallBack: Function) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get("Accounting/GetExistingProNo/?bolNo=" + bolNo)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('getExistingProNo', arg);
			});
	}

	public searchVendorBill(vendorBillSearch: IVendorBillSearchParameter, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillSearchResults';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, vendorBillSearch)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, function (item) {
					return new refVendorBillSearchRes.Models.VendorBillSearchResult(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.failureProxyCallback('searchVendorBill', arg);
				faliureCallBack();
			});
	}

	//for quick search
	public quickSearchVendorBill(vendorBillSearch: IVendorBillQuickSearch, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillQuickSearchResult';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, vendorBillSearch)
			.done((data) => {
				//var result: any = data;
				//var newItems = ko.utils.arrayMap(result, function (item) {
				//	return new refVendorBillSearchRes.Models.VendorBillSearchResult(item);
				//});
				successCallBack(data);
			})
			.fail((arg) => {
				self.failureProxyCallback('quickSearchVendorBill', arg);
				faliureCallBack();
			});
	}

	//#region Save vendor Bill

	public SaveVendorBillDetail(VendorBillContainer: any, successCallBack: Function, failureCallBack?: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveVendorBillDetail", VendorBillContainer)
			.done(function (message) { successCallBack(message); })
			.fail(function (message) {
				if (failureCallBack) {
					failureCallBack(message);
				}
				self.failureProxyCallback('SaveVendorBillDetail', message);
			});
	}

	// call servise to create dispute lost bill
	public CreateDisputeLostBill(VendorBillContainer: any, successCallBack: Function, failureCallBack?: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/CreateDisputeLostBill", VendorBillContainer)
			.done((data) => { successCallBack(data); })
			.fail((arg) => {
				if (failureCallBack) {
					failureCallBack();
				}
				self.failureProxyCallback('CreateDisputeLostBill', arg);
			});
	}

	//#endregion Save Vendor Bill

	//#region Load Vendor Bill Details
	// Get the vendor bill details by vendor bill id
	public getVendorBillDetailsByVendorBillId(vendorBillId: number, successCallBack: Function, faliureCallBack: Function, isSubBill: boolean = false) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillDetailsByVendorBillId/?vendorBillId=' + vendorBillId + '&isSubBill=' + isSubBill;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('getVendorBillDetailsByVendorBillId', arg);
			});
	}

    // Get the vendor bill Financial details by vendor bill id
    public getVendorBillFinancialDetailsByVendorBillId(vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/GetVendorBillFinancialDetailsByVendorBillId/?vendorBillId=' + vendorBillId;

        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.get(url)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                faliureCallBack();
                self.failureProxyCallback('getVendorBillFinancialDetailsByVendorBillId', arg);
            });
    }

	public getShipmentRelatedLinks(bolNumber: string, vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetShipmentRelatedLinks/?bolNumber=' + bolNumber + '&vendorBillId=' + vendorBillId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('getShipmentRelatedLinks', arg);
			});
	}

    //Get CustomerMain Id and Term Type
    public getCustomerTypeAndMasterCustomerId(customerId: number, successCallBack: Function, faliureCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/GetCustomerTypeAndMasterCustomerId/?customerId=' + customerId;

        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.get(url)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                faliureCallBack();
                self.failureProxyCallback('getCustomerTypeAndMasterCustomerId', arg);
            });
    }

	public getVendorBillMasNoteDetails(vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetMasNotes/?vendorBillId=' + vendorBillId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('GetMasNotes', arg);
			});
	}

	public getShipmentPaymentDetails(type: string, vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetCreditDebits/?type=' + type + '&vendorBillId=' + vendorBillId;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('GetMasNotes', arg);
			});
	}

	//## Service to get all Vendor bill Exceptions. #/
	/// parameter: success callback, and failed call back
	public getVendorBillExceptions(searchFilter: any,successCallBack: Function, faliureCallBack: Function, PagingData?) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillExceptions'
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchFilter)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('GetVendorBillExceptions', arg);
			});
	}

	//## Service to get all purchase orders list. #/
	public getPurchaseOrdersDetails(searchFilter : any, successCallBack: Function, faliureCallBack: Function, PagingData?) {
		var self = this;
		var url: string = 'Accounting/GetPurchaseOrdersBoardDetails';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		ajax.post(url, searchFilter)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('GetPurchaseOrdersBoardDetails', arg);
			});
	}

	//## Service to Move the VendorBills into MAS. #/
	public ForcePushToMAS(vendorBillIds: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		ajax.get("Accounting/ForcePushToMAS?vendorBillId=" + vendorBillIds)
			.done(function (message) { successCallBack(message); })
			.fail(function (message) {
				if (failureCallBack) {
					failureCallBack(message);
				}
				self.failureProxyCallback('ForcePushToMAS', message);
			});
	}

	//## Service to get the history of the vendor bill#/
	public GetVendorBillHistoryDetailsByVendorBillId(vendorBillId: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (vendorBillId) {
			ajax.get("Accounting/GetVendorBillHistoryDetailsByVendorBillId/" + vendorBillId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetVendorBillHistoryDetailsByVendorBillId', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("Vendor bill ID is zero.");
		}
	}

	//## Service to get the Exception Rule And Resolution of the vendor bill#/
	public GetVendorBillExceptionRulesAndResolution(vendorBillId: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (vendorBillId) {
			ajax.get("Accounting/GetVendorBillExceptionRulesAndResolution/" + vendorBillId)
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetVendorBillExceptionRulesAndResolution', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("Vendor bill ID is zero.");
		}
	}

	//## Service to get the history of the vendor bill#/
	public GetVendorBillHistoryByVendorBillId(vendorBillId: number, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (vendorBillId) {
			ajax.get("Accounting/GetVendorBillHistoryByVendorBillId/" + vendorBillId.toString())
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetVendorBillHistoryByVendorBillId', message);
				});
		}

		// Set grid progress false
		//if (failureCallBack && typeof failureCallBack === 'function') {
		//	failureCallBack("Vendor bill ID is zero.");
		//}
    }

    //## Service to get the history of the vendor bill#/
    public GetVendorBillHistoryHeaderDetailsByVendorBillId(vendorBillId: number, successCallBack, failureCallBack) {
        var self = this;
        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

        if (vendorBillId) {
            ajax.get("Accounting/GetVendorBillHistoryHeaderDetailsByVendorBillId/" + vendorBillId.toString())
                .done(function (message) { successCallBack(message); })
                .fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillHistoryHeaderDetailsByVendorBillId', message);
                });
        }

        // Set grid progress false
        if (failureCallBack && typeof failureCallBack === 'function') {
            failureCallBack("Vendor bill ID is zero.");
        }
    }

	// Gets the vendor bill items for dispute lost
	public getvendorBillItems(vendorBillId: number, successCallBack: (items) => any, faliureCallBack: (faildmessage) => any) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (vendorBillId) {
			ajax.get("Accounting/GetVendorBillItemsForDisputeLost/" + vendorBillId.toString())
				.done((message) => { successCallBack(message); })
				.fail((message) => {
					if (successCallBack) {
						faliureCallBack(message);
					}
					self.failureProxyCallback('ForcePushToMAS', message);
				});
		}

		// Set grid progress false
		if (faliureCallBack && typeof faliureCallBack === 'function') {
			faliureCallBack("Vendor bill ID is zero.");
		}
	}

	// Gets the vendor bill items for dispute lost
	public saveVendorBillDisputeLostItems(vendorBillDisputeLostItem: any, successCallBack: (items) => any, faliureCallBack: (faildmessage) => any) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (vendorBillDisputeLostItem) {
			ajax.post("Accounting/SaveVendorBillDisputeLostItems/", vendorBillDisputeLostItem)
				.done((message) => { successCallBack(message); })
				.fail((message) => {
					if (successCallBack) {
						faliureCallBack(message);
					}
					self.failureProxyCallback('ForcePushToMAS', message);
				});
		}
	}

	// Gets the shipment link details
	public getShipmentLinkDetails(shipmentLink: IShipmentRelatedLinks, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (shipmentLink) {
			ajax.post("Accounting/GetShipmentLinkDetails/", shipmentLink)
				.done((message) => { successCallBack(message); })
				.fail((message) => {
					faliureCallBack(message);
					self.failureProxyCallback('GetShipmentLinkDetails', message);
				});
		}
	}

	//#endregion

	//
	public getInvoiceHtmlBody(documentRequestModel: IDocumentRequestModel, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetInvoiceAsHtmlBody';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, documentRequestModel)
			.done((data) => { successCallBack(data); })
			.fail((arg) => {
				self.failureProxyCallback('getInvoiceHtmlBody', arg);
				faliureCallBack(arg);
			});
	}

	/*
	** Gets the updated data
	*/
	public GetUploadResponce(uploadedItem: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetUploadResponce';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (uploadedItem) {
			ajax.post(url, uploadedItem)
				.done((message) => { successCallBack(message); })
				.fail((message) => {
					faliureCallBack(message);
					self.failureProxyCallback('GetShipmentLinkDetails', message);
				});
		}
	}

	public GetUploadResponceByList(uploadedFileDetails: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetUploadResponseByList';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		if (uploadedFileDetails) {
			ajax.post(url, uploadedFileDetails)
				.done((message) => { successCallBack(message); })
				.fail((message) => {
					faliureCallBack(message);
					self.failureProxyCallback('GetUploadResponseByList', message);
				});
		}
	}

	public CreateVendorBillFromSalesOrder(salesOrderId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/CreateVendorBillFromSalesOrder/?salesOrderId=' + salesOrderId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('CreateVendorBillFromSalesOrder', arg);
			});
	}

    // Service to get the vendor bill dispute details
	public getVendorBillDisputeDetails(vendorBillId: number, bolNumber:string,  successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillDisputeItemDetailsByVendorBillId/?vendorBillId=' + vendorBillId + '&bolNumber=' + bolNumber;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack(arg);
				self.failureProxyCallback('getVendorBillDisputeDetails', arg);
		});
	}

	// To Save Vendor Bill Notes Details
	public SaveVendorBillNotesDetail(vendorBillNotesContainer: IVendorBillNotesContainer, successCallBack: Function, faliureCallBack: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/SaveVendorBillNotesDetail", vendorBillNotesContainer)
			.done((message) => {
				successCallBack(message);
			})
			.fail((message) => {
				faliureCallBack(message);
				self.failureProxyCallback('SaveVendorBillNotesDetail', message);
			});
	}
	//#endregion

    // gets the model after uploading the file
    public uploadAndGetUploadedResponse(uploadModel: any, successCallBack: Function, failCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/SavePurchaseOrderUploadFileModel';

        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.post(url, uploadModel)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                self.failureProxyCallback('SavePurchaseOrderUploadFileModel', arg);
                failCallBack();
            });
    }

    //Deletes the selected Sales Order POD Document
    public deletePodDoc(documentId: number, successCallBack: Function, failCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/DeleteVendorBillFile/?documentId=' + documentId;
        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.post(url, documentId)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                self.failureProxyCallback('DeleteVendorBillFile', arg);
                failCallBack();
            });
    }

    //Updates the selected Sales Order POD Document
    public updatePodDoc(uploadModel: any, successCallBack: Function, failCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/UpdateVendorBillFile';

        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.post(url, uploadModel)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                self.failureProxyCallback('UpdateVendorBillFile', arg);
                failCallBack();
            });
    }

    // gets the model after uploading the file
    public getVendorBillPodDocDetails(salesOrderUploadFileModel: any, successCallBack: Function, failCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/GetVendorBillPodDocDetails';

        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.post(url, salesOrderUploadFileModel)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                self.failureProxyCallback('GetVendorBillPodDocDetails', arg);
                failCallBack();
            });
	}

	public ForcePushBillToMas(vendorBillId: number, updatedDate:number, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/ForcePushBillToMas/?vendorBillId=' + vendorBillId + '&updatedDate=' + updatedDate;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				failureCallBack(arg);
				self.failureProxyCallback('ForcePushBillToMas', arg);
			});
	}

    public RevertBillFromIdb(vendorBillId: number, updatedDate: number, successCallBack: Function, failureCallBack: Function) {
        var self = this;
        var url: string = 'Accounting/RevertBillFromIdb/?vendorBillId=' + vendorBillId + '&updatedDate=' + updatedDate;
        var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
        ajax.get(url)
            .done((data) => {
                successCallBack(data);
            })
            .fail((arg) => {
                failureCallBack(arg);
                self.failureProxyCallback('RevertBillFromIdb', arg);
            });
    }

	public IsForceAttachingWithRexnorBol(bolNumber: string, successCallBack: Function, failureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/IsBolRelatedToLogOnUserRole/?bolNumber=' + bolNumber;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				failureCallBack(arg);
				self.failureProxyCallback('IsBolRelatedToLogOnUserRole', arg);
			});
	}

	//## Service to get the history details of the sales order by Version Id#/
	public GetVendorBillHistoryDetailsByVersionId(vendorBillId: number, VersionId: string, headerType: string, successCallBack, failureCallBack) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var url: string = 'Accounting/GetVendorBillHistoryDetailsByVersionId/?vendorBillId=' + vendorBillId + '&versionId=' + VersionId + '&tabType=' + headerType;
		if (VersionId) {
			ajax.get(url)
				.done(function (message) { successCallBack(message); })
				.fail(function (message) {
					if (failureCallBack) {
						failureCallBack(message);
					}
					self.failureProxyCallback('GetVendorBillHistoryDetailsByVersionId', message);
				});
		}

		// Set grid progress false
		if (failureCallBack && typeof failureCallBack === 'function') {
			failureCallBack("VersionId ID is zero.");
		}
	}

	// Get the vendor bill details by vendor bill id
	public getVendorBillDetailsForLostBill(vendorBillId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillDetailsForLostBill/?vendorBillId=' + vendorBillId;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.failureProxyCallback('getVendorBillDetailsForLostBill', arg);
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
    SortOrder: string;
	SortCol: string;
    SearchFilterItems: Array<any>;
    VendorName: string;
	ProNumber: string;
	GridViewId: number;
	FromDate: Date;
	ToDate: Date;
	SelectedExceptionRule: number
	ExportType: number;
    CustomerId: number;
	RebillRepName: string;
	ExportURL: string;
	UploadedItem: any;
	//constructor(searchValue: string, sortOrder: string, sortCol: string, pageNumber: number, pageSize: number, filterItems: Array<any>, gridViewId?: number, vendorName?: string, proNumber?: string, fromDate?: Date, toDate?: Date, selectedExceptionRule?: number, exportType?:number ) {
	//	this.SearchValue = searchValue;
	//	this.PageNumber = pageNumber;
	//	this.PageSize = pageSize;
    //    this.SortCol = sortCol;
	//	this.SortOrder = sortOrder;
    //    this.SearchFilterItems = filterItems;
    //    this.VendorName = vendorName;
	//	this.ProNumber = proNumber;
	//	this.GridViewId = gridViewId;
	//	this.FromDate = fromDate;
	//	this.ToDate = toDate;
	//	this.SelectedExceptionRule = selectedExceptionRule;
	//	this.ExportType = exportType;
	//}

	constructor(args?: ISearchModel) {
		if (args) {
			this.SearchValue = args.SearchValue;
			this.PageNumber = args.PageNumber;
			this.PageSize = args.PageSize;
			this.SortCol = args.SortCol;
			this.SortOrder = args.SortOrder;
			this.SearchFilterItems = args.SearchFilterItems;
			this.VendorName = args.VendorName;
			this.ProNumber = args.ProNumber;
			this.GridViewId = args.GridViewId;
			this.FromDate = args.FromDate;
			this.ToDate = args.ToDate;
			this.SelectedExceptionRule = args.SelectedExceptionRule;
			this.ExportType = args.ExportType;
            this.CustomerId = args.CustomerId;
			this.RebillRepName = args.RebillRepName;
			this.ExportURL = refSystem.isObject(args) ? args.ExportURL : '';
			this.UploadedItem = args.UploadedItem;
		}
	}
}