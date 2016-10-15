(function() {
	var _Notification = Notification;
	var notificationHistory = [];
	var muteNotifications = false;

	var MAX_DURATION_ENABLED = true;
	var MAX_DURATION = 10;
	var DISABLE_SOUND = false;

	chrome.storage.sync.get({
		maxDurationEnabled: true,
		maxDuration: 10,
		disableSound: false
	}, function(options) {
		MAX_DURATION_ENABLED = options.maxDurationEnabled;
		MAX_DURATION = options.maxDuration;
		DISABLE_SOUND = options.disableSound;
	});

	var MAIN_ACTION = 'history';
	var DUMMY_NOTIFICATION = {
		actions: [],
		badge: '',
		body: '',
		data: null,
		dir: 'auto',
		icon: '',
		lang: '',
		onclick: null,
		onclose: null,
		onerror: null,
		onshow: null,
		renotify: false,
		requireInteraction: false,
		silent: false,
		tag: '',
		timestamp: 0,
		title: '',
		vibrate: []
	};

	Notification = function(title, options) {
		var notification;
		if (!title) {
			console.error('Uncaught TypeError: Failed to construct \'Notification\': 1 argument required, but only 0 present.');
			return;
		}

		notificationHistory.push({
			time: new Date(),
			args: {
				title: title,
				options: options
			}
		});

		if (!muteNotifications) {
			notification = new _Notification(title, options);
		}

		if (DISABLE_SOUND && typeof options === 'object') {
			options.sound = null;
		}

		if (MAX_DURATION_ENABLED) {
			window.setTimeout(function() {
				notification.close();
			}, MAX_DURATION * 1000);
		}

		// Return dummy notification if we're muting notifications, so we don't break other apps using notifications. How nice are we?
		return notification || JSON.parse(JSON.stringify(DUMMY_NOTIFICATION));
	};
	Notification.requestPermission = _Notification.requestPermission;

	// TODO: Decide if main action is viewing history or muting notifications
	chrome.browserAction.onClicked.addListener(viewHistory);

		function viewHistory() {
		// TODO: ...Viewing history
	}

	function toggleNotificationMuting() {
		muteNotifications = !muteNotifications;
		// TODO: Update extension icon to represent state of muting
	}
})(window);