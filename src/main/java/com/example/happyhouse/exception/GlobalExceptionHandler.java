package com.example.happyhouse.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Ловим ExpiredJwtException, которое выбрасывается JJWT при проверке просроченного access-токена.
     * Возвращаем 401 и понятный JSON.
     */
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Map<String, String>> handleExpiredJwt(ExpiredJwtException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Access token expired"));
    }

    /**
     * Ловим RuntimeException из refresh-логики:
     * - сообщение "Refresh token expired" → 401
     * - сообщение "Invalid refresh token" → 401
     * Остальные RuntimeException (при желании) могут идти как 400 Bad Request.
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRefreshErrors(RuntimeException ex) {
        String msg = ex.getMessage();
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if ("Refresh token expired".equals(msg) || "Invalid refresh token".equals(msg)) {
            status = HttpStatus.UNAUTHORIZED;
        }
        return ResponseEntity
                .status(status)
                .body(Map.of("error", msg));
    }
}
