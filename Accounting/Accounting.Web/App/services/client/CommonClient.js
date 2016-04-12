//#region Refrences
/// <reference path="../../../Scripts/TypeDefs/Simplex.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../models/TypeDefs/TransactionSearchModel.d.ts" />
//#endregion
define(["require", "exports", 'services/models/common/MapLocation', 'durandal/system', 'services/models/common/searchVendorName', 'services/models/common/searchUserName', 'services/models/common/searchMasCarrier', 'services/models/common/searchAddressBook', 'services/models/common/searchCustomerName'], function(require, exports, __refMapLocation__, __refSystem__, __refVendorNameSearch__, __refUserNameSearch__, __reMasCarrierSearch__, __refAddressBookSearch__, __refCustomerNameSearch__) {
    //#region Import
    var refMapLocation = __refMapLocation__;
    var refSystem = __refSystem__;
    
    var refVendorNameSearch = __refVendorNameSearch__;
    var refUserNameSearch = __refUserNameSearch__;
    var reMasCarrierSearch = __reMasCarrierSearch__;
    var refAddressBookSearch = __refAddressBookSearch__;
    var refCustomerNameSearch = __refCustomerNameSearch__;
    
    

    //#endregion
    /*
    ** <summary>
    ** Common client View Model to call common method.
    ** </summary>
    ** <createDetails>
    ** <id></id> <by></by> <date></date>
    ** </createDetails>
    ** <changeHistory>
    ** <id>US20352</id> <by>Chandan Singh Bajetha</by> <date>14-01-2016</date> <description>Acct: Adjust UI for Dispute Notes Tab in Vendor Bill</description>
    ** </changeHistory>
    */
    var Common = (function () {
        function Common() {
        }
        //#region Public Methods
        // For Search location on the based of zip codes, state and city
        Common.prototype.SearchLocation = function (startValue, topCount, zipCodes, isMexico, successCallBack) {
            var self = this;
            var url = isMexico ? ('Accounting/common/SearchMexicoLocation/?startValue=' + startValue + '&topCount=' + topCount + '&zipCodes=' + zipCodes) : ('Accounting/common/SearchLocation/?startValue=' + startValue + '&topCount=' + topCount + '&zipCodes=' + zipCodes);

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refMapLocation.Models.MapLocation(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.FailureProxyCallback('SearchLocation', arg);
            });
        };

        Common.prototype.searchVendorName = function (startValue, successCallBack) {
            var self = this;
            var url = "Accounting/GetVendors";

            var _searchValue = new SearchModel(startValue);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, _searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refVendorNameSearch.Models.VendorNameSearch(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.FailureProxyCallback('searchVendorName', arg);
            });
        };

        // For Search Transaction
        Common.prototype.searchHeaderTransaction = function (searchData, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/GetHeaderTransactionResponse";

            var _searchValue = new SearchModel(searchData);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, _searchValue).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetHeaderTransactionResponse', arg);
            });
        };

        /*
        // Gets the users by the given keywords
        */
        Common.prototype.searchUsers = function (startValue, successCallBack) {
            var self = this;
            var url = "Accounting/GetUserDetailsByUserName";

            var searchValue = new SearchModel(startValue);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refUserNameSearch.Models.UserNameSearch(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.FailureProxyCallback('searchUserName', arg);
            });
        };

        /*
        // Gets the MAS Carriers by the given keywords
        */
        Common.prototype.searchMasCarriers = function (startValue, successCallBack) {
            var self = this;
            var url = "Accounting/SearchMasCarriersByInitials";

            var searchValue = new SearchModel(startValue);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new reMasCarrierSearch.Models.MasCarrierSearch(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.FailureProxyCallback('searchUserName', arg);
            });
        };

        //Gets the Address Book based on customer Id
        Common.prototype.searchCustomerAddressBook = function (startValue, customerId, successCallBack) {
            var self = this;
            var url = "Accounting/GetCustomerBillToAddressByCustomerId";
            var searchValue = new SearchModel(startValue, customerId);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refAddressBookSearch.Models.AddressBookSearch(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.FailureProxyCallback('searchCustomerAddressBook', arg);
            });
        };

        Common.prototype.GetCurrentUser = function (successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            if (true) {
                ajax.get('Accounting/GetCurrentUser').done(function (data) {
                    successCallBack(data);
                }).fail(function (arg) {
                    failureCallBack();
                    self.FailureProxyCallback('GetCustomerDetails', arg);
                });
            }
        };

        Common.prototype.GetCurrentCustomerResourceSettings = function (successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get('Accounting/GetCurrentCustomerLogicalResource').done(function (data) {
                successCallBack(Object.freeze(data));
            }).fail(function (arg) {
                if (failureCallBack) {
                    failureCallBack();
                }
                self.FailureProxyCallback('GetCurrentCustomerLogicalResource', arg);
            });
        };

        Common.prototype.SendEmail = function (EmailDetails, successCallBack, failureCallBack) {
            var self = this;

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post("Accounting/user/SendSalesOrderAgentEmail", EmailDetails).done(function (message) {
                successCallBack(message);
            }).fail(function (message) {
                if (failureCallBack) {
                    failureCallBack();
                }
                self.FailureProxyCallback('SendSalesOrderAgentEmail', message);
            });
        };

        /// Loaded the ENUM values
        /// parameter: success callback, and failed call back
        Common.prototype.GetEnums = function (successCallBack) {
            var self = this;
            var url = 'Accounting/LoadEnums';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetEnums', arg);
            });
        };

        /// Loaded the all the types of shipment
        /// parameter: success callback, and failed call back
        Common.prototype.GetListShipmentType = function (successCallBack) {
            var self = this;
            var url = 'Accounting/ListShipmentType';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetEnums', arg);
            });
        };

        Common.prototype.GetOfficesForLoggedInUser = function (successCallback, failureCallback) {
            var self = this;
            var url = 'Accounting/Common/OfficesForLoggedInUser';
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallback(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('SearchLocation', arg);
                failureCallback();
            });
        };

        /// Loaded the all the types of bill status
        /// parameter: success callback, and failed call back
        Common.prototype.GetVendorBillStatusList = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetVendorBillStatusList';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetVendorBillStatusList', arg);
            });
        };

        /*
        *-- Executes any kind of URL and gives the result back
        */
        Common.prototype.ExecuteURL = function (url, successCallBack, failCallBack) {
            var self = this;
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (errorMessage) {
                self.FailureProxyCallback('searchCustomers', errorMessage);
            });
        };

        /*
        // Gets the customers by the given keywords
        */
        Common.prototype.searchCustomers = function (startValue, successCallBack) {
            var self = this;
            var url = "Accounting/GetCustomerDetails";

            var searchValue = new SearchModel(startValue);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchValue).done(function (data) {
                var result = data;
                var newItems = ko.utils.arrayMap(result, function (item) {
                    return new refCustomerNameSearch.Models.CustomerNameSearch(item);
                });
                successCallBack(newItems);
            }).fail(function (arg) {
                self.FailureProxyCallback('searchCustomers', arg);
            });
        };

        Common.prototype.searchBolAndPro = function (startValue, successCallBack, failCallBack) {
            var self = this;
            var url = "Accounting/GetHeaderTransactionResponse";
            var searchValue = new SearchModel(startValue);
            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchValue).done(function (data) {
                var result = [];

                var vendorBillResult = $.map(data.VendorBillSearchResults, function (value, Key) {
                    var valueBolWithoutNull = value.BOLNumber ? (' - ' + value.BOLNumber) : '';
                    var valueCost = ' - ' + '$' + value.Amount;
                    return {
                        PRONumber: value.PRONumber,
                        VendorBillId: value.VendorBillId,
                        Display: '<span class=\'clickable-item\'>#' + value.PRONumber + ' (' + value.BillStatusDisplay + ')' + valueBolWithoutNull + valueCost + '</span>',
                        //Display: '#' + value.PRONumber + ' (' + value.BillStatusDisplay +')' + valueBolWithoutNull,
                        FilterDisplay: undefined,
                        IsPurchaseOrder: value.IsPurchaseOrder
                    };
                });

                var salesOrderResult = $.map(data.SalesOrderSearchResults, function (value, Key) {
                    var valuePROWithoutNull = value.PRONumber ? (' - ' + value.PRONumber) : '';
                    return {
                        BOLNumber: value.BOLNumber,
                        ShipmentId: value.ShipmentId,
                        Display: '<span class=\'clickable-item\'>#' + value.BOLNumber + ' (' + value.ProcessStatusDisplay + ')' + valuePROWithoutNull + '</span>',
                        //Display: '#' + value.BOLNumber + ' (' + value.ProcessStatusDisplay + ')' + valuePROWithoutNull,
                        FilterDisplay: undefined
                    };
                });

                var edi210Result = $.map(data.Edi210SearchResults, function (value, Key) {
                    if (value.ExceptionRuleId === 2)
                        value.ExceptionDescription = "Duplicate PRO";
else if (value.ExceptionRuleId === 3)
                        value.ExceptionDescription = "Corrected";

                    return {
                        PRONumber: value.ProNumber,
                        ExceptionRuleId: value.ExceptionRuleId,
                        BatchId: value.BatchId,
                        EDIDetailID: value.EDIDetailID,
                        Display: value.ExceptionDescription ? '<span class=\'clickable-item\'> #' + value.ProNumber + ' (' + value.ExceptionDescription + ') </span>' : '<span class=\'non-clickable-item\'> #' + value.ProNumber + ' (Database) </span>',
                        //Display: '#' + value.ProNumber + ' (' + (value.ExceptionDescription ? value.ExceptionDescription : 'Database') + ')',
                        FilterDisplay: undefined
                    };
                });

                if (vendorBillResult && vendorBillResult.length) {
                    result.push({ category: 'Vendor Bill', items: vendorBillResult });
                }

                if (salesOrderResult && salesOrderResult.length) {
                    result.push({ category: 'Sales Order', items: salesOrderResult });
                }

                if (edi210Result && edi210Result.length) {
                    result.push({ category: 'EDI', items: edi210Result });
                }

                successCallBack(result);
            }).fail(function (arg) {
                self.FailureProxyCallback('searchBolAndPro', arg);
            });
        };

        // get the status list for transaction search
        Common.prototype.getStatusListForTransactionSearch = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetStatusListForTransactionSearch';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetStatusListForTransactionSearch', arg);
            });
        };

        // For Transaction Search
        Common.prototype.getTransactionSearchResponse = function (searchRequest, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/GetTransactionSearchResponse";

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, searchRequest).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('GetTransactionSearchResponse', arg);
            });
        };

        //#region Admin Menu calls
        // Getting the payment details from service
        Common.prototype.getOnlinePaymentDetail = function (successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/GetOnlinePaymentDetail";

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('GetOnlinePaymentDetail', arg);
            });
        };

        // Saves the the payment details to the database
        Common.prototype.updateCompanyPaymentConfigurations = function (model, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/UpdateCompanyPaymentConfigurations";

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, model).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('updateCompanyPaymentConfigurations', arg);
            });
        };

        // Saves the the payment details to the database
        Common.prototype.updateCustomerPaymentConfigurations = function (model, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/UpdateCustomerPaymentConfigurations";

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, model).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('updateCustomerPaymentConfigurations', arg);
            });
        };

        // This service call gets all the customers by Agency id
        Common.prototype.getCustomersByAgencyId = function (agencyId, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/GetCustomersByAgencyId/" + agencyId.toString();

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('GetCustomersByAgencyId', arg);
            });
        };

        // This service call gets all the customers by Agency id
        Common.prototype.getAgencyOnlinePaymentSettings = function (agencyId, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/GetAgencyOnlinePaymentSettings/" + agencyId.toString();

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('GetAgencyOnlinePaymentSettings', arg);
            });
        };

        // Saves the the payment details to the database
        Common.prototype.deleteCustomerPaymentConfigurations = function (model, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/DeleteCustomerPaymentConfigurations";

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, model).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                faliureCallBack();
                self.FailureProxyCallback('deleteCustomerPaymentConfigurations', arg);
            });
        };

        /// Saves the grid setting foe the user and selected view
        Common.prototype.SaveUserGridSettings = function (data, successCallBack, faliureCallBack) {
            var self = this;
            var url = "Accounting/SaveUserGridSettings";

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, data).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('SaveUserGridSettings', arg);
            });
        };

        Common.prototype.GetUserGridSettings = function (viewId, successCallBack) {
            var self = this;
            var url = "Accounting/GetUserGridSettings/" + viewId.toString();

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetUserGridSettings', arg);
            });
        };

        /// parameter: success callback, and failed call back
        Common.prototype.IsHoliday = function (successCallBack) {
            var self = this;
            var url = 'Accounting/IsTodayHoliday';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('IsTodayHoliday', arg);
            });
        };

        //<changeHistory>
        // <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
        //</changeHistory>
        Common.prototype.GetNumberOfPOsCreatedPerDay = function (dateRange, successcallBack, failureBack) {
            var self = this;
            var url = 'Accounting/GetNumberOfPOsCreatedPerDay';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, dateRange).done(function (data) {
                successcallBack(data);
            }).fail(function (arg) {
                failureBack(arg);
                self.FailureProxyCallback('GetNumberOfPOsCreatedPerDay', arg);
            });
        };

        // <createDetails>
        // <id>US19762</id> <by>Baldev Singh Thakur</by> <date>07-12-2015</date> <description>Inserting data to track Re-quote/Suborder on dashboard.</description>
        // </createDetails>
        Common.prototype.GetNumberOfRequoteSuborderCountPerDay = function (successcallBack) {
            var self = this;
            var url = 'Accounting/GetNumberOfRequoteSuborderCountPerDay';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successcallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetNumberOfRequoteSuborderCountPerDay', arg);
            });
        };

        // <createdDetails>
        // <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
        // </createdDetails>
        Common.prototype.GetNumberOfRequoteCountPerDay = function (dateRange, successcallBack, failureBack) {
            var self = this;
            var url = 'Accounting/GetNumberOfRequoteCountPerDay';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, dateRange).done(function (data) {
                successcallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetNumberOfRequoteCountPerDay', arg);
            });
        };

        // <createdDetails>
        // <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
        // </createdDetails>
        Common.prototype.GetNumberOfSuborderCountPerDay = function (dateRange, successcallBack, failureBack) {
            var self = this;
            var url = 'Accounting/GetNumberOfSuborderCountPerDay';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.post(url, dateRange).done(function (data) {
                successcallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetNumberOfSuborderCountPerDay', arg);
            });
        };

        // ###START: US20352
        // Loaded the all the types of shipment
        // parameter: success callback, and failed call back
        Common.prototype.GetListDisputeStatus = function (successCallBack) {
            var self = this;
            var url = 'Accounting/GetListDisputeStatus';

            var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
            ajax.get(url).done(function (data) {
                successCallBack(data);
            }).fail(function (arg) {
                self.FailureProxyCallback('GetEnums', arg);
            });
        };

        // ###END: US20352
        //#endregion Admin Menu calls
        //#region Private Methods
        // For Log the Error record
        Common.prototype.FailureProxyCallback = function (context, error) {
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
        return Common;
    })();
    exports.Common = Common;

    var SearchModel = (function () {
        function SearchModel(searchValue, customerId) {
            this.SearchValue = searchValue;
            this.CustomerId = customerId;
        }
        return SearchModel;
    })();
});
