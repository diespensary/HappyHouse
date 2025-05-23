package com.example.backend.controllers;

import com.example.backend.dto.CategoryDto;
import com.example.backend.dto.DtoConverter;
import com.example.backend.dto.ProductDto;
import com.example.backend.models.Product;
import com.example.backend.services.CategoryService;
import com.example.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/happyhouse")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> productDtos = productService.getAllProducts().stream()
                .map(DtoConverter::convertProductToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable("id") Long productId) {
        Optional<Product> productOpt = productService.getProductById(productId);
        return productOpt.map(product -> ResponseEntity.ok(DtoConverter.convertProductToDto(product)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categoryDtos = categoryService.getAllCategories().stream()
                .map(DtoConverter::convertCategoryToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(categoryDtos);
    }

    @GetMapping("/categories/{id}/products")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable("id") Long categoryId) {
        List<ProductDto> productDtos = productService.getProductsByCategory(categoryId).stream()
                .map(DtoConverter::convertProductToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(productDtos);
    }
}
