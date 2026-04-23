package com.example.demo.repository;

import com.example.demo.model.TeamClass;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamClassRepository extends JpaRepository<TeamClass, Long> {

    Optional<TeamClass> findByNameIgnoreCase(String name);
}
