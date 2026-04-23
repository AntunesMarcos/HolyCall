package com.example.demo.config;

import com.example.demo.model.AppSettings;
import com.example.demo.model.AttendanceRecord;
import com.example.demo.model.Role;
import com.example.demo.model.Student;
import com.example.demo.model.TeamClass;
import com.example.demo.model.Teacher;
import com.example.demo.model.User;
import com.example.demo.model.Workflow;
import com.example.demo.model.WorkflowRun;
import com.example.demo.model.WorkflowTemplate;
import com.example.demo.repository.AppSettingsRepository;
import com.example.demo.repository.AttendanceRecordRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.TeamClassRepository;
import com.example.demo.repository.TeacherRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WorkflowRepository;
import com.example.demo.repository.WorkflowRunRepository;
import com.example.demo.repository.WorkflowTemplateRepository;
import java.time.Instant;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TeamClassRepository teamClassRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AttendanceRecordRepository attendanceRecordRepository;
    private final WorkflowRepository workflowRepository;
    private final WorkflowRunRepository workflowRunRepository;
    private final WorkflowTemplateRepository workflowTemplateRepository;
    private final AppSettingsRepository appSettingsRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            TeamClassRepository teamClassRepository,
            StudentRepository studentRepository,
            TeacherRepository teacherRepository,
            AttendanceRecordRepository attendanceRecordRepository,
            WorkflowRepository workflowRepository,
            WorkflowRunRepository workflowRunRepository,
            WorkflowTemplateRepository workflowTemplateRepository,
            AppSettingsRepository appSettingsRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.teamClassRepository = teamClassRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.attendanceRecordRepository = attendanceRecordRepository;
        this.workflowRepository = workflowRepository;
        this.workflowRunRepository = workflowRunRepository;
        this.workflowTemplateRepository = workflowTemplateRepository;
        this.appSettingsRepository = appSettingsRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (teacherRepository.count() == 0) {
            Teacher teacher = new Teacher();
            teacher.setCode("P001");
            teacher.setName("Carlos Eduardo Silva");
            teacher.setEmail("carlos.eduardo@escola.com");
            teacher.setPhone("(31) 99999-1111");
            teacher.setSubject("Matematica");
            teacher.setStatus("Ativo");
            teacherRepository.save(teacher);
        }

        if (teamClassRepository.count() == 0) {
            TeamClass teamClass = new TeamClass();
            teamClass.setName("Turma A");
            teamClass.setDescription("Catequese Infantil");
            teamClass.setSchedule("Sabado 09h");
            teamClass.setTotalLessons(14);
            teamClass.setTeacher(teacherRepository.findAll().get(0));
            teamClassRepository.save(teamClass);
        }

        if (studentRepository.count() == 0) {
            TeamClass teamClass = teamClassRepository.findAll().get(0);

            Student s1 = new Student();
            s1.setName("Clara Blackwood");
            s1.setEmail("clara@aluno.com");
            s1.setPhone("(31) 99999-0001");
            s1.setTeamClass(teamClass);
            studentRepository.save(s1);

            Student s2 = new Student();
            s2.setName("Michael Whitmore");
            s2.setEmail("michael@aluno.com");
            s2.setPhone("(31) 98888-0002");
            s2.setTeamClass(teamClass);
            studentRepository.save(s2);
        }

        if (attendanceRecordRepository.count() == 0) {
            AttendanceRecord record = new AttendanceRecord();
            record.setClassName("Turma A");
            record.setDate(LocalDate.now());
            record.setPresentCount(18);
            record.setAbsentCount(2);
            attendanceRecordRepository.save(record);
        }

        if (workflowRepository.count() == 0) {
            Workflow workflow = new Workflow();
            workflow.setName("Product Catalog Sync");
            workflow.setStatus("active");
            workflow.setSuccessRate(98.7);
            workflow.setLastRun("2 minutes ago");
            workflow.setNextRun("In 58 minutes");
            workflowRepository.save(workflow);
        }

        if (workflowRunRepository.count() == 0) {
            WorkflowRun run = new WorkflowRun();
            run.setWorkflow("Product Catalog Sync");
            run.setStatus("success");
            run.setDuration("45s");
            run.setStarted("2 min ago");
            workflowRunRepository.save(run);
        }

        if (workflowTemplateRepository.count() == 0) {
            WorkflowTemplate template = new WorkflowTemplate();
            template.setName("E-commerce Order Processing");
            template.setCategory("E-commerce");
            template.setRating(4.8);
            template.setDownloads(1247);
            template.setFeatured(true);
            workflowTemplateRepository.save(template);
        }

        if (appSettingsRepository.count() == 0) {
            AppSettings settings = new AppSettings();
            settings.setId(1L);
            settings.setFirstName("Alex");
            settings.setLastName("Evans");
            settings.setEmail("alex@company.com");
            settings.setPhone("+1 (555) 123-4567");
            settings.setBio("Product manager passionate about automation and workflow optimization.");
            settings.setTimezone("pst");
            settings.setEmailNotifications(true);
            settings.setPushNotifications(false);
            settings.setSmsNotifications(false);
            appSettingsRepository.save(settings);
        }

        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setName("Admin HolyCall");
            admin.setEmail("admin@holycall.com");
            admin.setPasswordHash(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            admin.setActive(true);
            admin.setCreatedAt(Instant.now());
            userRepository.save(admin);
        }
    }
}
