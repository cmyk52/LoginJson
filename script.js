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
    $.ajax('json.json', {
        dataType: 'json',
        contentType: 'application/json',
        cache: false
    })
    .done(function(response){
        console.log(response);
    });
});




