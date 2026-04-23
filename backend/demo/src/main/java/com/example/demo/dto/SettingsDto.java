package com.example.demo.dto;

public record SettingsDto(
        String firstName,
        String lastName,
        String email,
        String phone,
        String bio,
        String timezone,
        boolean emailNotifications,
        boolean pushNotifications,
        boolean smsNotifications
) {
}
