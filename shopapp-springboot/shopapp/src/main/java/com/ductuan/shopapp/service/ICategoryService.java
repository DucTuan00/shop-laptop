package com.ductuan.shopapp.service;

import com.ductuan.shopapp.dto.CategoryDTO;
import com.ductuan.shopapp.model.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(CategoryDTO categoryDTO);
    Category getCategoryById(long id);
    List<Category> getAllCategories();
    Category updateCategory(long id, CategoryDTO categoryDTO);
    void deleteCategory(long id);
}
