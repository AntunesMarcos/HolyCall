package com.example.demo.dto;

import com.example.demo.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterUserRequestDto(
        @NotBlank @Size(min = 3, max = 120) String name,
        @NotBlank @Email(message = "Email invalido") String email,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotNull Role role
) {
}
