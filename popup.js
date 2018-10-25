let copyDetails = document.getElementById('copyDetails');

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

  chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
      // this is the results of modifyDom
      chrome.extension.getBackgroundPage().console.log(results[0]);

      const customerDetails = results[0];

      // send the customer details as a message so they can be displayed
      chrome.runtime.sendMessage({customerDetails: customerDetails}, function(response) {
        chrome.extension.getBackgroundPage().console.log(response);
      });

  });
};
