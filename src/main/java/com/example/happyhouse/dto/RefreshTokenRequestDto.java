package com.example.happyhouse.dto;

import lombok.Data;

@Data
public class RefreshTokenRequestDto {
    private Long userId;
    private String refreshToken;
}
