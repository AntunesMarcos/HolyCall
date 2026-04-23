package com.example.demo.dto;

import com.example.demo.model.Role;
import java.time.Instant;

public record UserResponseDto(
        Long id,
        String name,
        String email,
        Role role,
        boolean active,
        Instant createdAt
) {
}
