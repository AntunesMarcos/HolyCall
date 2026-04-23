package com.example.demo.service;

import com.example.demo.dto.StudentDto;
import com.example.demo.exception.ConflictException;
import com.example.demo.model.Student;
import com.example.demo.model.TeamClass;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.TeamClassRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final TeamClassRepository teamClassRepository;

    public StudentService(StudentRepository studentRepository, TeamClassRepository teamClassRepository) {
        this.studentRepository = studentRepository;
        this.teamClassRepository = teamClassRepository;
    }

    @Transactional(readOnly = true)
    public List<StudentDto> listAll() {
        return studentRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public StudentDto create(StudentDto request) {
        studentRepository.findByEmail(request.email().trim().toLowerCase())
                .ifPresent(value -> {
                    throw new ConflictException("Ja existe aluno com este email.");
                });

        TeamClass teamClass = teamClassRepository.findByNameIgnoreCase(request.className().trim())
                .orElseGet(() -> {
                    TeamClass created = new TeamClass();
                    created.setName(request.className().trim());
                    created.setDescription("Turma criada automaticamente");
                    created.setSchedule("Nao definido");
                    created.setTotalLessons(14);
                    return teamClassRepository.save(created);
                });

        Student student = new Student();
        student.setName(request.name().trim());
        student.setEmail(request.email().trim().toLowerCase());
        student.setPhone(request.phone().trim());
        student.setTeamClass(teamClass);

        return toDto(studentRepository.save(student));
    }

    public StudentDto toDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getPhone(),
                student.getTeamClass() == null ? "Sem Turma" : student.getTeamClass().getName());
    }
}
