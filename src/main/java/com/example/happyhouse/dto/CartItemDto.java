package com.example.happyhouse.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long cartItemId;
    private Long productId;
    private Integer count;
}
