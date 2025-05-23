package com.example.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class CartDto {
    private Long cartId;
    private Long userId;
    private List<CartItemDto> cartItems;
}
