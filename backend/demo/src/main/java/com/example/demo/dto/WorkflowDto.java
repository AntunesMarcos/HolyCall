package com.example.demo.dto;

public record WorkflowDto(
        Long id,
        String name,
        String status,
        double successRate,
        String lastRun,
        String nextRun
) {
}
