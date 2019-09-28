window.onload = load;

/*
 * initialization
 */
function load() {
  populateDropdown();
  document.getElementById("userInfoForm").onsubmit = canSubmitForm;
  document.getElementById("Resetbtn").onclick = resetForm;
}
var UserInfo = {
  fname: "",
  city: "",
  address: "",
  address2: "",
  zip: "",
  phone: "",
  email: "",
  state: "",
  stateText: ""
};
var ifname = document.getElementById("fullName");
var iAddress = document.getElementById("address1");
var iAddress2 = document.getElementById("address2");
var iCity = document.getElementById("city");
var iSelectState = document.getElementById("selectState");
var izip = document.getElementById("zip");
var iPhne = document.getElementById("phone");
var iEmail = document.getElementById("email");
var ifnameErr = document.getElementById("NameErr");
var iAddressErr = document.getElementById("addressErr");
var iCityErr = document.getElementById("cityErr");
var iSelectStateErr = document.getElementById("stateErr");
var izipErr = document.getElementById("zipErr");
var iPhneErr = document.getElementById("phnErr");
var iEmailErr = document.getElementById("emailErr");

function canSubmitForm() {
  var canSubmit = validateUserForm();
  if (canSubmit) {
    localStorage.removeItem("userData");
    UserInfo["fname"] = ifname.value;
    UserInfo["city"] = iCity.value;
    UserInfo["address"] = iAddress.value;
    UserInfo["address2"] = iAddress2.value || " ";
    UserInfo["zip"] = izip.value;
    UserInfo["phone"] = iPhne.value;
    UserInfo["email"] = iEmail.value;
    UserInfo["state"] = iSelectState.options[iSelectState.selectedIndex].value;
    UserInfo["stateText"] =
      iSelectState.options[iSelectState.selectedIndex].innerHTML;
    localStorage.setItem("userData", JSON.stringify(UserInfo));
  }
  return canSubmit;
}

function validateUserForm() {
  return (
    isAlphaNotEmpty(ifname, "Please enter your full name", ifnameErr) &&
    isAddressNotEmpty(iAddress, "Please enter your Address", iAddressErr) &&
    isCityNotEmpty(iCity, "Please enter your City", iCityErr) &&
    isNumericNotEmpty(izip, "Please enter a 5-digit zip code!", izipErr) &&
    isselected(iSelectState, "Please select state!", iSelectStateErr) &&
    isPhoneValid(iPhne, "Please enter a valid phone number!", iPhneErr) &&
    isEmailvaild(iEmail, "Enter a valid email!", iEmailErr)
  );
}

function isAlphaNotEmpty(inputElement, msgErr, elmErr) {
  var isNameValid = inputElement.value.trim() !== "";
  postValidateUserInfo(isNameValid, msgErr, elmErr, inputElement);
  return isNameValid;
}
function isCityNotEmpty(inputElement, msgErr, elmErr) {
  var isCityValid = inputElement.value.trim() !== "";
  postValidateUserInfo(isCityValid, msgErr, elmErr, inputElement);
  return isCityValid;
}
function isAddressNotEmpty(inputElement, msgErr, elmErr) {
  var isadrsValid = inputElement.value.trim() !== "";
  postValidateUserInfo(isadrsValid, msgErr, elmErr, inputElement);
  return isadrsValid;
}
function isNumericNotEmpty(inputElement, errMsg, errElm) {
  var isNumValid = inputElement.value.trim().match(/^\d+$/) !== null;
  postValidateUserInfo(isNumValid, errMsg, errElm, inputElement);
  return isNumValid;
}

function isPhoneValid(inputElement, msgErr, elmErr) {
  var phoneno = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  var isNumValid = inputElement.value.match(phoneno) !== null;
  postValidateUserInfo(isNumValid, msgErr, elmErr, inputElement);
  return isNumValid;
}

function isEmailvaild(inputElm, errMsg, errElm) {
  var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var isValidEmail = inputElm.value.match(email) !== null;
  postValidateUserInfo(isValidEmail, errMsg, errElm, inputElm);
  return isValidEmail;
}

function isselected(inputElm, errMsg, errElm) {
  var isStateSelected =
    inputElm.options[inputElm.selectedIndex].value !== "Please choose state";
  postValidateUserInfo(isStateSelected, errMsg, errElm, inputElm);
  return isStateSelected;
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
      inputElement.classList.add("warnError");
      inputElement.focus();
    }
  } else {
    if (elmErr !== undefined && elmErr !== null) {
      elmErr.innerHTML = "";
    }
    if (inputElement !== undefined && inputElement !== null) {
      inputElement.classList.remove("warnError");
    }
  }
}

// Auto populate the dropdown using Jquery and Ajax

function populateDropdown() {
  $.get(
    "usStates.txt",
    function(data) {
      var options = data.split(","),
        $select = $("select#selectState");
      for (var j = 0; j < options.length; j++) {
        $select.append("<option value=" + j + ">" + options[j] + "</option>");
      }
    },
    "text"
  );
}

function resetForm() {
  location.reload();
}
