$( document ).ready(function() {
    //variables
    let shoppingCartItems;
    let productDiv;
    let toDelete;
    let newShoppingCart = [];
    let updatedQty;
    let total = 0;
    let cost;
    let shippingTax = 8;
    shippingTax = parseInt(shippingTax);

    //Grabs local Storage
    shoppingCartItems = window.localStorage.getItem('cart');
    updatedQty = window.localStorage.getItem('cartQty');

    if (updatedQty == undefined && shoppingCartItems == undefined){
        //updatedQty = 0;
        updatedQty = parseInt(updatedQty);
        shoppingCartItems = [];
        $('#cartNumber').empty();
        $('#cartNumber').append(updatedQty);
    }else if (updatedQty != undefined  && shoppingCartItems != undefined){
        updatedQty = parseInt(updatedQty);
        shoppingCartItems = JSON.parse(shoppingCartItems);
    }

    newShoppingCart = shoppingCartItems;

    //Updates SubTotal and Appends to Div
    for(let i=0; i<newShoppingCart.length; i++) {
        cost = newShoppingCart[i]._cost;
        cost = parseInt(cost);
        total += cost;
        $("#subtotalOutput").text("$" + total + ".00");
        let endTotal = total + shippingTax;
        $("#totalOutput").text("$" + endTotal);
    }

    //Prints HTML with Values
    $.each(shoppingCartItems, function(key, value){
        let itemsContainer = $("<div></div>").addClass("itemsContainer").attr("value",key);
        productDiv = $("<div></div>").addClass("itemsPositionContainer")
        let itemDiv = $("<div></div>").addClass("itemDiv")
        let itemImageDiv = $("<div></div>").addClass("itemImageDiv")
        let img = $("<img>").attr("src",value._image)
        let itemsDetailsDiv = $("<div></div>").addClass("itemDetailsDiv")
        let leftDiv = $("<div></div>").addClass("left")
        let nameDiv = $("<div></div>").addClass("name").text(value._product + " Bun Bun");
        let glazeType = $("<div></div>").addClass("glazeType").text(value._productGlaze + " Glaze");
        let cost = $("<div></div>").addClass("cost").text("$4.00 (each)")
        let qty = $("<div></div>").addClass("itemQty").text("QTY: " + value._qty);
        let rightDiv = $("<div></div>").addClass("right")
        let closeIcon = $("<i></i>").addClass("fas fa-times deleteButton").attr("value",key);
        let totalCost = $("<div></div>").addClass("totalCost").append("$" + value._cost)

        rightDiv.append(closeIcon, totalCost);
        leftDiv.append(nameDiv, glazeType, cost, qty);
        itemsDetailsDiv.append(leftDiv, rightDiv);
        itemImageDiv.append(img);
        itemDiv.append(itemImageDiv, itemsDetailsDiv)
        productDiv.append(itemDiv);
        itemsContainer.append(productDiv);
        $(".itemList").append(itemsContainer);
    })
    //Removes Product from Local Storage
    $(".deleteButton").on("click", function(){
        toDelete = $(this).attr('value');
        //captures qty to delete from cart display
        for(let i=0; i<newShoppingCart.length; i++) {
            if (i == toDelete) {
                console.log(toDelete);
                let qtyToDelete = newShoppingCart[i]._qty
                qtyToDelete = parseInt(qtyToDelete);
                console.log(qtyToDelete);
                updatedQty -= qtyToDelete;
                window.localStorage.setItem('cartQty', updatedQty);
                newShoppingCart.splice(toDelete,1);
            }
        }
        //Removes Item


        //updates local storage
        newShoppingCart = JSON.stringify(newShoppingCart);
        window.localStorage.setItem('cart', newShoppingCart);
        shoppingCartItems = window.localStorage.getItem('cart');
        window.location.reload();

    });





});