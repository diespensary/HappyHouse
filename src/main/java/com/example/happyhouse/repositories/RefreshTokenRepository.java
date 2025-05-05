package com.example.happyhouse.repositories;

import com.example.happyhouse.models.RefreshToken;
import com.example.happyhouse.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);
    void deleteByUser(User user);
}