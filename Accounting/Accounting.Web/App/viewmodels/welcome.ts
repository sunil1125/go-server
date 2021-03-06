import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refCommonClient = require('services/client/CommonClient');
import refDateRangeClient = require('services/models/common/DateRange');

/*
** <summary>
** Scripts of Welcome page and fusion charts
** </summary>
** <createDetails>
** </createDetails>
** <changeHistory>
** <id>US19763</id> <by>Shreesha Adiga</by> <date>01-Dec-2015</date> <description>Implement new Fusion charts requirements</description>
** <id>US19762</id> <by>Baldev Singh Thakur</by> <date>07-12-2015</date> <description>Inserting data to track Re-quote/Suborder on dashboard.</description>
** <id>US19763</id> <by>Shreesha Adiga</by> <date>11-12-2015</date> <description>Changed Color Palettes and some chart configs</description>
** <id>DE21150</id> <by>Shreesha Adiga</by> <date>31-12-2015</date> <description>Load charts after the data is retrieved and not in compositionComplete</description>
** <id>US20314</id> <by>Shreesha Adiga</by> <date>19-01-2016</date> <description>Added VB matching process; changed color pallettes</description>
** <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
** <id>US20853</id> <by>Shreesha Adiga</by> <date>01-03-2016</date> <description>Add Audit Worked counts and create stacked graphs</description>
** </changeHistory>
*/
class WelcomeViewModel {
	//#region Properties
	commonClientCommand: refCommonClient.Common = new refCommonClient.Common();
	numberOfPOsCreated = [];
	numberOfPOsAttachedToSO = [];

	//##START: US19763
	//array of data for 5 days
	dashboardSummaryReportOfPastDays = [];
	//array of data for worked
	numberofPOsWorkedColumnChartArray = [];
	dualChartDataSet = [];

	categories = []; //array of category for dua-y chart
	category = [];
	//##END: US19763

	uvbCreatedChart: any;
	uvbAttachedChart: any;
	isAcctCustomer: KnockoutObservable<boolean> = ko.observable(true);

	// ###START: US19762
	numberOfRequoteItermCount = [];
	numberOfRequoteTtermCount = [];
	
	//##START: US20853
	numberOfRequoteItermWorkedCount = [];
	numberOfRequoteTtermWorkedCount = [];
	//##END: US20853

	numberOfSuborderItermCount = [];
	numberOfSuborderTtermCount = [];
	//##START: US20853
	numberOfSuborderItermWorkedCount = [];
	numberOfSuborderTtermWorkedCount = [];
	//##END: US20853

	dualChartForRequote = [];
	requoteChart: any;
	requoteCategories = [];
	requoteCategory = [];

	commonUtils: CommonStatic = new Utils.Common();

	dualChartForSuborder = [];
	suborderChart: any;
	suborderCategories = [];
	suborderCategory = [];

	// List progress bar for all Graph 
	listProgress: KnockoutObservable<boolean> = ko.observable(false);
	listProgressForRB: KnockoutObservable<boolean> = ko.observable(false);
	listProgressForSB: KnockoutObservable<boolean> = ko.observable(false);

	// saving current from date for calculating new date range
	currentFromDate: KnockoutObservable<any> = ko.observable();
	currentFromDateForR: KnockoutObservable<any> = ko.observable();
	currentFromDateForS: KnockoutObservable<any> = ko.observable();

	// custom class to apply in icon 
	customClass: KnockoutComputed<string>;
	customClassForRB: KnockoutComputed<string>;
	customClassForSB: KnockoutComputed<string>;

	// flag for using make disable arrow button if current date === todate
	isPreviousButtonEnableForUVBs: KnockoutObservable<boolean> = ko.observable(false);
	isPreviousButtonEnableForRB: KnockoutObservable<boolean> = ko.observable(false);
	isPreviousButtonEnableForSB: KnockoutObservable<boolean> = ko.observable(false);

	isRexnordCustomer: KnockoutObservable<boolean> = ko.observable(false);
	// ###END: US19762
	//#endregion Properties

	//#region Constructor
	constructor() {
		var self = this;
		// ###START: US20267
		self.customClass = ko.computed(() => {
			return self.isPreviousButtonEnableForUVBs() === true ? "enableAwsomFontLeftRightArrowIcon fa fa-chevron-left fa-lg" : "disableAwsomFontLeftRightArrowIcon fa fa-chevron-left fa-lg";
		});

		self.customClassForRB = ko.computed(() => {
			return self.isPreviousButtonEnableForRB() === true ? "enableAwsomFontLeftRightArrowIcon fa fa-chevron-left fa-lg" : "disableAwsomFontLeftRightArrowIcon fa fa-chevron-left fa-lg";
		});

		self.customClassForSB = ko.computed(() => {
			return self.isPreviousButtonEnableForSB() === true ? "enableAwsomFontLeftRightArrowIcon fa fa-chevron-left fa-lg" : "disableAwsomFontLeftRightArrowIcon fa fa-chevron-left fa-lg";
		});
		// ###END: US20267

		return self;
	}
	//#endregion Constructor

	//#region Life Cycle Event
	// <changeHistory>
	// <id>US18717</id> <by>Chandan Singh</by> <date>21-Sep-2015</date> <description>Sales Reps Can Access the Download Data File Button.</description>
	// <id>US19763</id> <by>SHREESHA ADIGA</by> <date>01-Dec-2015</date> <description>Implement new Fusion charts requirements</description>
	// <id>US19762</id> <by>Baldev Singh Thakur</by> <date>07-12-2015</date> <description>Inserting data to track Re-quote/Suborder on dashboard.</description>
	// <id>DE21150</id> <by>SHREESHA ADIGA</by> <date>31-12-2016</date> <description>Load charts after the data is retrieved and not in compositionComplete</description>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </changeHistory>
	public load() {
		var self = this;
		// ###START: US20267
		var toDate = new Date();
		// From date is different because if source is same it will reflect all from date
		var fromDate = new Date();
		var fromDateForR = new Date();
		var fromDateForS = new Date();
		fromDate.setDate(fromDate.getDate() - 4);
		fromDateForR.setDate(fromDateForR.getDate() - 4);
		fromDateForS.setDate(fromDateForS.getDate() - 4);
		// Set next from date 
		// Start
		self.currentFromDate(fromDate);
		self.currentFromDateForR(fromDateForR);
		self.currentFromDateForS(fromDateForS);
		// End
		var dateRange = new refDateRangeClient.Models.dateRange();
		dateRange.FromDate = fromDate;
		dateRange.ToDate = toDate;
		// To fetch data for created UVBs
		self.GetNumberOfPOsCreatedPerDay(dateRange);
		// To fetch data for Manual Audit bill(Requote Board)
		self.GetNumberOfRequoteCountPerDay(dateRange);
		// To fetch data for Manual audit bill (Sub Order)
		self.GetNumberOfSuborderCountPerDay(dateRange);
		// ###END: US20267

	}


	//** Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button. */
	public attached() {
		_app.trigger('viewAttached');
	}

	//** The composition engine will execute it prior to calling the binder. */
	public activate() {
		return true;
	}

	public registerData(vendorBillId, isSubBill) {
		var self = this;
	}


	// <changeHistory>
	// <id>US20853</id> <by>Shreesha Adiga</by> <date>01-03-2016</date> <description>Check if chart has loaded before disposing</description>
	// </changeHistory>
	public deactivate() {
		var self = this;

		//##START: US20853
		if (typeof self.uvbCreatedChart !== "undefined")
			self.uvbCreatedChart.dispose();

		if (typeof self.uvbAttachedChart !== "undefined")
			self.uvbAttachedChart.dispose();

		if (typeof self.requoteChart !== "undefined")
			self.requoteChart.dispose();

		if (typeof self.suborderChart !== "undefined")
			self.suborderChart.dispose();
		//##END: US20853

		for (var prop in self) {
			delete self[prop];
		}
	}

	//**When the value of the activator is switched to a new value, before the switch occurs, we register the view data. */
	public beforeBind() {
		var self = this;

		var returnUrl = self.readCookie("ReturnUrl")
		if (returnUrl && returnUrl != null) {
			var url = Utility.DecodeUri(returnUrl);
			self.eraseCookie("ReturnUrl");
			window.location.href = url;
		}

		self.load();
	}

	//** Using for focus cursor on last cycle for focusing in vendor name
	public compositionComplete() {
		var self = this;
	}
	//#endregion

	// <createDetails>
	// <id>US19763</id> <by>Shreesha Adiga</by> <date>01-Dec-2015</date> <description>Implement new Fusion charts requirements</description>
	// </createDetails>
	// <changeHistory>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </changeHistory>
	public GetNumberOfPOsCreatedPerDay(dateRange: refDateRangeClient.IdateRange) {
		var self = this;
		self.commonClientCommand.GetNumberOfPOsCreatedPerDay(dateRange, (data) => {
			if (data) {
				//##START: US19763
				self.dashboardSummaryReportOfPastDays = data.DashboardSummaryReport;

				self.numberOfPOsCreated.removeAll();
				self.numberofPOsWorkedColumnChartArray.removeAll();
				self.category.removeAll();
				self.categories.removeAll();
				self.dualChartDataSet.removeAll();

				data.DashboardSummaryReport.forEach((item) => {
					self.numberOfPOsCreated.push({ value: item.AmountOfUVBCreated.toString() });
					self.numberofPOsWorkedColumnChartArray.push({ value: item.AmountOfUVBWorked.toString() });

					self.category.push({ name: item.ChangeDateDisplayForCharts });
				});

				var attachedDataSet = { seriesname: "Worked", renderas: "Column", data: self.numberofPOsWorkedColumnChartArray };
				var createdDataSet = { seriesname: "Created", parentyaxis: "C", data: self.numberOfPOsCreated };

				//datasets for Dual-y column chart
				self.dualChartDataSet.push(createdDataSet, attachedDataSet);
				self.categories.push({ category: self.category });

				self.loadUVBCreatedWorkedCharts();//DE21150
				self.listProgress(false);
			}
			// ###START: US18717
			self.isAcctCustomer(data.IsAcctCustomer);
			// ###END: US18717

			// ###START: US19762
			self.isRexnordCustomer(!data.IsRexnord);
			// ###END: US19762
		}, () => {
				self.listProgress(false);
			});
	}

	// <createDetails>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </createDetails>
	// <changeHistory>
	// <id>US20853</id> <by>Shreesha Adiga</by> <date>01-03-2016</date> <description>Add Worked counts and create stacked graphs; Hide zero values</description>
	// </changeHistory>
	public GetNumberOfRequoteCountPerDay(dateRange: refDateRangeClient.IdateRange) {
		var self = this;
		self.commonClientCommand.GetNumberOfRequoteCountPerDay(dateRange, (data) => {
			if (data) {

				//##START: US20853
				self.numberOfRequoteItermCount.removeAll();
				self.numberOfRequoteTtermCount.removeAll();
				self.numberOfRequoteItermWorkedCount.removeAll();
				self.numberOfRequoteTtermWorkedCount.removeAll();

				self.requoteCategory.removeAll();
				self.dualChartForRequote.removeAll();
				self.requoteCategories.removeAll();

				//if values is zero don't show it since it looks bad in stacked graphs
				data.NumberOfRequote.forEach((item) => {
					self.numberOfRequoteItermCount.push({ value: item.NumberOfRequoteITerm, showValue: item.NumberOfRequoteITerm == 0 ? 0 : 1 });
					self.numberOfRequoteTtermCount.push({ value: item.NumberOfRequoteTTerm, showValue: item.NumberOfRequoteTTerm == 0 ? 0 : 1 });

					self.requoteCategory.push({ name: item.ChangeDateDisplay });
				});

				data.NumberOfRequoteWorked.forEach((item) => {
					self.numberOfRequoteItermWorkedCount.push({ value: item.NumberOfRequoteITermWorked, showValue: item.NumberOfRequoteITermWorked == 0 ? 0 : 1 });
					self.numberOfRequoteTtermWorkedCount.push({ value: item.NumberOfRequoteTTermWorked, showValue: item.NumberOfRequoteTTermWorked == 0 ? 0 : 1 });
				});

				var requotecreatedItermDataSet = { seriesname: "I-Term Created", data: self.numberOfRequoteItermCount };
				var requoteCreatedTTermDataSet = { seriesname: "T-Term Created", data: self.numberOfRequoteTtermCount };

				var requoteWorkedITermDataset = { seriesname: "I-Term Worked", data: self.numberOfRequoteItermWorkedCount };
				var requoteWorkedTTermDataset = { seriesname: "T-Term Worked", data: self.numberOfRequoteTtermWorkedCount };

				//creating the dataset in proper format for fusioncharts
				var createdDataset =
					{
						dataset:
						[
							requotecreatedItermDataSet,
							requoteCreatedTTermDataSet
						]
					};

				var workedDataset =
					{
						dataset:
						[
							requoteWorkedITermDataset,
							requoteWorkedTTermDataset
						]
					};
				//##END: US20853

				//datasets for Dual-y column chart
				self.dualChartForRequote.push(createdDataset, workedDataset);
				self.requoteCategories.push({ category: self.requoteCategory });

				self.loadManualAuditRequoteBoard();//DE21150
				self.listProgressForRB(false);
			}

		}, () => {
				self.listProgressForRB(false);
			});
		// ###END: US19762
	}

	// <createDetails>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </createDetails>
	// <changeHistory>
	// <id>US20853</id> <by>Shreesha Adiga</by> <date>01-03-2016</date> <description>Add Worked counts and create stacked graphs; Hide zero values</description>
	// </changeHistory>
	public GetNumberOfSuborderCountPerDay(dateRange: refDateRangeClient.IdateRange) {
		var self = this;
		self.commonClientCommand.GetNumberOfSuborderCountPerDay(dateRange, (data) => {
			if (data) {

				//##START: US20853
				self.numberOfSuborderItermCount.removeAll();
				self.numberOfSuborderTtermCount.removeAll();
				self.numberOfSuborderItermWorkedCount.removeAll();
				self.numberOfSuborderTtermWorkedCount.removeAll();

				self.suborderCategory.removeAll();
				self.dualChartForSuborder.removeAll();
				self.suborderCategories.removeAll();

				//if values is zero don't show it since it looks bad in stacked graphs
				data.NumberOfSuborder.forEach((item) => {
					self.numberOfSuborderItermCount.push({ value: item.NumberOfSuborderITerm, showValue: item.NumberOfSuborderITerm == 0 ? 0 : 1 });
					self.numberOfSuborderTtermCount.push({ value: item.NumberOfSuborderTTerm, showValue: item.NumberOfSuborderTTerm == 0 ? 0 : 1 });
					self.suborderCategory.push({ name: item.ChangeDateDisplay });
				});

				data.NumberOfSuborderWorked.forEach((item) => {
					self.numberOfSuborderItermWorkedCount.push({ value: item.NumberOfSuborderITermWorked, showValue: item.NumberOfSuborderITermWorked == 0 ? 0 : 1 });
					self.numberOfSuborderTtermWorkedCount.push({ value: item.NumberOfSuborderTTermWorked, showValue: item.NumberOfSuborderTTermWorked == 0 ? 0 : 1 });
				});

				var suborderCreatedITermDataSet = { seriesname: "I-Term Created", data: self.numberOfSuborderItermCount };
				var suborderCreatedTTermDataSet = { seriesname: "T-Term Created", data: self.numberOfSuborderTtermCount };

				var suborderWorkedITermDataset = { seriesname: "I-Term Worked", data: self.numberOfSuborderItermWorkedCount };
				var suborderWorkedTTermDataset = { seriesname: "T-Term Worked", data: self.numberOfSuborderTtermWorkedCount };

				//creating the dataset in proper format for fusioncharts
				var createdDataset =
					{
						dataset:
						[
							suborderCreatedITermDataSet,
							suborderCreatedTTermDataSet
						]
					};

				var workedDataset =
					{
						dataset:
						[
							suborderWorkedITermDataset,
							suborderWorkedTTermDataset
						]
					};
				//##END: US20853

				self.dualChartForSuborder.push(createdDataset, workedDataset);
				self.suborderCategories.push({ category: self.suborderCategory });

				self.loadManualAuditsubOrder();//DE21150
				self.listProgressForSB(false);
			}

		}, () => {
				self.listProgressForSB(false);
			});
	}

	/*
	<createDetails>
	<id>DE21150</id> <by>Shreesha Adiga</by> <date>31-12-2016</date> <description>Load charts after the data is retrieved and not in compositionComplete</description>
	</createDetails>
	*/
	private loadUVBCreatedWorkedCharts() {
		var self = this;
		// ###START: US20267
		if (typeof self.uvbCreatedChart !== "undefined") {
			self.uvbCreatedChart.dispose();
		}
		// ###END: US20267

		//##START: US19763
		self.uvbCreatedChart = new FusionCharts({
			type: 'mscolumn2d',
			renderAt: 'chart-container',
			width: "550",
			height: "350",
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Number of UVBs Created vs Worked",
					"subCaption": "(Click on worked column to view details)",
					"xAxisName": "Date",
					"yAxisName": "UVBs",
					"rotateValues": "0",
					"numberPrefix": "",
					"exportEnabled": "1",
					"exportShowMenuItem": "0",
					"theme": "fint",
					"placeValuesInside": "0",
					"showvalues": "1",
					"valueFontColor": "#000000",
					"paletteColors": "#90CAF9,#1565C0",
				},
				"categories": self.categories,
				"dataset": self.dualChartDataSet
			},
			events: {
				dataPlotClick: function (eventObj, argsObj) {

					if (typeof argsObj.categoryLabel != "undefined" && argsObj.datasetName !== "Created") {
						self.onClickOnChart(argsObj.categoryLabel);
					}
				}
			}
		});

		self.uvbCreatedChart.render();

		//display doughnut chart for today's data

		if (typeof self.dashboardSummaryReportOfPastDays !== "undefined" && self.dashboardSummaryReportOfPastDays !== null) {
			self.renderPieChart(self.dashboardSummaryReportOfPastDays[0], self.dashboardSummaryReportOfPastDays[0].ChangeDateDisplay);
		}
		//##END: US19763
	}

	// <createDetails>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </createDetails>
	// <changeHistory>
	// <id>US20853</id> <by>Shreesha Adiga</by> <date>01-03-2016</date> <description>Changed type to multi-series stacked chart</description>
	// </changeHistory>
	private loadManualAuditRequoteBoard() {
		var self = this;
		if (typeof self.requoteChart !== "undefined") {
			self.requoteChart.dispose();
		}
		self.requoteChart = new FusionCharts({
			type: 'msstackedcolumn2d', //US20853
			renderAt: 'chart-Container-Requote',
			width: "550",
			height: "350",
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Number of Manual Audit Bills (Requote Board)",
					"xAxisName": "Date",
					"yAxisName": "Vendor Bills",
					"rotateValues": "0",
					"numberPrefix": "",
					"exportEnabled": "1",
					"exportShowMenuItem": "0",
					"theme": "fint",
					"placeValuesInside": "0",
					"showvalues": "1",
					"valueFontColor": "#000000",
					//"paletteColors": "#009688,#80CBC4,#FDD835,#FFF59D" //US20853
					"paletteColors": "#8E24AA,#CE93D8,#D81B60,#F48FB1" //US20853
				},
				"categories": self.requoteCategories,
				"dataset": self.dualChartForRequote
			}
		});

		self.requoteChart.render();
	}

	// <createDetails>
	// <id>US20267</id> <by>Chandan Singh Bajetha</by> <date>28-01-2016</date> <description>Acct: Allow users to Navigate to past date values on graphs</description>
	// </createDetails>
	// <changeHistory>
	// <id>US20853</id> <by>Shreesha Adiga</by> <date>01-03-2016</date> <description>Changed type to multi-series stacked chart</description>
	// </changeHistory>
	private loadManualAuditsubOrder() {
		var self = this;
		if (typeof self.suborderChart !== "undefined") {
			self.suborderChart.dispose();
		}
		self.suborderChart = new FusionCharts({
			type: 'msstackedcolumn2d', //US20853
			renderAt: 'chart-Container-Suborder',
			width: "550",
			height: "350",
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "Number of Manual Audit Bills (Suborder Board)",
					"xAxisName": "Date",
					"yAxisName": "Vendor Bills",
					"rotateValues": "0",
					"numberPrefix": "",
					"exportEnabled": "1",
					"exportShowMenuItem": "0",
					"theme": "fint",
					"placeValuesInside": "0",
					"showvalues": "1",
					"valueFontColor": "#000000",
					//"paletteColors": "#EC407A,#AD1457,#AB47BC,#6A1B9A" //US20853
					"paletteColors": "#009688,#80CBC4,#FFEB3B,#FFF59D" //US20853
				},
				"categories": self.suborderCategories,
				"dataset": self.dualChartForSuborder
			}
		});

		self.suborderChart.render();
	}

	//##START: US19763
	//On click on the first chart
	public onClickOnChart(dateDisplay) {
		var self = this;

		//Year is added because new Date("29 February") returns "March 1st 2001"
		//##START: US20853
		var selectedDate = new Date(dateDisplay + " " + new Date().getFullYear());
		//##END: US20853

		//get data for clicked date
		var summaryReportObject = $.grep(self.dashboardSummaryReportOfPastDays, (item) => {
			return new Date(item.ChangeDate).getDate() == selectedDate.getDate();
		});

		if (typeof summaryReportObject !== "undefined" && summaryReportObject != null) {
			self.renderPieChart(summaryReportObject[0], summaryReportObject[0].ChangeDateDisplay);
		}
	}

	//method to display doughnut chart
	public renderPieChart(dataForChart, dateForDisplay) {
		var self = this;

		var chartReference = FusionCharts.items["piechart-1"];

		//dispose if chart exists already
		if (typeof chartReference !== "undefined") {
			chartReference.dispose();
		}
		self.getJsonForPieChart(dataForChart);

		self.uvbAttachedChart = new FusionCharts({
			type: 'doughnut2d',
			renderAt: 'chart-container2',
			width: "550",
			height: "350",
			dataFormat: 'json',
			dataSource: {
				"chart": {
					"caption": "UVB Worked    (" + dateForDisplay + ")",
					"placeValuesInside": "1",
					"paletteColors": "186dee,#db4733,#00BCD4,#FF6D00,#009955,#ffba03",
					"useDataPlotColorForLabels": "1",
					"bgColor": "#ffffff",
					"showBorder": "0",
					"use3DLighting": "0",
					"showShadow": "0",
					"enableSmartLabels": "1",
					"startingAngle": "310",
					//##START: US20314
					"enableSlicing": "0",
					"enableRotation": "0",
					//##END: US20314
					"labelFontBold": 1,
					"legendShadow": "0",
					"legendBorderAlpha": "0",
					"centerLabelBold": "1",
					"showTooltip": "0",
					"decimals": "0",
					"captionFontSize": "14",
					"subcaptionFontSize": "14",
					"subcaptionFontBold": "0",
					"centerLabel": "$label: $value",
				},
				"data": self.numberOfPOsAttachedToSO
			},
			id: 'piechart-1'
		});

		self.uvbAttachedChart.render();
	}

	//add the data for pie chart
	public getJsonForPieChart(dataForChart) {
		var self = this;

		self.numberOfPOsAttachedToSO = [];
		self.numberOfPOsAttachedToSO.push({ label: "Made Inactive", value: dataForChart.AmountOfUVBMadeInactive });
		self.numberOfPOsAttachedToSO.push({ label: "Attached By Automation", value: dataForChart.NumberOfUVBsAttachedByAutomation });
		self.numberOfPOsAttachedToSO.push({ label: "UVB To SO", value: dataForChart.AmountOfUVBToSO });
		self.numberOfPOsAttachedToSO.push({ label: "Force Attached", value: dataForChart.AmountOfUVBAttachedToExistingSO });
		self.numberOfPOsAttachedToSO.push({ label: "SO Matching Process", value: dataForChart.AmountOfUVBattachedThroSOMP });
		self.numberOfPOsAttachedToSO.push({ label: "VB Matching Process", value: dataForChart.AmountOfUVBattachedThroVBMP });//US20314

		//If the value is zero don't show labels and values on pie chart
		$.map(self.numberOfPOsAttachedToSO, function (item) {
			return item.showValue = item.showLabel = item.value == 0 ? 0 : 1;
		});
	}
	//##END: US19763

	public onClickDownloadFile() {
		var self = this;
		//Call the dialog Box functionality to open a Popup

		var optionControlArgs: IMessageBoxOption = {
			options: undefined,
			message: '',
			title: '',
			bindingObject: null
		}

		_app.showDialog('dashboardPopUp/DashBoardPopUp', optionControlArgs, 'slideDown').then((object) => {
		});
	}

	public onClickPreviousNumberofUVBsCreated() {
		var self = this;
		if (self.isPreviousButtonEnableForUVBs()) {
			self.listProgress(true);
			var toDateForUVB = self.currentFromDate();
			toDateForUVB.setDate(toDateForUVB.getDate() + 9);
			var fromDate = new Date(toDateForUVB);
			fromDate.setDate(fromDate.getDate() - 4);
			self.currentFromDate(fromDate);
			var dateRange = new refDateRangeClient.Models.dateRange();
			dateRange.FromDate = fromDate;
			dateRange.ToDate = toDateForUVB;
			self.GetNumberOfPOsCreatedPerDay(dateRange);

			var today = self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy');
			if (self.commonUtils.formatDate(toDateForUVB, 'mm/dd/yyyy') === today) {
				self.isPreviousButtonEnableForUVBs(false);
			}
		}
	}

	public onclickNextNumberofUVBsCreated() {
		var self = this;
		self.listProgress(true);
		var toDateForUVBNx = self.currentFromDate();
		toDateForUVBNx.setDate(toDateForUVBNx.getDate() - 1);
		var fromDate = new Date(toDateForUVBNx);
		fromDate.setDate(fromDate.getDate() - 4);
		self.currentFromDate(fromDate);
		var dateRange = new refDateRangeClient.Models.dateRange();
		dateRange.FromDate = fromDate;
		dateRange.ToDate = toDateForUVBNx;
		self.GetNumberOfPOsCreatedPerDay(dateRange);
		self.isPreviousButtonEnableForUVBs(true);
	}

	public onClickPreviousNumberofManualAuditBill_RequoteBoard() {
		var self = this;
		if (self.isPreviousButtonEnableForRB()) {
			self.listProgressForRB(true);
			var toDateForRBPrv = self.currentFromDateForR();
			toDateForRBPrv.setDate(toDateForRBPrv.getDate() + 9);
			var fromDate = new Date(toDateForRBPrv);
			fromDate.setDate(fromDate.getDate() - 4);
			self.currentFromDateForR(fromDate);
			var dateRange = new refDateRangeClient.Models.dateRange();
			dateRange.FromDate = fromDate;
			dateRange.ToDate = toDateForRBPrv;
			self.GetNumberOfRequoteCountPerDay(dateRange);

			var today = self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy');
			if (self.commonUtils.formatDate(toDateForRBPrv, 'mm/dd/yyyy') === today) {
				self.isPreviousButtonEnableForRB(false);
			}
		}
	}

	public OnClickNextNumberofManualAuditBill_RequoteBoard() {
		var self = this;
		self.listProgressForRB(true);
		var toDateForRBnxt = self.currentFromDateForR();
		toDateForRBnxt.setDate(toDateForRBnxt.getDate() - 1);
		var fromDate = new Date(toDateForRBnxt);
		fromDate.setDate(fromDate.getDate() - 4);
		self.currentFromDateForR(fromDate);
		var dateRange = new refDateRangeClient.Models.dateRange();
		dateRange.FromDate = fromDate;
		dateRange.ToDate = toDateForRBnxt;
		self.GetNumberOfRequoteCountPerDay(dateRange);
		self.isPreviousButtonEnableForRB(true);
	}

	public onClickPreviousNumberofManualAuditBill_SubourderBoard() {
		var self = this;
		if (self.isPreviousButtonEnableForSB()) {
			self.listProgressForSB(true);
			var toDateForSBPrv = self.currentFromDateForS();
			toDateForSBPrv.setDate(toDateForSBPrv.getDate() + 9);
			var fromDate = new Date(toDateForSBPrv);
			fromDate.setDate(fromDate.getDate() - 4);
			self.currentFromDateForS(fromDate);
			var dateRange = new refDateRangeClient.Models.dateRange();
			dateRange.FromDate = fromDate;
			dateRange.ToDate = toDateForSBPrv;
			self.GetNumberOfSuborderCountPerDay(dateRange)

			var today = self.commonUtils.formatDate(new Date(), 'mm/dd/yyyy');
			if (self.commonUtils.formatDate(toDateForSBPrv, 'mm/dd/yyyy') === today) {
				self.isPreviousButtonEnableForSB(false);
			}
		}
	}

	public onClickNextNumberofManualAuditBill_SubourderBoard() {
		var self = this;
		self.listProgressForSB(true);
		var toDateForSBNxt = self.currentFromDateForS();
		toDateForSBNxt.setDate(toDateForSBNxt.getDate() - 1);
		var fromDate = new Date(toDateForSBNxt);
		fromDate.setDate(fromDate.getDate() - 4);
		self.currentFromDateForS(fromDate);
		var dateRange = new refDateRangeClient.Models.dateRange();
		dateRange.FromDate = fromDate;
		dateRange.ToDate = toDateForSBNxt;
		self.GetNumberOfSuborderCountPerDay(dateRange);
		self.isPreviousButtonEnableForSB(true)
	}

	public readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	public createCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date;
		}
		else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	public eraseCookie(name) {
		var self = this;
		self.createCookie(name, "", -1);
	}
}

return WelcomeViewModel;