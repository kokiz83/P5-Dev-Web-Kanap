"use strict"
function getCart() {
  let produitStorage = [];
  if (localStorage.getItem("panier") != null) {
    produitStorage = JSON.parse(localStorage.getItem("panier"));
  }
  return produitStorage
}

let produitStorage = getCart()
let h1 = document.querySelector("h1")
console.log(h1)
let cartOrder = document.getElementsByClassName("cart__order")
console.log(cartOrder[0])
let cartPrice = document.getElementsByClassName("cart__price")
// si panier vide 
if (produitStorage === null || produitStorage.length == 0) {
  h1.textContent = 'votre panier est vide'
  cartOrder[0].innerHTML = ""
  cartPrice[0].innerHTML = ""
} else{

}
//////??????????????????????????????????????

function creatCart() {
  let produitStorage = getCart()
  for (let i = 0; i < produitStorage.length; i++) {

    let color = produitStorage[i].color
    let id = produitStorage[i].id
    let quantity = produitStorage[i].quantity



    let section = document.querySelector("#cart__items")
    let produiselect = document.createElement("article")
    let divCartImg = document.createElement("div")
    let image = document.createElement("img")
    let divCartCentent = document.createElement("div")
    let divDescription = document.createElement("div")
    let divSettings = document.createElement("div")
    let divQuantity = document.createElement("div")
    let divDelete = document.createElement("div")

    // append produit 
    section.append(produiselect)
    produiselect.append(divCartImg)
    divCartImg.append(image)
    produiselect.append(divCartCentent)
    divCartCentent.appendChild(divDescription)
    divCartCentent.appendChild(divSettings)
    divSettings.appendChild(divQuantity)
    divSettings.appendChild(divQuantity)
    divSettings.appendChild(divDelete)



    //recupération du prix &name & image en utilisant l'id du produit
    let produitApi = ""
    fetch("http://localhost:3000/api/products/" + id)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(async function (dataApi) {
        produitApi = await dataApi

        // insertion  price & name
        divDescription.innerHTML = `<h2>${produitApi.name} </h2> <p>${produitApi.price} €</p><p>${color}</p>`
        image.alt = produitApi.altTxt
        image.src = produitApi.imageUrl
      })

    // creé des classe 
    produiselect.dataset.id = id
    produiselect.dataset.color = color
    produiselect.classList.add("cart__item")
    divCartImg.classList.add("cart__item__img")
    divCartCentent.classList.add("cart__item__content")
    divDescription.classList.add("cart__item__content__description")
    divSettings.classList.add("cart__item__content__settings")
    divQuantity.classList.add("cart__item__content__settings__quantity")
    divDelete.classList.add("cart__item__content__settings__delete")


    //div Quantity
    divQuantity.innerHTML = `<p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}"> `

    // div Delet
    divDelete.innerHTML = `<p class="deleteItem">Supprimer</p>`
  }
}
creatCart()

///  récupèrer le prix de chaque produit pa rapport a son id

async function getProductPrice(id) {

  const res = await fetch("http://localhost:3000/api/products/" + id)
  const dataPrice = await res.json()
  return dataPrice.price
}
// calculer le prix totale 
async function calaculePrice() {
  let produitStorage = getCart()
  let totalePrice = 0

  for (let i = 0; produitStorage.length; i++) {
    let produit = produitStorage[i]
    let id = produitStorage[i].id
    const infoPrice = await getProductPrice(id)
    totalePrice += infoPrice * produit[`quantity`]
    let totalePriceElm = document.querySelector("#totalPrice")
    totalePriceElm.textContent = totalePrice
  }
}
calaculePrice()

// calcule  totale quantity 
function calculTotaleQuantity() {
  let produitStorage = getCart()
  let qty = 0
  for (let i = 0; i < produitStorage.length; i++) {
    let quantity = produitStorage[i].quantity
    qty += +quantity
    let totaleQuantity = document.querySelector("#totalQuantity")
    totaleQuantity.textContent = qty

  }
} calculTotaleQuantity()
// pour pouvoir supprimer l'article du panier et ajuster le prix
function suppProduit() {
  let produitStorage = getCart()
  let deleteItem = document.getElementsByClassName("deleteItem")

  for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", function (event) {
      let btnSupprimer = event.target
      produitStorage.splice(l, 1)

      localStorage.setItem("panier", JSON.stringify(produitStorage))
      btnSupprimer.closest("article").remove()

      calculTotaleQuantity()
      calaculePrice()
    })
  }
}
suppProduit()


// modifier la quantité de produit dans la page panier 
function modifQuantity() {
  let modifItemQuantity = document.querySelectorAll(".itemQuantity")

  for (let q = 0; q < modifItemQuantity.length; q++) {
    let input = modifItemQuantity[q]

    input.addEventListener("change", (e) => {
      let input = e.target

      if (isNaN(input.value) && input.value <= 0) {
        input.value = 1
      }
      let produitStorage = getCart()
      produitStorage[q].quantity = parseInt(input.value);
      localStorage.setItem("panier", JSON.stringify(produitStorage));
      calculTotaleQuantity()
      calaculePrice()
    })
  }
} modifQuantity()


/****************************formulaire***********************/
// recuperer les valeurs du formulaire 
// selectionner les valeurs de formulaire

let form = document.getElementById("cart__order__form")
let input = document.querySelector("input")
let orderCommander = document.getElementById("order")
let firstName = document.getElementById("firstName")
let firstNameError = document.getElementById("firstNameErrorMsg")
let lastName = document.getElementById("lastName")
let lastNameError = document.getElementById("lastNameErrorMsg")
let city = document.getElementById("city")
let cityError = document.getElementById("cityErrorMsg")
let address = document.getElementById("address")
let addressError = document.getElementById("addressErrorMsg")
let email = document.getElementById("email")
let emailError = document.getElementById("emailErrorMsg")


// RegExp
let adresseRegExp = /^[A-zÀ-ú0-9 ,.'\-]+$/
let nameRegExp = /^[A-zÀ-ú \-]+$/;
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/

//l'utilisateur va saisi une prenom valide

firstName.addEventListener('change', function (e) {
  let value = e.target.value;
  if (nameRegExp.test(value)) {
    firstNameError.innerHTML = '';
  } else {
    firstNameError.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
  }
})

//l'utilisateur va saisi une nom valide
lastName.addEventListener('change', function (e) {
  let value = e.target.value;
  if (nameRegExp.test(value)) {
    lastNameError.innerHTML = '';
  } else {
    lastNameError.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
  }
})
//l'utilisateur va saisi une adresse valide
address.addEventListener('change', function (e) {
  let value = e.target.value;
  if (adresseRegExp.test(value)) {
    addressError.innerHTML = '';
  } else {
    addressError.innerHTML = 'Champ invalide, veuillez vérifier votre adresse.';
  }
})
//l'utilisateur va saisi une ville valide
city.addEventListener('change', function (e) {
  let value = e.target.value;
  if (nameRegExp.test(value)) {
    cityError.innerHTML = '';
  } else {
    cityError.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
  }
})
//l'utilisateur va saisi une email valide
email.addEventListener('change', function (e) {
  let value = e.target.value;
  if (emailRegExp.test(value)) {
    emailError.innerHTML = '';
  } else {
    emailError.innerHTML = 'Champ invalide, veuillez vérifier votre mail.';
  }
})


orderCommander.addEventListener(("click"), (e) => {
  e.preventDefault()
 
  //l'utilisateur doit rempli tous les champs obligatoires
  if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
  
    alert("merci de remplire vos coordonnées afin de poursuivre!");
    e.preventDefault();
}else if(emailRegExp.test(email.value) == false
 || nameRegExp.test(firstName.value) == false
 || adresseRegExp.test(address.value) == false 
|| nameRegExp.test(lastName.value) == false
|| nameRegExp.test(city.value) == false){
  alert("merci de Vérifiez vos coordonnées pour passer la commande !");
}else{
  envoieProducts()
}



})
// si l'utilisateur est bien remplie tous les champs et tous ils sont valider confirmer la commande
function envoieProducts(){ 
  let productId = []
for (let p = 0; p < produitStorage.length; p++) {
  productId.push(produitStorage[p].id)
}
let contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  address: address.value,
  city: city.value,
  email: email.value
}
console.log(typeof(contact))
localStorage.setItem("contact", JSON.stringify(contact));
localStorage.setItem("productId", JSON.stringify(productId))
let order = {
  contact,
  products:productId
}

fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(order)
})
  .then((response) => response.json())
 
  .then((data) => {
    let orderId = data.orderId
document.location.href = "/front/html/confirmation.html?orderId=" + `${data.orderId}` 
localStorage.clear()

  })
}
		
  

  

  /**
   *
   * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */









