const orderUrl = new URL(window.location.href).searchParams.get("orderId")
let numberOrder = document.getElementById("orderId")
numberOrder.innerHTML = orderUrl