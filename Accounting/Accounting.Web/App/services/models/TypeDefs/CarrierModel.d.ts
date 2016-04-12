/// <reference path="CommonModels.d.ts" />

/* File Created: August 20, 2014
** Created By: Bhanu pratap
**
** Added  interface for Carriers
*/
interface ICarrierDetails {
	CarrierId: number;
	CarrierName: string;
	CarrierCode: string;
	MinimumWeight: number;
	IsVPTLCarrier: boolean;
	CarrierType: string;
	CarrierTypeId: number;
	MASCarrier: string;
	MASCode: string;
	Mapped: string;
	LegalName: string;
	Contacts: string;
	IsBlockedFromSystem: boolean;
	MassId: string;
}

interface ICarrierContactDetails{
	Id: number;
	MassCarrierID: number;
	ContactType: number;
	CarrierName: string;
	ContactName: string;
	ContactEmail: string;
	ContactPhone: string;
	ContactFax: string;
	FirstMailPeriod: number;
	SecondMailPeriod: number;
	UpdatedBy: number;
	CarrierId: number;
	DisplayName: string;
	CarrierTypes: ICarrierContactType;
}

interface ICarrierContactType{
	Id: number;
	DisplayName: string;
	IsNotificationApplicable: number;
}

interface ICarrierContacts{
	CarrierTypes: Array<ICarrierContactType>;
	CarrierContactDetails: Array<ICarrierContactDetails>;
}

interface ICarrierPacketDocument {
	DocumentPath: string;
	CarrierId: number;
	PackageType: number;
	InsuranceExpirationDate: Date;
	IsInsuranceExpired: boolean;
	DocumentPathToView: string;
	IsDocumentsUploaded: boolean;
	DocumentName: string;
	CarrierCode: string;
}