


function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product_card");

    const image = document.createElement("img");
    image.classList.add("product_image");
    image.src = product.product_image;
    image.alt = "Image is: " + product.product_name;
    card.appendChild(image);

    const name = document.createElement("h3");
    name.textContext = product.product_name;
    card.appendChild(name);

    const price = document.createElement("p");
    price.textContext = "$\${product.product_price}";
    card.appendChild(price);

    return card;
}

function displayProducts(products) {

    const productList = document.getElementById("product_list");
    products.forEach((product) => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
    });
}

fetch("/api/products").then((response) => {
    if (!response.ok) {
        throw new Error("Could not make network response");
    }
    return response.json();
    })
    .then((products) => {
        displayProducts(products);
    })
    .catch((error) => {
        console.error("There was an issue when trying to fetch API: ", error);
    });
