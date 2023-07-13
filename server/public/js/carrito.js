function setEmptyCart() {
    productArea.innerHTML = `
    <tr>
        <div class="product-details"><h4>No tienes ningun producto en el carrito</h4></div>
    </tr>
    `
    cartCheckout.innerHTML = 'Ir de Compras!'
    cartTotalText.innerHTML = '';
}

function dumpCart() {
    localStorage.removeItem('cart');
}

function calculateTotal(products) {
    return products.reduce(
        (acum, product) => (acum += product.product_price * product.product_quantity), 0
    )
}

function calculateQuantity(products) {
    return products.reduce(
        (acum, product) => (acum += product.product_quantity), 0
    )
}

productArea = document.querySelector('.products')
cartTotalText = document.querySelector('#cart-total-text')
cartTotal = document.querySelector('#cart-total')
cartQuantity = document.querySelector('#cart-quantity')
cartCheckout = document.querySelector('#boton-comprar')
productArray = []

window.addEventListener('load',() => {

    if (localStorage.cart && localStorage.cart != '[]') {
        let cart = JSON.parse(localStorage.cart);

        cart.forEach((item, index) => {
            fetch(`/api/products/item/${item.product_id}`)
            .then(res => res.json())
            .then(product => {
                if(product) {
                    productArea.innerHTML +=
                    `
                    <article class="cart-product">
                    <div class="product-info">
                        <div class="product-image">
                            <a href="/productos/detalle/${product.id}"><img src="${product.imagen}"></img></a>
                        </div>
                        <div class="product-details">
                            <h4>${product.product_name}</h4>
                            <p class="sku">SKU ${product.id}</p>
                            <div class="product-description">
                                <p>${product.product_description_short}</p>
                            </div>
                            <!-- <a href="/cart/quitar-producto/${ product.id }">Quitar</a> -->
                        </div>
                    </div>
                    <div class="price-quantity">
                        <div class="price-quantity-div">
                            $${parseInt(product.product_price).toLocaleString()}
                        </div>
                        <div class="product-quantity-div">
                            <!-- <i class="fa-solid fa-square-minus"></i> -->
                            <p name="shopping-cart-quantity" class="quantity-input">${item.product_quantity}</p>
                            <!-- <i class="fa-solid fa-square-plus"></i> -->
                        </div>
                        <div class="price-x-quantity">
                            $${(parseInt(product.product_price)*item.product_quantity).toLocaleString()}
                        </div>
                    </div>
                    </article>
                    `;

                    productArray.push({
                        product_id: product.id,
                        product_name: product.product_name,
                        product_price: parseInt(product.product_price),
                        product_quantity: item.product_quantity
                    })

                } else {
                    setEmptyCart()
                }
                
            })
            .then(() => {
                cartTotal.innerHTML = `$${calculateTotal(productArray).toLocaleString()}`
                cartQuantity.innerHTML = `${calculateQuantity(productArray)} Items Cargados`
            })    
        })
    } else {
        setEmptyCart()
    }

    cartCheckout.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (localStorage.cart && localStorage.cart != '[]') {
            const purchaseData = {
                carrito_producto: productArray,
                flag_is_open: 0,
                cart_date_checkout: Date.now(),
                total_value: calculateTotal(productArray) 
            };

            fetch('/api/cart/checkout', {
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(purchaseData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.ok){
                    dumpCart();
                    location.href = '/'
                }
            })
            .catch('Error en Checkout')
        } else {
            location.href = '/'
        }
    })
})