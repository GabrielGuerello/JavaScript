function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 10) + 1;
}

function jugarAdivinanza() {
  alert('Bienvenido al juego de adivinanzas');
  alert('Estoy pensando en un número del 1 al 10');

  let numeroSecreto = generarNumeroAleatorio();

  while (true) {

    let introducción = prompt('Escribe un número del 1 al 10 o escribe "salir" para abandonar')

    if (introducción.toLowerCase() === 'salir') {
        alert ('Gracias por jugar!! Hasta Luego!!')
        break;
        }
  

  let numeroUsuario = Number(introducción);

  if (numeroUsuario < 1 || numeroUsuario > 10) {

    alert('Ingrese un número válido!');
    } else {
       if (numeroUsuario === numeroSecreto) {
        alert('Enhorabuena, adivinaste el número que pensé!!');
        break;
       } else {
        alert('CASI!! Intentelo nuevamente');
       }
    }
  }
}
jugarAdivinanza();