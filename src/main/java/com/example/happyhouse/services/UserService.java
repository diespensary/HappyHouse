package com.example.happyhouse.services;

import com.example.happyhouse.dto.PasswordChangeDto;
import com.example.happyhouse.dto.UserUpdateDto;
import com.example.happyhouse.models.Cart;
import com.example.happyhouse.models.User;
import com.example.happyhouse.repositories.CartRepository;
import com.example.happyhouse.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public User registerUser(User user) {
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
    public User updateUserProfile(Long userId, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        if (userUpdateDto.getFirstName() != null) {
            user.setFirstName(userUpdateDto.getFirstName());
        }
        if (userUpdateDto.getLastName() != null) {
            user.setLastName(userUpdateDto.getLastName());
        }
        if (userUpdateDto.getPhoneNumber() != null) {
            user.setPhoneNumber(userUpdateDto.getPhoneNumber());
        }
        if (userUpdateDto.getAddress() != null) {
            user.setAddress(userUpdateDto.getAddress());
        }

        return userRepository.save(user);
    }

    @Transactional
    public void changePassword(Long userId, PasswordChangeDto passwordDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        // Проверяем, что старый пароль корректен
        if (!passwordEncoder.matches(passwordDto.getOldPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Старый пароль указан неверно");
        }

        /*// Проверяем совпадение нового пароля с подтверждением
        if (!passwordDto.getNewPassword().equals(passwordDto.getConfirmPassword())) {
            throw new IllegalArgumentException("Новый пароль и подтверждение не совпадают");
        }*/

        // Шифруем и сохраняем новый пароль
        user.setPasswordHash(passwordEncoder.encode(passwordDto.getNewPassword()));
        userRepository.save(user);
    }
}
