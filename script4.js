//Importar datos del arreglo de objetos

import {data} from "./data4.js";

//Declaración de constantes

const templateCard = document.getElementById("template-card").content;
const catalogue = document.getElementById("catalogue");
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById("template-footer").content;
const templateShoppingCart = document.getElementById("template-shopping-cart").content;
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const shoppingCart = {};

//Evento para cargar la información apenas cargue la página

document.addEventListener("DOMContentLoaded", () => {
  uploadData(data);
});

//Función para cargar la información en la página

const uploadData = (data) => {
  data.forEach((article) => {
    const { id, title, price, img } = article;
    templateCard.getElementById("productTitle").textContent = title;
    templateCard.getElementById("image").setAttribute("src", img);
    templateCard.getElementById("price").textContent = price;
    templateCard.getElementById("button").dataset.id = id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  catalogue.appendChild(fragment);
};

//Identificar botones y agregar al carrito

catalogue.addEventListener("click", (e) => {
  addShoppingCart(e);
});

const addShoppingCart = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setShoppingCart(e.target.parentElement);
  }
  e.stopPropagation();
};

const setShoppingCart = (product) => {
  const article = {
    id: product.querySelector(".btn-dark").dataset.id,
    title: product.querySelector("h5").textContent,
    price: product.querySelector("p").textContent,
    amount: 1,
  };

  //añadir más elementos del mismo tipo al carrito
  
  if (shoppingCart.hasOwnProperty(article.id)) {
    article.amount = shoppingCart[article.id].amount + 1;
  }
  shoppingCart[article.id] = { ...article };

  showShoppingCart();
};

//Mostrar lo que se agrega al carrito

const showShoppingCart = () => {
  console.log(shoppingCart);
  items.innerHTML = "";
  Object.values(shoppingCart).forEach((article) => {
    templateShoppingCart.querySelector("th").textContent = article.id;
    templateShoppingCart.querySelectorAll("td")[0].textContent = article.title;
    templateShoppingCart.querySelectorAll("td")[1].textContent = article.amount;
    templateShoppingCart.querySelector("span").textContent = article.price * article.amount;

    const clone = templateShoppingCart.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  showFooter();
};

//Mostrar información en el footer

const showFooter = () => {
  footer.innerHTML = "";

const totalAmount = Object.values(shoppingCart).reduce(
  (acc, {amount}) => acc + amount,
  0
);
const totalPrice = Object.values(shoppingCart).reduce(
  (acc, {amount, price}) => acc + amount * price,
  0
);

templateFooter.querySelectorAll("td")[0].textContent = totalAmount;
templateFooter.querySelector("span").textContent = totalPrice;

const clone = templateFooter.cloneNode(true);

fragment.appendChild(clone)
footer.appendChild(fragment)
}

//Información de pago y guardar en el local storage.

pay.addEventListener("submit", function storeLocalStorage() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let card = document.getElementById("payment-card").value;
  let date = document.getElementById("date").value;
  let cvv = document.getElementById("cvv").value;

  if (email == "" || name == "" || card == "" || date == "" || cvv == "") {
    alert("Ingresar todos los datos");
  } else {
    localStorage.setItem("name", name);
    localStorage.setItem("e-mail", email);
    localStorage.setItem("card", card);
    localStorage.setItem("date", date);
    localStorage.setItem("cvv", cvv);
  }
})

//Suscripción al newsletter y guardar en el local storage.

form.addEventListener("submit", function storeLocalStorage() {
  let email = document.getElementById("email").value;

  if (email == "") {
    alert("Ingresar e-mail");
  } else {
    localStorage.setItem("E-mail", email);
  }
});
