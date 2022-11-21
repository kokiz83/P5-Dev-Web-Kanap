// Récupération de numero de commande dans l'URL
const orderId = new URL(window.location.href).searchParams.get("orderId")
const id = new URL(window.location.href).searchParams.get("id")
//Affichage le numero de commande
let numberOrder = document.getElementById("orderId")
numberOrder.innerHTML = orderId


