// Récupérer les produit depuis l'api avec fetch
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))
    .catch(error => alert("Erreur : " + error));

function addProducts(data) {
    
    //Fonction pour crée et affichier tout les produit en utilusant la méthode forEach
    data.forEach(kanap => {
        "kanap", kanap
        const { _id, imageUrl, altTxt, name, description } = kanap
        const items = document.getElementById("items")
        const a = document.createElement("a")
        const article = document.createElement("article")
        const image = addImg(imageUrl, altTxt)
        const h3 = addTitele(name)
        const p = addDesciption(description)

        items.appendChild(a)
        a.href = "./product.html?id=" + _id
        a.appendChild(article)
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p)
    });
}
// Affichier l'image
function addImg(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

// Affichier le nom de produit
function addTitele(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}

// Affichier la description 
function addDesciption(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")

    return p
}