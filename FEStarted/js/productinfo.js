var listFood = [];
var listVegetable = [];
var listBeverage = [];

var infoProduct;

$(document).ready(function() {
    $.get('/FEStarted/components/header.html', data => {
        $("header").append(`${data}`);
    });
    $.get('/FEStarted/components/footer.html', data => {
        $("footer").append(`${data}`);
    });
    infoProduct = localStorage.getItem('infoProduct');
    infoProduct = JSON.parse(infoProduct);
    getProduct();
    displayInfoProduct();
})

function getProduct() {
    getDataFromAjax('http://localhost:3000/products').done(function(response) {
        for (var i = 0; i < response.length; i++) {
            if (response[i].type == "Food") {
                var foodProduct = response[i];
                listFood.push(foodProduct);
            }
            if (response[i].type == "vegetable") {
                var vegetableProduct = response[i];
                listVegetable.push(vegetableProduct);
            }
            if (response[i].type == "beverage") {
                var beverageProduct = response[i];
                listBeverage.push(beverageProduct);
            }
        }
        displayListFood();
        displayListVegetable();
        displayListBeverage();
    });
}

function getDataFromAjax(url) {
    return $.ajax({
        url: url,
        type: 'GET',
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success: function(data) {},
        error: function() {}
    });
}

function displayListFood() {
    for (var index = 0; index < listFood.length; index++) {
        $("#food_items").append(`
            <div class="col-md-3" style="border: 1px solid #cdcdcd; background: white">
                <div class="food_item">
                    <img id="item_img" src="${listFood[index].image} " />
                    <p id="item_name${listFood[index].id}" style="margin: 1.5em 0 1em">${listFood[index].name}</p>
                    <h5 id="item_price">
                        ${listFood[index].price}
                        <span style="text-decoration: line-through; padding-left: 1em">$10.00</span>
                    </h5>
                    <div>
                        <a class="btn btn-danger" id="add-btn" onclick="addItemToCart('${listFood[index].id}','${listFood[index].name}', '${listFood[index].price}', '${listFood[index].image}')">ADD TO CART</a>
                    </div>
                </div>
            </div>
        `)
    }
}

function displayListVegetable() {
    for (var index = 0; index < listVegetable.length; index++) {
        $("#vegetable_items").append(`
            <div class="col-md-3" style="border: 1px solid #cdcdcd; background: white">
                <div class="vegetable_item">
                    <img id="item_img" src="${listVegetable[index].image} " />
                    <p id="item_name${listVegetable[index].id}" style="margin: 1.5em 0 1em">${listVegetable[index].name}</p>
                    <h5 id="item_price">
                        ${listVegetable[index].price}
                        <span style="text-decoration: line-through; padding-left: 1em">$10.00</span>
                    </h5>
                    <div>
                        <a class="btn btn-danger" id="add-btn" onclick="addItemToCart('${listVegetable[index].id}','${listVegetable[index].name}', '${listVegetable[index].price}', '${listVegetable[index].image}')">ADD TO CART</a>
                    </div>
                </div>
            </div>
        `)
    }
}

function displayListBeverage() {
    for (var index = 0; index < listBeverage.length; index++) {
        $("#beverage_items").append(`
            <div class="col-md-3" style="border: 1px solid #cdcdcd; background: white">
                <div class="beverage_item">
                    <img id="item_img" src="${listBeverage[index].image} " />
                    <p id="item_name${listBeverage[index].id}" style="margin: 1.5em 0 1em">${listBeverage[index].name}</p>
                    <h5 id="item_price">
                        ${listBeverage[index].price}
                        <span style="text-decoration: line-through; padding-left: 1em">$10.00</span>
                    </h5>
                    <div>
                        <a class="btn btn-danger" id="add-btn" onclick="addItemToCart('${listBeverage[index].id}','${listBeverage[index].name}', '${listBeverage[index].price}', '${listBeverage[index].image}')">ADD TO CART</a>
                    </div>
                </div>
            </div>
        `)
    }
}

function displayInfoProduct() {
    $('.info_single').append(`
        <h3 style="margin-bottom: 2em">${infoProduct.name}</h3>
            <div class="row">
                <div class="col-md-4 info_single_left">
                    <img src="${infoProduct.img}" alt="" />
                </div>
                <div class="col-md-8 info_single_right" style="padding-left: 3em">
                    <div class="rating"></div>
                    <div class="description">
                        <h5>DESCRIPTION:</h5>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                    </div>
                    <div class="snipcart">
                        <div style="margin-bottom: 2em">
                            <h4>${infoProduct.price}</h4>
                        </div>
                        <div>
                            <a class="btn btn-danger" id="add-btn" onclick="addItemToCart('${infoProduct.id}', '${infoProduct.name}', '${infoProduct.price}', '${infoProduct.img}')">ADD TO CART</a>
                        </div>
                    </div>
                </div>
            </div>
    `)
}