function productosEnCarrito() {
    if (localStorage.cart && localStorage.cart != '[]') {
        let cart = JSON.parse(localStorage.cart)

        return cart.reduce(
            (acum, product) => (acum += product.product_quantity), 0
        )
    } else {
        return 0
    }
}

window.onload = function() {
    let burger = document.querySelector('.header-burgerMenu')
    let navBar = document.querySelector('.header-navDesktop')
    let navAdmin = document.querySelector('.header-navDesktop-bottomNav')
    let main = document.querySelector('main')
    let cartNumber = document.querySelector('#cart-number');

    cartNumber.innerHTML = `Items en Carrito: ${productosEnCarrito()} `

    burger.addEventListener('click', () => {
        console.log('click')
        navBar.style.display = 'flex'
        navAdmin.style.display = 'flex'
    })

    main.addEventListener('click', () => {
        navBar.style.display = ''
        navAdmin.style.display = ''
    })
}