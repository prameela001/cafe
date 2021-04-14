var menu, pTotal, orderTag, placeOrder, clearOrder;
var prices = {
    "espresso": 1.95,
    "latte": 2.95,
    "cappuccino": 3.45,
    "coffee": 1.75,
    "biscotti": 1.95,
    "scone": 2.95
}
var total = 0;

function setup(){
    var attributeValueOver, attributeValueOut, attributeValueOnClick;
    for(i=1; i<=6; i++){
        imgId = menu[i].id;

        attributeValueOut = "resetDisplay('" + imgId +"')";
        menu[i].setAttribute("onmouseout", attributeValueOut);

        attributeValueOver = "priceDisplay('" + imgId +"')";
        menu[i].setAttribute("onmouseover", attributeValueOver);

        product = imgId.slice(7, imgId.length-9);
        product = String(product);
        attributeValueOnClick = "addToCart('" + product + "')";
        menu[i].setAttribute('onclick', attributeValueOnClick);
    }
    placeOrder.setAttribute('onclick', 'goToCheckout()');
    clearOrder.setAttribute('onclick', 'reset()');
}

function priceDisplay(imgSrc){
    imgTag = document.getElementById(imgSrc);
    imgTag.setAttribute('src', imgSrc);
}
function resetDisplay(imgId){
    imgSrc = imgId.slice(0,imgId.length-9) + '.jpg';
    var imgTag = document.getElementById(imgId);
    imgTag.setAttribute('src', imgSrc);
}
function addToCart(product){
    total += prices[product];
    total = Math.round(total * 100) / 100;
    displayTotal(total);
    displayItem(product);
}
function displayItem(product){
    var optionTag = document.createElement("option");
    var text = "$" + String(prices[product]) + " - " + product[0].toUpperCase() + product.slice(1, product.length);
    var textNode = document.createTextNode(text);

    optionTag.append(textNode);
    orderTag.append(optionTag);

}
function displayTotal(total){
    var displayTotal;
    var expectedLength = 1;
    while(expectedLength < total){
        expectedLength *= 10;
    }
    expectedLength *= 100;
    if(String(expectedLength).length <= String(total).length){
        displayTotal = String(total);
    }else{
        var missingLength = String(expectedLength).length - String(total).length;
        if(missingLength == 1){
            displayTotal = String(total) + "0";
        }else{
            displayTotal = String(total) + ".00";
        }
    }
    var msg = "Total: $" + displayTotal;
    pTotal.innerHTML = msg;
}
function goToCheckout(){
    window.location.href = "./checkout.html";
}
function reset(){
    total = 0;
    pTotal.innerHTML = "";
    while(orderTag.firstElementChild){
        orderTag.firstElementChild.remove();
    }
}

window.onload = function(){
    menu = document.getElementsByTagName('img');
    pTotal = document.getElementById('total');
    orderTag = document.getElementById('order');
    placeOrder = document.getElementById('place_order');
    clearOrder = document.getElementById('clear_order');
    setup();
}