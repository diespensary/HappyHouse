package com.example.backend.controllers;

import com.example.backend.dto.CartDto;
import com.example.backend.dto.DtoConverter;
import com.example.backend.models.Cart;
import com.example.backend.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/happyhouse/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("authentication.principal.id == #userId")
    public CartDto getCart(@PathVariable("userId") Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return DtoConverter.convertCartToDto(cart);
    }

    @PostMapping("/{userId}")
    @PreAuthorize("authentication.principal.id == #userId")
    public ResponseEntity<CartDto> addProductToCart(@PathVariable("userId") Long userId,
                                                    @RequestParam("productId") Long productId,
                                                    @RequestParam("count") int count) {
        Cart cart = cartService.addProductToCart(userId, productId, count);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartDto> updateCartItemCount(@PathVariable("cartItemId") Long cartItemId,
                                                       @RequestParam("count") int newCount) {
        Cart cart = cartService.updateCartItemCount(cartItemId, newCount);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<CartDto> removeProductFromCart(@PathVariable("cartItemId") Long cartItemId) {
        Cart cart = cartService.removeProductFromCart(cartItemId);
        return ResponseEntity.ok(DtoConverter.convertCartToDto(cart));
    }
}
