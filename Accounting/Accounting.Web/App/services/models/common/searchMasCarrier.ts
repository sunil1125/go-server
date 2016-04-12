/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />

import refSystem = require('durandal/system');

export interface IMasCarrierSearch {
	MassId: string;
	MassCarrierName: string;
}

export module Models {
	export class MasCarrierSearch {
		MassId: string;
		MassCarrierName: string;
		count: number = 0;
		display: string;

		constructor(args?: IMasCarrierSearch) {
			if (args) {
				this.MassId = args.MassId;
				this.MassCarrierName = args.MassCarrierName;
				this.count = 2;
				this.display = args.MassCarrierName+", "+args.MassId;
			}
		}
	}
}