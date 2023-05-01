var dayInput = document.querySelector("#day");
var monthInput = document.querySelector("#month");
var yearInput = document.querySelector("#year");

var dayOutput = document.querySelector("#dayOut");
var monthOutput = document.querySelector("#monthOut");
var yearOutput = document.querySelector("#yearOut");

var dayErr = document.querySelector("#dayerror");
var monthErr = document.querySelector("#montherror");
var yearErr = document.querySelector("#yearerror");

var dayLab = document.querySelector("#daylab");
var monthLab = document.querySelector("#monthlab");
var yearLab = document.querySelector("#yearlab");

var go = document.querySelector("#go");

go.addEventListener("click", showresult);

function showresult() {
	var err = false;

	clearError();

	var bDay = dayInput.value;
	var bMonth = monthInput.value;
	var bYear = yearInput.value;

	var current = new Date();

	var day = current.getDate();
	var month = current.getMonth() + 1;
	var year = current.getFullYear();

	var daysNum;
	if (bMonth == 2) {
		if (bYear % 4 == 0) {
			daysNum = 29;
		} else {
			daysNum = 28;
		}
	} else if ((bMonth % 2 == 0) ^ (bMonth > 7)) {
		daysNum = 30;
	} else {
		daysNum = 31;
	}

	if (bDay === "") {
		showError(dayErr, dayInput, dayLab, "This feild is required");
		err = true;
	} else if (bDay > 31 || bDay < 1) {
		showError(dayErr, dayInput, dayLab, "Must be a valid day");
		err = true;
	}

	if (bMonth === "") {
		showError(monthErr, monthInput, monthLab, "This feild is required");
		err = true;
	} else if (bMonth > 12 || bMonth < 1) {
		showError(monthErr, monthInput, monthLab, "Must be a valid month");
		err = true;
	}

	var dayDiff = day - bDay;
	if (day < bDay) {
		dayDiff += daysNum;
		month--;
	}

	var monthDiff = month - bMonth;
	if (month < bMonth) {
		monthDiff += 12;
		year--;
	}

	var yearDiff = year - bYear;

	if (bYear === "") {
		showError(yearErr, yearInput, yearLab, "This feild is required");
		err = true;
	} else if (yearDiff < 0) {
		showError(yearErr, yearInput, yearLab, "Must be in the past");
		err = true;
	}

	if (err) {
		return;
	}

	dayOutput.textContent = dayDiff;
	monthOutput.textContent = monthDiff;
	yearOutput.textContent = yearDiff;

	if (bDay > daysNum) {
		showError(dayErr, dayInput, dayLab, "Must be a valid date");
		showError(monthErr, monthInput, monthLab, "");
		showError(yearErr, yearInput, yearLab, "");
	}
}

function clearOutput() {
	document.querySelectorAll(".output").forEach((element) => {
		element.textContent = "--";
	});
}

function clearError() {
	document.querySelectorAll(".error").forEach((element) => {
		element.textContent = "";
	});
	document.querySelectorAll("label").forEach((element) => {
		element.style.color = "";
	});
	document.querySelectorAll("input").forEach((element) => {
		element.style.borderColor = "";
	});
}

function showError(error, input, label, txt) {
	error.textContent = txt;
	input.style.borderColor = "red";
	label.style.color = "red";
	clearOutput();
}
