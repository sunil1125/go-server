/* File Created : August 26, 2014
** Created By Bhanu pratap
*/
define(["require", "exports", 'services/models/salesOrder/SalesOrderSearchResult', 'durandal/system', 'durandal/app', 'services/models/salesOrder/SearchOceanCarrierDetail', 'services/models/salesOrder/SearchCompanyName', 'services/models/salesOrder/SalesOrderAddress'], function(require, exports, __refSalesOrderSearchRes__, __refSystem__, ___app__, __refSearchOceanCarrier__, __refSearchCompanyName__, __refSearchSalesOrderAddress__) {
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
    var refSalesOrderSearchRes = __refSalesOrderSearchRes__;
    var refSystem = __refSystem__;
    var _app = ___app__;
    var refSearchOceanCarrier = __refSearchOceanCarrier__;
    var refSearchCompanyName = __refSearchCompanyName__;
    
    var refSearchSalesOrderAddress = __refSearchSalesOrderAddress__;

    //#endregion
    var PaginationObject = (function () {
        function PaginationObject(totalcount, range) {
            this.TotalCount = totalcount;
            this.range = range;
        }
        return PaginationObject;
    })();
    exports.PaginationObject = PaginationObject;

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
    var SalesOrderClient = (function () {
        function SalesOrderClient() {
        }
        //#region Public Methods
        // Get the sales order list
        SalesOrderClient.prototype.quickSearchSalesOrder = function (salesOrderQuickSearchParameter, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderQuickSearchResult';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, salesOrderQuickSearchParameter).done(function (data) {
                var newItems = ko.utils.arrayMap(data.SalesOrderSearchResults, function (item) {
                    return new refSalesOrderSearchRes.Models.SalesOrderSearchResult(item);
                });

                var newObj = new PaginationObject(data.NumberOfRows, newItems);
                successCallBack(newObj);
            }).fail(function (arg) {
                self.failureProxyCallback('quickSearchSalesOreder', arg);
                faliureCallBack();
            });
        };

        //Gets the Address Book based on customer Id
        SalesOrderClient.prototype.getCustomerDefaultBillingAddress = function (customerId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetCustomerDefaultBillingAddress/?customerId=' + customerId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetCustomerDefaultBillingAddress', arg);
                faliureCallBack();
            });
        };

        // get the shiv via list
        SalesOrderClient.prototype.getSalesOrderShipViaList = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderShipViaList';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderShipViaList', arg);
            });
        };

        // get the order status list}
        SalesOrderClient.prototype.getSalesOrderStatusForEntry = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderStatusForEntry';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('getSalesOrderStatusForEntry', arg);
            });
        };

        // get the order status list
        SalesOrderClient.prototype.getSalesOrderInvoiceStatusList = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderInvoiceStatusList';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderInvoiceStatusList', arg);
            });
        };

        // Get Sales Order Details By SalesOrderId
        SalesOrderClient.prototype.getSalesOrderDetailsBySalesOrderId = function (salesOrderId, successCallBack, faliureCallBack, isSuborder) {
            if (typeof isSuborder === "undefined") { isSuborder = false; }
            var self = this;
            var url = 'Accounting/GetSalesOrderDetailsBySalesOrderId/?salesOrderId=' + salesOrderId + '&isSuborder=' + isSuborder;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderDetailsBySalesOrderId', arg);
                faliureCallBack();
            });
        };

        // Get Sales Order Details By SalesOrderId
        SalesOrderClient.prototype.getSalesOrderFinancialDetailsBySalesOrderId = function (salesOrderId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderFinancialDetailsBySalesOrderId/?salesOrderId=' + salesOrderId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('getSalesOrderFinancialDetailsBySalesOrderId', arg);
                faliureCallBack();
            });
        };

        // get the carrier service type list
        SalesOrderClient.prototype.getSalesOrderCarrierServiceTypeList = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderCarrierServiceTypeList';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderCarrierServiceTypeList', arg);
            });
        };

        // gets the model after uploading the file
        SalesOrderClient.prototype.uploadAndGetUploadedResponse = function (uploadModel, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/SaveSalesOrderUploadFileModel';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, uploadModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('quickSearchSalesOreder', arg);
                failCallBack();
            });
        };

        //Deletes the selected Sales Order POD Document
        SalesOrderClient.prototype.deletePodDoc = function (documentId, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/DeleteSalesOrderFile/?documentId=' + documentId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, documentId).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('DeleteSalesOrderFile', arg);
                failCallBack();
            });
        };

        //Updates the selected Sales Order POD Document
        SalesOrderClient.prototype.updatePodDoc = function (uploadModel, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/UpdateSalesOrderFile';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, uploadModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('UpdateSalesOrderFile', arg);
                failCallBack();
            });
        };

        // gets the model after uploading the file
        SalesOrderClient.prototype.getSalesOrderPodDocDetails = function (salesOrderUploadFileModel, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderPodDocDetails';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, salesOrderUploadFileModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderPodDocDetails', arg);
                failCallBack();
            });
        };

        SalesOrderClient.prototype.SaveSystemHistory = function (salesOrderContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveSystemHistory", salesOrderContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveSystemHistory', message);
            });
        };

        // gets the Ocean Carrier Details
        SalesOrderClient.prototype.searchOceanCarrierDetails = function (startValue, successCallBack) {
            var self = this;
            var url = "Accounting/GetCarrierDetailsByCustomerId";

            var _searchValue = new SearchModel(startValue);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, _searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refSearchOceanCarrier.Models.SearchOceanCarrier(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.failureProxyCallback('searchOceanCarrierDetails', arg);
            });
        };

        // gets the Ocean Carrier Details
        SalesOrderClient.prototype.searchCompanyName = function (searchTerminalCompanyModel, successCallBack) {
            var self = this;
            var url = "Accounting/GetTerminalCompanyDetails";
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchTerminalCompanyModel).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refSearchCompanyName.Models.SearchCompanyName(item);
                });
                successCallBack(result);
            }).fail(function (arg) {
                self.failureProxyCallback('searchCompanyName', arg);
            });
        };

        //Gets the Sales Order Claim
        SalesOrderClient.prototype.getSalesOrderClaim = function (bolNo, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderClaim/?bolNo=' + bolNo;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderClaim', arg);
                faliureCallBack();
            });
        };

        // To get Multileg Details
        SalesOrderClient.prototype.getMultilegDetails = function (shipmentId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetMultilegDetailsBySalesOrderId/?shipmentId=' + shipmentId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetMultilegDetails', arg);
                faliureCallBack();
            });
        };

        // To Save Sales Order Details
        SalesOrderClient.prototype.SaveSalesOrderDetail = function (salesOrderContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveSalesOrderDetail", salesOrderContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveSalesOrderDetail', message);
            });
        };

        // To Save Sales Order Notes Details
        SalesOrderClient.prototype.SaveSalesOrderNotesDetail = function (salesOrderNotesContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveSalesOrderNotesDetail", salesOrderNotesContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveSalesOrderNotesDetail', message);
            });
        };

        //## Service to get the history of the sales order#/
        SalesOrderClient.prototype.GetShipmentHistoryByShipmentId = function (salesOrderId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (salesOrderId) {
                ajax.get("Accounting/GetShipmentHistoryByShipmentId/" + salesOrderId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
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
        };

        SalesOrderClient.prototype.GetShipmentHistoryHeaderDetailsByShipmentId = function (salesOrderId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (salesOrderId) {
                ajax.get("Accounting/GetShipmentHistoryHeaderDetailsByShipmentId/" + salesOrderId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetShipmentHistoryHeaderDetailsByShipmentId', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Sales order ID is zero.");
            }
        };

        //## Service to get the history details of the sales order#/
        SalesOrderClient.prototype.GetShipmentHistoryDetailsByShipmentId = function (salesOrderId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (salesOrderId) {
                ajax.get("Accounting/GetShipmentHistoryDetailsByShipmentId/" + salesOrderId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetShipmentHistoryDetailsByShipmentId', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Vendor bill ID is zero.");
            }
        };

        //## Service to get vendor bill item for invoice resolution#/
        SalesOrderClient.prototype.GetVendorBillItemsForInvoiceResolution = function (salesOrderId, successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (salesOrderId) {
                ajax.get("Accounting/GetVendorBillItemsForInvoiceResolution/" + salesOrderId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillItemsForInvoiceResolution', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Vendor bill ID is zero.");
            }
        };

        //## Service to get vendor bill addresses for invoice resolution#/
        SalesOrderClient.prototype.GetVendorBillAddressForInvoiceResolution = function (vendorBillId, successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillId) {
                ajax.get("Accounting/GetVendorBillAddressForInvoiceResolution/" + vendorBillId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillAddressForInvoiceResolution', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Vendor bill ID is zero.");
            }
        };

        // gets the model after uploading the file
        SalesOrderClient.prototype.SendAgentNotificationMail = function (sendAgentNotificationMailDetail, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/SendAgentNotificationMailDetail';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, sendAgentNotificationMailDetail).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('SendAgentNotificationMail', arg);
                failCallBack(arg);
            });
        };

        // To Save Sales Order Details
        SalesOrderClient.prototype.CopySalesOrderDetail = function (salesOrderContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/CopySalesOrderDetail", salesOrderContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('CopySalesOrderDetail', message);
            });
        };

        // To Cancel SalesOrder
        SalesOrderClient.prototype.cancelSalesOrder = function (shipmentId, updatedDateTime, orderStatus, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/CancelSalesOrder/?shipmentId=' + shipmentId + '&updatedDateTime=' + updatedDateTime + '&orderStatus=' + orderStatus;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('cancelSalesOrder', arg);

                // ###START: DE20779
                faliureCallBack(arg);
                // ###END: DE20779
            });
        };

        // To Un Cancel SalesOrder
        SalesOrderClient.prototype.UnCancelSalesOrder = function (shipmentId, updatedDateTime, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/UnCancelSalesOrder/?shipmentId=' + shipmentId + '&updatedDateTime=' + updatedDateTime;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('UnCancelSalesOrder', arg);

                // ###START: DE20779
                faliureCallBack(arg);
                // ###END: DE20779
            });
        };

        // To get Requote Reason codes
        SalesOrderClient.prototype.GetRequoteReasonCodes = function (successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetRequoteReasonCodes';
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetRequoteReasonCodes', arg);
                faliureCallBack();
            });
        };

        // To get Requote Reason codes
        SalesOrderClient.prototype.GetAgentDisputes = function (shipmentId, vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetAgentDisputes/?shipmentId=' + shipmentId + '&vendorBillId=' + vendorBillId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetAgentDisputes', arg);
                faliureCallBack();
            });
        };
        SalesOrderClient.prototype.getInvoiceExceptionDetails = function (shipmentId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetInvoiceExceptionDetailsBySalesOrderId/?shipmentId=' + shipmentId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('getInvoiceExceptionDetails', arg);
                faliureCallBack();
            });
        };

        // Force Invoice Reason
        SalesOrderClient.prototype.forceInvoiceShipment = function (requestParameter, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/ForceInvoiceShipment';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, requestParameter).done(function (data) {
                successCallBack(data);
            }).fail(function (data) {
                self.failureProxyCallback('forceInvoiceShipment', data);
                failCallBack(data);
            });
        };

        // To SalesOrder Rebill
        SalesOrderClient.prototype.GetSalesOrderRebill = function (salesOrderId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderRebill/?salesOrderId=' + salesOrderId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderRebill', arg);
                faliureCallBack();
            });
        };

        // To save Rebill Details
        // To Save Sales Order Details
        SalesOrderClient.prototype.SaveSalesOrderRebillDetail = function (salesOrderRebillContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveRebillDetail", salesOrderRebillContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveSalesOrderRebillDetail', message);
            });
        };

        // To Save Sales Order Details
        SalesOrderClient.prototype.SaveAgentDispute = function (agentDisputeDetails, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveAgentDispute", agentDisputeDetails).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveAgentDispute', message);
            });
        };

        // To Save Sales Order Details
        SalesOrderClient.prototype.SaveSalesOrderDisputeVBDetails = function (salesOrderDisputeVendorBillContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveSalesOrderDisputeVBDetails", salesOrderDisputeVendorBillContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveSalesOrderDisputeVBDetails', message);
            });
        };

        //##START: US20961
        // To save dispute status for VBs that are already in mas
        SalesOrderClient.prototype.SaveDisputeStatusFromSalesOrder = function (salesOrderDisputeVendorBillContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveDisputeStatusFromSalesOrder", salesOrderDisputeVendorBillContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveDisputeStatusFromSalesOrder', message);
            });
        };

        //##END: US20961
        // To SalesOrder Dispute
        SalesOrderClient.prototype.GetMultipleVendorBillDetailsForIterm = function (salesOrderId, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/GetMultipaleVendorBillDetailsForIterm/?shipmentId=' + salesOrderId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetMultipaleVendorBillDetailsForIterm', arg);
                failureCallBack();
            });
        };

        SalesOrderClient.prototype.searchAutoCompleteCompanyDetails = function (startValue, customerId, successCallBack) {
            var self = this;
            var url = "Accounting/GetCompanyAddressDetailsByCustomerId";

            var _searchValue = new SearchModel(startValue);
            _searchValue.CustomerId = customerId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, _searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refSearchSalesOrderAddress.Models.SalesOrderAddress(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.failureProxyCallback('searchAutoCompleteCompanyDetails', arg);
            });
        };

        // To SalesOrder GetFAKDetails
        SalesOrderClient.prototype.GetFAKDetails = function (carrierId, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/GetFAKDetailsByCarrierId/?carrierId=' + carrierId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetFAKDetails', arg);
                failureCallBack();
            });
        };

        // To Save FAK Details
        SalesOrderClient.prototype.SaveFAKSetup = function (auditSettingContainer, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveFAKMappingSetup", auditSettingContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                failureCallBack(message);
                self.failureProxyCallback('SaveFAKSetup', message);
            });
        };

        // To Get SalesOrder Audited bill detail
        SalesOrderClient.prototype.GetSalesOrderAuditedBillDetailByVendorBillId = function (vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderAuditedBillDetailByVendorBillId/?vendorBillId=' + vendorBillId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetSalesOrderAuditedBillDetailByVendorBillId', arg);
                faliureCallBack();
            });
        };

        // To Revert Sales Order Scheduled To Pending
        SalesOrderClient.prototype.MakeSoScheduledToPending = function (shipmentId, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/MakeSoScheduledToPending/?shipmentId=' + shipmentId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('MakeSoScheduledToPending', arg);
                failureCallBack();
            });
        };

        // To Send Invoice
        SalesOrderClient.prototype.ScheduleInvoice = function (salesOrderContainer, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/SalesOrderScheduleInvoice';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, salesOrderContainer).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('ScheduleInvoice', arg);
                failureCallBack(arg);
            });
        };

        // To Save Schedule Invoice
        SalesOrderClient.prototype.SaveScheduleInvoiceZeroRevenue = function (scheduleInvoiceContainer, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/SaveScheduleInvoiceZeroRevenue';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, scheduleInvoiceContainer).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('SaveScheduleInvoiceZeroRevenue', arg);
                failureCallBack(arg);
            });
        };

        // To Save Schedule Invoice SaveScheduleInvoiceWithRevenueAdjustment
        SalesOrderClient.prototype.SaveScheduleInvoiceWithRevenueAdjustment = function (scheduleInvoiceContainer, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/SaveScheduleInvoiceWithRevenueAdjustment';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, scheduleInvoiceContainer).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('SaveScheduleInvoiceZeroRevenue', arg);
                failureCallBack(arg);
            });
        };

        // Get MAS Customer Fields based on Customer Id
        SalesOrderClient.prototype.GetMasCustomerFields = function (CustomerId, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/GetMASCustomerFields/?customerId=' + CustomerId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetMasCustomerFields', arg);
                failureCallBack(arg);
            });
        };

        // To set order status as shipment finalized
        SalesOrderClient.prototype.SetFinalize = function (salesOrderFinalizeDetails, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SetSalesOrderFinalized", salesOrderFinalizeDetails).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                failureCallBack(message);
                self.failureProxyCallback('SetFinalize', message);
            });
        };

        SalesOrderClient.prototype.GetSalesOrderFinancialDetailsOnSubscribe = function (salesOrderFinancialDetails, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/GetSalesOrderFinancialDetailsOnSubscribe", salesOrderFinancialDetails).done(function (data) {
                successCallBack(data);
            }).fail(function (message) {
                failureCallBack(message);
                self.failureProxyCallback('GetSalesOrderFinancialDetailsOnSubscribe', message);
            });
        };

        //## Service to get the history details of the sales order by Version Id#/
        SalesOrderClient.prototype.GetShipmentHistoryDetailsByVersionId = function (salesOrderId, VersionId, headerType, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var url = 'Accounting/GetShipmentHistoryDetailsByVersionId/?salesOrderId=' + salesOrderId + '&versionId=' + VersionId + '&tabType=' + headerType;
            if (VersionId) {
                ajax.get(url).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetShipmentHistoryDetailsByVersionId', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("VersionId ID is zero.");
            }
        };

        /*
        ** Gets the response after uploading the CSV
        */
        ///	<createDetails>
        /// <id>US19882</id> <by>Shreesha Adiga</by> <date>23-12-2015</date>
        /// </createDetails>
        SalesOrderClient.prototype.GetSalesOrderUploadResponce = function (uploadedItem, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/SalesOrderCSVUpload';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (uploadedItem) {
                ajax.post(url, uploadedItem).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    faliureCallBack(message);
                    self.failureProxyCallback('GetSalesOrderUploadResponce', message);
                });
            }
        };

        /// Submit grid rows and get back the invalid rows, and uploaded row count as response
        ///	<createDetails>
        /// <id>US19882</id> <by>Shreesha Adiga</by> <date>23-12-2015</date>
        /// </createDetails>
        SalesOrderClient.prototype.GetSalesOrderUploadResponseAfterSubmitFromGrid = function (uploadedFileDetails, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderUploadResponseAfterSubmitFromGrid';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (uploadedFileDetails) {
                ajax.post(url, uploadedFileDetails).done(function (response) {
                    successCallBack(response);
                }).fail(function (message) {
                    faliureCallBack(message);
                    self.failureProxyCallback('GetSalesOrderUploadResponseAfterSubmitFromGrid', message);
                });
            }
        };

        /// Get the credit memo details on click of the tab
        ///	<createDetails>
        /// <id>US20288</id> <by>Shreesha Adiga</by> <date>14-01-2016</date>
        /// </createDetails>
        SalesOrderClient.prototype.GetCreditMemoDetails = function (bolNumber, successCallBack, faliureCallBack) {
            var self = this;

            var url = 'Accounting/GetCreditMemoDetails/?bolNumber=' + bolNumber;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetCreditMemoDetails', arg);
                faliureCallBack();
            });
        };

        //#endregion
        //#region Private Methods
        // For Log the Error record
        SalesOrderClient.prototype.failureProxyCallback = function (context, error) {
            if (error.responseText) {
                if (error.responseText.indexOf("HTTP_STATUS_CODE:401") != -1) {
                    refSystem.log(error.responseText, error, context + ' error callback');
                    return;
                }
            }

            try  {
                var errorDetails = JSON.parse(error.responseText);
                if (error) {
                    refSystem.log(errorDetails.Message, error, context + ' error callback');
                    return;
                } else {
                    refSystem.log(errorDetails.responseText, error, context + ' error callback');
                    return;
                }
            } catch (err) {
                var status = error.status;
                var statusText = error.statusText;
                refSystem.log((status ? error.status + ': ' : 'Error : ') + (statusText ? error.statusText : ''), error, context + ' failure/error callback');
                return;
            }
        };
        return SalesOrderClient;
    })();
    exports.SalesOrderClient = SalesOrderClient;

    var SearchModel = (function () {
        function SearchModel(searchValue, PageNumber, PageSize) {
            this.SearchValue = searchValue;
            this.PageNumber = PageNumber;
            this.PageSize = PageSize;
        }
        return SearchModel;
    })();
    exports.SearchModel = SearchModel;
});
