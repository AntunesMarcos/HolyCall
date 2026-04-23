package com.example.demo.dto;

public record TeamClassDto(
        Long id,
        String name,
        String description,
        String schedule,
        int totalLessons
) {
}
