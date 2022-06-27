
class Mates{
    constructor(nombre, precio, id){
        this.nombre = nombre.toLocaleLowerCase()
        this.precio = parseFloat(precio)
        this.id = id
    }
}

const mateImp = new Mates ("Mate Imperial", 5000, "AN1")
const mateTor = new Mates ("Mate Torpedo", 3000, "AN2")
const mateCam = new Mates ("Mate Camionero", 3500, "AN3")
const bombAlp = new Mates ("Bombilla de Alpaca", 2200, "AN4")
const bombAce = new Mates ("Bombilla de Acero", 1200, "AN5")

let gastoTotal = 0 

const sumarProducto = (producto) => (gastoTotal += producto)

function comprar() {
    let continuar = true
    alert("Bienvenido a AireNomade, la tienda de Mates más grande del planeta tierra")

while (continuar){
    let producto = prompt(`Te presentamos nuestro catálogo. ¿Qué producto te interesa? Escribí su código!
    ${mateImp.id} - ${mateImp.nombre} ${mateImp.precio}
    ${mateTor.id} - ${mateTor.nombre} ${mateTor.precio}
    ${mateCam.id} - ${mateCam.nombre} ${mateCam.precio}
    ${bombAlp.id} - ${bombAlp.nombre} ${bombAlp.precio}
    ${bombAce.id} - ${bombAce.nombre} ${bombAce.precio}
    AN6 - Salir
    
    Gastaste: ${gastoTotal}`)

    switch (producto){
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

    if(producto!=6) continuar = confirm(`Desea seguir comprando? 
    - ACEPTAR para seguir
    - CANCELAR para finalizar.`)
    }

    alert(`Tu monto total es de $${gastoTotal}`);
}

comprar()

let pago = prompt(`¿Con qué método preferís abonar?: 
                1 - Tarjeta de crédito (3 cuotas s/ interés disponibles).
                2 - Tarjeta de débito / Transferencia bancaria.
                3 - Efectivo (10% OFF).
            Ingresá el número de opción que elijas.`)

if(pago === "1"){
    alert(`El gasto total es de $${gastoTotal}, y tu pago lo realizarás en 3 cuotas de $${gastoTotal/3} cada una.`)
} else if(pago === "2"){
    alert(`El gasto total es de $${gastoTotal}. Nos estaremos comunicándo con vos para enviarte los datos bancarios para transferir el dinero.`)
} else if (pago === "3"){
    alert(`El gasto total es de $${gastoTotal*0.9}.`)
} else {
    alert(`Error! Ingresá correctamente la opción.`)
}

alert("Te agradecemos por confiar en nosotros. La Vida es mejor con un Mate! Salí a conocer el mundo.")



