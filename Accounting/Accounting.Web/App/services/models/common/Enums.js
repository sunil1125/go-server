define(["require", "exports"], function(require, exports) {
    /* File Created: April 4, 2013 */
    /* Created By Sankesh Poojari*/
    /// <reference path="../TypeDefs/CommonModels.d.ts" />
    /// <reference path="../../../../Scripts/utils.ts" />
    (function (Enums) {
        Enums.vendorBillOptionConstant = Object.freeze({
            MakeInactive: 1,
            FroceAttach: 2,
            Quickpay: 3,
            HoldVendorBill: 4,
            Reviewed: 5,
            FAKMapping: 6,
            ForeignBolMapping: 7
        });

        Enums.onlinePaymentOptionConstant = Object.freeze({
            AllowCC: 1,
            AllowECheck: 2,
            AllowDebitCard: 3
        });

        Enums.TabType = Object.freeze({
            RateTab: { Id: 0, imageUrl: 'Content/images/tabicon_rate.png' },
            GridTab: { Id: 1, imageUrl: 'Content/images/tabicon_grid.png' },
            DocumentTab: { Id: 2, imageUrl: 'Content/images/tabicon_doc.png' },
            NormalTab: { Id: 3 }
        });

        Enums.CountryCode = Object.freeze({
            USA: { ID: 1, value: 'USA' },
            Canada: {},
            China: {},
            Mexico: {}
        });

        Enums.AddressType = Object.freeze({
            Origin: { ID: 1, value: 'Origin' },
            Destination: { ID: 2, value: 'Destination' },
            BillTo: { ID: 3, value: 'BillTo' },
            ThirdPartyBillTo: { ID: 4, value: 'ThirdPartyBillTo' },
            TerminalOrigin: { ID: 5, value: 'TerminalOrigin' },
            TerminalDestination: { ID: 6, value: 'TerminalDestination' },
            ExelFreightForwarder: { ID: 7, value: 'ExelFreightForwarder' },
            OceanFreightForwarder: { ID: 8, value: 'OceanFreightForwarder' },
            LTLFreightForwarder: { ID: 9, value: 'LTLFreightForwarder' }
        });

        Enums.OrderStatus = Object.freeze({
            Pending: { ID: 0, Value: "Pending" },
            AutoDispatch: { ID: 1, Value: "Auto Dispatch" },
            ManualDispatch: { ID: 2, Value: "Manual Dispatch" },
            ManuallyFinalized: { ID: 3, Value: "Manual Finalized" },
            AutoFinalized: { ID: 4, Value: "Auto Finalized" },
            WaitingForVB: { ID: 5, Value: "Waiting for VB" },
            ReQuote: { ID: 6, Value: "Requote" },
            Canceled: { ID: 7, Value: "Canceled" },
            Dispute: { ID: 8, Value: "Dispute" },
            Manager_Approval_Needed: { ID: 9, Value: "Manager Approval Needed" },
            Rep_Approval_Needed: { ID: 10, Value: "Rep Approval Needed" },
            Delivered: { ID: 11, Value: "Delivered" },
            Delayed: { ID: 12, Value: "Delayed" },
            Pickup: { ID: 13, Value: "Pickup" },
            Accept: { ID: 14, Value: "Accept" },
            Deny_1: { ID: 15, Value: "Deny 1" },
            Deny_2: { ID: 16, Value: "Deny 2" },
            Force_Deny: { ID: 17, Value: "Force Deny" },
            Shipment_Finalized: { ID: 18, Value: "Shipment Finalized" },
            InTransit: { ID: 19, Value: "In Transit" },
            Dispatch: { ID: 20, Value: "Dispatch" },
            Booked: { ID: 21, Value: "Booked" },
            Dispatched: { ID: 22, Value: "Dispatched" },
            OnHandDestination: { ID: 23, Value: "On Hand Destination" },
            OutForDelivery: { ID: 24, Value: "Out For Delivery" },
            PickupConfirmed: { ID: 25, Value: "Pickup Confirmed" },
            RecoveredfromCarrier: { ID: 26, Value: "Recovered From Carrier" },
            ShipmentCancelled: { ID: 27, Value: "Shipment Canceled" },
            TenderedtoCarrier: { ID: 28, Value: "Tendered To Carrier" },
            WebEntered: { ID: 29, Value: "Web Entered" }
        });

        var eDateFilterType;
        (function (eDateFilterType) {
            eDateFilterType[eDateFilterType["None"] = 0] = "None";
            eDateFilterType[eDateFilterType["Timeframe"] = 1] = "Timeframe";
            eDateFilterType[eDateFilterType["SingleDate"] = 2] = "SingleDate";
            eDateFilterType[eDateFilterType["DateRange"] = 3] = "DateRange";
            eDateFilterType[eDateFilterType["AgingTimeframe"] = 4] = "AgingTimeframe";
            eDateFilterType[eDateFilterType["DateRangePicker"] = 5] = "DateRangePicker";
        })(eDateFilterType || (eDateFilterType = {}));
        Enums.DateFilterType = Object.freeze(eDateFilterType);

        Enums.DateFilterTimeFrame = Object.freeze({
            Today: { ID: 0, Value: 'Today' },
            WTD: { ID: 1, Value: 'WTD' },
            LastWeek: { ID: 2, Value: 'Last Week' },
            MTD: { ID: 3, Value: 'MTD' },
            Last4Weeks: { ID: 4, Value: 'Last 4 weeks' },
            Last30Days: { ID: 5, Value: 'Last 30 days' },
            LastMonth: { ID: 6, Value: 'Last Month' },
            Quarter4: { ID: 7, Value: 'Q4' },
            Quarter3: { ID: 8, Value: 'Q3' },
            Quarter2: { ID: 9, Value: 'Q2' },
            Quarter1: { ID: 10, Value: 'Q1' },
            LastQuarter4: { ID: 11, Value: 'Last Year Q4' },
            LastQuarter3: { ID: 12, Value: 'Last Year Q3' },
            LastQuarter2: { ID: 13, Value: 'Last Year Q2' },
            LastQuarter1: { ID: 14, Value: 'Last Year Q1' },
            YTD: { ID: 15, Value: 'YTD' },
            Last12Months: { ID: 16, Value: 'Last 12 Months' },
            LastYear: { ID: 17, Value: 'Last Year' }
        });
        Enums.VendorBillStatus = Object.freeze({
            Pending: { ID: 1, Value: 'Pending' },
            Cleared: { ID: 2, Value: 'Cleared' },
            Dispute: { ID: 3, Value: 'Dispute' },
            Requote: { ID: 4, Value: 'Requote' },
            LostDispute: { ID: 5, Value: 'Lost Dispute' },
            ShortPaid: { ID: 6, Value: 'Short Paid' },
            DisputeWon: { ID: 7, Value: 'Dispute Won' },
            DisputeLost: { ID: 8, Value: 'Dispute Lost' },
            DisputeShortPaid: { ID: 9, Value: 'Dispute ShortPaid' },
            ManualAudit: { ID: 10, Value: 'Manual Audit' },
            WaitingForFinalization: { ID: 11, Value: 'Waiting For Finalization' },
            OverchargeClaim: { ID: 12, Value: 'Overcharge Claim' },
            OverchargeWon: { ID: 13, Value: 'Overcharge Won' },
            OverchargeLose: { ID: 14, Value: 'Overcharge Lose' }
        });

        // Saving statuses detects the changes
        Enums.SavingStatus = Object.freeze({
            NoChangesDetected: { ID: 1, Value: 'No Changes Detected' },
            ChangesDetected: { ID: 2, Value: 'Unsaved Changes Detected' },
            SavingChanges: { ID: 3, Value: 'Saving Changes...' },
            ChangesSaved: { ID: 4, Value: 'Changes Saved' }
        });

        Enums.DateRange = Object.freeze({
            All: { ID: 0, Value: 'All' },
            //## Date range for to day. #/
            Today: { ID: 1, Value: 'Today' },
            //## Date range for lastweek. #/
            Last_Week: { ID: 2, Value: 'Last Week' },
            //## Date range for last month. #/
            Last_Month: { ID: 3, Value: 'Last Month' },
            //## Date range for three months. #/
            Last_Three_Months: { ID: 4, Value: 'Last Three Months' },
            //## Date range for last year. #/
            Last_Year: { ID: 5, Value: 'Last Year' },
            //## Date range for custom. #/
            Custom: { ID: 6, Value: 'Custom' }
        });

        //## MAS Clearance Status.
        Enums.MasClearanceStatus = Object.freeze({
            ApprovedByProcess: { ID: 0, Value: 'Approved By Process' },
            WaitingReBillApproval: { ID: 1, Value: 'Waiting Rebill Approval' },
            ForcedApprovedByUser: { ID: 2, Value: 'Forced Approved By User' },
            ForcedApprovedByTime: { ID: 3, Value: 'Forced Approved By Time' }
        });

        //## Option Buttons.
        Enums.OptionButtonsView = Object.freeze({
            Horizontal: 1,
            Vertical: 2,
            Matrix: 3
        });

        //## Transport Mode.
        Enums.CarrierType = Object.freeze({
            LTL: { ID: 0, Value: 'LTL' },
            GuaranteedLTL: { ID: 1, Value: 'Guaranteed LTL' },
            Pallet: { ID: 2, Value: 'Pallet' },
            Truckload: { ID: 3, Value: 'TruckLoad' },
            INTWH: { ID: 4, Value: 'INTWH' },
            Ocean: { ID: 5, Value: 'Ocean' },
            Airfreight: { ID: 6, Value: 'Air Freight' },
            ExpediteAir: { ID: 7, Value: 'Expedite Air' },
            ExpediteGround: { ID: 8, Value: 'Expedite Ground' },
            WhiteGlove: { ID: 9, Value: 'White Glove' },
            Multileg: { ID: 10, Value: 'Multi Leg' },
            VPTL: { ID: 11, Value: 'VPTL' }
        });

        Enums.GridCellFormatTemplates = Object.freeze({
            BillStatusTextTemplate: '<div data-bind="attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)},text: $userViewModel.getTextfromId($parent.entity)"></div>',
            DateFormatTemplate: '<div data-bind="attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)},text: $userViewModel.getDateFormat($parent.entity)"></div>',
            DefaultTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index(), title: $data.getProperty($parent)}, html: $data.getProperty($parent) "></div>',
            LeftAlignPercentTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-left \', title: $data.getProperty($parent)}, html: $data.getProperty($parent) + \' %\' "></div>',
            LeftAlignTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-left \', title: $data.getProperty($parent)}, html: $data.getProperty($parent)"></div>',
            LeftAlignCurrencyTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-left \', title: \'$ \' +$data.getProperty($parent).toFixed(2)}, html: \'$ \' + $data.getProperty($parent).toFixed(2)"></div>',
            RightAlignPercentTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: $data.getProperty($parent) + \' %\' "></div>',
            RightAlignTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: $data.getProperty($parent)}, html: $data.getProperty($parent)"></div>',
            RightAlignCurrencyTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \', title: \'$ \' +$data.getProperty($parent).toFixed(2)}, html: \'$ \' + $data.getProperty($parent).toFixed(2)"></div>',
            RightAlignAndNegativeCurrencyTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \',  title: $data.getProperty($parent)}, html: $data.getProperty($parent) < 0 ? \'$ (\' + $data.getProperty($parent) * -1 + \')\' : \'$ \' + $data.getProperty($parent).toFixed(2)"></div>',
            CenterAlignTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-center \'}, html: $data.getProperty($parent)"></div>',
            RightAlignPoundTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-right \'}, html: $data.getProperty($parent).toFixed(0)"></div>',
            CenterAlignBooleanTemplate: '<div data-bind=" attr: { \'class\': \'kgCellText colt\' + $index() + \' text-center \'}, html: $data.getProperty($parent) == true ? \'Yes\' : \'No\' "></div>'
        });

        // Enums for Carrier Service Types
        Enums.ServiceType = Object.freeze({
            LTL: { ID: 0, Value: "LTL" },
            GuaranteedLTL: { ID: 1, Value: "GuaranteedLTL" },
            Pallet: { ID: 2, Value: "Pallet" },
            Truckload: { ID: 3, Value: "Truckload" },
            INT_WH: { ID: 4, Value: "INT-WH" },
            Ocean: { ID: 5, Value: "Ocean" },
            AirFrieght: { ID: 6, Value: "AirFrieght" },
            Expedite_Air: { ID: 7, Value: "Expedite-Air" },
            Expedite_Ground: { ID: 8, Value: "Expedite-Ground" },
            White_Glove: { ID: 9, Value: "White-Glove" },
            Multileg: { ID: 10, Value: "Multileg" },
            VPTL: { ID: 11, Value: "VPTL" }
        });

        /// <summary>
        /// Enum types for upload POD/Doc
        /// </summary>
        Enums.DocumentType = Object.freeze({
            POD: { ID: 1, Value: "POD" },
            BOL: { ID: 2, Value: "BOL" },
            ReweighCertificate: { ID: 3, Value: "ReweighCertificate" },
            Doc: { ID: 4, Value: "Doc" },
            Other: { ID: 5, Value: "Other" }
        });

        Enums.DocumentOwner = Object.freeze({
            Vendor: { ID: 1, Value: "Vendor" },
            Customer: { ID: 2, Value: "Customer" }
        });

        // Enums for Ship Via
        Enums.ShipVia = Object.freeze({
            Ground: { ID: 0, Value: 'Ground' },
            Ocean: { ID: 1, Value: 'Ocean' },
            Expedite_Air: { ID: 2, Value: 'Expedite - Air' },
            Expedite_Ground: { ID: 3, Value: 'Expedite - Ground' },
            White_Glove: { ID: 4, Value: 'White - Glove' },
            Ground_Ocean: { ID: 5, Value: 'Ground + Ocean' }
        });

        // Transaction search type
        Enums.TransactionSearchType = Object.freeze({
            SalesOrder: { ID: 0, Value: 'Sales Order' },
            Invoices: { ID: 1, Value: 'Invoices' },
            Bills: { ID: 2, Value: 'Bills' },
            TruckloadQuote: { ID: 2, Value: 'TruckloadQuote' }
        });

        //## Agent NotifictionType Mode.
        Enums.AgentNotifictionType = Object.freeze({
            SelectAgentNotification: { ID: 0, Value: 'Select Agent Notification' },
            Reweigh: { ID: 1, Value: 'Reweigh' },
            Reclass: { ID: 2, Value: 'Reclass' },
            Truckload: { ID: 3, Value: 'Reconsigned' },
            LimitedAccess: { ID: 4, Value: 'Limited Access' },
            Other: { ID: 5, Value: 'Other' }
        });

        //## Agent Notifiction Alert Message Type Mode.
        Enums.AgentNotifictionAlertMessageType = Object.freeze({
            SelectAgentNotification: { ID: 0, Value: '' },
            Reweigh: { ID: 1, Value: 'reweighed' },
            Reclass: { ID: 2, Value: 'reclassed' },
            Truckload: { ID: 3, Value: 'reconsigned' },
            LimitedAccess: { ID: 4, Value: 'charged a limited access fee' },
            Other: { ID: 5, Value: 'assessed additional charges' }
        });

        //## For Shipment Type For Billing Station
        Enums.ShipmentType = Object.freeze({
            General: { ID: 1, Value: 'General' },
            SCM: { ID: 2, Value: 'SCM' }
        });

        //## For CustomerType
        Enums.CustomerType = Object.freeze({
            Normal_Customer: { ID: 1, Value: 'Normal Customer' },
            Rexnord_Customer: { ID: 2, Value: 'Rexnord Customer' },
            Volume_Customer: { ID: 3, Value: 'Volume Customer' },
            PLC_Customer: { ID: 4, Value: 'PLC Customer' },
            BillingStation_Customer: { ID: 5, Value: 'BillingStation Customer' }
        });

        //## For MasClearanceStatus
        Enums.MasClearanceStatus = Object.freeze({
            Approved_By_Process: { ID: 0, Value: 'Approved By Process' },
            Waiting_Rebill_Approval: { ID: 1, Value: 'Waiting Rebill Approval' },
            Forced_Approved_By_User: { ID: 2, Value: 'Forced Approved By User' },
            Forced_Approved_By_Time: { ID: 3, Value: 'Forced Approved By Time' }
        });

        //## Invoice Status
        Enums.InvoiceStatus = Object.freeze({
            Pending: { ID: 0, Value: 'Pending' },
            Dispute: { ID: 1, Value: 'Dispute' },
            Invoiced: { ID: 2, Value: 'Invoiced' },
            Scheduled: { ID: 3, Value: 'Scheduled' }
        });

        //## FeeStructure
        Enums.FeeStructure = Object.freeze({
            None: { ID: 0, Value: 'Invalid Value' },
            OverCost: { ID: 1, Value: 'Over Cost' },
            OverRevenue: { ID: 2, Value: 'Over Revenue' }
        });

        //## EDI210Structure
        Enums.ExceptionRuleId = Object.freeze({
            UnmappedCode: { ID: 1, Value: 'Unmapped Code' },
            DuplicatePro: { ID: 2, Value: 'Duplicate PRO' },
            Corrected: { ID: 3, Value: 'Corrected' },
            BOLNotCompleted: { ID: 7, Value: 'BOL Not Completed' },
            BOLCancelled: { ID: 8, Value: 'BOL Cancelled' },
            CarrierNotMapped: { ID: 9, Value: 'Carrier Not Mapped' }
        });

        //## Reports
        Enums.ScheduledReports = Object.freeze({
            DisputeBoardDetails: { ID: 1, Value: 'Dispute Board Details' },
            VendorBillExceptionReport: { ID: 2, Value: 'VendorBill Exception Report' },
            VendorBillTrackingReport: { ID: 3, Value: 'VendorBill Tracking Report' },
            FinalizedOrdersWithNoVendorBills: { ID: 4, Value: 'Finalized Orders With No Vendor Bills' },
            SalesOrdersFinalizedNotInvoiced: { ID: 5, Value: 'Sales Orders Finalized Not Invoiced' },
            RebillSummaryReport: { ID: 6, Value: 'Rebill Summary Report' },
            OrderRebillReport: { ID: 7, Value: 'Order Rebill Report' },
            CRRRebillSummaryReport: { ID: 8, Value: 'CRR Rebill Summary Report' },
            DisputedVendorBills: { ID: 9, Value: 'Disputed VendorBills Report' },
            RebillReasonsReport: { ID: 10, Value: 'Rebill Reasons Report' },
            CarrierMapping: { ID: 11, Value: 'Carrier Mapping' }
        });

        (function (SearchFilterOperand) {
            SearchFilterOperand[SearchFilterOperand["Equals"] = 0] = "Equals";
            SearchFilterOperand[SearchFilterOperand["NotEquals"] = 1] = "NotEquals";
            SearchFilterOperand[SearchFilterOperand["GreaterThan"] = 2] = "GreaterThan";
            SearchFilterOperand[SearchFilterOperand["LessThan"] = 3] = "LessThan";
            SearchFilterOperand[SearchFilterOperand["GreaterThanEquals"] = 4] = "GreaterThanEquals";
            SearchFilterOperand[SearchFilterOperand["LessThanEquals"] = 5] = "LessThanEquals";
            SearchFilterOperand[SearchFilterOperand["Contains"] = 6] = "Contains";
            SearchFilterOperand[SearchFilterOperand["NotContains"] = 7] = "NotContains";
            SearchFilterOperand[SearchFilterOperand["StartsWith"] = 8] = "StartsWith";
            SearchFilterOperand[SearchFilterOperand["EndsWith"] = 9] = "EndsWith";
        })(Enums.SearchFilterOperand || (Enums.SearchFilterOperand = {}));
        var SearchFilterOperand = Enums.SearchFilterOperand;
        ;

        (function (SearchTransactionType) {
            SearchTransactionType[SearchTransactionType["PurchaseOrders"] = 0] = "PurchaseOrders";
            SearchTransactionType[SearchTransactionType["VendorBills"] = 1] = "VendorBills";
            SearchTransactionType[SearchTransactionType["Both"] = 2] = "Both";
        })(Enums.SearchTransactionType || (Enums.SearchTransactionType = {}));
        var SearchTransactionType = Enums.SearchTransactionType;
        ;

        (function (PDFViewerDimensions) {
            /**
            * EXPPDFHeight
            **/
            PDFViewerDimensions[PDFViewerDimensions["EXPPDFHeight"] = Utils.Common.prototype.isBrowserIsChrome() ? 420 : 400] = "EXPPDFHeight";

            /**
            * EXPPDFWidth
            **/
            PDFViewerDimensions[PDFViewerDimensions["EXPPDFWidth"] = Utils.Common.prototype.isBrowserIsChrome() ? 435 : 345] = "EXPPDFWidth";

            /**
            * ViewBOLPDFHeight
            **/
            PDFViewerDimensions[PDFViewerDimensions["ViewBOLPDFHeight"] = Utils.Common.prototype.isBrowserIsChrome() ? 500 : 450] = "ViewBOLPDFHeight";

            /**
            * ViewBOLPDFWidth
            **/
            PDFViewerDimensions[PDFViewerDimensions["ViewBOLPDFWidth"] = Utils.Common.prototype.isBrowserIsChrome() ? 460 : 370] = "ViewBOLPDFWidth";

            /**
            * DefaultPDFHeight
            **/
            PDFViewerDimensions[PDFViewerDimensions["DefaultPDFHeight"] = 550] = "DefaultPDFHeight";

            /**
            * DefaultPDFWidth
            **/
            PDFViewerDimensions[PDFViewerDimensions["DefaultPDFWidth"] = 440] = "DefaultPDFWidth";

            /**
            * ViewINVPDFHeight
            **/
            PDFViewerDimensions[PDFViewerDimensions["ViewINVPDFHeight"] = Utils.Common.prototype.isBrowserIsChrome() ? 500 : 450] = "ViewINVPDFHeight";

            /**
            * ViewINVPDFWidth
            **/
            PDFViewerDimensions[PDFViewerDimensions["ViewINVPDFWidth"] = Utils.Common.prototype.isBrowserIsChrome() ? 460 : 370] = "ViewINVPDFWidth";
        })(Enums.PDFViewerDimensions || (Enums.PDFViewerDimensions = {}));
        var PDFViewerDimensions = Enums.PDFViewerDimensions;

        (function (FilterViewName) {
            FilterViewName[FilterViewName["PurchaseOrderBoard"] = 1] = "PurchaseOrderBoard";
            FilterViewName[FilterViewName["CarrierMappingBoard"] = 2] = "CarrierMappingBoard";
            FilterViewName[FilterViewName["VendorBillExceptionBoard"] = 3] = "VendorBillExceptionBoard";
            FilterViewName[FilterViewName["InvoiceExceptionBoard"] = 4] = "InvoiceExceptionBoard";
            FilterViewName[FilterViewName["RequoteBoard"] = 5] = "RequoteBoard";
            FilterViewName[FilterViewName["DisputeBoard"] = 6] = "DisputeBoard";
            FilterViewName[FilterViewName["DisputeWonLossBoard"] = 7] = "DisputeWonLossBoard";
            FilterViewName[FilterViewName["TransactionSearchSalesOrder"] = 8] = "TransactionSearchSalesOrder";
            FilterViewName[FilterViewName["TransactionSearchBill"] = 9] = "TransactionSearchBill";
            FilterViewName[FilterViewName["PORexnordBoard"] = 10] = "PORexnordBoard";
            FilterViewName[FilterViewName["EDIBoard"] = 11] = "EDIBoard";
            FilterViewName[FilterViewName["FindMorePOPossibility"] = 12] = "FindMorePOPossibility";
            FilterViewName[FilterViewName["ForeignBolAddress"] = 13] = "ForeignBolAddress";
            FilterViewName[FilterViewName["ForeignBolCustomer"] = 14] = "ForeignBolCustomer";

            // ###START: US20103
            FilterViewName[FilterViewName["SubOrderProcessingBoard"] = 15] = "SubOrderProcessingBoard";
        })(Enums.FilterViewName || (Enums.FilterViewName = {}));
        var FilterViewName = Enums.FilterViewName;
        ;

        //## EDI210Structure
        Enums.Note = Object.freeze({
            General: { ID: 0, Value: 'General' },
            System: { ID: 30, Value: 'System' },
            Information: { ID: 5, Value: 'Information' },
            Dispute: { ID: 4, Value: 'Dispute' },
            Problem: { ID: 17, Value: 'Problem' },
            // ###START: DE20107
            Communication: { ID: 3, Value: 'Communication' }
        });

        // Defining the Tolerance Name/Group.
        Enums.ToleranceType = Object.freeze({
            ShippingServiceGroupDispute: { ID: 1, Value: 'Shipping Service Group Dispute' },
            FuelSurchargeGroupDispute: { ID: 2, Value: 'Fuel Surcharge Group Dispute' },
            AccessorialServiceGroupDispute: { ID: 3, Value: 'Accessorial Service Group Dispute' },
            GuaranteedChargeGroupDispute: { ID: 4, Value: 'Guaranteed Charge Group Dispute' },
            TotalBillTolerance: { ID: 5, Value: 'Total Bill Tolerance' },
            PostAuditTotalBillTolerance: { ID: 6, Value: 'Post Audit Total Bill Tolerance' },
            QuoteTolerance: { ID: 7, Value: 'Quote Tolerance' },
            ShippingServiceGroupRevenueAdjustment: { ID: 8, Value: 'Shipping Service Group Revenue Adjustment' },
            FuelSurchargeGroupRevenueAdjustment: { ID: 9, Value: 'Fuel Surcharge Group Revenue Adjustment' },
            AccessorialServiceGroupRevenueAdjustment: { ID: 10, Value: 'Accessorial Service Group Revenue Adjustment' },
            GuaranteedChargeGroupRevenueAdjustment: { ID: 11, Value: 'Guaranteed Charge Group Revenue Adjustment' },
            RevenueAdjustmentTolerance: { ID: 12, Value: 'Revenue Adjustment Tolerance' },
            TLTolerance: { ID: 13, Value: 'TL Tolerance' }
        });

        Enums.ForeignBolOptionConstant = Object.freeze({
            ShipperConsigneeAddress: 1,
            BillToAddress: 2,
            EDIBOLLength: 3,
            BOLStartsWithCharacter: 4
        });

        //## Toastr message
        Enums.ToastrMessageType = Object.freeze({
            success: { ID: 1, Value: 'success' },
            error: { ID: 2, Value: 'error' },
            info: { ID: 3, Value: 'info' },
            warning: { ID: 4, Value: 'warning' }
        });

        //##START: US20288
        //Sales Order - Credit Memo adjustment type dropdwon items
        Enums.CreditMemoAdjustmentType = Object.freeze({
            RepAbsorb: { Id: 1, Value: 'Rep Absorb' },
            GTZAbsorb: { Id: 2, Value: 'GTZ Absorb' },
            SplitAbsorb: { Id: 3, Value: 'Split Absorb' },
            DebitMemo: { Id: 4, Value: 'Vendor Credit(Debit Demo)' },
            MarginReduction: { Id: 5, Value: 'Margin Reduction' }
        });

        //Sales Order - Credit Memo Reason Code dropdown
        Enums.CreditMemoReasonCode = Object.freeze({
            TariffRatingError: { Id: 1, Value: 'Tariff or rating error' },
            SoftwareError: { Id: 2, Value: 'Software error' },
            AccountingError: { Id: 3, Value: 'Accounting error' },
            SalesRepError: { Id: 4, Value: 'Sales rep error' },
            CustomerSatisfaction: { Id: 5, Value: 'Customer Satisfaction' },
            Other: { Id: 6, Value: 'Other' }
        });

        //##END: US20288
        // ###START: US20728
        Enums.SalesOrderNotesType = Object.freeze({
            General: { ID: 0, Value: 'General' },
            IR: { ID: 101, Value: 'IR' }
        });
    })(exports.Enums || (exports.Enums = {}));
    var Enums = exports.Enums;
});
