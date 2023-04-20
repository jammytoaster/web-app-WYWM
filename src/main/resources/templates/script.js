const productList = document.getElementById("product_list");

fetch("/api/products")
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            const productElement = document.createElement("article");
            productElement.className = "product";

            const productImage = document.createElement("img");
            productImage.className = "product_image"
            productImage.src = product.product_image;
            productImage.alt = "Product Image: \${product.product_name}";

            const productName = document.createElement("h2");
            productName.textContent = product.product_name;

            const productPrice = document.createElement("p");
            productPrice.textContent = "Price: $\${product.product_price}";

            const productQuantity = document.createElement("p");
            productQuantity.textContent = "Qantity in stock: \${product.product_quantity}";

            const addToCart = document.createElement("button");
            addToCart.className = "add_to_cart_button"
            addToCart.textContent = "Add to Cart";

            productElement.appendChild(productImage);
            productElement.appendChild(productName);
            productElement.appendChild(productPrice);
            productElement.appendChild(productQuantity);
            productElement.appendChild(addToCart)

            productList.appendChild(productElement);

            });
        })
        .catch(error => {
        console.error("Error fetching products from API:", error);
        });
