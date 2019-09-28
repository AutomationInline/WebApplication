window.onload = load;

function load() {
  populateProductsDropdown();
  document.getElementById("productInfoForm").onsubmit = validateProductform;
}

//Product page Elements

var iProducts = document.getElementById("products");
var iunits = document.getElementById("units");
var iunitPrice = document.getElementById("unitPrice");
var itotalPrice = document.getElementById("totalPrice");
var iproductsErr = document.getElementById("productsErr");
// Populate Products dropdown

function populateProductsDropdown() {
  const url = "products.json";

  $.getJSON(url, function(data) {
    $select = $("select#products");

    $.each(data, function(key, entry) {
      value = (
        entry.name +
        " ($ " +
        entry.price +
        " / " +
        entry.unit +
        " )"
      ).toString();
      $select.append(
        "<option value=" + entry.name.toString() + ">" + value + "</option>"
      );
    });
  });
}
var NumberOfUnits;
$("#avltotalUnits").on("change keyup", function() {
  NumberOfUnits = $("#avltotalUnits").val();
  totalPrice = parseFloat(NumberOfUnits * totalPrce).toFixed(2);
  $("#totalPrice").val(totalPrice);
  $("table").remove();
});

document.getElementById("products").onchange = function() {
  var form = this.form;
  var productList = grabProducts(this);
  var productsPriceList = grabpriceList(this);
  showproductAndSelectUnits(productList, productsPriceList);
};
var table;
var fruitproducts = [];
var totalPrceArray = [0];
var totalPrce;
var totalPrice;
var prodInfo = [
  ["ProductName", "Unit Price in $", "No.OfUnits", "TotalPrice in $"]
];

$("#resetDiv").on("click", function() {
  $("#products").prop("disabled", false);
  $('[class$="empty"]').remove();
  $("br").remove();
  $('[class$="empty1"]').remove();
  fruitproducts = [];
  $("#avltotalUnits").val("1");
  $("#totalPrice").val("");
  $("#productSumm").remove();
  $("table").remove();
  prodInfo = [
    ["ProductName", "Unit Price in $", "No.OfUnits", "TotalPrice in $"]
  ];
  totalPrceArray = [0];
  totalPrce = 0;
});

function showproductAndSelectUnits(selectedProdcut, Selectedprice) {
  for (var i = 0; i < selectedProdcut.length; i++) {
    var productName = selectedProdcut[i].toString().split(" ")[0];
    if (selectedProdcut.length !== null) {
      if ($("#productSumm").length === 0) {
        $("#validateProductsSum").append(
          '<a href="#" id="productSumm" onclick="createProductsTable()"> Product Summary </a>'
        );
      }
      if (!fruitproducts.includes(productName)) {
        prodInfo.push([productName, Selectedprice[i].split(" ")[0]]);
        fruitproducts.push(productName);
        $(productdisplay).append(
          '</br><label class="empty1">' + productName + "</label>"
        );
        $(productdisplay).append(
          '<input type="number"  class="priceUnit empty" disabled value= ' +
            Selectedprice[i] +
            "/>"
        );

        $(productdisplay).append('<label class="empty">$/lb</label>');
        totalPrceArray.push(parseFloat(Selectedprice[i].split(" ")[0]));
        totalPrceinit = parseFloat(
          totalPrceArray.reduce(function(prev, cur) {
            return prev + cur;
          })
        ).toFixed(2);

        var NumberOfUnits = $("#avltotalUnits").val();
        totalPrce = parseFloat(NumberOfUnits * totalPrceinit).toFixed(2);
        $("#totalPrice").val(totalPrce);
      }
    }
  }
}

function grabProducts(selct) {
  var opt;
  var selectedProducts = [];
  for (var i = 0, len = selct.options.length; i < len; i++) {
    opt = selct.options[i];
    if (opt.selected) {
      var selectedval = opt.text;
      selectedProducts.push(selectedval.split("(")[0].trim());
    }
  }
  return selectedProducts;
}

function grabpriceList(selct) {
  var opt;
  var selectedUnitsprce = [];
  for (var i = 0, len = selct.options.length; i < len; i++) {
    opt = selct.options[i];
    if (opt.selected) {
      var selectedval = opt.text;
      selectedUnitsprce.push(selectedval.split("$")[1].trim());
    }
  }
  return selectedUnitsprce;
}
function createProductsTable() {
  localStorage.removeItem("totalProdInfo");
  localStorage.removeItem("totalPriceInfo");

  if ($("table tbody").length === 0) {
    table = document.createElement("table");
    var columnCount = prodInfo[0].length;
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
      var headerCell = document.createElement("th");
      headerCell.innerHTML = prodInfo[0][i];
      row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < prodInfo.length; i++) {
      row = table.insertRow(-1);
      for (var j = 0; j < columnCount; j++) {
        var cell = row.insertCell(-1);
        if (j === 2) {
          if (
            NumberOfUnits === undefined ||
            NumberOfUnits === null ||
            NumberOfUnits === NaN
          ) {
            prodInfo[i].push("1");
          } else {
            NumberOfUnits = $("#avltotalUnits").val();
            prodInfo[i].splice(2, 2);
            prodInfo[i].push($("#avltotalUnits").val());
          }
        }
        if (j === 3) {
          if (
            NumberOfUnits === undefined ||
            NumberOfUnits === null ||
            NumberOfUnits === NaN
          ) {
            prodInfo[i].push(parseFloat(prodInfo[i][j - 2]));
          } else {
            prodInfo[i].push(
              parseFloat(
                $("#avltotalUnits").val() * prodInfo[i][j - 2]
              ).toFixed(2)
            );
          }
        }
        cell.innerHTML = prodInfo[i][j];
      }
    }

    var dvTable = document.getElementById("productdivtable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
    if (NumberOfUnits === 1) {
      localStorage.setItem("totalPriceInfo", totalPrce);
    } else {
      localStorage.setItem("totalPriceInfo", totalPrice);
    }
    localStorage.setItem("totalProdInfo", prodInfo);
    $("#products").prop("disabled", true);
  }
}

function validateProductform() {
  if ($("#totalPrice").val() === "") {
    document.getElementById("totalPriceErr").innerHTML =
      "Please Select products from dropdown and Enter atleast one unit";
    return false;
  } else if ($("#totalPrice").val() !== "") {
    document.getElementById("totalPriceErr").innerHTML = "";
  }
  if ($("table").length === 0) {
    document.getElementById("createproductsErr").innerHTML =
      "Clicking on Product Summary button is Mandatory to view the selected products and price";
    return false;
  } else if ($("table").length !== 0) {
    document.getElementById("createproductsErr").innerHTML = "";
  }
  return true;
}
