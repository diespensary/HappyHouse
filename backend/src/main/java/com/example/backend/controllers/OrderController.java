package com.example.backend.controllers;

import com.example.backend.dto.DtoConverter;
import com.example.backend.dto.OrderDto;
import com.example.backend.models.Order;
import com.example.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/happyhouse/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/{userId}")
    @PreAuthorize("authentication.principal.id == #userId")
    public ResponseEntity<OrderDto> createOrder(@PathVariable("userId") Long userId) {
        Order order = orderService.createOrder(userId);
        return ResponseEntity.ok(DtoConverter.convertOrderToDto(order));
    }

    @GetMapping("/{userId}")
    @PreAuthorize("authentication.principal.id == #userId")
    public ResponseEntity<List<OrderDto>> getOrdersByUser(@PathVariable("userId") Long userId) {
        List<OrderDto> orderDtos = orderService.getOrdersByUserId(userId).stream()
                .map(DtoConverter::convertOrderToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderDtos);
    }
}
