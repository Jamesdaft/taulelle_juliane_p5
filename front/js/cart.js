// stockage du panier dans une variable 
const produitLocalStorage = service.getPanier();

const positionEmptyCart = document.querySelector("#cart__items");


function getCart() {
    //Affichage si le panier est vide 
    if (!produitLocalStorage || !produitLocalStorage.length) {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
        return;
    }
    //Affichage des produits 
    produitLocalStorage.map(produit => {
        const productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', produit._id);


        const productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";


        const productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = produit.imageUrl;
        productImg.alt = produit.altTxt


        const productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";


        const productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";


        const productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = produit.name;


        const productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = produit.color;
        productColor.style.fontSize = "20px";


        const productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = produit.price + " €";


        const productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";


        const productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";


        const productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";


        const productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = produit.quantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        //Modification de la quantité 
        productQuantity.addEventListener('change', evnt => {
            const quantity = evnt.target.value;
            const product = {...produit, quantity };
            service.update(product);
            alert("Quantité mise à jour")
            location.reload();
        });

        //Suppression du produit
        const productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";


        const productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";

        productSupprimer.addEventListener('click', () => {
            service.deleteItem(produit);
            alert("Article suprimé");
            location.reload();
        });
    });
}
getCart();

//Fonction pour le calcul du total des produits
function getTotals() {


    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length,
        totalQtt = 0;

    for (let i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);


    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

//Fonction pour la valisation du fotmulaire de contact et la récupération des données dans le localstorage 
async function submit() {
    var formValues = Array.from(document.querySelectorAll('form input')).map(el => ({
        [el.name]: el.value
    }));

    const contact = Object.assign({}, ...formValues);
    const value = {
        contact,
        products: service.getPanier(),
    };

    const firstNameHasError = !contact.firstName.trim();
    const lastNameHasError = !contact.lastName.trim();
    const addressHasError = !contact.address.trim();
    const cityHasError = !contact.city.trim();
    const emailHasError = !contact.email.trim();
    document.querySelector('#firstNameErrorMsg').innerHTML = firstNameHasError ? "Le champs est obligatoire" : "";
    document.querySelector('#lastNameErrorMsg').innerHTML = lastNameHasError ? "Le champs est obligatoire" : "";
    document.querySelector('#addressErrorMsg').innerHTML = addressHasError ? "Le champs est obligatoire" : "";
    document.querySelector('#cityErrorMsg').innerHTML = cityHasError ? "Le champs est obligatoire" : "";
    document.querySelector('#emailErrorMsg').innerHTML = emailHasError ? "Le champs est obligatoire" : "";

    if (firstNameHasError || lastNameHasError || addressHasError || cityHasError || emailHasError) {
        return;
    }
    const rawResponse = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    });
    const status = rawResponse.status;
    if (status === 201) {
        localStorage.setItem('commande', JSON.stringify(await rawResponse.json()));
        service.clear();
        document.location.href = '../html/confirmation.html';
    }
}
document.querySelector('#order').addEventListener('click', () => {
    submit();
})