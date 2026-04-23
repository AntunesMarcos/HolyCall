package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SettingsUpdateDto(
        @NotBlank @Size(min = 2, max = 60) String firstName,
        @NotBlank @Size(min = 2, max = 60) String lastName,
        @NotBlank @Email(message = "Email invalido") String email,
        @Size(max = 20) String phone,
        @Size(max = 240) String bio,
        @NotBlank String timezone,
        boolean emailNotifications,
        boolean pushNotifications,
        boolean smsNotifications
) {
}
