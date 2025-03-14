package com.example.happyhouse.services;

import com.example.happyhouse.models.Cart;
import com.example.happyhouse.models.CartItem;
import com.example.happyhouse.models.Product;
import com.example.happyhouse.repositories.CartItemRepository;
import com.example.happyhouse.repositories.CartRepository;
import com.example.happyhouse.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserUserId(userId);
    }

    @Transactional
    public Cart addProductToCart(Long userId, Long productId, int count) {
        Cart cart = cartRepository.findByUserUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Cart not found for user id: " + userId);
        }

        Optional<CartItem> existingCartItemOpt = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getProductId().equals(productId))
                .findFirst();

        if (existingCartItemOpt.isPresent()) {
            CartItem cartItem = existingCartItemOpt.get();
            cartItem.setCount(cartItem.getCount() + count);
            cartItemRepository.save(cartItem);
        } else {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setCount(count);
            cart.getCartItems().add(cartItem);
            cartItemRepository.save(cartItem);
        }

        return cart;
    }

    @Transactional
    public Cart updateCartItemCount(Long cartItemId, int newCount) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found with id: " + cartItemId));
        cartItem.setCount(newCount);
        cartItemRepository.save(cartItem);
        return cartItem.getCart();
    }

    @Transactional
    public Cart removeProductFromCart(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found with id: " + cartItemId));
        Cart cart = cartItem.getCart();
        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        return cart;
    }
}
