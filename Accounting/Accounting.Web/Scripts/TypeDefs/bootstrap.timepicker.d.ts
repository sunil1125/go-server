/// <reference path="jquery.d.ts"/>

interface TimeickerOptions {
	defaultTime?: string;
	disableFocus?: boolean;
	isOpen?: boolean;
	minuteStep?: number;
	modalBackdrop?: boolean;
	secondStep?: number;
	showSeconds?: boolean;
	showInputs?: boolean;
	showMeridian?: boolean;
	template?: string;
	appendWidgetTo?: string;
	startHour?: number;
	endHour?: number;
	convertTo12: boolean;
	startHourMinute?: number;
	endHourMinute?: number;
}

interface JQuery {
    timepicker(): JQuery;
    timepicker(methodName: string): JQuery;
    timepicker(methodName: string, params: any): JQuery;
    timepicker(options: TimeickerOptions): JQuery;
}