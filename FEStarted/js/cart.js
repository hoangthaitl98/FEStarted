var productCart = [];

var total;

$(document).ready(function() {
    if (localStorage.getItem('productCart')) {
        productCart = localStorage.getItem('productCart');
        productCart = JSON.parse(productCart);
    }
    total = localStorage.getItem('total');
    total = JSON.parse(total);
    console.log(productCart);

})

//nhóm hàm xử lý cart
//hàm này sẽ lấy thông tin product khi ấn nút ADD TO CART rồi lưu vào local storage
function addItemToCart(p_id, p_name, p_price, p_img) {
    var checkItemExist = false;
    for (var i = 0; i < productCart.length; i++) {
        if (p_id == productCart[i].id && p_name == productCart[i].name) {
            checkItemExist = true;
        }
    }
    var count = 0;
    if (!localStorage.getItem('productCart') || productCart.length == 0 || checkItemExist == false) {
        var product = {
            id: p_id,
            name: p_name,
            price: p_price,
            count: count + 1,
            img: p_img,
        }
        productCart.push(product);
        localStorage.setItem('productCart', JSON.stringify(productCart));
        initCartFromStorage();
    } else {
        for (var i = 0; i < productCart.length; i++) {
            if (p_id == productCart[i].id) {
                productCart[i].count++;
            }
        }
        localStorage.setItem('productCart', JSON.stringify(productCart));
        initCartFromStorage();
    }
}

//hàm này sẽ hiện thông tin sản phẩm trên cart
function initCartFromStorage() {
    var productCart = localStorage.getItem('productCart');
    productCart = JSON.parse(productCart);

    var output = "";
    if (!productCart || productCart.length == 0) {
        output += "Your shopping cart is empty"
    } else {
        for (var i in productCart) {
            output += "<tr>" +
                "<td>" + productCart[i].name + "</td>" +
                "<td>($" + productCart[i].price + ")</td>" +
                "<td>" +
                "<div class='input-group'>" +
                "<button class='minus-item input-group-addon btn btn-primary' data-name='" + productCart[i].name + "'onclick=decreaseCount(" + productCart[i].id + ")>-</button>" +
                "<input type='number' class='item-count form-control' data-name='" + productCart[i].name + "' value='" + productCart[i].count + "'>" +
                "<button class='plus-item btn btn-primary input-group-addon' data-name='" + productCart[i].name + "'onclick=increaseCount(" + productCart[i].id + ")>+</button>" +
                "</div>" +
                "</td>" +
                "<td>" +
                "<button class='delete-item btn btn-danger' data-name='" + productCart[i].name + "'onclick=deleteProduct(" + productCart[i].id + ")>X</button></td>" +
                " = " +
                "</tr>";
        }
    }
    $('.show-cart').html(output);
    $('.modal').modal('show');
    calculateTotal();
}

function deleteProduct(p_id) {
    var indexToRemove;
    for (var i = 0; i < productCart.length; i++) {
        if (p_id == productCart[i].id) {
            indexToRemove = i;
        }
    }
    productCart.splice(indexToRemove, 1);
    localStorage.setItem('productCart', JSON.stringify(productCart));
    initCartFromStorage();
}

function increaseCount(p_id) {
    for (var i = 0; i < productCart.length; i++) {
        if (p_id == productCart[i].id) {
            productCart[i].count++;
        }
    }
    localStorage.setItem('productCart', JSON.stringify(productCart));
    initCartFromStorage();
}

function decreaseCount(p_id) {
    for (var i = 0; i < productCart.length; i++) {
        if (p_id == productCart[i].id) {
            if (productCart[i].count > 1) {
                productCart[i].count--;
            } else {
                return;
            }
        }
    }
    localStorage.setItem('productCart', JSON.stringify(productCart));
    initCartFromStorage();
}

function calculateTotal() {
    total = 0;
    for (var i = 0; i < productCart.length; i++) {
        total += (productCart[i].price * productCart[i].count);
    }
    console.log(total);

    $('.total-cart').html(``);
    $('.total-cart').html(total.toFixed(2));
    localStorage.setItem('total', JSON.stringify(total));
}