$.fn.dateCounter = function(params) {
	var that = this;

	that.options = {
		targetDate: params.targetDate
	};
	that.options.useGMT = params.useGMT || true;

	function calculateDiffInMillis() {
		var now = getDate(new Date());
		var date = getDate(that.options.targetDate);
		return date.getTime() - now.getTime();
	}

	function insertZeroLeft(value) {
		return ((value < 10) ? '0' + value : value);
	}

	function mountResult(days, hours, minutes, seconds) {
		var result = '';
		var has = false;
		if (days > 0) {
			result += '<span class="days">' + days + ' dia' + ((days > 1) ? 's' : '') + '</span>';
			has = true;
		}
		var hour = ', ' + hours + ':' + minutes + ':' + seconds;
		result += hour;
		return result;
	}

	function mountAndSetResult(days, hours, minutes, seconds) {
		that.html(mountResult(days, hours, minutes, seconds));
	}

	function showCalculatedTime() {
		var millis = calculateDiffInMillis();

		var x = millis / 1000;
		var seconds = insertZeroLeft(parseInt(x % 60));
		x /= 60;
		var minutes = insertZeroLeft(parseInt(x % 60));
		x /= 60;
		var hours = insertZeroLeft(parseInt(x % 24));
		x /= 24;
		var days = parseInt(x);

		mountAndSetResult(days, hours, minutes, seconds);

		setTimeout(showCalculatedTime, 1000);
	}

	function init() {
		showCalculatedTime();
	}

	function getDate(date) {
		if (that.options.useGMT) {
			date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
				date.getMinutes(), date.getSeconds()));
		}
		return date;
	}

	function plurarize(string, value) {
		return ' ' + string + ((value > 1) ? 's' : '');
	}

	init();

};