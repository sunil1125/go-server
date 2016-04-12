//#region Reference
/// <reference path="../../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../../Scripts/TypeDefs/bootstrap.datepicker.d.ts" />
//#endregion

/* File Created: April 26, 2014
** Created By: Satish
** To implement the required validations.
  isValidDate => to compare the given dates
*/

//#region Import

//endregion

/***********************************************
   Validations
************************************************
** <summary>
** To implement the required validations.  isValidDate => to compare the given dates
** </summary>
** <createDetails>
** <id></id><by>Satish</by> <date>April 26, 2014</date>
** </createDetails>
** <changeHistory>
** <id>DE21776</id> <by>Vasanthakumar</by><date>12-02-2016</date><description>Do not allow user to enter system date in UVB to SO Process</description>
** </changeHistory>

***********************************************/

export module Validations {
	export var isValidDate = function (dateToValidate, todaydate, type) {
		// Parses a date string in a given format and returns
		// a true3 if the parsing was successful, or false
		// if parsing failed
		if (dateToValidate) {
			// Usage: parseDate("14/08/12", "dmy", "/")
			// The example above passes a date in day, month, year format
			// delimited by a forward slash
			var dateFormat = 'mm/dd/yyyy', delimiter = '/';

			var invalidCharsRegEx = new RegExp("[^0-9" + delimiter + "]");

			if ((new Date(dateToValidate) > new Date(todaydate)) && type == "BillDate") {
				return false;
			}

			// ###START: DE21776
			if ((new Date(dateToValidate).getTime() == new Date(todaydate).getTime()) && type == "CurrentDate") {
				return false;
			}
			// ###END: DE21776

			if (invalidCharsRegEx.test(dateToValidate)) {
				// The given date contains invalid characters
				return false;
			}

			var dayIndex = dateFormat.indexOf("d");
			var monthIndex = dateFormat.indexOf("m");
			var yearIndex = dateFormat.indexOf("y");
			var dateParts = dateToValidate.split(delimiter);

			if (dayIndex < 0 || monthIndex < 0 || yearIndex < 0 || dateParts.length < 3) {
				// The supplied date format is incorrect
				return false;
			}
			// Convert the date component parts to numbers
			//var monthNumber = parseInt(dateParts[monthIndex], 10);
			//var dayNumber = parseInt(dateParts[dayIndex], 10);
			//var yearNumber = parseInt(dateParts[yearIndex], 10);

			var monthNumber = parseInt(dateParts[0], 10);
			var dayNumber = parseInt(dateParts[1], 10);
			var yearNumber = parseInt(dateParts[2], 10);

			if (isNaN(dayNumber) || isNaN(monthNumber) || isNaN(yearNumber)) {
				// The day, month or year cannot be determined
				return false;
			}

			if (dayNumber < 1 || dayNumber > 31) {
				// Invalid day
				return false;
			}

			if (monthNumber < 1 || monthNumber > 12) {
				// Invalid month
				return false;
			}

			if (monthNumber == 2) {
				// The month is Feb; see if it's a leap year
				var leapYear = (yearNumber % 4 == 0 &&
					(yearNumber % 100 != 0 ||
					yearNumber % 400 == 0));

				if (leapYear) {
					// It is a leap year, so there's 29 days
					if (dayNumber > 29) {
						// Invalid day in Feb
						return false;
					}
				}
				else {
					// Not a leap year
					if (dayNumber > 28) {
						// It's not a leap year
						return false;
					}
				}
			}
			else {
				// Not February
				if (dayNumber == 31) {
					// It's the 31st day
					if (monthNumber == 4 ||
						monthNumber == 6 ||
						monthNumber == 9 ||
						monthNumber == 11) {
						// The 31st is invalid
						return false;
					}
				}
			}

			// Try to create a new date object
			var parsedDate = new Date(
				yearNumber,
				monthNumber - 1,
				dayNumber);

			if (parsedDate.toDateString() == "Invalid Date") {
				// The date is invalid
				return parsedDate;
			}
			else {
				// The date is valid
				return parsedDate;
			}
		}
		return false;
	};

	//class to perform required validations
	export class NumericValidation {
		// Method to validate number by using minimum and maximum value.
		public ValidNumberMinMax(value, minValue = 0, maxValue = 0) {
			return value > minValue && value <= maxValue;
		}
	}

	//class to convert numeric string into date

	export class CommonDate {
		//// convert a string into date
		public ConvertToDate(olddate: string) {
			var oldDate = olddate;
			if (typeof (olddate) !== "string") {
				if (olddate !== undefined && olddate !== null) {
					oldDate = olddate.toString();
				}
				else {
					return false;
				}
			}
			var dateLength = oldDate.length;

			// to display current date if any error comes
			var Months = (new Date().getMonth() + 1).toString(); //"01"
			var days = new Date().getDate().toString(); //"01";
			var Years = new Date().getFullYear();

			// to assign curent dates
			var currentMonths = (new Date().getMonth() + 1).toString();
			currentMonths = currentMonths.length === 1 ? "0" + currentMonths : currentMonths;
			var currentdays = new Date().getDate().toString();
			currentdays = currentdays.length === 1 ? "0" + currentdays : currentdays;
			var currentYears = new Date().getFullYear();
			////
			var maxMonthDays = "31";
			var minYear = "1999";
			var maxYear = "2100";
			// When user enter in format MMDDYYYY
			if (dateLength === 8) {
				Months = oldDate.substring(0, 2);
				days = oldDate.substring(2, 4);
				Years = parseInt(oldDate.substring(4, 8));
				if (Months === "01" || Months === "03" || Months === "05" || Months === "07" || Months === "08" || Months === "10" || Months === "12") {
					maxMonthDays = "31";
				}
				else if (Months === "04" || Months === "06" || Months === "09" || Months === "11") {
					maxMonthDays = "30";
				}
				else if (Months === "02") {
					// To check LeapYear For Feb Month
					if (((Years % 4 == 0) && (Years % 100 != 0)) || (Years % 400 == 0)) {
						maxMonthDays = "29";
					}
					else {
						maxMonthDays = "28";
					}
				}
				else {
					Months = currentMonths;
					maxMonthDays = currentdays;
				}
			}

			// When user enter in format MDDYYYY
			else if (dateLength === 7) {
				Months = oldDate.substring(0, 1);
				days = oldDate.substring(1, 3);
				Years = parseInt(oldDate.substring(3, 7));
				//month 1 will look like 01
				Months = "0" + Months;
				if (Months === "01" || Months === "03" || Months === "05" || Months === "07" || Months === "08") {
					maxMonthDays = "31";
				}
				else if (Months === "04" || Months === "06" || Months === "09") {
					maxMonthDays = "30";
				}
				else if (Months === "02") {
					// To check LeapYear For Feb Month
					if (((Years % 4 == 0) && (Years % 100 != 0)) || (Years % 400 == 0)) {
						maxMonthDays = "29";
					}
					else {
						maxMonthDays = "28";
					}
				}
				else {
					Months = currentMonths;
					maxMonthDays = currentdays;
				}
			}

			// When user enter in format MDYYYY
            else if (dateLength === 6) {
                Months = oldDate.substring(0, 2);
                days = oldDate.substring(2, 4);
               // Years = oldDate.substring(4, 6);
                Years = +("20" + oldDate.substring(4, 6));
                if (Months === "01" || Months === "03" || Months === "05" || Months === "07" || Months === "08" || Months === "10" || Months === "12") {
                    maxMonthDays = "31";
                }
                else if (Months === "04" || Months === "06" || Months === "09" || Months === "11") {
                    maxMonthDays = "30";
                }
                else if (Months === "02") {
                    // To check LeapYear For Feb Month
                    if (((Years % 4 == 0) && (Years % 100 != 0)) || (Years % 400 == 0)) {
                        maxMonthDays = "29";
                    }
                    else {
                        maxMonthDays = "28";
                    }
                }
                else {
                    Months = currentMonths;
                    maxMonthDays = currentdays;
                    Years = currentYears;
                }
			}
			//find new Date
			var currentYear = new Date().getFullYear().toString();
			var newMonths = Months === "00" ? currentMonths : Months;
			var newDays = days > maxMonthDays || days === "00" ? currentdays : days;
			var newYears = Years.toString() < minYear || Years.toString() > maxYear ? currentYear : Years.toString();
			var newDate = newMonths + "/" + newDays + "/" + newYears;
			return newDate;
		}
	}
}