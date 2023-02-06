window.onload = function() {
    let burger = document.querySelector('.header-burgerMenu')
    let navBar = document.querySelector('.header-navDesktop')
    let main = document.querySelector('main')

    burger.addEventListener('click', () => {
        navBar.style.display = 'flex'
    })

    main.addEventListener('click', () => {
        navBar.style.display = ''
    })
}