//Affichage du numéro du commande
function main() {
    const idNode = document.getElementById("orderId");
    const order = JSON.parse(localStorage.getItem("commande"));
    const orderId = order.orderId
    idNode.innerText = orderId

    localStorage.clear();

}
main()