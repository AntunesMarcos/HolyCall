package com.example.demo.dto;

public record AnalyticsOverviewDto(
        int totalExecutions,
        double successRate,
        double errorRate,
        int avgDurationSeconds
) {
}
