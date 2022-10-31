var loader = document.getElementById("loader");
var card = document.getElementById("card");
var select = document.getElementById("selector-ciudad");

const cities = localStorage.getItem("cities");
const array_cities = cities.split(",");

console.log(localStorage);
for (let i = 0; i < array_cities.length; i++) {
    if (array_cities[i].indexOf("-")) {
        array_cities[i] = array_cities[i].replace("-", ", ");
    }
    select.innerHTML += `<option value="${array_cities[i]}">${array_cities[i]}</option>`;
}


function mostrarClima(data) {
    const {name, sys:{country}, wind: {speed}, main:{temp, feels_like, humidity, pressure}, weather:[arr]} = data;
    card.innerHTML= `
    <h3>${name} (${country})</h3>
    <img src="http://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
    <p>Temperatura: ${temp}°</p>
    <p>Sensación térmica: ${feels_like}°</p>
    <p>Humedad: ${humidity}%</p>
    <p>Velocidad del viento: ${speed}km/h</p>
    <p>Presión: ${pressure} P</p>`;
    card.style.display="flex";
}

async function consultarCiudad() {
    let ciudad = select.value;
    if (!ciudad) {
        alert("Seleccione una ciudad");
    }
    else {
        if (ciudad.indexOf("-")) {
            ciudad_final = ciudad.replace("-", ",");
        }
        const api_id = "4495949d71aed8005ce368ea8c801e00";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad_final}&appid=${api_id}&units=metric&lang=es`;
        try {
            card.style.display="none";
            loader.style.display="block";
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                loader.style.display="none";
                console.log(data);
                mostrarClima(data);
            }
            else {
                console.log("Error 404");
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}
    
