$( document ).ready(function() {
    //cart display variable
    let cartValue;

    //updates cart display on all non product pages
    cartValue = window.localStorage.getItem('cartQty');
    $('#cartNumber').empty();
    $('#cartNumber').append(" " + cartValue);

});