// Add products to main table
function addProductTable(product, tableName) {
    const table = tableName;

    // Adds row as last row
    const row = table.insertRow(-1);

    // Adds the "low_stock" class to the row if there are less than 6 items in stock
    row.className = product.product_quantity < 6 ? "low_stock" : "";

    // Inserts cells to the row
    const id = row.insertCell(0);
    const name = row.insertCell(1);
    const price = row.insertCell(2);
    const quantity = row.insertCell(3);
    const sold = row.insertCell(4);
    const imageCell = row.insertCell(5);

    // Adds values to the table rows
    id.textContent = product.product_id;
    name.textContent =  product.product_name;
    price.textContent = product.product_price;
    quantity.textContent = product.product_quantity;
    sold.textContent = product.product_sold;

    // Adds image to table, including source and image size
    const image = document.createElement("img");
    image.src = product.product_image;
    image.width = 74;
    image.height = 74;
    imageCell.appendChild(image);
}

// Gets products from database
fetch("/api/products").then((response) => {
    if (!response.ok) {
        throw new Error("Could not make network response");
    }
    return response.json();
    })

    // Goes through each row in the database and adds it to the HTML table
    .then((products) => {
        products.forEach((product) => {
            addProductTable(product, document.getElementById("product_table"));
        });
    })
    .catch((error) => {
        console.error("There was an issue when trying to fetch API: ", error);
    });


// Create Item method

async function checkCategory(category_name) {
    try {

        // Gets categories from category database
        const response = await fetch("/api/categories");
        if (!response.ok) {
            throw new Error("Could not make network response");
        }
        const categories = await response.json();

        // Searches the database Array to see if the category name input by the user is present in the database
        let existingCategory = categories.find((category) => category.category_name === category_name);

        // If the category name is present in the database, add the categories ID to the product_category_id input
        if (existingCategory) {
            document.getElementById("product_category_id").value = existingCategory.category_id;
        }

        // If the category name is not present in the database, add the category name to newCategory
        else {
            const newCategory = { category_name: category_name };

            // Fetch categories and adds the newCategory to the database
            const addCategoryResponse = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(newCategory),
            });

            if (!addCategoryResponse.ok) {
                throw new Error("Unable to save new category");
            }

            const addedCategory = await addCategoryResponse.json();
            document.getElementById("product_category_id").value = addedCategory.category_id;
        }
    }
    catch (error) {
        console.error("There was an issue when trying to fetch API: ", error);
    }
}

// Create button
document.getElementById("create_prod").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Adds the category_name to the checkCategory function
    const category_name = document.getElementById("category_name").value;
    await checkCategory(category_name);

    // Gets the product_category_id and turns it to an integer
    const productCategoryVal = parseInt(document.getElementById("product_category_id").value);

    // Adds the input items to the database
    const prod = {
        category: {
            category_id: productCategoryVal,
            category_name: category_name,
        },
        product_name: document.getElementById("product_name").value,
        product_price: parseFloat(document.getElementById("product_price").value),
        product_quantity: parseInt(document.getElementById("product_quantity").value),
        product_sold: parseInt(document.getElementById("product_sold").value),
        product_image: document.getElementById("product_image").value,
    };

    console.log(prod)

    // Fetches the products database and adds the items to it
    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(prod),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Unable to save data");
        }
        return response.json();
    })

    // Adds the new product to the addProductTable function to add row to the table, then resets the fields
    .then((saveProduct) => {
        addProductTable(saveProduct, document.getElementById("tbody"));
        document.getElementById("create_prod").reset();
    })
    .catch((error) => {
        console.error("There was an error when trying to save product");
    });
});


// Delete item Method
document.getElementById("delete_prod").addEventListener("submit", async (e) => {
    e.preventDefault();
        try {

            const ID = parseInt(document.getElementById("delete_id").value);

            // Deletes the product
            const response = await fetch(`/api/products/${ID}`, {
                method:"DELETE",
                headers:{
                    "Content-Type" : "application/json",
                },
            });

            if (response.ok) {
                console.log("Product deleted");
                document.getElementById("delete_prod").reset();

                try {
                    // Gets the categories database
                    const categoryResponse = await fetch("/api/categories");
                    if (categoryResponse.ok) {
                        const categories = await categoryResponse.json();

                        // Looks through each category in the categories database and checks the length of them
                        categories.forEach((category) => {
                            if (category.products.length === 0) {
                                const CatID =  parseInt(category.category_id);

                                // If the categories length is equal to 0 delete the category
                                const deleteCategoryResponse = fetch(`/api/categories/${CatID}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                        }
                    });
                }
            }
            catch (error){
                console.error("Error deleting category", error)
            }
        }
    }
    catch (error) {
        console.error("Error deleting product" + delete_id, error);
    }
    // Runs updateTable function to update table
    await updateTable();
});


// Update item get ID method

document.getElementById("update_prod").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Fetches the row with the users input ID
    try {
        const ID = parseInt(document.getElementById("update_id").value);
        const findItem = await fetch(`/api/products/${ID}`);

        // If found product is added to update_prod_input table
        if (findItem.ok) {
            const product = await findItem.json();

            addProductTable(product, document.getElementById("update_product_table"));

            // Runs show input method to make hidden inputs, labels, and buttons visible and required
            showInputs();
        }
    }
    catch (error) {
        document.getElementById("update_prod").reset();
        document.getElementById("update_id").placeholder = "Id not found";
        console.log("Unable to find ID", error);
    }
});


// Update item update method

document.getElementById("update_prod_input").addEventListener("submit", async (e) => {
    e.preventDefault();

    const ID = parseInt(document.getElementById("update_id").value);

    // Gets the categories name and runs the checkCategory function, finding an existing category or creating a new one
    update_category_name = document.getElementById("update_category_name").value;
    await checkCategory(update_category_name);

    // Gets category id produced by the checkCategory function
    const productCategoryVal = parseInt(document.getElementById("product_category_id").value);

    // Gets input information and adds it to variable
    const updatedProduct = {
        category: {
            category_id: productCategoryVal,
            category_name: update_category_name,
        },
        product_name: document.getElementById("update_product_name").value,
        product_price: document.getElementById("update_product_price").value,
        product_quantity: document.getElementById("update_product_quantity").value,
        product_sold: document.getElementById("update_product_sold").value,
        product_image: document.getElementById("update_product_image").value,
    };

    try {
        // Updates the product with the users data
        const response = await fetch(`/api/products/${ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            console.log("Product updated");

            // Empties forms input values
            document.getElementById("update_prod").reset();
            document.getElementById("update_prod_input").reset();
            document.getElementById("create_prod").reset();

            // Empties update table
            const table = document.getElementById("update_product_table");
            table.innerHTML = "";

            // Runs hide input function, hiding the unhidden values
            hideInputs();

            // Refreshes the main table
            await updateTable();
        }
    }
    catch (error) {
        console.log("Could not fetch item", error);
    }
});

// Show inputs function

function showInputs() {
    document.getElementById("update_product_table").style.visibility = "visible";

    document.getElementById("update_category_name_label").style.visibility = "visible";
    document.getElementById("update_category_name").style.visibility = "visible";
    document.getElementById("update_category_name").required = true;

    document.getElementById("update_product_name_label").style.visibility = "visible";
    document.getElementById("update_product_name").style.visibility = "visible";
    document.getElementById("update_product_name").required = true;

    document.getElementById("update_product_price_label").style.visibility = "visible";
    document.getElementById("update_product_price").style.visibility = "visible";
    document.getElementById("update_product_price").required = true;

    document.getElementById("update_product_quantity_label").style.visibility = "visible";
    document.getElementById("update_product_quantity").style.visibility = "visible";
    document.getElementById("update_product_quantity").required = true;

    document.getElementById("update_product_sold_label").style.visibility = "visible";
    document.getElementById("update_product_sold").style.visibility = "visible";
    document.getElementById("update_product_sold").required = true;

    document.getElementById("update_product_image_label").style.visibility = "visible";
    document.getElementById("update_product_image").style.visibility = "visible";
    document.getElementById("update_item").style.visibility = "visible";
}


// Hide inputs function
function hideInputs() {
    document.getElementById("update_product_table").style.visibility = "hidden";

    document.getElementById("update_category_name_label").style.visibility = "hidden";
    document.getElementById("update_category_name").style.visibility = "hidden";
    document.getElementById("update_category_name").required = false;

    document.getElementById("update_product_name_label").style.visibility = "hidden";
    document.getElementById("update_product_name").style.visibility = "hidden";
    document.getElementById("update_product_name").required = false;

    document.getElementById("update_product_price_label").style.visibility = "hidden";
    document.getElementById("update_product_price").style.visibility = "hidden";
    document.getElementById("update_product_price").required = false;

    document.getElementById("update_product_quantity_label").style.visibility = "hidden";
    document.getElementById("update_product_quantity").style.visibility = "hidden";
    document.getElementById("update_product_quantity").required = false;

    document.getElementById("update_product_sold_label").style.visibility = "hidden";
    document.getElementById("update_product_sold").style.visibility = "hidden";
    document.getElementById("update_product_sold").required = false;

    document.getElementById("update_product_image_label").style.visibility = "hidden";
    document.getElementById("update_product_image").style.visibility = "hidden";
    document.getElementById("update_item").style.visibility = "hidden";
}

// Table update function
async function updateTable() {

    // Gets table body and clears it
    const table = document.getElementById("tbody");
    table.innerHTML = "";

    // Fetches products from database
    fetch("/api/products").then((response) => {
        if (!response.ok) {
            throw new Error("Could not make network response");
        }
        return response.json();
    })

    // Goes through each row in the database and adds it to the HTML table using the addProductTable function
    .then((products) => {
        products.forEach((product) => {
            addProductTable(product, document.getElementById("tbody"));
        });
    })
    .catch((error) => {
        console.error("There was an issue when trying to fetch API: ", error);
    });
}


// Find item by category method
document.getElementById("category_find_prod").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clears the category table
    document.getElementById("category_tbody").innerHTML = "";

    // Hides the category table
    document.getElementById("category_table").style.visibility = "hidden"

    // Gets the input category ID
    const ID = document.getElementById("category_id").value;

    try {

        // Fetches the ID of the category and returns that information
        const categoryResponse = await fetch(`/api/categories/${ID}`);
        if (categoryResponse.ok) {
            const categories = await categoryResponse.json();

            // Makes the table visible
            document.getElementById("category_table").style.visibility = "visible"

            // For each category in the category table put that category in the addProductTable function
            categories.products.forEach((product) => {
                addProductTable(product, document.getElementById("category_tbody"))
            });
        }
    }
    catch (error) {
        console.log("Error when fetching categories database", error)
    }
});