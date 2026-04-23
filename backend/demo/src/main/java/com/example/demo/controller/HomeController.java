package com.example.demo.controller;

import com.example.demo.dto.HomeDashboardDto;
import com.example.demo.service.HomeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping("/dashboard")
    public HomeDashboardDto dashboard() {
        return homeService.getDashboard();
    }
}
