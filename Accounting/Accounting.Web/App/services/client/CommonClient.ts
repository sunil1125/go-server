//#region Refrences
/// <reference path="../../../Scripts/TypeDefs/Simplex.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../models/TypeDefs/TransactionSearchModel.d.ts" />
//#endregion

//#region Import
import refMapLocation = require('services/models/common/MapLocation');
import refSystem = require('durandal/system');
import refEnums = require('services/models/common/Enums');
import refVendorNameSearch = require('services/models/common/searchVendorName');
import refUserNameSearch = require('services/models/common/searchUserName');
import reMasCarrierSearch = require('services/models/common/searchMasCarrier');
import refAddressBookSearch = require('services/models/common/searchAddressBook');
import refCustomerNameSearch = require('services/models/common/searchCustomerName');
import refSearch = require('services/models/common/SearchResponce');
import refDateRangeClient = require('services/models/common/DateRange');
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
export class Common {
	//#region Public Methods

	// For Search location on the based of zip codes, state and city
	public SearchLocation(startValue: string, topCount: number, zipCodes: boolean, isMexico: boolean, successCallBack: Function): any {
		var self = this;
		var url: string =
			isMexico ? ('Accounting/common/SearchMexicoLocation/?startValue=' + startValue + '&topCount=' + topCount + '&zipCodes=' + zipCodes)
			: ('Accounting/common/SearchLocation/?startValue=' + startValue + '&topCount=' + topCount + '&zipCodes=' + zipCodes);

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, function (item: refMapLocation.IMapLocation) {
					return new refMapLocation.Models.MapLocation(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.FailureProxyCallback('SearchLocation', arg);
			});
	}

	public searchVendorName(startValue: string, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetVendors";

		var _searchValue = new SearchModel(startValue);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, _searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, function (item: refVendorNameSearch.IVendorNameSearch) {
					return new refVendorNameSearch.Models.VendorNameSearch(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.FailureProxyCallback('searchVendorName', arg);
			});
	}

	// For Search Transaction
	public searchHeaderTransaction(searchData: string, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetHeaderTransactionResponse";

		var _searchValue = new SearchModel(searchData);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, _searchValue)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetHeaderTransactionResponse', arg);
			});
	}

	/*
	// Gets the users by the given keywords
	*/
	public searchUsers(startValue: any, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetUserDetailsByUserName";

		var searchValue = new SearchModel(startValue);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, (item: refUserNameSearch.IUserNameSearch) => {
					return new refUserNameSearch.Models.UserNameSearch(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.FailureProxyCallback('searchUserName', arg);
			});
	}

	/*
	  // Gets the MAS Carriers by the given keywords
	*/
	public searchMasCarriers(startValue: any, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/SearchMasCarriersByInitials";

		var searchValue = new SearchModel(startValue);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, (item: reMasCarrierSearch.IMasCarrierSearch) => {
					return new reMasCarrierSearch.Models.MasCarrierSearch(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.FailureProxyCallback('searchUserName', arg);
			});
	}

	//Gets the Address Book based on customer Id

	public searchCustomerAddressBook(startValue: any, customerId: number, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetCustomerBillToAddressByCustomerId";
		var searchValue = new SearchModel(startValue, customerId);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, (item: refAddressBookSearch.IShipmentAddressBook) => {
					return new refAddressBookSearch.Models.AddressBookSearch(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.FailureProxyCallback('searchCustomerAddressBook', arg);
			});
	}

	public GetCurrentUser(successCallBack?: (result: IUser) => void, failureCallBack?: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		if (true) {
			ajax.get('Accounting/GetCurrentUser')
				.done((data: IUser) => {
					successCallBack(data);
				})
				.fail((arg) => {
					failureCallBack();
					self.FailureProxyCallback('GetCustomerDetails', arg);
				});
		}
	}

	public GetCurrentCustomerResourceSettings(successCallBack: (result: Array<ILogicalResourceAccessRule>) => void, failureCallBack?: () => void) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get('Accounting/GetCurrentCustomerLogicalResource')
			.done((data: Array<ILogicalResourceAccessRule>) => {
				successCallBack(Object.freeze(data));
			})
			.fail((arg) => {
				if (failureCallBack) {
					failureCallBack();
				}
				self.FailureProxyCallback('GetCurrentCustomerLogicalResource', arg);
			});
	}

	public SendEmail(EmailDetails: any, successCallBack: Function, failureCallBack?: Function) {
		var self = this;

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		var ajax = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post("Accounting/user/SendSalesOrderAgentEmail", EmailDetails)
			.done(function (message) { successCallBack(message); })
			.fail(function (message) {
				if (failureCallBack) {
					failureCallBack();
				}
				self.FailureProxyCallback('SendSalesOrderAgentEmail', message);
			});
	}

	/// Loaded the ENUM values
	/// parameter: success callback, and failed call back
	public GetEnums(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/LoadEnums';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetEnums', arg);
			});
	}

	/// Loaded the all the types of shipment
	/// parameter: success callback, and failed call back
	public GetListShipmentType(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/ListShipmentType';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetEnums', arg);
			});
	}

	public GetOfficesForLoggedInUser(successCallback: Function, failureCallback: Function) {
		var self = this;
		var url: string = 'Accounting/Common/OfficesForLoggedInUser';
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallback(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('SearchLocation', arg);
				failureCallback();
			});
	}

	/// Loaded the all the types of bill status
	/// parameter: success callback, and failed call back
	public GetVendorBillStatusList(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetVendorBillStatusList';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetVendorBillStatusList', arg);
			});
	}

	/*
	*-- Executes any kind of URL and gives the result back
	*/
	public ExecuteURL(url: string, successCallBack: (string) => any, failCallBack: (string) => any) {
		var self = this;
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);

		ajax.get(url).done((data) => {
			successCallBack(data);
		}).fail((errorMessage) => {
				self.FailureProxyCallback('searchCustomers', errorMessage);
			});
	}

	/*
	// Gets the customers by the given keywords
	*/
	public searchCustomers(startValue: any, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetCustomerDetails";

		var searchValue = new SearchModel(startValue);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchValue)
			.done((data) => {
				var result: any = data;
				var newItems = ko.utils.arrayMap(result, (item: refCustomerNameSearch.ICustomerNameSearch) => {
					return new refCustomerNameSearch.Models.CustomerNameSearch(item);
				});
				successCallBack(newItems);
			})
			.fail((arg) => {
				self.FailureProxyCallback('searchCustomers', arg);
			});
	}

	public searchBolAndPro(startValue: any, successCallBack: Function, failCallBack?: Function) {
		var self = this;
		var url: string = "Accounting/GetHeaderTransactionResponse";
		var searchValue = new SearchModel(startValue);
		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchValue)
			.done((data) => {
				var result = [];

				var vendorBillResult = $.map<IVendorBillSearchResult, any>(data.VendorBillSearchResults, function (value, Key) {
					var valueBolWithoutNull = value.BOLNumber ? (' - ' + value.BOLNumber) : '';
					var valueCost = ' - ' + '$' + value.Amount;
					return {
						PRONumber: value.PRONumber,
						VendorBillId: value.VendorBillId,
						Display: '<span class=\'clickable-item\'>#' + value.PRONumber + ' (' + value.BillStatusDisplay + ')' + valueBolWithoutNull + valueCost + '</span>', //##DE19887
						//Display: '#' + value.PRONumber + ' (' + value.BillStatusDisplay +')' + valueBolWithoutNull,
						FilterDisplay: undefined,
						IsPurchaseOrder: value.IsPurchaseOrder
					};
				});

				var salesOrderResult = $.map<ISalesOrderSearchResult, any>(data.SalesOrderSearchResults, function (value, Key) {
					var valuePROWithoutNull = value.PRONumber ? (' - ' + value.PRONumber) : '';
					return {
						BOLNumber: value.BOLNumber,
						ShipmentId: value.ShipmentId,
						Display: '<span class=\'clickable-item\'>#' + value.BOLNumber + ' (' + value.ProcessStatusDisplay + ')' + valuePROWithoutNull + '</span>', //##DE19887
						//Display: '#' + value.BOLNumber + ' (' + value.ProcessStatusDisplay + ')' + valuePROWithoutNull,
						FilterDisplay: undefined
					};
				});

				var edi210Result = $.map<IEdi210SearchResult, any>(data.Edi210SearchResults, function (value, Key) {
					if (value.ExceptionRuleId === 2)
						value.ExceptionDescription = "Duplicate PRO";
					else if (value.ExceptionRuleId === 3)
						value.ExceptionDescription = "Corrected";

					return {
						PRONumber: value.ProNumber,
						ExceptionRuleId: value.ExceptionRuleId,
						BatchId: value.BatchId,
						EDIDetailID: value.EDIDetailID,
						Display: value.ExceptionDescription
						? '<span class=\'clickable-item\'> #' + value.ProNumber + ' (' + value.ExceptionDescription + ') </span>'
						: '<span class=\'non-clickable-item\'> #' + value.ProNumber + ' (Database) </span>', //##DE19887
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
			})
			.fail((arg) => {
				self.FailureProxyCallback('searchBolAndPro', arg);
			});
	}

	// get the status list for transaction search
	public getStatusListForTransactionSearch(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetStatusListForTransactionSearch';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetStatusListForTransactionSearch', arg);
			});
	}

	// For Transaction Search
	public getTransactionSearchResponse(searchRequest: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetTransactionSearchResponse";

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, searchRequest)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('GetTransactionSearchResponse', arg);
			});
	}

	//#region Admin Menu calls

	// Getting the payment details from service
	public getOnlinePaymentDetail(successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetOnlinePaymentDetail";

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('GetOnlinePaymentDetail', arg);
			});
	}

	// Saves the the payment details to the database
	public updateCompanyPaymentConfigurations(model, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/UpdateCompanyPaymentConfigurations";

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, model)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('updateCompanyPaymentConfigurations', arg);
			});
	}

	// Saves the the payment details to the database
	public updateCustomerPaymentConfigurations(model, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/UpdateCustomerPaymentConfigurations";

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, model)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('updateCustomerPaymentConfigurations', arg);
			});
	}

	// This service call gets all the customers by Agency id
	public getCustomersByAgencyId(agencyId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetCustomersByAgencyId/" + agencyId.toString();

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('GetCustomersByAgencyId', arg);
			});
	}

	// This service call gets all the customers by Agency id
	public getAgencyOnlinePaymentSettings(agencyId: number, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetAgencyOnlinePaymentSettings/" + agencyId.toString();

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('GetAgencyOnlinePaymentSettings', arg);
			});
	}

	// Saves the the payment details to the database
	public deleteCustomerPaymentConfigurations(model, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/DeleteCustomerPaymentConfigurations";

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, model)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				faliureCallBack();
				self.FailureProxyCallback('deleteCustomerPaymentConfigurations', arg);
			});
	}

	/// Saves the grid setting foe the user and selected view
	public SaveUserGridSettings(data: any, successCallBack: Function, faliureCallBack: Function) {
		var self = this;
		var url: string = "Accounting/SaveUserGridSettings";

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, data)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('SaveUserGridSettings', arg);
			});
	}

	public GetUserGridSettings(viewId: any, successCallBack: Function) {
		var self = this;
		var url: string = "Accounting/GetUserGridSettings/" + viewId.toString();

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
					successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetUserGridSettings', arg);
			});
	}

	/// parameter: success callback, and failed call back
	public IsHoliday(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/IsTodayHoliday';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('IsTodayHoliday', arg);
			});
	}

	//<changeHistory>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	//</changeHistory>
	public GetNumberOfPOsCreatedPerDay(dateRange: refDateRangeClient.IdateRange, successcallBack: Function, failureBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetNumberOfPOsCreatedPerDay';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, dateRange)
			.done((data) => {
				successcallBack(data);
			})
			.fail((arg) => {
				failureBack(arg);
				self.FailureProxyCallback('GetNumberOfPOsCreatedPerDay', arg);
			});
	}

	// <createDetails>
	// <id>US19762</id> <by>Baldev Singh Thakur</by> <date>07-12-2015</date> <description>Inserting data to track Re-quote/Suborder on dashboard.</description>
	// </createDetails>
	public GetNumberOfRequoteSuborderCountPerDay(successcallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetNumberOfRequoteSuborderCountPerDay';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successcallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetNumberOfRequoteSuborderCountPerDay', arg);
			});
	}

	// <createdDetails>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </createdDetails>
	public GetNumberOfRequoteCountPerDay(dateRange: refDateRangeClient.IdateRange, successcallBack: Function, failureBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetNumberOfRequoteCountPerDay';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, dateRange)
			.done((data) => {
				successcallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetNumberOfRequoteCountPerDay', arg);
			});
	}

	// <createdDetails>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </createdDetails>
	public GetNumberOfSuborderCountPerDay(dateRange: refDateRangeClient.IdateRange, successcallBack: Function, failureBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetNumberOfSuborderCountPerDay';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.post(url, dateRange)
			.done((data) => {
				successcallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetNumberOfSuborderCountPerDay', arg);
			});
	}

	// ###START: US20352
	// Loaded the all the types of shipment
	// parameter: success callback, and failed call back
	public GetListDisputeStatus(successCallBack: Function) {
		var self = this;
		var url: string = 'Accounting/GetListDisputeStatus';

		var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(Utils.Constants.AtlasBaseURL);
		ajax.get(url)
			.done((data) => {
				successCallBack(data);
			})
			.fail((arg) => {
				self.FailureProxyCallback('GetEnums', arg);
			});
	}
	// ###END: US20352
	//#endregion Admin Menu calls

	//#region Private Methods

	// For Log the Error record
	private FailureProxyCallback(context, error) {
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

class SearchModel {
	SearchValue: string;
	CustomerId: number;
	constructor(searchValue: string, customerId?: number) {
		this.SearchValue = searchValue;
		this.CustomerId = customerId;
	}
}