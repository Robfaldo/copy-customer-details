chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    sendResponse({message: "The response to the message is going through"});

    // when the customer details buttom is clicked it stores them in memory
    // TODO: change the key to meaningful name (erroring when I'm doing it and not sure why)
    chrome.storage.sync.set({key: request.customerDetails}, function() {
       chrome.runtime.sendMessage({customerDetailsSaved: true}, function(response) {
         // currently not needing/doing anything with the response
       });
     });

    // TODO: need to check if it already exists, if not then create (atm kicking error saying it can't create another with the same ID)
    // chrome.contextMenus.create({
    //   "id": "newContextMenu",
    //   "title": "NewContextMenu",
    //   "contexts": ["page"]
    // });
  });

  // TODO: Do I want to have the right click option for pasting?
  // chrome.runtime.onInstalled.addListener(function() {
  //   chrome.contextMenus.create({
  //     "id": "mainContextMenu",
  //     "title": "Options to paste customer details",
  //     "contexts": ["page"]
  //   });
  // });

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
