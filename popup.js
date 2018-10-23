let copyDetails = document.getElementById('copyDetails');

chrome.runtime.onMessage.addListener(
   (request) => {
     chrome.extension.getBackgroundPage().console.log(request);
});


copyDetails.onclick = function(element) {
  var firstName = document.getElementById('customer_first_name');
  chrome.extension.getBackgroundPage().console.log(document);
  chrome.extension.getBackgroundPage().console.log("Clicking button prints console log to background page");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: "chrome.runtime.sendMessage({content: document})"});
  });
};
