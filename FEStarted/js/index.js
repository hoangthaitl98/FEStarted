var hotOffer = [];

/* eslint-disable no-undef */
$(document).ready(function() {
    $.get('/FEStarted/components/header.html', data => {
        $("header").append(`${data}`);
    });
    $.get('/FEStarted/components/footer.html', data => {
        $("footer").append(`${data}`);
    });
    getHotOffer();
    $('.slider').bxSlider();
})

function getHotOffer() {
    getDataFromAjax('http://localhost:3000/products').done(function(response) {
        for (var i = 0; i < response.length; i++) {
            if (response[i].type == "hotOffer") {
                var hotOfferProduct = response[i];
                hotOffer.push(hotOfferProduct);
            }
        }
        displayProduct();
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

function displayProduct() {
    for (var index = 0; index < hotOffer.length; index++) {
        $("#hot_offers_items").append(`
            <div class="col-md-3" style="border: 1px solid #cdcdcd; background: white">
                <div class="hot_offers_item">
                    <a href="/FEStarted/page/productinfo.html" onclick="moveToInfoPage('${hotOffer[index].image}')">
                        <img id="item_img" src="${hotOffer[index].image} " />
                    </a>
                    <p id="item_name${hotOffer[index].id}" style="margin: 1.5em 0 1em">${hotOffer[index].name}</p>
                    <h5 id="item_price">
                        ${hotOffer[index].price}
                        <span style="text-decoration: line-through; padding-left: 1em">$10.00</span>
                    </h5>
                    <div>
                        <a class="btn btn-danger" id="add-btn" onclick="addItemToCart('${hotOffer[index].id}','${hotOffer[index].name}', '${hotOffer[index].price}', '${hotOffer[index].image}')">ADD TO CART</a>
                    </div>
                </div>
            </div>
        `)
    }
}

function moveToInfoPage(p_img) {
    for (var i = 0; i < hotOffer.length; i++) {
        if (p_img == hotOffer[i].image) {
            var infoProduct = {
                id: hotOffer[i].id,
                name: hotOffer[i].name,
                img: p_img,
                price: hotOffer[i].price
            }
            localStorage.setItem('infoProduct', JSON.stringify(infoProduct))
        }
    }
}