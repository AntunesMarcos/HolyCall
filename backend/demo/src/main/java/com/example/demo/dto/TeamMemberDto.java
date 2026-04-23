package com.example.demo.dto;

public record TeamMemberDto(
        Long id,
        String name,
        String email,
        String className,
        boolean professor
) {
}
