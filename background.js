chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "mainContextMenu",
    "title": "Options to paste customer details",
    "contexts": ["page"]
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("reaching listener onmessage")

    // TODO: need to check if it already exists, if not then create (atm kicking error saying it can't create another with the same ID)
    chrome.contextMenus.create({
      "id": "newContextMenu",
      "title": "NewContextMenu",
      "contexts": ["page"]
    });

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
