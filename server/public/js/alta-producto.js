window.onload = () => {
    let formulario = document.querySelector('#formulario');
    let nombreProducto = document.querySelector('#nombreProd');
    let fotoProducto = document.querySelector('#fotoProd');
    let descripcionProducto = document.querySelector('#descripcionProd');
    let nombreError = document.querySelector('#nombreError');
    let fotoError = document.querySelector('#fotoError')
    let descripcionError = document.querySelector('#descripcionError');
    
nombreProducto.addEventListener('blur',() => {
        if (nombreProducto.value == '') {
            nombreError.innerHTML = 'Este campo no puede estar vacío'
      } else if (nombreProducto.value.length < 5) {
            nombreError.innerHTML = 'El nombre necesita más de 5 caractéres'
        } else {
            nombreError.innerHTML = ''
        }
    });

    fotoProducto.addEventListener('change', () => {
        extension = fotoProducto.value.split('.').pop().toUpperCase()
        admittedExtensions = ['JPG','JPEG', 'PNG', 'GIF']

        if (!(admittedExtensions.includes(extension))) {
            fotoError.innerHTML = 'El archivo debe ser un JPG, JPEG, PNG, o GIF'
        } else {
            fotoError.innerHTML = ''
        }
    });
        
    descripcionProducto.addEventListener('blur',() => {
        if (descripcionProducto.value == '') {
            descripcionError.innerHTML = 'Este campo no puede estar vacío'
        } else if (descripcionProducto.value.length < 20) {
            descripcionError.innerHTML = 'La descripción necesita más de 20 caractéres'
        } else {
            descripcionError.innerHTML = ''
        }
    });

    formulario.addEventListener('submit',(e) => {
        extension = fotoProducto.value.split('.').pop().toUpperCase()
        admittedExtensions = ['JPG','JPEG', 'PNG', 'GIF']
        errors = []
        
        if (nombreProducto.value == '') {
            errors.push('Este campo no puede estar vacío')
        } else if (nombreProducto.value.length < 5) {
            errors.push('El nombre necesita más de 5 caractéres')
        };

        if (!(admittedExtensions.includes(extension))) {
            errors.push('El archivo debe ser un JPG, JPEG, PNG, o GIF')
        };

        if (descripcionProducto.value == '') {
            errors.push('Este campo no puede estar vacío')
        } else if (descripcionProducto.value.length < 20) {
            errors.push('La descripción necesita más de 20 caractéres')
        };

        
        if (errors.length > 0) {
            e.preventDefault()
        }

    })

}