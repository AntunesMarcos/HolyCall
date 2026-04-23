package com.example.demo.controller;

import com.example.demo.dto.WorkflowTemplateDto;
import com.example.demo.service.TemplateService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public List<WorkflowTemplateDto> list() {
        return templateService.listTemplates();
    }
}
