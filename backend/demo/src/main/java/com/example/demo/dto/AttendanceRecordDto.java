package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDate;

public record AttendanceRecordDto(
        @NotBlank String className,
        @NotNull LocalDate date,
        @PositiveOrZero int presentCount,
        @PositiveOrZero int absentCount
) {
}
