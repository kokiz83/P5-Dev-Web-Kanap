"use strict"

function getCart() {
  let produitStorage = [];
  if (localStorage.getItem("produit") != null) {
    produitStorage = JSON.parse(localStorage.getItem("produit"));
  }
  return produitStorage
}



function addVidePnier() {
  let produitStorage = getCart()
  
  if(produitStorage === null){
    let h1 = document.querySelector("h1")
    h1.textContent ="votre panier est vide !!" 
  }
  return 
}addVidePnier()
 

function creatCart(){
  let produitStorage = getCart()
  for (let i = 0; i < produitStorage.length; i++) {
  
   let color = produitStorage[i].colorProduct
   let id = produitStorage[i].idProduct
   let quantity = produitStorage[i].quantityProduct

 
   
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

   produiselect.classList.add("cart__item")
  

//recupération du prix &name &image en utilisant l'id du produit
   let produitApi = ""
   fetch("http://localhost:3000/api/products/"+id)
     .then(function (res) {
       if (res.ok) {
         return res.json();
       }
     })
     .then(async function (dataApi) {
       produitApi = await dataApi
       console.log(produitApi)
       // insertion  price & name
       divDescription.innerHTML = `<h2>${produitApi.name} </h2> <p>${produitApi.price} €</p><p>${color}</p>`
       image.alt = produitApi.altTxt
       image.src = produitApi.imageUrl
     })
    
   
   produiselect.dataset.id = id
   produiselect.dataset.color = color
   
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

   //getProduit()
  }
 
  
 
 
}
creatCart()


async function getProductPrice(id){

  const res = await fetch("http://localhost:3000/api/products/"+id)
  const dataPrice = await res.json()
  console.log(dataPrice.price)

 return dataPrice.price
}






///  prcourrir tout les produit dans le panier avec for et chaque fois tu recupe le pris par rapport a son id















  /******************************************************************************************************* */
  
  // pour pouvoir supprimer l'article du panier et ajuster le prix

  
function suppProduit() {
  let produitStorage = getCart()
  let deleteItem = document.getElementsByClassName("deleteItem")
console.log(deleteItem)
for(let l =0; l< deleteItem.length; l++)
	  {deleteItem[l].addEventListener("click", function(event) {
let btnSupprimer = event.target
produitStorage.splice(l, 1)

localStorage.setItem("produit",JSON.stringify(produitStorage))
btnSupprimer.closest("article").remove()

	    })
	}
	}
  suppProduit()


 // ajout quantité pour chaque produit
function totleQuntity (){
  let produitStorage =getCart()
  let QUtity = 0
  for(let produit of produitStorage){
    QUtity = QUtity + produit[`quantityProduct`]
    console.log(QUtity)
  }


}
totleQuntity()