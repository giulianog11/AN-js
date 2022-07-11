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


const calcularPrecioFinal = (lista) => {
  let gastoTotal = 0;
  lista.map((mate) => { gastoTotal += mate.precio })
  return gastoTotal
};   

const mostrarProductos = (lista) => {
  let mensaje = `Su compra es: ` 
  lista.map((mate) => {mensaje += ` | ` +  mate.nombre + `  ` + mate.precio + ` | `})
   return mensaje
}

let continuar = confirm(`¿Desea comprar?`);
let precioFinal = 0 

if (continuar) {
  let matesComprados = []
  while (continuar) {
    let producto =
      prompt(`Te presentamos nuestro catálogo. ¿Qué producto te interesa? Escribí su código!
      ${mates[0].id} - ${mates[0].nombre} ${mates[0].precio}
      ${mates[1].id} - ${mates[1].nombre} ${mates[1].precio}
      ${mates[2].id} - ${mates[2].nombre} ${mates[2].precio}
      ${mates[3].id} - ${mates[3].nombre} ${mates[3].precio}
      ${mates[4].id} - ${mates[4].nombre} ${mates[4].precio}
      AN6 - Salir
      Gastaste: ${precioFinal}`);
    
    switch (producto) {
      case "AN1":
        matesComprados.push(mateImp);
        break;
      case "AN2":
        matesComprados.push(mateTor);
        break;
      case "AN3":
        matesComprados.push(mateCam)
        break;
      case "AN4":
        matesComprados.push(bombAlp)
        break;
      case "AN5":
        matesComprados.push(bombAce);
        break;
      case "AN6":
        continuar = false;
        break;
      default:
        alert("Ingresaste un valor incorrecto");
        break;
    }
     precioFinal = calcularPrecioFinal(matesComprados)

    if (producto != "AN6")
      continuar = confirm(`Desea seguir comprando? 
    - ACEPTAR para seguir
    - CANCELAR para finalizar.`);
  }

  alert(`${mostrarProductos(matesComprados)} y el gasto total es de: $${precioFinal}`);

let flag = true

while (flag){
  let pago = prompt(`¿Con qué método preferís abonar?: 
    1 - Tarjeta de crédito (3 cuotas s/ interés disponibles).
    2 - Tarjeta de débito / Transferencia bancaria.
    3 - Efectivo (10% OFF).
Ingresá el número de opción que elijas.`);

  if (pago === "1") {
    if (confirm (`¿Está seguro que desea pagar con tarjeta de crédito?`)){
      alert(
        `El gasto total es de $${precioFinal}, y tu pago lo realizarás en 3 cuotas de $${
          (precioFinal / 3).toFixed(2)
        } cada una.`
      );
      flag = false 
    }
    
  } else if (pago === "2") {
    if (confirm (`¿Está seguro que desea pagar con tarjeta de débito?`)){
    alert(
      `El gasto total es de $${precioFinal}. Nos estaremos comunicándo con vos para enviarte los datos bancarios para transferir el dinero.`
    );
    flag = false
    }
  } else if (pago === "3") {
    if (confirm (`¿Está seguro que desea pagar con efectivo?`)){
    alert(`El gasto total es de $${precioFinal * 0.9}.`);
    flag = false
    }
  } else {
    alert(`Error! Ingresá correctamente la opción.`);
  }
  }
} 

alert(`Te agradecemos por visitar nuestra web. La Vida es mejor con un Mate! Salí a conocer el mundo.`)





