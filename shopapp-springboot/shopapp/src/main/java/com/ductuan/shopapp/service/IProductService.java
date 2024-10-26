package com.ductuan.shopapp.service;

import com.ductuan.shopapp.dto.ProductDTO;
import com.ductuan.shopapp.dto.ProductImageDTO;
import com.ductuan.shopapp.exception.DataNotFoundException;
import com.ductuan.shopapp.model.Product;
import com.ductuan.shopapp.model.ProductImage;
import com.ductuan.shopapp.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    Product createProduct(ProductDTO productDTO) throws DataNotFoundException;
    Product getProductById(long id) throws Exception;
    Page<ProductResponse> getAllProducts(String keyword, Long categoryId, PageRequest pageRequest);
    Product updateProduct(long id, ProductDTO productDTO) throws Exception;
    void deleteProduct(long id);
    boolean existsByName(String name);
    ProductImage createProductImage(Long productId, ProductImageDTO productImageDTO) throws Exception;
    List<Product> findProductsByIds(List<Long> productIds);
}
