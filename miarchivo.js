class Mate {
  constructor(nombre, precio, id, imagen, descripcion) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.id = id;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
}

let mates = [];

const mateImp = new Mate(
  "Mate Imperial",
  5000,
  "AN1",
  "./media/img/Card1.jpg",
  "descripcion"
);
const mateTor = new Mate(
  "Mate Torpedo",
  3000,
  "AN2",
  "./media/img/Card2.jpg",
  "descripcion"
);
const mateCam = new Mate(
  "Mate Camionero",
  3500,
  "AN3",
  "./media/img/Card3.jpg",
  "descripcion"
);
const bombAlp = new Mate(
  "Bombilla de Alpaca",
  2200,
  "AN4",
  "./media/img/P1.jpg",
  "descripcion"
);

mates.push(mateImp);
mates.push(mateTor);
mates.push(mateCam);
mates.push(bombAlp);

window.onload = () => {
  let matesComprados = [];
  let contenedor = document.getElementById(`cardContainer`);

  mates.forEach((mate) => {
    contenedor.innerHTML =
      contenedor.innerHTML +
      `
      <div class="card mate" style="width: 18rem; margin-bottom: 10px;" >
      <img src=${mate.imagen} class="card-img-top p-2 card1" alt="mate.imperial">
      <div class="card-body">
        <h5 class="card-title name">${mate.nombre}</h5>
        <p class="card-text">${mate.descripcion}</p>
        <p class="card-text price">$${mate.precio}</p>
        <p class="d-none id">${mate.id}</p>
        <button class="btn btn-primary add-to-cart" data-id=${mate.id} data-price=${mate.precio}
        data-name=${mate.nombre}>Agregar al carrito</button>
      </div>`;
  });

  const modal = document.querySelector(`.modal-body`);
  const cartBtn = document.querySelector(".carrito");

  const matesArr = document.getElementsByClassName("mate");
  let matesIds = [];
  let chartItems = 0;
  for (let i = 0; i < matesArr.length; i++) {
    matesArr[i].addEventListener("click", function (e) {
      let mate = e.target.parentElement;
      let mateComprado = {
        nombre: mate.querySelector(".name").innerText,
        id: mate.querySelector(".id").innerText,
        precio: mate.querySelector(".price").innerText,
        cantidad: 1
      };
      if (matesIds.indexOf(mateComprado.id) === -1) {
        matesIds.push(mateComprado.id);
        chartItems += 1;
        cartBtn.innerHTML = `Carrito ${chartItems} `;
        modal.innerHTML =
          modal.innerHTML +
          `
        <div id=${mateComprado.id} class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${mateComprado.nombre}</h5>
              <p class="card-text"><small class="text-muted">${mateComprado.precio}</small></p>
            </div>
            <p class="card-text quantity">${mateComprado.cantidad}</p>
          </div>
        </div>
      </div>`;
      } else {
        const x = document.getElementById(mateComprado.id)
        let quantum = parseInt(x.querySelector('.quantity').innerText)
        x.querySelector('.quantity').innerText = quantum + 1
      }
    });
  }
};

const contacto = document.getElementById(`contacto`);
const alert = document.getElementById(`alert`);
const bienvenida = document.getElementById(`bienvenida`);

contacto.onsubmit = (e) => {
  e.preventDefault();
  let info = {};
  if (e.target.children.length > 0) {
    for (const el of e.target.children) {
      const input = el.querySelector("input");
      if (input && input.value && input.type !== `submit`) {
        info[input.id] = input.value;
        const obj = {};
        obj[`nombre`] = input.id;
        obj[`valor`] = input.value;
        localStorage.setItem(obj.nombre, obj.valor);
      }
    }
  }
  if (info.Nombre) {
    alert.innerText = `Gracias ${info.Nombre} ${info.Apellido} por registrarte. Te estaremos enviando tu código de descuento vía drone.`;
    alert.classList.remove(`d-none`);
    setTimeout(() => {
      alert.classList.add(`d-none`);
    }, 5000);
    contacto.reset();
  }
};

const nombre = localStorage.getItem(`Nombre`);
const apellido = localStorage.getItem(`Apellido`);

if (nombre || apellido) {
  bienvenida.innerText = `Bienvenido ${nombre} ${apellido}!`;
}
