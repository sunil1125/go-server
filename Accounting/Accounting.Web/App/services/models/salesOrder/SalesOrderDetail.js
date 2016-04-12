/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../TypeDefs/SalesOrderModels.d.ts" />
define(["require", "exports", 'durandal/system'], function(require, exports, __refSystem__) {
    var refSystem = __refSystem__;

    /* File Created: Sep 9, 2014
    ** Created By: Satish
    */
    (function (Models) {
        var SalesOrderDetail = (function () {
            // ###END: DE21747
            function SalesOrderDetail(args) {
                this.Id = refSystem.isObject(args) ? args.Id : 0;
                this.CustomerId = refSystem.isObject(args) ? args.CustomerId : 0;
                this.BookedDate = refSystem.isObject(args) ? args.BookedDate : new Date();
                this.SalesOrderNo = refSystem.isObject(args) ? args.SalesOrderNo : 0;
                this.PoNo = refSystem.isObject(args) ? args.PoNo : '';
                this.BolNumber = refSystem.isObject(args) ? args.BolNumber : '';
                this.MainBolNo = refSystem.isObject(args) ? args.MainBolNo : '';
                this.ProNo = refSystem.isObject(args) ? args.ProNo : '';
                this.CustomerBolNo = refSystem.isObject(args) ? args.CustomerBolNo : '';
                this.BolID = refSystem.isObject(args) ? args.BolID : 0;
                this.SalesRepId = refSystem.isObject(args) ? args.SalesRepId : 0;
                this.ReferenceNo = refSystem.isObject(args) ? args.ReferenceNo : '';
                this.OriginZip = refSystem.isObject(args) ? args.OriginZip : '';
                this.DestinationZip = refSystem.isObject(args) ? args.DestinationZip : '';
                this.TotalPieces = refSystem.isObject(args) ? args.TotalPieces : 0;
                this.TotalWeight = refSystem.isObject(args) ? args.TotalWeight : 0;
                this.Url = refSystem.isObject(args) ? args.Url : '';
                this.CarrierId = refSystem.isObject(args) ? args.CarrierId : 0;
                this.OrderStatusId = refSystem.isObject(args) ? args.OrderStatusId : 0;
                this.RequestedPickupDate = refSystem.isObject(args) ? args.RequestedPickupDate : new Date();
                this.PickupDate = refSystem.isObject(args) ? args.PickupDate : new Date();
                this.InvoiceDate = refSystem.isObject(args) ? args.InvoiceDate : new Date();
                this.CloseTimeString = refSystem.isObject(args) ? args.CloseTimeString : '';
                this.ReadyTimeString = refSystem.isObject(args) ? args.ReadyTimeString : '';
                this.TransitDays = refSystem.isObject(args) ? args.TransitDays : '';
                this.ShipmentBy = refSystem.isObject(args) ? args.ShipmentBy : '';
                this.OriginTerminalPhone = refSystem.isObject(args) ? args.OriginTerminalPhone : '';
                this.DestinationTerminalPhone = refSystem.isObject(args) ? args.DestinationTerminalPhone : '';
                this.ServiceType = refSystem.isObject(args) ? args.ServiceType : 0;
                this.EmergencyContactNo = refSystem.isObject(args) ? args.EmergencyContactNo : '';
                this.EmergencyContactExtension = refSystem.isObject(args) ? args.EmergencyContactExtension : '';
                this.PickupRemarks = refSystem.isObject(args) ? args.PickupRemarks : '';
                this.DeliveryRemarks = refSystem.isObject(args) ? args.DeliveryRemarks : '';
                this.Cost = refSystem.isObject(args) ? args.Cost : 0;
                this.Revenue = refSystem.isObject(args) ? args.Revenue : 0;
                this.CustomerName = refSystem.isObject(args) ? args.CustomerName : '';
                this.SalesRepName = refSystem.isObject(args) ? args.SalesRepName : '';
                this.CarrierName = refSystem.isObject(args) ? args.CarrierName : '';
                this.InvoiceStatus = refSystem.isObject(args) ? args.InvoiceStatus : 0;
                this.UpdatedDateTime = refSystem.isObject(args) ? args.UpdatedDateTime : 0;
                this.EstimatedDueDate = refSystem.isObject(args) ? args.EstimatedDueDate : new Date();
                this.VendorBillId = refSystem.isObject(args) ? args.VendorBillId : 0;
                this.ActualCost = refSystem.isObject(args) ? args.ActualCost : 0;
                this.ActualProfit = refSystem.isObject(args) ? args.ActualProfit : 0;
                this.ActualProfitPer = refSystem.isObject(args) ? args.ActualProfit : 0;
                this.TotalCost = refSystem.isObject(args) ? args.TotalCost : 0;
                this.TotalRevenue = refSystem.isObject(args) ? args.TotalRevenue : 0;
                this.TotalPLCCost = refSystem.isObject(args) ? args.TotalPLCCost : 0;
                this.ProcessStatusId = refSystem.isObject(args) ? args.ProcessStatusId : 0;
                this.DeliveryDate = refSystem.isObject(args) ? args.DeliveryDate : new Date();
                this.InsuredAmount = refSystem.isObject(args) ? args.InsuredAmount : 0;
                this.AllowEDI204Dispatch = refSystem.isObject(args) ? args.AllowEDI204Dispatch : false;
                this.InsuranceNumber = refSystem.isObject(args) ? args.InsuranceNumber : 0;
                this.IsEDISupport = refSystem.isObject(args) ? args.IsEDISupport : false;
                this.GTMargin = refSystem.isObject(args) ? args.GTMargin : 0;
                this.PLCMargin = refSystem.isObject(args) ? args.PLCMargin : 0;
                this.PLCVendorBillId = refSystem.isObject(args) ? args.PLCVendorBillId : 0;
                this.PlcCost = refSystem.isObject(args) ? args.PlcCost : 0;
                this.IsPROAllowed = refSystem.isObject(args) ? args.IsPROAllowed : false;
                this.CarrierPickupNumber = refSystem.isObject(args) ? args.CarrierPickupNumber : '';
                this.BillToLocationType = refSystem.isObject(args) ? args.BillToLocationType : 0;
                this.InternalBOL = refSystem.isObject(args) ? args.InternalBOL : '';
                this.NewShipmentType = refSystem.isObject(args) ? args.NewShipmentType : 0;
                this.ProcessFlowFlag = refSystem.isObject(args) ? args.ProcessFlowFlag : 0;
                this.TariffType = refSystem.isObject(args) ? args.TariffType : '';
                this.OrderStatusList = refSystem.isObject(args) ? args.OrderStatusList : null;
                this.SelectedShipVia = refSystem.isObject(args) ? args.SelectedShipVia : 0;
                this.AgencyName = refSystem.isObject(args) ? args.AgencyName : '';
                this.PartnerCompanyId = refSystem.isObject(args) ? args.PartnerCompanyId : 0;
                this.IsBillingStation = refSystem.isObject(args) ? args.IsBillingStation : false;
                this.Distance = refSystem.isObject(args) ? args.Distance : 0;
                this.CarrierType = refSystem.isObject(args) ? args.CarrierType : 0;
                this.IsSaveEnable = refSystem.isObject(args) ? args.IsSaveEnable : true;
                this.OriginalRevenue = refSystem.isObject(args) ? args.OriginalRevenue : 0;
                this.IsSaveEnable = refSystem.isObject(args) ? args.IsSaveEnable : true;
                this.CanEditCarrier = refSystem.isObject(args) ? args.CanEditCarrier : true;
                this.CanEditCustomer = refSystem.isObject(args) ? args.CanEditCustomer : true;
                this.CanEditBSCOST = refSystem.isObject(args) ? args.CanEditBSCOST : true;
                this.CanEditItemsDescription = refSystem.isObject(args) ? args.CanEditItemsDescription : true;
                this.CarrierCode = refSystem.isObject(args) ? args.CarrierCode : '';
                this.OriginalPLCCost = refSystem.isObject(args) ? args.OriginalPLCCost : 0;
                this.ContactName = refSystem.isObject(args) ? args.ContactName : '';
                this.CalendarDays = refSystem.isObject(args) ? args.CalendarDays : '';
                this.LTLCalendarDays = refSystem.isObject(args) ? args.LTLCalendarDays : '';
                this.OceanCalendarDays = refSystem.isObject(args) ? args.OceanCalendarDays : '';
                this.IsCalendarDaysNull = refSystem.isObject(args) ? args.IsCalendarDaysNull : false;

                // ###START: DE21747
                this.ShipmentCarrierType = refSystem.isObject(args) ? args.ShipmentCarrierType : 0;
                // ###END: DE21747
            }
            return SalesOrderDetail;
        })();
        Models.SalesOrderDetail = SalesOrderDetail;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
