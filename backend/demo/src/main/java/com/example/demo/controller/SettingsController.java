package com.example.demo.controller;

import com.example.demo.dto.SettingsDto;
import com.example.demo.dto.SettingsUpdateDto;
import com.example.demo.service.SettingsService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public SettingsDto get() {
        return settingsService.getSettings();
    }

    @PutMapping
    public SettingsDto update(@Valid @RequestBody SettingsUpdateDto request) {
        return settingsService.update(request);
    }
}
