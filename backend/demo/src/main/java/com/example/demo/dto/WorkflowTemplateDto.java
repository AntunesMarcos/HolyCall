package com.example.demo.dto;

public record WorkflowTemplateDto(
        Long id,
        String name,
        String category,
        double rating,
        int downloads,
        boolean featured
) {
}
