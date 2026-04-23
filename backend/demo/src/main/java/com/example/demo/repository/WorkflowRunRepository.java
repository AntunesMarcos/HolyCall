package com.example.demo.repository;

import com.example.demo.model.WorkflowRun;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRunRepository extends JpaRepository<WorkflowRun, Long> {
}
