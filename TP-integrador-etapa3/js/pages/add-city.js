var ciudad_ingresada = document.getElementById("ciudad-agregar");
var succes = document.getElementById("succes");
var error = document.getElementById("error");
var warning = document.getElementById("warning");
const lista_ciudades = [];

//Cada vez que se va a agregar una ciudad, verifica que si hay algo guardado en el LocalStorage (que se guarda en un string separado por comas) y que lo pase elemento por elemento a "lista_ciudades"
if (localStorage.length != 0) {
    cities = localStorage.getItem("cities");
    const array_cities = cities.split(",");
    for (let i = 0; i < array_cities.length; i++) {
        lista_ciudades.push(array_cities[i]);   
    }
}

function mostrarMensaje(mensaje) {
    mensaje.style.display = "block";
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 3000);
}

async function getWeather() {
    const api_id = "4495949d71aed8005ce368ea8c801e00";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad_final}&appid=${api_id}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        }
        else {
            console.log("Error: Ciudad inválida");
            return false;
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function validarCiudad() {
    let valido= await getWeather();
    if (!valido) {
        mostrarMensaje(error);
    }
    else {
        ciudad_final = ciudad_final.replace(",", "-");
        ciudad_final = ciudad_final.toUpperCase();
        lista_ciudades.push(ciudad_final);

        const hasDuplicates = (arr) => arr.length !== new Set(arr).size;
        
        if (hasDuplicates(lista_ciudades)) {
            console.log("Error: La ciudad ya se encuentra guardada");
            lista_ciudades.pop();
            mostrarMensaje(warning);
        }
        else {
            console.log("Ciudad agregada correctamente");
            localStorage.setItem("cities", lista_ciudades);
            mostrarMensaje(succes);
        }
    }
}

function agregarCiudad() {
    if (!ciudad_ingresada.value || !isNaN(ciudad_ingresada.value)) {
        alert("Ingrese una ciudad válida");
    }
    //Si lo ingresado tiene una coma (para especificar con el codigo de pais).
    else if (ciudad_ingresada.value.indexOf(',') !== -1 ) {

        //Separo las palabras luego de una coma y borro todo menos las dos primeras palabras.
        ciudad_final = ciudad_ingresada.value.split(","); 
        ciudad_final.splice(2, Infinity);

        sin_espacio = ciudad_final[1].trim();
        ciudad_final.pop();
        ciudad_final.push(sin_espacio);

        //El codigo pais de Openweather solo funciona correctamente usando 2 caracteres.
        if (ciudad_final[1].length>2 || !ciudad_final[1].length) { 
            alert("Código de país incorrecto. Utilice 2 caracteres (AR, BR, etc.)")
        }
        else {
            //Unifico el array en un solo string para usarlo en validarCiudad().
            ciudad_final = ciudad_final.join(); 
            validarCiudad();
        }
    }
    else {
        ciudad_final = ciudad_ingresada.value;
        validarCiudad();
    }
}
