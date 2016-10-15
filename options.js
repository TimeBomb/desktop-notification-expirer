var $save = document.getElementById('save');
var $maxDuration = document.getElementById('maxDuration');
var $maxDurationEnabled = document.getElementById('maxDurationEnabled');
var $disableSound = document.getElementById('disableSound');
var $status = document.getElementById('status');

function saveOptions() {
	chrome.storage.sync.set({
		maxDuration: $maxDuration.value,
		maxDurationEnabled: $maxDurationEnabled.checked,
		disableSound: $disableSound.checked
	}, function() {
		$status.textContent = 'Options saved.';
		setTimeout(function() {
			$status.textContent = '';
		}, 750);
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		maxDuration: 10,
		maxDurationEnabled: true,
		disableSound: false
	}, function(options) {
		$maxDuration.value = options.maxDuration;
		$maxDurationEnabled.checked = options.maxDurationEnabled;
		$disableSound.checked = options.disableSound;
	});
}

function toggleMaxDuration() {
	if ($maxDurationEnabled.checked) {
		$maxDuration.removeAttribute('disabled');
	} else {
		$maxDuration.setAttribute('disabled', 'disabled');
	}
}

function validateMaxDuration(event) {
	var duration = $maxDuration.value;
	if (isNaN(duration) && $maxDurationEnabled.checked) {
		$save.setAttribute('disabled', 'disabled');
		$maxDuration.addAttribute('style', 'background-color: red');
	} else {
		$save.removeAttribute('disabled');
		$maxDuration.removeAttribute('style');
	}
}

restoreOptions();

$save.addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);
$maxDurationEnabled.addEventListener('click', toggleMaxDuration);
$maxDuration.addEventListener('keydown', validateMaxDuration);