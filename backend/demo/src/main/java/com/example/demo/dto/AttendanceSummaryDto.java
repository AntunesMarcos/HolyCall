package com.example.demo.dto;

import java.time.LocalDate;

public record AttendanceSummaryDto(
        String className,
        LocalDate startDate,
        LocalDate endDate,
        int totalStudents,
        int averageAttendance
) {
}
