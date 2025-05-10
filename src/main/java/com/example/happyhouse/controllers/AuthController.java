package com.example.happyhouse.controllers;

import com.example.happyhouse.dto.*;
import com.example.happyhouse.models.RefreshToken;
import com.example.happyhouse.models.User;
import com.example.happyhouse.security.CustomUserDetails;
import com.example.happyhouse.security.JwtUtil;
import com.example.happyhouse.services.RefreshTokenService;
import com.example.happyhouse.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/happyhouse/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserRegistrationDto registrationDto) {
        User user = new User();
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setEmail(registrationDto.getEmail());
        // Шифруем пароль с помощью BCrypt
        user.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setAddress(registrationDto.getAddress());

        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(DtoConverter.convertUserToDto(registeredUser));
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody UserRegistrationDto loginRequest) {
//        UsernamePasswordAuthenticationToken authToken =
//                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
//        Authentication authentication = authenticationManager.authenticate(authToken);
//
//        if (authentication.isAuthenticated()) {
//            // Приводим authentication.getPrincipal() к вашему типу CustomUserDetails
//            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
//            // Генерация JWT-токена с использованием CustomUserDetails
//            String token = jwtUtil.generateToken(userDetails);
//            return ResponseEntity.ok(Map.of(
//                    "accessToken", token,
//                    "userId", userDetails.getId(),
//                    "firstName", userDetails.getUsername()
//            ));
//        }
//        return ResponseEntity.status(401).body("Invalid credentials");
//    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRegistrationDto loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String accessToken = jwtUtil.generateAccessToken(userDetails);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getUser());

        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken.getToken()/*,
//                "userId", userDetails.getId(),
//                "firstName", userDetails.getUser().getFirstName()*/
        ));
    }

//    @PostMapping("/refresh")
//    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
//        String refreshToken = request.get("refreshToken");
//
//        return refreshTokenService.findByToken(refreshToken)
//                .map(refreshTokenService::verifyExpiration)
//                .map(token -> {
//                    User user = token.getUser();
//                    String newAccessToken = jwtUtil.generateAccessToken(new CustomUserDetails(user));
//                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);
//
//                    return ResponseEntity.ok(Map.of(
//                            "accessToken", newAccessToken,
//                            "refreshToken", newRefreshToken.getToken()
//                    ));
//                })
//                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
//    }
    
    @PostMapping("/refresh")
    @Transactional
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequestDto request) {
        String refreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(refreshToken)
                .map(token -> {
                    // Проверяем срок действия
                    refreshTokenService.verifyExpiration(token);

                    // Получаем пользователя из токена
                    User user = token.getUser();

                    // Отзываем старый токен И ВСЕ ДРУГИЕ токены этого пользователя
                    refreshTokenService.revokeAllUserTokens(user.getUserId());

                    // Генерируем новые токены
                    String newAccessToken = jwtUtil.generateAccessToken(new CustomUserDetails(user));
                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user);

                    return ResponseEntity.ok(new TokenRefreshResponseDto(
                            newAccessToken,
                            newRefreshToken.getToken()
                    ));
                })
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
    }
}
