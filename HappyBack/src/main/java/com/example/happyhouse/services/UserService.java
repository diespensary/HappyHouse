package com.example.happyhouse.services;

import com.example.happyhouse.models.Cart;
import com.example.happyhouse.models.User;
import com.example.happyhouse.repositories.CartRepository;
import com.example.happyhouse.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    @Transactional
    public User registerUser(User user) {
        // Можно добавить проверки (уникальность email, хеширование пароля и т.п.)
        user.setCreatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);

        Cart cart = new Cart();
        cart.setUser(savedUser);
        cartRepository.save(cart);

        return savedUser;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    @Transactional
    public User updateUserProfile(User user) {
        return userRepository.save(user);
    }
}
