$( document ).ready(function() {
    //variables
    let glazeValue;
    let qty;
    let cartValue;
    let bagList;
    let cartDisplay;
    let productList;
    let product;
    let imageSrc;
    let storageProductList;
    let productId;
    let productName;
    let cost;


    //checks to see if local storage variable exists. If not set to 0;
    bagList = window.localStorage.getItem('cart');
    cartValue = window.localStorage.getItem('cartQty');
    if (bagList && cartValue){
        productList = JSON.parse(bagList);
        cartValue = parseInt(cartValue);
    } else{
        cartValue = 0;
        productList = [];
        productId = 0;
    }

    $('#cartNumber').empty();
    $('#cartNumber').append(cartValue);

    //Array to hold descriptions
    let productDetails = [
        {
            "description": "Cinnamon wrapped in our original smooth, tender dough.",
            "image": "images/original2.jpg",
            "key": "Plain"
        },
        {
            "description": "Cinnamon wrapped in our original smooth, tender dough. Smothered in our famous sugar milk frosting",
            "image": "images/sugarMilkGlaze.jpg",
            "key": "Sugar"
        },
        {
            "description": "Cinnamon wrapped in our original smooth, tender dough. Smothered in our famous vanilla cream cheese frosting",
            "image": "images/vanillaCinRoll.jpg",
            "key": "Vanilla"
        },
        {
            "description": "Cinnamon wrapped in our original smooth, tender dough.Smothered in our famous chocolate cream cheese frosting",
            "image": "images/chocolateCinRol.jpg",
            "key": "Chocolate"
        },
    ]


    // onchange of selector... grabs value
    $('select#glazeType').on('change', function() {
        glazeValue = this.value;
        for(let i=0; i<productDetails.length; i++) {
            if(productDetails[i].key == glazeValue) {
                $('.productVerbage').empty();
                $('.productVerbage').append(productDetails[i].description)
                $("img.productImage").attr('src' , productDetails[i].image);
            }
        }
    });
    // captures value for qty
    $('select#pastryQty').on('change', function() {
        qty = parseInt(this.value);
        cost = qty * 4;
    });


    //Actions which happen when user submits form
    $('#qtySubmitButton').on('click', function() {
        product = {};
        productName = $(".productTitle").text();
        console.log(qty);
        //checks to see if qty is undefined. If undefined creates an alert.
        if(qty === undefined){
           $('#alertMessage').empty();
            $('.alert-danger').removeClass("none");
            $('#alertMessage').append("Please select a QTY to add")
            setInterval(function () {
                $('.alert').addClass("none")
            }, 5000);
        }
        //If qty is defined, then adds item to storage. Displays success message.
        else if (qty !== undefined) {
            imageSrc = $("img.productImage").attr('src');
            productId++;
            product = {
                _product: productName,
                _productGlaze: glazeValue,
                _qty: qty,
                _cost: cost,
                _image: imageSrc
            };
            cartValue += qty;
            console.log(cartValue);
            productList.push(product);
            storageProductList = JSON.stringify(productList);
            window.localStorage.setItem('cart', storageProductList);
            window.localStorage.setItem('cartQty', cartValue);
            $('#cartMessage').empty();
            if (glazeValue == undefined || glazeValue == "Plain") {
                glazeValue = 'no';
            }
            $('.alert-success').removeClass("none");
            $('#cartMessage').append("Success! " + qty + " cinnamon rolls with " + glazeValue + " frosting have been added to your cart")
            setInterval(function () {
                $('.alert').addClass("none")
            }, 5000);
        }

        //Updates cart icon #
        cartDisplay = window.localStorage.getItem('cartQty');
        $('#cartNumber').empty();
        $('#cartNumber').append(cartDisplay);
    });
});




