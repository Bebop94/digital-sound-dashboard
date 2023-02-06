window.onload = function() {
    let nombre = document.querySelector('#nombre');
    let apellido = document.querySelector('#apellido');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let password2 = document.querySelector('#password2');
    let passwordRegex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let nombreError = document.querySelector('#nombreError');
    let apellidoError = document.querySelector('#apellidoError');
    let passwordError = document.querySelector('#passwordError');
    let emailError = document.querySelector('#emailError');
    let password2Error = document.querySelector('#password2Error');
    let formulario = document.querySelector('#formulario');
    let errorList = document.querySelector('#front-errors');

    nombre.addEventListener('blur', () => {
        if (nombre.value == '') {
            nombreError.innerHTML = 'Este campo no puede estar vacío'
        } else if (nombre.value.length < 2) {
            nombreError.innerHTML = 'El nombre debe tener más de dos caractéres'
        } else {
            nombreError.innerHTML = ''
        }
    })

    apellido.addEventListener('blur', () => {
        if (apellido.value == '') {
            apellidoError.innerHTML = 'Este campo no puede estar vacío'
        } else if (apellido.value.length < 2) {
            apellidoError.innerHTML = 'El apellido debe tener más de dos caractéres'
        } else {
            apellidoError.innerHTML = ''
        }
    })

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
        } else if (!password.value.match(passwordRegex)) {
            passwordError.innerHTML = 'Debe tener al menos: 8 char, 1 num, 1 may, 1 min, 1 simbolo'
        } else {
            passwordError.innerHTML = ''
        }
    })

    password2.addEventListener('blur', () => {
        if (password2.value != password.value) {
            password2Error.innerHTML = 'Debe coincidir con la contraseña'
        } else {
            password2Error.innerHTML = ''
        }
    })

    formulario.addEventListener('submit', (e) => {
        let errors = [];
        errorList.innerHTML = ''
        nombreError.innerHTML = ''
        apellidoError.innerHTML = ''
        emailError.innerHTML = ''
        passwordError.innerHTML = ''
        password2Error.innerHTML = ''

        if (nombre.value == '') {
            errors.push('El nombre no puede estar vacío')
        } else if (nombre.value.length < 2) {
            errors.push('El nombre debe tener más de dos caractéres')
        };
        
        if (apellido.value == '') {
            errors.push('Este apellido no puede estar vacío')
        } else if (apellido.value.length < 2) {
            errors.push('El apellido debe tener más de dos caractéres')
        };

        if (email.value == '') {
            errors.push('El campo email debe estar completo')
        } else if (!email.value.match(emailRegex)){
            errors.push('Debes ingresar un email valido')
        };

        if (password.value == '') {
            errors.push('El campo contraseña no puede estar vacío')
        } else if (!password.value.match(passwordRegex)) {
            errors.push('La contraseña debe tener al menos: 8 char, 1 num, 1 may, 1 min, 1 simbolo')
        };

        if (password2.value != password.value) {
            errors.push('Las contraseñas deben coincidir')
        };

        if (errors.length > 0) {
            e.preventDefault()

            for (i=0; i < errors.length; i++) {
                errorList.innerHTML += '<p class="form-error">' + errors[i] + '</p>'
            }
        };

    })
}