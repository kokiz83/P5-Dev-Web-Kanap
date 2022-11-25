// Récupération de l'url avec id de produit
const queryString = window.location.href
const url = new URL(queryString)
const id = url.searchParams.get("id")

// Appel API avec l'id du produit on utilisant la méthode Get
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(res => addProducts(res))
    .catch(error => alert("Erreur : " + error));

// Affichier les produits
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
//Insertion image du produit
function addImg(imageUrl, altTxt) {
    const item = document.querySelector(".item__img")
    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = altTxt
    item.appendChild(img)
}
//Insertion du nom de produit
function addtiTle(name) {
    const title = document.querySelector("h1")
    title.textContent = name
}
//Insertion du description 
function addDesciption(description) {
    const p = document.getElementById("description")
    p.textContent = description
}
//Insertion du prix
function addPrice(price) {
    const span = document.querySelector("span")
    span.textContent = price
}


// Fonction pour inseré les couleurs de choix
function addColors(colors) {
    const s = document.querySelector("select")
    const option1 = new Option(colors[0], colors[0])
    s[s.length] = option1
    const option2 = new Option(colors[1], colors[1])
    s[s.length] = option2
    const option3 = new Option(colors[2], colors[2])
    s[s.length] = option3
}



//------------------------Parti "recupuration de produit choisi par l'utilisateur"-------------------/

// Selectionner le bouton 
let btn = document.getElementById("addToCart")

// Ecoute de click sur le bouton d'ajoute au panier 
function ajoutProduit(btn) {
    btn.addEventListener("click", (e) => {
        const color = document.querySelector("#colors").value
        const quantity = document.querySelector("#quantity").value
        // Constante de produit choisi à récupérer dans le localstorage
        const produitData = {
            id: id,
            color: color,
            quantity: +quantity,
        }
        // Vérifier si les champs de color et quantité et remplie
        if (color == null || color === "") {
            return alert("Merci de choisir une couleur")
        }

        if (quantity == null || quantity <= 0 || quantity >= 100) {
            return alert("Merci de choisir une quantité comprise entre 1 et 100")
        }

        else {

            // Verifier si l'id de l'article selectionner est deja dans le panier
            // Si avec la meme couleur en incrémente la quantité sinon en rajout un autre produit 
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

            // Ajouter  l'article dans le localstorage
            if (position == -1) {
                panier.push(produitData);
            } else {
                panier[position].quantity += produitData.quantity;

            }
            localStorage.setItem("panier", JSON.stringify(panier));

            //    Envoyer vers la page pannier
            window.location.href = "/front/html/cart.html"
        }

    });
}
