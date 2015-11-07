chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (tab.url.indexOf("www.baidu.com/s?") > -1) {
		var wd = tab.url.match(/wd=(.*?)(&|$)/);
		var kw = "";
		if (wd) {
			kw = decodeURI(wd[1]);
		}
		chrome.tabs.sendMessage(tabId, { keyword: kw }, function (response) {});
	}
});

