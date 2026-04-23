package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StudentDto(
        Long id,
        @NotBlank @Size(min = 3, max = 120) String name,
        @NotBlank @Email(message = "Email invalido") String email,
        @NotBlank @Size(min = 8, max = 20) String phone,
        @NotBlank @Size(max = 60) String className
) {
}
