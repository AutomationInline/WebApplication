window.onload = load;

function load() {
  createUsrInfo();
  createProductSummary();
  createShippingInfo();
  createCartInfo();
}
Usrsummary = document.getElementById("usersummary");
shipSummary = document.getElementById("shippingSummary");
cartSummary = document.getElementById("cartSummary");

function createUsrInfo() {
  var UserInfo = JSON.parse(localStorage.getItem("userData"));
  var NameNode = document.createElement("LI");
  var Nametext = document.createTextNode(
    "Name:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + UserInfo["fname"]
  );
  NameNode.append(Nametext);
  Usrsummary.append(NameNode);
  var adr1Node = document.createElement("LI");
  var adr1text = document.createTextNode(
    "Address1: " + "\xa0\xa0" + UserInfo["address"]
  );
  adr1Node.append(adr1text);
  Usrsummary.append(adr1Node);
  if (UserInfo["address2"] !== " ") {
    var adr2Node = document.createElement("LI");
    var adr2text = document.createTextNode(
      "Address2:  " + "\xa0\xa0" + UserInfo["address2"]
    );
    adr2Node.append(adr2text);
    Usrsummary.append(adr2Node);
  }

  var CityNode = document.createElement("LI");
  var Citytext = document.createTextNode(
    "City:  " +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      UserInfo["city"]
  );
  CityNode.append(Citytext);
  Usrsummary.append(CityNode);

  var StateNode = document.createElement("LI");
  var StateText = document.createTextNode(
    "State:  " + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + UserInfo["stateText"]
  );
  StateNode.append(StateText);
  Usrsummary.append(StateNode);

  var ZipNode = document.createElement("LI");
  var Ziptext = document.createTextNode(
    "Zip:" +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      UserInfo["zip"]
  );
  ZipNode.append(Ziptext);
  Usrsummary.append(ZipNode);

  var PhoneNode = document.createElement("LI");
  var Phonetext = document.createTextNode(
    "Phone:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + UserInfo["phone"]
  );
  PhoneNode.append(Phonetext);
  Usrsummary.append(PhoneNode);

  var EmailNode = document.createElement("LI");
  var Emailtext = document.createTextNode(
    "Email:" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + UserInfo["email"]
  );
  EmailNode.append(Emailtext);
  Usrsummary.append(EmailNode);
  return true;
}

function createProductSummary() {
  var UserInfo = JSON.parse(localStorage.getItem("userData"));

  var prodInfoconvert = localStorage.getItem("totalProdInfo");
  var prodInfoarry = prodInfoconvert.split(",");
  var prodInfo = [];

  while (prodInfoarry.length) {
    prodInfo.push(prodInfoarry.splice(0, 4));
  }

  table = document.createElement("table");
  var columnCount = prodInfo[0].length;
  var row = table.insertRow(-1);
  for (var i = 0; i < columnCount; i++) {
    var headerCell = document.createElement("th");
    headerCell.innerHTML = prodInfo[0][i];
    row.appendChild(headerCell);
  }
  for (var i = 1; i < prodInfo.length; i++) {
    row = table.insertRow(-1);
    for (var j = 0; j < columnCount; j++) {
      var cell = row.insertCell(-1);
      cell.innerHTML = prodInfo[i][j];
    }
  }

  var dvTable = document.getElementById("Orderdivtable");
  dvTable.innerHTML = "";
  dvTable.appendChild(table);
}

function createShippingInfo() {
  var UserInfo = JSON.parse(localStorage.getItem("shippingDetials"));
  var adr1Node = document.createElement("LI");
  var adr1text = document.createTextNode(
    "Address1: " + "\xa0\xa0" + UserInfo["address"]
  );
  adr1Node.append(adr1text);
  shipSummary.append(adr1Node);
  if (UserInfo["address2"] !== " ") {
    var adr2Node = document.createElement("LI");
    var adr2text = document.createTextNode(
      "Address2:  " + "\xa0\xa0" + UserInfo["address2"]
    );
    adr2Node.append(adr2text);
    shipSummary.append(adr2Node);
  }

  var CityNode = document.createElement("LI");
  var Citytext = document.createTextNode(
    "City:  " +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      UserInfo["city"]
  );
  CityNode.append(Citytext);
  shipSummary.append(CityNode);

  var StateNode = document.createElement("LI");
  var StateText = document.createTextNode(
    "State:  " + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + UserInfo["state"]
  );
  StateNode.append(StateText);
  shipSummary.append(StateNode);

  var ZipNode = document.createElement("LI");
  var Ziptext = document.createTextNode(
    "Zip:" +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      UserInfo["zip"]
  );
  ZipNode.append(Ziptext);
  shipSummary.append(ZipNode);
}

function createCartInfo() {
  var cartInfo = JSON.parse(localStorage.getItem("cartDetails"));

  var paymentNode = document.createElement("LI");
  var paymenttext = document.createTextNode(
    "Payment:" +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      cartInfo["payment"]
  );
  paymentNode.append(paymenttext);
  cartSummary.append(paymentNode);

  var cardNode = document.createElement("LI");
  var cardtext = document.createTextNode(
    "card No:" +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      "xxxx-xxxx-xxxx-" +
      cartInfo["card"]
  );
  cardNode.append(cardtext);
  cartSummary.append(cardNode);
  var shopAmntNode = document.createElement("LI");
  var shopAmnttext = document.createTextNode(
    "Shop Amount: " +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      cartInfo["shopAmnt"]
  );
  shopAmntNode.append(shopAmnttext);
  cartSummary.append(shopAmntNode);

  var taxNode = document.createElement("LI");
  var taxtext = document.createTextNode(
    "Tax: " +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 " +
      cartInfo["tax"]
  );
  taxNode.append(taxtext);
  cartSummary.append(taxNode);

  var shippingchrgsNode = document.createElement("LI");
  var shippingchrgstext = document.createTextNode(
    "Shipping Charges: " + "\xa0\xa0" + cartInfo["shipChrgs"]
  );
  shippingchrgsNode.append(shippingchrgstext);
  cartSummary.append(shippingchrgsNode);

  var totalAmntNode = document.createElement("LI");
  var totalAmnttext = document.createTextNode(
    "Total Amount:" +
      "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
      cartInfo["totalAmnt"]
  );
  totalAmntNode.append(totalAmnttext);
  cartSummary.append(totalAmntNode);
}

document.getElementById("summaryBtn").onclick = function() {
  window.location.href = "/index.html";
};
