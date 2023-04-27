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

    // Lists all categories
    @GetMapping
    public List<Category> listAllCategories(){
        return categoryRepository.findAll();
    }

    // Gets the category with the input ID
    @GetMapping
    @RequestMapping("/{id}")
    public Category getCategory(@PathVariable Long id) {
        return categoryRepository.getOne(id);
    }

    // Creates a new category
    @PostMapping
    public Category createCategory(@RequestBody final Category category) {
        return categoryRepository.saveAndFlush(category);
    }

    // Deletes the category with the input ID
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
    }

    // Updated the category with the input ID
    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category existingCategory = categoryRepository.getOne(id);
        // Copies desired properties over and ignores certain ones such as the ID which will always be the same
        BeanUtils.copyProperties(category, existingCategory, "category_id");
        return categoryRepository.saveAndFlush(existingCategory);
    }


}
