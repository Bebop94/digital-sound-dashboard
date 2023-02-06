
window.onload = function() {
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let emailError = document.querySelector('#emailError')
    let passwordError = document.querySelector('#passwordError')
    let formulario = document.querySelector('#formulario')
    let errorList = document.querySelector('#front-errors')

    email.addEventListener('blur', () => {
        if (email.value == '') {
            emailError.innerHTML = 'Este campo no puede estar vacío'
        } else if (!email.value.match(emailRegex)){
            emailError.innerHTML = 'Debes ingresar un email valido'
        } else {
            emailError.innerHTML = ''
        }
    })

    password.addEventListener('blur', () => {
        if (password.value == '') {
            passwordError.innerHTML = 'Este campo no puede estar vacío'
        } else {
            passwordError.innerHTML = ''
        }
    })

    formulario.addEventListener('submit', (e) => {
        let errors = [];
        errorList.innerHTML = ''
        emailError.innerHTML = ''
        passwordError.innerHTML = ''

        if (email.value == '') {
            errors.push('El campo email debe estar completo')
        } else if (!email.value.match(emailRegex)){
            errors.push('Debes ingresar un email valido')
        };

        if (password.value == '') {
            errors.push('El campo contraseña debe estar completo')
        };

        if (errors.length > 0) {
            e.preventDefault()

            for (i=0; i < errors.length; i++) {
                errorList.innerHTML += '<p class="form-error">' + errors[i] + '</p>'
            }
        };

    })
}