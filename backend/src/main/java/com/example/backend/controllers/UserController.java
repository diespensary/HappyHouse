package com.example.backend.controllers;

import com.example.backend.dto.DtoConverter;
import com.example.backend.dto.PasswordChangeDto;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserUpdateDto;
import com.example.backend.models.User;
import com.example.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/happyhouse/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    @PreAuthorize("authentication.principal.id == #userId")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable("id") Long userId) {
        Optional<User> userOpt = userService.findById(userId);
        return userOpt.map(user -> ResponseEntity.ok(DtoConverter.convertUserToDto(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("authentication.principal.id == #userId")
    public ResponseEntity<UserDto> updateUserProfile(@PathVariable("id") Long userId,
                                                     @RequestBody UserUpdateDto userUpdateDto) {
        User updatedUser = userService.updateUserProfile(userId, userUpdateDto);
        return ResponseEntity.ok(DtoConverter.convertUserToDto(updatedUser));
    }

    @PutMapping("/{id}/change-password")
    @PreAuthorize("authentication.principal.id == #id")
    public ResponseEntity<?> changePassword(@PathVariable("id") Long id,
                                            @RequestBody PasswordChangeDto passwordChangeDto) {
        userService.changePassword(id, passwordChangeDto);
        return ResponseEntity.ok("Пароль успешно изменён");
    }
}
