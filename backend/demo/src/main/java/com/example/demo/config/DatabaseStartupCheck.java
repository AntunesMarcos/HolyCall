package com.example.demo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseStartupCheck implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseStartupCheck(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        if (result == null || result != 1) {
            throw new IllegalStateException("Database connectivity check failed.");
        }
        String databaseName = jdbcTemplate.queryForObject("SELECT current_database()", String.class);
        System.out.println("Neon DB connected successfully: " + databaseName);
    }
}
