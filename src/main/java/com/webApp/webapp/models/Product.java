package com.webApp.webapp.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

import java.util.List;

@Entity(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;
    private Integer product_category_id;
    private String product_name;
    private double product_price;
    private Integer product_quantity;
    private Integer product_sold;

    @Lob
//    @Type(type="org.hibernate.type.BinaryType")
    private byte[] product_image;

    //Defines relationship between products and categories
    @ManyToMany
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Category> categories;

    public Product() {
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Integer getProduct_category_id() {
        return product_category_id;
    }

    public void setProduct_category_id(Integer product_category_id) {
        this.product_category_id = product_category_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public double getProduct_price() {
        return product_price;
    }

    public void setProduct_price(double product_price) {
        this.product_price = product_price;
    }

    public Integer getProduct_quantity() {
        return product_quantity;
    }

    public void setProduct_quantity(Integer product_quantity) {
        this.product_quantity = product_quantity;
    }

    public Integer getProduct_sold() {
        return product_sold;
    }

    public void setProduct_sold(Integer product_sold) {
        this.product_sold = product_sold;
    }

    public byte[] getProduct_image() {
        return product_image;
    }

    public void setProduct_image(byte[] product_image) {
        this.product_image = product_image;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
