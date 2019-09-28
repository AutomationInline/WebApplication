window.onload = load;

/*
 * initialization  required
 */
function load() {
  calTotalCharges();
  document.getElementById("checkOutForm").onsubmit = gatherCartSummary;
}

var shopingAmnt = document.getElementById("shopamnt");
var tax = document.getElementById("tax");
var shipChrgs = document.getElementById("shippingCharges");
var totalAmnt = document.getElementById("TotalAmountDue");
var selectPayType = document.getElementById("payment");
var cardNo = document.getElementById("cardnumber");
var cardExp = document.getElementById("CardExpiration");
var chkAgree = document.getElementById("agreement");
var cardNoErr = document.getElementById("cardErr");
var cardExpErr = document.getElementById("cardExpErr");
var chkAgreeErr = document.getElementById("agreementErr");

function calTotalCharges() {
  var totalshopAmnt = parseFloat(localStorage.getItem("totalPriceInfo"));
  if (totalshopAmnt !== NaN || totalshopAmnt !== null) {
    shopingAmnt.value = roundoff(totalshopAmnt);
    tax.value = roundoff(parseFloat(totalshopAmnt * 0.08));
    shipChrgs.value = roundoff(parseFloat(totalshopAmnt * 0.03));
    totalAmnt.value = roundoff(
      parseFloat(totalshopAmnt + totalshopAmnt * 0.08 + totalshopAmnt * 0.03)
    );
  }
}

function roundoff(num) {
  return Math.round(num * 100) / 100;
}

cartSummary = {
  shopAmnt: "",
  tax: "",
  shipChrgs: "",
  totalAmnt: "",
  payment: "",
  card: ""
};

function gatherCartSummary() {
  isValid = validateCheckOutForm();
  if (isValid) {
    localStorage.removeItem("cartDetails");
    cartSummary["shopAmnt"] = shopingAmnt.value;
    cartSummary["tax"] = tax.value;
    cartSummary["shipChrgs"] = shipChrgs.value;
    cartSummary["totalAmnt"] = totalAmnt.value;
    cartSummary["payment"] =
      selectPayType.options[selectPayType.selectedIndex].value;
    cartSummary["card"] = cardNo.value.slice(12, 16);
    localStorage.setItem("cartDetails", JSON.stringify(cartSummary));
  }
}

function validateCheckOutForm() {
  return (
    isCardNotEmpty(
      cardNo,
      "Please enter valid 16 digit Card Number!!",
      cardNoErr
    ) &&
    iscardExpNotEmpty(
      cardExp,
      "Please enter valid card Expiry date in MM/YYYY format!!",
      cardExpErr
    ) &&
    isChkAgreeNotselected(chkAgree, "Please select check box!!", chkAgreeErr)
  );
}

function isCardNotEmpty(inputElement, errMsg, errElm) {
  var isNumValid = inputElement.value.trim().match(/^[0-9]{16}$/) !== null;
  postValidateUserInfo(isNumValid, errMsg, errElm, inputElement);
  return isNumValid;
}

function iscardExpNotEmpty(inputElement, errMsg, errElm) {
  var isNumValid = validateMMYYYY(inputElement.value);
  postValidateUserInfo(isNumValid, errMsg, errElm, inputElement);
  return isNumValid;
}

function isChkAgreeNotselected(inputElement, errMsg, errElm) {
  var isNumValid = inputElement.checked;
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

function validateMMYYYY(value) {
  if (!value) return false;
  var split = value.split("/");
  var mm = +split[0];
  var yyyy = +split[1];

  if (isNaN(mm) || isNaN(yyyy)) return false;

  if (mm < 1 || mm > 13) return false;

  if (yyyy < 2016 || yyyy > 2029) return false;

  return true;
}
