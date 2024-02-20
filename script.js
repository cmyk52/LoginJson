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



    $('.boton').on('click', function(){ //seleccionamos el boton con clase boton y le asignamos una funcion al escuchar un click
        console.log('presionado')
        const usuarioJq = $('#myUs').val(); // recuperamos el valor del input usuario con el metodo val()
        const contraJq = $('#myPass').val(); // recuperamos el valor del input contraseña con el metodo val()
        console.log(usuarioJq) // imprimimos en consola el valor de myUs
        console.log(contraJq) // imprimimos en consola el valor de myPass

       $.ajax('json.json', { //se recupera el json a traves de .ajax(url)
        dataType: 'json', // especifica que el formato de datos recuperado corresponde a JSON
        contentType: 'application/json', // establece el tipo de contenido de la solicitud a JSON, lo que podría ser necesario dependiendo del API o servidor con el que te estés comunicando.
        cache: false // evita que el navegador guarde en cache la respuesta, siempre lo solicitara al servidor
    })
    .done(function(response){ // metodo que devuelve una respuesta si la solicitud es exitosa (codigo 200 - 299)
        console.log(response); // imprimimos la respuesta en consola
        for(let i=0; i<response.length; i++){
            if(response[i].nombre === usuarioJq  && response[i].contrasena === contraJq.toString()){
                console.log('hola');
                break;
            } else {
                console.log('nope');
                }
        
        }
        }); 
    });
});




