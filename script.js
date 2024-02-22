console.log("Is Ready!");

function logg() {
    const usuario = document.getElementById("myUs").value;
    const contra = document.getElementById("myPass").value;
    const mensaje = document.getElementById("msg");
    let encontrado = false;

    const httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', 'json.json', true);

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            mensaje.innerHTML = '';

            for (let i = 0; i < datos.length; i++) {
                if (usuario === datos[i].nombre && contra === datos[i].contrasena) {
                    mensaje.innerHTML = `User ${datos[i].nombre}, has been successfully logged`;
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                mensaje.innerHTML = "Enter a valid username or password";
            }
        }
    };

    httpRequest.send();
}

function singUp() {
    const usuario = document.getElementById("myUs").value;
    const contra = document.getElementById("myPass").value;
    const mensaje = document.getElementById("msg");
    const newUser = { nombre: usuario, contrasena: contra };
    let encontrado = false;

    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "json.json", true);

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            mensaje.innerHTML = '';

            for (let i = 0; i < datos.length; i++) {
                if (usuario === datos[i].nombre) {
                    mensaje.innerHTML = `User ${datos[i].nombre}, has been taken`;
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                // Realizar el envío solo si el usuario no está tomado
                const httpPostRequest = new XMLHttpRequest();
                httpPostRequest.open("POST", "./json.json", true);
                httpPostRequest.setRequestHeader("Content-Type", "application/json");
                httpPostRequest.send(JSON.stringify(newUser));

                mensaje.innerHTML = "User has been registered";
            }
        }
    };

    httpRequest.send();
}



$(document).ready(function(){



    $('#confirm').on('click', function(){ //seleccionamos el boton con clase boton y le asignamos una funcion al escuchar un click
        console.log('presionado')
        const usuarioJq = $('#myUs').val(); // recuperamos el valor del input usuario con el metodo val()
        const contraJq = $('#myPass').val(); // recuperamos el valor del input contraseña con el metodo val()
        console.log(usuarioJq) // imprimimos en consola el valor de myUs
        console.log(contraJq) // imprimimos en consola el valor de myPass
        let usuarioLogueado; // declaramos una variable para realizar localstorage del usuario
        let contrasenaLogueada; // declaramos una variable para realizar localstorage de la usuario


       $.ajax('json.json', { //se recupera el json a traves de .ajax(url)
        dataType: 'json', // especifica que el formato de datos recuperado corresponde a JSON
        contentType: 'application/json', // establece el tipo de contenido de la solicitud a JSON, lo que podría ser necesario dependiendo del API o servidor con el que te estés comunicando.
        cache: false // evita que el navegador guarde en cache la respuesta, siempre lo solicitara al servidor
    })
    .done(function(response){ // metodo que devuelve una respuesta si la solicitud es exitosa (codigo 200 - 299)
        console.log(response); // imprimimos la respuesta en consola
        let encontrado = false // se genera la variable encontrado en false, con esto podemos generar un break
        for(let i=0; i<response.length; i++){ //creamos un loop para recorrer el array del JSON
            if(response[i].nombre === usuarioJq  && response[i].contrasena === contraJq.toString()){ // buscamos coincidencias de los input con el json
                console.log('hola');

                usuarioLogueado = usuarioJq; // modificamos el valor de la variable de localstorage por las ingresadas en usuarioJq
                contrasenaLogueada = contraJq; // modificamos el valor de la variable de localstorage por las ingresadas en contrasenaJq
                localStorage.setItem("usuarioJq", usuarioLogueado); // almacenamos el usuario en el local storage
                localStorage.setItem("contrasenaJq", contrasenaLogueada); // almacenamos la contrasena en el local storage
                encontrado = true // si la comparacion es exitosa, se asignara true a encontrado generando el break
                break; // break


            }         
        }

        if(!encontrado){ // se genera un nuevo if de encontrado en caso de que la comparacion nunca sea false (este control se realiza separado del control anterior)
            console.log('nope')
        }
        }); 
        
    });



    $('#clear').on('click', function () { // limpiar el localstorage
        console.log('clear')
        localStorage.clear();
    });

    //todo list

    $('#add-container').on('click', '#toDo', function(){ // seleccionamos el contenedor y escuchamos el clic del boton toDo 
        const value = $('#add-container input').val(); // guardamos el valor del input
        console.log(value) // imprimimos el valor del input en consola
        const html =`<div class="item">  
        ` + value  +  ` 
        <div class="remove"> x </div> ` // creamos una variable a imprimir en el html con el valor del input
        console.log(html) // imprimimos el nuevo html a imprimir

        $('#places-container').append(html); // utilizamos append para incluir el nuevo elemento del valor del input al final de la lista

        $('#places-container').on('click', '.remove', function(){ // escuchamos el evento del boton remove, seleccionando el contenedor padre
            const parent = $(this).parent().remove(); // guardamos en una variable el evento, seleccionando el contenedor padre y utilizamos el metodo remove para eliminar el elemento que queremos eliminar
        })
    });
    
});