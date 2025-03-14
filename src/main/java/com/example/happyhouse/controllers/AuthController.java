package com.example.happyhouse.controllers;

import com.example.happyhouse.dto.DtoConverter;
import com.example.happyhouse.dto.UserDto;
import com.example.happyhouse.dto.UserRegistrationDto;
import com.example.happyhouse.models.User;
import com.example.happyhouse.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserRegistrationDto registrationDto) {

        User user = new User();
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setEmail(registrationDto.getEmail());
        // Здесь необходимо добавить хеширование пароля; для демонстрации – напрямую
        user.setPasswordHash(registrationDto.getPassword());
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setAddress(registrationDto.getAddress());

        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(DtoConverter.convertUserToDto(registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRegistrationDto loginRequest) {
        // Заглушка для авторизации.
        return ResponseEntity.ok("Login functionality not implemented yet.");
    }
}
