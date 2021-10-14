var listProduct = [{
        id: 1,
        name: "Fortune Sunflower Oil",
        price: 7.99,
        image: "/FEStarted/img/7.png",
        count: 0,
    },

    {
        id: 2,
        name: "Basmati Rice (5 kg)",
        price: 11.99,
        image: "/FEStarted/img/8.png",
        count: 0,
    },

    {
        id: 3,
        name: 'Pepsi Soft Drunk (2 Ltr)',
        price: 8.00,
        image: '/FEStarted/img/9.png',
        count: 0,
    },

    {
        id: 4,
        name: 'Dogs Food',
        price: 9.00,
        image: '/FEStarted/img/10.png',
        count: 0,
    },

];


/* eslint-disable no-undef */
$(document).ready(function() {
    displayProduct();
    /* $.get('/FEStarted/components/header.html', function(data) {
        $('header').append(data);
    }); */
    $('.slider').bxSlider();

})

function displayProduct() {
    for (var index = 0; index < listProduct.length; index++) {
        $("#hot_offers_items").append(`
            <div class="col-md-3" style="border: 1px solid #cdcdcd; background: white">
                <div class="hot_offers_item">
                    <img id="item_img" src="${listProduct[index].image} " />
                    <p id="item_name" style="margin: 1.5em 0 1em">${listProduct[index].name}</p>
                    <h5 id="item_price">
                        ${listProduct[index].price}
                        <span style="text-decoration: line-through; padding-left: 1em">$10.00</span>
                    </h5>
                    <div>
                        <a class="btn btn-danger" id="add-btn" onclick="addItemToCart()">ADD TO CART</a>
                    </div>
                </div>
            </div>
        `)
        console.log($("#item_name").text());
    }
}

function addItemToCart() {
    var v_name = $("#item_name").text();
    console.log(v_name);
    for (var i = 0; i < listProduct.length; i++) {
        if (listProduct[i].name == v_name) {
            var v_id = listProduct[i].id;
            var v_price = listProduct[i].price;
        }
    }
    var product = {
        id: v_id,
        name: v_name,
        price: v_price
    };
    localStorage.setItem("product", JSON.stringify(product));
    initCartFromStorage();
}

function initCartFromStorage() {
    var product = JSON.parse(localStorage.getItem('product'));
    console.log(cart);
    var output = "";
    /* for (var i in listProduct) {
        output += "<tr>" +
            "<td>" + listProduct[i].name + "</td>" +
            "<td>(" + listProduct[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + listProduct[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + listProduct[i].name + "' value='" + listProduct[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + listProduct[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + listProduct[i].name + ">X</button></td>" +
            " = " +
            //"<td>" + listProduct[i].total + "</td>" +
            "</tr>";
    } */
    if (!product) {
        output += "Your shopping cart is empty"
    } else {
        output += "<tr>" +
            "<td>" + product.name + "</td>" +
            "<td>(" + product.price + ")</td>" +
            +"</tr>";
    }
    $('.show-cart').html(output);
    $('.modal').modal('show');
}