package com.webApp.webapp.controllers;

import com.webApp.webapp.models.Product;
import com.webApp.webapp.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> listAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping
    @RequestMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return productRepository.getOne(id);
    }

    @PostMapping

    public Product createProduct(@RequestBody final Product product){
        return productRepository.saveAndFlush(product);
    }

}
