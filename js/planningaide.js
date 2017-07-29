var itemList = [];

var curSort = {
    name: "name",
    asc: true
}

function add() {
    addItem($("#item-name").val(), parseFloat($("#unitprice").val()), parseFloat($("#quantity").val()));

    sort();
    fillTable();

    $("#item-name").val("");
    $("#unitprice").val("");
    $("#quantity").val("");
    return false;
}

//var rowTemplate = "<tr><td>{{ITEM}}</td><td>{{UNIT}}</td><td>{{QUANTITY}}</td><td>{{COST}}</td></tr>"
function fillTable() {
    var sum = 0;
    var res = "";
    for (let i = 0; i < itemList.length; i++) {
        let cur = itemList[i];
        res += "<tr><td>" + cur.name + "</td><td>$" + cur.unitprice.toFixed(2) + "</td><td>" + cur.quantity + "</td><td>$" + cur.cost.toFixed(2) + "</td></tr>";
        sum += cur.cost;
    }
    $("#content-template").html(res)
    $("#total-amount").html("$" + sum.toFixed(2));
}

function sortby(name) {
    curSort.asc = curSort.name === name ? !curSort.asc : true;
    curSort.name = name;
    
    $("#main-table").removeClass().addClass(curSort.name + " " + (curSort.asc ? "asc" : "desc"));

    sort();
    fillTable();
}

function sort() {
    if (curSort.name === "name") {
        itemList.sort(function(a, b) {
            var str1 = a[curSort.name].toLowerCase();
            var str2 = b[curSort.name].toLowerCase();
            var condition = str1 < str2 ? -1 : +(str1 > str2);

            if (curSort.asc) return condition;
            return -condition;
        });
    } else {
        itemList.sort(function(a, b) {
            var num1 = a[curSort.name];
            var num2 = b[curSort.name];
            var condition = num1 < num2 ? -1 : +(num1 > num2);

            if (curSort.asc) return condition;
            return -condition;
        });
    }
}

function addItem(name, price, quantity) {
    itemList.push({
        name: name,
        unitprice: price,
        quantity: quantity,
        cost: price * quantity
    });
}

function save() {
    var res = "";
    var sum = 0;

    for (let i = 0; i < itemList.length; i++) {
        cur = itemList[i];
        sum += cur.cost;
        res += cur.name + " (" + cur.quantity + " for $" + cur.unitprice.toFixed(2) + " each): $" + cur.cost.toFixed(2) + "\n";
    }

    res += "\nTotal: $" + sum.toFixed(2);

    console.log(res);

	$("#json").val(res).select();
	document.execCommand("copy");
}