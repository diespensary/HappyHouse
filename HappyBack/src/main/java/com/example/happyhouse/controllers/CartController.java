package com.example.happyhouse.controllers;

import com.example.happyhouse.dto.CartDto;
import com.example.happyhouse.dto.DtoConverter;
import com.example.happyhouse.models.Cart;
import com.example.happyhouse.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable("userId") Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartDto> addProductToCart(@PathVariable("userId") Long userId,
                                                    @RequestParam("productId") Long productId,
                                                    @RequestParam("count") int count) {
        Cart cart = cartService.addProductToCart(userId, productId, count);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartDto> updateCartItemCount(@PathVariable("cartItemId") Long cartItemId,
                                                       @RequestParam("count") int newCount) {
        Cart cart = cartService.updateCartItemCount(cartItemId, newCount);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<CartDto> removeProductFromCart(@PathVariable("cartItemId") Long cartItemId) {
        Cart cart = cartService.removeProductFromCart(cartItemId);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }
}
