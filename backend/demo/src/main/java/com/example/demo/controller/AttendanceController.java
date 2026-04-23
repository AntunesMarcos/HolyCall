package com.example.demo.controller;

import com.example.demo.dto.AttendanceRecordDto;
import com.example.demo.dto.AttendanceSummaryDto;
import com.example.demo.service.AttendanceService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/records")
    public ResponseEntity<AttendanceRecordDto> register(@Valid @RequestBody AttendanceRecordDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(attendanceService.register(request));
    }

    @GetMapping("/classes/{className}/summary")
    public AttendanceSummaryDto summary(
            @PathVariable String className,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return attendanceService.summary(className, startDate, endDate);
    }
}
