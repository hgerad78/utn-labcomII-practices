function onClickCalcular() {

    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var num3 = document.getElementById('num3');

    //paso el value que lo lee en string a Int
    var numero1 = parseInt(num1.value)
    var numero2 = parseInt(num2.value)
    var numero3 = parseInt(num3.value)

    if (numero1>numero2 && numero1>numero3) {
        alert("El mayor es el numero: " + numero1);
    } else if (numero2>numero1 && numero2>numero3) {
        alert("El mayor es el numero: " + numero2)
    } else {
        alert("El mayor es el numero: " + numero3)
    }
}

let boton = document.getElementById("boton");
boton.onclick = onClickCalcular;