// récupération de l'url avec id
const queryString_url_id = window.location.search
const id = queryString_url_id.slice(4)

 fetch(`http://localhost:3000/api/products/${id}`)
.then( response => response.json())
.then(res => addProducts(res) )


function addProducts(res)
{
    const { _id, price, name, description, colors, imageUrl, altTxt } = res
    
    addImg(imageUrl, altTxt)
    addtiTle(name)
    addPrice(price)
    addDesciption(description)
    addColors(colors)
    
    
    
    
    
    
}


function addImg(imageUrl, altTxt){
    const item = document.querySelector(".item__img")
    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = altTxt
    item.appendChild(img)
    
    
}
function addtiTle(name){
    const title = document.querySelector("h1")
    title.textContent = name
    
}
function addDesciption(description){
    const p = document.getElementById("description")
    p.textContent = description
    
}
function addPrice(price){
    const span =document.querySelector("span")
    span.textContent = price
    
}
function addColors(colors)
{const s = document.querySelector("select")
const option1 = new Option(colors[0] , colors[0])
s[s.length] = option1
const option2 = new Option(colors[1] , colors[1])
s[s.length] = option2
const option3 = new Option(colors[2] , colors[2])
s[s.length] = option3}