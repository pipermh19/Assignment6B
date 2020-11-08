$( document ).ready(function() {
    //cart display variable
    let cartValue;

    //updates cart display on all non product pages
    cartValue = window.localStorage.getItem('cartQty');

    if (cartValue == undefined){
        cartValue = 0;
        $('#cartNumber').empty();
        $('#cartNumber').append(" " + cartValue);

    }
    $('#cartNumber').empty();
    $('#cartNumber').append(" " + cartValue);

});