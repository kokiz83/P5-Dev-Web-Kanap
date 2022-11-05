

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))



function addProducts(data) {
    // const _id = data[0]._id
    //const imageUrl = data[0].imageUrl
    // const altTxt = data[0].altTxt
    //const name =data[0].name
    // const description = data[0].


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


function addImg(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


function addTitele(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
}


function addDesciption(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")

    return p
}



