package com.example.happyhouse.controllers;

import com.example.happyhouse.dto.DtoConverter;
import com.example.happyhouse.dto.UserDto;
import com.example.happyhouse.dto.UserUpdateDto;
import com.example.happyhouse.models.User;
import com.example.happyhouse.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/happyhouse/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable("id") Long userId) {
        Optional<User> userOpt = userService.findById(userId);
        return userOpt.map(user -> ResponseEntity.ok(DtoConverter.convertUserToDto(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUserProfile(@PathVariable("id") Long userId,
                                                     @RequestBody UserUpdateDto userUpdateDto) {
        User updatedUser = userService.updateUserProfile(userId, userUpdateDto);
        return ResponseEntity.ok(DtoConverter.convertUserToDto(updatedUser));
    }
}
