/* File Created: April 10, 2014
** Created By: Achal Rastogi
*/
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />
import refSystem = require('durandal/system');

export interface IMapLocation
{
	Street: string;
	City: string;
	StateCode: string;
	State: string;
	Zip: string;
	CountryCode: number;
	Country: string;
	Zone: string;
	CountyAbbreviation: string;
	Latitude: number;
	Longitude: number;
	Display: string;
	IsEmpty?: () => boolean;
}

export module Models
{
	export class MapLocation
	{
		Street: string;
		City: string;
		StateCode: string;
		State: string;
		Zip: string;
		CountryCode: number;
		Country: string;
		Zone: string;
		CountyAbbreviation: string;
		Latitude: number;
		Longitude: number;
		Display: string;

		constructor(args?: IMapLocation)
		{
			this.Street = refSystem.isObject(args) ? (args.Street) : '';
			this.City = refSystem.isObject(args) ? (args.City) : '';
			this.StateCode = refSystem.isObject(args) ? (args.StateCode) : '';
			this.State = refSystem.isObject(args) ? (args.State) : '';
			this.Zip = refSystem.isObject(args) ? (args.Zip) : '';
			this.CountryCode = refSystem.isObject(args) ? (args.CountryCode) : 0;
			this.Country = refSystem.isObject(args) ? (args.Country) : '';
			this.Zone = refSystem.isObject(args) ? (args.Zone) : '';
			this.CountyAbbreviation = refSystem.isObject(args) ? (args.CountyAbbreviation) : '';
			this.Latitude = refSystem.isObject(args) ? (args.Latitude) : 0;
			this.Longitude = refSystem.isObject(args) ? (args.Longitude) : 0;
			this.Display = this.IsEmpty() ? '' : this.City + ', ' + this.StateCode + ' ' + this.Zip;
		}

		IsEmpty()
		{
			return this.City.trim() === '' && this.State.trim() === '' && this.StateCode.trim() === '' && this.Zip.trim() === '' && this.Zone.trim() === '';
		}
	}
}