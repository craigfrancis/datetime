
	var dateTime = new function() {

		//--------------------------------------------------
		// Standard date format

			this.standardDateFormat = 'l jS F Y - g:i:sa';
			this.defaultDiffTimeA = '11:10';
			this.defaultDiffTimeB = '11:13';
			this.defaultDiffTime = 180;

		//--------------------------------------------------
		// Initialisation function used to define the global
		// variables used in this script

			this.onLoad = function() {

				//--------------------------------------------------
				// Get a reference to the fields

					dateTime.dateTimestamp = document.getElementById('dateTimestamp');
					if (!dateTime.dateTimestamp) return;

					dateTime.dateD = document.getElementById('dateD');
					if (!dateTime.dateD) return;

					dateTime.dateM = document.getElementById('dateM');
					if (!dateTime.dateM) return;

					dateTime.dateY = document.getElementById('dateY');
					if (!dateTime.dateY) return;

					dateTime.dateH = document.getElementById('dateH');
					if (!dateTime.dateH) return;

					dateTime.dateI = document.getElementById('dateI');
					if (!dateTime.dateI) return;

					dateTime.dateS = document.getElementById('dateS');
					if (!dateTime.dateS) return;

					dateTime.humanForm = document.getElementById('humanForm');
					if (!dateTime.humanForm) return;

					dateTime.diffTimeA = document.getElementById('diffTimeA');
					if (!dateTime.diffTimeA) return;

					dateTime.diffTimeB = document.getElementById('diffTimeB');
					if (!dateTime.diffTimeB) return;

					dateTime.diffOutput = document.getElementById('diffOutput');
					if (!dateTime.diffOutput) return;

					dateTime.formatCode = document.getElementById('formatCode');
					if (!dateTime.formatCode) return;

					dateTime.formatOutput = document.getElementById('formatOutput');
					if (!dateTime.formatOutput) return;

				//--------------------------------------------------
				// Add the onkeyup event handlers for the fields

					dateTime.dateTimestamp.onkeyup = dateTime.dateFieldChange;

					dateTime.dateY.onkeyup = dateTime.dateFieldChange;
					dateTime.dateM.onkeyup = dateTime.dateFieldChange;
					dateTime.dateD.onkeyup = dateTime.dateFieldChange;
					dateTime.dateH.onkeyup = dateTime.dateFieldChange;
					dateTime.dateI.onkeyup = dateTime.dateFieldChange;
					dateTime.dateS.onkeyup = dateTime.dateFieldChange;

					dateTime.diffTimeA.onkeyup = dateTime.diffFieldChange;
					dateTime.diffTimeB.onkeyup = dateTime.diffFieldChange;

					dateTime.formatCode.onkeyup = dateTime.formatFieldChange;

				//--------------------------------------------------
				// Add event handlers to the formatButtons

					var formatButtons = document.getElementById('formatButtons');
					if (formatButtons) {
						var links = formatButtons.getElementsByTagName('a');
						for (var i = (links.length - 1); i >= 0; i--) {
							links[i].addEventListener('click', dateTime.formatButtonsClick);
						}
					}

				//--------------------------------------------------
				// Variable to determine when the user entered
				// their own timestamp

					dateTime.userTimestamp = 0;

				//--------------------------------------------------
				// Trigger the onShow function - as though this
				// widget is going though a routine onShow

					dateTime.onShow();

			}

		//--------------------------------------------------
		// If the widget has triggered onShow

			this.onShow = function() {

				//--------------------------------------------------
				// Update the default time-stamp.

					var newTimeStamp = dateTime.getTimestamp();

					dateTime.dateTimestamp.value = newTimeStamp;
					dateTime.diffTimeA.value = dateTime.defaultDiffTimeA;
					dateTime.diffTimeB.value = dateTime.defaultDiffTimeB;
					dateTime.formatCode.value = dateTime.standardDateFormat;

				//--------------------------------------------------
				// Update the form

					dateTime.updateTimestamp();
					dateTime.diffFieldChange();
					dateTime.updateFormat();

			}

		//--------------------------------------------------
		// If someone has changed a date field

			this.dateFieldChange = function() {

				//--------------------------------------------------
				// Record that the user has done something, so
				// they don't want to loose this change (just yet).

					dateTime.userTimestamp = dateTime.getTimestamp();

				//--------------------------------------------------
				// Update the form fields

					if (this == dateTime.dateTimestamp) {
						dateTime.updateTimestamp();
					} else {
						dateTime.updateDate();
					}

			}

		//--------------------------------------------------
		// Update the relevant set of date fields

			this.updateTimestamp = function() {

				//--------------------------------------------------
				// Get the timestamp

					var timestamp = parseInt(dateTime.dateTimestamp.value);

				//--------------------------------------------------
				// Build the date object

					var newDate = new Date();
					newDate.setTime(timestamp * 1000);

				//--------------------------------------------------
				// Update the display

					dateTime.dateY.value = newDate.getFullYear();
					dateTime.dateM.value = newDate.getMonth() + 1;
					dateTime.dateD.value = newDate.getDate();
					dateTime.dateH.value = newDate.getHours();
					dateTime.dateI.value = newDate.getMinutes();
					dateTime.dateS.value = newDate.getSeconds();

					setTimeout(function() {
							dateTime.humanForm.textContent = dateTime.dateFormatStandard(timestamp, 'l jS F Y - H:i:s (ga)');
						});

			}

			this.updateDate = function() {

				//--------------------------------------------------
				// Build the date object

					var newDate = new Date();
					newDate.setFullYear(parseInt(dateTime.dateY.value));
					newDate.setMonth(parseInt(dateTime.dateM.value) - 1);
					newDate.setDate(parseInt(dateTime.dateD.value));
					newDate.setHours(parseInt(dateTime.dateH.value));
					newDate.setMinutes(parseInt(dateTime.dateI.value));
					newDate.setSeconds(parseInt(dateTime.dateS.value));

				//--------------------------------------------------
				// Get the timestamp

					var timestamp = Math.floor(newDate.getTime() / 1000);

				//--------------------------------------------------
				// Update the display

					if (!isNaN(timestamp)) {

						dateTime.dateTimestamp.value = timestamp;

						setTimeout(function() {
								dateTime.humanForm.textContent = dateTime.dateFormatStandard(timestamp, dateTime.standardDateFormat);
							});

					} else {

						dateTime.dateTimestamp.value = 0;
						dateTime.humanForm.textContent = 'N/A';

					}

			}

		//--------------------------------------------------
		// If someone has changed a difference field

			this.diffFieldChange = function() {

				//--------------------------------------------------
				// Record that the user has done something, so
				// they don't want to loose this change (just yet).

					dateTime.userTimestamp = dateTime.getTimestamp();

				//--------------------------------------------------
				// Update the form fields

					dateTime.updateDiff();

			}

		//--------------------------------------------------
		// If difference times have been updated

			this.updateDiff = function() {

				//--------------------------------------------------
				// Get the values

					var timeA = dateTime.diffTimeA.value;
					var timeB = dateTime.diffTimeB.value;

				//--------------------------------------------------
				// Calculate the difference

					if (window.DateTimeApp) {

						setTimeout(function() {
								var diff = DateTimeApp.message('dateDiff', JSON.stringify([timeA, timeB]));
								dateTime.updateDiffResponse(diff);
							});

					} else if (timeA == dateTime.defaultDiffTimeA && timeB == dateTime.defaultDiffTimeB) {

						dateTime.updateDiffResponse(dateTime.defaultDiffTime);

					}

			}

			this.updateDiffResponse = function(input_seconds) {

				//--------------------------------------------------
				// Display to the user

					input_seconds = parseFloat(input_seconds);

					if (input_seconds == null || isNaN(input_seconds)) {

						dateTime.diffOutput.textContent = 'Not Available';

					} else {

						//--------------------------------------------------
						// Maths

							output_seconds = (input_seconds % 60);
							input_seconds -= output_seconds;

							min_seconds = (input_seconds % 3600);
							input_seconds -= min_seconds;
							output_minutes = (min_seconds / 60);

							hour_seconds = (input_seconds % 86400);
							input_seconds -= hour_seconds;
							output_hours = (hour_seconds / 3600);

							day_seconds = (input_seconds % 604800);
							input_seconds -= day_seconds;
							output_days = (day_seconds / 86400);

							output_weeks = (input_seconds / 604800);

						//--------------------------------------------------
						// Text

							output_text = [];

							if (output_weeks    > 0) output_text.push(output_weeks    + ' week'   + (output_weeks    != 1 ? 's' : ''));
							if (output_days     > 0) output_text.push(output_days     + ' day'    + (output_days     != 1 ? 's' : ''));
							if (output_hours    > 0) output_text.push(output_hours    + ' hour'   + (output_hours    != 1 ? 's' : ''));
							if (output_minutes  > 0) output_text.push(output_minutes  + ' minute' + (output_minutes  != 1 ? 's' : ''));

							if (output_seconds > 0 || output_text.length == 0) {
								output_text.push(output_seconds  + ' second' + (output_seconds != 1 ? 's' : ''));
							}

						//--------------------------------------------------
						// Grammar

							output_text = output_text.join(', ');
							output_text = output_text.replace(/, ([^,]+)$/, ', and $1');

						//--------------------------------------------------
						// Output

							dateTime.diffOutput.textContent = output_text + '.';

					}

			}

		//--------------------------------------------------
		// Function called when one of the function buttons
		// are clicked.

			this.formatButtonsClick = function(e) {

				//--------------------------------------------------
				// Record that the user has done something, so
				// they don't want to loose this change (just yet).

					dateTime.userTimestamp = dateTime.getTimestamp();

				//--------------------------------------------------
				// Update the format input field

					var exp = new RegExp('\\breplace\\b');
					if (exp.test(this.className)) { // Replace

						dateTime.formatCode.value = this.rel;

						var selEnd = this.rel.length;

					} else {

						var selStart = dateTime.formatCode.selectionStart;
						var selEnd = dateTime.formatCode.selectionEnd;
						var oldVal = dateTime.formatCode.value;

						dateTime.formatCode.value = oldVal.substring(0, selStart) + this.rel + oldVal.substring(selEnd, oldVal.length);

						selEnd = selEnd + this.rel.length;

					}

				//--------------------------------------------------
				// Return focus to the formatCode box

					dateTime.formatCode.selectionStart = selEnd;
					dateTime.formatCode.selectionEnd = selEnd;
					dateTime.formatCode.focus();

				//--------------------------------------------------
				// Stop the link from working

					e.preventDefault();

				//--------------------------------------------------
				// Update the example output

					dateTime.updateFormat();

			}

		//--------------------------------------------------
		// If someone has changed a date field

			this.formatFieldChange = function() {

				//--------------------------------------------------
				// Record that the user has done something, so
				// they don't want to loose this change (just yet).

					dateTime.userTimestamp = dateTime.getTimestamp();

				//--------------------------------------------------
				// Update the form fields

					dateTime.updateFormat();

			}

		//--------------------------------------------------
		// If the date format box is updated

			this.updateFormat = function() {
				setTimeout(function() {
						dateTime.formatOutput.textContent = dateTime.dateFormat(dateTime.dateTimestamp.value, dateTime.formatCode.value);
					});
			}

		//--------------------------------------------------
		// Quick function to return a clean time-stamp

			this.getTimestamp = function() {
				var date = new Date();
				return Math.floor(date.getTime() / 1000);
			}

		//--------------------------------------------------
		// Function to call the external PHP file and return
		// a date/time string in a specific format

			this.dateFormatStandard = function (timestamp, format) {
				return dateTime.dateFormat(timestamp, format);
			}

			this.dateFormat = function (timestamp, format) {

				if (window.DateTimeApp) {
					return DateTimeApp.message('dateFormat', JSON.stringify([parseInt(timestamp), format]));
				} else {
					if (format == 'l jS F Y, g:i:sa') {
						return 'Thursday 1st January 1970, 12:00:00am';
					} else {
						return 'Not Available';
					}
				}

			}

		//--------------------------------------------------
		// When window loads, or the widget is shown, then
		// trigger the relevant actions

			document.addEventListener('DOMContentLoaded', this.onLoad);

	}
