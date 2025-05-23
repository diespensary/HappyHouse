package com.example.backend.dto;

import com.example.backend.models.*;

import java.util.stream.Collectors;

public class DtoConverter {

    public static UserDto convertUserToDto(User user) {
        if (user == null) return null;
        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    public static CategoryDto convertCategoryToDto(Category category) {
        if (category == null) return null;
        CategoryDto dto = new CategoryDto();
        dto.setCategoryId(category.getCategoryId());
        dto.setType(category.getType());
        dto.setDescription(category.getDescription());
        return dto;
    }

    public static ProductDto convertProductToDto(Product product) {
        if (product == null) return null;
        ProductDto dto = new ProductDto();
        dto.setProductId(product.getProductId());
        dto.setCategoryId(product.getCategory() != null ? product.getCategory().getCategoryId() : null);
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setImageUrl(product.getImageUrl());
        return dto;
    }

    public static CartItemDto convertCartItemToDto(CartItem cartItem) {
        if (cartItem == null) return null;
        CartItemDto dto = new CartItemDto();
        dto.setCartItemId(cartItem.getCartItemId());
        dto.setProductId(cartItem.getProduct() != null ? cartItem.getProduct().getProductId() : null);
        dto.setCount(cartItem.getCount());
        return dto;
    }

    public static CartDto convertCartToDto(Cart cart) {
        if (cart == null) return null;
        CartDto dto = new CartDto();
        dto.setCartId(cart.getCartId());
        dto.setUserId(cart.getUser() != null ? cart.getUser().getUserId() : null);
        if (cart.getCartItems() != null) {
            dto.setCartItems(cart.getCartItems().stream()
                    .map(DtoConverter::convertCartItemToDto)
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    public static OrderItemDto convertOrderItemToDto(OrderItem orderItem) {
        if (orderItem == null) return null;
        OrderItemDto dto = new OrderItemDto();
        dto.setOrderItemId(orderItem.getOrderItemId());
        dto.setProductId(orderItem.getProduct() != null ? orderItem.getProduct().getProductId() : null);
        dto.setCount(orderItem.getCount());
        dto.setPrice(orderItem.getPrice());
        return dto;
    }

    public static OrderDto convertOrderToDto(Order order) {
        if (order == null) return null;
        OrderDto dto = new OrderDto();
        dto.setOrderId(order.getOrderId());
        dto.setUserId(order.getUser() != null ? order.getUser().getUserId() : null);
        dto.setTotalAmount(order.getTotalAmount());
        dto.setCreatedAt(order.getCreatedAt());
        if (order.getOrderItems() != null) {
            dto.setOrderItems(order.getOrderItems().stream()
                    .map(DtoConverter::convertOrderItemToDto)
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}
