package com.example.demo.repository;

import com.example.demo.model.Teacher;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    Optional<Teacher> findByCode(String code);

    Optional<Teacher> findByEmail(String email);
}
