// récupération de l'url avec id
const queryString = window.location.href
const url = new URL(queryString)
const id = url.searchParams.get("id")
// récuperer les produits avec leur identité id avec la méthode Get
fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then(res => addProducts(res))
// afichier les produits
function addProducts(res) {
    const { id, price, name, description, colors, imageUrl, altTxt } = res
    console.log(res)
    addImg(imageUrl, altTxt)
    addtiTle(name)
    addPrice(price)
    addDesciption(description)
    addColors(colors)
    ajoutProduit(btn)   
}
function addImg(imageUrl, altTxt) {
    const item = document.querySelector(".item__img")
    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = altTxt
    item.appendChild(img)
}
function addtiTle(name) {
    const title = document.querySelector("h1")
    title.textContent = name
}
function addDesciption(description) {
    const p = document.getElementById("description")
    p.textContent = description
}
function addPrice(price) {
    const span = document.querySelector("span")
    span.textContent = price
}


// fonction pour choisir les color
function addColors(colors) {
    const s = document.querySelector("select")
    const option1 = new Option(colors[0], colors[0])
    s[s.length] = option1
    const option2 = new Option(colors[1], colors[1])
    s[s.length] = option2
    const option3 = new Option(colors[2], colors[2])
    s[s.length] = option3
}



//------------------------parti recupuration de produit choisi par l'utilisateur----------
//----------------------------------------------------------------------------------------
// selectionner le bouton // pour envoyer le produit  dans le panier
let btn = document.getElementById("addToCart")
function ajoutProduit(btn)
{
btn.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    // constante de produit à récupérer dans le localstorage
    const produitData = { 
        id: id,
        color: color,
        quantity: +quantity,
    }
    // vérifier si les champs de color et quantité et remplie
    if (color == null || color === "" || quantity == null || quantity == 0 || quantity >= 100) {
        alert("'Merci de choisir une couleur ET  une quantité comprise entre 1 et 100'")

    }
    else {
        
         // verifier si l'id de l'article selectionner est deja dans le panier
       // si avec la meme couleur en rajoute le quantité sinon en rajout un autr produit 
    let panier = [];
			let produitStorage = JSON.parse(localStorage.getItem("panier"));
			if (produitStorage != null) panier = panier.concat(produitStorage);

			let position = panier.findIndex((item) => {
				return (
					item != null &&
					item.id == id &&
					item.color == produitData.color
                    );
                });

			// envoyer l'article dans le localstorage
			if (position == -1) {
				panier.push(produitData);
			} else {
				panier[position].quantity += produitData.quantity;
                
			}
			localStorage.setItem("panier", JSON.stringify(panier));
		
             //    envoyer vers pannier
        window.location.href = "/front/html/cart.html"   
        } 
        
    });}
    