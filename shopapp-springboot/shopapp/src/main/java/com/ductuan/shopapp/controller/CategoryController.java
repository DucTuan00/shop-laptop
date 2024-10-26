package com.ductuan.shopapp.controller;

import com.ductuan.shopapp.component.LocalizationUtil;
import com.ductuan.shopapp.dto.CategoryDTO;
import com.ductuan.shopapp.model.Category;
import com.ductuan.shopapp.response.CategoryResponse;
import com.ductuan.shopapp.service.CategoryService;
import com.ductuan.shopapp.util.MessageKeys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.LocaleResolver;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("${api.prefix}/categories")
//@Validated
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final LocalizationUtil localizationUtil;

    //Show all categories
    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ) {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryDTO categoryDTO, BindingResult result) {
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(CategoryResponse.builder()
                            .message(localizationUtil.getLocalizedMessage(MessageKeys.CREATE_CATEGORY_FAILED))
                            .errors(errorMessages)
                    .build());
        }
        Category category = categoryService.createCategory(categoryDTO);
        return ResponseEntity.ok(CategoryResponse.builder()
                        .message(localizationUtil.getLocalizedMessage(MessageKeys.CREATE_CATEGORY_SUCCESSFULLY))
                        .category(category)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(@PathVariable Long id,
                                                           @Valid @RequestBody CategoryDTO categoryDTO,
                                                           HttpServletRequest request) {
        categoryService.updateCategory(id, categoryDTO);
        return ResponseEntity.ok(CategoryResponse.builder()
                        .message(localizationUtil.getLocalizedMessage(MessageKeys.UPDATE_CATEGORY_SUCCESSFULLY))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(localizationUtil.getLocalizedMessage(MessageKeys.DELETE_CATEGORY_SUCCESSFULLY, id));
    }
}
