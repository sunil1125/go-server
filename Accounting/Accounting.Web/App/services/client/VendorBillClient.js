/* File Created : April 10, 2014
** Created By Achal Rastogi
*/
define(["require", "exports", 'services/models/vendorBill/VendorBillSearchResult', 'durandal/system', 'durandal/app'], function(require, exports, __refVendorBillSearchRes__, __refSystem__, ___app__) {
    
    
    var refVendorBillSearchRes = __refVendorBillSearchRes__;
    var refSystem = __refSystem__;
    var _app = ___app__;

    //#endregion
    var VendorBillClient = (function () {
        function VendorBillClient() {
        }
        //#region Public Methods
        //For Search Vendor Detail on the based od Vendor Name
        VendorBillClient.prototype.searchSalesOrderByBOL = function (proNo, carrierId, bolNo, vendorBillId, successCallBack) {
            var self = this;
            var url = 'Accounting/GetSalesOrderDetailByBOL/?proNo=' + proNo + '&carrierId=' + carrierId + '&bolNo=' + bolNo + '&vendorBillId=' + vendorBillId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                var result = data;

                //var newItems = ko.utils.arrayMap(result, function (item) {
                //    return new refVendorBillAddress.Models.VendorBillAddress(item);
                //});
                successCallBack(result);
            }).fail(function (arg) {
                self.failureProxyCallback('searchSalesOrderByBOL', arg);
            });
        };

        //To Check if Pro no Exists
        VendorBillClient.prototype.getExistingProNo = function (bolNo, successCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get("Accounting/GetExistingProNo/?bolNo=" + bolNo).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('getExistingProNo', arg);
            });
        };

        VendorBillClient.prototype.searchVendorBill = function (vendorBillSearch, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillSearchResults';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, vendorBillSearch).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refVendorBillSearchRes.Models.VendorBillSearchResult(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.failureProxyCallback('searchVendorBill', arg);
                faliureCallBack();
            });
        };

        //for quick search
        VendorBillClient.prototype.quickSearchVendorBill = function (vendorBillSearch, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillQuickSearchResult';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, vendorBillSearch).done(function (data) {
                //var result: any = data;
                //var newItems = ko.utils.arrayMap(result, function (item) {
                //	return new refVendorBillSearchRes.Models.VendorBillSearchResult(item);
                //});
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('quickSearchVendorBill', arg);
                faliureCallBack();
            });
        };

        //#region Save vendor Bill
        VendorBillClient.prototype.SaveVendorBillDetail = function (VendorBillContainer, successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveVendorBillDetail", VendorBillContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                if (failureCallBack) {
                    failureCallBack(message);
                }
                self.failureProxyCallback('SaveVendorBillDetail', message);
            });
        };

        // call servise to create dispute lost bill
        VendorBillClient.prototype.CreateDisputeLostBill = function (VendorBillContainer, successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/CreateDisputeLostBill", VendorBillContainer).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                if (failureCallBack) {
                    failureCallBack();
                }
                self.failureProxyCallback('CreateDisputeLostBill', arg);
            });
        };

        //#endregion Save Vendor Bill
        //#region Load Vendor Bill Details
        // Get the vendor bill details by vendor bill id
        VendorBillClient.prototype.getVendorBillDetailsByVendorBillId = function (vendorBillId, successCallBack, faliureCallBack, isSubBill) {
            if (typeof isSubBill === "undefined") { isSubBill = false; }
            var self = this;
            var url = 'Accounting/GetVendorBillDetailsByVendorBillId/?vendorBillId=' + vendorBillId + '&isSubBill=' + isSubBill;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('getVendorBillDetailsByVendorBillId', arg);
            });
        };

        // Get the vendor bill Financial details by vendor bill id
        VendorBillClient.prototype.getVendorBillFinancialDetailsByVendorBillId = function (vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillFinancialDetailsByVendorBillId/?vendorBillId=' + vendorBillId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('getVendorBillFinancialDetailsByVendorBillId', arg);
            });
        };

        VendorBillClient.prototype.getShipmentRelatedLinks = function (bolNumber, vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetShipmentRelatedLinks/?bolNumber=' + bolNumber + '&vendorBillId=' + vendorBillId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('getShipmentRelatedLinks', arg);
            });
        };

        //Get CustomerMain Id and Term Type
        VendorBillClient.prototype.getCustomerTypeAndMasterCustomerId = function (customerId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetCustomerTypeAndMasterCustomerId/?customerId=' + customerId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('getCustomerTypeAndMasterCustomerId', arg);
            });
        };

        VendorBillClient.prototype.getVendorBillMasNoteDetails = function (vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetMasNotes/?vendorBillId=' + vendorBillId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('GetMasNotes', arg);
            });
        };

        VendorBillClient.prototype.getShipmentPaymentDetails = function (type, vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetCreditDebits/?type=' + type + '&vendorBillId=' + vendorBillId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('GetMasNotes', arg);
            });
        };

        //## Service to get all Vendor bill Exceptions. #/
        /// parameter: success callback, and failed call back
        VendorBillClient.prototype.getVendorBillExceptions = function (searchFilter, successCallBack, faliureCallBack, PagingData) {
            var self = this;
            var url = 'Accounting/GetVendorBillExceptions';
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchFilter).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('GetVendorBillExceptions', arg);
            });
        };

        //## Service to get all purchase orders list. #/
        VendorBillClient.prototype.getPurchaseOrdersDetails = function (searchFilter, successCallBack, faliureCallBack, PagingData) {
            var self = this;
            var url = 'Accounting/GetPurchaseOrdersBoardDetails';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            ajax.post(url, searchFilter).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('GetPurchaseOrdersBoardDetails', arg);
            });
        };

        //## Service to Move the VendorBills into MAS. #/
        VendorBillClient.prototype.ForcePushToMAS = function (vendorBillIds, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            ajax.get("Accounting/ForcePushToMAS?vendorBillId=" + vendorBillIds).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                if (failureCallBack) {
                    failureCallBack(message);
                }
                self.failureProxyCallback('ForcePushToMAS', message);
            });
        };

        //## Service to get the history of the vendor bill#/
        VendorBillClient.prototype.GetVendorBillHistoryDetailsByVendorBillId = function (vendorBillId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillId) {
                ajax.get("Accounting/GetVendorBillHistoryDetailsByVendorBillId/" + vendorBillId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillHistoryDetailsByVendorBillId', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Vendor bill ID is zero.");
            }
        };

        //## Service to get the Exception Rule And Resolution of the vendor bill#/
        VendorBillClient.prototype.GetVendorBillExceptionRulesAndResolution = function (vendorBillId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillId) {
                ajax.get("Accounting/GetVendorBillExceptionRulesAndResolution/" + vendorBillId).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillExceptionRulesAndResolution', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Vendor bill ID is zero.");
            }
        };

        //## Service to get the history of the vendor bill#/
        VendorBillClient.prototype.GetVendorBillHistoryByVendorBillId = function (vendorBillId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillId) {
                ajax.get("Accounting/GetVendorBillHistoryByVendorBillId/" + vendorBillId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
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
        };

        //## Service to get the history of the vendor bill#/
        VendorBillClient.prototype.GetVendorBillHistoryHeaderDetailsByVendorBillId = function (vendorBillId, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillId) {
                ajax.get("Accounting/GetVendorBillHistoryHeaderDetailsByVendorBillId/" + vendorBillId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillHistoryHeaderDetailsByVendorBillId', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("Vendor bill ID is zero.");
            }
        };

        // Gets the vendor bill items for dispute lost
        VendorBillClient.prototype.getvendorBillItems = function (vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillId) {
                ajax.get("Accounting/GetVendorBillItemsForDisputeLost/" + vendorBillId.toString()).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (successCallBack) {
                        faliureCallBack(message);
                    }
                    self.failureProxyCallback('ForcePushToMAS', message);
                });
            }

            if (faliureCallBack && typeof faliureCallBack === 'function') {
                faliureCallBack("Vendor bill ID is zero.");
            }
        };

        // Gets the vendor bill items for dispute lost
        VendorBillClient.prototype.saveVendorBillDisputeLostItems = function (vendorBillDisputeLostItem, successCallBack, faliureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (vendorBillDisputeLostItem) {
                ajax.post("Accounting/SaveVendorBillDisputeLostItems/", vendorBillDisputeLostItem).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (successCallBack) {
                        faliureCallBack(message);
                    }
                    self.failureProxyCallback('ForcePushToMAS', message);
                });
            }
        };

        // Gets the shipment link details
        VendorBillClient.prototype.getShipmentLinkDetails = function (shipmentLink, successCallBack, faliureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (shipmentLink) {
                ajax.post("Accounting/GetShipmentLinkDetails/", shipmentLink).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    faliureCallBack(message);
                    self.failureProxyCallback('GetShipmentLinkDetails', message);
                });
            }
        };

        //#endregion
        //
        VendorBillClient.prototype.getInvoiceHtmlBody = function (documentRequestModel, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetInvoiceAsHtmlBody';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, documentRequestModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('getInvoiceHtmlBody', arg);
                faliureCallBack(arg);
            });
        };

        /*
        ** Gets the updated data
        */
        VendorBillClient.prototype.GetUploadResponce = function (uploadedItem, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetUploadResponce';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (uploadedItem) {
                ajax.post(url, uploadedItem).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    faliureCallBack(message);
                    self.failureProxyCallback('GetShipmentLinkDetails', message);
                });
            }
        };

        VendorBillClient.prototype.GetUploadResponceByList = function (uploadedFileDetails, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetUploadResponseByList';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            if (uploadedFileDetails) {
                ajax.post(url, uploadedFileDetails).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    faliureCallBack(message);
                    self.failureProxyCallback('GetUploadResponseByList', message);
                });
            }
        };

        VendorBillClient.prototype.CreateVendorBillFromSalesOrder = function (salesOrderId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/CreateVendorBillFromSalesOrder/?salesOrderId=' + salesOrderId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('CreateVendorBillFromSalesOrder', arg);
            });
        };

        // Service to get the vendor bill dispute details
        VendorBillClient.prototype.getVendorBillDisputeDetails = function (vendorBillId, bolNumber, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillDisputeItemDetailsByVendorBillId/?vendorBillId=' + vendorBillId + '&bolNumber=' + bolNumber;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack(arg);
                self.failureProxyCallback('getVendorBillDisputeDetails', arg);
            });
        };

        // To Save Vendor Bill Notes Details
        VendorBillClient.prototype.SaveVendorBillNotesDetail = function (vendorBillNotesContainer, successCallBack, faliureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/SaveVendorBillNotesDetail", vendorBillNotesContainer).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                faliureCallBack(message);
                self.failureProxyCallback('SaveVendorBillNotesDetail', message);
            });
        };

        //#endregion
        // gets the model after uploading the file
        VendorBillClient.prototype.uploadAndGetUploadedResponse = function (uploadModel, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/SavePurchaseOrderUploadFileModel';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, uploadModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('SavePurchaseOrderUploadFileModel', arg);
                failCallBack();
            });
        };

        //Deletes the selected Sales Order POD Document
        VendorBillClient.prototype.deletePodDoc = function (documentId, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/DeleteVendorBillFile/?documentId=' + documentId;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, documentId).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('DeleteVendorBillFile', arg);
                failCallBack();
            });
        };

        //Updates the selected Sales Order POD Document
        VendorBillClient.prototype.updatePodDoc = function (uploadModel, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/UpdateVendorBillFile';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, uploadModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('UpdateVendorBillFile', arg);
                failCallBack();
            });
        };

        // gets the model after uploading the file
        VendorBillClient.prototype.getVendorBillPodDocDetails = function (salesOrderUploadFileModel, successCallBack, failCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillPodDocDetails';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, salesOrderUploadFileModel).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.failureProxyCallback('GetVendorBillPodDocDetails', arg);
                failCallBack();
            });
        };

        VendorBillClient.prototype.ForcePushBillToMas = function (vendorBillId, updatedDate, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/ForcePushBillToMas/?vendorBillId=' + vendorBillId + '&updatedDate=' + updatedDate;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                failureCallBack(arg);
                self.failureProxyCallback('ForcePushBillToMas', arg);
            });
        };

        VendorBillClient.prototype.RevertBillFromIdb = function (vendorBillId, updatedDate, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/RevertBillFromIdb/?vendorBillId=' + vendorBillId + '&updatedDate=' + updatedDate;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                failureCallBack(arg);
                self.failureProxyCallback('RevertBillFromIdb', arg);
            });
        };

        VendorBillClient.prototype.IsForceAttachingWithRexnorBol = function (bolNumber, successCallBack, failureCallBack) {
            var self = this;
            var url = 'Accounting/IsBolRelatedToLogOnUserRole/?bolNumber=' + bolNumber;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                failureCallBack(arg);
                self.failureProxyCallback('IsBolRelatedToLogOnUserRole', arg);
            });
        };

        //## Service to get the history details of the sales order by Version Id#/
        VendorBillClient.prototype.GetVendorBillHistoryDetailsByVersionId = function (vendorBillId, VersionId, headerType, successCallBack, failureCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var url = 'Accounting/GetVendorBillHistoryDetailsByVersionId/?vendorBillId=' + vendorBillId + '&versionId=' + VersionId + '&tabType=' + headerType;
            if (VersionId) {
                ajax.get(url).done(function (message) {
                    successCallBack(message);
                }).fail(function (message) {
                    if (failureCallBack) {
                        failureCallBack(message);
                    }
                    self.failureProxyCallback('GetVendorBillHistoryDetailsByVersionId', message);
                });
            }

            if (failureCallBack && typeof failureCallBack === 'function') {
                failureCallBack("VersionId ID is zero.");
            }
        };

        // Get the vendor bill details by vendor bill id
        VendorBillClient.prototype.getVendorBillDetailsForLostBill = function (vendorBillId, successCallBack, faliureCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillDetailsForLostBill/?vendorBillId=' + vendorBillId;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.failureProxyCallback('getVendorBillDetailsForLostBill', arg);
            });
        };

        //#endregion
        //#region Private Methods
        // For Log the Error record
        VendorBillClient.prototype.failureProxyCallback = function (context, error) {
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
        return VendorBillClient;
    })();
    exports.VendorBillClient = VendorBillClient;

    var SearchModel = (function () {
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
        function SearchModel(args) {
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
        return SearchModel;
    })();
    exports.SearchModel = SearchModel;
});
