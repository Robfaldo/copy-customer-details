let copyDetails = document.getElementById('copyDetails');

copyDetails.onclick = function(element) {
  chrome.extension.getBackgroundPage().console.log("HelloThere");

  function modifyDOM() {
      //You can play with your DOM here or check URL against your regex
      console.log('Tab script:');
      console.log(document.body);
      console.log(document.body.innerHTML);
      console.log("tab script above")
      return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
      //Here we have just the innerHTML and not DOM structure
      chrome.extension.getBackgroundPage().console.log('Popup script:')
      chrome.extension.getBackgroundPage().console.log(results[0]);

      chrome.runtime.sendMessage({message:'hi there'}, function(response) {
        chrome.extension.getBackgroundPage().console.log(response);
      });

  });
};
