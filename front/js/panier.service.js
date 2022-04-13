var service = {
    getPanier: () => {
        return localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];
    },

    initPanier: () => {
        const initValue = service.getPanier();
        localStorage.setItem('panier', JSON.stringify(initValue));
    },

    addToPanier: (product) => {

        const item = {
            ...product,
        };

        const panier = service.getPanier();
        const existingSameColor = panier.find(p => p.productId === item.productId && p.color === item.color);
        const newItem = {
            ...item,
            quantity: (existingSameColor ? existingSameColor.quantity : 0) + item.quantity,
        };

        const nouveauPanier = [...panier.filter(p => p.productId !== item.productId || p.color !== item.color), newItem];
        localStorage.setItem('panier', JSON.stringify(nouveauPanier));
    },

    deleteItem: (item) => {
        const items = service.getPanier().filter(p => p.productId !== item.productId || p.color !== item.color);
        localStorage.setItem('panier', JSON.stringify(items));
        return items;
    },

    update: (item) => {
        const items = service.getPanier().map(p => {
            if (p.productId === item.productId && p.color === item.color) {
                return {...p, quantity: item.quantity };
            }
            return p;
        });
        localStorage.setItem('panier', JSON.stringify(items));
        return items;
    }

}

service.initPanier();