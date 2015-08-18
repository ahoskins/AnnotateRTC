// Listener for the set hotkey to open this extension
chrome.commands.onCommand.addListener(function(command) {
	if (command === 'new-note') {
		chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
		     // only one tab should be active and in the current window at once
		     var activeTab = arrayOfTabs[0];
		     url = arrayOfTabs[0].url;
		     activeWindow = arrayOfTabs[0].windowId;
		     
		     chrome.windows.getCurrent(function(win) {
				var left = win.left + Math.round((win.width - POP_UP_WIDTH) / 2);
			    var top = win.top + PADDING_TOP;
			    var height = Math.max(win.height - PADDING_TOP - PADDING_BOTTOM, 600);
			    var width = POP_UP_WIDTH;

				windowManager.showClient(width, height, left, top);
			});

  		});
	} else if (command === 'embedded-annotation') {
		chrome.tabs.executeScript(null, {file: '/node_modules/react/dist/react.js'});
		chrome.tabs.executeScript(null, {file: '/build/content-script-bundle.js'});
	}
});