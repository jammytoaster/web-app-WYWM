package com.webApp.webapp.controllers;

import com.webApp.webapp.models.Product;
import com.webApp.webapp.repositories.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    // Lists all products
    @GetMapping
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    // Gets the products of an input ID
    @GetMapping
    @RequestMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return productRepository.getOne(id);
    }

    // Created a new product
    @PostMapping
    public Product createProduct(@RequestBody final Product product){
        return productRepository.saveAndFlush(product);
    }

    // Deletes the product with the input ID
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    // Updates the product with the input ID
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product existingProduct = productRepository.getOne(id);
        // Copies desired properties over and ignores certain ones such as the ID which will always be the same
        BeanUtils.copyProperties(product, existingProduct, "product_id");
        return productRepository.saveAndFlush(existingProduct);
    }
}
