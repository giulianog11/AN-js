// class Mate {
//   constructor(nombre, precio, id, imagen, descripcion) {
//     this.nombre = nombre;
//     this.precio = parseFloat(precio);
//     this.id = id;
//     this.imagen = imagen;
//     this.descripcion = descripcion;
//   }
// }

// let mates = [];

// const mateImp = new Mate(
//   "Mate Imperial",
//   5000,
//   "AN1",
//   "./media/img/Card1.jpg",
//   "descripcion"
// );
// const mateTor = new Mate(
//   "Mate Torpedo",
//   3000,
//   "AN2",
//   "./media/img/Card2.jpg",
//   "descripcion"
// );
// const mateCam = new Mate(
//   "Mate Camionero",
//   3500,
//   "AN3",
//   "./media/img/Card3.jpg",
//   "descripcion"
// );
// const bombAlp = new Mate(
//   "Bombilla de Alpaca",
//   2200,
//   "AN4",
//   "./media/img/P1.jpg",
//   "descripcion"
// );

// mates.push(mateImp);
// mates.push(mateTor);
// mates.push(mateCam);
// mates.push(bombAlp);

window.onload = () => {
  let contenedor = document.getElementById(`cardContainer`);
  async function matesCall() {
    const response = await fetch("./inventory.json");
    const mates = await response.json();

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
          <button id=cardbtn class="btn btn-primary add-to-cart" data-id=${mate.id} data-price=${mate.precio}
          data-name=${mate.nombre}>Agregar al carrito</button>
        </div>`;
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
            cantidad: 1,
          };
          if (matesIds.indexOf(mateComprado.id) === -1) {
            matesIds.push(mateComprado.id);
            chartItems += 1;
            cartBtn.innerHTML = `Carrito ${chartItems} `;
            modal.innerHTML =
              modal.innerHTML +
              `
        <div id=${mateComprado.id} class="border p-2" style="max-width: 540px;">
          <div class="d-flex justify-content-around align-items-center w-100 ">
            <p class="mateComprado">${mateComprado.nombre}</p>
            <p class="text-muted price">${mateComprado.precio}</p>
            <p class="quantity">${mateComprado.cantidad}</p>
            <button type="button" class="btnModal btn btn-secondary">X</button>
          </div>
      </div>`;
            Toastify({
              text: `Agregaste ${mateComprado.nombre}`,
              duration: 1500,
              close: true,
              gravity: `bottom`,
              position: "right",
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d",
              },
            }).showToast();
            const deleteBtns = document.getElementsByClassName("btnModal");
            console.log(deleteBtns);
            for (let i = 0; i < deleteBtns.length; i++) {
              deleteBtns[i].addEventListener("click", function (e) {
                const mate = deleteBtns[i].parentElement.parentElement;
                cartBtn.innerHTML = `Carrito ${chartItems - 1} `;
                mate.remove();
              });
            }
          } else {
            const mateModal = document.getElementById(mateComprado.id);
            let quantum = parseInt(
              mateModal.querySelector(".quantity").innerText
            );
            mateModal.querySelector(".quantity").innerText = quantum + 1;
            let precioMate = parseInt(
              mateModal.querySelector(".price").innerHTML.replace("$", "")
            );
            mateModal.querySelector(".price").innerHTML = `$${
              precioMate * mateModal.querySelector(".quantity").innerText
            }`;
            Toastify({
              text: `Añadiste otra unidad de ${mateComprado.nombre}`,
              duration: 1500,
              close: true,
              gravity: `bottom`,
              position: "right",
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d",
              },
            }).showToast();
          }
        });
      }
    });
  }
  matesCall();
  let matesComprados = [];

  // mates.forEach((mate) => {
  //   contenedor.innerHTML =
  //     contenedor.innerHTML +
  //     `
  //     <div class="card mate" style="width: 18rem; margin-bottom: 10px;" >
  //     <img src=${mate.imagen} class="card-img-top p-2 card1" alt="mate.imperial">
  //     <div class="card-body">
  //       <h5 class="card-title name">${mate.nombre}</h5>
  //       <p class="card-text">${mate.descripcion}</p>
  //       <p class="card-text price">$${mate.precio}</p>
  //       <p class="d-none id">${mate.id}</p>
  //       <button id=cardbtn class="btn btn-primary add-to-cart" data-id=${mate.id} data-price=${mate.precio}
  //       data-name=${mate.nombre}>Agregar al carrito</button>
  //     </div>`;
  // });

  // const modal = document.querySelector(`.modal-body`);
  // const cartBtn = document.querySelector(".carrito");

  // const matesArr = document.getElementsByClassName("mate");
  // let matesIds = [];
  // let chartItems = 0;
  // for (let i = 0; i < matesArr.length; i++) {
  //   console.log('hodas')
  //   matesArr[i].addEventListener("click", function (e) {
  //     console.log('hjola')
  //     let mate = e.target.parentElement;
  //     let mateComprado = {
  //       nombre: mate.querySelector(".name").innerText,
  //       id: mate.querySelector(".id").innerText,
  //       precio: mate.querySelector(".price").innerText,
  //       cantidad: 1,
  //     };
  //     if (matesIds.indexOf(mateComprado.id) === -1) {
  //       matesIds.push(mateComprado.id);
  //       chartItems += 1;
  //       cartBtn.innerHTML = `Carrito ${chartItems} `;
  //       modal.innerHTML =
  //         modal.innerHTML +
  //         `
  //       <div id=${mateComprado.id} class="border p-2" style="max-width: 540px;">
  //         <div class="d-flex justify-content-around align-items-center w-100 ">
  //           <p class="mateComprado">${mateComprado.nombre}</p>
  //           <p class="text-muted price">${mateComprado.precio}</p>
  //           <p class="quantity">${mateComprado.cantidad}</p>
  //           <button type="button" class="btnModal btn btn-secondary">X</button>
  //         </div>
  //     </div>`;
  //       Toastify({
  //         text: `Agregaste ${mateComprado.nombre}`,
  //         duration: 1500,
  //         close: true,
  //         gravity: `bottom`,
  //         position: "right",
  //         style: {
  //           background: "linear-gradient(to right, #00b09b, #96c93d",
  //         },
  //       }).showToast();
  //       const deleteBtns = document.getElementsByClassName("btnModal");
  //       console.log(deleteBtns);
  //       for (let i = 0; i < deleteBtns.length; i++) {
  //         deleteBtns[i].addEventListener("click", function (e) {
  //           const mate = deleteBtns[i].parentElement.parentElement
  //           cartBtn.innerHTML = `Carrito ${chartItems - 1} `
  //           mate.remove()
  //         });
  //       }
  //     } else {
  //       const mateModal = document.getElementById(mateComprado.id);
  //       let quantum = parseInt(mateModal.querySelector(".quantity").innerText);
  //       mateModal.querySelector(".quantity").innerText = quantum + 1;
  //       let precioMate = parseInt(
  //         mateModal.querySelector(".price").innerHTML.replace("$", "")
  //       );
  //       mateModal.querySelector(".price").innerHTML = `$${
  //         precioMate * mateModal.querySelector(".quantity").innerText
  //       }`;
  //       Toastify({
  //         text: `Añadiste otra unidad de ${mateComprado.nombre}`,
  //         duration: 1500,
  //         close: true,
  //         gravity: `bottom`,
  //         position: "right",
  //         style: {
  //           background: "linear-gradient(to right, #00b09b, #96c93d",
  //         },
  //       }).showToast();
  //     }
  //   });
  // }
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

const compriBtn = document.getElementById(`compri`);
const cancelarBtn = document.getElementById(`cancelar`);

cancelarBtn.addEventListener(`click`, () => {
  Swal.fire({
    icon: "warning",
    title: "¿Seguro deseas eliminar este producto del carrito?",
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: `No`,
    confirmButtonText: `Si, estoy seguro`,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      Swal.fire({
        title: `Se eliminó el producto`,
        icon: `success`,
        confirmButtonText: `Ok`,
        timer: 2000,
      });
    }
  });
});

compriBtn.addEventListener(`click`, () => {
  Swal.fire({
    icon: "question",
    title: "¿Deseas comprar todos los productos del carrito?",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: `Si, estoy seguro`,
    cancelButtonText: `Salir urgentemente`,
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      Swal.fire({
        title: `Compra realizada`,
        icon: `success`,
        confirmButtonText: `Ok`,
        timer: 2000,
      });
    }
  });
});
