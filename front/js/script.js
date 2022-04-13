const start = async() => {
    async function fetchProducts() {
        const call = await fetch("https://api-kanap-eu.herokuapp.com/api/products");
        return call.json();
    }

    const products = await fetchProducts();
    const items = document.getElementById("items");
    products.map(product => {
        const a = document.createElement("a");
        const article = document.createElement("article");
        const img = document.createElement("img");
        const h3 = document.createElement("h3");
        const p = document.createElement("p");

        items.appendChild(a);
        a.appendChild(article);
        article.append(img, h3, p);

        a.href = `./product.html?id=${product._id}`;
        img.alt = product.altTxt;
        img.src = product.imageUrl;
        h3.classList.add("productName");
        h3.textContent = product.name;
        p.classList.add("productDescription");
        p.textContent = product.description;
    });
};
start();