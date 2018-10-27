let copyDetails = document.getElementById('copyDetails');

// on extensio open (?) load the storage and assign first name
chrome.storage.sync.get(['key'], function(result) {
  chrome.extension.getBackgroundPage().console.log("1");
  document.getElementById('firstName').innerHTML = result.key.firstName;
 });

copyDetails.onclick = function(element) {
  function modifyDOM() {
      const customerDetails = {
        firstName: document.getElementById('customer_first_name').innerHTML,
        lastName: document.getElementById('customer_last_name').innerHTML,
        // TODO: clean this up
        email: document.getElementById('customer_email_address').innerText.split('Generate Email')[0].slice(0, -1),
        postcode: document.getElementById('customer_uk_postcode').innerHTML
      }
      return customerDetails
  }

  // on copy details click get the customer info from the page
  function getDetailsFromPage() {
    chrome.extension.getBackgroundPage().console.log("Will this go before 5?");

    chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {

    const customerDetails = results[0];
    // send the customer details as a message to background so they can be stored
    chrome.runtime.sendMessage({customerDetails: customerDetails}, function(response) {
      chrome.extension.getBackgroundPage().console.log("2");
      chrome.extension.getBackgroundPage().console.log(response);
    });
  });
}

  function addStoredDetailsToButtons() {
    chrome.storage.sync.get(['key'], function(result) {
    chrome.extension.getBackgroundPage().console.log("5");

    document.getElementById('firstName').innerHTML = result.key.firstName;
    });
  }

  getDetailsFromPage()

  addStoredDetailsToButtons()


  // TODO: Then I will need to make clicking the button copy it to clipboard
};
