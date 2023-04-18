package com.webApp.webapp.repositories;

import com.webApp.webapp.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
