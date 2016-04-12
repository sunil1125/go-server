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
//#endregion

//#region Import
import _config = require('config');
import _router = require('plugins/router');
import _app = require('durandal/app');
import refSystem = require('durandal/system');
import _reportViewer = require('../templates/reportViewerControlV2');
import _refVendorBillItemModel = require('services/models/vendorBill/VendorBillItemDetails');
import _refVendorBillContainerModel = require('services/models/vendorBill/VendorBillContainer');
import refVendorBillClient = require('services/client/VendorBillClient');
import refEnums = require('services/models/common/Enums');
//#endregion

/*
** <summary>
** Vendor Bill Dispute Losts View Model.
** </summary>
** <createDetails>
** <id></id> <by>Satish</by> <date>27th May, 2014</date>
** </createDetails>}
** <changeHistory>}
** <id>US9669</id> <by>Achal Rastogi</by> <date>6-3-2014</date>
** </changeHistory>
*/
class VendorBillDisputeLost {
	vendorBillClient: refVendorBillClient.VendorBillClient = new refVendorBillClient.VendorBillClient();
	vendorBillItemsList: KnockoutObservableArray<VendorBillItemsModel> = ko.observableArray([]);
	proNumber: KnockoutObservable<string> = ko.observable('');
	totalCost: KnockoutComputed<string>;
	totalDispute: KnockoutComputed<string>;
	totalDisputeLost: KnockoutComputed<string>;
	isValidateAllDisputZero: KnockoutComputed<boolean>;
	totalDisputeLostShouldNotBeZero: KnockoutObservable<string> = ko.observable('');
	vendorBillId: number;
	isSaveEnable: KnockoutObservable<boolean> = ko.observable(true);
	listProgress: KnockoutObservable<boolean> = ko.observable(false);
	onSave: Function;
	refresh: Function;
	// Accepts only numeric with decimal input
	NumericInputWithDecimalPoint: INumericInput;
	//#region Constructor
	constructor() {
		var self = this;

		//set the flag allow decimal: true to accepts decimals
		self.NumericInputWithDecimalPoint = { allowdecimal: ko.observable(true), maxlength: 11, autodigit: ko.observable(true) };

		self.onSave = () => {
			if (!self.validateItems()) {
				self.listProgress(true);
				var vendorBillData = new _refVendorBillContainerModel.Models.VendorBillContainer();

				vendorBillData.VendorBillItemsDetail = self.getVendorBillItemsDetails();

				var successCallBack = () => {
					self.isSaveEnable(true);
					if (self.refresh && typeof self.refresh === "function") {
						self.refresh();
					}

					self.closePopup(self);
					var toastrOptions = {
						toastrPositionClass: "toast-top-middle",
						delayInseconds: 10,
						fadeOut: 10,
						typeOfAlert: "",
						title: ""
					}

					Utility.ShowToastr(refEnums.Enums.ToastrMessageType.success.ID, ApplicationMessages.Messages.SavedSuccessfullyMessage, "success", null, toastrOptions);
				},
					faliureCallBack = (message) => {
						self.isSaveEnable(false);
						var toastrOptions = {
							toastrPositionClass: "toast-top-middle",
							delayInseconds: 10,
							fadeOut: 10,
							typeOfAlert: "",
							title: ""
						}

						Utility.ShowToastr(refEnums.Enums.ToastrMessageType.error.ID, message, "error", null, toastrOptions);
					};

				self.isSaveEnable(false);
				self.vendorBillClient.saveVendorBillDisputeLostItems(vendorBillData, successCallBack, faliureCallBack);
				//self.listProgress(false);
			}
		};

		self.totalCost = ko.computed(() => {
			var totalCost: number = 0;

			if (self.vendorBillItemsList()) {
				self.vendorBillItemsList().forEach((item) => {
					totalCost += parseFloat(item.cost());
				});
			}

			return totalCost.toFixed(2);
		});

		self.totalDispute = ko.computed(() => {
			var totalCost: number = 0;

			if (self.vendorBillItemsList()) {
				self.vendorBillItemsList().forEach((item) => {
					totalCost += parseFloat(item.disputeAmount());
				});
			}

			return totalCost.toFixed(2);
		});

		self.totalDisputeLost = ko.computed(() => {
			var totalCost: number = 0;

			if (self.vendorBillItemsList()) {
				self.vendorBillItemsList().forEach((item) => {
					totalCost += isNaN(item.disputeLostAmount()) ? 0 : parseFloat(item.disputeLostAmount().toString());
				});
			}

			return totalCost.toFixed(2);
		});

		self.isValidateAllDisputZero = ko.computed(() => {
			if (self.totalDisputeLost()==='0.00') {
				self.totalDisputeLostShouldNotBeZero('Total Dispute Lost Amount should be greater then Zero.');
				return true;
			} else {
				return false;
			}
		});
	}

	// Checks validation in all the items
	public validateItems() {
		var self = this;
		var isInvalid = false;
		self.vendorBillItemsList().forEach((item) => {
			if (self.isValidateAllDisputZero()) {
				isInvalid = true;
			} else {
				if (item.checkValidation()) {
					isInvalid = true;
				}
			}
		});

		return isInvalid;
	}

	//#region Public Methods
	public initializeItemsDetails(data: Array<IVendorBillItem>) {
		var self = this;

		//var self = this;
		if (data) {
			data.forEach((item) => {
				self.vendorBillItemsList.push(new VendorBillItemsModel(item.ItemName, item.Cost, item.UserDescription, item.DisputeAmount, item.DisputeLostAmount, item.Id));
			});
		}
	}

	//#region Load Data
	public load(bindedData) {
		//** if bindedData is null then return false. */
		if (!bindedData)
			return;

		var self = this;

		self.vendorBillId = bindedData.vendorBillId;

		//** if there is no data is registered then make a server call. */
		var vendorBillId = bindedData.vendorBillId;
		self.proNumber(bindedData.proNumber);

		var successCallBack = data => {
			// To load items in UI Details
			this.initializeItemsDetails(data);
		},
			faliureCallBack = () => {
			};

		self.vendorBillClient.getvendorBillItems(vendorBillId, successCallBack, faliureCallBack);
	}

	// Gets the vendor bill Item details
	private getVendorBillItemsDetails(): Array<IVendorBillItem> {
		var self = this;

		var vendorBillItems: Array<_refVendorBillItemModel.Models.VendorBillItemDetails>;
		vendorBillItems = ko.observableArray([])();

		self.vendorBillItemsList().forEach((item) => {
			var vendorBillItem = new _refVendorBillItemModel.Models.VendorBillItemDetails();
			vendorBillItem.Id = item.id();
			vendorBillItem.VendorBillId = self.vendorBillId;
			vendorBillItem.DisputeLostAmount = item.disputeLostAmount();

			vendorBillItems.push(vendorBillItem);
		});

		return vendorBillItems;
	}

	//close popup
	public closePopup(dialogResult) {
		dialogResult.__dialog__.close(this, dialogResult);
		return true;
	}

	public compositionComplete(view, parent) {
		var self = this;
		_app.trigger("loadMyData", data => {
			if (data) {
				self.load(data);
			}
		});
	}

	public activate(refresh: Function) {
		var self = this;
		self.refresh = refresh;
		return true;
	}
}

// Item which will show in the grid
class VendorBillItemsModel {
	id: KnockoutObservable<number> = ko.observable();
	selectedItemTypes: KnockoutObservable<string> = ko.observable();
	cost: KnockoutObservable<string> = ko.observable();
	userDescription: KnockoutObservable<string> = ko.observable();
	disputeAmount: KnockoutObservable<string> = ko.observable();
	disputeLostAmount: KnockoutObservable<number> = ko.observable();
	errorVendorItemDetail: KnockoutValidationGroup;
	requiredColor: KnockoutComputed<string>;
	enableDisputeLostAmount: KnockoutComputed<boolean>;
	//
	constructor(selectedItemType: string, cost: number, userDescription: string, disputeAmount: number, disputeLostAmount: number, id: number) {
		var self = this;

		self.requiredColor = ko.computed((): string => {
			if (self.disputeAmount() || self.disputeAmount() === "0.0") {
				return '';
			}

			return "requiredFieldBgColor";
		});

		self.id(id);
		self.selectedItemTypes(selectedItemType);
		self.cost(cost.toFixed(2));
		self.userDescription(userDescription);
		self.disputeAmount(disputeAmount.toFixed(2));
		self.disputeLostAmount($.number(disputeLostAmount,2));

		self.enableDisputeLostAmount = ko.computed((): boolean => {
			if(parseFloat(self.disputeAmount()) === 0) {
				return true;
			}
		});

		self.disputeLostAmount.extend({
			required: {
				message: 'Dispute lost amount is required.',
				onlyIf: () => {
					return ((parseFloat(self.disputeAmount()) !== parseFloat("0.00")));
				}
			},
			//number: true, //Comented this because of it was throwing erroe if we put number with dot like "12."
			//min: {
			//	params: 1,
			//	message: 'Amount should be greater than zero.',
			//	onlyIf: () => {
			//		return ((parseFloat(self.disputeAmount()) !== parseFloat("0.00")));
			//	}
			//},
			max: {
				params: 1,
				message: 'Amount should not be greater than dispute amount.',
				onlyIf: () => {
					return ((parseFloat(self.disputeAmount()) < parseFloat(self.disputeLostAmount().toString())) && parseFloat(self.disputeAmount())!==0);
				}
			}
		});

		// The vendors item bill object
		self.errorVendorItemDetail = ko.validatedObservable({
			disputeLostAmount: self.disputeLostAmount
		});
	}

	// Check validation for each line item}
	public checkValidation() {
		var self = this;
		if (self.errorVendorItemDetail.errors().length != 0) {
			self.errorVendorItemDetail.errors.showAllMessages();
			return true;
		} else {
			return false;
		}
	}
}

return VendorBillDisputeLost;