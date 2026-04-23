package com.example.demo.repository;

import com.example.demo.model.AttendanceRecord;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

    List<AttendanceRecord> findByClassNameIgnoreCaseAndDateBetween(String className, LocalDate startDate, LocalDate endDate);
}
