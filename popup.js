let copyDetails = document.getElementById('copyDetails');

copyDetails.onclick = function(element) {
  chrome.extension.getBackgroundPage().console.log("Clicking button prints console log to background page");
};
