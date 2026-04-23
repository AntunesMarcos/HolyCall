package com.example.demo.service;

import com.example.demo.dto.SettingsDto;
import com.example.demo.dto.SettingsUpdateDto;
import com.example.demo.model.AppSettings;
import com.example.demo.repository.AppSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SettingsService {

    private static final long DEFAULT_SETTINGS_ID = 1L;

    private final AppSettingsRepository appSettingsRepository;

    public SettingsService(AppSettingsRepository appSettingsRepository) {
        this.appSettingsRepository = appSettingsRepository;
    }

    @Transactional(readOnly = true)
    public SettingsDto getSettings() {
        AppSettings settings = appSettingsRepository.findById(DEFAULT_SETTINGS_ID)
                .orElseGet(() -> appSettingsRepository.save(defaultSettings()));
        return toDto(settings);
    }

    @Transactional
    public SettingsDto update(SettingsUpdateDto request) {
        AppSettings settings = appSettingsRepository.findById(DEFAULT_SETTINGS_ID)
                .orElseGet(this::defaultSettings);

        settings.setFirstName(request.firstName());
        settings.setLastName(request.lastName());
        settings.setEmail(request.email());
        settings.setPhone(request.phone());
        settings.setBio(request.bio());
        settings.setTimezone(request.timezone());
        settings.setEmailNotifications(request.emailNotifications());
        settings.setPushNotifications(request.pushNotifications());
        settings.setSmsNotifications(request.smsNotifications());

        AppSettings saved = appSettingsRepository.save(settings);
        return toDto(saved);
    }

    private AppSettings defaultSettings() {
        AppSettings settings = new AppSettings();
        settings.setId(DEFAULT_SETTINGS_ID);
        settings.setFirstName("Alex");
        settings.setLastName("Evans");
        settings.setEmail("alex@company.com");
        settings.setPhone("+1 (555) 123-4567");
        settings.setBio("Product manager passionate about automation and workflow optimization.");
        settings.setTimezone("pst");
        settings.setEmailNotifications(true);
        settings.setPushNotifications(false);
        settings.setSmsNotifications(false);
        return settings;
    }

    private SettingsDto toDto(AppSettings settings) {
        return new SettingsDto(
                settings.getFirstName(),
                settings.getLastName(),
                settings.getEmail(),
                settings.getPhone(),
                settings.getBio(),
                settings.getTimezone(),
                settings.isEmailNotifications(),
                settings.isPushNotifications(),
                settings.isSmsNotifications());
    }
}
