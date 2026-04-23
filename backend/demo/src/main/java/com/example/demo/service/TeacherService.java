package com.example.demo.service;

import com.example.demo.dto.TeacherDto;
import com.example.demo.exception.ConflictException;
import com.example.demo.model.Teacher;
import com.example.demo.repository.TeacherRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Transactional(readOnly = true)
    public List<TeacherDto> listAll() {
        return teacherRepository.findAll().stream().map(this::toDto).toList();
    }

    @Transactional
    public TeacherDto create(TeacherDto request) {
        teacherRepository.findByEmail(request.email().trim().toLowerCase())
                .ifPresent(value -> {
                    throw new ConflictException("Ja existe professor com este email.");
                });

        long nextNumber = teacherRepository.count() + 1;
        String code = "P" + String.format("%03d", nextNumber);

        Teacher teacher = new Teacher();
        teacher.setCode(code);
        teacher.setName(request.name().trim());
        teacher.setEmail(request.email().trim().toLowerCase());
        teacher.setPhone(request.phone());
        teacher.setSubject(request.subject().trim());
        teacher.setStatus("Ativo");

        return toDto(teacherRepository.save(teacher));
    }

    public TeacherDto toDto(Teacher teacher) {
        return new TeacherDto(
                teacher.getCode(),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getPhone(),
                teacher.getSubject(),
                teacher.getStatus());
    }
}
