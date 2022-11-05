// récupération de l'url avec id
const queryString = window.location.href
const url = new URL(queryString)
const idUrl = url.searchParams.get("id")
console.log(idUrl)




fetch(`http://localhost:3000/api/products/${idUrl}`)
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


// selectionner le bouton 
    let btn = document.getElementById("addToCart")
// pour envoyer le produit  dans le panier
btn.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("choisir une couleur et une quantité")
    } else{
    // sinont envoie le produit choisie au panier 

        const produitData = {
            
            idProduct: idUrl,
            colorProduct: color,
            quantityProduct: +quantity,
        }
      

        // le locale storage
        //utiliser localestorage pour stoker les produit choisi par les client
        
        let produitStorage = JSON.parse(localStorage.getItem("produit"))
        console.log(produitStorage)
        // s'il ya déja des produit dans localstorage
        if (produitStorage) {

            produitStorage.push(produitData)
            localStorage.setItem("produit", JSON.stringify(produitStorage))

        }
        // s'il n'y a pas de produit
        else {
            produitStorage = []
            produitStorage.push(produitData)
            localStorage.setItem("produit", JSON.stringify(produitStorage))
            
            
            
        }}
        //    envoyer vers pannier
    window.location.href = "/front/html/cart.html"

})
        // si le produit choisi  il a la meme id & color ajoute quantité
         
