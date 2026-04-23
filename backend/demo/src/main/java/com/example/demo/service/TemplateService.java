package com.example.demo.service;

import com.example.demo.dto.WorkflowTemplateDto;
import com.example.demo.repository.WorkflowTemplateRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TemplateService {

    private final WorkflowTemplateRepository workflowTemplateRepository;

    public TemplateService(WorkflowTemplateRepository workflowTemplateRepository) {
        this.workflowTemplateRepository = workflowTemplateRepository;
    }

    @Transactional(readOnly = true)
    public List<WorkflowTemplateDto> listTemplates() {
        return workflowTemplateRepository.findAll().stream()
                .map(item -> new WorkflowTemplateDto(
                        item.getId(),
                        item.getName(),
                        item.getCategory(),
                        item.getRating(),
                        item.getDownloads(),
                        item.isFeatured()))
                .toList();
    }
}
