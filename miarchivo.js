class Mate {
  constructor(nombre, precio, id) {
    this.nombre = nombre.toLocaleLowerCase();
    this.precio = parseFloat(precio);
    this.id = id;
  }
}

let mates = []

const mateImp = new Mate("Mate Imperial", 5000, "AN1");
const mateTor = new Mate("Mate Torpedo", 3000, "AN2");
const mateCam = new Mate("Mate Camionero", 3500, "AN3");
const bombAlp = new Mate("Bombilla de Alpaca", 2200, "AN4");
const bombAce = new Mate("Bombilla de Acero", 1200, "AN5");

mates.push(mateImp)
mates.push(mateTor)
mates.push(mateCam)
mates.push(bombAlp)
mates.push(bombAce)

console.log(mates)

for(let i = 0; i<mates.length; i++){
  alert(`${mates[i].id} - ${mates[i].nombre} ${mates[i].precio}`)
}

// mates.map((mate) => {
//   return(alert(`${mate.id} - ${mate.nombre} ${mate.precio}`))
// })

let gastoTotal = 0;

const sumarProducto = (producto) => {
  return (gastoTotal += producto);
};

function comprar() {
  while (continuar) {
    let producto =
      prompt(`Te presentamos nuestro catálogo. ¿Qué producto te interesa? Escribí su código!
      ${mateImp.id} - ${mateImp.nombre} ${mateImp.precio}
      ${mateTor.id} - ${mateTor.nombre} ${mateTor.precio}
      ${mateCam.id} - ${mateCam.nombre} ${mateCam.precio}
      ${bombAlp.id} - ${bombAlp.nombre} ${bombAlp.precio}
      ${bombAce.id} - ${bombAce.nombre} ${bombAce.precio}
      AN6 - Salir

    Gastaste: ${gastoTotal}`);

    switch (producto) {
      case "AN1":
        sumarProducto(mateImp.precio);
        break;
      case "AN2":
        sumarProducto(mateTor.precio);
        break;
      case "AN3":
        sumarProducto(mateCam.precio);
        break;
      case "AN4":
        sumarProducto(bombAlp.precio);
        break;
      case "AN5":
        sumarProducto(bombAce.precio);
        break;
      case "AN6":
        continuar = false;
        break;
      default:
        alert("Ingresaste un valor invalido");
        break;
    }

    if (producto != "AN6")
      continuar = confirm(`Desea seguir comprando? 
    - ACEPTAR para seguir
    - CANCELAR para finalizar.`);
  }

  alert(`Tu monto total es de $${gastoTotal}`);

  let pago = prompt(`¿Con qué método preferís abonar?: 
    1 - Tarjeta de crédito (3 cuotas s/ interés disponibles).
    2 - Tarjeta de débito / Transferencia bancaria.
    3 - Efectivo (10% OFF).
Ingresá el número de opción que elijas.`);

  if (pago === "1") {
    alert(
      `El gasto total es de $${gastoTotal}, y tu pago lo realizarás en 3 cuotas de $${
        (gastoTotal / 3).toFixed(2)
      } cada una.`
    );
  } else if (pago === "2") {
    alert(
      `El gasto total es de $${gastoTotal}. Nos estaremos comunicándo con vos para enviarte los datos bancarios para transferir el dinero.`
    );
  } else if (pago === "3") {
    alert(`El gasto total es de $${gastoTotal * 0.9}.`);
  } else {
    alert(`Error! Ingresá correctamente la opción.`);
  }
}

let continuar = confirm(`¿Desea comprar?`);
if (continuar) {
  comprar();
} else {
  alert(`Te agradecemos por confiar en nosotros. La Vida es mejor con un Mate! Salí a conocer el mundo. Disfrute nuestra página`);
}



