
var usuario = document.getElementsByName("usuario");
var zona = document.getElementById("zona");
var kwh = document.getElementById("kwh");
var iva;
var resultado;
var validacion;
const costo_servicio = 102
var total_div = document.getElementById("total");

function calcular() {

    for (var i = 0; i < usuario.length; i++) {
        if (usuario[i].checked) {
            var tipo_usuario = usuario[i].value;
        }
    }
    
    //validacion

    if (tipo_usuario!="residencial" && tipo_usuario!="industrial") {
        alert("Ingrese un tipo de usuario");
        validacion=false;
    }
    else if (zona.value=="") {
        alert("Ingrese una zona");
        validacion=false;
    }
    else if (kwh.value=="" || kwh.value<=0) {
        alert("Cantidad de KwH invalida");
        validacion=false;
    }
    else {
        validacion=true;
    }
    //-------------------------------------

    if (validacion==true) {
        if (tipo_usuario=="residencial") {
            iva= 0.21
        }
        if (tipo_usuario=="industrial") {
            iva= 0.27
        }
        resultado= costo_servicio + (parseFloat(kwh.value) * parseFloat(zona.value)) * (1 + iva);
        console.log(resultado);
        total_div.innerHTML= `<p>Total: $${resultado.toFixed(2)} por mes.</p>`
    }
}
