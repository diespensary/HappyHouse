package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.time.Instant;

@Data
@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Instant expiryDate;

    public User getUser() {
        return user;
    }

    public Instant getExpiryDate() {
        return expiryDate;
    }

}