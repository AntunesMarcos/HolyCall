package com.example.demo.controller;

import com.example.demo.dto.WorkflowDto;
import com.example.demo.dto.WorkflowRunDto;
import com.example.demo.service.WorkflowService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workflows")
public class WorkflowController {

    private final WorkflowService workflowService;

    public WorkflowController(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @GetMapping
    public List<WorkflowDto> list() {
        return workflowService.listWorkflows();
    }

    @GetMapping("/runs")
    public List<WorkflowRunDto> runs() {
        return workflowService.listRecentRuns();
    }
}
