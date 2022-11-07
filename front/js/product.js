// récupération de l'url avec id
const queryString = window.location.href
const url = new URL(queryString)
const id = url.searchParams.get("id")
console.log(id)




fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then(res => addProducts(res))



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
let btn = document.getElementById("addToCart")
function ajoutProduit(btn)
{
// selectionner le bouton // pour envoyer le produit  dans le panier
btn.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    const produitData = { 
        id: id,
        color: color,
        quantity: +quantity,
    }
    if (color == null || color === "" || quantity == null || quantity == 0 || quantity >= 100) {
        alert("choisir une color et une quantité")
    }
    else {
    let panier = [];
			let produitStorage = JSON.parse(localStorage.getItem("panier"));

			// verifier si l'id de l'article selectionner est deja dans le panier
            
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
    