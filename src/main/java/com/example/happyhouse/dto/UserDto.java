package com.example.happyhouse.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private LocalDateTime createdAt;
}