var productCart = [];
var total;

$(document).ready(function() {
    $.get('/FEStarted/components/header.html', data => {
        $("header").append(`${data}`);
    });
    $.get('/FEStarted/components/footer.html', data => {
        $("footer").append(`${data}`);
    });
    if (localStorage.getItem('productCart')) {
        productCart = localStorage.getItem('productCart');
        productCart = JSON.parse(productCart);
    }
    total = localStorage.getItem('total');
    total = JSON.parse(total);
    initCheckoutTable();
    initBasket();
})

function initCheckoutTable() {
    for (var i = 0; i < productCart.length; i++) {
        $("tbody").append(`
            <tr class="rem">
                <td class="invert">${i+1}</td>
                <td class="invert-image">
                    <a href="productinfo.html">
                        <img src="${productCart[i].img}" alt="" />
                    </a>
                </td>
                <td class="invert">${productCart[i].count}</td>
                <td class="invert">${productCart[i].name}</td>
                <td class="invert">${productCart[i].price}</td>
                <td class="invert"></td>
            </tr>
        `)
    }
}

function initBasket() {
    for (var i = 0; i < productCart.length; i++) {
        $('.checkout_products').append(`
            <li>
                Product ${i+1} -
                <span>$${productCart[i].price*productCart[i].count}</span>
            </li>
        `);
    }
    $('.checkout_products').append(`
            <li style="color: black; border-top: 1px solid #DDD; border-bottom: 1px solid #DDD; padding: 1em 0">
                Total Service Charges-
                <span>${total}</span>
            </li>
    `);
}