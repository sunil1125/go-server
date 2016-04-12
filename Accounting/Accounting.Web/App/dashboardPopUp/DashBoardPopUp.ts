//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/VendorBillModels.d.ts" />
//#endregion

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
import refEnums = require('services/models/common/Enums');
import refValidations = require('services/validations/Validations');
import refCommonClient = require('services/client/CommonClient');
import refVendorBillClient = require('services/client/VendorBillClient');
//#endregion

/*
** <summary>
** </summary>
** <createDetails>
** <id></id> <by></by> <date></date>
** </createDetails>
** <changeHistory>
** <id>US19762</id> <by>Chandan Singh</by> <date>11/12/2015</date> <description>Create Bar Chart for Requote Board</description>
** <id>DE22081</id> <by>Shreesha Adiga</by> <date>07-03-2016</date> <description>Delay time out for download.</description>
** </changeHistory>
*/
class DashBoardPopup {
	//#region Members
	//## Holds Bill Date
	fromDate: KnockoutObservable<any> = ko.observable('');
	toDate: KnockoutObservable<any> = ko.observable('');
	downloadReportType: KnockoutObservable<string> = ko.observable('SummaryReport');
	downloadType: KnockoutObservable<string> = ko.observable('');
	errorVendorDetail: KnockoutValidationGroup;
	isDownloaded: KnockoutObservable<boolean> = ko.observable(true);
	commonUtils: CommonStatic = new Utils.Common();
	datepickerOptions: DatepickerOptions;
	error: KnockoutValidationErrors;
	// ###START: US19762
	currentUser: KnockoutObservable<IUser> = ko.observable();
	isRexnord: KnockoutObservable<boolean> = ko.observable(false);
	// ###END: US19762
	//Common Client
	commonClient: refCommonClient.Common = new refCommonClient.Common();

	listProgress: KnockoutObservable<boolean> = ko.observable(false);
	//#endregion

	//#region Constructor
	constructor() {
		var self = this;

		//#region Validations
		self.fromDate = ko.observable().extend({
			required: {
				message: 'From date is required.'
			},

			validation: {
				validator: () => refValidations.Validations.isValidDate(self.fromDate(), self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy'), "BillDate"),
				message: 'Not a valid date'
			}
		});

		//#region Validations
		self.toDate = ko.observable().extend({
			required: {
				message: 'To date is required.'
			},

			validation: {
				validator: () => refValidations.Validations.isValidDate(self.toDate(), self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy'), "BillDate"),
				message: 'Not a valid date'
			}
		});

		//To set The date picker options
		self.datepickerOptions = {
			blockWeekend: true,
			blockPreviousDays: false,
			blockHolidaysDays: true,
			autoClose: true,
			placeBelowButton: false,
			endDate: new Date()
		};

		//#region Error Details Object
		self.errorVendorDetail = ko.validatedObservable({
			fromDate: self.fromDate,
			toDate: self.toDate
		});

		var fromdate = new Date();
		var x = 90;
		var newFromDate = fromdate.setDate(fromdate.getDate() - x);
		self.fromDate(self.commonUtils.formatDate(newFromDate, 'mm/dd/yyyy'));
		self.toDate(self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy'));
		// ###START: US19762
		// For rexnord user we are not showing dropdown
		self.load();
		// ###END: US19762
	}

	//#endregion

	//#region Public Methods
	// ###START: US19762
	public load() {
		var self = this;
		if (!self.currentUser()) {
			// Get the logged in user for name for new note}
			_app.trigger("GetCurrentUserDetails", (currentUser: IUser) => {
				self.currentUser(currentUser);
			});
		}
		if (self.currentUser().IsRexnordManager) {
			self.isRexnord(false);
		} else {
			self.isRexnord(true);
		}
	}
	// ###END: US19762

	public onDownloadClick() {
		var self = this;
		if (!self.validateDatePicker()) {
			self.isDownloaded(false);
			self.listProgress(true);
			var SearchModel = new refVendorBillClient.SearchModel();
			SearchModel.FromDate = self.fromDate();
			SearchModel.ToDate = self.toDate();
			// ###START: US19762
			self.downloadType($('#drpItems :selected').val());
			self.downloadReportType($("input[name=report]:checked").val());
			if (self.downloadType() === "UVBReport") {
				var filterModel = { ExportURL: "Accounting/ExportDashBoardDataInCSV/" + self.downloadReportType(), searchModel: SearchModel };
			} else {
				var filterModel = { ExportURL: "Accounting/ExportDashboardDataForManualAudit/" + self.downloadReportType(), searchModel: SearchModel };
			}
			// ###END: US19762

			var urldocumentViewer = "documentViewer/DownloadElasticReport";
			var ajax: Simplex.AjaxConnection = new Simplex.AjaxConnection(self.getApplicationURI());

			if (filterModel) {
				filterModel.searchModel.ExportURL = filterModel.ExportURL;
				ajax.post(urldocumentViewer, filterModel.searchModel)
					.done((message) => {
						if (message && message !== '') {
							var downloadElasticSearchURL = self.getApplicationURI() + message;
							///###START: DE22081
							var timeOutDuration = 0;
							if (typeof Utils.Constants.DelayForFileDownload !== "undefined")
								timeOutDuration = parseInt(Utils.Constants.DelayForFileDownload);

							setTimeout(
								function () {
									window.location.href = downloadElasticSearchURL;
								}, timeOutDuration);
							/// ###END: DE22081
						}
						self.isDownloaded(true);
						self.listProgress(false);
						self.closePopup(self);
					})
					.fail((message) => {
						console.log(message);
						self.isDownloaded(true);
						self.listProgress(false);
					});
			}
		}
	}

	//Validating PO To SO property}
	public validateDatePicker() {
		var self = this;
		if (self.errorVendorDetail.errors().length != 0) {
			self.errorVendorDetail.errors.showAllMessages();
			return true;
		}
		else {
			return false;
		}
	}

	//public onSummaryReport() {
	//	var self = this;
	//	self.downloadReportType("SummaryReport");
	//	$('input[name=name_of_your_radiobutton]:checked').val();
	//}

	//public onSummaryClick = function (value) {
	//	var self = this;
	//	self.downloadReportType(value);
	//}

	//public onDetailedReport() {
	//	var self = this;
	//	self.downloadReportType("DetailedRepors");
	//}

	public getApplicationURI() {
	var appURL: string = window.location.protocol + '//' + window.location.hostname;

	if (window.location.port != "")
		appURL += ":" + window.location.port;

	appURL += window.location.pathname;

	return (appURL);
	}

	//close popup
	public closePopup(dialogResult) {
		dialogResult.__dialog__.close(this, dialogResult);
		return true;
	}

	//#endregion Public Methods

	//#region Private Methods
	//#region if user any numeric  date  without any format
	private convertTofromDate() {
		var self = this;
		if (!self.fromDate().match('/')) {
			//self.fromDate(refValidations.Validations.CommonDate.prototype.ConvertToDate(self.fromDate()));
		}
	}

	//#region if user any numeric  date  without any format
	private convertToToDate() {
		var self = this;
		if (!self.toDate().match('/')) {
			//self.toDate(refValidations.Validations.CommonDate.prototype.ConvertToDate(self.toDate()));
		}
	}
	//#endregion

	//#region Life Cycle Event
	//**When the value of the activator is switched to a new value, before the switch occurs, we register the view data. */
	public beforeBind() {
		var self = this;
		// self.load();
	}

	public compositionComplete(view, parent) {
	}

	// Activate the view and bind the selected data from the main view
	public activate() {
	}
	//#endregion
}

return DashBoardPopup;