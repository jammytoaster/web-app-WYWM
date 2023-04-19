package com.webApp.webapp.controllers;

import com.webApp.webapp.models.Category;
import com.webApp.webapp.repositories.CategoryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> listAllCategories(){
        return categoryRepository.findAll();
    }

    @GetMapping
    @RequestMapping("/{id}")
    public Category getCategory(@PathVariable Long id) {
        return categoryRepository.getOne(id);
    }

    @PostMapping
    public Category createCategory(@RequestBody final Category category) {
        return categoryRepository.saveAndFlush(category);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category existingCategory = categoryRepository.getOne(id);
        BeanUtils.copyProperties(category, existingCategory, "category_id");
        return categoryRepository.saveAndFlush(existingCategory);
    }

}
