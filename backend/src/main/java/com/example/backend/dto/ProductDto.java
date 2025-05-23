package com.example.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long productId;
    private Long categoryId;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
}
