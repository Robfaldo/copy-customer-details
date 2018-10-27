let copyDetails = document.getElementById('copyDetails');
let completeRFQ = document.getElementById('completeRFQ');

// Insert most recently stored customer details into the popup
chrome.storage.sync.get(['key'], function(result) {
  chrome.extension.getBackgroundPage().console.log("1");
  document.getElementById('firstName').innerHTML = result.key.firstName;
 });

// When the new details are stored, get them and update details on popup
chrome.runtime.onMessage.addListener(
 function (request, sender, sendResponse) {
  chrome.storage.sync.get(['key'], function(result) {
    document.getElementById('firstName').innerHTML = result.key.firstName;
  });
  // TODO: Then I will need to make clicking the button copy it to clipboard
});

// When user clicks the get details button, store the customer details from current rfq page in local storage
copyDetails.onclick = function(element) {
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();'
  }, function (results) {
    const customerDetails = results[0];
    // send the details as message to be stored
    chrome.runtime.sendMessage({customerDetails: customerDetails}, function(response) {
      // currently not needing/doing anything with response
    });
  });
};

completeRFQ.onclick = function(element) {
  chrome.tabs.executeScript({
    code: 'console.log(document.getElementById("backoffice_customer_form_first_name").value = "Testing")'
  });
};


// This function extracts the info we need from the rfq page
function modifyDOM() {
    const customerDetails = {
      firstName: document.getElementById('customer_first_name').innerHTML,
      lastName: document.getElementById('customer_last_name').innerHTML,
      email: document.getElementById('customer_email_address').innerText.split('Generate Email')[0].slice(0, -1),
      postcode: document.getElementById('customer_uk_postcode').innerHTML
    }
    return customerDetails
}
