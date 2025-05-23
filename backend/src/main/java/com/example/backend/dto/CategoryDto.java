package com.example.backend.dto;

import lombok.Data;

@Data
public class CategoryDto {
    private Long categoryId;
    private String type;
    private String description;
}
