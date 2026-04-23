package com.example.demo.service;

import com.example.demo.dto.AnalyticsOverviewDto;
import com.example.demo.repository.WorkflowRunRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnalyticsService {

    private final WorkflowRunRepository workflowRunRepository;

    public AnalyticsService(WorkflowRunRepository workflowRunRepository) {
        this.workflowRunRepository = workflowRunRepository;
    }

    @Transactional(readOnly = true)
    public AnalyticsOverviewDto overview() {
        int total = (int) workflowRunRepository.count();
        int success = (int) workflowRunRepository.findAll().stream()
                .filter(run -> "success".equalsIgnoreCase(run.getStatus()))
                .count();
        int failed = (int) workflowRunRepository.findAll().stream()
                .filter(run -> "failed".equalsIgnoreCase(run.getStatus()))
                .count();

        double successRate = total == 0 ? 0 : (success * 100.0) / total;
        double errorRate = total == 0 ? 0 : (failed * 100.0) / total;

        return new AnalyticsOverviewDto(total, round(successRate), round(errorRate), 38);
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
