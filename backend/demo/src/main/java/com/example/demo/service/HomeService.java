package com.example.demo.service;

import com.example.demo.dto.HomeDashboardDto;
import com.example.demo.repository.AttendanceRecordRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.TeamClassRepository;
import com.example.demo.repository.WorkflowRunRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HomeService {

    private final StudentRepository studentRepository;
    private final TeamClassRepository teamClassRepository;
    private final AttendanceRecordRepository attendanceRecordRepository;
    private final WorkflowRunRepository workflowRunRepository;

    public HomeService(
            StudentRepository studentRepository,
            TeamClassRepository teamClassRepository,
            AttendanceRecordRepository attendanceRecordRepository,
            WorkflowRunRepository workflowRunRepository
    ) {
        this.studentRepository = studentRepository;
        this.teamClassRepository = teamClassRepository;
        this.attendanceRecordRepository = attendanceRecordRepository;
        this.workflowRunRepository = workflowRunRepository;
    }

    @Transactional(readOnly = true)
    public HomeDashboardDto getDashboard() {
        int totalStudents = (int) studentRepository.count();
        int totalClasses = (int) teamClassRepository.count();

        int averageAttendance = attendanceRecordRepository.findAll().stream()
                .mapToInt(item -> {
                    int total = item.getPresentCount() + item.getAbsentCount();
                    if (total == 0) {
                        return 0;
                    }
                    return Math.round((item.getPresentCount() * 100.0f) / total);
                })
                .findFirst()
                .orElse(0);

        long failedRuns = workflowRunRepository.findAll().stream()
                .filter(run -> "failed".equalsIgnoreCase(run.getStatus()))
                .count();

        return new HomeDashboardDto(
                totalStudents,
                totalClasses,
                averageAttendance,
                List.of(
                        "Backend conectado ao Neon e persistindo dados.",
                        failedRuns + " workflow(s) com falha recente."));
    }
}
