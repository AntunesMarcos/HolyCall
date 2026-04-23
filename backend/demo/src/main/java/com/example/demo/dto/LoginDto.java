package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDto(
        @NotBlank @Email(message = "Email invalido") String email,
        @NotBlank @Size(min = 6, max = 72) String password
) {
}
