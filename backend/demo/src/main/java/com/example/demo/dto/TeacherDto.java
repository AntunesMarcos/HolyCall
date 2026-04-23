package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TeacherDto(
        String id,
        @NotBlank @Size(min = 3, max = 120) String name,
        @NotBlank @Email(message = "Email invalido") String email,
        @Size(max = 20) String phone,
        @NotBlank @Size(max = 80) String subject,
        String status
) {
}
