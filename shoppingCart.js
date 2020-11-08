$( document ).ready(function() {
    let shoppingCartItems;
    let productDiv;
    let toDelete;
    let newShoppingCart = []

    shoppingCartItems = window.localStorage.getItem('cart');
    shoppingCartItems = JSON.parse(shoppingCartItems);
    newShoppingCart = shoppingCartItems;

    function removeItem(array, value){
        let index = value;
        if (index > -1){
            array.splice(index,1);
        }
        return array;
    }


    $.each(shoppingCartItems, function(key, value){
        //console.log(value._productGlaze);
        let itemsContainer = $("<div></div>").addClass("itemsContainer").attr("value",key);
        productDiv = $("<div></div>").addClass("itemsPositionContainer")
        let itemDiv = $("<div></div>").addClass("itemDiv")
        let itemImageDiv = $("<div></div>").addClass("itemImageDiv")
        let img = $("<img>").attr("src",value._image)
        let itemsDetailsDiv = $("<div></div>").addClass("itemDetailsDiv")
        let leftDiv = $("<div></div>").addClass("left")
        let nameDiv = $("<div></div>").addClass("name").text(value._product);
        let cost = $("<div></div>").addClass("cost").text("$4.00 (each)")
        let qty = $("<div></div>").addClass("itemQty").text("QTY: " + value._qty);
        let rightDiv = $("<div></div>").addClass("right")
        let closeIcon = $("<i></i>").addClass("fas fa-times deleteButton").attr("value",key);
        let totalCost = $("<div></div>").addClass("totalCost").append("$" + value._cost)

        rightDiv.append(closeIcon, totalCost);
        leftDiv.append(nameDiv, cost, qty);
        itemsDetailsDiv.append(leftDiv, rightDiv);
        itemImageDiv.append(img);
        itemDiv.append(itemImageDiv, itemsDetailsDiv)
        productDiv.append(itemDiv);
        itemsContainer.append(productDiv);
        $(".itemList").append(itemsContainer);
        })

    $(".deleteButton").on("click", function(){
        console.log(newShoppingCart);
        toDelete = $(this).attr('value');
        console.log(toDelete);

        //removeItem(newShoppingCart,toDelete);
        newShoppingCart.splice($.inArray(toDelete,newShoppingCart), 1);
        console.log(newShoppingCart);
        newShoppingCart = JSON.stringify(newShoppingCart);
        window.localStorage.setItem('cart', newShoppingCart);

        shoppingCartItems = window.localStorage.getItem('cart');
        window.location.reload();


        /*for(let i=0; i<newShoppingCart.length; i++) {
            if(toDelete == i){
                newShoppingCart.splice(i);
                console.log(newShoppingCart);
            }
        }*/

    });





});