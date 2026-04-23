package com.example.demo.service;

import com.example.demo.dto.AttendanceRecordDto;
import com.example.demo.dto.AttendanceSummaryDto;
import com.example.demo.model.AttendanceRecord;
import com.example.demo.repository.AttendanceRecordRepository;
import com.example.demo.repository.StudentRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttendanceService {

    private final AttendanceRecordRepository attendanceRecordRepository;
    private final StudentRepository studentRepository;

    public AttendanceService(AttendanceRecordRepository attendanceRecordRepository, StudentRepository studentRepository) {
        this.attendanceRecordRepository = attendanceRecordRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional
    public AttendanceRecordDto register(AttendanceRecordDto request) {
        AttendanceRecord record = new AttendanceRecord();
        record.setClassName(request.className().trim());
        record.setDate(request.date());
        record.setPresentCount(request.presentCount());
        record.setAbsentCount(request.absentCount());

        AttendanceRecord saved = attendanceRecordRepository.save(record);
        return new AttendanceRecordDto(
                saved.getClassName(),
                saved.getDate(),
                saved.getPresentCount(),
                saved.getAbsentCount());
    }

    @Transactional(readOnly = true)
    public AttendanceSummaryDto summary(String className, LocalDate startDate, LocalDate endDate) {
        List<AttendanceRecord> records = attendanceRecordRepository
                .findByClassNameIgnoreCaseAndDateBetween(className, startDate, endDate);

        java.util.OptionalDouble average = records.stream()
                .mapToInt(item -> {
                    int total = item.getPresentCount() + item.getAbsentCount();
                    if (total == 0) {
                        return 0;
                    }
                    return Math.round((item.getPresentCount() * 100.0f) / total);
                })
                .average();

        int avg = average.isPresent() ? (int) Math.round(average.getAsDouble()) : 0;

            int totalStudents = (int) studentRepository.countByTeamClass_NameIgnoreCase(className);

            return new AttendanceSummaryDto(className, startDate, endDate, totalStudents, avg);
    }
}
