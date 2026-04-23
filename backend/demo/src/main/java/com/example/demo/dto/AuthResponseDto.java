package com.example.demo.dto;

public record AuthResponseDto(
        String token,
        long expiresInMs,
        UserResponseDto user
) {
}
