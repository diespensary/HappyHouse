package com.example.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long orderItemId;
    private Long productId;
    private Integer count;
    private BigDecimal price;
}
