var listFood = [];
var listVegetable = [];
var listBeverage = [];

$(document).ready(function() {
    $.get('/FEStarted/components/header.html', data => {
        $("header").append(`${data}`);
    });
    $.get('/FEStarted/components/footer.html', data => {
        $("footer").append(`${data}`);
    });
    getProduct();
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
        displayListFood($('#food_items'), listFood);
        displayListFood($('#vegetable_items'), listVegetable);
        displayListFood($('#beverage_items'), listBeverage);
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

function displayListFood(element, data) {
    for (var index = 0; index < data.length; index++) {
        element.append(`
            <div class="col-md-3" style="border: 1px solid #cdcdcd; background: white">
                <div class="food_item">
                    <a href="/FEStarted/page/productinfo.html?id=${data[index].id}">
                        <img id="item_img" src="${data[index].image} " />
                    </a>
                    <p id="item_name${data[index].id}" style="margin: 1.5em 0 1em">${data[index].name}</p>
                    <h5 id="item_price">
                        ${data[index].price}
                        <span style="text-decoration: line-through; padding-left: 1em">$10.00</span>
                    </h5>
                    <div>
                        <a class="btn btn-danger" id="add-btn" onclick="addItemToCart('${data[index].id}','${data[index].name}', '${data[index].price}', '${data[index].image}')">ADD TO CART</a>
                    </div>
                </div>
            </div>
        `)
    }
}


function moveToInfoPageForFood(p_img) {
    for (var i = 0; i < listFood.length; i++) {
        if (p_img == listFood[i].image) {
            var infoProduct = {
                id: listFood[i].id,
                name: listFood[i].name,
                img: p_img,
                price: listFood[i].price
            }
            localStorage.setItem('infoProduct', JSON.stringify(infoProduct))
        }
    }
}

function moveToInfoPageForVege(p_img) {
    for (var i = 0; i < listVegetable.length; i++) {
        if (p_img == listVegetable[i].image) {
            var infoProduct = {
                id: listVegetable[i].id,
                name: listVegetable[i].name,
                img: p_img,
                price: listVegetable[i].price
            }
            localStorage.setItem('infoProduct', JSON.stringify(infoProduct))
        }
    }
}

function moveToInfoPageForBeverage(p_img) {
    for (var i = 0; i < listBeverage.length; i++) {
        if (p_img == listBeverage[i].image) {
            var infoProduct = {
                id: listBeverage[i].id,
                name: listBeverage[i].name,
                img: p_img,
                price: listBeverage[i].price
            }
            localStorage.setItem('infoProduct', JSON.stringify(infoProduct))
        }
    }
}