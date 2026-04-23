package com.example.demo.dto;

public record WorkflowRunDto(
        Long id,
        String workflow,
        String status,
        String duration,
        String started
) {
}
