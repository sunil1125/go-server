/// <reference path="../../../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../../../Scripts/TypeDefs/durandal.d.ts" />

import refSystem = require('durandal/system');

export interface IUserNameSearch {
	Email: string;
	FirstName: string;
	FullName: string;
	GlobalNetUserId: number;
	display: string;
	count: number;
}

export module Models {
	export class UserNameSearch {
		Email: string;
		FirstName: string;
		FullName: string;
		GlobalNetUserId: number;
		display: string;
		count: number = 0;

		constructor(args?: IUserNameSearch) {
			if (args) {
				this.Email = args.Email;
				this.FirstName = args.FirstName;
				this.FullName = args.FullName;
				this.GlobalNetUserId = args.GlobalNetUserId;
				this.display = this.FullName;
				this.count = 2;
			}
		}
	}
}