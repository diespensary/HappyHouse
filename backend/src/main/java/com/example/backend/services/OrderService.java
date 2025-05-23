package com.example.backend.services;

import com.example.backend.models.Cart;
import com.example.backend.models.CartItem;
import com.example.backend.models.Order;
import com.example.backend.models.OrderItem;
import com.example.backend.repositories.CartItemRepository;
import com.example.backend.repositories.CartRepository;
import com.example.backend.repositories.OrderItemRepository;
import com.example.backend.repositories.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Transactional
    public Order createOrder(Long userId) {
        Cart cart = cartRepository.findByUserUserId(userId);
        if (cart == null || cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty for user id: " + userId);
        }

        BigDecimal totalAmount = cart.getCartItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getCount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setTotalAmount(totalAmount);
        order.setCreatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);

        List<CartItem> cartItems = new ArrayList<>(cart.getCartItems());
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setCount(cartItem.getCount());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItemRepository.save(orderItem);
        }

        cartItemRepository.deleteAll(cartItems);
        cart.getCartItems().clear();

        return savedOrder;
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserUserId(userId);
    }
}
