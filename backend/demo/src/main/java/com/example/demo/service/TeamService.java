package com.example.demo.service;

import com.example.demo.dto.TeamClassDto;
import com.example.demo.dto.TeamMemberDto;
import com.example.demo.model.Student;
import com.example.demo.model.Teacher;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.TeamClassRepository;
import com.example.demo.repository.TeacherRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamService {

    private final TeamClassRepository teamClassRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public TeamService(
            TeamClassRepository teamClassRepository,
            TeacherRepository teacherRepository,
            StudentRepository studentRepository
    ) {
        this.teamClassRepository = teamClassRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional(readOnly = true)
    public List<TeamClassDto> listClasses() {
        return teamClassRepository.findAll().stream()
                .map(item -> new TeamClassDto(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getSchedule(),
                        item.getTotalLessons()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<TeamMemberDto> listMembers() {
        List<TeamMemberDto> teachers = teacherRepository.findAll().stream()
                .map(this::mapTeacher)
                .toList();

        List<TeamMemberDto> students = studentRepository.findAll().stream()
                .map(this::mapStudent)
                .toList();

        return java.util.stream.Stream.concat(teachers.stream(), students.stream()).toList();
    }

    private TeamMemberDto mapTeacher(Teacher teacher) {
        String className = teacher.getCode() == null ? "Sem Turma" : "Turma vinculada";
        return new TeamMemberDto(teacher.getId(), teacher.getName(), teacher.getEmail(), className, true);
    }

    private TeamMemberDto mapStudent(Student student) {
        String className = student.getTeamClass() == null ? "Sem Turma" : student.getTeamClass().getName();
        return new TeamMemberDto(student.getId(), student.getName(), student.getEmail(), className, false);
    }
}
