chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "sampleContextMenu",
    "title": "Sample Context Menu",
    "contexts": ["selection"]
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("reaching listener onmessage")
    if (request.message === "hi there")
      sendResponse({message: "hi to you too"});
  });

// I dont think this is doing anything
chrome.runtime.onInstalled.addListener(function() {
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {pathContains: 'backoffice/rfqs/'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
 });
