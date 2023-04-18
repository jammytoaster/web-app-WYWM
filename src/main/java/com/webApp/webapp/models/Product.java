package com.webApp.webapp.models;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;

@Entity(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;
    private String product_name;
    private double product_price;
    private Integer product_quantity;
    private Integer product_sold;

    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    private byte[] product_image;


    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
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

    public Product(){

    }
}
