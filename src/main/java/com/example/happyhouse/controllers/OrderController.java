package com.example.happyhouse.controllers;

import com.example.happyhouse.dto.DtoConverter;
import com.example.happyhouse.dto.OrderDto;
import com.example.happyhouse.models.Order;
import com.example.happyhouse.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/happyhouse/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/{userId}")
    public ResponseEntity<OrderDto> createOrder(@PathVariable("userId") Long userId) {
        Order order = orderService.createOrder(userId);
        return ResponseEntity.ok(DtoConverter.convertOrderToDto(order));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUser(@PathVariable("userId") Long userId) {
        List<OrderDto> orderDtos = orderService.getOrdersByUserId(userId).stream()
                .map(DtoConverter::convertOrderToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderDtos);
    }
}
