package com.example.demo.service;

import com.example.demo.dto.WorkflowDto;
import com.example.demo.dto.WorkflowRunDto;
import com.example.demo.repository.WorkflowRepository;
import com.example.demo.repository.WorkflowRunRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkflowService {

    private final WorkflowRepository workflowRepository;
    private final WorkflowRunRepository workflowRunRepository;

    public WorkflowService(WorkflowRepository workflowRepository, WorkflowRunRepository workflowRunRepository) {
        this.workflowRepository = workflowRepository;
        this.workflowRunRepository = workflowRunRepository;
    }

    @Transactional(readOnly = true)
    public List<WorkflowDto> listWorkflows() {
        return workflowRepository.findAll().stream()
                .map(item -> new WorkflowDto(
                        item.getId(),
                        item.getName(),
                        item.getStatus(),
                        item.getSuccessRate(),
                        item.getLastRun(),
                        item.getNextRun()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<WorkflowRunDto> listRecentRuns() {
        return workflowRunRepository.findAll().stream()
                .sorted((a, b) -> Long.compare(b.getId(), a.getId()))
                .limit(50)
                .map(item -> new WorkflowRunDto(
                        item.getId(),
                        item.getWorkflow(),
                        item.getStatus(),
                        item.getDuration(),
                        item.getStarted()))
                .toList();
    }
}
