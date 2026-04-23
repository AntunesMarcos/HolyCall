package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping(value = {"/app", "/app/", "/app/{path:[^\\.]*}", "/app/**/{path:[^\\.]*}"})
    public String forwardAppRoutes() {
        return "forward:/app/index.html";
    }
}
