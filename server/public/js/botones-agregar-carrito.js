function productosEnCarrito() {
    return localStorage.cart ? JSON.parse(localStorage.cart).length : 0
}

window.addEventListener('load',() => {
    let snackbar = document.getElementById("snackbar")
    let botonesComprar = document.querySelectorAll('.boton-comprar');
    let cartNumber = document.querySelector('#cart-number');

    botonesComprar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault()
            let target_id = e.target.dataset.id
            console.log(target_id)
            if(localStorage.cart) {
                let cart = JSON.parse(localStorage.cart)
                
                let index = cart.findIndex(prod => prod.product_id == target_id)

                if (index != -1) {
                    cart[index].product_quantity += 1
                } else {
                    cart.push({product_id: target_id, product_quantity: 1})
                }

                localStorage.setItem('cart', JSON.stringify(cart))
            } else {
                localStorage.setItem('cart', JSON.stringify([{product_id: target_id, product_quantity: 1}]))
            }

            cartNumber.innerHTML = `Items en Carrito: ${productosEnCarrito()} `
            snackbar.className = 'show'
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);

            console.log(localStorage.cart)
        })
    })

})