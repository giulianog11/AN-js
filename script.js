const matesContainer = document.getElementById(`cardContainer`);
const matesCart = document.querySelector(`.modal-body`);
const cartBtn = document.querySelector(".carrito");
const buyCartBtn = document.getElementById("buy-cart");
const form = document.getElementById("contact");
const alertDiscount = document.getElementById("alert");
const cartTotal = document.querySelector(".cart-total");

(async function renderizeMates() {
  const res = await fetch("./inventory.json");
  const mates = await res.json();
  const matesArr = document.getElementsByClassName("mate");

  mates.forEach((mate) => {
    matesContainer.innerHTML += `
        <div class="card mate" style="width: 18rem; margin-bottom: 10px;" >
            <img src=${mate.imagen} class="card-img-top p-2 card1" alt="mate.imperial">
            <div class="card-body">
                <h5 class="card-title name">${mate.nombre}</h5>
                <p class="card-text">${mate.descripcion}</p>
                <p class="card-text price">$${mate.precio}</p>
                <p class="d-none id">${mate.id}</p>
                <button class="btn btn-primary add-to-cart" data-id=${mate.id} data-price=${mate.precio}
                data-name=${mate.nombre}>Agregar al carrito</button>
            </div>
        </div>
        `;
  });

  for (let i = 0; i < matesArr.length; i++) {
    const addToCartBtn = matesArr[i].querySelector("button");
    addToCartBtn.addEventListener("click", addToCart);
  }
})();

const addToCart = (event) => {
  const mate = event.target.parentElement;
  const name = mate.querySelector(".name").innerText;
  const id = mate.querySelector(".id").innerText;
  const price = mate.querySelector(".price").innerText;
  if (!checkIfMateIsAdded(id)) {
    matesCart.innerHTML += `
            <div id=${id} class="d-flex border p2 ${id}" style="max-width: 540px;">
                <div class="d-flex justify-content-between align-items-center w-100 m-2 p-2">
                    <p class="mateComprado p-0 m-0">${name}</p>
                    <p class="text-muted price p-0 m-0">${price}</p>
                    <p class="quantity p-0 m-0">1</p>
                    <button type="button" class="btnModal btn btn-secondary delete-from-cart">X</button>
                </div>
            </div>
        `;
    callToastify(`Agregaste ${name}`);
    deleteItemFromCart();
  } else {
    const addedMate = matesCart.getElementsByClassName(id)[0];
    const addedMateQuantity = +addedMate.querySelector(".quantity").innerHTML;
    addedMate.querySelector(".quantity").innerHTML = addedMateQuantity + 1;
    addedMate.querySelector(".price").innerHTML = `$${
      +addedMate.querySelector(".quantity").innerHTML * +price.replace("$", "")
    }`;
    callToastify(`Añadiste otra unidad de ${name}`);
    deleteItemFromCart();
  }

  updateCartTotal();
  renderizeCartLength();
};

const renderizeCartLength = () => {
  const cartLength = matesCart.getElementsByClassName("mateComprado").length;
  let cartText = cartLength === 0 ? "Carrito" : `Carrito ${cartLength}`;
  cartBtn.innerHTML = cartText;
  if (cartLength === 0) {
    buyCartBtn.disabled = true;
  } else {
    buyCartBtn.disabled = false;
  }
};

const checkIfMateIsAdded = (mateId) => {
  const matesIds = matesCart.getElementsByClassName(mateId);
  return matesIds.length !== 0;
};

const deleteItemFromCart = () => {
  const deleteFromCartBtns =
    matesCart.getElementsByClassName("delete-from-cart");
  for (let i = 0; i < deleteFromCartBtns.length; i++) {
    deleteFromCartBtns[i].addEventListener("click", function (e) {
      Swal.fire({
        icon: "warning",
        title: "¿Seguro deseas eliminar este producto del carrito?",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: `No`,
        confirmButtonText: `Si, estoy seguro`,
      }).then((result) => {
        if (result.isConfirmed) {
          const mate = e.target.parentElement.parentElement;
          mate.remove();
          renderizeCartLength();
          updateCartTotal();
          Swal.fire({
            title: `Se eliminó el producto`,
            icon: `success`,
            confirmButtonText: `Ok`,
            timer: 2000,
          });
        }
      });
    });
  }
};

const updateCartTotal = () => {
  const soldMates = matesCart.getElementsByClassName("mateComprado");
  let total = 0;
  for (let i = 0; i < soldMates.length; i++) {
    const soldMatePrice = +soldMates[i].parentElement
      .querySelector(".price")
      .innerHTML.replace("$", "");
    total += soldMatePrice;
  }
  
  if (localStorage.getItem(`Nombre`) === null) {
    cartTotal.innerHTML = `Total $${total}`;
  } else {
    cartTotal.innerHTML = `Total con descuento $${total * 0.9}`;
  }
};

const buyCart = () => {
  Swal.fire({
    icon: "question",
    title: "¿Deseas comprar todos los productos del carrito?",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: `Si, estoy seguro`,
    cancelButtonText: `Salir urgentemente`,
  }).then((result) => {
    if (result.isConfirmed) {
      matesCart.innerHTML = "";
      renderizeCartLength();
      updateCartTotal();
      cartTotal.innerHTML = `Total $0`;
      Swal.fire({
        title: `Compra realizada`,
        icon: `success`,
        confirmButtonText: `Ok`,
        timer: 2000,
      });
    }
  });
};

buyCartBtn.addEventListener("click", buyCart);

const callToastify = (text) => {
  Toastify({
    text: text,
    duration: 1500,
    close: true,
    gravity: `bottom`,
    position: "right",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d",
    },
  }).showToast();
};

form.onsubmit = (e) => {
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
        updateCartTotal();
      }
    }
  }
  if (info.Nombre) {
    alertDiscount.innerText = `Gracias ${info.Nombre} ${info.Apellido} por registrarte. Recibiste un 10% de descuento en tu próxima compra.`;
    alertDiscount.classList.remove(`d-none`);
    setTimeout(() => {
      alertDiscount.classList.add(`d-none`);
    }, 5000);
    form.reset();
  }
};
