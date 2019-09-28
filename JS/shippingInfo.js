window.onload = load;

/*
 * initialization  required
 */
function load() {
  populateshippingStateDropdown();
  document.getElementById("ShippingInfo").onsubmit = gatherShippingDetails;
}

// ShippingInfo page elements

var sAddress = document.getElementById("iaddress1");
var sAddress2 = document.getElementById("iaddress2");
var sCity = document.getElementById("icity");
var sSelectState = document.getElementById("iselectState");
var szip = document.getElementById("izip");
var sAddressErr = document.getElementById("saddressErr");
var sCityErr = document.getElementById("scityErr");
var sSelectStateErr = document.getElementById("sstateErr");
var szipErr = document.getElementById("szipErr");

function populateshippingStateDropdown() {
  $.get(
    "usStates.txt",
    function(data) {
      var options = data.split(","),
        $select = $("select#iselectState");
      for (var j = 0; j < options.length; j++) {
        $select.append("<option value=" + j + ">" + options[j] + "</option>");
      }
    },
    "text"
  );
}

var shippingInfo = {
  address: "",
  address2: "",
  city: "",
  state: "",
  zip: ""
};

document.getElementById("physAdd").onclick = function() {
  var UserInfo = JSON.parse(localStorage.getItem("userData"));
  if (this.checked === true) {
    sAddress.value = UserInfo["address"];
    sAddress2.value = UserInfo["address2"] || "";
    sCity.value = UserInfo["city"];
    sSelectState.value = UserInfo["state"];
    szip.value = UserInfo["zip"];
  } else if (this.checked === false) {
    sAddress.value = "";
    sCity.value = "";
    sSelectState.value = "";
    szip.value = "";
  }
};

function gatherShippingDetails() {
  isvalid = validateShippingform();
  if (isvalid) {
    localStorage.removeItem("shippingDetials");

    shippingInfo["address"] = sAddress.value;
    shippingInfo["address2"] = sAddress2.value;
    shippingInfo["city"] = sCity.value;
    shippingInfo["state"] =
      sSelectState.options[sSelectState.selectedIndex].innerHTML;
    shippingInfo["zip"] = szip.value;
    localStorage.setItem("shippingDetials", JSON.stringify(shippingInfo));
  }
  return isvalid;
}

//Shipping Page Validations begins

function validateShippingform() {
  {
    return (
      isAddressNotEmpty(sAddress, "Please enter your Address", sAddressErr) &&
      isCityNotEmpty(sCity, "Please choose a city", sCityErr) &&
      isselected(sSelectState, "Please select state!", sSelectStateErr) &&
      isNumericNotEmpty(szip, "Please enter a 5-digit zip code!", szipErr)
    );
  }

  function isAddressNotEmpty(inputElement, msgErr, elmErr) {
    var isNameValid = inputElement.value.trim() !== "";
    postValidateUserInfo(isNameValid, msgErr, elmErr, inputElement);
    return isNameValid;
  }
  function isCityNotEmpty(inputElement, msgErr, elmErr) {
    var isCityValid = inputElement.value.trim() !== "";
    postValidateUserInfo(isCityValid, msgErr, elmErr, inputElement);
    return isCityValid;
  }

  function isselected(inputElm, errMsg, errElm) {
    var isStateSelected =
      inputElm.options[inputElm.selectedIndex].value !== "Please choose state";
    postValidateUserInfo(isStateSelected, errMsg, errElm, inputElm);
    return isStateSelected;
  }

  function isNumericNotEmpty(inputElement, errMsg, errElm) {
    var isNumValid = inputElement.value.trim().match(/^\d+$/) !== null;
    postValidateUserInfo(isNumValid, errMsg, errElm, inputElement);
    return isNumValid;
  }
  function postValidateUserInfo(valid, msgErr, elmErr, inputElement) {
    if (!valid) {
      if (
        msgErr !== undefined &&
        msgErr !== null &&
        msgErr !== undefined &&
        msgErr !== null
      ) {
        elmErr.innerHTML = msgErr;
      }
      if (inputElement !== undefined && inputElement !== null) {
        inputElement.classList.add("errorBox");
        inputElement.focus();
      }
    } else {
      if (elmErr !== undefined && elmErr !== null) {
        elmErr.innerHTML = "";
      }
      if (inputElement !== undefined && inputElement !== null) {
        inputElement.classList.remove("errorBox");
      }
    }
  }
}
