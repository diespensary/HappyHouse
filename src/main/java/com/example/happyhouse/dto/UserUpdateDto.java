package com.example.happyhouse.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
}
