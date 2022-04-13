const start = async() => {
    const fetchProductById = async(id) => {
        const call = await fetch(`http://localhost:3000/api/products/${id}`);
        return call.json();
    }

    const productId = window.location.search.replace("?id=", "");
    const product = await fetchProductById(productId);

    const addToPanier = (product) => {
        const color = document.querySelector('#colors').value;
        const quantity = Number(document.querySelector('#quantity').value);
        if (!quantity) {
            alert("Merci d'indiquer la quantité souhaitée");
            return;
        }

        const item = {
            ...product,
            color,
            quantity,
        };

        service.addToPanier(item);
        alert("Article ajouté au panier");
    };

    document.title = product.name;
    document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    document.getElementById("colors").innerHTML = product.colors.map(color => `<option value="${color}">${color}</option>`).join('');
    service.initPanier();
    document.querySelector('#addToCart').addEventListener('click', () => addToPanier(product));
}

start();