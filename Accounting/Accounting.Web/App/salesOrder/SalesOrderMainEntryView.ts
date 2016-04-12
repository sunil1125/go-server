//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
/// <reference path="../services/models/TypeDefs/VendorBillModels.d.ts" />
/// <reference path="../../Scripts/Constants/ApplicationMessages.ts" />
//#endregion

//#region Import
import _app = require('durandal/app');
import _refSalesOrdermainView = require('salesOrder/SalesOrderMainEntryViewAccordion');

//#endregion

/*
** <summary>
**  Sales Order Main Entry View Model.
** </summary>
** <createDetails>
** <id>US12130</id> <by>Chandan</by> <date>26th Aug, 2014</date>
** </createDetails>
** <changeHistory>
** <id></id> <by></by> <date></date>
** </changeHistory>
*/

class SalesOrderMainEntryViewModel {
	//#endregion
	public salesOrderMainView: _refSalesOrdermainView.SalesOrderMainEntryViewModelAccordion = new _refSalesOrdermainView.SalesOrderMainEntryViewModelAccordion();
	accordian: Function;
	tabbed: Function;

	//flag to make ACCORDION view as active or not?
	isAccordianAcitve: KnockoutComputed<boolean>;
	//flag to make TABBED view as active or not?
	isTabAcitve: KnockoutComputed<boolean>;
	public viewModeType: KnockoutObservable<number> = ko.observable(1).extend({ persist: 'viewModeType' });
	accordianClass: KnockoutObservable<string> = ko.observable('');
	tabbedClass: KnockoutObservable<string> = ko.observable('');
	//#region Constructor
	constructor() {
		var self = this;

		// if user clicks on TABBED then we are setting viewMode type as 1.
		self.tabbed = () => {
			self.viewModeType(1);
			self.salesOrderMainView.compositionComplete();
		}

		// if user clicks on ACCORDION then we are setting viewMode type as 0.
		self.accordian = () => {
			self.viewModeType(0);
			$('.carousel-inner').css("overflow", "hidden");
			self.salesOrderMainView.compositionComplete();
		}

		// Accordion view flag is computing.
		self.isAccordianAcitve = ko.computed(function () {
			if (self.viewModeType() === 0) {
				self.salesOrderMainView.isAccordion(true);
				return true;
			}
			else {
				return false;
			}
		});

		// tab view flag is computing.
		self.isTabAcitve = ko.computed(function () {
			if (self.viewModeType() === 1) {
				// set overflow:visible after loading completion of tab view
				setTimeout(function () {
					$('.carousel-inner').css("overflow", "visible");
				}, 700);
				self.salesOrderMainView.isAccordion(false);
				return true;
			}
			else {
				return false;
			}
		});
		//#endregion
		return self;
	}
	//#endregion

	//#region Internal Methods

	//#endregion}

	//#region Life Cycle Event}

	//** Indicate that view is attached and used whenever we are create tab interface for disable the processing and show close button. */
	public attached() {
		_app.trigger('viewAttached');
	}

	//** The composition engine will execute it prior to calling the binder. */
	public activate() {
		return true;
	}

    public deactivate() {
        var self = this;
        self.salesOrderMainView.deactivate();
    }
	//#region Load Data
	//public load(bindedData) {
	//	//** if bindedData is null then return false. */
	//	if (!bindedData)
	//		return;

	//	var self = this;

	//	self.salesOrderMainView.load(bindedData);
	//}

	// function to keep cursor focus on DOM first control.
	public setCursorFocus() {
		setTimeout(function () {
			$("input:text:visible:first").focus();
		}, 500);
	}

	//**When the value of the activator is switched to a new value, before the switch occurs, we register the view data. */
	//To load the registered data if any existed.
	public beforeBind(): JQueryPromise<boolean> {
		var self = this,
			deferred = $.Deferred(),
			promise = deferred.promise();

		//apply active for the inner div based on view type.
		if (self.viewModeType() === 0) {
			self.accordianClass('item active');
			self.tabbedClass('item');
		} else {
			self.accordianClass('item');
			self.tabbedClass('item active');
		}

		_app.trigger("loadMyData", function (data) {
			if (data) {
				//self.load(data);
				deferred.resolve(true);
			} else {
				//_app.trigger("closeActiveTab");
				//_app.trigger("NavigateTo", 'Home');
				deferred.resolve(true);
			}
		});

		return promise;
	}

	//#endregion
}

return SalesOrderMainEntryViewModel;