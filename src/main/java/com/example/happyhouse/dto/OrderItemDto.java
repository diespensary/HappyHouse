package com.example.happyhouse.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long orderItemId;
    private Long productId;
    private Integer count;
    private BigDecimal price;
}
