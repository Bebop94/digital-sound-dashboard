window.onload = function() {
    let burger = document.querySelector('.header-burgerMenu')
    let navBar = document.querySelector('.header-navDesktop')
    let navAdmin = document.querySelector('.header-navDesktop-bottomNav')
    let main = document.querySelector('main')

    burger.addEventListener('click', () => {
        navAdmin.style.display = 'flex'
    })

    main.addEventListener('click', () => {
        navAdmin.style.display = ''
    })
}