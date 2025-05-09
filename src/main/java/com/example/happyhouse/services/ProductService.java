package com.example.happyhouse.services;

import com.example.happyhouse.models.Category;
import com.example.happyhouse.models.Product;
import com.example.happyhouse.repositories.CategoryRepository;
import com.example.happyhouse.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        Optional<Category> categoryOpt = categoryRepository.findById(categoryId);
        return categoryOpt.map(Category::getProducts).orElse(List.of());
    }
}
