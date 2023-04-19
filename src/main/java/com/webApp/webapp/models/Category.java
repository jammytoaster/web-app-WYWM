package com.webApp.webapp.models;

import jakarta.persistence.*;

import java.util.List;

@Entity(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer category_id;
    private Integer category_name;

    @ManyToMany(mappedBy = "categories")
    private List<Product> products;

    public Category() {
    }

    public Integer getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public Integer getCategory_name() {
        return category_name;
    }

    public void setCategory_name(Integer category_name) {
        this.category_name = category_name;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
