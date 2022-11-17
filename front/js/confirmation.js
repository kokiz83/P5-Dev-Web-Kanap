const orderId = new URL(window.location.href).searchParams.get("orderId")
const id = new URL(window.location.href).searchParams.get("id")
let numberOrder = document.getElementById("orderId")
numberOrder.innerHTML = orderId